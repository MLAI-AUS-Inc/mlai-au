import { createSign } from "crypto";

type IndexNowResult = {
    ok: boolean;
    status?: number;
    detail?: string;
};

type GoogleResult = {
    ok: boolean;
    detail?: string;
    status?: number;
};

export type SearchNotifierResult = {
    indexNow: IndexNowResult;
    google: GoogleResult;
};

export type SearchNotifierOptions = {
    indexNowKey?: string;
    indexNowKeyLocation?: string;
    googleIndexingEnabled?: boolean | string;
    googleCredentialsBase64?: string;
};

function base64url(input: string | Buffer) {
    return Buffer.from(input)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function signJwt(payload: Record<string, unknown>, privateKey: string) {
    const header = { alg: "RS256", typ: "JWT" };
    const headerEncoded = base64url(JSON.stringify(header));
    const payloadEncoded = base64url(JSON.stringify(payload));
    const data = `${headerEncoded}.${payloadEncoded}`;

    const signer = createSign("RSA-SHA256");
    signer.update(data);
    signer.end();

    const signature = signer.sign(privateKey);
    return `${data}.${base64url(signature)}`;
}

async function getGoogleAccessToken(serviceAccount: {
    client_email: string;
    private_key: string;
    token_uri?: string;
}) {
    const tokenUri = serviceAccount.token_uri || "https://oauth2.googleapis.com/token";
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iss: serviceAccount.client_email,
        scope: "https://www.googleapis.com/auth/indexing",
        aud: tokenUri,
        exp: now + 3600,
        iat: now,
    };

    const assertion = signJwt(payload, serviceAccount.private_key);
    const body = new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
    });

    const response = await fetch(tokenUri, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Google token exchange failed (${response.status}): ${text}`);
    }

    const json = await response.json() as { access_token: string };
    return json.access_token;
}

function ensureAbsoluteUrl(url: string) {
    try {
        return new URL(url).toString();
    } catch {
        return null;
    }
}

async function notifyIndexNow(urls: string[], opts: { key: string; keyLocation?: string }) {
    const uniqueUrls = Array.from(new Set(urls.map((u) => ensureAbsoluteUrl(u)).filter(Boolean))) as string[];
    if (uniqueUrls.length === 0) {
        return { ok: false, detail: "No valid URLs provided" };
    }

    if (uniqueUrls.length === 1) {
        const params = new URLSearchParams({
            url: uniqueUrls[0],
            key: opts.key,
        });
        if (opts.keyLocation) {
            params.set("keyLocation", opts.keyLocation);
        }
        const res = await fetch(`https://api.indexnow.org/indexnow?${params.toString()}`, { method: "GET" });
        if (!res.ok) {
            const text = await res.text();
            return { ok: false, status: res.status, detail: text || "IndexNow request failed" };
        }
        return { ok: true, status: res.status };
    }

    const firstHost = new URL(uniqueUrls[0]).host;
    const body = {
        host: firstHost,
        key: opts.key,
        keyLocation: opts.keyLocation || `https://${firstHost}/${opts.key}.txt`,
        urlList: uniqueUrls,
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        return { ok: false, status: res.status, detail: text || "IndexNow request failed" };
    }

    return { ok: true, status: res.status };
}

async function notifyGoogle(urls: string[], base64Credentials: string) {
    const uniqueUrls = Array.from(new Set(urls.map((u) => ensureAbsoluteUrl(u)).filter(Boolean))) as string[];
    if (uniqueUrls.length === 0) {
        return { ok: false, detail: "No valid URLs provided" };
    }

    let serviceAccount: { client_email: string; private_key: string; token_uri?: string };
    try {
        const decoded = Buffer.from(base64Credentials, "base64").toString("utf-8");
        serviceAccount = JSON.parse(decoded);
        if (!serviceAccount.private_key || !serviceAccount.client_email) {
            return { ok: false, detail: "Service account is missing required fields" };
        }
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
    } catch (error) {
        return { ok: false, detail: `Invalid GOOGLE_INDEXING_CREDENTIALS: ${String(error)}` };
    }

    try {
        const token = await getGoogleAccessToken(serviceAccount);
        const endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish";
        const results = [];

        for (const url of uniqueUrls) {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url, type: "URL_UPDATED" }),
            });

            if (!res.ok) {
                const text = await res.text();
                results.push(`Failed for ${url}: ${res.status} ${text}`);
            }
        }

        if (results.length > 0) {
            return { ok: false, detail: results.join("; ") };
        }

        return { ok: true };
    } catch (error) {
        return { ok: false, detail: (error as Error).message };
    }
}

export async function notifySearchEngines(urls: string[], options: SearchNotifierOptions): Promise<SearchNotifierResult> {
    const normalized = Array.from(new Set(urls.map((u) => ensureAbsoluteUrl(u)).filter(Boolean))) as string[];

    let derivedKeyLocation: string | undefined;
    if (options.indexNowKey && normalized.length > 0) {
        try {
            const origin = new URL(normalized[0]).origin;
            derivedKeyLocation = `${origin}/${options.indexNowKey}.txt`;
        } catch {
            derivedKeyLocation = undefined;
        }
    }

    let indexNow: IndexNowResult = { ok: false, detail: "IndexNow key not configured" };
    if (options.indexNowKey) {
        try {
            indexNow = await notifyIndexNow(normalized, {
                key: options.indexNowKey,
                keyLocation: options.indexNowKeyLocation || derivedKeyLocation,
            });
        } catch (error) {
            indexNow = { ok: false, detail: (error as Error).message };
        }
    }

    const googleEnabled = String(options.googleIndexingEnabled).toLowerCase() === "true";
    let google: GoogleResult = { ok: false, detail: "Google Indexing API disabled" };
    if (googleEnabled && options.googleCredentialsBase64) {
        try {
            google = await notifyGoogle(normalized, options.googleCredentialsBase64);
        } catch (error) {
            google = { ok: false, detail: (error as Error).message };
        }
    }

    return { indexNow, google };
}

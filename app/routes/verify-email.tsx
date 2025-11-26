import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { verifyMagicLink } from "~/lib/auth";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const verified = useRef(false);

    useEffect(() => {
        if (!token) {
            navigate("/platform/login?error=missing_token");
            return;
        }

        if (verified.current) return;
        verified.current = true;

        const verify = async () => {
            try {
                // Pass empty object as env since it's not used on client
                await verifyMagicLink({} as any, token);
                // Successfully verified - redirect to dashboard
                navigate("/platform/dashboard");
            } catch (error) {
                console.error("Magic link verification error:", error);
                navigate("/platform/login?error=verification_failed");
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="mb-4">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                </div>
                <p className="text-sm text-gray-600">Verifying your email...</p>
            </div>
        </div>
    );
}

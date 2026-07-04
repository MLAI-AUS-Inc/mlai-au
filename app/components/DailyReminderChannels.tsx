import { useState } from "react";
import { Form } from "react-router";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Check, Mail } from "lucide-react";
import { clsx } from "clsx";

import type {
  VibeMarketingNotificationChannel,
  VibeMarketingNotificationChannelType,
} from "~/types/vibe-marketing";

export const CHANNEL_INTENTS = [
  "connect-channel",
  "verify-channel-otp",
  "resend-channel-otp",
  "remove-channel",
] as const;

const CHANNEL_LABELS: Record<VibeMarketingNotificationChannelType, string> = {
  slack: "Slack",
  email: "Email",
  whatsapp: "WhatsApp",
};

const WHATSAPP_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Robotics%20%26%20AI%20For%20Everyone%20(10).png?alt=media&token=20386aff-4770-472f-839e-b6086868de41";

const PUBLISH_CHANNEL_FALLBACK_DETAILS: Record<VibeMarketingNotificationChannelType, string> = {
  slack: "Connected",
  email: "Account email unavailable",
  whatsapp: "Not connected",
};

type PublishChannelTone = "active" | "warning" | "muted";

function pickChannel(
  channels: VibeMarketingNotificationChannel[],
  type: VibeMarketingNotificationChannelType,
): VibeMarketingNotificationChannel | null {
  const ofType = channels.filter((channel) => channel.channelType === type);
  return (
    ofType.find((channel) => channel.consentState === "active") ??
    ofType.find((channel) => channel.consentState === "pending") ??
    ofType[0] ??
    null
  );
}

function StateChip({ state }: { state: VibeMarketingNotificationChannel["consentState"] }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    opted_out: "bg-gray-100 text-gray-500 border-gray-200",
    revoked: "bg-gray-100 text-gray-500 border-gray-200",
  };
  const labels: Record<string, string> = {
    active: "Active",
    pending: "Pending",
    opted_out: "Paused",
    revoked: "Removed",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${styles[state] ?? styles.revoked}`}>
      {labels[state] ?? state}
    </span>
  );
}

function RemoveButton({ channelId, disabled }: { channelId: string; disabled: boolean }) {
  return (
    <Form method="POST" className="inline">
      <input type="hidden" name="channelId" value={channelId} />
      <button
        type="submit"
        name="intent"
        value="remove-channel"
        disabled={disabled}
        className="text-xs font-bold text-gray-400 underline-offset-2 transition hover:text-red-600 hover:underline disabled:opacity-50"
      >
        Remove
      </button>
    </Form>
  );
}

function activeChannelDetail(
  type: VibeMarketingNotificationChannelType,
  channel: VibeMarketingNotificationChannel,
) {
  const route = channel.displayName || channel.routeId;
  if (type === "slack") return route ? `Connected · ${route}` : "Connected";
  if (type === "email") return route ? `${route} · Verified` : "Verified";
  return route || "Connected";
}

function publishChannelDetail(
  type: VibeMarketingNotificationChannelType,
  channel: VibeMarketingNotificationChannel | null,
  accountEmail?: string | null,
  accountEmailVerified?: boolean | null,
) {
  if (type === "email" && accountEmail) {
    const verifiedLabel = accountEmailVerified === false ? "Unverified" : "Verified";
    return `${accountEmail} · ${verifiedLabel}`;
  }
  if (channel?.consentState === "active") return activeChannelDetail(type, channel);
  if (type === "whatsapp" && channel?.consentState === "pending") {
    return `${channel.routeId || "Number"} · Verification pending`;
  }
  return PUBLISH_CHANNEL_FALLBACK_DETAILS[type];
}

function publishChannelTone(
  type: VibeMarketingNotificationChannelType,
  channel: VibeMarketingNotificationChannel | null,
  accountEmailVerified?: boolean | null,
): PublishChannelTone {
  if (type === "whatsapp") {
    if (channel?.consentState === "active") return "active";
    if (channel?.consentState === "pending") return "warning";
    return "muted";
  }
  if (type === "email" && accountEmailVerified === false) return "warning";
  return "active";
}

function PublishChannelStatusBadge({ tone }: { tone: PublishChannelTone }) {
  if (tone === "muted") {
    return (
      <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">
        Not set up
      </span>
    );
  }
  if (tone === "warning") {
    return (
      <span className="shrink-0 rounded-md bg-amber-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-amber-700">
        Review
      </span>
    );
  }
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-600 text-white shadow-sm">
      <Check className="h-4 w-4" strokeWidth={3} />
    </span>
  );
}

function ChannelIcon({ type }: { type: VibeMarketingNotificationChannelType }) {
  const iconClassName = "h-7 w-7";
  if (type === "slack") {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
        <img src="/vibe-raising/logos/slack.png" alt="" className={clsx(iconClassName, "object-contain")} />
      </span>
    );
  }
  if (type === "email") {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 shadow-inner">
        <Mail className={iconClassName} strokeWidth={2.4} />
      </span>
    );
  }
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-inner">
      <img src={WHATSAPP_LOGO_URL} alt="" className={clsx(iconClassName, "object-contain")} />
    </span>
  );
}

function ChannelRow({
  type,
  channel,
  isSubmitting,
  accountEmail,
  accountEmailVerified,
  variant = "settings",
  channelError,
}: {
  type: VibeMarketingNotificationChannelType;
  channel: VibeMarketingNotificationChannel | null;
  isSubmitting: boolean;
  accountEmail?: string | null;
  accountEmailVerified?: boolean | null;
  variant?: "settings" | "publish";
  channelError?: string | null;
}) {
  const [whatsappSetupOpen, setWhatsappSetupOpen] = useState(false);
  const isActive = channel?.consentState === "active";
  const isPending = channel?.consentState === "pending";
  const publishTone = publishChannelTone(type, channel, accountEmailVerified);

  if (variant === "publish") {
    // WhatsApp connects right here: Set up -> number -> code -> verified.
    // The verified number persists as an org notification channel, so this
    // is one-time; the row simply shows connected on every later visit.
    const whatsappNeedsSetup = type === "whatsapp" && !isActive && !isPending;
    const whatsappForm =
      type === "whatsapp" && isPending && channel?.pendingVerification ? (
        <Form method="POST" className="mt-3 space-y-2 border-t border-gray-100 pt-3">
          <input type="hidden" name="channelId" value={channel.id} />
          <p className="text-xs font-semibold text-gray-600">
            Code sent to <span className="font-black">{channel.routeId}</span> on WhatsApp.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              name="code"
              inputMode="numeric"
              maxLength={6}
              placeholder="6-digit code"
              className="h-10 w-32 rounded-lg border border-gray-200 px-3 text-sm font-semibold tracking-widest outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            />
            <button
              type="submit"
              name="intent"
              value="verify-channel-otp"
              disabled={isSubmitting}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-violet-600 px-4 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
            >
              Verify
            </button>
            <button
              type="submit"
              name="intent"
              value="resend-channel-otp"
              disabled={isSubmitting}
              className="text-sm font-bold text-violet-700 underline-offset-2 hover:underline disabled:opacity-50"
            >
              Resend
            </button>
          </div>
          {typeof channel.pendingVerification.attemptsRemaining === "number" &&
          channel.pendingVerification.attemptsRemaining < 5 ? (
            <p className="text-[11px] font-medium text-amber-700">
              {channel.pendingVerification.attemptsRemaining} attempts remaining.
            </p>
          ) : null}
          {channelError ? <p className="text-xs font-semibold text-red-700">{channelError}</p> : null}
        </Form>
      ) : whatsappNeedsSetup && whatsappSetupOpen ? (
        <Form method="POST" className="mt-3 space-y-2 border-t border-gray-100 pt-3">
          <input type="hidden" name="channelType" value="whatsapp" />
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="tel"
              name="routeId"
              placeholder="+61 400 000 000"
              className="h-10 w-48 rounded-lg border border-gray-200 px-3 text-sm font-semibold outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            />
            <button
              type="submit"
              name="intent"
              value="connect-channel"
              disabled={isSubmitting}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-violet-600 px-4 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
            >
              Send code
            </button>
          </div>
          <p className="text-[11px] font-medium text-gray-500">
            International format. We&apos;ll send a 6-digit code on WhatsApp — one-time setup.
          </p>
          {channelError ? <p className="text-xs font-semibold text-red-700">{channelError}</p> : null}
        </Form>
      ) : null;

    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
        <div className="flex min-h-[52px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <ChannelIcon type={type} />
            <div className="min-w-0">
              <p className="truncate text-base font-black leading-5 text-gray-950">{CHANNEL_LABELS[type]}</p>
              <p className="mt-1 flex min-w-0 items-center gap-1.5 text-sm font-semibold leading-5 text-slate-600">
                <span
                  className={clsx(
                    "h-2 w-2 shrink-0 rounded-full",
                    publishTone === "active" && "bg-emerald-500",
                    publishTone === "warning" && "bg-amber-500",
                    publishTone === "muted" && "bg-slate-400",
                  )}
                />
                <span className="truncate">{publishChannelDetail(type, channel, accountEmail, accountEmailVerified)}</span>
              </p>
            </div>
          </div>
          {whatsappNeedsSetup ? (
            <button
              type="button"
              onClick={() => setWhatsappSetupOpen((open) => !open)}
              className={clsx(
                "shrink-0 rounded-md px-3 py-1.5 text-[10px] font-black uppercase tracking-wide shadow-sm transition",
                whatsappSetupOpen
                  ? "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  : "bg-violet-600 text-white hover:bg-violet-700",
              )}
            >
              {whatsappSetupOpen ? "Cancel" : "Set up"}
            </button>
          ) : (
            <PublishChannelStatusBadge tone={publishTone} />
          )}
        </div>
        {whatsappForm}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="min-w-0">
            <span className="block truncate text-sm font-black text-gray-900">{CHANNEL_LABELS[type]}</span>
            {channel ? <StateChip state={channel.consentState} /> : null}
          </div>
        </div>
        {channel && isActive ? <RemoveButton channelId={channel.id} disabled={isSubmitting} /> : null}
      </div>

      {isActive ? (
        <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-600" />
          {channel?.displayName || channel?.routeId}
        </p>
      ) : type === "slack" ? (
        <Form method="POST" className="mt-2">
          <input type="hidden" name="channelType" value="slack" />
          <button
            type="submit"
            name="intent"
            value="connect-channel"
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-950 px-3 py-1.5 text-xs font-black text-white shadow-sm transition hover:bg-black disabled:opacity-50"
          >
            Connect Slack
          </button>
          <p className="mt-1.5 text-[11px] font-medium text-gray-500">
            Uses the workspace account matching your sign-in email.
          </p>
        </Form>
      ) : type === "email" && isPending && channel ? (
        <div className="mt-2 space-y-2">
          <p className="text-xs font-semibold text-gray-600">
            Verification link sent to <span className="font-black">{channel.routeId}</span>. Check your inbox.
          </p>
          <Form method="POST" className="inline">
            <input type="hidden" name="channelId" value={channel.id} />
            <button
              type="submit"
              name="intent"
              value="resend-channel-otp"
              disabled={isSubmitting}
              className="text-xs font-bold text-violet-700 underline-offset-2 hover:underline disabled:opacity-50"
            >
              Resend email
            </button>
          </Form>
        </div>
      ) : type === "email" ? (
        <Form method="POST" className="mt-2 space-y-2">
          <input type="hidden" name="channelType" value="email" />
          <input
            type="email"
            name="routeId"
            placeholder={accountEmail || "name@example.com"}
            className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
          />
          <button
            type="submit"
            name="intent"
            value="connect-channel"
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
          >
            Send verification email
          </button>
          <p className="text-[11px] font-medium text-gray-500">Leave blank to use your account email.</p>
        </Form>
      ) : type === "whatsapp" && isPending && channel?.pendingVerification ? (
        <Form method="POST" className="mt-2 space-y-2">
          <input type="hidden" name="channelId" value={channel.id} />
          <p className="text-xs font-semibold text-gray-600">
            Code sent to <span className="font-black">{channel.routeId}</span> on WhatsApp.
          </p>
          <div className="flex items-center gap-2">
            <input
              name="code"
              inputMode="numeric"
              maxLength={6}
              placeholder="6-digit code"
              className="w-28 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold tracking-widest outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            />
            <button
              type="submit"
              name="intent"
              value="verify-channel-otp"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
            >
              Verify
            </button>
            <button
              type="submit"
              name="intent"
              value="resend-channel-otp"
              disabled={isSubmitting}
              className="text-xs font-bold text-violet-700 underline-offset-2 hover:underline disabled:opacity-50"
            >
              Resend
            </button>
          </div>
          {typeof channel.pendingVerification.attemptsRemaining === "number" &&
          channel.pendingVerification.attemptsRemaining < 5 ? (
            <p className="text-[11px] font-medium text-amber-700">
              {channel.pendingVerification.attemptsRemaining} attempts remaining.
            </p>
          ) : null}
        </Form>
      ) : type === "whatsapp" ? (
        <Form method="POST" className="mt-2 space-y-2">
          <input type="hidden" name="channelType" value="whatsapp" />
          <input
            type="tel"
            name="routeId"
            placeholder="+61 400 000 000"
            className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
          />
          <button
            type="submit"
            name="intent"
            value="connect-channel"
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
          >
            Send code
          </button>
          <p className="text-[11px] font-medium text-gray-500">
            International format. We&apos;ll send a 6-digit code on WhatsApp. Reply STOP any time to opt out.
          </p>
        </Form>
      ) : null}
    </div>
  );
}

export default function DailyReminderChannels({
  channels,
  isSubmitting,
  accountEmail,
  accountEmailVerified,
  error,
  errorIntent,
  variant = "settings",
}: {
  channels: VibeMarketingNotificationChannel[];
  isSubmitting: boolean;
  accountEmail?: string | null;
  accountEmailVerified?: boolean | null;
  error?: string | null;
  errorIntent?: string | null;
  variant?: "settings" | "publish";
}) {
  const channelError =
    error && errorIntent && (CHANNEL_INTENTS as readonly string[]).includes(errorIntent) ? error : null;
  return (
    <div className={clsx("space-y-2", variant === "publish" && "space-y-2.5")}>
      <p className="text-xs font-black uppercase tracking-wide text-gray-500">Notification channels</p>
      {channelError && variant !== "publish" ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700">
          {channelError}
        </p>
      ) : null}
      <ChannelRow type="slack" channel={pickChannel(channels, "slack")} isSubmitting={isSubmitting} variant={variant} />
      <ChannelRow
        type="email"
        channel={pickChannel(channels, "email")}
        isSubmitting={isSubmitting}
        accountEmail={accountEmail}
        accountEmailVerified={accountEmailVerified}
        variant={variant}
      />
      <ChannelRow
        type="whatsapp"
        channel={pickChannel(channels, "whatsapp")}
        isSubmitting={isSubmitting}
        variant={variant}
        channelError={variant === "publish" ? channelError : null}
      />
    </div>
  );
}

import { CheckCircle2, Link2, RefreshCw, TriangleAlert } from "lucide-react";
import type { RooAccountConnectionStatus } from "~/lib/roo-account-link";

export default function RooAccountConnectionField({
  connection,
  isChecking = false,
  onCheckConnection,
}: {
  connection: RooAccountConnectionStatus;
  isChecking?: boolean;
  onCheckConnection?: () => void;
}) {
  const connected = connection.status === "connected";

  return (
    <section
      className="border-t border-gray-200 pt-6"
      aria-labelledby="roo-account-heading"
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            connected
              ? "bg-emerald-100 text-emerald-700"
              : connection.status === "unavailable"
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-100 text-blue-700"
          }`}
        >
          {connected ? (
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          ) : connection.status === "unavailable" ? (
            <TriangleAlert className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Link2 className="h-5 w-5" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3
            id="roo-account-heading"
            className="text-sm font-black text-gray-950"
          >
            Roo account
          </h3>

          {connected ? (
            <div className="mt-1" aria-live="polite">
              <p className="text-sm font-bold text-emerald-800">Connected</p>
              <p className="mt-1 text-sm text-gray-600">
                {connection.slackDisplayName} will be used to recognise eligible
                monthly updates for future coworking bookings.
              </p>
              {connection.canLinkSeparateAccount ? (
                <p className="mt-2 text-sm text-gray-600">
                  Using a different MLAI account for monthly updates? In Slack,
                  send Roo{" "}
                  <code className="font-bold text-gray-900">link</code> and
                  follow the private confirmation link.
                </p>
              ) : null}
            </div>
          ) : (
            <div className="mt-1" aria-live="polite">
              <p className="text-sm font-bold text-gray-900">
                {connection.status === "unavailable"
                  ? "Connection status is temporarily unavailable"
                  : "Connect Roo to recognise your monthly updates"}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                In Slack, send Roo{" "}
                <code className="font-bold text-gray-900">link</code>, then
                follow the private confirmation link. You only need to do this
                once.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                You can continue setting up your company if you have not joined
                Slack yet.
              </p>
              <button
                type="button"
                onClick={onCheckConnection}
                disabled={isChecking}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-gray-800 hover:border-gray-400 hover:bg-gray-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`}
                  aria-hidden="true"
                />
                {isChecking ? "Checking..." : "Check connection"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

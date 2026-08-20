import type { ComponentProps, ReactNode } from "react";
import { Form } from "react-router";

export const GITHUB_CONNECT_ACTION = "/founder-tools/marketing/github-connect";

type GitHubConnectFormProps = {
  children: ReactNode;
  className?: string;
  forceReconnect?: boolean;
  githubRepo?: string;
  onSubmit?: ComponentProps<typeof Form>["onSubmit"];
  returnTo: string;
  target?: ComponentProps<typeof Form>["target"];
};

/**
 * Starts GitHub authorization with a real browser POST.
 *
 * The backend authenticates the SSR request with the browser cookie and requires
 * the browser-controlled Origin header for CSRF protection. `reloadDocument`
 * keeps this as a native document submission so the browser supplies Origin and
 * can follow the backend's cross-origin redirect to GitHub directly.
 */
export default function GitHubConnectForm({
  children,
  className,
  forceReconnect = false,
  githubRepo = "",
  onSubmit,
  returnTo,
  target,
}: GitHubConnectFormProps) {
  return (
    <Form
      method="POST"
      action={GITHUB_CONNECT_ACTION}
      reloadDocument
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onSubmit={onSubmit}
      className={className}
    >
      <input type="hidden" name="returnTo" value={returnTo} />
      {forceReconnect ? <input type="hidden" name="forceReconnect" value="true" /> : null}
      {githubRepo && !forceReconnect ? <input type="hidden" name="githubRepo" value={githubRepo} /> : null}
      {children}
    </Form>
  );
}

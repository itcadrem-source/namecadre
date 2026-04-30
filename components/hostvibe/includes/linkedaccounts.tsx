import type { ReactNode } from "react";

export type HostvibeLinkedProvider = {
  key: string;
  content: ReactNode;
};

export type HostvibeIncludeLinkedaccountsProps = {
  mode?: "linktable" | "providers";
  linkedAccountsUrl?: string;
  providers?: HostvibeLinkedProvider[];
  hideOnPreLink?: boolean;
  disableOnPreLink?: boolean;
  linkContext?: string;
  showCustomFeedback?: boolean;
  className?: string;
};

export default function HostvibeIncludeLinkedaccounts({
  mode = "providers",
  linkedAccountsUrl,
  providers = [],
  hideOnPreLink = true,
  disableOnPreLink = false,
  linkContext = "clientsecurity",
  showCustomFeedback,
  className,
}: HostvibeIncludeLinkedaccountsProps) {
  if (mode === "linktable") {
    return (
      <table id="tableLinkedAccounts" className={["table display data-driven", className || ""].filter(Boolean).join(" ")} data-ajax-url={linkedAccountsUrl} data-on-draw-rebind-confirmation-modal="true" data-lang-empty-table="No linked accounts">
        <thead>
          <tr className="text-center">
            <th>Provider</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="text-center">No linked accounts</td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (!providers.length) return null;

  return (
    <div className={className}>
      <div id="providerLinkingMessages" className="w-hidden" />
      <div className="providerPreLinking" data-link-context={linkContext} data-hide-on-prelink={hideOnPreLink ? 1 : 0} data-disable-on-prelink={disableOnPreLink ? 1 : 0}>
        <div className="social-signin-btns">{providers.map((provider) => <div key={provider.key}>{provider.content}</div>)}</div>
      </div>
      {!showCustomFeedback ? <div className="providerLinkingFeedback" /> : null}
    </div>
  );
}

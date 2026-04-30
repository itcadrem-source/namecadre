export type HostvibeIncludeVerifyemailProps = {
  show?: boolean;
  dismissUri?: string;
  resendUri?: string;
  emailSentLabel?: string;
  errorLabel?: string;
  className?: string;
};

export default function HostvibeIncludeVerifyemail({
  show = false,
  dismissUri,
  resendUri,
  emailSentLabel = "Email sent",
  errorLabel = "Error",
  className,
}: HostvibeIncludeVerifyemailProps) {
  if (!show) return null;

  return (
    <div className={["verification-banner email-verification", className || ""].filter(Boolean).join(" ")}>
      <div className="container">
        <div className="row">
          <div className="col-2 col-sm-1 order-3">
            <button id="btnEmailVerificationClose" type="button" className="btn close" data-uri={dismissUri}><span aria-hidden="true">&times;</span></button>
          </div>
          <div className="col-10 col-sm-7 col-md-8 order-1">
            <i className="fas fa-exclamation-triangle" /> <span className="text">Verify Email Address</span>
          </div>
          <div className="col-12 col-sm-4 col-md-3 order-sm-2 order-md-last">
            <button id="btnResendVerificationEmail" className="btn btn-default btn-sm btn-block btn-resend-verify-email btn-action" data-email-sent={emailSentLabel} data-error-msg={errorLabel} data-uri={resendUri}>
              <span className="loader w-hidden"><i className="fa fa-spinner fa-spin" /></span>
              Resend Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export type HostvibeIncludeCaptchaProps = {
  enabled?: boolean;
  containerClass?: string;
  homepage?: boolean;
  useRecaptcha?: boolean;
  recaptchaInvisible?: boolean;
  captchaForm?: string;
  filename?: string;
  registerPage?: boolean;
  systemUrl?: string;
  className?: string;
};

export default function HostvibeIncludeCaptcha({
  enabled = true,
  containerClass,
  homepage,
  useRecaptcha,
  recaptchaInvisible,
  captchaForm,
  filename,
  registerPage,
  systemUrl = "/",
  className,
}: HostvibeIncludeCaptchaProps) {
  if (!enabled) return null;

  const outerClass = [
    "text-center",
    containerClass ?? "row justify-content-center",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={outerClass}>
      {homepage ? (
        <div className="domainchecker-homepage-captcha">
          {useRecaptcha && !recaptchaInvisible ? (
            <div id="google-recaptcha-domainchecker" className="form-group recaptcha-container mx-auto" data-action={captchaForm} />
          ) : (
            <div className="col-md-8 mx-auto mb-3 mb-sm-0">
              <div id="default-captcha-domainchecker" className={`${filename === "domainchecker" ? "input-group input-group-box " : ""}text-center row pb-3`}>
                <p>Captcha verify</p>
                <div className="col-6 captchaimage">
                  <img id="inputCaptchaImage" data-src={`${systemUrl}includes/verifyimage.php`} src={`${systemUrl}includes/verifyimage.php`} alt="Captcha" />
                </div>
                <div className="col-6">
                  <input
                    id="inputCaptcha"
                    type="text"
                    name="code"
                    maxLength={6}
                    className={`form-control ${registerPage ? "float-left" : ""}`}
                    data-toggle="tooltip"
                    data-placement="right"
                    data-trigger="manual"
                    title="Required"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : useRecaptcha && !recaptchaInvisible ? (
        <div id="google-recaptcha-domainchecker" className="form-group recaptcha-container mx-auto" data-action={captchaForm} />
      ) : (
        <div className="col-md-8 mx-auto mb-3 mb-sm-0">
          <div id="default-captcha-domainchecker" className={`${filename === "domainchecker" ? "input-group input-group-box " : ""}text-center row pb-3`}>
            <p>Captcha verify</p>
            <div className="col-6 captchaimage">
              <img id="inputCaptchaImage" data-src={`${systemUrl}includes/verifyimage.php`} src={`${systemUrl}includes/verifyimage.php`} alt="Captcha" />
            </div>
            <div className="col-6">
              <input
                id="inputCaptcha"
                type="text"
                name="code"
                maxLength={6}
                className={`form-control ${registerPage ? "float-left" : ""}`}
                data-toggle="tooltip"
                data-placement="right"
                data-trigger="manual"
                title="Required"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export type HostvibeIncludeFullpageOverlayProps = {
  hidden?: boolean;
  message?: string;
  spinnerSrc?: string;
  className?: string;
};

export default function HostvibeIncludeFullpageOverlay({
  hidden = true,
  message = "",
  spinnerSrc = "/assets/img/overlay-spinner.svg",
  className,
}: HostvibeIncludeFullpageOverlayProps) {
  return (
    <div id="fullpage-overlay" className={[hidden ? "w-hidden" : "", className || ""].filter(Boolean).join(" ")}>
      <div className="outer-wrapper">
        <div className="inner-wrapper">
          <img src={spinnerSrc} alt="" />
          <br />
          <span className="msg">{message}</span>
        </div>
      </div>
    </div>
  );
}

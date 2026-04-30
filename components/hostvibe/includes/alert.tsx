import type { ReactNode } from "react";

export type HostvibeAlertTone = "info" | "success" | "warning" | "danger" | "error";

export type HostvibeIncludeAlertProps = {
  type?: HostvibeAlertTone;
  textCenter?: boolean;
  additionalClasses?: string;
  hidden?: boolean;
  id?: string;
  title?: ReactNode;
  message?: ReactNode;
  errorsHtml?: ReactNode;
  errors?: ReactNode[];
  className?: string;
};

const toneClass: Record<HostvibeAlertTone, string> = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  danger: "alert-danger",
  error: "alert-danger",
};

export default function HostvibeIncludeAlert({
  type = "info",
  textCenter,
  additionalClasses,
  hidden,
  id,
  title,
  message,
  errorsHtml,
  errors,
  className,
}: HostvibeIncludeAlertProps) {
  const hasErrorsList = Boolean(errors && errors.length);
  const classes = [
    "alert",
    toneClass[type],
    textCenter ? "text-center" : "",
    additionalClasses || "",
    className || "",
    hidden ? "w-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!hasErrorsList && !errorsHtml && !title && !message) {
    return null;
  }

  return (
    <div className={classes} id={id}>
      {hasErrorsList || errorsHtml ? (
        <>
          <strong>Errors</strong>
          <ul>
            {errors?.map((error, index) => <li key={index}>{error}</li>)}
            {errorsHtml}
          </ul>
        </>
      ) : (
        <>
          {title ? <h2>{title}</h2> : null}
          {message}
        </>
      )}
    </div>
  );
}

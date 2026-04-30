import type { ReactNode } from "react";

export type HostvibeIncludeModalAjaxProps = {
  title?: ReactNode;
  body?: ReactNode;
  submitLabel?: ReactNode;
  closeLabel?: ReactNode;
  loadingLabel?: ReactNode;
  id?: string;
  className?: string;
};

export default function HostvibeIncludeModalAjax({
  title,
  body = "Loading...",
  submitLabel = "Submit",
  closeLabel = "Close",
  loadingLabel = "Loading...",
  id = "modalAjax",
  className,
}: HostvibeIncludeModalAjaxProps) {
  return (
    <div className={["modal system-modal fade", className || ""].filter(Boolean).join(" ")} id={id} tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <div className="float-left loader"><i className="fas fa-circle-notch fa-spin" /> {loadingLabel}</div>
            <button type="button" className="btn btn-default" data-dismiss="modal">{closeLabel}</button>
            <button type="button" className="btn btn-primary modal-submit">{submitLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

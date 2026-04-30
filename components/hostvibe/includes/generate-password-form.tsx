export type HostvibeIncludeGeneratePasswordFormProps = {
  defaultLength?: number;
  minLength?: number;
  maxLength?: number;
  outputValue?: string;
  copyIconSrc?: string;
  className?: string;
};

export default function HostvibeIncludeGeneratePasswordForm({
  defaultLength = 12,
  minLength = 8,
  maxLength = 64,
  outputValue = "",
  copyIconSrc = "/assets/img/clippy.svg",
  className,
}: HostvibeIncludeGeneratePasswordFormProps) {
  return (
    <form action="#" id="frmGeneratePassword" className={className}>
      <div className="modal fade" id="modalGeneratePassword" tabIndex={-1} aria-labelledby="modalGeneratePasswordLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h4 className="modal-title" id="modalGeneratePasswordLabel">Generate Password</h4>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="alert alert-danger w-hidden" id="generatePwLengthError">Please enter a number between 8 and 64 for the password length</div>
              <div className="form-group row">
                <label htmlFor="inputGeneratePasswordLength" className="col-sm-4 col-form-label">Password Length</label>
                <div className="col-sm-8">
                  <input type="number" min={minLength} max={maxLength} defaultValue={defaultLength} step={1} className="form-control input-inline input-inline-100" id="inputGeneratePasswordLength" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputGeneratePasswordOutput" className="col-sm-4 col-form-label">Generated Password</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="inputGeneratePasswordOutput" defaultValue={outputValue} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8 offset-sm-4">
                  <button type="submit" className="btn btn-default btn-sm"><i className="fas fa-plus fa-fw" /> Generate new password</button>
                  <button type="button" className="btn btn-default btn-sm copy-to-clipboard" data-clipboard-target="#inputGeneratePasswordOutput">
                    <img src={copyIconSrc} alt="Copy to clipboard" width={15} /> Copy
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" id="btnGeneratePasswordInsert" data-clipboard-target="#inputGeneratePasswordOutput">Copy to clipboard & Insert</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

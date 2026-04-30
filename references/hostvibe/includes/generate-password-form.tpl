<form action="#" id="frmGeneratePassword">
      <div class="modal fade" id="modalGeneratePassword" tabindex="-1" aria-labelledby="modalGeneratePasswordLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h4 class="modal-title" id="modalGeneratePasswordLabel">Generate Password</h4>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="alert alert-danger w-hidden" id="generatePwLengthError">
                Please enter a number between 8 and 64 for the password length
              </div>
              <div class="form-group row">
                <label for="generatePwLength" class="col-sm-4 col-form-label">Password Length</label>
                <div class="col-sm-8">
                  <input type="number" min="8" max="64" value="12" step="1" class="form-control input-inline input-inline-100" id="inputGeneratePasswordLength" />
                </div>
              </div>
              <div class="form-group row">
                <label for="generatePwOutput" class="col-sm-4 col-form-label">Generated Password</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="inputGeneratePasswordOutput" />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-8 offset-sm-4">
                  <button type="submit" class="btn btn-default btn-sm">
                    <i class="fas fa-plus fa-fw"></i>
                    Generate new password
                  </button>
                  <button type="button" class="btn btn-default btn-sm copy-to-clipboard" data-clipboard-target="#inputGeneratePasswordOutput">
                    <img src="{$WEB_ROOT}/assets/img/clippy.svg" alt="Copy to clipboard" width="15" />
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" id="btnGeneratePasswordInsert" data-clipboard-target="#inputGeneratePasswordOutput">
                Copy to clipboard & Insert
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

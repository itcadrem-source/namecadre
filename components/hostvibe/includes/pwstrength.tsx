export type HostvibeIncludePwstrengthProps = {
  errorThreshold?: number;
  warningThreshold?: number;
  noDisable?: boolean;
};

export default function HostvibeIncludePwstrength({
  errorThreshold = 50,
  warningThreshold = 75,
  noDisable,
}: HostvibeIncludePwstrengthProps) {
  const script = `
jQuery("#inputNewPassword1").keyup(function() {
  var pwStrengthErrorThreshold = ${errorThreshold};
  var pwStrengthWarningThreshold = ${warningThreshold};

  var $newPassword1 = jQuery("#newPassword1");
  var pw = jQuery("#inputNewPassword1").val();
  var pwlength = Math.min(pw.length, 5);
  var numeric = Math.min(pw.length - pw.replace(/[0-9]/g, "").length, 3);
  var numsymbols = Math.min(pw.length - pw.replace(/\\W/g, "").length, 3);
  var upper = Math.min(pw.length - pw.replace(/[A-Z]/g, "").length, 3);
  var pwstrength = ((pwlength * 10) - 20) + (numeric * 10) + (numsymbols * 15) + (upper * 10);
  if (pwstrength < 0) pwstrength = 0;
  if (pwstrength > 100) pwstrength = 100;

  $newPassword1.removeClass('has-error has-warning has-success');
  jQuery("#inputNewPassword1").next('.form-control-feedback').removeClass('glyphicon-remove glyphicon-warning-sign glyphicon-ok');
  jQuery("#passwordStrengthBar .progress-bar").removeClass("progress-bar-danger progress-bar-warning progress-bar-success").css("width", pwstrength + "%").attr('aria-valuenow', pwstrength);

  if (pwstrength < pwStrengthErrorThreshold) {
    $newPassword1.addClass('has-error');
    jQuery("#inputNewPassword1").next('.form-control-feedback').addClass('glyphicon-remove');
    jQuery("#passwordStrengthBar .progress-bar").addClass("progress-bar-danger");
  } else if (pwstrength < pwStrengthWarningThreshold) {
    $newPassword1.addClass('has-warning');
    jQuery("#inputNewPassword1").next('.form-control-feedback').addClass('glyphicon-warning-sign');
    jQuery("#passwordStrengthBar .progress-bar").addClass("progress-bar-warning");
  } else {
    $newPassword1.addClass('has-success');
    jQuery("#inputNewPassword1").next('.form-control-feedback').addClass('glyphicon-ok');
    jQuery("#passwordStrengthBar .progress-bar").addClass("progress-bar-success");
  }
  validatePassword2();
});

function validatePassword2() {
  var password1 = jQuery("#inputNewPassword1").val();
  var password2 = jQuery("#inputNewPassword2").val();
  var $newPassword2 = jQuery("#newPassword2");

  if (password2 && password1 !== password2) {
    $newPassword2.removeClass('has-success').addClass('has-error');
    jQuery("#inputNewPassword2").next('.form-control-feedback').removeClass('glyphicon-ok').addClass('glyphicon-remove');
    jQuery("#inputNewPassword2Msg").html('<p class="help-block">Passwords do not match</p>');
    ${noDisable ? "" : "jQuery('input[type=\"submit\"]').attr('disabled', 'disabled');"}
  } else {
    if (password2) {
      $newPassword2.removeClass('has-error').addClass('has-success');
      jQuery("#inputNewPassword2").next('.form-control-feedback').removeClass('glyphicon-remove').addClass('glyphicon-ok');
      ${noDisable ? "" : "jQuery('.main-content input[type=\"submit\"]').removeAttr('disabled');"}
    } else {
      $newPassword2.removeClass('has-error has-success');
      jQuery("#inputNewPassword2").next('.form-control-feedback').removeClass('glyphicon-remove glyphicon-ok');
    }
    jQuery("#inputNewPassword2Msg").html('');
  }
}

jQuery(document).ready(function() {
  ${noDisable ? "" : "jQuery('.using-password-strength input[type=\"submit\"]').attr('disabled', 'disabled');"}
  jQuery("#inputNewPassword2").keyup(function() {
    validatePassword2();
  });
});`;

  return <script type="text/javascript" dangerouslySetInnerHTML={{ __html: script }} />;
}

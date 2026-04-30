export type HostvibeIncludeFooterInlineJsProps = {
  includeDevLicenseCleanup?: boolean;
  includePasswordFlow?: boolean;
  className?: string;
};

const devLicenseCleanupScript = `
jQuery(document).ready(function() {
  jQuery("strong").each(function() {
    const data = jQuery(this).html();
    if (data === "Dev License:") {
      jQuery(this).parent("div").remove();
    }
  });
  jQuery("p").each(function() {
    const data = jQuery(this).html();
    if (data === 'Powered by <a href="https://www.whmcs.com/" target="_blank">WHMCompleteSolution</a>') {
      jQuery(this).remove();
    }
  });
});`;

const passwordFlowScript = `
document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("click", function(event) {
    const btn = event.target.closest(".generate-password");
    if (!btn) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    const modalElement = document.getElementById("modalGeneratePassword");
    if (!modalElement || !window.bootstrap) return;

    const targetFields = btn.getAttribute("data-targetfields");
    if (targetFields) modalElement.setAttribute("data-targetfields", targetFields);

    if (window.jQuery) window.jQuery("#frmGeneratePassword").trigger("submit");

    const instance = bootstrap.Modal.getOrCreateInstance(modalElement);
    instance.show();
  }, true);
});`;

export default function HostvibeIncludeFooterInlineJs({
  includeDevLicenseCleanup = true,
  includePasswordFlow = true,
  className,
}: HostvibeIncludeFooterInlineJsProps) {
  return (
    <>
      {includeDevLicenseCleanup ? <script className={className} dangerouslySetInnerHTML={{ __html: devLicenseCleanupScript }} /> : null}
      {includePasswordFlow ? <script className={className} dangerouslySetInnerHTML={{ __html: passwordFlowScript }} /> : null}
    </>
  );
}

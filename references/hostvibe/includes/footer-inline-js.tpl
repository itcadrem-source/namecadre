<script>
      jQuery(document).ready(function() {
        jQuery("strong").each(function() {
          data = jQuery(this).html();
          if (data == "Dev License:") {
            jQuery(this).parent("div").remove();
          }
        });
        jQuery("p").each(function() {
          data = jQuery(this).html();
          if (
            data ==
            'Powered by <a href="https://www.whmcs.com/" target="_blank">WHMCompleteSolution</a>'
          ) {
            jQuery(this).remove();
          }
        });
      });
    </script>

    <script>
      document.addEventListener("DOMContentLoaded", function() {
        /* -------------------------------------------------
         * 1) Generate Password (Bootstrap 5 modal)
         * ------------------------------------------------- */
        document.addEventListener(
          "click",
          function(event) {
            const btn = event.target.closest(".generate-password");
            if (!btn) return;

            console.log('button clike');
            

            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();

            const modalElement = document.getElementById("modalGeneratePassword");
            if (!modalElement || !window.bootstrap) return;

            const targetFields = btn.getAttribute("data-targetfields");
            if (targetFields) {
              modalElement.setAttribute("data-targetfields", targetFields);
            }

            if (window.jQuery) {
              window.jQuery("#frmGeneratePassword").trigger("submit");
            }

            const instance = bootstrap.Modal.getOrCreateInstance(modalElement);
            instance.show();
          },
          true,
        );

        /* -------------------------------------------------
         * ELEMENTS
         * ------------------------------------------------- */
        const btnGeneratePasswordInsert = document.getElementById(
          "btnGeneratePasswordInsert",
        );
        const inputGeneratePasswordOutput = document.getElementById(
          "inputGeneratePasswordOutput",
        );
        const inputNewPassword1 = document.getElementById("inputNewPassword1");
        const inputNewPassword2 = document.getElementById("inputNewPassword2");
        const inputExistingPassword = document.getElementById(
          "inputExistingPassword",
        );
        const modalGeneratePassword = document.getElementById(
          "modalGeneratePassword",
        );
        const formUsingPasswordStrength = document.querySelector(
          ".using-password-strength",
        );

        /* -------------------------------------------------
         * Enable/Disable Submit
         * ------------------------------------------------- */
        function validateForm() {
          if (!formUsingPasswordStrength) return;
          const hasExisting =
            !inputExistingPassword || inputExistingPassword.value;
          const ok =
            inputNewPassword1 &&
            inputNewPassword2 &&
            inputNewPassword1.value &&
            inputNewPassword2.value &&
            hasExisting &&
            inputNewPassword1.classList.contains("is-valid") &&
            inputNewPassword2.classList.contains("is-valid");

          const submitBtn = formUsingPasswordStrength.querySelector(
            'input[type="submit"]',
          );

          if (ok) submitBtn.removeAttribute("disabled");
          else submitBtn.setAttribute("disabled", "disabled");
        }

        /* -------------------------------------------------
         * PASSWORD STRENGTH (Bootstrap 5)
         * ------------------------------------------------- */
        function checkPasswordStrength() {
          var pw = $("#inputNewPassword1").val();
          var pwlength = Math.min(pw.length, 5);
          var numeric = Math.min(
            pw.length - pw.replace(/[0-9]/g, "").length,
            3,
          );
          var numsymbols = Math.min(
            pw.length - pw.replace(/\W/g, "").length,
            3,
          );
          var upper = Math.min(pw.length - pw.replace(/[A-Z]/g, "").length, 3);

          var pwstrength =
            pwlength * 10 - 20 + numeric * 10 + numsymbols * 15 + upper * 10;
          pwstrength = Math.max(0, Math.min(pwstrength, 100));

          var bar = $("#passwordStrengthBar .progress-bar");

          bar
            .removeClass("bg-danger bg-warning bg-success")
            .css("width", pwstrength + "%");

          inputNewPassword1.classList.remove("is-valid", "is-invalid");

          if (pwstrength < 50) {
            bar.addClass("bg-danger");
            inputNewPassword1.classList.add("is-invalid");
          } else if (pwstrength < 75) {
            bar.addClass("bg-warning");
            inputNewPassword1.classList.add("is-invalid");
          } else {
            bar.addClass("bg-success");
            inputNewPassword1.classList.add("is-valid");
          }
        }

        /* -------------------------------------------------
         * PASSWORD MATCH (Bootstrap 5)
         * ------------------------------------------------- */
        function validatePassword2() {
          var p1 = $("#inputNewPassword1").val();
          var p2 = $("#inputNewPassword2").val();

          inputNewPassword2.classList.remove("is-valid", "is-invalid");

          if (p2 && p1 !== p2) {
            inputNewPassword2.classList.add("is-invalid");
            $("#inputNewPassword2Msg").html(
              '<div class="invalid-feedback d-block">Passwords do not match</div>',
            );
          } else if (p2 && p1 === p2) {
            inputNewPassword2.classList.add("is-valid");
            $("#inputNewPassword2Msg").html("");
          } else {
            $("#inputNewPassword2Msg").html("");
          }
        }

        /* -------------------------------------------------
         * GENERATE PASSWORD â†’ INSERT â†’ VALIDATE
         * ------------------------------------------------- */
        btnGeneratePasswordInsert.addEventListener("click", function() {
          const password = inputGeneratePasswordOutput.value;
          const targetFields =
            modalGeneratePassword &&
            modalGeneratePassword.getAttribute("data-targetfields");

          if (targetFields) {
            targetFields.split(",").forEach((fieldId) => {
              const field = document.getElementById(fieldId.trim());
              if (!field) return;
              field.value = password;
              field.dispatchEvent(new Event("keyup", { bubbles: true }));
            });
          } else {
            if (inputNewPassword1) inputNewPassword1.value = password;
            if (inputNewPassword2) inputNewPassword2.value = password;
          }

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(password).catch(() => {});
          } else {
            const helper = document.createElement("input");
            helper.value = password;
            document.body.appendChild(helper);
            helper.select();
            document.execCommand("copy");
            document.body.removeChild(helper);
          }

          // run validation
          if (inputNewPassword1 && inputNewPassword2) {
            checkPasswordStrength();
            validatePassword2();
            validateForm();
          }

          // close modal
          const instance = bootstrap.Modal.getInstance(modalGeneratePassword);
          if (instance) instance.hide();
        });

        /* -------------------------------------------------
         * KEYUP EVENTS
         * ------------------------------------------------- */
        $("#inputNewPassword1").on("keyup", function() {
          checkPasswordStrength();
          validatePassword2();
          validateForm();
        });

        $("#inputNewPassword2").on("keyup", function() {
          validatePassword2();
          validateForm();
        });

        if (formUsingPasswordStrength) {
          $(".using-password-strength input[type='submit']").attr(
            "disabled",
            "disabled",
          );
        }

        /* -------------------------------------------------
         * COPY BUTTON TOOLTIP
         * ------------------------------------------------- */
        const copyBtns = document.querySelectorAll(".copy-to-clipboard");

        copyBtns.forEach((btn) => {
          let tooltip = new bootstrap.Tooltip(btn, { trigger: "manual" });

          btn.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            let selector = btn.getAttribute("data-clipboard-target");
            let input = document.querySelector(selector);

            if (!input) return;

            const onSuccess = () => {
              btn.setAttribute("data-bs-original-title", "Copied!");
              tooltip.setContent({ ".tooltip-inner": "Copied!" });
              tooltip.show();
              setTimeout(() => tooltip.hide(), 1500);
            };

            const onFail = () => {
              btn.setAttribute("data-bs-original-title", "Failed!");
              tooltip.setContent({ ".tooltip-inner": "Failed!" });
              tooltip.show();
              setTimeout(() => tooltip.hide(), 1500);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(input.value).then(onSuccess).catch(onFail);
            } else {
              const helper = document.createElement("input");
              helper.value = input.value;
              document.body.appendChild(helper);
              helper.select();
              const ok = document.execCommand("copy");
              document.body.removeChild(helper);
              ok ? onSuccess() : onFail();
            }
          });
        });
      });
    </script>

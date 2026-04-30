<!-- Styling -->
{\WHMCS\View\Asset::fontCssInclude('open-sans-family.css')}
{\WHMCS\View\Asset::fontCssInclude('raleway-family.css')}


<link href="{$WEB_ROOT}/templates/twenty-one/css/all.min.css?v={$versionHash}" rel="stylesheet">
<link href="{$WEB_ROOT}/templates/twenty-one/css/theme.min.css?v={$versionHash}" rel="stylesheet">
<link href="{$WEB_ROOT}/assets/css/fontawesome-all.min.css?v={$versionHash}" rel="stylesheet">

{assetExists file="custom.css"}
<link href="{$__assetPath__}" rel="stylesheet">
{/assetExists}



<script type="text/javascript">
  var csrfToken = '{$token}',
    markdownGuide = '{lang|addslashes key="markdown.title"}',
    locale = '{if !empty($mdeLocale)}{$mdeLocale}{else}en{/if}',
    saved = '{lang|addslashes key="markdown.saved"}',
    saving = '{lang|addslashes key="markdown.saving"}',
    whmcsBaseUrl = "{\WHMCS\Utility\Environment\WebHelper::getBaseUrl()}";
  {if $captcha}{$captcha->getPageJs()}{/if}
</script>



<script src="{$WEB_ROOT}/templates/twenty-one/js/scripts.min.js?v={$versionHash}" type="text/javascript"></script>
<script type="text/javascript">
  (function() {
    if (!window.jQuery || !window.jQuery.fn) {
      return;
    }
    if (typeof window.jQuery.fn.popover !== 'function') {
      window.jQuery.fn.popover = function() {
        return this;
      };
    }
    if (typeof window.jQuery.fn.tooltip !== 'function') {
      window.jQuery.fn.tooltip = function() {
        return this;
      };
    }
  })();
</script>

<link rel="icon" href="{$WEB_ROOT}/templates/{$template}/images/favicon.png" type="image/png" sizes="16x16">
<link href="{$WEB_ROOT}/templates/{$template}/css/bootstrap.min.css" rel="stylesheet">




{if $templatefile == "viewticket" && !$loggedin}
  <meta name="robots" content="noindex" />
{/if}


<!-- Main Css -->
<link href="{$WEB_ROOT}/templates/{$template}/css/store.css?v={$versionHash}" rel="stylesheet">
<link href="{$WEB_ROOT}/templates/{$template}/css/main.css?v={$versionHash}" rel="stylesheet">
<link href="{$WEB_ROOT}/templates/{$template}/css/whmcs.css?v={$versionHash}" rel="stylesheet">

<form method="get" action="{$currentpagelinkback}">
  <div class="modal modal-localisation" id="modalChooseLanguage" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          {if $languagechangeenabled && count($locales) > 1}
            <h5 class="h5 pt-5 pb-3">{lang key='chooselanguage'}</h5>
            <div class="row item-selector">
              <input type="hidden" name="language" data-current="{$activeLocale.language}" value="{$activeLocale.language}" />
              {foreach $locales as $locale}
                <div class="col-6 col-md-4">
                  <a href="#" class="item{if $activeLocale.language == $locale.language} active{/if}" data-value="{$locale.language}">
                    {$locale.localisedName}
                  </a>
                </div>
              {/foreach}
            </div>
          {/if}
          {if !$loggedin && $multiCurrency}
            <p class="h5 pt-5 pb-3">{lang key='choosecurrency'}</p>
            <div class="row item-selector">
              <input type="hidden" name="currency" data-current="{$selectedCurrency}" value="">
              {foreach $multiCurrency as $currency}
                <div class="col-6 col-md-4">
                  <a href="#" class="item{if $selectedCurrency == $currency.id} active{/if}" data-value="{$currency.id}">
                    {$currency.prefix} {$currency.code}
                  </a>
                </div>
              {/foreach}
            </div>
          {/if}
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-default">{lang key='apply'}</button>
        </div>
      </div>
    </div>
  </div>
</form>

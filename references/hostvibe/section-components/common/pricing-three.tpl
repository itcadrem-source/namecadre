{* ===============================
   PRICING THREE (Bootstrap-only)
================================ *}
{assign var=section value=null}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

{assign var=activeTab value=""}
{if isset($section.tabs) && $section.tabs|@count gt 0}
  {foreach from=$section.tabs item=tab}
    {if !empty($tab.active)}
      {assign var=activeTab value=$tab.id}
    {/if}
  {/foreach}
  {if !$activeTab}
    {assign var=activeTab value=$section.tabs.0.id}
  {/if}
{/if}

<section class="section " id="pricing-three">
  <style>
    .tg-btn-primary {
      background-color: var(--tg-theme-primary) !important;
      border-color: var(--tg-theme-primary) !important;
      color: #fff !important;
    }

    #pricing-three .btn-outline-secondary:hover,
    #pricing-three .btn-outline-secondary:focus,
    #pricing-three .btn-outline-secondary:active,
    #pricing-three .btn-outline-secondary:active:focus {
      background-color: transparent !important;
      color: var(--bs-secondary) !important;
      border-color: var(--bs-secondary) !important;
      box-shadow: none !important;
    }

    .view-plan {
      padding: 10px 20px;
      border: 1px solid #3cd0ad;
      color: #3cd0ad;
      display: block;
      border-radius: 10px;
      text-align: center;
      width: 100%;
      max-width: 180px;
      margin: 20px auto 0;
      text-decoration: none;
      transition: all .3s;
    }

    .view-plan:hover {
      background-color: #3cd0ad;
      color: #fff;
    }
    .pricing-three-lead {
      max-width: 620px;
      margin-inline: auto;
      font-size: 15px;
    }

    .pricing-three-tab-btn {
      font-size: 16px;
    }

    .pricing-three-location-btn {
      font-size: 14px;
      line-height: 1.2;
    }

    .pricing-three-location-label {
      font-size: 18px;
    }

    .pricing-three-row {
      margin-inline: 0;
    }

    .pricing-three-card {
      box-shadow: -4px -3px 19px 2px hsl(0deg 0.76% 19.84% / 11%);
    }

    .pricing-three-cta {
      font-size: 18px;
      width: auto;
      min-height: 44px;
    }

    .pricing-three-divider {
      border-top-width: 1px;
      height: 0;
      border: solid black 1px;
    }

    @media (max-width: 767.98px) {
      .pricing-three-location-label {
        font-size: 16px;
      }

      .pricing-three-cta {
        width: 100%;
      }
    }
  </style>
  <div class="container section-py-140">
    <div class="text-center">
      <h1 class="fw-bold mb-2">
        {if isset($section.title)}{$section.title}{else}Host Package{/if}
      </h1>
      <p class="text-muted mb-0 pricing-three-lead">
        {if isset($section.description)}{$section.description}{else}Whether you're looking to create a website, blog
        or online store, we can get you started with a plan tailored to your specific needs.{/if}
      </p>
    </div>

    {if isset($section.tabs) && $section.tabs|@count gt 0}
    <div class="d-flex justify-content-center mt-40 mb-40">
      <div class="btn-group flex-wrap rounded-4" role="group" aria-label="Plan type">
        {foreach from=$section.tabs item=tab name=tabloop}
        <button type="button"
          class="btn btn-sm {if $tab.id == $activeTab}tg-btn-primary{else}btn-outline-secondary{/if} pt-2 pb-2 pt-2 pb-2 pl-3 pr-3 pricing-three-tab-btn"
          data-tab-btn="{$tab.id}">
          {$tab.label}
        </button>
        {/foreach}
      </div>
    </div>
    {/if}

    {if isset($section.locations)}
    {foreach from=$section.tabs item=tab}
    {assign var=tabId value=$tab.id}
    {assign var=activeLoc value=""}
    {if isset($section.locations[$tabId]) && $section.locations[$tabId]|@count gt 0}
    {foreach from=$section.locations[$tabId] item=loc}
    {if !empty($loc.active)}
    {assign var=activeLoc value=$loc.id}
    {/if}
    {/foreach}
    {if !$activeLoc}
    {assign var=activeLoc value=$section.locations[$tabId].0.id}
    {/if}
    {/if}

    {if isset($section.locations[$tabId]) && $section.locations[$tabId]|@count gt 0}
    <div class="text-center mb-4 {if $tabId != $activeTab}d-none{/if}" data-locations="{$tabId}">
      <h6 class="fw-bold mb-3">{if isset($section.locationTitle)}{$section.locationTitle}{else}Select Server
        Location{/if}
      </h6>
      <div class="d-inline-flex flex-wrap gap-2 justify-content-center mt-2">
        {foreach from=$section.locations[$tabId] item=loc}
        <button type="button"
          class="btn {if $loc.id == $activeLoc}tg-btn-primary{else}btn-outline-secondary{/if} d-flex align-items-center gap-2 rounded-3 pt-2 pb-2 pl-3 pr-3 pricing-three-location-btn"
          data-location="{$loc.id}" data-tab-loc="{$tabId}">
          {if !empty($loc.flag)}
          <img src="{$loc.flag}" alt="{$loc.label}" width="40" class="rounded-2" />
          {/if}
          <span class="text-uppercase fw-bold pricing-three-location-label">{$loc.label}</span>
        </button>
        {/foreach}
      </div>
    </div>
    {/if}
    {/foreach}
    {/if}

    {if isset($section.plans) && $section.plans|@count gt 0}
    <div class="row g-4 justify-content-center mt-5 pricing-three-row">
      {foreach from=$section.tabs item=tab}
      {assign var=tabId value=$tab.id}
      {assign var=activeLoc value="none"}
      {if isset($section.locations[$tabId]) && $section.locations[$tabId]|@count gt 0}
      {foreach from=$section.locations[$tabId] item=loc}
      {if !empty($loc.active)}
      {assign var=activeLoc value=$loc.id}
      {/if}
      {/foreach}
      {if $activeLoc == "none"}
      {assign var=activeLoc value=$section.locations[$tabId].0.id}
      {/if}
      {/if}

      {if isset($section.plans.$tabId)}

      {foreach from=$section.plans.$tabId key=locKey item=plans}
      {foreach from=$plans item=plan}
      {assign var=isDark value=false}
      {if isset($plan.theme) && $plan.theme == 'dark'}{assign var=isDark value=true}{/if}
      {if !isset($plan.theme) && !empty($plan.featured)}{assign var=isDark value=true}{/if}


      <div class="col-12 col-md-6 col-lg-3 {if $tabId != $activeTab || $locKey != $activeLoc}d-none{/if}"
        data-plan-tab="{$tabId}" data-plan-location="{$locKey}">
        <div class="card h-100 rounded-4 shadow-md border-0 pricing-three-card {if $isDark}bg-primary text-white{else}bg-white{/if}">
          <div class="card-body d-flex flex-column p-4">
            <h4 class="mb-3 fw-bold " style="color:{if $isDark}#FFF{else}var(--tg-theme-primary){/if};">
              {$plan.name}</h4>
            <div class="h2 mb-1 fw-bold" style="color:{if $isDark}#99fe98{else}#5DD1AE{/if};">
              {$plan.price}
            </div>
            {if !empty($plan.yearly)}
            <div class="small fw-semibold {if $isDark}text-white{else}text-muted{/if} mb-3">{$plan.yearly}</div>
            {/if}

            {if !empty($plan.ctaUrl)}
            <a class="btn {if $isDark}btn-light text-primary{else}tg-btn-primary{/if} d-inline-flex align-items-center gap-2 pt-2 pb-2 pl-3 pr-3 rounded-3 pricing-three-cta" href="{$plan.ctaUrl}" target="_blank"
              rel="noreferrer noopener">
              {if !empty($plan.ctaLabel)}{$plan.ctaLabel}{else}Get Started{/if}
              <i class="fa fa-arrow-right"></i>
            </a>
            {/if}

            <hr class="pricing-three-divider" />

            {if isset($plan.features) && $plan.features|@count gt 0}
            <ul class="list-unstyled mb-3">
              {foreach from=$plan.features item=feat}
              {assign var=labelLower value=$feat.label|lower}
              {assign var=iconClass value=""}
              {if isset($feat.icon) && $feat.icon}
              {assign var=iconClass value=$feat.icon}
              {/if}
              <li class="d-flex justify-content-between align-items-center mb-2">
                <div class="d-flex align-items-center gap-2">
                  <i class="{if !empty($feat.available)}{$iconClass}{else}fa fa-times-circle{/if}"
                    style="{if (!$isDark)}color: var(--tg-theme-primary);{else}color:#fff;{/if}"></i>

                  <span>{$feat.label}</span>
                </div>
                {if !empty($feat.info)}
                <i class="fa fa-info-circle" title="{$feat.info}"></i>
                {/if}
              </li>
              {/foreach}
            </ul>
            {/if}

            {if !empty($plan.viewUrl)}
            <a class="btn view-plan mt-auto rounded-3 fs-bold" href="{$plan.viewUrl}">
              {if !empty($plan.viewLabel)}{$plan.viewLabel}{else}View Plan{/if}
            </a>
            {/if}
          </div>
        </div>
      </div>
      {/foreach}
      {/foreach}
      {/if}
      {/foreach}
    </div>
    {/if}
  </div>
</section>

<script>
  (function() {
    var section = document.querySelector('#{if isset($section.sectionId)}{$section.sectionId}{else}pricing-three{/if}');
    if (!section) return;
    var tabButtons = section.querySelectorAll('[data-tab-btn]');
    var locationGroups = section.querySelectorAll('[data-locations]');
    var locationButtons = section.querySelectorAll('[data-location]');
    var planCards = section.querySelectorAll('[data-plan-tab]');

    function setActiveTab(tabId) {
      tabButtons.forEach(function(btn) {
        btn.classList.toggle('tg-btn-primary', btn.getAttribute('data-tab-btn') === tabId);
        btn.classList.toggle('btn-outline-secondary', btn.getAttribute('data-tab-btn') !== tabId);
      });
      locationGroups.forEach(function(grp) {
        grp.classList.toggle('d-none', grp.getAttribute('data-locations') !== tabId);
      });

      var activeLoc = null;
      locationButtons.forEach(function(btn) {
        if (btn.getAttribute('data-tab-loc') === tabId) {
          if (!activeLoc || btn.classList.contains('tg-btn-primary')) {
            activeLoc = btn.getAttribute('data-location');
          }
        }
      });
      if (!activeLoc) {
        var firstLoc = section.querySelector('[data-location][data-tab-loc="' + tabId + '"]');
        if (firstLoc) {
          activeLoc = firstLoc.getAttribute('data-location');
          firstLoc.classList.add('tg-btn-primary');
          firstLoc.classList.remove('btn-outline-secondary');
        }
      }
      setActiveLocation(tabId, activeLoc);
    }

    function setActiveLocation(tabId, locId) {
      locationButtons.forEach(function(btn) {
        if (btn.getAttribute('data-tab-loc') === tabId) {
          var active = btn.getAttribute('data-location') === locId;
          btn.classList.toggle('tg-btn-primary', active);
          btn.classList.toggle('btn-outline-secondary', !active);
        }
      });
      planCards.forEach(function(card) {
        var show = card.getAttribute('data-plan-tab') === tabId &&
          card.getAttribute('data-plan-location') === (locId || 'none');
        card.classList.toggle('d-none', !show);
      });
    }

    tabButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        setActiveTab(btn.getAttribute('data-tab-btn'));
      });
    });
    locationButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        setActiveLocation(btn.getAttribute('data-tab-loc'), btn.getAttribute('data-location'));
      });
    });
  })();
</script>

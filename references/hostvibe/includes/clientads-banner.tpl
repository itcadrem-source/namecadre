{if $loggedin && !empty($clientads_banner)}
  {if $clientads_banner.type === 'html' && !empty($clientads_banner.body_html)}
    <div class="mb-4" data-clientads-id="{$clientads_banner.id|intval}">
      {$clientads_banner.body_html nofilter}
    </div>
  {else}
    <div class="clientads-hero-wrap mb-4" data-clientads-id="{$clientads_banner.id|intval}">
      <div class="clientads-hero-card container-fluid">
        <div class="row g-0 align-items-stretch h-100">
          <div class="col-lg-7">
            <div class="clientads-hero-left h-100 d-flex flex-column justify-content-center">
              {if !empty($clientads_banner.badge_text)}
                <span class="clientads-badge">{$clientads_banner.badge_text|escape:'html'}</span>
              {/if}

              {if !empty($clientads_banner.title)}
                <h2 class="clientads-title">{$clientads_banner.title|escape:'html'}</h2>
              {/if}

              {if !empty($clientads_banner.cta_text) && !empty($clientads_banner.tracking_url)}
                <a href="{$clientads_banner.tracking_url|escape:'html'}" class="clientads-cta btn btn-light" {if !empty($clientads_banner.open_in_new_tab)}target="_blank" rel="noopener noreferrer"{/if}>
                  {$clientads_banner.cta_text|escape:'html'}
                </a>
              {/if}
            </div>
          </div>

          <div class="col-lg-5">
            <div class="clientads-hero-right h-100">
              {if !empty($clientads_banner.image_url)}
                <img src="{$clientads_banner.image_url|escape:'html'}" alt="{$clientads_banner.title|default:'Advertisement'|escape:'html'}" loading="lazy" />
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}

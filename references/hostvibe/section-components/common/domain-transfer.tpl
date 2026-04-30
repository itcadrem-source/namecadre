{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{assign var=hasImage value=false}
{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasButton value=false}
{assign var=showSection value=false}

{if $section && !empty($section.image)}{assign var=hasImage value=true}{/if}
{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && !empty($section.buttonLabel)}{assign var=hasButton value=true}{/if}
{if $hasImage || $hasTitle || $hasDescription || $hasButton}{assign var=showSection value=true}{/if}

{if $showSection}
<section class="domain__transfer-area section-py-140">
  <div class="container">
    <div class="domain__transfer-inner">
      <div class="row align-items-center justify-content-center">

        {if $hasImage}
          <div class="col-lg-5 order-0 order-lg-2">
            <div class="domain__transfer-img">
              <img src="{$section.image}" alt="img" />
            </div>
          </div>
        {/if}

        <div class="{if $hasImage}col-lg-7{else}col-lg-12{/if}">
          <div class="domain__transfer-content support__content-three">
            {if $hasTitle}
              <div class="section__title mb-15">
                <h2 class="title">{$section.title}</h2>
              </div>
            {/if}

            {if $hasDescription}<p>{$section.description}</p>{/if}

            {if $hasButton}
              <a href="{if !empty($section.buttonUrl)}{$section.buttonUrl}{else}#{/if}" class="tg-link-btn">
                <span class="link-effect">
                  <span class="effect-1">{$section.buttonLabel}</span>
                  <span class="effect-1">{$section.buttonLabel}</span>
                </span>
                <i class="fas fa-arrow-right"></i>
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/if}

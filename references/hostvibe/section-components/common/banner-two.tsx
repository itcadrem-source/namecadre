{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasImage value=false}
{assign var=hasList value=false}
{assign var=hasButton value=false}
{assign var=hasPriceText value=false}
{assign var=showSection value=false}

{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && !empty($section.image)}{assign var=hasImage value=true}{/if}
{if $section && isset($section.list) && is_array($section.list) && !empty($section.list)}{assign var=hasList value=true}{/if}
{if $section && !empty($section.buttonLabel)}{assign var=hasButton value=true}{/if}
{if $section && !empty($section.priceText)}{assign var=hasPriceText value=true}{/if}

{if $hasTitle || $hasDescription || $hasImage || $hasList || $hasButton || $hasPriceText}
  {assign var=showSection value=true}
{/if}

{if $showSection}
<section class="banner__area-two">
  <div class="container">
    <div class="row align-items-center">
      {if $hasImage}
        <div class="col-xl-7 col-lg-6 order-0 order-lg-2">
          <div class="banner__img-wrap-two">
            <img src="{$section.image}" alt="img" />
          </div>
        </div>
      {/if}
      <div class="{if $hasImage}col-xl-5 col-lg-6{else}col-12{/if}">
        <div class="banner__content-two">
          {if $hasTitle}
            <h2 class="title">
              {$section.title}
            </h2>
          {/if}
          {if $hasDescription}
            <p>
              {$section.description}
            </p>
          {/if}
          {if $hasList}
            <ul class="list-wrap">
              {foreach $section.list as $listItem}
                <li>
                  <i class="fas fa-check"></i>
                  {if is_array($listItem) && isset($listItem.label)}
                    {$listItem.label}
                  {else}
                    {$listItem}
                  {/if}
                </li>
              {/foreach}
            </ul>
          {/if}
          {if $hasButton || $hasPriceText}
            <div class="banner__btn">
              {if $hasButton}
                <a href="{if !empty($section.buttonUrl)}{$section.buttonUrl}{else}#{/if}" class="tg-btn">
                  <i class="fas fa-arrow-right"></i>
                  {$section.buttonLabel}
                </a>
              {/if}
              {if $hasPriceText}<span class="price">{$section.priceText}</span>{/if}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
{/if}




{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{assign var=hasSubtitle value=false}
{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasItems value=false}
{assign var=showSection value=false}

{if $section && !empty($section.subtitle)}{assign var=hasSubtitle value=true}{/if}
{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && isset($section.items) && is_array($section.items) && !empty($section.items)}{assign var=hasItems value=true}{/if}
{if $hasSubtitle || $hasTitle || $hasDescription || $hasItems}{assign var=showSection value=true}{/if}

{if $showSection}
<section class="hosting__area-two section-py-140">
  <div class="container">
    <div class="hosting__item-wrap-two">
      <div class="row gutter-y-24">

        {if $hasSubtitle || $hasTitle || $hasDescription}
          <div class="col-xl-6 col-lg-8">
            <div class="hosting__content-wrap">
              <div class="section__title mb-15">
                {if $hasSubtitle}<span class="sub-title">{$section.subtitle}</span>{/if}
                {if $hasTitle}<h2 class="title">{$section.title}</h2>{/if}
              </div>
              {if $hasDescription}<p>{$section.description}</p>{/if}
            </div>
          </div>
        {/if}

        {if $hasItems}
          {foreach $section.items as $item}
            {if is_array($item) && (!empty($item.title) || !empty($item.description) || !empty($item.icon))}
              <div class="col-xl-3 col-lg-4 col-sm-6">
                <div class="hosting__item-two">
                  <div class="hosting__item-top">
                    <div class="hosting__icon hosting__icon-two">
                      {if !empty($item.icon)}<img src="{$item.icon}" alt="icon" />{/if}
                    </div>
                    <div class="hosting__content-top">
                      {if !empty($item.title)}<h4 class="title">{$item.title}</h4>{/if}
                      {if !empty($item.subtitle)}<span>{$item.subtitle}</span>{/if}
                    </div>
                  </div>

                  <div class="hosting__content-two">
                    {if !empty($item.description)}<p>{$item.description}</p>{/if}

                    {if !empty($item.buttonLabel)}
                      <div class="hosting__btn">
                        <a href="{if !empty($item.buttonUrl)}{$item.buttonUrl}{else}#{/if}" class="tg-btn tg-btn-three">
                          {$item.buttonLabel}
                          <i class="fas fa-arrow-right"></i>
                        </a>
                      </div>
                    {/if}
                  </div>

                  {if !empty($item.badge)}
                    <span class="hosting__badge{if !empty($item.badgeClass)} {$item.badgeClass}{/if}">{$item.badge}</span>
                  {/if}
                </div>
              </div>
            {/if}
          {/foreach}
        {/if}

      </div>
    </div>
  </div>
</section>
{/if}

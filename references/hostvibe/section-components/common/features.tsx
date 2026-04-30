{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasItems value=false}
{assign var=hasShape value=false}
{assign var=showSection value=false}
{assign var=gridColumns value=4}
{assign var=itemColClass value="col-lg-4 col-sm-6 features-grid-col"}

{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && isset($section.items) && is_array($section.items) && !empty($section.items)}{assign var=hasItems value=true}{/if}
{if $section && !empty($section.shape)}{assign var=hasShape value=true}{/if}
{if $section && isset($section.columns) && ($section.columns|intval) gt 0}{assign var=gridColumns value=$section.columns|intval}{/if}
{if $gridColumns gt 9}{assign var=gridColumns value=9}{/if}
{if $hasTitle || $hasDescription || $hasItems}{assign var=showSection value=true}{/if}

<style>
@media (min-width: 1200px) {
  .features-grid-col {
    flex: 0 0 calc(100% / var(--features-cols, 4));
    max-width: calc(100% / var(--features-cols, 4));
  }
}
</style>

{if $showSection}
<section class="features__area-seven">
  <div class="container">

    {if $hasTitle || $hasDescription}
      <div class="row">
        <div class="col-lg-12">
          <div class="section__title white-title text-center mb-60">
            {if $hasTitle}<h2 class="title">{$section.title}</h2>{/if}
            {if $hasDescription}<p>{$section.description}</p>{/if}
          </div>
        </div>
      </div>
    {/if}

    {if $hasItems}
      <div class="features__inner-wrap-three">
        <div class="row" style="--features-cols: {$gridColumns};">
          {foreach $section.items as $item}
            {if is_array($item) && (!empty($item.title) || !empty($item.description))}
              <div class="{$itemColClass}">
                <div class="features__item-thirteen">
                  <div class="features__icon-three">
                    {if !empty($item.icon)}
                      <img src="{$item.icon}" alt="icon" />
                    {else}
                      <i class="{if !empty($item.iconClass)}{$item.iconClass}{else}fas fa-circle-check{/if}"></i>
                    {/if}
                  </div>
                  <div class="features__content-nine">
                    {if !empty($item.title)}<h4 class="title">{$item.title}</h4>{/if}
                    {if !empty($item.description)}<p>{$item.description}</p>{/if}
                  </div>
                </div>
              </div>
            {/if}
          {/foreach}
        </div>
      </div>
    {/if}
  </div>

  {if $hasShape}
    <div class="shape">
      <img src="{$section.shape}" alt="shape" />
    </div>
  {/if}
</section>
{/if}

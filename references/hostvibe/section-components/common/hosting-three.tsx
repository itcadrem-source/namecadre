<!-- hosting-area -->

{* ===============================
   SAFE SECTION INIT
================================ *}
{assign var=section value=null}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

{* Responsive column control via JSON: hostingThree.columns (1-9) *}
{assign var=gridColumns value=4}
{if $section && isset($section.columns) && ($section.columns|intval) gt 0}
  {assign var=gridColumns value=$section.columns|intval}
{/if}
{if $gridColumns gt 9}
  {assign var=gridColumns value=9}
{/if}
{assign var=itemColClass value="col-lg-4 col-sm-6 hosting-three-grid-col"}

<style>
@media (min-width: 1200px) {
  .hosting-three-grid-col {
    flex: 0 0 calc(100% / var(--hosting-three-cols, 4));
    max-width: calc(100% / var(--hosting-three-cols, 4));
  }
}
</style>

{* ===============================
   MASTER VISIBILITY CHECK
================================ *}
{assign var=showSection value=false}

{if $section
  && (
    !empty($section.title)
    || !empty($section.description)
    || (!empty($section.items) && is_array($section.items))
  )
}
  {assign var=showSection value=true}
{/if}

{* ===============================
   SECTION RENDER
================================ *}
{if $showSection}

<section class="hosting__area-three section-pb-140">
  <div class="container">
    <div class="hosting__inner-wrap">

      {* ===== TITLE ===== *}
      <div class="row">
        <div class="col-lg-12">
          <div class="section__title text-center mb-60">

            {if !empty($section.title)}
              <h2 class="title">{$section.title}</h2>
            {/if}

            {if !empty($section.description)}
              <p>{$section.description}</p>
            {/if}

          </div>
        </div>
      </div>

      {* ===== ITEMS ===== *}
      <div class="row" style="--hosting-three-cols: {$gridColumns};">
        {if !empty($section.items) && is_array($section.items)}

          {foreach $section.items as $item}
            {if !empty($item.title) || !empty($item.description)}
              <div class="{$itemColClass}">
                <div class="hosting__item-three">

                  <div class="hosting__icon-three">
                    {if !empty($item.icon)}
                      <img src="{$item.icon}" alt="icon" />
                    {/if}
                    {if !empty($item.iconClass)}
                      <i class="{$item.iconClass}" alt="icon"> </i>
                    {/if}
                  </div>

                  <div class="hosting__content-three">
                    {if !empty($item.title)}
                      <h4 class="title">{$item.title}</h4>
                    {/if}

                    {if !empty($item.description)}
                      <p>{$item.description}</p>
                    {/if}
                  </div>

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

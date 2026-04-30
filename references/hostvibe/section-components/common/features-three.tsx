<!-- features-area-three -->

{* ===============================
   SAFE SECTION INIT
================================ *}
{assign var=section value=null}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

{* ===============================
   MASTER VISIBILITY CHECK
================================ *}
{assign var=showSection value=false}

{if $section
  && (
    !empty($section.title)
    || !empty($section.description)
    || !empty($section.background)
    || (!empty($section.items) && is_array($section.items))
  )
}
  {assign var=showSection value=true}
{/if}

{* ===============================
   SECTION RENDER
================================ *}
{if $showSection}

<section class="features__area-three section-pb-140">
  <div class="container">

    <div
      class="features__inner-wrap-two"
      data-background="{if !empty($section.background)}{$section.background}{else}templates/hostvibe/images/features-bg.jpg{/if}"
    >

      {* ===== TITLE ===== *}
      {if !empty($section.title) || !empty($section.description)}
        <div class="row">
          <div class="col-lg-12">
            <div class="section__title text-center mb-50">

              {if !empty($section.title)}
                <h2 class="title">{$section.title}</h2>
              {/if}

              {if !empty($section.description)}
                <p>{$section.description}</p>
              {/if}

            </div>
          </div>
        </div>
      {/if}

      {* ===== ITEMS ===== *}
      <div class="row gutter-y-24">

        {if !empty($section.items) && is_array($section.items)}

          {foreach $section.items as $item}
            {if !empty($item.title) || !empty($item.description)}
              <div class="col-md-6">
                <div class="features__item-five{if !empty($item.class)} {$item.class}{/if}">

                  <div class="features__content-five">
                    {if !empty($item.title)}
                      <h3 class="title">{$item.title}</h3>
                    {/if}

                    {if !empty($item.description)}
                      <p>{$item.description}</p>
                    {/if}

                    {if !empty($item.buttonLabel)}
                      <a href="{if !empty($item.buttonUrl)}{$item.buttonUrl}{else}#{/if}" class="tg-btn">
                        {$item.buttonLabel}
                        <i class="fas fa-arrow-right"></i>
                      </a>
                    {/if}
                  </div>

                  {if !empty($item.shape)}
                    <div class="features__shape-three">
                      <img src="{$item.shape}" alt="shape" />
                    </div>
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

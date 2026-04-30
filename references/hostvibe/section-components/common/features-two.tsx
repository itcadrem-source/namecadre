<!-- features-area -->

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
    || (!empty($section.items) && is_array($section.items))
    || !empty($section.buttonLabel)
  )
}
  {assign var=showSection value=true}
{/if}

{* ===============================
   SECTION RENDER
================================ *}
{if $showSection}

<section class="features__area-two section-py-140 mb-100">
  <div class="container">

    {* ===== TITLE ===== *}
    {if !empty($section.title) || !empty($section.description)}
      <div class="row">
        <div class="col-lg-12">
          <div class="section__title white-title text-center mb-60">

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
    <div class="row">

      {if !empty($section.items) && is_array($section.items)}

        {foreach $section.items as $item}
          {if !empty($item.title) || !empty($item.description)}
            <div class="col-lg-4 col-sm-6">
              <div class="features__item-four">

                <div class="features__icon">
                  {if !empty($item.icon)}
                    <img src="{$item.icon}" alt="icon" />
                  {else}
                    <i class="fas fa-shield-alt"></i>
                  {/if}
                </div>

                <div class="features__content-four">
                  {if !empty($item.title)}
                    <h2 class="title">{$item.title}</h2>
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

    {* ===== BUTTON ===== *}
    {if !empty($section.buttonLabel)}
      <div class="get-started-btn text-center mt-20">
        <a href="{if !empty($section.buttonUrl)}{$section.buttonUrl}{else}#plans{/if}" class="tg-btn">
          {$section.buttonLabel}
        </a>
      </div>
    {/if}

  </div>
</section>

{/if}

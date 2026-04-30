{* ===============================
   SAFE SECTION INIT
================================ *}
{assign var=section value=null}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

{* ===============================
   MASTER VISIBILITY CHECK
   If nothing meaningful exists → hide section
================================ *}
{assign var=showSection value=false}
{assign var=hasImageOrShape value=false}

{if $section
  && (
    !empty($section.subtitle)
    || !empty($section.title)
    || !empty($section.description)
    || !empty($section.image)
    || (!empty($section.list) && is_array($section.list))
    || !empty($section.buttonLabel)
    || (!empty($section.shapes) && is_array($section.shapes))
    || !empty($section.shape1)
    || !empty($section.shape2)
    || !empty($section.shape3)
  )
}
  {assign var=showSection value=true}
{/if}

{if $section && (!empty($section.image) || (!empty($section.shapes) && is_array($section.shapes)) || !empty($section.shape1) || !empty($section.shape2) || !empty($section.shape3))}
  {assign var=hasImageOrShape value=true}
{/if}

{* ===============================
   SECTION RENDER
================================ *}
{if $showSection}

<section class="hosting__top-area">
  <div class="container">
    <div class="row align-items-end justify-content-center">

      {* ===============================
         LEFT CONTENT
      ================================ *}
      <div class="{if $hasImageOrShape}col-lg-6{else}col-lg-12{/if}">
        <div class="hosting__top-content">

          {if !empty($section.subtitle)}
            <h6 class="sub-title">
              {$section.subtitle}
            </h6>
          {/if}

          {if !empty($section.title)}
            <h2 class="title">
              {$section.title}
            </h2>
          {/if}

          {if !empty($section.description)}
            <p>
              {$section.description}
            </p>
          {/if}

          {* ===== Feature List ===== *}
          {if !empty($section.list) && is_array($section.list)}
            <ul class="list-wrap">
              {foreach $section.list as $item}
                {if is_array($item) && !empty($item.label)}
                  <li>
                    <i class="fas fa-check-circle"></i>
                    {$item.label}
                  </li>
                {/if}
              {/foreach}
            </ul>
          {/if}

          {* ===== Button ===== *}
          {if !empty($section.buttonLabel)}
            <a href="{if !empty($section.buttonUrl)}{$section.buttonUrl}{else}#plans{/if}" class="tg-btn">
              <i class="fas fa-arrow-right"></i>
              {$section.buttonLabel}
            </a>
          {/if}

        </div>
      </div>

      {* ===============================
         RIGHT IMAGE + SHAPES
      ================================ *}
      {if $hasImageOrShape}
        <div class="col-lg-6 col-md-9">
          <div class="hosting__top-images hosting__top-images-two">

            {* Main Image *}
            {if !empty($section.image)}
              <img src="{$section.image}" alt="hosting image" />
            {/if}

            {* Shapes *}
            {if (!empty($section.shapes) && is_array($section.shapes)) || !empty($section.shape1) || !empty($section.shape2) || !empty($section.shape3)}
              <div class="shape">
                {if !empty($section.shapes) && is_array($section.shapes)}
                  {foreach $section.shapes as $shape}
                    {if !empty($shape)}
                      <img src="{$shape}" alt="shape" />
                    {/if}
                  {/foreach}
                {else}
                  {if !empty($section.shape1)}<img src="{$section.shape1}" alt="shape" />{/if}
                  {if !empty($section.shape2)}<img src="{$section.shape2}" alt="shape" />{/if}
                  {if !empty($section.shape3)}<img src="{$section.shape3}" alt="shape" />{/if}
                {/if}
              </div>
            {/if}

          </div>
        </div>
      {/if}

    </div>
  </div>
</section>

{/if}

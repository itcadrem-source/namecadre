<!-- hosting-area -->

<style>
  /* Hosting icons - outline & size */
  .hosting__icon i {
    font-size: 56px;
    font-weight: 100;
    /* outline look */
    color: currentColor;
  }

  /* Force Font Awesome outline (regular) */
  .hosting__icon .fas {
    font-weight: 100;
  }

  .hosting__icon .far {
    font-weight: 100;
  }

  .hosting-home-cta {
    width: auto;
    min-height: 44px;
  }

  @media (max-width: 575.98px) {
    .hosting-home-cta {
      width: 100%;
    }
  }
</style>

{assign var=section value=null}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

<section class="hosting__area section-py-140" id="hosting">
  <div class="container">
    <div class="row align-items-end">

      <!-- TITLE -->
      <div class="col-lg-12">
        <div class="section__title mb-40">
          <h2 class="title text-center">
            {if isset($section.title) && $section.title}
              {$section.title}
            {/if}
          </h2>
        </div>
      </div>

      <!-- SLIDER NAV -->


    </div>

    <div class="hosting__item-wrap">
      <div class="swiper-container hosting-active fix">
        <div class="swiper-wrapper">

          {if !empty($section.items)}
            {foreach $section.items as $item}
              <div class="swiper-slide">
                <div class="hosting__item{if isset($item.class)} {$item.class}{/if}">

                  <!-- ICON -->
                  <div class="hosting__icon">
                    {if isset($item.icon)}
                      <i class="{$item.icon}"></i>
                    {else}
                      <i class="fas fa-server"></i>
                    {/if}
                  </div>

                  <!-- CONTENT -->
                  <div class="hosting__content">
                    <h3 class="title">
                      <a href="{if isset($item.link)}{$item.link}{elseif isset($item.url)}{$item.url}{else}#{/if}">
                        {if isset($item.title)}{$item.title}{else}Hosting{/if}
                      </a>
                    </h3>

                    <p>
                      {if isset($item.description)}{$item.description}{/if}
                    </p>

                    <div class="hosting__btn text-center ">
                      <a href="{if isset($item.button.url)}{$item.button.url}{elseif isset($item.buttonUrl)}{$item.buttonUrl}{elseif isset($item.link)}{$item.link}{elseif isset($item.url)}{$item.url}{else}#{/if}"
                        class="tg-btn tg-btn-three border border border-primary hosting-home-cta">
                        {if isset($item.button.label)}{$item.button.label}
                        {elseif isset($item.buttonLabel)}{$item.buttonLabel}
                        {else}See
                        More{/if}
                        <i class="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>

                  {if isset($item.tag) && $item.tag  != ''}
                    <span class="hosting__tag">{$item.tag}</span>
                  {/if}

                </div>
              </div>
            {/foreach}

          {/if}

        </div>

      </div>
      <div class="hosting-pagination mt-3 text-center"></div>
    </div>
  </div>
</section>



<!-- hosting-area-end -->

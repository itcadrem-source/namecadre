{assign var=section value=null}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasItems value=false}
{assign var=showSection value=false}

{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && isset($section.items) && is_array($section.items) && !empty($section.items)}{assign var=hasItems value=true}{/if}
{if $hasTitle || $hasDescription || $hasItems}{assign var=showSection value=true}{/if}

<style>
.testimonial__nav-two i {
  font-size: 18px;
}

.testimonial__bottom .thumb i {
  font-size: 42px;
}
/* ================================
   TESTIMONIAL EQUAL HEIGHT (MODERN)
   ================================ */

.testimonial-active-two .swiper-wrapper {
  align-items: stretch;
}

.testimonial-active-two .swiper-slide {
  display: flex;
  height: auto;
}

/* Card */
.testimonial__item-three {
  display: flex;
  flex-direction: column;
  height: 100%;

  /* Responsive fixed height */
  min-height: clamp(320px, 35vw, 420px);
  border-radius: 12px;
}

/* Rating */
.testimonial__item-three .rating {
  margin-bottom: 15px;
}

/* Content grows evenly */
.testimonial__item-three p,
.testimonial__item-three .testimonial__content {
  flex-grow: 1;
}

/* Author always bottom aligned */
.testimonial__item-three .testimonial__bottom,
.testimonial__item-three .testimonial__author {
  margin-top: auto;
}

</style>
<!-- testimonial-area -->
{if $showSection}
<section class="testimonial__area-three section-pb-140">
  <div class="container">

    <!-- HEADER -->
    <div class="row align-items-end">
      <div class="col-md-8">
        {if $hasTitle || $hasDescription}
          <div class="section__title mb-50">
            {if $hasTitle}<h2 class="title">{$section.title}</h2>{/if}
            {if $hasDescription}<p>{$section.description}</p>{/if}
          </div>
        {/if}
      </div>

      <!-- NAV -->
      <div class="{if $hasItems}col-md-4{else}d-none{/if}">
        <div class="testimonial__nav-two mb-50">
          {if $hasItems}
            <button class="testimonial-button-prev" aria-label="Previous">
              <i class="fas fa-arrow-left"></i>
            </button>
            <button class="testimonial-button-next" aria-label="Next">
              <i class="fas fa-arrow-right"></i>
            </button>
          {/if}
        </div>
      </div>
    </div>

    <!-- SLIDER -->
    {if $hasItems}
      <div class="swiper fix testimonial-active-two">
        <div class="swiper-wrapper">
          {foreach $section.items as $item}
            <div class="swiper-slide">
              <div class="testimonial__item testimonial__item-three">

                <!-- RATING -->
                <div class="rating">
                  {if isset($item.ratingImage)}
                    <img src="{$WEB_ROOT}/{$item.ratingImage}" alt="rating" />
                  {else}
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  {/if}
                </div>

                <!-- QUOTE -->
                <p>
                  {if isset($item.quote)}
                    {$item.quote}
                  {/if}
                </p>

                <!-- AUTHOR -->
                <div class="testimonial__bottom">
                  <div class="thumb">
                    {if isset($item.image)}
                      <img src="{$WEB_ROOT}/{$item.image}" alt="author" />
                    {else}
                      <i class="far fa-user-circle"></i>
                    {/if}
                  </div>
                  <div class="content">
                    <h4 class="title">{if isset($item.name)}{$item.name}{/if}</h4>
                    <span>{if isset($item.role)}{$item.role}{/if}</span>
                  </div>
                </div>

              </div>
            </div>
          {/foreach}
        </div>
      </div>
    {/if}

    <!-- TRUST BADGE -->
    {if $hasItems}
      <div class="testimonial__bottom-content">
        <img src="{$WEB_ROOT}/templates/{$template}/images/trustpilot.png" alt="Trustpilot" />
        <p>4.6 out of 5 stars based on 120,456 <span>reviews</span></p>
      </div>
    {/if}

  </div>
</section>
{/if}

<!-- testimonial-area-end -->

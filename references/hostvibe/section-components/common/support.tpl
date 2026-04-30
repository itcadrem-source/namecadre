<!-- support-area -->
{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasImage value=false}
{assign var=hasItems value=false}
{assign var=showSection value=false}

{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && !empty($section.image)}{assign var=hasImage value=true}{/if}
{if $section && isset($section.items) && is_array($section.items) && !empty($section.items)}{assign var=hasItems value=true}{/if}

{if $hasTitle || $hasDescription || $hasImage || $hasItems}
  {assign var=showSection value=true}
{/if}

<style>
  .support__list-item .icon i {
    font-size: 30px;
    line-height: 1;
  }
</style>

{if $showSection}
  <section class="support__area support__area-two">
    <div class="container">
      <div class="support__inner-wrap-two has-animation">
        <div class="row align-items-center">
          {if $hasTitle || $hasDescription}
            <div class="section__title mb-40">
              {if $hasTitle}
                <h2 class="title {if isset($section.titleClass)}{$section.titleClass}{/if}">{$section.title}</h2>
              {/if}
              {if $hasDescription}
                <p>{$section.description}</p>
              {/if}
            </div>
          {/if}

          {if $hasImage}
            <div class="col-lg-5 order-0 order-lg-2">
              <div class="support__thumb support__thumb-two">
                <img src="{$section.image}" alt="img" />
              </div>
            </div>
          {/if}

          <div class="{if $hasImage}col-lg-7{else}col-lg-12{/if}">
            <div class="support__content support__content-two">



              {if $hasItems}
                <div class="support__list-wrap">
                  {foreach $section.items as $item}
                    {if is_array($item) && (!empty($item.title) || !empty($item.description) || !empty($item.icon))}
                      <div class="support__list-item support__list-item-two">
                        <div class="icon">
                          <i class="{if !empty($item.icon)}{$item.icon}{else}fa-regular fa-circle-question{/if}"></i>
                        </div>
                        <div class="content">
                          {if !empty($item.title)}<h5 class="title">{$item.title}</h5>{/if}
                          {if !empty($item.description)}<p>{$item.description}</p>{/if}
                        </div>
                      </div>
                    {/if}
                  {/foreach}
                </div>
              {/if}

              <a href="{if $section && !empty($section.buttonUrl)}{$section.buttonUrl}{else}{$WEB_ROOT}/contact.php{/if}"
                class="tg-link-btn">
                <span class="link-effect">
                  <span class="effect-1">{if $section && !empty($section.buttonLabel)}{$section.buttonLabel}{/if}</span>
                  <span class="effect-1">{if $section && !empty($section.buttonLabel)}{$section.buttonLabel}{/if}</span>
                </span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
{/if}
<!-- support-area-end -->
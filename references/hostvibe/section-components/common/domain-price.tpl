{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasItems value=false}
{assign var=showSection value=false}

{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && isset($section.items) && is_array($section.items) && !empty($section.items)}{assign var=hasItems value=true}{/if}
{if $hasTitle || $hasDescription || $hasItems}{assign var=showSection value=true}{/if}

{if $showSection}
<section class="domain__price-area section-pb-140">
  <div class="container">

    {if $hasTitle || $hasDescription}
      <div class="row">
        <div class="col-lg-12">
          <div class="section__title text-center mb-60">
            {if $hasTitle}<h2 class="title">{$section.title}</h2>{/if}
            {if $hasDescription}<p>{$section.description}</p>{/if}
          </div>
        </div>
      </div>
    {/if}

    {if $hasItems}
      <div class="domain__price-item-wrap">
        <div class="row gutter-30">
          {foreach $section.items as $item}
            {if is_array($item) && (!empty($item.name) || !empty($item.price))}
              <div class="col-xl-3 col-lg-4 col-6">
                <div class="domain__price-item">
                  {if !empty($item.name)}<h3 class="name">{$item.name}</h3>{/if}
                  {if !empty($item.introLabel)}<span class="intro-price">{$item.introLabel}</span>{/if}
                  {if !empty($item.price)}
                    <h2 class="price">{$item.price}{if !empty($item.badge)} <span>{$item.badge}</span>{/if}</h2>
                  {/if}
                  {if !empty($item.buttonLabel)}
                    <div class="domain__price-btn">
                      <a href="{if !empty($item.buttonUrl)}{$item.buttonUrl}{else}#{/if}" class="tg-btn">{$item.buttonLabel}</a>
                    </div>
                  {/if}
                </div>
              </div>
            {/if}
          {/foreach}
        </div>
      </div>
    {/if}

  </div>
</section>
{/if}

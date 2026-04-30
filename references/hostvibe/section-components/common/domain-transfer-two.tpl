{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{assign var=hasImage value=false}
{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasItems value=false}
{assign var=showSection value=false}

{if $section && !empty($section.image)}{assign var=hasImage value=true}{/if}
{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && isset($section.items) && is_array($section.items) && !empty($section.items)}{assign var=hasItems value=true}{/if}
{if $hasImage || $hasTitle || $hasDescription || $hasItems}{assign var=showSection value=true}{/if}

{if $showSection}
<section class="domain__transfer-area-two section-py-120">
  <div class="container">
    <div class="row align-items-center justify-content-center">

      {if $hasImage}
        <div class="col-lg-5 order-0 order-lg-2">
          <div class="domain__transfer-img-two">
            <img src="{$section.image}" alt="img" />
          </div>
        </div>
      {/if}

      <div class="{if $hasImage}col-lg-7{else}col-lg-12{/if}">
        <div class="domain__transfer-content-two support__content-three">

          {if $hasTitle || $hasDescription}
            <div class="section__title mb-30">
              {if $hasTitle}<h2 class="title">{$section.title}</h2>{/if}
              {if $hasDescription}<p>{$section.description}</p>{/if}
            </div>
          {/if}

          {if $hasItems}
            <div class="domain__transfer-list">
              {foreach $section.items as $item}
                {if is_array($item) && (!empty($item.title) || !empty($item.description))}
                  <div class="domain__transfer-list-item">
                    {if !empty($item.title)}<h4 class="title">{$item.title}</h4>{/if}
                    {if !empty($item.description)}<p>{$item.description}</p>{/if}
                  </div>
                {/if}
              {/foreach}
            </div>
          {/if}

        </div>
      </div>
    </div>
  </div>
</section>
{/if}


{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasItems value=false}
{assign var=hasImage value=false}

{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && !empty($section.image)}{assign var=hasImage value=true}{/if}

{if $section && !empty($section.items) && is_array($section.items)}
  {foreach $section.items as $item}
    {if !empty($item.title) || !empty($item.description) || !empty($item.iconClass)}
      {assign var=hasItems value=true}
    {/if}
  {/foreach}
{/if}

{assign var=showSection value=false}
{if $hasTitle || $hasDescription || $hasItems || $hasImage}
  {assign var=showSection value=true}
{/if}

{if $showSection}
<section class="support__area-three section-py-140 mb-100">
  <div class="container">
    <div class="support__inner-wrap-three">
      <div class="row align-items-center">

        <div class="col-lg-5 order-0 order-lg-2">
          <div class="support__thumb support__thumb-three">
            <img
              src="{if $hasImage}{$section.image}{else}/templates/hostvibe/images/kvm-deploy.png{/if}"
              alt="img"
              data-aos="fade-left"
              data-aos-delay="200"
            />
          </div>
        </div>

        <div class="col-lg-7">
          <div class="support__content support__content-three">

            {if $hasTitle || $hasDescription}
              <div class="section__title mb-30">
                {if $hasTitle}
                  <h2 class="title">{$section.title}</h2>
                {/if}
                {if $hasDescription}
                  <p>{$section.description}</p>
                {/if}
              </div>
            {/if}

            {if $hasItems}
              <div class="support__list-wrap">
                {foreach $section.items as $item}
                  {if !empty($item.title) || !empty($item.description) || !empty($item.iconClass)}
                    <div class="support__list-item support__list-item-three">
                      <div class="icon">
                        <i class="{if !empty($item.iconClass)}{$item.iconClass}{else}fa-solid fa-circle-check{/if}"></i>
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

          </div>
        </div>

      </div>
    </div>
  </div>
</section>
{/if}


<!-- faq-area -->
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
<section class="faq__area-two section-py-140">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="faq__inner-wrap-two">

          {if $hasTitle || $hasDescription}
            <div class="section__title text-center mb-60">
              {if $hasTitle}<h2 class="title">{$section.title}</h2>{/if}
              {if $hasDescription}<p>{$section.description}</p>{/if}
            </div>
          {/if}

          {if $hasItems}
            <div class="faq__wrap faq__wrap-two">
              <div class="accordion" id="accordionExample">

                {foreach $section.items as $idx => $item}
                  {assign var=collapseId value="faq-collapse-"|cat:$idx}

                  <div class="accordion-item{if $idx == 0} active{/if}">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button{if $idx != 0} collapsed{/if}"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#{$collapseId}"
                        aria-expanded="{if $idx == 0}true{else}false{/if}"
                        aria-controls="{$collapseId}"
                      >
                        {if !empty($item.question)}{$item.question}{/if}
                      </button>
                    </h2>

                    <div
                      id="{$collapseId}"
                      class="accordion-collapse collapse{if $idx == 0} show{/if}"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>{if !empty($item.answer)}{$item.answer}{/if}</p>
                      </div>
                    </div>
                  </div>
                {/foreach}
              </div>
            </div>
          {/if}

          <div class="faq__bottom-content">
            <p>
              {if $section && !empty($section.bottomText)}{$section.bottomText}{else}Still have questions?{/if}
              <a href="{if $section && !empty($section.bottomLinkUrl)}{$section.bottomLinkUrl}{else}{$WEB_ROOT}/submitticket.php{/if}" class="tg-link-btn">
                <span class="link-effect">
                  <span class="effect-1">{if $section && !empty($section.bottomLinkLabel)}{$section.bottomLinkLabel}{else}Contact our support team{/if}</span>
                  <span class="effect-1">{if $section && !empty($section.bottomLinkLabel)}{$section.bottomLinkLabel}{else}Contact our support team{/if}</span>
                </span>
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
{/if}
<!-- faq-area-end -->

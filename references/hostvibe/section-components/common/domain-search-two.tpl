{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{assign var=hasTitle value=false}
{assign var=hasDescription value=false}
{assign var=hasForm value=false}
{assign var=hasTlds value=false}
{assign var=hasList value=false}
{assign var=showSection value=false}

{if $section && !empty($section.title)}{assign var=hasTitle value=true}{/if}
{if $section && !empty($section.description)}{assign var=hasDescription value=true}{/if}
{if $section && isset($section.tlds) && is_array($section.tlds) && !empty($section.tlds)}{assign var=hasTlds value=true}{/if}
{if $section && isset($section.list) && is_array($section.list) && !empty($section.list)}{assign var=hasList value=true}{/if}
{if $section && (!empty($section.formAction) || !empty($section.placeholder) || !empty($section.buttonLabel) || $hasTlds)}{assign var=hasForm value=true}{/if}
{if $hasTitle || $hasDescription || $hasForm || $hasList}{assign var=showSection value=true}{/if}

{if $showSection}
<style>
  .domain-search-two-icon {
    position: absolute;
    left: 24px;
    top: 50%;
    font-size: 25px;
    transform: translateY(-50%);
    color: var(--tg-color-gray-4);
  }
</style>
<section
  class="domain__search-area-two has-animation domain__search-bg"
  data-background="{if !empty($section.background)}{$section.background}{/if}"
  {if !empty($section.sectionId)}id="{$section.sectionId}"{/if}
>
  <div class="container">
    <div class="domain__inner-wrap-two">

      {if $hasTitle || $hasDescription}
        <div class="section__title text-center mb-40">
          {if $hasTitle}<h2 class="title">{$section.title}</h2>{/if}
          {if $hasDescription}<p>{$section.description}</p>{/if}
        </div>
      {/if}

      {if $hasForm}
        <div class="domain__search-wrap domain__search-wrap-two{if !empty($section.wrapClass)} {$section.wrapClass}{/if}">
          <form class="domain__search-form domain__search-form-two" method="post" action="{if !empty($section.formAction)}{$section.formAction}{else}domainchecker.php{/if}">
            <input type="hidden" name="token" value="{if !empty($section.token)}{$section.token}{else}{$token}{/if}" />
            <i class="far fa-search domain-search-two-icon"></i>
            <input type="text" name="sld" id="domainsearch" placeholder="{if !empty($section.placeholder)}{$section.placeholder}{else}eg. example.com{/if}" />
            <div class="domain__search-action">
              <select class="select" name="tld">
                {if $hasTlds}
                  {foreach $section.tlds as $tld}
                    {if !empty($tld)}<option>{$tld}</option>{/if}
                  {/foreach}
                {/if}
              </select>
              <button type="submit" class="tg-btn">{if !empty($section.buttonLabel)}{$section.buttonLabel}{else}Search Domain{/if}</button>
            </div>
          </form>
        </div>
      {/if}

      {if $hasList}
        <div class="domain__list">
          <ul class="list-wrap">
            {foreach $section.list as $item}
              {if !empty($item)}<li>{$item}</li>{/if}
            {/foreach}
          </ul>
        </div>
      {/if}

      {if !empty($section.bottomText) || !empty($section.bottomLabel)}
        <div class="domain__bottom-content">
          {if !empty($section.bottomText)}<p>{$section.bottomText}</p>{/if}
          {if !empty($section.bottomLabel)}
            <a href="{if !empty($section.bottomUrl)}{$section.bottomUrl}{else}#{/if}" class="tg-link-btn">
              <span class="link-effect">
                <span class="effect-1">{$section.bottomLabel}</span>
                <span class="effect-1">{$section.bottomLabel}</span>
              </span>
            </a>
          {/if}
        </div>
      {/if}
    </div>
  </div>

  {if !empty($section.shape1) || !empty($section.shape2) || !empty($section.shape3)}
    <div class="domain__shape domain__shape-two">
      {if !empty($section.shape1)}<img src="{$section.shape1}" alt="shape" />{/if}
      {if !empty($section.shape2)}<img src="{$section.shape2}" alt="shape" />{/if}
      {if !empty($section.shape3)}<img src="{$section.shape3}" alt="shape" />{/if}
    </div>
  {/if}
</section>
{/if}

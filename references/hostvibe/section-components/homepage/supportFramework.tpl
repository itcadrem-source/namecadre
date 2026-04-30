{* ===============================
   SUPPORT FRAMEWORK (Homepage)
   Dynamic via JSON (sectionId/title/description/icons[])
================================ *}
{assign var=section value=null}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

{assign var=sectionId value='supportFramework'}
{if isset($section.sectionId) && $section.sectionId}{assign var=sectionId value=$section.sectionId}{/if}

<style>
  #{$sectionId} .support-framework-icon {
    max-height: 70px;
    width: auto;
  }

  @media (max-width: 575.98px) {
    #{$sectionId} .support-framework-icon {
      max-height: 56px;
    }
  }
</style>

<section id="{$sectionId}" class="section section-py-140">
  <div class="container">
    <div class="text-center mb-4 mb-md-5">
      <h1 class="display-5 fw-bold mb-3">
        {if isset($section.title) && $section.title}
          {$section.title}
        {else}
          NameCadre Support This Frontend Framework
        {/if}
      </h1>
      <p class="lead text-muted">
        {if isset($section.description) && $section.description}
          {$section.description}
        {else}
          NameCadre works with all frontend frameworks...
        {/if}
      </p>
    </div>

    {if isset($section.icons) && $section.icons|@count gt 0}
      <div class="mt-4 mt-md-5">
        <ul class="list-unstyled row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4 justify-content-center align-items-center">
          {foreach from=$section.icons item=icon}
            {if $icon}
              <li class="col d-flex justify-content-center">
                <img alt="icon" src="{$icon}" class="img-fluid support-framework-icon" loading="lazy">
              </li>
            {/if}
          {/foreach}
        </ul>
      </div>
    {/if}
  </div>
</section>

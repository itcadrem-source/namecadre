{assign var=breadcrumbTitle value=''}
{if $breadcrumb}
  {foreach $breadcrumb as $item}
    {if $item@last}{assign var=breadcrumbTitle value=$item.label}{/if}
  {/foreach}
{else}
  {if $pageTitle}
    {assign var=breadcrumbTitle value=$pageTitle}
  {elseif $pagetitle}
    {assign var=breadcrumbTitle value=$pagetitle}
  {elseif $templatefile}
    {assign var=breadcrumbTitle value=$templatefile|replace:'-':' '|capitalize}
  {elseif $filename}
    {assign var=breadcrumbTitle value=$filename|replace:'-':' '|capitalize}
  {/if}
{/if}

{if $breadcrumb || $breadcrumbTitle}
  <div class="breadcrumb__area">
    <div class="container">
      <h1 class="main-header-title">
        {if $pageTitle}{$pageTitle}{else}{$breadcrumbTitle}{/if}
      </h1>
      <div class="main-header-bottom">
        <ol class="breadcrumb">
          {if $breadcrumb}
            {foreach $breadcrumb as $item}
              <li{if $item@last} class="active"{/if}>
                {if !$item@last}
                  <a href="{$item.link}">{$item.label}</a>
                {else}
                  <strong>{$item.label}</strong>
                {/if}
              </li>
              {if !$item@last}
                <li class="breadcrumb-separator px-1">/</li>
              {/if}
            {/foreach}
          {else}
            <li>
              <a href="{$WEB_ROOT}/index.php">Portal Home</a>
            </li>
            <li class="breadcrumb-separator px-1">/</li>
            <li class="active">
              <strong>{$breadcrumbTitle}</strong>
            </li>
          {/if}
        </ol>
      </div>
    </div>
  </div>
{/if}

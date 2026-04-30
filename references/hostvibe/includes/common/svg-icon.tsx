{if file_exists("templates/$template/includes/common/overwrites/svg-icon.tsx")}
    {include file="{$template}/includes/common/overwrites/svg-icon.tsx"}
{else}
    {if file_exists("templates/$template/assets/svg-icon/custom/$icon.tsx")}
        {if isset($onDark)}
            {include file="{$template}/assets/svg-icon/custom/$icon.tsx" onDark=$onDark}
        {else}
            {include file="{$template}/assets/svg-icon/custom/$icon.tsx" onDark=false}
        {/if}
    {elseif file_exists("templates/$template/assets/svg-icon/$icon.tsx")}
        {if isset($onDark)}
            {include file="{$template}/assets/svg-icon/$icon.tsx" onDark=$onDark}
        {else}
            {include file="{$template}/assets/svg-icon/$icon.tsx" onDark=false}
        {/if}
    {else}
        {* fallback to FontAwesome if available *}
        {if $icon == 'ticket'}
            <i class="fas fa-ticket-alt"></i>
        {elseif $icon == 'article'}
            <i class="fas fa-file-alt"></i>
        {elseif $icon == 'service'}
            <i class="fas fa-cogs"></i>
        {elseif $icon == 'invoice'}
            <i class="fas fa-file-invoice-dollar"></i>
        {else}
            <i class="fas fa-question-circle"></i>
        {/if}
    {/if}
{/if}
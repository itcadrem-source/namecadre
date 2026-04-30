{foreach $sidebar as $item}
    <div menuItemName="{$item->getName()}"
        class="panel panel-sidebar panel-sidebar-default panel-{$item->getName()|lower|replace:" ":"-"} {if $item->getClass()}{$item->getClass()}{/if}{if $item->getExtra('mobileSelect') and $item->hasChildren()} hidden-sm hidden-xs{/if}"
        {if $item->getAttribute('id')} id="{$item->getAttribute('id')}" {/if}>
        {if $item->getAttribute('noHeading') && $item->getAttribute('noHeading') == true}
        {else}
            <div class="panel-heading">
                {if $item->getName() == "Client Details"}
                {else}
                    <h5 class="panel-title">
                        {$item->getLabel()}
                        {if $item->hasBadge()}&nbsp;<span class="badge">{$item->getBadge()}</span>{/if}

                    </h5>
                {/if}
            </div>
        {/if}
        {if $item->hasBodyHtml()}
            <div class="panel-body">
                {$item->getBodyHtml()}
            </div>
        {/if}
        {if $item->hasChildren()}
            <div class="list-group{if $item->getChildrenAttribute('class')} {$item->getChildrenAttribute('class')}{/if}">
                {foreach $item->getChildren() as $childItem}
                    {if $childItem->getUri()}
                        <a {if $childItem->isDisabled()} tabindex="-1" {else} tabindex="0" {/if} menuItemName="{$childItem->getName()}"
                            href="{if $item->getName() =="Domain Details Management" || $item->getName() =="Service Details Overview"}{if $childItem->getUri()|strstr:"action" || ($childItem->getUri()|strstr:"https://")}{$childItem->getUri()}{else}{$childItem->getUri()|replace:$WEB_ROOT:""|replace:"/":""}{/if}{else}{$childItem->getUri()}{/if}"
                            class="list-group-item{if $childItem->isDisabled()} disabled{/if}{if $childItem->getClass()} {$childItem->getClass()}{/if}{if $childItem->isCurrent()} active{/if}"
                            {if $childItem->getAttribute('dataToggleTab')} data-toggle="tab" {/if}
                            {assign "customActionData" $childItem->getAttribute('dataCustomAction')} {if is_array($customActionData)}
                                data-active="{$customActionData['active']}" data-identifier="{$customActionData['identifier']}"
                                data-serviceid="{$customActionData['serviceid']}" {/if} {if $childItem->getAttribute('target')}
                            target="{$childItem->getAttribute('target')}" {/if} id="{$childItem->getId()}">
                            {if $childItem->hasBodyHtml()}
                                {$childItem->getBodyHtml()}
                            {else}
                                {if $childItem->hasBadge()}<span class="badge">{$childItem->getBadge()}</span>{/if}
                                {if $item->getName() == "Announcements Months"}
                                    {if $childItem->getName() != "Older" && $childItem->getName() != "RSS Feed"}
                                        <i class="fas fa-calendar-alt"></i>
                                    {else}
                                        {if $childItem->hasIcon()}
                                            <i class="{$childItem->getIcon()}" aria-hidden="true"></i>
                                        {/if}
                                    {/if}
                                {elseif $item->getName() == "Attachments"}
                                    <i class="fas fa-download"></i>
                                {else}
                                    {if $childItem->hasIcon()}
                                        <i class="{$childItem->getIcon()}" aria-hidden="true"></i>
                                    {/if}
                                {/if}
                                {$childItem->getLabel()|replace:'style="color':'class="status" style="--status-color'|replace: 'loading hidden w-hidden':'loading w-hidden'|replace: '<i class="fas fa-spinner fa-spin"></i>':'    <div class="spinner spinner-sm"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'}
                                {if is_array($customActionData)}<span class="loading w-hidden"
                                        style="display: none;">{include file="$template/includes/common/loader.tsx" classes="spinner-sm"}
                                </span>{/if}
                            {/if}
                        </a>
                    {else}
                        <div menuItemName="{$childItem->getName()}"
                            class="list-group-item{if $childItem->getClass()} {$childItem->getClass()}{/if}" id="{$childItem->getId()}">
                            {if $childItem->hasBodyHtml()}
                                {$childItem->getBodyHtml()}
                            {else}
                                {if $childItem->hasBadge()}<span class="badge">{$childItem->getBadge()}</span>{/if}
                                {if $childItem->hasIcon()}<i class="{$childItem->getIcon()}"></i>&nbsp;{/if}

                                {if $item->getName() == "Ticket Information" && $childItem->getName() != "Subject"}
                                    {$childItem->getLabel()|replace:'<br />':'<span class="float-end">'}</span>
                                {elseif $childItem->getName() == "Subject"}
                                    {$childItem->getLabel()|replace:'class="label"':''|replace:'style="background-color':'class="status" style="--status-color'}
                                {else}
                                    {$childItem->getLabel()}
                                {/if}
                            {/if}
                        </div>
                    {/if}
                {/foreach}
            </div>
        {/if}
        {if $item->hasFooterHtml()}
            <div class="panel-footer clearfix">
                {$item->getFooterHtml()}
                {if $item->getName() == "Client Details"}
                    <a tabindex="0" href="{$WEB_ROOT}/logout.php" class="btn btn-outline btn-sm btn-block">
                        {$LANG.clientareanavlogout}
                    </a>
                {/if}
            </div>
        {/if}
    </div>
    {if $item->getAttribute('alert')}
        {$item->getAttribute('alert')}
    {/if}

{/foreach}
<!-- pricing-area -->

{assign var=section value=null}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

{if !isset($pricingSectionId)}{assign var=pricingSectionId value="plans"}{/if}
{if !isset($pricingTitle)}{assign var=pricingTitle value="`$companyname` Hosting Plans That Fit Your Budget"}{/if}
{if !isset($pricingDescription)}{assign var=pricingDescription value="Experience ultra-fast loading speeds globally for seamless performance and reliability anywhere in the world."}{/if}

{if isset($section.sectionId)}{assign var=pricingSectionId value=$section.sectionId}{/if}
{if isset($section.title)}{assign var=pricingTitle value=$section.title}{/if}
{if isset($section.description)}{assign var=pricingDescription value=$section.description}{/if}

{* ===============================
   PRICING ITEMS SOURCE RESOLUTION
================================ *}
{assign var=pricingItems value=[]}

{if isset($pricingProducts)}{assign var=pricingItems value=$pricingProducts}
{elseif isset($products)}{assign var=pricingItems value=$products}
{elseif isset($sharedhostingproducts)}{assign var=pricingItems value=$sharedhostingproducts}
{elseif isset($wprdpressroducts)}{assign var=pricingItems value=$wprdpressroducts}
{elseif isset($vpsproducts)}{assign var=pricingItems value=$vpsproducts}
{elseif isset($resellerhosting)}{assign var=pricingItems value=$resellerhosting}
{elseif isset($dedicatedproducts)}{assign var=pricingItems value=$dedicatedproducts}
{elseif isset($cloudproducts)}{assign var=pricingItems value=$cloudproducts}
{elseif isset($sslproducts)}{assign var=pricingItems value=$sslproducts}
{elseif isset($sitelockproducts)}{assign var=pricingItems value=$sitelockproducts}
{elseif isset($codeguardproducts)}{assign var=pricingItems value=$codeguardproducts}
{elseif isset($googleworkspaceproducts)}{assign var=pricingItems value=$googleworkspaceproducts}
{elseif isset($enterpriseemailproducts)}{assign var=pricingItems value=$enterpriseemailproducts}
{elseif isset($businessemailproducts)}{assign var=pricingItems value=$businessemailproducts}
{elseif isset($pricetable)}{assign var=pricingItems value=$pricetable}{/if}

{if isset($section.items) && is_array($section.items)}
  {assign var=pricingItems value=$section.items}
{/if}

{assign var=hasPricingTitle value=false}
{assign var=hasPricingDescription value=false}
{assign var=hasPricingItems value=false}
{assign var=showPricingSection value=false}

{if !empty($pricingTitle)}{assign var=hasPricingTitle value=true}{/if}
{if !empty($pricingDescription)}{assign var=hasPricingDescription value=true}{/if}
{if !empty($pricingItems) && is_array($pricingItems)}{assign var=hasPricingItems value=true}{/if}

{if $hasPricingTitle || $hasPricingDescription || $hasPricingItems}
  {assign var=showPricingSection value=true}
{/if}

{if $showPricingSection}
<section class="pricing__area section-py-140" id="{$pricingSectionId}">
  <div class="container">

    {if $hasPricingTitle || $hasPricingDescription}
      <div class="row">
        <div class="col-lg-12">
          <div class="section__title text-center mb-40">
            {if $hasPricingTitle}<h2 class="title">{$pricingTitle}</h2>{/if}
            {if $hasPricingDescription}<p>{$pricingDescription}</p>{/if}
          </div>
        </div>
      </div>
    {/if}

    {if $hasPricingItems}
      <div class="pricing-tab">
        <span class="tab-btn monthly_tab_title">{lang key="orderpaymenttermmonthly"}</span>
        <span class="pricing-tab-switcher"></span>
        <span class="tab-btn annual_tab_title">
          {lang key="orderpaymenttermannually"} <strong>(save 30%)</strong>
        </span>
      </div>
    {/if}

    {if $hasPricingItems}
      <div class="pricing__item-wrap">
        <div class="row justify-content-center">

          {if isset($pricingItems.0)
            && (
              ($pricingItems.0.monthly|default:0) gt 0
              || ($pricingItems.0.annually|default:0) gt 0
              || ($pricingItems.0.biennially|default:0) gt 0
              || ($pricingItems.0.triennially|default:0) gt 0
            )
          }

            {foreach $pricingItems as $myproduct}
              <div class="col-lg-4 col-md-6">
                <div class="pricing__box{if isset($myproduct.is_featured) && $myproduct.is_featured == '1'} pricing__box--featured{/if}">

                  <div class="pricing__plan">
                    <h4 class="title">{$myproduct.name|default:'Plan'}</h4>
                    <p>
                      {if isset($myproduct.shortDescription) && $myproduct.shortDescription}
                        {$myproduct.shortDescription}
                      {else}
                        Everything you need for your website
                      {/if}
                    </p>
                  </div>

                  <div class="pricing__price">
                    <h2 class="price monthly_price">
                      {$myproduct.prefix|default:''}{$myproduct.monthly|default:'0.00'}
                      <span>/month</span>
                    </h2>

                    <h2 class="price annual_price">
                      {$myproduct.prefix|default:''}
                      {if ($myproduct.annually|default:0) gt 0}
                        {$myproduct.annually}
                      {else}
                        {$myproduct.monthly|default:'0.00'}
                      {/if}
                      <span>/year</span>
                    </h2>
                  </div>

                  <!-- BUTTON (FA ICON) -->
                  <div class="pricing__btn">
                    <a href="{routePath('cart-index')}?a=add&pid={$myproduct.relid}" class="tg-btn tg-border-btn">
                      <i class="fas fa-arrow-right"></i>
                      {lang key="ordernowbutton"}
                    </a>
                  </div>

                  <div class="pricing__list">
                    
                      {$myproduct.description|default:''}
                    
                  </div>

                  <div class="pricing__select">
                    <span class="more-item">More Features</span>
                    <span class="less-item">Less Features</span>
                  </div>

                </div>
              </div>
            {/foreach}
          {/if}

        </div>
      </div>
    {/if}
  </div>
</section>
{/if}

<!-- pricing-area-end -->

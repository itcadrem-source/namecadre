<!-- pricing-area -->
{assign var=section value=null}
{if isset($data) && is_array($data)}{assign var=section value=$data}{/if}

{if !isset($pricingTwoSectionId)}{assign var=pricingTwoSectionId value="plans"}{/if}
{if !isset($pricingTwoTitle)}{assign var=pricingTwoTitle value="Get your business online today"}{/if}
{if !isset($pricingTwoDescription)}{assign var=pricingTwoDescription value="99% uptime for rock-solid performance"}{/if}

{if $section && !empty($section.sectionId)}{assign var=pricingTwoSectionId value=$section.sectionId}{/if}
{if $section && !empty($section.title)}{assign var=pricingTwoTitle value=$section.title}{/if}
{if $section && !empty($section.description)}{assign var=pricingTwoDescription value=$section.description}{/if}

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

{if $section && isset($section.items) && is_array($section.items)}
  {assign var=pricingItems value=$section.items}
{/if}

<section class="pricing__area section-py-140" id="{$pricingTwoSectionId}">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="section__title text-center mb-40">
          <h2 class="title">{$pricingTwoTitle}</h2>
          <p>{$pricingTwoDescription}</p>
        </div>
      </div>
    </div>

    <div class="pricing-tab pricing-tab-three">
      <span class="tab-btn monthly_tab_title">{lang key="orderpaymenttermmonthly"}</span>
      <span class="pricing-tab-switcher"></span>
      <span class="tab-btn annual_tab_title">{lang key="orderpaymenttermannually"} <strong>(save 30%)</strong></span>
    </div>

    <div class="pricing__item-wrap-two">
      <div class="row gutter-y-30 justify-content-center">
        {if !empty($pricingItems)
          && isset($pricingItems.0)
          && (
            ($pricingItems.0.monthly|default:0) gt 0
            || ($pricingItems.0.annually|default:0) gt 0
            || ($pricingItems.0.biennially|default:0) gt 0
            || ($pricingItems.0.triennially|default:0) gt 0
          )
        }
          {foreach $pricingItems as $myproduct}
            <div class="col-xl-3 col-lg-4 col-sm-6">
              <div class="pricing__box-four{if isset($myproduct.is_featured) && $myproduct.is_featured == '1'} pricing__box--featured{/if}">
                <div class="pricing__box-top">
                  <div class="pricing__plan">
                    <h4 class="title">{$myproduct.name|default:'Plan'}</h4>
                    <p>{if !empty($myproduct.shortDescription)}{$myproduct.shortDescription}{else}Everything you need to your website{/if}</p>
                  </div>
                  <div class="pricing__price">
                    <h2 class="price monthly_price">{$myproduct.prefix|default:''}{$myproduct.monthly|default:'0.00'} <span>/month</span></h2>
                    <h2 class="price annual_price">{$myproduct.prefix|default:''}{if ($myproduct.annually|default:0) gt 0}{$myproduct.annually}{else}{$myproduct.monthly|default:'0.00'}{/if} <span>/year</span></h2>
                    {if !empty($myproduct.renewaltext)}
                      <p>{$myproduct.renewaltext}</p>
                    {/if}
                  </div>
                  <div class="pricing__btn">
                    <a href="{routePath('cart-index')}?a=add&pid={$myproduct.relid}" class="tg-btn">
                      {lang key="ordernowbutton"}
                      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66797 10H16.3346" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13 13.3333L16.3333 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13 6.66663L16.3333 9.99996" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div class="pricing__box-bottom">
                  <div class="pricing__list">
                    <ul class="list-wrap">{$myproduct.description|default:''}</ul>
                  </div>
                  <div class="pricing__select">
                    <span class="more-item">More Features</span>
                    <span class="less-item">Less Features</span>
                  </div>
                </div>
              </div>
            </div>
          {/foreach}
        {else}
          <div class="col-12">
            <div class="text-center">
              <p>{lang key="noproductsfound"}</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>


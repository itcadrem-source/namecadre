<!-- choose-area -->

{assign var=section value=null}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

<style>
.choose__list i {
  font-size: 20px;
  margin-right: 10px;
}

.counter__item-two .icon i {
  font-size: 40px;
}

</style>

<section class="choose__area-two has-animation section-pb-120">
  <div class="container">
    <div class="choose__inner-wrap">
      <div class="row align-items-center">

        <!-- IMAGE -->
        <div class="col-lg-6 order-0 order-lg-2">
          <div class="choose__img-two">
            <img
              src="{if isset($section.image)}{$section.image}{else}{$WEB_ROOT}/templates/{$template}/images/why-choose.png{/if}"
              alt="img"
            />
          </div>
        </div>

        <!-- CONTENT -->
        <div class="col-lg-6">
          <div class="choose__content choose__content-two">

            <div class="section__title mb-20">
              <h2 class="title">
                {if isset($section.title)}
                  {$section.title}
                {else}
                  Why You Should Choose Us
                {/if}
              </h2>
            </div>

            <p>
              {if isset($section.description)}
                {$section.description}
              {else}
                Experience unmatched performance, reliability, and support
                designed to elevate your online presence.
              {/if}
            </p>

            <!-- LIST -->
            <div class="choose__list">
              <ul class="list-wrap">

                {if isset($section.list) && is_array($section.list)}
                  {foreach $section.list as $listItem}
                    <li>
                      <i class="far fa-check-circle"></i>
                      {if is_array($listItem) && isset($listItem.label)}
                        {$listItem.label}
                      {else}
                        {$listItem}
                      {/if}
                    </li>
                  {/foreach}
                {else}
                  <li><i class="far fa-check-circle"></i> Reliable & Secure Hosting</li>
                  <li><i class="far fa-check-circle"></i> 24/7 Expert Support</li>
                  <li><i class="far fa-check-circle"></i> Fast Performance</li>
                  <li><i class="far fa-check-circle"></i> Free SSL Certificate</li>
                  <li><i class="far fa-check-circle"></i> Affordable Pricing</li>
                  <li><i class="far fa-check-circle"></i> Free Migration</li>
                {/if}

              </ul>
            </div>

          </div>

          <!-- COUNTERS -->
          <div class="counter__wrap-two">

            {if isset($section.counters) && is_array($section.counters)}
              {foreach $section.counters as $counter}
                <div class="counter__item-two">
                  <div class="icon">
                    <i class="{$counter.icon}" style="color: {if isset($counter.color)} {$counter.color}{/if} !important;"></i>

                  </div>
                  <div class="content">
                    <h2 class="count">
                      <span class="counter-number">
                        {if isset($counter.number)}{$counter.number}{else}0{/if}
                      </span>{if isset($counter.suffix)}{$counter.suffix}{/if}
                    </h2>
                    <p>{if isset($counter.label)}{$counter.label}{/if}</p>
                  </div>
                </div>
              {/foreach}
            {else}
              <div class="counter__item-two">
                <div class="icon"><i class="fas fa-smile"></i></div>
                <div class="content">
                  <h2 class="count"><span class="counter-number">96</span>%</h2>
                  <p>Happiness Score</p>
                </div>
              </div>
              <div class="counter__item-two">
                <div class="icon"><i class="fas fa-users"></i></div>
                <div class="content">
                  <h2 class="count"><span class="counter-number">1.8</span>Million+</h2>
                  <p>Hosting Clients</p>
                </div>
              </div>
              <div class="counter__item-two">
                <div class="icon"><i class="fas fa-server"></i></div>
                <div class="content">
                  <h2 class="count"><span class="counter-number">99.9</span>%</h2>
                  <p>Server Uptime</p>
                </div>
              </div>
            {/if}

          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<!-- choose-area-end -->

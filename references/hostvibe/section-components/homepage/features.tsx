<!-- features-area -->
{assign var=section value=null}
{if isset($data)}{assign var=section value=$data}{/if}
<section class="features__area-four section-pb-140 mt-5">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="section__title text-center mb-60">
          <h2 class="title">
            {if $section}{if $section.title}{$section.title}{/if}{else}Launch Your Website with Confidence{/if}
          </h2>
          <p>
            {if $section}
              {if $section.description}
                {$section.description}
              {/if}
              {else}
                Build, launch, and grow your digital presence with fast,
                secure, and reliable hosting solutions.
              {/if}
            </p>
          </div>
        </div>
      </div>
      <div class="row gutter-y-24">
        <div class="col-xl-4 col-lg-5">
          <div class="features__item features__item-eight">
            <div class="features__thumb">
              <img
                src="{if $section && $section.itemOne && $section.itemOne.image}{$section.itemOne.image}{else}{$WEB_ROOT}/templates/{$template}/images/finddomain.png{/if}"
                alt="img" />
            </div>
            <div class="features__content">
              <h3 class="title">
                {if $section && $section.itemOne && $section.itemOne.title}{$section.itemOne.title}
                {else}Find & Pick Your
                Ideal Domain{/if}
              </h3>
              <p>
                {if $section && $section.itemOne && $section.itemOne.description}
                  {$section.itemOne.description}
                {else}
                  Choose from thousands of available domains to kickstart your
                  brand's digital journey.
                {/if}
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-8 col-lg-7">
          <div class="features__item-two features__item-nine">
            <div class="features__content-two">
              <h2 class="title">
                {if $section && $section.itemTwo && $section.itemTwo.title}
                  {$section.itemTwo.title}
                {else}
                  Pick a <span>Hosting Plan</span> That Works for You
                {/if}
              </h2>
              <p>
                {if $section && $section.itemTwo && $section.itemTwo.description}
                  {$section.itemTwo.description}
                {else}
                  Powerful, flexible, and reliable hosting designed to support
                  your business growth. Match your business requirements with
                  the right hosting performance.
                {/if}
              </p>
              <a href="{if $section && $section.itemTwo && $section.itemTwo.button && $section.itemTwo.button.url}{$section.itemTwo.button.url}{elseif $section && $section.itemTwo && $section.itemTwo.buttonUrl}{$section.itemTwo.buttonUrl}{else}{$WEB_ROOT}/index.php#plans{/if}"
                class="tg-link-btn">
                <span class="link-effect">
                  <span
                    class="effect-1">{if $section && $section.itemTwo && $section.itemTwo.button && $section.itemTwo.button.label}{$section.itemTwo.button.label}
                    {elseif $section && $section.itemTwo && $section.itemTwo.buttonLabel}{$section.itemTwo.buttonLabel}
                    {else}View
                    Hosting Plan{/if}</span>
                  <span
                    class="effect-1">{if $section && $section.itemTwo && $section.itemTwo.button && $section.itemTwo.button.label}{$section.itemTwo.button.label}
                    {elseif $section && $section.itemTwo && $section.itemTwo.buttonLabel}{$section.itemTwo.buttonLabel}
                    {else}View
                    Hosting Plan{/if}</span>
                </span>
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.75 5.75L5.25 13.25" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M6 5.75H12.75V12.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </a>
            </div>
            <div class="features__thumb-two">
              <img
                src="{if $section && $section.itemTwo && $section.itemTwo.image}{$section.itemTwo.image}{else}{$WEB_ROOT}/templates/{$template}/images/hosting-plan.png{/if}"
                alt="img" data-aos="fade-left" data-aos-delay="200" />
            </div>
            <div class="features__shape">
              <img
                src="{if $section && $section.itemTwo && $section.itemTwo.shape}{$section.itemTwo.shape}{else}{$WEB_ROOT}/templates/{$template}/images/plan-shape.png{/if}"
                alt="shape" />
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="features__item-three features__item-ten">
            <div class="features__content-three">
              <h2 class="title">
                {if $section && $section.itemThree && $section.itemThree.title}
                  {$section.itemThree.title}
                {else}
                  Blazing-Fast Loading Website, Speeds Worldwide.
                {/if}
              </h2>
              <p>
                {if $section && $section.itemThree && $section.itemThree.description}
                  {$section.itemThree.description}
                {else}
                  Deliver a seamless browsing experience with ultra-fast page
                  loading and performance optimized for every corner of the
                  globe.
                {/if}
              </p>
              <ul class="list-wrap features__list">
                {if $section && $section.itemThree && $section.itemThree.list}
                  {foreach $section.itemThree.list as $listItem}
                    <li>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C9.01509 2.5 8.03982 2.69399 7.12987 3.0709C6.21993 3.44781 5.39314 4.00026 4.6967 4.6967C4.00026 5.39314 3.44781 6.21993 3.0709 7.12987C2.69399 8.03982 2.5 9.01509 2.5 10Z"
                          stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.5 9.99967L9.16667 11.6663L12.5 8.33301" stroke="currentColor" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p>
                        <span>{if isset($listItem.title)}{$listItem.title}{else}{$listItem}{/if}</span>
                        {if isset($listItem.description)}{$listItem.description}{/if}
                      </p>
                    </li>
                  {/foreach}
                {else}
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C9.01509 2.5 8.03982 2.69399 7.12987 3.0709C6.21993 3.44781 5.39314 4.00026 4.6967 4.6967C4.00026 5.39314 3.44781 6.21993 3.0709 7.12987C2.69399 8.03982 2.5 9.01509 2.5 10Z"
                        stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M7.5 9.99967L9.16667 11.6663L12.5 8.33301" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>
                      <span>Optimized Server Performance:</span>
                      High-performance infrastructure ensures rapid load times
                      even during traffic spikes.
                    </p>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C9.01509 2.5 8.03982 2.69399 7.12987 3.0709C6.21993 3.44781 5.39314 4.00026 4.6967 4.6967C4.00026 5.39314 3.44781 6.21993 3.0709 7.12987C2.69399 8.03982 2.5 9.01509 2.5 10Z"
                        stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M7.5 9.99967L9.16667 11.6663L12.5 8.33301" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>
                      <span>Advanced Caching Technology:</span> Smart caching
                      accelerates your pages for instant access.
                    </p>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C9.01509 2.5 8.03982 2.69399 7.12987 3.0709C6.21993 3.44781 5.39314 4.00026 4.6967 4.6967C4.00026 5.39314 3.44781 6.21993 3.0709 7.12987C2.69399 8.03982 2.5 9.01509 2.5 10Z"
                        stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M7.5 9.99967L9.16667 11.6663L12.5 8.33301" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>
                      <span>Lightning-Fast Response Times:</span> Minimize
                      latency and provide a smooth user experience across all
                      devices.
                    </p>
                  </li>
                {/if}
              </ul>
              <a href="{if $section && $section.itemThree && $section.itemThree.button && $section.itemThree.button.url}{$section.itemThree.button.url}{elseif $section && $section.itemThree && $section.itemThree.buttonUrl}{$section.itemThree.buttonUrl}{else}{$WEB_ROOT}/index.php#plans{/if}"
                class="tg-link-btn">
                <span class="link-effect">
                  <span
                    class="effect-1">{if $section && $section.itemThree && $section.itemThree.button && $section.itemThree.button.label}{$section.itemThree.button.label}
                    {elseif $section && $section.itemThree && $section.itemThree.buttonLabel}{$section.itemThree.buttonLabel}
                    {else}View
                    Hosting Plan{/if}</span>
                  <span
                    class="effect-1">{if $section && $section.itemThree && $section.itemThree.button && $section.itemThree.button.label}{$section.itemThree.button.label}
                    {elseif $section && $section.itemThree && $section.itemThree.buttonLabel}{$section.itemThree.buttonLabel}
                    {else}View
                    Hosting Plan{/if}</span>
                </span>
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.75 5.75L5.25 13.25" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M6 5.75H12.75V12.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </a>
            </div>
            <div class="features__thumb-three">
              <img
                src="{if $section && $section.itemThree && $section.itemThree.image}{$section.itemThree.image}{else}{$WEB_ROOT}/templates/{$template}/images/blazing-fast.png{/if}"
                alt="img" class="main-img" data-aos="fade-left" data-aos-delay="200" />
              <img
                src="{if $section && $section.itemThree && $section.itemThree.shape1}{$section.itemThree.shape1}{else}{$WEB_ROOT}/templates/{$template}/images/hero-shape-01.svg{/if}"
                alt="shape" />
              <img
                src="{if $section && $section.itemThree && $section.itemThree.shape2}{$section.itemThree.shape2}{else}{$WEB_ROOT}/templates/{$template}/images/hero-shape-03.svg{/if}"
                alt="shape" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- features-area-end -->
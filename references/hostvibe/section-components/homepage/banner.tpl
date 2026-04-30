{* ===============================
   SAFE SECTION INIT
================================ *}
{assign var=section value=[]}
{if isset($data) && is_array($data)}
  {assign var=section value=$data}
{/if}

{assign var=heroTitle value='Fast and Secure Hosting for Businesses'}
{if isset($section.content.title) && $section.content.title}
  {assign var=heroTitle value=$section.content.title}
{elseif isset($section.title) && $section.title}
  {assign var=heroTitle value=$section.title}
{/if}

{assign var=heroDescription value='Buy reliable web hosting to bring your website ideas to life.'}
{if isset($section.content.description) && $section.content.description}
  {assign var=heroDescription value=$section.content.description}
{elseif isset($section.description) && $section.description}
  {assign var=heroDescription value=$section.description}
{/if}

{assign var=searchPlaceholder value='eg. example.com'}
{if isset($section.search.placeholder) && $section.search.placeholder}
  {assign var=searchPlaceholder value=$section.search.placeholder}
{elseif isset($section.searchPlaceholder) && $section.searchPlaceholder}
  {assign var=searchPlaceholder value=$section.searchPlaceholder}
{/if}

{assign var=searchButtonLabel value={lang key='search'}}
{if isset($section.search.buttonLabel) && $section.search.buttonLabel}
  {assign var=searchButtonLabel value=$section.search.buttonLabel}
{elseif isset($section.searchButtonLabel) && $section.searchButtonLabel}
  {assign var=searchButtonLabel value=$section.searchButtonLabel}
{/if}

<section class="banner__area hvx-home-hero-area">
  <style>
    .hvx-home-hero-area {
      background: var(--tg-color-gray-3);
      padding: 34px 0 48px;
    }

    .hvx-home-hero-shell {
      position: relative;
      overflow: hidden;
      border-radius: 28px;
      background:
        radial-gradient(circle at 15% 18%, rgba(255, 255, 255, 0.16) 0 3px, transparent 4px),
        radial-gradient(circle at 28% 72%, rgba(255, 255, 255, 0.18) 0 2px, transparent 3px),
        radial-gradient(circle at 48% 12%, rgba(255, 255, 255, 0.15) 0 2px, transparent 3px),
        radial-gradient(circle at 64% 36%, rgba(255, 255, 255, 0.16) 0 3px, transparent 4px),
        radial-gradient(circle at 77% 18%, rgba(255, 255, 255, 0.18) 0 2px, transparent 3px),
        radial-gradient(circle at 88% 76%, rgba(255, 255, 255, 0.15) 0 4px, transparent 5px),
        linear-gradient(135deg, #1d2d8d 0%, #1f2f95 42%, #2337a3 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 26px 56px rgba(16, 27, 89, 0.18);
      padding: 66px 36px 56px;
    }

    .hvx-home-hero-shell::before,
    .hvx-home-hero-shell::after {
      content: "";
      position: absolute;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      filter: blur(2px);
      pointer-events: none;
    }

    .hvx-home-hero-shell::before {
      width: 220px;
      height: 220px;
      top: -78px;
      right: -44px;
    }

    .hvx-home-hero-shell::after {
      width: 160px;
      height: 160px;
      left: -52px;
      bottom: -54px;
    }

    .hvx-home-hero-inner {
      position: relative;
      z-index: 1;
      max-width: 780px;
      margin: 0 auto;
      text-align: center;
    }

    .hvx-home-hero-title {
      margin: 0;
      color: #ffffff;
      font-size: clamp(34px, 4.6vw, 64px);
      line-height: 1.08;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .hvx-home-hero-title span {
      color: #dce5ff;
    }

    .hvx-home-hero-subtitle {
      max-width: 700px;
      margin: 22px auto 0;
      color: rgba(232, 239, 255, 0.78);
      font-size: 18px;
      line-height: 1.65;
    }

    .hvx-home-hero-search {
      max-width: 702px;
      margin: 34px auto 0;
    }

    .hvx-home-hero-search .domain__search-wrap {
      overflow: visible;
      margin: 0;
    }

    .hvx-home-hero-search .domain__search-form {
      margin-bottom: 0;
    }

    .hvx-home-hero-search .domain__search-form input {
      height: 72px;
      padding: 22px 248px 22px 68px;
      border: 0;
      border-radius: 18px;
      color: #16203a;
      background: #ffffff;
      box-shadow: 0 18px 42px rgba(8, 18, 78, 0.2);
      font-size: 17px;
      font-weight: 500;
    }

    .hvx-home-hero-search .domain__search-form input::placeholder {
      color: #97a3bf;
      font-weight: 600;
    }

    .hvx-home-hero-search .domain__search-form > svg {
      left: 24px;
      color: #7c89a6;
    }

    .hvx-home-hero-search .domain__search-form input:focus {
      border-color: transparent;
      box-shadow: 0 18px 42px rgba(8, 18, 78, 0.26), 0 0 0 3px rgba(126, 156, 255, 0.18);
    }

    .hvx-home-hero-search .domain__search-action {
      right: 10px;
      gap: 0;
      background: #16206a;
      border-radius: 14px;
      padding: 0;
      overflow: hidden;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
    }

    .hvx-home-hero-search .domain-action-toggle {
      width: 64px;
      min-width: 64px;
      height: 52px;
      padding: 0;
      border: 0;
      color: #edf2ff;
      background: transparent;
      font-size: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid rgba(255, 255, 255, 0.12);
    }

    .hvx-home-hero-search .domain-action-menu {
      min-width: 220px;
      padding: 10px;
      border: 1px solid rgba(23, 38, 99, 0.14);
      border-radius: 14px;
      box-shadow: 0 18px 42px rgba(19, 31, 88, 0.18);
    }

    .hvx-home-hero-search .domain-action-btn {
      height: 42px;
      border: 0;
      border-radius: 10px;
      background: #22338e;
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
    }

    .hvx-home-hero-search .domain-submit-btn {
      min-width: 130px;
      height: 52px;
      padding: 0 24px;
      border-radius: 0;
      border: 0;
      background: linear-gradient(135deg, #314fff 0%, #2c42d7 100%);
      color: #ffffff;
      font-weight: 700;
      font-size: 15px;
      letter-spacing: 0;
      box-shadow: none;
    }

    .hvx-home-hero-search .domain-submit-btn:hover,
    .hvx-home-hero-search .domain-submit-btn:focus-visible {
      color: #ffffff;
      background: linear-gradient(135deg, #3a57ff 0%, #3348db 100%);
    }

    .hvx-home-hero-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      max-width: 702px;
      margin: 12px auto 0;
    }

    .hvx-home-hero-meta-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
    }

    .hvx-home-hero-meta-link:hover,
    .hvx-home-hero-meta-link:focus-visible {
      color: #ffffff;
      text-decoration: none;
    }

    .hvx-home-hero-meta-link i {
      font-size: 12px;
    }

    .hvx-home-hero-tlds {
      max-width: 702px;
      margin: 26px auto 0;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 12px;
    }

    .hvx-home-hero-tld-card {
      min-width: 0;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 14px 30px rgba(13, 22, 77, 0.2);
      backdrop-filter: blur(6px);
    }

    .hvx-home-hero-tld-top {
      height: 72px;
      padding: 10px 12px;
      background: rgba(255, 255, 255, 0.96);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hvx-home-hero-tld-top img {
      max-height: 44px;
      width: auto;
      max-width: 100%;
      object-fit: contain;
    }

    .hvx-home-hero-tld-top span {
      color: #1d2d8d;
      font-size: 24px;
      font-weight: 800;
      line-height: 1;
    }

    .hvx-home-hero-tld-bottom {
      min-height: 42px;
      padding: 10px 12px;
      background: rgba(8, 16, 63, 0.62);
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      line-height: 1.2;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    @media (max-width: 1199.98px) {
      .hvx-home-hero-shell {
        padding: 58px 28px 48px;
      }

      .hvx-home-hero-title {
        font-size: clamp(32px, 4.8vw, 54px);
      }
    }

    @media (max-width: 991.98px) {
      .hvx-home-hero-area {
        padding: 24px 0 42px;
      }

      .hvx-home-hero-shell {
        border-radius: 24px;
        padding: 52px 22px 42px;
      }

      .hvx-home-hero-subtitle {
        font-size: 16px;
      }

      .hvx-home-hero-tlds {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 767.98px) {
      .hvx-home-hero-shell {
        padding: 42px 16px 32px;
        border-radius: 18px;
      }

      .hvx-home-hero-title {
        font-size: 34px;
      }

      .hvx-home-hero-subtitle {
        margin-top: 16px;
        font-size: 14px;
      }

      .hvx-home-hero-search {
        margin-top: 24px;
      }

      .hvx-home-hero-search .domain__search-form {
        background: transparent;
        border: 0;
        padding: 0;
      }

      .hvx-home-hero-search .domain__search-form input {
        height: 58px;
        padding: 16px 18px 16px 48px;
        border-radius: 16px 16px 0 0;
        box-shadow: none;
      }

      .hvx-home-hero-search .domain__search-form > svg {
        top: 19px;
        left: 16px;
        width: 22px;
        height: 22px;
        transform: none;
      }

      .hvx-home-hero-search .domain__search-action {
        position: static;
        transform: none;
        width: 100%;
        justify-content: stretch;
        border-radius: 0 0 16px 16px;
      }

      .hvx-home-hero-search .domain-action-toggle {
        width: 60px;
        min-width: 60px;
        height: 50px;
      }

      .hvx-home-hero-search .domain-submit-btn {
        flex: 1 1 auto;
        min-width: 0;
        height: 50px;
      }

      .hvx-home-hero-meta {
        margin-top: 10px;
      }

      .hvx-home-hero-meta-link {
        font-size: 13px;
      }

      .hvx-home-hero-tlds {
        display: flex;
        overflow-x: auto;
        gap: 10px;
        padding-bottom: 4px;
        scroll-snap-type: x proximity;
      }

      .hvx-home-hero-tld-card {
        flex: 0 0 142px;
        scroll-snap-align: start;
      }

      .hvx-home-hero-tld-top {
        height: 66px;
      }
    }
  </style>

  <div class="container">
    <div class="hvx-home-hero-shell">
      <div class="hvx-home-hero-inner">
        <h1 class="hvx-home-hero-title">{$heroTitle nofilter}</h1>
        <p class="hvx-home-hero-subtitle">{$heroDescription|escape:'html'}</p>

        <div class="hvx-home-hero-search">
          <div class="domain__search-wrap">
            <form id="domainSearchForm" class="domain__search-form" method="post" action="{$WEB_ROOT}/domainchecker.php">
              <input type="hidden" name="token" value="{$token}" />
              <input type="hidden" name="domainAction" id="domainActionInput" value="register" />

              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <g clip-path="url(#clip0_4017_10)">
                  <path d="M6 15.3333C6 16.559 6.24141 17.7727 6.71046 18.905C7.1795 20.0374 7.86699 21.0663 8.73367 21.933C9.60035 22.7997 10.6292 23.4872 11.7616 23.9562C12.894 24.4253 14.1077 24.6667 15.3333 24.6667C16.559 24.6667 17.7727 24.4253 18.905 23.9562C20.0374 23.4872 21.0663 22.7997 21.933 21.933C22.7997 21.0663 23.4872 20.0374 23.9562 18.905C24.4253 17.7727 24.6667 16.559 24.6667 15.3333C24.6667 14.1077 24.4253 12.894 23.9562 11.7616C23.4872 10.6292 22.7997 9.60035 21.933 8.73367C21.0663 7.86699 20.0374 7.1795 18.905 6.71046C17.7727 6.24141 16.559 6 15.3333 6C14.1077 6 12.894 6.24141 11.7616 6.71046C10.6292 7.1795 9.60035 7.86699 8.73367 8.73367C7.86699 9.60035 7.1795 10.6292 6.71046 11.7616C6.24141 12.894 6 14.1077 6 15.3333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M26 26L22 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
                <defs>
                  <clipPath id="clip0_4017_10">
                    <rect width="32" height="32" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>

              <input type="text" name="sld" id="domainsearch" aria-label="Search" placeholder="{$searchPlaceholder|escape:'html'}" />

              <div class="domain__search-action">
                <div class="btn-group position-relative">
                  <button type="button" class="btn border-0 dropdown-toggle caret-off domain-action-toggle" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Domain action settings">
                    <i class="fa fa-cog"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end p-2 domain-action-menu">
                    <button class="btn w-100 mb-2 text-white fw-bold domain-action-option domain-action-btn" data-action="register">Register</button>
                    <button class="btn w-100 text-white fw-bold domain-action-option domain-action-btn" data-action="transfer">Transfer</button>
                  </div>
                </div>
                <button type="submit" id="domainSubmitBtn" class="tg-btn domain-submit-btn">{$searchButtonLabel|escape:'html'}</button>
              </div>
            </form>
          </div>
        </div>

        <div class="hvx-home-hero-meta">
          <a class="hvx-home-hero-meta-link" href="{$WEB_ROOT}/domain-promos.php">
            <span>Special Offers</span>
            <i class="fas fa-angle-right"></i>
          </a>
          <a class="hvx-home-hero-meta-link" href="{$WEB_ROOT}/whois">
            <span>Domain IP Check</span>
            <i class="fas fa-angle-right"></i>
          </a>
        </div>

        {if isset($section.tldCards) && $section.tldCards|@count gt 0}
          <div class="hvx-home-hero-tlds">
            {foreach from=$section.tldCards item=card}
              <div class="hvx-home-hero-tld-card">
                <div class="hvx-home-hero-tld-top">
                  {if isset($card.image) && $card.image}
                    <img src="{$card.image|escape:'html'}" alt="{$card.tld|default:'Domain'|escape:'html'}" loading="lazy" />
                  {else}
                    <span>{$card.tld|default:'TLD'|escape:'html'}</span>
                  {/if}
                </div>
                <div class="hvx-home-hero-tld-bottom">
                  {if isset($card.price) && $card.price}{$card.price|escape:'html'}{else}{$card.tld|default:'See pricing'|escape:'html'}{/if}
                </div>
              </div>
            {/foreach}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <script>
    (function() {
      var form = document.getElementById('domainSearchForm');
      var actionInput = document.getElementById('domainActionInput');
      var submitBtn = document.getElementById('domainSubmitBtn');
      var sldInput = document.getElementById('domainsearch');
      var options = document.querySelectorAll('.domain-action-option');

      if (!form || !actionInput || !submitBtn || !sldInput || !options.length) {
        return;
      }

      function setAction(action) {
        actionInput.value = action;
        submitBtn.textContent = action === 'transfer' ? 'Transfer' : {$searchButtonLabel|@json_encode nofilter};
      }

      options.forEach(function(opt) {
        opt.addEventListener('click', function(e) {
          e.preventDefault();
          setAction(opt.getAttribute('data-action'));
        });
      });

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var raw = (sldInput.value || '').trim();
        var sld = raw.replace(/[^a-zA-Z0-9\-.]/g, '');
        if (sld && sld.indexOf('.') === -1) {
          sld = sld + '.com';
        }
        if (!sld) {
          return;
        }
        var action = actionInput.value || 'register';
        var url = {$WEB_ROOT|@json_encode nofilter} + '/cart.php?a=add&domain=' + encodeURIComponent(action) + '&query=' + encodeURIComponent(sld);
        window.location.href = url;
      });
    })();
  </script>
</section>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="{$charset}" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {include file="$template/includes/head.tsx"}
  {include file="$template/includes/redcheap-seo.tsx"}
  {$headoutput}
</head>

<body
  class="hostvibe-theme hvx-theme-light {if in_array($templatefile, ['login', 'clientregister', 'password-reset-container', 'logout'])}auth-wrap{/if}"
  data-phone-cc-input="{$phoneNumberInputStyle}" data-spy="scroll" data-target="#navbar-collapse-toggle"
  data-offset="98">
  {if $captcha}
    {$captcha->getMarkup()}
  {/if}
  {$headeroutput}

  {assign var=hvxAllowedLanguageKeys value=['english','spanish','french']}
  {assign var=hvxLangOptions value=[]}
  {if $languagechangeenabled && count($locales) > 1}
    {foreach $locales as $locale}
      {if in_array($locale.language, $hvxAllowedLanguageKeys)}
        {assign var=hvxLangUrl value="`$currentpagelinkback`language=`$locale.language`"}
        {assign var=hvxLangOptions value=$hvxLangOptions|@array_merge:[['name'=>$locale.localisedName,'url'=>$hvxLangUrl,'active'=>($activeLocale.localisedName == $locale.localisedName)]]}
      {/if}
    {/foreach}
  {/if}

  {assign var=hvxCurrencyOptions value=[]}
  {if count($multiCurrency) > 1}
    {foreach $multiCurrency as $currency}
      {if $isQueryExist eq true}
        {assign var=hvxCurrencyUrl value="`$urlForCurrentcy`&currency=`$currency.id`"}
      {else}
        {assign var=hvxCurrencyUrl value="`$urlForCurrentcy`?currency=`$currency.id`"}
      {/if}
      {assign var=hvxCurrencyOptions value=$hvxCurrencyOptions|@array_merge:[['name'=>"`$currency.code` `$currency.sign`",'url'=>$hvxCurrencyUrl,'active'=>($currency.id eq $selectedCurrency)]]}
    {/foreach}
  {/if}

  {assign var=headerMenuData value=[]}
  {assign var=headerMenuPath value=$smarty.const.ROOTDIR|cat:"/templates/"|cat:$template|cat:"/json/header-menu.json"}
  {assign var=headerMenuJson value=$headerMenuPath|@file_get_contents}
  {if $headerMenuJson}
    {assign var=headerMenuData value=$headerMenuJson|@json_decode:true}
  {/if}
  {if !is_array($headerMenuData)}{assign var=headerMenuData value=[]}{/if}

  {assign var=quickPadData value=[]}
  {assign var=quickPadPath value=$smarty.const.ROOTDIR|cat:"/templates/"|cat:$template|cat:"/json/quick-pad.json"}
  {assign var=quickPadJson value=$quickPadPath|@file_get_contents}
  {if $quickPadJson}
    {assign var=quickPadData value=$quickPadJson|@json_decode:true}
  {/if}
  {if !is_array($quickPadData)}{assign var=quickPadData value=[]}{/if}
  {if !isset($quickPadData.sections) || !is_array($quickPadData.sections) || !count($quickPadData.sections)}
    {assign var=quickPadData value=[
                                                            'sections'=>[
                                                              [
                                                                'heading'=>'Apps & Services',
                                                                'items'=>[
                                                                  ['label'=>'My Services','icon'=>'fas fa-server','url'=>'/clientarea.php?action=services','loginRequired'=>true]
                                                                ]
                                                              ]
                                                            ]
                                                          ]}
  {/if}

  {assign var=hvxNotificationCenterLink value='/notification-center'}
  {if isset($hvxNotificationCenterUrl) && $hvxNotificationCenterUrl neq ''}
    {assign var=hvxNotificationCenterLink value=$hvxNotificationCenterUrl}
  {/if}
  {assign var=hvxNotificationApiLink value='/index.php?m=MyOwnThemeEditor&action=notificationsApi'}
  {if isset($hvxNotificationApiUrl) && $hvxNotificationApiUrl neq ''}
    {assign var=hvxNotificationApiLink value=$hvxNotificationApiUrl}
  {/if}
  {assign var=hvxNotificationApiTokenValue value=''}
  {if isset($hvxNotificationApiToken) && $hvxNotificationApiToken neq ''}
    {assign var=hvxNotificationApiTokenValue value=$hvxNotificationApiToken}
  {/if}

  {assign var=hvxNotifications value=[]}
  {if $loggedin && isset($hvxHeaderNotifications) && is_array($hvxHeaderNotifications)}
    {assign var=hvxNotifications value=$hvxHeaderNotifications}
  {/if}
  {assign var=hvxNotifyUnreadCount value=0}
  {if $loggedin && isset($hvxHeaderUnreadCount)}
    {assign var=hvxNotifyUnreadCount value=$hvxHeaderUnreadCount|intval}
  {/if}

  {assign var=hvxMenuTabs value=[
    ['key'=>'domains','label'=>'Domains','defaultRail'=>'domains'],
    ['key'=>'hosting','label'=>'Hosting','defaultRail'=>'hosting'],
    ['key'=>'server','label'=>'Server','defaultRail'=>'server'],
    ['key'=>'email','label'=>'Email','defaultRail'=>'email'],
    ['key'=>'explore','label'=>'All Service','defaultRail'=>'hot']
  ]}

  {assign var=hvxProductRails value=['domains','hosting','server','email']}
  {assign var=hvxSupportBillingRails value=['supportBilling']}
  {assign var=hvxUniverseRails value=['transfer','why','about']}
  {assign var=hvxHotRails value=['hot']}

  {assign var=hvxMenuRails value=[
    'hot'=>[
      'title'=>"What's hot",
      'icon'=>'fas fa-fire',
      'sections'=>[
        ['heading'=>'Featured','cards'=>[
          ['title'=>'Domain Name Search','desc'=>'Search and find your ideal domain name.','url'=>'/cart.php?a=add&domain=register'],
          ['title'=>'Transfer Domains','desc'=>'Move your domains to NameCadre.','url'=>'/cart.php?a=add&domain=transfer'],
          ['title'=>'My Domains','desc'=>'Manage all your domains in one place.','url'=>'/clientarea.php?action=domains','authAwareClientDomains'=>true],
          ['title'=>'My Hosting','desc'=>'Manage your hosting services in one place.','url'=>'/clientarea.php?action=services'],
          ['title'=>'VPS Server USA','desc'=>'Scalable USA VPS infrastructure with dedicated resources.','url'=>'/index.php?rp=/store/vps-server-usa'],
          ['title'=>'Email Hosting','desc'=>'Professional email hosting with secure and reliable delivery.','url'=>'/index.php?rp=/store/email-hosting','badge'=>'HOT'],
          ['title'=>'Open Ticket','desc'=>'Create a new support ticket for help.','url'=>'/submitticket.php'],
          ['title'=>'My Invoices','desc'=>'View and manage your invoices.','url'=>'/clientarea.php?action=invoices']
        ]]
      ]
    ],
    'domains'=>[
      'title'=>'Domains','icon'=>'far fa-bullseye','sections'=>[
        ['heading'=>'Domains','cards'=>[
          ['title'=>'My Domains','desc'=>'Manage all your domains in one place.','url'=>'/clientarea.php?action=domains','authAwareClientDomains'=>true],
          ['title'=>'Domain Name Search','desc'=>'Search and find your ideal domain.','url'=>'/cart.php?a=add&domain=register'],
          ['title'=>'Domain Pricing','desc'=>'Check latest and best domain prices.','url'=>'/cart.php?a=add&domain=register'],
          ['title'=>'Transfer Domains','desc'=>'Move your domains to NameCadre.','url'=>'/cart.php?a=add&domain=transfer'],
          ['title'=>'Domain Privacy','desc'=>'Keep your domain data private.','url'=>'/privacy-policy.php'],
          ['title'=>'Whois Domain Lookup','desc'=>'See who owns any domain name.','url'=>'/whois']
        ]]
      ]
    ],
    'hosting'=>[
      'title'=>'Hosting','icon'=>'far fa-hdd','sections'=>[
        ['heading'=>'Web Hosting','cards'=>[
          ['title'=>'Startup USA Hosting','desc'=>'Entry-level USA hosting plans for fast and reliable websites.','url'=>'/index.php?rp=/store/startup-usa-hosting'],
          ['title'=>'Startup BDIX Hosting','desc'=>'BDIX-optimized hosting plans for local performance.','url'=>'/index.php?rp=/store/startup-bdix-hosting'],
          ['title'=>'Pro Singapore Hosting','desc'=>'High-performance Singapore hosting for business workloads.','url'=>'/index.php?rp=/store/pro-singapore-hosting']
        ]],
        ['heading'=>'Hosting','cards'=>[
          ['title'=>'My Hosting','desc'=>'Manage your hosting services in one place.','url'=>'/clientarea.php?action=services']
        ]],
        ['heading'=>'Reseller','cards'=>[
          ['title'=>'Reseller Hosting','desc'=>'Launch and grow your own hosting business with reseller plans.','url'=>'/index.php?rp=/store/reseller-hosting']
        ]]
      ]
    ],
    'server'=>[
      'title'=>'Server','icon'=>'fas fa-server','sections'=>[
        ['heading'=>'Server','cards'=>[
          ['title'=>'My Server','desc'=>'Manage your server services in one place.','url'=>'/clientarea.php?action=services']
        ]],
        ['heading'=>'VPS Server','cards'=>[
          ['title'=>'VPS Server USA','desc'=>'Scalable USA VPS infrastructure with dedicated resources.','url'=>'/index.php?rp=/store/vps-server-usa']
        ]]
      ]
    ],
    'email'=>[
      'title'=>'Email','icon'=>'far fa-paper-plane','sections'=>[
        ['heading'=>'Email','cards'=>[
          ['title'=>'My Email','desc'=>'Manage your email services in one place.','url'=>'/clientarea.php?action=services']
        ]],
        ['heading'=>'Email Hosting','cards'=>[
          ['title'=>'Email Hosting','desc'=>'Professional email hosting with secure and reliable delivery.','url'=>'/index.php?rp=/store/email-hosting','badge'=>'HOT']
        ]]
      ]
    ],
    'supportBilling'=>[
      'title'=>'Support & Billing','icon'=>'far fa-life-ring','sections'=>[
        ['heading'=>'Support','cards'=>[
          ['title'=>'Open Ticket','desc'=>'Create a new support ticket for help.','url'=>'/submitticket.php'],
          ['title'=>'Tickets','desc'=>'Track and manage your support tickets.','url'=>'/supporttickets.php'],
          ['title'=>'Announcements','desc'=>'Read latest service announcements.','url'=>'/index.php?rp=/announcements'],
          ['title'=>'Knowledgebase','desc'=>'Browse help articles and guides.','url'=>'/index.php?rp=/knowledgebase'],
          ['title'=>'Network Status','desc'=>'Check current network and system status.','url'=>'/serverstatus.php'],
          ['title'=>'Contact Us','desc'=>'Reach our team for general inquiries.','url'=>'/contact.php']
        ]],
        ['heading'=>'Billing','cards'=>[
          ['title'=>'My Invoices','desc'=>'View and manage your invoices.','url'=>'/clientarea.php?action=invoices'],
          ['title'=>'My Quotes','desc'=>'Review saved and active quotes.','url'=>'/clientarea.php?action=quotes'],
          ['title'=>'Mass Payment','desc'=>'Pay multiple due invoices at once.','url'=>'/clientarea.php?action=masspay&all=true'],
          ['title'=>'Affiliates','desc'=>'Manage referrals and affiliate earnings.','url'=>'/affiliates.php']
        ]]
      ]
    ],
    'transfer'=>[
      'title'=>'Transfer to us','icon'=>'fas fa-exchange-alt','sections'=>[
        ['heading'=>'Transfers','cards'=>[
          ['title'=>'Transfer Domains','desc'=>'Move your domains to NameCadre.','url'=>'/cart.php?a=add&domain=transfer']
        ]]
      ]
    ],
    'why'=>[
      'title'=>'Why NameCadre','icon'=>'fas fa-redo','sections'=>[
        ['heading'=>'Why NameCadre','cards'=>[
          ['title'=>'Secured Server','desc'=>'Security-focused server infrastructure for protected workloads.','url'=>'/index.php?rp=/store/vps-server-usa'],
          ['title'=>'Our Server Pricing','desc'=>'Compare server package pricing quickly.','url'=>'/index.php?rp=/store/startup-usa-hosting'],
          ['title'=>'Domain Pricing','desc'=>'Check domain registration pricing.','url'=>'/cart.php?a=add&domain=register'],
          ['title'=>'Hosting Pricing','desc'=>'Check hosting plan pricing.','url'=>'/index.php?rp=/store/startup-usa-hosting']
        ]]
      ]
    ],
    'about'=>[
      'title'=>'About us','icon'=>'fas fa-sync-alt','sections'=>[
        ['heading'=>'About NameCadre','cards'=>[
          ['title'=>'About us','desc'=>'Engage with our mission and values.','url'=>'/about-us.php'],
          ['title'=>'Blog','desc'=>'Explore insights, news, and updates.','url'=>'/announcements.php'],
          ['title'=>'Release Notes','desc'=>"Stay on top of NameCadre's latest updates.",'url'=>'/announcements.php'],
          ['title'=>'Affiliate Program','desc'=>'Earn more promoting our products.','url'=>'/affiliates.php']
        ]]
      ]
    ]
  ]}

  {if isset($headerMenuData.tabs) && is_array($headerMenuData.tabs) && count($headerMenuData.tabs)}
    {assign var=hvxMenuTabs value=$headerMenuData.tabs}
  {/if}
  {if isset($headerMenuData.railGroups) && is_array($headerMenuData.railGroups)}
    {if isset($headerMenuData.railGroups.hot) && is_array($headerMenuData.railGroups.hot) && count($headerMenuData.railGroups.hot)}
      {assign var=hvxHotRails value=$headerMenuData.railGroups.hot}
    {/if}
    {if isset($headerMenuData.railGroups.products) && is_array($headerMenuData.railGroups.products) && count($headerMenuData.railGroups.products)}
      {assign var=hvxProductRails value=$headerMenuData.railGroups.products}
    {/if}
    {if isset($headerMenuData.railGroups.supportBilling) && is_array($headerMenuData.railGroups.supportBilling) && count($headerMenuData.railGroups.supportBilling)}
      {assign var=hvxSupportBillingRails value=$headerMenuData.railGroups.supportBilling}
    {/if}
    {if isset($headerMenuData.railGroups.universe) && is_array($headerMenuData.railGroups.universe) && count($headerMenuData.railGroups.universe)}
      {assign var=hvxUniverseRails value=$headerMenuData.railGroups.universe}
    {/if}
  {/if}
  {if isset($headerMenuData.rails) && is_array($headerMenuData.rails) && count($headerMenuData.rails)}
    {assign var=hvxMenuRails value=$headerMenuData.rails}
  {/if}

  <style>
    body.hvx-theme-dark,
    .hvx-header[data-hvx-theme="dark"] {
      --hvx-bg: #11151d;
      --hvx-bg-soft: #171c26;
      --hvx-surface: #151a24;
      --hvx-surface-2: #202632;
      --hvx-border: rgba(255, 255, 255, 0.12);
      --hvx-text: #f2f4f8;
      --hvx-text-soft: rgba(255, 255, 255, 0.65);
      --hvx-heading-muted: rgba(255, 255, 255, 0.52);
      --hvx-brand: #4776ff;
      --hvx-brand-contrast: #76a0ff;
      --hvx-state-brand-hover: rgba(71, 118, 255, 0.16);
      --hvx-state-brand-pressed: rgba(71, 118, 255, 0.22);
      --hvx-state-neutral-hover: rgba(255, 255, 255, 0.08);
      --hvx-state-neutral-pressed: rgba(255, 255, 255, 0.12);
      --hvx-pill: #202530;
      --hvx-popover-bg: linear-gradient(160deg, #2b303a, #222833);
      --hvx-popover-caret: #2a2f39;
      --hvx-popover-field-bg: #151a23;
      --hvx-promo-bg: linear-gradient(180deg, #2e333c, #252b34);
      --hvx-promo-cta-bg: #fff;
      --hvx-promo-cta-color: #20242d;
      --hvx-mega-bg:
        radial-gradient(900px 400px at 70% 92%, rgba(24, 95, 172, 0.26), rgba(0, 0, 0, 0)),
        radial-gradient(500px 300px at 92% 94%, rgba(70, 76, 200, 0.22), rgba(0, 0, 0, 0)),
        linear-gradient(180deg, #121722 0%, #10141d 100%);
      --hvx-drawer-bg: #121722;
      --hvx-logo-filter: brightness(1.05);
      --hvx-focus: #6e90ff;
      --hvx-backdrop-bg: rgba(7, 10, 16, 0.36);
      --hvx-backdrop-blur: 2;
      --hvx-qp-overlay-bg: rgba(2, 5, 12, 0.72);
      --hvx-qp-window-bg: #14171f;
      --hvx-qp-window-border: rgba(255, 255, 255, 0.12);
      --hvx-qp-window-shadow: 0 28px 80px rgba(0, 0, 0, 0.62);
      --hvx-qp-search-bg: #10131a;
      --hvx-qp-profile-bg: #1a1f2b;
      --hvx-qp-border: rgba(255, 255, 255, 0.1);
      --hvx-qp-text: #f6f8ff;
      --hvx-qp-text-soft: #95a2be;
      --hvx-qp-text-muted: #7f8ca7;
      --hvx-qp-placeholder: #8d99b4;
      --hvx-qp-kbd-bg: rgba(255, 255, 255, 0.05);
      --hvx-qp-kbd-border: rgba(255, 255, 255, 0.16);
      --hvx-qp-kbd-text: #b0bdd8;
      --hvx-qp-close-text: #a6b1c7;
      --hvx-qp-close-hover-bg: rgba(255, 255, 255, 0.08);
      --hvx-qp-close-hover-text: #ffffff;
      --hvx-qp-card-bg: rgba(255, 255, 255, 0.02);
      --hvx-qp-card-hover-bg: rgba(255, 255, 255, 0.06);
      --hvx-qp-card-hover-border: rgba(255, 255, 255, 0.14);
      --hvx-qp-icon-bg: rgba(80, 112, 255, 0.18);
      --hvx-qp-icon-text: #80a0ff;
      --hvx-qp-balance: #3fd191;
      --hvx-qp-scrollbar: rgba(255, 255, 255, 0.16);
      --hvx-whois-bg: rgba(255, 255, 255, 0.06);
      --hvx-whois-border: rgba(255, 255, 255, 0.2);
      --hvx-whois-placeholder: #9cabc8;
      --hvx-whois-btn-bg: #4b67ff;
      --hvx-whois-btn-color: #f5f7ff;
      --hvx-whois-btn-hover: #5c76ff;
      --hvx-notify-font-head: 16px;
      --hvx-notify-font-ui: 14px;
      --hvx-notify-font-menu: 14px;
      --hvx-notify-font-body: 14px;
      --hvx-notify-font-meta: 12px;
      --hvx-notify-font-section: 12px;
      --hvx-notify-font-empty-title: 18px;
      --hvx-notify-font-empty-subtitle: 14px;
      --hvx-notify-font-empty-link: 15px;
      --hvx-notify-font-footer: 14px;
    }

    body.hvx-theme-light,
    .hvx-header[data-hvx-theme="light"] {
      --hvx-bg: #ffffff;
      --hvx-bg-soft: #f7f8fb;
      --hvx-surface: #ffffff;
      --hvx-surface-2: #f2f3f6;
      --hvx-border: rgba(17, 24, 39, 0.12);
      --hvx-text: #2f3238;
      --hvx-text-soft: #5f636c;
      --hvx-heading-muted: #747983;
      --hvx-brand: #4f63ff;
      --hvx-brand-contrast: #3f58ff;
      --hvx-state-brand-hover: rgba(79, 99, 255, 0.12);
      --hvx-state-brand-pressed: rgba(79, 99, 255, 0.2);
      --hvx-state-neutral-hover: rgba(17, 24, 39, 0.06);
      --hvx-state-neutral-pressed: rgba(17, 24, 39, 0.1);
      --hvx-pill: #eef0f4;
      --hvx-popover-bg: linear-gradient(180deg, #ffffff, #f4f5f8);
      --hvx-popover-caret: #fafbff;
      --hvx-popover-field-bg: #ffffff;
      --hvx-promo-bg: linear-gradient(180deg, #ececef, #e5e6eb);
      --hvx-promo-cta-bg: #2d3037;
      --hvx-promo-cta-color: #ffffff;
      --hvx-mega-bg:
        radial-gradient(680px 360px at 74% 98%, rgba(88, 126, 255, 0.2), rgba(255, 255, 255, 0)),
        radial-gradient(380px 260px at 95% 100%, rgba(113, 84, 235, 0.12), rgba(255, 255, 255, 0)),
        linear-gradient(180deg, #fdfdff 0%, #f4f5f8 100%);
      --hvx-drawer-bg: #f9f9fc;
      --hvx-logo-filter: invert(1) brightness(0.12);
      --hvx-focus: #4f63ff;
      --hvx-backdrop-bg: rgba(10, 12, 16, 0.46);
      --hvx-backdrop-blur: 2px;
      --hvx-qp-overlay-bg: rgba(8, 12, 20, 0.42);
      --hvx-qp-window-bg: #ffffff;
      --hvx-qp-window-border: rgba(17, 24, 39, 0.14);
      --hvx-qp-window-shadow: 0 24px 70px rgba(14, 20, 35, 0.2);
      --hvx-qp-search-bg: #f6f7fb;
      --hvx-qp-profile-bg: #f1f3f8;
      --hvx-qp-border: rgba(17, 24, 39, 0.12);
      --hvx-qp-text: #202430;
      --hvx-qp-text-soft: #4f5564;
      --hvx-qp-text-muted: #6a7283;
      --hvx-qp-placeholder: #6b7385;
      --hvx-qp-kbd-bg: rgba(37, 45, 68, 0.06);
      --hvx-qp-kbd-border: rgba(37, 45, 68, 0.16);
      --hvx-qp-kbd-text: #5e677b;
      --hvx-qp-close-text: #4a5160;
      --hvx-qp-close-hover-bg: rgba(20, 28, 45, 0.08);
      --hvx-qp-close-hover-text: #202530;
      --hvx-qp-card-bg: rgba(12, 20, 36, 0.02);
      --hvx-qp-card-hover-bg: rgba(79, 99, 255, 0.08);
      --hvx-qp-card-hover-border: rgba(79, 99, 255, 0.2);
      --hvx-qp-icon-bg: rgba(79, 99, 255, 0.14);
      --hvx-qp-icon-text: #4258ff;
      --hvx-qp-balance: #157a56;
      --hvx-qp-scrollbar: rgba(23, 33, 55, 0.24);
      --hvx-whois-bg: #f6f8fd;
      --hvx-whois-border: rgba(17, 24, 39, 0.16);
      --hvx-whois-placeholder: #7b8394;
      --hvx-whois-btn-bg: #4f63ff;
      --hvx-whois-btn-color: #ffffff;
      --hvx-whois-btn-hover: #4057fb;
      --hvx-notify-font-head: 16px;
      --hvx-notify-font-ui: 14px;
      --hvx-notify-font-menu: 14px;
      --hvx-notify-font-body: 14px;
      --hvx-notify-font-meta: 12px;
      --hvx-notify-font-section: 12px;
      --hvx-notify-font-empty-title: 18px;
      --hvx-notify-font-empty-subtitle: 14px;
      --hvx-notify-font-empty-link: 15px;
      --hvx-notify-font-footer: 14px;
    }

    .hvx-header {
      --hvx-ease: cubic-bezier(0.55, 0, 0.35, 1);
      --hvx-dur-open: .3s;
      --hvx-dur-close: .3s;
      --hvx-dur-content: .2s;
      --hvx-dur-micro: .1s;
      --hvx-dur-accent: .02s;
      --hvx-delay-chevron: .2s;
      --hvx-delay-post-rail: .1s;
      --hvx-open-rail-delay: .12s;
      --hvx-open-content-delay: calc(var(--hvx-open-rail-delay) + var(--hvx-dur-open) + var(--hvx-delay-post-rail));
      --hvx-close-mega-delay: var(--hvx-dur-close);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 1200;
      background: var(--hvx-bg);
      border-bottom: 1px solid var(--hvx-border);
      font-family: "Open Sans", sans-serif;
      transition: transform var(--hvx-dur-content) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease);
      will-change: transform;
    }

    body:not(.hvx-header-hidden) .hvx-header {
      transform: translateY(0);
      opacity: 1;
    }

    body.hvx-mega-open {
      overflow: hidden;
    }

    body {
      padding-top: 80px;
    }

    body.hvx-header-hidden .hvx-header {
      transform: translateY(calc(-100% - 1px));
      opacity: .98;
    }

    .hvx-header * {
      box-sizing: border-box;
    }

    .hvx-bar {
      max-width: 1440px;
      margin: 0 auto;
      min-height: 80px;
      display: grid;
      grid-template-columns: minmax(160px, min(20%, 250px)) minmax(0, 1fr) auto;
      align-items: center;
      gap: clamp(10px, 1.6vw, 20px);
      padding: 0 clamp(12px, 2vw, 24px);
    }

    .hvx-logo {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      color: var(--hvx-text);
      text-decoration: none;
      font-size: 22px;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .hvx-logo img {
      height: 34px;
      width: auto;
      object-fit: contain;
      filter: none;
    }

    .hvx-primary-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
      overflow: hidden;
      flex-wrap: nowrap;
    }

    .hvx-primary-nav.hvx-all-hidden {
      display: none;
    }

    @media (max-width: 676px) {
      .hvx-primary-nav {
        display: none;
      }
    }

    .hvx-tab {
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      font-weight: 700;
      font-size: clamp(13px, 1.10vw, 16px);
      line-height: 1;
      padding: clamp(8px, .78vw, 10px) clamp(10px, .95vw, 15px);
      border-radius: 10px;
      transition: background-color var(--hvx-dur-content) var(--hvx-ease), color var(--hvx-dur-content) var(--hvx-ease);
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      min-width: 0;
      flex: 0 0 auto;
      max-width: max-content;
    }

    .hvx-tab:hover,
    .hvx-tab.is-active {
      background: var(--hvx-state-neutral-hover);
      color: var(--hvx-text);
    }

    .hvx-tab.is-hidden-by-fit {
      display: none;
    }

    .hvx-toolbar {
      display: flex;
      align-items: center;
      gap: clamp(6px, .8vw, 10px);
      position: relative;
      justify-content: flex-end;
    }

    .hvx-whois-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 1 auto;
    }

    .hvx-toolbar .hvx-whois-search {
      flex: 0 1 240px;
      margin-right: 2px;
    }

    body.hvx-tablet.hvx-whois-toolbar-open .hvx-whois-btn {
      border-radius: 10px !important;
    }

    .hvx-launchpad {
      border: 0;
      background: var(--hvx-pill);
      color: var(--hvx-text);
      border-radius: 10px;
      min-height: 40px;
      padding: 0px 18px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
    }

    .hvx-launchpad-label {
      display: inline;
    }

    .hvx-whois-search {
      min-width: 260px;
      width: 100%;
      max-width: 260px;
      display: flex;
      align-items: center;
      padding: 3px;
      border-radius: 10px;
      background: var(--hvx-whois-bg);
      border: 1px solid var(--hvx-whois-border);
      transition: max-width var(--hvx-dur-content) var(--hvx-ease), width var(--hvx-dur-content) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease), transform var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-whois-search:focus-within {
      border-color: var(--hvx-focus);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--hvx-focus) 26%, transparent);
    }

    .hvx-whois-input {
      flex: 1 1 auto;
      min-width: 0;
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      height: 32px;
      padding: 0 10px;
      font-size: 13px;
      outline: none;
    }

    .hvx-whois-input::placeholder {
      color: var(--hvx-whois-placeholder);
    }

    .hvx-whois-btn {
      border: 0;
      height: 32px;
      padding: 0 12px;
      border-radius: 10px;
      background: var(--hvx-whois-btn-bg);
      color: var(--hvx-whois-btn-color);
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: background-color var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-whois-btn:hover {
      background: var(--hvx-whois-btn-hover);
      color: var(--hvx-whois-btn-color);
    }

    .hvx-whois-btn:active,
    .hvx-whois-btn:focus-visible {
      color: var(--hvx-whois-btn-color);
    }

    .hvx-whois-close {
      border: 0;
      width: 0;
      height: 32px;
      padding: 0;
      opacity: 0;
      overflow: hidden;
      background: transparent;
      color: var(--hvx-text);
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      transition: width var(--hvx-dur-content) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease), margin-left var(--hvx-dur-content) var(--hvx-ease), background-color var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-whois-close:hover {
      background: var(--hvx-state-neutral-hover);
    }

    .hvx-tool-btn {
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      min-width: 38px;
      min-height: 38px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      text-decoration: none;
      cursor: pointer;
      transition: background-color var(--hvx-dur-content) var(--hvx-ease), color var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-tool-btn:hover,
    .hvx-tool-btn.is-open {
      background: var(--hvx-state-neutral-hover);
    }

    .hvx-tool-btn--notify {
      position: relative;
    }

    .hvx-tool-btn--notify .hvx-notify-dot {
      position: absolute;
      top: 7px;
      right: 8px;
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: var(--hvx-brand);
      box-shadow: 0 0 0 2px var(--hvx-surface);
      display: none;
      pointer-events: none;
    }

    .hvx-tool-btn--notify.has-unread .hvx-notify-dot {
      display: block;
    }

    .hvx-popover {
      position: absolute;
      right: 0;
      top: calc(100% + 8px);
      width: 290px;
      background: var(--hvx-popover-bg);
      border: 1px solid var(--hvx-border);
      border-radius: 10px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      padding: 20px;
      display: none;
      z-index: 1300;
    }

    .hvx-popover.is-open {
      display: block;
    }

    .hvx-popover::before {
      content: "";
      position: absolute;
      top: -7px;
      right: var(--hvx-popover-caret-right, 24px);
      width: 12px;
      height: 12px;
      background: var(--hvx-popover-caret);
      border-top: 1px solid var(--hvx-border);
      border-left: 1px solid var(--hvx-border);
      transform: rotate(45deg);
    }

    .hvx-popover--account {
      right: 0;
      width: 320px;
      padding: 14px;
    }

    .hvx-popover--notify {
      right: 46px;
      width: min(520px, calc(100vw - 16px));
      padding: 0;
      border-radius: 12px;
      background: var(--hvx-surface);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.34);
      overflow: visible;
    }

    .hvx-popover--locale {
      right: 95px;
    }

    .hvx-tab:focus-visible,
    .hvx-tool-btn:focus-visible,
    .hvx-rail-item:focus-visible,
    .hvx-mobile-link:focus-visible,
    .hvx-mobile-theme-btn:focus-visible,
    .hvx-mobile-menu-tool-btn:focus-visible,
    .hvx-mobile-menu-close:focus-visible,
    .hvx-mobile-menu-back:focus-visible {
      outline: 2px solid var(--hvx-focus);
      outline-offset: 2px;
    }

    .hvx-whois-input:focus-visible,
    .hvx-whois-btn:focus-visible {
      outline: none;
    }

    .hvx-popover h4 {
      margin: 0 0 14px;
      color: var(--hvx-text);
      font-size: 14px;
      font-weight: 700;
    }

    .hvx-popover .hvx-field {
      margin-top: 14px;
    }

    .hvx-popover label {
      display: block;
      color: var(--hvx-text-soft);
      font-size: 13px;
      margin-bottom: 6px;
    }

    .hvx-popover select,
    .hvx-popover a.hvx-pop-link {
      width: 100%;
      border: 1px solid var(--hvx-border);
      border-radius: 8px;
      min-height: 40px;
      background: var(--hvx-popover-field-bg);
      color: var(--hvx-text);
      padding: 0 12px;
      font-size: 14px;
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    .hvx-locale-select {
      appearance: none;
      background-image: linear-gradient(45deg, transparent 50%, var(--hvx-text-soft) 50%), linear-gradient(135deg, var(--hvx-text-soft) 50%, transparent 50%);
      background-position: calc(100% - 17px) calc(50% - 2px), calc(100% - 12px) calc(50% - 2px);
      background-size: 5px 5px, 5px 5px;
      background-repeat: no-repeat;
      padding-right: 34px;
      cursor: pointer;
    }

    .hvx-currency-select,
    .hvx-language-select {
      position: relative;
    }

    .hvx-currency-trigger,
    .hvx-language-trigger {
      width: 100%;
      border: 1px solid var(--hvx-border);
      border-radius: 8px;
      min-height: 40px;
      background: var(--hvx-popover-field-bg);
      color: var(--hvx-text);
      padding: 0 12px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
    }

    .hvx-currency-trigger i,
    .hvx-language-trigger i {
      color: var(--hvx-text-soft);
      font-size: 12px;
      transition: transform var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-currency-select.is-open .hvx-currency-trigger,
    .hvx-language-select.is-open .hvx-language-trigger {
      border-color: var(--hvx-focus);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--hvx-focus) 45%, transparent);
    }

    .hvx-currency-select.is-open .hvx-currency-trigger i,
    .hvx-language-select.is-open .hvx-language-trigger i {
      transform: rotate(180deg);
    }

    .hvx-currency-panel,
    .hvx-language-panel {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      right: 0;
      background: var(--hvx-surface);
      border: 1px solid var(--hvx-border);
      border-radius: 10px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
      z-index: 12;
      display: none;
      overflow: hidden;
    }

    .hvx-currency-select.is-open .hvx-currency-panel,
    .hvx-language-select.is-open .hvx-language-panel {
      display: block;
    }

    .hvx-currency-search,
    .hvx-language-search {
      display: flex !important;
      align-items: center;
      gap: 8px;
      min-height: 40px;
      padding: 0 12px;
      border-bottom: 1px solid var(--hvx-border);
    }

    .hvx-currency-search i,
    .hvx-language-search i {
      color: var(--hvx-text-soft);
      font-size: 13px;
    }

    .hvx-currency-search input,
    .hvx-language-search input {
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      font-size: 14px;
      width: 100%;
      outline: none;
      padding: 0;
    }

    .hvx-currency-options,
    .hvx-language-options {
      list-style: none;
      margin: 0 !important;
      padding: 6px !important;
      max-height: 240px !important;
      overflow-y: auto !important;
      display: grid !important;
      gap: 2px;
    }

    .hvx-currency-option,
    .hvx-language-option {
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      text-align: left;
      min-height: 34px;
      border-radius: 7px;
      padding: 6px 10px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color var(--hvx-dur-content) var(--hvx-ease), color var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-currency-option:hover,
    .hvx-language-option:hover {
      background: var(--hvx-state-neutral-hover);
    }

    .hvx-currency-option.is-active,
    .hvx-language-option.is-active {
      background: var(--hvx-state-brand-pressed);
      color: var(--hvx-brand-contrast);
      font-weight: 700;
    }

    .hvx-currency-empty,
    .hvx-language-empty {
      display: none;
      padding: 10px 12px 12px;
      color: var(--hvx-text-soft);
      font-size: 13px;
    }

    .hvx-currency-panel.is-empty .hvx-currency-empty,
    .hvx-language-panel.is-empty .hvx-language-empty {
      display: block;
    }

    .hvx-popover ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 8px;
    }

    .hvx-popover--account .hvx-account-head {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 8px 12px;
      margin-bottom: 8px;
      border-bottom: 1px solid var(--hvx-border);
    }

    .hvx-popover--account .hvx-account-avatar {
      width: 38px;
      height: 38px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--hvx-brand) 18%, transparent);
      color: var(--hvx-brand-contrast);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex: 0 0 auto;
    }

    .hvx-popover--account .hvx-account-name {
      margin: 0;
      color: var(--hvx-text);
      font-size: 14px;
      line-height: 1.25;
      font-weight: 700;
    }

    .hvx-popover--account .hvx-account-sub {
      margin: 2px 0 0;
      color: var(--hvx-text-soft);
      font-size: 12px;
      line-height: 1.3;
    }

    .hvx-popover--account ul {
      gap: 6px;
    }

    .hvx-popover--account a.hvx-pop-link {
      min-height: 42px;
      border-radius: 10px;
      padding: 0 11px;
      justify-content: space-between;
      gap: 10px;
      transition: background-color var(--hvx-dur-content) var(--hvx-ease), border-color var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-popover--account a.hvx-pop-link:hover {
      background: var(--hvx-state-neutral-hover);
      border-color: color-mix(in srgb, var(--hvx-brand) 30%, var(--hvx-border));
    }

    .hvx-popover--account .hvx-pop-link-main {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .hvx-popover--account .hvx-pop-link-main i {
      width: 16px;
      text-align: center;
      color: var(--hvx-text-soft);
      font-size: 14px;
    }

    .hvx-popover--account .hvx-pop-link-chevron {
      color: var(--hvx-text-soft);
      font-size: 11px;
    }

    .hvx-notify-wrap {
      display: grid;
      grid-template-rows: auto auto auto minmax(0, 1fr) auto;
      max-height: min(76vh, 560px);
      background: var(--hvx-surface);
      border-radius: 12px;
      overflow: hidden;
    }

    .hvx-notify-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      border-bottom: 1px solid var(--hvx-border);
    }

    .hvx-notify-head h4 {
      margin: 0;
      font-size: var(--hvx-notify-font-head);
      color: var(--hvx-text);
      line-height: 1.1;
      font-weight: 700;
    }

    .hvx-notify-head-actions,
    .hvx-notify-item-actions {
      position: relative;
      display: inline-flex;
      z-index: 40;
    }

    .hvx-notify-menu-btn {
      border: 0;
      background: transparent;
      color: var(--hvx-text-soft);
      width: 34px;
      height: 34px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color var(--hvx-dur-content) var(--hvx-ease), color var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-notify-menu-btn:hover,
    .hvx-notify-menu-btn.is-open {
      background: var(--hvx-state-neutral-hover);
      color: var(--hvx-text);
    }

    .hvx-notify-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      min-width: 258px;
      background: var(--hvx-surface);
      border: 1px solid var(--hvx-border);
      border-radius: 12px;
      box-shadow: 0 16px 34px rgba(0, 0, 0, 0.22);
      z-index: 9999;
      display: none;
      overflow: hidden;
    }

    .hvx-notify-menu.is-open {
      display: block;
      z-index: 9999;
    }

    .hvx-notify-menu button,
    .hvx-notify-menu a {
      width: 100%;
      border: 0;
      background: transparent;
      min-height: 48px;
      padding: 0 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--hvx-text);
      font-size: var(--hvx-notify-font-menu);
      text-align: left;
      text-decoration: none;
      cursor: pointer;
    }

    .hvx-notify-menu button+button,
    .hvx-notify-menu button+a,
    .hvx-notify-menu a+button,
    .hvx-notify-menu a+a {
      border-top: 1px solid var(--hvx-border);
    }

    .hvx-notify-menu button:hover,
    .hvx-notify-menu a:hover {
      background: var(--hvx-state-neutral-hover);
    }

    .hvx-notify-menu button:disabled {
      opacity: .55;
      cursor: not-allowed;
    }

    .hvx-notify-filters {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 22px 10px;
    }

    .hvx-notify-filter {
      border: 0;
      background: color-mix(in srgb, var(--hvx-text) 8%, transparent);
      color: var(--hvx-text);
      border-radius: 999px;
      min-height: 32px;
      padding: 0 14px;
      font-size: var(--hvx-notify-font-ui);
      font-weight: 700;
      cursor: pointer;
      transition: background-color var(--hvx-dur-content) var(--hvx-ease), color var(--hvx-dur-content) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-notify-filter.is-active {
      background: color-mix(in srgb, var(--hvx-brand) 16%, transparent);
      color: var(--hvx-brand-contrast);
    }

    .hvx-notify-filter.is-dimmed {
      opacity: .48;
    }

    .hvx-notify-section-label {
      padding: 8px 22px 12px;
      color: var(--hvx-heading-muted);
      text-transform: uppercase;
      letter-spacing: .06em;
      font-size: var(--hvx-notify-font-section);
      font-weight: 700;
    }

    .hvx-notify-body {
      overflow-y: auto;
      border-top: 1px solid var(--hvx-border);
    }

    .hvx-notify-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: block;
    }

    .hvx-notify-item {
      border-bottom: 1px solid var(--hvx-border);
      background: var(--hvx-surface);
      transition: background-color var(--hvx-dur-content) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-notify-item.is-unread {
      background: color-mix(in srgb, var(--hvx-brand) 12%, transparent);
    }

    .hvx-notify-row {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 12px;
      align-items: flex-start;
      padding: 18px 22px;
    }

    .hvx-notify-avatar {
      width: 40px;
      height: 40px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: #3b8495;
      font-size: 16px;
      margin-top: 2px;
      flex-shrink: 0;
      position: relative;
    }

    .hvx-notify-flag-badge {
      position: absolute;
      right: -8px;
      top: -5px;
      width: 16px;
      height: 16px;
      border-radius: 999px;
      display: none;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      color: #fff;
      background: var(--hvx-brand);
      box-shadow: 0 0 0 2px var(--hvx-surface);
    }

    .hvx-notify-item.is-flagged .hvx-notify-flag-badge {
      display: inline-flex;
    }

    .hvx-notify-main {
      text-decoration: none;
      min-width: 0;
    }

    .hvx-notify-category {
      color: var(--hvx-brand-contrast);
      text-transform: uppercase;
      letter-spacing: .08em;
      font-size: 11px;
      font-weight: 800;
      margin-bottom: 5px;
    }

    .hvx-notify-title {
      margin: 0;
      color: var(--hvx-text);
      font-size: var(--hvx-notify-font-body);
      line-height: 1.45;
      font-weight: 500;
    }

    .hvx-notify-desc {
      margin: 0;
      color: var(--hvx-text);
      font-size: var(--hvx-notify-font-body);
      line-height: 1.45;
      font-weight: 400;
    }

    .hvx-notify-time {
      margin: 8px 0 0;
      color: var(--hvx-brand-contrast);
      font-size: var(--hvx-notify-font-meta);
      line-height: 1.25;
      font-weight: 500;
    }

    .hvx-notify-more {
      display: inline-flex;
      margin-top: 10px;
      border-radius: 999px;
      padding: 6px 12px;
      background: color-mix(in srgb, var(--hvx-brand) 18%, transparent);
      color: var(--hvx-brand-contrast);
      font-size: 12px;
      line-height: 1;
      font-weight: 800;
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    .hvx-notify-item-menu {
      right: 0;
      top: calc(100% + 4px);
      min-width: 288px;
      z-index: 10000;
    }

    .hvx-notify-empty {
      display: none;
      margin: 0;
      padding: 34px 26px 40px;
      min-height: 320px;
      text-align: center;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 14px;
    }

    .hvx-notify-empty-icon {
      width: 72px;
      height: 72px;
      border-radius: 18px;
      background: radial-gradient(circle at 28% 28%, #ffffff 0%, #e5e5e7 34%, #c4c4c8 62%, #9a9aa1 100%);
      transform: rotate(45deg);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .72), 0 12px 22px rgba(0, 0, 0, .14);
      position: relative;
    }

    .hvx-notify-empty-icon::before,
    .hvx-notify-empty-icon::after {
      content: '';
      position: absolute;
      background: rgba(255, 255, 255, .84);
      border-radius: 999px;
    }

    .hvx-notify-empty-icon::before {
      width: 40px;
      height: 8px;
      left: 16px;
      top: 32px;
    }

    .hvx-notify-empty-icon::after {
      width: 8px;
      height: 40px;
      left: 32px;
      top: 16px;
    }

    .hvx-notify-empty-title {
      margin: 8px 0 0;
      color: var(--hvx-text);
      font-size: var(--hvx-notify-font-empty-title);
      line-height: 1.2;
      font-weight: 700;
    }

    .hvx-notify-empty-subtitle {
      margin: 0;
      color: var(--hvx-text-soft);
      font-size: var(--hvx-notify-font-empty-subtitle);
      line-height: 1.5;
      text-align: center;
    }

    .hvx-notify-empty-link {
      color: var(--hvx-brand-contrast);
      font-size: var(--hvx-notify-font-empty-link);
      line-height: 1.25;
      font-weight: 500;
      text-decoration: none;
    }

    .hvx-notify-empty-link:hover {
      color: var(--hvx-brand);
      text-decoration: underline;
    }

    .hvx-notify-footer {
      min-height: 56px;
      border-top: 1px solid var(--hvx-border);
      background: var(--hvx-surface);
      color: var(--hvx-text);
      font-size: var(--hvx-notify-font-footer);
      line-height: 1;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    body.hvx-tablet .hvx-popover--notify {
      right: 0;
      width: min(500px, calc(100vw - 12px));
    }

    body.hvx-compact .hvx-popover--notify {

      top: calc(100% + 10px);
      width: min(92vw, 420px);
      max-height: calc(100dvh - 104px);
      z-index: 1350;

    }

    body.hvx-tablet .hvx-notify-empty-title,
    body.hvx-compact .hvx-notify-empty-title {
      font-size: 17px;
    }

    body.hvx-tablet .hvx-notify-empty-subtitle,
    body.hvx-compact .hvx-notify-empty-subtitle {
      font-size: 13px;
    }

    body.hvx-tablet .hvx-notify-empty-link,
    body.hvx-compact .hvx-notify-empty-link {
      font-size: 14px;
    }

    .hvx-notify-footer:hover {
      background: var(--hvx-state-neutral-hover);
      color: var(--hvx-text);
    }

    .hvx-mega {
      position: fixed;
      top: 72px;
      left: 0;
      right: 0;
      z-index: 1250;
      max-height: calc(80vh - 72px);
      height: 0;
      overflow: hidden;
      border-top: 1px solid var(--hvx-border);
      opacity: 0;
      pointer-events: none;
      transition: height 0.2s cubic-bezier(0.55, 0, 0.35, 1), opacity 0.02s cubic-bezier(0.55, 0, 0.35, 1);
      transition-delay: 0s, 0s;
      background: var(--hvx-mega-bg);
    }

    .hvx-mega.is-opening,
    .hvx-mega.is-open {
      height: calc(80vh - 72px);
      opacity: 1;
      pointer-events: auto;
    }

    .hvx-mega.is-closing {
      height: 0;
      opacity: 0;
      pointer-events: none;
      transition-delay: 0s, 0s;
    }

    .hvx-mega-inner {
      max-width: 1440px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 296px 1fr;
      height: calc(80vh - 72px);
    }

    .hvx-mega-backdrop {
      position: fixed;
      top: 72px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;

      background: var(--hvx-backdrop-bg);
      -webkit-backdrop-filter: blur(var(--hvx-backdrop-blur));
      backdrop-filter: blur(var(--hvx-backdrop-blur));
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--hvx-dur-content) var(--hvx-ease);
    }

    body.hvx-mega-open .hvx-mega-backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    .hvx-rail {
      border-right: 1px solid var(--hvx-border);
      padding: 20px 24px 24px;
      height: calc(80vh - 72px);
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;
      opacity: 1;
      transform: translateX(0);
    }

    .hvx-rail::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }

    .hvx-rail.is-enter {
      opacity: 0;
      transform: translateX(-12px);
    }

    .hvx-rail.is-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: transform var(--hvx-dur-open) var(--hvx-ease), opacity var(--hvx-dur-open) var(--hvx-ease);
      transition-delay: var(--hvx-open-rail-delay), var(--hvx-open-rail-delay);
    }

    .hvx-rail.is-enter .hvx-rail-item {
      opacity: 0;
      transform: translateX(-12px);
    }

    .hvx-rail.is-enter-active .hvx-rail-item {
      opacity: 1;
      transform: translateX(0);
      transition: transform var(--hvx-dur-open) var(--hvx-ease), opacity var(--hvx-dur-open) var(--hvx-ease);
    }

    .hvx-rail.is-enter-active .hvx-rail-list li:nth-child(1) .hvx-rail-item {
      transition-delay: calc(var(--hvx-open-rail-delay) + .02s);
    }

    .hvx-rail.is-enter-active .hvx-rail-list li:nth-child(2) .hvx-rail-item {
      transition-delay: calc(var(--hvx-open-rail-delay) + .04s);
    }

    .hvx-rail.is-enter-active .hvx-rail-list li:nth-child(3) .hvx-rail-item {
      transition-delay: calc(var(--hvx-open-rail-delay) + .06s);
    }

    .hvx-rail.is-enter-active .hvx-rail-list li:nth-child(4) .hvx-rail-item {
      transition-delay: calc(var(--hvx-open-rail-delay) + .08s);
    }

    .hvx-rail.is-enter-active .hvx-rail-list li:nth-child(5) .hvx-rail-item {
      transition-delay: calc(var(--hvx-open-rail-delay) + .1s);
    }

    .hvx-rail.is-leave {
      opacity: 1;
      transform: translateX(0);
    }

    .hvx-rail.is-leave-active {
      opacity: 0;
      transform: translateX(-12px);
      transition: transform var(--hvx-dur-close) var(--hvx-ease), opacity var(--hvx-dur-close) var(--hvx-ease);
      transition-delay: 0s, 0s;
    }

    .hvx-rail-title {
      margin: 20px 0 10px;
      color: var(--hvx-text-soft);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .7px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .hvx-rail-title::after {
      content: "";
      flex: 1;
      height: 1px;
      background: var(--hvx-border);
    }

    .hvx-rail-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 6px;
    }

    .hvx-rail-item {
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      text-align: left;
      min-height: 38px;
      border-radius: 999px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color var(--hvx-dur-open) var(--hvx-ease), color var(--hvx-dur-open) var(--hvx-ease), transform var(--hvx-dur-open) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-rail-item i {
      width: 16px;
      text-align: center;
      color: var(--hvx-text-soft);
      transition: color var(--hvx-dur-content) var(--hvx-ease), transform var(--hvx-dur-open) var(--hvx-ease);
      transition-delay: 0s;
    }

    .hvx-rail-item:hover {
      background: var(--hvx-state-brand-hover);
      color: var(--hvx-brand-contrast);
    }

    .hvx-rail-item.is-active {
      background: var(--hvx-state-brand-pressed);
      color: var(--hvx-brand-contrast);
    }

    .hvx-rail-item:hover i,
    .hvx-rail-item.is-active i {
      color: var(--hvx-brand-contrast);
      transform: translateX(1px);
      transition-delay: var(--hvx-delay-chevron);
    }

    .hvx-content {
      position: relative;
      height: calc(80vh - 72px);
      overflow: hidden;
      opacity: 1;
      transform: translateX(0);
      will-change: transform, opacity;
      transition: transform var(--hvx-dur-content) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease);
      --hvx-scroll-ratio: 0;
    }


    .hvx-content>* {
      position: relative;
      z-index: 1;
    }

    .hvx-content.is-content-enter {
      opacity: 0;
    }

    .hvx-content.is-content-enter.dir-forward {
      transform: translateX(-16px);
    }

    .hvx-content.is-content-enter.dir-backward {
      transform: translateX(16px);
    }

    .hvx-content.is-content-enter.is-content-enter-active {
      opacity: 1;
      transform: translateX(0);
    }

    .hvx-content.is-opening-sequence.is-content-enter.is-content-enter-active {
      transition-delay: var(--hvx-open-content-delay), var(--hvx-open-content-delay);
    }

    .hvx-content.is-content-leave {
      opacity: 1;
      transform: translateX(0);
    }

    .hvx-content.is-content-leave.dir-forward.is-content-leave-active {
      opacity: 0;
      transform: translateX(-16px);
      transition-delay: 0s, 0s;
    }

    .hvx-content.is-content-leave.dir-backward.is-content-leave-active {
      opacity: 0;
      transform: translateX(16px);
      transition-delay: 0s, 0s;
    }

    .hvx-content.is-close-leave {
      opacity: 1;
      transform: translateX(0);
    }

    .hvx-content.is-close-leave.is-close-leave-active {
      opacity: 0;
      transform: translateX(-12px);
      transition: transform var(--hvx-dur-close) var(--hvx-ease), opacity var(--hvx-dur-close) var(--hvx-ease);
      transition-delay: 0s, 0s;
    }

    .hvx-groups {
      background: color-mix(in srgb, var(--hvx-surface) 82%, transparent);
      display: flex;
      flex-direction: column;
      width: 100%;
      min-width: 0;
      padding-bottom: 26px;
    }

    .hvx-group {
      border-bottom: 1px solid var(--hvx-border);
    }

    .hvx-group-heading {
      padding: 14px 30px 10px;
      background: color-mix(in srgb, var(--hvx-surface) 92%, transparent);
      border-bottom: 1px solid color-mix(in srgb, var(--hvx-border) 70%, transparent);
      transition: background-color var(--hvx-dur-micro) var(--hvx-ease), border-color var(--hvx-dur-micro) var(--hvx-ease);
    }

    .hvx-group-title {
      color: var(--hvx-heading-muted);
      font-size: 12px;
      letter-spacing: .7px;
      margin: 0;
      text-transform: uppercase;
      font-weight: 700;
      transition: color var(--hvx-dur-micro) var(--hvx-ease);
    }

    .hvx-group-body {
      padding: 8px 20px 20px;
      width: 100%;
      min-width: 0;
    }

    .hvx-items-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, 256px);
      gap: 8px 12px;
      justify-content: start;
      width: 100%;
      min-width: 0;
    }

    .hvx-items-list__item {
      min-height: 86px;
      padding-right: 0;
      max-width: 100%;
      min-width: 0;
      display: block;
    }

    .hvx-items-empty {
      min-height: 8px;
    }

    .hvx-card-link {
      display: block;
      color: var(--hvx-text);
      text-decoration: none;
      border-radius: 10px;
      padding: 10px 12px;
      width: 100%;
      transition: background-color var(--hvx-dur-content) var(--hvx-ease), color var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-card-link:hover {
      background: var(--hvx-state-neutral-hover);
      text-decoration: none;
      color: var(--hvx-text);
    }

    .hvx-card-link.is-featured {
      background: var(--hvx-state-neutral-pressed);
      color: var(--hvx-text);
    }

    .hvx-card-title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: var(--hvx-text);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .hvx-card-desc {
      margin: 7px 0 0;
      color: var(--hvx-text-soft);
      font-size: 13px;
      line-height: 1.35;
    }

    .hvx-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      min-width: 34px;
      padding: 0 8px;
      border-radius: 999px;
      background: var(--hvx-brand);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .hvx-promo {
      position: absolute;
      right: 24px;
      top: 24px;
      width: 280px;
      background: var(--hvx-promo-bg);
      border-radius: 10px;
      border: 1px solid var(--hvx-border);
      padding: 24px;
      color: var(--hvx-text);
      min-height: 460px;
      overflow: hidden;
    }

    .hvx-promo h5 {
      margin: 0;
      font-size: 38px;
      font-weight: 700;
      line-height: 1.1;
    }

    .hvx-promo p {
      margin: 10px 0 18px;
      color: var(--hvx-text-soft);
      font-size: 17px;
      line-height: 1.45;
    }

    .hvx-promo a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 38px;
      border-radius: 999px;
      background: var(--hvx-promo-cta-bg);
      color: var(--hvx-promo-cta-color);
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      padding: 6px 14px;
    }

    .hvx-promo::after {
      content: "";
      position: absolute;
      right: -62px;
      bottom: -92px;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle at 40% 40%, #8f98ff, #5f4fcf 46%, #2a2f39 72%);
      transform: rotate(45deg);
      border-radius: 30px;
      opacity: 0.9;
    }

    .hvx-rail-panel {
      position: absolute;
      inset: 0;
      display: block;
      overflow-y: auto;
      overflow-x: hidden;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      z-index: 1;
    }

    .hvx-rail-panel::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }

    .hvx-rail-panel::-webkit-scrollbar-track {
      background: transparent;
    }

    .hvx-rail-panel::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 0;
    }

    .hvx-rail-panel.is-active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      z-index: 2;
    }

    .hvx-rail-panel.hvx-no-overflow {
      overflow-y: hidden;
    }

    .hvx-rail-panel.has-promo .hvx-groups {
      max-width: calc(100% - min(22vw, 308px));
    }

    .hvx-mobile-toggle {
      display: none;
      border: 0;
      background: var(--hvx-state-neutral-hover);
      color: var(--hvx-text);
      min-width: 44px;
      min-height: 44px;
      border-radius: 9px;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    body:not(.hvx-tablet):not(.hvx-compact) .hvx-mobile-toggle,
    body.hvx-desktop .hvx-mobile-toggle {
      display: none !important;
    }

    .hvx-qp-overlay {
      position: fixed;
      inset: 0;
      background: var(--hvx-qp-overlay-bg);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 1600;
      display: none;
      padding: clamp(16px, 3vw, 36px);
    }

    body.hvx-qp-open {
      overflow: hidden;
    }

    body.hvx-qp-open .hvx-qp-overlay {
      display: block;
    }

    .hvx-qp-window {
      width: min(980px, 94vw);
      margin: 0 auto;
      background: var(--hvx-qp-window-bg);
      border: 1px solid var(--hvx-qp-window-border);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--hvx-qp-window-shadow);
      animation: hvxQpIn .26s var(--hvx-ease);
    }

    @keyframes hvxQpIn {
      from {
        opacity: 0;
        transform: translateY(16px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hvx-qp-search {
      min-height: 66px;
      background: var(--hvx-qp-search-bg);
      border-bottom: 1px solid var(--hvx-qp-border);
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 clamp(16px, 2.1vw, 24px);
    }

    .hvx-qp-search>i {
      color: var(--hvx-qp-text-muted);
      font-size: 16px;
    }

    .hvx-qp-search input {
      flex: 1;
      background: transparent;
      border: 0;
      outline: none;
      color: var(--hvx-qp-text);
      font-size: 15px;
      min-width: 0;
    }

    .hvx-qp-search input::placeholder {
      color: var(--hvx-qp-placeholder);
    }

    .hvx-qp-kbd {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .hvx-qp-kbd span {
      min-height: 24px;
      padding: 0 8px;
      border-radius: 6px;
      border: 1px solid var(--hvx-qp-kbd-border);
      color: var(--hvx-qp-kbd-text);
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--hvx-qp-kbd-bg);
    }

    .hvx-qp-close {
      border: 0;
      background: transparent;
      color: var(--hvx-qp-close-text);
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
    }

    .hvx-qp-close:hover {
      background: var(--hvx-qp-close-hover-bg);
      color: var(--hvx-qp-close-hover-text);
    }

    .hvx-qp-profile {
      min-height: 84px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 14px clamp(16px, 2.1vw, 24px);
      background: var(--hvx-qp-profile-bg);
      border-bottom: 1px solid var(--hvx-qp-border);
    }

    .hvx-qp-profile-main {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .hvx-qp-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--hvx-qp-kbd-bg);
      color: var(--hvx-qp-text-muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .hvx-qp-welcome {
      margin: 0;
      color: var(--hvx-qp-text);
      font-size: 14px;
      font-weight: 700;
    }

    .hvx-qp-sub {
      margin: 2px 0 0;
      color: var(--hvx-qp-text-soft);
      font-size: 12px;
    }

    .hvx-qp-balance {
      text-align: right;
    }

    .hvx-qp-balance p {
      margin: 0;
      color: var(--hvx-qp-text-muted);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .6px;
      font-weight: 700;
    }

    .hvx-qp-balance strong {
      color: var(--hvx-qp-balance);
      font-size: 16px;
      font-weight: 700;
    }

    .hvx-qp-content {
      max-height: min(62vh, 560px);
      overflow-y: auto;
      padding: 12px clamp(16px, 2.1vw, 24px) 22px;
      background: var(--hvx-qp-window-bg);
    }

    .hvx-qp-content::-webkit-scrollbar {
      width: 8px;
    }

    .hvx-qp-content::-webkit-scrollbar-thumb {
      background: var(--hvx-qp-scrollbar);
      border-radius: 999px;
    }

    .hvx-qp-section h5 {
      margin: 14px 0 10px;
      color: var(--hvx-qp-text-muted);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .8px;
      font-weight: 700;
    }

    .hvx-qp-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }

    .hvx-qp-grid a {
      text-decoration: none;
      border: 1px solid transparent;
      border-radius: 12px;
      background: var(--hvx-qp-card-bg);
      padding: 10px;
      min-height: 56px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--hvx-qp-text-soft);
      transition: border-color .2s var(--hvx-ease), background-color .2s var(--hvx-ease), transform .2s var(--hvx-ease);
    }

    .hvx-qp-grid a:hover {
      background: var(--hvx-qp-card-hover-bg);
      border-color: var(--hvx-qp-card-hover-border);
      transform: translateY(-1px);
    }

    .hvx-qp-grid a i {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--hvx-qp-icon-bg);
      color: var(--hvx-qp-icon-text);
      font-size: 14px;
      flex: 0 0 auto;
    }

    .hvx-qp-grid a span {
      font-size: 13px;
      font-weight: 600;
      color: var(--hvx-qp-text);
      line-height: 1.25;
    }

    .hvx-qp-grid a.hvx-qp-hidden {
      display: none;
    }

    @media (max-width: 900px) {
      .hvx-qp-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .hvx-qp-kbd {
        display: none;
      }
    }

    @media (max-width: 560px) {
      .hvx-qp-window {
        width: min(98vw, 98vw);
        border-radius: 14px;
      }

      .hvx-qp-grid {
        grid-template-columns: 1fr;
      }

      .hvx-qp-profile {
        flex-direction: column;
        align-items: flex-start;
      }

      .hvx-qp-balance {
        text-align: left;
      }
    }

    body.hvx-compact .hvx-qp-overlay {
      padding: 0;
    }

    body.hvx-compact .hvx-qp-window {
      width: 100vw;
      height: 100dvh;
      max-height: 100dvh;
      margin: 0;
      border-radius: 0;
      border-left: 0;
      border-right: 0;
      display: flex;
      flex-direction: column;
    }

    body.hvx-compact .hvx-qp-search {
      min-height: 58px;
      padding: 0 14px;
      position: sticky;
      top: 0;
      z-index: 2;
    }

    body.hvx-compact .hvx-qp-profile {
      min-height: auto;
      padding: 12px 14px;
      flex: 0 0 auto;
    }

    body.hvx-compact .hvx-qp-content {
      flex: 1 1 auto;
      max-height: none;
      overflow-y: auto;
      padding: 10px 14px calc(16px + env(safe-area-inset-bottom));
      -webkit-overflow-scrolling: touch;
    }

    body.hvx-compact .hvx-qp-grid {
      grid-template-columns: 1fr;
    }

    .hvx-mobile-menu {
      position: fixed;
      inset: 0;
      z-index: 1400;
      background: var(--hvx-bg-soft);
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      transition: transform var(--hvx-dur-open) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease);
      overflow: hidden;
    }

    body.hvx-mobile-menu-open {
      overflow: hidden;
    }

    body.hvx-mobile-menu-open .hvx-mobile-menu {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .hvx-mobile-menu-view {
      position: absolute;
      inset: 0;
      overflow-y: auto;
      opacity: 1;
      transform: translateX(0);
      transition: transform var(--hvx-dur-open) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease);
      background: var(--hvx-bg-soft);
    }

    .hvx-mobile-menu.is-detail .hvx-mobile-menu-list {
      transform: translateX(-26px);
      opacity: 0;
      pointer-events: none;
    }

    .hvx-mobile-menu-detail {
      transform: translateX(100%);
      opacity: 0;
      pointer-events: none;
    }

    .hvx-mobile-menu.is-detail .hvx-mobile-menu-detail {
      transform: translateX(0);
      opacity: 1;
      pointer-events: auto;
    }

    .hvx-mobile-menu-head {
      min-height: 72px;
      padding: clamp(12px, 2.6vw, 16px) clamp(14px, 4.5vw, 32px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--hvx-border);
      background: var(--hvx-bg-soft);
      position: sticky;
      top: 0;
      z-index: 5;
    }

    .hvx-mobile-menu-head-right {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .hvx-mobile-menu-tool-btn {
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      width: 38px;
      height: 38px;
      border-radius: 8px;
      display: none;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      transition: background-color var(--hvx-dur-content) var(--hvx-ease), color var(--hvx-dur-content) var(--hvx-ease);
    }

    .hvx-mobile-menu-tool-btn:hover {
      background: var(--hvx-state-neutral-hover);
    }

    .hvx-mobile-menu-brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: var(--hvx-text);
      font-size: 24px;
      text-decoration: none;
      font-weight: 500;
    }

    .hvx-mobile-menu-brand img {
      height: 34px;
      width: auto;
    }

    .hvx-mobile-menu-close,
    .hvx-mobile-menu-back {
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      font-size: 28px;
      line-height: 1;
      width: 38px;
      height: 38px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .hvx-mobile-menu-close:hover,
    .hvx-mobile-menu-back:hover {
      background: var(--hvx-state-neutral-hover);
    }

    .hvx-mobile-menu-body {
      padding: clamp(10px, 2.4vw, 14px) clamp(14px, 4.5vw, 32px) clamp(16px, 3.8vw, 24px);
    }

    .hvx-mobile-locale-panel {
      display: none;
      padding: 12px clamp(14px, 4.5vw, 32px) 14px;
      border-bottom: 1px solid var(--hvx-border);
      background: var(--hvx-bg-soft);
    }

    .hvx-mobile-menu.is-locale-open .hvx-mobile-locale-panel {
      display: block;
    }

    .hvx-mobile-locale-group+.hvx-mobile-locale-group {
      margin-top: 10px;
    }

    .hvx-mobile-locale-label {
      margin: 0 0 8px;
      color: var(--hvx-heading-muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .4px;
      text-transform: uppercase;
    }

    .hvx-mobile-locale-links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .hvx-mobile-locale-link {
      border: 1px solid var(--hvx-border);
      border-radius: 999px;
      min-height: 32px;
      padding: 0 12px;
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      color: var(--hvx-text);
      font-size: 13px;
      font-weight: 600;
      background: var(--hvx-surface);
    }

    .hvx-mobile-locale-link.is-active {
      color: var(--hvx-brand-contrast);
      border-color: color-mix(in srgb, var(--hvx-brand) 44%, var(--hvx-border));
      background: color-mix(in srgb, var(--hvx-brand) 10%, transparent);
    }

    .hvx-mobile-block {
      border-top: 1px solid var(--hvx-border);
      padding: 20px 0;
    }

    .hvx-mobile-block:first-child {
      border-top: 0;
      padding-top: 0;
    }

    .hvx-mobile-title {
      margin: 0 0 12px;
      color: var(--hvx-heading-muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .4px;
      text-transform: uppercase;
    }

    .hvx-mobile-subtitle {
      margin: 0 0 10px;
      color: var(--hvx-heading-muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .5px;
      text-transform: uppercase;
    }

    .hvx-mobile-list-item {
      opacity: 0;
      transform: translateX(-12px);
      transition: transform var(--hvx-dur-content) var(--hvx-ease), opacity var(--hvx-dur-content) var(--hvx-ease);
      transition-delay: calc(var(--hvx-stagger, 0) * 34ms);
    }

    body.hvx-mobile-menu-open .hvx-mobile-menu:not(.is-detail) .hvx-mobile-list-item {
      opacity: 1;
      transform: translateX(0);
    }

    .hvx-mobile-link {
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      text-decoration: none;
      padding: 12px 0;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: clamp(14px, 2.3vw, 16px);
      font-weight: 700;
      text-align: left;
      cursor: pointer;
    }

    .hvx-mobile-link-left {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .hvx-mobile-link i {
      color: var(--hvx-text-soft);
      width: 20px;
      text-align: center;
      font-size: 18px;
    }

    .hvx-mobile-link .fa-chevron-right {
      font-size: 14px;
      width: auto;
    }

    .hvx-mobile-detail-title {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: var(--hvx-text);
      font-size: 16px;
      font-weight: 700;
    }

    .hvx-mobile-detail-content {
      padding: 8px 0 18px;
    }

    .hvx-mobile-detail-content .hvx-groups {
      padding-bottom: 8px;
      background: transparent;
    }

    .hvx-mobile-detail-content .hvx-group {
      border-bottom: 1px solid var(--hvx-border);
      --index-top: 0;
      scroll-margin-top: calc(var(--index-top) * 42px);
    }

    .hvx-mobile-detail-content .hvx-group-heading {
      padding: 16px 0 10px;
      background: transparent;
      border-bottom: 0;
    }

    .hvx-mobile-detail-content .hvx-group-body {
      padding: 10px 0 18px;
    }

    .hvx-mobile-detail-content .hvx-items-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, 256px);
      gap: 10px 16px;
      justify-content: start;
    }

    .hvx-mobile-detail-content .hvx-items-list__item {
      max-width: 100%;
      min-height: 0;
      padding-right: 0;
    }

    .hvx-mobile-detail-content .hvx-card-link {
      border-radius: 10px;
      padding: 12px 14px;
    }

    .hvx-mobile-detail-content .hvx-card-title {
      font-size: clamp(15px, 2.4vw, 16px);
      line-height: 1.3;
    }

    .hvx-mobile-detail-content .hvx-card-desc {
      font-size: clamp(12px, 2.1vw, 13px);
      line-height: 1.45;
      margin-top: 8px;
    }

    body.hvx-tablet .hvx-mobile-menu-detail .hvx-mobile-menu-body,
    body.hvx-compact .hvx-mobile-menu-detail .hvx-mobile-menu-body {
      padding: 12px clamp(20px, 5.6vw, 36px) 22px;
    }

    body.hvx-tablet .hvx-mobile-detail-content .hvx-items-list,
    body.hvx-compact .hvx-mobile-detail-content .hvx-items-list {
      grid-template-columns: repeat(auto-fit, 256px);
    }

    .hvx-mobile-theme-btn {
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--hvx-text);
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      padding: 12px 0;
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }

    @media (max-width: 650px) {

      #hvxThemeToggle,
      #hvxLocaleBtn {
        display: none !important;
      }

      .hvx-mobile-menu-tool-btn {
        display: inline-flex;
      }

      .hvx-mobile-block.hvx-mobile-locale-block,
      .hvx-mobile-block.hvx-mobile-appearance-block {
        display: none;
      }
    }

    @media (max-width: 986px) {
      body.hvx-whois-toolbar-open .hvx-toolbar {
        min-width: 0;
      }

      body.hvx-whois-toolbar-open .hvx-toolbar>*:not(.hvx-whois-wrap) {
        width: 0 !important;
        min-width: 0 !important;
        opacity: 0;
        overflow: hidden;
        pointer-events: none;
        transform: translateX(8px);
        transition: opacity var(--hvx-dur-content) var(--hvx-ease), transform var(--hvx-dur-content) var(--hvx-ease), width var(--hvx-dur-content) var(--hvx-ease);
      }

      body.hvx-whois-toolbar-open .hvx-mobile-toggle {
        width: 0;
        min-width: 0;
        opacity: 0;
        overflow: hidden;
        pointer-events: none;
        transform: translateX(8px);
        transition: opacity var(--hvx-dur-content) var(--hvx-ease), transform var(--hvx-dur-content) var(--hvx-ease), width var(--hvx-dur-content) var(--hvx-ease);
      }

      .hvx-toolbar .hvx-whois-search {
        display: contents;
        flex: 0 0 auto;
        width: auto;
        max-width: none;
        padding: 0;
        border: 0;
        background: transparent;
        margin-right: 0;
      }

      .hvx-whois-input,
      .hvx-whois-btn-label {
        display: none;
      }

      .hvx-whois-btn {
        min-width: 38px;
        min-height: 38px;
        width: 38px;
        height: 38px;
        padding: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--hvx-text);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        gap: 0;
      }

      .hvx-whois-btn:hover,
      .hvx-whois-btn:focus-visible {
        background: var(--hvx-state-neutral-hover);
        color: var(--hvx-text);
      }

      body.hvx-whois-toolbar-open .hvx-toolbar .hvx-whois-search {
        display: flex;
        width: min(520px, calc(10vw - 180px));
        max-width: min(520px, calc(10vw - 180px));
        border: 1px solid var(--hvx-whois-border);
        background: var(--hvx-whois-bg);
        padding: 3px;
        margin-right: 0;
        transform: translateX(0);
        opacity: 1;
      }

      body.hvx-whois-toolbar-open .hvx-whois-input,
      body.hvx-whois-toolbar-open .hvx-whois-btn-label {
        display: block;
      }

      body.hvx-whois-toolbar-open .hvx-whois-btn {
        min-width: auto;
        width: auto;
        padding: 0 12px;
        background: var(--hvx-whois-btn-bg);
        color: var(--hvx-whois-btn-color);
        gap: 6px;
      }

      body.hvx-whois-toolbar-open .hvx-whois-btn:hover,
      body.hvx-whois-toolbar-open .hvx-whois-btn:focus-visible {
        background: var(--hvx-whois-btn-hover);
        color: var(--hvx-whois-btn-color);
      }

      body.hvx-whois-toolbar-open .hvx-whois-close {
        width: 32px;
        margin-left: 4px;
        opacity: 1;
        pointer-events: auto;
      }

      .hvx-launchpad-label {
        display: none !important;
      }

      .hvx-launchpad {
        font-size: 18px !important;
        min-width: 38px !important;
        min-height: 38px !important;
        width: 38px;
        height: 38px;
        border-radius: 999px;
        border: 0;
        background: transparent;
        color: var(--hvx-text);
        justify-content: center;
        align-items: center;
        padding: 0 !important;
        gap: 0;
      }

      .hvx-launchpad:hover,
      .hvx-launchpad:focus-visible {
        background: var(--hvx-state-neutral-hover);
        color: var(--hvx-text);
      }
    }

    body.hvx-tablet .hvx-bar {
      grid-template-columns: minmax(120px, auto) minmax(0, 1fr) auto auto;
      gap: clamp(8px, 1.2vw, 14px);
    }

    body.hvx-tablet .hvx-toolbar {
      display: flex;
    }

    body.hvx-tablet .hvx-mobile-toggle {
      display: inline-flex;
    }

    body.hvx-compact .hvx-bar {
      grid-template-columns: minmax(120px, auto) minmax(0, 1fr) auto auto;
      gap: clamp(6px, 1vw, 12px);
    }

    body.hvx-compact .hvx-toolbar {
      display: flex;
      gap: 0;
    }

    body.hvx-compact .hvx-toolbar .hvx-whois-search {
      flex: 0 0 auto;
      width: auto;
      max-width: none;
      margin-right: 0;
    }

    body.hvx-compact .hvx-toolbar .hvx-whois-search+.hvx-launchpad {
      margin-left: 6px;
    }

    body.hvx-compact .hvx-mobile-toggle {
      display: inline-flex;
    }

    body.hvx-compact .hvx-mega-inner {
      height: auto;
      grid-template-columns: 1fr;
    }

    body.hvx-compact .hvx-rail,
    body.hvx-compact .hvx-content {
      height: auto;
      max-height: none;
    }

    body.hvx-compact .hvx-rail-panel {
      position: static;
      inset: auto;
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      overflow: visible;
    }

    body.hvx-compact .hvx-rail-panel.has-promo .hvx-groups {
      max-width: 100%;
    }

    body.hvx-compact .hvx-items-list__item {
      padding-right: 0;
    }
  </style>

  <header class="hvx-header" id="hvxHeader" data-hvx-theme="light">
    <div class="hvx-bar">
      <a class="hvx-logo" href="{if $loggedin}{$WEB_ROOT}/clientarea.php{else}{$WEB_ROOT}/index.php{/if}">
        <img src="{$WEB_ROOT}/templates/{$template}/images/logo.png"
          data-hvx-logo-dark="{$WEB_ROOT}/templates/{$template}/images/white-logo.webp"
          data-hvx-logo-light="{$WEB_ROOT}/templates/{$template}/images/logo.png"
          data-hvx-logo-mobile-dark="{$WEB_ROOT}/templates/{$template}/images/mobile-dark-mode.png"
          data-hvx-logo-mobile-light="{$WEB_ROOT}/templates/{$template}/images/mobile-light-mode.png" alt="NameCadre">
      </a>

      <nav class="hvx-primary-nav" aria-label="Primary">
        {foreach $hvxMenuTabs as $tab}
          <button type="button" class="hvx-tab" data-hvx-tab="{$tab.key}" data-hvx-default-rail="{$tab.defaultRail}">
            {$tab.label nofilter}
          </button>
        {/foreach}
      </nav>

      <div class="hvx-toolbar" id="hvxToolbar">
        <div class="d-flex justify-content-center align-items-center hvx-whois-wrap">
          <form class="hvx-whois-search" action="{$WEB_ROOT}/whois" method="get" role="search"
            aria-label="Whois Search">
            <input class="hvx-whois-input" type="text" name="domain" placeholder="Enter domain or IP"
              autocomplete="off">
            <button class="hvx-whois-btn" type="submit" aria-label="Whois Search">
              <i class="far fa-search" aria-hidden="true"></i>
              <span class="hvx-whois-btn-label">Whois</span>
            </button>

          </form>
          <button class="hvx-whois-close" type="button" id="hvxWhoisClose" aria-label="Close Whois">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>


        <button type="button" class="hvx-launchpad" id="hvxLaunchpadBtn" aria-label="Quick Pad">
          <i class="far fa-compass"></i>
          <span class="hvx-launchpad-label">Quick Pad</span>
        </button>

        <button type="button" class="hvx-tool-btn" id="hvxThemeToggle" aria-pressed="false" title="Switch to dark mode">
          <i class="far fa-moon" aria-hidden="true"></i>
        </button>

        <button type="button" class="hvx-tool-btn" id="hvxLocaleBtn" aria-haspopup="true" aria-expanded="false"
          aria-controls="hvxLocalePopover" title="Language and currency">
          <i class="far fa-globe"></i>
        </button>

        {if $loggedin}
          <button type="button" class="hvx-tool-btn hvx-tool-btn--notify{if $hvxNotifyUnreadCount > 0} has-unread{/if}"
            id="hvxNotifyBtn" aria-haspopup="true" aria-expanded="false" aria-controls="hvxNotifyPopover"
            title="Notifications">
            <i class="far fa-bell"></i>
            <span class="hvx-notify-dot" aria-hidden="true"></span>
          </button>
        {/if}

        <a class="hvx-tool-btn" id="hvxCartBtn" href="{$WEB_ROOT}/cart.php?a=view" title="Cart">
          <i class="far fa-shopping-bag"></i>
        </a>

        <button type="button" class="hvx-tool-btn" id="hvxAccountBtn" aria-haspopup="true" aria-expanded="false"
          aria-controls="hvxAccountPopover" title="Account">
          <i class="far fa-user"></i>
        </button>

        <div class="hvx-popover hvx-popover--locale" id="hvxLocalePopover">
          <h4>Language and currency</h4>
          {if count($hvxLangOptions) > 1}
            {assign var=hvxActiveLanguageName value=''}
            {foreach $hvxLangOptions as $item}
              {if $item.active}
                {assign var=hvxActiveLanguageName value=$item.name}
              {/if}
            {/foreach}
            {if $hvxActiveLanguageName eq ''}
              {assign var=hvxActiveLanguageName value=$hvxLangOptions[0].name}
            {/if}
            <div class="hvx-field">
              <label for="hvxLanguageTrigger">Language</label>
              <div class="hvx-language-select" id="hvxLanguageSelect">
                <button type="button" id="hvxLanguageTrigger" class="hvx-language-trigger" aria-haspopup="true"
                  aria-expanded="false" aria-controls="hvxLanguagePanel">
                  <span id="hvxLanguageCurrent">{$hvxActiveLanguageName|escape}</span>
                  <i class="far fa-chevron-down"></i>
                </button>
                <div class="hvx-language-panel" id="hvxLanguagePanel">
                  <label class="hvx-language-search" for="hvxLanguageSearch">
                    <i class="far fa-search"></i>
                    <input type="text" id="hvxLanguageSearch" autocomplete="off" placeholder="Search here">
                  </label>
                  <ul class="hvx-language-options" id="hvxLanguageOptions">
                    {foreach $hvxLangOptions as $item}
                      <li>
                        <button type="button" class="hvx-language-option{if $item.active} is-active{/if}"
                          data-hvx-language-url="{$item.url|escape}" data-hvx-language-name="{$item.name|escape}">
                          {$item.name|escape}
                        </button>
                      </li>
                    {/foreach}
                  </ul>
                  <p class="hvx-language-empty">No language found.</p>
                </div>
              </div>
            </div>
          {/if}
          {if count($hvxCurrencyOptions) > 1}
            {assign var=hvxActiveCurrencyName value=''}
            {foreach $hvxCurrencyOptions as $item}
              {if $item.active}
                {assign var=hvxActiveCurrencyName value=$item.name}
              {/if}
            {/foreach}
            {if $hvxActiveCurrencyName eq ''}
              {assign var=hvxActiveCurrencyName value=$hvxCurrencyOptions[0].name}
            {/if}
            <div class="hvx-field">
              <label for="hvxCurrencyTrigger">Currency</label>
              <div class="hvx-currency-select" id="hvxCurrencySelect">
                <button type="button" id="hvxCurrencyTrigger" class="hvx-currency-trigger" aria-haspopup="true"
                  aria-expanded="false" aria-controls="hvxCurrencyPanel">
                  <span id="hvxCurrencyCurrent">{$hvxActiveCurrencyName|escape}</span>
                  <i class="far fa-chevron-down"></i>
                </button>
                <div class="hvx-currency-panel" id="hvxCurrencyPanel">
                  <label class="hvx-currency-search" for="hvxCurrencySearch">
                    <i class="far fa-search"></i>
                    <input type="text" id="hvxCurrencySearch" autocomplete="off" placeholder="Search here">
                  </label>
                  <ul class="hvx-currency-options" id="hvxCurrencyOptions">
                    {foreach $hvxCurrencyOptions as $item}
                      <li>
                        <button type="button" class="hvx-currency-option{if $item.active} is-active{/if}"
                          data-hvx-currency-url="{$item.url|escape}" data-hvx-currency-name="{$item.name|escape}">
                          {$item.name|escape}
                        </button>
                      </li>
                    {/foreach}
                  </ul>
                  <p class="hvx-currency-empty">No currency found.</p>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <div class="hvx-popover hvx-popover--account" id="hvxAccountPopover">
          {assign var=hvxAccountName value='Guest'}
          {assign var=hvxAccountSub value='Sign in to continue'}
          {if $loggedin}
            {assign var=hvxAccountName value=$clientsdetails.fullname|default:$clientsdetails.firstname|default:'Client'}
            {assign var=hvxAccountSub value=$clientsdetails.email|default:'Manage your account'}
          {/if}
          <div class="hvx-account-head">
            <span class="hvx-account-avatar"><i class="far fa-user"></i></span>
            <div>
              <p class="hvx-account-name">{$hvxAccountName|escape}</p>
              <p class="hvx-account-sub">{$hvxAccountSub|escape}</p>
            </div>
          </div>
          <ul>
            {if $loggedin}
              <li><a class="hvx-pop-link" href="{$WEB_ROOT}/clientarea.php?action=details"><span
                    class="hvx-pop-link-main"><i
                      class="far fa-id-card"></i><span>{$LANG.clientareanavdetails}</span></span><i
                    class="far fa-chevron-right hvx-pop-link-chevron"></i></a></li>
              <li><a class="hvx-pop-link" href="{$WEB_ROOT}/clientarea.php?action=services"><span
                    class="hvx-pop-link-main"><i class="far fa-cube"></i><span>{$LANG.navservices}</span></span><i
                    class="far fa-chevron-right hvx-pop-link-chevron"></i></a></li>
              <li><a class="hvx-pop-link" href="{$WEB_ROOT}/clientarea.php?action=domains"><span
                    class="hvx-pop-link-main"><i class="far fa-globe"></i><span>{$LANG.navdomains}</span></span><i
                    class="far fa-chevron-right hvx-pop-link-chevron"></i></a></li>
              <li><a class="hvx-pop-link" href="{$WEB_ROOT}/supporttickets.php"><span class="hvx-pop-link-main"><i
                      class="far fa-life-ring"></i><span>{$LANG.navtickets}</span></span><i
                    class="far fa-chevron-right hvx-pop-link-chevron"></i></a></li>
              <li><a class="hvx-pop-link" href="{$WEB_ROOT}/logout.php"><span class="hvx-pop-link-main"><i
                      class="far fa-sign-out"></i><span>{$LANG.clientareanavlogout}</span></span><i
                    class="far fa-chevron-right hvx-pop-link-chevron"></i></a></li>
            {else}
              <li><a class="hvx-pop-link" href="{routePath('login-index')}"><span class="hvx-pop-link-main"><i
                      class="far fa-sign-in"></i><span>{$LANG.login}</span></span><i
                    class="far fa-chevron-right hvx-pop-link-chevron"></i></a></li>
              <li><a class="hvx-pop-link" href="{$WEB_ROOT}/register.php"><span class="hvx-pop-link-main"><i
                      class="far fa-user-plus"></i><span>{$LANG.register}</span></span><i
                    class="far fa-chevron-right hvx-pop-link-chevron"></i></a></li>
              <li><a class="hvx-pop-link" href="{routePath('password-reset-begin')}"><span class="hvx-pop-link-main"><i
                      class="far fa-key"></i><span>{$LANG.forgotpw}</span></span><i
                    class="far fa-chevron-right hvx-pop-link-chevron"></i></a></li>
            {/if}
          </ul>
        </div>

        {if $loggedin}
          <div class="hvx-popover hvx-popover--notify" id="hvxNotifyPopover">
            <div class="hvx-notify-wrap">
              <header class="hvx-notify-head">
                <h4>Notifications</h4>
                <div class="hvx-notify-head-actions">
                  <button type="button" class="hvx-notify-menu-btn" id="hvxNotifyPanelMenuBtn" aria-haspopup="true"
                    aria-expanded="false" aria-controls="hvxNotifyPanelMenu" aria-label="Notification actions">
                    <i class="fas fa-ellipsis-v"></i>
                  </button>
                  <div class="hvx-notify-menu" id="hvxNotifyPanelMenu">
                    <button type="button" data-hvx-notify-panel-action="mark-all-read">
                      <i class="far fa-check"></i>
                      <span>Mark all as read</span>
                    </button>
                    <a href="{$WEB_ROOT}{$hvxNotificationCenterLink}">
                      <i class="far fa-bell"></i>
                      <span>View in Notification Center</span>
                    </a>
                    <button type="button" data-hvx-notify-panel-action="preferences"
                      data-url="{$WEB_ROOT}/clientarea.php?action=details">
                      <i class="far fa-cog"></i>
                      <span>Preferences</span>
                    </button>
                  </div>
                </div>
              </header>

              <div class="hvx-notify-filters" id="hvxNotifyFilters">
                <button type="button" class="hvx-notify-filter" data-hvx-notify-filter="priority">Priority</button>
                <button type="button" class="hvx-notify-filter" data-hvx-notify-filter="flagged">Flagged</button>
                <button type="button" class="hvx-notify-filter" data-hvx-notify-filter="unread">Unread</button>
              </div>

              <div class="hvx-notify-section-label" id="hvxNotifySectionLabel">Earlier</div>

              <div class="hvx-notify-body">
                <ul class="hvx-notify-list" id="hvxNotifyList">
                  {foreach $hvxNotifications as $notifyIndex => $item}
                    {assign var=notifyId value=$item.id|default:"notify-item-`$notifyIndex`"}
                    {assign var=notifyUrl value=$item.url|default:'/clientarea.php'}
                    {assign var=notifyIcon value=$item.avatarIcon|default:'far fa-bell'}
                    {assign var=notifyAvatarBg value=$item.avatarBg|default:''}
                    {assign var=notifyCategoryLabel value=$item.categoryLabel|default:''}
                    {assign var=notifyTimeLabel value=$item.timeLabel|default:''}
                    <li
                      class="hvx-notify-item{if isset($item.priority) && $item.priority} is-priority{/if}{if isset($item.flagged) && $item.flagged} is-flagged{/if}{if isset($item.unread) && $item.unread} is-unread{/if}"
                      data-hvx-notify-id="{$notifyId|escape}"
                      data-priority="{if isset($item.priority) && $item.priority}1{else}0{/if}"
                      data-flagged="{if isset($item.flagged) && $item.flagged}1{else}0{/if}"
                      data-unread="{if isset($item.unread) && $item.unread}1{else}0{/if}">
                      <div class="hvx-notify-row">
                        <div class="hvx-notify-avatar" {if $notifyAvatarBg neq ''}
                          style="background: {$notifyAvatarBg|escape};" {/if}>
                          <i class="{$notifyIcon|escape}" aria-hidden="true"></i>
                          <span class="hvx-notify-flag-badge" aria-hidden="true"><i class="far fa-flag"></i></span>
                        </div>
                        <a class="hvx-notify-main" href="{$WEB_ROOT}{$notifyUrl|escape}">
                          {if $notifyCategoryLabel neq ''}
                            <div class="hvx-notify-category">{$notifyCategoryLabel|escape}</div>
                          {/if}
                          <p class="hvx-notify-title">{$item.title|default:'Notification'|escape}</p>
                          {if isset($item.desc) && $item.desc neq ''}
                            <p class="hvx-notify-desc">{$item.desc|escape}</p>
                          {/if}
                          {if $notifyTimeLabel neq ''}
                            <p class="hvx-notify-time">{$notifyTimeLabel|escape}</p>
                          {/if}
                          {if isset($item.extraCount) && $item.extraCount|intval > 0}
                            <span class="hvx-notify-more">+ {$item.extraCount|intval} More events</span>
                          {/if}
                        </a>
                        <div class="hvx-notify-item-actions">
                          <button type="button" class="hvx-notify-menu-btn hvx-notify-item-menu-btn" aria-haspopup="true"
                            aria-expanded="false" aria-label="Notification item actions">
                            <i class="fas fa-ellipsis-v"></i>
                          </button>
                          <div class="hvx-notify-menu hvx-notify-item-menu">
                            <button type="button" data-hvx-notify-item-action="toggle-unread">
                              <i class="far fa-eye-slash"></i>
                              <span data-hvx-notify-toggle-unread-label>Mark as unread</span>
                            </button>
                            <button type="button" data-hvx-notify-item-action="toggle-flag">
                              <i class="far fa-flag"></i>
                              <span data-hvx-notify-toggle-flag-label>Flag</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  {/foreach}
                </ul>
                <div class="hvx-notify-empty" id="hvxNotifyEmpty">
                  <div class="hvx-notify-empty-icon" aria-hidden="true"></div>
                  <h5 class="hvx-notify-empty-title">No notifications</h5>
                  <p class="hvx-notify-empty-subtitle">We'll let you know when we get news for you</p>
                    <a class="hvx-notify-empty-link" href="{$WEB_ROOT}{$hvxNotificationCenterLink}">Open Notification
                      Center</a>
                  </div>
                </div>

                <a class="hvx-notify-footer" id="hvxNotifyFooter" href="{$WEB_ROOT}{$hvxNotificationCenterLink}">
                  See all communications
                </a>
              </div>
            </div>
          {/if}
        </div>

        <button class="hvx-mobile-toggle" id="hvxMobileToggle" aria-label="Open menu" type="button">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <section class="hvx-mega" id="hvxMega" aria-label="Mega menu">
        <div class="hvx-mega-inner">
          <aside class="hvx-rail">
            <ul class="hvx-rail-list" id="hvxHotRail">












                  {foreach $hvxHotRails as $railKey}












                    {assign var=railData value=$hvxMenuRails[$railKey]}
                <li>
                  <button type="button" class="hvx-rail-item" data-hvx-rail="{$railKey}">
                    <i class="{$railData.icon|escape}"></i>
                    {$railData.title|escape}
                  </button>
                </li>












                  {/foreach}
            </ul>
            <h5 class="hvx-rail-title">All products</h5>
            <ul class="hvx-rail-list" id="hvxProductsRail">












                  {foreach $hvxProductRails as $railKey}












                    {assign var=railData value=$hvxMenuRails[$railKey]}
                <li>
                  <button type="button" class="hvx-rail-item" data-hvx-rail="{$railKey}">
                    <i class="{$railData.icon|escape}"></i>
                    {$railData.title|escape}
                  </button>
                </li>












                  {/foreach}
            </ul>
            <h5 class="hvx-rail-title">Support &amp; Billing</h5>
            <ul class="hvx-rail-list" id="hvxSupportBillingRail">












                  {foreach $hvxSupportBillingRails as $railKey}












                    {assign var=railData value=$hvxMenuRails[$railKey]}
                <li>
                  <button type="button" class="hvx-rail-item" data-hvx-rail="{$railKey}">
                    <i class="{$railData.icon|escape}"></i>
                    {$railData.title|escape}
                  </button>
                </li>












                  {/foreach}
            </ul>
            <h5 class="hvx-rail-title">NameCadre universe</h5>
            <ul class="hvx-rail-list" id="hvxUniverseRail">












                  {foreach $hvxUniverseRails as $railKey}












                    {assign var=railData value=$hvxMenuRails[$railKey]}
                <li>
                  <button type="button" class="hvx-rail-item" data-hvx-rail="{$railKey}">
                    <i class="{$railData.icon|escape}"></i>
                    {$railData.title|escape}
                  </button>
                </li>












                  {/foreach}
            </ul>
          </aside>
          <div class="hvx-content" id="hvxContent">












                  {foreach $hvxMenuRails as $railKey => $railData}
              <section class="hvx-rail-panel











                    {if $railKey eq 'domains'} is-active











                    {/if}











                    {if isset($railData.promo)} has-promo











                    {/if}" data-hvx-rail-panel="{$railKey}">
                <div class="hvx-groups">












                    {foreach $railData.sections as $sectionIndex => $section}
                    <section class="hvx-group" data-hvx-group="hvx-group-{$railKey|escape}-{$sectionIndex}">












                      {if isset($section.heading)}
                        <div class="hvx-group-heading">
                          <h6 class="hvx-group-title">{$section.heading|escape}</h6>
                        </div>












                      {/if}
                      <div class="hvx-group-body">












                      {if isset($section.cards) && count($section.cards)}
                          <ul class="hvx-items-list">












                        {foreach $section.cards as $card}
                              <li class="hvx-items-list__item">
                                <a class="hvx-card-link











                          {if isset($card.featured) && $card.featured} is-featured











                          {/if}" href="











                          {if isset($card.authAwareClientDomains) && $card.authAwareClientDomains}











                            {if $loggedin}{$WEB_ROOT}/clientarea.php?action=domains











                            {else}{$WEB_ROOT}/login.php?goto={'clientarea.php?action=domains'|escape:'url'}











                            {/if}











                          {else}{$WEB_ROOT}{$card.url|escape}











                          {/if}" data-hvx-item-link>
                                  <p class="hvx-card-title">
                                    {$card.title|escape}












                          {if isset($card.badge) && $card.badge}
                                      <span class="hvx-badge">{$card.badge|escape}</span>












                          {/if}
                                  </p>












                          {if isset($card.desc) && $card.desc}
                                    <p class="hvx-card-desc">{$card.desc|escape}</p>












                          {/if}
                                </a>
                              </li>












                        {/foreach}
                          </ul>












                      {else}
                          <div class="hvx-items-empty"></div>












                      {/if}
                      </div>
                    </section>












                    {/foreach}
                </div>












                    {if isset($railData.promo)}
                  <article class="hvx-promo">
                    <h5>{$railData.promo.title|escape}</h5>
                    <p>{$railData.promo.desc|escape}</p>
                    <a href="{$WEB_ROOT}{$railData.promo.url|escape}">
                      {$railData.promo.cta|escape}
                      <i class="fas fa-chevron-right"></i>
                    </a>
                  </article>












                    {/if}
              </section>












                  {/foreach}
          </div>
        </div>
      </section>
    </header>

    <aside class="hvx-mobile-menu" id="hvxMobileMenu" aria-label="Mobile navigation">
      <section class="hvx-mobile-menu-view hvx-mobile-menu-list">
        <div class="hvx-mobile-menu-head">
          <a class="hvx-mobile-menu-brand" href="











                  {if $loggedin}{$WEB_ROOT}/clientarea.php











                  {else}{$WEB_ROOT}/index.php











                  {/if}">
            <img src="{$WEB_ROOT}/templates/{$template}/images/logo.png"
              data-hvx-logo-dark="{$WEB_ROOT}/templates/{$template}/images/white-logo.webp"
              data-hvx-logo-light="{$WEB_ROOT}/templates/{$template}/images/logo.png"
              data-hvx-logo-mobile-dark="{$WEB_ROOT}/templates/{$template}/images/mobile-dark-mode.png"
              data-hvx-logo-mobile-light="{$WEB_ROOT}/templates/{$template}/images/mobile-light-mode.png" alt="NameCadre">
          </a>
          <div class="hvx-mobile-menu-head-right">
            <button type="button" class="hvx-mobile-menu-tool-btn" id="hvxLocaleBtnMobile"
              aria-label="Language and currency">
              <i class="far fa-globe"></i>
            </button>
            <button type="button" class="hvx-mobile-menu-tool-btn" id="hvxThemeToggleMobileIcon"
              aria-label="Switch theme">
              <i class="far fa-moon"></i>
            </button>
            <button type="button" class="hvx-mobile-menu-close" data-hvx-mobile-close aria-label="Close menu">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="hvx-mobile-locale-panel" id="hvxMobileLocalePanel">












                  {if count($hvxLangOptions) > 1}
            <div class="hvx-mobile-locale-group">
              <p class="hvx-mobile-locale-label">Language</p>
              <div class="hvx-mobile-locale-links">












                    {foreach $hvxLangOptions as $item}
                  <a class="hvx-mobile-locale-link











                      {if $item.active} is-active











                      {/if}" href="{$item.url|escape}">
                    {$item.name|escape}
                  </a>












                    {/foreach}
              </div>
            </div>












                  {/if}












                  {if count($hvxCurrencyOptions) > 1}
            <div class="hvx-mobile-locale-group">
              <p class="hvx-mobile-locale-label">Currency</p>
              <div class="hvx-mobile-locale-links">












                    {foreach $hvxCurrencyOptions as $item}
                  <a class="hvx-mobile-locale-link











                      {if $item.active} is-active











                      {/if}" href="{$item.url|escape}">
                    {$item.name|escape}
                  </a>












                    {/foreach}
              </div>
            </div>












                  {/if}
        </div>
        <div class="hvx-mobile-menu-body">
          <div class="hvx-mobile-block">












                  {if $loggedin}
              <a class="hvx-mobile-link hvx-mobile-list-item" href="{$WEB_ROOT}/clientarea.php" style="--hvx-stagger:0;">
                <span class="hvx-mobile-link-left"><i class="far fa-user"></i><span>{$LANG.clientarea}</span></span>
                <i class="far fa-chevron-right"></i>
              </a>












                  {else}
              <a class="hvx-mobile-link hvx-mobile-list-item" href="











                    {routePath('login-index')}" style="--hvx-stagger:0;">
                <span class="hvx-mobile-link-left"><i class="far fa-user"></i><span>{$LANG.login}</span></span>
                <i class="far fa-chevron-right"></i>
              </a>












                  {/if}

          </div>

          <div class="hvx-mobile-block">
            <h5 class="hvx-mobile-subtitle">Explore NameCadre</h5>












                  {assign var=hvxMobileStagger value=2}












                  {foreach $hvxHotRails as $railKey}












                    {assign var=railData value=$hvxMenuRails[$railKey]}
              <button type="button" class="hvx-mobile-link hvx-mobile-list-item" data-hvx-mobile-rail="{$railKey}"
                data-hvx-mobile-title="{$railData.title|escape}" style="--hvx-stagger:{$hvxMobileStagger};">
                <span class="hvx-mobile-link-left"><i
                    class="{$railData.icon|escape}"></i><span>{$railData.title|escape}</span></span>
                <i class="far fa-chevron-right"></i>
              </button>












                    {assign var=hvxMobileStagger value=$hvxMobileStagger+1}












                  {/foreach}

            <h5 class="hvx-mobile-title">All Products</h5>












                  {foreach $hvxProductRails as $railKey}












                    {assign var=railData value=$hvxMenuRails[$railKey]}
              <button type="button" class="hvx-mobile-link hvx-mobile-list-item" data-hvx-mobile-rail="{$railKey}"
                data-hvx-mobile-title="{$railData.title|escape}" style="--hvx-stagger:{$hvxMobileStagger};">
                <span class="hvx-mobile-link-left"><i
                    class="{$railData.icon|escape}"></i><span>{$railData.title|escape}</span></span>
                <i class="far fa-chevron-right"></i>
              </button>












                    {assign var=hvxMobileStagger value=$hvxMobileStagger+1}












                  {/foreach}

            <h5 class="hvx-mobile-title">Support &amp; Billing</h5>












                  {foreach $hvxSupportBillingRails as $railKey}












                    {assign var=railData value=$hvxMenuRails[$railKey]}
              <button type="button" class="hvx-mobile-link hvx-mobile-list-item" data-hvx-mobile-rail="{$railKey}"
                data-hvx-mobile-title="{$railData.title|escape}" style="--hvx-stagger:{$hvxMobileStagger};">
                <span class="hvx-mobile-link-left"><i
                    class="{$railData.icon|escape}"></i><span>{$railData.title|escape}</span></span>
                <i class="far fa-chevron-right"></i>
              </button>












                    {assign var=hvxMobileStagger value=$hvxMobileStagger+1}












                  {/foreach}

            <h5 class="hvx-mobile-title">NameCadre Universe</h5>












                  {foreach $hvxUniverseRails as $railKey}












                    {assign var=railData value=$hvxMenuRails[$railKey]}
              <button type="button" class="hvx-mobile-link hvx-mobile-list-item" data-hvx-mobile-rail="{$railKey}"
                data-hvx-mobile-title="{$railData.title|escape}" style="--hvx-stagger:{$hvxMobileStagger};">
                <span class="hvx-mobile-link-left"><i
                    class="{$railData.icon|escape}"></i><span>{$railData.title|escape}</span></span>
                <i class="far fa-chevron-right"></i>
              </button>












                    {assign var=hvxMobileStagger value=$hvxMobileStagger+1}












                  {/foreach}
          </div>

          <div class="hvx-mobile-block hvx-mobile-locale-block">
            <h5 class="hvx-mobile-title">Language and Currency</h5>












                  {if count($hvxLangOptions) > 0}












                    {foreach $hvxLangOptions as $item}












                      {if $item.active}
                  <a class="hvx-mobile-link" href="{$item.url}">
                    <span class="hvx-mobile-link-left"><i class="far fa-globe"></i><span>{$item.name}</span></span>
                    <i class="far fa-chevron-right"></i>
                  </a>












                      {/if}












                    {/foreach}












                  {/if}












                  {if count($hvxCurrencyOptions) > 0}












                    {foreach $hvxCurrencyOptions as $item}












                      {if $item.active}
                  <a class="hvx-mobile-link" href="{$item.url}">
                    <span class="hvx-mobile-link-left"><i class="far fa-dollar-sign"></i><span>{$item.name}</span></span>
                    <i class="far fa-chevron-right"></i>
                  </a>












                      {/if}












                    {/foreach}












                  {/if}
          </div>

          <div class="hvx-mobile-block hvx-mobile-appearance-block">
            <h5 class="hvx-mobile-title">Appearance</h5>
            <button type="button" class="hvx-mobile-theme-btn" id="hvxThemeToggleMobile">
              <i class="far fa-sun"></i>
              <span>Switch to dark mode</span>
            </button>
          </div>
        </div>
      </section>

      <section class="hvx-mobile-menu-view hvx-mobile-menu-detail">
        <div class="hvx-mobile-menu-head">
          <div class="hvx-mobile-detail-title">
            <button type="button" class="hvx-mobile-menu-back" id="hvxMobileMenuBack" aria-label="Back">
              <i class="fas fa-arrow-left"></i>
            </button>
            <span id="hvxMobileMenuTitle">Menu</span>
          </div>
          <button type="button" class="hvx-mobile-menu-close" data-hvx-mobile-close aria-label="Close menu">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="hvx-mobile-menu-body hvx-mobile-detail-content" id="hvxMobileMenuDetailContent"></div>
      </section>
    </aside>












                  {assign var=hvxQpClientName value='Guest'}












                  {assign var=hvxQpCredit value='---'}












                  {if $loggedin}












                    {assign var=hvxQpClientName value=$clientsdetails.firstname|default:'Client'}












                    {if isset($clientsstats.creditbalance) && $clientsstats.creditbalance ne ''}












                      {assign var=hvxQpCredit value=$clientsstats.creditbalance}












                    {/if}












                  {/if}
    <div class="hvx-qp-overlay" id="hvxQuickPad" aria-hidden="true">
      <section class="hvx-qp-window" role="dialog" aria-modal="true" aria-labelledby="hvxQuickPadTitle">
        <header class="hvx-qp-search">
          <i class="far fa-search"></i>
          <input type="text" id="hvxQuickPadSearch" placeholder="Find services, domains, invoices..." autocomplete="off">
          <div class="hvx-qp-kbd">
            <span>/</span>
            <span>Ctrl+K</span>
          </div>
          <button type="button" class="hvx-qp-close" id="hvxQuickPadClose" aria-label="Close Quick Pad">
            <i class="fas fa-times"></i>
          </button>
        </header>
        <div class="hvx-qp-profile">
          <div class="hvx-qp-profile-main">
            <div class="hvx-qp-avatar"><i class="far fa-user"></i></div>
            <div>
              <p class="hvx-qp-welcome" id="hvxQuickPadTitle">Hello, {$hvxQpClientName|escape}!</p>
              <p class="hvx-qp-sub">Manage your account and services instantly</p>
            </div>
          </div>
          <div class="hvx-qp-balance">
            <p>Credit Balance</p>
            <strong>{$hvxQpCredit nofilter}</strong>
          </div>
        </div>
        <div class="hvx-qp-content" id="hvxQuickPadContent">












                  {foreach $quickPadData.sections as $section}












                    {if isset($section.items) && is_array($section.items) && count($section.items)}
              <section class="hvx-qp-section">
                <h5>{$section.heading|default:'Section'|escape}</h5>
                <div class="hvx-qp-grid">












                      {foreach $section.items as $item}












                        {assign var=hvxQpItemUrl value="`$WEB_ROOT``$item.url`"}












                        {if !$loggedin && isset($item.loginRequired) && $item.loginRequired}












                          {assign var=hvxQpGoto value=$item.url|default:''|regex_replace:'/^\//':''}












                          {assign var=hvxQpGotoEsc value=$hvxQpGoto|escape:'url'}












                          {assign var=hvxQpItemUrl value="`$WEB_ROOT`/login.php?goto=`$hvxQpGotoEsc`"}












                        {/if}
                    <a data-hvx-qp-item href="{$hvxQpItemUrl}">
                      <i class="{$item.icon|default:'fas fa-link'|escape}"></i>
                      <span>{$item.label|default:'Item'|escape}</span>
                    </a>












                      {/foreach}
                </div>
              </section>












                    {/if}












                  {/foreach}
        </div>
      </section>
    </div>
    <div class="hvx-mega-backdrop" id="hvxMegaBackdrop"></div>

    <script>
      (function() {
        var mega = document.getElementById('hvxMega');
        var megaBackdrop = document.getElementById('hvxMegaBackdrop');
        var content = document.getElementById('hvxContent');
        var header = document.getElementById('hvxHeader');
        var launchpadBtn = document.getElementById('hvxLaunchpadBtn');
        var cartBtn = document.getElementById('hvxCartBtn');
        var quickPad = document.getElementById('hvxQuickPad');
        var quickPadCloseBtn = document.getElementById('hvxQuickPadClose');
        var quickPadSearch = document.getElementById('hvxQuickPadSearch');
        var quickPadContent = document.getElementById('hvxQuickPadContent');
        var notifyPopover = document.getElementById('hvxNotifyPopover');
        var notifyList = document.getElementById('hvxNotifyList');
        var notifyEmpty = document.getElementById('hvxNotifyEmpty');
        var notifySectionLabel = document.getElementById('hvxNotifySectionLabel');
        var notifyFooter = document.getElementById('hvxNotifyFooter');
        var notifyFilters = document.getElementById('hvxNotifyFilters');
        var notifyPanelMenuBtn = document.getElementById('hvxNotifyPanelMenuBtn');
        var notifyPanelMenu = document.getElementById('hvxNotifyPanelMenu');
        var notifyBtn = document.getElementById('hvxNotifyBtn');
        var notifyApiUrl = '{$WEB_ROOT}{$hvxNotificationApiLink|escape:"javascript"}';
        var notifyApiToken = '{$hvxNotificationApiTokenValue|escape:"javascript"}';
        var notifyActiveFilters = [];
        var logoImg = header ? header.querySelector('.hvx-logo img') : null;
        var mobileBrandLogoImg = document.querySelector('.hvx-mobile-menu-brand img');
        var themeToggleBtn = document.getElementById('hvxThemeToggle');
        var themeToggleBtnMobile = document.getElementById('hvxThemeToggleMobile');
        var themeToggleBtnMobileIcon = document.getElementById('hvxThemeToggleMobileIcon');
        var localeBtnMobile = document.getElementById('hvxLocaleBtnMobile');
        var tabs = document.querySelectorAll('.hvx-tab');
        var toolbar = document.getElementById('hvxToolbar');
        var whoisWrap = toolbar ? toolbar.querySelector('.hvx-whois-wrap') : null;
        var whoisForm = whoisWrap ? whoisWrap.querySelector('.hvx-whois-search') : null;
        var whoisInput = whoisForm ? whoisForm.querySelector('.hvx-whois-input') : null;
        var whoisBtn = whoisForm ? whoisForm.querySelector('.hvx-whois-btn') : null;
        var whoisCloseBtn = document.getElementById('hvxWhoisClose');
        var rail = mega ? mega.querySelector('.hvx-rail') : null;
        var mobileMenu = document.getElementById('hvxMobileMenu');
        var mobileLocalePanel = document.getElementById('hvxMobileLocalePanel');
        var mobileMenuDetailContent = document.getElementById('hvxMobileMenuDetailContent');
        var mobileMenuTitle = document.getElementById('hvxMobileMenuTitle');
        var mobileMenuBack = document.getElementById('hvxMobileMenuBack');
        var currentTab = 'domains';
        var currentRail = 'domains';
        var THEME_STORAGE_KEY = 'hvx-header-theme';
        var VIEWPORT_TABLET_THRESHOLD = 976;
        var VIEWPORT_COMPACT_THRESHOLD = 860;
        var WHOIS_ICON_ONLY_THRESHOLD = 986;
        var WHOIS_SPACING_TARGET_IDS = ['hvxLaunchpadBtn', 'hvxThemeToggle', 'hvxNotifyBtn', 'hvxLocaleBtn',
          'hvxAccountBtn', 'hvxMobileToggle'
        ];
        var TAB_HIDE_PRIORITY = ['explore', 'email', 'hosting', 'domains'];
        var currentTheme = 'light';
        var contentSwapRaf = null;
        var contentTransitionToken = 0;
        var viewportSyncRaf = null;
        var viewportMode = 'desktop';
        var megaCloseCallbacks = [];
        var megaCloseToken = 0;
        var megaCloseInProgress = false;
        var headerScrollRaf = null;
        var headerScrollSyncRaf = null;
        var headerHiddenByScroll = false;
        var lastScrollY = window.scrollY || window.pageYOffset || 0;
        var HEADER_SCROLL_DEADZONE = 6;
        var HEADER_TOP_LOCK = 12;
        var MOBILE_LOGO_THRESHOLD = 530;

        function resolveLogoSrc(logoEl, theme) {
          if (!logoEl) return '';
          var normalizedTheme = theme === 'light' ? 'light' : 'dark';
          var defaultSrc = logoEl.getAttribute('src') || '';
          var lightLogo = logoEl.getAttribute('data-hvx-logo-light') || defaultSrc;
          var darkLogo = logoEl.getAttribute('data-hvx-logo-dark') || defaultSrc;
          var mobileLightLogo = logoEl.getAttribute('data-hvx-logo-mobile-light') || lightLogo;
          var mobileDarkLogo = logoEl.getAttribute('data-hvx-logo-mobile-dark') || darkLogo;
          var useMobileLogo = window.innerWidth <= MOBILE_LOGO_THRESHOLD;
          if (useMobileLogo) {
            return normalizedTheme === 'light' ? mobileLightLogo : mobileDarkLogo;
          }
          return normalizedTheme === 'light' ? lightLogo : darkLogo;
        }

        function syncThemeLogos(theme) {
          var normalizedTheme = theme === 'light' ? 'light' : 'dark';
          var primarySrc = resolveLogoSrc(logoImg, normalizedTheme);
          var mobileSrc = resolveLogoSrc(mobileBrandLogoImg, normalizedTheme);
          if (logoImg && primarySrc) {
            logoImg.setAttribute('src', primarySrc);
          }
          if (mobileBrandLogoImg && mobileSrc) {
            mobileBrandLogoImg.setAttribute('src', mobileSrc);
          }
        }

        function isAnyHeaderOverlayOpen() {
          var localePopover = document.getElementById('hvxLocalePopover');
          var accountPopover = document.getElementById('hvxAccountPopover');
          return document.body.classList.contains('hvx-mega-open') ||
            document.body.classList.contains('hvx-mobile-menu-open') ||
            document.body.classList.contains('hvx-qp-open') ||
            (notifyPopover && notifyPopover.classList.contains('is-open')) ||
            (localePopover && localePopover.classList.contains('is-open')) ||
            (accountPopover && accountPopover.classList.contains('is-open'));
        }

        function setHeaderScrollVisibility(hidden) {
          var shouldHide = !!hidden;
          if (viewportMode === 'compact' || isAnyHeaderOverlayOpen()) {
            shouldHide = false;
          }
          headerHiddenByScroll = shouldHide;
          document.body.classList.toggle('hvx-header-hidden', shouldHide);
        }

        function syncHeaderScrollVisibility() {
          var currentY = window.scrollY || window.pageYOffset || 0;
          var overlayOpen = isAnyHeaderOverlayOpen();
          if (viewportMode === 'compact' || overlayOpen) {
            setHeaderScrollVisibility(false);
            lastScrollY = currentY;
            return;
          }
          if (currentY <= HEADER_TOP_LOCK) {
            setHeaderScrollVisibility(false);
            lastScrollY = currentY;
            return;
          }
          var delta = currentY - lastScrollY;
          if (delta > HEADER_SCROLL_DEADZONE) {
            setHeaderScrollVisibility(true);
          } else if (delta < 0) {
            setHeaderScrollVisibility(false);
          }
          lastScrollY = currentY;
        }

        function requestHeaderScrollSync() {
          if (headerScrollSyncRaf) {
            window.cancelAnimationFrame(headerScrollSyncRaf);
          }
          headerScrollSyncRaf = window.requestAnimationFrame(function() {
            headerScrollSyncRaf = null;
            syncHeaderScrollVisibility();
          });
        }

        function isWhoisFocusEligible() {
          return window.innerWidth <= WHOIS_ICON_ONLY_THRESHOLD;
        }

        function setWhoisToolbarItemSpacing(isOpen) {
          WHOIS_SPACING_TARGET_IDS.forEach(function(id) {
            var el = document.getElementById(id);
            if (!el) return;
            if (!el.hasAttribute('data-hvx-orig-margin')) {
              el.setAttribute('data-hvx-orig-margin', el.style.margin || '');
            }
            if (!el.hasAttribute('data-hvx-orig-padding')) {
              el.setAttribute('data-hvx-orig-padding', el.style.padding || '');
            }
            if (isOpen) {
              el.style.margin = '0';
              el.style.padding = '0';
            } else {
              el.style.margin = el.getAttribute('data-hvx-orig-margin') || '';
              el.style.padding = el.getAttribute('data-hvx-orig-padding') || '';
            }
          });
        }

        function closeWhoisToolbarMode() {
          document.body.classList.remove('hvx-whois-toolbar-open');
          setWhoisToolbarItemSpacing(false);
        }

        function openWhoisToolbarMode() {
          if (!whoisWrap || !isWhoisFocusEligible()) return;
          document.body.classList.add('hvx-whois-toolbar-open');
          setWhoisToolbarItemSpacing(true);
          window.requestAnimationFrame(function() {
            if (whoisInput) {
              whoisInput.focus();
              whoisInput.select();
            }
          });
        }

        function syncThemeToggleUI(theme) {
          var isLight = theme === 'light';
          var nextThemeLabel = isLight ? 'Switch to dark mode' : 'Switch to light mode';
          var nextThemeIconClass = isLight ? 'far fa-moon' : 'far fa-sun';
          if (themeToggleBtn) {
            themeToggleBtn.setAttribute('title', nextThemeLabel);
            themeToggleBtn.setAttribute('aria-label', nextThemeLabel);
            themeToggleBtn.setAttribute('aria-pressed', String(!isLight));
            themeToggleBtn.innerHTML = '<i class="' + nextThemeIconClass + '" aria-hidden="true"></i>';
          }
          if (themeToggleBtnMobile) {
            var mobileThemeLabel = themeToggleBtnMobile.querySelector('span');
            if (mobileThemeLabel) {
              mobileThemeLabel.textContent = nextThemeLabel;
            } else {
              themeToggleBtnMobile.textContent = nextThemeLabel;
            }
            themeToggleBtnMobile.setAttribute('aria-label', nextThemeLabel);
          }
          if (themeToggleBtnMobileIcon) {
            themeToggleBtnMobileIcon.setAttribute('aria-label', nextThemeLabel);
            themeToggleBtnMobileIcon.setAttribute('title', nextThemeLabel);
            themeToggleBtnMobileIcon.innerHTML = '<i class="' + nextThemeIconClass + '" aria-hidden="true"></i>';
          }
        }

        function applyTheme(theme, persist) {
          var normalized = theme === 'light' ? 'light' : 'dark';
          currentTheme = normalized;
          if (header) {
            header.setAttribute('data-hvx-theme', normalized);
          }
          syncThemeLogos(normalized);
          document.body.classList.remove('hvx-theme-dark', 'hvx-theme-light');
          document.body.classList.add('hvx-theme-' + normalized);
          syncThemeToggleUI(normalized);
          if (persist) {
            try {
              window.localStorage.setItem(THEME_STORAGE_KEY, normalized);
            } catch (e) {}
          }
        }

        window.hvxSetTheme = function(theme) {
          applyTheme(theme, true);
        };

        var savedTheme = null;
        try {
          savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        } catch (e) {}
        applyTheme(savedTheme || 'light', false);

        if (themeToggleBtn) {
          themeToggleBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            closeWhoisToolbarMode();
            closeMega(function() {
              applyTheme(currentTheme === 'light' ? 'dark' : 'light', true);
            });
          });
        }
        if (themeToggleBtnMobile) {
          themeToggleBtnMobile.addEventListener('click', function() {
            applyTheme(currentTheme === 'light' ? 'dark' : 'light', true);
          });
        }
        if (themeToggleBtnMobileIcon) {
          themeToggleBtnMobileIcon.addEventListener('click', function() {
            closeWhoisToolbarMode();
            applyTheme(currentTheme === 'light' ? 'dark' : 'light', true);
          });
        }

        function getDefaultRailForTab(tabKey) {
          var tabEl = document.querySelector('.hvx-tab[data-hvx-tab="' + tabKey + '"]');
          return tabEl ? (tabEl.getAttribute('data-hvx-default-rail') || 'domains') : 'domains';
        }

        function getRailPanel(railKey) {
          return content.querySelector('[data-hvx-rail-panel="' + railKey + '"]');
        }

        function getActiveRailPanel() {
          return content.querySelector('.hvx-rail-panel.is-active');
        }

        function setRailActive(railKey) {
          document.querySelectorAll('.hvx-rail-item').forEach(function(el) {
            el.classList.toggle('is-active', el.getAttribute('data-hvx-rail') === railKey);
          });
        }

        function clearTabFitHidden() {
          tabs.forEach(function(tab) {
            tab.classList.remove('is-hidden-by-fit');
          });
          var nav = document.querySelector('.hvx-primary-nav');
          if (nav) {
            nav.classList.remove('hvx-all-hidden');
          }
        }

        function syncTabFit() {
          var nav = document.querySelector('.hvx-primary-nav');
          if (!nav) return;
          clearTabFitHidden();
          var visibleCount = tabs.length;
          for (var i = 0; i < TAB_HIDE_PRIORITY.length; i++) {
            if ((nav.scrollWidth - nav.clientWidth) <= 1 || visibleCount <= 0) {
              break;
            }
            var key = TAB_HIDE_PRIORITY[i];
            var tabEl = nav.querySelector('.hvx-tab[data-hvx-tab="' + key + '"]');
            if (!tabEl || tabEl.classList.contains('is-hidden-by-fit')) {
              continue;
            }
            tabEl.classList.add('is-hidden-by-fit');
            visibleCount -= 1;
          }
          if (visibleCount <= 0 || (nav.scrollWidth - nav.clientWidth) > 1) {
            nav.classList.add('hvx-all-hidden');
          }
        }

        function clearContentAnimationClasses() {
          content.classList.remove('is-content-enter', 'is-content-enter-active', 'is-content-leave',
            'is-content-leave-active',
            'is-close-leave', 'is-close-leave-active', 'dir-forward', 'dir-backward');
        }

        function clearRailAnimationClasses() {
          if (!rail) return;
          rail.classList.remove('is-enter', 'is-enter-active', 'is-leave', 'is-leave-active');
        }

        function refreshContentOverflowState() {
          window.requestAnimationFrame(function() {
            var panel = getActiveRailPanel();
            if (!panel) return;
            var hasOverflow = (panel.scrollHeight - panel.clientHeight) > 1;
            panel.classList.toggle('hvx-no-overflow', !hasOverflow);
          });
        }

        function activateRailPanel(railKey) {
          var panel = getRailPanel(railKey);
          if (!panel) return false;
          content.querySelectorAll('.hvx-rail-panel').forEach(function(el) {
            el.classList.remove('hvx-no-overflow');
            el.classList.toggle('is-active', el === panel);
          });
          panel.scrollTop = 0;
          currentRail = railKey;
          setRailActive(railKey);
          refreshContentOverflowState();
          return true;
        }

        function finalizeContentSwap(token) {
          if (token !== contentTransitionToken) return;
          clearContentAnimationClasses();
          content.classList.remove('is-opening-sequence');
        }

        function onTransitionDone(el, propertyName, callback, fallbackMs) {
          if (!el) return;
          var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            callback();
            return;
          }
          var done = false;
          var fallbackDelay = typeof fallbackMs === 'number' ? fallbackMs : 420;
          var timeoutId = window.setTimeout(function() {
            if (done) return;
            done = true;
            el.removeEventListener('transitionend', handler);
            callback();
          }, fallbackDelay);

          function handler(event) {
            if (event.target !== el) return;
            if (propertyName && event.propertyName !== propertyName) return;
            if (done) return;
            done = true;
            window.clearTimeout(timeoutId);
            el.removeEventListener('transitionend', handler);
            callback();
          }
          el.addEventListener('transitionend', handler);
        }

        function flushMegaCloseCallbacks() {
          if (!megaCloseCallbacks.length) return;
          var callbacks = megaCloseCallbacks.slice();
          megaCloseCallbacks.length = 0;
          callbacks.forEach(function(cb) {
            if (typeof cb === 'function') {
              cb();
            }
          });
        }

        function filterQuickPad() {
          if (!quickPadContent) return;
          var query = quickPadSearch ? quickPadSearch.value.toLowerCase().trim() : '';
          quickPadContent.querySelectorAll('[data-hvx-qp-item]').forEach(function(item) {
            var text = (item.textContent || '').toLowerCase();
            item.classList.toggle('hvx-qp-hidden', !!query && text.indexOf(query) === -1);
          });
        }

        function closeQuickPad() {
          if (!quickPad || !document.body.classList.contains('hvx-qp-open')) return;
          document.body.classList.remove('hvx-qp-open');
          quickPad.setAttribute('aria-hidden', 'true');
          if (quickPadSearch) {
            quickPadSearch.value = '';
            filterQuickPad();
          }
          requestHeaderScrollSync();
        }

        function openQuickPad() {
          if (!quickPad) return;
          closePopover('hvxLocaleBtn', 'hvxLocalePopover');
          closePopover('hvxNotifyBtn', 'hvxNotifyPopover');
          closePopover('hvxAccountBtn', 'hvxAccountPopover');
          closeMobileMenu();
          document.body.classList.add('hvx-qp-open');
          setHeaderScrollVisibility(false);
          quickPad.setAttribute('aria-hidden', 'false');
          if (quickPadSearch) {
            window.requestAnimationFrame(function() {
              quickPadSearch.focus();
              quickPadSearch.select();
            });
          }
        }

        function resetMegaCloseState(cancelCallbacks) {
          megaCloseToken += 1;
          megaCloseInProgress = false;
          if (cancelCallbacks) {
            megaCloseCallbacks.length = 0;
          }
        }

        function animateContentEnter(railKey, direction, staged, onDone) {
          var token = ++contentTransitionToken;
          if (!activateRailPanel(railKey)) return;
          clearContentAnimationClasses();
          content.classList.toggle('is-opening-sequence', !!staged);
          content.classList.add('is-content-enter', direction === 'backward' ? 'dir-backward' : 'dir-forward');
          contentSwapRaf = window.requestAnimationFrame(function() {
            contentSwapRaf = window.requestAnimationFrame(function() {
              if (token !== contentTransitionToken) return;
              content.classList.add('is-content-enter-active');
              onTransitionDone(content, 'transform', function() {
                finalizeContentSwap(token);
                refreshContentOverflowState();
                if (typeof onDone === 'function') {
                  onDone();
                }
              });
            });
          });
        }

        function animateContentSwap(nextRailKey, direction, onDone) {
          if (nextRailKey === currentRail) return;
          var token = ++contentTransitionToken;
          var moveDirection = direction === 'backward' ? 'backward' : 'forward';
          clearContentAnimationClasses();
          content.classList.remove('is-opening-sequence');
          content.classList.add('is-content-leave', moveDirection === 'backward' ? 'dir-backward' : 'dir-forward');
          contentSwapRaf = window.requestAnimationFrame(function() {
            contentSwapRaf = window.requestAnimationFrame(function() {
              if (token !== contentTransitionToken) return;
              content.classList.add('is-content-leave-active');
              onTransitionDone(content, 'transform', function() {
                if (token !== contentTransitionToken) return;
                animateContentEnter(nextRailKey, moveDirection, false, onDone);
              });
            });
          });
        }

        function playRailEnter() {
          if (!rail) return;
          clearRailAnimationClasses();
          void rail.offsetWidth;
          rail.classList.add('is-enter');
          window.requestAnimationFrame(function() {
            rail.classList.add('is-enter-active');
          });
        }

        function openMega(tabKey, preferredRail) {
          resetMegaCloseState(true);
          setHeaderScrollVisibility(false);
          var targetRail = preferredRail || getDefaultRailForTab(tabKey);
          currentTab = tabKey;
          tabs.forEach(function(el) {
            el.classList.toggle('is-active', el.getAttribute('data-hvx-tab') === tabKey);
          });
          mega.classList.remove('is-closing');
          if (mega.classList.contains('is-open')) {
            if (targetRail !== currentRail) {
              animateContentSwap(targetRail, 'forward');
            }
            return;
          }
          if (contentSwapRaf) {
            window.cancelAnimationFrame(contentSwapRaf);
            contentSwapRaf = null;
          }
          activateRailPanel(targetRail);
          clearContentAnimationClasses();
          content.classList.add('is-opening-sequence');
          if (rail) {
            clearRailAnimationClasses();
            rail.classList.add('is-enter');
          }
          document.body.classList.add('hvx-mega-open');
          mega.classList.add('is-opening');
          mega.classList.add('is-open');
          if (rail) {
            playRailEnter();
            onTransitionDone(rail, 'transform', function() {
              clearRailAnimationClasses();
            });
          }
          animateContentEnter(targetRail, 'forward', true, function() {
            mega.classList.remove('is-opening');
          });
          onTransitionDone(mega, 'height', function() {
            if (mega.classList.contains('is-open')) {
              mega.classList.remove('is-opening');
            }
          });
        }

        function syncViewportMode() {
          var width = window.innerWidth;
          var nextMode = 'desktop';
          if (width <= VIEWPORT_COMPACT_THRESHOLD) {
            nextMode = 'compact';
          } else if (width <= VIEWPORT_TABLET_THRESHOLD) {
            nextMode = 'tablet';
          }
          if (nextMode !== viewportMode) {
            document.body.classList.remove('hvx-desktop', 'hvx-tablet', 'hvx-compact');
            document.body.classList.add('hvx-' + nextMode);
            closeMega();
            clearContentAnimationClasses();
            if (nextMode === 'desktop') {
              closeMobileMenu();
            }
          }
          viewportMode = nextMode;
          if (!isWhoisFocusEligible()) {
            closeWhoisToolbarMode();
          }
          setHeaderScrollVisibility(false);
          lastScrollY = window.scrollY || window.pageYOffset || 0;
          syncTabFit();
          refreshContentOverflowState();
        }

        function closeMobileMenu() {
          document.body.classList.remove('hvx-mobile-menu-open');
          closeWhoisToolbarMode();
          if (mobileMenu) {
            mobileMenu.classList.remove('is-locale-open');
            mobileMenu.classList.remove('is-detail');
          }
          if (mobileMenuDetailContent) {
            mobileMenuDetailContent.innerHTML = '';
          }
          requestHeaderScrollSync();
        }

        function openMobileMenu() {
          if (viewportMode === 'desktop') return;
          closeMega();
          closeWhoisToolbarMode();
          if (!mobileMenu) return;
          mobileMenu.classList.remove('is-locale-open');
          mobileMenu.classList.remove('is-detail');
          document.body.classList.add('hvx-mobile-menu-open');
          setHeaderScrollVisibility(false);
        }

        function openMobileMenuDetail(railKey, title) {
          if (!mobileMenu || !mobileMenuDetailContent) return;
          var panel = getRailPanel(railKey);
          if (!panel) return;
          var groups = panel.querySelector('.hvx-groups');
          if (!groups) return;
          if (mobileMenuTitle) {
            mobileMenuTitle.textContent = title || 'Menu';
          }
          mobileMenuDetailContent.innerHTML = groups.outerHTML;
          mobileMenuDetailContent.scrollTop = 0;
          mobileMenu.classList.add('is-detail');
        }

        function closeMega(onDone) {
          if (typeof onDone === 'function') {
            megaCloseCallbacks.push(onDone);
          }
          if (contentSwapRaf) {
            window.cancelAnimationFrame(contentSwapRaf);
            contentSwapRaf = null;
          }
          if (!mega.classList.contains('is-open') && !mega.classList.contains('is-opening')) {
            clearRailAnimationClasses();
            clearContentAnimationClasses();
            document.body.classList.remove('hvx-mega-open');
            tabs.forEach(function(el) {
              el.classList.remove('is-active');
            });
            flushMegaCloseCallbacks();
            return;
          }
          if (megaCloseInProgress) {
            return;
          }
          megaCloseInProgress = true;
          var closeToken = ++megaCloseToken;

          function isStaleClose() {
            return closeToken !== megaCloseToken;
          }

          function finishClose() {
            if (isStaleClose()) return;
            mega.classList.remove('is-closing');
            document.body.classList.remove('hvx-mega-open');
            tabs.forEach(function(el) {
              el.classList.remove('is-active');
            });
            clearRailAnimationClasses();
            clearContentAnimationClasses();
            content.classList.remove('is-opening-sequence');
            megaCloseInProgress = false;
            flushMegaCloseCallbacks();
            requestHeaderScrollSync();
          }

          if (viewportMode !== 'desktop') {
            mega.classList.remove('is-opening', 'is-open');
            mega.classList.add('is-closing');
            clearRailAnimationClasses();
            clearContentAnimationClasses();
            onTransitionDone(mega, 'height', function() {
              finishClose();
            }, 320);
            return;
          }

          clearRailAnimationClasses();
          clearContentAnimationClasses();
          content.classList.remove('is-opening-sequence');

          function stageMegaCollapse() {
            if (isStaleClose()) return;
            mega.classList.remove('is-opening', 'is-open');
            mega.classList.add('is-closing');
            onTransitionDone(mega, 'height', function() {
              finishClose();
            }, 320);
          }

          var railDone = !rail;
          var contentDone = false;

          function tryCollapseAfterParallelLeave() {
            if (isStaleClose()) return;
            if (railDone && contentDone) {
              stageMegaCollapse();
            }
          }

          if (rail) {
            rail.classList.add('is-leave');
          }
          content.classList.add('is-close-leave');

          window.requestAnimationFrame(function() {
            if (isStaleClose()) return;
            if (rail) {
              rail.classList.add('is-leave-active');
              onTransitionDone(rail, 'transform', function() {
                if (isStaleClose()) return;
                railDone = true;
                tryCollapseAfterParallelLeave();
              }, 320);
            }

            content.classList.add('is-close-leave-active');
            onTransitionDone(content, 'transform', function() {
              if (isStaleClose()) return;
              contentDone = true;
              tryCollapseAfterParallelLeave();
            }, 320);
          });
        }

        activateRailPanel('domains');
        syncViewportMode();
        requestHeaderScrollSync();
        window.addEventListener('scroll', function() {
          if (headerScrollRaf) return;
          headerScrollRaf = window.requestAnimationFrame(function() {
            headerScrollRaf = null;
            syncHeaderScrollVisibility();
          });
        }, {
          passive: true
        });
        window.addEventListener('resize', function() {
          if (viewportSyncRaf) {
            window.cancelAnimationFrame(viewportSyncRaf);
          }
          viewportSyncRaf = window.requestAnimationFrame(function() {
            syncViewportMode();
            syncThemeLogos(currentTheme);
            alignOpenPopovers();
          });
        });
        window.requestAnimationFrame(syncTabFit);

        tabs.forEach(function(tab) {
          tab.addEventListener('click', function() {
            var key = tab.getAttribute('data-hvx-tab');
            if (mega.classList.contains('is-open') && currentTab === key) {
              closeMega();
            } else {
              openMega(key);
            }
          });
        });

        document.addEventListener('click', function(event) {
          var railBtn = event.target.closest('.hvx-rail-item');
          if (railBtn) {
            var railKey = railBtn.getAttribute('data-hvx-rail');
            if (!mega.classList.contains('is-open')) {
              openMega(currentTab, railKey);
            } else if (railKey !== currentRail) {
              animateContentSwap(railKey, 'forward');
            }
            return;
          }
          var insideMega = event.target.closest('#hvxMega');
          var clickedTab = event.target.closest('.hvx-tab');
          var insideHeader = event.target.closest('#hvxHeader');
          if (languageSelectWrap && !event.target.closest('#hvxLanguageSelect')) {
            closeLanguagePanel(false);
          }
          if (currencySelectWrap && !event.target.closest('#hvxCurrencySelect')) {
            closeCurrencyPanel(false);
          }
          if (!event.target.closest('#hvxNotifyPopover') && !event.target.closest('#hvxNotifyBtn')) {
            closeNotifyMenus();
          }
          if (document.body.classList.contains('hvx-whois-toolbar-open') && !event.target.closest(
              '.hvx-whois-wrap')) {
            closeWhoisToolbarMode();
          }
          if ((mega.classList.contains('is-open') || mega.classList.contains('is-opening')) && !insideMega && !
            clickedTab) {
            closeMega();
          }
          if (!insideHeader) {
            closePopover('hvxLocaleBtn', 'hvxLocalePopover');
            closePopover('hvxNotifyBtn', 'hvxNotifyPopover');
            closePopover('hvxAccountBtn', 'hvxAccountPopover');
          }
        });

        if (megaBackdrop) {
          megaBackdrop.addEventListener('click', function() {
            closeMega();
          });
        }

        document.addEventListener('keydown', function(event) {
          if (event.key === 'Escape') {
            closeWhoisToolbarMode();
            closeQuickPad();
            closeMega();
            closePopover('hvxLocaleBtn', 'hvxLocalePopover');
            closePopover('hvxNotifyBtn', 'hvxNotifyPopover');
            closePopover('hvxAccountBtn', 'hvxAccountPopover');
            closeMobileMenu();
          }
          var targetTag = event.target && event.target.tagName ? event.target.tagName.toUpperCase() : '';
          var isTypingTarget = targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT' || (event
            .target && event.target.isContentEditable);
          if (event.key === '/' && !isTypingTarget) {
            event.preventDefault();
            closeMega(function() {
              openQuickPad();
            });
          }
          if (event.ctrlKey && String(event.key).toLowerCase() === 'k') {
            event.preventDefault();
            closeMega(function() {
              openQuickPad();
            });
          }
        });

        var languageSelectWrap = document.getElementById('hvxLanguageSelect');
        var languageTrigger = document.getElementById('hvxLanguageTrigger');
        var languagePanel = document.getElementById('hvxLanguagePanel');
        var languageCurrent = document.getElementById('hvxLanguageCurrent');
        var languageSearch = document.getElementById('hvxLanguageSearch');
        var languageOptionsHolder = document.getElementById('hvxLanguageOptions');

        function filterLanguageOptions(term) {
          if (!languageOptionsHolder || !languagePanel) return;
          var query = String(term || '').toLowerCase().trim();
          var anyVisible = false;
          languageOptionsHolder.querySelectorAll('.hvx-language-option').forEach(function(option) {
            var label = (option.getAttribute('data-hvx-language-name') || option.textContent || '').toLowerCase();
            var matched = query === '' || label.indexOf(query) !== -1;
            option.parentElement.style.display = matched ? '' : 'none';
            if (matched) anyVisible = true;
          });
          languagePanel.classList.toggle('is-empty', !anyVisible);
        }

        function closeLanguagePanel(resetSearch) {
          if (!languageSelectWrap || !languageTrigger || !languagePanel) return;
          languageSelectWrap.classList.remove('is-open');
          languageTrigger.setAttribute('aria-expanded', 'false');
          languagePanel.classList.remove('is-empty');
          if (resetSearch && languageSearch) {
            languageSearch.value = '';
            filterLanguageOptions('');
          }
        }

        if (languageTrigger) {
          languageTrigger.addEventListener('click', function(event) {
            event.stopPropagation();
            closeCurrencyPanel(false);
            var willOpen = !languageSelectWrap.classList.contains('is-open');
            if (willOpen) {
              languageSelectWrap.classList.add('is-open');
              languageTrigger.setAttribute('aria-expanded', 'true');
              if (languageSearch) {
                languageSearch.focus();
                languageSearch.select();
              }
            } else {
              closeLanguagePanel(false);
            }
          });
        }

        if (languageSearch) {
          languageSearch.addEventListener('input', function() {
            filterLanguageOptions(languageSearch.value);
          });
        }

        if (languageOptionsHolder) {
          languageOptionsHolder.addEventListener('click', function(event) {
            var option = event.target.closest('.hvx-language-option');
            if (!option) return;
            event.preventDefault();
            var targetUrl = option.getAttribute('data-hvx-language-url');
            var targetName = option.getAttribute('data-hvx-language-name');
            if (languageCurrent && targetName) {
              languageCurrent.textContent = targetName;
            }
            languageOptionsHolder.querySelectorAll('.hvx-language-option').forEach(function(el) {
              el.classList.toggle('is-active', el === option);
            });
            closeLanguagePanel(true);
            if (targetUrl) {
              window.location.href = targetUrl;
            }
          });
        }

        var currencySelectWrap = document.getElementById('hvxCurrencySelect');
        var currencyTrigger = document.getElementById('hvxCurrencyTrigger');
        var currencyPanel = document.getElementById('hvxCurrencyPanel');
        var currencyCurrent = document.getElementById('hvxCurrencyCurrent');
        var currencySearch = document.getElementById('hvxCurrencySearch');
        var currencyOptionsHolder = document.getElementById('hvxCurrencyOptions');

        function filterCurrencyOptions(term) {
          if (!currencyOptionsHolder || !currencyPanel) return;
          var query = String(term || '').toLowerCase().trim();
          var anyVisible = false;
          currencyOptionsHolder.querySelectorAll('.hvx-currency-option').forEach(function(option) {
            var label = (option.getAttribute('data-hvx-currency-name') || option.textContent || '').toLowerCase();
            var matched = query === '' || label.indexOf(query) !== -1;
            option.parentElement.style.display = matched ? '' : 'none';
            if (matched) anyVisible = true;
          });
          currencyPanel.classList.toggle('is-empty', !anyVisible);
        }

        function closeCurrencyPanel(resetSearch) {
          if (!currencySelectWrap || !currencyTrigger || !currencyPanel) return;
          currencySelectWrap.classList.remove('is-open');
          currencyTrigger.setAttribute('aria-expanded', 'false');
          currencyPanel.classList.remove('is-empty');
          if (resetSearch && currencySearch) {
            currencySearch.value = '';
            filterCurrencyOptions('');
          }
        }

        if (currencyTrigger) {
          currencyTrigger.addEventListener('click', function(event) {
            event.stopPropagation();
            closeLanguagePanel(false);
            var willOpen = !currencySelectWrap.classList.contains('is-open');
            if (willOpen) {
              currencySelectWrap.classList.add('is-open');
              currencyTrigger.setAttribute('aria-expanded', 'true');
              if (currencySearch) {
                currencySearch.focus();
                currencySearch.select();
              }
            } else {
              closeCurrencyPanel(false);
            }
          });
        }

        if (currencySearch) {
          currencySearch.addEventListener('input', function() {
            filterCurrencyOptions(currencySearch.value);
          });
        }

        if (currencyOptionsHolder) {
          currencyOptionsHolder.addEventListener('click', function(event) {
            var option = event.target.closest('.hvx-currency-option');
            if (!option) return;
            event.preventDefault();
            var targetUrl = option.getAttribute('data-hvx-currency-url');
            var targetName = option.getAttribute('data-hvx-currency-name');
            if (currencyCurrent && targetName) {
              currencyCurrent.textContent = targetName;
            }
            currencyOptionsHolder.querySelectorAll('.hvx-currency-option').forEach(function(el) {
              el.classList.toggle('is-active', el === option);
            });
            closeCurrencyPanel(true);
            if (targetUrl) {
              window.location.href = targetUrl;
            }
          });
        }

        function getNotifyItems() {
          if (!notifyList) return [];
          return Array.prototype.slice.call(notifyList.querySelectorAll('.hvx-notify-item'));
        }

        function getNotifyBool(item, key) {
          return !!item && item.getAttribute('data-' + key) === '1';
        }

        function setNotifyBool(item, key, value) {
          if (!item) return;
          var enabled = !!value;
          item.setAttribute('data-' + key, enabled ? '1' : '0');
          item.classList.toggle('is-' + key, enabled);
        }

        function syncNotifyItemMenuLabels(item) {
          if (!item) return;
          var unreadLabel = item.querySelector('[data-hvx-notify-toggle-unread-label]');
          var unreadBtn = item.querySelector('[data-hvx-notify-item-action="toggle-unread"]');
          var flagLabel = item.querySelector('[data-hvx-notify-toggle-flag-label]');
          var isUnread = getNotifyBool(item, 'unread');
          var isFlagged = getNotifyBool(item, 'flagged');

          if (unreadLabel) unreadLabel.textContent = isUnread ? 'Mark as read' : 'Already read';
          if (unreadBtn) unreadBtn.disabled = !isUnread;
          if (flagLabel) flagLabel.textContent = isFlagged ? 'Unflag' : 'Flag';
        }

        function syncNotifyBellUnreadDot() {
          if (!notifyBtn) return;
          var hasUnread = getNotifyItems().some(function(item) {
            return getNotifyBool(item, 'unread');
          });
          notifyBtn.classList.toggle('has-unread', hasUnread);
        }

        function getNotifyDbId(item) {
          if (!item) return 0;
          var rawId = item.getAttribute('data-hvx-notify-id') || '';
          var match = rawId.match(/(\d+)$/);
          return match ? parseInt(match[1], 10) : 0;
        }

        function persistNotifyReadApi(op, notificationId) {
          if (!notifyApiUrl || !notifyApiToken) {
            return Promise.resolve({
              success: false
            });
          }
          var requestUrl = notifyApiUrl + (notifyApiUrl.indexOf('?') === -1 ? '?' : '&') + 'op=' +
            encodeURIComponent(op);
          var payload = new URLSearchParams();
          payload.set('token', notifyApiToken);
          if (notificationId) {
            payload.set('notification_id', String(notificationId));
          }

          return fetch(requestUrl, {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
              },
              body: payload.toString()
            })
            .then(function(response) {
              if (!response.ok) {
                return {
                  success: false
                };
              }
              return response.json().catch(function() {
                return {
                  success: false
                };
              });
            })
            .catch(function() {
              return {
                success: false
              };
            });
        }

        function closeNotifyItemMenus() {
          getNotifyItems().forEach(function(item) {
            var btn = item.querySelector('.hvx-notify-item-menu-btn');
            var menu = item.querySelector('.hvx-notify-item-menu');
            if (btn) {
              btn.classList.remove('is-open');
              btn.setAttribute('aria-expanded', 'false');
            }
            if (menu) {
              menu.classList.remove('is-open');
            }
          });
        }

        function closeNotifyMenus() {
          closeNotifyItemMenus();
          if (notifyPanelMenuBtn) {
            notifyPanelMenuBtn.classList.remove('is-open');
            notifyPanelMenuBtn.setAttribute('aria-expanded', 'false');
          }
          if (notifyPanelMenu) {
            notifyPanelMenu.classList.remove('is-open');
          }
        }

        function applyNotifyFilter() {
          var items = getNotifyItems();
          var shown = 0;
          var hasActiveFilters = notifyActiveFilters.length > 0;
          var availableByFilter = {
            priority: 0,
            flagged: 0,
            unread: 0
          };
          items.forEach(function(item) {
            var isPriority = getNotifyBool(item, 'priority');
            var isFlagged = getNotifyBool(item, 'flagged');
            var isUnread = getNotifyBool(item, 'unread');
            if (isPriority) availableByFilter.priority += 1;
            if (isFlagged) availableByFilter.flagged += 1;
            if (isUnread) availableByFilter.unread += 1;
            var visible = true;
            if (visible && hasActiveFilters) {
              visible = notifyActiveFilters.some(function(filterKey) {
                if (filterKey === 'priority') return isPriority;
                if (filterKey === 'flagged') return isFlagged;
                if (filterKey === 'unread') return isUnread;
                return false;
              });
            }
            item.style.display = visible ? '' : 'none';
            if (visible) shown += 1;
          });

          if (notifyEmpty) {
            notifyEmpty.style.display = shown ? 'none' : 'flex';
          }
          if (notifySectionLabel) {
            notifySectionLabel.style.display = shown ? '' : 'none';
          }
          if (notifyFooter) {
            notifyFooter.style.display = shown ? 'inline-flex' : 'none';
          }

          if (notifyFilters) {
            notifyFilters.querySelectorAll('.hvx-notify-filter').forEach(function(btn) {
              var key = btn.getAttribute('data-hvx-notify-filter');
              btn.classList.toggle('is-active', notifyActiveFilters.indexOf(key) !== -1);
              btn.classList.toggle('is-dimmed', key && !availableByFilter[key]);
            });
          }
          syncNotifyBellUnreadDot();
        }

        function isNotifyFilterKey(filterKey) {
          return filterKey === 'priority' || filterKey === 'flagged' || filterKey === 'unread';
        }

        function setNotifyFilters(nextFilters) {
          var normalized = [];
          (nextFilters || []).forEach(function(filterKey) {
            if (isNotifyFilterKey(filterKey) && normalized.indexOf(filterKey) === -1) {
              normalized.push(filterKey);
            }
          });
          notifyActiveFilters = normalized;
          applyNotifyFilter();
        }

        function toggleNotifyFilter(filterKey) {
          if (!isNotifyFilterKey(filterKey)) {
            return;
          }
          var nextFilters = notifyActiveFilters.slice();
          var idx = nextFilters.indexOf(filterKey);
          if (idx === -1) {
            nextFilters.push(filterKey);
          } else {
            nextFilters.splice(idx, 1);
          }
          setNotifyFilters(nextFilters);
        }

        if (notifyFilters) {
          notifyFilters.addEventListener('click', function(event) {
            var filterBtn = event.target.closest('.hvx-notify-filter');
            if (!filterBtn) return;
            event.preventDefault();
            toggleNotifyFilter(filterBtn.getAttribute('data-hvx-notify-filter'));
          });
        }

        if (notifyPanelMenuBtn) {
          notifyPanelMenuBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            closeNotifyItemMenus();
            var willOpen = !notifyPanelMenu.classList.contains('is-open');
            notifyPanelMenuBtn.classList.toggle('is-open', willOpen);
            notifyPanelMenuBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            notifyPanelMenu.classList.toggle('is-open', willOpen);
          });
        }

        if (notifyPanelMenu) {
          notifyPanelMenu.addEventListener('click', function(event) {
            var actionBtn = event.target.closest('[data-hvx-notify-panel-action]');
            if (!actionBtn) return;
            event.preventDefault();
            var action = actionBtn.getAttribute('data-hvx-notify-panel-action');
            if (action === 'mark-all-read') {
              var changedItems = [];
              getNotifyItems().forEach(function(item) {
                if (getNotifyBool(item, 'unread')) {
                  changedItems.push(item);
                  setNotifyBool(item, 'unread', false);
                  syncNotifyItemMenuLabels(item);
                }
              });
              applyNotifyFilter();
              persistNotifyReadApi('markAllRead', 0).then(function(result) {
                if (!result || !result.success) {
                  changedItems.forEach(function(item) {
                    setNotifyBool(item, 'unread', true);
                    syncNotifyItemMenuLabels(item);
                  });
                  applyNotifyFilter();
                  console.warn('Failed to persist mark-all-read state.');
                }
              });
            } else if (action === 'preferences') {
              var targetUrl = actionBtn.getAttribute('data-url');
              if (targetUrl) {
                window.location.href = targetUrl;
                return;
              }
            }
            closeNotifyMenus();
          });
        }

        if (notifyList) {
          notifyList.addEventListener('click', function(event) {
            var itemMenuBtn = event.target.closest('.hvx-notify-item-menu-btn');
            if (itemMenuBtn) {
              event.preventDefault();
              event.stopPropagation();
              var item = itemMenuBtn.closest('.hvx-notify-item');
              if (!item) return;
              var itemMenu = item.querySelector('.hvx-notify-item-menu');
              if (!itemMenu) return;
              var willOpen = !itemMenu.classList.contains('is-open');
              closeNotifyItemMenus();
              itemMenuBtn.classList.toggle('is-open', willOpen);
              itemMenuBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
              itemMenu.classList.toggle('is-open', willOpen);
              syncNotifyItemMenuLabels(item);
              return;
            }

            var actionBtn = event.target.closest('[data-hvx-notify-item-action]');
            if (!actionBtn) return;
            event.preventDefault();
            event.stopPropagation();
            var item = actionBtn.closest('.hvx-notify-item');
            if (!item) return;
            var action = actionBtn.getAttribute('data-hvx-notify-item-action');
            if (action === 'toggle-unread') {
              if (getNotifyBool(item, 'unread')) {
                setNotifyBool(item, 'unread', false);
                syncNotifyItemMenuLabels(item);
                applyNotifyFilter();
                var dbId = getNotifyDbId(item);
                persistNotifyReadApi('markRead', dbId).then(function(result) {
                  if (!result || !result.success) {
                    setNotifyBool(item, 'unread', true);
                    syncNotifyItemMenuLabels(item);
                    applyNotifyFilter();
                    console.warn('Failed to persist mark-read state for notification.');
                  }
                });
              }
            } else if (action === 'toggle-flag') {
              var nextFlaggedState = !getNotifyBool(item, 'flagged');
              setNotifyBool(item, 'flagged', nextFlaggedState);
              syncNotifyItemMenuLabels(item);
              applyNotifyFilter();
              var dbId = getNotifyDbId(item);
              persistNotifyReadApi(nextFlaggedState ? 'flag' : 'unflag', dbId).then(function(result) {
                if (!result || !result.success) {
                  setNotifyBool(item, 'flagged', !nextFlaggedState);
                  syncNotifyItemMenuLabels(item);
                  applyNotifyFilter();
                  console.warn('Failed to persist flag state for notification.');
                }
              });
            }
            syncNotifyItemMenuLabels(item);
            applyNotifyFilter();
            closeNotifyMenus();
          });
        }

        getNotifyItems().forEach(function(item) {
          syncNotifyItemMenuLabels(item);
        });
        applyNotifyFilter();

        function alignPopoverCaret(btnId, popId) {
          var btn = document.getElementById(btnId);
          var pop = document.getElementById(popId);
          if (!btn || !pop || !pop.classList.contains('is-open')) return;

          var btnRect = btn.getBoundingClientRect();
          var popRect = pop.getBoundingClientRect();
          if (!btnRect || !popRect || popRect.width <= 0) return;

          var btnCenterX = btnRect.left + (btnRect.width / 2);
          var caretHalf = 6;
          var rawRight = (popRect.right - btnCenterX) - caretHalf;
          var minRight = 10;
          var maxRight = Math.max(minRight, popRect.width - 22);
          var caretRight = Math.max(minRight, Math.min(maxRight, rawRight));
          pop.style.setProperty('--hvx-popover-caret-right', caretRight.toFixed(1) + 'px');
        }

        function alignOpenPopovers() {
          alignPopoverCaret('hvxLocaleBtn', 'hvxLocalePopover');
          alignPopoverCaret('hvxNotifyBtn', 'hvxNotifyPopover');
          alignPopoverCaret('hvxAccountBtn', 'hvxAccountPopover');
        }

        function closePopover(btnId, popId) {
          var btn = document.getElementById(btnId);
          var pop = document.getElementById(popId);
          if (!btn || !pop) return;
          btn.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          pop.classList.remove('is-open');
          pop.style.removeProperty('--hvx-popover-caret-right');
          if (popId === 'hvxLocalePopover') {
            closeLanguagePanel(true);
            closeCurrencyPanel(true);
          }
          if (popId === 'hvxNotifyPopover') {
            closeNotifyMenus();
          }
          requestHeaderScrollSync();
        }

        function togglePopover(btnId, popId) {
          var btn = document.getElementById(btnId);
          var pop = document.getElementById(popId);
          if (!btn || !pop) return;
          var willOpen = !pop.classList.contains('is-open');
          closePopover('hvxLocaleBtn', 'hvxLocalePopover');
          closePopover('hvxNotifyBtn', 'hvxNotifyPopover');
          closePopover('hvxAccountBtn', 'hvxAccountPopover');
          if (willOpen) {
            btn.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
            pop.classList.add('is-open');
            window.requestAnimationFrame(function() {
              alignPopoverCaret(btnId, popId);
            });
            if (popId === 'hvxNotifyPopover') {
              applyNotifyFilter();
            }
            setHeaderScrollVisibility(false);
          } else {
            requestHeaderScrollSync();
          }
        }

        var localeBtn = document.getElementById('hvxLocaleBtn');
        var accountBtn = document.getElementById('hvxAccountBtn');
        if (localeBtn) {
          localeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWhoisToolbarMode();
            closeMega(function() {
              togglePopover('hvxLocaleBtn', 'hvxLocalePopover');
            });
          });
        }
        if (localeBtnMobile) {
          localeBtnMobile.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (viewportMode !== 'compact' || window.innerWidth > 650 || !mobileMenu || !mobileLocalePanel) {
              closeMega(function() {
                togglePopover('hvxLocaleBtn', 'hvxLocalePopover');
              });
              return;
            }
            var willOpen = !mobileMenu.classList.contains('is-locale-open');
            mobileMenu.classList.remove('is-detail');
            mobileMenu.classList.toggle('is-locale-open', willOpen);
            if (willOpen) {
              mobileLocalePanel.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        }
        if (notifyBtn) {
          notifyBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWhoisToolbarMode();
            closeMega(function() {
              togglePopover('hvxNotifyBtn', 'hvxNotifyPopover');
            });
          });
        }
        if (accountBtn) {
          accountBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWhoisToolbarMode();
            closeMega(function() {
              togglePopover('hvxAccountBtn', 'hvxAccountPopover');
            });
          });
        }

        if (whoisForm) {
          whoisForm.addEventListener('submit', function(event) {
            var isIconMode = isWhoisFocusEligible();
            if (isIconMode && !document.body.classList.contains('hvx-whois-toolbar-open')) {
              event.preventDefault();
              openWhoisToolbarMode();
              return;
            }
            var query = whoisInput ? String(whoisInput.value || '').trim() : '';
            if (!query) {
              event.preventDefault();
              if (whoisInput) whoisInput.focus();
              return;
            }
            event.preventDefault();
            var base = String(whoisForm.getAttribute('action') || '').replace(/\/+$/, '');
            var isUrlLikeQuery = /^(?:https?:\/\/|\/\/)/i.test(query) || /[\/?#]/.test(query);
            if (isUrlLikeQuery) {
              window.location.href = base + '?domain=' + encodeURIComponent(query);
              return;
            }
            window.location.href = base + '/' + encodeURIComponent(query);
          });
        }

        if (whoisBtn) {
          whoisBtn.addEventListener('click', function(event) {
            if (!isWhoisFocusEligible()) return;
            if (!document.body.classList.contains('hvx-whois-toolbar-open')) {
              event.preventDefault();
              openWhoisToolbarMode();
            }
          });
        }

        if (whoisCloseBtn) {
          whoisCloseBtn.addEventListener('click', function(event) {
            event.preventDefault();
            closeWhoisToolbarMode();
          });
        }

        function bindCloseThenNavigate(anchorEl) {
          if (!anchorEl) return;
          anchorEl.addEventListener('click', function(event) {
            if (!mega.classList.contains('is-open') && !mega.classList.contains('is-opening')) {
              return;
            }
            var targetHref = anchorEl.getAttribute('href');
            if (!targetHref) return;
            event.preventDefault();
            closeMega(function() {
              window.location.href = targetHref;
            });
          });
        }

        bindCloseThenNavigate(cartBtn);
        if (launchpadBtn) {
          launchpadBtn.addEventListener('click', function(event) {
            event.preventDefault();
            closeMega(function() {
              openQuickPad();
            });
          });
        }
        if (quickPadCloseBtn) {
          quickPadCloseBtn.addEventListener('click', function() {
            closeQuickPad();
          });
        }
        if (quickPadSearch) {
          quickPadSearch.addEventListener('input', filterQuickPad);
        }
        if (quickPad) {
          quickPad.addEventListener('click', function(event) {
            if (event.target === quickPad) {
              closeQuickPad();
            }
          });
        }

        var mobileToggle = document.getElementById('hvxMobileToggle');
        if (mobileToggle) {
          mobileToggle.addEventListener('click', function() {
            closeWhoisToolbarMode();
            openMobileMenu();
          });
        }
        if (mobileMenuBack) {
          mobileMenuBack.addEventListener('click', function() {
            if (mobileMenu) {
              mobileMenu.classList.remove('is-detail');
            }
          });
        }
        if (mobileMenu) {
          mobileMenu.addEventListener('click', function(event) {
            if (window.innerWidth <= 650 && event.target.closest('#hvxMobileLocalePanel a')) {
              mobileMenu.classList.remove('is-locale-open');
            }
            var closeBtn = event.target.closest('[data-hvx-mobile-close]');
            if (closeBtn) {
              closeMobileMenu();
              return;
            }
            if (mobileMenu.classList.contains('is-locale-open') && !event.target.closest('#hvxMobileLocalePanel') &&
              !event.target.closest('#hvxLocaleBtnMobile')) {
              mobileMenu.classList.remove('is-locale-open');
            }
            var railBtn = event.target.closest('[data-hvx-mobile-rail]');
            if (railBtn) {
              event.preventDefault();
              mobileMenu.classList.remove('is-locale-open');
              openMobileMenuDetail(railBtn.getAttribute('data-hvx-mobile-rail'), railBtn.getAttribute(
                'data-hvx-mobile-title'));
            }
          });
        }

      })();
    </script>
    {if $filename != 'about-us'
                            && $filename != 'cloud-hosting'
                            && $filename != 'dedicated-server'
                            && $filename != 'domain-search'
                            && $filename != 'legal-agreement'
                            && $filename != 'privacy-policy'
                            && $filename != 'reseller-hosting'
                            && $filename != 'shared-hosting'
                            && $filename != 'transfer-domain'
                            && $filename != 'vps-server'
                            && $filename != 'wordpress-hosting'
                            && $filename != 'business-email'
                            && $filename != 'codeguard'
                            && $filename != 'domain-promos'
                            && $filename != 'enterprise-email'
                            && $filename != 'google-workspace'
                            && $filename != 'our-team'
                            && $filename != 'sitelock'
                            && $filename != 'ssl-certificates'
                            && $filename != 'pricing-comparision'
                            && $filename != 'pricing-default'
                            && $filename != 'princing-package'
                            && $filename != 'princing-webhosting-package'
                            && $filename != 'affiliate'
                            && $filename != 'network'
                            && $filename != 'our-partner'
                            && $filename != 'coming-soon'
                          && $filename != 'cover-page'}














                  {if !in_array($templatefile, ['homepage', 'login', 'clientregister', 'password-reset-container', 'logout', 'whois'])}












                    {include file="$template/includes/breadcrumb.tsx"}












                  {/if}













                  {if $templatefile == 'homepage'}












                  {else}












                    {include file="$template/includes/verifyemail.tsx"}
      <section id="main-body">












                    {if !in_array($templatefile, ['login', 'clientregister', 'password-reset-container', 'logout'])}
          <div class="container











                      {if $skipMainBodyContainer}-fluid without-padding











                      {/if}">
            <div class="row">












                      {if !$inShoppingCart && ($primarySidebar->hasChildren() || $secondarySidebar->hasChildren())}
                <div class="col-lg-4 col-xl-3 main-sidebar">
                  <div class="position-sticky top-2rem">
                    <div class="main-sidebar d-flex flex-column gap-3">
                      <div class="sidebar sidebar-primary">












                        {include file="$template/includes/sidebar.tsx" sidebar=$primarySidebar sidebarGroup='primary'}
                      </div>
                      <div class="sidebar sidebar-secondary">












                        {include file="$template/includes/sidebar.tsx" sidebar=$secondarySidebar sidebarGroup='secondary'}
                      </div>
                    </div>
                  </div>
                </div>
              {/if}

              <!-- Container for main page display content -->
              <div
                class="{if !$inShoppingCart && ($primarySidebar->hasChildren() || $secondarySidebar->hasChildren())}col-lg-8 col-xl-9{else}col-12{/if} primary-content">
                {include file="$template/includes/clientads-banner.tsx"}
              {/if}
            {/if}
{/if}
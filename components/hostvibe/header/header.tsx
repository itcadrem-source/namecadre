"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import {
  getHostvibeHeaderData,
  getHostvibeQuickPadData,
  getHostvibeHeaderUtilityData,
} from "@/lib/hostvibe/data";
import HostvibeSearchPopup from "./search-popup";
import type {
  HostvibeHeaderNotification,
  HostvibeLink,
  HostvibeMenuRail,
} from "@/lib/hostvibe/types";

type ThemeMode = "light" | "dark";
type PopoverKey = "locale" | "account" | "notify" | null;
type NotifyFilter = "all" | "priority" | "flagged" | "unread";
type ViewportMode = "desktop" | "tablet" | "compact";

const VIEWPORT_TABLET_THRESHOLD = 976;
const VIEWPORT_COMPACT_THRESHOLD = 860;
const MOBILE_LOGO_THRESHOLD = 530;
const MOBILE_MENU_ICON_ONLY_THRESHOLD = 430;
const TAB_HIDE_PRIORITY = ["explore", "email", "hosting", "domains"] as const;

const headerMenuData = getHostvibeHeaderData();
const utilityData = getHostvibeHeaderUtilityData();
const quickPadData = getHostvibeQuickPadData();

const railBuckets = [
  { title: null, id: "hvxHotRail", rails: headerMenuData.railGroups.hot ?? [] },
  {
    title: "All products",
    id: "hvxProductsRail",
    rails: headerMenuData.railGroups.products ?? [],
  },
  {
    title: "Support & Billing",
    id: "hvxSupportBillingRail",
    rails: headerMenuData.railGroups.supportBilling ?? [],
  },
  {
    title: "NameCadre universe",
    id: "hvxUniverseRail",
    rails: headerMenuData.railGroups.universe ?? [],
  },
] as const;

const whoisSuggestions = [
  "domain search",
  "whois lookup",
  "transfer domain",
  "domain pricing",
] as const;

const whoisRecent = [
  "namecadre.com",
  "hostvibe.net",
  "example.org",
] as const;

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function resolveHref(value: HostvibeLink | string) {
  if (typeof value === "string") {
    return value;
  }

  return value.value;
}

function getRailForTab(tabKey: string, defaultRail: string) {
  return tabKey === "explore" ? "hot" : defaultRail;
}

function getTabForRail(railKey: string, tabs: typeof headerMenuData.tabs) {
  const matched = tabs.find((tab) => getRailForTab(tab.key, tab.defaultRail) === railKey);
  if (matched) {
    return matched.key;
  }

  if (railKey === "hot") {
    return "explore";
  }

  return null;
}

function getViewportMode(width: number): ViewportMode {
  if (width <= VIEWPORT_COMPACT_THRESHOLD) {
    return "compact";
  }

  if (width <= VIEWPORT_TABLET_THRESHOLD) {
    return "tablet";
  }

  return "desktop";
}

function getLogoSrc(
  theme: ThemeMode,
  mobile: boolean,
  logos?: {
    primary?: string;
    primaryDark?: string;
    primaryLight?: string;
    mobile?: string;
    mobileDark?: string;
    mobileLight?: string;
  }
) {
  const primaryLight = logos?.primaryLight || logos?.primary || "/hostvibe/images/logo.png";
  const primaryDark = logos?.primaryDark || "/hostvibe/images/white-logo.webp";
  const mobileLight =
    logos?.mobileLight || logos?.mobile || primaryLight || "/hostvibe/images/mobile-light-mode.png";
  const mobileDark =
    logos?.mobileDark || primaryDark || "/hostvibe/images/mobile-dark-mode.png";

  if (mobile) {
    return theme === "dark" ? mobileDark : mobileLight;
  }

  return theme === "dark" ? primaryDark : primaryLight;
}

function renderRailGroups(
  railKey: string,
  railData: HostvibeMenuRail,
  isActive: boolean
) {
  return (
    <section
      key={railKey}
      className={joinClasses(
        "hvx-rail-panel",
        isActive && "is-active"
      )}
      data-hvx-rail-panel={railKey}
    >
      <div className="hvx-groups">
        {railData.sections.map((section, sectionIndex) => (
          <motion.section
            key={`${railKey}-${sectionIndex}`}
            className="hvx-group"
            data-hvx-group={`hvx-group-${railKey}-${sectionIndex}`}
            custom={sectionIndex}
            initial={false}
            animate={
              isActive
                ? {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.22,
                      delay: Math.min(sectionIndex * 0.035, 0.18),
                    },
                  }
                : {
                    opacity: 0.82,
                    x: -14,
                  }
            }
          >
            {section.heading ? (
              <div className="hvx-group-heading">
                <h6 className="hvx-group-title">{section.heading}</h6>
              </div>
            ) : null}
            <div className="hvx-group-body">
              {section.cards.length ? (
                <ul className="hvx-items-list">
                  {section.cards.map((card, cardIndex) => (
                    <motion.li
                      key={`${railKey}-${section.heading}-${card.title}`}
                      className="hvx-items-list__item"
                      custom={cardIndex}
                      initial={false}
                      animate={
                        isActive
                          ? {
                              opacity: 1,
                              x: 0,
                              transition: {
                                duration: 0.2,
                                delay: Math.min(cardIndex * 0.02, 0.2),
                              },
                            }
                          : {
                              opacity: 0.86,
                              x: -10,
                            }
                      }
                    >
                      <a className="hvx-card-link" href={card.url} data-hvx-item-link>
                        <p className="hvx-card-title">
                          {card.title}
                          {card.badge ? (
                            <span className="hvx-badge">{card.badge}</span>
                          ) : null}
                        </p>
                        {card.desc ? (
                          <p className="hvx-card-desc">{card.desc}</p>
                        ) : null}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="hvx-items-empty" />
              )}
            </div>
          </motion.section>
        ))}
      </div>
    </section>
  );
}

export default function HostvibeHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const primaryNavRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);
  const localeBtnRef = useRef<HTMLButtonElement | null>(null);
  const notifyBtnRef = useRef<HTMLButtonElement | null>(null);
  const accountBtnRef = useRef<HTMLButtonElement | null>(null);
  const localePopoverRef = useRef<HTMLDivElement | null>(null);
  const accountPopoverRef = useRef<HTMLDivElement | null>(null);
  const notifyPopoverRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");
  const [useMobileLogo, setUseMobileLogo] = useState(false);
  const [useMobileMenuIconLogo, setUseMobileMenuIconLogo] = useState(false);
  const [openPopover, setOpenPopover] = useState<PopoverKey>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState(headerMenuData.tabs[0]?.key ?? "domains");
  const [activeRail, setActiveRail] = useState(
    getRailForTab(
      headerMenuData.tabs[0]?.key ?? "domains",
      headerMenuData.tabs[0]?.defaultRail ?? "domains"
    )
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDetailRail, setMobileDetailRail] = useState<string | null>(null);
  const [mobileViewDirection, setMobileViewDirection] = useState<1 | -1>(1);
  const [mobileLocaleOpen, setMobileLocaleOpen] = useState(false);
  const [languagePanelOpen, setLanguagePanelOpen] = useState(false);
  const [currencyPanelOpen, setCurrencyPanelOpen] = useState(false);
  const [languageSearch, setLanguageSearch] = useState("");
  const [currencySearch, setCurrencySearch] = useState("");
  const [notifyFilter, setNotifyFilter] = useState<NotifyFilter>("all");
  const [notifyMenuOpen, setNotifyMenuOpen] = useState(false);
  const [quickPadOpen, setQuickPadOpen] = useState(false);
  const [quickPadSearch, setQuickPadSearch] = useState("");
  const [whoisOverlayOpen, setWhoisOverlayOpen] = useState(false);
  const [whoisQuery, setWhoisQuery] = useState("");
  const [fitHiddenTabKeys, setFitHiddenTabKeys] = useState<string[]>([]);
  const [allTabsFitHidden, setAllTabsFitHidden] = useState(false);
  const [localePopoverStyle, setLocalePopoverStyle] = useState<CSSProperties>({});
  const [notifyPopoverStyle, setNotifyPopoverStyle] = useState<CSSProperties>({});
  const [accountPopoverStyle, setAccountPopoverStyle] = useState<CSSProperties>({});
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const clearTabFitHidden = useCallback((nav: HTMLElement | null, tabs: HTMLButtonElement[]) => {
    tabs.forEach((tab) => tab.classList.remove("is-hidden-by-fit"));
    nav?.classList.remove("hvx-all-hidden");
  }, []);

  const syncTabFit = useCallback(() => {
    const nav = primaryNavRef.current;
    if (!nav) return;

    const tabs = Array.from(nav.querySelectorAll<HTMLButtonElement>(".hvx-tab"));
    if (!tabs.length) {
      setFitHiddenTabKeys([]);
      setAllTabsFitHidden(false);
      return;
    }

    clearTabFitHidden(nav, tabs);

    const nextHidden = new Set<string>();
    let visibleCount = tabs.length;

    for (const key of TAB_HIDE_PRIORITY) {
      if (nav.scrollWidth - nav.clientWidth <= 1 || visibleCount <= 0) {
        break;
      }

      const tabEl = nav.querySelector<HTMLButtonElement>(`.hvx-tab[data-hvx-tab="${key}"]`);
      if (!tabEl || tabEl.classList.contains("is-hidden-by-fit")) {
        continue;
      }

      tabEl.classList.add("is-hidden-by-fit");
      nextHidden.add(key);
      visibleCount -= 1;
    }

    const shouldHideAll = visibleCount <= 0 || nav.scrollWidth - nav.clientWidth > 1;

    setFitHiddenTabKeys(Array.from(nextHidden));
    setAllTabsFitHidden(shouldHideAll);
  }, [clearTabFitHidden]);

  useEffect(() => {
    const syncViewport = () => {
      const width = window.innerWidth;
      const mode = getViewportMode(width);
      const previousMode = viewportMode;

      setViewportMode(mode);
      setUseMobileLogo(width <= MOBILE_LOGO_THRESHOLD);
      setUseMobileMenuIconLogo(width <= MOBILE_MENU_ICON_ONLY_THRESHOLD);
      document.body.classList.toggle("hvx-tablet", mode === "tablet");
      document.body.classList.toggle("hvx-compact", mode === "compact");

      if (previousMode === "desktop" && mode !== "desktop") {
        setMegaOpen(false);
        setMobileOpen(true);
        setOpenPopover(null);
      } else if (previousMode !== "desktop" && mode === "desktop") {
        setMobileOpen(false);
        setMobileDetailRail(null);
        setMobileLocaleOpen(false);
      }

      window.requestAnimationFrame(syncTabFit);
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, [syncTabFit, viewportMode]);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(syncTabFit);
    return () => window.cancelAnimationFrame(rafId);
  }, [viewportMode, useMobileLogo, syncTabFit]);

  useEffect(() => {
    document.body.classList.toggle("hvx-mega-open", megaOpen);
    return () => document.body.classList.remove("hvx-mega-open");
  }, [megaOpen]);

  useEffect(() => {
    document.body.classList.toggle("hvx-mobile-menu-open", mobileOpen);
    return () => document.body.classList.remove("hvx-mobile-menu-open");
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const nearTop = scrollY <= 8;

      if (nearTop) {
        setIsAtTop(true);
        setIsHeaderHidden(false);
        lastScrollYRef.current = scrollY;
        return;
      }

      setIsAtTop(false);

      if (megaOpen || mobileOpen || quickPadOpen || whoisOverlayOpen || openPopover !== null) {
        setIsHeaderHidden(false);
        lastScrollYRef.current = scrollY;
        return;
      }

      const delta = scrollY - lastScrollYRef.current;
      if (delta > 4 && scrollY > 96) {
        setIsHeaderHidden(true);
      } else if (delta < -4) {
        setIsHeaderHidden(false);
      }

      lastScrollYRef.current = scrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaOpen, mobileOpen, quickPadOpen, whoisOverlayOpen, openPopover]);

  useEffect(() => {
    document.body.classList.toggle("hvx-header-hidden", isHeaderHidden);
    return () => document.body.classList.remove("hvx-header-hidden");
  }, [isHeaderHidden]);

  useEffect(() => {
    document.body.classList.toggle("hvx-header-top", isAtTop);
    return () => document.body.classList.remove("hvx-header-top");
  }, [isAtTop]);

  useEffect(() => {
    document.body.classList.toggle("hvx-qp-open", quickPadOpen);
    document.body.classList.toggle("hvx-whois-open", whoisOverlayOpen);
    document.body.classList.toggle("hvx-theme-dark", theme === "dark");
    document.body.classList.toggle("hvx-theme-light", theme === "light");
    return () => {
      document.body.classList.remove("hvx-qp-open");
      document.body.classList.remove("hvx-whois-open");
      document.body.classList.remove("hvx-theme-dark");
      document.body.classList.remove("hvx-theme-light");
    };
  }, [quickPadOpen, whoisOverlayOpen, theme]);

  useEffect(() => {
    const normalizedPath = (pathname || "").replace(/\/+$/, "") || "/";
    const isPricingPage = normalizedPath === "/pricing";
    document.body.classList.toggle("hvx-route-pricing", isPricingPage);

    return () => {
      document.body.classList.remove("hvx-route-pricing");
    };
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setOpenPopover(null);
        setQuickPadOpen(false);
        setWhoisOverlayOpen(false);
        setMobileOpen(false);
        setMobileDetailRail(null);
        setNotifyMenuOpen(false);
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuickPadOpen(true);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (headerRef.current && !headerRef.current.contains(target)) {
        setOpenPopover(null);
        setMegaOpen(false);
        setNotifyMenuOpen(false);
      }

      if (
        quickPadOpen &&
        !document.getElementById("hvxQuickPad")?.contains(target)
      ) {
        setQuickPadOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [quickPadOpen]);

  useEffect(() => {
    if (!openPopover) return;

    const syncPopoverPosition = () => {
      const toolbar = toolbarRef.current;
      if (!toolbar) return;

      const getAnchorStyle = (
        trigger: HTMLButtonElement | null,
        popover: HTMLDivElement | null
      ): CSSProperties | null => {
        if (!trigger || !popover) return null;

        const toolbarRect = toolbar.getBoundingClientRect();
        const triggerRect = trigger.getBoundingClientRect();
        const popoverWidth = popover.offsetWidth || 0;
        if (!popoverWidth) return null;

        const viewportPadding = 8;
        const triggerCenter = triggerRect.left + triggerRect.width / 2;
        let popoverLeft = triggerCenter - popoverWidth / 2;

        popoverLeft = Math.max(
          viewportPadding,
          Math.min(popoverLeft, window.innerWidth - viewportPadding - popoverWidth)
        );

        const right = toolbarRect.right - (popoverLeft + popoverWidth);
        const caretRight = Math.max(
          12,
          Math.min(popoverWidth - 24, popoverLeft + popoverWidth - triggerCenter - 6)
        );

        const nextStyle: CSSProperties = {
          right: `${right}px`,
        };
        (nextStyle as Record<string, string>)["--hvx-popover-caret-right"] = `${caretRight}px`;
        return nextStyle;
      };

      if (openPopover === "locale") {
        const style = getAnchorStyle(localeBtnRef.current, localePopoverRef.current);
        if (style) setLocalePopoverStyle(style);
      } else if (openPopover === "notify") {
        const style = getAnchorStyle(notifyBtnRef.current, notifyPopoverRef.current);
        if (style) setNotifyPopoverStyle(style);
      } else if (openPopover === "account") {
        const style = getAnchorStyle(accountBtnRef.current, accountPopoverRef.current);
        if (style) setAccountPopoverStyle(style);
      }
    };

    const rafId = window.requestAnimationFrame(syncPopoverPosition);
    window.addEventListener("resize", syncPopoverPosition);
    window.addEventListener("scroll", syncPopoverPosition, true);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", syncPopoverPosition);
      window.removeEventListener("scroll", syncPopoverPosition, true);
    };
  }, [openPopover, viewportMode]);

  const effectiveActiveRail = useMemo(() => {
    if (headerMenuData.rails[activeRail]) {
      return activeRail;
    }

    const currentTab = headerMenuData.tabs.find((tab) => tab.key === activeTabKey);
    const fallbackRail = getRailForTab(
      activeTabKey,
      currentTab?.defaultRail ?? Object.keys(headerMenuData.rails)[0] ?? ""
    );

    if (fallbackRail && headerMenuData.rails[fallbackRail]) {
      return fallbackRail;
    }

    return Object.keys(headerMenuData.rails)[0] ?? "domains";
  }, [activeRail, activeTabKey]);

  const notifications = useMemo(() => headerMenuData.notifications ?? [], []);

  const filteredNotifications = useMemo(() => {
    if (notifyFilter === "priority") {
      return notifications.filter((item) => item.priority);
    }

    if (notifyFilter === "flagged") {
      return notifications.filter((item) => item.flagged);
    }

    if (notifyFilter === "unread") {
      return notifications.filter((item) => item.unread);
    }

    return notifications;
  }, [notifications, notifyFilter]);

  const filteredQuickPadSections = useMemo(() => {
    const query = quickPadSearch.trim().toLowerCase();

    if (!query) {
      return quickPadData.sections;
    }

    return quickPadData.sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          `${item.label} ${item.url}`.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [quickPadSearch]);

  const filteredLocales = utilityData.locales.filter((item) =>
    item.label.toLowerCase().includes(languageSearch.trim().toLowerCase())
  );

  const filteredCurrencies = utilityData.currencies.filter((item) =>
    item.label.toLowerCase().includes(currencySearch.trim().toLowerCase())
  );

  const activeMobileRailData = mobileDetailRail
    ? headerMenuData.rails[mobileDetailRail]
    : null;

  const activeLocale = utilityData.locales.find((item) => item.active) ?? utilityData.locales[0];
  const activeCurrency =
    utilityData.currencies.find((item) => item.active) ?? utilityData.currencies[0];
  const normalizedPath = (pathname || "").replace(/\/+$/, "") || "/";
  const isPricingPage = normalizedPath === "/pricing";
  const visualTheme: ThemeMode = isPricingPage ? theme : (isAtTop ? "dark" : theme);

  const logoSrc = getLogoSrc(visualTheme, useMobileLogo, utilityData.logos);
  const mobileLogoSrc = getLogoSrc(visualTheme, useMobileMenuIconLogo, utilityData.logos);
  const logoLightSrc = utilityData.logos?.primaryLight || utilityData.logos?.primary || "/hostvibe/images/logo.png";
  const logoDarkSrc = utilityData.logos?.primaryDark || "/hostvibe/images/white-logo.webp";
  const logoMobileLightSrc = utilityData.logos?.mobileLight || utilityData.logos?.mobile || logoLightSrc;
  const logoMobileDarkSrc = utilityData.logos?.mobileDark || logoDarkSrc;

  const handleLogoLoad = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.dataset.hvxLogoFallbackIndex = "0";
  }, []);

  const handleLogoError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      const image = event.currentTarget;
      const fallbackIndex = Number(image.dataset.hvxLogoFallbackIndex || "0");
      const isMobileContext = image.dataset.hvxLogoContext === "mobile";

      const candidates = isMobileContext
        ? visualTheme === "dark"
          ? [image.dataset.hvxLogoMobileDark, image.dataset.hvxLogoDark, "/hostvibe/images/white-logo.webp"]
          : [image.dataset.hvxLogoMobileLight, image.dataset.hvxLogoLight, "/hostvibe/images/logo.png"]
        : visualTheme === "dark"
          ? [image.dataset.hvxLogoDark, "/hostvibe/images/white-logo.webp"]
          : [image.dataset.hvxLogoLight, "/hostvibe/images/logo.png"];

      const fallbackChain = Array.from(
        new Set(candidates.filter((value): value is string => Boolean(value)))
      );

      const nextSrc = fallbackChain[fallbackIndex + 1];
      if (!nextSrc) {
        image.onerror = null;
        return;
      }

      image.dataset.hvxLogoFallbackIndex = String(fallbackIndex + 1);
      image.src = nextSrc;
    },
    [visualTheme]
  );

  const setTabAndRail = (tabKey: string, defaultRail: string) => {
    setActiveTabKey(tabKey);
    setActiveRail(getRailForTab(tabKey, defaultRail));
    setMobileOpen(false);
    setMegaOpen(true);
  };

  const handlePrimaryTabClick = (tabKey: string, defaultRail: string) => {
    if (megaOpen && activeTabKey === tabKey) {
      setMegaOpen(false);
      return;
    }

    setTabAndRail(tabKey, defaultRail);
  };

  const handleRailClick = (railKey: string) => {
    setActiveRail(railKey);
    const mappedTab = getTabForRail(railKey, headerMenuData.tabs);
    if (mappedTab) {
      setActiveTabKey(mappedTab);
    }
  };

  const mobileDetailTitle = activeMobileRailData?.title ?? "Menu";
  const unreadCount = notifications.filter((item) => item.unread).length;

  const openWhoisOverlay = () => {
    setWhoisOverlayOpen(true);
    setOpenPopover(null);
    setMegaOpen(false);
    setQuickPadOpen(false);
  };

  const runWhoisSearch = useCallback((value: string) => {
    const term = value.trim();
    if (!term) return;
    window.location.assign(`/whois?domain=${encodeURIComponent(term)}`);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="hvx-header"
        id="hvxHeader"
        data-hvx-theme={theme}
        data-hvx-scroll-state={isAtTop ? "top" : "scrolled"}
      >
        <div className="hvx-bar">
          <Link className="hvx-logo" href="/">
            <img
              src={logoSrc}
              data-hvx-logo-context="primary"
              data-hvx-logo-dark={logoDarkSrc}
              data-hvx-logo-light={logoLightSrc}
              data-hvx-logo-mobile-dark={logoMobileDarkSrc}
              data-hvx-logo-mobile-light={logoMobileLightSrc}
              onLoad={handleLogoLoad}
              onError={handleLogoError}
              alt="NameCadre"
            />
          </Link>

          <nav
            ref={primaryNavRef}
            className={joinClasses(
              "hvx-primary-nav",
              allTabsFitHidden && "hvx-all-hidden"
            )}
            aria-label="Primary"
          >
            {headerMenuData.tabs.map((tab) => {
              const hiddenByFit = fitHiddenTabKeys.includes(tab.key);
              return (
                <button
                  key={tab.key}
                  type="button"
                  className={joinClasses(
                    "hvx-tab",
                    hiddenByFit && "is-hidden-by-fit",
                    megaOpen && activeTabKey === tab.key && "is-active"
                  )}
                  data-hvx-tab={tab.key}
                  data-hvx-default-rail={tab.defaultRail}
                  onClick={() => handlePrimaryTabClick(tab.key, tab.defaultRail)}
                >
                  <span dangerouslySetInnerHTML={{ __html: tab.label }} />
                </button>
              );
            })}
          </nav>

          <div ref={toolbarRef} className="hvx-toolbar" id="hvxToolbar">
            <div className="hvx-whois-wrap">
              <form
                className="hvx-whois-search"
                action="/whois"
                role="search"
                aria-label="Whois Search"
                onSubmit={(event) => {
                  event.preventDefault();
                  runWhoisSearch(whoisQuery);
                }}
              >
                <input
                  className="hvx-whois-input"
                  type="text"
                  name="domain"
                  placeholder="Enter domain or IP"
                  autoComplete="off"
                  value={whoisQuery}
                  onChange={(event) => setWhoisQuery(event.target.value)}
                  onFocus={openWhoisOverlay}
                />
                <button
                  className="hvx-whois-btn"
                  type="button"
                  aria-label="Whois Search"
                  onClick={openWhoisOverlay}
                >
                  <i className="far fa-search" aria-hidden="true" />
                  <span className="hvx-whois-btn-label">Whois</span>
                </button>
              </form>
              <button
                className="hvx-whois-close"
                type="button"
                id="hvxWhoisClose"
                aria-label="Close Whois"
                onClick={() => setWhoisOverlayOpen(false)}
              >
                <i className="fas fa-times" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              className="hvx-launchpad"
              id="hvxLaunchpadBtn"
              aria-label="Quick Pad"
              onClick={() => setQuickPadOpen(true)}
            >
              <i className="far fa-compass" />
              <span className="hvx-launchpad-label">Quick Pad</span>
            </button>

            <button
              type="button"
              className="hvx-tool-btn"
              id="hvxThemeToggle"
              aria-pressed={theme === "dark"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            >
              <i className={theme === "dark" ? "far fa-sun" : "far fa-moon"} aria-hidden="true" />
            </button>

            <button
              ref={localeBtnRef}
              type="button"
              className="hvx-tool-btn"
              id="hvxLocaleBtn"
              aria-haspopup="true"
              aria-expanded={openPopover === "locale"}
              aria-controls="hvxLocalePopover"
              title="Language and currency"
              onClick={() =>
                setOpenPopover((current) => (current === "locale" ? null : "locale"))
              }
            >
              <i className="far fa-globe" />
            </button>

            <button
              ref={notifyBtnRef}
              type="button"
              className={joinClasses(
                "hvx-tool-btn hvx-tool-btn--notify",
                unreadCount > 0 && "has-unread"
              )}
              id="hvxNotifyBtn"
              aria-haspopup="true"
              aria-expanded={openPopover === "notify"}
              aria-controls="hvxNotifyPopover"
              title="Notifications"
              onClick={() =>
                setOpenPopover((current) => (current === "notify" ? null : "notify"))
              }
            >
              <i className="far fa-bell" />
              <span className="hvx-notify-dot" aria-hidden="true" />
            </button>

            <a className="hvx-tool-btn" id="hvxCartBtn" href="/cart.php?a=view" title="Cart">
              <i className="far fa-shopping-bag" />
            </a>

            <button
              ref={accountBtnRef}
              type="button"
              className="hvx-tool-btn"
              id="hvxAccountBtn"
              aria-haspopup="true"
              aria-expanded={openPopover === "account"}
              aria-controls="hvxAccountPopover"
              title="Account"
              onClick={() =>
                setOpenPopover((current) => (current === "account" ? null : "account"))
              }
            >
              <i className="far fa-user" />
            </button>

            <div
              ref={localePopoverRef}
              className={joinClasses(
                "hvx-popover hvx-popover--locale",
                openPopover === "locale" && "is-open"
              )}
              id="hvxLocalePopover"
              style={localePopoverStyle}
            >
              <h4>Language and currency</h4>
              <div className="hvx-field">
                <label htmlFor="hvxLanguageTrigger">Language</label>
                <div
                  className={joinClasses(
                    "hvx-language-select",
                    languagePanelOpen && "is-open"
                  )}
                  id="hvxLanguageSelect"
                >
                  <button
                    type="button"
                    id="hvxLanguageTrigger"
                    className="hvx-language-trigger"
                    aria-haspopup="true"
                    aria-expanded={languagePanelOpen}
                    aria-controls="hvxLanguagePanel"
                    onClick={() => setLanguagePanelOpen((current) => !current)}
                  >
                    <span id="hvxLanguageCurrent">{activeLocale?.label ?? "English"}</span>
                    <i className="far fa-chevron-down" />
                  </button>
                  <div className="hvx-language-panel" id="hvxLanguagePanel">
                    <label className="hvx-language-search" htmlFor="hvxLanguageSearch">
                      <i className="far fa-search" />
                      <input
                        type="text"
                        id="hvxLanguageSearch"
                        autoComplete="off"
                        placeholder="Search here"
                        value={languageSearch}
                        onChange={(event) => setLanguageSearch(event.target.value)}
                      />
                    </label>
                    <ul className="hvx-language-options" id="hvxLanguageOptions">
                      {filteredLocales.map((item) => (
                        <li key={item.code}>
                          <button
                            type="button"
                            className={joinClasses(
                              "hvx-language-option",
                              item.active && "is-active"
                            )}
                            data-hvx-language-name={item.label}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <p className="hvx-language-empty" hidden={filteredLocales.length > 0}>
                      No language found.
                    </p>
                  </div>
                </div>
              </div>

              <div className="hvx-field">
                <label htmlFor="hvxCurrencyTrigger">Currency</label>
                <div
                  className={joinClasses(
                    "hvx-currency-select",
                    currencyPanelOpen && "is-open"
                  )}
                  id="hvxCurrencySelect"
                >
                  <button
                    type="button"
                    id="hvxCurrencyTrigger"
                    className="hvx-currency-trigger"
                    aria-haspopup="true"
                    aria-expanded={currencyPanelOpen}
                    aria-controls="hvxCurrencyPanel"
                    onClick={() => setCurrencyPanelOpen((current) => !current)}
                  >
                    <span id="hvxCurrencyCurrent">{activeCurrency?.label ?? "USD"}</span>
                    <i className="far fa-chevron-down" />
                  </button>
                  <div className="hvx-currency-panel" id="hvxCurrencyPanel">
                    <label className="hvx-currency-search" htmlFor="hvxCurrencySearch">
                      <i className="far fa-search" />
                      <input
                        type="text"
                        id="hvxCurrencySearch"
                        autoComplete="off"
                        placeholder="Search here"
                        value={currencySearch}
                        onChange={(event) => setCurrencySearch(event.target.value)}
                      />
                    </label>
                    <ul className="hvx-currency-options" id="hvxCurrencyOptions">
                      {filteredCurrencies.map((item) => (
                        <li key={item.code}>
                          <button
                            type="button"
                            className={joinClasses(
                              "hvx-currency-option",
                              item.active && "is-active"
                            )}
                            data-hvx-currency-name={item.label}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <p className="hvx-currency-empty" hidden={filteredCurrencies.length > 0}>
                      No currency found.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={accountPopoverRef}
              className={joinClasses(
                "hvx-popover hvx-popover--account",
                openPopover === "account" && "is-open"
              )}
              id="hvxAccountPopover"
              style={accountPopoverStyle}
            >
              <div className="hvx-account-head">
                <span className="hvx-account-avatar">
                  <i className="far fa-user" />
                </span>
                <div>
                  <p className="hvx-account-name">Guest</p>
                  <p className="hvx-account-sub">Sign in to continue</p>
                </div>
              </div>
              <ul>
                {utilityData.accountLinks.map((item) => (
                  <li key={item.label}>
                    <a className="hvx-pop-link" href={resolveHref(item.href)}>
                      <span className="hvx-pop-link-main">
                        <i className={item.icon ?? "far fa-chevron-right"} />
                        <span>{item.label}</span>
                      </span>
                      <i className="far fa-chevron-right hvx-pop-link-chevron" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={notifyPopoverRef}
              className={joinClasses(
                "hvx-popover hvx-popover--notify",
                openPopover === "notify" && "is-open"
              )}
              id="hvxNotifyPopover"
              style={notifyPopoverStyle}
            >
              <div className="hvx-notify-wrap">
                <header className="hvx-notify-head">
                  <h4>Notifications</h4>
                  <div className="hvx-notify-head-actions">
                    <button
                      type="button"
                      className="hvx-notify-menu-btn"
                      id="hvxNotifyPanelMenuBtn"
                      aria-haspopup="true"
                      aria-expanded={notifyMenuOpen}
                      aria-controls="hvxNotifyPanelMenu"
                      aria-label="Notification actions"
                      onClick={() => setNotifyMenuOpen((current) => !current)}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </button>
                    <div
                      className={joinClasses("hvx-notify-menu", notifyMenuOpen && "is-open")}
                      id="hvxNotifyPanelMenu"
                    >
                      <button type="button">
                        <i className="far fa-check" />
                        <span>Mark all as read</span>
                      </button>
                      <a href="/notifications">
                        <i className="far fa-bell" />
                        <span>View in Notification Center</span>
                      </a>
                      <button type="button">
                        <i className="far fa-cog" />
                        <span>Preferences</span>
                      </button>
                    </div>
                  </div>
                </header>

                <div className="hvx-notify-filters" id="hvxNotifyFilters">
                  {(["priority", "flagged", "unread"] as NotifyFilter[]).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      className={joinClasses(
                        "hvx-notify-filter",
                        notifyFilter === filter && "is-active"
                      )}
                      data-hvx-notify-filter={filter}
                      onClick={() =>
                        setNotifyFilter((current) => (current === filter ? "all" : filter))
                      }
                    >
                      {filter[0].toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="hvx-notify-section-label" id="hvxNotifySectionLabel">
                  Earlier
                </div>

                <div className="hvx-notify-body">
                  <ul className="hvx-notify-list" id="hvxNotifyList">
                    {filteredNotifications.map((item, notifyIndex) => (
                      <NotifyItem
                        key={item.id}
                        item={item}
                        notifyIndex={notifyIndex}
                      />
                    ))}
                  </ul>
                  <div
                    className="hvx-notify-empty"
                    id="hvxNotifyEmpty"
                    hidden={filteredNotifications.length > 0}
                  >
                    <div className="hvx-notify-empty-icon" aria-hidden="true" />
                    <h5 className="hvx-notify-empty-title">No notifications</h5>
                    <p className="hvx-notify-empty-subtitle">
                      We&apos;ll let you know when we get news for you
                    </p>
                    <a className="hvx-notify-empty-link" href="/notifications">
                      Open Notification Center
                    </a>
                  </div>
                </div>

                <a className="hvx-notify-footer" id="hvxNotifyFooter" href="/notifications">
                  See all communications
                </a>
              </div>
            </div>

            <button
              className="hvx-mobile-toggle"
              id="hvxMobileToggle"
              aria-label="Open menu"
              type="button"
              onClick={() => {
                setMegaOpen(false);
                setOpenPopover(null);
                setMobileOpen(true);
              }}
            >
              <i className="fas fa-bars" />
            </button>
          </div>

          <AnimatePresence>
            {megaOpen ? (
              <motion.section
                key="mega"
                className="hvx-mega is-open"
                id="hvxMega"
                aria-label="Mega menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="hvx-mega-inner">
                  <aside className="hvx-rail">
                    {railBuckets.map((bucket) => (
                      <div key={bucket.id}>
                        {bucket.title ? (
                          <h5 className="hvx-rail-title">{bucket.title}</h5>
                        ) : null}
                        <ul className="hvx-rail-list" id={bucket.id}>
                          {bucket.rails.map((railKey) => {
                            const railData = headerMenuData.rails[railKey];
                            if (!railData) return null;

                            return (
                              <li key={railKey}>
                                <button
                                  type="button"
                                  className={joinClasses(
                                    "hvx-rail-item",
                                    effectiveActiveRail === railKey && "is-active"
                                  )}
                                  data-hvx-rail={railKey}
                                  onClick={() => handleRailClick(railKey)}
                                >
                                  <i className={railData.icon ?? "far fa-circle"} />
                                  {railData.title}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </aside>
                  <div className="hvx-content" id="hvxContent">
                    {Object.entries(headerMenuData.rails).map(([railKey, railData]) => (
                      <div
                        key={railKey}
                        style={{
                          display: effectiveActiveRail === railKey ? "block" : "none",
                        }}
                      >
                        {renderRailGroups(railKey, railData, effectiveActiveRail === railKey)}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {megaOpen ? (
          <motion.div
            className="hvx-mega-backdrop"
            id="hvxMegaBackdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMegaOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.aside
            className={joinClasses(
              "hvx-mobile-menu",
              mobileDetailRail && "is-detail",
              mobileLocaleOpen && "is-locale-open"
            )}
            id="hvxMobileMenu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
          >
            <AnimatePresence initial={false} mode="wait">
              {mobileDetailRail ? (
                <motion.section
                  key={`mobile-detail-${mobileDetailRail}`}
                  className="hvx-mobile-menu-view hvx-mobile-menu-detail"
                  initial={{ opacity: 0, x: mobileViewDirection === 1 ? -36 : 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mobileViewDirection === 1 ? 36 : -36 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  <div className="hvx-mobile-menu-head">
                    <div className="hvx-mobile-detail-title">
                      <button
                        type="button"
                        className="hvx-mobile-menu-back"
                        id="hvxMobileMenuBack"
                        aria-label="Back"
                        onClick={() => {
                          setMobileViewDirection(-1);
                          setMobileDetailRail(null);
                        }}
                      >
                        <i className="fas fa-arrow-left" />
                      </button>
                      <span id="hvxMobileMenuTitle">{mobileDetailTitle}</span>
                    </div>
                    <button
                      type="button"
                      className="hvx-mobile-menu-close"
                      data-hvx-mobile-close
                      aria-label="Close menu"
                      onClick={() => setMobileOpen(false)}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                  <div
                    className="hvx-mobile-menu-body hvx-mobile-detail-content"
                    id="hvxMobileMenuDetailContent"
                  >
                    {activeMobileRailData
                      ? renderRailGroups(mobileDetailRail ?? "", activeMobileRailData, true)
                      : null}
                  </div>
                </motion.section>
              ) : (
                <motion.section
                  key="mobile-list"
                  className="hvx-mobile-menu-view hvx-mobile-menu-list"
                  initial={{ opacity: 0, x: mobileViewDirection === 1 ? -36 : 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mobileViewDirection === 1 ? 36 : -36 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  <div className="hvx-mobile-menu-head">
                    <Link className="hvx-mobile-menu-brand" href="/">
                      <img
                        src={mobileLogoSrc}
                        data-hvx-logo-context="mobile"
                        data-hvx-logo-dark={logoDarkSrc}
                        data-hvx-logo-light={logoLightSrc}
                        data-hvx-logo-mobile-dark={logoMobileDarkSrc}
                        data-hvx-logo-mobile-light={logoMobileLightSrc}
                        onLoad={handleLogoLoad}
                        onError={handleLogoError}
                        alt="NameCadre"
                      />
                    </Link>
                    <div className="hvx-mobile-menu-head-right">
                      <button
                        type="button"
                        className="hvx-mobile-menu-tool-btn"
                        id="hvxLocaleBtnMobile"
                        aria-label="Language and currency"
                        onClick={() => setMobileLocaleOpen((current) => !current)}
                      >
                        <i className="far fa-globe" />
                      </button>
                      <button
                        type="button"
                        className="hvx-mobile-menu-tool-btn"
                        id="hvxThemeToggleMobileIcon"
                        aria-label="Switch theme"
                        onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
                      >
                        <i className={theme === "dark" ? "far fa-sun" : "far fa-moon"} />
                      </button>
                      <button
                        type="button"
                        className="hvx-mobile-menu-close"
                        data-hvx-mobile-close
                        aria-label="Close menu"
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>

                  <div className="hvx-mobile-locale-panel" id="hvxMobileLocalePanel">
                    <div className="hvx-mobile-locale-group">
                      <p className="hvx-mobile-locale-label">Language</p>
                      <div className="hvx-mobile-locale-links">
                        {utilityData.locales.map((item) => (
                          <button
                            key={item.code}
                            type="button"
                            className={joinClasses(
                              "hvx-mobile-locale-link",
                              item.active && "is-active"
                            )}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="hvx-mobile-locale-group">
                      <p className="hvx-mobile-locale-label">Currency</p>
                      <div className="hvx-mobile-locale-links">
                        {utilityData.currencies.map((item) => (
                          <button
                            key={item.code}
                            type="button"
                            className={joinClasses(
                              "hvx-mobile-locale-link",
                              item.active && "is-active"
                            )}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hvx-mobile-menu-body">
                    <div className="hvx-mobile-block">
                      <a className="hvx-mobile-link hvx-mobile-list-item" href="/login" style={staggerStyle(0)}>
                        <span className="hvx-mobile-link-left">
                          <i className="far fa-user" />
                          <span>Login</span>
                        </span>
                        <i className="far fa-chevron-right" />
                      </a>
                    </div>

                    {railBuckets.map((bucket, bucketIndex) => (
                      <div key={bucket.id} className="hvx-mobile-block">
                        <h5 className="hvx-mobile-title">
                          {bucket.title ?? "Explore NameCadre"}
                        </h5>
                        {bucket.rails.map((railKey, index) => {
                          const railData = headerMenuData.rails[railKey];
                          if (!railData) return null;

                          return (
                            <button
                              key={railKey}
                              type="button"
                              className="hvx-mobile-link hvx-mobile-list-item"
                              data-hvx-mobile-rail={railKey}
                              data-hvx-mobile-title={railData.title}
                              style={staggerStyle(bucketIndex * 10 + index + 1)}
                              onClick={() => {
                                setMobileViewDirection(1);
                                setMobileDetailRail(railKey);
                              }}
                            >
                              <span className="hvx-mobile-link-left">
                                <i className={railData.icon ?? "far fa-circle"} />
                                <span>{railData.title}</span>
                              </span>
                              <i className="far fa-chevron-right" />
                            </button>
                          );
                        })}
                      </div>
                    ))}

                    <div className="hvx-mobile-block hvx-mobile-locale-block">
                      <h5 className="hvx-mobile-title">Language and Currency</h5>
                      <button type="button" className="hvx-mobile-link">
                        <span className="hvx-mobile-link-left">
                          <i className="far fa-globe" />
                          <span>{activeLocale?.label ?? "English"}</span>
                        </span>
                        <i className="far fa-chevron-right" />
                      </button>
                      <button type="button" className="hvx-mobile-link">
                        <span className="hvx-mobile-link-left">
                          <i className="far fa-dollar-sign" />
                          <span>{activeCurrency?.label ?? "USD"}</span>
                        </span>
                        <i className="far fa-chevron-right" />
                      </button>
                    </div>

                    <div className="hvx-mobile-block hvx-mobile-appearance-block">
                      <h5 className="hvx-mobile-title">Appearance</h5>
                      <button
                        type="button"
                        className="hvx-mobile-theme-btn"
                        id="hvxThemeToggleMobile"
                        onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
                      >
                        <i className={theme === "dark" ? "far fa-sun" : "far fa-moon"} />
                        <span>
                          {utilityData.mobileMenu?.appearance?.themeToggleLabel ||
                            (theme === "dark" ? "Switch to light mode" : "Switch to dark mode")}
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <HostvibeSearchPopup
        open={whoisOverlayOpen}
        query={whoisQuery}
        placeholder="Enter domain or IP (e.g. example.com)"
        trendingSearches={[...whoisSuggestions]}
        recentSearches={[...whoisRecent]}
        onClose={() => setWhoisOverlayOpen(false)}
        onQueryChange={setWhoisQuery}
        onSearch={runWhoisSearch}
      />

      <AnimatePresence>
        {quickPadOpen ? (
          <motion.div
            className="hvx-qp-overlay"
            id="hvxQuickPad"
            aria-hidden="false"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <section className="hvx-qp-window" role="dialog" aria-modal="true" aria-labelledby="hvxQuickPadTitle">
              <header className="hvx-qp-search">
                <i className="far fa-search" />
                <input
                  type="text"
                  id="hvxQuickPadSearch"
                  placeholder="Find services, domains, invoices..."
                  autoComplete="off"
                  value={quickPadSearch}
                  onChange={(event) => setQuickPadSearch(event.target.value)}
                />
                <div className="hvx-qp-kbd">
                  <span>/</span>
                  <span>Ctrl+K</span>
                </div>
                <button
                  type="button"
                  className="hvx-qp-close"
                  id="hvxQuickPadClose"
                  aria-label="Close Quick Pad"
                  onClick={() => setQuickPadOpen(false)}
                >
                  <i className="fas fa-times" />
                </button>
              </header>
              <div className="hvx-qp-profile">
                <div className="hvx-qp-profile-main">
                  <div className="hvx-qp-avatar">
                    <i className="far fa-user" />
                  </div>
                  <div>
                    <p className="hvx-qp-welcome" id="hvxQuickPadTitle">
                      Hello, Guest!
                    </p>
                    <p className="hvx-qp-sub">Manage your account and services instantly</p>
                  </div>
                </div>
                <div className="hvx-qp-balance">
                  <p>Credit Balance</p>
                  <strong>---</strong>
                </div>
              </div>
              <div className="hvx-qp-content" id="hvxQuickPadContent">
                {filteredQuickPadSections.map((section) => (
                  <section key={section.heading} className="hvx-qp-section">
                    <h5>{section.heading}</h5>
                    <div className="hvx-qp-grid">
                      {section.items.map((item) => (
                        <a key={item.label} data-hvx-qp-item href={item.url}>
                          <i className={item.icon ?? "fas fa-link"} />
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NotifyItem({
  item,
  notifyIndex,
}: {
  item: HostvibeHeaderNotification;
  notifyIndex: number;
}) {
  return (
    <li
      className={joinClasses(
        "hvx-notify-item",
        item.priority && "is-priority",
        item.flagged && "is-flagged",
        item.unread && "is-unread"
      )}
      data-hvx-notify-id={item.id || `notify-item-${notifyIndex}`}
      data-priority={item.priority ? "1" : "0"}
      data-flagged={item.flagged ? "1" : "0"}
      data-unread={item.unread ? "1" : "0"}
    >
      <div className="hvx-notify-row">
        <div
          className="hvx-notify-avatar"
          style={item.avatarBg ? { background: item.avatarBg } : undefined}
        >
          <i className={item.avatarIcon ?? "far fa-bell"} aria-hidden="true" />
          <span className="hvx-notify-flag-badge" aria-hidden="true">
            <i className="far fa-flag" />
          </span>
        </div>
        <a className="hvx-notify-main" href={item.url}>
          <p className="hvx-notify-title">{item.title}</p>
          {item.desc ? <p className="hvx-notify-desc">{item.desc}</p> : null}
          {item.timeLabel ? <p className="hvx-notify-time">{item.timeLabel}</p> : null}
          {item.extraCount ? (
            <span className="hvx-notify-more">+ {item.extraCount} More events</span>
          ) : null}
        </a>
        <div className="hvx-notify-item-actions">
          <button
            type="button"
            className="hvx-notify-menu-btn hvx-notify-item-menu-btn"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Notification item actions"
          >
            <i className="fas fa-ellipsis-v" />
          </button>
          <div className="hvx-notify-menu hvx-notify-item-menu">
            <button type="button" data-hvx-notify-item-action="toggle-unread">
              <i className="far fa-eye-slash" />
              <span data-hvx-notify-toggle-unread-label>Mark as unread</span>
            </button>
            <button type="button" data-hvx-notify-item-action="toggle-flag">
              <i className="far fa-flag" />
              <span data-hvx-notify-toggle-flag-label>Flag</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function staggerStyle(index: number): CSSProperties {
  return {
    ["--hvx-stagger" as string]: index,
  };
}

import type { ComponentType } from "react";
import { getHostvibePricingTabs } from "@/lib/hostvibe/data";
import components_hostvibe_header_header_tsx from "@/components/hostvibe/header/header.tsx";
import components_hostvibe_header_search_popup_tsx from "@/components/hostvibe/header/search-popup.tsx";
import components_hostvibe_hero_new_hero_section_tsx from "@/components/hostvibe/hero/new-hero-section.tsx";
import components_hostvibe_homepage_hosting_carousel_tsx from "@/components/hostvibe/homepage/hosting-carousel.tsx";
import components_hostvibe_homepage_modern_homepage_tsx from "@/components/hostvibe/homepage/modern-homepage.tsx";
import components_hostvibe_homepage_sections_tsx from "@/components/hostvibe/homepage/sections.tsx";
import components_hostvibe_includes_alert_tsx from "@/components/hostvibe/includes/alert.tsx";
import components_hostvibe_includes_breadcrumb_tsx from "@/components/hostvibe/includes/breadcrumb.tsx";
import components_hostvibe_includes_captcha_tsx from "@/components/hostvibe/includes/captcha.tsx";
import components_hostvibe_includes_clientads_banner_tsx from "@/components/hostvibe/includes/clientads-banner.tsx";
import components_hostvibe_includes_common_loader_tsx from "@/components/hostvibe/includes/common/loader.tsx";
import components_hostvibe_includes_common_svg_icon_tsx from "@/components/hostvibe/includes/common/svg-icon.tsx";
import components_hostvibe_includes_flashmessage_tsx from "@/components/hostvibe/includes/flashmessage.tsx";
import components_hostvibe_includes_footer_inline_js_tsx from "@/components/hostvibe/includes/footer-inline-js.tsx";
import components_hostvibe_includes_footer_scripts_tsx from "@/components/hostvibe/includes/footer-scripts.tsx";
import components_hostvibe_includes_fullpage_overlay_tsx from "@/components/hostvibe/includes/fullpage-overlay.tsx";
import components_hostvibe_includes_generate_password_form_tsx from "@/components/hostvibe/includes/generate-password-form.tsx";
import components_hostvibe_includes_head_tsx from "@/components/hostvibe/includes/head.tsx";
import components_hostvibe_includes_linkedaccounts_tsx from "@/components/hostvibe/includes/linkedaccounts.tsx";
import components_hostvibe_includes_modal_ajax_tsx from "@/components/hostvibe/includes/modal-ajax.tsx";
import components_hostvibe_includes_modal_choose_language_tsx from "@/components/hostvibe/includes/modal-choose-language.tsx";
import components_hostvibe_includes_pwstrength_tsx from "@/components/hostvibe/includes/pwstrength.tsx";
import components_hostvibe_includes_redcheap_pwstrength_tsx from "@/components/hostvibe/includes/redcheap-pwstrength.tsx";
import components_hostvibe_includes_redcheap_seo_tsx from "@/components/hostvibe/includes/redcheap-seo.tsx";
import components_hostvibe_includes_sidebar_tsx from "@/components/hostvibe/includes/sidebar.tsx";
import components_hostvibe_includes_tablelist_tsx from "@/components/hostvibe/includes/tablelist.tsx";
import components_hostvibe_includes_verifyemail_tsx from "@/components/hostvibe/includes/verifyemail.tsx";
import components_hostvibe_pricing_pricing_section_tsx from "@/components/hostvibe/pricing/pricing-section.tsx";
import components_hostvibe_pricing_pricing_service_selector_tsx from "@/components/hostvibe/pricing/pricing-service-selector.tsx";
import components_hostvibe_section_components_common_banner_three_tsx from "@/components/hostvibe/section-components/common/banner-three.tsx";
import components_hostvibe_section_components_common_banner_two_tsx from "@/components/hostvibe/section-components/common/banner-two.tsx";
import components_hostvibe_section_components_common_domain_price_tsx from "@/components/hostvibe/section-components/common/domain-price.tsx";
import components_hostvibe_section_components_common_domain_search_two_tsx from "@/components/hostvibe/section-components/common/domain-search-two.tsx";
import components_hostvibe_section_components_common_domain_transfer_two_tsx from "@/components/hostvibe/section-components/common/domain-transfer-two.tsx";
import components_hostvibe_section_components_common_domain_transfer_tsx from "@/components/hostvibe/section-components/common/domain-transfer.tsx";
import components_hostvibe_section_components_common_features_three_tsx from "@/components/hostvibe/section-components/common/features-three.tsx";
import components_hostvibe_section_components_common_features_two_tsx from "@/components/hostvibe/section-components/common/features-two.tsx";
import components_hostvibe_section_components_common_features_tsx from "@/components/hostvibe/section-components/common/features.tsx";
import components_hostvibe_section_components_common_hosting_top_tsx from "@/components/hostvibe/section-components/common/hosting-top.tsx";
import components_hostvibe_section_components_common_hosting_two_tsx from "@/components/hostvibe/section-components/common/hosting-two.tsx";
import components_hostvibe_section_components_common_pricing_two_tsx from "@/components/hostvibe/section-components/common/pricing-two.tsx";
import components_hostvibe_section_components_common_pricing_tsx from "@/components/hostvibe/section-components/common/pricing.tsx";
import components_hostvibe_section_components_common_support_three_tsx from "@/components/hostvibe/section-components/common/support-three.tsx";
import components_hostvibe_section_components_common_testimonial_tsx from "@/components/hostvibe/section-components/common/testimonial.tsx";
import components_hostvibe_shared_footer_tsx from "@/components/hostvibe/shared/footer.tsx";
import components_hostvibe_web_hosting_page_tsx from "@/components/hostvibe/web-hosting/page.tsx";

export type HostvibePreviewRegistryEntry = {
  componentPath: string;
  Component: ComponentType;
};

function PreviewPricingServiceSelector() {
  const tabs = getHostvibePricingTabs();
  return <components_hostvibe_pricing_pricing_service_selector_tsx tabs={tabs} />;
}

function PreviewHeaderSearchPopup() {
  return (
    <components_hostvibe_header_search_popup_tsx
      open={true}
      query=""
      trendingSearches={["vps hosting", "domain transfer"]}
      recentSearches={["namecadre.com"]}
      onClose={() => {}}
      onSearch={() => {}}
      onQueryChange={() => {}}
    />
  );
}

const PREVIEW_OVERRIDES: Record<string, ComponentType> = {
  "components/hostvibe/pricing/pricing-service-selector.tsx": PreviewPricingServiceSelector,
  "components/hostvibe/header/search-popup.tsx": PreviewHeaderSearchPopup,
};

export const HOSTVIBE_LIVE_PREVIEW_REGISTRY: HostvibePreviewRegistryEntry[] = [
  { componentPath: "components/hostvibe/header/header.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/header/header.tsx"] ?? components_hostvibe_header_header_tsx },
  { componentPath: "components/hostvibe/header/search-popup.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/header/search-popup.tsx"] ?? components_hostvibe_header_search_popup_tsx },
  { componentPath: "components/hostvibe/hero/new-hero-section.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/hero/new-hero-section.tsx"] ?? components_hostvibe_hero_new_hero_section_tsx },
  { componentPath: "components/hostvibe/homepage/hosting-carousel.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/homepage/hosting-carousel.tsx"] ?? components_hostvibe_homepage_hosting_carousel_tsx },
  { componentPath: "components/hostvibe/homepage/modern-homepage.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/homepage/modern-homepage.tsx"] ?? components_hostvibe_homepage_modern_homepage_tsx },
  { componentPath: "components/hostvibe/homepage/sections.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/homepage/sections.tsx"] ?? components_hostvibe_homepage_sections_tsx },
  { componentPath: "components/hostvibe/includes/alert.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/alert.tsx"] ?? components_hostvibe_includes_alert_tsx },
  { componentPath: "components/hostvibe/includes/breadcrumb.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/breadcrumb.tsx"] ?? components_hostvibe_includes_breadcrumb_tsx },
  { componentPath: "components/hostvibe/includes/captcha.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/captcha.tsx"] ?? components_hostvibe_includes_captcha_tsx },
  { componentPath: "components/hostvibe/includes/clientads-banner.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/clientads-banner.tsx"] ?? components_hostvibe_includes_clientads_banner_tsx },
  { componentPath: "components/hostvibe/includes/common/loader.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/common/loader.tsx"] ?? components_hostvibe_includes_common_loader_tsx },
  { componentPath: "components/hostvibe/includes/common/svg-icon.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/common/svg-icon.tsx"] ?? components_hostvibe_includes_common_svg_icon_tsx },
  { componentPath: "components/hostvibe/includes/flashmessage.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/flashmessage.tsx"] ?? components_hostvibe_includes_flashmessage_tsx },
  { componentPath: "components/hostvibe/includes/footer-inline-js.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/footer-inline-js.tsx"] ?? components_hostvibe_includes_footer_inline_js_tsx },
  { componentPath: "components/hostvibe/includes/footer-scripts.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/footer-scripts.tsx"] ?? components_hostvibe_includes_footer_scripts_tsx },
  { componentPath: "components/hostvibe/includes/fullpage-overlay.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/fullpage-overlay.tsx"] ?? components_hostvibe_includes_fullpage_overlay_tsx },
  { componentPath: "components/hostvibe/includes/generate-password-form.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/generate-password-form.tsx"] ?? components_hostvibe_includes_generate_password_form_tsx },
  { componentPath: "components/hostvibe/includes/head.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/head.tsx"] ?? components_hostvibe_includes_head_tsx },
  { componentPath: "components/hostvibe/includes/linkedaccounts.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/linkedaccounts.tsx"] ?? components_hostvibe_includes_linkedaccounts_tsx },
  { componentPath: "components/hostvibe/includes/modal-ajax.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/modal-ajax.tsx"] ?? components_hostvibe_includes_modal_ajax_tsx },
  { componentPath: "components/hostvibe/includes/modal-choose-language.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/modal-choose-language.tsx"] ?? components_hostvibe_includes_modal_choose_language_tsx },
  { componentPath: "components/hostvibe/includes/pwstrength.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/pwstrength.tsx"] ?? components_hostvibe_includes_pwstrength_tsx },
  { componentPath: "components/hostvibe/includes/redcheap-pwstrength.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/redcheap-pwstrength.tsx"] ?? components_hostvibe_includes_redcheap_pwstrength_tsx },
  { componentPath: "components/hostvibe/includes/redcheap-seo.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/redcheap-seo.tsx"] ?? components_hostvibe_includes_redcheap_seo_tsx },
  { componentPath: "components/hostvibe/includes/sidebar.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/sidebar.tsx"] ?? components_hostvibe_includes_sidebar_tsx },
  { componentPath: "components/hostvibe/includes/tablelist.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/tablelist.tsx"] ?? components_hostvibe_includes_tablelist_tsx },
  { componentPath: "components/hostvibe/includes/verifyemail.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/includes/verifyemail.tsx"] ?? components_hostvibe_includes_verifyemail_tsx },
  { componentPath: "components/hostvibe/pricing/pricing-section.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/pricing/pricing-section.tsx"] ?? components_hostvibe_pricing_pricing_section_tsx },
  { componentPath: "components/hostvibe/pricing/pricing-service-selector.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/pricing/pricing-service-selector.tsx"] ?? components_hostvibe_pricing_pricing_service_selector_tsx },
  { componentPath: "components/hostvibe/section-components/common/banner-three.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/banner-three.tsx"] ?? components_hostvibe_section_components_common_banner_three_tsx },
  { componentPath: "components/hostvibe/section-components/common/banner-two.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/banner-two.tsx"] ?? components_hostvibe_section_components_common_banner_two_tsx },
  { componentPath: "components/hostvibe/section-components/common/domain-price.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/domain-price.tsx"] ?? components_hostvibe_section_components_common_domain_price_tsx },
  { componentPath: "components/hostvibe/section-components/common/domain-search-two.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/domain-search-two.tsx"] ?? components_hostvibe_section_components_common_domain_search_two_tsx },
  { componentPath: "components/hostvibe/section-components/common/domain-transfer-two.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/domain-transfer-two.tsx"] ?? components_hostvibe_section_components_common_domain_transfer_two_tsx },
  { componentPath: "components/hostvibe/section-components/common/domain-transfer.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/domain-transfer.tsx"] ?? components_hostvibe_section_components_common_domain_transfer_tsx },
  { componentPath: "components/hostvibe/section-components/common/features-three.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/features-three.tsx"] ?? components_hostvibe_section_components_common_features_three_tsx },
  { componentPath: "components/hostvibe/section-components/common/features-two.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/features-two.tsx"] ?? components_hostvibe_section_components_common_features_two_tsx },
  { componentPath: "components/hostvibe/section-components/common/features.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/features.tsx"] ?? components_hostvibe_section_components_common_features_tsx },
  { componentPath: "components/hostvibe/section-components/common/hosting-top.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/hosting-top.tsx"] ?? components_hostvibe_section_components_common_hosting_top_tsx },
  { componentPath: "components/hostvibe/section-components/common/hosting-two.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/hosting-two.tsx"] ?? components_hostvibe_section_components_common_hosting_two_tsx },
  { componentPath: "components/hostvibe/section-components/common/pricing-two.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/pricing-two.tsx"] ?? components_hostvibe_section_components_common_pricing_two_tsx },
  { componentPath: "components/hostvibe/section-components/common/pricing.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/pricing.tsx"] ?? components_hostvibe_section_components_common_pricing_tsx },
  { componentPath: "components/hostvibe/section-components/common/support-three.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/support-three.tsx"] ?? components_hostvibe_section_components_common_support_three_tsx },
  { componentPath: "components/hostvibe/section-components/common/testimonial.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/section-components/common/testimonial.tsx"] ?? components_hostvibe_section_components_common_testimonial_tsx },
  { componentPath: "components/hostvibe/shared/footer.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/shared/footer.tsx"] ?? components_hostvibe_shared_footer_tsx },
  { componentPath: "components/hostvibe/web-hosting/page.tsx", Component: PREVIEW_OVERRIDES["components/hostvibe/web-hosting/page.tsx"] ?? components_hostvibe_web_hosting_page_tsx },
];

export const HOSTVIBE_LIVE_PREVIEW_COMPONENTS = Object.fromEntries(
  HOSTVIBE_LIVE_PREVIEW_REGISTRY.map(({ componentPath, Component }) => [
    componentPath,
    Component,
  ])
) as Record<string, ComponentType>;

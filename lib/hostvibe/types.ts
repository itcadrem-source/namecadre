export type HostvibeLinkType = "url" | "route";

export type HostvibeLink = {
  type?: HostvibeLinkType;
  value: string;
};

export type HostvibeMenuCard = {
  title: string;
  desc: string;
  url: string;
  badge?: string;
  authAwareClientDomains?: boolean;
};

export type HostvibeMenuRail = {
  title: string;
  icon?: string;
  sections: Array<{
    heading: string;
    cards: HostvibeMenuCard[];
  }>;
};

export type HostvibeHeaderTab = {
  key: string;
  label: string;
  defaultRail: string;
};

export type HostvibeHeaderNotification = {
  id: string;
  title: string;
  desc: string;
  url: string;
  timeLabel?: string;
  priority?: boolean;
  flagged?: boolean;
  unread?: boolean;
  avatarIcon?: string;
  avatarBg?: string;
  extraCount?: number;
};

export type HostvibeHeaderData = {
  tabs: HostvibeHeaderTab[];
  railGroups: Record<string, string[]>;
  rails: Record<string, HostvibeMenuRail>;
  notifications?: HostvibeHeaderNotification[];
};

export type HostvibeCommonSectionData = {
  testimonial: {
    title: string;
    description: string;
    items: Array<{
      ratingImage: string;
      quote: string;
      name: string;
      role: string;
    }>;
  };
  support: {
    image: string;
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  faq: {
    title: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
};

export type HostvibeHomepageData = HostvibeCommonSectionData & Record<string, unknown>;

export type HostvibeFooterData = {
  top: {
    logo: {
      src: string;
      alt: string;
      href: HostvibeLink;
    };
    description: string;
    social: {
      title: string;
      items: Array<{
        label: string;
        icon: string;
        href: HostvibeLink;
      }>;
    };
    columns: Array<{
      colClass: string;
      mobile360Class: string;
      title: string;
      links: Array<{
        label: string;
        href: HostvibeLink;
      }>;
    }>;
    copyright: string;
  };
  payment: {
    title: string;
    icons: Array<{
      src: string;
      alt: string;
    }>;
  };
  liveChat: {
    label: string;
    href: HostvibeLink;
  };
  bottom: {
    links: Array<{
      label: string;
      href: HostvibeLink;
    }>;
  };
};

export type HostvibeHeaderUtilityChoice = {
  code: string;
  label: string;
  active?: boolean;
};

export type HostvibeHeaderUtilityLink = {
  label: string;
  href: HostvibeLink;
  icon?: string;
  active?: boolean;
};

export type HostvibeHeaderUtilityData = {
  currencies: HostvibeHeaderUtilityChoice[];
  locales: HostvibeHeaderUtilityChoice[];
  accountLinks: HostvibeHeaderUtilityLink[];
  logos?: {
    primary?: string;
    primaryDark?: string;
    primaryLight?: string;
    mobile?: string;
    mobileDark?: string;
    mobileLight?: string;
  };
  mobileMenu?: {
    railLinks?: Array<{ key: string; title: string; label?: string }>;
    appearance?: {
      themeToggleLabel?: string;
    };
  };
};

export type HostvibeQuickPadData = {
  sections: Array<{
    heading: string;
    items: Array<{
      label: string;
      icon?: string;
      url: string;
      loginRequired?: boolean;
    }>;
  }>;
};

export type HostvibePageDataMap = Record<string, Record<string, unknown>>;

export type HostvibeLiveHeaderData = HostvibeHeaderData & {
  extractedAt?: string;
  sourceUrl?: string;
};

export type HostvibeLiveQuickPadData = HostvibeQuickPadData & {
  extractedAt?: string;
  sourceUrl?: string;
};

export type HostvibeLiveUtilityData = HostvibeHeaderUtilityData & {
  extractedAt?: string;
  sourceUrl?: string;
};

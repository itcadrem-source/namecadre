import Link from "next/link";
import type { ReactNode } from "react";

export type HostvibeClientAdsBanner = {
  id?: number | string;
  type?: "html" | "hero";
  bodyHtml?: ReactNode;
  badgeText?: ReactNode;
  title?: ReactNode;
  ctaText?: ReactNode;
  trackingUrl?: string;
  openInNewTab?: boolean;
  imageUrl?: string;
};

export type HostvibeIncludeClientadsBannerProps = {
  loggedIn?: boolean;
  banner?: HostvibeClientAdsBanner | null;
  className?: string;
};

export default function HostvibeIncludeClientadsBanner({ loggedIn, banner, className }: HostvibeIncludeClientadsBannerProps) {
  if (!loggedIn || !banner) return null;

  if (banner.type === "html" && banner.bodyHtml) {
    return (
      <div className={["mb-4", className || ""].filter(Boolean).join(" ")} data-clientads-id={banner.id}>
        {banner.bodyHtml}
      </div>
    );
  }

  return (
    <div className={["clientads-hero-wrap mb-4", className || ""].filter(Boolean).join(" ")} data-clientads-id={banner.id}>
      <div className="clientads-hero-card container-fluid">
        <div className="row g-0 align-items-stretch h-100">
          <div className="col-lg-7">
            <div className="clientads-hero-left h-100 d-flex flex-column justify-content-center">
              {banner.badgeText ? <span className="clientads-badge">{banner.badgeText}</span> : null}
              {banner.title ? <h2 className="clientads-title">{banner.title}</h2> : null}
              {banner.ctaText && banner.trackingUrl ? (
                <Link href={banner.trackingUrl} className="clientads-cta btn btn-light" target={banner.openInNewTab ? "_blank" : undefined} rel={banner.openInNewTab ? "noopener noreferrer" : undefined}>
                  {banner.ctaText}
                </Link>
              ) : null}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="clientads-hero-right h-100">
              {banner.imageUrl ? <img src={banner.imageUrl} alt={typeof banner.title === "string" ? banner.title : "Advertisement"} loading="lazy" /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

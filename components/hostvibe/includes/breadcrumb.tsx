import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export type HostvibeBreadcrumbItem = {
  label: ReactNode;
  link?: string;
};

export type HostvibeIncludeBreadcrumbProps = {
  title?: ReactNode;
  pageTitle?: ReactNode;
  items?: HostvibeBreadcrumbItem[];
  fallbackHomeHref?: string;
  fallbackHomeLabel?: ReactNode;
  className?: string;
};

export default function HostvibeIncludeBreadcrumb({
  title,
  pageTitle,
  items = [],
  fallbackHomeHref = "/index.php",
  fallbackHomeLabel = "Portal Home",
  className,
}: HostvibeIncludeBreadcrumbProps) {
  const breadcrumbTitle = pageTitle ?? title ?? (typeof items[items.length - 1]?.label === "string" ? items[items.length - 1]?.label : "");

  if (!items.length && !breadcrumbTitle) return null;

  return (
    <div className={["breadcrumb__area", className || ""].filter(Boolean).join(" ")}>
      <div className="container">
        <h1 className="main-header-title">{pageTitle ?? breadcrumbTitle}</h1>
        <div className="main-header-bottom">
          <ol className="breadcrumb">
            {items.length
              ? items.map((item, index) => {
                  const isLast = index === items.length - 1;
                  return (
                    <Fragment key={`crumb-${index}`}>
                      <li className={isLast ? "active" : undefined}>
                        {!isLast && item.link ? <Link href={item.link}>{item.label}</Link> : <strong>{item.label}</strong>}
                      </li>
                      {!isLast ? <li className="breadcrumb-separator px-1">/</li> : null}
                    </Fragment>
                  );
                })
              : (
                <>
                  <li><Link href={fallbackHomeHref}>{fallbackHomeLabel}</Link></li>
                  <li className="breadcrumb-separator px-1">/</li>
                  <li className="active"><strong>{breadcrumbTitle}</strong></li>
                </>
              )}
          </ol>
        </div>
      </div>
    </div>
  );
}

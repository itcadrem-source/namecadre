import type { ReactNode } from "react";

export type HostvibeHeadMeta = {
  name?: string;
  property?: string;
  content: string;
};

export type HostvibeIncludeHeadProps = {
  faviconHref?: string;
  stylesheetHrefs?: string[];
  scriptSrcs?: string[];
  inlineConfig?: Record<string, string>;
  metaTags?: HostvibeHeadMeta[];
  extra?: ReactNode;
};

export default function HostvibeHeadAssets({
  faviconHref = "/hostvibe/images/favicon.png",
  stylesheetHrefs = [],
  scriptSrcs = [],
  inlineConfig,
  metaTags = [],
  extra,
}: HostvibeIncludeHeadProps) {
  return (
    <>
      <link rel="icon" href={faviconHref} type="image/png" sizes="16x16" />
      {stylesheetHrefs.map((href) => <link key={href} href={href} rel="stylesheet" />)}
      {metaTags.map((meta, index) => (
        <meta key={`${meta.name ?? meta.property ?? "meta"}-${index}`} name={meta.name} property={meta.property} content={meta.content} />
      ))}
      {inlineConfig ? (
        <script
          dangerouslySetInnerHTML={{
            __html: Object.entries(inlineConfig)
              .map(([key, value]) => `window.${key} = ${JSON.stringify(value)};`)
              .join("\n"),
          }}
        />
      ) : null}
      {scriptSrcs.map((src) => <script key={src} src={src} defer type="text/javascript" />)}
      {extra}
    </>
  );
}

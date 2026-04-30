export type HostvibeSeoPage = {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  ogSiteName?: string;
  fbAdmins?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

export default function HostvibeIncludeRedcheapSeo({
  page,
}: {
  page?: HostvibeSeoPage;
}) {
  if (!page) return null;

  return (
    <>
      <title>{page.title}</title>
      {page.description ? <meta name="description" content={page.description} /> : null}
      {page.keywords ? <meta name="keywords" content={page.keywords} /> : null}
      <meta name="author" content="RedCheap Theme" />
      {page.ogTitle ? <meta property="og:title" content={page.ogTitle} /> : null}
      {page.ogDescription ? <meta property="og:description" content={page.ogDescription} /> : null}
      {page.ogType ? <meta property="og:type" content={page.ogType} /> : null}
      {page.ogUrl ? <meta property="og:url" content={page.ogUrl} /> : null}
      {page.ogImage ? <meta property="og:image" content={page.ogImage} /> : null}
      {page.ogSiteName ? <meta property="og:site_name" content={page.ogSiteName} /> : null}
      {page.fbAdmins ? <meta property="fb:admins" content={page.fbAdmins} /> : null}
      {page.twitterCard ? <meta name="twitter:card" content={page.twitterCard} /> : null}
      {page.twitterSite ? <meta name="twitter:site" content={page.twitterSite} /> : null}
      {page.twitterTitle ? <meta name="twitter:title" content={page.twitterTitle} /> : null}
      {page.twitterDescription ? <meta name="twitter:description" content={page.twitterDescription} /> : null}
      {page.twitterImage ? <meta name="twitter:image" content={page.twitterImage} /> : null}
    </>
  );
}

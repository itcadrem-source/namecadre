export type HostvibeFooterScript = {
  src?: string;
  body?: string;
  defer?: boolean;
  type?: string;
};

export default function HostvibeFooterScripts({ scripts = [] }: { scripts?: HostvibeFooterScript[] }) {
  if (!scripts.length) return null;

  return (
    <>
      {scripts.map((script, index) =>
        script.src ? (
          <script key={`${script.src}-${index}`} src={script.src} defer={script.defer} type={script.type ?? "text/javascript"} />
        ) : (
          <script key={`inline-${index}`} defer={script.defer} type={script.type ?? "text/javascript"} dangerouslySetInnerHTML={{ __html: script.body ?? "" }} />
        ),
      )}
    </>
  );
}

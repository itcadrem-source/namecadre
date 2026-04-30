export default function HostvibeIncludeCommonSvgIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2l8.5 4.5v11L12 22l-8.5-4.5v-11L12 2z" className="fill-[var(--hv-brand)]/15" />
      <path d="M12 6.5l4.5 2.4v5.6L12 17l-4.5-2.5V8.9L12 6.5z" className="fill-[var(--hv-brand)]" />
    </svg>
  );
}

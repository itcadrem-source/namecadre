export default function HostvibeIncludeCommonLoader({
  active = false,
  label = "Loading",
}: {
  active?: boolean;
  label?: string;
}) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm" role="status" aria-live="polite">
      <div className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-lg">
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[var(--hv-brand)]" />
          {label}
        </span>
      </div>
    </div>
  );
}

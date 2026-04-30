import Link from "next/link";

export default function HostvibeIncludeSidebar({
  items = [],
}: {
  items?: Array<{ label: string; href: string }>;
}) {
  if (!items.length) return null;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

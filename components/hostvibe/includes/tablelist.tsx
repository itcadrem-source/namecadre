export default function HostvibeIncludeTablelist({
  headers = [],
  rows = [],
}: {
  headers?: string[];
  rows?: string[][];
}) {
  if (!headers.length || !rows.length) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>{headers.map((h) => <th key={h} className="px-4 py-3 text-left font-semibold text-slate-800">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-slate-100">{row.map((cell, j) => <td key={`${i}-${j}`} className="px-4 py-3 text-slate-700">{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

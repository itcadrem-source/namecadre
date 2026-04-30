import type { ReactNode } from "react";

export type HostvibeTableHeader = {
  key: string;
  label: ReactNode;
  className?: string;
};

export type HostvibeTableRow = {
  key: string;
  cells: ReactNode[];
};

export type HostvibeIncludeTablelistProps = {
  tableName: string;
  headers: HostvibeTableHeader[];
  rows: HostvibeTableRow[];
  className?: string;
  enableDataTableScript?: boolean;
  filterColumn?: number;
};

export default function HostvibeIncludeTablelist({
  tableName,
  headers,
  rows,
  className,
  enableDataTableScript,
  filterColumn,
}: HostvibeIncludeTablelistProps) {
  if (!headers.length) return null;

  const tableId = `table${tableName}`;

  const script = enableDataTableScript
    ? `
if (typeof(buildFilterRegex) !== "function") {
  function buildFilterRegex(filterValue) {
    if (filterValue.indexOf('&') === -1) {
      return '[~>]\\\\s*' + jQuery.fn.dataTable.util.escapeRegex(filterValue) + '\\\\s*[<~]';
    }
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = filterValue;
    return '\\\\s*' + jQuery.fn.dataTable.util.escapeRegex(tempDiv.innerText) + '\\\\s*';
  }
}
jQuery(document).ready(function () {
  var table = jQuery("#${tableId}").DataTable({
    dom: '<"listtable"fit>pl',
    responsive: true,
    stateSave: true
  });

  ${typeof filterColumn === "number" ? `
  jQuery(".view-filter-btns a").click(function (e) {
    var filterValue = jQuery(this).find("span").not('.badge').html().trim();
    table.column(${filterColumn}).search(buildFilterRegex(filterValue), true, false, false).draw();
    e.preventDefault();
  });` : ""}
});`
    : "";

  return (
    <>
      <table id={tableId} className={["table", className || ""].filter(Boolean).join(" ")}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} className={header.className}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length
            ? rows.map((row) => (
                <tr key={row.key}>
                  {row.cells.map((cell, index) => <td key={`${row.key}-${index}`}>{cell}</td>)}
                </tr>
              ))
            : (
              <tr>
                <td colSpan={headers.length}>No records found</td>
              </tr>
            )}
        </tbody>
      </table>
      {enableDataTableScript ? <script dangerouslySetInnerHTML={{ __html: script }} /> : null}
    </>
  );
}

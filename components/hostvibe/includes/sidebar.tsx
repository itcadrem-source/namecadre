import type { ReactNode } from "react";

export type HostvibeSidebarChild = {
  id: string;
  name: string;
  label?: ReactNode;
  uri?: string;
  disabled?: boolean;
  current?: boolean;
  className?: string;
  iconClass?: string;
  badge?: ReactNode;
  bodyHtml?: ReactNode;
  target?: string;
};

export type HostvibeSidebarItem = {
  name: string;
  label?: ReactNode;
  className?: string;
  id?: string;
  noHeading?: boolean;
  badge?: ReactNode;
  bodyHtml?: ReactNode;
  children?: HostvibeSidebarChild[];
  footerHtml?: ReactNode;
  alert?: ReactNode;
};

export default function HostvibeIncludeSidebar({ items = [] }: { items?: HostvibeSidebarItem[] }) {
  if (!items.length) return null;

  return (
    <>
      {items.map((item) => (
        <div key={item.name} menuItemName={item.name} className={`panel panel-sidebar panel-sidebar-default panel-${item.name.toLowerCase().replace(/\s/g, "-")} ${item.className ?? ""}`.trim()} id={item.id}>
          {!item.noHeading ? (
            <div className="panel-heading">
              {item.name !== "Client Details" ? (
                <h5 className="panel-title">{item.label} {item.badge ? <span className="badge">{item.badge}</span> : null}</h5>
              ) : null}
            </div>
          ) : null}

          {item.bodyHtml ? <div className="panel-body">{item.bodyHtml}</div> : null}

          {item.children?.length ? (
            <div className="list-group">
              {item.children.map((child) =>
                child.uri ? (
                  <a key={child.id} tabIndex={child.disabled ? -1 : 0} menuItemName={child.name} href={child.uri} className={`list-group-item ${child.disabled ? "disabled" : ""} ${child.className ?? ""} ${child.current ? "active" : ""}`.trim()} target={child.target} id={child.id}>
                    {child.bodyHtml ?? (
                      <>
                        {child.badge ? <span className="badge">{child.badge}</span> : null}
                        {child.iconClass ? <i className={child.iconClass} aria-hidden="true" /> : null}
                        {child.label}
                      </>
                    )}
                  </a>
                ) : (
                  <div key={child.id} menuItemName={child.name} className={`list-group-item ${child.className ?? ""}`.trim()} id={child.id}>
                    {child.bodyHtml ?? (
                      <>
                        {child.badge ? <span className="badge">{child.badge}</span> : null}
                        {child.iconClass ? <i className={child.iconClass} /> : null}
                        {child.label}
                      </>
                    )}
                  </div>
                ),
              )}
            </div>
          ) : null}

          {item.footerHtml ? <div className="panel-footer clearfix">{item.footerHtml}</div> : null}
          {item.alert}
        </div>
      ))}
    </>
  );
}

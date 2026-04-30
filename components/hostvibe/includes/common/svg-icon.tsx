export type HostvibeIncludeCommonSvgIconProps = {
  icon: string;
  onDark?: boolean;
  className?: string;
};

const fallbackIconMap: Record<string, string> = {
  ticket: "fas fa-ticket-alt",
  article: "fas fa-file-alt",
  service: "fas fa-cogs",
  invoice: "fas fa-file-invoice-dollar",
};

export default function HostvibeIncludeCommonSvgIcon({ icon, className }: HostvibeIncludeCommonSvgIconProps) {
  return <i className={`${fallbackIconMap[icon] ?? "fas fa-question-circle"} ${className ?? ""}`.trim()} />;
}

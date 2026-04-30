import type { ReactNode } from "react";

export type HostvibeFlashMessage = {
  type?: "error" | "success" | "warning" | "info";
  text: ReactNode;
};

export default function HostvibeIncludeFlashmessage({
  message,
  align,
  className,
}: {
  message?: HostvibeFlashMessage | null;
  align?: "start" | "center" | "end";
  className?: string;
}) {
  if (!message) return null;

  const mappedType = message.type === "error" ? "danger" : (message.type ?? "info");
  return <div className={[`alert alert-${mappedType}`, align ? `text-${align}` : "", className || ""].filter(Boolean).join(" ")}>{message.text}</div>;
}

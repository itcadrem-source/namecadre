import HeaderCore from "@/components/hostvibe/header/header";

export type HostvibeTemplateHeaderProps = {
  className?: string;
  phoneCcInput?: string;
  spyTarget?: string;
  offset?: number;
};

export default function HostvibeTemplateHeader({
  className = "hostvibe-theme hvx-theme-light",
  phoneCcInput = "separate",
  spyTarget = "#navbar-collapse-toggle",
  offset = 98,
}: HostvibeTemplateHeaderProps) {
  return (
    <div
      className={className}
      data-phone-cc-input={phoneCcInput}
      data-spy="scroll"
      data-target={spyTarget}
      data-offset={offset}
    >
      <HeaderCore />
    </div>
  );
}

import { MotionTimedItem, MotionTimedList } from "@/components/hostvibe/pricing/motion-scroll-reveal";

export type HostWithConfidenceProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function HostWithConfidence({
  title = "Host with confidence",
  description = "Count on 99.99% uptime and global data centers across the US, Asia, Europe, and the UK.",
  buttonLabel = "Try for free",
  buttonHref = "#pricing-three",
  imageSrc = "/hostvibe/images/mission-img.jpg",
  imageAlt = "Host with confidence visual",
  className = "",
}: HostWithConfidenceProps) {
  return (
    <section data-pricing-section="confidence" className={`hvx-host-confidence bg-blue-50 py-14 sm:py-20 ${className}`.trim()}>
      <MotionTimedList className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8" amount={0.24}>
        <MotionTimedItem className="max-w-[540px]">
          <h2 className="hvx-landing-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="hvx-landing-muted mt-4 max-w-[520px] text-pretty text-base leading-7 sm:text-lg">
            {description}
          </p>
          <a
            href={buttonHref}
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#2d2f35] px-6 text-sm font-bold text-white transition hover:bg-[#1f2126] sm:text-base"
          >
            {buttonLabel}
          </a>
        </MotionTimedItem>

        <MotionTimedItem className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -left-12 -top-12 h-36 w-56 rounded-[42px] bg-[#7dd3fc]/35 sm:h-44 sm:w-72" />
          <div className="absolute -right-10 top-1/3 h-48 w-64 rounded-[42px] bg-[#67e8f9]/35 sm:h-60 sm:w-80" />

          <div className="relative z-10 overflow-hidden rounded-[34px]">
            <img src={imageSrc} alt={imageAlt} className="h-[320px] w-full object-cover sm:h-[420px]" />
            <div className="pointer-events-none absolute inset-x-0 top-[34%] h-16 bg-cyan-300/35 backdrop-blur-[1px]" />
          </div>
        </MotionTimedItem>
      </MotionTimedList>
    </section>
  );
}

import Pricing, { type PricingProps } from "./pricing";

export type PricingTwoProps = PricingProps;

export default function PricingTwo(props: PricingTwoProps) {
  return <Pricing {...props} />;
}

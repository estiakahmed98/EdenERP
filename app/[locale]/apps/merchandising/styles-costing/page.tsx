import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const generateMetadata = () => merchandisingMetadata("styles-costing");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="styles-costing" />;
}

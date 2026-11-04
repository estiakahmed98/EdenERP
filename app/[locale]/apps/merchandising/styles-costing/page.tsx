import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const metadata = merchandisingMetadata("styles-costing");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="styles-costing" />;
}

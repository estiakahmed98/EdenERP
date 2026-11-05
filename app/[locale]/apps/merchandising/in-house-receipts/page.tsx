import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const generateMetadata = () => merchandisingMetadata("in-house-receipts");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="in-house-receipts" />;
}

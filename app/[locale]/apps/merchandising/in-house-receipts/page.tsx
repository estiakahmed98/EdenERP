import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const metadata = merchandisingMetadata("in-house-receipts");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="in-house-receipts" />;
}

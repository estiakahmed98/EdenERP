import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const metadata = merchandisingMetadata("profitability");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="profitability" />;
}

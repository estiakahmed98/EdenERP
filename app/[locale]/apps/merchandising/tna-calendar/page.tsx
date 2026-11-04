import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const metadata = merchandisingMetadata("tna-calendar");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="tna-calendar" />;
}

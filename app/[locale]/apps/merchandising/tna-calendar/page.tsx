import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const generateMetadata = () => merchandisingMetadata("tna-calendar");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="tna-calendar" />;
}

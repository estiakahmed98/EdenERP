import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const generateMetadata = () => merchandisingMetadata("factories");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="factories" />;
}

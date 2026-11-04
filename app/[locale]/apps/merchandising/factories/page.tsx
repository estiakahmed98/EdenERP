import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const metadata = merchandisingMetadata("factories");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="factories" />;
}

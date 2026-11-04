import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const metadata = merchandisingMetadata("merchandising-dashboard");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="merchandising-dashboard" />;
}

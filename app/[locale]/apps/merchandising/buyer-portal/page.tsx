import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const metadata = merchandisingMetadata("buyer-portal");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="buyer-portal" />;
}

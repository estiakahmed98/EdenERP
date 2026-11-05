import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const generateMetadata = () => merchandisingMetadata("buyer-portal");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="buyer-portal" />;
}

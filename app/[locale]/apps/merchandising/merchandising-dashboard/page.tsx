import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const generateMetadata = () => merchandisingMetadata("merchandising-dashboard");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="merchandising-dashboard" />;
}

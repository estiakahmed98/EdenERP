import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const generateMetadata = () => merchandisingMetadata("production-follow-up");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="production-follow-up" />;
}

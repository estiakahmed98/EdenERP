import {
  MerchandisingPage,
  merchandisingMetadata,
} from "@/components/merchandising/page";

export const generateMetadata = () => merchandisingMetadata("material-booking");

export default function MerchandisingSubpage() {
  return <MerchandisingPage slug="material-booking" />;
}

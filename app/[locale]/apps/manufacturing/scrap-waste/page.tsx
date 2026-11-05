import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("scrap-waste");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="scrap-waste" />;
}

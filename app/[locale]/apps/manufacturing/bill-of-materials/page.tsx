import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("bill-of-materials");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="bill-of-materials" />;
}

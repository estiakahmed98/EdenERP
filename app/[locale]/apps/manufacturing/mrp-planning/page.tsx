import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("mrp-planning");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="mrp-planning" />;
}

import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("capacity-planning");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="capacity-planning" />;
}

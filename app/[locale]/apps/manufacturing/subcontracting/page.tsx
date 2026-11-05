import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("subcontracting");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="subcontracting" />;
}

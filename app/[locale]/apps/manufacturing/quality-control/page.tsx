import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("quality-control");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="quality-control" />;
}

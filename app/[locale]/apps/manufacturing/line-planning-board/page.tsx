import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("line-planning-board");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="line-planning-board" />;
}

import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("routings");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="routings" />;
}

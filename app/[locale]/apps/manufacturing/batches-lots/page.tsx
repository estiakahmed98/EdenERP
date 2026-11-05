import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("batches-lots");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="batches-lots" />;
}

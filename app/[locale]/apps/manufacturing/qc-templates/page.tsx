import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const generateMetadata = () => manufacturingMetadata("qc-templates");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="qc-templates" />;
}

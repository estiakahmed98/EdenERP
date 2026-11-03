import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("qc-templates");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="qc-templates" />;
}

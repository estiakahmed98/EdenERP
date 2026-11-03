import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("subcontracting");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="subcontracting" />;
}

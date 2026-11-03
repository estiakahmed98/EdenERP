import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("mrp-planning");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="mrp-planning" />;
}

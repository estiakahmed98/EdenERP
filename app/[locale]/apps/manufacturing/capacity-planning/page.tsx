import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("capacity-planning");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="capacity-planning" />;
}

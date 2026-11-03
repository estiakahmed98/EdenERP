import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("master-schedule-mps");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="master-schedule-mps" />;
}

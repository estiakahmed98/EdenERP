import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("production-costing");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="production-costing" />;
}

import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("standard-costing");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="standard-costing" />;
}

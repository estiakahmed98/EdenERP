import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("serial-numbers");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="serial-numbers" />;
}

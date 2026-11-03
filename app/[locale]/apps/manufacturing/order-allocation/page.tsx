import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("order-allocation");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="order-allocation" />;
}

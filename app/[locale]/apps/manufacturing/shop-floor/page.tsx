import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("shop-floor");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="shop-floor" />;
}

import {
  ManufacturingModulePage,
  manufacturingMetadata,
} from "@/components/manufacturing/module-page";

export const metadata = manufacturingMetadata("work-centers");

export default function ManufacturingSubpage() {
  return <ManufacturingModulePage slug="work-centers" />;
}

import PricingAdminPage from "@/components/admin/pricing/PricingAdminPage";
import { getPricingAdminData } from "@/lib/pricing/service";

export default async function AdminPricingPage() {
  const data = await getPricingAdminData("en");

  return <PricingAdminPage initialData={data} />;
}

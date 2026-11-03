import { redirect } from "@/i18n/navigation";
import { LIVE_DEMO_HREF } from "@/lib/live-demo";

/** Preserve older demo URLs while using the existing advisor destination. */
export default async function DemoRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: LIVE_DEMO_HREF, locale });
}

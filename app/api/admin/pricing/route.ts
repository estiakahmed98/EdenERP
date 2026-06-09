import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ensurePricingSettings, getPricingAdminData } from "@/lib/pricing/service";
import {
  pricingAdminPayloadSchema,
  pricingAdminQuerySchema,
} from "@/lib/pricing/validation";

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const result = pricingAdminQuerySchema.safeParse({
      locale: new URL(request.url).searchParams.get("locale") ?? "en",
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid locale", details: result.error.flatten() },
        { status: 400 },
      );
    }

    await ensurePricingSettings();
    const data = await getPricingAdminData(result.data.locale);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading admin pricing data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const result = pricingAdminPayloadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: result.error.flatten() },
        { status: 400 },
      );
    }

    const payload = result.data;

    await db.$transaction(async (tx) => {
      await tx.pricingSettings.upsert({
        where: { id: 1 },
        update: {
          pricingPageEnabled: payload.settings.pricingPageEnabled,
        },
        create: {
          id: 1,
          pricingPageEnabled: payload.settings.pricingPageEnabled,
        },
      });

      await tx.pricingPageContent.deleteMany({
        where: { locale: payload.locale },
      });

      await tx.pricingFaq.deleteMany({
        where: { locale: payload.locale },
      });

      await tx.pricingModule.deleteMany({
        where: { locale: payload.locale },
      });

      const existingPlans = await tx.pricingPlan.findMany({
        where: { locale: payload.locale },
        select: { id: true },
      });

      if (existingPlans.length > 0) {
        await tx.pricingPlanFeature.deleteMany({
          where: {
            planId: { in: existingPlans.map((plan) => plan.id) },
          },
        });
      }

      await tx.pricingPlan.deleteMany({
        where: { locale: payload.locale },
      });

      await tx.pricingPageContent.createMany({
        data: [
          {
            locale: payload.locale,
            pageType: "pricing",
            sectionKey: "metadata",
            content: payload.sections.metadata,
          },
          {
            locale: payload.locale,
            pageType: "pricing",
            sectionKey: "hero",
            content: payload.sections.hero,
          },
          {
            locale: payload.locale,
            pageType: "pricing",
            sectionKey: "packagePricing",
            content: payload.sections.packagePricing,
          },
          {
            locale: payload.locale,
            pageType: "pricing",
            sectionKey: "includedFeaturesHeading",
            content: payload.sections.includedFeaturesHeading ?? "",
          },
          {
            locale: payload.locale,
            pageType: "pricing",
            sectionKey: "bottomNote",
            content: payload.sections.bottomNote,
          },
          {
            locale: payload.locale,
            pageType: "pricing",
            sectionKey: "modulesTitle",
            content: payload.sections.modulesTitle ?? "",
          },
          {
            locale: payload.locale,
            pageType: "pricing",
            sectionKey: "faqMeta",
            content: payload.sections.faqMeta,
          },
          {
            locale: payload.locale,
            pageType: "pricing",
            sectionKey: "finalCta",
            content: payload.sections.finalCta,
          },
          {
            locale: payload.locale,
            pageType: "standard",
            sectionKey: "standardPlanPage",
            content: payload.sections.standardPlanPage,
          },
          {
            locale: payload.locale,
            pageType: "success-packs",
            sectionKey: "successPacksPage",
            content: payload.sections.successPacksPage,
          },
          {
            locale: payload.locale,
            pageType: "success-packs",
            sectionKey: "successPacksFaqMeta",
            content: payload.sections.successPacksFaqMeta,
          },
        ],
      });

      for (const plan of payload.plans) {
        const createdPlan = await tx.pricingPlan.create({
          data: {
            locale: payload.locale,
            planKey: plan.id,
            order: plan.order,
            enabled: plan.enabled,
            name: plan.name,
            tagline: plan.tagline,
            badge: plan.badge ?? null,
            icon: plan.icon,
            accent: plan.accent,
            usersLabel: typeof plan.users === "string" ? plan.users : null,
            usersCount: typeof plan.users === "number" ? plan.users : null,
            currency: plan.currency,
            setupFee: plan.setupFee,
            monthlyFee: plan.monthlyFee,
            quarterlyFee: plan.quarterlyFee,
            serverFee: plan.serverFee,
            cta: plan.cta,
          },
        });

        if (plan.features.length > 0) {
          await tx.pricingPlanFeature.createMany({
            data: plan.features.map((feature, index) => ({
              planId: createdPlan.id,
              order: index,
              text: feature,
            })),
          });
        }
      }

      if (payload.pricingFaqs.length > 0) {
        await tx.pricingFaq.createMany({
          data: payload.pricingFaqs.map((faq) => ({
            locale: payload.locale,
            pageType: "pricing",
            order: faq.order,
            enabled: faq.enabled,
            question: faq.question,
            answer: faq.answer,
          })),
        });
      }

      if (payload.successFaqs.length > 0) {
        await tx.pricingFaq.createMany({
          data: payload.successFaqs.map((faq) => ({
            locale: payload.locale,
            pageType: "success-packs",
            order: faq.order,
            enabled: faq.enabled,
            question: faq.question,
            answer: faq.answer,
          })),
        });
      }

      if (payload.modules.length > 0) {
        await tx.pricingModule.createMany({
          data: payload.modules.map((module) => ({
            locale: payload.locale,
            order: module.order,
            enabled: module.enabled,
            label: module.label,
          })),
        });
      }
    });

    revalidatePath(`/${payload.locale}/pricing`);
    revalidatePath(`/${payload.locale}`);
    revalidatePath(`/${payload.locale}`, "layout");

    const data = await getPricingAdminData(payload.locale);
    return NextResponse.json({
      message: "Pricing content saved successfully",
      data,
    });
  } catch (error) {
    console.error("Error saving admin pricing data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

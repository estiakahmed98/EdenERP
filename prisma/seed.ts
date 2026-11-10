import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";

import { db } from "../lib/db";
import { getDefaultPricingData } from "../lib/pricing/defaults";
import { resetDemoBlogs, seedDemoBlogs } from "./seed-blogs";

async function seedAdminUser() {
  const email = (process.env.SEED_ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;

  // Never create an admin with a well-known password. In development a random
  // one is generated and printed once; in production it must be supplied.
  if (!password && process.env.NODE_ENV === "production") {
    console.warn("Skipping admin seed: set SEED_ADMIN_PASSWORD (min 12 chars) to create one.");
    return;
  }
  if (password && password.length < 12) {
    throw new Error("SEED_ADMIN_PASSWORD must be at least 12 characters.");
  }

  const existing = await db.user.findUnique({
    where: { email },
  });

  if (!existing) {
    const finalPassword = password ?? randomBytes(12).toString("base64url");
    const passwordHash = await bcrypt.hash(finalPassword, 12);

    await db.user.create({
      data: {
        email,
        name: "Admin",
        role: "ADMIN",
        passwordHash,
        emailVerified: new Date(),
      },
    });

    console.log("Admin created:", email);
    if (!password) console.log("Generated dev admin password (shown once):", finalPassword);
  }
}

async function seedPricingLocale(locale: "en" | "bn") {
  const pricing = getDefaultPricingData(locale);

  const existingPlans = await db.pricingPlan.findMany({
    where: { locale },
    select: { id: true },
  });

  if (existingPlans.length > 0) {
    await db.pricingPlanFeature.deleteMany({
      where: { planId: { in: existingPlans.map((plan) => plan.id) } },
    });
  }

  await db.pricingPlan.deleteMany({ where: { locale } });
  await db.pricingFaq.deleteMany({ where: { locale } });
  await db.pricingModule.deleteMany({ where: { locale } });
  await db.pricingPageContent.deleteMany({ where: { locale } });

  await db.pricingPageContent.createMany({
    data: [
      { locale, pageType: "pricing", sectionKey: "metadata", content: pricing.metadata },
      { locale, pageType: "pricing", sectionKey: "hero", content: pricing.hero },
      {
        locale,
        pageType: "pricing",
        sectionKey: "packagePricing",
        content: pricing.packagePricing,
      },
      {
        locale,
        pageType: "pricing",
        sectionKey: "includedFeaturesHeading",
        content: pricing.includedFeaturesHeading ?? "",
      },
      {
        locale,
        pageType: "pricing",
        sectionKey: "bottomNote",
        content: pricing.bottomNote,
      },
      {
        locale,
        pageType: "pricing",
        sectionKey: "modulesTitle",
        content: pricing.modules.title ?? "",
      },
      {
        locale,
        pageType: "pricing",
        sectionKey: "faqMeta",
        content: {
          title: pricing.faq.title,
          description: pricing.faq.description,
        },
      },
      {
        locale,
        pageType: "pricing",
        sectionKey: "finalCta",
        content: pricing.finalCta,
      },
      {
        locale,
        pageType: "standard",
        sectionKey: "standardPlanPage",
        content: pricing.standardPlanPage,
      },
      {
        locale,
        pageType: "success-packs",
        sectionKey: "successPacksPage",
        content: (({ faq, ...content }) => content)(pricing.successPacksPage),
      },
      {
        locale,
        pageType: "success-packs",
        sectionKey: "successPacksFaqMeta",
        content: {
          title: pricing.successPacksPage.faq.title,
        },
      },
    ],
  });

  for (const plan of pricing.erpPackages) {
    const createdPlan = await db.pricingPlan.create({
      data: {
        locale,
        planKey: plan.id,
        order: plan.order,
        enabled: plan.enabled,
        name: plan.name,
        tagline: plan.tagline,
        badge: plan.badge,
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
      await db.pricingPlanFeature.createMany({
        data: plan.features.map((feature, index) => ({
          planId: createdPlan.id,
          order: index,
          text: feature,
        })),
      });
    }
  }

  if (pricing.modules.list.length > 0) {
    await db.pricingModule.createMany({
      data: pricing.modules.list.map((label, index) => ({
        locale,
        label,
        order: index,
        enabled: true,
      })),
    });
  }

  if (pricing.faq.items.length > 0) {
    await db.pricingFaq.createMany({
      data: pricing.faq.items.map((faq, index) => ({
        locale,
        pageType: "pricing",
        order: index,
        enabled: true,
        question: faq.question,
        answer: faq.answer,
      })),
    });
  }

  if (pricing.successPacksPage.faq.items.length > 0) {
    await db.pricingFaq.createMany({
      data: pricing.successPacksPage.faq.items.map((faq, index) => ({
        locale,
        pageType: "success-packs",
        order: index,
        enabled: true,
        question: faq.question,
        answer: faq.answer,
      })),
    });
  }
}

async function main() {
  // `npx prisma db seed -- --reset-blogs` only removes the demo blog posts.
  if (process.argv.includes("--reset-blogs")) {
    await resetDemoBlogs();
    return;
  }

  await seedAdminUser();

  await db.pricingSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      pricingPageEnabled: true,
    },
  });

  await seedPricingLocale("en");
  await seedPricingLocale("bn");

  await seedDemoBlogs();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

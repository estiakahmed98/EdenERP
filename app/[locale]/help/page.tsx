import type { Metadata } from "next";
import { BookOpen, HelpCircle, Mail, MessageSquare, Phone, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";

type HelpCategoryKey =
  | "documentation"
  | "faq"
  | "communitySupport"
  | "contactSupport";

type HelpTopicKey =
  | "gettingStarted"
  | "apiReference"
  | "bestPractices"
  | "migrationGuide"
  | "billing"
  | "security"
  | "features"
  | "account"
  | "forums"
  | "discord"
  | "communityPosts"
  | "shareIdeas"
  | "emailSupport"
  | "chat"
  | "phone"
  | "ticketSystem";

type PopularTopicKey =
  | "gettingStarted"
  | "apiAuth"
  | "billing"
  | "integrations"
  | "security"
  | "troubleshooting";

type SupportOptionKey = "liveChat" | "emailSupport" | "phoneSupport";

const helpCategories: Array<{
  icon: typeof BookOpen;
  key: HelpCategoryKey;
  color: string;
  topics: HelpTopicKey[];
}> = [
  {
    icon: BookOpen,
    key: "documentation",
    color: "from-primary to-secondary",
    topics: ["gettingStarted", "apiReference", "bestPractices", "migrationGuide"]
  },
  {
    icon: HelpCircle,
    key: "faq",
    color: "from-secondary to-accent",
    topics: ["billing", "security", "features", "account"]
  },
  {
    icon: MessageSquare,
    key: "communitySupport",
    color: "from-accent to-primary",
    topics: ["forums", "discord", "communityPosts", "shareIdeas"]
  },
  {
    icon: Mail,
    key: "contactSupport",
    color: "from-primary to-accent",
    topics: ["emailSupport", "chat", "phone", "ticketSystem"]
  }
];

const popularTopics: PopularTopicKey[] = [
  "gettingStarted",
  "apiAuth",
  "billing",
  "integrations",
  "security",
  "troubleshooting"
];

const supportOptions: Array<{
  icon: typeof MessageSquare;
  key: SupportOptionKey;
  color: string;
}> = [
  {
    icon: MessageSquare,
    key: "liveChat",
    color: "from-primary to-secondary"
  },
  {
    icon: Mail,
    key: "emailSupport",
    color: "from-secondary to-accent"
  },
  {
    icon: Phone,
    key: "phoneSupport",
    color: "from-accent to-primary"
  }
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HelpPage.metadata");

  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function HelpPage() {
  const t = await getTranslations("HelpPage");

  return (
    <main className="min-h-screen flex flex-col">
      <section className="w-full bg-linear-to-b from-accent/10 to-transparent py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-center">
            <h1 className="text-5xl font-bold text-foreground lg:text-6xl">
              {t.rich("hero.title", {
                highlight: (chunks) => (
                  <span className="bg-linear-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                    {chunks}
                  </span>
                )
              })}
            </h1>

            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              {t("hero.description")}
            </p>

            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="text"
                  placeholder={t("hero.searchPlaceholder")}
                  className="w-full rounded-lg border-2 border-border bg-card py-3 pl-12 pr-4 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex-1 w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {helpCategories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.key}
                className="group cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl"
              >
                <div
                  className={`mb-4 h-12 w-12 rounded-lg bg-linear-to-br ${category.color} p-2.5 transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-full w-full text-white" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {t(`categories.${category.key}.title`)}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t(`categories.${category.key}.description`)}
                </p>

                <div className="space-y-2">
                  {category.topics.map((topic) => (
                    <p
                      key={topic}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-linear-to-r ${category.color}`}
                      />
                      {t(`categories.${category.key}.topics.${topic}`)}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5 p-8 lg:p-12">
          <h2 className="mb-8 text-3xl font-bold text-foreground">
            {t("popularTopics.title")}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularTopics.map((topic) => (
              <button
                key={topic}
                className="rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary hover:bg-muted"
              >
                <p className="mb-1 font-semibold text-foreground">
                  {t(`popularTopics.items.${topic}`)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(`popularTopics.views.${topic}`)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-linear-to-b from-primary/5 to-transparent py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl font-bold text-foreground">
            {t("supportOptions.title")}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {supportOptions.map((option) => {
              const Icon = option.icon;

              return (
                <div
                  key={option.key}
                  className="rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-xl"
                >
                  <div
                    className={`mb-6 h-14 w-14 rounded-lg bg-linear-to-br ${option.color} p-3`}
                  >
                    <Icon className="h-full w-full text-white" />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {t(`supportOptions.${option.key}.title`)}
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    {t(`supportOptions.${option.key}.description`)}
                  </p>

                  <div className="space-y-3">
                    <button
                      className={`w-full rounded-lg bg-linear-to-r ${option.color} px-4 py-2 font-semibold text-white transition-all hover:shadow-lg`}
                    >
                      {t(`supportOptions.${option.key}.action`)}
                    </button>
                    <p className="text-center text-xs text-muted-foreground">
                      {t(`supportOptions.${option.key}.time`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-green-500/30 bg-linear-to-r from-green-500/10 to-emerald-500/10 p-8 lg:p-12">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  {t("status.title")}
                </h3>
                <p className="mb-4 text-muted-foreground">
                  {t("status.description")}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  {t("status.updated")}
                </p>
              </div>

              <button className="rounded-lg border border-green-500/50 px-6 py-2 font-semibold text-green-600 transition-all hover:bg-green-500/10">
                {t("status.action")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  Headphones,
  MessageCircle,
  MonitorSmartphone,
  Search,
  Sparkles,
  Star,
  TicketCheck,
  UserPlus,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

function DashedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 20C92 35 115 79 91 113C78 132 55 139 34 131"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="14 18"
      />
      <path
        d="M37 130L57 116M37 130L51 151"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloatingNote({ className = "", t }: { className?: string; t: any }) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white dark:bg-slate-950 py-3 pl-16 pr-8 text-sm italic text-slate-700 dark:text-slate-200 shadow-xl ring-1 ring-slate-100 dark:ring-slate-800 ${className}`}
    >
      <span className="absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] bg-rose-400" />
      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt="User"
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />
      <MessageCircle className="absolute -top-9 left-9 h-8 w-8 text-slate-900 dark:text-white" />
      Share information and make connections
    </div>
  );
}

export default function LiveChatLandingSections() {
  const t = useTranslations("pages.live-chat");

  // Admin messages
  const adminMessages = [
    t("hero.chatPreview.admin.messages.0"),
    t("hero.chatPreview.admin.messages.1"),
    t("hero.chatPreview.admin.messages.2"),
  ];

  // Visitor messages
  const visitorMessages = [
    t("hero.chatPreview.visitor.messages.0"),
    t("hero.chatPreview.visitor.messages.1"),
    t("hero.chatPreview.visitor.messages.2"),
  ];

  // Chat messages for answer section
  const chatAdminMessages = [
    t("answerSection.chats.admin.messages.0"),
    t("answerSection.chats.admin.messages.1"),
    t("answerSection.chats.admin.messages.2"),
  ];

  const chatVisitorMessages = [
    t("answerSection.chats.visitor.messages.0"),
    t("answerSection.chats.visitor.messages.1"),
    t("answerSection.chats.visitor.messages.2"),
  ];

  // Opportunity fields
  const opportunityFields = [
    t("neverMissSection.opportunityCard.fields.customer"),
    t("neverMissSection.opportunityCard.fields.email"),
    t("neverMissSection.opportunityCard.fields.phone"),
    t("neverMissSection.opportunityCard.fields.product"),
    t("neverMissSection.opportunityCard.fields.priority"),
  ];

  // Chat messages for opportunity card
  const opportunityMessages = [
    t("neverMissSection.opportunityCard.messages.0"),
    t("neverMissSection.opportunityCard.messages.1"),
    t("neverMissSection.opportunityCard.messages.2"),
  ];

  // Ticket stats
  const ticketStats = [
    { label: t("helpSection.ticketStats.open"), value: "24" },
    { label: t("helpSection.ticketStats.pending"), value: "11" },
    { label: t("helpSection.ticketStats.solved"), value: "87" },
  ];

  // Tickets list
  const tickets = [
    { title: t("helpSection.tickets.login"), urgent: true },
    { title: t("helpSection.tickets.payment"), urgent: false },
    { title: t("helpSection.tickets.shipping"), urgent: false },
    { title: t("helpSection.tickets.recommendation"), urgent: false },
  ];

  // Latest conversation messages
  const latestMessages = [
    t("helpSection.latestConversation.messages.0"),
    t("helpSection.latestConversation.messages.1"),
  ];

  // Opportunity fields for visitor to customer
  const opportunityData = [
    {
      label: t("visitorToCustomerSection.opportunity.fields.expectedRevenue"),
      value: t("visitorToCustomerSection.opportunity.values.expectedRevenue"),
    },
    {
      label: t("visitorToCustomerSection.opportunity.fields.probability"),
      value: t("visitorToCustomerSection.opportunity.values.probability"),
    },
    {
      label: t("visitorToCustomerSection.opportunity.fields.customer"),
      value: t("visitorToCustomerSection.opportunity.values.customer"),
    },
    {
      label: t("visitorToCustomerSection.opportunity.fields.stage"),
      value: t("visitorToCustomerSection.opportunity.values.stage"),
    },
  ];

  // Chat messages for opportunity
  const opportunityChatMessages = [
    t("visitorToCustomerSection.opportunity.messages.0"),
    t("visitorToCustomerSection.opportunity.messages.1"),
    t("visitorToCustomerSection.opportunity.messages.2"),
  ];

  // Chatbot steps
  const chatbotSteps = [
    t("chatbotSection.card.steps.welcome"),
    t("chatbotSection.card.steps.askGoal"),
    t("chatbotSection.card.steps.collectEmail"),
    t("chatbotSection.card.steps.recommend"),
    t("chatbotSection.card.steps.createTicket"),
    t("chatbotSection.card.steps.routeAgent"),
  ];

  // Features list
  const featuresList = [
    {
      title: t("featuresSection.features.cannedResponses.title"),
      description: t("featuresSection.features.cannedResponses.description"),
    },
    {
      title: t("featuresSection.features.thirdPartyIntegration.title"),
      description: t(
        "featuresSection.features.thirdPartyIntegration.description",
      ),
    },
    {
      title: t("featuresSection.features.searchTickets.title"),
      description: t("featuresSection.features.searchTickets.description"),
    },
    {
      title: t("featuresSection.features.routeAnalyze.title"),
      description: t("featuresSection.features.routeAnalyze.description"),
    },
    {
      title: t("featuresSection.features.multiChannel.title"),
      description: t("featuresSection.features.multiChannel.description"),
    },
    {
      title: t("featuresSection.features.smartChat.title"),
      description: t("featuresSection.features.smartChat.description"),
    },
  ];

  // Apps list
  const appsList = [
    {
      title: t("appsSection.apps.website.title"),
      desc: t("appsSection.apps.website.desc"),
      icon: MonitorSmartphone,
    },
    {
      title: t("appsSection.apps.crm.title"),
      desc: t("appsSection.apps.crm.desc"),
      icon: BadgeCheck,
    },
    {
      title: t("appsSection.apps.onlineAppointment.title"),
      desc: t("appsSection.apps.onlineAppointment.desc"),
      icon: TicketCheck,
    },
    {
      title: t("appsSection.apps.helpdesk.title"),
      desc: t("appsSection.apps.helpdesk.desc"),
      icon: Headphones,
    },
    {
      title: t("appsSection.apps.chatVisitor.title"),
      desc: t("appsSection.apps.chatVisitor.desc"),
      icon: MessageCircle,
    },
  ];

  // Avatar images
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=96&h=96&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=96&h=96&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=96&h=96&fit=crop&crop=face",
  ];

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative overflow-hidden bg-background pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-amber-300">
              <span className="text-amber-500">{t("hero.titleHighlight")}</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/80"
            >
              {t("hero.buttons.startNow")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-border bg-background px-6 py-3 text-sm font-bold text-foreground shadow-sm transition hover:border-primary/30 hover:text-primary"
            >
              {t("hero.buttons.watchDemo")}
            </Link>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">{t("hero.freeNote")}</p>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="relative min-h-[440px] bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1400&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/45" />

                <div className="relative grid min-h-[440px] gap-8 p-7 lg:grid-cols-[1fr_1.1fr]">
                  <div className="flex flex-col justify-center text-left text-white">
                    <p
                      className="text-xl font-bold text-orange-200"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      {t("hero.chatPreview.storeName")}
                    </p>

                    <h2 className="mt-8 max-w-xs text-5xl font-bold leading-none">
                      {t("hero.chatPreview.title")}
                    </h2>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
                      {t("hero.chatPreview.description")}
                    </p>

                    <button className="mt-8 w-fit rounded-md bg-orange-500 px-5 py-3 text-sm font-bold text-white">
                      {t("hero.chatPreview.button")}
                    </button>
                  </div>

                  <div className="grid items-end gap-4 md:grid-cols-2">
                    <div className="overflow-hidden rounded-xl bg-card shadow-2xl">
                      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
                        <span className="text-sm font-bold">
                          {t("hero.chatPreview.admin.name")}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      </div>
                      <div className="space-y-3 p-4 text-left">
                        {adminMessages.map((message, index) => (
                          <div
                            key={message}
                            className={`rounded-2xl px-4 py-3 text-xs leading-5 ${
                              index === 1
                                ? "ml-8 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                                : "mr-8 bg-muted text-muted-foreground"
                            }`}
                          >
                            {message}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-xl bg-card shadow-2xl">
                      <div className="flex items-center justify-between bg-sky-500 px-4 py-3 text-white">
                        <span className="text-sm font-bold">
                          {t("hero.chatPreview.visitor.name")}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      </div>
                      <div className="space-y-3 p-4 text-left">
                        {visitorMessages.map((message, index) => (
                          <div
                            key={message}
                            className={`rounded-2xl px-4 py-3 text-xs leading-5 ${
                              index === 1
                                ? "ml-8 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                                : "mr-8 bg-muted text-muted-foreground"
                            }`}
                          >
                            {message}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-slate-800 [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-rose-300">
              <span>{t("answerSection.title")}</span>
            </HandUnderline>{" "}
            {t("answerSection.titleHighlight")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span>{t("answerSection.titleHighlight2")}</span>
            </HandUnderline>{" "}
            {t("answerSection.subtitle")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
            {t("answerSection.description")}
          </p>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border bg-card text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground">
                <div className="flex items-center gap-3">
                  <img
                    src={avatars[0]}
                    alt="Admin"
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                  <span className="font-bold">
                    {t("answerSection.chats.admin.name")}
                  </span>
                </div>
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="space-y-4 p-5">
                <div className="text-center text-xs font-bold text-muted-foreground">
                  Today
                </div>
                {chatAdminMessages.map((message, messageIndex) => (
                  <div
                    key={message}
                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                      messageIndex === 1
                        ? "ml-10 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "mr-10 bg-muted text-muted-foreground"
                    }`}
                  >
                    {message}
                  </div>
                ))}
                <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {t("answerSection.replyPlaceholder")}
                  </span>
                  <Sparkles className="ml-auto h-4 w-4 text-amber-400" />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between bg-sky-500 px-5 py-4 text-white">
                <div className="flex items-center gap-3">
                  <img
                    src={avatars[1]}
                    alt="Visitor"
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                  <span className="font-bold">
                    {t("answerSection.chats.visitor.name")}
                  </span>
                </div>
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="space-y-4 p-5">
                <div className="text-center text-xs font-bold text-muted-foreground">
                  Today
                </div>
                {chatVisitorMessages.map((message, messageIndex) => (
                  <div
                    key={message}
                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                      messageIndex === 1
                        ? "ml-10 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "mr-10 bg-muted text-muted-foreground"
                    }`}
                  >
                    {message}
                  </div>
                ))}
                <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {t("answerSection.replyPlaceholder")}
                  </span>
                  <Sparkles className="ml-auto h-4 w-4 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-background py-20">
        <div className="absolute left-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] dark:bg-slate-800 lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid gap-5 lg:grid-cols-[1fr_180px]">
              <div className="text-left">
                <p className="font-bold text-foreground">
                  {t("neverMissSection.opportunityCard.title")}
                </p>
                <div className="mt-5 space-y-3">
                  {opportunityFields.map((item) => (
                    <div key={item}>
                      <div className="mb-1 text-xs font-bold text-muted-foreground">
                        {item}
                      </div>
                      <div className="h-9 rounded-md bg-muted ring-1 ring-border" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-border">
                <div className="bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">
                  {t("neverMissSection.opportunityCard.chatTitle")}
                </div>
                <div className="space-y-2 p-3">
                  {opportunityMessages.map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-xl px-3 py-2 text-xs ${
                        index === 2
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">
                  {t("neverMissSection.title")}
                </span>
                <span className="absolute bottom-2 left-0 h-4 w-full rounded-full bg-amber-300" />
              </span>{" "}
              {t("neverMissSection.subtitle")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
              {t("neverMissSection.description")}
            </p>

            <DashedArrow className="mt-10 h-40 w-40 text-muted-foreground" />
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("helpSection.title")}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
              {t("helpSection.description")}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 grid gap-4 sm:grid-cols-3">
              {ticketStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-muted p-4 text-center"
                >
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-bold text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_210px]">
              <div className="space-y-3">
                {tickets.map((ticket, index) => (
                  <div
                    key={ticket.title}
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {ticket.title}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                        ticket.urgent
                          ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300"
                          : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300"
                      }`}
                    >
                      {ticket.urgent
                        ? t("helpSection.priority.urgent")
                        : t("helpSection.priority.normal")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-muted p-4">
                <p className="text-xs font-bold text-muted-foreground">
                  {t("helpSection.latestConversation.title")}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="rounded-xl bg-card px-3 py-2 text-xs text-muted-foreground">
                    {latestMessages[0]}
                  </div>
                  <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    {latestMessages[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("visitorToCustomerSection.title")}{" "}
            <span className="relative inline-block px-3">
              <span className="relative z-10">
                {t("visitorToCustomerSection.titleHighlight")}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-12 rounded-[35%] bg-amber-300" />
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-muted-foreground">
            {t("visitorToCustomerSection.description")}
          </p>

          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
            <div className="border-b border-border bg-primary px-6 py-4 text-left text-primary-foreground">
              <p className="font-bold">
                {t("visitorToCustomerSection.opportunity.title")}
              </p>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[1fr_270px]">
              <div className="text-left">
                <div className="grid gap-4 sm:grid-cols-2">
                  {opportunityData.map((field) => (
                    <div
                      key={field.label}
                      className="rounded-lg bg-muted p-4"
                    >
                      <p className="text-xs font-bold text-muted-foreground">
                        {field.label}
                      </p>
                      <p className="mt-2 font-bold text-foreground">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg bg-muted p-5">
                  <p className="text-sm font-bold text-foreground">
                    {t("visitorToCustomerSection.opportunity.notes.title")}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {t("visitorToCustomerSection.opportunity.notes.text")}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-border">
                <div className="bg-primary px-4 py-3 text-left text-sm font-bold text-primary-foreground">
                  {t("visitorToCustomerSection.opportunity.chatTitle")}
                </div>
                <div className="space-y-3 p-4 text-left">
                  {opportunityChatMessages.map((message, index) => (
                    <div
                      key={message}
                      className={`rounded-2xl px-4 py-3 text-xs leading-5 ${
                        index === 1
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <FloatingNote className="mx-auto mt-12 z-30" t={t} />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 flex justify-end lg:hidden">
              <UserPlus className="h-12 w-12 text-amber-400" />
            </div>

            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">
                  {t("chatbotSection.title")}
                </span>
                <span className="absolute -bottom-3 left-0 h-2 w-full rounded-full border-b-[9px] border-dotted border-sky-400" />
              </span>
            </h2>

            <p className="mt-10 max-w-xl text-sm leading-7 text-muted-foreground">
              {t("chatbotSection.description")}
            </p>
          </div>

          <div className="relative">
            <UserPlus className="absolute -right-8 -top-16 hidden h-16 w-16 text-amber-400 lg:block" />

            <div className="rounded-xl border border-border bg-card p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Bot className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-bold text-foreground">
                    {t("chatbotSection.card.title")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("chatbotSection.card.subtitle")}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {chatbotSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {step}
                      </span>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>

            <FloatingNote
              className="absolute -left-16 -top-24 hidden lg:flex z-30"
              t={t}
            />
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-slate-800 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">
                {t("featuresSection.highlight")}
              </span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3]" />
            </span>
            <br />
            {t("featuresSection.subtitle")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span>{t("featuresSection.subtitle")}</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuresList.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#1f1521] text-primary">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            {t("featuresSection.seeAllFeatures")}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
            <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
              <span>{t("appsSection.needHighlight")}</span>
            </HandUnderline>
            , {t("appsSection.appHighlight")}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            {t("appsSection.description")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {appsList.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-border bg-muted p-5 transition hover:bg-card hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-card text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {app.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            {t("appsSection.seeAllApps")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-muted"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-primary/20"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-background/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-foreground"
                style={{ fontFamily: handwrittenFont }}
              >
                {t("ctaSection.title")}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("ctaSection.description")}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-muted p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>
              <div>
                <p className="text-base leading-8 text-foreground">
                  {t("ctaSection.testimonial.quote")}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-foreground">
                      {t("ctaSection.testimonial.name")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("ctaSection.testimonial.title")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400">
              <Sparkles className="h-12 w-12" />
            </div>
            <h2
              className="text-4xl font-bold leading-tight text-foreground sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("getStartedSection.title")}
              <br />
              <HandUnderline color="bg-[#02cfc3] dark:bg-[#02cfc3]/30">
                <span className="text-[#02a6a6]">
                  {t("getStartedSection.titleHighlight")}
                </span>
              </HandUnderline>{" "}
              {t("getStartedSection.subtitle")}
            </h2>
            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/80"
            >
              {t("getStartedSection.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
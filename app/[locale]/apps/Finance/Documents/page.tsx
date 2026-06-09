"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CheckCircle2,
  CirclePlay,
  Clock,
  Cloud,
  Database,
  File,
  FileCheck2,
  FileSignature,
  FolderKanban,
  Grid3X3,
  Inbox,
  Lock,
  Mail,
  MessageSquare,
  PenLine,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  UploadCloud,
  Users,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    ArrowRight, BadgeCheck, BarChart3, Bell, CheckCircle2, CirclePlay, Clock,
    Cloud, Database, File, FileCheck2, FileSignature, FolderKanban, Grid3X3,
    Inbox, Lock, Mail, MessageSquare, PenLine, Search, Share2, ShieldCheck,
    Sparkles, Star, UploadCloud, Users, Zap,
  };
  return icons[iconName] || File;
};

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  iconName,
  labelKey,
  t,
}: {
  iconName: string;
  labelKey: string;
  t: any;
}) {
  const IconComponent = getIconComponent(iconName);
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 dark:bg-orange-950/40 px-4 py-2 text-sm font-semibold text-orange-700 dark:text-orange-300 shadow-sm ring-1 ring-orange-100 dark:ring-orange-800">
      <span className="text-orange-500 dark:text-orange-400">
        <IconComponent className="h-4 w-4" />
      </span>
      {t(labelKey)}
    </div>
  );
}

function DocumentDashboard({
  t,
  raw,
}: {
  t: (key: string) => string;
  raw: (key: string) => unknown;
}) {
  const fallbackFolders = ["Inbox", "Contracts", "Invoices", "HR Files", "Shared", "Archive"];
  const fallbackDocuments = [
    { title: "Client contract", status: "Ready for signature", color: "orange" },
    { title: "Supplier invoice", status: "Auto-classified", color: "emerald" },
    { title: "HR onboarding", status: "Needs approval", color: "cyan" },
    { title: "Project brief", status: "Shared with team", color: "violet" },
  ];
  const foldersData = raw("hero.dashboard.folders");
  const documentsData = raw("hero.dashboard.documents");
  const folders = Array.isArray(foldersData) ? foldersData : fallbackFolders;
  const documents = Array.isArray(documentsData) ? documentsData : fallbackDocuments;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-5 py-4">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {t("hero.dashboard.title")}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <Bell className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            {t("hero.dashboard.synced")}
          </span>
        </div>
      </div>

      <div className="grid min-h-90 md:grid-cols-[210px_1fr_240px]">
        <aside className="border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4">
          <div className="space-y-2">
            {folders.map((item: string, index: number) => (
              <div
                key={item}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                  index === 0
                    ? "bg-orange-100 dark:bg-orange-950/50 font-semibold text-orange-700 dark:text-orange-300"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                <span>{item}</span>
                <span className="text-xs">{index === 0 ? "24" : index + 3}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {documents.map((doc: any, idx: number) => (
              <div
                key={doc.title}
                className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
              >
                <div
                  className={`mb-4 h-24 rounded-xl bg-linear-to-br ${
                    doc.color === "orange"
                      ? "from-orange-100 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/30"
                      : doc.color === "emerald"
                        ? "from-emerald-100 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/30"
                        : doc.color === "cyan"
                          ? "from-cyan-100 to-sky-50 dark:from-cyan-950/50 dark:to-sky-950/30"
                          : "from-violet-100 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/30"
                  }`}
                />
                <p className="font-semibold text-slate-900 dark:text-slate-100">{doc.title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{doc.status}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="hidden border-l border-slate-100 dark:border-slate-800 bg-slate-950 dark:bg-slate-900 p-4 text-white md:block">
          <p className="text-sm font-semibold text-white">{t("hero.dashboard.preview.title")}</p>
          <div className="mt-4 rounded-2xl bg-white dark:bg-slate-900 p-4">
            <div className="space-y-2">
              <div className="h-3 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-5 h-24 rounded-xl bg-slate-100 dark:bg-slate-700/50" />
              <div className="h-3 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {[
              t("hero.dashboard.preview.owner"),
              t("hero.dashboard.preview.status"),
              t("hero.dashboard.preview.access"),
            ].map((item) => (
              <div key={item} className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/80">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
        <CirclePlay className="h-7 w-7 fill-orange-600 text-orange-600 dark:fill-orange-500 dark:text-orange-500" />
      </button>
    </div>
  );
}

export default function DocumentsPage() {
  const t = useTranslations("pages");
  const commonT = useTranslations("common.actions");
  const tr = (key: string) => t(`documents.${key}`);
  const raw = (key: string) => {
    try {
      return t.raw(`documents.${key}`);
    } catch {
      return undefined;
    }
  };

  const fallbackFeaturesList = [
    { title: "Split PDFs", description: "Separate contracts, invoices, and forms into clean documents in seconds.", icon: "File" },
    { title: "Auto folder rules", description: "Route files to the right workspace using tags, clients, projects, and teams.", icon: "FolderKanban" },
    { title: "Smart search", description: "Find any document by title, content, owner, client, or approval status.", icon: "Search" },
    { title: "Secure sharing", description: "Share files with role-based permissions, expiry links, and audit trails.", icon: "Lock" },
    { title: "E-sign workflows", description: "Send, sign, approve, and archive documents without leaving Adon ERP.", icon: "FileSignature" },
    { title: "Activity insights", description: "Track views, approvals, comments, and document performance in one place.", icon: "BarChart3" },
  ];
  const fallbackAppsList = [
    { title: "CRM", description: "Client files and proposals", icon: "Users" },
    { title: "Projects", description: "Tasks, briefs, and docs", icon: "Grid3X3" },
    { title: "Accounting", description: "Bills and statements", icon: "FileCheck2" },
    { title: "HR", description: "Employee documents", icon: "BadgeCheck" },
    { title: "Helpdesk", description: "Tickets and attachments", icon: "MessageSquare" },
    { title: "Approvals", description: "Review and sign-off flows", icon: "ShieldCheck" },
  ];
  const fallbackDocumentTypesList = [
    { title: "Email", icon: "Mail" },
    { title: "Scan", icon: "UploadCloud" },
    { title: "Files", icon: "File" },
  ];
  const fallbackMetricsList = [
    { label: "Manual file sorting", saved: "42h saved/month", percentage: 75 },
    { label: "Signature follow-up", saved: "18h saved/month", percentage: 65 },
    { label: "Approval tracking", saved: "31h saved/month", percentage: 70 },
    { label: "Searching documents", saved: "24h saved/month", percentage: 60 },
  ];
  const fallbackStepsList = [
    "Upload or scan a document",
    "Adon ERP identifies the type and owner",
    "The file is routed to the right workflow",
    "Approvals, signatures, and archive rules run automatically",
  ];
  const fallbackCollaborationFeaturesList = ["Comments", "Approvals", "Mentions", "Access control"];
  const fallbackOrganizationColumnsList = ["Inbox", "In Review", "Waiting Signature", "Approved"];
  const fallbackOrganizationCardsList = ["Invoice", "Proposal", "Agreement"];
  const fallbackSigningFeaturesList = [
    "Send signature requests in one click",
    "Track signed, pending, and expired documents",
    "Automatically archive completed files",
  ];
  const fallbackLeftItemsList = ["Payment slip", "Contract file"];
  const fallbackInboxItemsList = ["Invoice", "Agreement", "Receipt", "Approval note"];
  const fallbackRightItemsList = ["Client doc", "Signed certificate"];
  const fallbackCommentsList = [
    { name: "Sarah", text: "Approved the final terms" },
    { name: "Nadim", text: "Added missing client attachment" },
    { name: "Emma", text: "Requested signature from client" },
  ];

  const featuresData = raw("featuresSection.list");
  const appsData = raw("appsSection.apps");
  const documentTypesData = raw("documentHubSection.documentTypes");
  const metricsData = raw("timeSavingSection.metrics");
  const stepsData = raw("timeSavingSection.steps");
  const collaborationFeaturesData = raw("collaborationSection.features");
  const organizationColumnsData = raw("organizationSection.columns");
  const organizationCardsData = raw("organizationSection.cards");
  const signingFeaturesData = raw("signingSection.features");
  const leftItemsData = raw("documentHubSection.demo.leftItems");
  const inboxItemsData = raw("documentHubSection.demo.inboxItems");
  const rightItemsData = raw("documentHubSection.demo.rightItems");
  const commentsData = raw("collaborationSection.demo.comments");
  const ctaRating = raw("ctaBanner.rating");

  const featuresList = Array.isArray(featuresData) ? featuresData : fallbackFeaturesList;
  const appsList = Array.isArray(appsData) ? appsData : fallbackAppsList;
  const documentTypesList = Array.isArray(documentTypesData) ? documentTypesData : fallbackDocumentTypesList;
  const metricsList = Array.isArray(metricsData) ? metricsData : fallbackMetricsList;
  const stepsList = Array.isArray(stepsData) ? stepsData : fallbackStepsList;
  const collaborationFeaturesList = Array.isArray(collaborationFeaturesData) ? collaborationFeaturesData : fallbackCollaborationFeaturesList;
  const organizationColumnsList = Array.isArray(organizationColumnsData) ? organizationColumnsData : fallbackOrganizationColumnsList;
  const organizationCardsList = Array.isArray(organizationCardsData) ? organizationCardsData : fallbackOrganizationCardsList;
  const signingFeaturesList = Array.isArray(signingFeaturesData) ? signingFeaturesData : fallbackSigningFeaturesList;
  const leftItemsList = Array.isArray(leftItemsData) ? leftItemsData : fallbackLeftItemsList;
  const inboxItemsList = Array.isArray(inboxItemsData) ? inboxItemsData : fallbackInboxItemsList;
  const rightItemsList = Array.isArray(rightItemsData) ? rightItemsData : fallbackRightItemsList;
  const commentsList = Array.isArray(commentsData) ? commentsData : fallbackCommentsList;
  const ratingCount = typeof ctaRating === "number" ? ctaRating : 5;

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_16%_12%,rgba(249,115,22,0.14),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(6,182,212,0.1),transparent_25%)] dark:bg-[radial-gradient(circle_at_16%_12%,rgba(249,115,22,0.08),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(6,182,212,0.06),transparent_25%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <SectionEyebrow
            iconName={tr("hero.eyebrowIcon")}
            labelKey="hero.eyebrowLabel"
            t={tr}
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-100 sm:text-6xl lg:text-7xl">
              {tr("hero.title")}{" "}
              <span
                className="text-orange-500 dark:text-orange-400"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                {tr("hero.titleHighlight")}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {tr("hero.description")}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-orange-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
            >
              {commonT("contactSales")}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-orange-300 hover:text-orange-700 dark:hover:border-orange-600 dark:hover:text-orange-400"
            >
              {tr("hero.demoButton")}
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-14 max-w-5xl"
          >
            <DocumentDashboard t={tr} raw={raw} />

            <div className="absolute -left-4 top-10 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <Zap className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
              {tr("hero.badges.autoClassified")}
            </div>

            <div className="absolute -bottom-5 right-8 hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-lg md:flex">
              <ShieldCheck className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {tr("hero.badges.secureArchive")}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          {tr("documentHubSection.title")}{" "}
          <span className="rounded-xl bg-orange-100 dark:bg-orange-950/50 px-2 text-orange-600 dark:text-orange-400">
            {tr("documentHubSection.titleHighlight")}
          </span>
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {tr("documentHubSection.description")}
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {documentTypesList.map((item: any) => {
            const IconComponent = getIconComponent(item.icon);
            return (
              <div
                key={item.title}
                className="rounded-[1.7rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
                  <IconComponent className="h-7 w-7" />
                </div>
                <p className="mt-4 font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="grid gap-5 md:grid-cols-[1fr_1.2fr_1fr]">
            <div className="space-y-4">
              {leftItemsList.map((item: string) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 text-left"
                >
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Captured from email</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.7rem] bg-slate-50 dark:bg-slate-800/40 p-4">
              <div className="mx-auto max-w-xs rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Document inbox</span>
                  <Inbox className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                </div>
                <div className="space-y-3">
                  {inboxItemsList.map((item: string) => (
                    <div
                      key={item}
                      className="rounded-xl bg-slate-50 dark:bg-slate-800/40 px-3 py-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {rightItemsList.map((item: string) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 text-left"
                >
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Ready to archive</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 rounded-full bg-slate-100 dark:bg-slate-800" />
          <div className="relative mx-auto max-w-xs rounded-[2.5rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4">
              <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {tr("signingSection.demo.title")}
              </p>
              <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm">
                <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="mt-3 h-24 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="mt-4 rounded-xl border border-dashed border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/30 p-3 text-center text-sm font-semibold text-cyan-700 dark:text-cyan-400">
                  {tr("signingSection.demo.signatureLabel")}
                </div>
              </div>
              <button className="mt-4 w-full rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition">
                Sign & Send
              </button>
            </div>
          </div>
        </div>

        <div>
          <SectionEyebrow
            iconName={tr("signingSection.eyebrowIcon")}
            labelKey="signingSection.eyebrowLabel"
            t={tr}
          />

          <ScriptHeading className="mt-5">
            {tr("signingSection.title")}
            <br />
            {tr("signingSection.subtitle")}
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {tr("signingSection.description")}
          </p>

          <div className="mt-8 space-y-4">
            {signingFeaturesList.map((item: string) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center gap-3">
          {[Cloud, FolderKanban, FileCheck2].map((Icon, idx) => (
            <div
              key={idx}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-100 to-emerald-100 dark:from-cyan-950/50 dark:to-emerald-950/50 text-cyan-700 dark:text-cyan-400"
            >
              <Icon className="h-6 w-6" />
            </div>
          ))}
        </div>

        <ScriptHeading>{tr("organizationSection.title")}</ScriptHeading>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {tr("organizationSection.description")}
        </p>

        <div className="mx-auto mt-12 max-w-5xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
          <div className="grid gap-4 md:grid-cols-4">
            {organizationColumnsList.map((column: string, index: number) => (
              <div key={column} className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{column}</p>
                  <span className="rounded-full bg-white dark:bg-slate-900 px-2 py-1 text-xs text-slate-500 dark:text-slate-400">
                    {index + 3}
                  </span>
                </div>
                <div className="space-y-3">
                  {organizationCardsList.map((card: string, i: number) => (
                    <div
                      key={`${column}-${card}-${i}`}
                      className="rounded-xl bg-white dark:bg-slate-900 p-3 text-left shadow-sm"
                    >
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{card}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Client workspace</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionEyebrow
            iconName={tr("collaborationSection.eyebrowIcon")}
            labelKey="collaborationSection.eyebrowLabel"
            t={tr}
          />

          <ScriptHeading className="mt-5">
            {tr("collaborationSection.title")}{" "}
            <span className="text-cyan-600 dark:text-cyan-400">{tr("collaborationSection.titleHighlight")}</span>
          </ScriptHeading>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {tr("collaborationSection.description")}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {collaborationFeaturesList.map((item: string) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-4">
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {tr("collaborationSection.demo.title")}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {tr("collaborationSection.demo.comment")}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {commentsList.map((comment: any) => (
                <div
                  key={comment.name}
                  className="rounded-xl bg-white dark:bg-slate-900 px-4 py-3 text-left shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{comment.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
          <SectionEyebrow
              iconName={tr("timeSavingSection.eyebrowIcon")}
              labelKey="timeSavingSection.eyebrowLabel"
              t={tr}
            />

            <ScriptHeading className="mt-5">{tr("timeSavingSection.title")}</ScriptHeading>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {tr("timeSavingSection.description")}
            </p>

            <div className="mt-8 space-y-4">
              {metricsList.map((metric: any) => (
                <div key={metric.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{metric.label}</span>
                    <span className="text-orange-600 dark:text-orange-400">{metric.saved}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 w-3/4 rounded-full bg-linear-to-r from-orange-500 to-amber-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <p className="text-sm text-slate-500 dark:text-slate-400">{tr("timeSavingSection.stats.searchLabel")}</p>
              <p className="mt-3 text-5xl font-bold text-slate-950 dark:text-slate-100">
                {tr("timeSavingSection.stats.searchTime")}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{tr("timeSavingSection.stats.searchLabel")}</p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <p className="text-sm text-slate-500 dark:text-slate-400">{tr("timeSavingSection.stats.accuracyLabel")}</p>
              <p className="mt-3 text-5xl font-bold text-slate-950 dark:text-slate-100">
                {tr("timeSavingSection.stats.accuracy")}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{tr("timeSavingSection.stats.accuracyLabel")}</p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm sm:col-span-2">
              <p className="mb-4 font-semibold text-slate-900 dark:text-slate-100">
                How does document automation work?
              </p>

              <div className="space-y-3">
                {stepsList.map((step: string, index: number) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 px-4 py-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/50 text-sm font-semibold text-orange-700 dark:text-orange-400">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f7fb] dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>
            {tr("featuresSection.title")}
            <br />
            {tr("featuresSection.subtitle")}
          </ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuresList.map((feature: any) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <div
                  key={feature.title}
                  className="group rounded-[1.6rem] border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <Link
            href="/features"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300"
          >
            {tr("featuresSection.seeAllLink")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          {tr("appsSection.title")}{" "}
        </ScriptHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appsList.map((app: any) => {
            const IconComponent = getIconComponent(app.icon);
            return (
              <div
                key={app.title}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{app.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{app.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300"
        >
          {tr("appsSection.seeAllLink")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-white via-orange-50 to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-6 py-16 text-center shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 opacity-80">
            {Array.from({ length: 28 }).map((_, index) => (
              <div
                key={index}
                className={`absolute rounded-3xl ${
                  index % 3 === 0
                    ? "h-12 w-12 bg-orange-200 dark:bg-orange-950/30"
                    : index % 3 === 1
                      ? "h-10 w-10 bg-slate-200 dark:bg-slate-800"
                      : "h-14 w-14 bg-cyan-100 dark:bg-cyan-950/30"
                }`}
                style={{
                  top: `${(index * 17) % 88}%`,
                  left: `${(index * 29) % 92}%`,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white dark:bg-slate-900/85 px-8 py-10 shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
              <Users className="h-7 w-7" />
            </div>

            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              {tr("ctaBanner.title")}
            </ScriptHeading>

            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              {tr("ctaBanner.description")}
            </p>

            <div className="mt-6 flex justify-center gap-1 text-amber-400">
              {Array.from({ length: ratingCount }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="get-started" className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-orange-600 dark:text-orange-400" />

        <ScriptHeading>
          {tr("footerCta.title")}
          <br />
          {tr("footerCta.subtitle")}
        </ScriptHeading>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {tr("footerCta.description")}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:border-orange-300 hover:text-orange-700 dark:hover:border-orange-600 dark:hover:text-orange-400"
          >
            {tr("footerCta.salesButton")}
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{tr("footerCta.footerText")}</p>
      </section>
    </main>
  );
}

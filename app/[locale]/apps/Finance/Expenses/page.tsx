"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Receipt,
  CreditCard,
  Wallet,
  Building2,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  FileText,
  DollarSign,
  PieChart,
  LineChart,
  Shield,
  Globe,
  Bell,
  Repeat,
  Palette,
  Sparkles,
  Star,
  Users,
  Play,
  Download,
  Eye,
  Send,
  Smartphone,
  Camera,
  Zap,
  BookOpen,
  Briefcase,
  Home,
  Car,
  Coffee,
  Gift,
  TrendingUp,
  Calendar,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Moon,
  Sun,
  Cloud,
  Upload,
  Scan,
  EyeOff,
  Lock,
  Phone,
  Mail,
  MapPin,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Award,
  Target,
  Rocket,
  Heart,
  ThumbsUp,
  MessageCircle,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Facebook,
  Figma,
  Apple,
  Chrome,
  Database,
  CloudCog,
  Cpu,
  HardDrive,
  Network,
  Server,
  ShieldCheck,
  LockKeyhole,
  Fingerprint,
  Key,
  BadgeCheck,
  Crown,
  Gem,
  Diamond,
  StarOff,
  StarHalf,
  Trophy,
  Medal,
  Ribbon,
  Flower2,
  Leaf,
  TreePine,
  Mountain,
  Waves,
  CloudRain,
  Snowflake,
  Flame,
  Wind,
  SunMedium,
  MoonStar,
  Sunrise,
  Sunset,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudLightning,
  CloudSnow,
  CloudRainWind,
  CloudDrizzle,
  CloudHail,
  Thermometer,
  Compass,
  Navigation,
  MapPinIcon,
  Locate,
  Globe2,
  Earth,
  Plane,
  Train,
  Bus,
  CarIcon,
  Bike,
  Footprints,
  Ship,
  Truck,
  Package,
  Box,
  Archive,
  Folder,
  File,
  FileTextIcon,
  FileCheck,
  FileX,
  FilePlus,
  FileMinus,
  FileSearch,
  FileCode,
  FileJson,
  FileType,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileKey,
  FileLock,
  FileHeart,
  FileClock,
  FileWarning,
  FileQuestion,
  FileCheck2,
  FileOutput,
  FileInput,
  FileSymlink,
  FileDiff,
  FileBadge,
  FileStack,
  FileVolume,
  FileTerminal,
  FileCog,
  FileSliders,
  FileBarChart,
  FilePieChart,
  FileLineChart,
  FileSignature,
  FileDigit,
  FileMinus2,
  FilePlus2,
  FileSearch2,
  FileLock2,
  FileCheckIcon,
  FileOutputIcon,
  FileInputIcon,
  FileSymlinkIcon,
  FileDiffIcon,
  FileBadgeIcon,
  FileStackIcon,
  FileVolumeIcon,
  FileTerminalIcon,
  FileCogIcon,
  FileSlidersIcon,
  FileBarChartIcon,
  FilePieChartIcon,
  FileLineChartIcon,
} from "lucide-react";

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Receipt, CreditCard, Wallet, Building2, RefreshCw, CheckCircle2, Clock,
    AlertCircle, BarChart3, FileText, DollarSign, PieChart, LineChart, Shield,
    Globe, Bell, Repeat, Palette, Sparkles, Star, Users, Play, Download, Eye,
    Send, Smartphone, Camera, Zap, BookOpen, Briefcase, Home, Car, Coffee, Gift,
    TrendingUp, Calendar, Filter, Lock, Rocket, Heart, MessageCircle, Apple,
    Database, Cloud, Server, BadgeCheck, Trophy, Medal, Leaf, SunMedium,
    Compass, Navigation, MapPinIcon, Locate, Earth, Plane, Train, Bus,
    CarIcon, Bike, Footprints, Ship, Truck, Package, Box, Archive, Folder, File,
    FileTextIcon, FileCheck,
  };
  return icons[iconName] || Receipt;
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl ${className}`}
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
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300 shadow-sm ring-1 ring-emerald-100 dark:ring-emerald-800">
      <span className="text-emerald-500 dark:text-emerald-400">
        <IconComponent className="h-4 w-4" />
      </span>
      {t(labelKey)}
    </div>
  );
}

export default function ExpensesPage() {
  const t = useTranslations("pages.expenses");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const fallbackRecentExpenses = [
    { name: "Starbucks Coffee", amount: "$12.50", date: "Today", status: "approved" },
    { name: "Uber Ride", amount: "$24.00", date: "Yesterday", status: "pending" },
    { name: "Adobe Creative Cloud", amount: "$52.99", date: "Mar 12, 2024", status: "approved" },
  ];

  const categoriesList = t.raw("categoriesSection.categories");
  const integrationsList = t.raw("integrationsSection.integrations");
  const teamMembersList = t.raw("approvalSection.demo.teamMembers");
  let recentExpensesData: unknown = fallbackRecentExpenses;

  try {
    recentExpensesData = t.raw("hero.dashboard.recentExpensesList");
  } catch {
    recentExpensesData = fallbackRecentExpenses;
  }

  const recentExpensesList = Array.isArray(recentExpensesData)
    ? recentExpensesData
    : fallbackRecentExpenses;

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      emerald: "emerald",
      cyan: "cyan",
      purple: "purple",
      blue: "blue",
      orange: "orange",
      pink: "pink",
      indigo: "indigo",
    };
    return colorMap[color] || "emerald";
  };

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.12),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.1),transparent_24%)] dark:bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-12">
            {/* Left Content */}
            <div className="max-w-xl space-y-8">
              <SectionEyebrow
                iconName={t("hero.eyebrowIcon")}
                labelKey="hero.eyebrowLabel"
                t={t}
              />

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl">
                  {t("hero.title")}
                  <br />
                  <span
                    className="text-emerald-600 dark:text-emerald-400"
                    style={{
                      fontFamily:
                        '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                    }}
                  >
                    {t("hero.titleHighlight")}
                  </span>
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#get-started"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {t("hero.startButton")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:text-emerald-600 dark:hover:border-emerald-600 dark:hover:text-emerald-400"
                >
                  <Play className="h-4 w-4" />
                  {t("hero.demoButton")}
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-700 bg-slate-200 dark:bg-slate-700 overflow-hidden"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                    {t("hero.rating")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Expense Dashboard */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -top-6 -right-8 h-32 w-32 rounded-full bg-emerald-100 dark:bg-emerald-900/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-purple-100 dark:bg-purple-900/30 blur-3xl" />

              <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
                <div className="bg-linear-to-r from-emerald-600 to-cyan-600 px-5 py-3">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      <span className="text-sm font-semibold">{t("hero.dashboard.title")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-white/80 hover:text-white transition">
                        <Filter className="h-4 w-4" />
                      </button>
                      <button className="text-white/80 hover:text-white transition">
                        <Calendar className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="bg-linear-to-br from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30 rounded-xl p-4 mb-4 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {t("hero.dashboard.totalSpent")}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                      {t("hero.dashboard.totalAmount")}
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-emerald-600 dark:text-emerald-400">
                        {t("hero.dashboard.trend")}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t("hero.dashboard.cardsInUse")}</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{t("hero.dashboard.cardsCount")}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t("hero.dashboard.pendingApprovals")}</p>
                      <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{t("hero.dashboard.pendingCount")}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t("hero.dashboard.autoMatched")}</p>
                      <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{t("hero.dashboard.matchedPercent")}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {t("hero.dashboard.recentExpenses")}
                    </p>
                    {recentExpensesList.slice(0, 3).map((expense: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-lg transition"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`h-8 w-8 rounded-lg ${
                            expense.status === "approved" ? "bg-emerald-100 dark:bg-emerald-900/40" :
                            expense.status === "pending" ? "bg-amber-100 dark:bg-amber-900/40" :
                            "bg-red-100 dark:bg-red-900/40"
                          } flex items-center justify-center`}>
                            <Receipt className={`h-4 w-4 ${
                              expense.status === "approved" ? "text-emerald-600" :
                              expense.status === "pending" ? "text-amber-600" :
                              "text-red-600"
                            }`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{expense.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{expense.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{expense.amount}</p>
                          <p className={`text-xs ${
                            expense.status === "approved" ? "text-emerald-600" :
                            expense.status === "pending" ? "text-amber-600" :
                            "text-red-600"
                          }`}>{expense.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-4 bg-white dark:bg-slate-900 rounded-full px-3 py-1.5 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t("hero.badges.realTimeSync")}</span>
              </div>
              <div className="absolute -bottom-3 -left-4 bg-white dark:bg-slate-900 rounded-full px-3 py-1.5 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4 text-cyan-600" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t("hero.badges.autoCategorized")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Cards Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionEyebrow
              iconName={t("cardsSection.eyebrowIcon")}
              labelKey="cardsSection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("cardsSection.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("cardsSection.description")}
            </p>

            <div className="mt-6 space-y-4">
              {t.raw("cardsSection.features").map((item: any, idx: number) => {
                const IconComponent = getIconComponent(item.text.includes("limit") ? "Lock" : 
                  item.text.includes("Real-time") ? "Clock" :
                  item.text.includes("Merchant") ? "Shield" : "RefreshCw");
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`h-6 w-6 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/40 flex items-center justify-center`}>
                      <IconComponent className={`h-3 w-3 text-${item.color}-600 dark:text-${item.color}-400`} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-2xl opacity-30" />
              <div className="relative bg-linear-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-white/60 text-xs">{t("cardsSection.demo.cardTitle")}</p>
                    <p className="text-white font-semibold text-lg mt-1">{t("cardsSection.demo.cardSubtitle")}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-white/40" />
                </div>
                <div className="mb-8">
                  <p className="text-white/60 text-xs">Card Number</p>
                  <p className="text-white font-mono text-lg">{t("cardsSection.demo.cardNumber")}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-white/60 text-xs">{t("cardsSection.demo.limit")}</p>
                    <p className="text-white font-semibold">{t("cardsSection.demo.limitAmount")}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">{t("cardsSection.demo.spent")}</p>
                    <p className="text-emerald-400 font-semibold">{t("cardsSection.demo.spentAmount")}</p>
                  </div>
                </div>
                <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smart Capture Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/40 rounded-3xl my-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-800/40 border-b dark:border-slate-700 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Scan className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("captureSection.demo.title")}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-4">
                    <Camera className="h-8 w-8 text-emerald-600" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">{t("captureSection.demo.dragText")}</p>
                  <p className="text-xs text-slate-400">{t("captureSection.demo.supportText")}</p>
                  <button className="mt-4 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                    {t("captureSection.demo.uploadButton")}
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{t("captureSection.demo.aiFeature")}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
                    <Sparkles className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{t("captureSection.demo.accuracyFeature")}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <SectionEyebrow
              iconName={t("captureSection.eyebrowIcon")}
              labelKey="captureSection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("captureSection.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("captureSection.description")}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-emerald-600">{t("captureSection.metrics.recognitionRate")}</div>
                <div className="text-xs text-slate-500">{t("captureSection.metrics.recognitionLabel")}</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-cyan-600">{t("captureSection.metrics.processingTime")}</div>
                <div className="text-xs text-slate-500">{t("captureSection.metrics.processingLabel")}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approval Workflow Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionEyebrow
              iconName={t("approvalSection.eyebrowIcon")}
              labelKey="approvalSection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("approvalSection.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("approvalSection.description")}
            </p>

            <div className="mt-6 space-y-3">
              {t.raw("approvalSection.features").map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-800/40 border-b dark:border-slate-700 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("approvalSection.demo.title")}</span>
                </div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {teamMembersList.map((member: any, idx: number) => (
                  <div
                    key={idx}
                    className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div className="h-full w-full bg-slate-300 dark:bg-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-amber-600">{member.pending} pending</span>
                      <button className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">
                        {t("approvalSection.demo.reviewButton")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expense Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/40 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow
            iconName={t("categoriesSection.eyebrowIcon")}
            labelKey="categoriesSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-4">{t("categoriesSection.title")}</ScriptHeading>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t("categoriesSection.description")}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesList.map((category: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl bg-${category.color}-100 dark:bg-${category.color}-900/40 flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = getIconComponent(category.name === "Rent & Utilities" ? "Home" :
                        category.name === "Salaries" ? "Users" :
                        category.name === "Office Supplies" ? "Coffee" :
                        category.name === "Travel" ? "Car" :
                        category.name === "Marketing" ? "Megaphone" : "BookOpen");
                      return <IconComponent className={`h-5 w-5 text-${category.color}-600`} />;
                    })()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{category.name}</p>
                    <p className="text-xs text-slate-500">{category.amount}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-600">{category.percentage}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full w-[${category.percentage}%] bg-${category.color}-500 rounded-full`} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-purple-600 rounded-[3rem] blur-2xl opacity-30" />
              <div className="relative bg-slate-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
                  <div className="bg-linear-to-r from-emerald-600 to-cyan-600 p-4">
                    <div className="flex items-center justify-between text-white">
                      <Smartphone className="h-5 w-5" />
                      <span className="text-sm font-semibold">{t("mobileSection.demo.appName")}</span>
                      <Bell className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium text-slate-700">{t("mobileSection.demo.scannedLabel")}</span>
                      </div>
                      <div className="space-y-1">
                        {t.raw("mobileSection.demo.items").map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-slate-600">{item.name}</span>
                            <span className="text-slate-700">{item.amount}</span>
                          </div>
                        ))}
                        <div className="border-t dark:border-slate-800 pt-1 flex justify-between font-semibold text-sm">
                          <span className="text-slate-900">{t("mobileSection.demo.total")}</span>
                          <span className="text-slate-900">{t("mobileSection.demo.totalAmount")}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
                      {t("mobileSection.demo.submitButton")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <SectionEyebrow
              iconName={t("mobileSection.eyebrowIcon")}
              labelKey="mobileSection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              {t("mobileSection.title")}{" "}
              <span className="text-emerald-600">{t("mobileSection.titleHighlight")}</span>
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("mobileSection.description")}
            </p>

            <div className="mt-6 flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl hover:bg-slate-800 transition text-sm">
                <Smartphone className="h-4 w-4" />
                {t("mobileSection.appStore")}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl hover:bg-slate-800 transition text-sm">
                <Smartphone className="h-4 w-4" />
                {t("mobileSection.googlePlay")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/40 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow
            iconName={t("integrationsSection.eyebrowIcon")}
            labelKey="integrationsSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-4">{t("integrationsSection.title")}</ScriptHeading>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t("integrationsSection.description")}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {integrationsList.map((integration: any, idx: number) => {
            const IconComponent = integration.name === "QuickBooks" ? Database :
              integration.name === "Xero" ? Cloud :
              integration.name === "Stripe" ? CreditCard :
              integration.name === "Slack" ? MessageCircle :
              integration.name === "Expensify" ? Receipt : Server;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`h-12 w-12 mx-auto rounded-xl bg-${integration.color}-100 dark:bg-${integration.color}-900/40 flex items-center justify-center mb-3`}>
                  <IconComponent className={`h-6 w-6 text-${integration.color}-600`} />
                </div>
                <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">{integration.name}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 px-6 py-12 text-center shadow-xl sm:px-10">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-emerald-500" />
            <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-cyan-500" />
          </div>

          <div className="relative">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl mx-auto mb-6">
              "{t("testimonialSection.quote")}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 overflow-hidden">
                <div className="h-full w-full bg-slate-300" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{t("testimonialSection.name")}</p>
                <p className="text-sm text-slate-500">{t("testimonialSection.role")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="get-started" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-emerald-900 to-cyan-900 px-6 py-16 text-center shadow-2xl sm:px-10">
          <div className="absolute inset-0 bg-noise opacity-5" />
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-emerald-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-cyan-500 rounded-full blur-3xl opacity-20" />

          <div className="relative">
            <Rocket className="h-12 w-12 text-emerald-400 mx-auto mb-6" />
            <ScriptHeading className="text-white text-4xl sm:text-5xl">
              {t("ctaBanner.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
              {t("ctaBanner.description")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 px-6 py-3 font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("ctaBanner.trialButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm text-white px-6 py-3 font-semibold border border-white/20 hover:bg-white/20 transition"
              >
                {t("ctaBanner.salesButton")}
              </Link>
            </div>

            <p className="mt-6 text-sm text-emerald-200/80">{t("ctaBanner.footerText")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

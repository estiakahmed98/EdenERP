"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
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
  CloudFog as CloudFogIcon,
  Thermometer,
  Compass,
  Navigation,
  Map,
  MapPin as MapPinIcon,
  Locate,
  Globe2,
  Earth,
  Plane,
  Train,
  Bus,
  Car as CarIcon,
  Bike,
  Footprints,
  Ship,
  Truck,
  Package,
  Box,
  Archive,
  Folder,
  File,
  FileText as FileTextIcon,
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
  FileText as FileTextIcon2,
  FileSignature,
  FileDigit,
  FileMinus2,
  FilePlus2,
  FileSearch2,
  FileLock2,
  FileCheck2 as FileCheckIcon,
  FileOutput as FileOutputIcon,
  FileInput as FileInputIcon,
  FileSymlink as FileSymlinkIcon,
  FileDiff as FileDiffIcon,
  FileBadge as FileBadgeIcon,
  FileStack as FileStackIcon,
  FileVolume as FileVolumeIcon,
  FileTerminal as FileTerminalIcon,
  FileCog as FileCogIcon,
  FileSliders as FileSlidersIcon,
  FileBarChart as FileBarChartIcon,
  FilePieChart as FilePieChartIcon,
  FileLineChart as FileLineChartIcon,
} from "lucide-react";

const expenseCategories = [
  { icon: Home, name: "Rent & Utilities", amount: "$2,500", percentage: 28, color: "emerald" },
  { icon: Briefcase, name: "Salaries", amount: "$15,000", percentage: 42, color: "purple" },
  { icon: Coffee, name: "Office Supplies", amount: "$450", percentage: 5, color: "cyan" },
  { icon: Car, name: "Travel", amount: "$1,200", percentage: 8, color: "orange" },
  { icon: Gift, name: "Marketing", amount: "$3,000", percentage: 12, color: "pink" },
  { icon: BookOpen, name: "Software", amount: "$800", percentage: 5, color: "blue" },
];

const recentExpenses = [
  { name: "Starbucks Coffee", amount: "$12.50", date: "Today", status: "approved", category: "Meals" },
  { name: "Uber Ride", amount: "$24.00", date: "Yesterday", status: "pending", category: "Travel" },
  { name: "Adobe Creative Cloud", amount: "$52.99", date: "Mar 12, 2024", status: "approved", category: "Software" },
  { name: "Amazon Office Supplies", amount: "$89.00", date: "Mar 10, 2024", status: "approved", category: "Supplies" },
  { name: "WeWork Meeting Room", amount: "$150.00", date: "Mar 8, 2024", status: "rejected", category: "Rent" },
];

const teamMembers = [
  { name: "Sarah Johnson", role: "CEO", avatar: "https://randomuser.me/api/portraits/women/1.jpg", pending: 3 },
  { name: "Michael Chen", role: "Finance", avatar: "https://randomuser.me/api/portraits/men/2.jpg", pending: 2 },
  { name: "Emily Davis", role: "Marketing", avatar: "https://randomuser.me/api/portraits/women/3.jpg", pending: 1 },
  { name: "James Wilson", role: "Sales", avatar: "https://randomuser.me/api/portraits/men/4.jpg", pending: 4 },
];

function ScriptHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
      <span className="text-emerald-500">{icon}</span>
      {label}
    </div>
  );
}

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.12),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.1),transparent_24%)]" />
        
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-12">
            {/* Left Content */}
            <div className="max-w-xl space-y-8">
              <SectionEyebrow icon={<Receipt className="h-4 w-4" />} label="Smart Expense Management" />
              
              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                  Stop chasing
                  <br />
                  <span className="text-emerald-600" style={{ fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive' }}>
                    paper receipts
                  </span>
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-slate-600">
                  Centralize and manage your expenses with company cards, spending controls, and approvals.
                  Capture bills, sync with accounting, and streamline customer invoicing.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#get-started"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:text-emerald-600"
                >
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {teamMembers.slice(0, 4).map((member, i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-2 text-sm text-slate-600">from 15,000+ businesses</span>
                </div>
              </div>
            </div>

            {/* Right - Expense Dashboard */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -top-6 -right-8 h-32 w-32 rounded-full bg-emerald-100 blur-3xl" />
              <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-purple-100 blur-3xl" />
              
              <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-linear-to-r from-emerald-600 to-cyan-600 px-5 py-3">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      <span className="text-sm font-semibold">Expense Dashboard</span>
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
                
                {/* Dashboard Content */}
                <div className="p-5">
                  {/* Total Spent Card */}
                  <div className="bg-linear-to-br from-emerald-50 to-cyan-50 rounded-xl p-4 mb-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Total Spent This Month</p>
                    <p className="text-3xl font-bold text-slate-900">$23,847.50</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600">+12.5% from last month</span>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-500">Cards in Use</p>
                      <p className="text-xl font-bold text-slate-900">24</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-500">Pending Approvals</p>
                      <p className="text-xl font-bold text-amber-600">8</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-500">Auto-Matched</p>
                      <p className="text-xl font-bold text-emerald-600">94%</p>
                    </div>
                  </div>
                  
                  {/* Recent Expenses */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recent Expenses</p>
                    {recentExpenses.slice(0, 3).map((expense, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition">
                        <div className="flex items-center gap-2">
                          <div className={`h-8 w-8 rounded-lg ${
                            expense.status === 'approved' ? 'bg-emerald-100' : 
                            expense.status === 'pending' ? 'bg-amber-100' : 'bg-red-100'
                          } flex items-center justify-center`}>
                            <Receipt className={`h-4 w-4 ${
                              expense.status === 'approved' ? 'text-emerald-600' : 
                              expense.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                            }`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{expense.name}</p>
                            <p className="text-xs text-slate-500">{expense.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900">{expense.amount}</p>
                          <p className={`text-xs ${
                            expense.status === 'approved' ? 'text-emerald-600' : 
                            expense.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                          }`}>{expense.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-3 -right-4 bg-white rounded-full px-3 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium">Real-time sync</span>
              </div>
              <div className="absolute -bottom-3 -left-4 bg-white rounded-full px-3 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4 text-cyan-600" />
                <span className="text-xs font-medium">Auto-categorized</span>
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
            <SectionEyebrow icon={<CreditCard className="h-4 w-4" />} label="Company Cards" />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Spending control at your fingertips
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Issue virtual and physical cards with custom spending limits. Control where and
              how your team spends, with real-time notifications and automatic reconciliation.
            </p>
            
            <div className="mt-6 space-y-4">
              {[
                { icon: Lock, text: "Set custom spending limits per card", color: "emerald" },
                { icon: Clock, text: "Real-time transaction alerts", color: "cyan" },
                { icon: Shield, text: "Merchant category controls", color: "purple" },
                { icon: RefreshCw, text: "Auto-reconciliation with receipts", color: "blue" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
                    <item.icon className={`h-3 w-3 text-${item.color}-600`} />
                  </div>
                  <span className="text-slate-700">{item.text}</span>
                </div>
              ))}
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
              <div className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-white/60 text-xs">Company Card</p>
                    <p className="text-white font-semibold text-lg mt-1">Adon ERP • Marketing</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-white/40" />
                </div>
                <div className="mb-8">
                  <p className="text-white/60 text-xs">Card Number</p>
                  <p className="text-white font-mono text-lg">**** **** **** 4242</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-white/60 text-xs">Limit</p>
                    <p className="text-white font-semibold">$5,000/month</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Spent</p>
                    <p className="text-emerald-400 font-semibold">$3,247/5,000</p>
                  </div>
                </div>
                <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 h-20 w-20 bg-emerald-100 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Smart Capture Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50/50 rounded-3xl my-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b px-5 py-3">
                <div className="flex items-center gap-2">
                  <Scan className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Smart Receipt Capture</span>
                </div>
              </div>
              <div className="p-5">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Camera className="h-8 w-8 text-emerald-600" />
                  </div>
                  <p className="text-slate-600 mb-2">Drag & drop or click to upload</p>
                  <p className="text-xs text-slate-400">Supports PDF, PNG, JPG up to 10MB</p>
                  <button className="mt-4 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                    Upload Receipt
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-emerald-50 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">AI-powered data extraction</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-cyan-50 rounded-lg">
                    <Sparkles className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">98% recognition accuracy</span>
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
            <SectionEyebrow icon={<Camera className="h-4 w-4" />} label="Smart Capture" />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Scan. Snap. Submit.
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Take a photo of any receipt and our AI automatically extracts merchant, amount, date,
              and category. No more manual data entry or lost receipts.
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-emerald-600">98%</div>
                <div className="text-xs text-slate-500">Recognition Rate</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-cyan-600">3s</div>
                <div className="text-xs text-slate-500">Processing Time</div>
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
            <SectionEyebrow icon={<Users className="h-4 w-4" />} label="Approval Workflow" />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Smart approvals, zero delays
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Set up custom approval rules based on amount, department, or category.
              Managers get instant notifications and can approve or reject in one click.
            </p>
            
            <div className="mt-6 space-y-3">
              {[
                "Multi-level approval chains",
                "Auto-approve for low amounts",
                "Real-time notifications",
                "Audit trail for every expense",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-slate-700">{feature}</span>
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
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b px-5 py-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Pending Approvals</span>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                        <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-amber-600">{member.pending} pending</span>
                      <button className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">
                        Review
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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50/50 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow icon={<PieChart className="h-4 w-4" />} label="Spending Insights" />
          <ScriptHeading className="mt-4">
            See where your money goes
          </ScriptHeading>
          <p className="mt-4 text-lg text-slate-600">
            Auto-categorized expenses with visual breakdowns and trends.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expenseCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl bg-${category.color}-100 flex items-center justify-center`}>
                    <category.icon className={`h-5 w-5 text-${category.color}-600`} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{category.name}</p>
                    <p className="text-xs text-slate-500">{category.amount}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-600">{category.percentage}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
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
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="bg-linear-to-r from-emerald-600 to-cyan-600 p-4">
                    <div className="flex items-center justify-between text-white">
                      <Smartphone className="h-5 w-5" />
                      <span className="text-sm font-semibold">Expense Tracker</span>
                      <Bell className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-emerald-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">Receipt scanned</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Starbucks Coffee</span>
                          <span>$12.50</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uber Ride</span>
                          <span>$24.00</span>
                        </div>
                        <div className="border-t pt-1 flex justify-between font-semibold text-sm">
                          <span>Total</span>
                          <span>$36.50</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium">
                      Submit for Approval
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
            <SectionEyebrow icon={<Smartphone className="h-4 w-4" />} label="Mobile App" />
            <ScriptHeading className="mt-4 text-3xl sm:text-4xl">
              Expenses on the <span className="text-emerald-600">go</span>
            </ScriptHeading>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Capture receipts, track mileage, and submit expenses from anywhere.
              Our mobile app makes expense reporting effortless.
            </p>
            
            <div className="mt-6 flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition text-sm">
                <Apple className="h-4 w-4" />
                App Store
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition text-sm">
                <Smartphone className="h-4 w-4" />
                Google Play
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50/50 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow icon={<RefreshCw className="h-4 w-4" />} label="Integrations" />
          <ScriptHeading className="mt-4">
            Connect with your stack
          </ScriptHeading>
          <p className="mt-4 text-lg text-slate-600">
            Seamless integration with your favorite tools and accounting software.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { name: "QuickBooks", icon: Database, color: "emerald" },
            { name: "Xero", icon: Cloud, color: "cyan" },
            { name: "Stripe", icon: CreditCard, color: "purple" },
            { name: "Slack", icon: MessageCircle, color: "blue" },
            { name: "Expensify", icon: Receipt, color: "orange" },
            { name: "SAP", icon: Server, color: "indigo" },
          ].map((integration, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={`h-12 w-12 mx-auto rounded-xl bg-${integration.color}-100 flex items-center justify-center mb-3`}>
                <integration.icon className={`h-6 w-6 text-${integration.color}-600`} />
              </div>
              <p className="font-semibold text-sm text-slate-900">{integration.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-100 to-white px-6 py-12 text-center shadow-xl sm:px-10">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-emerald-500" />
            <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-cyan-500" />
          </div>
          
          <div className="relative">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-3xl mx-auto mb-6">
              "Adon ERP transformed how we manage expenses. We've cut processing time by 75%
              and eliminated paper receipts entirely. The AI capture is incredibly accurate."
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 overflow-hidden">
                <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Sarah" className="h-full w-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Sarah Johnson</p>
                <p className="text-sm text-slate-500">CFO, TechFlow Solutions</p>
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
              Free, forever, with unlimited cards
            </ScriptHeading>
            <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
              Join thousands of businesses that have simplified their expense management.
              Start your journey today.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3 font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm text-white px-6 py-3 font-semibold border border-white/20 hover:bg-white/20 transition"
              >
                Contact Sales
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-emerald-200/80">
              No credit card required • Free forever plan • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CheckCircle2,
  Globe2,
  Mail,
  MessageCircle,
  MonitorPlay,
  Play,
  Sparkles,
  Star,
  Users,
  Video,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face",
];

const features = [
  {
    title: "Direct messages",
    description: "Private 1-to-1 message channels.",
  },
  {
    title: "WhatsApp",
    description: "Exchange messages with customers in one place.",
  },
  {
    title: "Channel communication",
    description: "Broadcast company updates, projects, and team news.",
  },
  {
    title: "Voice & live chat",
    description: "Keep external and internal users connected.",
  },
  {
    title: "Video conferencing",
    description: "Video calls directly from conversations.",
  },
  {
    title: "Notifications",
    description: "Never miss important messages or mentions.",
  },
];

const apps = [
  { title: "Inventory", description: "Discuss stock updates", icon: BarChart3 },
  { title: "Website", description: "Live chat with visitors", icon: Globe2 },
  { title: "Accounting", description: "Talk about invoices", icon: Mail },
  { title: "SMS", description: "Send quick messages", icon: MessageCircle },
  { title: "Marketing", description: "Plan campaigns", icon: Zap },
];

export default function DiscussLandingPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Discuss{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="text-amber-500 dark:text-amber-400">
                where work happens
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Adon Discuss is the fully integrated communication hub for messages,
            channels, calls, notifications, and business conversations.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              Start now
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              Meet an advisor
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    Discuss
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    Inbox / Channels / Messages / Meetings
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  New
                </button>
              </div>

              <div className="grid bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6 lg:grid-cols-[220px_1fr_220px]">
                <aside className="rounded-xl bg-white dark:bg-slate-800 p-4 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <p className="mb-4 font-bold text-slate-900 dark:text-white">
                    Channels
                  </p>

                  {["General", "Marketing", "Sales", "Support", "Project"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={`mb-2 rounded-md px-3 py-2 text-xs font-bold ${
                          index === 0
                            ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                            : "bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        # {item}
                      </div>
                    ),
                  )}
                </aside>

                <div className="mt-5 rounded-xl bg-white dark:bg-slate-800 p-5 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 lg:mx-5 lg:mt-0">
                  <div className="mb-5 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                    <p className="font-bold text-slate-900 dark:text-white">
                      Company updates
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Share information, project progress, files, and decisions
                      in one place.
                    </p>
                  </div>

                  {[
                    [
                      "Audrey Peterson",
                      "The new dashboard is ready for review.",
                    ],
                    [
                      "Mitchell Admin",
                      "Great work! Please share it with sales.",
                    ],
                    ["Joel Willis", "I added the report and screenshots."],
                  ].map(([name, message], index) => (
                    <div key={message} className="mb-4 flex gap-3">
                      <img
                        src={avatars[index]}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="rounded-xl bg-[#e9fbf8] dark:bg-[#0a2a2d] px-4 py-3">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {name}
                        </p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <aside className="mt-5 rounded-xl bg-white dark:bg-slate-800 p-4 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 lg:mt-0">
                  <p className="mb-4 font-bold text-slate-900 dark:text-white">
                    Online
                  </p>

                  {avatars.slice(0, 5).map((avatar, index) => (
                    <div key={avatar} className="mb-3 flex items-center gap-3">
                      <img
                        src={avatar}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          User {index + 1}
                        </p>
                        <p className="text-[10px] text-emerald-500 dark:text-emerald-400">
                          Online
                        </p>
                      </div>
                    </div>
                  ))}
                </aside>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Adon Discuss: a fully{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">integrated</span>
            </HandUnderline>
            <br />
            communication hub
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-14 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              {[
                "General company updates",
                "Marketing campaign",
                "Customer request",
                "Project discussion",
                "Support escalation",
              ].map((item, index) => (
                <div
                  key={item}
                  className="mb-3 flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-left"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#714b67] text-xs font-bold text-white dark:bg-[#8a5a7e]">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-left text-sm leading-7 text-slate-600 dark:text-slate-300">
              Bring channels, messages, meetings, notifications, and business
              records together without switching between different tools.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Create message
              <br />
              channels to reach
              <br />
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">the masses</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Group everyone into channels for company-wide announcements,
              focused project updates, or customer-facing communication.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
              <p className="font-bold text-slate-900 dark:text-white">
                #general
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-5">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                New office launch
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                We are excited to share photos from our new workspace.
              </p>

              <div className="mt-5 h-48 rounded-xl bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Adon Discuss is integrated throughout all
            <br />
            the{" "}
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="dark:text-rose-200">Adon apps</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Communicate with every single Adon app.
          </p>

          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white">
                  Sales Order
                </p>
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Discuss
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-[1fr_260px]">
                <div className="space-y-3">
                  {["Customer", "Quotation", "Total", "Status"].map((item) => (
                    <div
                      key={item}
                      className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4"
                    >
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                        {item}
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                        Connected business record
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-[#e9fbf8] dark:bg-[#0a2a2d] p-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Discuss thread
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Ask questions, mention team members, and keep decisions
                    attached to the document.
                  </p>
                </div>
              </div>
            </div>

            <DashedArrow className="mx-auto mt-12 h-24 w-24 rotate-90 text-slate-300 dark:text-slate-600" />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              The Discuss app is the central
              <br />
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">communications</span>
              </HandUnderline>{" "}
              hub in Adon
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Access your conversations from every business workflow and keep
              every team connected around shared records.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                "Sales",
                "Inventory",
                "Project",
                "Accounting",
                "Website",
                "CRM",
              ].map((app, index) => (
                <div
                  key={app}
                  className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                    {app}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Connected
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-2 gap-3">
              {avatars.slice(0, 4).map((avatar, index) => (
                <div
                  key={avatar}
                  className="relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800"
                >
                  <img
                    src={avatar}
                    alt=""
                    className="h-40 w-full object-cover"
                  />

                  <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">
                    User {index + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 rounded-lg bg-slate-900 dark:bg-slate-800 p-4 text-white">
              <Video className="h-5 w-5" />
              <span className="text-sm font-bold">Video meeting</span>
            </div>
          </div>

          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Video meetings for internal
              <br />
              and external users!
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Meet with colleagues, partners, customers, and teams without
              leaving the communication workspace.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            #Message_channels for targeted{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="dark:text-amber-200">group</span>
            </HandUnderline>
            <br />
            communications!
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Organize communication around teams, topics, announcements, and
            customer groups.
          </p>

          <div className="mx-auto mt-14 max-w-3xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
              <p className="font-bold text-slate-900 dark:text-white">
                #coffee-lovers
              </p>
            </div>

            <div className="rounded-xl bg-[#e9fbf8] dark:bg-[#0a2a2d] p-5">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Team update
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Here is the latest campaign concept. Please review and share
                your comments before tomorrow.
              </p>

              <div className="mt-5 h-56 rounded-xl bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <p className="mb-5 font-bold text-slate-900 dark:text-white">
              Inbox
            </p>

            {[
              "You were mentioned in Sales Order",
              "New message in Marketing",
              "Customer replied to your thread",
            ].map((item) => (
              <div
                key={item}
                className="mb-3 rounded-lg bg-[#e9fbf8] dark:bg-[#0a2a2d] px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>

          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Notifications all in{" "}
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">one place</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Never lose track of important messages, mentions, assignments, and
              updates from every Adon app.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute right-0 top-1/2 z-0 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Zap className="mb-6 h-12 w-12 text-sky-500 dark:text-sky-400" />

            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Effective communication
              <br />
              drives business success
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Collaborate naturally with colleagues whether you are discussing a
              project, a sale, a customer request, or a company announcement.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            {[
              ["Audrey Peterson", "Can we validate this quote today?"],
              ["Joel Willis", "Yes, I attached the latest file."],
              ["Mitchell Admin", "Approved. Please notify the customer."],
            ].map(([name, message], index) => (
              <div
                key={message}
                className="mb-4 flex gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4"
              >
                <img
                  src={avatars[index]}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            done{" "}
            <span className="relative inline-block">
              <span className="relative z-10">right.</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400 dark:bg-sky-500" />
            </span>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">need</span>
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">app.</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Expand as you grow.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            See all Apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt=""
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
                className="absolute h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67] dark:bg-[#9b6a8f]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                “
              </div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  The easy to use interface lets users discuss tasks and
                  projects while keeping business communication organized.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[4]}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Nicolas Martin
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Operations manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400 dark:text-amber-500">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Reignite the spark
              <br />
              of accomplishment
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              Start now
            </Link>

            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500"></p>
          </div>
        </div>
      </section>
    </main>
  );
}

function DashedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 25C75 30 105 58 102 91C99 120 70 138 36 130"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="10 14"
      />
      <path
        d="M37 130L57 116M37 130L52 151"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

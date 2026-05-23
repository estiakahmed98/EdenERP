"use client";

import Link from "next/link";
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

const features = [
  {
    title: "Canned responses",
    description:
      "Replace frequent replies with reusable answers and reply faster.",
  },
  {
    title: "3rd Party Integration",
    description:
      "Connect Live Chat to website, ecommerce, CRM, helpdesk, and more.",
  },
  {
    title: "Search for tickets",
    description:
      "Find previous conversations and tickets without losing context.",
  },
  {
    title: "Route and analyze performance",
    description: "Measure response time, satisfaction, and agent productivity.",
  },
  {
    title: "Multi channel management",
    description:
      "Centralize chat, website conversations, support messages, and leads.",
  },
  {
    title: "Smart chat requests",
    description:
      "Assign conversations to the right team members automatically.",
  },
];

const apps = [
  {
    title: "Website",
    description: "Create amazing websites",
    icon: MonitorSmartphone,
  },
  {
    title: "CRM",
    description: "Track leads and customers",
    icon: BadgeCheck,
  },
  {
    title: "Online Appointment",
    description: "Book meetings online",
    icon: TicketCheck,
  },
  {
    title: "Helpdesk",
    description: "Help your customers",
    icon: Headphones,
  },
  {
    title: "Chat Visitor",
    description: "Track website conversations",
    icon: MessageCircle,
  },
];

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

export default function LiveChatLandingSections() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Every chat{" "}
            <HandUnderline color="bg-amber-300">
              <span className="text-amber-500">has potential</span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Turn visitors into leads, customers, and loyal fans. Answer
            questions, solve problems, and build better relationships from one
            simple chat workspace.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67]"
            >
              Watch a demo
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Free, forever, with unlimited users
          </p>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="relative min-h-[440px] bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1400&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/45" />

                <div className="relative grid min-h-[440px] gap-8 p-7 lg:grid-cols-[1fr_1.1fr]">
                  <div className="flex flex-col justify-center text-left text-white">
                    <p
                      className="text-xl font-bold text-orange-200"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      Monkey Coffee Lab
                    </p>

                    <h2 className="mt-8 max-w-xs text-5xl font-bold leading-none">
                      Superior Sips
                    </h2>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
                      Give visitors instant answers while they browse your
                      store.
                    </p>

                    <button className="mt-8 w-fit rounded-md bg-orange-500 px-5 py-3 text-sm font-bold text-white">
                      Ask us anything
                    </button>
                  </div>

                  <div className="grid items-end gap-4 md:grid-cols-2">
                    {[
                      {
                        name: "Admin Peterson",
                        color: "bg-[#714b67]",
                        messages: [
                          "Hi! Are you looking for coffee beans?",
                          "I can recommend our best blend.",
                          "Would you like help placing an order?",
                        ],
                      },
                      {
                        name: "Visitor #87",
                        color: "bg-sky-500",
                        messages: [
                          "Hello, do you ship internationally?",
                          "What is your best seller?",
                          "Thanks, that helped!",
                        ],
                      },
                    ].map((chat) => (
                      <div
                        key={chat.name}
                        className="overflow-hidden rounded-xl bg-white shadow-2xl"
                      >
                        <div
                          className={`flex items-center justify-between px-4 py-3 text-white ${chat.color}`}
                        >
                          <span className="text-sm font-bold">{chat.name}</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        </div>

                        <div className="space-y-3 p-4 text-left">
                          {chat.messages.map((message, index) => (
                            <div
                              key={message}
                              className={`rounded-2xl px-4 py-3 text-xs leading-5 ${
                                index === 1
                                  ? "ml-8 bg-emerald-50 text-emerald-700"
                                  : "mr-8 bg-slate-50 text-slate-600"
                              }`}
                            >
                              {message}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            <HandUnderline color="bg-rose-300">
              <span>Answer</span>
            </HandUnderline>{" "}
            questions, nurture leads, and{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>solve</span>
            </HandUnderline>{" "}
            problems instantly
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Manage multiple conversations at once. Keep customer history,
            product context, and support information visible while chatting.
          </p>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              {
                name: "Admin Peterson",
                color: "bg-[#714b67]",
                avatar: avatars[0],
              },
              {
                name: "Visitor #87",
                color: "bg-sky-500",
                avatar: avatars[1],
              },
            ].map((chat, index) => (
              <div
                key={chat.name}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_25px_70px_rgba(15,23,42,0.10)]"
              >
                <div
                  className={`flex items-center justify-between px-5 py-4 text-white ${chat.color}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="h-9 w-9 rounded-full border-2 border-white object-cover"
                    />
                    <span className="font-bold">{chat.name}</span>
                  </div>
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div className="space-y-4 p-5">
                  <div className="text-center text-xs font-bold text-slate-400">
                    Today
                  </div>

                  {[
                    "Do you have a recommendation for this product?",
                    "Yes, this option is best for your use case.",
                    "Great, I will order now!",
                  ].map((message, messageIndex) => (
                    <div
                      key={message}
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                        messageIndex === 1
                          ? "ml-10 bg-emerald-50 text-emerald-700"
                          : "mr-10 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {message}
                    </div>
                  ))}

                  <div className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-3">
                    <span className="text-sm text-slate-400">
                      Type your reply...
                    </span>
                    <Sparkles className="ml-auto h-4 w-4 text-amber-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="absolute left-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="grid gap-5 lg:grid-cols-[1fr_180px]">
              <div className="text-left">
                <p className="font-bold text-slate-900">Opportunity</p>
                <div className="mt-5 space-y-3">
                  {["Customer", "Email", "Phone", "Product", "Priority"].map(
                    (item) => (
                      <div key={item}>
                        <div className="mb-1 text-xs font-bold text-slate-400">
                          {item}
                        </div>
                        <div className="h-9 rounded-md bg-slate-50 ring-1 ring-slate-100" />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-100">
                <div className="bg-[#714b67] px-3 py-2 text-xs font-bold text-white">
                  Chat
                </div>
                <div className="space-y-2 p-3">
                  {["Hello!", "Can you help?", "Sure, one moment."].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={`rounded-xl px-3 py-2 text-xs ${
                          index === 2
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-50 text-slate-500"
                        }`}
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">Never miss</span>
                <span className="absolute bottom-2 left-0 h-4 w-full rounded-full bg-amber-300" />
              </span>{" "}
              a<br />
              message again
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Get real-time notifications, route conversations to the right
              team, and keep every visitor request connected to your business
              records.
            </p>

            <DashedArrow className="mt-10 h-40 w-40 text-slate-300" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Help is just a click away
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Transform chats into support tickets instantly. Keep customer
              requests, internal notes, team collaboration, and resolution
              status in one clear workflow.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="mb-5 grid gap-4 sm:grid-cols-3">
              {["Open", "Pending", "Solved"].map((status, index) => (
                <div
                  key={status}
                  className="rounded-lg bg-slate-50 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-slate-900">
                    {[24, 11, 87][index]}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    {status}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_210px]">
              <div className="space-y-3">
                {[
                  "Customer cannot login",
                  "Payment failed",
                  "Shipping question",
                  "Product recommendation",
                ].map((ticket, index) => (
                  <div
                    key={ticket}
                    className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-slate-700">
                      {ticket}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                        index === 0
                          ? "bg-rose-50 text-rose-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {index === 0 ? "Urgent" : "Normal"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-500">
                  Latest conversation
                </p>
                <div className="mt-4 space-y-2">
                  <div className="rounded-xl bg-white px-3 py-2 text-xs text-slate-500">
                    Can I update my order?
                  </div>
                  <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                    Yes, I can help.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Turn “visitor” into{" "}
            <span className="relative inline-block px-3">
              <span className="relative z-10">“customer”</span>
              <span className="absolute inset-x-0 bottom-0 h-12 rounded-[35%] bg-amber-300" />
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-slate-600">
            Convert website visitors into opportunities with live chat,
            automatic lead creation, customer records, and sales follow-up.
          </p>

          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
            <div className="border-b border-slate-100 bg-[#714b67] px-6 py-4 text-left text-white">
              <p className="font-bold">Audrey Peterson&apos;s opportunity</p>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[1fr_270px]">
              <div className="text-left">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Expected Revenue", "$50,000"],
                    ["Probability", "37.00%"],
                    ["Customer", "Audrey Peterson"],
                    ["Stage", "Qualified"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-400">
                        {label}
                      </p>
                      <p className="mt-2 font-bold text-slate-900">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg bg-slate-50 p-5">
                  <p className="text-sm font-bold text-slate-900">Notes</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Customer asked about pricing, delivery time, and product
                    recommendations.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-100">
                <div className="bg-[#714b67] px-4 py-3 text-left text-sm font-bold text-white">
                  Live Chat
                </div>

                <div className="space-y-3 p-4 text-left">
                  {[
                    "I want to become a customer.",
                    "Great! I can create an opportunity.",
                    "Please send the proposal.",
                  ].map((message, index) => (
                    <div
                      key={message}
                      className={`rounded-2xl px-4 py-3 text-xs leading-5 ${
                        index === 1
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {message}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <FloatingNote className="mx-auto mt-12 z-30" />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 flex justify-end lg:hidden">
              <UserPlus className="h-12 w-12 text-amber-400" />
            </div>

            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">
                  Meet Chatbot, your new teammate
                </span>
                <span className="absolute -bottom-3 left-0 h-2 w-full rounded-full border-b-[9px] border-dotted border-sky-400" />
              </span>
            </h2>

            <p className="mt-10 max-w-xl text-sm leading-7 text-slate-600">
              From greeting visitors to answering common questions, your chatbot
              can guide users, qualify leads, and escalate important
              conversations to your team.
            </p>
          </div>

          <div className="relative">
            <UserPlus className="absolute -right-8 -top-16 hidden h-16 w-16 text-amber-400 lg:block" />

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#714b67] text-white">
                  <Bot className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Chatbot flows</p>
                  <p className="text-sm text-slate-500">
                    Automated conversation paths
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Welcome message",
                  "Ask visitor goal",
                  "Collect email",
                  "Recommend product",
                  "Create ticket",
                  "Route to agent",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-xs font-bold text-[#714b67]">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-700">
                        {step}
                      </span>
                    </div>

                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>

            <FloatingNote className="absolute -left-16 -top-24 hidden lg:flex z-30" />
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3]" />
            </span>
            <br />
            done{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>right.</span>
            </HandUnderline>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-[#02cfc3]">
              <span>need</span>
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-300">
              <span>app.</span>
            </HandUnderline>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Expand as you grow.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">{app.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all Apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-slate-100"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>

              <div>
                <p className="text-base leading-8 text-slate-700">
                  From what I have seen so far, Adon solved our intent problem
                  better than any information workflow. It helped our team
                  understand customers and continue the conversation smoothly.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900">Mike Hills</p>
                    <p className="text-sm text-slate-500">Sales lead</p>
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
              className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your{" "}
              <HandUnderline color="bg-[#02cfc3]">
                <span className="text-[#02a6a6]">growth</span>
              </HandUnderline>{" "}
              potential
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <p className="mt-3 text-xs text-slate-400">
              
            </p>
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

function FloatingNote({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex w-fit items-center rounded-full bg-white py-3 pl-16 pr-8 text-sm italic text-slate-700 shadow-xl ring-1 ring-slate-100 ${className}`}
    >
      <span className="absolute -left-10 -z-10 h-20 w-32 rotate-[-14deg] rounded-[35%] bg-rose-400" />
      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt="User"
        className="absolute left-3 h-12 w-12 rounded-full object-cover"
      />
      <MessageCircle className="absolute -top-9 left-9 h-8 w-8 text-slate-900" />
      Share information and make connections
    </div>
  );
}

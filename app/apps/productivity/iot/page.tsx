"use client";

import Link from "next/link";

// Full Tailwind JSX page for IoT / Defence Robotics landing page.
// Keep your existing Header/Footer outside this component.

export default function IoTDefencePage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative bg-white pt-20 text-center">
        <div className="mx-auto max-w-6xl px-4 pb-24">
          <h1
            className="text-5xl font-bold leading-tight sm:text-6xl"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            Easily connect to the{" "}
            <span className="relative inline-block text-sky-500">
              Internet of Things
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-300" />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600">
            Build connected drone, robotics, missile-control monitoring, and air
            defence operations with one secure IoT command system.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white">
              Start now - it&apos;s free
            </button>
            <button className="rounded-md bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700">
              Meet an advisor
            </button>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
              <SparklesIcon />
            </div>

            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 p-8 text-left text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-sky-300">
                      EDEN DEFENCE IoT
                    </p>
                    <h2 className="mt-3 text-3xl font-black">
                      Connected Operations Console
                    </h2>
                  </div>
                  <div className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold">
                    LIVE COMMAND
                  </div>
                </div>
              </div>

              <div className="grid gap-4 bg-[#f7f8fb] p-6 md:grid-cols-4">
                {[
                  ["Drone Fleet", "42 online", "bg-sky-100 text-sky-700"],
                  ["Robots", "18 active", "bg-emerald-100 text-emerald-700"],
                  ["Air Defence", "7 zones", "bg-amber-100 text-amber-700"],
                  ["Secure Links", "99.9%", "bg-rose-100 text-rose-700"],
                ].map(([title, value, color]) => (
                  <div key={title} className="rounded-xl bg-white p-5 shadow-sm">
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
                    >
                      <span className="text-xl">✦</span>
                    </div>
                    <p className="font-bold text-slate-900">{title}</p>
                    <p className="mt-2 text-sm text-slate-500">{value}</p>
                  </div>
                ))}
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#714b67] shadow-xl">
                ▶
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* MADE EASY */}
      <section className="bg-white py-24 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold">IoT Defence Made Easy</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">
            Connect mission-critical hardware, field robots, autonomous devices,
            sensors, cameras, and secure command modules to one platform.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              ["Drones", "Monitor fleets, telemetry, battery, location, and task status."],
              ["Robots", "Control industrial and field robotics workflows from one dashboard."],
              ["Air Defence", "Track zones, alerts, assets, maintenance, and operational readiness."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-100">
                <div className="h-40 rounded-lg bg-linear-to-br from-slate-100 to-slate-200" />
                <h3 className="mt-5 font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTIVITY */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold">Increased productivity is easy!</h2>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {[
              ["1. Connect", "Register secure field devices, gateways, robots, or drone stations."],
              ["2. Discover Devices", "Auto-detect active devices, sensors, signals, and operating health."],
              ["3. Link Operations", "Attach devices to missions, maintenance orders, projects, or command zones."],
              ["4. Start Using!", "Visualize live status, alerts, logs, and performance from one workspace."],
            ].map(([title, desc]) => (
              <div key={title} className="text-left">
                <h3 className="mb-4 text-sm font-bold text-[#02a6a6]">{title}</h3>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="h-40 rounded-lg bg-slate-100" />
                  <p className="mt-5 text-sm leading-6 text-slate-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLAWLESS INTEGRATION */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Flawless integration</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Connect drones, robots, surveillance sensors, telemetry systems,
              inspection modules, logistics devices, and defence field hardware
              to your business processes.
            </p>

            <div className="mt-8 space-y-3">
              {["Drone command", "Robot fleet", "Air defence sensors", "Maintenance alerts"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Device Health", "98%"],
                ["Active Missions", "24"],
                ["Secure Channels", "128"],
                ["Alerts Resolved", "91%"],
              ].map(([title, value]) => (
                <div key={title} className="rounded-xl bg-slate-50 p-5">
                  <p className="text-sm font-bold text-slate-500">{title}</p>
                  <p className="mt-3 text-3xl font-black text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEFENCE SYSTEM */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2
            className="text-5xl font-bold leading-tight"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            Built for{" "}
            <span className="relative inline-block">
              <span className="relative z-10">advanced operations</span>
              <span className="absolute inset-x-0 bottom-2 h-6 rounded-lg bg-amber-300" />
            </span>
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Drone Operations", "Fleet monitoring, remote diagnostics, route visibility, and mission readiness."],
              ["Robotics Control", "Industrial robots, inspection bots, ground units, and autonomous workflows."],
              ["Air Defence Monitoring", "Zone awareness, system health, alert status, and maintenance coordination."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl bg-[#f3f4f7] p-6">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#714b67] shadow-sm">
                  ✦
                </div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="rounded-t-[4rem] bg-[#f3f4f7] py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            All the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3]" />
            </span>
            <br />
            done{" "}
            <span className="relative inline-block">
              <span className="relative z-10">right.</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400" />
            </span>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {[
              ["IoT devices", "Wide range of supported devices."],
              ["Drone telemetry", "Track battery, location, altitude, status, and device health."],
              ["Robot operations", "Monitor robotic tasks, movements, diagnostics, and workflow status."],
              ["Secure connectivity", "Connect via WiFi, Bluetooth, USB, API, or secure gateway modules."],
              ["Quality checks", "Attach IoT alerts and quality control points to operations."],
              ["Mission dashboards", "Centralize field status, reports, alerts, and hardware readiness."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-slate-900">{title}</h3>
                  <StarIcon />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>

          <Link href="#" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]">
            See all features <span>→</span>
          </Link>
        </div>
      </section>

      {/* APPS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2
            className="text-4xl font-bold"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            One{" "}
            <span className="border-b-4 border-sky-300">need</span>, one{" "}
            <span className="border-b-4 border-sky-300">app.</span>
          </h2>

          <p className="mt-4 text-slate-600">Expand as you grow.</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Manufacturing",
              "Point of Sale",
              "Sales",
              "Inventory",
              "Purchase",
            ].map((app) => (
              <div key={app} className="rounded-xl bg-slate-50 p-5 shadow-sm">
                <div className="mb-3 h-10 w-10 rounded-lg bg-white shadow-sm" />
                <h3 className="font-bold text-slate-900">{app}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Connected operations
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24 text-center">
        <h2
          className="text-5xl font-bold leading-tight"
          style={{
            fontFamily:
              '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
          }}
        >
          Unleash
          <br />
          your{" "}
          <span className="text-[#02a6a6]">growth</span> potential
        </h2>

        <button className="mt-8 rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white">
          Start now - it&apos;s free
        </button>
      </section>
    </main>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-12 w-12" fill="none">
      <path d="M40 5V25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 55V75" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M5 40H25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M55 40H75" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return <span className="text-xl text-amber-400">★</span>;
}
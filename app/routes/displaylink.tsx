import { ExternalLink, Laptop, MonitorUp, PlugZap, RefreshCw, ShieldCheck } from "lucide-react";
import type { MetaFunction } from "react-router";

const macDownloadUrl =
  "https://www.synaptics.com/products/displaylink-graphics/downloads/macos";
const windowsDownloadUrl =
  "https://www.synaptics.com/products/displaylink-graphics/downloads/windows";

const setupSteps = [
  {
    title: "Plug in power and monitor cables",
    description:
      "Make sure the DisplayLink cube has power, then connect the monitor cable to the cube and turn the monitor on.",
  },
  {
    title: "Connect the cube to your laptop",
    description:
      "Use the USB-C or USB-A cable from the cube to your device. Wait a few seconds for your laptop to detect it.",
  },
  {
    title: "Install the DisplayLink driver",
    description:
      "Choose the Mac or Windows download below, install the driver, then restart if the installer asks you to.",
  },
  {
    title: "Approve screen recording on Mac",
    description:
      "On macOS, open System Settings if prompted and allow DisplayLink Manager to record the screen. This is required for external displays.",
  },
  {
    title: "Arrange your displays",
    description:
      "Open your display settings and choose whether to mirror your laptop or extend your desktop across the monitor.",
  },
];

const troubleshootingItems = [
  "Unplug the USB cable from your laptop, wait 10 seconds, then plug it back in.",
  "Check the monitor input source matches the cable connected to the cube.",
  "Restart DisplayLink Manager on Mac, or restart the laptop after installing the Windows driver.",
  "Try a different USB-C or USB-A port if your laptop has one.",
];

export const meta: MetaFunction = () => [
  { title: "DisplayLink Setup Guide | MLAI" },
  {
    name: "description",
    content:
      "A quick MLAI office guide for connecting Mac and Windows laptops to monitors through a DisplayLink cube.",
  },
];

function DownloadCard({
  label,
  description,
  href,
}: {
  label: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-36 flex-col justify-between rounded-lg border-2 border-black bg-white p-5 shadow-[6px_6px_0_0_#111827] transition duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#111827]"
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black text-gray-950">{label}</h2>
          <ExternalLink className="h-5 w-5 text-gray-900 transition group-hover:text-[#ff3d00]" aria-hidden="true" />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-700">{description}</p>
      </div>
      <span className="mt-5 inline-flex items-center text-sm font-bold text-[#4b0db3]">
        Open official Synaptics download
      </span>
    </a>
  );
}

export default function DisplayLinkTutorial() {
  return (
    <main className="min-h-screen bg-[var(--brutalist-beige)] text-gray-950">
      <section className="px-3 pb-3 pt-3 sm:px-4 sm:pt-4 lg:px-5 lg:pt-5">
        <div className="rounded-2xl bg-[#ff3d00] px-5 py-10 sm:rounded-[2rem] sm:px-8 sm:py-14 lg:px-12">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
                <MonitorUp className="h-4 w-4" aria-hidden="true" />
                MLAI office setup
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
                Connect your laptop with DisplayLink
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white sm:text-xl">
                Install the right driver, connect the DisplayLink cube, and get your laptop onto the monitor in a few minutes.
              </p>
            </div>

            <div className="rounded-lg border-2 border-black bg-white p-5 shadow-[8px_8px_0_0_#111827]">
              <div className="flex items-center gap-3">
                <PlugZap className="h-7 w-7 text-[#ff3d00]" aria-hidden="true" />
                <h2 className="text-xl font-black">Start here</h2>
              </div>
              <p className="mt-4 text-base leading-7 text-gray-700">
                You need the DisplayLink driver once per device. After that, most future monitor connections should work by plugging into the cube.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-bold">
                <a className="rounded-md bg-black px-4 py-3 text-center text-white transition hover:bg-[#4b0db3]" href={macDownloadUrl} target="_blank" rel="noopener noreferrer">
                  Mac driver
                </a>
                <a className="rounded-md bg-black px-4 py-3 text-center text-white transition hover:bg-[#4b0db3]" href={windowsDownloadUrl} target="_blank" rel="noopener noreferrer">
                  Windows driver
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-10 sm:px-4 lg:px-5">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
            <DownloadCard
              label="For Mac"
              description="Download DisplayLink Manager for macOS from Synaptics, then allow the requested screen permission when prompted."
              href={macDownloadUrl}
            />
            <DownloadCard
              label="For Windows"
              description="Download the DisplayLink driver for Windows from Synaptics, install it, then reconnect the cube if needed."
              href={windowsDownloadUrl}
            />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="rounded-lg border-2 border-black bg-[#4b0db3] p-6 text-white shadow-[6px_6px_0_0_#111827]">
              <Laptop className="h-10 w-10" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-black">Before you begin</h2>
              <ul className="mt-5 space-y-3 text-sm font-semibold leading-6">
                <li>Keep your laptop charger connected if possible.</li>
                <li>Close any private tabs before sharing or mirroring your screen.</li>
                <li>Ask an MLAI team member if you see an admin password prompt you do not recognise.</li>
              </ul>
            </aside>

            <div className="rounded-lg border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_#111827]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-7 w-7 text-[#4b0db3]" aria-hidden="true" />
                <h2 className="text-2xl font-black">Setup steps</h2>
              </div>
              <ol className="mt-6 space-y-5">
                {setupSteps.map((step, index) => (
                  <li key={step.title} className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff3d00] text-lg font-black text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-950">{step.title}</h3>
                      <p className="mt-1 text-base leading-7 text-gray-700">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 rounded-lg border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_#111827]">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-7 w-7 text-[#ff3d00]" aria-hidden="true" />
              <h2 className="text-2xl font-black">If the monitor does not appear</h2>
            </div>
            <ul className="mt-5 grid gap-3 text-base leading-7 text-gray-700 md:grid-cols-2">
              {troubleshootingItems.map((item) => (
                <li key={item} className="rounded-md bg-gray-100 p-4 font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

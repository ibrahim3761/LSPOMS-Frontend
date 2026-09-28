
import { Button } from "@/components/ui/button";
import {
  CalendarClock,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | LSPOMS",
  description:
    "LSPOMS brings load shedding schedules, outage reports and repair updates into one place for residents, technicians and administrators.",
};

// Same container as the header and footer so the edges line up
const container = "max-w-screen-2xl mx-auto px-6 lg:px-10";

const storyPoints = [
  "Schedules that stay current",
  "One report per fault, tracked until it is fixed",
  "Clear roles for residents, technicians and admins",
];

const features = [
  {
    icon: Zap,
    title: "Report an outage",
    description:
      "Tell us where the power is out and add the details. Your report is logged once and you can follow it until power returns.",
  },
  {
    icon: CalendarClock,
    title: "Check load shedding schedules",
    description:
      "See when your area is due to lose power, so you can plan around it instead of being caught out.",
  },
  {
    icon: Wrench,
    title: "Get a technician on the job",
    description:
      "Approved technicians pick up reported faults and post updates as they work.",
  },
  {
    icon: ShieldCheck,
    title: "Keep everything accountable",
    description:
      "Admins review reports, manage schedules and approve technicians, so nothing gets lost.",
  },
];

const steps = [
  {
    title: "Report",
    description:
      "A resident submits the location and details of the outage.",
  },
  {
    title: "Assign",
    description:
      "An admin reviews the report and assigns an approved technician.",
  },
  {
    title: "Resolve",
    description:
      "The technician posts progress until power is restored, and the resident sees each update.",
  },
];

export default function AboutUsPage() {
  return (
    <main>
      {/* Hero */}
      <section className={`${container} py-16 lg:py-24`}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Know when the power goes out, and when it comes back
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              LSPOMS is a load shedding and power outage management system.
              Residents report faults, check schedules and follow repairs,
              while technicians and admins keep the work moving.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                render={<Link href="/outages" />}
                nativeButton={false}
              >
                Report an outage
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/contact" />}
                nativeButton={false}
              >
                Contact us
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src="/images/hero.webp"
              alt="Power lines above a neighbourhood at dusk"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={`${container} pb-16 lg:pb-24`}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted lg:order-first">
            <Image
              src="/images/high.webp"
              alt="A technician repairing an electrical line"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-balance text-3xl font-bold tracking-tight">
              Why we built it
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Load shedding is hard to plan around when schedules change
              without notice and nobody knows whether a fault has been
              reported. People end up calling neighbours, refreshing social
              media, or waiting in the dark.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              LSPOMS puts schedules, reports and repair updates in one place,
              so residents, technicians and administrators all work from the
              same information.
            </p>
            <ul className="flex flex-col gap-3">
              {storyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="border-y bg-muted/40">
        <div
          className={`${container} grid gap-10 py-16 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:py-24`}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-balance text-3xl font-bold tracking-tight">
              What you can do on LSPOMS
            </h2>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              The platform is built around the people who deal with power cuts
              every day: the residents who live through them and the teams who
              fix them.
            </p>
          </div>

          <ul className="divide-y">
            {features.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="flex gap-4 py-6 first:pt-0 last:pb-0"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How an outage gets fixed */}
      <section className={`${container} py-16 lg:py-24`}>
        <h2 className="text-balance text-3xl font-bold tracking-tight">
          How an outage gets fixed
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="flex size-9 items-center justify-center rounded-full border text-sm font-medium">
                {index + 1}
              </span>
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Call to action */}
      <section className={`${container} pb-16 lg:pb-24`}>
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight">
            Join LSPOMS
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-primary-foreground/80">
            Create an account to report outages and follow schedules, or apply
            to work as a technician.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              variant="secondary"
              render={<Link href="/register" />}
              nativeButton={false}
            >
              Create an account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={<Link href="/apply" />}
              nativeButton={false}
            >
              Apply as a technician
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
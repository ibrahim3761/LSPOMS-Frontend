import { Button } from "@/components/ui/button";
import { createMetadata } from "@/utils/metadata.util";
import {
  BellRing,
  CalendarClock,
  ClipboardList,
  ShieldCheck,
  UserCheck,
  Wrench,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Services",
  description: "Explore our power outage management services including real-time tracking and premium subscriptions.",
  path: "/services",
});

const container = "max-w-screen-2xl mx-auto px-6 lg:px-10";

const services = [
  {
    icon: Zap,
    title: "Outage reporting",
    description:
      "Report a power outage in your area with the location and details, and follow it until it's resolved.",
    href: "/outages",
  },
  {
    icon: CalendarClock,
    title: "Load shedding schedules",
    description:
      "See planned outages for your area ahead of time, so you can plan around them instead of being caught out.",
    href: "/outages",
  },
  {
    icon: Wrench,
    title: "Technician dispatch",
    description:
      "Reported faults are assigned to an approved technician, who posts progress as the work happens.",
    href: "/apply",
  },
  {
    icon: BellRing,
    title: "Status updates",
    description:
      "Get updates on your report as its status changes, from submitted to assigned to resolved.",
    href: "/dashboard",
  },
  {
    icon: ClipboardList,
    title: "Fault history",
    description:
      "Every report you've filed stays on your account, so you can check what happened and when it was fixed.",
    href: "/dashboard",
  },
  {
    icon: ShieldCheck,
    title: "Verified technicians",
    description:
      "Technicians are reviewed and approved by an admin before they can be assigned to a report.",
    href: "/apply",
  },
];

const audiences = [
  {
    title: "Customers",
    description:
      "Report outages, check schedules for your area, and follow a report from submission to resolution.",
    actions: [
      { label: "Report an outage", href: "/dashboard/report-outage" },
      { label: "Create an account", href: "/register" },
    ],
  },
  {
    title: "Technicians",
    description:
      "Pick up assigned reports, post progress updates, and mark a job resolved once power is restored.",
    actions: [{ label: "Apply as a technician", href: "/apply" }],
  },
  {
    title: "Admins",
    description:
      "Review reports, assign technicians, manage schedules, and approve technician applications.",
    actions: [{ label: "Contact us", href: "/contact" }],
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className={`${container} py-16 lg:py-24`}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Everything you need to manage an outage
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              LSPOMS covers the full path from a reported fault to a
              restored connection: reporting, scheduling, dispatch and
              status updates, in one system.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" render={<Link href="/outages" />} nativeButton={false}>
                Report an outage
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/register" />}
                nativeButton={false}
              >
                Create an account
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src="/images/services.webp"
              alt="A technician checking an electrical panel"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-y bg-muted/40">
        <div className={`${container} py-16 lg:py-24`}>
          <h2 className="text-balance text-3xl font-bold tracking-tight">
            What LSPOMS handles
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="flex flex-col gap-3 rounded-2xl border bg-background p-6 transition-colors hover:border-primary/40"
              >
                <span className="flex size-10 items-center justify-center rounded-full border bg-muted">
                  <Icon className="size-4 text-primary" />
                </span>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className={`${container} py-16 lg:py-24`}>
        <h2 className="text-balance text-3xl font-bold tracking-tight">
          Built for every role
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
          Residents, technicians and admins each see the tools that matter to
          them.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="flex flex-col gap-4 rounded-2xl border p-6"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="size-5 text-primary" />
                <h3 className="text-lg font-medium">{audience.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {audience.description}
              </p>
              <div className="mt-auto flex flex-col gap-2 pt-2">
                {audience.actions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    size="sm"
                    className="w-fit"
                    render={<Link href={action.href} />}
                    nativeButton={false}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className={`${container} pb-16 lg:pb-24`}>
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-primary-foreground/80">
            Create an account to report outages and follow schedules, or
            apply to work as a technician.
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
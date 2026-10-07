import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Zap, AlertTriangle, CalendarClock } from "lucide-react";

// Same container as the header, footer and marketing pages so the edges line up
const container = "max-w-screen-2xl mx-auto px-6 lg:px-10";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-background py-8 lg:py-20 dark:from-indigo-950/20">
      <div className={container}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <div className="flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <Zap className="size-4" />
              Power Outage Management System
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Stay Informed About{" "}
              <span className="text-indigo-600">Power Outages</span> In Your
              Area
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground">
              Report unexpected outages, track scheduled maintenance, and get
              real-time notifications. Never be caught off guard by load
              shedding again.
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button
                size="lg"
                render={<Link href="/register" />}
                nativeButton={false}
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/outages" />}
                nativeButton={false}
              >
                View Outages
              </Button>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <div className="flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 text-sm backdrop-blur-sm">
                <AlertTriangle className="size-4 text-yellow-500" />
                Report Outages
              </div>
              <div className="flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 text-sm backdrop-blur-sm">
                <CalendarClock className="size-4 text-blue-500" />
                Scheduled Alerts
              </div>
              <div className="flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 text-sm backdrop-blur-sm">
                <Zap className="size-4 text-indigo-500" />
                Premium Notifications
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full lg:ml-auto lg:max-w-lg">
            {/* Decorative blurred accent behind the image */}
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-400/30 via-indigo-300/10 to-transparent blur-2xl" />

            <div className="relative aspect-[4/3] max-h-[420px] overflow-hidden rounded-3xl border bg-muted shadow-xl">
              <Image
                src="/images/high.webp"
                alt="A technician working on power lines"
                fill
                priority
                sizes="(min-width: 1024px) 512px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
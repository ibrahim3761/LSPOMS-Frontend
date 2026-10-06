import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, AlertTriangle, CalendarClock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-background dark:from-indigo-950/20">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          <Zap className="size-4" />
          Power Outage Management System
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Stay Informed About{" "}
          <span className="text-indigo-600">Power Outages</span>{" "}
          In Your Area
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl">
          Report unexpected outages, track scheduled maintenance, and get
          real-time notifications. Never be caught off guard by load shedding again.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" render={<Link href="/register" />} nativeButton={false}>
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/outages" />} nativeButton={false}>
            View Outages
          </Button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <AlertTriangle className="size-4 text-yellow-500" />
            Report Outages
          </div>
          <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <CalendarClock className="size-4 text-blue-500" />
            Scheduled Alerts
          </div>
          <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <Zap className="size-4 text-indigo-500" />
            Premium Notifications
          </div>
        </div>
      </div>
    </section>
  );
}
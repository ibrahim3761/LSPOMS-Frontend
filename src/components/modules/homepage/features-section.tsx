import { Zap, Bell, Shield, Clock, MapPin, CreditCard, CalendarClock } from "lucide-react";

const features = [
  {
    icon: <Bell className="size-6 text-indigo-500" />,
    title: "Real-time Notifications",
    description:
      "Get instant alerts when power outages are reported in your area. Never be caught off guard again.",
  },
  {
    icon: <CalendarClock className="size-6 text-indigo-500" />,
    title: "Scheduled Outage Alerts",
    description:
      "Know in advance when planned maintenance will affect your area so you can prepare.",
  },
  {
    icon: <Zap className="size-6 text-indigo-500" />,
    title: "Report Outages",
    description:
      "Quickly report unexpected power outages in your area and help your community stay informed.",
  },
  {
    icon: <MapPin className="size-6 text-indigo-500" />,
    title: "Area-based Tracking",
    description:
      "Track outages specific to your area. Filter by location to see what matters to you.",
  },
  {
    icon: <Shield className="size-6 text-indigo-500" />,
    title: "Verified Technicians",
    description:
      "Our approved technicians respond to outage reports and keep you updated on resolution progress.",
  },
  {
    icon: <CreditCard className="size-6 text-indigo-500" />,
    title: "Easy bKash Payment",
    description:
      "Subscribe to premium plans easily with bKash. Get invoices delivered straight to your email.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything You Need
          </h2>
          <p className="text-muted-foreground">
            A complete platform to manage and stay informed about power outages
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 rounded-lg border bg-background p-6"
            >
              <div className="flex items-center justify-center size-12 rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
                {feature.icon}
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
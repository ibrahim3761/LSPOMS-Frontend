/** biome-ignore-all lint/a11y/useAnchorContent: <explanation> */
import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, MessageCircleQuestion, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Same container as the header, footer and about page so the edges line up
const container = "max-w-screen-2xl mx-auto px-6 lg:px-10";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "support@lspoms.com",
    href: "mailto:support@lspoms.com",
    description: "For account issues, billing or general questions.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
    description: "Available for urgent outage reports.",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Chattogram, Bangladesh",
    description: "Visit us during office hours.",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Sun – Thu, 9am – 6pm",
    description: "Outage reports are monitored around the clock.",
  },
];

const faqs = [
  {
    question: "How fast will a reported outage be looked at?",
    answer:
      "Reports go to the admin queue right away and are usually assigned to a technician within a few hours.",
  },
  {
    question: "Do I need an account to report an outage?",
    answer:
      "Yes. Creating an account lets you track the status of your report and get updates as it's worked on.",
  },
  {
    question: "How do I apply as a technician?",
    answer:
      "Use the apply form under Account in the footer. An admin reviews every application before approving it.",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className={`${container} py-16 lg:py-24`}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Get in touch
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Questions about a reported outage, a load shedding schedule, or
              applying as a technician? Reach us through whichever channel
              works best for you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" render={<Link href="/outages" />} nativeButton={false}>
                Report an outage
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<a href="mailto:support@lspoms.com" />}
                nativeButton={false}
              >
                Email us
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src="/images/support.jfif"
              alt="A support team member at a desk"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact details */}
      <section className="border-y bg-muted/40">
        <div className={`${container} py-16 lg:py-24`}>
          <h2 className="text-balance text-3xl font-bold tracking-tight">
            Ways to reach us
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactDetails.map(({ icon: Icon, label, value, href, description }) => (
              <div
                key={label}
                className="flex flex-col gap-3 rounded-2xl border bg-background p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-full border bg-muted">
                  <Icon className="size-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium">{value}</p>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office image + FAQ */}
      <section className={`${container} py-16 lg:py-24`}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted lg:aspect-auto">
            <Image
              src="/images/office.jfif"
              alt="The LSPOMS office building"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <MessageCircleQuestion className="size-6 text-primary" />
              <h2 className="text-balance text-3xl font-bold tracking-tight">
                Common questions
              </h2>
            </div>
            <ul className="flex flex-col divide-y">
              {faqs.map((faq) => (
                <li key={faq.question} className="flex flex-col gap-2 py-6 first:pt-0 last:pb-0">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className={`${container} pb-16 lg:pb-24`}>
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight">
            Still need help?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-primary-foreground/80">
            Send us an email and someone from the team will get back to you
            within one business day.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              variant="secondary"
              render={<a href="mailto:support@lspoms.com" />}
              nativeButton={false}
            >
              support@lspoms.com
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={<a href="tel:+8801234567890" />}
              nativeButton={false}
            >
              +880 1234-567890
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Outages", url: "/outages" },
    { name: "Contact", url: "/contact" },
  ],
  account: [
    { name: "Login", url: "/login" },
    { name: "Register", url: "/register" },
    { name: "Apply as Technician", url: "/apply" },
  ],
};

const contactInfo = [
  { icon: Mail, text: "support@lspoms.com" },
  { icon: Phone, text: "+880 1234-567890" },
  { icon: MapPin, text: "Chattogram, Bangladesh" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div className="flex max-w-sm flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="font-bold text-base tracking-tight">LSPOMS</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Load Shedding & Power Outage Management System. Stay informed,
              report outages, and manage power issues in your area.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-fit"
              render={<Link href="/outages" />}
              nativeButton={false}
            >
              Report an Outage
            </Button>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16 xl:gap-24">
            {/* Navigate */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Navigate</h3>
              <ul className="flex flex-col gap-2">
                {footerLinks.product.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Account</h3>
              <ul className="flex flex-col gap-2">
                {footerLinks.account.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Contact</h3>
              <ul className="flex flex-col gap-3">
                {contactInfo.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Icon className="size-4 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LSPOMS. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ for better power management
          </p>
        </div>
      </div>
    </footer>
  );
}
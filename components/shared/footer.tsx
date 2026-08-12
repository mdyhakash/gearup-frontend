import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Logo } from "./logo";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/", icon: FaFacebook },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: FaInstagram,
  },
  { label: "Twitter", href: "https://twitter.com/", icon: FaTwitter },
  { label: "YouTube", href: "https://youtube.com/", icon: FaYoutube },
];

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Browse Gear", href: "/gear" },
      { label: "Categories", href: "/gear" },
      { label: "Become a Provider", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help & Support", href: "/help" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-footer text-footer-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <div className="[&_span]:bg-transparent [&_span]:text-footer-foreground">
              <Logo />
            </div>

            <p className="mt-3 max-w-xs text-sm text-footer-foreground/70">
              Rent sports and outdoor gear from trusted local providers — booked
              in minutes, ready to pick up.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-footer-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href="mailto:support@gearup.com"
                  className="hover:text-footer-foreground"
                >
                  support@gearup.com
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a
                  href="tel:+18005550142"
                  className="hover:text-footer-foreground"
                >
                  +880 123-456
                </a>
              </li>

              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Mirpur, Dhaka - Bangaldesh</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-footer-foreground/20 text-footer-foreground/70 transition-colors hover:border-footer-foreground/40 hover:text-footer-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wide text-footer-foreground/90">
                {col.title}
              </h4>

              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-footer-foreground/70 transition-colors hover:text-footer-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-footer-foreground/15 pt-6 text-xs text-footer-foreground/60">
          © {new Date().getFullYear()} GearUp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

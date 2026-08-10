import Link from "next/link";
import { Logo } from "./logo";

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
            <div className="[&_span]:text-footer-foreground [&_span]:bg-transparent">
              <Logo />
            </div>
            <p className="mt-3 max-w-xs text-sm text-footer-foreground/70">
              Rent sports and outdoor gear from trusted local providers — booked
              in minutes, ready to pick up.
            </p>
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

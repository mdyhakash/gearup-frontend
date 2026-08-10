"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { UserMenu } from "./user-menu";
import { NavbarProps } from "@/types/user";
import { CartButton } from "./cart-button";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Help", href: "/help" },
];

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-2 items-center px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Logo />

        <nav className="hidden items-center justify-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <ThemeToggle />
          <CartButton />
          {user?.success ? (
            <UserMenu user={user.data.result} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-1 lg:hidden">
          <ThemeToggle />
          <MobileNav navLinks={navLinks} user={user} />
        </div>
      </div>
    </header>
  );
}

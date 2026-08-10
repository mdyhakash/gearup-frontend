import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Tent,
  Wallet,
  Bike,
  Waves,
  Snowflake,
  Mountain,
  Camera,
  CalendarCheck,
  RotateCcw,
  Quote,
  ChevronDown,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GearGrid } from "@/components/gear/gear-grid";
import { getAllGear } from "@/lib/actions/publicGearAction";
import { HeroSearch } from "@/components/hero-search";
import { NewsletterForm } from "@/components/shared/newsletter-form";

const steps = [
  {
    icon: Tent,
    title: "Find your gear",
    desc: "Search tents, bikes, kayaks and more from local providers.",
  },
  {
    icon: Wallet,
    title: "Book & pay securely",
    desc: "Pick your rental dates and pay safely through Stripe or SSLCommerz.",
  },
  {
    icon: ShieldCheck,
    title: "Pick up & return",
    desc: "Track your order status and leave a review once you're done.",
  },
];

const categories = [
  { icon: Tent, label: "Camping" },
  { icon: Bike, label: "Bikes" },
  { icon: Waves, label: "Water Sports" },
  { icon: Snowflake, label: "Winter Gear" },
  { icon: Mountain, label: "Climbing" },
  { icon: Camera, label: "Photography" },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "Verified providers",
    desc: "Every provider is reviewed before their listings go live, and every rental leaves a review trail.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible dates",
    desc: "Book by the day, weekend, or week — availability updates in real time as others book.",
  },
  {
    icon: RotateCcw,
    title: "Easy cancellations",
    desc: "Plans change. Cancel before pickup is confirmed and get refunded automatically.",
  },
  {
    icon: Wallet,
    title: "Transparent pricing",
    desc: "The price you see at checkout is the price you pay — no surprise fees at pickup.",
  },
];

const testimonials = [
  {
    quote:
      "Rented a kayak for a weekend trip instead of buying one I'd use twice a year. Pickup took five minutes.",
    name: "Maya R.",
    role: "Renter, Seattle",
  },
  {
    quote:
      "Listed my old camping gear and it's basically paying for itself now. The dashboard makes tracking bookings simple.",
    name: "Devon K.",
    role: "Provider, Denver",
  },
  {
    quote:
      "The condition ratings actually matched what showed up. No surprises, which is rare for rental sites.",
    name: "Priya S.",
    role: "Renter, Austin",
  },
];

const blogPreview = [
  {
    title: "How to check a tent before you pack it",
    date: "Jul 2, 2026",
    readTime: "4 min read",
  },
  {
    title: "Renting vs. buying: the real break-even point",
    date: "Jun 18, 2026",
    readTime: "6 min read",
  },
  {
    title: "A first-time provider's guide to pricing gear",
    date: "May 22, 2026",
    readTime: "5 min read",
  },
];

const faqPreview = [
  {
    q: "How do I book a piece of gear?",
    a: "Open any listing and pick your rental dates on the details page. You'll pay securely at checkout, and the provider confirms before pickup.",
  },
  {
    q: "What if the gear isn't as described?",
    a: "Report it within 24 hours of pickup and our team reviews it against the listing's photos and condition rating.",
  },
  {
    q: "How do I start listing gear?",
    a: "Register as a provider, then add a listing with photos, a condition rating, and your daily rate from your dashboard.",
  },
];

export default async function HomePage() {
  const { data: gears } = await getAllGear({
    limit: "6",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Rent sports & outdoor gear instantly
            </h1>
            <p className="mt-4 max-w-lg text-primary-foreground/75">
              Tents, bikes, kayaks, snowboards — from vetted local providers,
              booked in minutes and ready when you are.
            </p>

            <HeroSearch />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          How it works
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary">
                <step.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-mono text-xs font-semibold text-accent">
                STEP {i + 1}
              </p>
              <h3 className="mt-1 font-display font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Browse by category
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href="/gear"
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-colors hover:border-primary"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <cat.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured gear */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Featured Gear
          </h2>
          <Link
            href="/gear"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <GearGrid gears={gears} />
      </section>

      {/* Highlights */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Why rent with GearUp
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          What renters and providers say
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-6"
            >
              <Quote className="h-5 w-5 text-accent" />
              <p className="mt-3 flex-1 text-sm text-foreground">"{t.quote}"</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Notes from the trail
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Read the blog <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {blogPreview.map((post) => (
              <Link
                key={post.title}
                href="/blog"
                className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <h3 className="font-display font-bold leading-snug text-foreground">
                  {post.title}
                </h3>
                <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Common questions
          </h2>
          <Link
            href="/help"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all FAQs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
          {faqPreview.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground marker:content-none">
                {item.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Provider CTA + Newsletter */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Have gear sitting idle?
            </h2>
            <p className="mt-1 text-muted-foreground">
              List it on GearUp and start earning from rentals.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-5 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/register">Become a Provider</Link>
            </Button>
          </div>

          <div className="lg:border-l lg:border-border lg:pl-10">
            <h3 className="font-display font-bold text-foreground">
              Get gear tips in your inbox
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              One email a month. No spam.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

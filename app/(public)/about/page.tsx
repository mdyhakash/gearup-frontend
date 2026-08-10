import Link from "next/link";
import {
  Leaf,
  HandCoins,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Leaf,
    title: "Less gear in landfills",
    desc: "Every tent or bike that gets rented instead of bought new is one less thing manufactured, shipped, and eventually thrown away.",
  },
  {
    icon: HandCoins,
    title: "Fair earnings for providers",
    desc: "Providers set their own prices and keep the majority of every booking. GearUp takes a small service fee to run the platform, nothing more.",
  },
  {
    icon: MapPinned,
    title: "Local, not corporate",
    desc: "Gear comes from people in your area, not a warehouse three states away. You pick up from a neighbor, not a distribution center.",
  },
  {
    icon: ShieldCheck,
    title: "Every rental is covered",
    desc: "Listings are checked for condition before they go live, and every booking includes provider verification and a review trail.",
  },
];

const timeline = [
  {
    label: "The problem",
    text: "Outdoor gear is expensive and used a handful of times a year. Garages fill up with tents, kayaks, and snowboards that sit idle for eleven months waiting for one trip.",
  },
  {
    label: "The idea",
    text: "GearUp connects people who own gear they're not using with people who need it for a weekend, a week, or a season — without either side buying something new.",
  },
  {
    label: "Today",
    text: "Providers list gear in minutes, renters book in a few clicks, and payments, scheduling, and reviews all run through one platform so both sides can trust the process.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
            About GearUp
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Gear should get used, not gather dust
          </h1>
          <p className="mt-4 max-w-xl text-primary-foreground/75">
            We built GearUp so a tent only has to be bought once — by someone
            willing to share it — instead of once per household that only needs
            it for a weekend a year.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Why we started
            </h2>
            <p className="mt-3 text-muted-foreground">
              GearUp began with a simple observation: most outdoor gear spends
              far more time in a garage than on a trail.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {timeline.map((item) => (
              <div key={item.label} className="border-l-2 border-accent pl-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm text-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            What we care about
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-bold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              Ready to try it out?
            </h2>
            <p className="mt-1.5 text-muted-foreground">
              Browse gear near you, or list what's sitting in your garage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/gear">Browse gear</Link>
            </Button>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/register">Become a provider</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

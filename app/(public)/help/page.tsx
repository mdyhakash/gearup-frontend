import Link from "next/link";
import { ChevronDown, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    category: "Renting",
    items: [
      {
        q: "How do I book a piece of gear?",
        a: "Open any listing and pick your rental dates on the details page. You'll pay securely at checkout, and the provider confirms the booking before pickup.",
      },
      {
        q: "What happens if I need to cancel?",
        a: "You can cancel from Dashboard → Orders any time before the provider confirms pickup. Refund timing depends on how close to the start date you cancel.",
      },
      {
        q: "What if the gear arrives damaged or not as described?",
        a: "Report it from your order within 24 hours of pickup. Our team reviews the listing photos and condition rating against your report and issues a refund or replacement.",
      },
    ],
  },
  {
    category: "Providers",
    items: [
      {
        q: "How do I list gear for rent?",
        a: "Register as a provider, then add a listing from your dashboard with photos, a condition rating, and your daily rate. Listings go live after a quick review.",
      },
      {
        q: "When do I get paid?",
        a: "Payouts are released once the renter confirms pickup, and land in your account within a few business days.",
      },
      {
        q: "Can I set my own availability?",
        a: "Yes — block out dates from the gear management page any time a listing isn't available for rent.",
      },
    ],
  },
  {
    category: "Account & payments",
    items: [
      {
        q: "What payment methods are supported?",
        a: "Card payments through our checkout provider. You'll see the final amount, including any service fee, before you confirm a booking.",
      },
      {
        q: "How do I update my profile information?",
        a: "Go to Dashboard → Profile to update your name, contact details, and password.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="max-w-xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
          Help &amp; Support
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          How can we help?
        </h1>
        <p className="mt-4 text-muted-foreground">
          Answers to the most common questions about renting, listing, and
          managing your account.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {faqs.map((group) => (
          <div key={group.category}>
            <h2 className="font-display text-lg font-bold text-foreground">
              {group.category}
            </h2>
            <div className="mt-4 flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
              {group.items.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground marker:content-none">
                    {item.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-secondary p-8 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <LifeBuoy className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display font-bold text-foreground">
              Still stuck?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Send us a message and we'll get back to you within a business day.
            </p>
          </div>
        </div>
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/contact">Contact support</Link>
        </Button>
      </div>
    </div>
  );
}

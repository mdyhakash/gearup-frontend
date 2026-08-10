import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";


const infoItems = [
  { icon: Mail, label: "Email", value: "support@gearup.example" },
  {
    icon: MapPin,
    label: "Coverage",
    value: "Available in select cities, expanding monthly",
  },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="max-w-xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
          Contact
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-4 text-muted-foreground">
          Questions about a rental, a listing, or becoming a provider? Send us a
          message and we'll get back to you.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display font-bold text-foreground">
              Ways to reach us
            </h2>
            <ul className="mt-4 space-y-4">
              {infoItems.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-secondary p-6">
            <p className="text-sm text-muted-foreground">
              Looking for rental policies, cancellations, or payment help? Check
              the{" "}
              <a
                href="/help"
                className="font-semibold text-primary hover:underline"
              >
                Help &amp; Support
              </a>{" "}
              page first — most questions are answered there.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    title: "1. What we collect",
    body: "We collect the information you provide directly — name, email, and profile details when you register, plus listing and booking details when you use the platform.",
  },
  {
    title: "2. How we use it",
    body: "Your information is used to operate bookings, process payments, show your listings to renters, and send account-related notifications. We don't sell your personal information.",
  },
  {
    title: "3. Sharing between renters and providers",
    body: "To complete a booking, renters and providers see each other's name and contact details necessary for pickup and return. This is limited to confirmed bookings.",
  },
  {
    title: "4. Payment information",
    body: "Payments are processed through our payment provider. GearUp does not store full card numbers on its own servers.",
  },
  {
    title: "5. Your choices",
    body: "You can review and update your profile information at any time from your dashboard. You can request account deletion by contacting support.",
  },
  {
    title: "6. Changes to this policy",
    body: "If this policy changes in a meaningful way, we'll let you know before the changes take effect.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
        Legal
      </span>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated August 2026
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-display text-lg font-bold text-foreground">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

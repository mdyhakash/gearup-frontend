const sections = [
  {
    title: "1. The GearUp platform",
    body: "GearUp connects people who own outdoor and sports gear ('providers') with people who want to rent it ('renters'). We facilitate bookings, payments, and communication — GearUp does not own or rent out the gear itself.",
  },
  {
    title: "2. Bookings and payments",
    body: "When you book a listing, you agree to pay the daily rate shown at checkout plus any applicable service fee. Payment is collected at the time of booking and released to the provider once pickup is confirmed.",
  },
  {
    title: "3. Cancellations",
    body: "Renters may cancel a booking before the provider confirms pickup. Refund amounts depend on how close to the rental start date the cancellation occurs, as shown at checkout.",
  },
  {
    title: "4. Condition and damage",
    body: "Providers are responsible for accurately describing the condition of their gear. Renters are responsible for returning gear in the condition it was received, normal wear excepted. Disputes over damage are reviewed against listing photos and condition ratings.",
  },
  {
    title: "5. Account responsibilities",
    body: "You're responsible for keeping your account credentials secure and for the accuracy of the information in your listings, bookings, and profile.",
  },
  {
    title: "6. Changes to these terms",
    body: "We may update these terms as the platform evolves. Continued use of GearUp after an update means you accept the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
        Legal
      </span>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
        Terms of Service
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

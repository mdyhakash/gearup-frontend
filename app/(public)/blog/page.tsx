import { Calendar, Clock } from "lucide-react";

const posts = [
  {
    title: "How to check a tent before you pack it",
    excerpt:
      "Five minutes on the living room floor can save you a wet, sleepless first night. Here's the pre-trip check every renter should run.",
    category: "Gear care",
    date: "Jul 2, 2026",
    readTime: "4 min read",
  },
  {
    title: "Renting vs. buying: the real break-even point",
    excerpt:
      "If you use a piece of gear fewer than six times a year, renting almost always comes out ahead once you factor in storage and maintenance.",
    category: "Guides",
    date: "Jun 18, 2026",
    readTime: "6 min read",
  },
  {
    title: "What 'good condition' actually means on GearUp",
    excerpt:
      "Every listing gets a condition rating before it goes live. Here's what separates 'excellent' from 'good' and why it matters for your trip.",
    category: "Platform",
    date: "Jun 5, 2026",
    readTime: "3 min read",
  },
  {
    title: "A first-time provider's guide to pricing gear",
    excerpt:
      "Underpriced listings sit idle just as often as overpriced ones. A simple framework for setting a rate that actually books.",
    category: "For providers",
    date: "May 22, 2026",
    readTime: "5 min read",
  },
  {
    title: "Packing a kayak roof rack without denting your car",
    excerpt:
      "Foam blocks, tie-down angles, and the one knot that keeps a kayak from shifting on the highway.",
    category: "Gear care",
    date: "May 9, 2026",
    readTime: "4 min read",
  },
  {
    title: "Reading reviews like a local, not a tourist",
    excerpt:
      "The most useful review detail isn't the star rating — it's whether the provider mentions pickup logistics. Here's what to look for.",
    category: "Guides",
    date: "Apr 27, 2026",
    readTime: "3 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="max-w-xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
          Blog
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          Notes from the trail
        </h1>
        <p className="mt-4 text-muted-foreground">
          Gear care, rental guides, and tips for getting the most out of every
          trip — whether you're renting or listing.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="flex h-full flex-col rounded-xl border border-border bg-card p-6"
          >
            <span className="w-fit rounded-full bg-secondary px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-primary">
              {post.category}
            </span>
            <h2 className="mt-4 font-display text-lg font-bold leading-snug text-foreground">
              {post.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

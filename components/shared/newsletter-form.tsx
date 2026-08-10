"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !EMAIL_REGEX.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    setSubmitted(true);
    setEmail("");
  }

  if (submitted) {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-primary-foreground">
        <CheckCircle2 className="h-4 w-4" /> You're subscribed — watch your
        inbox.
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
    >
      <div className="flex-1">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="border-0 bg-primary-foreground text-foreground"
        />
        {error && (
          <p id="newsletter-error" className="mt-1.5 text-xs text-accent">
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={submitting}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}

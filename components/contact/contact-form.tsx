"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Message should be at least 20 characters.";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    // Placeholder submit — wire this to a real endpoint (e.g. a
    // contact.route.ts on the backend) when that piece is in scope.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setSubmitted(true);
    setValues({ name: "", email: "", subject: "", message: "" });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-6">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <div>
          <p className="font-display font-bold text-foreground">Message sent</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks for reaching out — we typically reply within one business
            day.
          </p>
        </div>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Jordan Lee"
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          value={values.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="Question about a booking"
        />
        {errors.subject && (
          <p id="subject-error" className="text-xs text-destructive">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell us what's going on..."
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}

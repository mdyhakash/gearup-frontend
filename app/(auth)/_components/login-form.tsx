"use client";

import Link from "next/link";
import { useActionState, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  ShoppingBag,
  Tent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginAction } from "../_actions/authAction";

const initialState = {
  success: false,
  statusCode: 0,
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = { email?: string; password?: string };

const DEMO_ACCOUNTS = [
  {
    label: "Admin",
    icon: ShieldCheck,
    email: "admin@gearup.demo",
    password: "Demo@1234",
  },
  {
    label: "Customer",
    icon: ShoppingBag,
    email: "customer@gearup.demo",
    password: "Demo@1234",
  },
  {
    label: "Provider",
    icon: Tent,
    email: "provider@gearup.demo",
    password: "Demo@1234",
  },
] as const;

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!password) {
    errors.password = "Please enter your password.";
  }
  return errors;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [state, action, pending] = useActionState(loginAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange =
    (field: keyof typeof formValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (fieldErrors[field]) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const errors = validate(formValues.email, formValues.password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
    }
  }

  function handleDemoLogin(email: string, password: string) {
    // flushSync forces the state update (and re-render) to commit to the
    // DOM synchronously, so the form's real input values are correct
    // before requestSubmit reads them — no race with React's scheduler.
    flushSync(() => {
      setFormValues({ email, password });
      setFieldErrors({});
    });
    formRef.current?.requestSubmit();
  }

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {state?.message && !state.success && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
          {state.message}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formValues.email}
          onChange={handleChange("email")}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {fieldErrors.email && (
          <p id="email-error" className="text-xs text-destructive">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formValues.password}
            onChange={handleChange("password")}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={
              fieldErrors.password ? "password-error" : undefined
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {fieldErrors.password && (
          <p id="password-error" className="text-xs text-destructive">
            {fieldErrors.password}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-muted-foreground">
          <Checkbox /> Remember me
        </label>
        <Link
          href="/forgot-password"
          className="font-medium text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
          </>
        ) : (
          "Log in"
        )}
      </Button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Or try a demo
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {DEMO_ACCOUNTS.map((account) => (
          <Button
            key={account.label}
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => handleDemoLogin(account.email, account.password)}
            className="flex h-auto flex-col gap-1.5 py-3"
          >
            <account.icon className="h-4 w-4" />
            <span className="text-xs">{account.label}</span>
          </Button>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

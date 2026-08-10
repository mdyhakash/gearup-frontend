"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Tent, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "../_actions/authAction";

const roles = [
  {
    value: "CUSTOMER",
    label: "Rent Gear",
    desc: "Browse and rent equipment",
    icon: ShoppingBag,
  },
  {
    value: "PROVIDER",
    label: "List Gear",
    desc: "Rent out your equipment",
    icon: Tent,
  },
] as const;

const initialState = {
  success: false,
  statusCode: 0,
  message: "",
};

export function RegisterForm() {
  const [role, setRole] = useState<(typeof roles)[number]["value"]>("CUSTOMER");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [state, action, pending] = useActionState(registerAction, initialState);

  const handleChange =
    (field: keyof typeof formValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormValues((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <form action={action} className="space-y-5">
      {state?.message && !state.success && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
          {state.message}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {roles.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => setRole(r.value)}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border-2 p-3.5 text-left transition-colors",
              role === r.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40",
            )}
          >
            <r.icon
              className={cn(
                "h-5 w-5",
                role === r.value ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span className="text-sm font-semibold text-foreground">
              {r.label}
            </span>
            <span className="text-xs text-muted-foreground">{r.desc}</span>
          </button>
        ))}
      </div>
      <input type="hidden" name="role" value={role} />

      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Jordan Lee"
          value={formValues.name}
          onChange={handleChange("name")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email">Email</Label>
        <Input
          id="reg-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formValues.email}
          onChange={handleChange("email")}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-2">
          <Label htmlFor="reg-password">Password</Label>
          <Input
            id="reg-password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formValues.password}
            onChange={handleChange("password")}
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {pending ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}

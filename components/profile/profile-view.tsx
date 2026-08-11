"use client";

import { useActionState, useState, type FormEvent } from "react";
import {
  CalendarDays,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/types/user";
import { updateProfileAction } from "@/app/(auth)/_actions/profileAction";

type FieldErrors = { name?: string };

const profileActionInitialState = {
  success: false,
  statusCode: 0,
  message: "",
};

function validate(name: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) {
    errors.name = "Please enter your name.";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }
  return errors;
}

export function ProfileView({
  user,
  dangerZoneText = "Deactivating your account will remove your access to GearUp.",
}: {
  user: User;
  dangerZoneText?: string;
}) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    profileActionInitialState,
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const errors = validate(name);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      return;
    }
  }

  if (state.message && state.success) {
    toast.success(state.message);
  } else if (state.message && !state.success) {
    toast.error(state.message);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">
        My Profile
      </h2>

      {/* Profile header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Avatar className="h-20 w-20 border border-border">
            {user.profile.profilePhoto && (
              <AvatarImage src={user.profile.profilePhoto} alt={user.name} />
            )}
            <AvatarFallback className="bg-secondary text-xl font-semibold text-secondary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-bold capitalize text-foreground">
                {user.name}
              </h3>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-primary">
                {user.role}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-secondary-foreground">
                <ShieldCheck className="h-3 w-3" /> {user.status}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" /> Member since{" "}
                {memberSince}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editable details */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display font-bold text-foreground">
          Personal Information
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your contact details and bio.
        </p>

        <Separator className="my-5" />

        <form
          action={formAction}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={user.name}
                className="capitalize"
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                onChange={() =>
                  fieldErrors.name &&
                  setFieldErrors((prev) => ({ ...prev, name: undefined }))
                }
              />
              {fieldErrors.name && (
                <p id="name-error" className="text-xs text-destructive">
                  {fieldErrors.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> Phone
                </span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Add a phone number"
                defaultValue={user.phone ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Address
                </span>
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Add your address"
                defaultValue={user.address ?? ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              rows={3}
              placeholder="Tell others a bit about yourself..."
              defaultValue={user.profile.bio ?? ""}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={pending}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <h3 className="font-display font-bold text-destructive">Danger Zone</h3>
        <p className="mt-1 text-sm text-muted-foreground">{dangerZoneText}</p>
        <Button
          variant="outline"
          className="mt-4 border-destructive text-destructive hover:bg-destructive/10"
        >
          Deactivate Account
        </Button>
      </div>
    </div>
  );
}

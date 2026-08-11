"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("GearUp");
  const [supportEmail, setSupportEmail] = useState("support@gearup.example");
  const [currency, setCurrency] = useState("USD");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoApproveListings, setAutoApproveListings] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    // Placeholder save — wire this to a real settings endpoint
    // (e.g. PATCH /api/admin/settings) when that piece is in scope.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSaving(false);
    toast.success("Settings saved");
  }

  return (
    <form onSubmit={handleSave} className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Platform Settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure how GearUp behaves for renters and providers.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display font-bold text-foreground">General</h3>
        <Separator className="my-5" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site name</Label>
            <Input
              id="site-name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Support email</Label>
            <Input
              id="support-email"
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Default currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="BDT">BDT (৳)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display font-bold text-foreground">
          Platform behavior
        </h3>
        <Separator className="my-5" />
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Auto-approve new listings
              </p>
              <p className="text-xs text-muted-foreground">
                Skip manual review and publish new gear listings immediately.
              </p>
            </div>
            <Switch
              checked={autoApproveListings}
              onCheckedChange={setAutoApproveListings}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Email notifications
              </p>
              <p className="text-xs text-muted-foreground">
                Send admins an email for new signups, listings, and disputes.
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Maintenance mode
              </p>
              <p className="text-xs text-muted-foreground">
                Takes the public site offline for renters and providers.
              </p>
            </div>
            <Switch
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={saving}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </div>
    </form>
  );
}

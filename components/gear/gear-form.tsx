"use client";

import { useActionState, useEffect, useState, type FormEvent } from "react";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createGearAction,
  UpdateGearAction,
} from "@/app/(dashboard)/provider-dashboard/_actions/gearAction";

import { Category } from "@/app/(dashboard)/admin-dashboard/_actions/categoryAction";
import { GearCondition, GearItem } from "@/types/gear";
import { Badge } from "../ui/badge";

type GearFormProps = {
  categories: Category[];
  mode?: "create" | "edit";
  initialValues?: GearItem;
  trigger?: React.ReactNode;
};

const initialState = {
  success: false,
  statusCode: 0,
  message: "",
};

type FieldErrors = {
  name?: string;
  categoryId?: string;
  stock?: string;
  dailyRate?: string;
};

function validate(
  name: string,
  categoryId: string,
  stock: string,
  dailyRate: string,
): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Gear name is required.";
  if (!categoryId) errors.categoryId = "Please select a category.";
  if (!stock.trim()) {
    errors.stock = "Stock is required.";
  } else if (Number(stock) < 0 || !Number.isFinite(Number(stock))) {
    errors.stock = "Stock must be a number of 0 or more.";
  }
  if (!dailyRate.trim()) {
    errors.dailyRate = "Daily rate is required.";
  } else if (Number(dailyRate) <= 0 || !Number.isFinite(Number(dailyRate))) {
    errors.dailyRate = "Daily rate must be greater than 0.";
  }
  return errors;
}

export function GearForm({
  categories,
  mode = "create",
  initialValues,
  trigger,
}: GearFormProps) {
  const [open, setOpen] = useState(false);

  const action =
    mode === "edit" && initialValues?.id
      ? UpdateGearAction.bind(null, initialValues.id)
      : createGearAction;

  const [state, formAction, pending] = useActionState(action, initialState);

  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? "");

  const [categoryId, setCategoryId] = useState(
    initialValues?.category?.id ?? "",
  );

  const [condition, setCondition] = useState(initialValues?.condition ?? "NEW");

  const [isAvailable, setIsAvailable] = useState(
    initialValues?.isAvailable ?? true,
  );

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const stock = String(formData.get("stock") ?? "");
    const dailyRate = String(formData.get("dailyRate") ?? "");
    const errors = validate(name, categoryId, stock, dailyRate);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
    }
  }

  function clearError(field: keyof FieldErrors) {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>{mode === "create" ? "Add Gear" : "Edit Gear"}</Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Gear" : "Edit Gear"}
          </DialogTitle>
        </DialogHeader>

        <form
          action={formAction}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Gear Name</Label>
              <Input
                name="name"
                defaultValue={initialValues?.name}
                placeholder="e.g. 4-Person Dome Tent"
                required
                aria-invalid={!!fieldErrors.name}
                aria-describedby={
                  fieldErrors.name ? "gear-name-error" : undefined
                }
                onChange={() => clearError("name")}
              />
              {fieldErrors.name && (
                <p id="gear-name-error" className="text-xs text-destructive">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Brand</Label>
              <Input
                name="brand"
                defaultValue={initialValues?.brand}
                placeholder="e.g. Coleman"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              name="description"
              rows={4}
              defaultValue={initialValues?.description ?? ""}
              placeholder="Describe the gear..."
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Category</Label>

              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value);
                  clearError("categoryId");
                }}
              >
                <SelectTrigger aria-invalid={!!fieldErrors.categoryId}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <input type="hidden" name="categoryId" value={categoryId} />
              {fieldErrors.categoryId && (
                <p className="text-xs text-destructive">
                  {fieldErrors.categoryId}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Condition</Label>

              <Select
                value={condition}
                onValueChange={(value) => setCondition(value as GearCondition)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="NEW">New</SelectItem>

                  <SelectItem value="GOOD">Good</SelectItem>

                  <SelectItem value="FAIR">Fair</SelectItem>

                  <SelectItem value="DAMAGED">Damaged</SelectItem>
                </SelectContent>
              </Select>

              <input type="hidden" name="condition" value={condition} />
            </div>

            <div className="space-y-2">
              <Label>Stock</Label>

              <Input
                name="stock"
                type="number"
                min={0}
                defaultValue={initialValues?.stock}
                required
                aria-invalid={!!fieldErrors.stock}
                aria-describedby={
                  fieldErrors.stock ? "gear-stock-error" : undefined
                }
                onChange={() => clearError("stock")}
              />
              {fieldErrors.stock && (
                <p id="gear-stock-error" className="text-xs text-destructive">
                  {fieldErrors.stock}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Daily Rate ($)</Label>

              <Input
                name="dailyRate"
                type="number"
                min={0}
                defaultValue={initialValues?.dailyRate}
                placeholder="15"
                required
                aria-invalid={!!fieldErrors.dailyRate}
                aria-describedby={
                  fieldErrors.dailyRate ? "gear-rate-error" : undefined
                }
                onChange={() => clearError("dailyRate")}
              />
              {fieldErrors.dailyRate && (
                <p id="gear-rate-error" className="text-xs text-destructive">
                  {fieldErrors.dailyRate}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Badge variant={isAvailable ? "default" : "secondary"}>
                {isAvailable ? "Available" : "Unavailable"}
              </Badge>

              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
              />
              <input
                type="hidden"
                name="isAvailable"
                value={isAvailable ? "true" : "false"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Photo</Label>

            {imageUrl ? (
              <div className="relative w-40">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="aspect-square w-40 rounded-lg object-cover"
                />

                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div className="flex w-40 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6">
                <UploadCloud className="h-6 w-6 text-muted-foreground" />

                <span className="text-xs text-muted-foreground">
                  Image Preview
                </span>
              </div>
            )}

            <Input
              name="image"
              value={imageUrl}
              placeholder="Paste image URL"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={pending}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {pending
                ? mode === "create"
                  ? "Saving..."
                  : "Updating..."
                : mode === "create"
                  ? "Create Gear"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

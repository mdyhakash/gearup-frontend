"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarIcon, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { createRentalOrder } from "@/app/(dashboard)/dashboard/_actions/rentalAction";

export function CartView() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        <p className="mt-4 font-display text-lg font-bold text-foreground">
          Your cart is empty
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse gear and add items to get started.
        </p>
        <Button asChild className="mt-5">
          <Link href="/gear">Browse Gear</Link>
        </Button>
      </div>
    );
  }

  const days =
    range?.from && range?.to
      ? Math.max(1, differenceInCalendarDays(range.to, range.from))
      : 0;
  const subtotal = items.reduce(
    (sum, i) => sum + i.dailyRate * i.quantity * days,
    0,
  );
  const serviceFee = subtotal ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + serviceFee;

  const handleCheckout = () => {
    if (!range?.from || !range?.to) {
      toast.error("Select your rental dates first.");
      return;
    }

    startTransition(async () => {
      const result = await createRentalOrder({
        startDate: range.from!.toISOString(),
        endDate: range.to!.toISOString(),
        items: items.map((i) => ({
          gearItemId: i.gearItemId,
          quantity: i.quantity,
        })),
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Order placed. The provider will confirm it shortly.");
      clearCart();
      router.push("/dashboard/orders");
    });
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      {/* Items */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.gearItemId}
            className="flex gap-4 rounded-xl border border-border bg-card p-4"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.image ?? "/placeholder-gear.jpg"}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display font-bold text-foreground">
                    {item.name}
                  </p>
                  <p className="font-mono text-sm text-muted-foreground">
                    ${item.dailyRate}/day
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(item.gearItemId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex w-fit items-center rounded-md border border-border">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() =>
                    updateQuantity(item.gearItemId, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="flex h-8 min-w-10 items-center justify-center border-x border-border text-sm font-medium">
                  {item.quantity}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() =>
                    updateQuantity(item.gearItemId, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="h-fit rounded-xl border border-border bg-card p-5">
        <h3 className="font-display font-bold text-foreground">Rental Dates</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Same dates apply to every item in this order.
        </p>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="mt-3 w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              {range?.from ? (
                range.to ? (
                  <>
                    {format(range.from, "MMM d")} –{" "}
                    {format(range.to, "MMM d, yyyy")}
                  </>
                ) : (
                  format(range.from, "MMM d, yyyy")
                )
              ) : (
                <span className="text-muted-foreground">
                  Select pickup & return
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={{ before: new Date() }}
              numberOfMonths={1}
              className="rounded-md border-0"
            />
          </PopoverContent>
        </Popover>

        <Separator className="my-4" />

        {days > 0 && (
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>
                Subtotal × {days} day{days > 1 ? "s" : ""}
              </span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Service fee</span>
              <span>${serviceFee}</span>
            </div>
            <Separator className="my-2" />
          </div>
        )}

        <div className="flex justify-between font-semibold text-foreground">
          <span>Total</span>
          <span className="font-mono">${total}</span>
        </div>

        <Button
          onClick={handleCheckout}
          className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
          disabled={isPending}
        >
          {isPending ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}

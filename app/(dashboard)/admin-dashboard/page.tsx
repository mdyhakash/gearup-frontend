import { Users, Package, ListOrdered, Wallet } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { BarChart } from "@/components/dashboard/bar-chart";
import { LineChart } from "@/components/dashboard/line-chart";
import { DonutChart } from "@/components/dashboard/donut-chart";
import { getAllUsers } from "./_actions/userAction";
import { getAllGear } from "./_actions/gearAction";
import { getAllRentals } from "./_actions/rentalAction";
import type { RentalStatus } from "@/types/rental";

const STATUS_LABELS: Record<RentalStatus, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PAID: "Paid",
  PICKED_UP: "Picked up",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

const STATUS_COLORS: Record<RentalStatus, string> = {
  PLACED: "var(--status-placed)",
  CONFIRMED: "var(--status-confirmed)",
  PAID: "var(--status-paid)",
  PICKED_UP: "var(--status-pickedup)",
  RETURNED: "var(--status-returned)",
  CANCELLED: "var(--status-cancelled)",
};

export default async function AdminOverviewPage() {
  const [users, gear, rentals] = await Promise.all([
    getAllUsers({
      page: 1,
      limit: 1,
    }),
    getAllGear({ limit: "100" }),
    getAllRentals({ limit: "100" }),
  ]);
  const totalUsers = users.meta?.total ?? 0;
  const totalGear = gear.meta?.total ?? gear.data.length;
  const totalRentals = rentals.meta?.total ?? rentals.data.length;

  const totalRevenue = rentals.data.reduce(
    (sum, rental) => sum + rental.totalAmount,
    0,
  );

  // Gear by category
  const categoryTotals = new Map<string, number>();
  for (const item of gear.data) {
    const label = item.category?.name ?? "Uncategorized";
    categoryTotals.set(label, (categoryTotals.get(label) ?? 0) + 1);
  }
  const categoryData = Array.from(categoryTotals, ([label, value]) => ({
    label,
    value,
  })).sort((a, b) => b.value - a.value);

  // Rentals by status
  const statusTotals = new Map<RentalStatus, number>();
  for (const rental of rentals.data) {
    statusTotals.set(rental.status, (statusTotals.get(rental.status) ?? 0) + 1);
  }
  const statusData = Array.from(statusTotals, ([status, value]) => ({
    label: STATUS_LABELS[status],
    value,
    color: STATUS_COLORS[status],
  }));

  // Revenue by month (last 6 months present in the data)
  const revenueByMonth = new Map<string, number>();
  for (const rental of rentals.data) {
    const date = new Date(rental.createdAt);
    const key = date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
    revenueByMonth.set(
      key,
      (revenueByMonth.get(key) ?? 0) + rental.totalAmount,
    );
  }
  const revenueData = Array.from(revenueByMonth, ([label, value]) => ({
    label,
    value,
  })).slice(-6);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={totalUsers} icon={Users} />
        <StatCard label="Active Gear" value={totalGear} icon={Package} />
        <StatCard
          label="Total Rentals"
          value={totalRentals}
          icon={ListOrdered}
        />
        <StatCard
          label="Platform Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={Wallet}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LineChart title="Revenue by month" data={revenueData} />
        <DonutChart title="Rentals by status" data={statusData} />
      </div>

      <BarChart title="Gear by category" data={categoryData} />
    </div>
  );
}

import { StatusBadge } from "@/components/orders/status-badge";
import { getAllRentals } from "../_actions/rentalAction";
import { Pagination } from "@/components/shared/pagination";
import { OrderStatusFilter } from "@/components/dashboard/order-status-filter";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const { data: rentals, meta, error } = await getAllRentals(params);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          All Rental Orders
        </h2>
        <OrderStatusFilter currentStatus={params.status} />
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Gear</th>
                <th className="hidden px-5 py-3 md:table-cell">Dates</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {rentals.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    No rental orders found.
                  </td>
                </tr>
              ) : (
                rentals.map((order) => (
                  <tr key={order.id}>
                    <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                      {order.id}
                    </td>

                    <td className="px-5 py-4 font-medium text-foreground">
                      {order.customer.name}
                    </td>

                    <td className="px-5 py-4 text-foreground">
                      {order.items.map((item) => item.gearItem.name).join(", ")}
                    </td>

                    <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">
                      {new Date(order.startDate).toLocaleDateString()} -{" "}
                      {new Date(order.endDate).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 font-mono font-semibold text-foreground">
                      ${order.totalAmount}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {meta && <Pagination totalPages={meta.totalPages} />}
    </div>
  );
}

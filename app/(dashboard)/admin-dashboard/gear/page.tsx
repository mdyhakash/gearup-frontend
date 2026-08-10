import { getAllGear } from "../_actions/gearAction";
import { getAllCategories } from "../_actions/categoryAction";
import { Pagination } from "@/components/shared/pagination";
import { GearModerationTable } from "@/components/dashboard/gear-moderation-table";

export default async function AdminGearModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const [{ data: gear, meta, error }, { data: categories }] = await Promise.all(
    [getAllGear({ page: params.page, limit: "50" }), getAllCategories()],
  );

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        Gear Moderation
      </h2>
      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <GearModerationTable gear={gear} categories={categories} />
      )}
      {meta && <Pagination totalPages={meta.totalPages} />}
    </div>
  );
}

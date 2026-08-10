type BarDatum = {
  label: string;
  value: number;
};

export function BarChart({ title, data }: { title: string; data: BarDatum[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-display font-bold text-foreground">{title}</h3>

      {data.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {data.map((d) => (
            <div key={d.label} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-xs font-medium text-muted-foreground">
                {d.label}
              </span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(d.value / max) * 100}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-mono text-xs font-semibold text-foreground">
                {d.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

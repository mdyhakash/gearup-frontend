type DonutDatum = {
  label: string;
  value: number;
  color: string;
};

export function DonutChart({
  title,
  data,
}: {
  title: string;
  data: DonutDatum[];
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;
  const stops = data.map((d) => {
    const start = total === 0 ? 0 : (cumulative / total) * 360;
    cumulative += d.value;
    const end = total === 0 ? 0 : (cumulative / total) * 360;
    return { ...d, start, end };
  });

  const gradient =
    total === 0
      ? "var(--color-muted)"
      : `conic-gradient(${stops
          .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
          .join(", ")})`;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-display font-bold text-foreground">{title}</h3>

      {total === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="mt-6 flex items-center gap-6">
          <div
            className="h-32 w-32 shrink-0 rounded-full"
            style={{ background: gradient }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-card">
                <span className="font-mono text-lg font-bold text-foreground">
                  {total}
                </span>
                <span className="text-[10px] text-muted-foreground">total</span>
              </div>
            </div>
          </div>

          <ul className="flex flex-1 flex-col gap-2">
            {data.map((d) => (
              <li
                key={d.label}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-muted-foreground">{d.label}</span>
                </span>
                <span className="font-mono font-semibold text-foreground">
                  {d.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

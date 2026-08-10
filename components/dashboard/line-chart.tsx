type LinePoint = {
  label: string;
  value: number;
};

const WIDTH = 600;
const HEIGHT = 180;
const PADDING = 24;

export function LineChart({
  title,
  data,
  formatValue = (v) => `$${v.toLocaleString()}`,
}: {
  title: string;
  data: LinePoint[];
  formatValue?: (value: number) => string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const min = Math.min(0, ...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x =
      data.length === 1
        ? WIDTH / 2
        : PADDING + (i / (data.length - 1)) * (WIDTH - PADDING * 2);
    const y =
      HEIGHT - PADDING - ((d.value - min) / range) * (HEIGHT - PADDING * 2);
    return { x, y, ...d };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath =
    points.length > 0
      ? `${path} L ${points[points.length - 1].x} ${HEIGHT - PADDING} L ${points[0].x} ${HEIGHT - PADDING} Z`
      : "";

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-foreground">{title}</h3>
        <span className="font-mono text-sm font-semibold text-foreground">
          {formatValue(total)} total
        </span>
      </div>

      {data.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="mt-4">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-40 w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {areaPath && (
              <path d={areaPath} fill="var(--color-primary)" opacity={0.08} />
            )}
            <path
              d={path}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {points.map((p) => (
              <circle
                key={p.label}
                cx={p.x}
                cy={p.y}
                r={3}
                fill="var(--color-primary)"
              />
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            {data.map((d) => (
              <span key={d.label}>{d.label}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

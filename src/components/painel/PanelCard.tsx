import { cn } from "@/lib/cn";

export function PanelCard({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "red" | "outline";
}) {
  if (variant === "red") {
    return (
      <div
        className={cn(
          "rounded-2xl p-5 border border-[var(--color-mp-red)] bg-[var(--color-mp-red)] text-white",
          className
        )}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={cn("rounded-2xl p-5 border", className)}
      style={{
        backgroundColor:
          variant === "outline" ? "transparent" : "var(--panel-surface)",
        borderColor: "var(--panel-border)",
      }}
    >
      {children}
    </div>
  );
}

export function PanelKPI({
  label,
  value,
  trend,
  Icon,
}: {
  label: string;
  value: string;
  trend?: string;
  Icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <PanelCard>
      <div className="flex items-start justify-between mb-3">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "var(--panel-text-muted)" }}
        >
          {label}
        </div>
        {Icon && (
          <Icon
            className="h-4 w-4"
            style={{ color: "var(--panel-text-dim)" }}
          />
        )}
      </div>
      <div
        className="text-2xl font-semibold tabular-nums"
        style={{ color: "var(--panel-text)" }}
      >
        {value}
      </div>
      {trend && (
        <div className="mt-1 text-xs text-[var(--color-mp-success)]">
          {trend}
        </div>
      )}
    </PanelCard>
  );
}

export function PanelEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.18em]",
        className
      )}
      style={{ color: "var(--panel-text-muted)" }}
    >
      {children}
    </div>
  );
}

export function FilterChip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (active) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap"
        style={{
          backgroundColor: "var(--panel-text)",
          color: "var(--panel-bg)",
          borderColor: "var(--panel-text)",
        }}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap hover:opacity-100"
      style={{
        backgroundColor: "transparent",
        color: "var(--panel-text-soft)",
        borderColor: "var(--panel-border-strong)",
      }}
    >
      {children}
    </button>
  );
}

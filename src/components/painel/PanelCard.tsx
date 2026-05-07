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
  return (
    <div
      className={cn(
        "rounded-2xl p-5 border",
        variant === "red"
          ? "bg-mp-red border-mp-red text-white"
          : variant === "outline"
          ? "bg-transparent border-white/10"
          : "bg-white/[0.03] border-white/10",
        className
      )}
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
  Icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <PanelCard>
      <div className="flex items-start justify-between mb-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
          {label}
        </div>
        {Icon && <Icon className="h-4 w-4 text-white/30" />}
      </div>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      {trend && (
        <div className="mt-1 text-xs text-mp-success">{trend}</div>
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
        "font-mono text-[10px] uppercase tracking-[0.18em] text-white/40",
        className
      )}
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
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
        active
          ? "bg-white text-mp-ink border-white"
          : "bg-transparent border-white/15 text-white/65 hover:text-white hover:border-white/30"
      )}
    >
      {children}
    </button>
  );
}

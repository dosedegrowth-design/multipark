import { cn } from "@/lib/cn";

export function MercosulPlate({
  plate = "ABC1D23",
  state = "SP",
  size = "md",
  className,
}: {
  plate?: string;
  state?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex flex-col bg-white border-2 border-[var(--color-mp-ink)] rounded-[8px] overflow-hidden shadow-sm",
        size === "sm" && "w-[140px]",
        size === "md" && "w-[200px]",
        size === "lg" && "w-[280px]",
        className
      )}
    >
      {/* Mercosul header */}
      <div className="flex items-center justify-between px-2 py-1 bg-[#1A4FB5] text-white">
        <span className="text-[8px] font-bold tracking-wider">BR</span>
        <span className="text-[8px] font-bold tracking-[0.3em]">MERCOSUL</span>
        <span className="text-[8px] font-bold tracking-wider">{state}</span>
      </div>
      {/* Plate */}
      <div className="bg-white px-3 py-2 flex items-center justify-center">
        <span
          className={cn(
            "plate-mercosul text-[var(--color-mp-ink)]",
            size === "sm" && "text-xl",
            size === "md" && "text-3xl",
            size === "lg" && "text-4xl"
          )}
        >
          {plate}
        </span>
      </div>
    </div>
  );
}

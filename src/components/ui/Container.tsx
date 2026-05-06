import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "default" && "max-w-[1280px]",
        size === "narrow" && "max-w-[960px]",
        size === "wide" && "max-w-[1440px]",
        className
      )}
    >
      {children}
    </div>
  );
}

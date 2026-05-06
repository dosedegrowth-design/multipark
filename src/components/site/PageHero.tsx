import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  variant = "light",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <section
      className={`py-20 md:py-28 border-b ${
        isDark
          ? "bg-hero-dark text-white border-white/10"
          : "bg-[var(--color-mp-paper)] border-[var(--color-mp-line)]"
      }`}
    >
      <Container>
        <div className={`eyebrow mb-4 ${isDark ? "text-[var(--color-mp-red)]" : ""}`}>
          {eyebrow}
        </div>
        <h1
          className={`text-4xl md:text-7xl font-semibold tracking-tight leading-[1] max-w-4xl ${
            isDark ? "text-white" : "text-[var(--color-mp-ink)]"
          }`}
        >
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-[var(--color-mp-red)]">{highlight}</span>
            </>
          )}
        </h1>
        <p
          className={`mt-6 text-lg md:text-xl max-w-2xl leading-relaxed ${
            isDark ? "text-white/70" : "text-[var(--color-mp-text-soft)]"
          }`}
        >
          {subtitle}
        </p>
      </Container>
    </section>
  );
}

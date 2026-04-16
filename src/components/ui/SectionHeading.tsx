import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
          — {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg text-foreground/60 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

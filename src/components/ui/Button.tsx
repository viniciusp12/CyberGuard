import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent/90 hover:shadow-[0_0_0_1px_rgba(180,124,255,0.35),0_8px_32px_-8px_rgba(180,124,255,0.45)]",
  secondary:
    "bg-surface-elevated text-foreground border border-surface-border hover:border-accent/40 hover:text-accent",
  ghost: "text-foreground/70 hover:text-foreground hover:bg-surface-elevated",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps & ComponentProps<"button">;
type LinkProps = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: LinkProps) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

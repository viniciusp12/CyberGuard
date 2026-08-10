import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "perigo";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-mono font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-signal-amber text-page hover:bg-[#F2B558]",
  secondary:
    "border border-line-strong text-ink hover:border-signal-amber hover:text-signal-amber",
  ghost: "text-ink-2 hover:bg-panel hover:text-ink",
  perigo:
    "border border-signal-red/50 text-signal-red hover:bg-signal-redDim",
};

// Todos os tamanhos respeitam o alvo mínimo de toque de 44px.
const sizes: Record<Size, string> = {
  sm: "min-h-touch px-4 text-sm",
  md: "min-h-touch px-6 text-sm",
  lg: "min-h-[3.25rem] px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps & ComponentProps<"button">;
type LinkProps = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href"
  >;

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

import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/70"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full h-12 rounded-xl bg-surface-elevated border border-surface-border px-4 text-sm text-foreground placeholder:text-foreground/30",
            "focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all",
            error && "border-danger/60 focus:border-danger focus:ring-danger/20",
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

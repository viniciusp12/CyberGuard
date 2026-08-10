import { cn } from "@/lib/utils";
import { forwardRef, useId, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  /** Texto de apoio permanente, lido junto com o campo. */
  ajuda?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ajuda, className, id, ...props }, ref) => {
    const gerado = useId();
    const inputId = id ?? props.name ?? gerado;
    const erroId = `${inputId}-erro`;
    const ajudaId = `${inputId}-ajuda`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="label-field mb-2 block">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [error ? erroId : null, ajuda ? ajudaId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={cn(
            "min-h-touch w-full rounded-sm border bg-panel px-4 font-mono text-base text-ink transition-colors duration-200",
            "placeholder:text-ink-3 hover:border-ink-3 focus:outline-none focus-visible:outline-none",
            error
              ? "border-signal-red focus:border-signal-red"
              : "border-line-strong focus:border-signal-amber",
            className,
          )}
          {...props}
        />
        {ajuda && !error && (
          <p id={ajudaId} className="mt-2 text-sm leading-relaxed text-ink-3">
            {ajuda}
          </p>
        )}
        {error && (
          <p id={erroId} className="mt-2 text-sm text-signal-red">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

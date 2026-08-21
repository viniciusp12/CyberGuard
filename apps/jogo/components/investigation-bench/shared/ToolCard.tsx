import { type LucideIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToolCard({
  icon: Icon,
  label,
  costSeconds,
  isUsed,
  isSelected,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  costSeconds: number;
  isUsed: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-2",
        isSelected && "border-primary/50 bg-primary/10",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", isUsed ? "text-success" : "text-text-muted")} />
      <span className="flex-1 font-medium text-text">{label}</span>
      {isUsed ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
      ) : (
        <span className="shrink-0 rounded bg-surface-3 px-1.5 py-0.5 text-xs text-text-muted">
          -{costSeconds}s
        </span>
      )}
    </button>
  );
}

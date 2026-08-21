import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function TimerDisplay({ secondsRemaining }: { secondsRemaining: number }) {
  const totalSeconds = Math.max(0, Math.ceil(secondsRemaining));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const isLow = totalSeconds <= 20;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-pixel text-[11px] tabular-nums",
        isLow && "border-danger/60 text-danger animate-pulse",
      )}
    >
      <Clock className="h-4 w-4" />
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}

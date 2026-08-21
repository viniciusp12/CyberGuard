import { AlertTriangle, PhoneCall, Zap, ShoppingCart, Wifi, ServerCrash, type LucideIcon } from "lucide-react";
import type { GameEvent } from "@repo/shared/schemas";

const EVENT_ICON: Record<GameEvent["type"], LucideIcon> = {
  boss_call: PhoneCall,
  message_burst: Zap,
  black_friday: ShoppingCart,
  slow_internet: Wifi,
  system_crash: ServerCrash,
};

export function EventBanner({ event }: { event: GameEvent }) {
  const Icon = EVENT_ICON[event.type] ?? AlertTriangle;
  return (
    <div className="flex items-center gap-2 border-b border-warning/50 bg-warning/15 px-4 py-2 text-sm font-medium text-warning">
      <Icon className="h-4 w-4 shrink-0" />
      {event.message}
    </div>
  );
}

export function EventBannerStack({ events }: { events: GameEvent[] }) {
  if (events.length === 0) return null;
  return (
    <div className="flex flex-col">
      {events.map((event) => (
        <EventBanner key={event.id} event={event} />
      ))}
    </div>
  );
}

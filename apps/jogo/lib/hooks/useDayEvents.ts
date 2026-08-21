"use client";

import { useEffect, useRef } from "react";
import type { PlayingState, PhaseAction } from "@repo/shared/engine";

export function useDayEvents(state: PlayingState, dispatch: (action: PhaseAction) => void) {
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const toFire = state.day.events.filter(
      (event) => event.triggerAfterEmailIndex === state.currentEmailIndex && !firedRef.current.has(event.id),
    );
    toFire.forEach((event) => {
      firedRef.current.add(event.id);
      dispatch({ type: "TRIGGER_EVENT", event });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EVENT", eventId: event.id });
      }, event.durationSeconds * 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentEmailIndex]);
}

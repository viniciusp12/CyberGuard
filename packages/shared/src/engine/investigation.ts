import type { Email, InvestigationHint, InvestigationToolId } from "../schemas/email.schema";

export interface RevealedInvestigation {
  hint: InvestigationHint;
  value: unknown;
}

/**
 * Resolves a dot-path like "attachments[0].fileName" against an email object.
 * Supports array indices in brackets. Returns undefined if the path doesn't resolve.
 */
export function resolveFieldPath(source: unknown, path: string): unknown {
  const segments = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  return segments.reduce<unknown>((acc, segment) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[segment];
  }, source);
}

export function getInvestigationHint(
  email: Email,
  toolId: InvestigationToolId,
): InvestigationHint | undefined {
  return email.investigationHints.find((hint) => hint.toolId === toolId);
}

export function revealInvestigation(
  email: Email,
  toolId: InvestigationToolId,
): RevealedInvestigation | undefined {
  const hint = getInvestigationHint(email, toolId);
  if (!hint) return undefined;
  return { hint, value: resolveFieldPath(email, hint.revealsField) };
}

export function availableToolIds(email: Email): InvestigationToolId[] {
  return email.investigationHints.map((hint) => hint.toolId);
}

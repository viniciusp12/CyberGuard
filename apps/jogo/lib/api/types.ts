import type { Achievement, PhaseResultSummary } from "@repo/shared/schemas";

export type UserRole = "ADMIN" | "EMPLOYEE";

export interface PlayerProfile {
  schemaVersion: 1;
  id: string;
  username: string;
  email: string | null;
  playerName: string;
  department: string | null;
  role: UserRole;
  mustChangePassword: boolean;
  level: number;
  xp: number;
  money: number;
  reputation: number;
  ownedUpgradeIds: string[];
  unlockedAchievementIds: string[];
  completedDayIds: string[];
  phaseHistory: PhaseResultSummary[];
}

export interface SavePhaseResultResponse {
  profile: PlayerProfile;
  newlyUnlocked: Achievement[];
  alreadyCompleted: boolean;
  xpAwarded: number;
  moneyAwarded: number;
}

export interface RankingEntry {
  rank: number;
  id: string;
  displayName: string;
  department: string | null;
  xp: number;
  money: number;
  level: number;
  isCurrentUser: boolean;
}

export interface RankingResponse {
  entries: RankingEntry[];
}

export interface Employee {
  id: string;
  username: string;
  displayName: string;
  department: string | null;
  role: UserRole;
  mustChangePassword: boolean;
  level: number;
  xp: number;
  createdAt: string;
}

export interface CreateEmployeeResponse {
  user: Pick<Employee, "id" | "username" | "displayName" | "department" | "role">;
  temporaryPassword: string;
}

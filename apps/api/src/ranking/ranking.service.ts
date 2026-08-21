import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { levelForXp } from "@repo/shared/engine";

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  async getRanking(currentUserId: string) {
    const users = await this.prisma.user.findMany({
      where: { role: "EMPLOYEE" },
      orderBy: { xp: "desc" },
      take: 100,
      select: { id: true, displayName: true, department: true, xp: true, money: true },
    });

    const entries = users.map((u, i) => ({
      rank: i + 1,
      id: u.id,
      displayName: u.displayName,
      department: u.department,
      xp: u.xp,
      money: u.money,
      level: levelForXp(u.xp),
      isCurrentUser: u.id === currentUserId,
    }));

    return { entries };
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

/**
 * Ranking por DEPARTAMENTO, nunca por pessoa.
 *
 * Exigência da empresa, e é por lei (LGPD): expor um placar nominal de
 * desempenho de funcionário é tratar dado pessoal de um jeito que pode
 * constranger e prejudicar quem aparece embaixo. Então o placar deixou de ter
 * nome, id e posição individual — soma os pontos por setor e mostra só o setor
 * e o total.
 *
 * O que este serviço devolve NÃO contém: nome de pessoa, id de pessoa, a
 * posição de ninguém, nem quantas pessoas há em cada setor (esse último para
 * dificultar deduzir o desempenho de alguém num setor pequeno).
 *
 * O único dado ligado ao usuário atual é o NOME do próprio setor dele, para a
 * tela poder destacar "o seu setor" — e isso a pessoa já sabe sobre si mesma.
 */
@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  async getRanking(currentUserId: string) {
    const users = await this.prisma.user.findMany({
      where: { role: "EMPLOYEE" },
      select: { id: true, department: true, xp: true },
    });

    // Agrupa por setor. A chave normaliza (minúsculas, espaços colapsados) para
    // que "TI" e "ti" contem como o mesmo setor; o rótulo exibido é a primeira
    // forma que apareceu, preservando a grafia de quem cadastrou.
    const grupos = new Map<string, { label: string; xp: number }>();
    let currentKey: string | null = null;

    for (const u of users) {
      const bruto = (u.department ?? "").trim().replace(/\s+/g, " ");
      const key = bruto.toLowerCase() || "__sem_setor__";
      const label = bruto || "Sem setor";

      const grupo = grupos.get(key) ?? { label, xp: 0 };
      grupo.xp += u.xp;
      grupos.set(key, grupo);

      if (u.id === currentUserId) currentKey = key;
    }

    const entries = [...grupos.values()]
      .sort((a, b) => b.xp - a.xp)
      .map((g, i) => ({ rank: i + 1, department: g.label, xp: g.xp }));

    return {
      entries,
      currentDepartment: currentKey ? grupos.get(currentKey)!.label : null,
    };
  }
}

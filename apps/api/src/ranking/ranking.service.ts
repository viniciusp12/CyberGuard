import { Injectable } from "@nestjs/common";
import type { Role } from "@prisma/client";
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
 *
 * ── Exceção para uso acadêmico ──────────────────────────────────────────────
 *
 * `RANKING_INDIVIDUAL_DEPARTMENT` liga um placar individual para UM setor só,
 * pensado para turma de faculdade, onde os participantes são contas
 * descartáveis e pseudônimas ("Aluno 35") criadas para a aula, e a disputa
 * entre alunos é o próprio objetivo didático.
 *
 * Três limites de propósito:
 *   1. Só vale para o setor nomeado na variável. Qualquer outro setor continua
 *      vendo apenas o placar somado, sem nome.
 *   2. Recebem a lista: quem PERTENCE a esse setor e quem é ADMIN — o
 *      professor precisa dela para premiar, e o administrador já enxerga
 *      todo mundo pelo nome no painel de administração, então isso não
 *      revela nada novo para ele. Um funcionário de OUTRO setor não vê.
 *   3. Sem a variável definida, o comportamento é exatamente o de antes.
 *
 * Para desligar: apague a variável de ambiente e republique. Nada mais muda.
 * Ela NÃO deve ficar ligada num ambiente com gente de verdade.
 */

/** Mesma normalização do agrupamento: "TI", "ti " e "Ti" são o mesmo setor. */
function normalizar(valor: string | null | undefined): string {
  return (valor ?? "").trim().replace(/\s+/g, " ");
}

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  async getRanking(currentUserId: string, currentUserRole: Role) {
    const users = await this.prisma.user.findMany({
      where: { role: "EMPLOYEE" },
      select: { id: true, department: true, xp: true, displayName: true },
    });

    // Agrupa por setor. A chave normaliza (minúsculas, espaços colapsados) para
    // que "TI" e "ti" contem como o mesmo setor; o rótulo exibido é a primeira
    // forma que apareceu, preservando a grafia de quem cadastrou.
    const grupos = new Map<string, { label: string; xp: number }>();
    let currentKey: string | null = null;

    for (const u of users) {
      const bruto = normalizar(u.department);
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
      individual: this.rankingIndividual(users, currentUserId, currentKey, currentUserRole),
    };
  }

  /**
   * Placar individual do setor de turma, ou null quando o recurso está
   * desligado ou quem pergunta não é da turma.
   */
  private rankingIndividual(
    users: { id: string; department: string | null; xp: number; displayName: string }[],
    currentUserId: string,
    currentKey: string | null,
    currentUserRole: Role,
  ) {
    const turma = normalizar(process.env.RANKING_INDIVIDUAL_DEPARTMENT).toLowerCase();
    if (!turma) return null;

    const podeVer = currentUserRole === "ADMIN" || currentKey === turma;
    if (!podeVer) return null;

    return users
      .filter((u) => normalizar(u.department).toLowerCase() === turma)
      .sort((a, b) => b.xp - a.xp || a.displayName.localeCompare(b.displayName))
      .map((u, i) => ({
        rank: i + 1,
        name: u.displayName,
        xp: u.xp,
        isYou: u.id === currentUserId,
      }));
  }
}

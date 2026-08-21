import type { DictionaryTable } from "../dictionary";

export const adminPages: DictionaryTable = {
  pageTitle: { pt: "Painel Admin", en: "Admin Panel" },
  pageDescription: { pt: "Cadastre funcionários com acesso ao jogo.", en: "Register employees with access to the game." },
  provisionalPasswordFor: { pt: "Senha provisória para", en: "Temporary password for" },
  provisionalPasswordNote: {
    pt: "Anote e compartilhe agora — ela não será exibida novamente. O funcionário deverá trocá-la no primeiro acesso.",
    en: "Write it down and share it now — it won't be shown again. The employee will need to change it on first login.",
  },
  registerEmployee: { pt: "Cadastrar funcionário", en: "Register employee" },
  usernamePlaceholder: { pt: "Nome de usuário", en: "Username" },
  fullNamePlaceholder: { pt: "Nome completo", en: "Full name" },
  departmentPlaceholder: { pt: "Departamento (opcional)", en: "Department (optional)" },
  createFallbackError: { pt: "Não foi possível cadastrar.", en: "Could not register the employee." },
  registering: { pt: "Cadastrando...", en: "Registering..." },
  register: { pt: "Cadastrar", en: "Register" },
  provisionalPasswordBadge: { pt: "Senha provisória", en: "Temporary password" },
  levelAbbrev: { pt: "Nv {{level}}", en: "Lvl {{level}}" },
  resetPassword: { pt: "Resetar senha", en: "Reset password" },
  removeConfirm: { pt: "Remover e apagar progresso?", en: "Remove and erase progress?" },
};

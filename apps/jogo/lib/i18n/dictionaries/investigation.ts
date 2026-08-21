import type { DictionaryTable } from "../dictionary";

export const investigation: DictionaryTable = {
  benchTitle: { pt: "Bancada de Investigação", en: "Investigation Bench" },

  runToolPrompt: {
    pt: "Execute esta ferramenta para revelar as informações.",
    en: "Run this tool to reveal the information.",
  },
  runButton: { pt: "Executar (-{{cost}}s)", en: "Run (-{{cost}}s)" },

  domainLabel: { pt: "Domínio", en: "Domain" },
  yes: { pt: "Sim", en: "Yes" },
  no: { pt: "Não", en: "No" },

  aiUnavailable: {
    pt: "IA Corporativa não conseguiu analisar este email.",
    en: "Corporate AI could not analyze this email.",
  },
  phishingProbabilityLabel: { pt: "Probabilidade de phishing", en: "Phishing probability" },
  aiDisclaimer: {
    pt: "Lembre-se: a IA Corporativa é uma ferramenta de apoio e pode errar, especialmente em golpes mais sofisticados.",
    en: "Remember: Corporate AI is a support tool and can be wrong, especially with more sophisticated scams.",
  },

  noAttachments: { pt: "Este email não possui anexos.", en: "This email has no attachments." },
  fileNameLabel: { pt: "Nome do arquivo", en: "File name" },
  declaredExtensionLabel: { pt: "Extensão declarada", en: "Declared extension" },
  actualTypeLabel: { pt: "Tipo real detectado", en: "Actual detected type" },
  sizeLabel: { pt: "Tamanho", en: "Size" },
  hasMacroLabel: { pt: "Contém macro", en: "Contains macro" },

  noHttpsLink: {
    pt: "Nenhum link HTTPS para analisar certificado.",
    en: "No HTTPS link to analyze certificate.",
  },
  companyLabel: { pt: "Empresa", en: "Company" },
  issuerLabel: { pt: "Emissor", en: "Issuer" },
  validityLabel: { pt: "Validade", en: "Validity" },
  certificateValidLabel: { pt: "Certificado válido", en: "Certificate valid" },
  certValidYes: { pt: "sim", en: "yes" },
  certValidNo: { pt: "não", en: "no" },

  senderDomainLabel: { pt: "Domínio do remetente", en: "Sender domain" },
  noReputationData: {
    pt: "Nenhum dado adicional de reputação disponível para este domínio.",
    en: "No additional reputation data available for this domain.",
  },

  originServerLabel: { pt: "Servidor de origem", en: "Origin server" },
  originIpLabel: { pt: "IP de origem", en: "Origin IP" },
  routeLabel: { pt: "Rota", en: "Route" },

  noRecordFound: {
    pt: "Nenhum registro encontrado para este remetente.",
    en: "No record found for this sender.",
  },
  internalStatusLabel: { pt: "Status no banco interno", en: "Internal database status" },
  observationsLabel: { pt: "Observações", en: "Notes" },
  statusTrustedVendor: { pt: "Fornecedor confiável", en: "Trusted vendor" },
  statusNeverUsed: { pt: "Remetente nunca utilizado", en: "Sender never used before" },
  statusRecentDomain: { pt: "Domínio recém-criado", en: "Recently created domain" },
  statusPreviouslyReported: { pt: "Email já denunciado", en: "Email previously reported" },

  noLinks: { pt: "Este email não contém links.", en: "This email contains no links." },
  linkPointsTo: { pt: '"{{text}}" aponta para', en: '"{{text}}" points to' },

  noQrCode: { pt: "Este email não contém QR Code.", en: "This email contains no QR code." },
  qrDestinationLabel: { pt: "Destino real do QR Code", en: "QR code's real destination" },

  noAttachmentToTest: {
    pt: "Nenhum anexo para testar em sandbox.",
    en: "No attachment to test in sandbox.",
  },
  runningInSandbox: {
    pt: "Executando {{fileName}} em ambiente isolado...",
    en: "Running {{fileName}} in an isolated environment...",
  },
  outcomeNoActivity: {
    pt: "Nenhuma atividade suspeita detectada.",
    en: "No suspicious activity detected.",
  },
  outcomeRansomware: {
    pt: "Tentativa de criptografar arquivos detectada.",
    en: "Attempt to encrypt files detected.",
  },
  outcomeSuspiciousConnection: {
    pt: "Conexão de rede suspeita detectada.",
    en: "Suspicious network connection detected.",
  },
  outcomeMalwareDownload: {
    pt: "Tentativa de download de malware adicional.",
    en: "Attempt to download additional malware.",
  },
  outcomeRegistryChange: {
    pt: "Alteração suspeita no registro do sistema.",
    en: "Suspicious change to the system registry.",
  },
  outcomeProcessCreation: {
    pt: "Criação de processos não solicitados.",
    en: "Creation of unrequested processes.",
  },

  displayNameLabel: { pt: "Nome exibido", en: "Display name" },
  fullAddressLabel: { pt: "Endereço completo", en: "Full address" },

  noOutOfBandCheck: {
    pt: "Nenhum contato conhecido para confirmar por outro canal.",
    en: "No known contact to confirm through another channel.",
  },
  outOfBandDialing: {
    pt: "Ligando para o contato já confirmado anteriormente...",
    en: "Calling the previously confirmed contact...",
  },
  outOfBandChannelLabel: { pt: "Canal usado", en: "Channel used" },
  outOfBandOutcomeLabel: { pt: "Resultado", en: "Result" },
  outOfBandOutcomeConfirmedLegitimate: {
    pt: "O contato confirmou: o envio é legítimo.",
    en: "The contact confirmed: the message is legitimate.",
  },
  outOfBandOutcomeConfirmedFraud: {
    pt: "O contato confirmou: eles NÃO enviaram isso. É fraude.",
    en: "The contact confirmed: they did NOT send this. It's fraud.",
  },
  outOfBandOutcomeUnreachable: {
    pt: "Não foi possível confirmar por esse canal a tempo.",
    en: "Could not confirm through this channel in time.",
  },
};

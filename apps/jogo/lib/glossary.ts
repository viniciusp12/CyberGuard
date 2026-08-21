import type { Locale } from "./i18n/locale";

export interface GlossaryTerm {
  id: string;
  term: Record<Locale, string>;
  definition: Record<Locale, string>;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "phishing",
    term: { pt: "Phishing", en: "Phishing" },
    definition: {
      pt: "Emails, mensagens ou sites falsos que fingem ser de uma empresa ou pessoa confiável para roubar suas senhas, dados ou dinheiro.",
      en: "Fake emails, messages, or websites that pretend to be from a trusted company or person to steal your passwords, data, or money.",
    },
  },
  {
    id: "engenharia_social",
    term: { pt: "Engenharia social", en: "Social engineering" },
    definition: {
      pt: "Técnicas de manipulação psicológica usadas por golpistas para te convencer a baixar a guarda — geralmente com urgência, medo ou autoridade falsa — e agir sem pensar.",
      en: "Psychological manipulation techniques scammers use to make you drop your guard — usually with urgency, fear, or fake authority — so you act without thinking.",
    },
  },
  {
    id: "malware",
    term: { pt: "Malware", en: "Malware" },
    definition: {
      pt: "Qualquer programa malicioso feito para prejudicar seu computador, roubar dados ou espionar você.",
      en: "Any malicious program designed to damage your computer, steal data, or spy on you.",
    },
  },
  {
    id: "ransomware",
    term: { pt: "Ransomware", en: "Ransomware" },
    definition: {
      pt: 'Tipo de malware que "sequestra" seus arquivos, criptografando-os, e exige pagamento de resgate para devolvê-los.',
      en: 'A type of malware that "kidnaps" your files by encrypting them and demands a ransom payment to give them back.',
    },
  },
  {
    id: "qr_falso",
    term: { pt: "QR Code falso", en: "Fake QR code" },
    definition: {
      pt: "Um código QR malicioso que, ao ser escaneado, leva a um site falso ou baixa um vírus — driblando a atenção que normalmente damos a links de texto.",
      en: "A malicious QR code that, when scanned, leads to a fake website or downloads a virus — bypassing the attention we normally give to text links.",
    },
  },
  {
    id: "link_malicioso",
    term: { pt: "Link malicioso", en: "Malicious link" },
    definition: {
      pt: "Um link cujo destino real é diferente do que aparenta, geralmente levando a páginas falsas de login ou a downloads perigosos.",
      en: "A link whose real destination is different from what it appears to be, usually leading to fake login pages or dangerous downloads.",
    },
  },
  {
    id: "senha_fraca",
    term: { pt: "Senha fraca", en: "Weak password" },
    definition: {
      pt: "Senhas fáceis de adivinhar ou reutilizadas em vários serviços, o que facilita a invasão de contas.",
      en: "Passwords that are easy to guess or reused across multiple services, which makes accounts easier to break into.",
    },
  },
  {
    id: "mfa",
    term: { pt: "MFA (autenticação em duas etapas)", en: "MFA (two-factor authentication)" },
    definition: {
      pt: "Uma camada extra de segurança que exige, além da senha, um segundo código (aplicativo, SMS etc.) para confirmar que é realmente você entrando na conta.",
      en: "An extra layer of security that requires, besides the password, a second code (app, SMS, etc.) to confirm it's really you logging in.",
    },
  },
  {
    id: "usb_infectado",
    term: { pt: "USB infectado", en: "Infected USB drive" },
    definition: {
      pt: "Um pendrive ou dispositivo USB que contém vírus, projetado para infectar qualquer computador em que for conectado.",
      en: "A USB drive or device that carries a virus, designed to infect any computer it's plugged into.",
    },
  },
  {
    id: "whatsapp_falso",
    term: { pt: "WhatsApp falso", en: "Fake WhatsApp contact" },
    definition: {
      pt: "Perfis clonados ou números desconhecidos se passando por colegas, chefes ou empresas para pedir dinheiro ou dados.",
      en: "Cloned profiles or unknown numbers pretending to be coworkers, bosses, or companies to ask for money or personal data.",
    },
  },
  {
    id: "sms_falso",
    term: { pt: "SMS falso (smishing)", en: "Fake SMS (smishing)" },
    definition: {
      pt: "Mensagens de texto fraudulentas que imitam bancos, entregadoras ou empresas para roubar informações.",
      en: "Fraudulent text messages that imitate banks, delivery companies, or businesses to steal information.",
    },
  },
  {
    id: "microsoft_falso",
    term: { pt: "Suporte técnico falso", en: "Fake tech support" },
    definition: {
      pt: "Golpes que fingem ser suporte técnico de uma empresa conhecida (Microsoft, por exemplo) pedindo acesso remoto ao computador ou dados da conta.",
      en: "Scams that pretend to be tech support from a well-known company (Microsoft, for example) asking for remote access to your computer or account details.",
    },
  },
  {
    id: "fornecedor_comprometido",
    term: { pt: "Fornecedor comprometido", en: "Compromised vendor" },
    definition: {
      pt: "Quando a conta de email de um fornecedor real é invadida e usada para enviar cobranças ou pedidos falsos que parecem completamente legítimos.",
      en: "When a real vendor's email account is hijacked and used to send fake invoices or requests that look completely legitimate.",
    },
  },
  {
    id: "bec",
    term: { pt: "BEC (fraude de email corporativo)", en: "BEC (business email compromise)" },
    definition: {
      pt: "Golpe em que criminosos se passam por um executivo ou colega, geralmente por email, para pedir transferências urgentes de dinheiro.",
      en: "A scam where criminals impersonate an executive or coworker, usually by email, to request urgent money transfers.",
    },
  },
  {
    id: "pix_falso",
    term: { pt: "PIX falso", en: "Fake instant payment" },
    definition: {
      pt: "Cobranças ou solicitações de pagamento instantâneo fraudulentas, muitas vezes com QR codes ou chaves de pagamento alteradas.",
      en: "Fraudulent instant-payment charges or requests, often using altered QR codes or payment keys.",
    },
  },
  {
    id: "boleto_adulterado",
    term: { pt: "Boleto adulterado", en: "Tampered invoice slip" },
    definition: {
      pt: "Um boleto de pagamento real que foi alterado — código de barras, valor ou dados do beneficiário — para redirecionar o dinheiro para os golpistas.",
      en: "A real payment slip that has been altered — barcode, amount, or recipient details — to redirect the money to scammers.",
    },
  },
  {
    id: "deepfake",
    term: { pt: "Deepfake", en: "Deepfake" },
    definition: {
      pt: "Vídeos ou áudios falsos gerados por inteligência artificial que imitam o rosto ou a voz de uma pessoa real de forma convincente.",
      en: "Fake videos or audio generated by artificial intelligence that convincingly mimic a real person's face or voice.",
    },
  },
  {
    id: "anexo_perigoso",
    term: { pt: "Anexo perigoso", en: "Dangerous attachment" },
    definition: {
      pt: "Arquivos anexados a emails que escondem vírus, muitas vezes disfarçados com nomes ou extensões enganosas (como um \"documento.pdf.exe\").",
      en: 'Email attachments that hide viruses, often disguised with misleading names or extensions (like a "document.pdf.exe").',
    },
  },
  {
    id: "spf_dkim_dmarc",
    term: { pt: "SPF, DKIM e DMARC", en: "SPF, DKIM, and DMARC" },
    definition: {
      pt: 'Sistemas técnicos que servidores de email usam para checar se uma mensagem realmente veio do domínio que ela alega. Quando aparecem como "fail", é um forte sinal de que o email foi falsificado.',
      en: 'Technical systems email servers use to check whether a message really came from the domain it claims. When they show as "fail," that\'s a strong sign the email was forged.',
    },
  },
  {
    id: "certificado_digital",
    term: { pt: "Certificado digital (HTTPS)", en: "Digital certificate (HTTPS)" },
    definition: {
      pt: "Prova de que a conexão com um site é criptografada. Importante: um site pode ter certificado válido e mesmo assim ser malicioso — o certificado garante a conexão segura, não garante que o site é confiável.",
      en: "Proof that the connection to a website is encrypted. Important: a site can have a valid certificate and still be malicious — the certificate guarantees a secure connection, not that the site is trustworthy.",
    },
  },
  {
    id: "dominio_falso",
    term: { pt: "Domínio falso ou parecido", en: "Fake or lookalike domain" },
    definition: {
      pt: "Endereços de site que imitam o nome de uma empresa real trocando ou adicionando letras (por exemplo, leroymerlin-suporte.com em vez do domínio oficial).",
      en: "Website addresses that imitate a real company's name by swapping or adding letters (for example, leroymerlin-support.com instead of the official domain).",
    },
  },
  {
    id: "sandbox",
    term: { pt: "Sandbox", en: "Sandbox" },
    definition: {
      pt: "Um ambiente isolado e seguro onde é possível testar um arquivo suspeito sem risco de ele infectar o computador de verdade.",
      en: "An isolated, safe environment where a suspicious file can be tested without risking infection of the real computer.",
    },
  },
];

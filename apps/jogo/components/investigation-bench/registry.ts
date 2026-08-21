import { AtSign, Link2, Globe, FileSearch, QrCode, Terminal, BadgeCheck, Database, FlaskConical, Sparkles, Phone } from "lucide-react";
import { GAME_CONFIG } from "@repo/shared/engine";
import type { ToolRegistryEntry } from "./types";
import { SenderAddressTool } from "./tools/SenderAddressTool";
import { LinkHoverTool } from "./tools/LinkHoverTool";
import { DomainInspectTool } from "./tools/DomainInspectTool";
import { AttachmentAnalysisTool } from "./tools/AttachmentAnalysisTool";
import { QrCodeTool } from "./tools/QrCodeTool";
import { HeaderInspectTool } from "./tools/HeaderInspectTool";
import { CertificateTool } from "./tools/CertificateTool";
import { InternalDbLookupTool } from "./tools/InternalDbLookupTool";
import { SandboxTool } from "./tools/SandboxTool";
import { AiAssistantTool } from "./tools/AiAssistantTool";
import { OutOfBandVerifyTool } from "./tools/OutOfBandVerifyTool";

export const INVESTIGATION_TOOL_REGISTRY: ToolRegistryEntry[] = [
  {
    id: "sender_address",
    label: "Endereço do remetente",
    icon: AtSign,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.sender_address,
    Component: SenderAddressTool,
  },
  {
    id: "link_hover",
    label: "Inspecionar links",
    icon: Link2,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.link_hover,
    Component: LinkHoverTool,
  },
  {
    id: "domain_inspect",
    label: "Inspecionar domínio",
    icon: Globe,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.domain_inspect,
    Component: DomainInspectTool,
  },
  {
    id: "attachment_analysis",
    label: "Analisar anexos",
    icon: FileSearch,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.attachment_analysis,
    Component: AttachmentAnalysisTool,
  },
  {
    id: "qr_preview",
    label: "Visualizar QR Code",
    icon: QrCode,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.qr_preview,
    Component: QrCodeTool,
  },
  {
    id: "header_inspect",
    label: "Ler cabeçalho",
    icon: Terminal,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.header_inspect,
    Component: HeaderInspectTool,
  },
  {
    id: "certificate_view",
    label: "Ver certificado",
    icon: BadgeCheck,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.certificate_view,
    Component: CertificateTool,
  },
  {
    id: "internal_db_lookup",
    label: "Pesquisar remetente",
    icon: Database,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.internal_db_lookup,
    Component: InternalDbLookupTool,
  },
  {
    id: "sandbox_execution",
    label: "Abrir em Sandbox",
    icon: FlaskConical,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.sandbox_execution,
    Component: SandboxTool,
  },
  {
    id: "ai_assistant",
    label: "Consultar IA Corporativa",
    icon: Sparkles,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.ai_assistant,
    Component: AiAssistantTool,
  },
  {
    id: "out_of_band_verify",
    label: "Confirmar por outro canal",
    icon: Phone,
    costSeconds: GAME_CONFIG.investigationTimeCostSeconds.out_of_band_verify,
    Component: OutOfBandVerifyTool,
  },
];

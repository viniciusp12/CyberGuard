import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SobreContent } from "./SobreContent";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "Conheça o CyberGuard, programa de conscientização em segurança cibernética em parceria com a Leroy Merlin.",
};

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quem somos"
        title="Transformando conhecimento em proteção real"
        description="O CyberGuard nasceu de um Challenge acadêmico em parceria com a Leroy Merlin: criar uma plataforma de conscientização cibernética capaz de engajar milhares de colaboradores e transformar segurança em cultura viva."
      />
      <SobreContent />
    </>
  );
}

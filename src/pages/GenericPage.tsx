import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

interface GenericPageProps {
  title: string;
  subtitle?: string;
  difficulty?: "iniciante" | "intermediario" | "avancado";
  timeToRead?: string;
}

export default function GenericPage({ title, subtitle, difficulty = "iniciante", timeToRead = "em breve" }: GenericPageProps) {
  return (
    <PageContainer title={title} subtitle={subtitle} difficulty={difficulty} timeToRead={timeToRead}>
      <AlertBox type="info" title="Seção em desenvolvimento">
        Este módulo está sendo elaborado. O conteúdo completo estará disponível em breve.
        Por enquanto, explore a seção <strong>SSH</strong> que já está disponível com todo o conteúdo.
      </AlertBox>
      <p>
        Este guia cobre Termux 0.118 e Termux 0.118. Cada seção será estruturada com
        exemplos práticos, blocos de código copiáveis e explicações detalhadas em português.
      </p>
    </PageContainer>
  );
}

import { Link } from "wouter";
import { Terminal as TerminalIcon, Home as HomeIcon } from "lucide-react";
import { Terminal, Command } from "@/components/ui/Terminal";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-8xl font-black text-[#5EBE5E] mb-2 font-display">404</h1>
          <h2 className="text-2xl font-bold text-white mb-2 mt-0 border-0" style={{ borderBottom: "none" }}>
            Página não encontrada
          </h2>
          <p className="text-[#888A85]">O comando solicitado não retornou resultados.</p>
        </div>

        <Terminal title="bash: erro 404">
          <Command
            command="cd /pagina-procurada"
            output={`bash: cd: /pagina-procurada: No such file or directory`}
          />
          <Command
            command="cd /"
            output={`# Voltando para a página inicial...`}
          />
        </Terminal>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5EBE5E] text-white font-bold hover:bg-[#6FD672] transition-colors"
            style={{ borderBottom: "none" }}
          >
            <HomeIcon className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}

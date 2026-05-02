import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Terminal, HardDrive, BookOpen, Shield, Cpu, ChevronRight,
  Package, Settings, Network, Server, Globe, Code2, Cloud,
  Smartphone, Database, Container, Lock, Music, Power, Zap,
  ArrowRight, Sparkles, GitBranch, Rocket, Users, FileText,
  Wifi, Key,
} from "lucide-react";

const LEARNING_PATH = [
  { num: "01", title: "O que é Termux", desc: "História, arquitetura e por que NÃO é root", icon: Sparkles, path: "/historia", color: "#5EBE5E" },
  { num: "02", title: "Instalação", desc: "F-Droid, GitHub, Google Play (descontinuado)", icon: Power, path: "/instalacao", color: "#5EBE5E" },
  { num: "03", title: "Primeiros Passos", desc: "Layout do teclado, gestos, sessões", icon: Smartphone, path: "/primeiros-passos", color: "#8AE234" },
  { num: "04", title: "Bash no Termux", desc: "Shell, prompt, atalhos e history", icon: Terminal, path: "/shell-bash", color: "#8AE234" },
  { num: "05", title: "Arquivos & Permissões", desc: "Manipular, comprimir e redirecionar", icon: FileText, path: "/manipulacao-arquivos", color: "#729FCF" },
  { num: "06", title: "Sistema de Arquivos", desc: "$PREFIX, $HOME, sandbox Android", icon: HardDrive, path: "/sistema-arquivos", color: "#729FCF" },
  { num: "07", title: "pkg & APT", desc: "Pacotes Termux, repositórios oficiais", icon: Package, path: "/apt", color: "#FCE94F" },
  { num: "08", title: "termux-setup-storage", desc: "Acesso ao /sdcard e ao Android", icon: Settings, path: "/usuarios", color: "#C68FBE" },
  { num: "09", title: "Shell Avançado", desc: "Variáveis, aliases, expansões e scripts", icon: Zap, path: "/scripts-bash", color: "#FF9C5C" },
  { num: "10", title: "Termux:API", desc: "Bateria, GPS, SMS, câmera, sensores", icon: Smartphone, path: "/systemd", color: "#C68FBE" },
  { num: "11", title: "Termux:Boot & Tasker", desc: "Scripts no boot e automação", icon: Cpu, path: "/kernel", color: "#FCE94F" },
  { num: "12", title: "Redes & SSH", desc: "Conectar, expor e tunelar do celular", icon: Network, path: "/redes", color: "#729FCF" },
  { num: "13", title: "Servidores no Celular", desc: "Nginx, Apache, PHP rodando no Android", icon: Server, path: "/nginx", color: "#8AE234" },
  { num: "14", title: "Bancos de Dados", desc: "MariaDB e PostgreSQL no Termux", icon: Database, path: "/mysql", color: "#FCE94F" },
  { num: "15", title: "Desenvolvimento", desc: "Vim, Git, Python, Node.js e clangd", icon: Code2, path: "/vim", color: "#8AE234" },
  { num: "16", title: "proot-distro", desc: "Termux, Arch e Debian dentro do Termux", icon: Container, path: "/docker", color: "#729FCF" },
  { num: "17", title: "Hacking Ético & Pentest", desc: "Nmap, Metasploit, recon — só em redes próprias", icon: Shield, path: "/seguranca", color: "#EF2929" },
  { num: "18", title: "Termux:X11 & GUI", desc: "Interface gráfica, XFCE e VNC", icon: Music, path: "/multimedia", color: "#5EBE5E" },
];

const STATS = [
  { value: "90+", label: "Tópicos Cobertos" },
  { value: "1500+", label: "Comandos Explicados" },
  { value: "100%", label: "Português BR" },
  { value: "0.118", label: "Termux Atual" },
];

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Terminal */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F]/20 via-transparent to-[#5EBE5E]/10" />
          <div className="absolute inset-0 termux-dots opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5EBE5E]/15 text-[#5EBE5E] border border-[#5EBE5E]/30 text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-[#5EBE5E] animate-pulse" />
              GUIA COMPLETO 2025 · PORTUGUÊS BR · OPEN SOURCE
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 font-display leading-[1.05]">
              <span className="bg-gradient-to-br from-white via-white to-[#AEA79F] bg-clip-text text-transparent">
                Domine o
              </span>{" "}
              <span className="text-[#5EBE5E]">Termux</span>
            </h1>

            <p className="text-lg md:text-xl text-[#D3D7CF]/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Linux completo no seu Android. Do primeiro <code className="text-[#5EBE5E] bg-black/30 px-2 py-0.5 rounded font-mono">pkg update</code> até servidores rodando no celular, automação com Termux:API e distros completas via proot. Cada comando explicado, cada saída detalhada — sem encurtamentos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/instalacao"
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#5EBE5E] text-white font-bold shadow-xl shadow-[#5EBE5E]/30 hover:bg-[#6FD672] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                style={{ borderBottom: "none" }}
              >
                <Rocket className="w-5 h-5" />
                Instalar Termux
              </Link>
              <Link
                href="/apt"
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#1A1A1A]/80 border border-[#1F1F1F]/60 text-white font-bold hover:bg-[#1F1F1F]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                style={{ borderBottom: "none" }}
              >
                <Terminal className="w-5 h-5" />
                Pular para os Comandos
              </Link>
            </div>
          </motion.div>

          {/* Mini terminal preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="rounded-lg overflow-hidden border border-[#1F1F1F] shadow-2xl bg-[#000000] ring-1 ring-white/10">
              <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-b from-[#1F1F1F] to-[#0D0D0D] border-b border-black/40">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C75050]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C7A050]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#509650]" />
                </div>
                <span className="text-xs text-[#D8D5D2] font-medium">~ Termux</span>
                <div className="w-12" />
              </div>
              <div className="p-4 font-mono text-[13px] leading-relaxed text-[#EEEEEC]">
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-[#5EBE5E] font-bold">~ $</span>
                  <span>uname -a</span>
                </div>
                <div className="text-[#D3D7CF] mb-1 break-all">Linux localhost 5.15.74-android13-8 #1 SMP PREEMPT aarch64 Android</div>

                <div className="flex items-baseline gap-1 flex-wrap mt-2">
                  <span className="text-[#5EBE5E] font-bold">~ $</span>
                  <span>echo $PREFIX</span>
                </div>
                <div className="text-[#D3D7CF] mb-1">/data/data/com.termux/files/usr</div>

                <div className="flex items-baseline gap-1 flex-wrap mt-2">
                  <span className="text-[#5EBE5E] font-bold">~ $</span>
                  <span className="cursor-blink">pkg install nginx php nodejs</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#1F1F1F]/40 bg-[#1A1A1A]/40 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-1 font-display">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-[#AEA79F] uppercase tracking-widest font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trilha de Aprendizagem */}
      <section className="py-24 px-4 max-w-6xl mx-auto relative z-10">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F]/30 text-[#C68FBE] border border-[#1F1F1F] text-xs font-mono uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Trilha Estruturada
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display border-0 mt-0" style={{ borderBottom: "none" }}>
            <span className="text-white">Do</span>{" "}
            <span className="text-[#5EBE5E]">pkg install</span>{" "}
            <span className="text-white">ao</span>{" "}
            <span className="text-[#5EBE5E]">servidor no bolso</span>
          </h2>
          <p className="text-[#D3D7CF]/80 max-w-2xl mx-auto">
            Aprenda na ordem certa. Cada módulo construindo sobre o anterior — do básico ao Termux como ambiente profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEARNING_PATH.map((module, i) => {
            const Icon = module.icon;
            return (
              <Link key={i} href={module.path}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative h-full p-6 rounded-xl bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] border border-[#1F1F1F]/40 hover:border-[#5EBE5E]/60 hover:shadow-xl hover:shadow-[#5EBE5E]/10 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 right-0 text-[80px] font-black text-[#1F1F1F]/20 leading-none -mt-2 -mr-2 font-display select-none">
                    {module.num}
                  </div>

                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg"
                      style={{
                        background: `${module.color}20`,
                        border: `1px solid ${module.color}40`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: module.color }} />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 mt-0 font-display border-0" style={{ borderBottom: "none", padding: 0 }}>
                      {module.title}
                    </h3>
                    <p className="text-sm text-[#AEA79F] mb-5 leading-relaxed">{module.desc}</p>

                    <div
                      className="flex items-center text-sm font-medium font-mono"
                      style={{ color: module.color }}
                    >
                      cd <span className="ml-1">{module.path}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA inferior */}
      <section className="border-t border-[#1F1F1F]/40 bg-gradient-to-b from-transparent to-[#1F1F1F]/10 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display border-0 mt-0" style={{ borderBottom: "none" }}>
            Pronto para começar?
          </h2>
          <p className="text-[#D3D7CF]/80 mb-8">
            Conteúdo focado em <strong className="text-[#5EBE5E]">Termux 0.118+</strong> instalado via{" "}
            <strong className="text-[#5EBE5E]">F-Droid</strong> ou GitHub. Atualizado, completo e em
            português brasileiro.
          </p>
          <Link
            href="/historia"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5EBE5E] text-white font-bold hover:bg-[#6FD672] transition-all"
            style={{ borderBottom: "none" }}
          >
            Começar a leitura
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

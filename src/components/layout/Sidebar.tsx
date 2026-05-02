import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BookOpen, Terminal, HardDrive, Shield, Settings, FileText, Users,
  Network, Cpu, Clock, History, PenTool, Search, X, Package, Server,
  Code2, Database, Cloud, Monitor, Music, Gamepad2, Lock, Wrench,
  RotateCcw, Globe, Container, Wifi, Archive, Key, Layers, ChevronDown,
  Power, Zap, Folder, Boxes, Rocket, Bug, GitBranch, Sparkles,
} from "lucide-react";

const NAVIGATION = [
  {
    title: "Boas-vindas",
    icon: Sparkles,
    items: [
      { path: "/", label: "Início", icon: BookOpen },
      { path: "/historia", label: "História do Ubuntu", icon: History },
      { path: "/filosofia", label: "Filosofia & Comunidade", icon: PenTool },
    ],
  },
  {
    title: "Instalação & Setup Inicial",
    icon: Power,
    items: [
      { path: "/instalacao", label: "Guia de Instalação", icon: HardDrive },
      { path: "/primeiros-passos", label: "Primeiros Passos", icon: Clock },
      { path: "/ambiente-grafico", label: "GNOME Desktop", icon: Monitor },
      { path: "/localizacao", label: "Idioma & Timezone", icon: Globe },
    ],
  },
  {
    title: "Terminal: Primeiros Passos",
    icon: Terminal,
    items: [
      { path: "/shell-bash", label: "Shell Bash", icon: Terminal },
      { path: "/man-pages", label: "Manual (man, info, --help)", icon: BookOpen },
      { path: "/navegacao", label: "Navegação (cd, ls, pwd)", icon: Folder },
      { path: "/visualizacao", label: "Ver arquivos (cat, less)", icon: FileText },
    ],
  },
  {
    title: "Trabalhando com Arquivos",
    icon: FileText,
    items: [
      { path: "/manipulacao-arquivos", label: "Manipulação (cp, mv, rm)", icon: FileText },
      { path: "/permissoes", label: "Permissões (chmod, chown)", icon: Shield },
      { path: "/compressao", label: "Compressão (tar, zip)", icon: Archive },
      { path: "/redirecionamento", label: "Redirecionamento (>, |)", icon: Terminal },
    ],
  },
  {
    title: "Sistema de Arquivos",
    icon: HardDrive,
    items: [
      { path: "/sistema-arquivos", label: "Hierarquia FHS", icon: FileText },
      { path: "/disco", label: "Discos (df, du, lsblk)", icon: HardDrive },
      { path: "/particoes", label: "Particionamento", icon: HardDrive },
      { path: "/fstab", label: "fstab (Montagem Auto)", icon: HardDrive },
      { path: "/lvm", label: "LVM Avançado", icon: Layers },
    ],
  },
  {
    title: "Gerenciamento de Pacotes",
    icon: Package,
    items: [
      { path: "/apt", label: "APT (Completo)", icon: Package },
      { path: "/dpkg", label: "dpkg Avançado", icon: Package },
      { path: "/ppa", label: "PPAs e Repositórios", icon: Package },
      { path: "/snap-flatpak", label: "Snap & Flatpak", icon: Boxes },
      { path: "/appimage", label: "AppImage", icon: Boxes },
      { path: "/codigo-fonte", label: "Compilar do Fonte", icon: Code2 },
    ],
  },
  {
    title: "Usuários e Processos",
    icon: Users,
    items: [
      { path: "/usuarios", label: "Usuários e Grupos", icon: Users },
      { path: "/processos", label: "Processos (ps, top, htop)", icon: Cpu },
    ],
  },
  {
    title: "Shell Avançado",
    icon: Zap,
    items: [
      { path: "/variaveis-ambiente", label: "Variáveis de Ambiente", icon: Terminal },
      { path: "/aliases", label: "Aliases & Funções", icon: Terminal },
      { path: "/expansoes-bash", label: "Expansões Bash", icon: Terminal },
      { path: "/scripts-bash", label: "Scripts Avançados", icon: Code2 },
      { path: "/avancado", label: "Comandos Avançados", icon: Terminal },
      { path: "/zsh", label: "Zsh & Oh My Zsh", icon: Terminal },
    ],
  },
  {
    title: "Serviços do Sistema",
    icon: Settings,
    items: [
      { path: "/systemd", label: "Systemd", icon: Settings },
      { path: "/journalctl", label: "Logs (journalctl)", icon: FileText },
      { path: "/iostat", label: "Monitoramento", icon: Cpu },
      { path: "/cron", label: "Cron (Agendamento)", icon: Clock },
    ],
  },
  {
    title: "Kernel e Hardware",
    icon: Cpu,
    items: [
      { path: "/kernel", label: "Kernel Linux", icon: Cpu },
      { path: "/boot", label: "Boot & GRUB2", icon: Rocket },
      { path: "/hardware", label: "Informações de Hardware", icon: Cpu },
    ],
  },
  {
    title: "Redes",
    icon: Network,
    items: [
      { path: "/redes", label: "Fundamentos de Rede", icon: Network },
      { path: "/netplan", label: "Netplan (Config)", icon: Wifi },
      { path: "/dns", label: "DNS", icon: Globe },
      { path: "/ssh", label: "SSH (Completo)", icon: Terminal },
      { path: "/vpn", label: "VPN (WireGuard)", icon: Lock },
      { path: "/samba", label: "Samba & NFS", icon: Network },
    ],
  },
  {
    title: "Servidores Web",
    icon: Server,
    items: [
      { path: "/nginx", label: "Nginx", icon: Server },
      { path: "/apache", label: "Apache", icon: Server },
      { path: "/php", label: "PHP (LAMP/LEMP)", icon: Code2 },
    ],
  },
  {
    title: "Bancos de Dados",
    icon: Database,
    items: [
      { path: "/mysql", label: "MySQL & MariaDB", icon: Database },
      { path: "/postgresql", label: "PostgreSQL", icon: Database },
    ],
  },
  {
    title: "Desenvolvimento",
    icon: Code2,
    items: [
      { path: "/vim", label: "Vim & Neovim", icon: Terminal },
      { path: "/vscode", label: "VS Code", icon: Monitor },
      { path: "/git", label: "Git Completo", icon: GitBranch },
      { path: "/python", label: "Python", icon: Code2 },
      { path: "/nodejs", label: "Node.js", icon: Code2 },
      { path: "/java", label: "Java", icon: Code2 },
    ],
  },
  {
    title: "Containers & Virtualização",
    icon: Container,
    items: [
      { path: "/docker", label: "Docker", icon: Container },
      { path: "/docker-compose", label: "Docker Compose", icon: Container },
      { path: "/kvm", label: "KVM (VMs)", icon: Server },
    ],
  },
  {
    title: "Backup & Cloud",
    icon: Cloud,
    items: [
      { path: "/backup", label: "Backup com rsync", icon: RotateCcw },
      { path: "/timeshift", label: "Timeshift (Snapshots)", icon: RotateCcw },
      { path: "/cloud-init", label: "Ubuntu Server & Cloud", icon: Cloud },
      { path: "/ansible", label: "Ansible", icon: Wrench },
    ],
  },
  {
    title: "Segurança",
    icon: Shield,
    items: [
      { path: "/seguranca", label: "Segurança Básica + UFW", icon: Shield },
      { path: "/apparmor", label: "AppArmor", icon: Shield },
      { path: "/fail2ban", label: "Fail2Ban", icon: Shield },
      { path: "/gpg", label: "GPG (Chaves)", icon: Key },
      { path: "/luks", label: "LUKS (Criptografia)", icon: Lock },
    ],
  },
  {
    title: "Multimídia & Gaming",
    icon: Music,
    items: [
      { path: "/multimedia", label: "Multimídia & Codecs", icon: Music },
      { path: "/gaming", label: "Gaming no Ubuntu", icon: Gamepad2 },
      { path: "/wine", label: "Wine (Apps Windows)", icon: Gamepad2 },
      { path: "/gnome-extensions", label: "GNOME Extensions", icon: Monitor },
      { path: "/ambientes-alternativos", label: "KDE, XFCE, MATE...", icon: Monitor },
    ],
  },
  {
    title: "Recursos Finais",
    icon: BookOpen,
    items: [
      { path: "/troubleshooting", label: "Troubleshooting", icon: Bug },
      { path: "/referencias", label: "Referências", icon: BookOpen },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0D0D0D]/90 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] border-r border-[#1F1F1F]/40 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="sticky top-0 z-10 px-5 pt-5 pb-3 bg-gradient-to-b from-[#0D0D0D] to-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#1F1F1F]/40">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Termux logo (terminal prompt) */}
              <div className="w-10 h-10 rounded-lg bg-[#0D0D0D] border-2 border-[#5EBE5E] flex items-center justify-center shadow-lg shadow-[#5EBE5E]/30 relative overflow-hidden">
                <span className="text-[#5EBE5E] font-mono font-bold text-sm leading-none tracking-tighter">&gt;_</span>
              </div>
              <div>
                <h1 className="font-bold text-white text-base font-display leading-tight">Termux</h1>
                <p className="text-[10px] text-[#AEA79F] uppercase tracking-widest font-mono">
                  Livro Completo
                </p>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg text-[#AEA79F] hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {NAVIGATION.map((section) => {
            const SectionIcon = section.icon;
            const isCollapsed = collapsed[section.title];
            const hasActive = section.items.some((item) => location === item.path);

            return (
              <div key={section.title}>
                <button
                  onClick={() => toggle(section.title)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-colors",
                    hasActive
                      ? "text-[#5EBE5E]"
                      : "text-[#AEA79F] hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <SectionIcon className="w-3.5 h-3.5" />
                    {section.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 transition-transform",
                      isCollapsed ? "-rotate-90" : ""
                    )}
                  />
                </button>

                {!isCollapsed && (
                  <ul className="mt-0.5 mb-2 space-y-0.5 pl-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location === item.path;
                      return (
                        <li key={item.path}>
                          <Link
                            href={item.path}
                            className={cn(
                              "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] transition-all relative group",
                              isActive
                                ? "bg-gradient-to-r from-[#5EBE5E] to-[#3F8E3F] text-white font-medium shadow-md shadow-[#5EBE5E]/25"
                                : "text-[#D3D7CF] hover:text-white hover:bg-[#1F1F1F]/30"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {isActive && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white rounded-r" />
                            )}
                            <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", isActive ? "text-white" : "text-[#888A85] group-hover:text-[#5EBE5E]")} />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}

          <div className="mt-6 mx-2 p-3 rounded-lg bg-[#1F1F1F]/20 border border-[#1F1F1F]/40">
            <div className="text-[10px] uppercase tracking-wider font-mono text-[#AEA79F] mb-1">
              Versão atual
            </div>
            <div className="text-sm font-bold text-white">Termux 0.118.1</div>
            <div className="text-[11px] text-[#888A85] mt-1">Android 7.0+ · F-Droid</div>
          </div>
        </nav>
      </aside>
    </>
  );
}

import { Menu, Search } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-[#1F1F1F]/40 px-4 sm:px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md text-[#D3D7CF] hover:text-white hover:bg-white/5 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] border border-[#1F1F1F]/40 hover:border-[#5EBE5E]/40 rounded-lg text-sm text-[#888A85] hover:text-[#D3D7CF] transition-all w-72 cursor-pointer">
          <Search className="w-4 h-4" />
          <span className="font-mono text-xs">grep "..." em todo o livro</span>
          <span className="ml-auto text-[10px] opacity-50 border border-[#1F1F1F]/40 rounded px-1.5 py-0.5 font-mono">Ctrl+K</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs font-mono text-[#888A85]">
        <span className="hidden md:flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#8AE234] animate-pulse" />
          Ubuntu 24.04 LTS
        </span>
      </div>
    </header>
  );
}

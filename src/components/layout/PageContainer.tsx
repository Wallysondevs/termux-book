import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, Clock, Home as HomeIcon } from "lucide-react";
import { DifficultyBadge } from "../ui/DifficultyBadge";

interface PageContainerProps {
  title: string;
  subtitle?: string;
  difficulty?: "iniciante" | "intermediario" | "avancado";
  timeToRead?: string;
  category?: string;
  children: ReactNode;
}

export function PageContainer({
  title,
  subtitle,
  difficulty,
  timeToRead,
  category,
  children,
}: PageContainerProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Barra de progresso fixa no topo */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-black/30 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#5EBE5E] via-[#FF9C5C] to-[#5EBE5E] transition-all duration-100 ease-out"
          style={{
            width: `${scrollProgress * 100}%`,
            boxShadow: "0 0 12px rgba(233, 84, 32, 0.6)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-10 pb-32">
        {/* Breadcrumb estilo terminal */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-mono">
          <Link
            href="/"
            className="text-[#888A85] hover:text-[#5EBE5E] transition-colors flex items-center gap-1"
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>~</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#444]" />
          {category && (
            <>
              <span className="text-[#729FCF]">{category}</span>
              <ChevronRight className="w-3 h-3 text-[#444]" />
            </>
          )}
          <span className="text-[#5EBE5E]">{title}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <header className="mb-10 pb-6 border-b border-[#1F1F1F]/40">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {difficulty && <DifficultyBadge level={difficulty} />}
              {timeToRead && (
                <span className="text-xs text-[#888A85] font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#444] bg-[#1A1A1A]">
                  <Clock className="w-3 h-3" />
                  {timeToRead} de leitura
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 font-display leading-[1.1]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-[#D3D7CF]/80 leading-relaxed max-w-3xl">
                {subtitle}
              </p>
            )}
          </header>

          <div className="page-content">
            {children}
          </div>

          <footer className="mt-20 pt-8 border-t border-[#1F1F1F]/40 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5EBE5E] text-white font-medium hover:bg-[#6FD672] transition-colors shadow-lg shadow-[#5EBE5E]/20"
              style={{ borderBottom: "none" }}
            >
              <HomeIcon className="w-4 h-4" />
              Voltar ao Início
            </Link>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}

import { useState, ReactNode } from "react";
import { Copy, Check, Minus, Square, X } from "lucide-react";

interface TerminalProps {
  title?: string;
  user?: string;
  host?: string;
  path?: string;
  children: ReactNode;
  height?: string;
  showWindowChrome?: boolean;
}

export function Terminal({
  title,
  user = "wallyson",
  host = "ubuntu",
  path = "~",
  children,
  height,
  showWindowChrome = true,
}: TerminalProps) {
  const finalTitle = title || `${user}@${host}: ${path}`;

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[#1e0314] shadow-2xl bg-[#000000] ring-1 ring-white/5">
      {showWindowChrome && (
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-b from-[#3C0F2D] to-[#2A0820] border-b border-black/40 select-none">
          <div className="flex items-center gap-1.5">
            <button
              className="w-3.5 h-3.5 rounded-full bg-[#C75050] hover:bg-[#E06060] transition-colors flex items-center justify-center group"
              title="Fechar"
              tabIndex={-1}
            >
              <X className="w-2 h-2 text-[#3C0F0F] opacity-0 group-hover:opacity-100" strokeWidth={3} />
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-[#C7A050] hover:bg-[#E0BC60] transition-colors flex items-center justify-center group"
              title="Minimizar"
              tabIndex={-1}
            >
              <Minus className="w-2 h-2 text-[#3C2C0F] opacity-0 group-hover:opacity-100" strokeWidth={3} />
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-[#509650] hover:bg-[#60B060] transition-colors flex items-center justify-center group"
              title="Maximizar"
              tabIndex={-1}
            >
              <Square className="w-2 h-2 text-[#0F3C0F] opacity-0 group-hover:opacity-100" strokeWidth={3} />
            </button>
          </div>

          <span className="font-sans text-xs text-[#D8D5D2] font-medium select-none">
            {finalTitle}
          </span>

          <div className="w-12" />
        </div>
      )}

      <div
        className="p-4 font-mono text-[13px] leading-relaxed overflow-x-auto terminal-scroll text-[#EEEEEC]"
        style={height ? { height, overflowY: "auto" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

/* ====================================================
   COMMAND — Linha de prompt + comando + output
   ==================================================== */

interface CommandProps {
  user?: string;
  host?: string;
  path?: string;
  command: string;
  output?: string;
  comment?: string;
  showCopy?: boolean;
  root?: boolean;
}

export function Command({
  user = "wallyson",
  host = "ubuntu",
  path = "~",
  command,
  output,
  comment,
  showCopy = true,
  root = false,
}: CommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const finalUser = root ? "root" : user;
  const promptChar = root ? "#" : "$";
  const userColor = root ? "text-[#EF2929]" : "text-[#8AE234]";

  return (
    <div className="group relative mb-3">
      {comment && (
        <div className="text-[#888A85] text-[12.5px] mb-0.5 italic select-none">
          # {comment}
        </div>
      )}
      <div className="flex items-start gap-1 flex-wrap">
        <span className={`${userColor} font-bold whitespace-nowrap select-none`}>
          {finalUser}@{host}
        </span>
        <span className="text-[#EEEEEC] select-none">:</span>
        <span className="text-[#729FCF] font-bold whitespace-nowrap select-none">{path}</span>
        <span className="text-[#EEEEEC] mr-1 select-none">{promptChar}</span>
        <span className="text-[#EEEEEC] flex-1 break-all whitespace-pre-wrap">{command}</span>
        {showCopy && (
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 ml-2 p-1 rounded text-[#888A85] hover:text-white hover:bg-white/10 transition-all"
            title="Copiar"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#8AE234]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
      {output && (
        <pre className="mt-1 text-[#D3D7CF] text-[12.5px] leading-relaxed whitespace-pre-wrap break-words font-mono">
          {output}
        </pre>
      )}
    </div>
  );
}

/* ====================================================
   OUTPUT — Apenas saída (sem prompt)
   ==================================================== */

interface OutputProps {
  children: ReactNode;
  className?: string;
}

export function Output({ children, className = "" }: OutputProps) {
  return (
    <pre className={`text-[#D3D7CF] text-[12.5px] leading-relaxed whitespace-pre-wrap break-words font-mono mb-3 ${className}`}>
      {children}
    </pre>
  );
}

/* ====================================================
   COMMENT — Comentário em linha (verde Ubuntu)
   ==================================================== */

export function Comment({ children }: { children: ReactNode }) {
  return (
    <div className="text-[#888A85] text-[12.5px] italic mb-1 select-none">
      # {children}
    </div>
  );
}

/* ====================================================
   FILE — Bloco simulando edição de arquivo
   ==================================================== */

interface FileProps {
  path: string;
  children: ReactNode;
  language?: string;
}

export function File({ path, children, language = "" }: FileProps) {
  const [copied, setCopied] = useState(false);
  const code = typeof children === "string" ? children : "";

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[#1e0314] shadow-xl bg-[#1e1e1e]">
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-b from-[#2D2D2D] to-[#252525] border-b border-black/40 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#5EBE5E]" />
          <span className="font-mono text-xs text-[#D3D7CF]">{path}</span>
          {language && (
            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded bg-white/10 text-[#8AE234]">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="p-1 rounded text-[#888A85] hover:text-white hover:bg-white/10 transition-colors"
          title="Copiar"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#8AE234]" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="p-4 text-[13px] leading-relaxed font-mono text-[#EEEEEC] overflow-x-auto whitespace-pre">
        {children}
      </pre>
    </div>
  );
}

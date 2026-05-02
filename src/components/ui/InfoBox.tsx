import { ReactNode } from "react";
import { Info, AlertTriangle, ShieldAlert, CheckCircle2, Lightbulb, BookOpen } from "lucide-react";

type InfoType = "info" | "warning" | "danger" | "success" | "tip" | "note";

interface InfoBoxProps {
  type?: InfoType;
  title: string;
  children: ReactNode;
}

const config: Record<InfoType, {
  icon: typeof Info;
  bg: string;
  border: string;
  iconBg: string;
  iconColor: string;
  titleColor: string;
  accentBorder: string;
}> = {
  info: {
    icon: Info,
    bg: "bg-[#3465A4]/10",
    border: "border-[#3465A4]/30",
    iconBg: "bg-[#3465A4]",
    iconColor: "text-white",
    titleColor: "text-[#729FCF]",
    accentBorder: "border-l-[#3465A4]",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-[#C4A000]/10",
    border: "border-[#C4A000]/30",
    iconBg: "bg-[#C4A000]",
    iconColor: "text-[#1a1500]",
    titleColor: "text-[#FCE94F]",
    accentBorder: "border-l-[#C4A000]",
  },
  danger: {
    icon: ShieldAlert,
    bg: "bg-[#CC0000]/10",
    border: "border-[#CC0000]/30",
    iconBg: "bg-[#CC0000]",
    iconColor: "text-white",
    titleColor: "text-[#EF2929]",
    accentBorder: "border-l-[#CC0000]",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-[#4E9A06]/10",
    border: "border-[#4E9A06]/30",
    iconBg: "bg-[#4E9A06]",
    iconColor: "text-white",
    titleColor: "text-[#8AE234]",
    accentBorder: "border-l-[#4E9A06]",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-[#5EBE5E]/10",
    border: "border-[#5EBE5E]/30",
    iconBg: "bg-[#5EBE5E]",
    iconColor: "text-white",
    titleColor: "text-[#FF9C5C]",
    accentBorder: "border-l-[#5EBE5E]",
  },
  note: {
    icon: BookOpen,
    bg: "bg-[#2A2A2A]/15",
    border: "border-[#2A2A2A]/40",
    iconBg: "bg-[#2A2A2A]",
    iconColor: "text-white",
    titleColor: "text-[#C68FBE]",
    accentBorder: "border-l-[#2A2A2A]",
  },
};

export function InfoBox({ type = "info", title, children }: InfoBoxProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div className={`my-6 rounded-lg ${c.bg} ${c.border} border border-l-[6px] ${c.accentBorder} overflow-hidden`}>
      <div className="flex gap-4 p-4">
        <div className={`${c.iconBg} ${c.iconColor} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <Icon className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className={`${c.titleColor} font-bold text-base mb-1.5 font-sans`}>
            {title}
          </h5>
          <div className="text-sm text-[#D3D7CF] leading-relaxed [&_code]:bg-black/40 [&_code]:text-[#FF9C5C] [&_code]:border-white/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Aliases para compatibilidade */
export { InfoBox as AlertBox };

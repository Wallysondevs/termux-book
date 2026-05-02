type Level = "iniciante" | "intermediario" | "avancado";

export function DifficultyBadge({ level }: { level: Level }) {
  const styles = {
    iniciante: {
      bg: "bg-[#4E9A06]/15",
      text: "text-[#8AE234]",
      border: "border-[#4E9A06]/40",
      dot: "bg-[#8AE234]",
    },
    intermediario: {
      bg: "bg-[#C4A000]/15",
      text: "text-[#FCE94F]",
      border: "border-[#C4A000]/40",
      dot: "bg-[#FCE94F]",
    },
    avancado: {
      bg: "bg-[#CC0000]/15",
      text: "text-[#EF2929]",
      border: "border-[#CC0000]/40",
      dot: "bg-[#EF2929]",
    },
  };

  const labels = {
    iniciante: "Iniciante",
    intermediario: "Intermediário",
    avancado: "Avançado",
  };

  const s = styles[level];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${s.bg} ${s.text} ${s.border} font-mono uppercase tracking-wider`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
      {labels[level]}
    </span>
  );
}

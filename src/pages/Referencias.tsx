import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Referencias() {
    return (
      <PageContainer
        title="Referências e Recursos"
        subtitle="Links, livros, comunidades, canais e recursos essenciais para continuar aprendendo Ubuntu e Linux."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          Aprender Linux é uma jornada contínua. Esta página reúne os melhores recursos
          para continuar aprofundando seus conhecimentos em Ubuntu, administração de
          sistemas e desenvolvimento no Linux.
        </p>

        <h2>1. Documentação Oficial</h2>
        <ul>
          <li><strong>Ubuntu Documentation</strong> — help.ubuntu.com</li>
          <li><strong>Ubuntu Server Guide</strong> — ubuntu.com/server/docs</li>
          <li><strong>Ubuntu Wiki</strong> — wiki.ubuntu.com</li>
          <li><strong>Man pages online</strong> — manpages.ubuntu.com</li>
          <li><strong>Debian Wiki</strong> — wiki.debian.org (aplicável ao Ubuntu)</li>
          <li><strong>Arch Wiki</strong> — wiki.archlinux.org (excelente para qualquer distro)</li>
          <li><strong>Linux Kernel Documentation</strong> — kernel.org/doc</li>
        </ul>

        <h2>2. Comunidades e Fóruns</h2>
        <ul>
          <li><strong>Ask Ubuntu</strong> — askubuntu.com (perguntas e respostas)</li>
          <li><strong>Ubuntu Forums</strong> — ubuntuforums.org</li>
          <li><strong>Reddit r/Ubuntu</strong> — reddit.com/r/ubuntu</li>
          <li><strong>Reddit r/linux</strong> — reddit.com/r/linux</li>
          <li><strong>Stack Overflow</strong> — stackoverflow.com (para programação)</li>
          <li><strong>Linux Questions</strong> — linuxquestions.org</li>
          <li><strong>Ubuntu BR</strong> — ubuntubr.org (comunidade brasileira)</li>
        </ul>

        <h2>3. Ferramentas de Aprendizado</h2>
        <CodeBlock
          title="Recursos no terminal"
          code={`# Man pages — documentação de qualquer comando
  man ls
  man bash

  # tldr — exemplos práticos rápidos
  sudo apt install -y tldr
  tldr tar
  tldr rsync

  # cheat.sh — referência rápida online
  curl cheat.sh/awk
  curl cheat.sh/sed

  # explainshell.com — explica cada parte de um comando

  # Praticar no terminal:
  # overthewire.org/wargames/bandit/ — desafios de terminal
  # linuxsurvival.com — tutorial interativo
  # cmdchallenge.com — desafios de linha de comando`}
        />

        <h2>4. Livros Recomendados</h2>
        <ul>
          <li><strong>The Linux Command Line</strong> — William Shotts (gratuito online: linuxcommand.org)</li>
          <li><strong>How Linux Works</strong> — Brian Ward</li>
          <li><strong>UNIX and Linux System Administration Handbook</strong> — Evi Nemeth et al.</li>
          <li><strong>Linux Bible</strong> — Christopher Negus</li>
          <li><strong>Linux Pocket Guide</strong> — Daniel Barrett (referência rápida)</li>
          <li><strong>Certificação Linux LPIC-1</strong> — Luciano Siqueira (em português)</li>
        </ul>

        <h2>5. Certificações</h2>
        <ul>
          <li><strong>Linux Essentials</strong> — Nível introdutório (LPI)</li>
          <li><strong>LPIC-1</strong> — Administrador Linux Junior (LPI)</li>
          <li><strong>LPIC-2</strong> — Administrador Linux Avançado (LPI)</li>
          <li><strong>Ubuntu Certified Professional</strong> — Canonical</li>
          <li><strong>Red Hat RHCSA/RHCE</strong> — Aplicável a qualquer distro</li>
          <li><strong>CompTIA Linux+</strong> — Vendor-neutral</li>
        </ul>

        <h2>6. Canais e Podcasts</h2>
        <ul>
          <li><strong>Diolinux</strong> — YouTube (PT-BR, excelente para Ubuntu)</li>
          <li><strong>Dio</strong> — YouTube (PT-BR, Linux e tech)</li>
          <li><strong>NetworkChuck</strong> — YouTube (EN, networking e Linux)</li>
          <li><strong>LearnLinuxTV</strong> — YouTube (EN, tutoriais detalhados)</li>
          <li><strong>Linux Unplugged</strong> — Podcast (EN, Jupiter Broadcasting)</li>
          <li><strong>Ubuntu Podcast</strong> — Podcast oficial da comunidade</li>
        </ul>

        <AlertBox type="info" title="Dica de aprendizado">
          A melhor forma de aprender Linux é <strong>usando no dia a dia</strong>. Instale
          o Ubuntu como seu sistema principal (ou dual boot), quebre coisas, conserte,
          automatize tarefas com scripts. A prática constante é o que transforma
          conhecimento teórico em habilidade real.
        </AlertBox>
      </PageContainer>
    );
  }
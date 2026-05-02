import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ManPages() {
    return (
      <PageContainer
        title="Man Pages — Manuais do Sistema"
        subtitle="Guia completo para usar man pages, info, help, tldr e aproveitar a documentação integrada do Linux para aprender qualquer comando."
        difficulty="iniciante"
        timeToRead="20 min"
      >
        <p>
          As <strong>man pages</strong> (manual pages) são a documentação oficial de cada
          comando, função e arquivo de configuração do Linux. É a referência mais completa e
          confiável — está disponível offline, diretamente no terminal, e cobre absolutamente
          tudo que o sistema oferece.
        </p>

        <h2>1. Usar o man</h2>
        <CodeBlock
          title="Acessar e navegar nas man pages"
          code={`# Abrir o manual de um comando
  man ls
  man grep
  man chmod
  man ssh

  # Navegação dentro do man:
  # Espaço ou PageDown   → próxima página
  # b ou PageUp          → página anterior
  # /texto               → buscar "texto" para frente
  # ?texto               → buscar para trás
  # n                    → próxima ocorrência
  # N                    → ocorrência anterior
  # q                    → sair
  # h                    → ajuda do less (paginador)

  # As man pages são divididas em seções:
  # 1 = Comandos de usuário (ls, grep, cp)
  # 2 = Chamadas de sistema (open, read, write)
  # 3 = Funções de biblioteca C (printf, malloc)
  # 4 = Arquivos especiais (/dev/...)
  # 5 = Formatos de arquivo (fstab, passwd)
  # 6 = Jogos
  # 7 = Miscelânea (protocolos, convenções)
  # 8 = Comandos de administração (mount, iptables)

  # Abrir uma seção específica
  man 5 passwd    # Formato do arquivo /etc/passwd
  man 1 passwd    # Comando passwd
  man 5 fstab     # Formato do /etc/fstab
  man 8 mount     # Comando mount (administração)

  # Buscar um comando no manual
  man -k "copy files"
  # Equivale a: apropos "copy files"

  # Buscar por nome
  man -f ls
  # Equivale a: whatis ls
  # Saída: ls (1) - list directory contents

  # Ver todas as seções de um comando
  whatis passwd
  # Saída:
  # passwd (1)  - change user password
  # passwd (5)  - the password file`}
        />

        <h2>2. Alternativas ao man</h2>
        <CodeBlock
          title="Outras formas de obter ajuda"
          code={`# --help (resumo rápido de opções)
  ls --help
  grep --help
  docker --help

  # help (para comandos built-in do Bash)
  help cd
  help for
  help if
  help echo

  # info (documentação GNU detalhada)
  info coreutils
  info grep

  # tldr (man pages simplificadas — exemplos práticos!)
  sudo apt install -y tldr
  # Ou via npm: npm install -g tldr

  tldr tar
  # Mostra exemplos práticos:
  # - Extract an archive: tar xf archive.tar.gz
  # - Create an archive: tar czf archive.tar.gz file1 file2
  # - List contents: tar tf archive.tar.gz

  tldr rsync
  tldr find
  tldr awk

  # Atualizar o banco de dados do tldr
  tldr --update

  # cheat.sh (man pages online com exemplos)
  curl cheat.sh/tar
  curl cheat.sh/rsync
  curl cheat.sh/awk
  # Funciona sem instalar nada!

  # explain shell (explicar um comando complexo)
  # Acesse: explainshell.com
  # Cole qualquer comando e ele explica cada parte`}
        />

        <h2>3. Estrutura de uma Man Page</h2>
        <CodeBlock
          title="Entender as seções de uma man page"
          code={`# Uma man page típica tem estas seções:

  # NAME — nome e descrição curta
  # SYNOPSIS — sintaxe do comando
  #   Convenções:
  #   [opção]     = opcional
  #   <argumento> = obrigatório
  #   ...         = pode repetir
  #   |           = ou

  # DESCRIPTION — descrição detalhada

  # OPTIONS — todas as opções/flags
  #   -a, --all     lista todos
  #   -l            formato longo
  #   -h, --help    mostra ajuda

  # EXAMPLES — exemplos de uso (nem todas têm)

  # FILES — arquivos relacionados

  # SEE ALSO — comandos relacionados

  # EXIT STATUS — códigos de retorno (0 = sucesso)

  # BUGS — problemas conhecidos

  # AUTHOR — autor

  # Dica: Ir direto para EXAMPLES
  man ls
  # Digite: /EXAMPLES e Enter

  # Dica: Ir direto para uma opção
  man rsync
  # Digite: /--delete e Enter`}
        />

        <h2>4. Instalar Man Pages Extras</h2>
        <CodeBlock
          title="Mais documentação no terminal"
          code={`# Man pages em português (se disponíveis)
  sudo apt install -y manpages-pt-br

  # Man pages de desenvolvimento (funções C, chamadas de sistema)
  sudo apt install -y manpages-dev manpages-posix-dev

  # Atualizar o banco de dados do man
  sudo mandb

  # Salvar man page como texto
  man ls > ls-manual.txt

  # Salvar como PDF
  man -t ls | ps2pdf - ls-manual.pdf

  # Ver man page no navegador
  man --html ls

  # Criar suas próprias man pages
  # Formato: troff/groff
  # Caminho: /usr/local/share/man/man1/

  # Instalar man pages do POSIX
  sudo apt install -y manpages-posix`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com man pages"
          code={`# "No manual entry for xxx"
  # Instalar man pages:
  sudo apt install -y man-db manpages manpages-dev
  # Atualizar banco:
  sudo mandb

  # Man page não encontra após instalar pacote
  sudo mandb    # Reindexar

  # Man page em outro idioma
  # Forçar inglês:
  LANG=C man ls

  # Man page não abre (paginador errado)
  export PAGER=less
  # Ou: export MANPAGER="less -R"

  # Buscar documentação online
  # Ubuntu manpages: manpages.ubuntu.com
  # Linux man pages: man7.org
  # Arch Wiki: wiki.archlinux.org (excelente para qualquer distro)`}
        />

        <AlertBox type="info" title="Aprenda a ler man pages">
          No início, man pages parecem intimidadoras, mas são a documentação mais completa
          que existe. Comece lendo a seção DESCRIPTION e EXAMPLES. Com o tempo, você vai
          conseguir ler a SYNOPSIS diretamente. O <code>tldr</code> é um ótimo complemento
          para ter exemplos práticos rápidos.
        </AlertBox>
      </PageContainer>
    );
  }
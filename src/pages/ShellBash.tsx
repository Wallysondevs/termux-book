import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ShellBash() {
    return (
      <PageContainer
        title="Shell Bash — O Terminal do Ubuntu"
        subtitle="Guia completo do Bash: atalhos, histórico, expansões, globbing, jobs, personalização do prompt e recursos avançados do shell."
        difficulty="iniciante"
        timeToRead="25 min"
      >
        <p>
          O <strong>Bash</strong> (Bourne Again SHell) é o shell padrão do Ubuntu — é o
          programa que interpreta seus comandos no terminal. Dominar o Bash vai além de
          saber comandos: é entender atalhos, histórico, expansões e recursos que multiplicam
          sua produtividade no terminal.
        </p>

        <h2>1. Atalhos de Teclado</h2>
        <CodeBlock
          title="Atalhos essenciais do Bash"
          code={`# === MOVIMENTO DO CURSOR ===
  # Ctrl+A     → Início da linha
  # Ctrl+E     → Final da linha
  # Ctrl+B     → Um caractere para trás (←)
  # Ctrl+F     → Um caractere para frente (→)
  # Alt+B      → Uma palavra para trás
  # Alt+F      → Uma palavra para frente

  # === EDIÇÃO ===
  # Ctrl+U     → Apagar do cursor até o início da linha
  # Ctrl+K     → Apagar do cursor até o final da linha
  # Ctrl+W     → Apagar palavra anterior
  # Alt+D      → Apagar próxima palavra
  # Ctrl+Y     → Colar texto apagado (yank)
  # Ctrl+T     → Trocar dois caracteres
  # Alt+T      → Trocar duas palavras
  # Alt+U      → Converter palavra para MAIÚSCULA
  # Alt+L      → Converter palavra para minúscula

  # === CONTROLE ===
  # Ctrl+C     → Cancelar comando atual
  # Ctrl+D     → Sair do shell (ou EOF)
  # Ctrl+Z     → Suspender processo (enviar para background)
  # Ctrl+L     → Limpar tela
  # Ctrl+S     → Pausar saída do terminal
  # Ctrl+Q     → Retomar saída do terminal
  # Ctrl+R     → Buscar no histórico (reverso)

  # === TAB (autocompletar) ===
  # Tab        → Autocompletar comando/arquivo
  # Tab Tab    → Listar todas as opções
  # apt ins[Tab]  → apt install
  # cd /e[Tab]    → cd /etc/`}
        />

        <h2>2. Histórico de Comandos</h2>
        <CodeBlock
          title="Navegar e reusar comandos anteriores"
          code={`# Setas ↑ e ↓ — navegar pelo histórico
  # Ctrl+R — buscar no histórico (muito útil!)
  # Ctrl+R, digitar parte do comando, Enter para executar
  # Ctrl+R novamente para buscar a próxima ocorrência

  # Ver histórico completo
  history
  history 20      # Últimos 20 comandos
  history | grep "apt"  # Buscar

  # Executar comando do histórico
  !42             # Executar comando número 42
  !!              # Repetir último comando
  sudo !!         # Repetir último comando com sudo
  !apt            # Último comando que começa com "apt"

  # Referências ao último comando
  !$              # Último argumento do último comando
  !*              # Todos os argumentos do último comando

  # Exemplo:
  mkdir /tmp/meu-diretorio
  cd !$            # cd /tmp/meu-diretorio

  # Limpar histórico
  history -c       # Limpar da memória
  history -w       # Salvar (vazio) no arquivo

  # Configurar histórico no .bashrc
  export HISTSIZE=10000         # Comandos na memória
  export HISTFILESIZE=20000     # Comandos no arquivo
  export HISTCONTROL=ignoredups:erasedups  # Sem duplicatas
  export HISTIGNORE="ls:cd:pwd:exit:clear" # Ignorar comandos simples
  export HISTTIMEFORMAT="%Y-%m-%d %H:%M:%S  "  # Com data/hora`}
        />

        <h2>3. Globbing (Padrões de Arquivo)</h2>
        <CodeBlock
          title="Usar padrões para selecionar arquivos"
          code={`# * = qualquer coisa
  ls *.txt            # Todos os .txt
  ls foto*            # Começa com "foto"
  rm *.log            # Remover todos os .log

  # ? = um único caractere
  ls foto?.jpg        # foto1.jpg, foto2.jpg, mas não foto10.jpg

  # [] = lista de caracteres
  ls foto[123].jpg    # foto1.jpg, foto2.jpg, foto3.jpg
  ls foto[0-9].jpg    # foto0.jpg até foto9.jpg
  ls foto[!0-9].jpg   # NÃO numérico

  # {} = alternativas (brace expansion)
  echo {1..10}        # 1 2 3 4 5 6 7 8 9 10
  echo {a..z}         # a b c ... z
  echo {01..12}       # 01 02 03 ... 12
  mkdir dir{1,2,3}    # Cria dir1, dir2, dir3
  cp arquivo.{txt,bak}  # Copiar arquivo.txt para arquivo.bak

  # ** = recursivo (precisa de globstar)
  shopt -s globstar
  ls **/*.py          # Todos os .py em subdiretórios`}
        />

        <h2>4. Jobs e Processos</h2>
        <CodeBlock
          title="Controlar processos no terminal"
          code={`# Executar em background
  comando &
  sleep 300 &

  # Ctrl+Z — suspender processo atual
  # fg — retomar em foreground
  # bg — retomar em background

  # Listar jobs
  jobs

  # Retomar job específico
  fg %1       # Job 1 em foreground
  bg %2       # Job 2 em background

  # Manter rodando após fechar terminal
  nohup comando &
  nohup ./script.sh > saida.log 2>&1 &

  # disown — desacoplar job do terminal
  ./processo-longo &
  disown %1

  # screen/tmux — sessões persistentes (melhor que nohup)
  sudo apt install -y tmux
  tmux new -s minha-sessao
  # Ctrl+B, D = desacoplar
  tmux attach -t minha-sessao
  tmux ls     # Listar sessões`}
        />

        <h2>5. Personalizar o Prompt (PS1)</h2>
        <CodeBlock
          title="Customizar o prompt do terminal"
          code={`# O prompt é controlado pela variável PS1
  echo $PS1

  # Sequências especiais do PS1:
  # \\u = usuário
  # \\h = hostname
  # \\w = diretório atual (caminho completo)
  # \\W = diretório atual (apenas o nome)
  # \\d = data
  # \\t = hora (24h)
  # \\n = nova linha
  # \\$ = $ (ou # se root)

  # Cores ANSI (formato para PS1):
  # \\[\\033[COLORm\\] ... \\[\\033[0m\\]
  # 31=vermelho, 32=verde, 33=amarelo, 34=azul, 35=magenta, 36=ciano

  # Prompt colorido (exemplo)
  # export PS1='\\[\\033[32m\\]\\u@\\h\\[\\033[0m\\]:\\[\\033[34m\\]\\w\\[\\033[0m\\]\\$ '
  # Resultado: usuario@host:/caminho$ (verde e azul)

  # Adicionar ao ~/.bashrc para persistir`}
        />

        <h2>6. Arquivos de Configuração</h2>
        <CodeBlock
          title="Entender .bashrc, .profile, .bash_profile"
          code={`# ~/.bashrc — carregado em cada terminal interativo
  # Colocar: aliases, funções, prompt, variáveis do shell

  # ~/.profile — carregado uma vez no login
  # Colocar: variáveis de ambiente, PATH

  # ~/.bash_profile — carregado no login (se existir, substitui .profile)
  # Normalmente carrega .bashrc

  # /etc/bash.bashrc — .bashrc global (todos os usuários)
  # /etc/profile — profile global
  # /etc/profile.d/*.sh — scripts de login globais

  # Ordem de carregamento:
  # Login shell: /etc/profile → ~/.bash_profile ou ~/.profile
  # Terminal interativo: /etc/bash.bashrc → ~/.bashrc

  # Recarregar .bashrc
  source ~/.bashrc
  # Ou: . ~/.bashrc

  # Verificar se é login shell
  shopt login_shell`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com o Bash"
          code={`# Terminal travado (Ctrl+S acidental)
  # Pressione Ctrl+Q para destravar

  # Comando não encontrado
  # Verificar PATH:
  echo $PATH
  # Instalar:
  sudo apt install nome-do-pacote
  # Ou verificar se o script é executável:
  chmod +x script.sh

  # .bashrc não carrega
  # Verificar se ~/.profile carrega o .bashrc:
  # if [ -f ~/.bashrc ]; then . ~/.bashrc; fi

  # Prompt bagunçado após redimensionar terminal
  # Adicionar ao .bashrc:
  shopt -s checkwinsize

  # Caracteres estranhos no terminal
  reset    # Restaurar terminal`}
        />

        <AlertBox type="info" title="Alternativas ao Bash">
          <strong>Zsh</strong> (com Oh My Zsh) oferece autocompletar superior, temas e
          plugins. <strong>Fish</strong> tem syntax highlighting e sugestões automáticas.
          Ambos são compatíveis com a maioria dos scripts Bash.
        </AlertBox>
      </PageContainer>
    );
  }
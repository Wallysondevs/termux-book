import{j as o}from"./index-BGu3owFd.js";import{P as e,I as r}from"./InfoBox-cbYNoYJG.js";import{C as a}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function c(){return o.jsxs(e,{title:"Shell Bash — O Terminal do Termux",subtitle:"Guia completo do Bash: atalhos, histórico, expansões, globbing, jobs, personalização do prompt e recursos avançados do shell.",difficulty:"iniciante",timeToRead:"25 min",children:[o.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),o.jsx("h2",{children:"Glossário rápido"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Bash"})," "," — "," ","shell padrão."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Builtins"})," "," — "," ","cd, echo, type."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Job control"})," "," — "," ","&, fg, bg."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"History"})," "," — "," ","!!, !$, Ctrl+R."]})]}),o.jsxs("p",{children:["O ",o.jsx("strong",{children:"Bash"})," (Bourne Again SHell) é o shell padrão do Termux — é o programa que interpreta seus comandos no terminal. Dominar o Bash vai além de saber comandos: é entender atalhos, histórico, expansões e recursos que multiplicam sua produtividade no terminal."]}),o.jsx("h2",{children:"1. Atalhos de Teclado"}),o.jsx(a,{title:"Atalhos essenciais do Bash",code:`# === MOVIMENTO DO CURSOR ===
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
  # apt ins[Tab]  → pkg install
  # cd /e[Tab]    → cd /etc/`}),o.jsx("h2",{children:"2. Histórico de Comandos"}),o.jsx(a,{title:"Navegar e reusar comandos anteriores",code:`# Setas ↑ e ↓ — navegar pelo histórico
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
  export HISTTIMEFORMAT="%Y-%m-%d %H:%M:%S  "  # Com data/hora`}),o.jsx("h2",{children:"3. Globbing (Padrões de Arquivo)"}),o.jsx(a,{title:"Usar padrões para selecionar arquivos",code:`# * = qualquer coisa
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
  ls **/*.py          # Todos os .py em subdiretórios`}),o.jsx("h2",{children:"4. Jobs e Processos"}),o.jsx(a,{title:"Controlar processos no terminal",code:`# Executar em background
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
  pkg install -y tmux
  tmux new -s minha-sessao
  # Ctrl+B, D = desacoplar
  tmux attach -t minha-sessao
  tmux ls     # Listar sessões`}),o.jsx("h2",{children:"5. Personalizar o Prompt (PS1)"}),o.jsx(a,{title:"Customizar o prompt do terminal",code:`# O prompt é controlado pela variável PS1
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

  # Adicionar ao ~/.bashrc para persistir`}),o.jsx("h2",{children:"6. Arquivos de Configuração"}),o.jsx(a,{title:"Entender .bashrc, .profile, .bash_profile",code:`# ~/.bashrc — carregado em cada terminal interativo
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
  shopt login_shell`}),o.jsx("h2",{children:"Troubleshooting"}),o.jsx(a,{title:"Problemas comuns com o Bash",code:`# Terminal travado (Ctrl+S acidental)
  # Pressione Ctrl+Q para destravar

  # Comando não encontrado
  # Verificar PATH:
  echo $PATH
  # Instalar:
  pkg install nome-do-pacote
  # Ou verificar se o script é executável:
  chmod +x script.sh

  # .bashrc não carrega
  # Verificar se ~/.profile carrega o .bashrc:
  # if [ -f ~/.bashrc ]; then . ~/.bashrc; fi

  # Prompt bagunçado após redimensionar terminal
  # Adicionar ao .bashrc:
  shopt -s checkwinsize

  # Caracteres estranhos no terminal
  reset    # Restaurar terminal`}),o.jsxs(r,{type:"info",title:"Alternativas ao Bash",children:[o.jsx("strong",{children:"Zsh"})," (com Oh My Zsh) oferece autocompletar superior, temas e plugins. ",o.jsx("strong",{children:"Fish"})," tem syntax highlighting e sugestões automáticas. Ambos são compatíveis com a maioria dos scripts Bash."]})]})}export{c as default};

import{j as a}from"./index-d-w5ROEn.js";import{P as o}from"./PageContainer-t8f2nTRw.js";import{C as s}from"./CodeBlock-D742nO-w.js";import{I as i}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function d(){return a.jsxs(o,{title:"Aliases — Atalhos de Comandos",subtitle:"Guia completo de aliases no Bash: criar atalhos para comandos, aliases permanentes, funções vs aliases e aliases úteis prontos.",difficulty:"iniciante",timeToRead:"15 min",children:[a.jsxs("p",{children:["Um ",a.jsx("strong",{children:"alias"})," é um atalho para um comando ou sequência de comandos. Em vez de digitar comandos longos e complexos repetidamente, você cria um nome curto que os substitui. Aliases economizam tempo e reduzem erros de digitação."]}),a.jsx("h2",{children:"1. Criar Aliases"}),a.jsx(s,{title:"Criar e usar aliases",code:`# Criar alias temporário (vale até fechar o terminal)
  alias ll='ls -lah'
  alias gs='git status'
  alias update='pkg update && pkg upgrade -y'

  # Usar o alias
  ll       # Executa: ls -lah
  gs       # Executa: git status
  update   # Executa: pkg update && pkg upgrade -y

  # Ver todos os aliases definidos
  alias

  # Ver um alias específico
  alias ll

  # Remover alias
  unalias ll

  # Ignorar alias e usar o comando original
  ls        # Usa o ls original (sem alias)
  command ls # Mesma coisa`}),a.jsx("h2",{children:"2. Aliases Permanentes"}),a.jsx(s,{title:"Salvar aliases no .bashrc",code:`# Aliases temporários são perdidos ao fechar o terminal
  # Para torná-los permanentes, adicione ao ~/.bashrc

  # Abrir o .bashrc
  nano ~/.bashrc

  # Adicionar ao final do arquivo:
  # === Meus Aliases ===
  alias ll='ls -lah --color=auto'
  alias la='ls -A'
  alias l='ls -CF'
  alias ..='cd ..'
  alias ...='cd ../..'
  alias ....='cd ../../..'

  # Ou usar um arquivo separado (mais organizado):
  # Criar ~/.bash_aliases
  cat > ~/.bash_aliases << 'EOF'
  # Navegação
  alias ..='cd ..'
  alias ...='cd ../..'
  alias home='cd ~'
  alias proj='cd ~/projetos'

  # Segurança (pedir confirmação)
  alias rm='rm -i'
  alias cp='cp -i'
  alias mv='mv -i'

  # Listagem
  alias ll='ls -lah --color=auto'
  alias la='ls -A'
  alias lt='ls -ltrh'    # Por data, mais recente por último

  # Sistema
  alias update='pkg update && pkg upgrade -y'
  alias ports='sudo ss -tlnp'
  alias mem='free -h'
  alias disk='df -hT'
  alias myip='curl -s ifconfig.me'
  EOF

  # O .bashrc já inclui ~/.bash_aliases automaticamente!
  # Recarregar:
  source ~/.bashrc`}),a.jsx("h2",{children:"3. Aliases Úteis por Categoria"}),a.jsx(s,{title:"Coleção de aliases práticos",code:`# === GIT ===
  alias gs='git status'
  alias ga='git add'
  alias gc='git commit -m'
  alias gp='git push'
  alias gl='git log --oneline -20'
  alias gd='git diff'
  alias gb='git branch'
  alias gco='git checkout'

  # === DOCKER ===
  alias dc='docker compose'
  alias dcu='docker compose up -d'
  alias dcd='docker compose down'
  alias dcl='docker compose logs -f'
  alias dps='docker ps'
  alias dimg='docker images'

  # === PYTHON ===
  alias py='python3'
  alias pip='pip3'
  alias venv='python3 -m venv .venv'
  alias activate='source .venv/bin/activate'

  # === REDE ===
  alias ports='sudo ss -tlnp'
  alias myip='curl -s ifconfig.me'
  alias localip='hostname -I | awk "{print $1}"'
  alias ping5='ping -c 5'

  # === SISTEMA ===
  alias reboot='sudo reboot'
  alias poweroff='sudo poweroff'
  alias serv='sudo systemctl'
  alias journal='journalctl -f'

  # === BUSCA ===
  alias grep='grep --color=auto'
  alias fgrep='fgrep --color=auto'
  alias egrep='egrep --color=auto'
  alias ff='find . -name'    # ff "*.txt"`}),a.jsx("h2",{children:"4. Funções vs Aliases"}),a.jsx(s,{title:"Quando usar funções ao invés de aliases",code:`# Aliases não aceitam argumentos no meio
  # Para isso, use funções:

  # Criar diretório e entrar nele
  mkcd() {
      mkdir -p "$1" && cd "$1"
  }
  # Uso: mkcd novo-projeto

  # Buscar processo
  psg() {
      ps aux | grep -i "$1" | grep -v grep
  }
  # Uso: psg nginx

  # Extrair qualquer arquivo compactado
  extract() {
      case "$1" in
          *.tar.gz|*.tgz)   tar xzf "$1" ;;
          *.tar.bz2|*.tbz2) tar xjf "$1" ;;
          *.tar.xz)         tar xJf "$1" ;;
          *.zip)             unzip "$1" ;;
          *.rar)             unrar x "$1" ;;
          *.7z)              7z x "$1" ;;
          *.gz)              gunzip "$1" ;;
          *)                 echo "Formato não suportado: $1" ;;
      esac
  }
  # Uso: extract arquivo.tar.gz

  # Backup rápido de arquivo
  bak() {
      cp "$1" "$1.bak.$(date +%Y%m%d-%H%M%S)"
  }
  # Uso: bak config.yaml

  # Adicione funções ao ~/.bashrc ou ~/.bash_aliases`}),a.jsx("h2",{children:"Troubleshooting"}),a.jsx(s,{title:"Problemas comuns com aliases",code:`# Alias não funciona após adicionar ao .bashrc
  source ~/.bashrc     # Recarregar

  # Alias conflita com comando existente
  type nome-do-alias    # Ver o que é
  # Usar o comando original:
  comando             # Ignora o alias
  command comando       # Mesma coisa

  # Alias com aspas dentro
  # Use aspas simples por fora, duplas por dentro (ou vice-versa):
  alias greet='echo "Olá, mundo!"'
  alias ask="echo 'Qual é seu nome?'"

  # Alias não funciona em scripts
  # Aliases não são expandidos em scripts por padrão!
  # Use funções em scripts, ou adicione:
  shopt -s expand_aliases
  source ~/.bash_aliases`}),a.jsxs(i,{type:"info",title:"Zsh aliases",children:["Se você usa ",a.jsx("strong",{children:"Zsh"})," (Oh My Zsh), adicione aliases ao",a.jsx("code",{children:"~/.zshrc"}),". O Oh My Zsh já vem com centenas de aliases prontos para git, docker, python e mais. Veja com ",a.jsx("code",{children:"alias | grep git"}),"."]})]})}export{d as default};

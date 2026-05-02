import{j as a}from"./index-d-w5ROEn.js";import{P as o}from"./PageContainer-t8f2nTRw.js";import{C as s}from"./CodeBlock-D742nO-w.js";import{I as e}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function h(){return a.jsxs(o,{title:"Zsh — Shell Avançado",subtitle:"Instalação do Zsh e Oh My Zsh no Termux: plugins, temas, autocompletar, aliases, histórico e personalização completa do terminal.",difficulty:"iniciante",timeToRead:"25 min",children:[a.jsxs("p",{children:["O ",a.jsx("strong",{children:"Zsh"})," (Z Shell) é um shell avançado compatível com Bash, mas com recursos extras como autocompletar inteligente, correção de erros, globbing avançado e temas visuais. Com o ",a.jsx("strong",{children:"Oh My Zsh"}),", se torna o shell mais produtivo e bonito do Linux."]}),a.jsx("h2",{children:"1. Instalação e Configuração"}),a.jsx(s,{title:"Instalar o Zsh e torná-lo padrão",code:`# Instalar o Zsh
  pkg update
  pkg install -y zsh

  # Verificar a versão
  zsh --version
  # Saída: zsh 5.9

  # Testar o Zsh sem mudar o padrão
  zsh

  # Definir o Zsh como shell padrão
  chsh -s $(which zsh)
  # Faça logout e login para aplicar

  # Verificar qual shell está ativo
  echo $SHELL
  # Deve mostrar: /usr/bin/zsh

  # Voltar para o Bash (se quiser reverter)
  chsh -s $(which bash)`}),a.jsx("h2",{children:"2. Oh My Zsh — Framework de Configuração"}),a.jsx(s,{title:"Instalar e configurar o Oh My Zsh",code:`# Instalar o Oh My Zsh
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  # Ou via wget:
  sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

  # O Oh My Zsh cria o arquivo ~/.zshrc automaticamente

  # Mudar o tema (editar ~/.zshrc)
  nano ~/.zshrc
  # Encontre a linha: ZSH_THEME="robbyrussell"
  # Temas populares:
  # ZSH_THEME="robbyrussell"    ← padrão, limpo
  # ZSH_THEME="agnoster"        ← informativo, bonito (precisa de Nerd Font)
  # ZSH_THEME="powerlevel10k/powerlevel10k"  ← o mais popular (instalar separado)
  # ZSH_THEME="af-magic"        ← simples e elegante
  # ZSH_THEME="bira"            ← duas linhas, informativo

  # Aplicar mudanças
  source ~/.zshrc

  # === Instalar Powerlevel10k (tema mais popular) ===
  git clone --depth=1 https://github.com/romkatv/powerlevel10k.git     \${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

  # No ~/.zshrc:
  # ZSH_THEME="powerlevel10k/powerlevel10k"
  source ~/.zshrc
  # O assistente de configuração do p10k inicia automaticamente
  # Ou execute: p10k configure

  # Instalar Nerd Fonts (ícones no terminal)
  # Baixe de: nerdfonts.com
  # Recomendadas: JetBrainsMono Nerd Font, MesloLGS NF
  # No terminal do Termux: Preferências → Perfil → Fonte`}),a.jsx("h2",{children:"3. Plugins Essenciais"}),a.jsx(s,{title:"Instalar e configurar plugins do Oh My Zsh",code:`# Os plugins são ativados no ~/.zshrc:
  # plugins=(git docker kubectl node)

  # === Plugins que já vêm com Oh My Zsh ===
  # git               → aliases para git (gst, gco, gp, gl, etc.)
  # docker            → autocompletar para Docker
  # docker-compose    → autocompletar para docker-compose
  # kubectl           → aliases e autocompletar para Kubernetes
  # node              → aliases para Node.js/NPM
  # npm               → autocompletar para NPM
  # python            → aliases para Python
  # pip               → autocompletar para pip
  # sudo              → pressione ESC ESC para adicionar sudo ao comando
  # history           → atalhos de histórico
  # extract           → extract arquivo.tar.gz (detecta o formato)
  # web-search        → google "algo" abre no navegador
  # copypath          → copia o caminho atual para clipboard
  # copybuffer        → Ctrl+O copia o comando atual

  # Exemplo de configuração:
  # plugins=(git docker sudo history extract z colored-man-pages)

  # === Plugins externos (instalar separadamente) ===

  # zsh-autosuggestions — sugere comandos baseado no histórico
  git clone https://github.com/zsh-users/zsh-autosuggestions     \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

  # zsh-syntax-highlighting — colorir comandos em tempo real
  git clone https://github.com/zsh-users/zsh-syntax-highlighting     \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

  # zsh-completions — autocompletar extra
  git clone https://github.com/zsh-users/zsh-completions     \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-completions

  # fzf — busca fuzzy (Ctrl+R melhorado)
  pkg install -y fzf

  # Ativar os plugins no ~/.zshrc:
  # plugins=(
  #   git
  #   docker
  #   sudo
  #   history
  #   z
  #   zsh-autosuggestions
  #   zsh-syntax-highlighting
  #   zsh-completions
  #   fzf
  # )

  source ~/.zshrc`}),a.jsx("h2",{children:"4. Aliases e Funções"}),a.jsx(s,{title:"Criar aliases e funções personalizadas",code:`# Adicionar aliases ao ~/.zshrc (ou ~/.zsh_aliases)
  # Aliases úteis:

  # Sistema
  alias update="pkg update && pkg upgrade -y"
  alias cls="clear"
  alias ..="cd .."
  alias ...="cd ../.."
  alias ll="ls -lah --color=auto"
  alias la="ls -A"
  alias mkdir="mkdir -pv"
  alias df="df -h"
  alias free="free -h"

  # Git (além dos do plugin git)
  alias gs="git status"
  alias gc="git commit -m"
  alias gp="git push"
  alias gl="git pull"
  alias glog="git log --oneline --graph --decorate -20"

  # Docker
  alias dps="docker ps"
  alias dpsa="docker ps -a"
  alias dimg="docker images"
  alias dexec="docker exec -it"

  # Segurança
  alias rm="rm -i"    # Pedir confirmação antes de deletar
  alias cp="cp -i"
  alias mv="mv -i"

  # Funções úteis no ~/.zshrc:
  mkcd() {
    mkdir -p "$1" && cd "$1"
  }

  # Extrair qualquer arquivo comprimido
  extract() {
    case $1 in
      *.tar.bz2) tar xjf $1 ;;
      *.tar.gz)  tar xzf $1 ;;
      *.tar.xz)  tar xJf $1 ;;
      *.zip)     unzip $1 ;;
      *.rar)     unrar x $1 ;;
      *.7z)      7z x $1 ;;
      *) echo "Formato não reconhecido: $1" ;;
    esac
  }`}),a.jsx("h2",{children:"5. Configurações Avançadas do Zsh"}),a.jsx(s,{title:"Recursos avançados do Zsh",code:`# Histórico compartilhado entre terminais
  # No ~/.zshrc:
  HISTSIZE=50000
  SAVEHIST=50000
  HISTFILE=~/.zsh_history
  setopt SHARE_HISTORY        # Compartilhar entre sessões
  setopt HIST_IGNORE_ALL_DUPS # Ignorar duplicatas
  setopt HIST_IGNORE_SPACE    # Não salvar comandos que começam com espaço
  setopt HIST_REDUCE_BLANKS   # Remover espaços extras

  # Autocompletar com Tab melhorado
  setopt AUTO_CD             # Digitar nome de pasta = cd
  setopt CORRECT             # Sugerir correção para comandos errados
  setopt CORRECT_ALL         # Sugerir correção para argumentos

  # Globbing avançado (funcionalidade exclusiva do Zsh)
  ls **/*.txt              # Busca recursiva
  ls *.{jpg,png,gif}       # Múltiplas extensões
  ls **/*(.)               # Apenas arquivos (não diretórios)
  ls **/*(/)               # Apenas diretórios
  ls **/*(.mh-1)           # Arquivos modificados na última hora
  ls **/*(.Lk+100)         # Arquivos maiores que 100KB

  # Buscar no histórico com setas (melhoria incrível)
  bindkey '^[[A' history-beginning-search-backward
  bindkey '^[[B' history-beginning-search-forward
  # Agora: digite "git" e pressione ↑ para navegar entre comandos git anteriores`}),a.jsx("h2",{children:"Troubleshooting"}),a.jsx(s,{title:"Problemas comuns com Zsh",code:`# Terminal lento para abrir (Zsh demora para carregar)
  # Medir tempo de inicialização:
  time zsh -i -c exit
  # Se > 1 segundo, desabilite plugins pesados:
  # - nvm é notoriamente lento (use fnm como alternativa)
  # - conda auto activate pode ser lento

  # Caracteres estranhos no prompt (quadrados, diamantes)
  # Causa: Falta Nerd Font
  # Solução: Instalar e configurar no terminal
  # Recomendada: MesloLGS NF ou JetBrainsMono Nerd Font

  # Plugins não funcionam após instalar
  # Verificar se estão na lista de plugins no ~/.zshrc
  # Verificar se o diretório existe:
  ls ~/.oh-my-zsh/custom/plugins/

  # Autocompletar não funciona
  # Reconstruir cache de autocompletar:
  rm -f ~/.zcompdump*
  source ~/.zshrc

  # Voltar para o Bash (emergência)
  bash
  chsh -s $(which bash)

  # Atualizar o Oh My Zsh
  omz update
  # Ou manualmente:
  cd ~/.oh-my-zsh && git pull`}),a.jsxs(e,{type:"info",title:"Zsh vs Fish vs Bash",children:[a.jsx("strong",{children:"Bash"})," é o padrão e mais compatível. ",a.jsx("strong",{children:"Zsh"})," é Bash melhorado com plugins (via Oh My Zsh). ",a.jsx("strong",{children:"Fish"})," tem melhor experiência out-of-the-box (autocompletar, cores), mas não é compatível com Bash. Para a maioria dos usuários, Zsh + Oh My Zsh é a melhor combinação."]})]})}export{h as default};

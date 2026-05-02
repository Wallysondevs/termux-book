import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Zsh() {
    return (
      <PageContainer
        title="Zsh — Shell Avançado"
        subtitle="Instalação do Zsh e Oh My Zsh no Ubuntu: plugins, temas, autocompletar, aliases, histórico e personalização completa do terminal."
        difficulty="iniciante"
        timeToRead="25 min"
      >
        <p>
          O <strong>Zsh</strong> (Z Shell) é um shell avançado compatível com Bash, mas com
          recursos extras como autocompletar inteligente, correção de erros, globbing avançado
          e temas visuais. Com o <strong>Oh My Zsh</strong>, se torna o shell mais produtivo
          e bonito do Linux.
        </p>

        <h2>1. Instalação e Configuração</h2>
        <CodeBlock
          title="Instalar o Zsh e torná-lo padrão"
          code={`# Instalar o Zsh
  sudo apt update
  sudo apt install -y zsh

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
  chsh -s $(which bash)`}
        />

        <h2>2. Oh My Zsh — Framework de Configuração</h2>
        <CodeBlock
          title="Instalar e configurar o Oh My Zsh"
          code={`# Instalar o Oh My Zsh
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
  git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
    \${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

  # No ~/.zshrc:
  # ZSH_THEME="powerlevel10k/powerlevel10k"
  source ~/.zshrc
  # O assistente de configuração do p10k inicia automaticamente
  # Ou execute: p10k configure

  # Instalar Nerd Fonts (ícones no terminal)
  # Baixe de: nerdfonts.com
  # Recomendadas: JetBrainsMono Nerd Font, MesloLGS NF
  # No terminal do Ubuntu: Preferências → Perfil → Fonte`}
        />

        <h2>3. Plugins Essenciais</h2>
        <CodeBlock
          title="Instalar e configurar plugins do Oh My Zsh"
          code={`# Os plugins são ativados no ~/.zshrc:
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
  git clone https://github.com/zsh-users/zsh-autosuggestions \
    \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

  # zsh-syntax-highlighting — colorir comandos em tempo real
  git clone https://github.com/zsh-users/zsh-syntax-highlighting \
    \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

  # zsh-completions — autocompletar extra
  git clone https://github.com/zsh-users/zsh-completions \
    \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-completions

  # fzf — busca fuzzy (Ctrl+R melhorado)
  sudo apt install -y fzf

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

  source ~/.zshrc`}
        />

        <h2>4. Aliases e Funções</h2>
        <CodeBlock
          title="Criar aliases e funções personalizadas"
          code={`# Adicionar aliases ao ~/.zshrc (ou ~/.zsh_aliases)
  # Aliases úteis:

  # Sistema
  alias update="sudo apt update && sudo apt upgrade -y"
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
  }`}
        />

        <h2>5. Configurações Avançadas do Zsh</h2>
        <CodeBlock
          title="Recursos avançados do Zsh"
          code={`# Histórico compartilhado entre terminais
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
  # Agora: digite "git" e pressione ↑ para navegar entre comandos git anteriores`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com Zsh"
          code={`# Terminal lento para abrir (Zsh demora para carregar)
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
  cd ~/.oh-my-zsh && git pull`}
        />

        <AlertBox type="info" title="Zsh vs Fish vs Bash">
          <strong>Bash</strong> é o padrão e mais compatível. <strong>Zsh</strong> é Bash melhorado 
          com plugins (via Oh My Zsh). <strong>Fish</strong> tem melhor experiência out-of-the-box
          (autocompletar, cores), mas não é compatível com Bash. Para a maioria dos usuários, 
          Zsh + Oh My Zsh é a melhor combinação.
        </AlertBox>
      </PageContainer>
    );
  }
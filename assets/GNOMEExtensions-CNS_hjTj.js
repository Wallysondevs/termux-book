import{j as e}from"./index-BGu3owFd.js";import{P as r,I as o}from"./InfoBox-cbYNoYJG.js";import{C as s}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function c(){return e.jsxs(r,{title:"Customização do Termux",subtitle:"Cores, fontes, prompt customizado, oh-my-zsh e Starship — deixe o Termux com a sua cara.",difficulty:"iniciante",timeToRead:"25 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Extensions"})," "," — "," ","plugins."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"gnome-extensions-app"})," "," — "," ","gerencia."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"extensions.gnome.org"})," "," — "," ","site."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Compatibilidade"})," "," — "," ","por versão."]})]}),e.jsxs(o,{type:"info",title:"GNOME não roda no Android nativamente",children:["O GNOME Shell (e suas extensões) é um desktop Linux completo que depende de",e.jsx("code",{children:" systemd"}),", drivers GPU e GTK4 — nada disso roda puro no Android. Se você quer GUI no Termux, use o app ",e.jsx("strong",{children:"Termux:X11"})," + ",e.jsx("strong",{children:"XFCE/i3/openbox"}),". Para deixar o Termux bonito (cores, prompt, fontes), siga este guia."]}),e.jsx("h2",{children:"1. Cores — ~/.termux/colors.properties"}),e.jsxs("p",{children:["O Termux lê esquemas de cor de ",e.jsx("code",{children:"~/.termux/colors.properties"}),". Após editar, rode ",e.jsx("code",{children:"termux-reload-settings"})," para aplicar sem reiniciar."]}),e.jsx(s,{title:"Exemplo: tema Dracula",code:`mkdir -p ~/.termux

cat > ~/.termux/colors.properties <<'EOF'
background=#282a36
foreground=#f8f8f2
cursor=#f8f8f2

color0=#000000
color1=#ff5555
color2=#50fa7b
color3=#f1fa8c
color4=#bd93f9
color5=#ff79c6
color6=#8be9fd
color7=#bbbbbb
color8=#555555
color9=#ff5555
color10=#50fa7b
color11=#f1fa8c
color12=#bd93f9
color13=#ff79c6
color14=#8be9fd
color15=#ffffff
EOF

termux-reload-settings`}),e.jsxs("p",{children:["Vários esquemas prontos (Solarized, Nord, Gruvbox, Tokyo Night, Catppuccin) estão em",e.jsx("a",{href:"https://github.com/Mayccoll/Gogh",children:" Gogh"})," e",e.jsx("a",{href:"https://github.com/storm119/Tilix-Themes",children:" Tilix-Themes"})," — basta copiar para",e.jsx("code",{children:"~/.termux/colors.properties"}),"."]}),e.jsx("h2",{children:"2. Termux:Styling — App de temas prontos"}),e.jsx(s,{title:"Instalar e aplicar",code:`# 1. Instale "Termux:Styling" pelo F-Droid
# 2. Toque longo no terminal -> "More" -> "Style"
# 3. Escolha um esquema de cores e/ou uma fonte
# Aplica direto em ~/.termux/colors.properties e ~/.termux/font.ttf`}),e.jsx("h2",{children:"3. Fontes — ~/.termux/font.ttf"}),e.jsxs("p",{children:["O Termux usa um único arquivo de fonte: ",e.jsx("code",{children:"~/.termux/font.ttf"}),". Para um prompt com ícones (Powerline, Nerd Fonts), baixe uma ",e.jsx("strong",{children:"Nerd Font"}),"."]}),e.jsx(s,{title:"Instalar uma Nerd Font (ex: JetBrainsMono)",code:`mkdir -p ~/.termux
curl -L -o ~/.termux/font.ttf \\
  https://github.com/ryanoasis/nerd-fonts/raw/master/patched-fonts/JetBrainsMono/Ligatures/Regular/JetBrainsMonoNerdFont-Regular.ttf

termux-reload-settings`}),e.jsx("h2",{children:"4. Prompt customizado no bash"}),e.jsx(s,{title:"~/.bashrc — prompt colorido com git",code:`# Adicione ao final do ~/.bashrc

parse_git_branch() {
  git branch 2>/dev/null | sed -n 's/^\\* \\(.*\\)/ (\\1)/p'
}

PS1='\\[\\e[36m\\]\\u@termux\\[\\e[0m\\]:\\[\\e[33m\\]\\w\\[\\e[35m\\]$(parse_git_branch)\\[\\e[0m\\]\\$ '

# Recarregue:
source ~/.bashrc`}),e.jsx("h2",{children:"5. Zsh + Oh My Zsh"}),e.jsx(s,{title:"Instalar Zsh e Oh My Zsh",code:`pkg install zsh git curl

# Instalador oficial do Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Definir zsh como shell padrão do Termux
chsh -s zsh

# Plugins úteis (autossugestão e syntax highlight)
git clone https://github.com/zsh-users/zsh-autosuggestions \\
  ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting \\
  ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting

# No ~/.zshrc, ajuste a linha plugins=(...)
# plugins=(git zsh-autosuggestions zsh-syntax-highlighting)`}),e.jsx("h2",{children:"6. Tema Powerlevel10k"}),e.jsx("p",{children:"Tema rápido, configurável e que aproveita Nerd Fonts."}),e.jsx(s,{title:"Instalar Powerlevel10k",code:`git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \\
  \${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# No ~/.zshrc:
# ZSH_THEME="powerlevel10k/powerlevel10k"

# Reinicie o zsh — o assistente p10k configure abre automaticamente
exec zsh`}),e.jsx("h2",{children:"7. Starship — prompt cross-shell"}),e.jsx("p",{children:"Alternativa moderna escrita em Rust, funciona em bash, zsh, fish."}),e.jsx(s,{title:"Instalar Starship",code:`pkg install starship

# Bash: adicione no ~/.bashrc
echo 'eval "$(starship init bash)"' >> ~/.bashrc

# Zsh: adicione no ~/.zshrc
echo 'eval "$(starship init zsh)"' >> ~/.zshrc

# Configurar (opcional): ~/.config/starship.toml
mkdir -p ~/.config
starship preset nerd-font-symbols -o ~/.config/starship.toml`}),e.jsx("h2",{children:"8. Outras configurações úteis"}),e.jsx(s,{title:"~/.termux/termux.properties",code:`# Tecla Extra Keys customizada
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP'], \\
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN']]

# Atalhos do volume como teclas modificadoras
volume-keys = volume

# Limite de scrollback
terminal-transcript-rows = 5000

# Cursor piscando
terminal-cursor-blink-rate = 500
terminal-cursor-style = bar

# Aplique:
# termux-reload-settings`}),e.jsx(o,{type:"success",title:"Resumo",children:e.jsxs("ul",{className:"mt-1 mb-0 list-disc pl-5",children:[e.jsxs("li",{children:["Cores: ",e.jsx("code",{children:"~/.termux/colors.properties"})," + ",e.jsx("code",{children:"termux-reload-settings"})]}),e.jsxs("li",{children:["Fonte: ",e.jsx("code",{children:"~/.termux/font.ttf"})," (use Nerd Fonts para ícones)"]}),e.jsxs("li",{children:["Prompt: bash ",e.jsx("code",{children:"PS1"}),", ou Oh My Zsh + Powerlevel10k, ou Starship"]}),e.jsxs("li",{children:["Para GUI completa estilo desktop: app Termux:X11 + ",e.jsx("code",{children:"pkg install x11-repo xfce4"})]})]})})]})}export{c as default};

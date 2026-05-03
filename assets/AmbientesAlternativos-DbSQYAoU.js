import{j as e}from"./index-BGu3owFd.js";import{P as r,I as o}from"./InfoBox-cbYNoYJG.js";import{C as i}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function d(){return e.jsxs(r,{title:"Ambientes Gráficos Alternativos no Termux",subtitle:"XFCE4, LXQt, i3wm, openbox e fvwm — o que realmente roda via Termux:X11 no Android.",difficulty:"intermediario",timeToRead:"15 min",children:[e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"KDE"})," "," — "," ","Plasma desktop."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"XFCE"})," "," — "," ","leve."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"MATE"})," "," — "," ","clássico."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"LXQt"})," "," — "," ","minimalista."]})]}),e.jsxs(o,{type:"danger",title:"KDE Plasma, GNOME, MATE e Cinnamon NÃO rodam no Termux",children:["Esses ambientes dependem de ",e.jsx("strong",{children:"systemd"}),", ",e.jsx("strong",{children:"Wayland nativo"}),",",e.jsx("strong",{children:" PolicyKit"}),", ",e.jsx("strong",{children:"NetworkManager"})," e drivers de GPU que",e.jsx("strong",{children:" não existem no Android"}),". Mesmo que algum pacote pareça instalável via",e.jsx("code",{children:" proot-distro"}),", a experiência fica inutilizável (lenta, travando, consumindo toda a bateria). ",e.jsx("strong",{children:"Não tente instalar."})," Use as alternativas leves abaixo."]}),e.jsxs("p",{children:["No Termux a interface gráfica vive dentro do app companion ",e.jsx("strong",{children:"Termux:X11"}),"(baixe o APK em ",e.jsx("code",{children:"github.com/termux/termux-x11/releases"}),"). Como o servidor X está numa janela Android, o que importa é escolher um ",e.jsx("em",{children:"desktop leve"})," que renderize bem nesse contexto. As opções viáveis são:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"XFCE4"}),' — recomendado. Único DE "completo" leve o suficiente.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"LXQt"})," — funciona parcialmente; alguns componentes Qt podem falhar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"i3wm"})," — tiling WM, ultra leve, controlado por teclado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"openbox"})," — WM minimalista flutuante."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"fvwm"})," — WM clássico configurável, pesado em config mas leve em RAM."]})]}),e.jsx("h2",{children:"Pré-requisitos"}),e.jsx(i,{title:"Base comum a todos os ambientes",code:`pkg update -y && pkg upgrade -y
pkg install -y x11-repo
pkg install -y termux-x11-nightly xorg-server`}),e.jsxs(o,{type:"info",title:"Como iniciar qualquer um deles",children:["O fluxo é sempre o mesmo: rode ",e.jsx("code",{children:"termux-x11 :0 &"}),", abra o app Termux:X11, depois ",e.jsx("code",{children:"export DISPLAY=:0"})," e finalmente o comando que inicia o ambiente (ex: ",e.jsx("code",{children:"startxfce4"}),", ",e.jsx("code",{children:"i3"}),", ",e.jsx("code",{children:"openbox-session"}),")."]}),e.jsx("h2",{children:"1. XFCE4 (recomendado)"}),e.jsx(i,{title:"Instalar e iniciar XFCE4",code:`pkg install -y xfce4 xfce4-terminal thunar mousepad

# Iniciar
termux-x11 :0 &
# (abra o app Termux:X11 agora)
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
dbus-launch --exit-with-session startxfce4 &`}),e.jsx("p",{children:'Bom equilíbrio entre recursos e leveza: tem painel, gerenciador de arquivos, menu de apps e configuração visual. É o que mais "parece um desktop" sem matar a bateria.'}),e.jsx("h2",{children:"2. LXQt (parcial)"}),e.jsxs(o,{type:"warning",title:"Limitações do LXQt no Termux",children:["Algumas peças (lxqt-policykit, lxqt-powermanagement) ",e.jsx("strong",{children:"não funcionam"}),"porque dependem de PolicyKit/UPower do Android. O resto roda, mas espere bugs visuais."]}),e.jsx(i,{title:"Instalar e iniciar LXQt",code:`pkg install -y lxqt openbox

termux-x11 :0 &
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
dbus-launch --exit-with-session startlxqt &`}),e.jsx("h2",{children:"3. i3wm — tiling window manager"}),e.jsx("p",{children:"Se você curte teclado e organização automática de janelas, é a opção mais responsiva. Não é um DE: é só o gerenciador de janelas + barra de status."}),e.jsx(i,{title:"Instalar e iniciar i3",code:`pkg install -y i3 i3status dmenu

termux-x11 :0 &
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
i3 &

# Atalhos padrão (Mod = Alt no Termux por padrão; mude pra Super se quiser):
# Mod+Enter        → terminal
# Mod+d            → dmenu (lançador)
# Mod+Shift+q      → fechar janela
# Mod+1..9         → trocar de workspace
# Mod+Shift+e      → sair do i3
# Mod+Shift+r      → recarregar config

# Editar config
nano ~/.config/i3/config`}),e.jsx("h2",{children:"4. Openbox — minimalista"}),e.jsx(i,{title:"Instalar e iniciar Openbox",code:`pkg install -y openbox obconf

termux-x11 :0 &
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
openbox-session &

# Menu: clique direito no fundo da tela
# Editar menu/config:
#   ~/.config/openbox/menu.xml
#   ~/.config/openbox/rc.xml
# Configurar visualmente: obconf`}),e.jsx("h2",{children:"5. FVWM — clássico configurável"}),e.jsx(i,{title:"Instalar e iniciar FVWM",code:`pkg install -y fvwm

termux-x11 :0 &
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
fvwm &

# Toda a aparência vem do arquivo ~/.fvwm/config
# Procure exemplos em fvwm.org`}),e.jsx("h2",{children:"Compositor, papel de parede e launcher"}),e.jsx("p",{children:'Pra dar uma cara mais "moderna" aos WMs minimalistas, instale extras:'}),e.jsx(i,{title:"Extras opcionais",code:`# Papel de parede
pkg install -y feh
feh --bg-scale ~/wallpaper.jpg

# Launcher mais bonito que dmenu
pkg install -y rofi
rofi -show drun

# Notificações
pkg install -y dunst`}),e.jsxs(o,{type:"warning",title:"Sem aceleração 3D garantida",children:['Termux:X11 usa renderização via software por padrão. Apps que exigem OpenGL pesado (jogos, vídeo 4K, IDEs Electron) ficarão lentos. Para algo "compositor com sombras" (ex: ',e.jsx("code",{children:"picom"}),") o ganho visual costuma não compensar o gasto de bateria."]}),e.jsx("h2",{children:"Resumo prático"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Quer um desktop convencional? ",e.jsx("strong",{children:"XFCE4"}),"."]}),e.jsxs("li",{children:["Quer máxima velocidade e fluxo por teclado? ",e.jsx("strong",{children:"i3wm"}),"."]}),e.jsxs("li",{children:['Quer só uma "tela com janelas" minimalista? ',e.jsx("strong",{children:"openbox"}),"."]}),e.jsx("li",{children:"Esqueça KDE, GNOME, MATE, Cinnamon e Budgie no Termux puro."})]})]})}export{d as default};

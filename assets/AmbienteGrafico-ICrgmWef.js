import{j as e}from"./index-BGu3owFd.js";import{P as a,I as o}from"./InfoBox-cbYNoYJG.js";import{C as r}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function d(){return e.jsxs(a,{title:"Ambiente Gráfico no Termux (Termux:X11 + XFCE4)",subtitle:"Como rodar uma interface gráfica leve no Android usando Termux:X11, xorg-server e XFCE4 — e atalhos de teclado nativos do Termux.",difficulty:"intermediario",timeToRead:"20 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"X11"})," "," — "," ","servidor gráfico clássico."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Wayland"})," "," — "," ","moderno."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"DE"})," "," — "," ","Desktop Environment."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"WM"})," "," — "," ","Window Manager."]})]}),e.jsxs(o,{type:"warning",title:"Isto é EXPERIMENTAL",children:["O Termux roda em Android sem root. Ele ",e.jsx("strong",{children:'não tem GNOME, Wayland nem X.org "de verdade"'}),"como num PC. O que existe é um truque: o app companion ",e.jsx("strong",{children:"Termux:X11"})," renderiza uma sessão X11 dentro de uma janela Android. Isso funciona, mas:",e.jsxs("ul",{children:[e.jsxs("li",{children:["Consome ",e.jsx("strong",{children:"muita bateria"})," e esquenta o aparelho"]}),e.jsx("li",{children:"Performance é limitada — não substitui um PC"}),e.jsx("li",{children:"Apps gráficos pesados (Chromium, LibreOffice, IDEs) podem travar"}),e.jsx("li",{children:"Não há aceleração gráfica garantida — depende do device/driver"})]}),"Para uso casual de XFCE4 leve, funciona muito bem. Para produtividade séria, prefira o terminal puro."]}),e.jsx("h2",{children:"O que você precisa"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Termux"})," instalado pelo F-Droid (a versão da Play Store está desatualizada)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Termux:X11"})," — app companion, baixe o APK em ",e.jsx("code",{children:"github.com/termux/termux-x11/releases"})]}),e.jsxs("li",{children:["Cerca de ",e.jsx("strong",{children:"1 GB de espaço livre"})," para o XFCE4 e dependências"]})]}),e.jsxs(o,{type:"info",title:"Por que XFCE4?",children:['XFCE4 é o único ambiente desktop "completo" leve o bastante para rodar de forma usável via Termux:X11 num celular Android. KDE, GNOME, MATE e Cinnamon são pesados demais e dependem de coisas que o Android não tem. Para algo ainda mais leve, veja a página de ',e.jsx("em",{children:"Ambientes Alternativos"})," (i3wm, openbox)."]}),e.jsx("h2",{children:"1. Instalação"}),e.jsx(r,{title:"Instalar Termux:X11 + XFCE4",code:`# Atualizar pacotes
pkg update -y && pkg upgrade -y

# Habilitar o repositório x11
pkg install -y x11-repo

# Instalar o servidor Termux:X11 (lado Termux), xorg-server e XFCE4
pkg install -y termux-x11-nightly xorg-server xfce4

# (Opcional) utilitários comuns do XFCE
pkg install -y xfce4-terminal thunar mousepad

# (Opcional) suporte a som via PulseAudio
pkg install -y pulseaudio`}),e.jsx("h2",{children:"2. Iniciando a sessão gráfica"}),e.jsx(r,{title:"Iniciar XFCE4 dentro do Termux:X11",code:`# 1) No Termux, inicie o servidor X11 (segura o display :0)
termux-x11 :0 &

# 2) Abra o app Termux:X11 (ele vai mostrar tela preta esperando cliente)

# 3) De volta no Termux, exporte o DISPLAY e suba o XFCE
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
dbus-launch --exit-with-session startxfce4 &

# Volte para o app Termux:X11 — o XFCE4 deve aparecer.`}),e.jsxs(o,{type:"info",title:"Script único",children:["Cole o bloco abaixo num arquivo ",e.jsx("code",{children:"~/start-xfce.sh"})," e rode com",e.jsx("code",{children:"bash ~/start-xfce.sh"})," sempre que quiser abrir o desktop."]}),e.jsx(r,{title:"~/start-xfce.sh",code:`#!/data/data/com.termux/files/usr/bin/bash
pkill -f "termux-x11" 2>/dev/null
termux-x11 :0 >/dev/null 2>&1 &
sleep 2
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
dbus-launch --exit-with-session startxfce4 >/dev/null 2>&1 &
echo "Abra o app Termux:X11 agora."`}),e.jsx("h2",{children:"3. Som (opcional)"}),e.jsx(r,{title:"Áudio via PulseAudio",code:`# Iniciar PulseAudio aceitando conexões locais
pulseaudio --start \\
  --load="module-native-protocol-tcp auth-ip-acl=127.0.0.1 auth-anonymous=1" \\
  --exit-idle-time=-1

# Apontar apps para o servidor de som
export PULSE_SERVER=127.0.0.1`}),e.jsx("h2",{children:"Layout do Teclado & Gestos no Termux"}),e.jsxs("p",{children:["Mesmo sem ambiente gráfico, o Termux tem atalhos pensados para tela touch e teclados Android (que não têm ",e.jsx("code",{children:"Ctrl"}),"/",e.jsx("code",{children:"Esc"})," físico). A tecla",e.jsx("strong",{children:" Volume Up "})," funciona como modificador especial."]}),e.jsx(r,{title:"Atalhos com Volume Up (Vol+) no terminal",code:`Vol+ + E      → Esc
Vol+ + T      → Tab
Vol+ + 1..9   → F1..F9
Vol+ + 0      → F10
Vol+ + B      → Alt+B  (palavra anterior)
Vol+ + F      → Alt+F  (próxima palavra)
Vol+ + X      → Alt+X
Vol+ + W      → Seta cima
Vol+ + A      → Seta esquerda
Vol+ + S      → Seta baixo
Vol+ + D      → Seta direita
Vol+ + L      → | (pipe)
Vol+ + H      → ~
Vol+ + U      → _
Vol+ + P      → PageUp
Vol+ + N      → PageDown
Vol+ + .      → Ctrl+\\  (SIGQUIT)
Vol+ + Q ou K → mostra/esconde a barra de teclas extras`}),e.jsx(r,{title:"Atalhos com Volume Down (Vol-) — modificador Ctrl",code:`Vol- + L  → Ctrl+L (limpar tela)
Vol- + C  → Ctrl+C (interromper)
Vol- + D  → Ctrl+D (EOF / sair)
Vol- + Z  → Ctrl+Z (suspender processo)
Vol- + R  → Ctrl+R (busca reversa no histórico)`}),e.jsx("h2",{children:"Gestos na tela"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Toque longo"})," → menu de copiar/colar e tela cheia"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Pinça (zoom)"})," → aumenta/diminui o tamanho da fonte"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Deslizar com 2 dedos pra baixo"})," → mostra a barra de teclas extras"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Deslizar da esquerda"})," → abre a gaveta de sessões"]})]}),e.jsx("h2",{children:"Personalizando a barra de teclas extras"}),e.jsxs("p",{children:["A barra cinza acima do teclado é configurável. Edite o arquivo",e.jsx("code",{children:" ~/.termux/termux.properties "}),":"]}),e.jsx(r,{title:"~/.termux/termux.properties",code:`# Linha 1 = primeira fileira da barra; cada item entre vírgulas
extra-keys = [ \\
  ['ESC','/','-','HOME','UP','END','PGUP'], \\
  ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN'] \\
]

# Aplicar mudanças sem fechar o Termux
# Rode no terminal:
#   termux-reload-settings`}),e.jsx("h2",{children:"Resumo"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Para GUI no Termux: ",e.jsx("strong",{children:"Termux:X11 + xorg-server + XFCE4"}),"."]}),e.jsxs("li",{children:["Encare como um ",e.jsx("em",{children:"extra experimental"}),", não como substituto de PC."]}),e.jsxs("li",{children:["No dia a dia, foque nos atalhos de ",e.jsx("strong",{children:"Volume Up/Down"})," — eles transformam a experiência no terminal puro."]})]})]})}export{d as default};

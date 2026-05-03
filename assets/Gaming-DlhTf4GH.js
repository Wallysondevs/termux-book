import{j as o}from"./index-BGu3owFd.js";import{P as a,I as r}from"./InfoBox-cbYNoYJG.js";import{C as e}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function m(){return o.jsxs(a,{title:"Gaming no Termux",subtitle:"O que dá (e o que NÃO dá) pra jogar via Termux: emuladores leves no terminal, Box86/Box64 pra binários x86 e por que Steam/Proton não rodam no Android.",difficulty:"iniciante",timeToRead:"20 min",children:[o.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),o.jsx("h2",{children:"Glossário rápido"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Steam"})," "," — "," ","plataforma."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Proton"})," "," — "," ","Wine para Steam."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Lutris"})," "," — "," ","launcher."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Mesa"})," "," — "," ","drivers OpenGL."]})]}),o.jsxs(r,{type:"danger",title:"Termux NÃO é uma plataforma de gaming",children:["Termux roda em Android, sem root, sem GPU exposta como num PC e sem drivers proprietários NVIDIA/AMD/Intel. ",o.jsx("strong",{children:"Steam, Proton, Lutris, Wine nativo, RPCS3, PCSX2 desktop, Yuzu, Ryujinx"})," e outros emuladores/lojas pesadas ",o.jsx("strong",{children:"não funcionam dentro do Termux"}),". Para emulação séria de consoles modernos (PS2, GameCube, Switch, 3DS, PSP), instale apps Android nativos: ",o.jsx("strong",{children:"RetroArch, AetherSX2, Dolphin, Citra, PPSSPP, DuckStation"})," direto da Play Store ou F-Droid."]}),o.jsxs("p",{children:["O que o Termux ",o.jsx("em",{children:"realmente"})," oferece em termos de jogo é nicho: emuladores de máquinas antigas que rodam em texto ou janela leve via Termux:X11, alguns jogos clássicos de DOS/SCUMM e a possibilidade experimental de rodar binários x86 Linux com ",o.jsx("strong",{children:"Box86/Box64"}),"."]}),o.jsx("h2",{children:"1. DOSBox — Jogos clássicos de PC (DOS)"}),o.jsx(e,{title:"Instalar e rodar DOSBox no Termux",code:`# DOSBox roda jogos antigos de MS-DOS via terminal
pkg install -y dosbox

# Iniciar
dosbox

# Dentro do DOSBox, montar uma pasta como drive C:
mount c ~/storage/shared/dos-games
c:
cd prince
prince.exe

# Sair
exit`}),o.jsx("h2",{children:"2. ScummVM — Adventure games clássicos"}),o.jsx(e,{title:"Rodar Monkey Island, Day of the Tentacle, etc.",code:`# ScummVM toca jogos LucasArts/Sierra antigos
pkg install -y scummvm

# Iniciar a interface
scummvm

# Adicione o diretório do jogo (no storage compartilhado):
# termux-setup-storage
# depois aponte ScummVM para ~/storage/shared/scumm-games/`}),o.jsx("h2",{children:"3. RetroArch headless (avançado)"}),o.jsx(e,{title:"RetroArch via terminal — limitado",code:`# Existe pacote retroarch no Termux, mas a versão Android
# nativa (Play Store / F-Droid) é MUITO melhor pra jogar:
# - Tem interface touch
# - Acessa controles Bluetooth direto pelo Android
# - Performance melhor (usa GPU do Android)

# Se ainda assim quiser tentar via Termux + Termux:X11:
pkg install x11-repo
pkg install -y retroarch

# Rodar (precisa do app Termux:X11 aberto):
export DISPLAY=:0
retroarch

# Cores (núcleos) precisam ser baixados manualmente ou via UI.
# Recomendação séria: use o app RetroArch Android, não esta versão.`}),o.jsx("h2",{children:"4. Box86 / Box64 — Rodar binários x86/x86_64 Linux"}),o.jsxs("p",{children:[o.jsx("strong",{children:"Box86"})," (32-bit) e ",o.jsx("strong",{children:"Box64"})," (64-bit) são tradutores que executam binários Linux compilados para x86 em CPUs ARM (que é a arquitetura do Android). Eles servem pra rodar alguns emuladores e jogos Linux antigos. Não esperar milagres: jogos modernos, DRMs e qualquer coisa que precise de GPU dedicada não vão."]}),o.jsx(e,{title:"Instalar Box86 e Box64 no Termux",code:`# Os pacotes oficiais ficam no repositório x11-repo
pkg install x11-repo
pkg install -y box86 box64

# Verificar
box86 -v
box64 -v

# Rodar um binário x86 Linux:
box86 ./meu-jogo-32bit
box64 ./meu-jogo-64bit

# Combinar com Termux:X11 para jogos com janela:
export DISPLAY=:0
box64 ./jogo-linux-x86_64`}),o.jsxs(r,{type:"warning",title:"Box86/Box64 é experimental",children:["A tradução x86→ARM é lenta e nem todo binário roda. Jogos com anti-cheat, DRM moderno (Steam, EGS) ou que dependem de drivers gráficos específicos ",o.jsx("strong",{children:"não vão funcionar"}),". Use só pra binários Linux antigos, simples, sem proteção."]}),o.jsx("h2",{children:"5. Wine via proot-distro (muito experimental)"}),o.jsx(e,{title:"Wine dentro de um Ubuntu/Debian em proot",code:`# Wine NÃO roda nativo no Termux. A única alternativa é
# instalar uma distro Linux via proot-distro e usar Wine + Box64 lá.
# Veja a página dedicada "Wine" para o passo a passo.

pkg install -y proot-distro
proot-distro install debian
proot-distro login debian
# (dentro do Debian) apt install wine box64
# Performance é baixa. Bom só pra programinhas Windows simples, NÃO jogos AAA.`}),o.jsx("h2",{children:"6. Recomendação: apps Android para emulação séria"}),o.jsx(e,{title:"Apps nativos Android (instale via Play Store ou F-Droid)",code:`# Esses NÃO rodam dentro do Termux — são apps Android comuns:

# RetroArch         — multi-emulador (NES, SNES, N64, PS1, GBA, etc.)
# AetherSX2         — PlayStation 2
# DuckStation       — PlayStation 1
# PPSSPP            — PSP
# Dolphin           — GameCube e Wii
# Citra (forks)     — Nintendo 3DS
# Skyline / Egg NS  — Nintendo Switch (status varia)
# Magic DOSBox      — front-end DOSBox para Android
# ScummVM (Android) — adventure games

# Pra controle, qualquer joypad Bluetooth/USB OTG funciona com esses apps.`}),o.jsx(r,{type:"info",title:"Resumindo",children:"Termux é ótimo pra jogar coisinhas em texto (DOSBox, ScummVM, jogos em Python/Lua que você mesmo compila) e pra brincar com Box86/Box64. Pra emulação moderna, controles e performance, use apps Android dedicados."})]})}export{m as default};

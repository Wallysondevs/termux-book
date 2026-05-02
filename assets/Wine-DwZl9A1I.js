import{j as e}from"./index-C2xKMDcs.js";import{P as r}from"./PageContainer-D8Fa3g_u.js";import{C as o}from"./CodeBlock-OPQVSQze.js";import{I as i}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function p(){return e.jsxs(r,{title:"Wine no Termux — Aplicativos Windows no Android",subtitle:"Por que Wine não roda nativo no Termux, e como tentar via proot-distro + Box86/Box64. Experimental, lento e limitado.",difficulty:"avancado",timeToRead:"25 min",children:[e.jsxs(i,{type:"warning",title:"Wine NÃO roda nativo no Termux",children:["Termux é Android (ARM/AArch64) sem root e sem suporte direto a binários x86 do Windows. ",e.jsxs("strong",{children:["Não existe pacote",e.jsx("code",{children:"wine"})," no repositório do Termux"]}),". A única forma razoável de rodar programas Windows é via uma distro Linux instalada com ",e.jsx("code",{children:"proot-distro"})," + ",e.jsx("strong",{children:"Box86/Box64"})," para traduzir x86→ARM. Tudo é ",e.jsx("strong",{children:"experimental, lento"})," e",e.jsx("strong",{children:" não roda jogos AAA, anti-cheat, DRM moderno"})," nem nada que dependa de drivers GPU dedicados. Para Office/Photoshop/jogos modernos, use o PC."]}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Wine"})," (Wine Is Not an Emulator) é uma camada de compatibilidade que traduz chamadas da API Windows para Linux. No Termux puro ele não existe — Termux roda em Android, e Wine precisa de uma userland Linux completa + um tradutor x86 (Box86/Box64) já que a maioria dos .exe é x86."]}),e.jsx("h2",{children:"1. Pré-requisitos"}),e.jsx(o,{title:"Atualizar Termux e instalar utilitários",code:`pkg update && pkg upgrade -y
pkg install -y proot-distro x11-repo
pkg install -y termux-x11-nightly  # pode falhar; instale o app Termux:X11
pkg install -y pulseaudio          # áudio (limitado)

# Dar acesso ao storage compartilhado (pra trocar arquivos)
termux-setup-storage`}),e.jsx("h2",{children:"2. Instalar uma distro Linux via proot-distro"}),e.jsx(o,{title:"Debian dentro do Termux",code:`# Listar distros disponíveis
proot-distro list

# Instalar Debian (Ubuntu também serve)
proot-distro install debian

# Entrar
proot-distro login debian

# Dentro do Debian, atualizar
apt update && apt upgrade -y
apt install -y wget gnupg2 software-properties-common`}),e.jsx("h2",{children:"3. Instalar Box86 e Box64 (dentro do Debian em proot)"}),e.jsx(o,{title:"Tradução x86/x86_64 → ARM",code:`# Box86 (32-bit) e Box64 (64-bit) precisam estar instalados
# DENTRO do proot pra Wine conseguir executar .exe.

# Adicionar repositório do projeto Box86/Box64 (ARM64):
wget https://itai-nelken.github.io/weekly-box86-debs/debian/box86.list   -O /etc/apt/sources.list.d/box86.list
wget -qO- https://itai-nelken.github.io/weekly-box86-debs/debian/KEY.gpg   | apt-key add -

wget https://ryanfortner.github.io/box64-debs/box64.list   -O /etc/apt/sources.list.d/box64.list
wget -qO- https://ryanfortner.github.io/box64-debs/KEY.gpg | apt-key add -

apt update
apt install -y box86 box64

# Testar
box86 -v
box64 -v`}),e.jsx("h2",{children:"4. Instalar Wine (dentro do Debian em proot)"}),e.jsx(o,{title:"Wine x86 rodando via Box86",code:`# Wine para arquitetura i386 — rodará via Box86
dpkg --add-architecture i386
apt update
apt install -y wine winetricks

# Verificar
wine --version

# Inicializar prefixo (cria ~/.wine)
wineboot --init

# Configurar (precisa do Termux:X11 aberto e DISPLAY exportado)
export DISPLAY=:0
winecfg`}),e.jsx("h2",{children:"5. Subir a interface gráfica (Termux:X11)"}),e.jsx(o,{title:"Iniciar X11 e rodar um .exe",code:`# 1. No Termux (FORA do proot), instale o app Termux:X11 (F-Droid)
# 2. Inicie o servidor X:
termux-x11 :0 &

# 3. Abra o app Termux:X11 no Android — janela em branco aparece
# 4. Volte ao Termux, entre no Debian:
proot-distro login debian
export DISPLAY=:0
export PULSE_SERVER=127.0.0.1   # se quiser áudio via PulseAudio do Termux

# 5. Rode o .exe:
wine /root/programa.exe

# Para programas 64-bit, Wine precisa estar em modo win64:
WINEARCH=win64 WINEPREFIX=~/.wine64 wineboot --init
WINEPREFIX=~/.wine64 wine programa64.exe`}),e.jsxs(i,{type:"warning",title:"Espere lentidão e bugs",children:["A pilha aqui é: ",e.jsx("em",{children:"Android → Termux → proot Debian → Box86/64 → Wine → seu programa"}),". Cada camada cobra performance. Programas leves (Notepad++, MSPaint clones, leitores) talvez rodem. Jogos modernos, Photoshop, Office completo: ",e.jsx("strong",{children:"não conta com isso"}),"."]}),e.jsx("h2",{children:"6. Winetricks — instalar componentes Windows"}),e.jsx(o,{title:"Bibliotecas comuns que apps esperam",code:`# Dentro do proot, com Wine já configurado:
winetricks corefonts          # Arial, Times New Roman
winetricks vcrun2019          # Visual C++ 2019 redistributable
winetricks dotnet48           # .NET Framework 4.8 (lento de instalar)
winetricks d3dx9              # DirectX 9 (utilidade limitada sem GPU dedicada)

# Listar tudo que dá pra instalar
winetricks list-all`}),e.jsx("h2",{children:"7. Troubleshooting"}),e.jsx(o,{title:"Problemas comuns",code:`# "wine: command not found"
# Você está no Termux em vez de no Debian via proot.
proot-distro login debian

# "Could not open display"
# Faltou subir o Termux:X11 e/ou exportar DISPLAY=:0
termux-x11 :0 &
export DISPLAY=:0

# Programa fecha imediatamente
# Rode no terminal e leia o erro:
wine programa.exe
# Geralmente faltam libs — instale com winetricks.

# Performance ruim
# É esperado. Box86/64 + Wine no celular nunca vai ser rápido.
# Tente programas mais leves ou versões antigas.

# Sem áudio
# Inicie PulseAudio NO TERMUX (fora do proot) antes de logar:
pulseaudio --start --exit-idle-time=-1 --load="module-native-protocol-tcp   auth-ip-acl=127.0.0.1 auth-anonymous=1"
# Dentro do proot:
export PULSE_SERVER=127.0.0.1`}),e.jsxs(i,{type:"info",title:"Alternativas",children:["Se a meta é só rodar 1 programinha Windows, considere: usar um PC remoto via ",e.jsx("strong",{children:"RDP"}),"/",e.jsx("strong",{children:"VNC"})," direto do app Android, ou rodar a mesma tarefa com um app Android nativo. Wine no Termux é mais um exercício técnico do que uma solução prática."]})]})}export{p as default};

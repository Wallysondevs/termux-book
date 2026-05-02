import{j as a}from"./index-d-w5ROEn.js";import{P as o}from"./PageContainer-t8f2nTRw.js";import{C as e}from"./CodeBlock-D742nO-w.js";import{I as i}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function u(){return a.jsxs(o,{title:"Gaming no Termux",subtitle:"Guia completo para jogar no Termux: Steam, Proton, Lutris, Wine, drivers de GPU, Vulkan, otimizações e emuladores.",difficulty:"iniciante",timeToRead:"30 min",children:[a.jsxs("p",{children:["Jogar no Linux nunca foi tão fácil. Com o ",a.jsx("strong",{children:"Steam + Proton"}),", milhares de jogos Windows rodam nativamente no Termux. O ",a.jsx("strong",{children:"Lutris"})," gerencia jogos de várias plataformas, e os drivers de GPU (NVIDIA e AMD) estão maduros. O Steam Deck popularizou o gaming no Linux e acelerou a compatibilidade."]}),a.jsx("h2",{children:"1. Drivers de GPU"}),a.jsx(e,{title:"Instalar drivers NVIDIA e AMD",code:`# === NVIDIA ===
  # Verificar sua GPU
  lspci | grep -i nvidia

  # Instalar drivers via Termux (recomendado)
  sudo Termux-drivers autoinstall
  # Ou instalar uma versão específica:
  termux-drivers devices    # Listar drivers disponíveis
  pkg install -y nvidia-driver-545

  # Reiniciar
  sudo reboot

  # Verificar se o driver está funcionando
  nvidia-smi
  # Mostra: GPU, driver, temperatura, uso de VRAM, etc.

  # === AMD / Intel (drivers open source) ===
  # AMD e Intel usam drivers Mesa (já incluídos no kernel)
  # Geralmente não precisa instalar nada extra

  # Atualizar Mesa para a versão mais recente
  sudo add-apt-repository ppa:kisak/kisak-mesa
  pkg update
  pkg upgrade

  # Verificar GPU
  glxinfo | grep "OpenGL renderer"

  # === Vulkan (API gráfica moderna — essencial para Proton) ===
  # NVIDIA:
  pkg install -y nvidia-driver-545   # Já inclui Vulkan

  # AMD:
  pkg install -y mesa-vulkan-drivers

  # Intel:
  pkg install -y mesa-vulkan-drivers intel-media-va-driver

  # Verificar suporte a Vulkan
  vulkaninfo | head -20
  # Ou:
  pkg install -y vulkan-tools
  vkcube   # Deve mostrar um cubo girando`}),a.jsx("h2",{children:"2. Steam e Proton"}),a.jsx(e,{title:"Instalar Steam e habilitar Proton",code:`# Instalar o Steam
  pkg install -y steam
  # Ou via .deb do site oficial
  # Ou via Flatpak:
  flatpak install flathub com.valvesoftware.Steam

  # Após instalar e logar na conta Steam:
  # 1. Steam → Configurações → Compatibilidade
  # 2. Marque: "Habilitar Steam Play para todos os títulos"
  # 3. Escolha a versão do Proton (Proton Experimental é recomendado)

  # O Proton permite rodar jogos Windows no Linux
  # Baseado no Wine, com patches extras da Valve

  # Verificar compatibilidade de jogos:
  # Acesse: protondb.com
  # Classificações: Platinum (perfeito), Gold (pequenos ajustes),
  # Silver (funciona com tweaks), Bronze (problemas), Borked (não funciona)

  # Instalar Proton-GE (versão da comunidade, mais compatível)
  # 1. Instalar ProtonUp-Qt
  flatpak install flathub net.davidotek.pupgui2
  # 2. Abrir ProtonUp-Qt
  # 3. Adicionar versão do Proton-GE
  # 4. No Steam, escolher Proton-GE para o jogo

  # Forçar uma versão de Proton para um jogo específico:
  # Steam → Biblioteca → Jogo → Propriedades → Compatibilidade
  # Marque "Forçar" e escolha a versão`}),a.jsx("h2",{children:"3. Lutris — Gerenciador de Jogos"}),a.jsx(e,{title:"Instalar e usar o Lutris",code:`# O Lutris gerencia jogos de várias fontes:
  # Steam, GOG, Epic Games, Battle.net, EA, Ubisoft, emuladores

  # Instalar o Lutris
  pkg install -y lutris

  # Ou via Flatpak
  flatpak install flathub net.lutris.Lutris

  # Instalar dependências de Wine
  sudo dpkg --add-architecture i386
  pkg update
  pkg install -y wine64 wine32 winetricks

  # No Lutris:
  # 1. Pesquise o jogo em lutris.net
  # 2. Clique em "Instalar" — o script faz tudo automaticamente
  # 3. O Lutris configura Wine, DXVK, dependências, etc.

  # Jogos Epic Games via Lutris:
  # 1. Pesquise "Epic Games Store" no Lutris
  # 2. Instale (vai instalar o launcher da Epic via Wine)
  # 3. Faça login e baixe jogos normalmente

  # Jogos GOG via Lutris:
  # 1. Conecte sua conta GOG
  # 2. Jogos aparecem automaticamente
  # 3. Instale com um clique`}),a.jsx("h2",{children:"4. Otimizações de Performance"}),a.jsx(e,{title:"Melhorar performance em jogos",code:`# === GameMode (otimizador da Feral Interactive) ===
  pkg install -y gamemode
  # O GameMode ajusta CPU, GPU e I/O durante jogos
  # No Steam: Opções de Inicialização do jogo:
  # gamemoderun %command%

  # === MangoHud (overlay de FPS/CPU/GPU) ===
  pkg install -y mangohud
  # No Steam: Opções de Inicialização:
  # mangohud %command%
  # Ou: MANGOHUD=1 %command%

  # === Variáveis de ambiente úteis ===
  # No Steam → Propriedades do jogo → Opções de Inicialização:

  # Forçar Vulkan (DXVK) — traduz DirectX para Vulkan
  DXVK_HUD=1 %command%

  # Desabilitar composição (pode melhorar FPS no GNOME)
  # Configurações → Sobre → Tipo de janela → X11
  # X11 é geralmente melhor para jogos que Wayland

  # === Kernel otimizado para jogos ===
  # XanMod ou Liquorix (kernels com patches de baixa latência)
  # XanMod:
  echo 'deb http://deb.xanmod.org releases main' | sudo tee /etc/apt/sources.list.d/xanmod-kernel.list
  wget -qO - https://dl.xanmod.org/gpg.key | pkg add -
  pkg update
  pkg install -y linux-xanmod-x64v3

  # === Limitar FPS (reduz consumo de energia e temperatura) ===
  # MangoHud config (~/.config/MangoHud/MangoHud.conf):
  # fps_limit=60

  # === Verificar performance ===
  # Abrir terminal durante o jogo (Alt+Tab):
  nvidia-smi              # GPU NVIDIA
  radeontop               # GPU AMD
  htop                    # CPU e RAM`}),a.jsx("h2",{children:"5. Emuladores"}),a.jsx(e,{title:"Instalar emuladores de consoles",code:`# RetroArch — emulador universal (vários consoles em um)
  pkg install -y retroarch
  # Ou via Flatpak:
  flatpak install flathub org.libretro.RetroArch
  # Suporta: NES, SNES, N64, PS1, PS2, GameBoy, etc.

  # PCSX2 — PlayStation 2
  flatpak install flathub net.pcsx2.PCSX2

  # Dolphin — GameCube e Wii
  pkg install -y dolphin-emu
  # Ou Flatpak:
  flatpak install flathub org.DolphinEmu.dolphin-emu

  # RPCS3 — PlayStation 3
  flatpak install flathub net.rpcs3.RPCS3

  # Yuzu/Ryujinx — Nintendo Switch
  # (verifique disponibilidade atual)

  # PPSSPP — PSP
  pkg install -y ppsspp

  # DOSBox — DOS (jogos antigos de PC)
  pkg install -y dosbox`}),a.jsx("h2",{children:"Troubleshooting"}),a.jsx(e,{title:"Problemas comuns com jogos no Termux",code:`# Jogo não inicia pelo Steam (Proton)
  # 1. Verificar logs:
  # ~/.local/share/Steam/steamapps/compatdata/APPID/pfx/
  # 2. Tentar outra versão do Proton
  # 3. Verificar no ProtonDB se há dicas

  # Tela preta ao iniciar jogo
  # Solução: Forçar modo janela nas opções de lançamento:
  # gamescope -w 1920 -h 1080 -f -- %command%

  # FPS muito baixo
  # 1. Verificar se o driver da GPU está instalado:
  nvidia-smi    # NVIDIA
  glxinfo | grep "OpenGL renderer"   # AMD/Intel
  # 2. Verificar se Vulkan está funcionando:
  vulkaninfo | head -5
  # 3. Habilitar GameMode

  # Controle/gamepad não funciona
  # Verificar se é detectado:
  ls /dev/input/js*
  # Instalar suporte:
  pkg install -y joystick jstest-gtk
  jstest /dev/input/js0

  # Anti-cheat não funciona (EAC, BattlEye)
  # Alguns jogos com anti-cheat não funcionam no Linux
  # Verificar: areweanticheatyet.com

  # Som não funciona no jogo
  # Instalar PulseAudio 32-bit:
  pkg install -y libpulse0:i386`}),a.jsxs(i,{type:"info",title:"O futuro do gaming no Linux",children:["O Steam Deck (que roda Linux) fez a Valve investir pesado no Proton. A cada atualização, mais jogos Windows funcionam no Linux. O site",a.jsx("strong",{children:" protondb.com"})," é a melhor referência para verificar compatibilidade."]})]})}export{u as default};

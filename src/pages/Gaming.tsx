import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Gaming() {
    return (
      <PageContainer
        title="Gaming no Ubuntu"
        subtitle="Guia completo para jogar no Ubuntu: Steam, Proton, Lutris, Wine, drivers de GPU, Vulkan, otimizações e emuladores."
        difficulty="iniciante"
        timeToRead="30 min"
      >
        <p>
          Jogar no Linux nunca foi tão fácil. Com o <strong>Steam + Proton</strong>, milhares
          de jogos Windows rodam nativamente no Ubuntu. O <strong>Lutris</strong> gerencia
          jogos de várias plataformas, e os drivers de GPU (NVIDIA e AMD) estão maduros.
          O Steam Deck popularizou o gaming no Linux e acelerou a compatibilidade.
        </p>

        <h2>1. Drivers de GPU</h2>
        <CodeBlock
          title="Instalar drivers NVIDIA e AMD"
          code={`# === NVIDIA ===
  # Verificar sua GPU
  lspci | grep -i nvidia

  # Instalar drivers via Ubuntu (recomendado)
  sudo ubuntu-drivers autoinstall
  # Ou instalar uma versão específica:
  ubuntu-drivers devices    # Listar drivers disponíveis
  sudo apt install -y nvidia-driver-545

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
  sudo apt update
  sudo apt upgrade

  # Verificar GPU
  glxinfo | grep "OpenGL renderer"

  # === Vulkan (API gráfica moderna — essencial para Proton) ===
  # NVIDIA:
  sudo apt install -y nvidia-driver-545   # Já inclui Vulkan

  # AMD:
  sudo apt install -y mesa-vulkan-drivers

  # Intel:
  sudo apt install -y mesa-vulkan-drivers intel-media-va-driver

  # Verificar suporte a Vulkan
  vulkaninfo | head -20
  # Ou:
  sudo apt install -y vulkan-tools
  vkcube   # Deve mostrar um cubo girando`}
        />

        <h2>2. Steam e Proton</h2>
        <CodeBlock
          title="Instalar Steam e habilitar Proton"
          code={`# Instalar o Steam
  sudo apt install -y steam
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
  # Marque "Forçar" e escolha a versão`}
        />

        <h2>3. Lutris — Gerenciador de Jogos</h2>
        <CodeBlock
          title="Instalar e usar o Lutris"
          code={`# O Lutris gerencia jogos de várias fontes:
  # Steam, GOG, Epic Games, Battle.net, EA, Ubisoft, emuladores

  # Instalar o Lutris
  sudo apt install -y lutris

  # Ou via Flatpak
  flatpak install flathub net.lutris.Lutris

  # Instalar dependências de Wine
  sudo dpkg --add-architecture i386
  sudo apt update
  sudo apt install -y wine64 wine32 winetricks

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
  # 3. Instale com um clique`}
        />

        <h2>4. Otimizações de Performance</h2>
        <CodeBlock
          title="Melhorar performance em jogos"
          code={`# === GameMode (otimizador da Feral Interactive) ===
  sudo apt install -y gamemode
  # O GameMode ajusta CPU, GPU e I/O durante jogos
  # No Steam: Opções de Inicialização do jogo:
  # gamemoderun %command%

  # === MangoHud (overlay de FPS/CPU/GPU) ===
  sudo apt install -y mangohud
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
  wget -qO - https://dl.xanmod.org/gpg.key | sudo apt-key add -
  sudo apt update
  sudo apt install -y linux-xanmod-x64v3

  # === Limitar FPS (reduz consumo de energia e temperatura) ===
  # MangoHud config (~/.config/MangoHud/MangoHud.conf):
  # fps_limit=60

  # === Verificar performance ===
  # Abrir terminal durante o jogo (Alt+Tab):
  nvidia-smi              # GPU NVIDIA
  radeontop               # GPU AMD
  htop                    # CPU e RAM`}
        />

        <h2>5. Emuladores</h2>
        <CodeBlock
          title="Instalar emuladores de consoles"
          code={`# RetroArch — emulador universal (vários consoles em um)
  sudo apt install -y retroarch
  # Ou via Flatpak:
  flatpak install flathub org.libretro.RetroArch
  # Suporta: NES, SNES, N64, PS1, PS2, GameBoy, etc.

  # PCSX2 — PlayStation 2
  flatpak install flathub net.pcsx2.PCSX2

  # Dolphin — GameCube e Wii
  sudo apt install -y dolphin-emu
  # Ou Flatpak:
  flatpak install flathub org.DolphinEmu.dolphin-emu

  # RPCS3 — PlayStation 3
  flatpak install flathub net.rpcs3.RPCS3

  # Yuzu/Ryujinx — Nintendo Switch
  # (verifique disponibilidade atual)

  # PPSSPP — PSP
  sudo apt install -y ppsspp

  # DOSBox — DOS (jogos antigos de PC)
  sudo apt install -y dosbox`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com jogos no Ubuntu"
          code={`# Jogo não inicia pelo Steam (Proton)
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
  sudo apt install -y joystick jstest-gtk
  jstest /dev/input/js0

  # Anti-cheat não funciona (EAC, BattlEye)
  # Alguns jogos com anti-cheat não funcionam no Linux
  # Verificar: areweanticheatyet.com

  # Som não funciona no jogo
  # Instalar PulseAudio 32-bit:
  sudo apt install -y libpulse0:i386`}
        />

        <AlertBox type="info" title="O futuro do gaming no Linux">
          O Steam Deck (que roda Linux) fez a Valve investir pesado no Proton. A cada
          atualização, mais jogos Windows funcionam no Linux. O site
          <strong> protondb.com</strong> é a melhor referência para verificar compatibilidade.
        </AlertBox>
      </PageContainer>
    );
  }
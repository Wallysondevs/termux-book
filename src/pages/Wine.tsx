import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Wine() {
    return (
      <PageContainer
        title="Wine — Executar Aplicativos Windows no Ubuntu"
        subtitle="Guia completo do Wine, Winetricks, Bottles e Proton para rodar programas e jogos Windows nativamente no Ubuntu sem virtualização."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <p>
          O <strong>Wine</strong> (Wine Is Not an Emulator) é uma camada de compatibilidade que
          permite executar aplicativos Windows no Linux sem emulação. Diferente de uma máquina
          virtual, o Wine traduz as chamadas da API do Windows para Linux em tempo real,
          o que significa performance quase nativa.
        </p>

        <h2>Wine vs Máquina Virtual — Quando Usar Cada Um</h2>
        <ul>
          <li><strong>Wine</strong> — Ideal para aplicativos simples, jogos (via Proton/Lutris), programas de escritório. Performance nativa, sem overhead. Nem todo software funciona.</li>
          <li><strong>VM (VirtualBox/KVM)</strong> — Ideal quando você precisa de 100% de compatibilidade, como software empresarial complexo ou drivers de hardware Windows. Mais lento, consome mais recursos.</li>
          <li><strong>Bottles/Lutris</strong> — Frontends gráficos para o Wine com prefixos isolados. Facilitam a configuração e compatibilidade.</li>
          <li><strong>Proton</strong> — Versão do Wine otimizada pela Valve para jogos no Steam. Funciona automaticamente no Steam para Linux.</li>
        </ul>

        <h2>1. Instalar o Wine</h2>
        <CodeBlock
          title="Instalação do Wine no Ubuntu"
          code={`# Habilitar arquitetura 32-bit (necessário para muitos programas Windows)
  sudo dpkg --add-architecture i386

  # Adicionar a chave GPG do repositório oficial do Wine
  sudo mkdir -pm755 /etc/apt/keyrings
  sudo wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key

  # Adicionar o repositório (Ubuntu 24.04 Noble)
  sudo wget -NP /etc/apt/sources.list.d/ \
    https://dl.winehq.org/wine-builds/ubuntu/dists/noble/winehq-noble.sources

  # Atualizar e instalar
  sudo apt update

  # Escolha UMA das versões:
  sudo apt install -y --install-recommends winehq-stable    # Estável (recomendado)
  sudo apt install -y --install-recommends winehq-staging   # Com patches extras (gaming)
  sudo apt install -y --install-recommends winehq-devel     # Desenvolvimento (mais recente)

  # Verificar a instalação
  wine --version
  # Saída: wine-9.0

  # Configurar o Wine pela primeira vez
  winecfg
  # Abre uma janela gráfica para configurar:
  # - Versão do Windows simulada (Windows 10 recomendado)
  # - Resolução de tela, áudio, drives virtuais
  # Isso cria o prefixo padrão em ~/.wine/`}
        />

        <AlertBox type="info" title="Prefixo do Wine (~/.wine)">
          O Wine cria uma estrutura de diretórios que simula a instalação do Windows
          em <code>~/.wine</code>. Dentro dela você encontra <code>drive_c/</code>
          (equivalente ao C:\\), o registro do Windows e configurações. Cada prefixo
          é independente — você pode ter vários para diferentes programas.
        </AlertBox>

        <h2>2. Executar Programas Windows</h2>
        <CodeBlock
          title="Usar o Wine para rodar .exe"
          code={`# Executar um programa Windows
  wine programa.exe

  # Executar com um prefixo específico (isolado)
  WINEPREFIX=~/wine-office wine setup.exe

  # Executar em modo 32-bit (necessário para alguns programas antigos)
  WINEARCH=win32 WINEPREFIX=~/wine32 wine programa.exe

  # Executar o Bloco de Notas do Windows (incluso no Wine)
  wine notepad

  # Executar o explorador de arquivos
  wine explorer

  # Executar o prompt de comando do Windows
  wine cmd

  # Executar o regedit (editor de registro do Windows)
  wine regedit

  # Abrir o painel de controle
  wine control

  # Desinstalar programas (abre o desinstalador do Windows)
  wine uninstaller

  # Executar com debug para identificar problemas
  WINEDEBUG=+all wine programa.exe 2> debug.log`}
        />

        <h2>3. Winetricks — Instalar Componentes Windows</h2>
        <p>
          O <strong>Winetricks</strong> facilita a instalação de bibliotecas e componentes
          que muitos programas Windows precisam para funcionar (DirectX, .NET, Visual C++, fontes, etc.).
        </p>
        <CodeBlock
          title="Instalar e usar o Winetricks"
          code={`# Instalar o Winetricks
  sudo apt install -y winetricks

  # Abrir a interface gráfica do Winetricks
  winetricks

  # Instalar componentes via terminal:

  # Runtime do .NET Framework
  winetricks dotnet48          # .NET Framework 4.8
  winetricks dotnet40          # .NET Framework 4.0

  # Visual C++ Redistributables (necessário para muitos programas)
  winetricks vcrun2019         # Visual C++ 2019
  winetricks vcrun2015         # Visual C++ 2015
  winetricks vcrun2010         # Visual C++ 2010

  # DirectX (necessário para jogos)
  winetricks d3dx9             # DirectX 9 (jogos antigos)
  winetricks dxvk              # Vulkan-based DirectX 9/10/11 (performance melhor)

  # Fontes Windows (melhora a aparência dos programas)
  winetricks corefonts         # Arial, Times New Roman, Courier, etc.
  winetricks allfonts          # Todas as fontes disponíveis

  # Bibliotecas comuns
  winetricks mfc42             # Microsoft Foundation Classes
  winetricks msxml6            # XML parser da Microsoft
  winetricks riched20          # Rich text editor component

  # Configurações do Windows
  winetricks win10             # Simular Windows 10
  winetricks win7              # Simular Windows 7

  # Instalar em um prefixo específico
  WINEPREFIX=~/wine-office winetricks dotnet48 corefonts`}
        />

        <h2>4. Bottles — Wine Simplificado</h2>
        <CodeBlock
          title="Instalar e usar o Bottles"
          code={`# Instalar o Bottles via Flatpak (forma recomendada)
  sudo apt install -y flatpak
  flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
  flatpak install flathub com.usebottles.bottles

  # Executar o Bottles
  flatpak run com.usebottles.bottles

  # O Bottles oferece:
  # - Prefixos isolados (cada programa em seu "bottle")
  # - Instalação automática de dependências
  # - Diferentes runners (Wine, Proton, Wine-GE)
  # - Snapshots para backup antes de mudanças
  # - Templates pré-configurados para software e gaming

  # Criar um Bottle via GUI:
  # 1. Abra o Bottles
  # 2. Clique em "Create new bottle"
  # 3. Escolha o tipo: Gaming, Application, ou Custom
  # 4. Escolha o runner (Wine 9.x, Proton, etc.)
  # 5. Instale seu programa .exe dentro do bottle`}
        />

        <h2>5. Lutris — Plataforma de Gaming</h2>
        <CodeBlock
          title="Instalar e usar o Lutris"
          code={`# Adicionar o repositório do Lutris
  sudo add-apt-repository ppa:lutris-team/lutris
  sudo apt update
  sudo apt install -y lutris

  # O Lutris é uma plataforma de gaming que integra:
  # - Wine/Proton (jogos Windows)
  # - Steam
  # - GOG
  # - Epic Games Store
  # - Emuladores (RetroArch, Dolphin, PCSX2, etc.)

  # Principais vantagens:
  # - Scripts de instalação da comunidade (lutris.net)
  # - Cada jogo em um prefixo Wine isolado
  # - Configuração automática de DXVK, VKD3D, etc.
  # - Gerenciamento de diferentes versões do Wine

  # Fluxo para instalar um jogo:
  # 1. Acesse lutris.net e busque o jogo
  # 2. Clique em "Install" — abre o Lutris automaticamente
  # 3. O script configura tudo (Wine, dependências, patches)
  # 4. Jogue!`}
        />

        <h2>6. Proton e Steam Play</h2>
        <CodeBlock
          title="Configurar Proton no Steam"
          code={`# Instalar o Steam
  sudo apt install -y steam

  # Habilitar o Steam Play (Proton) para todos os jogos:
  # 1. Abra o Steam
  # 2. Vá em Steam → Settings → Compatibility
  # 3. Marque "Enable Steam Play for all other titles"
  # 4. Escolha a versão do Proton (Proton Experimental é recomendado)

  # Instalar o ProtonGE (versão melhorada pela comunidade)
  # 1. Instale o ProtonUp-Qt
  flatpak install flathub net.davidotek.pupgui2

  # 2. Abra o ProtonUp-Qt e instale a versão desejada do GE-Proton

  # Verificar compatibilidade de jogos:
  # Acesse https://www.protondb.com/ para ver relatórios da comunidade
  # Classificações: Platinum (perfeito), Gold (funciona bem), Silver, Bronze, Borked

  # Forçar uma versão do Proton para um jogo específico:
  # 1. Clique com botão direito no jogo → Properties
  # 2. Aba "Compatibility"
  # 3. Marque "Force the use of a specific Steam Play compatibility tool"
  # 4. Escolha a versão do Proton

  # Variáveis de ambiente úteis para jogos via Proton:
  # PROTON_USE_WINED3D=1     ← usar OpenGL ao invés de DXVK
  # DXVK_HUD=fps             ← mostrar FPS na tela
  # PROTON_LOG=1              ← habilitar logs para debug
  # PROTON_NO_ESYNC=1         ← desabilitar esync (resolve alguns travamentos)`}
        />

        <h2>7. DXVK e VKD3D — DirectX via Vulkan</h2>
        <CodeBlock
          title="Configurar DXVK e VKD3D"
          code={`# DXVK traduz DirectX 9/10/11 para Vulkan (muito mais rápido que o wined3d)
  # VKD3D traduz DirectX 12 para Vulkan

  # Instalar drivers Vulkan (ESSENCIAL para performance)
  # Para GPUs NVIDIA:
  sudo apt install -y nvidia-driver-545 libvulkan1
  # Para GPUs AMD:
  sudo apt install -y mesa-vulkan-drivers libvulkan1
  # Para GPUs Intel:
  sudo apt install -y mesa-vulkan-drivers intel-media-va-driver libvulkan1

  # Verificar se o Vulkan está funcionando
  vulkaninfo | head -20
  # Deve mostrar informações da GPU

  # Instalar o DXVK manualmente (geralmente o Lutris/Proton já inclui)
  winetricks dxvk

  # Verificar que o DXVK está ativo em um jogo
  # Adicione a variável: DXVK_HUD=fps
  # Você verá um overlay com FPS no canto da tela

  # Monitorar performance com MangoHud
  sudo apt install -y mangohud
  # Executar um jogo com MangoHud:
  mangohud wine jogo.exe
  # Ou via Steam: adicione "mangohud %command%" nos launch options`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com Wine"
          code={`# Erro: "wine: could not load kernel32.dll"
  # Solução: Recriar o prefixo
  rm -rf ~/.wine
  winecfg   # Recria o prefixo

  # Programa não abre ou fecha imediatamente
  # 1. Testar no terminal para ver os erros:
  wine programa.exe
  # 2. Instalar dependências faltantes:
  winetricks vcrun2019 dotnet48

  # Fontes aparecem como quadrados
  winetricks corefonts allfonts

  # Áudio não funciona
  # Instalar bibliotecas de áudio
  sudo apt install -y wine32:i386 libasound2-plugins:i386
  winetricks sound=alsa    # ou sound=pulse

  # Performance ruim em jogos
  # 1. Verificar se DXVK está ativo (não wined3d)
  # 2. Verificar drivers Vulkan: vulkaninfo
  # 3. Usar gamemode: sudo apt install -y gamemode
  # 4. Executar com: gamemoderun wine jogo.exe

  # Programa precisa de versão específica do Windows
  # Mudar a versão no prefixo:
  winecfg   # Aba Applications → Windows Version → Windows 10

  # Limpar um prefixo e começar do zero
  WINEPREFIX=~/wine-app wineboot --init

  # Verificar o log de debug
  WINEDEBUG=warn+all wine programa.exe 2>&1 | tee wine-debug.log
  # Procure linhas com "err:" para identificar o problema`}
        />

        <AlertBox type="info" title="Compatibilidade">
          Nem todo software Windows funciona no Wine. Antes de tentar, consulte o banco de
          dados de compatibilidade em <strong>appdb.winehq.org</strong> para ver se o programa
          foi testado e qual a classificação (Platinum, Gold, Silver, Bronze, Garbage).
          Para jogos, use <strong>protondb.com</strong>.
        </AlertBox>
      </PageContainer>
    );
  }
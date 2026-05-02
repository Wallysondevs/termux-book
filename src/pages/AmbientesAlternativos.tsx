import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function AmbientesAlternativos() {
    return (
      <PageContainer
        title="Ambientes Desktop Alternativos"
        subtitle="KDE Plasma, XFCE, MATE, Cinnamon, LXQt, Budgie e i3wm — como instalar, configurar e alternar entre diferentes interfaces gráficas no Ubuntu."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <p>
          O Ubuntu vem com o <strong>GNOME</strong> por padrão, mas existem dezenas de ambientes
          desktop alternativos. Cada um tem uma filosofia diferente: alguns priorizam leveza e
          velocidade, outros oferecem personalização extrema, e alguns tentam replicar a experiência
          do Windows ou macOS para facilitar a transição.
        </p>

        <h2>Comparação dos Ambientes Desktop</h2>
        <p>
          Antes de escolher, considere o que é mais importante para você:
        </p>
        <ul>
          <li><strong>KDE Plasma</strong> — O mais personalizável. Visual moderno, rico em recursos. Uso de RAM: ~400-600MB. Perfeito para quem quer controle total sobre cada detalhe.</li>
          <li><strong>XFCE</strong> — Leve e estável. Visual clássico e funcional. Uso de RAM: ~300-400MB. Ideal para PCs antigos ou quem quer simplicidade.</li>
          <li><strong>MATE</strong> — Continuação do GNOME 2. Familiar para quem usava Ubuntu antigo. Uso de RAM: ~350-450MB.</li>
          <li><strong>Cinnamon</strong> — Desenvolvido pelo Linux Mint. Visual parecido com Windows. Uso de RAM: ~400-500MB. Boa transição do Windows.</li>
          <li><strong>LXQt</strong> — O mais leve dos ambientes completos. Uso de RAM: ~200-300MB. Para hardware muito limitado.</li>
          <li><strong>Budgie</strong> — Elegante e simples. Desenvolvido pelo Solus. Uso de RAM: ~400-500MB.</li>
          <li><strong>i3wm/Sway</strong> — Tiling window manager. Sem mouse, tudo por teclado. Para usuários avançados.</li>
        </ul>

        <AlertBox type="warning" title="Cuidado ao instalar múltiplos DEs">
          Instalar vários ambientes desktop pode causar conflitos visuais (temas, ícones, 
          configurações). Se quiser testar sem comprometer o sistema, considere usar as 
          variantes oficiais do Ubuntu (Kubuntu, Xubuntu, etc.) em uma máquina virtual primeiro.
        </AlertBox>

        <h2>1. KDE Plasma</h2>
        <CodeBlock
          title="Instalar o KDE Plasma no Ubuntu"
          code={`# Instalar o KDE Plasma completo (recomendado)
  sudo apt install -y kde-plasma-desktop

  # Ou instalar o Kubuntu completo (inclui todos os apps KDE)
  sudo apt install -y kubuntu-desktop
  # Vai perguntar qual display manager usar: escolha SDDM para KDE

  # Instalar apenas apps KDE essenciais (sem o ambiente completo)
  sudo apt install -y dolphin konsole kate spectacle okular

  # Configurar SDDM como display manager padrão
  sudo dpkg-reconfigure sddm

  # Reiniciar para aplicar
  sudo reboot

  # Na tela de login, clique no ícone de sessão e escolha "Plasma (Wayland)" ou "Plasma (X11)"

  # === PERSONALIZAÇÃO DO KDE ===
  # O KDE é extremamente personalizável:
  # - Configurações do Sistema → Aparência → Temas Globais
  # - Clique em "Obter Novos Temas" para baixar da comunidade
  # - Widgets: clique direito no desktop → "Adicionar Widgets"
  # - KDE Store: store.kde.org (milhares de temas, ícones, widgets)

  # Instalar temas via terminal
  # Exemplo: tema Layan
  git clone https://github.com/vinceliuice/Layan-kde.git
  cd Layan-kde && ./install.sh

  # Remover o KDE completamente (se quiser voltar só ao GNOME)
  sudo apt purge -y kde-plasma-desktop kubuntu-desktop
  sudo apt autoremove -y`}
        />

        <h2>2. XFCE</h2>
        <CodeBlock
          title="Instalar o XFCE no Ubuntu"
          code={`# Instalar o XFCE (ambiente leve)
  sudo apt install -y xfce4 xfce4-goodies

  # Ou instalar o Xubuntu completo
  sudo apt install -y xubuntu-desktop

  # xfce4-goodies inclui:
  # - xfce4-terminal (terminal)
  # - thunar (gerenciador de arquivos)  
  # - mousepad (editor de texto)
  # - xfce4-screenshooter (captura de tela)
  # - Plugins extras para o painel

  # Personalização do XFCE:
  # - Menu → Configurações → Aparência (temas GTK)
  # - Menu → Configurações → Gerenciador de Janelas (temas de janela)
  # - Menu → Configurações → Painel (adicionar/remover painéis e plugins)

  # Instalar temas para XFCE
  sudo apt install -y arc-theme papirus-icon-theme
  # Depois aplique em Configurações → Aparência

  # O XFCE é excelente para:
  # - PCs com 2GB de RAM ou menos
  # - Netbooks e laptops antigos
  # - Servidores com acesso remoto via VNC/RDP
  # - Quem quer um desktop funcional sem "firulas"`}
        />

        <h2>3. MATE</h2>
        <CodeBlock
          title="Instalar o MATE no Ubuntu"
          code={`# Instalar o MATE
  sudo apt install -y ubuntu-mate-desktop

  # O MATE é a continuação do GNOME 2 — o desktop clássico do Ubuntu
  # Se você usou Ubuntu antes de 2011, vai se sentir em casa

  # Características do MATE:
  # - Painel superior com menu, relógio e bandeja
  # - Painel inferior com lista de janelas
  # - Gerenciador de arquivos Caja
  # - Editor de texto Pluma
  # - Terminal MATE

  # Personalizar:
  # - Sistema → Preferências → Aparência
  # - Clique direito no painel → Adicionar ao Painel
  # - Sistema → Preferências → MATE Tweak (configurações avançadas)

  # Instalar o MATE Tweak para mais opções
  sudo apt install -y mate-tweak
  # Permite mudar o layout do painel para imitar:
  # - Ubuntu tradicional
  # - Windows (barra de tarefas embaixo)
  # - macOS (dock embaixo)`}
        />

        <h2>4. Cinnamon</h2>
        <CodeBlock
          title="Instalar o Cinnamon no Ubuntu"
          code={`# Instalar o Cinnamon (desenvolvido pelo Linux Mint)
  sudo apt install -y cinnamon-desktop-environment

  # O Cinnamon é ideal para quem vem do Windows:
  # - Menu iniciar no canto inferior esquerdo
  # - Barra de tarefas com ícones fixados
  # - Bandeja do sistema com relógio
  # - Área de trabalho com ícones

  # Personalização:
  # - Configurações do Sistema → Temas
  # - Baixar temas, ícones e extensões: cinnamon-spices.linuxmint.com
  # - Applets: clique direito no painel → "Adicionar applets ao painel"
  # - Desklets: widgets na área de trabalho

  # Instalar temas e extensões via terminal
  # O gerenciador de temas do Cinnamon permite baixar diretamente da interface

  # Atalhos úteis do Cinnamon:
  # Super (Windows) → abre o menu
  # Ctrl+Alt+Seta    → mover para outra área de trabalho
  # Super+D           → mostrar desktop
  # Alt+F2            → executar comando`}
        />

        <h2>5. LXQt</h2>
        <CodeBlock
          title="Instalar o LXQt no Ubuntu"
          code={`# Instalar o LXQt (o mais leve)
  sudo apt install -y lxqt

  # Ou instalar o Lubuntu completo
  sudo apt install -y lubuntu-desktop

  # O LXQt é a fusão do LXDE com Razor-qt
  # Uso de RAM: ~200MB — o menor de todos
  # Ideal para:
  # - Hardware muito antigo (1-2GB RAM)
  # - Raspberry Pi e SBCs
  # - Máquinas virtuais com poucos recursos
  # - Quem quer máxima performance

  # Aplicativos padrão do LXQt:
  # - PCManFM-Qt (gerenciador de arquivos)
  # - QTerminal (terminal)
  # - FeatherPad (editor de texto)

  # Personalizar:
  # - Preferências → Aparência do LXQt
  # - Preferências → Configurações do Openbox (gerenciador de janelas)
  # - Clique direito no painel → Configurar Painel`}
        />

        <h2>6. Budgie</h2>
        <CodeBlock
          title="Instalar o Budgie no Ubuntu"
          code={`# Instalar o Budgie
  sudo apt install -y ubuntu-budgie-desktop

  # O Budgie foi criado pelo projeto Solus
  # Visual limpo e elegante, com painel lateral (Raven)

  # Características:
  # - Raven: painel lateral com notificações, calendário e configurações rápidas
  # - Barra superior com menu, relógio e bandeja
  # - Visual moderno sem ser pesado
  # - Boa integração com GNOME apps

  # Abrir o Raven: Super + N ou clique no ícone no painel
  # Personalizar: Configurações do Budgie Desktop`}
        />

        <h2>7. i3wm — Tiling Window Manager</h2>
        <CodeBlock
          title="Instalar e configurar o i3wm"
          code={`# Instalar o i3 (window manager minimalista com tiling)
  sudo apt install -y i3 i3status dmenu i3lock

  # O i3 NÃO é um ambiente desktop completo — é um window manager
  # Tudo é controlado por teclado, janelas são organizadas automaticamente

  # Na tela de login, escolha a sessão "i3"
  # Na primeira execução, pressione Enter para gerar a config padrão
  # Escolha a tecla Mod (Super/Windows é recomendado)

  # Atalhos essenciais do i3:
  # Mod+Enter        → abrir terminal
  # Mod+d            → abrir dmenu (lançador de apps)
  # Mod+Shift+q      → fechar janela
  # Mod+1-9          → alternar workspace
  # Mod+Shift+1-9    → mover janela para workspace
  # Mod+h/v          → dividir horizontalmente/verticalmente
  # Mod+f            → fullscreen
  # Mod+Shift+Space  → alternar entre tiling e floating
  # Mod+Shift+e      → sair do i3
  # Mod+Shift+r      → recarregar configuração
  # Mod+Shift+c      → reiniciar i3 in-place

  # Editar a configuração do i3
  nano ~/.config/i3/config

  # Adicionar programas ao autostart:
  # exec --no-startup-id nm-applet          # ícone de rede
  # exec --no-startup-id picom              # compositor (transparência)
  # exec --no-startup-id feh --bg-scale ~/wallpaper.jpg  # papel de parede
  # exec --no-startup-id dunst              # notificações

  # Instalar complementos essenciais para o i3
  sudo apt install -y picom feh dunst rofi polybar nitrogen
  # picom = compositor (sombras, transparência)
  # feh = papel de parede
  # dunst = notificações
  # rofi = lançador de apps (alternativa moderna ao dmenu)
  # polybar = barra de status customizável
  # nitrogen = gerenciador de papel de parede gráfico

  # Usar rofi no lugar do dmenu (mais bonito e funcional)
  # Na config do i3, troque:
  # bindsym Mod4+d exec rofi -show drun -show-icons`}
        />

        <AlertBox type="info" title="Alternativa moderna: Sway">
          O <strong>Sway</strong> é um substituto do i3 para Wayland. Se seu sistema usa 
          Wayland (Ubuntu 22.04+ padrão), considere o Sway: <code>sudo apt install sway</code>.
          A configuração é quase idêntica ao i3.
        </AlertBox>

        <h2>Alternar Entre Ambientes Desktop</h2>
        <CodeBlock
          title="Gerenciar múltiplos ambientes"
          code={`# Na tela de login (GDM, SDDM ou LightDM), há um seletor de sessão
  # Geralmente é um ícone de engrenagem ou dropdown

  # Ver quais sessões estão disponíveis
  ls /usr/share/xsessions/
  # Saída: gnome.desktop  plasma.desktop  xfce.desktop  i3.desktop  ...

  # Mudar o display manager padrão
  sudo dpkg-reconfigure gdm3        # GNOME (GDM)
  sudo dpkg-reconfigure sddm        # KDE (SDDM)
  sudo dpkg-reconfigure lightdm     # XFCE/MATE (LightDM)

  # Definir sessão padrão para um usuário
  sudo nano /var/lib/AccountsService/users/seu_usuario
  # Mude a linha: XSession=gnome  →  XSession=plasma

  # Verificar qual sessão está ativa
  echo $XDG_SESSION_DESKTOP
  echo $DESKTOP_SESSION`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com ambientes desktop"
          code={`# Tela preta após instalar novo ambiente
  # Solução: Acessar o TTY e reinstalar o display manager
  # Ctrl+Alt+F3 (abre terminal texto)
  sudo apt install --reinstall gdm3
  sudo systemctl restart gdm3

  # Ícones e temas misturados entre ambientes
  # Solução: Configurar o tema correto nas configurações de cada ambiente
  # Ou usar um tema universal como Arc ou Adwaita

  # Login loop (digita senha e volta para a tela de login)
  # Solução 1: Verificar permissões do .Xauthority
  ls -la ~/.Xauthority
  sudo chown seu_usuario:seu_usuario ~/.Xauthority

  # Solução 2: Verificar se o disco está cheio
  df -h /home

  # Solução 3: Renomear configs do ambiente problemático
  # Ctrl+Alt+F3 para acessar o TTY
  mv ~/.config/plasma-org.kde.plasma.desktop-appletsrc \
     ~/.config/plasma-org.kde.plasma.desktop-appletsrc.bak

  # Remover um ambiente desktop completamente
  sudo apt purge -y kubuntu-desktop kde-plasma-desktop
  sudo apt autoremove -y
  # Reiniciar após remover`}
        />
      </PageContainer>
    );
  }
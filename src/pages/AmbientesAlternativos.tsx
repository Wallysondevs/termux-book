import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AmbientesAlternativos() {
  return (
    <PageContainer
      title="Ambientes Gráficos Alternativos no Termux"
      subtitle="XFCE4, LXQt, i3wm, openbox e fvwm — o que realmente roda via Termux:X11 no Android."
      difficulty="intermediario"
      timeToRead="15 min"
    >
      <AlertBox type="danger" title="KDE Plasma, GNOME, MATE e Cinnamon NÃO rodam no Termux">
        Esses ambientes dependem de <strong>systemd</strong>, <strong>Wayland nativo</strong>,
        <strong> PolicyKit</strong>, <strong>NetworkManager</strong> e drivers de GPU que
        <strong> não existem no Android</strong>. Mesmo que algum pacote pareça instalável via
        <code> proot-distro</code>, a experiência fica inutilizável (lenta, travando, consumindo
        toda a bateria). <strong>Não tente instalar.</strong> Use as alternativas leves abaixo.
      </AlertBox>

      <p>
        No Termux a interface gráfica vive dentro do app companion <strong>Termux:X11</strong>
        (baixe o APK em <code>github.com/termux/termux-x11/releases</code>). Como o servidor X
        está numa janela Android, o que importa é escolher um <em>desktop leve</em> que renderize
        bem nesse contexto. As opções viáveis são:
      </p>

      <ul>
        <li><strong>XFCE4</strong> — recomendado. Único DE "completo" leve o suficiente.</li>
        <li><strong>LXQt</strong> — funciona parcialmente; alguns componentes Qt podem falhar.</li>
        <li><strong>i3wm</strong> — tiling WM, ultra leve, controlado por teclado.</li>
        <li><strong>openbox</strong> — WM minimalista flutuante.</li>
        <li><strong>fvwm</strong> — WM clássico configurável, pesado em config mas leve em RAM.</li>
      </ul>

      <h2>Pré-requisitos</h2>
      <CodeBlock
        title="Base comum a todos os ambientes"
        code={`pkg update -y && pkg upgrade -y
pkg install -y x11-repo
pkg install -y termux-x11-nightly xorg-server`}
      />

      <AlertBox type="info" title="Como iniciar qualquer um deles">
        O fluxo é sempre o mesmo: rode <code>termux-x11 :0 &amp;</code>, abra o app
        Termux:X11, depois <code>export DISPLAY=:0</code> e finalmente o comando que inicia o
        ambiente (ex: <code>startxfce4</code>, <code>i3</code>, <code>openbox-session</code>).
      </AlertBox>

      <h2>1. XFCE4 (recomendado)</h2>
      <CodeBlock
        title="Instalar e iniciar XFCE4"
        code={`pkg install -y xfce4 xfce4-terminal thunar mousepad

# Iniciar
termux-x11 :0 &
# (abra o app Termux:X11 agora)
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
dbus-launch --exit-with-session startxfce4 &`}
      />
      <p>
        Bom equilíbrio entre recursos e leveza: tem painel, gerenciador de arquivos, menu de apps
        e configuração visual. É o que mais "parece um desktop" sem matar a bateria.
      </p>

      <h2>2. LXQt (parcial)</h2>
      <AlertBox type="warning" title="Limitações do LXQt no Termux">
        Algumas peças (lxqt-policykit, lxqt-powermanagement) <strong>não funcionam</strong>
        porque dependem de PolicyKit/UPower do Android. O resto roda, mas espere bugs visuais.
      </AlertBox>
      <CodeBlock
        title="Instalar e iniciar LXQt"
        code={`pkg install -y lxqt openbox

termux-x11 :0 &
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
dbus-launch --exit-with-session startlxqt &`}
      />

      <h2>3. i3wm — tiling window manager</h2>
      <p>
        Se você curte teclado e organização automática de janelas, é a opção mais responsiva.
        Não é um DE: é só o gerenciador de janelas + barra de status.
      </p>
      <CodeBlock
        title="Instalar e iniciar i3"
        code={`pkg install -y i3 i3status dmenu

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
nano ~/.config/i3/config`}
      />

      <h2>4. Openbox — minimalista</h2>
      <CodeBlock
        title="Instalar e iniciar Openbox"
        code={`pkg install -y openbox obconf

termux-x11 :0 &
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
openbox-session &

# Menu: clique direito no fundo da tela
# Editar menu/config:
#   ~/.config/openbox/menu.xml
#   ~/.config/openbox/rc.xml
# Configurar visualmente: obconf`}
      />

      <h2>5. FVWM — clássico configurável</h2>
      <CodeBlock
        title="Instalar e iniciar FVWM"
        code={`pkg install -y fvwm

termux-x11 :0 &
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
fvwm &

# Toda a aparência vem do arquivo ~/.fvwm/config
# Procure exemplos em fvwm.org`}
      />

      <h2>Compositor, papel de parede e launcher</h2>
      <p>
        Pra dar uma cara mais "moderna" aos WMs minimalistas, instale extras:
      </p>
      <CodeBlock
        title="Extras opcionais"
        code={`# Papel de parede
pkg install -y feh
feh --bg-scale ~/wallpaper.jpg

# Launcher mais bonito que dmenu
pkg install -y rofi
rofi -show drun

# Notificações
pkg install -y dunst`}
      />

      <AlertBox type="warning" title="Sem aceleração 3D garantida">
        Termux:X11 usa renderização via software por padrão. Apps que exigem OpenGL pesado
        (jogos, vídeo 4K, IDEs Electron) ficarão lentos. Para algo "compositor com sombras"
        (ex: <code>picom</code>) o ganho visual costuma não compensar o gasto de bateria.
      </AlertBox>

      <h2>Resumo prático</h2>
      <ul>
        <li>Quer um desktop convencional? <strong>XFCE4</strong>.</li>
        <li>Quer máxima velocidade e fluxo por teclado? <strong>i3wm</strong>.</li>
        <li>Quer só uma "tela com janelas" minimalista? <strong>openbox</strong>.</li>
        <li>Esqueça KDE, GNOME, MATE, Cinnamon e Budgie no Termux puro.</li>
      </ul>
    </PageContainer>
  );
}

import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AmbienteGrafico() {
  return (
    <PageContainer
      title="Ambiente Gráfico no Termux (Termux:X11 + XFCE4)"
      subtitle="Como rodar uma interface gráfica leve no Android usando Termux:X11, xorg-server e XFCE4 — e atalhos de teclado nativos do Termux."
      difficulty="intermediario"
      timeToRead="20 min"
    >
      <AlertBox type="warning" title="Isto é EXPERIMENTAL">
        O Termux roda em Android sem root. Ele <strong>não tem GNOME, Wayland nem X.org "de verdade"</strong>
        como num PC. O que existe é um truque: o app companion <strong>Termux:X11</strong> renderiza
        uma sessão X11 dentro de uma janela Android. Isso funciona, mas:
        <ul>
          <li>Consome <strong>muita bateria</strong> e esquenta o aparelho</li>
          <li>Performance é limitada — não substitui um PC</li>
          <li>Apps gráficos pesados (Chromium, LibreOffice, IDEs) podem travar</li>
          <li>Não há aceleração gráfica garantida — depende do device/driver</li>
        </ul>
        Para uso casual de XFCE4 leve, funciona muito bem. Para produtividade séria, prefira o terminal puro.
      </AlertBox>

      <h2>O que você precisa</h2>
      <ul>
        <li><strong>Termux</strong> instalado pelo F-Droid (a versão da Play Store está desatualizada)</li>
        <li><strong>Termux:X11</strong> — app companion, baixe o APK em <code>github.com/termux/termux-x11/releases</code></li>
        <li>Cerca de <strong>1 GB de espaço livre</strong> para o XFCE4 e dependências</li>
      </ul>

      <AlertBox type="info" title="Por que XFCE4?">
        XFCE4 é o único ambiente desktop "completo" leve o bastante para rodar de forma usável
        via Termux:X11 num celular Android. KDE, GNOME, MATE e Cinnamon são pesados demais e
        dependem de coisas que o Android não tem. Para algo ainda mais leve, veja a página
        de <em>Ambientes Alternativos</em> (i3wm, openbox).
      </AlertBox>

      <h2>1. Instalação</h2>
      <CodeBlock
        title="Instalar Termux:X11 + XFCE4"
        code={`# Atualizar pacotes
pkg update -y && pkg upgrade -y

# Habilitar o repositório x11
pkg install -y x11-repo

# Instalar o servidor Termux:X11 (lado Termux), xorg-server e XFCE4
pkg install -y termux-x11-nightly xorg-server xfce4

# (Opcional) utilitários comuns do XFCE
pkg install -y xfce4-terminal thunar mousepad

# (Opcional) suporte a som via PulseAudio
pkg install -y pulseaudio`}
      />

      <h2>2. Iniciando a sessão gráfica</h2>
      <CodeBlock
        title="Iniciar XFCE4 dentro do Termux:X11"
        code={`# 1) No Termux, inicie o servidor X11 (segura o display :0)
termux-x11 :0 &

# 2) Abra o app Termux:X11 (ele vai mostrar tela preta esperando cliente)

# 3) De volta no Termux, exporte o DISPLAY e suba o XFCE
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
dbus-launch --exit-with-session startxfce4 &

# Volte para o app Termux:X11 — o XFCE4 deve aparecer.`}
      />

      <AlertBox type="info" title="Script único">
        Cole o bloco abaixo num arquivo <code>~/start-xfce.sh</code> e rode com
        <code>bash ~/start-xfce.sh</code> sempre que quiser abrir o desktop.
      </AlertBox>

      <CodeBlock
        title="~/start-xfce.sh"
        code={`#!/data/data/com.termux/files/usr/bin/bash
pkill -f "termux-x11" 2>/dev/null
termux-x11 :0 >/dev/null 2>&1 &
sleep 2
export DISPLAY=:0
export XDG_RUNTIME_DIR=$TMPDIR
dbus-launch --exit-with-session startxfce4 >/dev/null 2>&1 &
echo "Abra o app Termux:X11 agora."`}
      />

      <h2>3. Som (opcional)</h2>
      <CodeBlock
        title="Áudio via PulseAudio"
        code={`# Iniciar PulseAudio aceitando conexões locais
pulseaudio --start \\
  --load="module-native-protocol-tcp auth-ip-acl=127.0.0.1 auth-anonymous=1" \\
  --exit-idle-time=-1

# Apontar apps para o servidor de som
export PULSE_SERVER=127.0.0.1`}
      />

      <h2>Layout do Teclado & Gestos no Termux</h2>
      <p>
        Mesmo sem ambiente gráfico, o Termux tem atalhos pensados para tela touch e teclados
        Android (que não têm <code>Ctrl</code>/<code>Esc</code> físico). A tecla
        <strong> Volume Up </strong> funciona como modificador especial.
      </p>

      <CodeBlock
        title="Atalhos com Volume Up (Vol+) no terminal"
        code={`Vol+ + E      → Esc
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
Vol+ + Q ou K → mostra/esconde a barra de teclas extras`}
      />

      <CodeBlock
        title="Atalhos com Volume Down (Vol-) — modificador Ctrl"
        code={`Vol- + L  → Ctrl+L (limpar tela)
Vol- + C  → Ctrl+C (interromper)
Vol- + D  → Ctrl+D (EOF / sair)
Vol- + Z  → Ctrl+Z (suspender processo)
Vol- + R  → Ctrl+R (busca reversa no histórico)`}
      />

      <h2>Gestos na tela</h2>
      <ul>
        <li><strong>Toque longo</strong> → menu de copiar/colar e tela cheia</li>
        <li><strong>Pinça (zoom)</strong> → aumenta/diminui o tamanho da fonte</li>
        <li><strong>Deslizar com 2 dedos pra baixo</strong> → mostra a barra de teclas extras</li>
        <li><strong>Deslizar da esquerda</strong> → abre a gaveta de sessões</li>
      </ul>

      <h2>Personalizando a barra de teclas extras</h2>
      <p>
        A barra cinza acima do teclado é configurável. Edite o arquivo
        <code> ~/.termux/termux.properties </code>:
      </p>
      <CodeBlock
        title="~/.termux/termux.properties"
        code={`# Linha 1 = primeira fileira da barra; cada item entre vírgulas
extra-keys = [ \\
  ['ESC','/','-','HOME','UP','END','PGUP'], \\
  ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN'] \\
]

# Aplicar mudanças sem fechar o Termux
# Rode no terminal:
#   termux-reload-settings`}
      />

      <h2>Resumo</h2>
      <ul>
        <li>Para GUI no Termux: <strong>Termux:X11 + xorg-server + XFCE4</strong>.</li>
        <li>Encare como um <em>extra experimental</em>, não como substituto de PC.</li>
        <li>No dia a dia, foque nos atalhos de <strong>Volume Up/Down</strong> — eles transformam
          a experiência no terminal puro.</li>
      </ul>
    </PageContainer>
  );
}

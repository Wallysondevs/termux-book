import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Gaming() {
  return (
    <PageContainer
      title="Gaming no Termux"
      subtitle="O que dá (e o que NÃO dá) pra jogar via Termux: emuladores leves no terminal, Box86/Box64 pra binários x86 e por que Steam/Proton não rodam no Android."
      difficulty="iniciante"
      timeToRead="20 min"
    >
      <AlertBox type="danger" title="Termux NÃO é uma plataforma de gaming">
        Termux roda em Android, sem root, sem GPU exposta como num PC e sem
        drivers proprietários NVIDIA/AMD/Intel. <strong>Steam, Proton, Lutris,
        Wine nativo, RPCS3, PCSX2 desktop, Yuzu, Ryujinx</strong> e outros
        emuladores/lojas pesadas <strong>não funcionam dentro do Termux</strong>.
        Para emulação séria de consoles modernos (PS2, GameCube, Switch, 3DS, PSP),
        instale apps Android nativos: <strong>RetroArch, AetherSX2, Dolphin,
        Citra, PPSSPP, DuckStation</strong> direto da Play Store ou F-Droid.
      </AlertBox>

      <p>
        O que o Termux <em>realmente</em> oferece em termos de jogo é nicho:
        emuladores de máquinas antigas que rodam em texto ou janela leve via
        Termux:X11, alguns jogos clássicos de DOS/SCUMM e a possibilidade
        experimental de rodar binários x86 Linux com <strong>Box86/Box64</strong>.
      </p>

      <h2>1. DOSBox — Jogos clássicos de PC (DOS)</h2>
      <CodeBlock
        title="Instalar e rodar DOSBox no Termux"
        code={`# DOSBox roda jogos antigos de MS-DOS via terminal
pkg install -y dosbox

# Iniciar
dosbox

# Dentro do DOSBox, montar uma pasta como drive C:
mount c ~/storage/shared/dos-games
c:
cd prince
prince.exe

# Sair
exit`}
      />

      <h2>2. ScummVM — Adventure games clássicos</h2>
      <CodeBlock
        title="Rodar Monkey Island, Day of the Tentacle, etc."
        code={`# ScummVM toca jogos LucasArts/Sierra antigos
pkg install -y scummvm

# Iniciar a interface
scummvm

# Adicione o diretório do jogo (no storage compartilhado):
# termux-setup-storage
# depois aponte ScummVM para ~/storage/shared/scumm-games/`}
      />

      <h2>3. RetroArch headless (avançado)</h2>
      <CodeBlock
        title="RetroArch via terminal — limitado"
        code={`# Existe pacote retroarch no Termux, mas a versão Android
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
# Recomendação séria: use o app RetroArch Android, não esta versão.`}
      />

      <h2>4. Box86 / Box64 — Rodar binários x86/x86_64 Linux</h2>
      <p>
        <strong>Box86</strong> (32-bit) e <strong>Box64</strong> (64-bit) são
        tradutores que executam binários Linux compilados para x86 em CPUs ARM
        (que é a arquitetura do Android). Eles servem pra rodar alguns
        emuladores e jogos Linux antigos. Não esperar milagres: jogos modernos,
        DRMs e qualquer coisa que precise de GPU dedicada não vão.
      </p>
      <CodeBlock
        title="Instalar Box86 e Box64 no Termux"
        code={`# Os pacotes oficiais ficam no repositório x11-repo
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
box64 ./jogo-linux-x86_64`}
      />

      <AlertBox type="warning" title="Box86/Box64 é experimental">
        A tradução x86→ARM é lenta e nem todo binário roda. Jogos com
        anti-cheat, DRM moderno (Steam, EGS) ou que dependem de drivers
        gráficos específicos <strong>não vão funcionar</strong>. Use só pra
        binários Linux antigos, simples, sem proteção.
      </AlertBox>

      <h2>5. Wine via proot-distro (muito experimental)</h2>
      <CodeBlock
        title="Wine dentro de um Ubuntu/Debian em proot"
        code={`# Wine NÃO roda nativo no Termux. A única alternativa é
# instalar uma distro Linux via proot-distro e usar Wine + Box64 lá.
# Veja a página dedicada "Wine" para o passo a passo.

pkg install -y proot-distro
proot-distro install debian
proot-distro login debian
# (dentro do Debian) apt install wine box64
# Performance é baixa. Bom só pra programinhas Windows simples, NÃO jogos AAA.`}
      />

      <h2>6. Recomendação: apps Android para emulação séria</h2>
      <CodeBlock
        title="Apps nativos Android (instale via Play Store ou F-Droid)"
        code={`# Esses NÃO rodam dentro do Termux — são apps Android comuns:

# RetroArch         — multi-emulador (NES, SNES, N64, PS1, GBA, etc.)
# AetherSX2         — PlayStation 2
# DuckStation       — PlayStation 1
# PPSSPP            — PSP
# Dolphin           — GameCube e Wii
# Citra (forks)     — Nintendo 3DS
# Skyline / Egg NS  — Nintendo Switch (status varia)
# Magic DOSBox      — front-end DOSBox para Android
# ScummVM (Android) — adventure games

# Pra controle, qualquer joypad Bluetooth/USB OTG funciona com esses apps.`}
      />

      <AlertBox type="info" title="Resumindo">
        Termux é ótimo pra jogar coisinhas em texto (DOSBox, ScummVM, jogos em
        Python/Lua que você mesmo compila) e pra brincar com Box86/Box64. Pra
        emulação moderna, controles e performance, use apps Android dedicados.
      </AlertBox>
    </PageContainer>
  );
}

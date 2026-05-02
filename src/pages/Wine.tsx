import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Wine() {
  return (
    <PageContainer
      title="Wine no Termux — Aplicativos Windows no Android"
      subtitle="Por que Wine não roda nativo no Termux, e como tentar via proot-distro + Box86/Box64. Experimental, lento e limitado."
      difficulty="avancado"
      timeToRead="25 min"
    >
      <AlertBox type="warning" title="Wine NÃO roda nativo no Termux">
        Termux é Android (ARM/AArch64) sem root e sem suporte direto a
        binários x86 do Windows. <strong>Não existe pacote
        <code>wine</code> no repositório do Termux</strong>. A única forma
        razoável de rodar programas Windows é via uma distro Linux instalada
        com <code>proot-distro</code> + <strong>Box86/Box64</strong> para
        traduzir x86→ARM. Tudo é <strong>experimental, lento</strong> e
        <strong> não roda jogos AAA, anti-cheat, DRM moderno</strong> nem
        nada que dependa de drivers GPU dedicados. Para Office/Photoshop/jogos
        modernos, use o PC.
      </AlertBox>

      <p>
        O <strong>Wine</strong> (Wine Is Not an Emulator) é uma camada de
        compatibilidade que traduz chamadas da API Windows para Linux. No
        Termux puro ele não existe — Termux roda em Android, e Wine precisa
        de uma userland Linux completa + um tradutor x86 (Box86/Box64) já que
        a maioria dos .exe é x86.
      </p>

      <h2>1. Pré-requisitos</h2>
      <CodeBlock
        title="Atualizar Termux e instalar utilitários"
        code={`pkg update && pkg upgrade -y
pkg install -y proot-distro x11-repo
pkg install -y termux-x11-nightly  # pode falhar; instale o app Termux:X11
pkg install -y pulseaudio          # áudio (limitado)

# Dar acesso ao storage compartilhado (pra trocar arquivos)
termux-setup-storage`}
      />

      <h2>2. Instalar uma distro Linux via proot-distro</h2>
      <CodeBlock
        title="Debian dentro do Termux"
        code={`# Listar distros disponíveis
proot-distro list

# Instalar Debian (Ubuntu também serve)
proot-distro install debian

# Entrar
proot-distro login debian

# Dentro do Debian, atualizar
apt update && apt upgrade -y
apt install -y wget gnupg2 software-properties-common`}
      />

      <h2>3. Instalar Box86 e Box64 (dentro do Debian em proot)</h2>
      <CodeBlock
        title="Tradução x86/x86_64 → ARM"
        code={`# Box86 (32-bit) e Box64 (64-bit) precisam estar instalados
# DENTRO do proot pra Wine conseguir executar .exe.

# Adicionar repositório do projeto Box86/Box64 (ARM64):
wget https://itai-nelken.github.io/weekly-box86-debs/debian/box86.list \
  -O /etc/apt/sources.list.d/box86.list
wget -qO- https://itai-nelken.github.io/weekly-box86-debs/debian/KEY.gpg \
  | apt-key add -

wget https://ryanfortner.github.io/box64-debs/box64.list \
  -O /etc/apt/sources.list.d/box64.list
wget -qO- https://ryanfortner.github.io/box64-debs/KEY.gpg | apt-key add -

apt update
apt install -y box86 box64

# Testar
box86 -v
box64 -v`}
      />

      <h2>4. Instalar Wine (dentro do Debian em proot)</h2>
      <CodeBlock
        title="Wine x86 rodando via Box86"
        code={`# Wine para arquitetura i386 — rodará via Box86
dpkg --add-architecture i386
apt update
apt install -y wine winetricks

# Verificar
wine --version

# Inicializar prefixo (cria ~/.wine)
wineboot --init

# Configurar (precisa do Termux:X11 aberto e DISPLAY exportado)
export DISPLAY=:0
winecfg`}
      />

      <h2>5. Subir a interface gráfica (Termux:X11)</h2>
      <CodeBlock
        title="Iniciar X11 e rodar um .exe"
        code={`# 1. No Termux (FORA do proot), instale o app Termux:X11 (F-Droid)
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
WINEPREFIX=~/.wine64 wine programa64.exe`}
      />

      <AlertBox type="warning" title="Espere lentidão e bugs">
        A pilha aqui é: <em>Android → Termux → proot Debian → Box86/64 →
        Wine → seu programa</em>. Cada camada cobra performance. Programas
        leves (Notepad++, MSPaint clones, leitores) talvez rodem. Jogos
        modernos, Photoshop, Office completo: <strong>não conta com isso</strong>.
      </AlertBox>

      <h2>6. Winetricks — instalar componentes Windows</h2>
      <CodeBlock
        title="Bibliotecas comuns que apps esperam"
        code={`# Dentro do proot, com Wine já configurado:
winetricks corefonts          # Arial, Times New Roman
winetricks vcrun2019          # Visual C++ 2019 redistributable
winetricks dotnet48           # .NET Framework 4.8 (lento de instalar)
winetricks d3dx9              # DirectX 9 (utilidade limitada sem GPU dedicada)

# Listar tudo que dá pra instalar
winetricks list-all`}
      />

      <h2>7. Troubleshooting</h2>
      <CodeBlock
        title="Problemas comuns"
        code={`# "wine: command not found"
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
pulseaudio --start --exit-idle-time=-1 --load="module-native-protocol-tcp \
  auth-ip-acl=127.0.0.1 auth-anonymous=1"
# Dentro do proot:
export PULSE_SERVER=127.0.0.1`}
      />

      <AlertBox type="info" title="Alternativas">
        Se a meta é só rodar 1 programinha Windows, considere: usar um PC
        remoto via <strong>RDP</strong>/<strong>VNC</strong> direto do app
        Android, ou rodar a mesma tarefa com um app Android nativo. Wine no
        Termux é mais um exercício técnico do que uma solução prática.
      </AlertBox>
    </PageContainer>
  );
}

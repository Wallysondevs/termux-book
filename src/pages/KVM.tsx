import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function KVM() {
  return (
    <PageContainer
      title="Virtualização no Termux — proot-distro e QEMU TCG"
      subtitle="Por que KVM/QEMU acelerado não funciona no Android e quais as alternativas reais: proot-distro para rodar distros Linux e QEMU em modo TCG para testes."
      difficulty="avancado"
      timeToRead="20 min"
    >
      <AlertBox type="danger" title="KVM, QEMU acelerado e virt-manager NÃO rodam no Android">
        O <strong>KVM</strong> exige acesso ao módulo <code>/dev/kvm</code> do kernel e às
        instruções de virtualização do CPU (VT-x/AMD-V em x86, EL2 em ARM). O Android
        <strong> bloqueia isso</strong> — o kernel não expõe <code>/dev/kvm</code> para apps,
        nem mesmo com root convencional. Pacotes como <code>qemu-kvm</code>,
        <code> libvirt</code>, <code>virt-manager</code> e <code>virtinst</code>
        <strong> não existem</strong> nos repositórios do Termux. Esqueça rodar VMs aceleradas
        no celular: o que dá para fazer é <strong>proot-distro</strong> (chroot-like, mesmo
        kernel) ou <strong>QEMU em modo TCG</strong> (emulação puramente em software,
        absurdamente lento — só serve para testes).
      </AlertBox>

      <p>
        Esta página mostra as duas alternativas reais para “rodar outro sistema” dentro do
        Termux: <strong>proot-distro</strong> (Ubuntu, Debian, Arch, Alpine, Fedora etc. com
        userland próprio compartilhando o kernel do Android) e <strong>QEMU TCG</strong>
        (emulação completa de uma arquitetura, sem aceleração de hardware).
      </p>

      <h2>1. proot-distro — distros Linux dentro do Termux</h2>
      <p>
        <code>proot-distro</code> instala o rootfs de uma distro e a executa via{" "}
        <code>proot</code> (não precisa root). Você ganha <code>apt</code> de verdade,
        <code> systemd</code> NÃO funciona, mas a maioria dos pacotes CLI roda.
      </p>

      <CodeBlock
        title="Instalar e usar proot-distro"
        code={`# Instalar a ferramenta
pkg update && pkg install -y proot-distro

# Listar distros disponíveis
proot-distro list

# Instalar Ubuntu
proot-distro install ubuntu

# Entrar no Ubuntu
proot-distro login ubuntu

# Dentro do Ubuntu (você é root no rootfs):
apt update && apt install -y nginx python3-pip
exit

# Outras distros úteis
proot-distro install debian
proot-distro install archlinux
proot-distro install alpine
proot-distro install fedora

# Remover uma distro
proot-distro remove ubuntu

# Backup do rootfs
proot-distro backup ubuntu --output ~/storage/shared/ubuntu.tar.gz
proot-distro restore ~/storage/shared/ubuntu.tar.gz`}
      />

      <AlertBox type="warning" title="Limitações do proot-distro">
        Não tem <code>systemd</code> (use <code>service</code> ou rode em foreground), não
        tem <code>/dev/kvm</code>, não roda Docker nativo, e a performance fica em torno de
        <strong> 70–90%</strong> do nativo por causa do <code>proot</code>. Algumas syscalls
        do kernel Android podem retornar erros estranhos (ex: <code>fork()</code> sob carga).
      </AlertBox>

      <h2>2. QEMU em modo TCG — emulação por software</h2>
      <p>
        Se você precisa rodar uma arquitetura diferente (ex: testar um binário x86_64 num
        celular ARM64) e não dá para usar <code>box64</code>, dá para instalar QEMU no Termux
        em <strong>modo TCG</strong> (sem aceleração). É lento — pense em ~5% da velocidade
        nativa — mas funciona para boots de teste.
      </p>

      <CodeBlock
        title="QEMU TCG no Termux"
        code={`# Instalar QEMU (system emulators são pesados: ~200 MB)
pkg install -y qemu-system-x86-64-headless qemu-utils

# Criar disco virtual qcow2 de 10 GB
qemu-img create -f qcow2 alpine.qcow2 10G

# Baixar uma ISO leve (Alpine x86_64)
curl -LO https://dl-cdn.alpinelinux.org/alpine/v3.20/releases/x86_64/alpine-virt-3.20.0-x86_64.iso

# Bootar a ISO em modo TCG (sem -enable-kvm, sem -accel kvm)
qemu-system-x86_64 \\
  -m 512 \\
  -smp 2 \\
  -hda alpine.qcow2 \\
  -cdrom alpine-virt-3.20.0-x86_64.iso \\
  -boot d \\
  -nographic \\
  -accel tcg

# Sair do console serial: Ctrl-A depois X`}
      />

      <AlertBox type="warning" title="Performance">
        TCG emula CPU instrução por instrução. Boot de Alpine que leva 10s num PC pode
        levar <strong>5–10 minutos</strong> no celular. Use só para testes pontuais
        (validar um script de boot, ver um kernel panic, etc).
      </AlertBox>

      <h2>3. Quando usar o quê?</h2>
      <CodeBlock
        title="Resumo prático"
        code={`# Quero apt/dnf/pacman e ferramentas Linux que não estão no Termux
→ proot-distro (90% dos casos)

# Quero rodar binário x86 num ARM
→ box64 / box86 (mais rápido que QEMU)

# Quero bootar uma ISO real, ver bootloader, kernel etc
→ qemu-system-* em modo TCG (lento, mas funciona)

# Quero rodar Windows / Wine
→ proot-distro + wine (instável) OU app Android Winlator

# Quero KVM/libvirt/virt-manager de verdade
→ Esqueça. Use um PC. O Android não expõe /dev/kvm.`}
      />

      <h2>4. Bonus: Docker dentro do proot-distro</h2>
      <CodeBlock
        title="Docker em Ubuntu via proot (com caveats)"
        code={`proot-distro login ubuntu
apt update && apt install -y docker.io
# dockerd NÃO sobe sem cgroups corretos — você vai precisar de:
#   - Kernel Android com namespace user habilitado
#   - Truques com 'tini' / dockerd-rootless-setuptool.sh
#   - Aceitar que muitos containers vão quebrar
# Para a maioria dos casos use apenas 'podman' ou rode containers num servidor remoto via SSH.`}
      />

      <AlertBox type="info" title="Alternativa recomendada">
        Se o objetivo é “virtualizar para desenvolver”, considere usar o Termux apenas como
        cliente SSH para um servidor remoto (VPS, Raspberry Pi, PC de casa) onde KVM/Docker
        rodam de verdade. O celular vira terminal portátil, não hipervisor.
      </AlertBox>
    </PageContainer>
  );
}

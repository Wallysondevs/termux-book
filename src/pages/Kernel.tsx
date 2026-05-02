import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Kernel() {
    return (
      <PageContainer
        title="Kernel Linux no Ubuntu"
        subtitle="Guia completo do kernel: verificar versão, atualizar, instalar kernels alternativos, módulos, parâmetros e compilar kernel customizado."
        difficulty="avancado"
        timeToRead="25 min"
      >
        <p>
          O <strong>kernel</strong> é o coração do sistema operacional. Ele gerencia todo o
          hardware (CPU, memória, discos, rede), processos, sistemas de arquivos e segurança.
          O Ubuntu usa o kernel Linux, mantido por Linus Torvalds e milhares de contribuidores.
        </p>

        <h2>1. Informações do Kernel</h2>
        <CodeBlock
          title="Verificar versão e informações"
          code={`# Ver versão do kernel
  uname -r
  # Saída: 6.8.0-40-generic

  # Informações completas
  uname -a
  # Saída: Linux hostname 6.8.0-40-generic #40-Ubuntu SMP x86_64 GNU/Linux

  # Significado da versão: 6.8.0-40-generic
  # 6       = versão principal
  # 8       = versão secundária
  # 0       = patch
  # 40      = build do Ubuntu
  # generic = tipo (generic=desktop/server, lowlatency=áudio/tempo real)

  # Kernels instalados
  dpkg -l | grep linux-image

  # Kernel atual em detalhes
  cat /proc/version

  # Parâmetros do kernel atual
  cat /proc/cmdline

  # Informações do hardware via kernel
  cat /proc/cpuinfo | head -20
  cat /proc/meminfo | head -10
  cat /proc/partitions`}
        />

        <h2>2. Atualizar o Kernel</h2>
        <CodeBlock
          title="Manter o kernel atualizado"
          code={`# Atualizar kernel via apt (recomendado)
  sudo apt update
  sudo apt upgrade
  # Inclui atualizações de kernel automaticamente

  # Instalar kernel específico
  apt search linux-image | grep generic
  sudo apt install linux-image-6.8.0-41-generic linux-headers-6.8.0-41-generic

  # Kernel HWE (Hardware Enablement)
  # Kernel mais recente com suporte a hardware novo
  sudo apt install linux-generic-hwe-24.04

  # Kernel lowlatency (para áudio, tempo real)
  sudo apt install linux-lowlatency

  # Reiniciar para usar o novo kernel
  sudo reboot

  # Remover kernels antigos (liberar espaço em /boot)
  sudo apt autoremove --purge
  # Ou manualmente:
  dpkg -l linux-image-* | grep ^ii
  sudo apt remove linux-image-6.8.0-39-generic`}
        />

        <h2>3. Módulos do Kernel</h2>
        <CodeBlock
          title="Gerenciar módulos (drivers)"
          code={`# Listar módulos carregados
  lsmod
  lsmod | grep nvidia     # Filtrar por nome

  # Informações sobre um módulo
  modinfo nvidia
  modinfo ext4
  modinfo wireguard

  # Carregar módulo
  sudo modprobe wireguard
  sudo modprobe vhost_net

  # Descarregar módulo
  sudo modprobe -r nome_modulo
  sudo rmmod nome_modulo

  # Carregar módulo permanentemente (no boot)
  echo "wireguard" | sudo tee /etc/modules-load.d/wireguard.conf

  # Bloquear módulo (impedir de carregar)
  echo "blacklist nouveau" | sudo tee /etc/modprobe.d/blacklist-nouveau.conf
  sudo update-initramfs -u

  # Parâmetros de módulos
  # Ver parâmetros disponíveis:
  modinfo -p i915
  # Definir parâmetro:
  echo "options i915 enable_fbc=1" | sudo tee /etc/modprobe.d/i915.conf`}
        />

        <h2>4. Parâmetros do Kernel (sysctl)</h2>
        <CodeBlock
          title="Ajustar parâmetros em tempo real"
          code={`# Ver todos os parâmetros
  sysctl -a

  # Ver parâmetro específico
  sysctl net.ipv4.ip_forward
  sysctl vm.swappiness

  # Alterar temporariamente
  sudo sysctl -w net.ipv4.ip_forward=1
  sudo sysctl -w vm.swappiness=10

  # Alterar permanentemente
  sudo tee /etc/sysctl.d/99-custom.conf > /dev/null << 'EOF'
  # Encaminhamento de pacotes (para roteador/VPN)
  net.ipv4.ip_forward = 1

  # Reduzir uso de swap (melhor performance com SSD)
  vm.swappiness = 10

  # Segurança de rede
  net.ipv4.conf.all.rp_filter = 1
  net.ipv4.icmp_echo_ignore_broadcasts = 1
  net.ipv4.conf.all.accept_redirects = 0

  # Performance de rede
  net.core.rmem_max = 16777216
  net.core.wmem_max = 16777216
  EOF

  # Aplicar
  sudo sysctl --system`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com kernel"
          code={`# Kernel novo não funciona (tela preta, crash)
  # Bootar com kernel anterior via GRUB:
  # GRUB → Advanced options → Escolher kernel antigo
  # Depois remover o kernel problemático:
  sudo apt remove linux-image-VERSAO-PROBLEMATICA

  # /boot cheio (não consegue atualizar)
  df -h /boot
  # Remover kernels antigos:
  sudo apt autoremove --purge

  # Módulo não encontrado
  sudo depmod -a    # Reconstruir banco de módulos
  sudo update-initramfs -u

  # Kernel panic
  # Geralmente causado por: RAM defeituosa, disco corrompido,
  # ou módulo do kernel incompatível
  # Verificar:
  journalctl -b -1 | grep -i panic

  # Verificar integridade do kernel
  sha256sum /boot/vmlinuz-$(uname -r)

  # Driver de hardware não funciona
  dmesg | grep -i error
  dmesg | grep -i firmware
  # Instalar firmware:
  sudo apt install linux-firmware`}
        />

        <AlertBox type="warning" title="Cuidado com o kernel">
          O kernel é crítico — um kernel defeituoso pode impedir o sistema de iniciar.
          Sempre mantenha pelo menos <strong>dois kernels instalados</strong> para poder
          bootar com o anterior via GRUB em caso de problemas.
        </AlertBox>
      </PageContainer>
    );
  }
import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Hardware() {
    return (
      <PageContainer
        title="Hardware — Informações e Diagnóstico"
        subtitle="Guia completo para identificar hardware no Ubuntu: CPU, memória, discos, placa de vídeo, rede, USB, sensores e drivers."
        difficulty="iniciante"
        timeToRead="25 min"
      >
        <p>
          O Ubuntu oferece diversas ferramentas para identificar, monitorar e diagnosticar
          o hardware do seu computador. Saber usar essas ferramentas é essencial para
          verificar compatibilidade, diagnosticar problemas e otimizar a performance.
        </p>

        <h2>1. Visão Geral do Sistema</h2>
        <CodeBlock
          title="Informações gerais do hardware"
          code={`# Resumo completo do hardware
  sudo lshw -short
  # Lista: CPU, memória, discos, rede, vídeo, etc.

  # Versão detalhada (muito longo!)
  sudo lshw > hardware-completo.txt

  # Versão HTML (abre no navegador)
  sudo lshw -html > hardware.html

  # Informações do sistema
  hostnamectl
  # Mostra: hostname, kernel, arquitetura, etc.

  # Informações da BIOS/UEFI
  sudo dmidecode -t bios
  sudo dmidecode -t system    # Fabricante, modelo

  # Resumo rápido
  neofetch    # Se instalado: sudo apt install neofetch
  # Ou: screenfetch`}
        />

        <h2>2. CPU (Processador)</h2>
        <CodeBlock
          title="Informações do processador"
          code={`# Informações detalhadas da CPU
  lscpu
  # Mostra: modelo, cores, threads, cache, flags

  # Via /proc
  cat /proc/cpuinfo
  # Cada core é listado separadamente

  # Resumo rápido
  lscpu | grep "Model name"
  nproc    # Número de cores/threads

  # Frequência atual
  cat /proc/cpuinfo | grep "MHz"
  # Ou: watch -n1 "grep MHz /proc/cpuinfo"

  # Governador de frequência (performance vs economia)
  cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
  # Valores: performance, powersave, ondemand, schedutil

  # Alterar para performance
  echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

  # Verificar vulnerabilidades de CPU (Spectre, Meltdown)
  grep -r . /sys/devices/system/cpu/vulnerabilities/`}
        />

        <h2>3. Memória RAM</h2>
        <CodeBlock
          title="Informações de memória"
          code={`# Uso de memória
  free -h
  # Saída:
  #               total   used   free  shared  buff/cache  available
  # Mem:          16Gi    8.2Gi  2.1Gi  512Mi   5.7Gi      7.0Gi
  # Swap:          4Gi    0.0Gi  4.0Gi

  # "available" = memória realmente disponível
  # "buff/cache" = memória usada como cache (liberável)

  # Detalhes dos módulos de RAM
  sudo dmidecode -t memory
  # Mostra: slots, tamanho por módulo, tipo (DDR4/DDR5), velocidade

  # Slots de memória
  sudo dmidecode -t memory | grep -E "Size|Type:|Speed"

  # Uso detalhado
  cat /proc/meminfo

  # Monitorar uso em tempo real
  watch -n1 free -h
  # Ou: vmstat 1`}
        />

        <h2>4. Discos e Armazenamento</h2>
        <CodeBlock
          title="Informações de discos"
          code={`# Listar discos e partições
  lsblk
  # Saída formatada com tipo e tamanho

  # Espaço em disco
  df -hT
  # -h = human readable, -T = tipo de filesystem

  # Informações SMART (saúde do disco)
  sudo apt install -y smartmontools
  sudo smartctl -a /dev/sda
  # Ver: temperatura, horas de uso, erros
  sudo smartctl -H /dev/sda    # Apenas saúde (PASSED = OK)

  # Benchmark de disco
  # Velocidade de leitura:
  sudo hdparm -tT /dev/sda
  # Velocidade de escrita:
  dd if=/dev/zero of=/tmp/test bs=1M count=1024 oflag=direct
  rm /tmp/test

  # Identificar SSD vs HDD
  cat /sys/block/sda/queue/rotational
  # 0 = SSD, 1 = HDD

  # Informações detalhadas de disco
  sudo hdparm -I /dev/sda

  # NVMe
  sudo nvme list
  sudo nvme smart-log /dev/nvme0n1`}
        />

        <h2>5. Placa de Vídeo (GPU)</h2>
        <CodeBlock
          title="Informações e drivers de vídeo"
          code={`# Identificar GPU
  lspci | grep -i vga
  lspci | grep -i 3d    # GPU dedicada NVIDIA

  # Detalhes
  sudo lshw -c video

  # NVIDIA
  nvidia-smi    # Se driver NVIDIA instalado
  # Mostra: modelo, memória, uso, temperatura

  # Instalar driver NVIDIA (recomendado)
  ubuntu-drivers list
  sudo ubuntu-drivers install
  # Ou versão específica:
  sudo apt install nvidia-driver-535

  # AMD/Intel
  glxinfo | grep "OpenGL renderer"
  # Instalar: sudo apt install mesa-utils

  # Verificar driver em uso
  lspci -k | grep -A 2 VGA`}
        />

        <h2>6. Dispositivos USB e Rede</h2>
        <CodeBlock
          title="USB, rede e outros dispositivos"
          code={`# Dispositivos USB
  lsusb
  # Lista todos os dispositivos USB conectados
  lsusb -t    # Estrutura em árvore

  # Dispositivos PCI
  lspci
  lspci -v    # Detalhado

  # Interfaces de rede
  ip link show
  lspci | grep -i net     # Placa de rede
  lsusb | grep -i net     # Adaptador USB de rede
  iwconfig                 # Info de Wi-Fi

  # Bluetooth
  hciconfig -a
  bluetoothctl show

  # Sensores de temperatura
  sudo apt install -y lm-sensors
  sudo sensors-detect    # Detectar sensores (responda YES)
  sensors
  # Mostra temperatura da CPU, GPU, disco

  # Monitorar hardware em tempo real
  sudo apt install -y htop
  htop
  # Ou: btop (mais bonito)
  sudo apt install -y btop
  btop`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns de hardware"
          code={`# Hardware não reconhecido
  # Verificar no dmesg:
  dmesg | tail -30
  dmesg | grep -i error

  # Driver de Wi-Fi não funciona
  # Identificar a placa:
  lspci | grep -i wireless
  # Instalar drivers:
  sudo ubuntu-drivers install

  # USB não detectado
  # Verificar dmesg ao conectar:
  dmesg -w    # Modo "watch" — mostra em tempo real
  # Conectar o USB e ver a saída

  # Verificar logs de hardware
  journalctl -b | grep -i error
  journalctl -b | grep -i firmware

  # Testar memória RAM (erros de memória)
  # Reiniciar → GRUB → "Memory test (memtest86+)"
  # Ou via terminal:
  sudo apt install -y memtester
  sudo memtester 1G 1    # Testar 1GB, 1 vez`}
        />

        <AlertBox type="info" title="Ferramentas gráficas de hardware">
          Para uma visão gráfica: <code>hardinfo</code> (Informações do Sistema),
          <code>gnome-disks</code> (Discos), <code>nvidia-settings</code> (GPU NVIDIA).
          Instale com <code>sudo apt install hardinfo gnome-disk-utility</code>.
        </AlertBox>
      </PageContainer>
    );
  }
import{j as e}from"./index-CsDtDb2_.js";import{P as s}from"./PageContainer-DdYPssra.js";import{C as a}from"./CodeBlock-CCueYP-d.js";import{I as r}from"./InfoBox-CFJp2Xi7.js";import"./house-BVOOG_Vc.js";import"./proxy-BaSd2E5R.js";function l(){return e.jsxs(s,{title:"Hardware — Informações e Diagnóstico",subtitle:"Guia completo para identificar hardware no Ubuntu: CPU, memória, discos, placa de vídeo, rede, USB, sensores e drivers.",difficulty:"iniciante",timeToRead:"25 min",children:[e.jsx("p",{children:"O Ubuntu oferece diversas ferramentas para identificar, monitorar e diagnosticar o hardware do seu computador. Saber usar essas ferramentas é essencial para verificar compatibilidade, diagnosticar problemas e otimizar a performance."}),e.jsx("h2",{children:"1. Visão Geral do Sistema"}),e.jsx(a,{title:"Informações gerais do hardware",code:`# Resumo completo do hardware
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
  # Ou: screenfetch`}),e.jsx("h2",{children:"2. CPU (Processador)"}),e.jsx(a,{title:"Informações do processador",code:`# Informações detalhadas da CPU
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
  grep -r . /sys/devices/system/cpu/vulnerabilities/`}),e.jsx("h2",{children:"3. Memória RAM"}),e.jsx(a,{title:"Informações de memória",code:`# Uso de memória
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
  # Ou: vmstat 1`}),e.jsx("h2",{children:"4. Discos e Armazenamento"}),e.jsx(a,{title:"Informações de discos",code:`# Listar discos e partições
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
  sudo nvme smart-log /dev/nvme0n1`}),e.jsx("h2",{children:"5. Placa de Vídeo (GPU)"}),e.jsx(a,{title:"Informações e drivers de vídeo",code:`# Identificar GPU
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
  lspci -k | grep -A 2 VGA`}),e.jsx("h2",{children:"6. Dispositivos USB e Rede"}),e.jsx(a,{title:"USB, rede e outros dispositivos",code:`# Dispositivos USB
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
  btop`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(a,{title:"Problemas comuns de hardware",code:`# Hardware não reconhecido
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
  sudo memtester 1G 1    # Testar 1GB, 1 vez`}),e.jsxs(r,{type:"info",title:"Ferramentas gráficas de hardware",children:["Para uma visão gráfica: ",e.jsx("code",{children:"hardinfo"})," (Informações do Sistema),",e.jsx("code",{children:"gnome-disks"})," (Discos), ",e.jsx("code",{children:"nvidia-settings"})," (GPU NVIDIA). Instale com ",e.jsx("code",{children:"sudo apt install hardinfo gnome-disk-utility"}),"."]})]})}export{l as default};

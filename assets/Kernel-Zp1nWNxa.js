import{j as e}from"./index-d-w5ROEn.js";import{P as o}from"./PageContainer-t8f2nTRw.js";import{C as r}from"./CodeBlock-D742nO-w.js";import{I as a}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function m(){return e.jsxs(o,{title:"Kernel Linux no Termux",subtitle:"Guia completo do kernel: verificar versão, atualizar, instalar kernels alternativos, módulos, parâmetros e compilar kernel customizado.",difficulty:"avancado",timeToRead:"25 min",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"kernel"})," é o coração do sistema operacional. Ele gerencia todo o hardware (CPU, memória, discos, rede), processos, sistemas de arquivos e segurança. O Termux usa o kernel Linux, mantido por Linus Torvalds e milhares de contribuidores."]}),e.jsx("h2",{children:"1. Informações do Kernel"}),e.jsx(r,{title:"Verificar versão e informações",code:`# Ver versão do kernel
  uname -r
  # Saída: 6.8.0-40-generic

  # Informações completas
  uname -a
  # Saída: Linux hostname 6.8.0-40-generic #40-Termux SMP x86_64 GNU/Linux

  # Significado da versão: 6.8.0-40-generic
  # 6       = versão principal
  # 8       = versão secundária
  # 0       = patch
  # 40      = build do Termux
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
  cat /proc/partitions`}),e.jsx("h2",{children:"2. Atualizar o Kernel"}),e.jsx(r,{title:"Manter o kernel atualizado",code:`# Atualizar kernel via apt (recomendado)
  pkg update
  pkg upgrade
  # Inclui atualizações de kernel automaticamente

  # Instalar kernel específico
  apt search linux-image | grep generic
  pkg install linux-image-6.8.0-41-generic linux-headers-6.8.0-41-generic

  # Kernel HWE (Hardware Enablement)
  # Kernel mais recente com suporte a hardware novo
  pkg install linux-generic-hwe-24.04

  # Kernel lowlatency (para áudio, tempo real)
  pkg install linux-lowlatency

  # Reiniciar para usar o novo kernel
  sudo reboot

  # Remover kernels antigos (liberar espaço em /boot)
  pkg autoclean --purge
  # Ou manualmente:
  dpkg -l linux-image-* | grep ^ii
  pkg uninstall linux-image-6.8.0-39-generic`}),e.jsx("h2",{children:"3. Módulos do Kernel"}),e.jsx(r,{title:"Gerenciar módulos (drivers)",code:`# Listar módulos carregados
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
  echo "options i915 enable_fbc=1" | sudo tee /etc/modprobe.d/i915.conf`}),e.jsx("h2",{children:"4. Parâmetros do Kernel (sysctl)"}),e.jsx(r,{title:"Ajustar parâmetros em tempo real",code:`# Ver todos os parâmetros
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
  sudo sysctl --system`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(r,{title:"Problemas comuns com kernel",code:`# Kernel novo não funciona (tela preta, crash)
  # Bootar com kernel anterior via GRUB:
  # GRUB → Advanced options → Escolher kernel antigo
  # Depois remover o kernel problemático:
  pkg uninstall linux-image-VERSAO-PROBLEMATICA

  # /boot cheio (não consegue atualizar)
  df -h /boot
  # Remover kernels antigos:
  pkg autoclean --purge

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
  pkg install linux-firmware`}),e.jsxs(a,{type:"warning",title:"Cuidado com o kernel",children:["O kernel é crítico — um kernel defeituoso pode impedir o sistema de iniciar. Sempre mantenha pelo menos ",e.jsx("strong",{children:"dois kernels instalados"})," para poder bootar com o anterior via GRUB em caso de problemas."]})]})}export{m as default};

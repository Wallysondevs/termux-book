import{j as e}from"./index-d-w5ROEn.js";import{P as s}from"./PageContainer-t8f2nTRw.js";import{C as o}from"./CodeBlock-D742nO-w.js";import{I as a}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function c(){return e.jsxs(s,{title:"Gerenciamento de Disco",subtitle:"Guia completo de gerenciamento de disco no Termux: espaço, uso, limpeza, montagem, quotas, SMART e monitoramento.",difficulty:"iniciante",timeToRead:"20 min",children:[e.jsx("p",{children:"Gerenciar o espaço em disco é fundamental para manter o sistema saudável. Disco cheio causa falhas em serviços, travamentos e perda de dados. Este guia cobre como verificar uso, limpar espaço, montar discos e monitorar a saúde."}),e.jsx("h2",{children:"1. Verificar Uso de Disco"}),e.jsx(o,{title:"Comandos para verificar espaço",code:`# Uso de disco por filesystem
  df -h
  # -h = human readable (GB, MB)
  # -T = mostrar tipo do filesystem
  df -hT

  # Uso por diretório
  du -sh /var/log          # Tamanho total de um diretório
  du -sh /*                # Tamanho de cada diretório na raiz
  du -sh /home/* | sort -rh  # Ordenar por tamanho

  # Top 10 maiores diretórios
  du -ah / 2>/dev/null | sort -rh | head -20

  # Ferramenta interativa (ncdu)
  pkg install -y ncdu
  ncdu /                   # Navegar visualmente
  # Setas para navegar, d para deletar, q para sair

  # Listar discos e partições
  lsblk
  lsblk -f    # Com filesystem e UUID

  # Uso de inodes (número de arquivos)
  df -ih    # Disco cheio de inodes = muitos arquivos pequenos`}),e.jsx("h2",{children:"2. Limpar Espaço em Disco"}),e.jsx(o,{title:"Liberar espaço no Termux",code:`# === PACOTES ===
  # Limpar cache do apt
  pkg clean          # Remove todos os .deb do cache
  pkg autoclean      # Remove .deb de pacotes obsoletos

  # Remover pacotes não usados
  pkg autoclean --purge

  # === LOGS ===
  # Logs antigos do journalctl
  sudo journalctl --disk-usage
  sudo journalctl --vacuum-size=100M   # Limitar a 100MB
  sudo journalctl --vacuum-time=7d     # Manter só 7 dias

  # Logs antigos em /var/log
  sudo find /var/log -name "*.gz" -delete
  sudo find /var/log -name "*.old" -delete

  # === SNAP ===
  # Remover versões antigas de snaps
  snap list --all | awk '/disabled/{print $1, $3}' |     while read name rev; do sudo snap remove "$name" --revision="$rev"; done

  # === CACHE DO USUÁRIO ===
  du -sh ~/.cache
  rm -rf ~/.cache/thumbnails/*

  # === DOCKER ===
  docker system prune -af --volumes

  # === KERNELS ANTIGOS ===
  dpkg -l linux-image-* | grep ^ii
  pkg autoclean --purge

  # === LIXEIRA ===
  rm -rf ~/.local/share/Trash/*

  # === ARQUIVOS TEMPORÁRIOS ===
  sudo rm -rf /tmp/*`}),e.jsx("h2",{children:"3. Montar e Desmontar Discos"}),e.jsx(o,{title:"Montar discos e partições",code:`# Montar disco/partição
  sudo mkdir -p /mnt/dados
  sudo mount /dev/sdb1 /mnt/dados

  # Montar com opções
  sudo mount -o rw,noexec /dev/sdb1 /mnt/dados
  # rw = leitura e escrita
  # ro = somente leitura
  # noexec = não permitir execução de programas
  # nosuid = ignorar setuid

  # Montar pendrive
  # Geralmente monta automaticamente no desktop
  # Manual:
  sudo mount /dev/sdc1 /mnt/pendrive

  # Montar ISO
  sudo mount -o loop imagem.iso /mnt/iso

  # Desmontar
  sudo umount /mnt/dados
  # Se "device is busy":
  sudo umount -l /mnt/dados     # Lazy unmount
  sudo fuser -mv /mnt/dados     # Ver quem está usando

  # Montagem automática (fstab)
  sudo blkid /dev/sdb1    # Obter UUID
  # Adicionar ao /etc/fstab:
  # UUID=xxxx-xxxx  /mnt/dados  ext4  defaults  0  2

  # Testar fstab sem reiniciar
  sudo mount -a`}),e.jsx("h2",{children:"4. Saúde do Disco (SMART)"}),e.jsx(o,{title:"Monitorar saúde do disco",code:`# Instalar smartmontools
  pkg install -y smartmontools

  # Verificar saúde
  sudo smartctl -H /dev/sda
  # PASSED = OK, FAILED = disco morrendo!

  # Informações detalhadas
  sudo smartctl -a /dev/sda

  # Teste curto (poucos minutos)
  sudo smartctl -t short /dev/sda
  # Ver resultado:
  sudo smartctl -l selftest /dev/sda

  # Teste longo (pode levar horas)
  sudo smartctl -t long /dev/sda

  # Monitoramento automático
  sudo systemctl enable smartd
  # Alerta por email se disco começar a falhar`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(o,{title:"Problemas comuns com disco",code:`# Disco cheio — encontrar o que está usando espaço
  du -sh /* 2>/dev/null | sort -rh | head -10
  # Investigar os maiores:
  du -sh /var/* | sort -rh | head

  # "No space left on device" mas df mostra espaço livre
  # Pode ser inodes esgotados:
  df -ih
  # Solução: Encontrar diretórios com muitos arquivos
  find / -xdev -printf '%h
' | sort | uniq -c | sort -rn | head

  # Disco não aparece
  sudo fdisk -l
  dmesg | tail -20

  # Filesystem corrompido
  sudo umount /dev/sdb1
  sudo fsck /dev/sdb1          # Verificar e reparar
  sudo e2fsck -f /dev/sdb1     # Forçar verificação (ext4)

  # Disco lento
  # Verificar SMART:
  sudo smartctl -H /dev/sda
  # Verificar I/O:
  iostat -x 1 5`}),e.jsxs(a,{type:"warning",title:"Monitore seus discos",children:["Discos falham sem aviso. Configure o ",e.jsx("code",{children:"smartd"})," para monitoramento automático e faça backups regulares. Se o SMART mostrar setores realocados crescentes, ",e.jsx("strong",{children:"substitua o disco imediatamente"}),"."]})]})}export{c as default};

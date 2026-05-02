import{j as o}from"./index-DllpmZ7S.js";import{P as e}from"./PageContainer-D5o1LrsX.js";import{C as s}from"./CodeBlock-BCO78Zke.js";import{I as d}from"./InfoBox-StGQOtUJ.js";import"./house-CLqZi7qQ.js";import"./proxy-Xil2K0n2.js";function m(){return o.jsxs(e,{title:"LVM — Gerenciamento de Volumes Lógicos",subtitle:"Guia completo de LVM no Ubuntu: criar, redimensionar, snapshots, migrar dados entre discos e gerenciar armazenamento flexível.",difficulty:"avancado",timeToRead:"30 min",children:[o.jsxs("p",{children:["O ",o.jsx("strong",{children:"LVM"})," (Logical Volume Manager) adiciona uma camada de abstração entre discos físicos e sistemas de arquivos. Com LVM, você pode redimensionar partições sem desmontar, combinar múltiplos discos em um único volume, criar snapshots e migrar dados entre discos — tudo sem parar o sistema."]}),o.jsx("h2",{children:"Conceitos do LVM"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"PV (Physical Volume)"})," — Disco ou partição física preparada para LVM"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"VG (Volume Group)"})," — Pool de armazenamento formado por um ou mais PVs"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"LV (Logical Volume)"}),' — "Partição virtual" criada dentro de um VG']})]}),o.jsx("h2",{children:"1. Criar Infraestrutura LVM"}),o.jsx(s,{title:"Configurar LVM do zero",code:`# Instalar ferramentas LVM
  sudo apt install -y lvm2

  # Passo 1: Criar Physical Volumes (PV)
  sudo pvcreate /dev/sdb
  sudo pvcreate /dev/sdc
  # Saída: Physical volume "/dev/sdb" successfully created.

  # Ver PVs
  sudo pvs
  sudo pvdisplay

  # Passo 2: Criar Volume Group (VG)
  sudo vgcreate meu-vg /dev/sdb /dev/sdc
  # Combina os dois discos em um único pool

  # Ver VGs
  sudo vgs
  sudo vgdisplay meu-vg

  # Passo 3: Criar Logical Volumes (LV)
  sudo lvcreate -L 100G -n dados meu-vg        # 100GB
  sudo lvcreate -L 50G -n backup meu-vg        # 50GB
  sudo lvcreate -l 100%FREE -n logs meu-vg     # Resto do espaço

  # -L = tamanho absoluto
  # -l = tamanho relativo (100%FREE = todo espaço livre)

  # Ver LVs
  sudo lvs
  sudo lvdisplay

  # Passo 4: Formatar e montar
  sudo mkfs.ext4 /dev/meu-vg/dados
  sudo mkfs.ext4 /dev/meu-vg/backup
  sudo mkfs.ext4 /dev/meu-vg/logs

  sudo mkdir -p /mnt/{dados,backup,logs}
  sudo mount /dev/meu-vg/dados /mnt/dados
  sudo mount /dev/meu-vg/backup /mnt/backup
  sudo mount /dev/meu-vg/logs /mnt/logs

  # Adicionar ao fstab
  echo '/dev/meu-vg/dados  /mnt/dados  ext4  defaults  0  2' | sudo tee -a /etc/fstab`}),o.jsx("h2",{children:"2. Redimensionar Volumes"}),o.jsx(s,{title:"Expandir e encolher volumes lógicos",code:`# === EXPANDIR (mais comum) ===
  # Expandir LV + filesystem em um comando
  sudo lvextend -L +50G /dev/meu-vg/dados --resizefs
  # Adiciona 50GB e redimensiona o filesystem automaticamente

  # Expandir para usar todo espaço livre
  sudo lvextend -l +100%FREE /dev/meu-vg/dados --resizefs

  # Expandir para tamanho específico
  sudo lvextend -L 200G /dev/meu-vg/dados --resizefs

  # === ENCOLHER (cuidado!) ===
  # ATENÇÃO: Sempre faça backup antes de encolher!
  # Ext4 permite encolher, XFS NÃO permite
  sudo umount /mnt/dados
  sudo e2fsck -f /dev/meu-vg/dados
  sudo lvreduce -L 80G /dev/meu-vg/dados --resizefs
  sudo mount /dev/meu-vg/dados /mnt/dados

  # === ADICIONAR DISCO AO VG ===
  # Novo disco adicionado ao servidor
  sudo pvcreate /dev/sdd
  sudo vgextend meu-vg /dev/sdd
  # Agora o VG tem mais espaço!
  sudo lvextend -l +100%FREE /dev/meu-vg/dados --resizefs`}),o.jsx("h2",{children:"3. Snapshots LVM"}),o.jsx(s,{title:"Criar e gerenciar snapshots",code:`# Criar snapshot (captura o estado atual)
  sudo lvcreate -L 10G -s -n dados-snap /dev/meu-vg/dados
  # -s = snapshot
  # -L 10G = espaço para armazenar mudanças (não o tamanho do volume)

  # Listar snapshots
  sudo lvs

  # Montar snapshot (somente leitura, para backup)
  sudo mkdir /mnt/snap
  sudo mount -o ro /dev/meu-vg/dados-snap /mnt/snap
  # Fazer backup do snapshot:
  tar czf backup.tar.gz /mnt/snap/
  sudo umount /mnt/snap

  # Restaurar snapshot (reverter para o estado capturado)
  # CUIDADO: Isso reverte TODAS as mudanças!
  sudo umount /mnt/dados
  sudo lvconvert --merge /dev/meu-vg/dados-snap
  sudo mount /dev/meu-vg/dados /mnt/dados

  # Remover snapshot (sem restaurar)
  sudo lvremove /dev/meu-vg/dados-snap`}),o.jsx("h2",{children:"4. Migrar Dados Entre Discos"}),o.jsx(s,{title:"Mover dados de um disco para outro sem downtime",code:`# O LVM pode migrar dados entre PVs sem desmontar!

  # Situação: Trocar /dev/sdb (antigo) por /dev/sdd (novo)

  # 1. Adicionar novo disco ao VG
  sudo pvcreate /dev/sdd
  sudo vgextend meu-vg /dev/sdd

  # 2. Migrar dados do disco antigo para o novo
  sudo pvmove /dev/sdb /dev/sdd
  # Isso move todos os dados de sdb para sdd
  # O sistema continua funcionando durante a migração!

  # 3. Remover o disco antigo do VG
  sudo vgreduce meu-vg /dev/sdb
  sudo pvremove /dev/sdb
  # Agora pode remover fisicamente o disco antigo`}),o.jsx("h2",{children:"Troubleshooting"}),o.jsx(s,{title:"Problemas comuns com LVM",code:`# VG não aparece após reboot
  sudo vgchange -ay
  # Ativa todos os VGs

  # Disco LVM de outro computador
  sudo pvscan
  sudo vgscan
  sudo lvscan
  sudo vgchange -ay

  # Snapshot cheio (100% usado)
  # O snapshot fica inválido! Remova-o:
  sudo lvremove /dev/meu-vg/dados-snap
  # Crie um novo com mais espaço

  # Verificar integridade
  sudo pvck /dev/sdb
  sudo vgck meu-vg

  # Remover LVM completamente
  sudo umount /mnt/dados
  sudo lvremove /dev/meu-vg/dados
  sudo vgremove meu-vg
  sudo pvremove /dev/sdb

  # Ver estrutura completa
  sudo lsblk
  sudo pvs && sudo vgs && sudo lvs`}),o.jsxs(d,{type:"info",title:"Quando usar LVM?",children:["Use LVM em ",o.jsx("strong",{children:"servidores"})," (redimensionar sem downtime), quando tem",o.jsx("strong",{children:"múltiplos discos"})," (combinar em um pool), e quando precisa de",o.jsx("strong",{children:"snapshots"}),". Para desktops simples com um único SSD, partições tradicionais são suficientes."]})]})}export{m as default};

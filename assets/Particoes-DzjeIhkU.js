import{j as e}from"./index-d-w5ROEn.js";import{P as a}from"./PageContainer-t8f2nTRw.js";import{C as s}from"./CodeBlock-D742nO-w.js";import{I as o}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function m(){return e.jsxs(a,{title:"Partições e Sistemas de Arquivos",subtitle:"Guia completo de particionamento no Termux: fdisk, parted, gdisk, criar/redimensionar partições, GPT vs MBR, ext4, Btrfs e XFS.",difficulty:"intermediario",timeToRead:"30 min",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Particionamento"})," é o processo de dividir um disco em seções independentes, cada uma com seu próprio sistema de arquivos. Entender partições é essencial para instalar o Termux, configurar dual boot, gerenciar discos adicionais e otimizar o armazenamento do servidor."]}),e.jsx("h2",{children:"1. Conceitos Fundamentais"}),e.jsx(s,{title:"Tabelas de partição e sistemas de arquivos",code:`# === TABELAS DE PARTIÇÃO ===
  # MBR (Master Boot Record) — antigo
  # - Máximo 4 partições primárias
  # - Limite de 2TB por disco
  # - Compatível com BIOS legado
  # - Pode usar partições estendidas + lógicas para ter mais de 4

  # GPT (GUID Partition Table) — moderno
  # - Até 128 partições
  # - Suporta discos maiores que 2TB
  # - Necessário para UEFI
  # - Mais resistente a corrupção (backup do cabeçalho)

  # === SISTEMAS DE ARQUIVOS ===
  # ext4     → padrão do Termux, estável, maduro
  # Btrfs    → moderno, snapshots, compressão, CoW
  # XFS      → ótimo para arquivos grandes, servers
  # NTFS     → Windows (suporte via ntfs-3g no Linux)
  # FAT32    → universal, limite 4GB por arquivo
  # exFAT   → FAT sem limite de 4GB, pendrives
  # swap     → memória virtual (troca)

  # Verificar discos e partições
  lsblk
  # Saída:
  # NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
  # sda      8:0    0  500G  0 disk
  # ├─sda1   8:1    0  512M  0 part /boot/efi
  # ├─sda2   8:2    0  460G  0 part /
  # └─sda3   8:3    0 39.5G  0 part [SWAP]
  # sdb      8:16   0    1T  0 disk

  # Ver detalhes com fdisk
  sudo fdisk -l
  sudo fdisk -l /dev/sda

  # Ver UUIDs e tipos
  sudo blkid

  # Ver uso de espaço
  df -hT   # -T mostra o tipo de filesystem`}),e.jsx("h2",{children:"2. Criar Partições com fdisk"}),e.jsx(s,{title:"Particionar disco com fdisk",code:`# fdisk é interativo — funciona para MBR e GPT
  sudo fdisk /dev/sdb

  # Comandos dentro do fdisk:
  # m     → ajuda (lista todos os comandos)
  # p     → imprimir tabela de partições atual
  # g     → criar nova tabela GPT (apaga tudo!)
  # o     → criar nova tabela MBR (apaga tudo!)
  # n     → criar nova partição
  # d     → deletar partição
  # t     → mudar tipo da partição
  # w     → salvar e sair (ESCREVE no disco)
  # q     → sair sem salvar

  # Exemplo: Criar uma partição GPT ocupando o disco inteiro
  # 1. sudo fdisk /dev/sdb
  # 2. g (criar tabela GPT)
  # 3. n (nova partição)
  # 4. Enter (número 1)
  # 5. Enter (primeiro setor padrão)
  # 6. Enter (último setor padrão = disco inteiro)
  # 7. w (salvar)

  # Criar duas partições (50% cada)
  # 1. g
  # 2. n → 1 → Enter → +250G
  # 3. n → 2 → Enter → Enter
  # 4. w

  # Após particionar, formatar:
  sudo mkfs.ext4 /dev/sdb1
  sudo mkfs.xfs /dev/sdb2

  # Montar
  sudo mkdir -p /mnt/dados
  sudo mount /dev/sdb1 /mnt/dados`}),e.jsx("h2",{children:"3. Criar Partições com parted"}),e.jsx(s,{title:"Particionar disco com parted (mais poderoso)",code:`# parted pode ser usado interativamente ou com comandos diretos
  # Vantagem: suporta redimensionamento e alinhamento

  # Modo interativo
  sudo parted /dev/sdb

  # Criar tabela GPT
  sudo parted /dev/sdb mklabel gpt

  # Criar partição ocupando o disco inteiro
  sudo parted /dev/sdb mkpart primary ext4 0% 100%

  # Criar duas partições
  sudo parted /dev/sdb mkpart dados ext4 0% 50%
  sudo parted /dev/sdb mkpart backup ext4 50% 100%

  # Ver partições
  sudo parted /dev/sdb print
  # Saída:
  # Number  Start   End    Size   File system  Name    Flags
  #  1      1049kB  250GB  250GB  ext4         dados
  #  2      250GB   500GB  250GB  ext4         backup

  # Redimensionar partição (parted pode fazer isso!)
  # ATENÇÃO: Faça backup antes!
  sudo parted /dev/sdb resizepart 1 300GB

  # Depois redimensione o filesystem:
  sudo resize2fs /dev/sdb1   # Para ext4
  sudo xfs_growfs /mnt/dados # Para XFS (precisa estar montado)

  # Deletar partição
  sudo parted /dev/sdb rm 2

  # Alinhar partições para SSD (importante para performance)
  sudo parted /dev/sdb mkpart primary ext4 1MiB 100%
  # Usar MiB ao invés de % garante alinhamento`}),e.jsx("h2",{children:"4. Formatar Partições"}),e.jsx(s,{title:"Criar sistemas de arquivos",code:`# ext4 (padrão, recomendado para a maioria dos usos)
  sudo mkfs.ext4 /dev/sdb1
  sudo mkfs.ext4 -L "Dados" /dev/sdb1    # Com label

  # Btrfs (snapshots, compressão, RAID)
  sudo mkfs.btrfs /dev/sdb1
  sudo mkfs.btrfs -L "BtrfsDisco" /dev/sdb1

  # XFS (ótimo para arquivos grandes, servidores)
  sudo mkfs.xfs /dev/sdb1

  # FAT32 (pendrives, compatibilidade universal)
  sudo mkfs.vfat -F 32 /dev/sdb1

  # exFAT (pendrives > 4GB)
  sudo mkfs.exfat /dev/sdb1

  # NTFS (compatibilidade com Windows)
  sudo mkfs.ntfs -f /dev/sdb1    # -f = formatação rápida

  # Swap
  sudo mkswap /dev/sdb1
  sudo swapon /dev/sdb1

  # Ver informações do filesystem
  sudo file -s /dev/sdb1
  sudo dumpe2fs /dev/sdb1 | head -30   # Para ext4
  sudo btrfs filesystem show           # Para Btrfs`}),e.jsx("h2",{children:"5. Gerenciar Partições Existentes"}),e.jsx(s,{title:"Redimensionar, verificar e reparar",code:`# === VERIFICAR E REPARAR ===
  # ext4 (partição deve estar DESMONTADA)
  sudo umount /dev/sdb1
  sudo e2fsck -f /dev/sdb1

  # XFS (pode verificar montado)
  sudo xfs_repair /dev/sdb1

  # Btrfs
  sudo btrfs check /dev/sdb1

  # === REDIMENSIONAR ===
  # SEMPRE faça backup antes!

  # Expandir ext4 (após aumentar a partição)
  sudo resize2fs /dev/sdb1           # Usa todo o espaço disponível
  sudo resize2fs /dev/sdb1 200G      # Tamanho específico

  # Expandir XFS (deve estar montado)
  sudo xfs_growfs /mnt/dados

  # Encolher ext4 (DESMONTADO, ext4 only)
  sudo umount /dev/sdb1
  sudo e2fsck -f /dev/sdb1
  sudo resize2fs /dev/sdb1 100G      # Encolher para 100GB
  # Depois encolher a partição com fdisk/parted

  # === FERRAMENTAS GRÁFICAS ===
  # GParted (editor gráfico de partições)
  pkg install -y gparted
  sudo gparted
  # Interface visual para criar, redimensionar, mover partições
  # Recomendado para iniciantes`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(s,{title:"Problemas comuns com partições",code:`# Erro: "Can't have a partition outside the disk!"
  # Causa: Partição ultrapassa o tamanho do disco
  # Solução: Usar parted com alinhamento correto

  # Disco não aparece (lsblk não mostra)
  # Verificar no dmesg:
  dmesg | tail -20
  # Verificar BIOS/UEFI

  # Partição corrompida
  sudo e2fsck -fy /dev/sdb1    # -y = responder yes para tudo

  # "Structure needs cleaning"
  sudo xfs_repair /dev/sdb1

  # Não consigo desmontar (device is busy)
  sudo fuser -mv /mnt/dados     # Ver quem está usando
  sudo umount -l /mnt/dados     # Lazy unmount (desmonta quando possível)
  # Ou fechar os processos e desmontar normalmente

  # Recuperar partição deletada acidentalmente
  pkg install -y testdisk
  sudo testdisk /dev/sdb
  # TestDisk pode recuperar partições deletadas!`}),e.jsxs(o,{type:"info",title:"Layout de partições recomendado",children:["Para desktop: partição ",e.jsx("code",{children:"/"})," (root, 50-100GB), ",e.jsx("code",{children:"/home"}),"(restante), swap (RAM×1 ou 4-8GB). Para servidor: ",e.jsx("code",{children:"/"})," (20-50GB),",e.jsx("code",{children:"/var"})," (logs e dados), ",e.jsx("code",{children:"/home"})," (se aplicável), swap. Separar ",e.jsx("code",{children:"/home"})," permite reinstalar o sistema sem perder dados pessoais."]})]})}export{m as default};

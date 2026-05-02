import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function LVM() {
    return (
      <PageContainer
        title="LVM — Gerenciamento de Volumes Lógicos"
        subtitle="Guia completo de LVM no Ubuntu: criar, redimensionar, snapshots, migrar dados entre discos e gerenciar armazenamento flexível."
        difficulty="avancado"
        timeToRead="30 min"
      >
        <p>
          O <strong>LVM</strong> (Logical Volume Manager) adiciona uma camada de abstração
          entre discos físicos e sistemas de arquivos. Com LVM, você pode redimensionar
          partições sem desmontar, combinar múltiplos discos em um único volume, criar
          snapshots e migrar dados entre discos — tudo sem parar o sistema.
        </p>

        <h2>Conceitos do LVM</h2>
        <ul>
          <li><strong>PV (Physical Volume)</strong> — Disco ou partição física preparada para LVM</li>
          <li><strong>VG (Volume Group)</strong> — Pool de armazenamento formado por um ou mais PVs</li>
          <li><strong>LV (Logical Volume)</strong> — "Partição virtual" criada dentro de um VG</li>
        </ul>

        <h2>1. Criar Infraestrutura LVM</h2>
        <CodeBlock
          title="Configurar LVM do zero"
          code={`# Instalar ferramentas LVM
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
  echo '/dev/meu-vg/dados  /mnt/dados  ext4  defaults  0  2' | sudo tee -a /etc/fstab`}
        />

        <h2>2. Redimensionar Volumes</h2>
        <CodeBlock
          title="Expandir e encolher volumes lógicos"
          code={`# === EXPANDIR (mais comum) ===
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
  sudo lvextend -l +100%FREE /dev/meu-vg/dados --resizefs`}
        />

        <h2>3. Snapshots LVM</h2>
        <CodeBlock
          title="Criar e gerenciar snapshots"
          code={`# Criar snapshot (captura o estado atual)
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
  sudo lvremove /dev/meu-vg/dados-snap`}
        />

        <h2>4. Migrar Dados Entre Discos</h2>
        <CodeBlock
          title="Mover dados de um disco para outro sem downtime"
          code={`# O LVM pode migrar dados entre PVs sem desmontar!

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
  # Agora pode remover fisicamente o disco antigo`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com LVM"
          code={`# VG não aparece após reboot
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
  sudo pvs && sudo vgs && sudo lvs`}
        />

        <AlertBox type="info" title="Quando usar LVM?">
          Use LVM em <strong>servidores</strong> (redimensionar sem downtime), quando tem
          <strong>múltiplos discos</strong> (combinar em um pool), e quando precisa de
          <strong>snapshots</strong>. Para desktops simples com um único SSD, partições
          tradicionais são suficientes.
        </AlertBox>
      </PageContainer>
    );
  }
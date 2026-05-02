import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Fstab() {
    return (
      <PageContainer
        title="fstab — Montagem de Sistemas de Arquivos"
        subtitle="Guia completo do /etc/fstab no Ubuntu: montar partições automaticamente, opções de montagem, UUID, swap e dispositivos removíveis."
        difficulty="intermediario"
        timeToRead="25 min"
      >
        <p>
          O arquivo <strong>/etc/fstab</strong> (File System Table) define quais sistemas de
          arquivos são montados automaticamente no boot do sistema. Cada linha descreve uma
          partição, disco ou recurso de rede e como ele deve ser montado — ponto de montagem,
          tipo de filesystem, opções e prioridade.
        </p>

        <h2>1. Entender o fstab</h2>
        <CodeBlock
          title="Estrutura do /etc/fstab"
          code={`# Ver o fstab atual
  cat /etc/fstab

  # Formato de cada linha:
  # <dispositivo>  <ponto_montagem>  <tipo>  <opções>  <dump>  <pass>

  # Exemplo típico:
  # UUID=a1b2c3d4-e5f6  /           ext4  errors=remount-ro  0  1
  # UUID=f6e5d4c3-b2a1  /home       ext4  defaults           0  2
  # UUID=9876-ABCD       /boot/efi   vfat  umask=0077         0  1
  # /dev/sdb1            /dados      ext4  defaults,nofail    0  2
  # //servidor/share     /mnt/share  cifs  credentials=...    0  0

  # Explicação de cada campo:
  # 1. Dispositivo: UUID=xxx, /dev/sdXN, LABEL=xxx, ou recurso remoto
  # 2. Ponto de montagem: onde será montado (/mnt/dados, /home, etc.)
  # 3. Tipo: ext4, xfs, btrfs, ntfs, vfat, cifs, nfs, swap
  # 4. Opções: defaults, noatime, nofail, ro, rw, etc.
  # 5. Dump: 0 = não fazer dump (backup), 1 = fazer
  # 6. Pass: ordem do fsck (0=skip, 1=root, 2=outros)

  # Descobrir UUID de um dispositivo
  sudo blkid
  # Saída: /dev/sda1: UUID="a1b2c3d4-e5f6" TYPE="ext4" PARTUUID="xxx"
  sudo blkid /dev/sdb1

  # Listar partições montadas
  lsblk
  df -h
  mount | column -t`}
        />

        <AlertBox type="danger" title="Cuidado ao editar o fstab">
          Um erro no fstab pode impedir o sistema de iniciar. Sempre faça backup antes de
          editar: <code>sudo cp /etc/fstab /etc/fstab.bak</code>. Após editar, teste com
          <code>sudo mount -a</code> antes de reiniciar. Use <code>nofail</code> em discos
          removíveis para evitar travamento no boot se o disco não estiver conectado.
        </AlertBox>

        <h2>2. Opções de Montagem</h2>
        <CodeBlock
          title="Opções comuns do fstab"
          code={`# defaults = rw,suid,dev,exec,auto,nouser,async
  # É equivalente a usar todas as opções padrão

  # Opções comuns:
  # rw         → leitura e escrita (padrão)
  # ro         → somente leitura
  # auto       → montar automaticamente no boot
  # noauto     → NÃO montar no boot (montar manualmente)
  # exec       → permitir execução de binários
  # noexec     → proibir execução (segurança)
  # suid       → permitir SUID/SGID
  # nosuid     → desabilitar SUID/SGID (segurança)
  # noatime    → não atualizar access time (melhora performance)
  # nodiratime → não atualizar access time de diretórios
  # nofail     → não parar o boot se o dispositivo falhar
  # user       → permitir que usuários comuns montem
  # nouser     → só root pode montar (padrão)
  # discard    → habilitar TRIM para SSDs
  # _netdev    → esperar rede antes de montar (para NFS/CIFS)

  # === EXEMPLOS PRÁTICOS ===

  # Partição de dados ext4 (performance otimizada)
  UUID=xxx  /dados  ext4  defaults,noatime  0  2

  # SSD com TRIM
  UUID=xxx  /  ext4  errors=remount-ro,discard,noatime  0  1

  # HD externo (pode não estar sempre conectado)
  UUID=xxx  /mnt/externo  ext4  defaults,nofail,noatime,x-systemd.device-timeout=10  0  2

  # Partição NTFS (compatível com Windows)
  UUID=xxx  /mnt/windows  ntfs-3g  defaults,uid=1000,gid=1000,umask=0022  0  0

  # Partição FAT32 (pendrive, EFI)
  UUID=XXXX-YYYY  /boot/efi  vfat  umask=0077  0  1

  # Compartilhamento NFS
  servidor:/dados  /mnt/nfs  nfs  defaults,_netdev  0  0

  # Compartilhamento CIFS/Samba
  //servidor/share  /mnt/samba  cifs  credentials=/etc/samba/.cred,uid=1000,_netdev  0  0

  # Swap
  UUID=xxx  none  swap  sw  0  0

  # tmpfs (RAM disk — extremamente rápido)
  tmpfs  /tmp  tmpfs  defaults,size=2G,noatime,mode=1777  0  0`}
        />

        <h2>3. Adicionar uma Partição ao fstab</h2>
        <CodeBlock
          title="Passo a passo para montar uma partição"
          code={`# Passo 1: Identificar a partição
  lsblk
  sudo blkid

  # Passo 2: Criar o ponto de montagem
  sudo mkdir -p /mnt/dados

  # Passo 3: Descobrir o UUID
  sudo blkid /dev/sdb1
  # Copie o UUID (ex: UUID="a1b2c3d4-e5f6-7890-abcd-ef1234567890")

  # Passo 4: Fazer backup do fstab
  sudo cp /etc/fstab /etc/fstab.bak

  # Passo 5: Adicionar a linha ao fstab
  echo 'UUID=a1b2c3d4-e5f6-7890-abcd-ef1234567890  /mnt/dados  ext4  defaults,noatime,nofail  0  2' | sudo tee -a /etc/fstab

  # Passo 6: Testar (sem reiniciar!)
  sudo mount -a
  # Se não mostrar erro, está correto!

  # Passo 7: Verificar
  df -h /mnt/dados
  ls /mnt/dados

  # Passo 8: Ajustar permissões
  sudo chown $USER:$USER /mnt/dados
  # Ou para grupo específico:
  sudo chown -R :dados-grupo /mnt/dados
  sudo chmod 775 /mnt/dados`}
        />

        <h2>4. Swap no fstab</h2>
        <CodeBlock
          title="Configurar swap"
          code={`# Ver swap atual
  swapon --show
  free -h

  # === Swap via partição ===
  # UUID=xxx  none  swap  sw  0  0

  # === Criar swap via arquivo (mais flexível) ===
  # Criar arquivo de swap (4GB)
  sudo fallocate -l 4G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile

  # Adicionar ao fstab para persistir
  echo '/swapfile  none  swap  sw  0  0' | sudo tee -a /etc/fstab

  # Ajustar swappiness (quão agressivamente usar swap)
  cat /proc/sys/vm/swappiness    # Padrão: 60
  # Para desktop (pouco swap): 10
  # Para servidor: 60
  echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p

  # Remover swap
  sudo swapoff /swapfile
  # Remover a linha do /etc/fstab
  sudo rm /swapfile`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com fstab"
          code={`# Sistema não inicia (erro no fstab)
  # 1. O sistema pode entrar em modo de emergência
  # 2. Digite a senha de root
  # 3. Edite o fstab:
  nano /etc/fstab
  # 4. Corrija ou comente (#) a linha problemática
  # 5. Reinicie: reboot

  # Ou restaurar o backup:
  cp /etc/fstab.bak /etc/fstab

  # mount -a dá erro
  # Verificar a linha com problema:
  sudo mount -a -v    # Verbose — mostra o que está fazendo

  # "wrong fs type, bad option"
  # Verificar o tipo de filesystem:
  sudo blkid /dev/sdb1
  # Instalar suporte ao filesystem:
  sudo apt install -y ntfs-3g    # Para NTFS
  sudo apt install -y cifs-utils # Para CIFS/Samba
  sudo apt install -y nfs-common # Para NFS

  # UUID mudou (após formatar ou trocar disco)
  # Atualizar o UUID no fstab:
  sudo blkid    # Pegar novo UUID
  sudo nano /etc/fstab

  # Disco removível trava o boot
  # Adicionar nofail e timeout:
  # UUID=xxx  /mnt/externo  ext4  defaults,nofail,x-systemd.device-timeout=5  0  2`}
        />

        <AlertBox type="info" title="UUID vs /dev/sdX">
          Sempre use <code>UUID=</code> no fstab ao invés de <code>/dev/sda1</code>.
          Os nomes <code>/dev/sdX</code> podem mudar quando você adiciona/remove discos,
          mas o UUID é único e permanente. Use <code>sudo blkid</code> para descobrir UUIDs.
        </AlertBox>
      </PageContainer>
    );
  }
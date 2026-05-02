import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Disco() {
    return (
      <PageContainer
        title="Gerenciamento de Disco"
        subtitle="Guia completo de gerenciamento de disco no Ubuntu: espaço, uso, limpeza, montagem, quotas, SMART e monitoramento."
        difficulty="iniciante"
        timeToRead="20 min"
      >
        <p>
          Gerenciar o espaço em disco é fundamental para manter o sistema saudável.
          Disco cheio causa falhas em serviços, travamentos e perda de dados. Este guia
          cobre como verificar uso, limpar espaço, montar discos e monitorar a saúde.
        </p>

        <h2>1. Verificar Uso de Disco</h2>
        <CodeBlock
          title="Comandos para verificar espaço"
          code={`# Uso de disco por filesystem
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
  sudo apt install -y ncdu
  ncdu /                   # Navegar visualmente
  # Setas para navegar, d para deletar, q para sair

  # Listar discos e partições
  lsblk
  lsblk -f    # Com filesystem e UUID

  # Uso de inodes (número de arquivos)
  df -ih    # Disco cheio de inodes = muitos arquivos pequenos`}
        />

        <h2>2. Limpar Espaço em Disco</h2>
        <CodeBlock
          title="Liberar espaço no Ubuntu"
          code={`# === PACOTES ===
  # Limpar cache do apt
  sudo apt clean          # Remove todos os .deb do cache
  sudo apt autoclean      # Remove .deb de pacotes obsoletos

  # Remover pacotes não usados
  sudo apt autoremove --purge

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
  snap list --all | awk '/disabled/{print $1, $3}' | \
    while read name rev; do sudo snap remove "$name" --revision="$rev"; done

  # === CACHE DO USUÁRIO ===
  du -sh ~/.cache
  rm -rf ~/.cache/thumbnails/*

  # === DOCKER ===
  docker system prune -af --volumes

  # === KERNELS ANTIGOS ===
  dpkg -l linux-image-* | grep ^ii
  sudo apt autoremove --purge

  # === LIXEIRA ===
  rm -rf ~/.local/share/Trash/*

  # === ARQUIVOS TEMPORÁRIOS ===
  sudo rm -rf /tmp/*`}
        />

        <h2>3. Montar e Desmontar Discos</h2>
        <CodeBlock
          title="Montar discos e partições"
          code={`# Montar disco/partição
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
  sudo mount -a`}
        />

        <h2>4. Saúde do Disco (SMART)</h2>
        <CodeBlock
          title="Monitorar saúde do disco"
          code={`# Instalar smartmontools
  sudo apt install -y smartmontools

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
  # Alerta por email se disco começar a falhar`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com disco"
          code={`# Disco cheio — encontrar o que está usando espaço
  du -sh /* 2>/dev/null | sort -rh | head -10
  # Investigar os maiores:
  du -sh /var/* | sort -rh | head

  # "No space left on device" mas df mostra espaço livre
  # Pode ser inodes esgotados:
  df -ih
  # Solução: Encontrar diretórios com muitos arquivos
  find / -xdev -printf '%h\n' | sort | uniq -c | sort -rn | head

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
  iostat -x 1 5`}
        />

        <AlertBox type="warning" title="Monitore seus discos">
          Discos falham sem aviso. Configure o <code>smartd</code> para monitoramento
          automático e faça backups regulares. Se o SMART mostrar setores realocados
          crescentes, <strong>substitua o disco imediatamente</strong>.
        </AlertBox>
      </PageContainer>
    );
  }
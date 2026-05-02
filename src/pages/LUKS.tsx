import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function LUKS() {
    return (
      <PageContainer
        title="LUKS — Criptografia de Disco no Ubuntu"
        subtitle="Guia completo de criptografia de disco com LUKS: criptografar partições, HDs externos, pendrives, gerenciar chaves e recuperação."
        difficulty="avancado"
        timeToRead="30 min"
      >
        <p>
          O <strong>LUKS</strong> (Linux Unified Key Setup) é o padrão de criptografia de disco
          no Linux. Ele protege seus dados criptografando partições inteiras — se alguém roubar
          seu notebook ou HD, não consegue ler absolutamente nada sem a senha. O LUKS usa
          AES-256 por padrão, o mesmo algoritmo usado por governos e militares.
        </p>

        <h2>Quando Usar LUKS?</h2>
        <ul>
          <li><strong>Notebook/laptop</strong> — Se for roubado, seus dados ficam protegidos</li>
          <li><strong>HD externo/pendrive</strong> — Dados sensíveis em mídia portátil</li>
          <li><strong>Servidores</strong> — Proteção de dados em repouso (at rest)</li>
          <li><strong>Compliance</strong> — Exigência de regulamentos como LGPD, GDPR, HIPAA</li>
        </ul>

        <AlertBox type="danger" title="Backup antes de criptografar">
          A criptografia de uma partição existente <strong>apaga todos os dados</strong>.
          Sempre faça backup completo antes de criptografar. Se você perder a senha
          e as chaves de recuperação, os dados são irrecuperáveis.
        </AlertBox>

        <h2>1. Criptografar uma Partição com LUKS</h2>
        <CodeBlock
          title="Criar partição criptografada"
          code={`# Instalar ferramentas de criptografia
  sudo apt install -y cryptsetup

  # Identificar o disco/partição a ser criptografado
  lsblk
  # Exemplo: /dev/sdb1 é a partição que queremos criptografar
  # ATENÇÃO: Todos os dados serão perdidos!

  # Passo 1: Inicializar a criptografia LUKS
  sudo cryptsetup luksFormat /dev/sdb1
  # Vai pedir confirmação (digite YES em maiúsculas)
  # Depois pede a senha de criptografia
  # ESCOLHA UMA SENHA FORTE — ela protege TODOS os seus dados

  # Opções avançadas de criptografia
  sudo cryptsetup luksFormat --type luks2 --cipher aes-xts-plain64 \
    --key-size 512 --hash sha512 --iter-time 5000 /dev/sdb1
  # --type luks2       → formato mais moderno (padrão no Ubuntu 22.04+)
  # --cipher           → algoritmo de criptografia
  # --key-size 512     → AES-256 em modo XTS (512/2 = 256 bits efetivos)
  # --hash sha512      → hash para derivação de chave
  # --iter-time 5000   → tempo em ms para derivação (mais = mais seguro)

  # Passo 2: Abrir (desbloquear) a partição criptografada
  sudo cryptsetup open /dev/sdb1 dados-criptografados
  # "dados-criptografados" é o nome que você escolhe
  # Cria o dispositivo em /dev/mapper/dados-criptografados

  # Passo 3: Criar sistema de arquivos
  sudo mkfs.ext4 /dev/mapper/dados-criptografados
  # Ou: sudo mkfs.xfs /dev/mapper/dados-criptografados

  # Passo 4: Montar
  sudo mkdir -p /mnt/dados
  sudo mount /dev/mapper/dados-criptografados /mnt/dados

  # Passo 5: Usar normalmente
  sudo chown $USER:$USER /mnt/dados
  echo "Dados seguros!" > /mnt/dados/teste.txt

  # Desmontar e fechar (bloquear)
  sudo umount /mnt/dados
  sudo cryptsetup close dados-criptografados`}
        />

        <h2>2. Criptografar HD Externo ou Pendrive</h2>
        <CodeBlock
          title="Criptografar mídia removível"
          code={`# Identificar o dispositivo
  lsblk
  # Exemplo: /dev/sdc é o pendrive, /dev/sdc1 é a partição

  # Método rápido: criptografar a partição inteira
  sudo cryptsetup luksFormat /dev/sdc1
  sudo cryptsetup open /dev/sdc1 pendrive
  sudo mkfs.ext4 /dev/mapper/pendrive
  sudo mount /dev/mapper/pendrive /mnt/pendrive

  # No GNOME, o pendrive criptografado aparece automaticamente
  # Ao conectar, uma janela pede a senha para desbloquear

  # Para desmontar via terminal:
  sudo umount /mnt/pendrive
  sudo cryptsetup close pendrive

  # Criar partição criptografada com exFAT (compatível com Windows via VeraCrypt)
  # Note: LUKS nativo não é compatível com Windows
  # Para compatibilidade Windows, use VeraCrypt:
  sudo apt install -y veracrypt

  # Verificar informações de uma partição LUKS
  sudo cryptsetup luksDump /dev/sdc1
  # Mostra: versão, cipher, hash, key slots usados, etc.`}
        />

        <h2>3. Montagem Automática no Boot</h2>
        <CodeBlock
          title="Configurar montagem automática com crypttab"
          code={`# Para montar automaticamente no boot, você precisa configurar:
  # 1. /etc/crypttab — mapeia dispositivo criptografado
  # 2. /etc/fstab — monta o sistema de arquivos

  # Passo 1: Descobrir o UUID da partição LUKS
  sudo blkid /dev/sdb1
  # Saída: /dev/sdb1: UUID="a1b2c3d4-e5f6-..." TYPE="crypto_LUKS"

  # Passo 2: Adicionar ao crypttab
  echo 'dados-criptografados UUID=a1b2c3d4-e5f6-... none luks' | sudo tee -a /etc/crypttab
  # "none" = pedir senha no boot
  # Para usar arquivo de chave (sem pedir senha):
  # echo 'dados-criptografados UUID=a1b2c3d4... /etc/keys/dados.key luks' | sudo tee -a /etc/crypttab

  # Passo 3: Adicionar ao fstab
  # Descobrir o UUID do dispositivo mapeado:
  sudo cryptsetup open /dev/sdb1 dados-criptografados
  sudo blkid /dev/mapper/dados-criptografados

  echo '/dev/mapper/dados-criptografados /mnt/dados ext4 defaults 0 2' | sudo tee -a /etc/fstab

  # Passo 4: Testar
  sudo mount -a

  # === USAR ARQUIVO DE CHAVE (sem pedir senha no boot) ===
  # Gerar arquivo de chave aleatório
  sudo mkdir -p /etc/keys
  sudo dd if=/dev/urandom of=/etc/keys/dados.key bs=4096 count=1
  sudo chmod 400 /etc/keys/dados.key

  # Adicionar a chave ao LUKS (além da senha)
  sudo cryptsetup luksAddKey /dev/sdb1 /etc/keys/dados.key

  # No crypttab, usar o arquivo de chave:
  # dados-criptografados UUID=... /etc/keys/dados.key luks`}
        />

        <h2>4. Gerenciar Chaves e Senhas</h2>
        <CodeBlock
          title="Gerenciar key slots do LUKS"
          code={`# O LUKS suporta até 8 key slots (senhas/chaves diferentes)
  # Cada slot pode ter uma senha diferente ou arquivo de chave

  # Ver key slots em uso
  sudo cryptsetup luksDump /dev/sdb1 | grep "Key Slot"
  # Saída:
  # Key Slot 0: ENABLED    ← sua senha principal
  # Key Slot 1: DISABLED
  # ...

  # Adicionar uma nova senha (backup)
  sudo cryptsetup luksAddKey /dev/sdb1
  # Pede a senha atual e depois a nova senha

  # Remover uma senha específica
  sudo cryptsetup luksRemoveKey /dev/sdb1
  # Pede a senha que deseja remover

  # Mudar a senha
  sudo cryptsetup luksChangeKey /dev/sdb1
  # Pede a senha atual e depois a nova

  # Adicionar arquivo de chave como backup
  sudo cryptsetup luksAddKey /dev/sdb1 /caminho/para/chave.key

  # Remover um key slot específico pelo número
  sudo cryptsetup luksKillSlot /dev/sdb1 1
  # Remove o key slot 1

  # IMPORTANTE: Sempre mantenha pelo menos uma senha/chave funcionando!
  # Se remover todos os key slots, os dados ficam IRRECUPERÁVEIS

  # Fazer backup do header LUKS (ESSENCIAL para recuperação)
  sudo cryptsetup luksHeaderBackup /dev/sdb1 --header-backup-file header-backup.img
  # Guarde este arquivo em local seguro!
  # Se o header do disco corromper, este backup permite restaurar

  # Restaurar header de um backup
  sudo cryptsetup luksHeaderRestore /dev/sdb1 --header-backup-file header-backup.img`}
        />

        <AlertBox type="warning" title="Backup do header LUKS">
          O header LUKS contém as chaves mestras criptografadas. Se ele for corrompido
          (bad sector, erro de disco), todos os dados ficam inacessíveis — mesmo com a
          senha correta. <strong>Sempre faça backup do header</strong> após criar ou
          modificar uma partição LUKS.
        </AlertBox>

        <h2>5. Criptografia Completa do Disco (Full Disk Encryption)</h2>
        <CodeBlock
          title="Criptografar o sistema inteiro durante a instalação"
          code={`# A forma mais fácil de ter FDE é durante a instalação do Ubuntu:
  # 1. Na tela de instalação, escolha "Recursos Avançados"
  # 2. Selecione "Use LVM with encryption"
  # 3. Defina a senha de criptografia
  # O instalador configura tudo automaticamente:
  # - /boot não é criptografado (necessário para o GRUB)
  # - Todo o resto (/, /home, swap) fica em LVM criptografado

  # Verificar se o sistema está criptografado
  lsblk
  # Se você ver "crypt" no TYPE, está criptografado:
  # sda           disk
  # ├─sda1        part  /boot/efi
  # ├─sda2        part  /boot
  # └─sda3        part
  #   └─dm_crypt-0 crypt
  #     ├─vg-root  lvm   /
  #     └─vg-swap  lvm   [SWAP]

  # Ver detalhes da criptografia
  sudo cryptsetup status dm_crypt-0
  # cipher:    aes-xts-plain64
  # keysize:   512 bits
  # key location: dm-crypt
  # device:    /dev/sda3

  # Medir impacto na performance
  # A criptografia AES é acelerada por hardware em CPUs modernas
  # Verificar se sua CPU suporta AES-NI:
  grep -o aes /proc/cpuinfo | head -1
  # Se retornar "aes", a criptografia tem impacto mínimo (~1-3%)

  # Benchmark de criptografia
  sudo cryptsetup benchmark
  # Mostra a velocidade de cada algoritmo no seu hardware`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com LUKS"
          code={`# Erro: "No key available with this passphrase"
  # Causa: Senha incorreta ou key slot corrompido
  # Solução: Tentar todas as senhas que você configurou
  # Se nenhuma funcionar e tem backup do header:
  sudo cryptsetup luksHeaderRestore /dev/sdb1 --header-backup-file header-backup.img

  # Erro: "Device /dev/sdb1 is not a valid LUKS device"
  # Causa: Header corrompido ou partição errada
  # Verificar:
  sudo cryptsetup isLuks /dev/sdb1 && echo "É LUKS" || echo "Não é LUKS"

  # Sistema não inicia após criptografia (tela preta no boot)
  # 1. Bootar com USB Live
  # 2. Desbloquear:
  sudo cryptsetup open /dev/sda3 sistema
  # 3. Montar:
  sudo mount /dev/mapper/sistema /mnt
  # 4. Verificar /etc/crypttab e /etc/fstab

  # Performance ruim com criptografia
  # Verificar se AES-NI está ativo:
  grep aes /proc/cpuinfo
  # Verificar o algoritmo usado:
  sudo cryptsetup status nome-do-mapeamento
  # Se não estiver usando aes-xts, considere recriar com esse cipher

  # Expandir partição criptografada
  # 1. Expandir a partição física (com fdisk/parted)
  # 2. Desbloquear se necessário
  sudo cryptsetup open /dev/sdb1 dados
  # 3. Redimensionar o LUKS
  sudo cryptsetup resize dados
  # 4. Redimensionar o sistema de arquivos
  sudo resize2fs /dev/mapper/dados`}
        />
      </PageContainer>
    );
  }
import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Timeshift() {
  return (
    <PageContainer
      title="Backup do $PREFIX"
      subtitle="Estratégia oficial de snapshots no Termux: tar/rsync do $PREFIX, sincronização para nuvem com rclone (Google Drive, Dropbox, S3) e restauração."
      difficulty="iniciante"
      timeToRead="25 min"
    >
      <AlertBox type="info" title="Timeshift não existe no Termux">
        Timeshift depende de <code>rsync + cron</code> ou snapshots Btrfs do <strong>sistema raiz Linux</strong> —
        nada disso existe no Android. O método oficial recomendado pelo wiki do Termux é
        <strong> empacotar o <code>$PREFIX</code> com <code>tar</code></strong> (e opcionalmente o
        <code>$HOME</code>) e mover o arquivo para um local seguro.
      </AlertBox>

      <h2>O que fazer backup</h2>
      <ul>
        <li><code>$PREFIX</code> = <code>/data/data/com.termux/files/usr</code> — pacotes instalados, configs do sistema do Termux.</li>
        <li><code>$HOME</code> = <code>/data/data/com.termux/files/home</code> — seus arquivos, dotfiles, projetos.</li>
        <li>Storage compartilhado (acessível via <code>termux-setup-storage</code>) — onde o <code>.tar</code> é salvo, pois sobrevive à reinstalação do app.</li>
      </ul>

      <AlertBox type="warning" title="O Termux NÃO pode tar dele mesmo enquanto roda">
        Empacotar o <code>$PREFIX</code> de dentro do próprio Termux trava (você está modificando
        arquivos abertos do <code>tar</code>). O backup correto se faz pelo app
        <strong> Termux-only via ADB</strong> ou usando o script oficial <code>termux-backup</code>
        do pacote <code>termux-tools</code>. Veja exemplos abaixo.
      </AlertBox>

      <h2>1. Preparar o storage</h2>
      <CodeBlock
        title="Liberar acesso ao storage compartilhado"
        code={`# Cria os links ~/storage/* para a memória interna do Android
termux-setup-storage

# Estrutura criada:
# ~/storage/shared      -> /sdcard (memória interna)
# ~/storage/downloads   -> /sdcard/Download
# ~/storage/dcim        -> /sdcard/DCIM
# ~/storage/movies      -> /sdcard/Movies

mkdir -p ~/storage/shared/TermuxBackup`}
      />

      <h2>2. Backup com tar (método oficial)</h2>
      <CodeBlock
        title="termux-backup do pacote termux-tools"
        code={`# Garanta o pacote
pkg install termux-tools

# Cria backup completo (PREFIX + HOME) em um .tar.xz
termux-backup ~/storage/shared/TermuxBackup/termux-$(date +%F).tar.xz

# O comando para a maioria dos serviços, fecha sessões filhas e gera
# um arquivo único, restaurável via:
#   termux-restore /caminho/do/backup.tar.xz`}
      />

      <h2>3. Backup manual com tar</h2>
      <p>
        Útil quando você quer backup só do <code>$HOME</code> (mais comum, e seguro de fazer
        com o Termux rodando) ou quer customizar exclusões.
      </p>
      <CodeBlock
        title="Empacotar apenas o HOME"
        code={`cd $HOME

tar --exclude='.cache' \\
    --exclude='node_modules' \\
    --exclude='.npm' \\
    -czvf ~/storage/shared/TermuxBackup/home-$(date +%F).tgz .

# Conferir o conteúdo
tar -tzf ~/storage/shared/TermuxBackup/home-$(date +%F).tgz | head`}
      />

      <h2>4. Backup incremental com rsync</h2>
      <CodeBlock
        title="rsync para storage local ou cartão SD"
        code={`pkg install rsync

# Sincroniza o HOME para uma pasta no storage compartilhado
rsync -avh --delete \\
  --exclude='.cache/' \\
  --exclude='node_modules/' \\
  $HOME/ ~/storage/shared/TermuxBackup/home/`}
      />

      <h2>5. Sincronizar para a nuvem com rclone</h2>
      <p>
        O <strong>rclone</strong> é a forma mais robusta de subir backups para Google Drive,
        Dropbox, OneDrive, S3, Backblaze B2 etc — direto do Termux.
      </p>
      <CodeBlock
        title="Configurar e enviar"
        code={`pkg install rclone

# Configurar um remote (interativo). Escolha o tipo (drive, dropbox, s3, ...)
rclone config

# Listar remotes configurados
rclone listremotes

# Enviar o tar do dia para o Google Drive
rclone copy \\
  ~/storage/shared/TermuxBackup/home-$(date +%F).tgz \\
  gdrive:TermuxBackup/

# Sincronizar pasta inteira (apaga no destino o que sumiu na origem)
rclone sync ~/storage/shared/TermuxBackup gdrive:TermuxBackup --progress

# Criptografar antes de subir? Use o backend "crypt" do rclone:
#   rclone config -> n -> nome -> crypt -> aponta para outro remote`}
      />

      <CodeBlock
        title="Exemplo: backup automatizado para S3"
        code={`# Script ~/bin/backup-cloud.sh
#!/data/data/com.termux/files/usr/bin/bash
set -e

DEST=~/storage/shared/TermuxBackup
mkdir -p "$DEST"

ARQ="$DEST/home-$(date +%F).tgz"
tar --exclude='.cache' --exclude='node_modules' \\
    -czf "$ARQ" -C "$HOME" .

rclone copy "$ARQ" s3remote:meu-bucket/termux/
echo "Backup enviado: $ARQ"`}
      />

      <h2>6. Restaurar</h2>
      <CodeBlock
        title="Restaurar do tar"
        code={`# Restauração feita pelo helper oficial (PREFIX + HOME):
termux-restore ~/storage/shared/TermuxBackup/termux-2025-01-15.tar.xz

# Restauração manual de um backup só do HOME:
cd $HOME
tar -xzvf ~/storage/shared/TermuxBackup/home-2025-01-15.tgz

# Baixar do rclone primeiro, se for da nuvem:
rclone copy gdrive:TermuxBackup/home-2025-01-15.tgz ~/storage/shared/TermuxBackup/`}
      />

      <h2>7. Agendar backups</h2>
      <p>
        Como o Termux não tem <code>cron</code> rodando como serviço do sistema, use o
        <strong> Termux:Boot</strong> + um loop com <code>sleep</code>, ou
        <strong> Termux:Tasker</strong> com o app Tasker do Android.
      </p>
      <CodeBlock
        title="~/.termux/boot/backup-diario"
        code={`#!/data/data/com.termux/files/usr/bin/bash
termux-wake-lock
while true; do
  if [ "$(date +%H:%M)" = "03:00" ]; then
    ~/bin/backup-cloud.sh >> ~/backup.log 2>&1
    sleep 60
  fi
  sleep 30
done`}
      />

      <AlertBox type="success" title="Boas práticas">
        <ul className="mt-1 mb-0 list-disc pl-5">
          <li>Salve o <code>.tar</code> sempre <strong>fora</strong> do <code>$PREFIX</code> (em <code>~/storage/shared</code> ou nuvem).</li>
          <li>Reinstalar o Termux apaga o app inteiro — sem backup externo, perde tudo.</li>
          <li>Liste os pacotes para refacilitar a reinstalação: <code>pkg list-installed &gt; ~/storage/shared/TermuxBackup/pacotes.txt</code></li>
          <li>Teste a restauração de vez em quando — backup sem teste é ilusão.</li>
        </ul>
      </AlertBox>
    </PageContainer>
  );
}

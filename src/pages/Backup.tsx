import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Backup() {
  return (
    <PageContainer
      title="Backup com rsync"
      subtitle="Estratégias 3-2-1, snapshots incrementais com --link-dest, sincronização remota via SSH e scripts robustos para Termux."
      difficulty="intermediario"
      timeToRead="50 min"
      category="Backup & Cloud"
    >
      <p>
        <strong>rsync</strong> é a ferramenta clássica para copiar e sincronizar diretórios no
        Linux. Diferente de <code>cp</code>, ele transfere apenas as <em>diferenças</em>{" "}
        (delta-transfer algorithm), preserva permissões, datas, links e hard-links, e funciona
        tanto local quanto remotamente sobre SSH. Já vem instalado no Termux por padrão.
      </p>

      <Terminal title="wallyson@termux: ~">
        <Command
          command="rsync --version | head -3"
          output={`rsync  version 3.2.7  protocol version 31
Copyright (C) 1996-2022 by Andrew Tridgell, Wayne Davison, and others.
Web site: https://rsync.samba.org/`}
        />
      </Terminal>

      <h2>Estratégia 3-2-1</h2>

      <InfoBox type="info" title="Regra de ouro do backup">
        <strong>3</strong> cópias dos dados (1 original + 2 backups) ·{" "}
        <strong>2</strong> tipos de mídia diferentes (HD interno + HD externo, ou SSD + nuvem) ·
        <strong>1</strong> cópia <em>off-site</em> (em outro lugar físico — proteção contra
        incêndio, roubo, ransomware).
      </InfoBox>

      <h2>Anatomia das flags</h2>

      <table>
        <thead><tr><th>Flag</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><code>-a, --archive</code></td><td>Modo arquivo: <code>-rlptgoD</code> (recursivo, links, perms, times, group, owner, devices)</td></tr>
          <tr><td><code>-v, --verbose</code></td><td>Mostra cada arquivo</td></tr>
          <tr><td><code>-h, --human-readable</code></td><td>Tamanhos em KB/MB/GB</td></tr>
          <tr><td><code>-P</code></td><td><code>--partial --progress</code> (resume + barra)</td></tr>
          <tr><td><code>-z, --compress</code></td><td>Compacta na rede (útil em links lentos)</td></tr>
          <tr><td><code>-n, --dry-run</code></td><td>Simula sem fazer nada</td></tr>
          <tr><td><code>--delete</code></td><td>Apaga no destino o que não existe na origem</td></tr>
          <tr><td><code>--exclude=PADRÃO</code></td><td>Ignora arquivos/diretórios</td></tr>
          <tr><td><code>--exclude-from=ARQ</code></td><td>Lê padrões de um arquivo</td></tr>
          <tr><td><code>--include=PADRÃO</code></td><td>Inclui mesmo se houver exclude</td></tr>
          <tr><td><code>--link-dest=DIR</code></td><td>Hardlinks para snapshot incremental (ouro!)</td></tr>
          <tr><td><code>--bwlimit=KBPS</code></td><td>Limita velocidade (ex: 5000 = 5 MB/s)</td></tr>
          <tr><td><code>--partial</code></td><td>Mantém transferência interrompida</td></tr>
          <tr><td><code>--append</code></td><td>Continua arquivo do ponto onde parou</td></tr>
          <tr><td><code>-e ssh</code></td><td>Especifica shell remoto (porta, identidade)</td></tr>
          <tr><td><code>--stats</code></td><td>Estatísticas finais</td></tr>
          <tr><td><code>-x</code></td><td>Não cruza pontos de montagem</td></tr>
        </tbody>
      </table>

      <h2>Sintaxe básica</h2>

      <p>
        Atenção à <strong>barra final</strong>: <code>origem/</code> copia o conteúdo;{" "}
        <code>origem</code> copia o diretório.
      </p>

      <Terminal>
        <Command
          comment="Sincroniza CONTEÚDO de Documentos para a pasta backup"
          command="rsync -ah --progress ~/Documentos/ /mnt/backup/Documentos/"
          output={`sending incremental file list
./
contrato-2025.pdf
        287,42K 100%   24,15MB/s    0:00:00 (xfr#1, to-chk=84/86)
relatorio-Q1.odt
          1,24M 100%   89,32MB/s    0:00:00 (xfr#2, to-chk=83/86)
fotos/
fotos/IMG_2031.jpg
          4,82M 100%   142,10MB/s   0:00:00 (xfr#3, to-chk=82/86)
...
sent 1,42G  bytes  received 1,84K bytes  187,32M bytes/sec
total size is 1,42G  speedup is 1,00`}
        />

        <Command
          comment="Dry-run para ver o que SERIA feito (sem -P para ficar limpo)"
          command="rsync -ahn --delete ~/Documentos/ /mnt/backup/Documentos/"
          output={`sending incremental file list
deleting velho/rascunho.txt
arquivo-novo.md
fotos/IMG_2032.jpg

sent 5,21K bytes  received 412 bytes  11,24K bytes/sec
total size is 1,42G  speedup is 252.318,12 (DRY RUN)`}
        />
      </Terminal>

      <InfoBox type="danger" title="--delete + dry-run primeiro">
        Sempre rode <code>--delete</code> com <code>-n</code> antes. Um caractere errado no
        caminho de origem (ex: vazio) faz o rsync apagar TODO o destino. Já houve casos
        célebres disso em produção.
      </InfoBox>

      <h2>Backup remoto via SSH</h2>

      <Terminal>
        <Command
          comment="Local → remoto (push)"
          command="rsync -ahzP --delete -e 'ssh -p 2222 -i ~/.ssh/backup_ed25519' ~/Projetos/ wallyson@nas.local:/srv/backup/projetos/"
          output={`sending incremental file list
./
README.md
            512 100%    1,23MB/s    0:00:00 (xfr#1, to-chk=412/413)
src/main.rs
         12,84K 100%    8,42MB/s    0:00:00 (xfr#2, to-chk=411/413)

sent 384,12M bytes  received 1,28K bytes  42,18M bytes/sec
total size is 384,12M  speedup is 1,00`}
        />

        <Command
          comment="Remoto → local (pull) — ótimo para puxar logs do servidor"
          command="rsync -ahzP wallyson@servidor.exemplo.com:/var/log/ ~/logs-servidor/"
        />
      </Terminal>

      <h2>Snapshots incrementais com --link-dest</h2>

      <p>
        Esse é <em>o</em> truque que faz do rsync uma ferramenta de backup poderosa: cada novo
        snapshot é uma pasta completa, mas arquivos inalterados são <strong>hardlinks</strong>{" "}
        para o snapshot anterior — não ocupam espaço extra. Você navega cada snapshot como se
        fosse um backup full, mas o disco só armazena os deltas.
      </p>

      <File path="/usr/local/bin/backup-incremental.sh">
{`#!/usr/bin/env bash
set -euo pipefail

# Configuração
ORIGEM="/home/wallyson/"
DESTINO_BASE="/mnt/backup/snapshots"
EXCLUDES="/etc/backup-excludes.txt"
RETENCAO=14   # mantém os últimos 14 snapshots

DATA=$(date +%Y-%m-%d_%H%M%S)
NOVO="$DESTINO_BASE/$DATA"
ULTIMO=$(readlink "$DESTINO_BASE/latest" 2>/dev/null || true)

mkdir -p "$DESTINO_BASE"

if [[ -n "$ULTIMO" && -d "$ULTIMO" ]]; then
  LINK_DEST="--link-dest=$ULTIMO"
else
  LINK_DEST=""
fi

echo "[$(date '+%F %T')] Snapshot iniciando: $NOVO"

rsync -ahP --delete \\
  --exclude-from="$EXCLUDES" \\
  $LINK_DEST \\
  "$ORIGEM" "$NOVO/"

# Atualiza o link 'latest'
ln -snf "$NOVO" "$DESTINO_BASE/latest"

# Rotação: remove snapshots além da retenção
ls -1d "$DESTINO_BASE"/2*/ 2>/dev/null | sort | head -n -$RETENCAO | xargs -r rm -rf

echo "[$(date '+%F %T')] Concluído. Espaço usado:"
du -sh "$DESTINO_BASE"`}
      </File>

      <File path="/etc/backup-excludes.txt">
{`.cache/
.local/share/Trash/
node_modules/
target/
build/
dist/
*.tmp
*.swp
.thumbnails/
Downloads/
.mozilla/firefox/*/Cache/
.config/google-chrome/*/Cache/
.config/Code/CachedData/
snap/*/common/.cache/`}
      </File>

      <Terminal>
        <Command root command="chmod +x /usr/local/bin/backup-incremental.sh" />
        <Command command="/usr/local/bin/backup-incremental.sh"
          output={`[2025-04-12 18:00:01] Snapshot iniciando: /mnt/backup/snapshots/2025-04-12_180001
sending incremental file list
./
.bashrc
            487 100%    0,00kB/s    0:00:00 (xfr#1, to-chk=12345/12346)
Documentos/contrato-2025.pdf
        287,42K 100%   24,15MB/s    0:00:00 (xfr#2, to-chk=12300/12346)
...

sent 24,21M bytes  received 4,18K bytes  812,42K bytes/sec
total size is 28,42G  speedup is 1.173,42
[2025-04-12 18:00:32] Concluído. Espaço usado:
58G  /mnt/backup/snapshots`}
        />
        <Command
          comment="Veja a economia: 14 snapshots × 28G ≈ 392G; espaço real só 58G"
          command="ls -1 /mnt/backup/snapshots/"
          output={`2025-03-30_180001
2025-03-31_180001
2025-04-01_180002
2025-04-02_180001
2025-04-03_180001
2025-04-04_180002
2025-04-05_180001
2025-04-06_180001
2025-04-07_180001
2025-04-08_180001
2025-04-09_180001
2025-04-10_180001
2025-04-11_180001
2025-04-12_180001
latest`}
        />
        <Command
          command="du -sh /mnt/backup/snapshots/2025-04-12_180001/"
          output={`28G  /mnt/backup/snapshots/2025-04-12_180001/`}
        />
      </Terminal>

      <h2>Agendar com systemd timer</h2>

      <File path="/etc/systemd/system/backup.service">
{`[Unit]
Description=Backup incremental do /home
Wants=backup.timer

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup-incremental.sh
Nice=19
IOSchedulingClass=idle`}
      </File>

      <File path="/etc/systemd/system/backup.timer">
{`[Unit]
Description=Roda backup todo dia às 03:30

[Timer]
OnCalendar=*-*-* 03:30:00
Persistent=true
RandomizedDelaySec=10min

[Install]
WantedBy=timers.target`}
      </File>

      <Terminal>
        <Command root command="systemctl daemon-reload" />
        <Command root command="systemctl enable --now backup.timer"
          output={`Created symlink /etc/systemd/system/timers.target.wants/backup.timer → /etc/systemd/system/backup.timer.`}
        />
        <Command command="systemctl list-timers backup.timer"
          output={`NEXT                        LEFT       LAST PASSED UNIT         ACTIVATES
Sun 2025-04-13 03:34:21 -03 9h left    n/a  n/a    backup.timer backup.service

1 timers listed.`}
        />
      </Terminal>

      <h2>Comparativo: cp × scp × rsync</h2>

      <table>
        <thead><tr><th>Critério</th><th>cp</th><th>scp</th><th>rsync</th></tr></thead>
        <tbody>
          <tr><td>Local</td><td>✓</td><td>—</td><td>✓</td></tr>
          <tr><td>Remoto (SSH)</td><td>—</td><td>✓</td><td>✓</td></tr>
          <tr><td>Delta (só diferenças)</td><td>—</td><td>—</td><td>✓</td></tr>
          <tr><td>Resume</td><td>—</td><td>—</td><td>✓ (--partial)</td></tr>
          <tr><td>Compressão</td><td>—</td><td>✓ (-C)</td><td>✓ (-z)</td></tr>
          <tr><td>Hardlinks (snapshots)</td><td>—</td><td>—</td><td>✓ (--link-dest)</td></tr>
          <tr><td>Bandwidth limit</td><td>—</td><td>✓ (-l)</td><td>✓ (--bwlimit)</td></tr>
          <tr><td>Excludes/Includes</td><td>—</td><td>—</td><td>✓</td></tr>
        </tbody>
      </table>

      <h2>tar + gzip para arquivamento</h2>

      <p>
        rsync é para <em>sincronizar</em>; <code>tar</code> é para criar UM arquivo único — útil
        para enviar por e-mail, gravar em mídia, ou guardar como artefato versionado.
      </p>

      <Terminal>
        <Command
          comment="Backup compactado com xz (mais lento, melhor compressão)"
          command="tar --exclude='node_modules' --exclude='.cache' -cJf backup-projetos-$(date +%F).tar.xz ~/Projetos"
          output={`(silencioso quando OK)`}
        />
        <Command command="ls -lh backup-projetos-2025-04-12.tar.xz"
          output={`-rw-rw-r-- 1 wallyson wallyson 184M abr 12 18:42 backup-projetos-2025-04-12.tar.xz`}
        />
        <Command command="tar -tJf backup-projetos-2025-04-12.tar.xz | head -5"
          output={`home/wallyson/Projetos/
home/wallyson/Projetos/api-rust/
home/wallyson/Projetos/api-rust/Cargo.toml
home/wallyson/Projetos/api-rust/src/main.rs
home/wallyson/Projetos/api-rust/README.md`}
        />
      </Terminal>

      <h2>Testando o restore (o backup que nunca testou não existe)</h2>

      <Terminal>
        <Command
          comment="Recupera um arquivo específico do snapshot mais recente"
          command="rsync -ahP /mnt/backup/snapshots/latest/Documentos/contrato-2025.pdf ~/restaurado/"
        />
        <Command
          comment="Recupera tudo de 3 dias atrás para uma pasta de teste"
          command="rsync -ahP --delete /mnt/backup/snapshots/2025-04-09_180001/ ~/restaurado-completo/"
        />
        <Command command="diff -r ~/Documentos/ ~/restaurado-completo/Documentos/" output={`(sem saída = idênticos)`} />
      </Terminal>

      <InfoBox type="success" title="Checklist de boas práticas">
        Versione seus scripts no Git · documente em README · monitore com{" "}
        <code>journalctl -u backup.service</code> · faça testes de restore mensais · mantenha
        uma cópia <em>offline</em> e <em>off-site</em> (HD externo na casa de um parente, ou
        nuvem cifrada com <code>rclone crypt</code>).
      </InfoBox>
    </PageContainer>
  );
}

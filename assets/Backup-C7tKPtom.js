import{j as e}from"./index-d-w5ROEn.js";import{P as o}from"./PageContainer-t8f2nTRw.js";import{T as r,C as s,F as t}from"./Terminal-B39pZIiO.js";import{I as n}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function m(){return e.jsxs(o,{title:"Backup com rsync",subtitle:"Estratégias 3-2-1, snapshots incrementais com --link-dest, sincronização remota via SSH e scripts robustos para Termux.",difficulty:"intermediario",timeToRead:"50 min",category:"Backup & Cloud",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"rsync"})," é a ferramenta clássica para copiar e sincronizar diretórios no Linux. Diferente de ",e.jsx("code",{children:"cp"}),", ele transfere apenas as ",e.jsx("em",{children:"diferenças"})," ","(delta-transfer algorithm), preserva permissões, datas, links e hard-links, e funciona tanto local quanto remotamente sobre SSH. Já vem instalado no Termux por padrão."]}),e.jsx(r,{title:"wallyson@termux: ~",children:e.jsx(s,{command:"rsync --version | head -3",output:`rsync  version 3.2.7  protocol version 31
Copyright (C) 1996-2022 by Andrew Tridgell, Wayne Davison, and others.
Web site: https://rsync.samba.org/`})}),e.jsx("h2",{children:"Estratégia 3-2-1"}),e.jsxs(n,{type:"info",title:"Regra de ouro do backup",children:[e.jsx("strong",{children:"3"})," cópias dos dados (1 original + 2 backups) ·"," ",e.jsx("strong",{children:"2"})," tipos de mídia diferentes (HD interno + HD externo, ou SSD + nuvem) ·",e.jsx("strong",{children:"1"})," cópia ",e.jsx("em",{children:"off-site"})," (em outro lugar físico — proteção contra incêndio, roubo, ransomware)."]}),e.jsx("h2",{children:"Anatomia das flags"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Flag"}),e.jsx("th",{children:"Significado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-a, --archive"})}),e.jsxs("td",{children:["Modo arquivo: ",e.jsx("code",{children:"-rlptgoD"})," (recursivo, links, perms, times, group, owner, devices)"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-v, --verbose"})}),e.jsx("td",{children:"Mostra cada arquivo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-h, --human-readable"})}),e.jsx("td",{children:"Tamanhos em KB/MB/GB"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-P"})}),e.jsxs("td",{children:[e.jsx("code",{children:"--partial --progress"})," (resume + barra)"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-z, --compress"})}),e.jsx("td",{children:"Compacta na rede (útil em links lentos)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-n, --dry-run"})}),e.jsx("td",{children:"Simula sem fazer nada"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--delete"})}),e.jsx("td",{children:"Apaga no destino o que não existe na origem"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--exclude=PADRÃO"})}),e.jsx("td",{children:"Ignora arquivos/diretórios"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--exclude-from=ARQ"})}),e.jsx("td",{children:"Lê padrões de um arquivo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--include=PADRÃO"})}),e.jsx("td",{children:"Inclui mesmo se houver exclude"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--link-dest=DIR"})}),e.jsx("td",{children:"Hardlinks para snapshot incremental (ouro!)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--bwlimit=KBPS"})}),e.jsx("td",{children:"Limita velocidade (ex: 5000 = 5 MB/s)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--partial"})}),e.jsx("td",{children:"Mantém transferência interrompida"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--append"})}),e.jsx("td",{children:"Continua arquivo do ponto onde parou"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-e ssh"})}),e.jsx("td",{children:"Especifica shell remoto (porta, identidade)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--stats"})}),e.jsx("td",{children:"Estatísticas finais"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-x"})}),e.jsx("td",{children:"Não cruza pontos de montagem"})]})]})]}),e.jsx("h2",{children:"Sintaxe básica"}),e.jsxs("p",{children:["Atenção à ",e.jsx("strong",{children:"barra final"}),": ",e.jsx("code",{children:"origem/"})," copia o conteúdo;"," ",e.jsx("code",{children:"origem"})," copia o diretório."]}),e.jsxs(r,{children:[e.jsx(s,{comment:"Sincroniza CONTEÚDO de Documentos para a pasta backup",command:"rsync -ah --progress ~/Documentos/ /mnt/backup/Documentos/",output:`sending incremental file list
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
total size is 1,42G  speedup is 1,00`}),e.jsx(s,{comment:"Dry-run para ver o que SERIA feito (sem -P para ficar limpo)",command:"rsync -ahn --delete ~/Documentos/ /mnt/backup/Documentos/",output:`sending incremental file list
deleting velho/rascunho.txt
arquivo-novo.md
fotos/IMG_2032.jpg

sent 5,21K bytes  received 412 bytes  11,24K bytes/sec
total size is 1,42G  speedup is 252.318,12 (DRY RUN)`})]}),e.jsxs(n,{type:"danger",title:"--delete + dry-run primeiro",children:["Sempre rode ",e.jsx("code",{children:"--delete"})," com ",e.jsx("code",{children:"-n"})," antes. Um caractere errado no caminho de origem (ex: vazio) faz o rsync apagar TODO o destino. Já houve casos célebres disso em produção."]}),e.jsx("h2",{children:"Backup remoto via SSH"}),e.jsxs(r,{children:[e.jsx(s,{comment:"Local → remoto (push)",command:"rsync -ahzP --delete -e 'ssh -p 2222 -i ~/.ssh/backup_ed25519' ~/Projetos/ wallyson@nas.local:/srv/backup/projetos/",output:`sending incremental file list
./
README.md
            512 100%    1,23MB/s    0:00:00 (xfr#1, to-chk=412/413)
src/main.rs
         12,84K 100%    8,42MB/s    0:00:00 (xfr#2, to-chk=411/413)

sent 384,12M bytes  received 1,28K bytes  42,18M bytes/sec
total size is 384,12M  speedup is 1,00`}),e.jsx(s,{comment:"Remoto → local (pull) — ótimo para puxar logs do servidor",command:"rsync -ahzP wallyson@servidor.exemplo.com:/var/log/ ~/logs-servidor/"})]}),e.jsx("h2",{children:"Snapshots incrementais com --link-dest"}),e.jsxs("p",{children:["Esse é ",e.jsx("em",{children:"o"})," truque que faz do rsync uma ferramenta de backup poderosa: cada novo snapshot é uma pasta completa, mas arquivos inalterados são ",e.jsx("strong",{children:"hardlinks"})," ","para o snapshot anterior — não ocupam espaço extra. Você navega cada snapshot como se fosse um backup full, mas o disco só armazena os deltas."]}),e.jsx(t,{path:"/usr/local/bin/backup-incremental.sh",children:`#!/usr/bin/env bash
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
du -sh "$DESTINO_BASE"`}),e.jsx(t,{path:"/etc/backup-excludes.txt",children:`.cache/
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
snap/*/common/.cache/`}),e.jsxs(r,{children:[e.jsx(s,{root:!0,command:"chmod +x /usr/local/bin/backup-incremental.sh"}),e.jsx(s,{command:"/usr/local/bin/backup-incremental.sh",output:`[2025-04-12 18:00:01] Snapshot iniciando: /mnt/backup/snapshots/2025-04-12_180001
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
58G  /mnt/backup/snapshots`}),e.jsx(s,{comment:"Veja a economia: 14 snapshots × 28G ≈ 392G; espaço real só 58G",command:"ls -1 /mnt/backup/snapshots/",output:`2025-03-30_180001
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
latest`}),e.jsx(s,{command:"du -sh /mnt/backup/snapshots/2025-04-12_180001/",output:"28G  /mnt/backup/snapshots/2025-04-12_180001/"})]}),e.jsx("h2",{children:"Agendar com systemd timer"}),e.jsx(t,{path:"/etc/systemd/system/backup.service",children:`[Unit]
Description=Backup incremental do /home
Wants=backup.timer

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup-incremental.sh
Nice=19
IOSchedulingClass=idle`}),e.jsx(t,{path:"/etc/systemd/system/backup.timer",children:`[Unit]
Description=Roda backup todo dia às 03:30

[Timer]
OnCalendar=*-*-* 03:30:00
Persistent=true
RandomizedDelaySec=10min

[Install]
WantedBy=timers.target`}),e.jsxs(r,{children:[e.jsx(s,{root:!0,command:"systemctl daemon-reload"}),e.jsx(s,{root:!0,command:"systemctl enable --now backup.timer",output:"Created symlink /etc/systemd/system/timers.target.wants/backup.timer → /etc/systemd/system/backup.timer."}),e.jsx(s,{command:"systemctl list-timers backup.timer",output:`NEXT                        LEFT       LAST PASSED UNIT         ACTIVATES
Sun 2025-04-13 03:34:21 -03 9h left    n/a  n/a    backup.timer backup.service

1 timers listed.`})]}),e.jsx("h2",{children:"Comparativo: cp × scp × rsync"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Critério"}),e.jsx("th",{children:"cp"}),e.jsx("th",{children:"scp"}),e.jsx("th",{children:"rsync"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Local"}),e.jsx("td",{children:"✓"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"✓"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Remoto (SSH)"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"✓"}),e.jsx("td",{children:"✓"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Delta (só diferenças)"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"✓"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Resume"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"✓ (--partial)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Compressão"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"✓ (-C)"}),e.jsx("td",{children:"✓ (-z)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Hardlinks (snapshots)"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"✓ (--link-dest)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Bandwidth limit"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"✓ (-l)"}),e.jsx("td",{children:"✓ (--bwlimit)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Excludes/Includes"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"✓"})]})]})]}),e.jsx("h2",{children:"tar + gzip para arquivamento"}),e.jsxs("p",{children:["rsync é para ",e.jsx("em",{children:"sincronizar"}),"; ",e.jsx("code",{children:"tar"})," é para criar UM arquivo único — útil para enviar por e-mail, gravar em mídia, ou guardar como artefato versionado."]}),e.jsxs(r,{children:[e.jsx(s,{comment:"Backup compactado com xz (mais lento, melhor compressão)",command:"tar --exclude='node_modules' --exclude='.cache' -cJf backup-projetos-$(date +%F).tar.xz ~/Projetos",output:"(silencioso quando OK)"}),e.jsx(s,{command:"ls -lh backup-projetos-2025-04-12.tar.xz",output:"-rw-rw-r-- 1 wallyson wallyson 184M abr 12 18:42 backup-projetos-2025-04-12.tar.xz"}),e.jsx(s,{command:"tar -tJf backup-projetos-2025-04-12.tar.xz | head -5",output:`home/wallyson/Projetos/
home/wallyson/Projetos/api-rust/
home/wallyson/Projetos/api-rust/Cargo.toml
home/wallyson/Projetos/api-rust/src/main.rs
home/wallyson/Projetos/api-rust/README.md`})]}),e.jsx("h2",{children:"Testando o restore (o backup que nunca testou não existe)"}),e.jsxs(r,{children:[e.jsx(s,{comment:"Recupera um arquivo específico do snapshot mais recente",command:"rsync -ahP /mnt/backup/snapshots/latest/Documentos/contrato-2025.pdf ~/restaurado/"}),e.jsx(s,{comment:"Recupera tudo de 3 dias atrás para uma pasta de teste",command:"rsync -ahP --delete /mnt/backup/snapshots/2025-04-09_180001/ ~/restaurado-completo/"}),e.jsx(s,{command:"diff -r ~/Documentos/ ~/restaurado-completo/Documentos/",output:"(sem saída = idênticos)"})]}),e.jsxs(n,{type:"success",title:"Checklist de boas práticas",children:["Versione seus scripts no Git · documente em README · monitore com"," ",e.jsx("code",{children:"journalctl -u backup.service"})," · faça testes de restore mensais · mantenha uma cópia ",e.jsx("em",{children:"offline"})," e ",e.jsx("em",{children:"off-site"})," (HD externo na casa de um parente, ou nuvem cifrada com ",e.jsx("code",{children:"rclone crypt"}),")."]})]})}export{m as default};

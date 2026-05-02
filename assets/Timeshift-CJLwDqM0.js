import{j as e}from"./index-C2xKMDcs.js";import{P as a}from"./PageContainer-D8Fa3g_u.js";import{C as o}from"./CodeBlock-OPQVSQze.js";import{I as r}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function l(){return e.jsxs(a,{title:"Backup do $PREFIX",subtitle:"Estratégia oficial de snapshots no Termux: tar/rsync do $PREFIX, sincronização para nuvem com rclone (Google Drive, Dropbox, S3) e restauração.",difficulty:"iniciante",timeToRead:"25 min",children:[e.jsxs(r,{type:"info",title:"Timeshift não existe no Termux",children:["Timeshift depende de ",e.jsx("code",{children:"rsync + cron"})," ou snapshots Btrfs do ",e.jsx("strong",{children:"sistema raiz Linux"})," — nada disso existe no Android. O método oficial recomendado pelo wiki do Termux é",e.jsxs("strong",{children:[" empacotar o ",e.jsx("code",{children:"$PREFIX"})," com ",e.jsx("code",{children:"tar"})]})," (e opcionalmente o",e.jsx("code",{children:"$HOME"}),") e mover o arquivo para um local seguro."]}),e.jsx("h2",{children:"O que fazer backup"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"$PREFIX"})," = ",e.jsx("code",{children:"/data/data/com.termux/files/usr"})," — pacotes instalados, configs do sistema do Termux."]}),e.jsxs("li",{children:[e.jsx("code",{children:"$HOME"})," = ",e.jsx("code",{children:"/data/data/com.termux/files/home"})," — seus arquivos, dotfiles, projetos."]}),e.jsxs("li",{children:["Storage compartilhado (acessível via ",e.jsx("code",{children:"termux-setup-storage"}),") — onde o ",e.jsx("code",{children:".tar"})," é salvo, pois sobrevive à reinstalação do app."]})]}),e.jsxs(r,{type:"warning",title:"O Termux NÃO pode tar dele mesmo enquanto roda",children:["Empacotar o ",e.jsx("code",{children:"$PREFIX"})," de dentro do próprio Termux trava (você está modificando arquivos abertos do ",e.jsx("code",{children:"tar"}),"). O backup correto se faz pelo app",e.jsx("strong",{children:" Termux-only via ADB"})," ou usando o script oficial ",e.jsx("code",{children:"termux-backup"}),"do pacote ",e.jsx("code",{children:"termux-tools"}),". Veja exemplos abaixo."]}),e.jsx("h2",{children:"1. Preparar o storage"}),e.jsx(o,{title:"Liberar acesso ao storage compartilhado",code:`# Cria os links ~/storage/* para a memória interna do Android
termux-setup-storage

# Estrutura criada:
# ~/storage/shared      -> /sdcard (memória interna)
# ~/storage/downloads   -> /sdcard/Download
# ~/storage/dcim        -> /sdcard/DCIM
# ~/storage/movies      -> /sdcard/Movies

mkdir -p ~/storage/shared/TermuxBackup`}),e.jsx("h2",{children:"2. Backup com tar (método oficial)"}),e.jsx(o,{title:"termux-backup do pacote termux-tools",code:`# Garanta o pacote
pkg install termux-tools

# Cria backup completo (PREFIX + HOME) em um .tar.xz
termux-backup ~/storage/shared/TermuxBackup/termux-$(date +%F).tar.xz

# O comando para a maioria dos serviços, fecha sessões filhas e gera
# um arquivo único, restaurável via:
#   termux-restore /caminho/do/backup.tar.xz`}),e.jsx("h2",{children:"3. Backup manual com tar"}),e.jsxs("p",{children:["Útil quando você quer backup só do ",e.jsx("code",{children:"$HOME"})," (mais comum, e seguro de fazer com o Termux rodando) ou quer customizar exclusões."]}),e.jsx(o,{title:"Empacotar apenas o HOME",code:`cd $HOME

tar --exclude='.cache' \\
    --exclude='node_modules' \\
    --exclude='.npm' \\
    -czvf ~/storage/shared/TermuxBackup/home-$(date +%F).tgz .

# Conferir o conteúdo
tar -tzf ~/storage/shared/TermuxBackup/home-$(date +%F).tgz | head`}),e.jsx("h2",{children:"4. Backup incremental com rsync"}),e.jsx(o,{title:"rsync para storage local ou cartão SD",code:`pkg install rsync

# Sincroniza o HOME para uma pasta no storage compartilhado
rsync -avh --delete \\
  --exclude='.cache/' \\
  --exclude='node_modules/' \\
  $HOME/ ~/storage/shared/TermuxBackup/home/`}),e.jsx("h2",{children:"5. Sincronizar para a nuvem com rclone"}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"rclone"})," é a forma mais robusta de subir backups para Google Drive, Dropbox, OneDrive, S3, Backblaze B2 etc — direto do Termux."]}),e.jsx(o,{title:"Configurar e enviar",code:`pkg install rclone

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
#   rclone config -> n -> nome -> crypt -> aponta para outro remote`}),e.jsx(o,{title:"Exemplo: backup automatizado para S3",code:`# Script ~/bin/backup-cloud.sh
#!/data/data/com.termux/files/usr/bin/bash
set -e

DEST=~/storage/shared/TermuxBackup
mkdir -p "$DEST"

ARQ="$DEST/home-$(date +%F).tgz"
tar --exclude='.cache' --exclude='node_modules' \\
    -czf "$ARQ" -C "$HOME" .

rclone copy "$ARQ" s3remote:meu-bucket/termux/
echo "Backup enviado: $ARQ"`}),e.jsx("h2",{children:"6. Restaurar"}),e.jsx(o,{title:"Restaurar do tar",code:`# Restauração feita pelo helper oficial (PREFIX + HOME):
termux-restore ~/storage/shared/TermuxBackup/termux-2025-01-15.tar.xz

# Restauração manual de um backup só do HOME:
cd $HOME
tar -xzvf ~/storage/shared/TermuxBackup/home-2025-01-15.tgz

# Baixar do rclone primeiro, se for da nuvem:
rclone copy gdrive:TermuxBackup/home-2025-01-15.tgz ~/storage/shared/TermuxBackup/`}),e.jsx("h2",{children:"7. Agendar backups"}),e.jsxs("p",{children:["Como o Termux não tem ",e.jsx("code",{children:"cron"})," rodando como serviço do sistema, use o",e.jsx("strong",{children:" Termux:Boot"})," + um loop com ",e.jsx("code",{children:"sleep"}),", ou",e.jsx("strong",{children:" Termux:Tasker"})," com o app Tasker do Android."]}),e.jsx(o,{title:"~/.termux/boot/backup-diario",code:`#!/data/data/com.termux/files/usr/bin/bash
termux-wake-lock
while true; do
  if [ "$(date +%H:%M)" = "03:00" ]; then
    ~/bin/backup-cloud.sh >> ~/backup.log 2>&1
    sleep 60
  fi
  sleep 30
done`}),e.jsx(r,{type:"success",title:"Boas práticas",children:e.jsxs("ul",{className:"mt-1 mb-0 list-disc pl-5",children:[e.jsxs("li",{children:["Salve o ",e.jsx("code",{children:".tar"})," sempre ",e.jsx("strong",{children:"fora"})," do ",e.jsx("code",{children:"$PREFIX"})," (em ",e.jsx("code",{children:"~/storage/shared"})," ou nuvem)."]}),e.jsx("li",{children:"Reinstalar o Termux apaga o app inteiro — sem backup externo, perde tudo."}),e.jsxs("li",{children:["Liste os pacotes para refacilitar a reinstalação: ",e.jsx("code",{children:"pkg list-installed > ~/storage/shared/TermuxBackup/pacotes.txt"})]}),e.jsx("li",{children:"Teste a restauração de vez em quando — backup sem teste é ilusão."})]})})]})}export{l as default};

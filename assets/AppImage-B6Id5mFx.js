import{j as e}from"./index-C2xKMDcs.js";import{P as s}from"./PageContainer-D8Fa3g_u.js";import{C as o}from"./CodeBlock-OPQVSQze.js";import{I as r}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function l(){return e.jsxs(s,{title:"Termux:Boot — Auto-iniciar scripts",subtitle:"Como rodar scripts automaticamente quando o Android termina de bootar: sshd, túneis SSH, cron substituto, sincronizações.",difficulty:"iniciante",timeToRead:"20 min",children:[e.jsxs(r,{type:"info",title:"AppImage não roda no Termux",children:["AppImages são binários ELF para Linux desktop x86_64 e ",e.jsx("strong",{children:"não funcionam no Android/Termux"}),'(arquitetura ARM, sem FUSE de userspace, sem glibc). O equivalente prático para "executar algo automaticamente" no Termux é o app ',e.jsx("strong",{children:"Termux:Boot"})," com a pasta",e.jsx("code",{children:"~/.termux/boot/"}),", que executa scripts no boot do celular."]}),e.jsx("h2",{children:"1. Instalar Termux:Boot"}),e.jsxs("p",{children:["O Termux:Boot é um app Android complementar instalado pelo F-Droid. Ele recebe o broadcast ",e.jsx("code",{children:"BOOT_COMPLETED"})," do Android e roda os scripts colocados em",e.jsx("code",{children:" ~/.termux/boot/"}),"."]}),e.jsx(o,{title:"Setup inicial",code:`# 1. Instale "Termux:Boot" pelo F-Droid
#    https://f-droid.org/packages/com.termux.boot/

# 2. Abra o app Termux:Boot UMA VEZ (essencial!).
#    Sem isso, o Android nunca dá a permissão de iniciar no boot.

# 3. No Termux, crie a pasta de scripts:
mkdir -p ~/.termux/boot

# 4. Coloque scripts executáveis dentro dela.
#    Eles rodam em ordem alfabética, em background, ao ligar o celular.`}),e.jsxs(r,{type:"warning",title:"Wake-lock é importante",children:["O Android adormece a CPU agressivamente. Se quiser que serviços (sshd, túneis) continuem rodando, ative o wake-lock: ",e.jsx("code",{children:"termux-wake-lock"})," no início do script e ",e.jsx("code",{children:"termux-wake-unlock"})," quando terminar (ou nunca, se for daemon contínuo)."]}),e.jsx("h2",{children:"2. Exemplo: iniciar sshd no boot"}),e.jsx(o,{title:"~/.termux/boot/01-sshd",code:`#!/data/data/com.termux/files/usr/bin/sh
# Garante que o pacote esteja instalado: pkg install openssh
termux-wake-lock
sshd`}),e.jsx(o,{title:"Tornar executável",code:`chmod +x ~/.termux/boot/01-sshd

# Verificar:
ls -l ~/.termux/boot/

# Testar manualmente sem reiniciar:
sh ~/.termux/boot/01-sshd
logcat -s 'Termux-Boot' &   # ver os logs (precisa permissão)`}),e.jsx("h2",{children:"3. Exemplo: túnel SSH reverso para acessar de fora"}),e.jsx("p",{children:"Se você tem um servidor (VPS) na nuvem, dá para abrir um túnel reverso e acessar o celular de qualquer lugar — mesmo atrás de NAT/4G."}),e.jsx(o,{title:"~/.termux/boot/02-tunnel",code:`#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock

# Reabre o túnel automaticamente se cair (autossh é o ideal: pkg install autossh)
while true; do
  ssh -N -R 2222:localhost:8022 \\
      -o ServerAliveInterval=30 \\
      -o ExitOnForwardFailure=yes \\
      usuario@meu-vps.exemplo.com
  sleep 10
done`}),e.jsxs("p",{children:["No VPS, basta rodar ",e.jsx("code",{children:"ssh -p 2222 usuario_termux@localhost"})," para entrar no celular."]}),e.jsx("h2",{children:"4. Exemplo: substituto de cron"}),e.jsxs("p",{children:["Termux não tem ",e.jsx("code",{children:"cron"})," nativo (sem ",e.jsx("code",{children:"systemd"})," e sem permissão para",e.jsx("code",{children:"cron"})," rodar como daemon do sistema). A combinação Termux:Boot + loop com",e.jsx("code",{children:" sleep"})," resolve a maioria dos casos."]}),e.jsx(o,{title:"~/.termux/boot/03-cron",code:`#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock

while true; do
  # Roda backup todo dia às 03:00
  hora=$(date +%H:%M)
  if [ "$hora" = "03:00" ]; then
    tar czf ~/storage/shared/backup-$(date +%F).tgz "$PREFIX"
  fi
  sleep 60
done`}),e.jsxs("p",{children:["Para rotinas mais sofisticadas, instale ",e.jsx("code",{children:"cronie"})," da fonte ou use o app",e.jsx("strong",{children:" Tasker"})," + ",e.jsx("strong",{children:"Termux:Tasker"}),"."]}),e.jsx("h2",{children:"5. Exemplo: sincronizar com a nuvem ao ligar"}),e.jsx(o,{title:"~/.termux/boot/04-rclone-sync",code:`#!/data/data/com.termux/files/usr/bin/sh
# Requer: pkg install rclone  (e rclone config feito antes)
termux-wake-lock
sleep 30   # aguarda a rede estabilizar

rclone sync ~/storage/shared/Documents gdrive:Backup/Documents \\
  --log-file ~/rclone.log

termux-wake-unlock`}),e.jsx("h2",{children:"Boas práticas"}),e.jsx(r,{type:"warning",title:"Cuidado",children:e.jsxs("ul",{className:"mt-1 mb-0 list-disc pl-5",children:[e.jsxs("li",{children:["Sempre dê ",e.jsx("code",{children:"chmod +x"}),". Sem permissão, o script é silenciosamente ignorado."]}),e.jsxs("li",{children:["Use shebang absoluto: ",e.jsx("code",{children:"#!/data/data/com.termux/files/usr/bin/sh"})," (ou ",e.jsx("code",{children:"bash"}),")."]}),e.jsxs("li",{children:["Prefixe com números (",e.jsx("code",{children:"01-"}),", ",e.jsx("code",{children:"02-"}),") para controlar ordem."]}),e.jsxs("li",{children:["Não rode comandos que pedem interação (ex: ",e.jsx("code",{children:"pkg install"})," sem ",e.jsx("code",{children:"-y"}),")."]}),e.jsxs("li",{children:["Logue para arquivo: ",e.jsx("code",{children:"... >> ~/boot.log 2>&1"})," ajuda a debugar."]})]})})]})}export{l as default};

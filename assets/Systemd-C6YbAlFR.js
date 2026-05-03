import{j as e}from"./index-BGu3owFd.js";import{P as r,I as o}from"./InfoBox-cbYNoYJG.js";import{C as s}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function c(){return e.jsxs(r,{title:"Serviços no Termux (sem systemd)",subtitle:"Termux NÃO usa systemd. Aprenda termux-services (runit/sv), tmux, nohup e Termux:Boot para gerenciar processos longos e auto-start.",difficulty:"intermediario",timeToRead:"20 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"systemd"})," "," — "," ","init system."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"systemctl"})," "," — "," ","gerencia units."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"journalctl"})," "," — "," ","logs."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Targets"})," "," — "," ","runlevels."]})]}),e.jsxs(o,{type:"danger",title:"Termux NÃO usa systemd",children:["O Android não tem ",e.jsx("code",{children:"systemd"})," e o Termux roda sem PID 1 próprio — ele é apenas um processo de usuário. Esqueça ",e.jsx("code",{children:"systemctl"}),","," ",e.jsx("code",{children:"journalctl"}),", units ",e.jsx("code",{children:".service"}),"/",e.jsx("code",{children:".timer"}),", targets, ",e.jsx("code",{children:"networkd"}),", ",e.jsx("code",{children:"resolved"})," etc. No Termux usamos:",e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"termux-services"})," (baseado em ",e.jsx("em",{children:"runit"}),") para serviços com supervisão e auto-restart;"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"tmux"})," para manter shells/processos vivos depois de fechar o app;"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Termux:Boot"})," (app companheiro) para rodar scripts no boot do celular;"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"nohup"})," / ",e.jsx("strong",{children:"disown"})," / ",e.jsx("strong",{children:"&"})," para colocar processos em background."]})]})]}),e.jsxs("p",{children:["No Linux desktop você dá ",e.jsx("code",{children:"systemctl enable nginx"})," e pronto. No Termux o ciclo de vida é diferente: o sistema operacional é o Android, que mata processos quando precisa de RAM, e cada vez que você fecha o app Termux todos os filhos do shell são encerrados. Para conviver com isso existe um conjunto pequeno de ferramentas — vamos ver cada uma."]}),e.jsx("h2",{children:"1. termux-services (runit)"}),e.jsxs("p",{children:["O pacote ",e.jsx("code",{children:"termux-services"})," traz o supervisor ",e.jsx("em",{children:"runit"})," ","adaptado para o Termux. Cada serviço fica em"," ",e.jsx("code",{children:"$PREFIX/var/service/NOME/"})," com um script ",e.jsx("code",{children:"run"})," que executa o programa em primeiro plano. O ",e.jsx("code",{children:"runsv"})," mantém o processo vivo, reinicia em caso de falha e roteia logs."]}),e.jsx(s,{title:"Instalando e iniciando o supervisor",code:`pkg install termux-services

# Ative o supervisor de serviços (sv) — ele sobe junto com o shell.
# Feche e abra o Termux uma vez OU rode:
source $PREFIX/etc/profile.d/start-services.sh`}),e.jsxs("p",{children:["Pacotes como ",e.jsx("code",{children:"openssh"}),", ",e.jsx("code",{children:"postgresql"}),","," ",e.jsx("code",{children:"mariadb"}),", ",e.jsx("code",{children:"nginx"}),", ",e.jsx("code",{children:"cronie"})," e"," ",e.jsx("code",{children:"tor"})," já vêm com diretório de serviço pronto."]}),e.jsx(s,{title:"Habilitando, iniciando e parando serviços",code:`pkg install openssh

# Habilita (cria symlink em $PREFIX/var/service/sshd)
sv-enable sshd

# Comandos do sv (equivalentes ao systemctl):
sv up sshd          # start
sv down sshd        # stop
sv restart sshd     # restart
sv status sshd      # status -> "run: sshd: (pid 1234) 12s"

# Lista todos os serviços conhecidos:
ls $PREFIX/var/service/

# Desabilita (remove o symlink)
sv-disable sshd`}),e.jsx(s,{title:"Logs dos serviços",code:`# runit grava em $PREFIX/var/log/sv/NOME/current
tail -f $PREFIX/var/log/sv/sshd/current`}),e.jsx("h2",{children:"2. Criando um serviço próprio"}),e.jsxs("p",{children:["Basta criar um diretório com um script ",e.jsx("code",{children:"run"})," executável que rode o programa em ",e.jsx("strong",{children:"foreground"})," (sem ",e.jsx("code",{children:"&"}),"). O ",e.jsx("code",{children:"runsv"})," cuida do resto."]}),e.jsx(s,{title:"Exemplo: monitor de site simples",code:`mkdir -p $PREFIX/var/service/site-monitor/log

cat > $PREFIX/var/service/site-monitor/run <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
exec 2>&1
URL="https://meusite.com"
while true; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$URL")
  echo "$(date '+%F %T') $URL -> $CODE"
  sleep 30
done
EOF
chmod +x $PREFIX/var/service/site-monitor/run

# Log opcional via svlogd
cat > $PREFIX/var/service/site-monitor/log/run <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
exec svlogd -tt $PREFIX/var/log/sv/site-monitor
EOF
chmod +x $PREFIX/var/service/site-monitor/log/run

sv up site-monitor
sv status site-monitor`}),e.jsxs(o,{type:"info",title:"Por que foreground?",children:["Diferente do systemd, o runit assume que o processo NÃO se daemoniza. Se o seu binário tem flag ",e.jsx("code",{children:"--daemon"}),"/",e.jsx("code",{children:"-D"}),", DESLIGUE — o ",e.jsx("code",{children:"runsv"})," precisa do PID real para supervisionar. Por isso o ",e.jsx("code",{children:"nginx"})," roda com ",e.jsx("code",{children:"daemon off;"})," no",e.jsx("code",{children:"nginx.conf"})," embaixo do supervisor."]}),e.jsx("h2",{children:"3. tmux — sessões persistentes"}),e.jsxs("p",{children:["O Termux pode ser fechado pelo Android a qualquer momento. Para processos interativos longos (compilar algo, rodar Python, baixar torrent) use ",e.jsx("code",{children:"tmux"}),": a sessão fica viva mesmo quando você fecha a janela do Termux (desde que o app continue rodando em background)."]}),e.jsx(s,{title:"Fluxo básico do tmux",code:`pkg install tmux

tmux new -s trabalho       # cria sessão chamada "trabalho"
# ... rode seus comandos ...
# Detach:  Ctrl-b  d
tmux ls                    # lista sessões
tmux attach -t trabalho    # reanexa
tmux kill-session -t trabalho`}),e.jsxs(o,{type:"warning",title:"Wake lock para o Android não matar",children:["Mesmo dentro do tmux, o Android pode suspender o Termux. Ative o wake lock pelo notificação do app ou rode ",e.jsx("code",{children:"termux-wake-lock"})," (do pacote ",e.jsx("code",{children:"termux-api"}),"). Para liberar:"," ",e.jsx("code",{children:"termux-wake-unlock"}),"."]}),e.jsx("h2",{children:"4. nohup, disown e background"}),e.jsx("p",{children:"Para um único comando que precisa sobreviver ao fim da sessão atual (mas você não quer um serviço completo), use background tradicional:"}),e.jsx(s,{title:"Background simples",code:`# Roda em background imediatamente
python servidor.py &

# nohup: ignora SIGHUP quando o shell sai, redireciona stdout/stderr
nohup python servidor.py > server.log 2>&1 &

# disown: remove um job já em background da tabela do shell
python servidor.py &
disown %1

# Lista jobs
jobs -l`}),e.jsx("h2",{children:"5. Termux:Boot — auto-start ao ligar o celular"}),e.jsxs("p",{children:["O Android não chama nada do Termux automaticamente. Para rodar scripts quando o aparelho liga, instale o app companheiro"," ",e.jsx("strong",{children:"Termux:Boot"})," (F-Droid). Ele executa todo arquivo executável dentro de ",e.jsx("code",{children:"~/.termux/boot/"})," logo após o boot."]}),e.jsx(s,{title:"Auto-start de termux-services no boot",code:`mkdir -p ~/.termux/boot

# Mantém CPU acordada e sobe o supervisor de serviços
cat > ~/.termux/boot/start-services <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock
sv-enable sshd
EOF
chmod +x ~/.termux/boot/start-services`}),e.jsx(o,{type:"info",title:"Termux:Boot precisa de permissão",children:'Abra o app Termux:Boot UMA vez depois de instalar — sem isso, o Android não dispara o BOOT_COMPLETED para ele. Em fabricantes como Xiaomi/Oppo habilite "Autostart" nas configurações do app, senão o sistema bloqueia.'}),e.jsx("h2",{children:"6. Tarefas agendadas (substituto do systemd timer)"}),e.jsxs("p",{children:["Não há ",e.jsx("code",{children:"systemd-timer"}),". As opções são:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"cronie"})," + termux-services:"," ",e.jsx("code",{children:"pkg install cronie"}),", ",e.jsx("code",{children:"sv-enable crond"}),", edite com ",e.jsx("code",{children:"crontab -e"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"termux-job-scheduler"})," (do pacote"," ",e.jsx("code",{children:"termux-api"}),"): usa o ",e.jsx("em",{children:"JobScheduler"})," do Android, que é o jeito “certo” no Android moderno e respeita Doze mode."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tasker"})," (pago, Play Store) chamando scripts via intent ",e.jsx("code",{children:"RUN_COMMAND"}),"."]})]}),e.jsx(s,{title:"Exemplo com termux-job-scheduler",code:`pkg install termux-api

# Roda backup.sh a cada 6h, mesmo com tela apagada
termux-job-scheduler \\
  --script ~/scripts/backup.sh \\
  --period-ms 21600000 \\
  --persisted true

# Lista jobs ativos
termux-job-scheduler --pending

# Cancela
termux-job-scheduler --cancel-all`}),e.jsx("h2",{children:"7. Tabela de equivalências systemd → Termux"}),e.jsx(s,{title:"Cheat sheet",code:`systemctl start X            ->  sv up X
systemctl stop X             ->  sv down X
systemctl restart X          ->  sv restart X
systemctl status X           ->  sv status X
systemctl enable X           ->  sv-enable X
systemctl disable X          ->  sv-disable X
systemctl daemon-reload      ->  (não existe — sv recarrega sozinho)
journalctl -u X              ->  tail -f $PREFIX/var/log/sv/X/current
systemd-timer / cron         ->  cronie OU termux-job-scheduler
auto-start no boot           ->  ~/.termux/boot/  (app Termux:Boot)
nohup / disown               ->  iguais
processo longo interativo    ->  tmux`}),e.jsx(o,{type:"success",title:"Resumo",children:e.jsxs("ol",{children:[e.jsx("li",{children:"Não procure systemd — ele não existe e não vai existir no Android sem root."}),e.jsxs("li",{children:["Para serviços supervisionados: ",e.jsx("code",{children:"termux-services"})," + ",e.jsx("code",{children:"sv"}),"."]}),e.jsxs("li",{children:["Para sessões interativas que sobrevivem: ",e.jsx("code",{children:"tmux"})," + wake lock."]}),e.jsxs("li",{children:["Para auto-start no boot: app ",e.jsx("code",{children:"Termux:Boot"})," + ",e.jsx("code",{children:"~/.termux/boot/"}),"."]}),e.jsxs("li",{children:["Para agendar: ",e.jsx("code",{children:"cronie"})," (simples) ou ",e.jsx("code",{children:"termux-job-scheduler"})," (correto no Android)."]})]})})]})}export{c as default};

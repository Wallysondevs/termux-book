import{j as e}from"./index-DllpmZ7S.js";import{P as n}from"./PageContainer-D5o1LrsX.js";import{T as t,C as s,F as r}from"./Terminal-DJZg2Eps.js";import{I as i}from"./InfoBox-StGQOtUJ.js";import"./house-CLqZi7qQ.js";import"./proxy-Xil2K0n2.js";function u(){return e.jsxs(n,{title:"systemd e systemctl",subtitle:"Init system, gerenciador de serviços e supervisor de processos do Ubuntu — domine units, targets, timers e o ciclo de vida completo.",difficulty:"intermediario",timeToRead:"40 min",category:"Serviços do Sistema",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"systemd"})," é o init (PID 1) do Ubuntu desde a 15.04. Ele substituiu o antigo SysVinit/Upstart e centralizou em um único framework: inicialização do sistema (boot), supervisão de serviços, montagem de filesystems, timers (substituto moderno do cron), sockets, slices/cgroups, logs (journald), resolução DNS (resolved), sincronização de horário (timesyncd), gerenciamento de rede (networkd) e dezenas de outros componentes."]}),e.jsxs("p",{children:["A ferramenta de linha de comando principal é o ",e.jsx("code",{children:"systemctl"})," — com ela você inicia, para, reinicia, habilita, desabilita, mascara e inspeciona qualquer unit (service, socket, timer, target, mount, etc)."]}),e.jsxs(t,{title:"wallyson@ubuntu: ~",children:[e.jsx(s,{command:"systemctl --version",output:`systemd 255 (255.4-1ubuntu8.4)
+PAM +AUDIT +SELINUX +APPARMOR +IMA +SMACK +SECCOMP +GCRYPT +GNUTLS +OPENSSL +ACL +BLKID +CURL +ELFUTILS +FIDO2 +IDN2 -IDN +IPTC +KMOD +LIBCRYPTSETUP +LIBFDISK +PCRE2 -PWQUALITY +P11KIT +QRENCODE +TPM2 +BZIP2 +LZ4 +XZ +ZLIB +ZSTD +BPF_FRAMEWORK +XKBCOMMON +UTMP +SYSVINIT default-hierarchy=unified`}),e.jsx(s,{command:"systemctl is-system-running",output:"running"})]}),e.jsx("h2",{children:"1. Anatomia de uma unit"}),e.jsxs("p",{children:["Tudo que o systemd gerencia é uma ",e.jsx("strong",{children:"unit"}),". Existem 11 tipos principais. O sufixo do arquivo identifica o tipo: ",e.jsx("code",{children:".service"}),",",e.jsx("code",{children:".socket"}),", ",e.jsx("code",{children:".timer"}),", ",e.jsx("code",{children:".target"}),",",e.jsx("code",{children:".mount"}),", ",e.jsx("code",{children:".automount"}),", ",e.jsx("code",{children:".swap"}),",",e.jsx("code",{children:".path"}),", ",e.jsx("code",{children:".slice"}),", ",e.jsx("code",{children:".scope"}),",",e.jsx("code",{children:".device"}),"."]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Função"}),e.jsx("th",{children:"Exemplo"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:".service"}),e.jsx("td",{children:"Daemon ou processo"}),e.jsx("td",{children:"nginx.service"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".socket"}),e.jsx("td",{children:"Socket IPC/rede (ativação por socket)"}),e.jsx("td",{children:"ssh.socket"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".timer"}),e.jsx("td",{children:"Tarefa agendada (substitui cron)"}),e.jsx("td",{children:"logrotate.timer"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".target"}),e.jsx("td",{children:"Grupo de units (runlevel)"}),e.jsx("td",{children:"multi-user.target"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".mount"}),e.jsx("td",{children:"Ponto de montagem"}),e.jsx("td",{children:"home.mount"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".automount"}),e.jsx("td",{children:"Montagem sob demanda"}),e.jsx("td",{children:"proc-sys-fs-binfmt_misc.automount"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".swap"}),e.jsx("td",{children:"Área de swap"}),e.jsx("td",{children:"dev-sda2.swap"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".path"}),e.jsx("td",{children:"Disparada por mudança de arquivo"}),e.jsx("td",{children:"cups.path"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".slice"}),e.jsx("td",{children:"Grupo de cgroup"}),e.jsx("td",{children:"user-1000.slice"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".scope"}),e.jsx("td",{children:"Conjunto de processos externos"}),e.jsx("td",{children:"session-3.scope"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".device"}),e.jsx("td",{children:"Dispositivo (auto via udev)"}),e.jsx("td",{children:"sys-block-sda.device"})]})]})]}),e.jsx("h3",{children:"Localização das units"}),e.jsx("p",{children:"O systemd procura units em três diretórios, em ordem de precedência:"}),e.jsx(t,{children:e.jsx(s,{command:"systemctl show --property=UnitPath | tr ':' '\\n' | head -10",output:`/etc/systemd/system.control
/run/systemd/system.control
/run/systemd/transient
/run/systemd/generator.early
/etc/systemd/system
/etc/systemd/systemd.attached
/run/systemd/system
/run/systemd/systemd.attached
/usr/local/lib/systemd/system
/run/systemd/generator`})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"/usr/lib/systemd/system/"})," — units instaladas pelos pacotes (não editar manualmente)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"/run/systemd/system/"})," — units geradas em runtime (voláteis)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"/etc/systemd/system/"})," — overrides do administrador (precedência máxima)."]})]}),e.jsx("h2",{children:"2. systemctl — comandos essenciais"}),e.jsx("h3",{children:"status — estado atual da unit"}),e.jsx(t,{children:e.jsx(s,{command:"systemctl status ssh.service",output:`● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/usr/lib/systemd/system/ssh.service; enabled; preset: enabled)
     Active: active (running) since Mon 2025-04-14 09:12:45 -03; 3h 22min ago
       Docs: man:sshd(8)
             man:sshd_config(5)
   Main PID: 912 (sshd)
      Tasks: 1 (limit: 9388)
     Memory: 5.2M (peak: 7.1M)
        CPU: 240ms
     CGroup: /system.slice/ssh.service
             └─912 "sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups"

abr 14 09:12:45 ubuntu systemd[1]: Starting ssh.service - OpenBSD Secure Shell server...
abr 14 09:12:45 ubuntu sshd[912]: Server listening on 0.0.0.0 port 22.
abr 14 09:12:45 ubuntu sshd[912]: Server listening on :: port 22.
abr 14 09:12:45 ubuntu systemd[1]: Started ssh.service - OpenBSD Secure Shell server.
abr 14 11:45:02 ubuntu sshd[3120]: Accepted publickey for wallyson from 192.168.1.50 port 51234 ssh2: ED25519 SHA256:abc123...
abr 14 11:45:02 ubuntu sshd[3120]: pam_unix(sshd:session): session opened for user wallyson(uid=1000) by (uid=0)`})}),e.jsx("p",{children:"O ponto colorido (●) indica o estado: verde (ativo), branco (inativo), vermelho (failed)."}),e.jsx("h3",{children:"start / stop / restart / reload"}),e.jsxs(t,{children:[e.jsx(s,{root:!0,command:"systemctl start nginx"}),e.jsx(s,{root:!0,command:"systemctl stop nginx"}),e.jsx(s,{root:!0,command:"systemctl restart nginx",comment:"Para e inicia novamente — interrompe conexões existentes"}),e.jsx(s,{root:!0,command:"systemctl reload nginx",comment:"Recarrega config sem reiniciar (somente services que suportam)"}),e.jsx(s,{root:!0,command:"systemctl reload-or-restart nginx",comment:"Reload se possível, senão restart"})]}),e.jsxs(i,{type:"tip",title:"reload é mais leve que restart",children:["Sempre prefira ",e.jsx("code",{children:"reload"})," quando o serviço suporta. O Nginx, Apache e PostgreSQL recarregam configuração sem derrubar conexões. Use ",e.jsx("code",{children:"restart"}),"apenas quando alterar binários, dependências ou configurações que não suportam reload."]}),e.jsx("h3",{children:"enable / disable / mask / unmask"}),e.jsxs(t,{children:[e.jsx(s,{root:!0,command:"systemctl enable nginx",output:"Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /usr/lib/systemd/system/nginx.service.",comment:"Habilita iniciar no boot (cria symlink no target de wantedby)"}),e.jsx(s,{root:!0,command:"systemctl enable --now nginx",comment:"enable + start no mesmo comando",output:"Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /usr/lib/systemd/system/nginx.service."}),e.jsx(s,{root:!0,command:"systemctl disable nginx",output:"Removed /etc/systemd/system/multi-user.target.wants/nginx.service."}),e.jsx(s,{root:!0,command:"systemctl disable --now nginx",comment:"disable + stop no mesmo comando"}),e.jsx(s,{root:!0,command:"systemctl mask nginx",comment:"Mask: faz a unit virar /dev/null. Impede até start manual ou de dependências",output:"Created symlink /etc/systemd/system/nginx.service → /dev/null."}),e.jsx(s,{root:!0,command:"systemctl unmask nginx",output:"Removed /etc/systemd/system/nginx.service."})]}),e.jsxs(i,{type:"warning",title:"mask vs disable",children:[e.jsx("code",{children:"disable"})," apenas remove o autostart — alguém ainda pode iniciar o serviço manualmente ou via dependência. ",e.jsx("code",{children:"mask"})," torna o serviço completamente inacessível, mesmo para dependências automáticas. Use mask para garantir que algo nunca rode (ex.: ",e.jsx("code",{children:"systemctl mask bluetooth"})," em servidor headless)."]}),e.jsx("h3",{children:"is-active / is-enabled / is-failed"}),e.jsxs(t,{children:[e.jsx(s,{command:"systemctl is-active nginx",output:"active"}),e.jsx(s,{command:"systemctl is-enabled nginx",output:"enabled"}),e.jsx(s,{command:"systemctl is-failed nginx",output:"active"}),e.jsx(s,{command:"systemctl is-active nginx ssh cron",output:`active
active
active`})]}),e.jsx("p",{children:"Códigos de saída: 0 = condição satisfeita, >0 = não satisfeita. Útil em scripts:"}),e.jsx(t,{children:e.jsx(s,{command:'if systemctl is-active --quiet nginx; then echo "rodando"; else echo "parado"; fi',output:"rodando"})}),e.jsx("h3",{children:"list-units e list-unit-files"}),e.jsxs(t,{children:[e.jsx(s,{command:"systemctl list-units --type=service --state=running",output:`  UNIT                          LOAD   ACTIVE SUB     DESCRIPTION
  cron.service                  loaded active running Regular background program processing daemon
  dbus.service                  loaded active running D-Bus System Message Bus
  NetworkManager.service        loaded active running Network Manager
  nginx.service                 loaded active running A high performance web server
  rsyslog.service               loaded active running System Logging Service
  ssh.service                   loaded active running OpenBSD Secure Shell server
  systemd-journald.service      loaded active running Journal Service
  systemd-logind.service        loaded active running User Login Management
  systemd-resolved.service      loaded active running Network Name Resolution
  systemd-timesyncd.service     loaded active running Network Time Synchronization
  systemd-udevd.service         loaded active running Rule-based Manager for Device Events and Files
  unattended-upgrades.service   loaded active running Unattended Upgrades Shutdown
  user@1000.service             loaded active running User Manager for UID 1000

LOAD   = Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
SUB    = The low-level unit activation state, values depend on unit type.

13 loaded units listed.`}),e.jsx(s,{command:"systemctl list-unit-files --type=service --state=enabled",output:`UNIT FILE                              STATE   PRESET
cron.service                           enabled enabled
dbus.service                           enabled enabled
NetworkManager.service                 enabled enabled
nginx.service                          enabled enabled
ssh.service                            enabled enabled
systemd-resolved.service               enabled enabled
systemd-timesyncd.service              enabled enabled
unattended-upgrades.service            enabled enabled

8 unit files listed.`}),e.jsx(s,{command:"systemctl list-units --failed",output:`  UNIT             LOAD   ACTIVE SUB    DESCRIPTION
● apache2.service loaded failed failed The Apache HTTP Server

1 loaded units listed.`})]}),e.jsx("h3",{children:"cat / show / edit"}),e.jsxs(t,{children:[e.jsx(s,{command:"systemctl cat ssh.service",output:`# /usr/lib/systemd/system/ssh.service
[Unit]
Description=OpenBSD Secure Shell server
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target auditd.service
ConditionPathExists=!/etc/ssh/sshd_not_to_be_run

[Service]
EnvironmentFile=-/etc/default/ssh
ExecStartPre=/usr/sbin/sshd -t
ExecStart=/usr/sbin/sshd -D $SSHD_OPTS
ExecReload=/usr/sbin/sshd -t
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartPreventExitStatus=255
Type=notify
RuntimeDirectory=sshd
RuntimeDirectoryMode=0755

[Install]
WantedBy=multi-user.target
Alias=sshd.service`}),e.jsx(s,{command:"systemctl show ssh.service --property=MainPID,ActiveState,SubState,Restart",output:`MainPID=912
ActiveState=active
SubState=running
Restart=on-failure`})]}),e.jsxs("p",{children:[e.jsx("code",{children:"systemctl edit nginx"})," abre o editor padrão e cria",e.jsx("code",{children:" /etc/systemd/system/nginx.service.d/override.conf"}),". Use",e.jsx("code",{children:" --full"})," para editar uma cópia completa em vez de só um override."]}),e.jsx(t,{children:e.jsx(s,{root:!0,command:"systemctl edit nginx",comment:"Cria override interativo",output:`### Editing /etc/systemd/system/nginx.service.d/override.conf
### Anything between here and the comment below will become the new contents of the file

[Service]
Restart=always
RestartSec=5

### Lines below this comment will be discarded`})}),e.jsxs(i,{type:"note",title:"Sempre rode daemon-reload após alterar units",children:["Após editar/criar/remover qualquer unit fora de ",e.jsx("code",{children:"systemctl edit"}),", execute",e.jsx("code",{children:" sudo systemctl daemon-reload"}),` para o systemd reler. Se você esquecer, verá o aviso "Warning: The unit file, source configuration file or drop-ins of nginx.service changed on disk. Run 'systemctl daemon-reload' to reload units."`]}),e.jsx("h2",{children:"3. Targets (runlevels modernos)"}),e.jsx("p",{children:"Targets agrupam units. Substituem os runlevels do SysVinit. Os principais:"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Target"}),e.jsx("th",{children:"Equivalente SysV"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"poweroff.target"}),e.jsx("td",{children:"0"}),e.jsx("td",{children:"Desligamento"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"rescue.target"}),e.jsx("td",{children:"1 (single)"}),e.jsx("td",{children:"Modo single-user com root"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"multi-user.target"}),e.jsx("td",{children:"3"}),e.jsx("td",{children:"Sistema completo, sem GUI"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"graphical.target"}),e.jsx("td",{children:"5"}),e.jsx("td",{children:"Sistema completo + GUI (depende de multi-user)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"reboot.target"}),e.jsx("td",{children:"6"}),e.jsx("td",{children:"Reinicia"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"emergency.target"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Shell mínimo, / read-only, /usr não montado"})]})]})]}),e.jsxs(t,{children:[e.jsx(s,{command:"systemctl get-default",output:"graphical.target"}),e.jsx(s,{root:!0,command:"systemctl set-default multi-user.target",output:`Removed /etc/systemd/system/default.target.
Created symlink /etc/systemd/system/default.target → /usr/lib/systemd/system/multi-user.target.`}),e.jsx(s,{root:!0,command:"systemctl isolate multi-user.target",comment:"Troca para esse target imediatamente (mata GUI etc)"}),e.jsx(s,{command:"systemctl list-dependencies multi-user.target",output:`multi-user.target
● ├─cron.service
● ├─dbus.service
● ├─nginx.service
● ├─ssh.service
● ├─systemd-logind.service
● ├─basic.target
● │ ├─paths.target
● │ ├─slices.target
● │ ├─sockets.target
● │ ├─sysinit.target
● │ └─timers.target
● └─getty.target
●   └─getty@tty1.service`})]}),e.jsx("h2",{children:"4. Criar um serviço próprio (.service)"}),e.jsx("p",{children:"Vamos criar um serviço completo que executa um script de monitoramento periódico, com restart automático em caso de falha, log estruturado, hardening e dependências."}),e.jsx(r,{path:"/usr/local/bin/site-monitor.sh",children:`#!/bin/bash
# Verifica se o site está respondendo a cada 30s

URL="\${MONITOR_URL:-https://meusite.com}"
LOGFILE="/var/log/site-monitor.log"

while true; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$URL")
  TS=$(date '+%Y-%m-%d %H:%M:%S')

  if [ "$CODE" = "200" ]; then
    echo "[$TS] OK ($CODE) $URL" >> "$LOGFILE"
  else
    echo "[$TS] FALHA ($CODE) $URL" >> "$LOGFILE"
  fi

  sleep 30
done`}),e.jsx(t,{children:e.jsx(s,{root:!0,command:"chmod +x /usr/local/bin/site-monitor.sh"})}),e.jsx(r,{path:"/etc/systemd/system/site-monitor.service",children:`[Unit]
Description=Monitor de disponibilidade do site institucional
Documentation=https://wiki.empresa.com/site-monitor
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/local/bin/site-monitor.sh
Restart=on-failure
RestartSec=10
StartLimitIntervalSec=60
StartLimitBurst=5

# Identidade
User=monitor
Group=monitor

# Ambiente
Environment="MONITOR_URL=https://wallyson.dev"
EnvironmentFile=-/etc/default/site-monitor

# Hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/log
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictNamespaces=true
RestrictRealtime=true
RestrictSUIDSGID=true
LockPersonality=true
MemoryDenyWriteExecute=true
SystemCallArchitectures=native
SystemCallFilter=@system-service
SystemCallFilter=~@privileged @resources

# Limites
LimitNOFILE=4096
MemoryMax=128M
CPUQuota=20%

# Log
StandardOutput=journal
StandardError=journal
SyslogIdentifier=site-monitor

[Install]
WantedBy=multi-user.target`}),e.jsxs(t,{children:[e.jsx(s,{root:!0,command:"useradd --system --no-create-home --shell /usr/sbin/nologin monitor"}),e.jsx(s,{root:!0,command:"touch /var/log/site-monitor.log && chown monitor:monitor /var/log/site-monitor.log"}),e.jsx(s,{root:!0,command:"systemctl daemon-reload"}),e.jsx(s,{root:!0,command:"systemctl enable --now site-monitor",output:"Created symlink /etc/systemd/system/multi-user.target.wants/site-monitor.service → /etc/systemd/system/site-monitor.service."}),e.jsx(s,{command:"systemctl status site-monitor --no-pager",output:`● site-monitor.service - Monitor de disponibilidade do site institucional
     Loaded: loaded (/etc/systemd/system/site-monitor.service; enabled; preset: enabled)
     Active: active (running) since Mon 2025-04-14 14:02:11 -03; 12s ago
       Docs: https://wiki.empresa.com/site-monitor
   Main PID: 4521 (site-monitor.sh)
      Tasks: 2 (limit: 9388)
     Memory: 1.2M (max: 128.0M available: 126.7M)
        CPU: 35ms
     CGroup: /system.slice/site-monitor.service
             ├─4521 /bin/bash /usr/local/bin/site-monitor.sh
             └─4533 sleep 30

abr 14 14:02:11 ubuntu systemd[1]: Started site-monitor.service - Monitor de disponibilidade do site institucional.`})]}),e.jsx("h3",{children:"Tipos de Service (Type=)"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Quando usar"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"simple"})," (default)"]}),e.jsx("td",{children:"Processo principal não forka. Mais comum em apps modernas."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"exec"})}),e.jsx("td",{children:'Como simple, mas systemd só considera "started" após execve() retornar.'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"forking"})}),e.jsx("td",{children:"Daemons clássicos que se desconectam (Apache modo prefork, sshd antigo)."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"oneshot"})}),e.jsxs("td",{children:["Roda uma vez e termina (scripts de setup). Combine com ",e.jsx("code",{children:"RemainAfterExit=yes"}),"."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"notify"})}),e.jsxs("td",{children:["Processo notifica systemd via ",e.jsx("code",{children:"sd_notify()"})," quando pronto. Ex.: nginx, systemd-resolved."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"dbus"})}),e.jsx("td",{children:"Serviço considera-se pronto quando aparece no D-Bus."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"idle"})}),e.jsx("td",{children:"Adia execução até que outras tarefas terminem (limpa output do boot)."})]})]})]}),e.jsx("h3",{children:"Diretivas de [Unit]"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"After="})," ordem (ex: ",e.jsx("code",{children:"After=network.target"}),")."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Before="})," ordem inversa."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Requires="})," dependência forte (se a outra falhar, esta também falha)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Wants="})," dependência fraca (não falha se a outra falhar)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"BindsTo="})," ainda mais forte que Requires (estado atrelado)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Conflicts="})," não pode rodar junto."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ConditionPathExists="}),", ",e.jsx("strong",{children:"ConditionFileNotEmpty="}),", ",e.jsx("strong",{children:"ConditionHost="})," condições para iniciar."]})]}),e.jsx("h3",{children:"Diretivas de [Service] mais usadas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ExecStart="})," comando principal (obrigatório, exceto oneshot)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ExecStartPre="}),", ",e.jsx("strong",{children:"ExecStartPost="})," hooks antes/depois."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ExecReload="})," comando para reload (geralmente ",e.jsx("code",{children:"kill -HUP $MAINPID"}),")."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ExecStop="})," comando para parar (default: SIGTERM ao MainPID)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Restart="})," ",e.jsx("code",{children:"no | on-success | on-failure | on-abnormal | on-watchdog | on-abort | always"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"RestartSec="})," espera entre tentativas (default 100ms)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"StartLimitBurst="})," + ",e.jsx("strong",{children:"StartLimitIntervalSec="})," evita loop infinito de restart."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"TimeoutStartSec="}),", ",e.jsx("strong",{children:"TimeoutStopSec="})," (default 90s)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"WorkingDirectory="}),", ",e.jsx("strong",{children:"RootDirectory="}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"User="}),", ",e.jsx("strong",{children:"Group="}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Environment="}),", ",e.jsx("strong",{children:"EnvironmentFile="}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"StandardOutput="})," ",e.jsx("code",{children:"journal | inherit | null | tty | file:/path | append:/path"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SyslogIdentifier="})," nome no journal."]})]}),e.jsx("h2",{children:"5. Sockets (.socket) e activation"}),e.jsx("p",{children:"Socket activation é uma das features mais elegantes do systemd: o systemd abre o socket TCP/Unix e só inicia o daemon quando chega a primeira conexão. O serviço herda o file descriptor já aberto."}),e.jsx(r,{path:"/etc/systemd/system/echo.socket",children:`[Unit]
Description=Echo Service Socket

[Socket]
ListenStream=2323
Accept=yes

[Install]
WantedBy=sockets.target`}),e.jsx(r,{path:"/etc/systemd/system/echo@.service",children:`[Unit]
Description=Echo Service Instance

[Service]
ExecStart=-/usr/bin/cat
StandardInput=socket
StandardOutput=socket
StandardError=journal`}),e.jsxs(t,{children:[e.jsx(s,{root:!0,command:"systemctl daemon-reload && systemctl enable --now echo.socket"}),e.jsx(s,{command:"ss -tlnp | grep 2323",output:'LISTEN 0      4096               *:2323            *:*    users:(("systemd",pid=1,fd=68))'}),e.jsx(s,{command:"echo 'oi' | nc -q1 localhost 2323",output:"oi"}),e.jsx(s,{command:"systemctl status 'echo@*'",output:`● echo@2-127.0.0.1:2323-127.0.0.1:51842.service - Echo Service Instance (127.0.0.1:51842)
     Loaded: loaded (/etc/systemd/system/echo@.service; static)
     Active: inactive (dead) since Mon 2025-04-14 14:18:04 -03; 5s ago
TriggeredBy: ● echo.socket
   Main PID: 4711 (code=exited, status=0/SUCCESS)
        CPU: 4ms`})]}),e.jsx("h2",{children:"6. Timers (.timer) — substituto moderno do cron"}),e.jsxs("p",{children:["Timers do systemd são mais poderosos que cron: permitem execução baseada em eventos (boot, ativação de outra unit), persistência (",e.jsx("code",{children:"Persistent=true"})," roda tarefas perdidas após o sistema voltar do sleep), randomização (",e.jsx("code",{children:"RandomizedDelaySec="}),"), accuracy configurável e total integração com journald."]}),e.jsx(r,{path:"/etc/systemd/system/backup-diario.service",children:`[Unit]
Description=Backup diário do /home para /mnt/backup
After=network-online.target

[Service]
Type=oneshot
Nice=19
IOSchedulingClass=idle
ExecStart=/usr/local/bin/rsync-home.sh
StandardOutput=journal
StandardError=journal
SyslogIdentifier=backup-diario`}),e.jsx(r,{path:"/etc/systemd/system/backup-diario.timer",children:`[Unit]
Description=Dispara backup diário às 02:30

[Timer]
OnCalendar=*-*-* 02:30:00
RandomizedDelaySec=15min
Persistent=true
Unit=backup-diario.service

[Install]
WantedBy=timers.target`}),e.jsxs(t,{children:[e.jsx(s,{root:!0,command:"systemctl daemon-reload && systemctl enable --now backup-diario.timer",output:"Created symlink /etc/systemd/system/timers.target.wants/backup-diario.timer → /etc/systemd/system/backup-diario.timer."}),e.jsx(s,{command:"systemctl list-timers --all",output:`NEXT                            LEFT          LAST                            PASSED       UNIT                         ACTIVATES
Tue 2025-04-15 02:30:00 -03     11h left      Mon 2025-04-14 02:30:00 -03     12h ago      backup-diario.timer          backup-diario.service
Tue 2025-04-15 00:00:00 -03     9h left       Mon 2025-04-14 00:00:00 -03     14h ago      logrotate.timer              logrotate.service
Tue 2025-04-15 00:00:00 -03     9h left       Mon 2025-04-14 00:00:00 -03     14h ago      man-db.timer                 man-db.service
Mon 2025-04-14 17:48:21 -03     3h 35min left Mon 2025-04-14 11:48:21 -03     2h 24min ago anacron.timer                anacron.service
Mon 2025-04-14 14:51:38 -03     38min left    Mon 2025-04-14 13:51:38 -03     21min ago    apt-daily.timer              apt-daily.service
Sun 2025-04-20 03:10:30 -03     5 days left   Sun 2025-04-13 03:10:30 -03     1 day ago    fstrim.timer                 fstrim.service

6 timers listed.`})]}),e.jsx("h3",{children:"Sintaxe OnCalendar="}),e.jsxs(t,{children:[e.jsx(s,{command:"systemd-analyze calendar 'Mon..Fri *-*-* 09:00:00'",output:`  Original form: Mon..Fri *-*-* 09:00:00
Normalized form: Mon..Fri *-*-* 09:00:00
    Next elapse: Tue 2025-04-15 09:00:00 -03
       (in UTC): Tue 2025-04-15 12:00:00 UTC
       From now: 18h left`}),e.jsx(s,{command:"systemd-analyze calendar 'hourly' 'daily' 'weekly' 'monthly'",output:`  Original form: hourly
Normalized form: *-*-* *:00:00
    Next elapse: Mon 2025-04-14 15:00:00 -03

  Original form: daily
Normalized form: *-*-* 00:00:00
    Next elapse: Tue 2025-04-15 00:00:00 -03

  Original form: weekly
Normalized form: Mon *-*-* 00:00:00
    Next elapse: Mon 2025-04-21 00:00:00 -03

  Original form: monthly
Normalized form: *-*-01 00:00:00
    Next elapse: Thu 2025-05-01 00:00:00 -03`})]}),e.jsx("p",{children:"Outras keys de [Timer]:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"OnBootSec="})," tempo após boot"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"OnUnitActiveSec="})," tempo desde última execução"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"OnStartupSec="})," tempo após startup do systemd"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"AccuracySec="})," default 1min — agrupa timers próximos para economizar wakeups"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"WakeSystem=true"})," acorda o sistema do suspend"]})]}),e.jsx("h2",{children:"7. Análise de boot"}),e.jsxs(t,{children:[e.jsx(s,{command:"systemd-analyze",output:`Startup finished in 3.421s (firmware) + 2.115s (loader) + 1.823s (kernel) + 4.502s (userspace) = 11.861s
graphical.target reached after 4.498s in userspace.`}),e.jsx(s,{command:"systemd-analyze blame | head -15",output:`5.214s snapd.service
3.892s NetworkManager-wait-online.service
1.421s plymouth-quit-wait.service
 921ms dev-nvme0n1p2.device
 612ms snapd.seeded.service
 487ms apparmor.service
 312ms ModemManager.service
 245ms accounts-daemon.service
 214ms systemd-journal-flush.service
 198ms systemd-logind.service
 175ms udisks2.service
 142ms ssh.service
 128ms cron.service
  98ms apt-daily.service
  87ms systemd-resolved.service`}),e.jsx(s,{command:"systemd-analyze critical-chain",output:`The time when unit became active or started is printed after the "@" character.
The time the unit took to start is printed after the "+" character.

graphical.target @4.498s
└─multi-user.target @4.498s
  └─snapd.service @283ms +5.214s
    └─basic.target @258ms
      └─sockets.target @257ms
        └─snapd.socket @256ms +1ms
          └─sysinit.target @255ms
            └─systemd-update-utmp.service @241ms +13ms
              └─systemd-journal-flush.service @26ms +214ms
                └─var-log.mount @24ms +1ms
                  └─local-fs-pre.target @23ms
                    └─keyboard-setup.service @8ms +14ms
                      └─systemd-journald.socket @5ms
                        └─system.slice @4ms
                          └─-.slice @4ms`}),e.jsx(s,{command:"systemd-analyze plot > boot.svg",comment:"Gera SVG bonitão da timeline de boot"}),e.jsx(s,{command:"systemd-analyze verify /etc/systemd/system/site-monitor.service",comment:"Valida sintaxe da unit"})]}),e.jsx("h2",{children:"8. Cgroups, slices e limites de recurso"}),e.jsxs("p",{children:["O systemd organiza tudo em uma árvore de cgroups v2. Use ",e.jsx("code",{children:"systemd-cgls"}),"para visualizar e ",e.jsx("code",{children:"systemd-cgtop"})," para monitorar consumo."]}),e.jsxs(t,{children:[e.jsx(s,{command:"systemd-cgls --no-pager | head -30",output:`Control group /:
-.slice
├─user.slice (#3812)
│ └─user-1000.slice (#7321)
│   ├─session-3.scope (#7745)
│   │ ├─2812 sshd: wallyson [priv]
│   │ ├─2891 sshd: wallyson@pts/0
│   │ ├─2892 -bash
│   │ └─4892 systemd-cgls --no-pager
│   └─user@1000.service (#8124)
│     ├─app.slice
│     │ ├─dbus.service
│     │ │ └─2810 /usr/bin/dbus-daemon --session --address=systemd:
│     │ └─pipewire.service
│     │   └─2820 /usr/bin/pipewire
│     └─init.scope
│       └─2782 /lib/systemd/systemd --user
└─system.slice
  ├─nginx.service
  │ ├─1042 "nginx: master process /usr/sbin/nginx"
  │ ├─1043 "nginx: worker process"
  │ └─1044 "nginx: worker process"
  ├─ssh.service
  │ └─912 sshd: /usr/sbin/sshd -D [listener]
  └─systemd-journald.service
    └─612 /usr/lib/systemd/systemd-journald`}),e.jsx(s,{command:"systemd-cgtop -n 1",output:`CGroup                                                          Tasks   %CPU   Memory  Input/s Output/s
/                                                                 412   12.4   3.2G        -        -
user.slice                                                        184    8.9   1.8G        -        -
user.slice/user-1000.slice                                        184    8.9   1.8G        -        -
user.slice/user-1000.slice/user@1000.service                      168    7.2   1.6G        -        -
system.slice                                                      210    3.5   1.4G        -        -
system.slice/snap.firefox.firefox.scope                            45    2.1   850M        -        -
system.slice/nginx.service                                          3    0.1    25M        -        -`}),e.jsx(s,{root:!0,command:"systemctl set-property nginx.service CPUQuota=50% MemoryMax=512M",comment:"Limites em runtime, persistido em /etc/systemd/system.control/"})]}),e.jsx("h2",{children:"9. systemd-run — rodar comando ad-hoc como unit"}),e.jsxs(t,{children:[e.jsx(s,{root:!0,command:"systemd-run --unit=meu-job --on-active=30s /usr/bin/touch /tmp/teste",output:`Running timer as unit: meu-job.timer
Will run service as unit: meu-job.service`}),e.jsx(s,{root:!0,command:"systemd-run --scope -p MemoryMax=200M -p CPUQuota=30% bash",comment:"Shell em scope com limites",output:`Running scope as unit: run-r4f8b2c9d1e54a3b8.scope
root@ubuntu:~#`}),e.jsx(s,{root:!0,command:"systemd-run --uid=monitor --gid=monitor /usr/local/bin/site-monitor.sh"})]}),e.jsx("h2",{children:"10. Hostname, locale, timezone via systemd"}),e.jsxs(t,{children:[e.jsx(s,{command:"hostnamectl",output:`   Static hostname: ubuntu
         Icon name: computer-desktop
           Chassis: desktop 🖥️
        Machine ID: 9b3e2c4d8f4e4b1ca2c2b8a4d3e5f6a7
           Boot ID: a1b2c3d4e5f64a7b8c9d0e1f2a3b4c5d
  Operating System: Ubuntu 24.04.2 LTS
            Kernel: Linux 6.8.0-52-generic
      Architecture: x86-64
   Hardware Vendor: ASUS
    Hardware Model: ROG STRIX B550-F GAMING
  Firmware Version: 3404`}),e.jsx(s,{root:!0,command:"hostnamectl set-hostname wallyson-pc"}),e.jsx(s,{command:"timedatectl",output:`               Local time: Mon 2025-04-14 14:42:18 -03
           Universal time: Mon 2025-04-14 17:42:18 UTC
                 RTC time: Mon 2025-04-14 17:42:18
                Time zone: America/Sao_Paulo (-03, -0300)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no`}),e.jsx(s,{root:!0,command:"timedatectl set-timezone America/Sao_Paulo"}),e.jsx(s,{root:!0,command:"timedatectl set-ntp true"}),e.jsx(s,{command:"localectl",output:`   System Locale: LANG=pt_BR.UTF-8
                  LANGUAGE=pt_BR
       VC Keymap: br-abnt2
      X11 Layout: br
       X11 Model: abnt2`}),e.jsx(s,{root:!0,command:"localectl set-locale LANG=pt_BR.UTF-8"})]}),e.jsx("h2",{children:"11. Troubleshooting"}),e.jsx("h3",{children:"Serviço falhou ao iniciar"}),e.jsxs(t,{children:[e.jsx(s,{command:"systemctl --failed",output:`  UNIT             LOAD   ACTIVE SUB    DESCRIPTION
● apache2.service loaded failed failed The Apache HTTP Server`}),e.jsx(s,{command:"systemctl status apache2 --no-pager -l",output:`× apache2.service - The Apache HTTP Server
     Loaded: loaded (/usr/lib/systemd/system/apache2.service; enabled; preset: enabled)
     Active: failed (Result: exit-code) since Mon 2025-04-14 14:48:11 -03; 9s ago
   Duration: 12ms
    Process: 5012 ExecStart=/usr/sbin/apachectl start (code=exited, status=1/FAILURE)
        CPU: 89ms

abr 14 14:48:11 ubuntu apachectl[5018]: AH00558: apache2: Could not reliably determine the server's fully qualified domain name
abr 14 14:48:11 ubuntu apachectl[5018]: (98)Address already in use: AH00072: make_sock: could not bind to address [::]:80
abr 14 14:48:11 ubuntu apachectl[5018]: no listening sockets available, shutting down
abr 14 14:48:11 ubuntu apachectl[5018]: AH00015: Unable to open logs
abr 14 14:48:11 ubuntu apachectl[5012]: Action 'start' failed.
abr 14 14:48:11 ubuntu systemd[1]: apache2.service: Control process exited, code=exited, status=1/FAILURE
abr 14 14:48:11 ubuntu systemd[1]: apache2.service: Failed with result 'exit-code'.`}),e.jsx(s,{command:"ss -tlnp | grep ':80 '",output:'LISTEN 0      511                *:80              *:*    users:(("nginx",pid=1042,fd=6),("nginx",pid=1043,fd=6))'}),e.jsx(s,{root:!0,command:"systemctl reset-failed apache2",comment:"Limpa o estado 'failed'"})]}),e.jsx("h3",{children:"Boot travando — modos de emergência"}),e.jsxs("p",{children:["Edite a entrada do GRUB (pressione ",e.jsx("code",{children:"e"}),") e adicione um destes parâmetros na linha que começa com ",e.jsx("code",{children:"linux"}),":"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"systemd.unit=rescue.target"})," — boot em modo rescue (single user)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"systemd.unit=emergency.target"})," — boot em emergência (mais mínimo)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"systemd.debug-shell=1"})," — abre tty9 com shell root"]}),e.jsxs("li",{children:[e.jsx("code",{children:"init=/bin/bash"})," — pula o systemd e cai num bash (último recurso)"]})]}),e.jsxs(i,{type:"danger",title:"systemctl daemon-reexec",children:["Em casos extremos (ex: atualizou systemd via apt e algo está esquisito), execute",e.jsx("code",{children:" sudo systemctl daemon-reexec"})," para reexecutar o PID 1 in-place. É como reiniciar o systemd sem reiniciar a máquina."]}),e.jsx("h2",{children:"12. Cheatsheet final"}),e.jsxs(t,{children:[e.jsx(s,{command:"systemctl status NOME"}),e.jsx(s,{command:"systemctl list-units --type=service"}),e.jsx(s,{command:"systemctl list-units --failed"}),e.jsx(s,{command:"systemctl list-unit-files --state=enabled"}),e.jsx(s,{command:"systemctl list-dependencies NOME"}),e.jsx(s,{root:!0,command:"systemctl start NOME"}),e.jsx(s,{root:!0,command:"systemctl stop NOME"}),e.jsx(s,{root:!0,command:"systemctl restart NOME"}),e.jsx(s,{root:!0,command:"systemctl reload NOME"}),e.jsx(s,{root:!0,command:"systemctl enable --now NOME"}),e.jsx(s,{root:!0,command:"systemctl disable --now NOME"}),e.jsx(s,{root:!0,command:"systemctl mask NOME"}),e.jsx(s,{root:!0,command:"systemctl unmask NOME"}),e.jsx(s,{root:!0,command:"systemctl edit NOME"}),e.jsx(s,{root:!0,command:"systemctl edit --full NOME"}),e.jsx(s,{root:!0,command:"systemctl daemon-reload"}),e.jsx(s,{command:"systemd-analyze blame"}),e.jsx(s,{command:"systemd-analyze critical-chain"}),e.jsx(s,{command:"systemd-analyze verify ARQUIVO.service"}),e.jsx(s,{command:"systemd-analyze calendar 'Mon..Fri 09:00'"}),e.jsx(s,{command:"systemctl get-default"}),e.jsx(s,{root:!0,command:"systemctl set-default multi-user.target"}),e.jsx(s,{root:!0,command:"systemctl isolate rescue.target"}),e.jsx(s,{command:"systemctl list-timers --all"}),e.jsx(s,{command:"journalctl -u NOME -f"})]}),e.jsxs(i,{type:"success",title:"Próximos passos",children:["Continue lendo a página ",e.jsx("strong",{children:"journalctl"})," para dominar a inspeção de logs do systemd, e depois ",e.jsx("strong",{children:"cron"})," para comparar com a abordagem clássica de agendamento."]})]})}export{u as default};

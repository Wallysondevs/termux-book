import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Systemd() {
  return (
    <PageContainer
      title="systemd e systemctl"
      subtitle="Init system, gerenciador de serviços e supervisor de processos do Ubuntu — domine units, targets, timers e o ciclo de vida completo."
      difficulty="intermediario"
      timeToRead="40 min"
      category="Serviços do Sistema"
    >
      <p>
        O <strong>systemd</strong> é o init (PID 1) do Ubuntu desde a 15.04. Ele substituiu o
        antigo SysVinit/Upstart e centralizou em um único framework: inicialização do sistema
        (boot), supervisão de serviços, montagem de filesystems, timers (substituto moderno
        do cron), sockets, slices/cgroups, logs (journald), resolução DNS (resolved),
        sincronização de horário (timesyncd), gerenciamento de rede (networkd) e dezenas de
        outros componentes.
      </p>

      <p>
        A ferramenta de linha de comando principal é o <code>systemctl</code> — com ela
        você inicia, para, reinicia, habilita, desabilita, mascara e inspeciona qualquer
        unit (service, socket, timer, target, mount, etc).
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="systemctl --version" output={`systemd 255 (255.4-1ubuntu8.4)
+PAM +AUDIT +SELINUX +APPARMOR +IMA +SMACK +SECCOMP +GCRYPT +GNUTLS +OPENSSL +ACL +BLKID +CURL +ELFUTILS +FIDO2 +IDN2 -IDN +IPTC +KMOD +LIBCRYPTSETUP +LIBFDISK +PCRE2 -PWQUALITY +P11KIT +QRENCODE +TPM2 +BZIP2 +LZ4 +XZ +ZLIB +ZSTD +BPF_FRAMEWORK +XKBCOMMON +UTMP +SYSVINIT default-hierarchy=unified`} />
        <Command command="systemctl is-system-running" output="running" />
      </Terminal>

      <h2>1. Anatomia de uma unit</h2>

      <p>
        Tudo que o systemd gerencia é uma <strong>unit</strong>. Existem 11 tipos
        principais. O sufixo do arquivo identifica o tipo: <code>.service</code>,
        <code>.socket</code>, <code>.timer</code>, <code>.target</code>,
        <code>.mount</code>, <code>.automount</code>, <code>.swap</code>,
        <code>.path</code>, <code>.slice</code>, <code>.scope</code>,
        <code>.device</code>.
      </p>

      <table>
        <thead>
          <tr><th>Tipo</th><th>Função</th><th>Exemplo</th></tr>
        </thead>
        <tbody>
          <tr><td>.service</td><td>Daemon ou processo</td><td>nginx.service</td></tr>
          <tr><td>.socket</td><td>Socket IPC/rede (ativação por socket)</td><td>ssh.socket</td></tr>
          <tr><td>.timer</td><td>Tarefa agendada (substitui cron)</td><td>logrotate.timer</td></tr>
          <tr><td>.target</td><td>Grupo de units (runlevel)</td><td>multi-user.target</td></tr>
          <tr><td>.mount</td><td>Ponto de montagem</td><td>home.mount</td></tr>
          <tr><td>.automount</td><td>Montagem sob demanda</td><td>proc-sys-fs-binfmt_misc.automount</td></tr>
          <tr><td>.swap</td><td>Área de swap</td><td>dev-sda2.swap</td></tr>
          <tr><td>.path</td><td>Disparada por mudança de arquivo</td><td>cups.path</td></tr>
          <tr><td>.slice</td><td>Grupo de cgroup</td><td>user-1000.slice</td></tr>
          <tr><td>.scope</td><td>Conjunto de processos externos</td><td>session-3.scope</td></tr>
          <tr><td>.device</td><td>Dispositivo (auto via udev)</td><td>sys-block-sda.device</td></tr>
        </tbody>
      </table>

      <h3>Localização das units</h3>

      <p>O systemd procura units em três diretórios, em ordem de precedência:</p>

      <Terminal>
        <Command
          command="systemctl show --property=UnitPath | tr ':' '\n' | head -10"
          output={`/etc/systemd/system.control
/run/systemd/system.control
/run/systemd/transient
/run/systemd/generator.early
/etc/systemd/system
/etc/systemd/systemd.attached
/run/systemd/system
/run/systemd/systemd.attached
/usr/local/lib/systemd/system
/run/systemd/generator`}
        />
      </Terminal>

      <ul>
        <li><code>/usr/lib/systemd/system/</code> — units instaladas pelos pacotes (não editar manualmente).</li>
        <li><code>/run/systemd/system/</code> — units geradas em runtime (voláteis).</li>
        <li><code>/etc/systemd/system/</code> — overrides do administrador (precedência máxima).</li>
      </ul>

      <h2>2. systemctl — comandos essenciais</h2>

      <h3>status — estado atual da unit</h3>

      <Terminal>
        <Command command="systemctl status ssh.service" output={`● ssh.service - OpenBSD Secure Shell server
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
abr 14 11:45:02 ubuntu sshd[3120]: pam_unix(sshd:session): session opened for user wallyson(uid=1000) by (uid=0)`} />
      </Terminal>

      <p>O ponto colorido (●) indica o estado: verde (ativo), branco (inativo), vermelho (failed).</p>

      <h3>start / stop / restart / reload</h3>

      <Terminal>
        <Command root command="systemctl start nginx" />
        <Command root command="systemctl stop nginx" />
        <Command
          root
          command="systemctl restart nginx"
          comment="Para e inicia novamente — interrompe conexões existentes"
        />
        <Command
          root
          command="systemctl reload nginx"
          comment="Recarrega config sem reiniciar (somente services que suportam)"
        />
        <Command root command="systemctl reload-or-restart nginx" comment="Reload se possível, senão restart" />
      </Terminal>

      <InfoBox type="tip" title="reload é mais leve que restart">
        Sempre prefira <code>reload</code> quando o serviço suporta. O Nginx, Apache e
        PostgreSQL recarregam configuração sem derrubar conexões. Use <code>restart</code>
        apenas quando alterar binários, dependências ou configurações que não suportam reload.
      </InfoBox>

      <h3>enable / disable / mask / unmask</h3>

      <Terminal>
        <Command
          root
          command="systemctl enable nginx"
          output="Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /usr/lib/systemd/system/nginx.service."
          comment="Habilita iniciar no boot (cria symlink no target de wantedby)"
        />
        <Command
          root
          command="systemctl enable --now nginx"
          comment="enable + start no mesmo comando"
          output={`Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /usr/lib/systemd/system/nginx.service.`}
        />
        <Command
          root
          command="systemctl disable nginx"
          output="Removed /etc/systemd/system/multi-user.target.wants/nginx.service."
        />
        <Command
          root
          command="systemctl disable --now nginx"
          comment="disable + stop no mesmo comando"
        />
        <Command
          root
          command="systemctl mask nginx"
          comment="Mask: faz a unit virar /dev/null. Impede até start manual ou de dependências"
          output="Created symlink /etc/systemd/system/nginx.service → /dev/null."
        />
        <Command
          root
          command="systemctl unmask nginx"
          output="Removed /etc/systemd/system/nginx.service."
        />
      </Terminal>

      <InfoBox type="warning" title="mask vs disable">
        <code>disable</code> apenas remove o autostart — alguém ainda pode iniciar o serviço
        manualmente ou via dependência. <code>mask</code> torna o serviço completamente
        inacessível, mesmo para dependências automáticas. Use mask para garantir que algo
        nunca rode (ex.: <code>systemctl mask bluetooth</code> em servidor headless).
      </InfoBox>

      <h3>is-active / is-enabled / is-failed</h3>

      <Terminal>
        <Command command="systemctl is-active nginx" output="active" />
        <Command command="systemctl is-enabled nginx" output="enabled" />
        <Command command="systemctl is-failed nginx" output="active" />
        <Command command="systemctl is-active nginx ssh cron" output={`active
active
active`} />
      </Terminal>

      <p>Códigos de saída: 0 = condição satisfeita, &gt;0 = não satisfeita. Útil em scripts:</p>

      <Terminal>
        <Command command={'if systemctl is-active --quiet nginx; then echo "rodando"; else echo "parado"; fi'} output="rodando" />
      </Terminal>

      <h3>list-units e list-unit-files</h3>

      <Terminal>
        <Command command="systemctl list-units --type=service --state=running" output={`  UNIT                          LOAD   ACTIVE SUB     DESCRIPTION
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

13 loaded units listed.`} />
        <Command command="systemctl list-unit-files --type=service --state=enabled" output={`UNIT FILE                              STATE   PRESET
cron.service                           enabled enabled
dbus.service                           enabled enabled
NetworkManager.service                 enabled enabled
nginx.service                          enabled enabled
ssh.service                            enabled enabled
systemd-resolved.service               enabled enabled
systemd-timesyncd.service              enabled enabled
unattended-upgrades.service            enabled enabled

8 unit files listed.`} />
        <Command command="systemctl list-units --failed" output={`  UNIT             LOAD   ACTIVE SUB    DESCRIPTION
● apache2.service loaded failed failed The Apache HTTP Server

1 loaded units listed.`} />
      </Terminal>

      <h3>cat / show / edit</h3>

      <Terminal>
        <Command command="systemctl cat ssh.service" output={`# /usr/lib/systemd/system/ssh.service
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
Alias=sshd.service`} />
        <Command command="systemctl show ssh.service --property=MainPID,ActiveState,SubState,Restart" output={`MainPID=912
ActiveState=active
SubState=running
Restart=on-failure`} />
      </Terminal>

      <p>
        <code>systemctl edit nginx</code> abre o editor padrão e cria
        <code> /etc/systemd/system/nginx.service.d/override.conf</code>. Use
        <code> --full</code> para editar uma cópia completa em vez de só um override.
      </p>

      <Terminal>
        <Command root command="systemctl edit nginx" comment="Cria override interativo" output={`### Editing /etc/systemd/system/nginx.service.d/override.conf
### Anything between here and the comment below will become the new contents of the file

[Service]
Restart=always
RestartSec=5

### Lines below this comment will be discarded`} />
      </Terminal>

      <InfoBox type="note" title="Sempre rode daemon-reload após alterar units">
        Após editar/criar/remover qualquer unit fora de <code>systemctl edit</code>, execute
        <code> sudo systemctl daemon-reload</code> para o systemd reler. Se você esquecer,
        verá o aviso "Warning: The unit file, source configuration file or drop-ins of
        nginx.service changed on disk. Run 'systemctl daemon-reload' to reload units."
      </InfoBox>

      <h2>3. Targets (runlevels modernos)</h2>

      <p>
        Targets agrupam units. Substituem os runlevels do SysVinit. Os principais:
      </p>

      <table>
        <thead>
          <tr><th>Target</th><th>Equivalente SysV</th><th>Descrição</th></tr>
        </thead>
        <tbody>
          <tr><td>poweroff.target</td><td>0</td><td>Desligamento</td></tr>
          <tr><td>rescue.target</td><td>1 (single)</td><td>Modo single-user com root</td></tr>
          <tr><td>multi-user.target</td><td>3</td><td>Sistema completo, sem GUI</td></tr>
          <tr><td>graphical.target</td><td>5</td><td>Sistema completo + GUI (depende de multi-user)</td></tr>
          <tr><td>reboot.target</td><td>6</td><td>Reinicia</td></tr>
          <tr><td>emergency.target</td><td>—</td><td>Shell mínimo, / read-only, /usr não montado</td></tr>
        </tbody>
      </table>

      <Terminal>
        <Command command="systemctl get-default" output="graphical.target" />
        <Command root command="systemctl set-default multi-user.target" output={`Removed /etc/systemd/system/default.target.
Created symlink /etc/systemd/system/default.target → /usr/lib/systemd/system/multi-user.target.`} />
        <Command root command="systemctl isolate multi-user.target" comment="Troca para esse target imediatamente (mata GUI etc)" />
        <Command command="systemctl list-dependencies multi-user.target" output={`multi-user.target
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
●   └─getty@tty1.service`} />
      </Terminal>

      <h2>4. Criar um serviço próprio (.service)</h2>

      <p>
        Vamos criar um serviço completo que executa um script de monitoramento periódico,
        com restart automático em caso de falha, log estruturado, hardening e dependências.
      </p>

      <File path="/usr/local/bin/site-monitor.sh">
{`#!/bin/bash
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
done`}
      </File>

      <Terminal>
        <Command root command="chmod +x /usr/local/bin/site-monitor.sh" />
      </Terminal>

      <File path="/etc/systemd/system/site-monitor.service">
{`[Unit]
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
WantedBy=multi-user.target`}
      </File>

      <Terminal>
        <Command root command="useradd --system --no-create-home --shell /usr/sbin/nologin monitor" />
        <Command root command="touch /var/log/site-monitor.log && chown monitor:monitor /var/log/site-monitor.log" />
        <Command root command="systemctl daemon-reload" />
        <Command root command="systemctl enable --now site-monitor" output={`Created symlink /etc/systemd/system/multi-user.target.wants/site-monitor.service → /etc/systemd/system/site-monitor.service.`} />
        <Command command="systemctl status site-monitor --no-pager" output={`● site-monitor.service - Monitor de disponibilidade do site institucional
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

abr 14 14:02:11 ubuntu systemd[1]: Started site-monitor.service - Monitor de disponibilidade do site institucional.`} />
      </Terminal>

      <h3>Tipos de Service (Type=)</h3>

      <table>
        <thead><tr><th>Type</th><th>Quando usar</th></tr></thead>
        <tbody>
          <tr><td><code>simple</code> (default)</td><td>Processo principal não forka. Mais comum em apps modernas.</td></tr>
          <tr><td><code>exec</code></td><td>Como simple, mas systemd só considera "started" após execve() retornar.</td></tr>
          <tr><td><code>forking</code></td><td>Daemons clássicos que se desconectam (Apache modo prefork, sshd antigo).</td></tr>
          <tr><td><code>oneshot</code></td><td>Roda uma vez e termina (scripts de setup). Combine com <code>RemainAfterExit=yes</code>.</td></tr>
          <tr><td><code>notify</code></td><td>Processo notifica systemd via <code>sd_notify()</code> quando pronto. Ex.: nginx, systemd-resolved.</td></tr>
          <tr><td><code>dbus</code></td><td>Serviço considera-se pronto quando aparece no D-Bus.</td></tr>
          <tr><td><code>idle</code></td><td>Adia execução até que outras tarefas terminem (limpa output do boot).</td></tr>
        </tbody>
      </table>

      <h3>Diretivas de [Unit]</h3>

      <ul>
        <li><strong>After=</strong> ordem (ex: <code>After=network.target</code>).</li>
        <li><strong>Before=</strong> ordem inversa.</li>
        <li><strong>Requires=</strong> dependência forte (se a outra falhar, esta também falha).</li>
        <li><strong>Wants=</strong> dependência fraca (não falha se a outra falhar).</li>
        <li><strong>BindsTo=</strong> ainda mais forte que Requires (estado atrelado).</li>
        <li><strong>Conflicts=</strong> não pode rodar junto.</li>
        <li><strong>ConditionPathExists=</strong>, <strong>ConditionFileNotEmpty=</strong>, <strong>ConditionHost=</strong> condições para iniciar.</li>
      </ul>

      <h3>Diretivas de [Service] mais usadas</h3>

      <ul>
        <li><strong>ExecStart=</strong> comando principal (obrigatório, exceto oneshot).</li>
        <li><strong>ExecStartPre=</strong>, <strong>ExecStartPost=</strong> hooks antes/depois.</li>
        <li><strong>ExecReload=</strong> comando para reload (geralmente <code>kill -HUP $MAINPID</code>).</li>
        <li><strong>ExecStop=</strong> comando para parar (default: SIGTERM ao MainPID).</li>
        <li><strong>Restart=</strong> <code>no | on-success | on-failure | on-abnormal | on-watchdog | on-abort | always</code>.</li>
        <li><strong>RestartSec=</strong> espera entre tentativas (default 100ms).</li>
        <li><strong>StartLimitBurst=</strong> + <strong>StartLimitIntervalSec=</strong> evita loop infinito de restart.</li>
        <li><strong>TimeoutStartSec=</strong>, <strong>TimeoutStopSec=</strong> (default 90s).</li>
        <li><strong>WorkingDirectory=</strong>, <strong>RootDirectory=</strong>.</li>
        <li><strong>User=</strong>, <strong>Group=</strong>.</li>
        <li><strong>Environment=</strong>, <strong>EnvironmentFile=</strong>.</li>
        <li><strong>StandardOutput=</strong> <code>journal | inherit | null | tty | file:/path | append:/path</code>.</li>
        <li><strong>SyslogIdentifier=</strong> nome no journal.</li>
      </ul>

      <h2>5. Sockets (.socket) e activation</h2>

      <p>
        Socket activation é uma das features mais elegantes do systemd: o systemd abre o
        socket TCP/Unix e só inicia o daemon quando chega a primeira conexão. O serviço
        herda o file descriptor já aberto.
      </p>

      <File path="/etc/systemd/system/echo.socket">
{`[Unit]
Description=Echo Service Socket

[Socket]
ListenStream=2323
Accept=yes

[Install]
WantedBy=sockets.target`}
      </File>

      <File path="/etc/systemd/system/echo@.service">
{`[Unit]
Description=Echo Service Instance

[Service]
ExecStart=-/usr/bin/cat
StandardInput=socket
StandardOutput=socket
StandardError=journal`}
      </File>

      <Terminal>
        <Command root command="systemctl daemon-reload && systemctl enable --now echo.socket" />
        <Command command="ss -tlnp | grep 2323" output={`LISTEN 0      4096               *:2323            *:*    users:(("systemd",pid=1,fd=68))`} />
        <Command command="echo 'oi' | nc -q1 localhost 2323" output="oi" />
        <Command command="systemctl status 'echo@*'" output={`● echo@2-127.0.0.1:2323-127.0.0.1:51842.service - Echo Service Instance (127.0.0.1:51842)
     Loaded: loaded (/etc/systemd/system/echo@.service; static)
     Active: inactive (dead) since Mon 2025-04-14 14:18:04 -03; 5s ago
TriggeredBy: ● echo.socket
   Main PID: 4711 (code=exited, status=0/SUCCESS)
        CPU: 4ms`} />
      </Terminal>

      <h2>6. Timers (.timer) — substituto moderno do cron</h2>

      <p>
        Timers do systemd são mais poderosos que cron: permitem execução baseada em eventos
        (boot, ativação de outra unit), persistência (<code>Persistent=true</code> roda
        tarefas perdidas após o sistema voltar do sleep), randomização
        (<code>RandomizedDelaySec=</code>), accuracy configurável e total integração com
        journald.
      </p>

      <File path="/etc/systemd/system/backup-diario.service">
{`[Unit]
Description=Backup diário do /home para /mnt/backup
After=network-online.target

[Service]
Type=oneshot
Nice=19
IOSchedulingClass=idle
ExecStart=/usr/local/bin/rsync-home.sh
StandardOutput=journal
StandardError=journal
SyslogIdentifier=backup-diario`}
      </File>

      <File path="/etc/systemd/system/backup-diario.timer">
{`[Unit]
Description=Dispara backup diário às 02:30

[Timer]
OnCalendar=*-*-* 02:30:00
RandomizedDelaySec=15min
Persistent=true
Unit=backup-diario.service

[Install]
WantedBy=timers.target`}
      </File>

      <Terminal>
        <Command root command="systemctl daemon-reload && systemctl enable --now backup-diario.timer" output={`Created symlink /etc/systemd/system/timers.target.wants/backup-diario.timer → /etc/systemd/system/backup-diario.timer.`} />
        <Command command="systemctl list-timers --all" output={`NEXT                            LEFT          LAST                            PASSED       UNIT                         ACTIVATES
Tue 2025-04-15 02:30:00 -03     11h left      Mon 2025-04-14 02:30:00 -03     12h ago      backup-diario.timer          backup-diario.service
Tue 2025-04-15 00:00:00 -03     9h left       Mon 2025-04-14 00:00:00 -03     14h ago      logrotate.timer              logrotate.service
Tue 2025-04-15 00:00:00 -03     9h left       Mon 2025-04-14 00:00:00 -03     14h ago      man-db.timer                 man-db.service
Mon 2025-04-14 17:48:21 -03     3h 35min left Mon 2025-04-14 11:48:21 -03     2h 24min ago anacron.timer                anacron.service
Mon 2025-04-14 14:51:38 -03     38min left    Mon 2025-04-14 13:51:38 -03     21min ago    apt-daily.timer              apt-daily.service
Sun 2025-04-20 03:10:30 -03     5 days left   Sun 2025-04-13 03:10:30 -03     1 day ago    fstrim.timer                 fstrim.service

6 timers listed.`} />
      </Terminal>

      <h3>Sintaxe OnCalendar=</h3>

      <Terminal>
        <Command command="systemd-analyze calendar 'Mon..Fri *-*-* 09:00:00'" output={`  Original form: Mon..Fri *-*-* 09:00:00
Normalized form: Mon..Fri *-*-* 09:00:00
    Next elapse: Tue 2025-04-15 09:00:00 -03
       (in UTC): Tue 2025-04-15 12:00:00 UTC
       From now: 18h left`} />
        <Command command="systemd-analyze calendar 'hourly' 'daily' 'weekly' 'monthly'" output={`  Original form: hourly
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
    Next elapse: Thu 2025-05-01 00:00:00 -03`} />
      </Terminal>

      <p>Outras keys de [Timer]:</p>
      <ul>
        <li><strong>OnBootSec=</strong> tempo após boot</li>
        <li><strong>OnUnitActiveSec=</strong> tempo desde última execução</li>
        <li><strong>OnStartupSec=</strong> tempo após startup do systemd</li>
        <li><strong>AccuracySec=</strong> default 1min — agrupa timers próximos para economizar wakeups</li>
        <li><strong>WakeSystem=true</strong> acorda o sistema do suspend</li>
      </ul>

      <h2>7. Análise de boot</h2>

      <Terminal>
        <Command command="systemd-analyze" output={`Startup finished in 3.421s (firmware) + 2.115s (loader) + 1.823s (kernel) + 4.502s (userspace) = 11.861s
graphical.target reached after 4.498s in userspace.`} />
        <Command command="systemd-analyze blame | head -15" output={`5.214s snapd.service
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
  87ms systemd-resolved.service`} />
        <Command command="systemd-analyze critical-chain" output={`The time when unit became active or started is printed after the "@" character.
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
                          └─-.slice @4ms`} />
        <Command command="systemd-analyze plot > boot.svg" comment="Gera SVG bonitão da timeline de boot" />
        <Command command="systemd-analyze verify /etc/systemd/system/site-monitor.service" comment="Valida sintaxe da unit" />
      </Terminal>

      <h2>8. Cgroups, slices e limites de recurso</h2>

      <p>
        O systemd organiza tudo em uma árvore de cgroups v2. Use <code>systemd-cgls</code>
        para visualizar e <code>systemd-cgtop</code> para monitorar consumo.
      </p>

      <Terminal>
        <Command command="systemd-cgls --no-pager | head -30" output={`Control group /:
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
    └─612 /usr/lib/systemd/systemd-journald`} />
        <Command command="systemd-cgtop -n 1" output={`CGroup                                                          Tasks   %CPU   Memory  Input/s Output/s
/                                                                 412   12.4   3.2G        -        -
user.slice                                                        184    8.9   1.8G        -        -
user.slice/user-1000.slice                                        184    8.9   1.8G        -        -
user.slice/user-1000.slice/user@1000.service                      168    7.2   1.6G        -        -
system.slice                                                      210    3.5   1.4G        -        -
system.slice/snap.firefox.firefox.scope                            45    2.1   850M        -        -
system.slice/nginx.service                                          3    0.1    25M        -        -`} />
        <Command root command="systemctl set-property nginx.service CPUQuota=50% MemoryMax=512M" comment="Limites em runtime, persistido em /etc/systemd/system.control/" />
      </Terminal>

      <h2>9. systemd-run — rodar comando ad-hoc como unit</h2>

      <Terminal>
        <Command root command="systemd-run --unit=meu-job --on-active=30s /usr/bin/touch /tmp/teste" output={`Running timer as unit: meu-job.timer
Will run service as unit: meu-job.service`} />
        <Command root command="systemd-run --scope -p MemoryMax=200M -p CPUQuota=30% bash" comment="Shell em scope com limites" output={`Running scope as unit: run-r4f8b2c9d1e54a3b8.scope
root@ubuntu:~#`} />
        <Command root command="systemd-run --uid=monitor --gid=monitor /usr/local/bin/site-monitor.sh" />
      </Terminal>

      <h2>10. Hostname, locale, timezone via systemd</h2>

      <Terminal>
        <Command command="hostnamectl" output={`   Static hostname: ubuntu
         Icon name: computer-desktop
           Chassis: desktop 🖥️
        Machine ID: 9b3e2c4d8f4e4b1ca2c2b8a4d3e5f6a7
           Boot ID: a1b2c3d4e5f64a7b8c9d0e1f2a3b4c5d
  Operating System: Ubuntu 24.04.2 LTS
            Kernel: Linux 6.8.0-52-generic
      Architecture: x86-64
   Hardware Vendor: ASUS
    Hardware Model: ROG STRIX B550-F GAMING
  Firmware Version: 3404`} />
        <Command root command="hostnamectl set-hostname wallyson-pc" />
        <Command command="timedatectl" output={`               Local time: Mon 2025-04-14 14:42:18 -03
           Universal time: Mon 2025-04-14 17:42:18 UTC
                 RTC time: Mon 2025-04-14 17:42:18
                Time zone: America/Sao_Paulo (-03, -0300)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no`} />
        <Command root command="timedatectl set-timezone America/Sao_Paulo" />
        <Command root command="timedatectl set-ntp true" />
        <Command command="localectl" output={`   System Locale: LANG=pt_BR.UTF-8
                  LANGUAGE=pt_BR
       VC Keymap: br-abnt2
      X11 Layout: br
       X11 Model: abnt2`} />
        <Command root command="localectl set-locale LANG=pt_BR.UTF-8" />
      </Terminal>

      <h2>11. Troubleshooting</h2>

      <h3>Serviço falhou ao iniciar</h3>

      <Terminal>
        <Command command="systemctl --failed" output={`  UNIT             LOAD   ACTIVE SUB    DESCRIPTION
● apache2.service loaded failed failed The Apache HTTP Server`} />
        <Command command="systemctl status apache2 --no-pager -l" output={`× apache2.service - The Apache HTTP Server
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
abr 14 14:48:11 ubuntu systemd[1]: apache2.service: Failed with result 'exit-code'.`} />
        <Command command="ss -tlnp | grep ':80 '" output={`LISTEN 0      511                *:80              *:*    users:(("nginx",pid=1042,fd=6),("nginx",pid=1043,fd=6))`} />
        <Command root command="systemctl reset-failed apache2" comment="Limpa o estado 'failed'" />
      </Terminal>

      <h3>Boot travando — modos de emergência</h3>

      <p>
        Edite a entrada do GRUB (pressione <code>e</code>) e adicione um destes parâmetros
        na linha que começa com <code>linux</code>:
      </p>

      <ul>
        <li><code>systemd.unit=rescue.target</code> — boot em modo rescue (single user)</li>
        <li><code>systemd.unit=emergency.target</code> — boot em emergência (mais mínimo)</li>
        <li><code>systemd.debug-shell=1</code> — abre tty9 com shell root</li>
        <li><code>init=/bin/bash</code> — pula o systemd e cai num bash (último recurso)</li>
      </ul>

      <InfoBox type="danger" title="systemctl daemon-reexec">
        Em casos extremos (ex: atualizou systemd via apt e algo está esquisito), execute
        <code> sudo systemctl daemon-reexec</code> para reexecutar o PID 1 in-place. É como
        reiniciar o systemd sem reiniciar a máquina.
      </InfoBox>

      <h2>12. Cheatsheet final</h2>

      <Terminal>
        <Command command="systemctl status NOME" />
        <Command command="systemctl list-units --type=service" />
        <Command command="systemctl list-units --failed" />
        <Command command="systemctl list-unit-files --state=enabled" />
        <Command command="systemctl list-dependencies NOME" />
        <Command root command="systemctl start NOME" />
        <Command root command="systemctl stop NOME" />
        <Command root command="systemctl restart NOME" />
        <Command root command="systemctl reload NOME" />
        <Command root command="systemctl enable --now NOME" />
        <Command root command="systemctl disable --now NOME" />
        <Command root command="systemctl mask NOME" />
        <Command root command="systemctl unmask NOME" />
        <Command root command="systemctl edit NOME" />
        <Command root command="systemctl edit --full NOME" />
        <Command root command="systemctl daemon-reload" />
        <Command command="systemd-analyze blame" />
        <Command command="systemd-analyze critical-chain" />
        <Command command="systemd-analyze verify ARQUIVO.service" />
        <Command command="systemd-analyze calendar 'Mon..Fri 09:00'" />
        <Command command="systemctl get-default" />
        <Command root command="systemctl set-default multi-user.target" />
        <Command root command="systemctl isolate rescue.target" />
        <Command command="systemctl list-timers --all" />
        <Command command="journalctl -u NOME -f" />
      </Terminal>

      <InfoBox type="success" title="Próximos passos">
        Continue lendo a página <strong>journalctl</strong> para dominar a inspeção de
        logs do systemd, e depois <strong>cron</strong> para comparar com a abordagem
        clássica de agendamento.
      </InfoBox>
    </PageContainer>
  );
}

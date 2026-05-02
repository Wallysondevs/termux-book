import{j as e}from"./index-d-w5ROEn.js";import{P as r}from"./PageContainer-t8f2nTRw.js";import{T as s,C as t,F as o}from"./Terminal-B39pZIiO.js";import{I as a}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function m(){return e.jsxs(r,{title:"Segurança no Termux",subtitle:"UFW, iptables, sudo hardening, SSH, atualizações automáticas, auditd, lynis, rkhunter — defesa em profundidade para Termux Desktop e Server.",difficulty:"avancado",timeToRead:"35 min",category:"Segurança",children:[e.jsxs("p",{children:["O Termux sai da fábrica com várias camadas de segurança ativas (AppArmor, firewall ",e.jsx("em",{children:"desligado mas presente"}),", sudo configurado, kernel hardening, ASLR, repositórios assinados com GPG). Mas ",e.jsx("strong",{children:"segurança é processo"}),", não estado: servidores expostos à internet são varridos por bots a cada poucos minutos. Esta página cobre o tripé prático ",e.jsx("strong",{children:"UFW + Fail2Ban + SSH hardening"}),", mais auditoria contínua com ",e.jsx("code",{children:"lynis"}),", ",e.jsx("code",{children:"auditd"}),", ",e.jsx("code",{children:"rkhunter"})," e a filosofia de ",e.jsx("em",{children:"least privilege"})," e ",e.jsx("em",{children:"defense in depth"}),"."]}),e.jsxs(s,{title:"wallyson@termux: ~",children:[e.jsx(t,{command:"lsb_release -a",output:`No LSB modules are available.
Distributor ID: Termux
Description:    Termux 0.118
Release:        24.04
Codename:       noble`}),e.jsx(t,{command:"systemctl is-active apparmor ufw ssh",comment:"Visão geral rápida das camadas de segurança",output:`active
inactive
active`})]}),e.jsx("h2",{children:"1. UFW — o firewall amigável do Termux"}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"UFW (Uncomplicated Firewall)"})," é uma camada de abstração sobre o",e.jsx("code",{children:"nftables"})," (anteriormente ",e.jsx("code",{children:"iptables"}),"). Ele já vem instalado, mas",e.jsx("strong",{children:"desligado"}),". A primeira coisa em qualquer servidor é ",e.jsx("em",{children:"liberar SSH antes de habilitar"}),", sob pena de se trancar do lado de fora."]}),e.jsxs(s,{title:"root@termux: ~",path:"/etc",children:[e.jsx(t,{root:!0,command:"ufw status",output:"Status: inactive"}),e.jsx(t,{root:!0,command:"ufw default deny incoming",comment:"Política padrão: bloquear tudo que entra",output:`Default incoming policy changed to 'deny'
(be sure to update your rules accordingly)`}),e.jsx(t,{root:!0,command:"ufw default allow outgoing",output:`Default outgoing policy changed to 'allow'
(be sure to update your rules accordingly)`}),e.jsx(t,{root:!0,command:"ufw allow ssh",comment:"ESSENCIAL antes de habilitar — caso contrário você se desconecta",output:`Rules updated
Rules updated (v6)`}),e.jsx(t,{root:!0,command:"ufw allow 80/tcp",output:`Rules updated
Rules updated (v6)`}),e.jsx(t,{root:!0,command:"ufw allow 443/tcp",output:`Rules updated
Rules updated (v6)`}),e.jsx(t,{root:!0,command:"ufw enable",output:`Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup`}),e.jsx(t,{root:!0,command:"ufw status verbose",output:`Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp (SSH)               ALLOW IN    Anywhere
80/tcp                     ALLOW IN    Anywhere
443/tcp                    ALLOW IN    Anywhere
22/tcp (SSH (v6))          ALLOW IN    Anywhere (v6)
80/tcp (v6)                ALLOW IN    Anywhere (v6)
443/tcp (v6)               ALLOW IN    Anywhere (v6)`})]}),e.jsxs(a,{type:"danger",title:"ATENÇÃO: SSH primeiro, sempre",children:["Se você habilitar o UFW em uma máquina remota ",e.jsx("em",{children:"sem"})," primeiro liberar a porta SSH (22), perderá o acesso instantaneamente — e a única recuperação será via console físico ou serial do provedor (DigitalOcean, AWS, etc)."]}),e.jsx("h3",{children:"1.1 — Regras avançadas: origem, destino, faixas"}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"ufw allow from 192.168.1.0/24",comment:"Liberar TODO o tráfego vindo da rede local",output:"Rules updated"}),e.jsx(t,{root:!0,command:"ufw allow from 192.168.1.0/24 to any port 22",comment:"Permitir SSH só da rede interna (mais seguro)",output:"Rules updated"}),e.jsx(t,{root:!0,command:"ufw allow from 203.0.113.42 to any port 5432 proto tcp",comment:"Liberar PostgreSQL APENAS de um IP específico",output:"Rules updated"}),e.jsx(t,{root:!0,command:"ufw deny from 198.51.100.7",comment:"Bloquear um IP malicioso específico",output:"Rule added"}),e.jsx(t,{root:!0,command:"ufw reject 25/tcp",comment:"REJECT envia ICMP de volta (visível). DENY descarta silenciosamente.",output:`Rule added
Rule added (v6)`}),e.jsx(t,{root:!0,command:"ufw limit ssh",comment:"Limita conexões SSH: 6 tentativas em 30s = bloqueio temporário",output:`Rule updated
Rule updated (v6)`})]}),e.jsx("h3",{children:"1.2 — Inspecionar, numerar e remover regras"}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"ufw status numbered",output:`Status: active

     To                         Action      From
     --                         ------      ----
[ 1] 22/tcp                     LIMIT IN    Anywhere
[ 2] 80/tcp                     ALLOW IN    Anywhere
[ 3] 443/tcp                    ALLOW IN    Anywhere
[ 4] 5432/tcp                   ALLOW IN    203.0.113.42
[ 5] Anywhere                   DENY IN    198.51.100.7
[ 6] 22/tcp (v6)                LIMIT IN    Anywhere (v6)
[ 7] 80/tcp (v6)                ALLOW IN    Anywhere (v6)
[ 8] 443/tcp (v6)               ALLOW IN    Anywhere (v6)`}),e.jsx(t,{root:!0,command:"ufw delete 5",output:`Deleting:
 deny from 198.51.100.7
Proceed with operation (y|n)? y
Rule deleted`}),e.jsx(t,{root:!0,command:"ufw delete allow 80/tcp",comment:"Forma alternativa: passar a regra exata",output:`Rule deleted
Rule deleted (v6)`})]}),e.jsx("h3",{children:"1.3 — Logs, perfis de aplicação e reset"}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"ufw logging on",output:"Logging enabled"}),e.jsx(t,{root:!0,command:"ufw logging medium",comment:"off | low (padrão) | medium | high | full",output:"Logging set to 'medium'"}),e.jsx(t,{root:!0,command:"tail -n 5 /var/log/ufw.log",output:`Nov 12 09:12:33 termux kernel: [UFW BLOCK] IN=eth0 OUT= MAC=02:7d:... SRC=185.220.101.45 DST=10.0.0.5 LEN=60 TTL=51 ID=12345 PROTO=TCP SPT=49210 DPT=23 WINDOW=29200 SYN
Nov 12 09:13:01 termux kernel: [UFW LIMIT BLOCK] IN=eth0 OUT= SRC=45.79.12.8 DST=10.0.0.5 PROTO=TCP SPT=55001 DPT=22 WINDOW=64240 SYN
Nov 12 09:14:22 termux kernel: [UFW BLOCK] IN=eth0 OUT= SRC=104.131.12.7 DST=10.0.0.5 PROTO=TCP SPT=33012 DPT=3389
Nov 12 09:14:55 termux kernel: [UFW BLOCK] IN=eth0 OUT= SRC=64.62.197.9 DST=10.0.0.5 PROTO=UDP SPT=53 DPT=51820
Nov 12 09:15:02 termux kernel: [UFW BLOCK] IN=eth0 OUT= SRC=222.186.30.7 DST=10.0.0.5 PROTO=TCP SPT=46011 DPT=22 WINDOW=1024 SYN`}),e.jsx(t,{root:!0,command:"ufw app list",output:`Available applications:
  Apache
  Apache Full
  Apache Secure
  CUPS
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
  Samba`}),e.jsx(t,{root:!0,command:"ufw app info 'Nginx Full'",output:`Profile: Nginx Full
Title: Web Server (HTTP,HTTPS)
Description: Small, but very powerful and efficient web server

Ports:
  80,443/tcp`}),e.jsx(t,{root:!0,command:"ufw allow 'Nginx Full'",output:`Rule added
Rule added (v6)`}),e.jsx(t,{root:!0,command:"ufw reset",comment:"ZERA tudo (pede confirmação) — útil em laboratório",output:`Resetting all rules to installed defaults. Proceed with operation (y|n)? y
Backing up 'user.rules' to '/etc/ufw/user.rules.20251112_091633'
Backing up 'before.rules' to '/etc/ufw/before.rules.20251112_091633'
...`})]}),e.jsx("h2",{children:"2. iptables / nftables — quando UFW não basta"}),e.jsxs("p",{children:["UFW gera regras ",e.jsx("code",{children:"nftables"})," por baixo. Em casos avançados (NAT, marcação de pacotes, filtros L7, política por interface) você precisa editar diretamente. No Termux 24.04 o ",e.jsx("em",{children:"backend"})," padrão é ",e.jsx("code",{children:"nftables"}),", mas o comando legado",e.jsx("code",{children:"iptables"})," ainda funciona via wrapper ",e.jsx("code",{children:"iptables-nft"}),"."]}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"iptables -L -n -v --line-numbers",output:`Chain INPUT (policy DROP 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination
1      120  9600 ufw-before-input  all  --  *      *       0.0.0.0/0            0.0.0.0/0
2        0     0 ufw-after-input   all  --  *      *       0.0.0.0/0            0.0.0.0/0

Chain FORWARD (policy DROP 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination

Chain OUTPUT (policy ACCEPT 8 packets, 712 bytes)
num   pkts bytes target     prot opt in     out     source               destination`}),e.jsx(t,{root:!0,command:"nft list ruleset | head -20",output:`table inet filter {
        chain input {
                type filter hook input priority filter; policy drop;
                iifname "lo" accept
                ct state established,related accept
                tcp dport 22 ct state new limit rate 6/minute accept
                tcp dport { 80, 443 } accept
                ip protocol icmp accept
        }
        chain forward {
                type filter hook forward priority filter; policy drop;
        }
        chain output {
                type filter hook output priority filter; policy accept;
        }
}`}),e.jsx(t,{root:!0,command:"iptables-save > /root/iptables.bkp",comment:"Snapshot completo das regras"})]}),e.jsxs(a,{type:"tip",title:"Use UFW para 95% dos casos",children:["Mexer em ",e.jsx("code",{children:"iptables"}),"/",e.jsx("code",{children:"nftables"})," direto é poderoso mas erra-se feio: uma regra fora de ordem destrói o ",e.jsx("em",{children:"fail-safe"}),". Reserve nftables para roteadores, gateways NAT, container hosts e firewalls de alto desempenho."]}),e.jsx("h2",{children:"3. sudo hardening"}),e.jsxs("p",{children:[e.jsx("code",{children:"sudo"})," é a porta de entrada para privilégios root. Vamos endurecê-lo: editar com ",e.jsx("code",{children:"visudo"})," (valida sintaxe), separar permissões em ",e.jsx("code",{children:"sudoers.d"}),", exigir senha, log detalhado e timeout curto."]}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"visudo",comment:"SEMPRE use visudo, nunca edite /etc/sudoers diretamente"}),e.jsx(t,{root:!0,command:"cat /etc/sudoers",output:`Defaults        env_reset
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
Defaults        use_pty
Defaults        logfile="/var/log/sudo.log"
Defaults        timestamp_timeout=5
Defaults        passwd_tries=3

root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
%admin  ALL=(ALL) ALL

@includedir /etc/sudoers.d`})]}),e.jsx(o,{path:"/etc/sudoers.d/10-hardening",children:`# Endurecimento global
Defaults        env_reset
Defaults        timestamp_timeout=2          # senha caduca em 2 min
Defaults        passwd_tries=2               # máximo 2 tentativas
Defaults        badpass_message="Tente novamente, com mais cuidado."
Defaults        lecture=always
Defaults        logfile="/var/log/sudo.log"
Defaults        log_input,log_output         # registra TUDO digitado/saída
Defaults        iolog_dir="/var/log/sudo-io/%{user}"

# Operadores: podem reiniciar serviços específicos sem senha
%operadores ALL=(root) NOPASSWD: /bin/systemctl restart nginx, /bin/systemctl restart php8.3-fpm

# Backup automático: usuário 'backup' executa script sem senha
backup ALL=(root) NOPASSWD: /usr/local/sbin/backup-diario.sh

# Bloquear shells perigosos
Cmnd_Alias SHELLS = /bin/sh, /bin/bash, /usr/bin/zsh, /bin/dash, /bin/tcsh
%dev !SHELLS`}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"visudo -cf /etc/sudoers.d/10-hardening",output:"/etc/sudoers.d/10-hardening: parsed OK"}),e.jsx(t,{command:"sudo -l",comment:"Listar o que VOCÊ pode rodar via sudo",output:`Matching Defaults entries for wallyson on termux:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin, use_pty, logfile=/var/log/sudo.log

User wallyson may run the following commands on termux:
    (ALL : ALL) ALL`}),e.jsx(t,{root:!0,command:"tail -n 5 /var/log/sudo.log",output:`Nov 12 10:02:11 : wallyson : TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=/usr/bin/pkg update
Nov 12 10:03:44 : wallyson : TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=/usr/bin/systemctl restart nginx
Nov 12 10:04:01 : wallyson : 2 incorrect password attempts ; TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=/usr/bin/cat /etc/shadow
Nov 12 10:05:18 : wallyson : TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=/usr/bin/visudo
Nov 12 10:06:02 : wallyson : TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=list`})]}),e.jsx("h2",{children:"4. SSH hardening (resumo)"}),e.jsxs("p",{children:["A página ",e.jsx("strong",{children:"Redes → SSH"})," tem o detalhamento completo. Aqui o checklist mínimo que ",e.jsx("em",{children:"todo"})," servidor precisa."]}),e.jsx(o,{path:"/etc/ssh/sshd_config.d/99-hardening.conf",children:`Port 2222
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
KbdInteractiveAuthentication no
PermitEmptyPasswords no
MaxAuthTries 3
MaxSessions 4
LoginGraceTime 30
ClientAliveInterval 300
ClientAliveCountMax 2
AllowUsers wallyson deploy
X11Forwarding no
AllowAgentForwarding no
AllowTcpForwarding no
PrintMotd no
Banner /etc/issue.net
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com`}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"sshd -t",comment:"Testar sintaxe sem reiniciar — OBRIGATÓRIO"}),e.jsx(t,{root:!0,command:"systemctl reload ssh"}),e.jsx(t,{command:"ss -tlnp | grep ssh",output:`LISTEN 0      128                *:2222             *:*    users:(("sshd",pid=1224,fd=3))
LISTEN 0      128             [::]:2222          [::]:*    users:(("sshd",pid=1224,fd=4))`})]}),e.jsxs(a,{type:"warning",title:"Mantenha duas sessões abertas",children:["Antes de aplicar mudanças no ",e.jsx("code",{children:"sshd"}),", abra uma ",e.jsx("strong",{children:"segunda sessão"}),"e teste antes de fechar a primeira. Se algo deu errado, você ainda pode corrigir."]}),e.jsx("h2",{children:"5. Atualizações automáticas — unattended-upgrades"}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"pkg install -y unattended-upgrades apt-listchanges",output:`Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  apt-listchanges unattended-upgrades
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
Need to get 142 kB of archives.
After this operation, 542 kB of additional disk space will be used.
Get:1 http://packages.termux.dev/apt/termux-main noble/main amd64 apt-listchanges all 4.0 [89,2 kB]
Get:2 http://packages.termux.dev/apt/termux-main noble/main amd64 unattended-upgrades all 2.9.1+nmutermux [53,4 kB]
Fetched 142 kB in 1s (210 kB/s)
Selecting previously unselected package apt-listchanges.
(Reading database ... 188422 files and directories currently installed.)
Preparing to unpack .../apt-listchanges_4.0_all.deb ...
Unpacking apt-listchanges (4.0) ...
Selecting previously unselected package unattended-upgrades.
Preparing to unpack .../unattended-upgrades_2.9.1+nmutermux_all.deb ...
Unpacking unattended-upgrades (2.9.1+nmutermux) ...
Setting up apt-listchanges (4.0) ...
Setting up unattended-upgrades (2.9.1+nmutermux) ...
Created symlink /etc/systemd/system/multi-user.target.wants/unattended-upgrades.service → /usr/lib/systemd/system/unattended-upgrades.service.
Synchronizing state of unattended-upgrades.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable unattended-upgrades
Processing triggers for man-db (2.12.0-4build2) ...`}),e.jsx(t,{root:!0,command:"dpkg-reconfigure -plow unattended-upgrades",comment:"Pergunta se deve ativar — escolha Yes"})]}),e.jsx(o,{path:"/etc/apt/apt.conf.d/50unattended-upgrades",children:`Unattended-Upgrade::Allowed-Origins {
        "\${distro_id}:\${distro_codename}";
        "\${distro_id}:\${distro_codename}-security";
        "\${distro_id}ESMApps:\${distro_codename}-apps-security";
        "\${distro_id}ESM:\${distro_codename}-infra-security";
        "\${distro_id}:\${distro_codename}-updates";
};

Unattended-Upgrade::Package-Blacklist {
        "linux-";
};

Unattended-Upgrade::DevRelease "auto";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";
Unattended-Upgrade::Remove-Unused-Dependencies "false";
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-WithUsers "false";
Unattended-Upgrade::Automatic-Reboot-Time "03:30";
Unattended-Upgrade::Mail "admin@exemplo.com";
Unattended-Upgrade::MailReport "on-change";
Unattended-Upgrade::SyslogEnable "true";`}),e.jsx(o,{path:"/etc/apt/apt.conf.d/20auto-upgrades",children:`APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::Verbose "2";`}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"unattended-upgrade --dry-run -d",output:`Initial blacklist: ^linux-
Initial whitelist (not strict):
Starting unattended upgrades script
Allowed origins are: origin=Termux,archive=noble, origin=Termux,archive=noble-security, ...
Using (^linux-.*) regexp to find blacklisted packages
Checking: openssh-server (["origin=Termux,archive=noble-security"])
  pkg openssh-server: 1:9.6p1-termux.5 -> 1:9.6p1-termux.6
Checking: libssl3t64 (["origin=Termux,archive=noble-security"])
  pkg libssl3t64: 3.0.13-termux1.4 -> 3.0.13-termux1.5
pkgs that look like they should be upgraded:
 openssh-server libssl3t64 openssh-client openssh-sftp-server
Fetched 0 B in 0s (0 B/s)
extracting templates from packages: 100%
Preconfiguring packages ...
GetArchives: ...
Writing dpkg log to /var/log/unattended-upgrades/unattended-upgrades-dpkg.log
All upgrades installed`}),e.jsx(t,{root:!0,command:"cat /var/log/unattended-upgrades/unattended-upgrades.log",output:`2025-11-12 06:00:01,332 INFO Starting unattended upgrades script
2025-11-12 06:00:01,332 INFO Allowed origins are: o=Termux,a=noble, o=Termux,a=noble-security, o=Termux,a=noble-updates
2025-11-12 06:00:23,887 INFO Packages that will be upgraded: openssh-client openssh-server openssh-sftp-server libssl3t64
2025-11-12 06:00:23,887 INFO Writing dpkg log to /var/log/unattended-upgrades/unattended-upgrades-dpkg.log
2025-11-12 06:01:14,521 INFO All upgrades installed`})]}),e.jsx("h2",{children:"6. auditd — auditoria do kernel"}),e.jsxs("p",{children:["O subsistema ",e.jsx("code",{children:"audit"})," do kernel registra ",e.jsx("em",{children:"chamadas de sistema"}),": quem leu ",e.jsx("code",{children:"/etc/shadow"}),", quem escreveu em ",e.jsx("code",{children:"/etc/passwd"}),", qual processo chamou ",e.jsx("code",{children:"execve"}),". É forensics em tempo real."]}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"pkg install -y auditd audispd-plugins",output:`Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  audispd-plugins auditd libauparse0t64
0 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.
Need to get 312 kB of archives.
After this operation, 1.221 kB of additional disk space will be used.
Setting up auditd (1:3.1.2-2.1build1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/auditd.service → /usr/lib/systemd/system/auditd.service.`}),e.jsx(t,{root:!0,command:"systemctl enable --now auditd",output:"Synchronizing state of auditd.service with SysV service script with /usr/lib/systemd/systemd-sysv-install."}),e.jsx(t,{root:!0,command:"auditctl -w /etc/passwd -p wa -k usuarios",comment:"-p wa = monitora WRITE e ATTRIBUTE; -k = tag",output:""}),e.jsx(t,{root:!0,command:"auditctl -w /etc/shadow -p rwa -k credenciais"}),e.jsx(t,{root:!0,command:"auditctl -a always,exit -F arch=b64 -S execve -F euid=0 -k root-exec",comment:"Loga TUDO que root executa"}),e.jsx(t,{root:!0,command:"auditctl -l",output:`-w /etc/passwd -p wa -k usuarios
-w /etc/shadow -p rwa -k credenciais
-a always,exit -F arch=b64 -S execve -F euid=0 -k root-exec`}),e.jsx(t,{root:!0,command:"ausearch -k usuarios -ts recent",output:`----
time->Tue Nov 12 11:14:22 2025
type=PROCTITLE msg=audit(1731410062.221:1843): proctitle="vim /etc/passwd"
type=PATH msg=audit(1731410062.221:1843): item=0 name="/etc/passwd" inode=1572881 dev=08:02 mode=0100644 ouid=0 ogid=0 rdev=00:00 nametype=NORMAL
type=CWD msg=audit(1731410062.221:1843): cwd="/root"
type=SYSCALL msg=audit(1731410062.221:1843): arch=c000003e syscall=257 success=yes exit=4 a0=ffffff9c a1=7ffd9d... items=1 ppid=4221 pid=4232 auid=1000 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=pts0 ses=3 comm="vim" exe="/usr/bin/vim.basic" key="usuarios"`}),e.jsx(t,{root:!0,command:"aureport -au --summary -i",comment:"Resumo de autenticações",output:`Authentication Report
============================================
# date time acct host term exe success event
============================================
1. 11/12/2025 06:00:01 root ? ? /usr/sbin/cron yes 1812
2. 11/12/2025 09:14:32 wallyson 192.168.1.10 ssh /usr/sbin/sshd yes 1830
3. 11/12/2025 09:18:02 invalid_root 185.220.101.45 ssh /usr/sbin/sshd no 1834
4. 11/12/2025 09:18:05 invalid_admin 185.220.101.45 ssh /usr/sbin/sshd no 1835`})]}),e.jsx("h2",{children:"7. lynis — auditoria de configuração"}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"pkg install -y lynis",output:"Setting up lynis (3.0.9-1) ..."}),e.jsx(t,{root:!0,command:"lynis audit system",output:`[ Lynis 3.0.9 ]

[+] Initializing program
------------------------------------
  - Detecting OS...                                           [ DONE ]
  - Checking profiles...                                      [ DONE ]

  ---------------------------------------------------
  Program version:           3.0.9
  Operating system:          Linux
  Operating system name:     Termux
  Operating system version:  24.04
  Kernel version:            6.8.0-48-generic
  Hardware platform:         x86_64
  Hostname:                  termux
  ---------------------------------------------------

[+] Boot and services
------------------------------------
  - Service Manager                                          [ systemd ]
  - Boot loader                                              [ GRUB2 ]
  - Check UEFI boot                                          [ ENABLED ]
  - Check Secure Boot                                        [ DISABLED ]

[+] Kernel
------------------------------------
  - Checking default runlevel                                [ graphical.target ]
  - Checking CPU support (NX/PAE)                            CPU support: PAE and/or NoeXecute supported [ FOUND ]
  - Checking kernel version and release                      [ DONE ]
  - Checking ASLR                                            [ FULL ]

[+] Users, Groups and Authentication
------------------------------------
  - Search administrator accounts                            [ OK ]
  - Checking password file consistency                       [ OK ]
  - Query system users (non daemons)                         [ DONE ]
  - Checking sudoers file                                    [ FOUND ]
  - Check sudoers file permissions                           [ OK ]
  - Check minimum password length                            [ DISABLED ]
  - Check maximum password age                               [ DISABLED ]

================================================================================
  Lynis security scan details:

  Hardening index : 67 [#############       ]
  Tests performed : 248
  Plugins enabled : 0

  Suggestions:
  - Set a password on GRUB boot loader to prevent altering boot configuration [BOOT-5122]
  - Configure minimum password age in /etc/login.defs [AUTH-9286]
  - Install a PAM module for password strength testing like pam_cracklib or pam_passwdqc [AUTH-9262]
  - Enable process accounting [ACCT-9622]
  - Install Apt-listbugs to display a list of critical bugs prior to each APT installation [PKGS-7388]
================================================================================`})]}),e.jsx("h2",{children:"8. rkhunter & chkrootkit — caça-rootkits"}),e.jsxs(s,{title:"root@termux: ~",children:[e.jsx(t,{root:!0,command:"pkg install -y rkhunter chkrootkit"}),e.jsx(t,{root:!0,command:"rkhunter --update",output:`[ Rootkit Hunter version 1.4.6 ]
Checking rkhunter data files...
  Checking file mirrors.dat                                  [ Updated ]
  Checking file programs_bad.dat                             [ Updated ]
  Checking file backdoorports.dat                            [ Updated ]
  Checking file suspscan.dat                                 [ Updated ]
  Checking file i18n versions                                [ Updated ]`}),e.jsx(t,{root:!0,command:"rkhunter --propupd",comment:"Atualiza baseline (rode SÓ em sistema limpo)",output:"File created: searched for 181 files, found 145"}),e.jsx(t,{root:!0,command:"rkhunter --check --sk",output:`Checking system commands...
  Performing 'strings' command checks
    Checking 'strings' command                                [ OK ]
  Performing 'shared libraries' checks
    Checking for preloading variables                         [ None found ]
    Checking for preloaded libraries                          [ None found ]
    Checking LD_LIBRARY_PATH variable                         [ Not found ]

Checking for rootkits...
  Performing check of known rootkit files and directories
    55808 Trojan - Variant A                                  [ Not found ]
    ADM Worm                                                  [ Not found ]
    AjaKit Rootkit                                            [ Not found ]
    Adore Rootkit                                             [ Not found ]
    aPa Kit                                                   [ Not found ]
    Apache Worm                                               [ Not found ]
    ...
    ZK Rootkit                                                [ Not found ]
  Performing additional rootkit checks
    Suckit Rootkit additional checks                          [ OK ]
    Checking for possible rootkit files and directories       [ None found ]
    Checking for possible rootkit strings                     [ None found ]

System checks summary
=====================
File properties checks...
    Files checked: 145
    Suspect files: 0
Rootkit checks...
    Rootkits checked : 481
    Possible rootkits: 0
The system checks took: 1 minute and 14 seconds`}),e.jsx(t,{root:!0,command:"chkrootkit -q",comment:"-q = só mostra problemas",output:"(nenhum problema encontrado)"})]}),e.jsx("h2",{children:"9. Princípios — defense in depth & least privilege"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Princípio"}),e.jsx("th",{children:"Aplicação prática"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Least privilege"})}),e.jsx("td",{children:"Cada serviço roda como usuário próprio (www-data, postgres). NUNCA rode aplicação web como root."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Defense in depth"})}),e.jsx("td",{children:"UFW + Fail2Ban + AppArmor + SSH-keys + 2FA. Se uma camada falha, outras seguram."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Fail closed"})}),e.jsx("td",{children:"Política padrão é DENY. Libere apenas o necessário, explicitamente."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Audit everything"})}),e.jsx("td",{children:"journald + auditd + sudo logs + ufw logs centralizados (rsyslog, Loki, ELK)."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Minimal attack surface"})}),e.jsxs("td",{children:["Desinstale o que não usa: ",e.jsx("code",{children:"apt purge cups bluetooth avahi-daemon"})," em servidor."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Patch fast"})}),e.jsx("td",{children:"unattended-upgrades para CVEs críticos; testes em staging para o resto."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Segregação"})}),e.jsx("td",{children:"Bancos, web e admin em redes/VPCs separadas; firewall entre tiers."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Verifique backups"})}),e.jsxs("td",{children:["Backup que nunca foi restaurado ",e.jsx("em",{children:"não é"})," backup. Faça ",e.jsx("em",{children:"restore drills"}),"."]})]})]})]}),e.jsx(a,{type:"success",title:"Checklist mínimo de produção",children:e.jsxs("ul",{children:[e.jsx("li",{children:"UFW ativo, default deny incoming, SSH/HTTP/HTTPS liberados."}),e.jsx("li",{children:"Fail2Ban com jail sshd e nginx-http-auth."}),e.jsx("li",{children:"SSH: PermitRootLogin no, PasswordAuthentication no, AllowUsers explícito."}),e.jsx("li",{children:"unattended-upgrades configurado para -security."}),e.jsx("li",{children:"auditd ativo monitorando /etc/passwd, /etc/shadow, /etc/sudoers."}),e.jsx("li",{children:"Lynis hardening index ≥ 80."}),e.jsx("li",{children:"Backups offsite (3-2-1) e testados."}),e.jsx("li",{children:"Logs centralizados em servidor independente."}),e.jsx("li",{children:"Usuários administrativos com chave SSH + frase-senha + TOTP."}),e.jsx("li",{children:"Monitoramento (Prometheus/Grafana) com alertas para login root, falhas SSH, uso de CPU anômalo."})]})})]})}export{m as default};

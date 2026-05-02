import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, Output, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Seguranca() {
  return (
    <PageContainer
      title="Segurança no Ubuntu"
      subtitle="UFW, iptables, sudo hardening, SSH, atualizações automáticas, auditd, lynis, rkhunter — defesa em profundidade para Ubuntu Desktop e Server."
      difficulty="avancado"
      timeToRead="35 min"
      category="Segurança"
    >
      <p>
        O Ubuntu sai da fábrica com várias camadas de segurança ativas (AppArmor,
        firewall <em>desligado mas presente</em>, sudo configurado, kernel hardening, ASLR,
        repositórios assinados com GPG). Mas <strong>segurança é processo</strong>, não estado:
        servidores expostos à internet são varridos por bots a cada poucos minutos. Esta página
        cobre o tripé prático <strong>UFW + Fail2Ban + SSH hardening</strong>, mais auditoria
        contínua com <code>lynis</code>, <code>auditd</code>, <code>rkhunter</code> e a filosofia
        de <em>least privilege</em> e <em>defense in depth</em>.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="lsb_release -a" output={`No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 24.04.2 LTS
Release:        24.04
Codename:       noble`} />
        <Command
          command="systemctl is-active apparmor ufw ssh"
          comment="Visão geral rápida das camadas de segurança"
          output={`active
inactive
active`}
        />
      </Terminal>

      <h2>1. UFW — o firewall amigável do Ubuntu</h2>
      <p>
        O <strong>UFW (Uncomplicated Firewall)</strong> é uma camada de abstração sobre o
        <code>nftables</code> (anteriormente <code>iptables</code>). Ele já vem instalado, mas
        <strong>desligado</strong>. A primeira coisa em qualquer servidor é <em>liberar SSH antes
        de habilitar</em>, sob pena de se trancar do lado de fora.
      </p>

      <Terminal title="root@ubuntu: ~" path="/etc">
        <Command root command="ufw status" output={`Status: inactive`} />
        <Command
          root
          command="ufw default deny incoming"
          comment="Política padrão: bloquear tudo que entra"
          output={`Default incoming policy changed to 'deny'
(be sure to update your rules accordingly)`}
        />
        <Command
          root
          command="ufw default allow outgoing"
          output={`Default outgoing policy changed to 'allow'
(be sure to update your rules accordingly)`}
        />
        <Command
          root
          command="ufw allow ssh"
          comment="ESSENCIAL antes de habilitar — caso contrário você se desconecta"
          output={`Rules updated
Rules updated (v6)`}
        />
        <Command
          root
          command="ufw allow 80/tcp"
          output={`Rules updated
Rules updated (v6)`}
        />
        <Command
          root
          command="ufw allow 443/tcp"
          output={`Rules updated
Rules updated (v6)`}
        />
        <Command
          root
          command="ufw enable"
          output={`Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup`}
        />
        <Command
          root
          command="ufw status verbose"
          output={`Status: active
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
443/tcp (v6)               ALLOW IN    Anywhere (v6)`}
        />
      </Terminal>

      <InfoBox type="danger" title="ATENÇÃO: SSH primeiro, sempre">
        Se você habilitar o UFW em uma máquina remota <em>sem</em> primeiro liberar a porta SSH
        (22), perderá o acesso instantaneamente — e a única recuperação será via console físico
        ou serial do provedor (DigitalOcean, AWS, etc).
      </InfoBox>

      <h3>1.1 — Regras avançadas: origem, destino, faixas</h3>

      <Terminal title="root@ubuntu: ~">
        <Command
          root
          command="ufw allow from 192.168.1.0/24"
          comment="Liberar TODO o tráfego vindo da rede local"
          output={`Rules updated`}
        />
        <Command
          root
          command="ufw allow from 192.168.1.0/24 to any port 22"
          comment="Permitir SSH só da rede interna (mais seguro)"
          output={`Rules updated`}
        />
        <Command
          root
          command="ufw allow from 203.0.113.42 to any port 5432 proto tcp"
          comment="Liberar PostgreSQL APENAS de um IP específico"
          output={`Rules updated`}
        />
        <Command
          root
          command="ufw deny from 198.51.100.7"
          comment="Bloquear um IP malicioso específico"
          output={`Rule added`}
        />
        <Command
          root
          command="ufw reject 25/tcp"
          comment="REJECT envia ICMP de volta (visível). DENY descarta silenciosamente."
          output={`Rule added
Rule added (v6)`}
        />
        <Command
          root
          command="ufw limit ssh"
          comment="Limita conexões SSH: 6 tentativas em 30s = bloqueio temporário"
          output={`Rule updated
Rule updated (v6)`}
        />
      </Terminal>

      <h3>1.2 — Inspecionar, numerar e remover regras</h3>
      <Terminal title="root@ubuntu: ~">
        <Command
          root
          command="ufw status numbered"
          output={`Status: active

     To                         Action      From
     --                         ------      ----
[ 1] 22/tcp                     LIMIT IN    Anywhere
[ 2] 80/tcp                     ALLOW IN    Anywhere
[ 3] 443/tcp                    ALLOW IN    Anywhere
[ 4] 5432/tcp                   ALLOW IN    203.0.113.42
[ 5] Anywhere                   DENY IN    198.51.100.7
[ 6] 22/tcp (v6)                LIMIT IN    Anywhere (v6)
[ 7] 80/tcp (v6)                ALLOW IN    Anywhere (v6)
[ 8] 443/tcp (v6)               ALLOW IN    Anywhere (v6)`}
        />
        <Command
          root
          command="ufw delete 5"
          output={`Deleting:
 deny from 198.51.100.7
Proceed with operation (y|n)? y
Rule deleted`}
        />
        <Command
          root
          command="ufw delete allow 80/tcp"
          comment="Forma alternativa: passar a regra exata"
          output={`Rule deleted
Rule deleted (v6)`}
        />
      </Terminal>

      <h3>1.3 — Logs, perfis de aplicação e reset</h3>
      <Terminal title="root@ubuntu: ~">
        <Command root command="ufw logging on" output={`Logging enabled`} />
        <Command root command="ufw logging medium" comment="off | low (padrão) | medium | high | full" output={`Logging set to 'medium'`} />
        <Command root command="tail -n 5 /var/log/ufw.log" output={`Nov 12 09:12:33 ubuntu kernel: [UFW BLOCK] IN=eth0 OUT= MAC=02:7d:... SRC=185.220.101.45 DST=10.0.0.5 LEN=60 TTL=51 ID=12345 PROTO=TCP SPT=49210 DPT=23 WINDOW=29200 SYN
Nov 12 09:13:01 ubuntu kernel: [UFW LIMIT BLOCK] IN=eth0 OUT= SRC=45.79.12.8 DST=10.0.0.5 PROTO=TCP SPT=55001 DPT=22 WINDOW=64240 SYN
Nov 12 09:14:22 ubuntu kernel: [UFW BLOCK] IN=eth0 OUT= SRC=104.131.12.7 DST=10.0.0.5 PROTO=TCP SPT=33012 DPT=3389
Nov 12 09:14:55 ubuntu kernel: [UFW BLOCK] IN=eth0 OUT= SRC=64.62.197.9 DST=10.0.0.5 PROTO=UDP SPT=53 DPT=51820
Nov 12 09:15:02 ubuntu kernel: [UFW BLOCK] IN=eth0 OUT= SRC=222.186.30.7 DST=10.0.0.5 PROTO=TCP SPT=46011 DPT=22 WINDOW=1024 SYN`} />
        <Command root command="ufw app list" output={`Available applications:
  Apache
  Apache Full
  Apache Secure
  CUPS
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
  Samba`} />
        <Command root command="ufw app info 'Nginx Full'" output={`Profile: Nginx Full
Title: Web Server (HTTP,HTTPS)
Description: Small, but very powerful and efficient web server

Ports:
  80,443/tcp`} />
        <Command root command="ufw allow 'Nginx Full'" output={`Rule added
Rule added (v6)`} />
        <Command root command="ufw reset" comment="ZERA tudo (pede confirmação) — útil em laboratório" output={`Resetting all rules to installed defaults. Proceed with operation (y|n)? y
Backing up 'user.rules' to '/etc/ufw/user.rules.20251112_091633'
Backing up 'before.rules' to '/etc/ufw/before.rules.20251112_091633'
...`} />
      </Terminal>

      <h2>2. iptables / nftables — quando UFW não basta</h2>
      <p>
        UFW gera regras <code>nftables</code> por baixo. Em casos avançados (NAT, marcação de
        pacotes, filtros L7, política por interface) você precisa editar diretamente. No Ubuntu
        24.04 o <em>backend</em> padrão é <code>nftables</code>, mas o comando legado
        <code>iptables</code> ainda funciona via wrapper <code>iptables-nft</code>.
      </p>

      <Terminal title="root@ubuntu: ~">
        <Command root command="iptables -L -n -v --line-numbers" output={`Chain INPUT (policy DROP 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination
1      120  9600 ufw-before-input  all  --  *      *       0.0.0.0/0            0.0.0.0/0
2        0     0 ufw-after-input   all  --  *      *       0.0.0.0/0            0.0.0.0/0

Chain FORWARD (policy DROP 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination

Chain OUTPUT (policy ACCEPT 8 packets, 712 bytes)
num   pkts bytes target     prot opt in     out     source               destination`} />
        <Command root command="nft list ruleset | head -20" output={`table inet filter {
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
}`} />
        <Command root command="iptables-save > /root/iptables.bkp" comment="Snapshot completo das regras" />
      </Terminal>

      <InfoBox type="tip" title="Use UFW para 95% dos casos">
        Mexer em <code>iptables</code>/<code>nftables</code> direto é poderoso mas erra-se feio:
        uma regra fora de ordem destrói o <em>fail-safe</em>. Reserve nftables para roteadores,
        gateways NAT, container hosts e firewalls de alto desempenho.
      </InfoBox>

      <h2>3. sudo hardening</h2>
      <p>
        <code>sudo</code> é a porta de entrada para privilégios root. Vamos endurecê-lo: editar
        com <code>visudo</code> (valida sintaxe), separar permissões em <code>sudoers.d</code>,
        exigir senha, log detalhado e timeout curto.
      </p>

      <Terminal title="root@ubuntu: ~">
        <Command root command="visudo" comment="SEMPRE use visudo, nunca edite /etc/sudoers diretamente" />
        <Command root command="cat /etc/sudoers" output={`Defaults        env_reset
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
Defaults        use_pty
Defaults        logfile="/var/log/sudo.log"
Defaults        timestamp_timeout=5
Defaults        passwd_tries=3

root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
%admin  ALL=(ALL) ALL

@includedir /etc/sudoers.d`} />
      </Terminal>

      <File path="/etc/sudoers.d/10-hardening">
{`# Endurecimento global
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
%dev !SHELLS`}
      </File>

      <Terminal title="root@ubuntu: ~">
        <Command root command="visudo -cf /etc/sudoers.d/10-hardening" output={`/etc/sudoers.d/10-hardening: parsed OK`} />
        <Command command="sudo -l" comment="Listar o que VOCÊ pode rodar via sudo" output={`Matching Defaults entries for wallyson on ubuntu:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin, use_pty, logfile=/var/log/sudo.log

User wallyson may run the following commands on ubuntu:
    (ALL : ALL) ALL`} />
        <Command root command="tail -n 5 /var/log/sudo.log" output={`Nov 12 10:02:11 : wallyson : TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=/usr/bin/apt update
Nov 12 10:03:44 : wallyson : TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=/usr/bin/systemctl restart nginx
Nov 12 10:04:01 : wallyson : 2 incorrect password attempts ; TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=/usr/bin/cat /etc/shadow
Nov 12 10:05:18 : wallyson : TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=/usr/bin/visudo
Nov 12 10:06:02 : wallyson : TTY=pts/0 ; PWD=/home/wallyson ; USER=root ; COMMAND=list`} />
      </Terminal>

      <h2>4. SSH hardening (resumo)</h2>
      <p>
        A página <strong>Redes → SSH</strong> tem o detalhamento completo. Aqui o checklist
        mínimo que <em>todo</em> servidor precisa.
      </p>

      <File path="/etc/ssh/sshd_config.d/99-hardening.conf">
{`Port 2222
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
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com`}
      </File>

      <Terminal title="root@ubuntu: ~">
        <Command root command="sshd -t" comment="Testar sintaxe sem reiniciar — OBRIGATÓRIO" />
        <Command root command="systemctl reload ssh" />
        <Command command="ss -tlnp | grep ssh" output={`LISTEN 0      128                *:2222             *:*    users:(("sshd",pid=1224,fd=3))
LISTEN 0      128             [::]:2222          [::]:*    users:(("sshd",pid=1224,fd=4))`} />
      </Terminal>

      <InfoBox type="warning" title="Mantenha duas sessões abertas">
        Antes de aplicar mudanças no <code>sshd</code>, abra uma <strong>segunda sessão</strong>
        e teste antes de fechar a primeira. Se algo deu errado, você ainda pode corrigir.
      </InfoBox>

      <h2>5. Atualizações automáticas — unattended-upgrades</h2>
      <Terminal title="root@ubuntu: ~">
        <Command root command="apt install -y unattended-upgrades apt-listchanges" output={`Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  apt-listchanges unattended-upgrades
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
Need to get 142 kB of archives.
After this operation, 542 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu noble/main amd64 apt-listchanges all 4.0 [89,2 kB]
Get:2 http://archive.ubuntu.com/ubuntu noble/main amd64 unattended-upgrades all 2.9.1+nmu4ubuntu1 [53,4 kB]
Fetched 142 kB in 1s (210 kB/s)
Selecting previously unselected package apt-listchanges.
(Reading database ... 188422 files and directories currently installed.)
Preparing to unpack .../apt-listchanges_4.0_all.deb ...
Unpacking apt-listchanges (4.0) ...
Selecting previously unselected package unattended-upgrades.
Preparing to unpack .../unattended-upgrades_2.9.1+nmu4ubuntu1_all.deb ...
Unpacking unattended-upgrades (2.9.1+nmu4ubuntu1) ...
Setting up apt-listchanges (4.0) ...
Setting up unattended-upgrades (2.9.1+nmu4ubuntu1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/unattended-upgrades.service → /usr/lib/systemd/system/unattended-upgrades.service.
Synchronizing state of unattended-upgrades.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable unattended-upgrades
Processing triggers for man-db (2.12.0-4build2) ...`} />
        <Command root command="dpkg-reconfigure -plow unattended-upgrades" comment="Pergunta se deve ativar — escolha Yes" />
      </Terminal>

      <File path="/etc/apt/apt.conf.d/50unattended-upgrades">
{`Unattended-Upgrade::Allowed-Origins {
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
Unattended-Upgrade::SyslogEnable "true";`}
      </File>

      <File path="/etc/apt/apt.conf.d/20auto-upgrades">
{`APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::Verbose "2";`}
      </File>

      <Terminal title="root@ubuntu: ~">
        <Command root command="unattended-upgrade --dry-run -d" output={`Initial blacklist: ^linux-
Initial whitelist (not strict):
Starting unattended upgrades script
Allowed origins are: origin=Ubuntu,archive=noble, origin=Ubuntu,archive=noble-security, ...
Using (^linux-.*) regexp to find blacklisted packages
Checking: openssh-server (["origin=Ubuntu,archive=noble-security"])
  pkg openssh-server: 1:9.6p1-3ubuntu13.5 -> 1:9.6p1-3ubuntu13.6
Checking: libssl3t64 (["origin=Ubuntu,archive=noble-security"])
  pkg libssl3t64: 3.0.13-0ubuntu3.4 -> 3.0.13-0ubuntu3.5
pkgs that look like they should be upgraded:
 openssh-server libssl3t64 openssh-client openssh-sftp-server
Fetched 0 B in 0s (0 B/s)
extracting templates from packages: 100%
Preconfiguring packages ...
GetArchives: ...
Writing dpkg log to /var/log/unattended-upgrades/unattended-upgrades-dpkg.log
All upgrades installed`} />
        <Command root command="cat /var/log/unattended-upgrades/unattended-upgrades.log" output={`2025-11-12 06:00:01,332 INFO Starting unattended upgrades script
2025-11-12 06:00:01,332 INFO Allowed origins are: o=Ubuntu,a=noble, o=Ubuntu,a=noble-security, o=Ubuntu,a=noble-updates
2025-11-12 06:00:23,887 INFO Packages that will be upgraded: openssh-client openssh-server openssh-sftp-server libssl3t64
2025-11-12 06:00:23,887 INFO Writing dpkg log to /var/log/unattended-upgrades/unattended-upgrades-dpkg.log
2025-11-12 06:01:14,521 INFO All upgrades installed`} />
      </Terminal>

      <h2>6. auditd — auditoria do kernel</h2>
      <p>
        O subsistema <code>audit</code> do kernel registra <em>chamadas de sistema</em>: quem
        leu <code>/etc/shadow</code>, quem escreveu em <code>/etc/passwd</code>, qual processo
        chamou <code>execve</code>. É forensics em tempo real.
      </p>

      <Terminal title="root@ubuntu: ~">
        <Command root command="apt install -y auditd audispd-plugins" output={`Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  audispd-plugins auditd libauparse0t64
0 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.
Need to get 312 kB of archives.
After this operation, 1.221 kB of additional disk space will be used.
Setting up auditd (1:3.1.2-2.1build1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/auditd.service → /usr/lib/systemd/system/auditd.service.`} />
        <Command root command="systemctl enable --now auditd" output={`Synchronizing state of auditd.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.`} />
        <Command root command="auditctl -w /etc/passwd -p wa -k usuarios" comment="-p wa = monitora WRITE e ATTRIBUTE; -k = tag" output={``} />
        <Command root command="auditctl -w /etc/shadow -p rwa -k credenciais" />
        <Command root command="auditctl -a always,exit -F arch=b64 -S execve -F euid=0 -k root-exec" comment="Loga TUDO que root executa" />
        <Command root command="auditctl -l" output={`-w /etc/passwd -p wa -k usuarios
-w /etc/shadow -p rwa -k credenciais
-a always,exit -F arch=b64 -S execve -F euid=0 -k root-exec`} />
        <Command root command="ausearch -k usuarios -ts recent" output={`----
time->Tue Nov 12 11:14:22 2025
type=PROCTITLE msg=audit(1731410062.221:1843): proctitle="vim /etc/passwd"
type=PATH msg=audit(1731410062.221:1843): item=0 name="/etc/passwd" inode=1572881 dev=08:02 mode=0100644 ouid=0 ogid=0 rdev=00:00 nametype=NORMAL
type=CWD msg=audit(1731410062.221:1843): cwd="/root"
type=SYSCALL msg=audit(1731410062.221:1843): arch=c000003e syscall=257 success=yes exit=4 a0=ffffff9c a1=7ffd9d... items=1 ppid=4221 pid=4232 auid=1000 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=pts0 ses=3 comm="vim" exe="/usr/bin/vim.basic" key="usuarios"`} />
        <Command root command="aureport -au --summary -i" comment="Resumo de autenticações" output={`Authentication Report
============================================
# date time acct host term exe success event
============================================
1. 11/12/2025 06:00:01 root ? ? /usr/sbin/cron yes 1812
2. 11/12/2025 09:14:32 wallyson 192.168.1.10 ssh /usr/sbin/sshd yes 1830
3. 11/12/2025 09:18:02 invalid_root 185.220.101.45 ssh /usr/sbin/sshd no 1834
4. 11/12/2025 09:18:05 invalid_admin 185.220.101.45 ssh /usr/sbin/sshd no 1835`} />
      </Terminal>

      <h2>7. lynis — auditoria de configuração</h2>

      <Terminal title="root@ubuntu: ~">
        <Command root command="apt install -y lynis" output={`Setting up lynis (3.0.9-1) ...`} />
        <Command root command="lynis audit system" output={`[ Lynis 3.0.9 ]

[+] Initializing program
------------------------------------
  - Detecting OS...                                           [ DONE ]
  - Checking profiles...                                      [ DONE ]

  ---------------------------------------------------
  Program version:           3.0.9
  Operating system:          Linux
  Operating system name:     Ubuntu
  Operating system version:  24.04
  Kernel version:            6.8.0-48-generic
  Hardware platform:         x86_64
  Hostname:                  ubuntu
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
================================================================================`} />
      </Terminal>

      <h2>8. rkhunter & chkrootkit — caça-rootkits</h2>
      <Terminal title="root@ubuntu: ~">
        <Command root command="apt install -y rkhunter chkrootkit" />
        <Command root command="rkhunter --update" output={`[ Rootkit Hunter version 1.4.6 ]
Checking rkhunter data files...
  Checking file mirrors.dat                                  [ Updated ]
  Checking file programs_bad.dat                             [ Updated ]
  Checking file backdoorports.dat                            [ Updated ]
  Checking file suspscan.dat                                 [ Updated ]
  Checking file i18n versions                                [ Updated ]`} />
        <Command root command="rkhunter --propupd" comment="Atualiza baseline (rode SÓ em sistema limpo)" output={`File created: searched for 181 files, found 145`} />
        <Command root command="rkhunter --check --sk" output={`Checking system commands...
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
The system checks took: 1 minute and 14 seconds`} />
        <Command root command="chkrootkit -q" comment="-q = só mostra problemas" output={`(nenhum problema encontrado)`} />
      </Terminal>

      <h2>9. Princípios — defense in depth & least privilege</h2>

      <table>
        <thead>
          <tr><th>Princípio</th><th>Aplicação prática</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Least privilege</strong></td><td>Cada serviço roda como usuário próprio (www-data, postgres). NUNCA rode aplicação web como root.</td></tr>
          <tr><td><strong>Defense in depth</strong></td><td>UFW + Fail2Ban + AppArmor + SSH-keys + 2FA. Se uma camada falha, outras seguram.</td></tr>
          <tr><td><strong>Fail closed</strong></td><td>Política padrão é DENY. Libere apenas o necessário, explicitamente.</td></tr>
          <tr><td><strong>Audit everything</strong></td><td>journald + auditd + sudo logs + ufw logs centralizados (rsyslog, Loki, ELK).</td></tr>
          <tr><td><strong>Minimal attack surface</strong></td><td>Desinstale o que não usa: <code>apt purge cups bluetooth avahi-daemon</code> em servidor.</td></tr>
          <tr><td><strong>Patch fast</strong></td><td>unattended-upgrades para CVEs críticos; testes em staging para o resto.</td></tr>
          <tr><td><strong>Segregação</strong></td><td>Bancos, web e admin em redes/VPCs separadas; firewall entre tiers.</td></tr>
          <tr><td><strong>Verifique backups</strong></td><td>Backup que nunca foi restaurado <em>não é</em> backup. Faça <em>restore drills</em>.</td></tr>
        </tbody>
      </table>

      <InfoBox type="success" title="Checklist mínimo de produção">
        <ul>
          <li>UFW ativo, default deny incoming, SSH/HTTP/HTTPS liberados.</li>
          <li>Fail2Ban com jail sshd e nginx-http-auth.</li>
          <li>SSH: PermitRootLogin no, PasswordAuthentication no, AllowUsers explícito.</li>
          <li>unattended-upgrades configurado para -security.</li>
          <li>auditd ativo monitorando /etc/passwd, /etc/shadow, /etc/sudoers.</li>
          <li>Lynis hardening index ≥ 80.</li>
          <li>Backups offsite (3-2-1) e testados.</li>
          <li>Logs centralizados em servidor independente.</li>
          <li>Usuários administrativos com chave SSH + frase-senha + TOTP.</li>
          <li>Monitoramento (Prometheus/Grafana) com alertas para login root, falhas SSH, uso de CPU anômalo.</li>
        </ul>
      </InfoBox>
    </PageContainer>
  );
}

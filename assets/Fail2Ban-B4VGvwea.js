import{j as e}from"./index-d-w5ROEn.js";import{P as i}from"./PageContainer-t8f2nTRw.js";import{T as t,C as a,F as n}from"./Terminal-B39pZIiO.js";import{I as o}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function u(){return e.jsxs(i,{title:"Fail2Ban — barrar brute force",subtitle:"Detecta padrões em logs (SSH, nginx, postfix...) e banha IPs automaticamente via UFW/iptables/nftables.",difficulty:"intermediario",timeToRead:"25 min",category:"Segurança",children:[e.jsxs("p",{children:["Qualquer servidor SSH exposto à internet recebe milhares de tentativas de login por dia — bots varrem a porta 22 e tentam combinações de usuário/senha. O ",e.jsx("strong",{children:"Fail2Ban"}),"observa logs em tempo real, conta falhas por IP e, ao cruzar um limite, executa uma ação (geralmente: banir o IP no firewall por X minutos). Suporta SSH, nginx, apache, postfix, dovecot, vsftpd, proftpd, asterisk, recidive (banir reincidentes por mais tempo) e qualquer log com regex customizada."]}),e.jsxs(t,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"pkg install -y fail2ban",output:`Reading package lists... Done
The following NEW packages will be installed:
  fail2ban python3-pyinotify python3-systemd whois
0 upgraded, 4 newly installed, 0 to remove and 0 not upgraded.
Need to get 489 kB of archives.
After this operation, 2.211 kB of additional disk space will be used.
Setting up fail2ban (1.0.2-termux.1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/fail2ban.service → /usr/lib/systemd/system/fail2ban.service.
Synchronizing state of fail2ban.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.`}),e.jsx(a,{root:!0,command:"systemctl status fail2ban",output:`● fail2ban.service - Fail2Ban Service
     Loaded: loaded (/usr/lib/systemd/system/fail2ban.service; enabled; preset: enabled)
     Active: active (running) since Tue 2025-11-12 09:14:32 BRT; 12s ago
       Docs: man:fail2ban(1)
   Main PID: 4421 (fail2ban-server)
      Tasks: 5 (limit: 4612)
     Memory: 14.2M
        CPU: 142ms
     CGroup: /system.slice/fail2ban.service
             └─4421 /usr/bin/python3 /usr/bin/fail2ban-server -xf start`})]}),e.jsx("h2",{children:"1. Estrutura: jail.conf vs jail.local"}),e.jsxs("p",{children:["Regra de ouro: ",e.jsx("strong",{children:"nunca"})," edite ",e.jsx("code",{children:"/etc/fail2ban/jail.conf"})," — ele é sobrescrito em updates. Crie ",e.jsx("code",{children:"jail.local"})," (sobrescreve seções e chaves) ou arquivos em ",e.jsx("code",{children:"/etc/fail2ban/jail.d/*.conf"})," (organização modular)."]}),e.jsxs(t,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"ls /etc/fail2ban/",output:"action.d/    fail2ban.conf  fail2ban.d/   filter.d/   jail.conf   jail.d/   paths-arch.conf   paths-common.conf   paths-debian.conf   paths-opensuse.conf"}),e.jsx(a,{root:!0,command:"cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local",comment:"Cópia inicial — depois edite só o necessário"})]}),e.jsx(n,{path:"/etc/fail2ban/jail.local",children:`[DEFAULT]
# Endereços que NUNCA serão banidos (você, monitoramento, etc)
ignoreip = 127.0.0.1/8 ::1 192.168.1.0/24 203.0.113.5

# Janela de observação (segundos)
findtime = 10m

# Tempo de banimento (segundos, m=min, h=hora, d=dia)
bantime  = 1h

# Tentativas antes de banir
maxretry = 5

# Backend de log (auto detecta; systemd em Termux 0.118)
backend  = systemd

# Banir tanto IPv4 quanto IPv6
usedns = warn
banaction = ufw
banaction_allports = ufw

# E-mail de notificação (opcional)
destemail = admin@exemplo.com
sender    = fail2ban@termux
mta       = sendmail
action    = %(action_mwl)s    # mw=mail, l=inclui linhas do log

# ----------------- JAILS -----------------

[sshd]
enabled  = true
port     = 22,2222
filter   = sshd
mode     = aggressive
maxretry = 3
findtime = 10m
bantime  = 1d

[sshd-ddos]
enabled  = true
port     = 22,2222
filter   = sshd
maxretry = 2
bantime  = 1h

[nginx-http-auth]
enabled = true
port    = http,https
filter  = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 5

[nginx-botsearch]
enabled  = true
port     = http,https
filter   = nginx-botsearch
logpath  = /var/log/nginx/access.log
maxretry = 2

[nginx-bad-request]
enabled  = true
port     = http,https
filter   = nginx-bad-request
logpath  = /var/log/nginx/access.log
maxretry = 4

[recidive]
enabled  = true
filter   = recidive
logpath  = /var/log/fail2ban.log
action   = ufw
bantime  = 1w
findtime = 1d
maxretry = 3`}),e.jsxs(t,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"systemctl restart fail2ban"}),e.jsx(a,{root:!0,command:"fail2ban-client status",output:`Status
|- Number of jail:      5
\`- Jail list:   nginx-bad-request, nginx-botsearch, nginx-http-auth, recidive, sshd`}),e.jsx(a,{root:!0,command:"fail2ban-client status sshd",output:`Status for the jail: sshd
|- Filter
|  |- Currently failed: 4
|  |- Total failed:     1284
|  \`- Journal matches:  _SYSTEMD_UNIT=ssh.service + _COMM=sshd
\`- Actions
   |- Currently banned: 12
   |- Total banned:     147
   \`- Banned IP list:   45.79.12.8 64.62.197.9 104.131.12.7 185.220.101.45 185.220.102.4 192.42.116.16 195.123.246.138 198.46.135.194 218.92.0.34 220.130.10.10 222.186.30.7 5.181.151.36`})]}),e.jsx("h2",{children:"2. Filtros — onde mora a regex"}),e.jsxs("p",{children:["Cada jail referencia um ",e.jsx("strong",{children:"filter"})," em ",e.jsx("code",{children:"/etc/fail2ban/filter.d/"}),". Ele contém regex ",e.jsx("code",{children:"failregex"})," para identificar uma falha e ",e.jsx("code",{children:"ignoreregex"}),"para excluir falsos positivos."]}),e.jsxs(t,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"ls /etc/fail2ban/filter.d/ | head -10",output:`apache-auth.conf
apache-badbots.conf
apache-botsearch.conf
apache-common.conf
apache-fakegooglebot.conf
apache-modsecurity.conf
apache-nokeepalive.conf
apache-noscript.conf
apache-overflows.conf
apache-pass.conf`}),e.jsx(a,{root:!0,command:"cat /etc/fail2ban/filter.d/sshd.conf | head -30",output:`# Fail2Ban filter for openssh
[INCLUDES]
before = common.conf

[DEFAULT]
_daemon = sshd

__pref = (?:(?:error|fatal): (?:PAM: )?)?
__suff = (?: \\[preauth\\])?\\s*$
__on_port_opt = (?: (?:port \\d+|on \\S+)){0,2}

[Definition]
prefregex = ^%(__prefix_line)s%(__pref)s<F-CONTENT>.+</F-CONTENT>$

failregex = ^[aA]uthentication (?:failure|error|failed) for <F-USER>.*</F-USER> from <HOST>%(__suff)s
            ^User <F-USER>.+</F-USER> from <HOST> not allowed because not listed in AllowUsers%(__suff)s
            ^Failed [a-zA-Z0-9-]+ for (?:invalid user )?<F-USER>.+</F-USER> from <HOST>%(__on_port_opt)s%(__suff)s
            ^Invalid user <F-USER>.+</F-USER> from <HOST>%(__suff)s
            ^Did not receive identification string from <HOST>%(__suff)s
            ^Disconnected from <HOST> port \\d+ %(__suff)s

ignoreregex =`})]}),e.jsx("h2",{children:"3. Filtro custom — barrar tentativas em /admin do nginx"}),e.jsx(n,{path:"/etc/fail2ban/filter.d/nginx-admin.conf",children:`[Definition]
failregex = ^<HOST> -.*"(GET|POST) /(admin|wp-admin|wp-login\\.php|phpmyadmin)
ignoreregex =
datepattern = {^LN-BEG}%%ExY(?P<_sep>[-/.])%%m(?P=_sep)%%d[T ]%%H:%%M:%%S(?:[.,]%%f)?(?:\\s*%%z)?
              ^[^\\[]*\\[({DATE})
              {^LN-BEG}`}),e.jsx(n,{path:"/etc/fail2ban/jail.d/nginx-admin.conf",children:`[nginx-admin]
enabled = true
port    = http,https
filter  = nginx-admin
logpath = /var/log/nginx/access.log
maxretry = 3
findtime = 5m
bantime  = 1d
action   = ufw[application="Nginx Full"]`}),e.jsxs(t,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"fail2ban-client reload",output:"OK"}),e.jsx(a,{root:!0,command:"fail2ban-regex /var/log/nginx/access.log /etc/fail2ban/filter.d/nginx-admin.conf",comment:"Testa o regex contra um log real",output:`Running tests
=============

Use   failregex filter file : nginx-admin, basedir: /etc/fail2ban
Use         log file : /var/log/nginx/access.log
Use         encoding : UTF-8

Results
=======
Failregex: 27 total
|-  #) [# of hits] regular expression
|   1) [27] ^<HOST> -.*"(GET|POST) /(admin|wp-admin|wp-login\\.php|phpmyadmin)
\`-

Ignoreregex: 0 total

Date template hits:
|- [# of hits] date format
|  [4231] {^LN-BEG}Day(?P<_sep>[-/])MON(?P=_sep)ExY[T ]24hour:Minute:Second
\`-

Lines: 4231 lines, 0 ignored, 27 matched, 4204 missed
[processed in 0.41 sec]`})]}),e.jsx("h2",{children:"4. fail2ban-client — controle dia-a-dia"}),e.jsxs(t,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"fail2ban-client status sshd"}),e.jsx(a,{root:!0,command:"fail2ban-client unban 45.79.12.8",comment:"Desbanir um IP (você mesmo, por exemplo)",output:"1"}),e.jsx(a,{root:!0,command:"fail2ban-client unban --all",comment:"Reset total de banimentos",output:"12"}),e.jsx(a,{root:!0,command:"fail2ban-client set sshd banip 198.51.100.7",comment:"Banir manualmente",output:"1"}),e.jsx(a,{root:!0,command:"fail2ban-client get sshd banned",output:"['198.51.100.7']"}),e.jsx(a,{root:!0,command:"fail2ban-client get sshd bantime",output:"86400"}),e.jsx(a,{root:!0,command:"fail2ban-client set sshd bantime 7200",comment:"Mudar bantime em runtime (até reload)",output:"7200"}),e.jsx(a,{root:!0,command:"fail2ban-client reload sshd",output:"OK"}),e.jsx(a,{root:!0,command:"fail2ban-client stop"}),e.jsx(a,{root:!0,command:"fail2ban-client start"})]}),e.jsx("h2",{children:"5. Integração com UFW"}),e.jsxs("p",{children:["A action padrão ",e.jsx("code",{children:"ufw"})," usa ",e.jsx("code",{children:"ufw insert 1 deny from <ip>"}),". Como UFW preserva regras numeradas, o IP banido vira a regra #1 — bloqueando antes de qualquer permissão."]}),e.jsxs(t,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"cat /etc/fail2ban/action.d/ufw.conf | head -25",output:`[Definition]
actionstart =
actionstop =
actioncheck =
actionban = [ -n "<application>" ] && app="app <application>"
            ufw prepend <blocktype> from <ip> to <destination> $app
actionunban = [ -n "<application>" ] && app="app <application>"
              ufw delete <blocktype> from <ip> to <destination> $app

[Init]
blocktype = deny
destination = any
application =`}),e.jsx(a,{root:!0,command:"ufw status numbered | head -10",output:`Status: active

     To                         Action      From
     --                         ------      ----
[ 1] Anywhere                   DENY IN     45.79.12.8
[ 2] Anywhere                   DENY IN     185.220.101.45
[ 3] Anywhere                   DENY IN     222.186.30.7
[ 4] 22/tcp                     LIMIT IN    Anywhere
[ 5] 80/tcp                     ALLOW IN    Anywhere
[ 6] 443/tcp                    ALLOW IN    Anywhere`})]}),e.jsx("h2",{children:"6. Logs — quem fez o quê e quando"}),e.jsxs(t,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"tail -n 10 /var/log/fail2ban.log",output:`2025-11-12 09:14:32,221 fail2ban.server [4421]: INFO Starting Fail2ban v1.0.2
2025-11-12 09:14:32,224 fail2ban.observer [4421]: INFO Observer start...
2025-11-12 09:14:32,318 fail2ban.jail [4421]: INFO Jail 'sshd' started
2025-11-12 09:14:32,321 fail2ban.jail [4421]: INFO Jail 'nginx-http-auth' started
2025-11-12 09:18:02,442 fail2ban.filter [4421]: INFO [sshd] Found 185.220.101.45 - 2025-11-12 09:18:02
2025-11-12 09:18:11,521 fail2ban.filter [4421]: INFO [sshd] Found 185.220.101.45 - 2025-11-12 09:18:11
2025-11-12 09:18:18,612 fail2ban.filter [4421]: INFO [sshd] Found 185.220.101.45 - 2025-11-12 09:18:18
2025-11-12 09:18:18,712 fail2ban.actions [4421]: NOTICE [sshd] Ban 185.220.101.45
2025-11-12 09:21:45,332 fail2ban.filter [4421]: INFO [recidive] Found 185.220.101.45 - 2025-11-12 09:21:45
2025-11-12 09:25:01,891 fail2ban.actions [4421]: NOTICE [sshd] Unban 45.79.12.8`}),e.jsx(a,{root:!0,command:"zgrep -h 'Ban ' /var/log/fail2ban.log* | awk '{print $NF}' | sort | uniq -c | sort -rn | head",comment:"Top IPs banidos",output:`     42 185.220.101.45
     31 222.186.30.7
     28 218.92.0.34
     22 45.79.12.8
     19 64.62.197.9`})]}),e.jsx("h2",{children:"7. Recidive — banir reincidentes por mais tempo"}),e.jsxs("p",{children:["O jail ",e.jsx("code",{children:"recidive"})," observa o próprio ",e.jsx("code",{children:"fail2ban.log"}),". Se um IP é banido várias vezes em jails diferentes, ele entra para uma ",e.jsx("em",{children:"blacklist"})," de longo prazo (1 semana, 1 mês)."]}),e.jsxs(o,{type:"tip",title:"Persistência entre reboots",children:["Por padrão, banimentos vivem em memória — reboot zera. Em produção use",e.jsx("code",{children:"persistentbans"})," ou exporte a lista para uma ",e.jsx("em",{children:"ipset"}),"/",e.jsx("em",{children:"nftset"}),"carregada no boot. Outra estratégia: integrar com CrowdSec (substituto moderno) ou compartilhar bans entre servidores via fail2ban-client + Redis."]}),e.jsx("h2",{children:"8. Testes finais"}),e.jsxs(t,{title:"root@termux: ~",children:[e.jsx(a,{root:!0,command:"fail2ban-client -t",comment:"Valida configuração antes de aplicar",output:"OK: configuration test is successful"}),e.jsx(a,{root:!0,command:"fail2ban-client -d | head -20",comment:"Dump completo da config carregada"}),e.jsx(a,{root:!0,command:"fail2ban-client status recidive",output:`Status for the jail: recidive
|- Filter
|  |- Currently failed: 1
|  |- Total failed:     12
|  \`- File list:        /var/log/fail2ban.log
\`- Actions
   |- Currently banned: 2
   |- Total banned:     8
   \`- Banned IP list:   185.220.101.45 222.186.30.7`})]})]})}export{u as default};

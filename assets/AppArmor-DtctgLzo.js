import{j as e}from"./index-DllpmZ7S.js";import{P as i}from"./PageContainer-D5o1LrsX.js";import{T as o,C as r,F as s}from"./Terminal-DJZg2Eps.js";import{I as a}from"./InfoBox-StGQOtUJ.js";import"./house-CLqZi7qQ.js";import"./proxy-Xil2K0n2.js";function m(){return e.jsxs(i,{title:"AppArmor — MAC do Ubuntu",subtitle:"Mandatory Access Control nativo do Ubuntu: perfis, modos enforce/complain, criação de perfis novos com aa-genprof e comparação com SELinux.",difficulty:"avancado",timeToRead:"25 min",category:"Segurança",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"AppArmor"})," é um ",e.jsx("em",{children:"Mandatory Access Control"})," (MAC) que confina processos a um conjunto explícito de recursos: arquivos, capabilities do kernel, sockets de rede, sinais. Diferente do ",e.jsx("strong",{children:"DAC"})," (permissões rwx + uid/gid) que é discricionário, o MAC é imposto pelo kernel ",e.jsx("em",{children:"mesmo se o processo for root"}),". No Ubuntu o AppArmor vem ligado por padrão e protege serviços como CUPS, snapd, dhclient, evince, firefox (snap), nginx (opcional), apache, mysqld."]}),e.jsxs(o,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{command:"aa-enabled",output:"Yes"}),e.jsx(r,{command:"cat /sys/kernel/security/apparmor/profiles | head -10",output:`/usr/bin/man (enforce)
/usr/lib/snapd/snap-confine (enforce)
/usr/lib/snapd/snap-confine//mount-namespace-capture-helper (enforce)
/usr/sbin/cups-browsed (enforce)
/usr/sbin/cupsd (enforce)
man_filter (enforce)
man_groff (enforce)
nvidia_modprobe (enforce)
nvidia_modprobe//kmod (enforce)
snap.firefox.firefox (enforce)`})]}),e.jsx("h2",{children:"1. Instalando as ferramentas e estrutura"}),e.jsxs(o,{title:"root@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"apt install -y apparmor apparmor-utils apparmor-profiles apparmor-profiles-extra",output:`Reading package lists... Done
The following NEW packages will be installed:
  apparmor-profiles apparmor-profiles-extra apparmor-utils python3-apparmor python3-libapparmor
0 upgraded, 5 newly installed, 0 to remove and 0 not upgraded.
Need to get 712 kB of archives.
Setting up apparmor-utils (4.0.1-0ubuntu0.24.04.3) ...
Setting up apparmor-profiles (4.0.1-0ubuntu0.24.04.3) ...`}),e.jsx(r,{root:!0,command:"ls /etc/apparmor.d/",output:`abstractions/         tunables/
local/                usr.bin.evince
disable/              usr.bin.man
cups-browsed          usr.lib.snapd.snap-confine.real
nvidia_modprobe       usr.sbin.cupsd
sbin.dhclient         usr.sbin.dhclient
snap-update-ns.firefox usr.sbin.haveged
                      usr.sbin.tcpdump`}),e.jsx(r,{root:!0,command:"ls /etc/apparmor.d/abstractions/ | head -8",output:`apache2-common
audio
authentication
base
bash
consoles
crypto
cups-client`})]}),e.jsx("h2",{children:"2. aa-status — radiografia do sistema"}),e.jsx(o,{title:"root@ubuntu: ~",children:e.jsx(r,{root:!0,command:"aa-status",output:`apparmor module is loaded.
46 profiles are loaded.
40 profiles are in enforce mode.
   /snap/snapd/21184/usr/lib/snapd/snap-confine
   /snap/snapd/21184/usr/lib/snapd/snap-confine//mount-namespace-capture-helper
   /usr/bin/evince
   /usr/bin/man
   /usr/lib/cups/backend/cups-pdf
   /usr/sbin/cups-browsed
   /usr/sbin/cupsd
   /usr/sbin/dhclient
   /usr/sbin/haveged
   /usr/sbin/tcpdump
   man_filter
   man_groff
   nvidia_modprobe
   nvidia_modprobe//kmod
   snap.firefox.firefox
   snap.firefox.geckodriver
6 profiles are in complain mode.
   /usr/sbin/mysqld
   /usr/sbin/named
   /usr/sbin/ntpd
   /usr/sbin/smbd
0 profiles are in kill mode.
0 profiles are in unconfined mode.
20 processes have profiles defined.
17 processes are in enforce mode.
   /usr/sbin/cupsd (1421)
   /usr/sbin/cups-browsed (1599)
   snap.firefox.firefox (4321) firefox
3 processes are in complain mode.
0 processes are unconfined but have a profile defined.`})}),e.jsx(a,{type:"info",title:"Os modos de um perfil",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"enforce"})," — viola o perfil = ação BLOQUEADA + log no auditd."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"complain"})," — viola o perfil = log apenas (não bloqueia). Modo de aprendizado/teste."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"disable"})," — perfil desativado, processo roda sem MAC."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"kill"})," (raro) — viola o perfil = SIGKILL no processo."]})]})}),e.jsx("h2",{children:"3. Trocar modo de um perfil"}),e.jsxs(o,{title:"root@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"aa-complain /usr/sbin/nginx",output:"Setting /usr/sbin/nginx to complain mode."}),e.jsx(r,{root:!0,command:"aa-enforce /usr/sbin/nginx",output:"Setting /usr/sbin/nginx to enforce mode."}),e.jsx(r,{root:!0,command:"aa-disable /usr/sbin/mysqld",comment:"Cria link em /etc/apparmor.d/disable/",output:"Disabling /usr/sbin/mysqld."}),e.jsx(r,{root:!0,command:"ls /etc/apparmor.d/disable/",output:"usr.sbin.mysqld"}),e.jsx(r,{root:!0,command:"aa-enforce /etc/apparmor.d/usr.sbin.mysqld",comment:"Reabilita removendo o link e aplicando",output:"Setting /etc/apparmor.d/usr.sbin.mysqld to enforce mode."})]}),e.jsx("h2",{children:"4. Anatomia de um perfil"}),e.jsx(s,{path:"/etc/apparmor.d/usr.sbin.tcpdump",children:`# vim:syntax=apparmor
#include <tunables/global>

/usr/sbin/tcpdump {
  #include <abstractions/base>
  #include <abstractions/nameservice>
  #include <abstractions/user-tmp>

  capability net_raw,
  capability setuid,
  capability setgid,
  capability dac_override,
  capability dac_read_search,

  network raw,
  network packet,

  capability net_admin,

  /dev/bpf*               rw,
  /etc/ethers             r,
  /usr/sbin/tcpdump       mr,

  @{HOME}/**.pcap*        rw,
  /var/log/tcpdump/**     rw,
  /tmp/tcpdump_*          rw,

  deny /home/*/.bash_history rw,
  deny /etc/shadow r,
}`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Vocabulário do perfil:"})," cada linha é uma regra. ",e.jsx("code",{children:"r"}),"=read,",e.jsx("code",{children:"w"}),"=write, ",e.jsx("code",{children:"x"}),"=execute (com modificadores Px/Cx/Ux), ",e.jsx("code",{children:"m"}),"=mmap,",e.jsx("code",{children:"k"}),"=lock, ",e.jsx("code",{children:"l"}),"=link. ",e.jsxs("code",{children:["@","{HOME}"]})," é uma ",e.jsx("em",{children:"tunable"}),"definida em ",e.jsx("code",{children:"/etc/apparmor.d/tunables/"}),". ",e.jsx("code",{children:"capability"})," controla as capabilities POSIX. ",e.jsx("code",{children:"deny"})," tem prioridade sobre allow."]}),e.jsx("h2",{children:"5. Recarregar perfis e diagnosticar"}),e.jsxs(o,{title:"root@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"apparmor_parser -r /etc/apparmor.d/usr.sbin.tcpdump",comment:"-r recarrega; -a adiciona; -R remove"}),e.jsx(r,{root:!0,command:"systemctl reload apparmor"}),e.jsx(r,{root:!0,command:"dmesg | grep -i apparmor | tail -10",output:`[ 8423.221] audit: type=1400 audit(1731412821.221:43): apparmor="DENIED" operation="open" profile="/usr/sbin/tcpdump" name="/etc/shadow" pid=4421 comm="tcpdump" requested_mask="r" denied_mask="r" fsuid=0 ouid=0
[ 8425.912] audit: type=1400 audit(1731412825.912:44): apparmor="ALLOWED" operation="capable" profile="/usr/sbin/tcpdump" pid=4421 comm="tcpdump" capability=13 capname="net_raw"`}),e.jsx(r,{root:!0,command:"journalctl -k | grep -i apparmor | tail -5"})]}),e.jsx("h2",{children:"6. Criando um perfil novo do zero — aa-genprof"}),e.jsxs("p",{children:["Vamos confinar um script ",e.jsx("code",{children:"/usr/local/bin/backup.sh"})," que faz backup. O fluxo: rodar ",e.jsx("code",{children:"aa-genprof"}),", em outra aba executar o programa, voltar e responder Allow/Deny para cada acesso descoberto."]}),e.jsxs(o,{title:"root@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"aa-genprof /usr/local/bin/backup.sh",output:`Updating AppArmor profiles in /etc/apparmor.d.
Writing updated profile for /usr/local/bin/backup.sh.
Setting /usr/local/bin/backup.sh to complain mode.

Before you begin, you may wish to check if a
profile already exists for the application you
wish to confine.

Please start the application to be profiled in
another window and exercise its functionality now.

Once completed, select the "Scan" option below in
order to scan the system logs for AppArmor events.

[(S)can system log for AppArmor events] / (F)inish`}),e.jsx(r,{root:!0,command:"# em outra aba: bash /usr/local/bin/backup.sh"}),e.jsx(r,{root:!0,command:"# voltar e digitar S — aa-genprof mostrará cada acesso:",output:`Reading log entries from /var/log/syslog.

Profile:  /usr/local/bin/backup.sh
Path:     /etc/passwd
New Mode: r
Severity: 4

 [1 - #include <abstractions/nameservice>]
  2 - /etc/passwd r,
(A)llow / [(D)eny] / (I)gnore / (G)lob / Glob with (E)xtension / (N)ew / Audi(t) / (O)wner permissions / Abo(r)t / (F)inish`}),e.jsx(r,{root:!0,command:"# escolha A para aprovar; depois F para terminar"})]}),e.jsx("h2",{children:"7. aa-logprof — refinar perfil já em uso"}),e.jsxs("p",{children:["Quando um perfil em ",e.jsx("em",{children:"complain"})," registra novas violações, ",e.jsx("code",{children:"aa-logprof"}),"lê os logs e propõe regras incrementais."]}),e.jsx(o,{title:"root@ubuntu: ~",children:e.jsx(r,{root:!0,command:"aa-logprof",output:`Reading log entries from /var/log/audit/audit.log.
Updating AppArmor profiles in /etc/apparmor.d.

Profile:  /usr/sbin/mysqld
Path:     /var/lib/mysql/binlog.000123
New Mode: rw
Severity: unknown

 [1 - /var/lib/mysql/** rw,]
   2 - /var/lib/mysql/binlog.000123 rw,

(A)llow / [(D)eny] / (I)gnore / (G)lob / Glob with (E)xtension / (N)ew / Audi(t) / (O)wner permissions / Abo(r)t / (F)inish

Adding /var/lib/mysql/** rw, to profile.

Save changes to profile /etc/apparmor.d/usr.sbin.mysqld? [(Y)es / (N)o / (V)iew Changes / Save Selec(t)ed Profile / Abo(r)t]
=> Y
Writing updated profile for /usr/sbin/mysqld.`})}),e.jsx("h2",{children:"8. Local override — sem mexer no perfil original"}),e.jsxs("p",{children:["Atualizações de pacote sobrescrevem perfis em ",e.jsx("code",{children:"/etc/apparmor.d/"}),". Para adicionar regras suas e sobreviver a upgrades, use ",e.jsx("code",{children:"/etc/apparmor.d/local/"}),"."]}),e.jsx(s,{path:"/etc/apparmor.d/local/usr.sbin.nginx",children:`# Regras locais aplicadas em cima do perfil principal de nginx
/srv/intranet/static/** r,
/var/lib/nginx/uploads/** rw,
deny /etc/passwd r,
deny /etc/shadow r,`}),e.jsx("h2",{children:"9. AppArmor vs SELinux — escolha consciente"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Aspecto"}),e.jsx("th",{children:"AppArmor (Ubuntu/SUSE)"}),e.jsx("th",{children:"SELinux (RHEL/Fedora)"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Modelo"})}),e.jsx("td",{children:"Path-based (caminhos)"}),e.jsx("td",{children:"Label-based (xattr nos inodes)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Aprendizado"})}),e.jsx("td",{children:"Suave — perfis em texto plano"}),e.jsx("td",{children:"Íngreme — políticas complexas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Granularidade"})}),e.jsx("td",{children:"Boa para apps individuais"}),e.jsx("td",{children:"Excelente em todo o sistema"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Modo de teste"})}),e.jsx("td",{children:e.jsx("code",{children:"complain"})}),e.jsx("td",{children:e.jsx("code",{children:"permissive"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Ferramentas"})}),e.jsx("td",{children:"aa-status, aa-genprof, aa-logprof"}),e.jsx("td",{children:"sestatus, audit2allow, semanage, restorecon"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Quando muda mount-point"})}),e.jsx("td",{children:"Perde proteção (paths mudaram)"}),e.jsx("td",{children:"Mantém (labels viajam com o inode)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Ubuntu padrão"})}),e.jsx("td",{children:"✅ ATIVO"}),e.jsx("td",{children:"❌ Não vem"})]})]})]}),e.jsxs(a,{type:"tip",title:"Dica de produção",children:["Em servidores Ubuntu mantenha AppArmor sempre ligado. Se um pacote está crashando por AppArmor, NUNCA o desabilite globalmente — coloque ",e.jsx("em",{children:"esse perfil específico"})," em complain, abra o issue/audit, gere as regras necessárias e volte para enforce."]})]})}export{m as default};

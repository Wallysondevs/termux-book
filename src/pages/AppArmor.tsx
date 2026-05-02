import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function AppArmor() {
  return (
    <PageContainer
      title="AppArmor — MAC do Ubuntu"
      subtitle="Mandatory Access Control nativo do Ubuntu: perfis, modos enforce/complain, criação de perfis novos com aa-genprof e comparação com SELinux."
      difficulty="avancado"
      timeToRead="25 min"
      category="Segurança"
    >
      <p>
        O <strong>AppArmor</strong> é um <em>Mandatory Access Control</em> (MAC) que confina
        processos a um conjunto explícito de recursos: arquivos, capabilities do kernel, sockets
        de rede, sinais. Diferente do <strong>DAC</strong> (permissões rwx + uid/gid) que é
        discricionário, o MAC é imposto pelo kernel <em>mesmo se o processo for root</em>. No
        Ubuntu o AppArmor vem ligado por padrão e protege serviços como CUPS, snapd, dhclient,
        evince, firefox (snap), nginx (opcional), apache, mysqld.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="aa-enabled" output={`Yes`} />
        <Command command="cat /sys/kernel/security/apparmor/profiles | head -10" output={`/usr/bin/man (enforce)
/usr/lib/snapd/snap-confine (enforce)
/usr/lib/snapd/snap-confine//mount-namespace-capture-helper (enforce)
/usr/sbin/cups-browsed (enforce)
/usr/sbin/cupsd (enforce)
man_filter (enforce)
man_groff (enforce)
nvidia_modprobe (enforce)
nvidia_modprobe//kmod (enforce)
snap.firefox.firefox (enforce)`} />
      </Terminal>

      <h2>1. Instalando as ferramentas e estrutura</h2>

      <Terminal title="root@ubuntu: ~">
        <Command root command="apt install -y apparmor apparmor-utils apparmor-profiles apparmor-profiles-extra" output={`Reading package lists... Done
The following NEW packages will be installed:
  apparmor-profiles apparmor-profiles-extra apparmor-utils python3-apparmor python3-libapparmor
0 upgraded, 5 newly installed, 0 to remove and 0 not upgraded.
Need to get 712 kB of archives.
Setting up apparmor-utils (4.0.1-0ubuntu0.24.04.3) ...
Setting up apparmor-profiles (4.0.1-0ubuntu0.24.04.3) ...`} />
        <Command root command="ls /etc/apparmor.d/" output={`abstractions/         tunables/
local/                usr.bin.evince
disable/              usr.bin.man
cups-browsed          usr.lib.snapd.snap-confine.real
nvidia_modprobe       usr.sbin.cupsd
sbin.dhclient         usr.sbin.dhclient
snap-update-ns.firefox usr.sbin.haveged
                      usr.sbin.tcpdump`} />
        <Command root command="ls /etc/apparmor.d/abstractions/ | head -8" output={`apache2-common
audio
authentication
base
bash
consoles
crypto
cups-client`} />
      </Terminal>

      <h2>2. aa-status — radiografia do sistema</h2>

      <Terminal title="root@ubuntu: ~">
        <Command root command="aa-status" output={`apparmor module is loaded.
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
0 processes are unconfined but have a profile defined.`} />
      </Terminal>

      <InfoBox type="info" title="Os modos de um perfil">
        <ul>
          <li><strong>enforce</strong> — viola o perfil = ação BLOQUEADA + log no auditd.</li>
          <li><strong>complain</strong> — viola o perfil = log apenas (não bloqueia). Modo de aprendizado/teste.</li>
          <li><strong>disable</strong> — perfil desativado, processo roda sem MAC.</li>
          <li><strong>kill</strong> (raro) — viola o perfil = SIGKILL no processo.</li>
        </ul>
      </InfoBox>

      <h2>3. Trocar modo de um perfil</h2>

      <Terminal title="root@ubuntu: ~">
        <Command root command="aa-complain /usr/sbin/nginx" output={`Setting /usr/sbin/nginx to complain mode.`} />
        <Command root command="aa-enforce /usr/sbin/nginx" output={`Setting /usr/sbin/nginx to enforce mode.`} />
        <Command root command="aa-disable /usr/sbin/mysqld" comment="Cria link em /etc/apparmor.d/disable/" output={`Disabling /usr/sbin/mysqld.`} />
        <Command root command="ls /etc/apparmor.d/disable/" output={`usr.sbin.mysqld`} />
        <Command root command="aa-enforce /etc/apparmor.d/usr.sbin.mysqld" comment="Reabilita removendo o link e aplicando" output={`Setting /etc/apparmor.d/usr.sbin.mysqld to enforce mode.`} />
      </Terminal>

      <h2>4. Anatomia de um perfil</h2>

      <File path="/etc/apparmor.d/usr.sbin.tcpdump">
{`# vim:syntax=apparmor
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
}`}
      </File>

      <p>
        <strong>Vocabulário do perfil:</strong> cada linha é uma regra. <code>r</code>=read,
        <code>w</code>=write, <code>x</code>=execute (com modificadores Px/Cx/Ux), <code>m</code>=mmap,
        <code>k</code>=lock, <code>l</code>=link. <code>@{`{HOME}`}</code> é uma <em>tunable</em>
        definida em <code>/etc/apparmor.d/tunables/</code>. <code>capability</code> controla as
        capabilities POSIX. <code>deny</code> tem prioridade sobre allow.
      </p>

      <h2>5. Recarregar perfis e diagnosticar</h2>

      <Terminal title="root@ubuntu: ~">
        <Command root command="apparmor_parser -r /etc/apparmor.d/usr.sbin.tcpdump" comment="-r recarrega; -a adiciona; -R remove" />
        <Command root command="systemctl reload apparmor" />
        <Command root command="dmesg | grep -i apparmor | tail -10" output={`[ 8423.221] audit: type=1400 audit(1731412821.221:43): apparmor="DENIED" operation="open" profile="/usr/sbin/tcpdump" name="/etc/shadow" pid=4421 comm="tcpdump" requested_mask="r" denied_mask="r" fsuid=0 ouid=0
[ 8425.912] audit: type=1400 audit(1731412825.912:44): apparmor="ALLOWED" operation="capable" profile="/usr/sbin/tcpdump" pid=4421 comm="tcpdump" capability=13 capname="net_raw"`} />
        <Command root command="journalctl -k | grep -i apparmor | tail -5" />
      </Terminal>

      <h2>6. Criando um perfil novo do zero — aa-genprof</h2>
      <p>
        Vamos confinar um script <code>/usr/local/bin/backup.sh</code> que faz backup. O fluxo:
        rodar <code>aa-genprof</code>, em outra aba executar o programa, voltar e responder
        Allow/Deny para cada acesso descoberto.
      </p>

      <Terminal title="root@ubuntu: ~">
        <Command root command="aa-genprof /usr/local/bin/backup.sh" output={`Updating AppArmor profiles in /etc/apparmor.d.
Writing updated profile for /usr/local/bin/backup.sh.
Setting /usr/local/bin/backup.sh to complain mode.

Before you begin, you may wish to check if a
profile already exists for the application you
wish to confine.

Please start the application to be profiled in
another window and exercise its functionality now.

Once completed, select the "Scan" option below in
order to scan the system logs for AppArmor events.

[(S)can system log for AppArmor events] / (F)inish`} />
        <Command root command="# em outra aba: bash /usr/local/bin/backup.sh" />
        <Command root command="# voltar e digitar S — aa-genprof mostrará cada acesso:" output={`Reading log entries from /var/log/syslog.

Profile:  /usr/local/bin/backup.sh
Path:     /etc/passwd
New Mode: r
Severity: 4

 [1 - #include <abstractions/nameservice>]
  2 - /etc/passwd r,
(A)llow / [(D)eny] / (I)gnore / (G)lob / Glob with (E)xtension / (N)ew / Audi(t) / (O)wner permissions / Abo(r)t / (F)inish`} />
        <Command root command="# escolha A para aprovar; depois F para terminar" />
      </Terminal>

      <h2>7. aa-logprof — refinar perfil já em uso</h2>
      <p>
        Quando um perfil em <em>complain</em> registra novas violações, <code>aa-logprof</code>
        lê os logs e propõe regras incrementais.
      </p>

      <Terminal title="root@ubuntu: ~">
        <Command root command="aa-logprof" output={`Reading log entries from /var/log/audit/audit.log.
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
Writing updated profile for /usr/sbin/mysqld.`} />
      </Terminal>

      <h2>8. Local override — sem mexer no perfil original</h2>
      <p>
        Atualizações de pacote sobrescrevem perfis em <code>/etc/apparmor.d/</code>. Para
        adicionar regras suas e sobreviver a upgrades, use <code>/etc/apparmor.d/local/</code>.
      </p>

      <File path="/etc/apparmor.d/local/usr.sbin.nginx">
{`# Regras locais aplicadas em cima do perfil principal de nginx
/srv/intranet/static/** r,
/var/lib/nginx/uploads/** rw,
deny /etc/passwd r,
deny /etc/shadow r,`}
      </File>

      <h2>9. AppArmor vs SELinux — escolha consciente</h2>

      <table>
        <thead>
          <tr><th>Aspecto</th><th>AppArmor (Ubuntu/SUSE)</th><th>SELinux (RHEL/Fedora)</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Modelo</strong></td><td>Path-based (caminhos)</td><td>Label-based (xattr nos inodes)</td></tr>
          <tr><td><strong>Aprendizado</strong></td><td>Suave — perfis em texto plano</td><td>Íngreme — políticas complexas</td></tr>
          <tr><td><strong>Granularidade</strong></td><td>Boa para apps individuais</td><td>Excelente em todo o sistema</td></tr>
          <tr><td><strong>Modo de teste</strong></td><td><code>complain</code></td><td><code>permissive</code></td></tr>
          <tr><td><strong>Ferramentas</strong></td><td>aa-status, aa-genprof, aa-logprof</td><td>sestatus, audit2allow, semanage, restorecon</td></tr>
          <tr><td><strong>Quando muda mount-point</strong></td><td>Perde proteção (paths mudaram)</td><td>Mantém (labels viajam com o inode)</td></tr>
          <tr><td><strong>Ubuntu padrão</strong></td><td>✅ ATIVO</td><td>❌ Não vem</td></tr>
        </tbody>
      </table>

      <InfoBox type="tip" title="Dica de produção">
        Em servidores Ubuntu mantenha AppArmor sempre ligado. Se um pacote está crashando por
        AppArmor, NUNCA o desabilite globalmente — coloque <em>esse perfil específico</em> em
        complain, abra o issue/audit, gere as regras necessárias e volte para enforce.
      </InfoBox>
    </PageContainer>
  );
}

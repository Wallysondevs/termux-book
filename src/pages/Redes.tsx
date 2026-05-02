import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Redes() {
  return (
    <PageContainer
      title="Fundamentos de Redes no Ubuntu"
      subtitle="Domine TCP/IP, IP/CIDR, MAC, ip, ifconfig, ping, traceroute, mtr, dig, ss, nmap, tcpdump e dezenas de outras ferramentas — com saídas reais de cada comando."
      difficulty="intermediario"
      timeToRead="45 min"
      category="Redes"
    >
      <p>
        Redes são o sistema circulatório do mundo digital. Entender como o Ubuntu
        enxerga, configura e diagnostica conexões é uma habilidade obrigatória
        para qualquer profissional de TI, desenvolvedor backend, SRE, devops
        ou administrador de sistemas. Esta página cobre desde os conceitos
        fundamentais (TCP/IP, OSI, máscaras, CIDR) até o uso prático e
        avançado das ferramentas modernas (<code>ip</code>, <code>ss</code>,{" "}
        <code>nmap</code>, <code>tcpdump</code>, <code>mtr</code>, <code>dig</code>).
      </p>

      <p>
        No Ubuntu 24.04 LTS, a stack <strong>iproute2</strong> substitui as
        ferramentas legadas (<code>ifconfig</code>, <code>route</code>,{" "}
        <code>netstat</code>, <code>arp</code>). Elas ainda estão disponíveis
        via pacote <code>net-tools</code>, mas o padrão moderno é{" "}
        <code>ip</code> e <code>ss</code>.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="ip -brief addr" output={`lo               UNKNOWN        127.0.0.1/8 ::1/128
enp3s0           UP             192.168.1.100/24 fe80::a00:27ff:fe4b:891c/64
wlp2s0           DOWN
docker0          DOWN           172.17.0.1/16`} />
        <Command command="ip route" output={`default via 192.168.1.1 dev enp3s0 proto dhcp src 192.168.1.100 metric 100
169.254.0.0/16 dev enp3s0 scope link metric 1000
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.100 metric 100`} />
      </Terminal>

      <h2>1. Modelos de Rede: OSI e TCP/IP</h2>

      <p>
        Antes de mexer com comandos, vale fixar a base teórica. As duas
        principais referências para entender comunicação em rede são o
        modelo <strong>OSI</strong> (7 camadas, mais didático) e o
        modelo <strong>TCP/IP</strong> (4 camadas, mais próximo da realidade).
      </p>

      <table>
        <thead>
          <tr>
            <th>Camada OSI</th>
            <th>Camada TCP/IP</th>
            <th>Protocolos típicos</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>7 — Aplicação</td><td rowSpan={3}>Aplicação</td><td>HTTP, HTTPS, SSH, FTP, DNS, SMTP</td><td>Mensagem</td></tr>
          <tr><td>6 — Apresentação</td><td>TLS, SSL, MIME</td><td>Mensagem</td></tr>
          <tr><td>5 — Sessão</td><td>NetBIOS, RPC</td><td>Mensagem</td></tr>
          <tr><td>4 — Transporte</td><td>Transporte</td><td>TCP, UDP, QUIC, SCTP</td><td>Segmento / Datagrama</td></tr>
          <tr><td>3 — Rede</td><td>Internet</td><td>IPv4, IPv6, ICMP, IPSec</td><td>Pacote</td></tr>
          <tr><td>2 — Enlace</td><td rowSpan={2}>Acesso à Rede</td><td>Ethernet, ARP, PPP, Wi-Fi (802.11)</td><td>Frame</td></tr>
          <tr><td>1 — Física</td><td>RJ45, fibra, rádio</td><td>Bit</td></tr>
        </tbody>
      </table>

      <InfoBox type="tip" title="Como memorizar">
        <strong>"Please Do Not Throw Sausage Pizza Away"</strong> — Physical,
        Data Link, Network, Transport, Session, Presentation, Application.
      </InfoBox>

      <h2>2. Endereçamento IPv4, Máscaras e CIDR</h2>

      <p>
        Um endereço IPv4 são <strong>32 bits</strong> divididos em 4 octetos
        (ex: <code>192.168.1.100</code>). A <strong>máscara de sub-rede</strong>
        define quais bits identificam a rede e quais identificam o host.
      </p>

      <table>
        <thead>
          <tr>
            <th>CIDR</th>
            <th>Máscara decimal</th>
            <th>Hosts utilizáveis</th>
            <th>Uso típico</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>/8</td><td>255.0.0.0</td><td>16.777.214</td><td>Backbone (10.0.0.0/8)</td></tr>
          <tr><td>/16</td><td>255.255.0.0</td><td>65.534</td><td>Empresa grande (172.16.0.0/12)</td></tr>
          <tr><td>/24</td><td>255.255.255.0</td><td>254</td><td>LAN doméstica (192.168.1.0/24)</td></tr>
          <tr><td>/29</td><td>255.255.255.248</td><td>6</td><td>Link ponto a ponto</td></tr>
          <tr><td>/30</td><td>255.255.255.252</td><td>2</td><td>WAN entre roteadores</td></tr>
          <tr><td>/32</td><td>255.255.255.255</td><td>1 (host único)</td><td>Loopback / firewall</td></tr>
        </tbody>
      </table>

      <p>
        Faixas <strong>privadas</strong> reservadas pela RFC 1918:
        <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>,
        <code>192.168.0.0/16</code>. Tudo que sai dessas faixas para a
        Internet passa por NAT.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="ipcalc 192.168.1.100/24" comment="Calculadora de subnet (apt install ipcalc)" output={`Address:   192.168.1.100        11000000.10101000.00000001. 01100100
Netmask:   255.255.255.0 = 24    11111111.11111111.11111111. 00000000
Wildcard:  0.0.0.255             00000000.00000000.00000000. 11111111
=>
Network:   192.168.1.0/24        11000000.10101000.00000001. 00000000
HostMin:   192.168.1.1           11000000.10101000.00000001. 00000001
HostMax:   192.168.1.254         11000000.10101000.00000001. 11111110
Broadcast: 192.168.1.255         11000000.10101000.00000001. 11111111
Hosts/Net: 254                   Class C, Private Internet`} />
      </Terminal>

      <h2>3. Endereço MAC</h2>

      <p>
        Cada interface de rede tem um endereço físico de <strong>48 bits</strong>{" "}
        (6 bytes em hexadecimal) gravado pela fabricante — o MAC. Os primeiros
        3 bytes (OUI) identificam o fabricante.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="ip link show enp3s0" output={`2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:4b:89:1c brd ff:ff:ff:ff:ff:ff
    altname enx08002748891c`} />
        <Command command="cat /sys/class/net/enp3s0/address" output="08:00:27:4b:89:1c" />
        <Command root command="ip link set enp3s0 address 02:11:22:33:44:55" comment="Trocar MAC (MAC spoofing)" />
      </Terminal>

      <h2>4. iproute2: o comando ip</h2>

      <p>
        O <code>ip</code> substitui <code>ifconfig</code>, <code>route</code> e{" "}
        <code>arp</code>. Sintaxe geral:{" "}
        <code>ip [opções] OBJETO COMANDO [argumentos]</code>. Os objetos mais
        usados são <code>addr</code>, <code>link</code>, <code>route</code>,{" "}
        <code>neigh</code>.
      </p>

      <h3>4.1 ip addr</h3>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="ip addr show" output={`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever
2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:4b:89:1c brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic noprefixroute enp3s0
       valid_lft 86234sec preferred_lft 86234sec
    inet6 fe80::a00:27ff:fe4b:891c/64 scope link noprefixroute
       valid_lft forever preferred_lft forever`} />
        <Command command="ip -4 addr show enp3s0" comment="Apenas IPv4 da interface" output={`2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic noprefixroute enp3s0
       valid_lft 86220sec preferred_lft 86220sec`} />
        <Command command="ip -brief -color addr" output={`lo               UNKNOWN        127.0.0.1/8 ::1/128
enp3s0           UP             192.168.1.100/24 fe80::a00:27ff:fe4b:891c/64
docker0          DOWN           172.17.0.1/16`} />
        <Command root command="ip addr add 192.168.1.200/24 dev enp3s0" comment="Adicionar IP secundário" />
        <Command root command="ip addr del 192.168.1.200/24 dev enp3s0" comment="Remover IP" />
      </Terminal>

      <h3>4.2 ip link</h3>

      <Terminal title="wallyson@ubuntu: ~">
        <Command root command="ip link set enp3s0 down" comment="Derrubar interface" />
        <Command root command="ip link set enp3s0 up" comment="Levantar interface" />
        <Command root command="ip link set enp3s0 mtu 9000" comment="Trocar MTU (jumbo frames)" />
        <Command command="ip -s link show enp3s0" comment="Estatísticas (RX/TX, erros, drops)" output={`2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:4b:89:1c brd ff:ff:ff:ff:ff:ff
    RX:  bytes  packets errors dropped  missed   mcast
     421983212   492321      0       0       0     201
    TX:  bytes  packets errors dropped carrier collsns
     112304921   201432      0       0       0       0`} />
      </Terminal>

      <h3>4.3 ip route</h3>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="ip route" output={`default via 192.168.1.1 dev enp3s0 proto dhcp src 192.168.1.100 metric 100
169.254.0.0/16 dev enp3s0 scope link metric 1000
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.100 metric 100`} />
        <Command command="ip route get 8.8.8.8" comment="Por qual rota um destino seria atingido" output="8.8.8.8 via 192.168.1.1 dev enp3s0 src 192.168.1.100 uid 1000" />
        <Command root command="ip route add 10.20.0.0/16 via 192.168.1.254 dev enp3s0" comment="Rota estática" />
        <Command root command="ip route del 10.20.0.0/16" comment="Remover rota" />
        <Command root command="ip route change default via 192.168.1.10" comment="Trocar gateway padrão" />
      </Terminal>

      <h3>4.4 ip neigh (tabela ARP)</h3>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="ip neigh" output={`192.168.1.1 dev enp3s0 lladdr ac:84:c6:32:71:8a REACHABLE
192.168.1.50 dev enp3s0 lladdr 00:1e:c9:a4:b2:3f STALE
192.168.1.75 dev enp3s0 lladdr 78:24:af:11:9c:08 DELAY
fe80::aece:c6ff:fe32:718a dev enp3s0 lladdr ac:84:c6:32:71:8a router REACHABLE`} />
        <Command root command="ip neigh flush all" comment="Limpar a cache ARP" />
      </Terminal>

      <h2>5. ifconfig e route (legacy)</h2>

      <p>
        As ferramentas legadas vêm no pacote <code>net-tools</code>. Continuam
        amplamente usadas em scripts antigos.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command root command="apt install -y net-tools" output={`The following NEW packages will be installed:
  net-tools
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 204 kB of archives.
Setting up net-tools (2.10-0.1ubuntu4) ...`} />
        <Command command="ifconfig enp3s0" output={`enp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4b:891c  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4b:89:1c  txqueuelen 1000  (Ethernet)
        RX packets 492421  bytes 421988212 (421.9 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 201498  bytes 112315012 (112.3 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0`} />
        <Command command="route -n" output={`Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 enp3s0
169.254.0.0     0.0.0.0         255.255.0.0     U     1000   0        0 enp3s0
192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 enp3s0`} />
      </Terminal>

      <h2>6. Diagnóstico: ping</h2>

      <p>
        O <code>ping</code> envia pacotes ICMP Echo Request. Mede
        conectividade, latência e perda de pacotes.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="ping -c 4 8.8.8.8" output={`PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.4 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=11.8 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=12.1 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=117 time=12.5 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 11.812/12.214/12.521/0.272 ms`} />
        <Command command="ping -c 3 -i 0.2 google.com" comment="Intervalo de 0.2s entre pacotes" output={`PING google.com (142.250.78.206) 56(84) bytes of data.
64 bytes from gru14s32-in-f14.1e100.net (142.250.78.206): icmp_seq=1 ttl=116 time=14.2 ms
64 bytes from gru14s32-in-f14.1e100.net (142.250.78.206): icmp_seq=2 ttl=116 time=13.8 ms
64 bytes from gru14s32-in-f14.1e100.net (142.250.78.206): icmp_seq=3 ttl=116 time=14.0 ms

--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 402ms
rtt min/avg/max/mdev = 13.812/14.002/14.215/0.165 ms`} />
        <Command command="ping -c 3 -W 2 -s 1472 -M do 192.168.1.1" comment="Pacote grande, sem fragmentar (testar MTU)" output={`PING 192.168.1.1 (192.168.1.1) 1472(1500) bytes of data.
1480 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.612 ms
1480 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.580 ms
1480 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.601 ms

--- 192.168.1.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2032ms`} />
        <Command root command="ping -f -c 1000 192.168.1.1" comment="Flood ping (apenas root) — stress test" output={`PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
.
--- 192.168.1.1 ping statistics ---
1000 packets transmitted, 1000 received, 0% packet loss, time 410ms
rtt min/avg/max/mdev = 0.180/0.392/0.612/0.042 ms, ipg/ewma 0.410/0.398 ms`} />
        <Command command="ping6 -c 2 ::1" output={`PING ::1(::1) 56 data bytes
64 bytes from ::1: icmp_seq=1 ttl=64 time=0.041 ms
64 bytes from ::1: icmp_seq=2 ttl=64 time=0.058 ms

--- ::1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1014ms`} />
      </Terminal>

      <table>
        <thead>
          <tr><th>Flag</th><th>Significado</th></tr>
        </thead>
        <tbody>
          <tr><td>-c N</td><td>Envia N pacotes e para</td></tr>
          <tr><td>-i sec</td><td>Intervalo entre pacotes (root pode &lt;0.2)</td></tr>
          <tr><td>-W sec</td><td>Timeout para resposta</td></tr>
          <tr><td>-s bytes</td><td>Tamanho do payload (default 56)</td></tr>
          <tr><td>-f</td><td>Flood ping (root)</td></tr>
          <tr><td>-M do|want|dont</td><td>Política de fragmentação</td></tr>
          <tr><td>-I iface</td><td>Sair por uma interface específica</td></tr>
          <tr><td>-n</td><td>Não resolver nomes</td></tr>
        </tbody>
      </table>

      <h2>7. traceroute e mtr</h2>

      <p>
        O <code>traceroute</code> mostra o caminho (hops) que um pacote percorre.
        O <code>mtr</code> combina <code>ping</code> + <code>traceroute</code>{" "}
        em uma interface ao vivo.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command root command="apt install -y traceroute mtr" />
        <Command command="traceroute -n 8.8.8.8" output={`traceroute to 8.8.8.8 (8.8.8.8), 30 hops max, 60 byte packets
 1  192.168.1.1  0.621 ms  0.598 ms  0.572 ms
 2  100.64.0.1   8.124 ms  8.012 ms  7.985 ms
 3  201.48.32.1  9.501 ms  9.412 ms  9.398 ms
 4  201.48.0.42  10.211 ms  10.198 ms  10.182 ms
 5  72.14.215.117  11.412 ms  11.385 ms  11.298 ms
 6  108.170.245.65  11.812 ms  11.745 ms  11.732 ms
 7  142.250.226.207  12.012 ms  11.985 ms  11.945 ms
 8  8.8.8.8      12.121 ms  12.085 ms  12.045 ms`} />
        <Command command="mtr -rwc 5 8.8.8.8" comment="Modo report, 5 ciclos" output={`Start: 2025-04-12T14:22:31-0300
HOST: ubuntu                       Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 192.168.1.1                 0.0%     5    0.6   0.6   0.5   0.7   0.1
  2.|-- 100.64.0.1                  0.0%     5    8.0   8.1   7.9   8.3   0.2
  3.|-- 201.48.32.1                 0.0%     5    9.4   9.4   9.3   9.5   0.1
  4.|-- 201.48.0.42                 0.0%     5   10.2  10.2  10.1  10.3   0.1
  5.|-- 72.14.215.117               0.0%     5   11.4  11.4  11.2  11.6   0.2
  6.|-- 108.170.245.65              0.0%     5   11.8  11.8  11.7  11.9   0.1
  7.|-- 142.250.226.207             0.0%     5   12.0  12.0  11.9  12.1   0.1
  8.|-- dns.google                  0.0%     5   12.1  12.1  12.0  12.2   0.1`} />
      </Terminal>

      <h2>8. DNS: dig, nslookup, host</h2>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="dig google.com" output={`; <<>> DiG 9.18.28-1ubuntu0.1-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 21834
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             212     IN      A       142.250.78.206

;; Query time: 12 msec
;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)
;; WHEN: Sat Apr 12 14:25:01 -03 2025
;; MSG SIZE  rcvd: 55`} />
        <Command command="dig +short google.com" output="142.250.78.206" />
        <Command command="dig +short MX gmail.com" output={`5 gmail-smtp-in.l.google.com.
10 alt1.gmail-smtp-in.l.google.com.
20 alt2.gmail-smtp-in.l.google.com.
30 alt3.gmail-smtp-in.l.google.com.
40 alt4.gmail-smtp-in.l.google.com.`} />
        <Command command="dig @1.1.1.1 +short ubuntu.com" comment="Consulta direta no Cloudflare DNS" output={`185.125.190.21
185.125.190.20`} />
        <Command command="dig +trace ubuntu.com" comment="Mostra a recursão completa do root até o autoritativo" output={`; <<>> DiG 9.18.28 <<>> +trace ubuntu.com
.                       509431  IN      NS      a.root-servers.net.
.                       509431  IN      NS      b.root-servers.net.
com.                    172800  IN      NS      a.gtld-servers.net.
ubuntu.com.             172800  IN      NS      ns1.canonical.com.
ubuntu.com.             600     IN      A       185.125.190.21
;; Received 58 bytes from 185.125.190.4#53(ns1.canonical.com) in 95 ms`} />
        <Command command="nslookup duckduckgo.com" output={`Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
Name:   duckduckgo.com
Address: 40.89.244.232`} />
        <Command command="host -a archlinux.org" output={`Trying "archlinux.org"
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 9821
;; ANSWER SECTION:
archlinux.org.          3600 IN A     95.217.163.246
archlinux.org.          3600 IN AAAA  2a01:4f9:c010:6b1e::1
archlinux.org.          3600 IN MX    10 mail.archlinux.org.
archlinux.org.          3600 IN NS    ns1.archlinux.org.
archlinux.org.          3600 IN TXT   "v=spf1 mx -all"`} />
      </Terminal>

      <h2>9. whois</h2>

      <Terminal title="wallyson@ubuntu: ~">
        <Command root command="apt install -y whois" />
        <Command command="whois canonical.com" output={`   Domain Name: CANONICAL.COM
   Registry Domain ID: 9582718_DOMAIN_COM-VRSN
   Registrar: MarkMonitor Inc.
   Registrar URL: http://www.markmonitor.com
   Updated Date: 2024-08-11T09:14:22Z
   Creation Date: 2002-05-16T19:51:00Z
   Registry Expiry Date: 2030-05-16T19:51:00Z
   Name Server: NS1.CANONICAL.COM
   Name Server: NS2.CANONICAL.COM
   DNSSEC: signedDelegation`} />
      </Terminal>

      <h2>10. ss e netstat (sockets/conexões)</h2>

      <p>
        O <code>ss</code> (socket statistics) é o substituto moderno e muito
        mais rápido do <code>netstat</code>.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command root command="ss -tulnp" comment="TCP+UDP, listen, numérico, com PID" output={`Netid State  Recv-Q Send-Q  Local Address:Port  Peer Address:Port  Process
udp   UNCONN 0      0       127.0.0.54:53        0.0.0.0:*          users:(("systemd-resolve",pid=801,fd=18))
udp   UNCONN 0      0       127.0.0.53%lo:53     0.0.0.0:*          users:(("systemd-resolve",pid=801,fd=14))
tcp   LISTEN 0      4096    127.0.0.54:53        0.0.0.0:*          users:(("systemd-resolve",pid=801,fd=19))
tcp   LISTEN 0      128     0.0.0.0:22           0.0.0.0:*          users:(("sshd",pid=1124,fd=3))
tcp   LISTEN 0      511     0.0.0.0:80           0.0.0.0:*          users:(("nginx",pid=2048,fd=6))
tcp   LISTEN 0      4096    [::1]:631            [::]:*             users:(("cupsd",pid=998,fd=7))
tcp   LISTEN 0      128     [::]:22              [::]:*             users:(("sshd",pid=1124,fd=4))`} />
        <Command command="ss -s" comment="Resumo geral" output={`Total: 412
TCP:   38 (estab 14, closed 18, orphaned 0, timewait 18)

Transport Total     IP        IPv6
RAW       1         0         1
UDP       12        9         3
TCP       20        14        6
INET      33        23        10
FRAG      0         0         0`} />
        <Command command="ss -tn state established '( dport = :443 or sport = :443 )'" output={`Recv-Q Send-Q Local Address:Port Peer Address:Port  Process
0      0      192.168.1.100:48222 142.250.78.206:443
0      0      192.168.1.100:48238 140.82.121.4:443
0      0      192.168.1.100:48244 185.125.190.21:443`} />
        <Command command="netstat -tulnp" comment="Versão legacy (net-tools)" output={`Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1124/sshd: /usr/sbi
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      2048/nginx: master
tcp6       0      0 :::22                   :::*                    LISTEN      1124/sshd: /usr/sbi
udp        0      0 127.0.0.53:53           0.0.0.0:*                           801/systemd-resolve`} />
      </Terminal>

      <h2>11. nc (netcat) — o canivete suíço de redes</h2>

      <Terminal title="wallyson@ubuntu: ~">
        <Command command="nc -zv 192.168.1.1 22" comment="Testar se a porta TCP está aberta" output={`Connection to 192.168.1.1 22 port [tcp/ssh] succeeded!`} />
        <Command command="nc -zv -u 192.168.1.1 53" comment="Testar UDP" output={`Connection to 192.168.1.1 53 port [udp/domain] succeeded!`} />
        <Command command="nc -lvnp 9000" comment="Servidor TCP na porta 9000" output={`Listening on 0.0.0.0 9000`} />
        <Command command='echo "ola servidor" | nc 192.168.1.50 9000' comment="Cliente envia uma mensagem" />
        <Command command="nc -lvnp 8000 > recebido.tar.gz" comment="Receber arquivo via netcat" />
        <Command command="cat backup.tar.gz | nc -N 192.168.1.50 8000" comment="Enviar arquivo (do outro lado)" />
      </Terminal>

      <h2>12. nmap — descoberta e varredura</h2>

      <InfoBox type="warning" title="Use com responsabilidade">
        Escanear redes ou hosts sem autorização é crime em vários países
        (incluindo o Brasil, art. 154-A do Código Penal). Use apenas em sua
        própria infraestrutura ou em ambientes de teste autorizados.
      </InfoBox>

      <Terminal title="wallyson@ubuntu: ~">
        <Command root command="apt install -y nmap" />
        <Command command="nmap -sn 192.168.1.0/24" comment="Ping sweep — quem está vivo na LAN" output={`Starting Nmap 7.94 ( https://nmap.org ) at 2025-04-12 14:30 -03
Nmap scan report for 192.168.1.1
Host is up (0.00041s latency).
Nmap scan report for 192.168.1.50
Host is up (0.00082s latency).
Nmap scan report for 192.168.1.75
Host is up (0.0011s latency).
Nmap scan report for 192.168.1.100
Host is up (0.000091s latency).
Nmap done: 256 IP addresses (4 hosts up) scanned in 2.42 seconds`} />
        <Command root command="nmap -sS -p 1-1000 192.168.1.50" comment="SYN scan (stealth) nas 1000 portas comuns" output={`Starting Nmap 7.94 ( https://nmap.org ) at 2025-04-12 14:31 -03
Nmap scan report for 192.168.1.50
Host is up (0.00091s latency).
Not shown: 996 closed tcp ports (reset)
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https
631/tcp open  ipp
MAC Address: 00:1E:C9:A4:B2:3F (Dell)

Nmap done: 1 IP address (1 host up) scanned in 4.12 seconds`} />
        <Command root command="nmap -sV -O 192.168.1.50" comment="Detectar versões + OS fingerprint" output={`PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 9.6p1 Ubuntu 3ubuntu13.5 (Ubuntu Linux; protocol 2.0)
80/tcp  open  http     nginx 1.24.0 (Ubuntu)
443/tcp open  ssl/http nginx 1.24.0 (Ubuntu)
631/tcp open  ipp      CUPS 2.4

Device type: general purpose
Running: Linux 5.X|6.X
OS CPE: cpe:/o:linux:linux_kernel:5 cpe:/o:linux:linux_kernel:6
OS details: Linux 5.4 - 6.5
Network Distance: 1 hop`} />
        <Command command="nmap --script vuln -p 80,443 example.com" comment="Scripts NSE de vulnerabilidade" />
      </Terminal>

      <table>
        <thead><tr><th>Flag</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td>-sP / -sn</td><td>Apenas descoberta (ping sweep)</td></tr>
          <tr><td>-sS</td><td>SYN scan (stealth, requer root)</td></tr>
          <tr><td>-sT</td><td>TCP connect scan (sem root)</td></tr>
          <tr><td>-sU</td><td>UDP scan</td></tr>
          <tr><td>-sV</td><td>Detecção de versão dos serviços</td></tr>
          <tr><td>-O</td><td>OS fingerprint</td></tr>
          <tr><td>-p</td><td>Portas (ex: -p 22,80,443 ou -p-)</td></tr>
          <tr><td>-A</td><td>Agressivo (-O + -sV + scripts + traceroute)</td></tr>
          <tr><td>-T0..T5</td><td>Timing (paranoico → insano)</td></tr>
          <tr><td>--script</td><td>Roda scripts NSE</td></tr>
        </tbody>
      </table>

      <h2>13. tcpdump — captura de pacotes</h2>

      <Terminal title="wallyson@ubuntu: ~">
        <Command root command="apt install -y tcpdump" />
        <Command root command="tcpdump -i enp3s0 -n -c 5" comment="Capturar 5 pacotes na interface" output={`tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on enp3s0, link-type EN10MB (Ethernet), snapshot length 262144 bytes
14:35:02.124581 IP 192.168.1.100.48222 > 142.250.78.206.443: Flags [P.], seq 12:312, ack 5891, win 501, length 300
14:35:02.137412 IP 142.250.78.206.443 > 192.168.1.100.48222: Flags [.], ack 312, win 297, length 0
14:35:02.198512 IP 192.168.1.100.48244 > 185.125.190.21.443: Flags [P.], seq 1:892, ack 1, win 501, length 891
14:35:02.215912 IP 185.125.190.21.443 > 192.168.1.100.48244: Flags [.], ack 892, win 501, length 0
14:35:02.301281 IP 192.168.1.1.53 > 192.168.1.100.42118: 21834 1/0/1 A 142.250.78.206 (55)
5 packets captured
12 packets received by filter
0 packets dropped by kernel`} />
        <Command root command="tcpdump -i any 'port 53' -nnv" comment="Tráfego DNS em qualquer interface" output={`14:36:11.421891 IP (tos 0x0, ttl 64, id 41212, offset 0, flags [DF], proto UDP (17), length 60)
    192.168.1.100.42118 > 192.168.1.1.53: 21834+ A? google.com. (28)
14:36:11.434201 IP (tos 0x0, ttl 63, id 41212, offset 0, flags [DF], proto UDP (17), length 76)
    192.168.1.1.53 > 192.168.1.100.42118: 21834 1/0/0 A 142.250.78.206 (44)`} />
        <Command root command="tcpdump -i enp3s0 -w captura.pcap" comment="Salvar tráfego para abrir no Wireshark" output={`tcpdump: listening on enp3s0, link-type EN10MB (Ethernet)
^C
1284 packets captured
1284 packets received by filter
0 packets dropped by kernel`} />
        <Command root command="tcpdump -r captura.pcap 'host 8.8.8.8'" comment="Ler captura com filtro" />
      </Terminal>

      <table>
        <thead><tr><th>Filtro</th><th>O que captura</th></tr></thead>
        <tbody>
          <tr><td>host 1.2.3.4</td><td>Origem ou destino == IP</td></tr>
          <tr><td>src/dst host X</td><td>Apenas origem ou destino</td></tr>
          <tr><td>port 22</td><td>Pacotes na porta 22</td></tr>
          <tr><td>tcp[13] &amp; 2 != 0</td><td>Pacotes com flag SYN</td></tr>
          <tr><td>net 192.168.1.0/24</td><td>Tráfego dentro da subnet</td></tr>
          <tr><td>'icmp or arp'</td><td>Composição de filtros</td></tr>
        </tbody>
      </table>

      <h2>14. iperf3 — medindo throughput</h2>

      <Terminal title="wallyson@ubuntu: ~">
        <Command root command="apt install -y iperf3" />
        <Command command="iperf3 -s" comment="Servidor (na máquina A)" output={`-----------------------------------------------------------
Server listening on 5201 (test #1)
-----------------------------------------------------------`} />
        <Command command="iperf3 -c 192.168.1.50 -t 10" comment="Cliente (na máquina B), 10 s" output={`Connecting to host 192.168.1.50, port 5201
[  5] local 192.168.1.100 port 48512 connected to 192.168.1.50 port 5201
[ ID] Interval         Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00 sec  113 MBytes   948 Mbits/sec    0    412 KBytes
[  5]   1.00-2.00 sec  112 MBytes   941 Mbits/sec    0    412 KBytes
[  5]   2.00-3.00 sec  113 MBytes   946 Mbits/sec    0    412 KBytes
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval         Transfer     Bitrate         Retr
[  5]   0.00-10.00 sec 1.10 GBytes  944 Mbits/sec    0       sender
[  5]   0.00-10.00 sec 1.10 GBytes  942 Mbits/sec            receiver

iperf Done.`} />
      </Terminal>

      <h2>15. /etc/hosts e resolução local</h2>

      <File path="/etc/hosts">
{`127.0.0.1       localhost
127.0.1.1       ubuntu
192.168.1.50    nas.local nas
192.168.1.75    impressora.local

# IPv6
::1             localhost ip6-localhost ip6-loopback
ff02::1         ip6-allnodes
ff02::2         ip6-allrouters`}
      </File>

      <p>
        A ordem de resolução é definida em <code>/etc/nsswitch.conf</code>:
      </p>

      <File path="/etc/nsswitch.conf (trecho)">
{`hosts:          files mdns4_minimal [NOTFOUND=return] dns mymachines`}
      </File>

      <h2>16. Erros comuns e troubleshooting</h2>

      <InfoBox type="danger" title="Sem internet, mas a interface está UP">
        Verifique nesta ordem: <br />
        1. <code>ip addr</code> — tem IP atribuído? <br />
        2. <code>ip route</code> — existe rota default? <br />
        3. <code>ping &lt;gateway&gt;</code> — alcança o roteador? <br />
        4. <code>ping 8.8.8.8</code> — alcança a Internet? <br />
        5. <code>ping google.com</code> — DNS funciona? <br />
        Se 1-4 OK e 5 falhar → problema no DNS (veja a página{" "}
        <strong>DNS no Ubuntu</strong>).
      </InfoBox>

      <InfoBox type="tip" title="Comandos úteis para o dia-a-dia">
        <ul>
          <li><code>ip -c -br a</code> — visão colorida e curta das interfaces</li>
          <li><code>ss -tnp '( sport = :443 )'</code> — quem está na 443</li>
          <li><code>watch -n1 'ss -s'</code> — sockets em tempo real</li>
          <li><code>resolvectl query example.com</code> — DNS via systemd-resolved</li>
          <li><code>nmcli device status</code> — visão pelo NetworkManager</li>
        </ul>
      </InfoBox>

      <p>
        Domine <code>ip</code>, <code>ss</code>, <code>dig</code>,{" "}
        <code>tcpdump</code> e <code>nmap</code> e você resolve 95% dos
        problemas de rede no Ubuntu.
      </p>
    </PageContainer>
  );
}

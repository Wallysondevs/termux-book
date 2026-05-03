import{j as e}from"./index-BGu3owFd.js";import{P as n,I as r}from"./InfoBox-cbYNoYJG.js";import{T as t,C as s,F as o}from"./Terminal-DeUhEdrB.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function m(){return e.jsxs(n,{title:"Fundamentos de Redes no Termux",subtitle:"Domine TCP/IP, IP/CIDR, MAC, ip, ifconfig, ping, traceroute, mtr, dig, ss, nmap, tcpdump e dezenas de outras ferramentas — com saídas reais de cada comando.",difficulty:"intermediario",timeToRead:"45 min",category:"Redes",children:[e.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ip"})," "," — "," ","config."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ss"})," "," — "," ","sockets."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ping"})," "," — "," ","teste."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"traceroute"})," "," — "," ","rota."]})]}),e.jsxs("p",{children:["Redes são o sistema circulatório do mundo digital. Entender como o Termux enxerga, configura e diagnostica conexões é uma habilidade obrigatória para qualquer profissional de TI, desenvolvedor backend, SRE, devops ou administrador de sistemas. Esta página cobre desde os conceitos fundamentais (TCP/IP, OSI, máscaras, CIDR) até o uso prático e avançado das ferramentas modernas (",e.jsx("code",{children:"ip"}),", ",e.jsx("code",{children:"ss"}),","," ",e.jsx("code",{children:"nmap"}),", ",e.jsx("code",{children:"tcpdump"}),", ",e.jsx("code",{children:"mtr"}),", ",e.jsx("code",{children:"dig"}),")."]}),e.jsxs("p",{children:["No Termux 0.118, a stack ",e.jsx("strong",{children:"iproute2"})," substitui as ferramentas legadas (",e.jsx("code",{children:"ifconfig"}),", ",e.jsx("code",{children:"route"}),","," ",e.jsx("code",{children:"netstat"}),", ",e.jsx("code",{children:"arp"}),"). Elas ainda estão disponíveis via pacote ",e.jsx("code",{children:"net-tools"}),", mas o padrão moderno é"," ",e.jsx("code",{children:"ip"})," e ",e.jsx("code",{children:"ss"}),"."]}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{command:"ip -brief addr",output:`lo               UNKNOWN        127.0.0.1/8 ::1/128
enp3s0           UP             192.168.1.100/24 fe80::a00:27ff:fe4b:891c/64
wlp2s0           DOWN
docker0          DOWN           172.17.0.1/16`}),e.jsx(s,{command:"ip route",output:`default via 192.168.1.1 dev enp3s0 proto dhcp src 192.168.1.100 metric 100
169.254.0.0/16 dev enp3s0 scope link metric 1000
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.100 metric 100`})]}),e.jsx("h2",{children:"1. Modelos de Rede: OSI e TCP/IP"}),e.jsxs("p",{children:["Antes de mexer com comandos, vale fixar a base teórica. As duas principais referências para entender comunicação em rede são o modelo ",e.jsx("strong",{children:"OSI"})," (7 camadas, mais didático) e o modelo ",e.jsx("strong",{children:"TCP/IP"})," (4 camadas, mais próximo da realidade)."]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Camada OSI"}),e.jsx("th",{children:"Camada TCP/IP"}),e.jsx("th",{children:"Protocolos típicos"}),e.jsx("th",{children:"Unidade"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"7 — Aplicação"}),e.jsx("td",{rowSpan:3,children:"Aplicação"}),e.jsx("td",{children:"HTTP, HTTPS, SSH, FTP, DNS, SMTP"}),e.jsx("td",{children:"Mensagem"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"6 — Apresentação"}),e.jsx("td",{children:"TLS, SSL, MIME"}),e.jsx("td",{children:"Mensagem"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"5 — Sessão"}),e.jsx("td",{children:"NetBIOS, RPC"}),e.jsx("td",{children:"Mensagem"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"4 — Transporte"}),e.jsx("td",{children:"Transporte"}),e.jsx("td",{children:"TCP, UDP, QUIC, SCTP"}),e.jsx("td",{children:"Segmento / Datagrama"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"3 — Rede"}),e.jsx("td",{children:"Internet"}),e.jsx("td",{children:"IPv4, IPv6, ICMP, IPSec"}),e.jsx("td",{children:"Pacote"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"2 — Enlace"}),e.jsx("td",{rowSpan:2,children:"Acesso à Rede"}),e.jsx("td",{children:"Ethernet, ARP, PPP, Wi-Fi (802.11)"}),e.jsx("td",{children:"Frame"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"1 — Física"}),e.jsx("td",{children:"RJ45, fibra, rádio"}),e.jsx("td",{children:"Bit"})]})]})]}),e.jsxs(r,{type:"tip",title:"Como memorizar",children:[e.jsx("strong",{children:'"Please Do Not Throw Sausage Pizza Away"'})," — Physical, Data Link, Network, Transport, Session, Presentation, Application."]}),e.jsx("h2",{children:"2. Endereçamento IPv4, Máscaras e CIDR"}),e.jsxs("p",{children:["Um endereço IPv4 são ",e.jsx("strong",{children:"32 bits"})," divididos em 4 octetos (ex: ",e.jsx("code",{children:"192.168.1.100"}),"). A ",e.jsx("strong",{children:"máscara de sub-rede"}),"define quais bits identificam a rede e quais identificam o host."]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"CIDR"}),e.jsx("th",{children:"Máscara decimal"}),e.jsx("th",{children:"Hosts utilizáveis"}),e.jsx("th",{children:"Uso típico"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"/8"}),e.jsx("td",{children:"255.0.0.0"}),e.jsx("td",{children:"16.777.214"}),e.jsx("td",{children:"Backbone (10.0.0.0/8)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"/16"}),e.jsx("td",{children:"255.255.0.0"}),e.jsx("td",{children:"65.534"}),e.jsx("td",{children:"Empresa grande (172.16.0.0/12)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"/24"}),e.jsx("td",{children:"255.255.255.0"}),e.jsx("td",{children:"254"}),e.jsx("td",{children:"LAN doméstica (192.168.1.0/24)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"/29"}),e.jsx("td",{children:"255.255.255.248"}),e.jsx("td",{children:"6"}),e.jsx("td",{children:"Link ponto a ponto"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"/30"}),e.jsx("td",{children:"255.255.255.252"}),e.jsx("td",{children:"2"}),e.jsx("td",{children:"WAN entre roteadores"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"/32"}),e.jsx("td",{children:"255.255.255.255"}),e.jsx("td",{children:"1 (host único)"}),e.jsx("td",{children:"Loopback / firewall"})]})]})]}),e.jsxs("p",{children:["Faixas ",e.jsx("strong",{children:"privadas"})," reservadas pela RFC 1918:",e.jsx("code",{children:"10.0.0.0/8"}),", ",e.jsx("code",{children:"172.16.0.0/12"}),",",e.jsx("code",{children:"192.168.0.0/16"}),". Tudo que sai dessas faixas para a Internet passa por NAT."]}),e.jsx(t,{title:"wallyson@termux: ~",children:e.jsx(s,{command:"ipcalc 192.168.1.100/24",comment:"Calculadora de subnet (pkg install ipcalc)",output:`Address:   192.168.1.100        11000000.10101000.00000001. 01100100
Netmask:   255.255.255.0 = 24    11111111.11111111.11111111. 00000000
Wildcard:  0.0.0.255             00000000.00000000.00000000. 11111111
=>
Network:   192.168.1.0/24        11000000.10101000.00000001. 00000000
HostMin:   192.168.1.1           11000000.10101000.00000001. 00000001
HostMax:   192.168.1.254         11000000.10101000.00000001. 11111110
Broadcast: 192.168.1.255         11000000.10101000.00000001. 11111111
Hosts/Net: 254                   Class C, Private Internet`})}),e.jsx("h2",{children:"3. Endereço MAC"}),e.jsxs("p",{children:["Cada interface de rede tem um endereço físico de ",e.jsx("strong",{children:"48 bits"})," ","(6 bytes em hexadecimal) gravado pela fabricante — o MAC. Os primeiros 3 bytes (OUI) identificam o fabricante."]}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{command:"ip link show enp3s0",output:`2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:4b:89:1c brd ff:ff:ff:ff:ff:ff
    altname enx08002748891c`}),e.jsx(s,{command:"cat /sys/class/net/enp3s0/address",output:"08:00:27:4b:89:1c"}),e.jsx(s,{root:!0,command:"ip link set enp3s0 address 02:11:22:33:44:55",comment:"Trocar MAC (MAC spoofing)"})]}),e.jsx("h2",{children:"4. iproute2: o comando ip"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"ip"})," substitui ",e.jsx("code",{children:"ifconfig"}),", ",e.jsx("code",{children:"route"})," e"," ",e.jsx("code",{children:"arp"}),". Sintaxe geral:"," ",e.jsx("code",{children:"ip [opções] OBJETO COMANDO [argumentos]"}),". Os objetos mais usados são ",e.jsx("code",{children:"addr"}),", ",e.jsx("code",{children:"link"}),", ",e.jsx("code",{children:"route"}),","," ",e.jsx("code",{children:"neigh"}),"."]}),e.jsx("h3",{children:"4.1 ip addr"}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{command:"ip addr show",output:`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
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
       valid_lft forever preferred_lft forever`}),e.jsx(s,{command:"ip -4 addr show enp3s0",comment:"Apenas IPv4 da interface",output:`2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic noprefixroute enp3s0
       valid_lft 86220sec preferred_lft 86220sec`}),e.jsx(s,{command:"ip -brief -color addr",output:`lo               UNKNOWN        127.0.0.1/8 ::1/128
enp3s0           UP             192.168.1.100/24 fe80::a00:27ff:fe4b:891c/64
docker0          DOWN           172.17.0.1/16`}),e.jsx(s,{root:!0,command:"ip addr add 192.168.1.200/24 dev enp3s0",comment:"Adicionar IP secundário"}),e.jsx(s,{root:!0,command:"ip addr del 192.168.1.200/24 dev enp3s0",comment:"Remover IP"})]}),e.jsx("h3",{children:"4.2 ip link"}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{root:!0,command:"ip link set enp3s0 down",comment:"Derrubar interface"}),e.jsx(s,{root:!0,command:"ip link set enp3s0 up",comment:"Levantar interface"}),e.jsx(s,{root:!0,command:"ip link set enp3s0 mtu 9000",comment:"Trocar MTU (jumbo frames)"}),e.jsx(s,{command:"ip -s link show enp3s0",comment:"Estatísticas (RX/TX, erros, drops)",output:`2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:4b:89:1c brd ff:ff:ff:ff:ff:ff
    RX:  bytes  packets errors dropped  missed   mcast
     421983212   492321      0       0       0     201
    TX:  bytes  packets errors dropped carrier collsns
     112304921   201432      0       0       0       0`})]}),e.jsx("h3",{children:"4.3 ip route"}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{command:"ip route",output:`default via 192.168.1.1 dev enp3s0 proto dhcp src 192.168.1.100 metric 100
169.254.0.0/16 dev enp3s0 scope link metric 1000
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.100 metric 100`}),e.jsx(s,{command:"ip route get 8.8.8.8",comment:"Por qual rota um destino seria atingido",output:"8.8.8.8 via 192.168.1.1 dev enp3s0 src 192.168.1.100 uid 1000"}),e.jsx(s,{root:!0,command:"ip route add 10.20.0.0/16 via 192.168.1.254 dev enp3s0",comment:"Rota estática"}),e.jsx(s,{root:!0,command:"ip route del 10.20.0.0/16",comment:"Remover rota"}),e.jsx(s,{root:!0,command:"ip route change default via 192.168.1.10",comment:"Trocar gateway padrão"})]}),e.jsx("h3",{children:"4.4 ip neigh (tabela ARP)"}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{command:"ip neigh",output:`192.168.1.1 dev enp3s0 lladdr ac:84:c6:32:71:8a REACHABLE
192.168.1.50 dev enp3s0 lladdr 00:1e:c9:a4:b2:3f STALE
192.168.1.75 dev enp3s0 lladdr 78:24:af:11:9c:08 DELAY
fe80::aece:c6ff:fe32:718a dev enp3s0 lladdr ac:84:c6:32:71:8a router REACHABLE`}),e.jsx(s,{root:!0,command:"ip neigh flush all",comment:"Limpar a cache ARP"})]}),e.jsx("h2",{children:"5. ifconfig e route (legacy)"}),e.jsxs("p",{children:["As ferramentas legadas vêm no pacote ",e.jsx("code",{children:"net-tools"}),". Continuam amplamente usadas em scripts antigos."]}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{root:!0,command:"pkg install -y net-tools",output:`The following NEW packages will be installed:
  net-tools
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 204 kB of archives.
Setting up net-tools (2.10-0.termux) ...`}),e.jsx(s,{command:"ifconfig enp3s0",output:`enp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4b:891c  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4b:89:1c  txqueuelen 1000  (Ethernet)
        RX packets 492421  bytes 421988212 (421.9 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 201498  bytes 112315012 (112.3 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0`}),e.jsx(s,{command:"route -n",output:`Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 enp3s0
169.254.0.0     0.0.0.0         255.255.0.0     U     1000   0        0 enp3s0
192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 enp3s0`})]}),e.jsx("h2",{children:"6. Diagnóstico: ping"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"ping"})," envia pacotes ICMP Echo Request. Mede conectividade, latência e perda de pacotes."]}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{command:"ping -c 4 8.8.8.8",output:`PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.4 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=11.8 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=12.1 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=117 time=12.5 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 11.812/12.214/12.521/0.272 ms`}),e.jsx(s,{command:"ping -c 3 -i 0.2 google.com",comment:"Intervalo de 0.2s entre pacotes",output:`PING google.com (142.250.78.206) 56(84) bytes of data.
64 bytes from gru14s32-in-f14.1e100.net (142.250.78.206): icmp_seq=1 ttl=116 time=14.2 ms
64 bytes from gru14s32-in-f14.1e100.net (142.250.78.206): icmp_seq=2 ttl=116 time=13.8 ms
64 bytes from gru14s32-in-f14.1e100.net (142.250.78.206): icmp_seq=3 ttl=116 time=14.0 ms

--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 402ms
rtt min/avg/max/mdev = 13.812/14.002/14.215/0.165 ms`}),e.jsx(s,{command:"ping -c 3 -W 2 -s 1472 -M do 192.168.1.1",comment:"Pacote grande, sem fragmentar (testar MTU)",output:`PING 192.168.1.1 (192.168.1.1) 1472(1500) bytes of data.
1480 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.612 ms
1480 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.580 ms
1480 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.601 ms

--- 192.168.1.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2032ms`}),e.jsx(s,{root:!0,command:"ping -f -c 1000 192.168.1.1",comment:"Flood ping (apenas root) — stress test",output:`PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
.
--- 192.168.1.1 ping statistics ---
1000 packets transmitted, 1000 received, 0% packet loss, time 410ms
rtt min/avg/max/mdev = 0.180/0.392/0.612/0.042 ms, ipg/ewma 0.410/0.398 ms`}),e.jsx(s,{command:"ping6 -c 2 ::1",output:`PING ::1(::1) 56 data bytes
64 bytes from ::1: icmp_seq=1 ttl=64 time=0.041 ms
64 bytes from ::1: icmp_seq=2 ttl=64 time=0.058 ms

--- ::1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1014ms`})]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Flag"}),e.jsx("th",{children:"Significado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"-c N"}),e.jsx("td",{children:"Envia N pacotes e para"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-i sec"}),e.jsx("td",{children:"Intervalo entre pacotes (root pode <0.2)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-W sec"}),e.jsx("td",{children:"Timeout para resposta"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-s bytes"}),e.jsx("td",{children:"Tamanho do payload (default 56)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-f"}),e.jsx("td",{children:"Flood ping (root)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-M do|want|dont"}),e.jsx("td",{children:"Política de fragmentação"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-I iface"}),e.jsx("td",{children:"Sair por uma interface específica"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-n"}),e.jsx("td",{children:"Não resolver nomes"})]})]})]}),e.jsx("h2",{children:"7. traceroute e mtr"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"traceroute"})," mostra o caminho (hops) que um pacote percorre. O ",e.jsx("code",{children:"mtr"})," combina ",e.jsx("code",{children:"ping"})," + ",e.jsx("code",{children:"traceroute"})," ","em uma interface ao vivo."]}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{root:!0,command:"pkg install -y traceroute mtr"}),e.jsx(s,{command:"traceroute -n 8.8.8.8",output:`traceroute to 8.8.8.8 (8.8.8.8), 30 hops max, 60 byte packets
 1  192.168.1.1  0.621 ms  0.598 ms  0.572 ms
 2  100.64.0.1   8.124 ms  8.012 ms  7.985 ms
 3  201.48.32.1  9.501 ms  9.412 ms  9.398 ms
 4  201.48.0.42  10.211 ms  10.198 ms  10.182 ms
 5  72.14.215.117  11.412 ms  11.385 ms  11.298 ms
 6  108.170.245.65  11.812 ms  11.745 ms  11.732 ms
 7  142.250.226.207  12.012 ms  11.985 ms  11.945 ms
 8  8.8.8.8      12.121 ms  12.085 ms  12.045 ms`}),e.jsx(s,{command:"mtr -rwc 5 8.8.8.8",comment:"Modo report, 5 ciclos",output:`Start: 2025-04-12T14:22:31-0300
HOST: termux                       Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 192.168.1.1                 0.0%     5    0.6   0.6   0.5   0.7   0.1
  2.|-- 100.64.0.1                  0.0%     5    8.0   8.1   7.9   8.3   0.2
  3.|-- 201.48.32.1                 0.0%     5    9.4   9.4   9.3   9.5   0.1
  4.|-- 201.48.0.42                 0.0%     5   10.2  10.2  10.1  10.3   0.1
  5.|-- 72.14.215.117               0.0%     5   11.4  11.4  11.2  11.6   0.2
  6.|-- 108.170.245.65              0.0%     5   11.8  11.8  11.7  11.9   0.1
  7.|-- 142.250.226.207             0.0%     5   12.0  12.0  11.9  12.1   0.1
  8.|-- dns.google                  0.0%     5   12.1  12.1  12.0  12.2   0.1`})]}),e.jsx("h2",{children:"8. DNS: dig, nslookup, host"}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{command:"dig google.com",output:`; <<>> DiG 9.18.28-termux.1-Termux <<>> google.com
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
;; MSG SIZE  rcvd: 55`}),e.jsx(s,{command:"dig +short google.com",output:"142.250.78.206"}),e.jsx(s,{command:"dig +short MX gmail.com",output:`5 gmail-smtp-in.l.google.com.
10 alt1.gmail-smtp-in.l.google.com.
20 alt2.gmail-smtp-in.l.google.com.
30 alt3.gmail-smtp-in.l.google.com.
40 alt4.gmail-smtp-in.l.google.com.`}),e.jsx(s,{command:"dig @1.1.1.1 +short termux.dev",comment:"Consulta direta no Cloudflare DNS",output:`185.125.190.21
185.125.190.20`}),e.jsx(s,{command:"dig +trace termux.dev",comment:"Mostra a recursão completa do root até o autoritativo",output:`; <<>> DiG 9.18.28 <<>> +trace termux.dev
.                       509431  IN      NS      a.root-servers.net.
.                       509431  IN      NS      b.root-servers.net.
com.                    172800  IN      NS      a.gtld-servers.net.
termux.dev.             172800  IN      NS      ns1.canonical.com.
termux.dev.             600     IN      A       185.125.190.21
;; Received 58 bytes from 185.125.190.4#53(ns1.canonical.com) in 95 ms`}),e.jsx(s,{command:"nslookup duckduckgo.com",output:`Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
Name:   duckduckgo.com
Address: 40.89.244.232`}),e.jsx(s,{command:"host -a archlinux.org",output:`Trying "archlinux.org"
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 9821
;; ANSWER SECTION:
archlinux.org.          3600 IN A     95.217.163.246
archlinux.org.          3600 IN AAAA  2a01:4f9:c010:6b1e::1
archlinux.org.          3600 IN MX    10 mail.archlinux.org.
archlinux.org.          3600 IN NS    ns1.archlinux.org.
archlinux.org.          3600 IN TXT   "v=spf1 mx -all"`})]}),e.jsx("h2",{children:"9. whois"}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{root:!0,command:"pkg install -y whois"}),e.jsx(s,{command:"whois canonical.com",output:`   Domain Name: CANONICAL.COM
   Registry Domain ID: 9582718_DOMAIN_COM-VRSN
   Registrar: MarkMonitor Inc.
   Registrar URL: http://www.markmonitor.com
   Updated Date: 2024-08-11T09:14:22Z
   Creation Date: 2002-05-16T19:51:00Z
   Registry Expiry Date: 2030-05-16T19:51:00Z
   Name Server: NS1.CANONICAL.COM
   Name Server: NS2.CANONICAL.COM
   DNSSEC: signedDelegation`})]}),e.jsx("h2",{children:"10. ss e netstat (sockets/conexões)"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"ss"})," (socket statistics) é o substituto moderno e muito mais rápido do ",e.jsx("code",{children:"netstat"}),"."]}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{root:!0,command:"ss -tulnp",comment:"TCP+UDP, listen, numérico, com PID",output:`Netid State  Recv-Q Send-Q  Local Address:Port  Peer Address:Port  Process
udp   UNCONN 0      0       127.0.0.54:53        0.0.0.0:*          users:(("systemd-resolve",pid=801,fd=18))
udp   UNCONN 0      0       127.0.0.53%lo:53     0.0.0.0:*          users:(("systemd-resolve",pid=801,fd=14))
tcp   LISTEN 0      4096    127.0.0.54:53        0.0.0.0:*          users:(("systemd-resolve",pid=801,fd=19))
tcp   LISTEN 0      128     0.0.0.0:22           0.0.0.0:*          users:(("sshd",pid=1124,fd=3))
tcp   LISTEN 0      511     0.0.0.0:80           0.0.0.0:*          users:(("nginx",pid=2048,fd=6))
tcp   LISTEN 0      4096    [::1]:631            [::]:*             users:(("cupsd",pid=998,fd=7))
tcp   LISTEN 0      128     [::]:22              [::]:*             users:(("sshd",pid=1124,fd=4))`}),e.jsx(s,{command:"ss -s",comment:"Resumo geral",output:`Total: 412
TCP:   38 (estab 14, closed 18, orphaned 0, timewait 18)

Transport Total     IP        IPv6
RAW       1         0         1
UDP       12        9         3
TCP       20        14        6
INET      33        23        10
FRAG      0         0         0`}),e.jsx(s,{command:"ss -tn state established '( dport = :443 or sport = :443 )'",output:`Recv-Q Send-Q Local Address:Port Peer Address:Port  Process
0      0      192.168.1.100:48222 142.250.78.206:443
0      0      192.168.1.100:48238 140.82.121.4:443
0      0      192.168.1.100:48244 185.125.190.21:443`}),e.jsx(s,{command:"netstat -tulnp",comment:"Versão legacy (net-tools)",output:`Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1124/sshd: /usr/sbi
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      2048/nginx: master
tcp6       0      0 :::22                   :::*                    LISTEN      1124/sshd: /usr/sbi
udp        0      0 127.0.0.53:53           0.0.0.0:*                           801/systemd-resolve`})]}),e.jsx("h2",{children:"11. nc (netcat) — o canivete suíço de redes"}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{command:"nc -zv 192.168.1.1 22",comment:"Testar se a porta TCP está aberta",output:"Connection to 192.168.1.1 22 port [tcp/ssh] succeeded!"}),e.jsx(s,{command:"nc -zv -u 192.168.1.1 53",comment:"Testar UDP",output:"Connection to 192.168.1.1 53 port [udp/domain] succeeded!"}),e.jsx(s,{command:"nc -lvnp 9000",comment:"Servidor TCP na porta 9000",output:"Listening on 0.0.0.0 9000"}),e.jsx(s,{command:'echo "ola servidor" | nc 192.168.1.50 9000',comment:"Cliente envia uma mensagem"}),e.jsx(s,{command:"nc -lvnp 8000 > recebido.tar.gz",comment:"Receber arquivo via netcat"}),e.jsx(s,{command:"cat backup.tar.gz | nc -N 192.168.1.50 8000",comment:"Enviar arquivo (do outro lado)"})]}),e.jsx("h2",{children:"12. nmap — descoberta e varredura"}),e.jsx(r,{type:"warning",title:"Use com responsabilidade",children:"Escanear redes ou hosts sem autorização é crime em vários países (incluindo o Brasil, art. 154-A do Código Penal). Use apenas em sua própria infraestrutura ou em ambientes de teste autorizados."}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{root:!0,command:"pkg install -y nmap"}),e.jsx(s,{command:"nmap -sn 192.168.1.0/24",comment:"Ping sweep — quem está vivo na LAN",output:`Starting Nmap 7.94 ( https://nmap.org ) at 2025-04-12 14:30 -03
Nmap scan report for 192.168.1.1
Host is up (0.00041s latency).
Nmap scan report for 192.168.1.50
Host is up (0.00082s latency).
Nmap scan report for 192.168.1.75
Host is up (0.0011s latency).
Nmap scan report for 192.168.1.100
Host is up (0.000091s latency).
Nmap done: 256 IP addresses (4 hosts up) scanned in 2.42 seconds`}),e.jsx(s,{root:!0,command:"nmap -sS -p 1-1000 192.168.1.50",comment:"SYN scan (stealth) nas 1000 portas comuns",output:`Starting Nmap 7.94 ( https://nmap.org ) at 2025-04-12 14:31 -03
Nmap scan report for 192.168.1.50
Host is up (0.00091s latency).
Not shown: 996 closed tcp ports (reset)
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https
631/tcp open  ipp
MAC Address: 00:1E:C9:A4:B2:3F (Dell)

Nmap done: 1 IP address (1 host up) scanned in 4.12 seconds`}),e.jsx(s,{root:!0,command:"nmap -sV -O 192.168.1.50",comment:"Detectar versões + OS fingerprint",output:`PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 9.6p1 Termux termux.5 (Termux Linux; protocol 2.0)
80/tcp  open  http     nginx 1.24.0 (Termux)
443/tcp open  ssl/http nginx 1.24.0 (Termux)
631/tcp open  ipp      CUPS 2.4

Device type: general purpose
Running: Linux 5.X|6.X
OS CPE: cpe:/o:linux:linux_kernel:5 cpe:/o:linux:linux_kernel:6
OS details: Linux 5.4 - 6.5
Network Distance: 1 hop`}),e.jsx(s,{command:"nmap --script vuln -p 80,443 example.com",comment:"Scripts NSE de vulnerabilidade"})]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Flag"}),e.jsx("th",{children:"Significado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"-sP / -sn"}),e.jsx("td",{children:"Apenas descoberta (ping sweep)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-sS"}),e.jsx("td",{children:"SYN scan (stealth, requer root)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-sT"}),e.jsx("td",{children:"TCP connect scan (sem root)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-sU"}),e.jsx("td",{children:"UDP scan"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-sV"}),e.jsx("td",{children:"Detecção de versão dos serviços"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-O"}),e.jsx("td",{children:"OS fingerprint"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-p"}),e.jsx("td",{children:"Portas (ex: -p 22,80,443 ou -p-)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-A"}),e.jsx("td",{children:"Agressivo (-O + -sV + scripts + traceroute)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"-T0..T5"}),e.jsx("td",{children:"Timing (paranoico → insano)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--script"}),e.jsx("td",{children:"Roda scripts NSE"})]})]})]}),e.jsx("h2",{children:"13. tcpdump — captura de pacotes"}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{root:!0,command:"pkg install -y tcpdump"}),e.jsx(s,{root:!0,command:"tcpdump -i enp3s0 -n -c 5",comment:"Capturar 5 pacotes na interface",output:`tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on enp3s0, link-type EN10MB (Ethernet), snapshot length 262144 bytes
14:35:02.124581 IP 192.168.1.100.48222 > 142.250.78.206.443: Flags [P.], seq 12:312, ack 5891, win 501, length 300
14:35:02.137412 IP 142.250.78.206.443 > 192.168.1.100.48222: Flags [.], ack 312, win 297, length 0
14:35:02.198512 IP 192.168.1.100.48244 > 185.125.190.21.443: Flags [P.], seq 1:892, ack 1, win 501, length 891
14:35:02.215912 IP 185.125.190.21.443 > 192.168.1.100.48244: Flags [.], ack 892, win 501, length 0
14:35:02.301281 IP 192.168.1.1.53 > 192.168.1.100.42118: 21834 1/0/1 A 142.250.78.206 (55)
5 packets captured
12 packets received by filter
0 packets dropped by kernel`}),e.jsx(s,{root:!0,command:"tcpdump -i any 'port 53' -nnv",comment:"Tráfego DNS em qualquer interface",output:`14:36:11.421891 IP (tos 0x0, ttl 64, id 41212, offset 0, flags [DF], proto UDP (17), length 60)
    192.168.1.100.42118 > 192.168.1.1.53: 21834+ A? google.com. (28)
14:36:11.434201 IP (tos 0x0, ttl 63, id 41212, offset 0, flags [DF], proto UDP (17), length 76)
    192.168.1.1.53 > 192.168.1.100.42118: 21834 1/0/0 A 142.250.78.206 (44)`}),e.jsx(s,{root:!0,command:"tcpdump -i enp3s0 -w captura.pcap",comment:"Salvar tráfego para abrir no Wireshark",output:`tcpdump: listening on enp3s0, link-type EN10MB (Ethernet)
^C
1284 packets captured
1284 packets received by filter
0 packets dropped by kernel`}),e.jsx(s,{root:!0,command:"tcpdump -r captura.pcap 'host 8.8.8.8'",comment:"Ler captura com filtro"})]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Filtro"}),e.jsx("th",{children:"O que captura"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"host 1.2.3.4"}),e.jsx("td",{children:"Origem ou destino == IP"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"src/dst host X"}),e.jsx("td",{children:"Apenas origem ou destino"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"port 22"}),e.jsx("td",{children:"Pacotes na porta 22"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tcp[13] & 2 != 0"}),e.jsx("td",{children:"Pacotes com flag SYN"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"net 192.168.1.0/24"}),e.jsx("td",{children:"Tráfego dentro da subnet"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"'icmp or arp'"}),e.jsx("td",{children:"Composição de filtros"})]})]})]}),e.jsx("h2",{children:"14. iperf3 — medindo throughput"}),e.jsxs(t,{title:"wallyson@termux: ~",children:[e.jsx(s,{root:!0,command:"pkg install -y iperf3"}),e.jsx(s,{command:"iperf3 -s",comment:"Servidor (na máquina A)",output:`-----------------------------------------------------------
Server listening on 5201 (test #1)
-----------------------------------------------------------`}),e.jsx(s,{command:"iperf3 -c 192.168.1.50 -t 10",comment:"Cliente (na máquina B), 10 s",output:`Connecting to host 192.168.1.50, port 5201
[  5] local 192.168.1.100 port 48512 connected to 192.168.1.50 port 5201
[ ID] Interval         Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00 sec  113 MBytes   948 Mbits/sec    0    412 KBytes
[  5]   1.00-2.00 sec  112 MBytes   941 Mbits/sec    0    412 KBytes
[  5]   2.00-3.00 sec  113 MBytes   946 Mbits/sec    0    412 KBytes
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval         Transfer     Bitrate         Retr
[  5]   0.00-10.00 sec 1.10 GBytes  944 Mbits/sec    0       sender
[  5]   0.00-10.00 sec 1.10 GBytes  942 Mbits/sec            receiver

iperf Done.`})]}),e.jsx("h2",{children:"15. /etc/hosts e resolução local"}),e.jsx(o,{path:"/etc/hosts",children:`127.0.0.1       localhost
127.0.1.1       termux
192.168.1.50    nas.local nas
192.168.1.75    impressora.local

# IPv6
::1             localhost ip6-localhost ip6-loopback
ff02::1         ip6-allnodes
ff02::2         ip6-allrouters`}),e.jsxs("p",{children:["A ordem de resolução é definida em ",e.jsx("code",{children:"/etc/nsswitch.conf"}),":"]}),e.jsx(o,{path:"/etc/nsswitch.conf (trecho)",children:"hosts:          files mdns4_minimal [NOTFOUND=return] dns mymachines"}),e.jsx("h2",{children:"16. Erros comuns e troubleshooting"}),e.jsxs(r,{type:"danger",title:"Sem internet, mas a interface está UP",children:["Verifique nesta ordem: ",e.jsx("br",{}),"1. ",e.jsx("code",{children:"ip addr"})," — tem IP atribuído? ",e.jsx("br",{}),"2. ",e.jsx("code",{children:"ip route"})," — existe rota default? ",e.jsx("br",{}),"3. ",e.jsx("code",{children:"ping <gateway>"})," — alcança o roteador? ",e.jsx("br",{}),"4. ",e.jsx("code",{children:"ping 8.8.8.8"})," — alcança a Internet? ",e.jsx("br",{}),"5. ",e.jsx("code",{children:"ping google.com"})," — DNS funciona? ",e.jsx("br",{}),"Se 1-4 OK e 5 falhar → problema no DNS (veja a página"," ",e.jsx("strong",{children:"DNS no Termux"}),")."]}),e.jsx(r,{type:"tip",title:"Comandos úteis para o dia-a-dia",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"ip -c -br a"})," — visão colorida e curta das interfaces"]}),e.jsxs("li",{children:[e.jsx("code",{children:"ss -tnp '( sport = :443 )'"})," — quem está na 443"]}),e.jsxs("li",{children:[e.jsx("code",{children:"watch -n1 'ss -s'"})," — sockets em tempo real"]}),e.jsxs("li",{children:[e.jsx("code",{children:"resolvectl query example.com"})," — DNS via systemd-resolved"]}),e.jsxs("li",{children:[e.jsx("code",{children:"nmcli device status"})," — visão pelo NetworkManager"]})]})}),e.jsxs("p",{children:["Domine ",e.jsx("code",{children:"ip"}),", ",e.jsx("code",{children:"ss"}),", ",e.jsx("code",{children:"dig"}),","," ",e.jsx("code",{children:"tcpdump"})," e ",e.jsx("code",{children:"nmap"})," e você resolve 95% dos problemas de rede no Termux."]})]})}export{m as default};

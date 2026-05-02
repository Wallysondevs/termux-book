import{j as e}from"./index-DllpmZ7S.js";import{P as a}from"./PageContainer-D5o1LrsX.js";import{T as s,C as r,F as t}from"./Terminal-DJZg2Eps.js";import{I as n}from"./InfoBox-StGQOtUJ.js";import"./house-CLqZi7qQ.js";import"./proxy-Xil2K0n2.js";function m(){return e.jsxs(a,{title:"Netplan — Configuração de Rede no Ubuntu",subtitle:"O sistema declarativo YAML que controla toda a rede do Ubuntu desde a 17.10. DHCP, IP estático, Wi-Fi, VLAN, bonding, bridges e troubleshooting.",difficulty:"intermediario",timeToRead:"40 min",category:"Redes",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Netplan"})," é o sistema oficial de configuração de rede do Ubuntu desde a versão 17.10. Em vez de você editar diretamente os arquivos de cada renderer (systemd-networkd ou NetworkManager), você descreve a rede em ",e.jsx("strong",{children:"YAML"})," dentro de ",e.jsx("code",{children:"/etc/netplan/"})," e roda ",e.jsx("code",{children:"netplan apply"})," — o Netplan gera as configurações nativas no backend escolhido. É declarativo, idempotente e portável."]}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{command:"ls /etc/netplan/",output:"50-cloud-init.yaml"}),e.jsx(r,{command:"netplan --version",output:"0.107.1"}),e.jsx(r,{command:"netplan status",output:`     Online state: online
    DNS Addresses: 127.0.0.53 (stub)
       DNS Search: lan

●  1: lo ethernet UNKNOWN/UP (unmanaged)
      MAC Address: 00:00:00:00:00:00
        Addresses: 127.0.0.1/8
                   ::1/128

●  2: enp3s0 ethernet UP (networkd: enp3s0)
      MAC Address: 08:00:27:4b:89:1c (PCS Systemtechnik GmbH)
        Addresses: 192.168.1.100/24 (dhcp)
                   fe80::a00:27ff:fe4b:891c/64 (link)
    DNS Addresses: 192.168.1.1
       DNS Search: lan
           Routes: default via 192.168.1.1 from 192.168.1.100 metric 100 (dhcp)
                   192.168.1.0/24 from 192.168.1.100 metric 100 (link)`})]}),e.jsx("h2",{children:"1. Arquitetura: Netplan + Renderer"}),e.jsxs("p",{children:["O Netplan não é o serviço que coloca a rede no ar — ele apenas"," ",e.jsx("em",{children:"traduz"})," seu YAML para a configuração do ",e.jsx("strong",{children:"renderer"})," ","que de fato gerencia as interfaces. Há dois renderers oficiais:"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Renderer"}),e.jsx("th",{children:"Quando usar"}),e.jsx("th",{children:"Configs geradas em"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"networkd"})," (systemd-networkd)"]}),e.jsx("td",{children:"Servidores Ubuntu (padrão)"}),e.jsx("td",{children:"/run/systemd/network/"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"NetworkManager"})}),e.jsx("td",{children:"Desktops Ubuntu (GNOME, KDE)"}),e.jsx("td",{children:"/run/NetworkManager/system-connections/"})]})]})]}),e.jsx("h2",{children:"2. Estrutura do diretório /etc/netplan/"}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{command:"ls -la /etc/netplan/",output:`total 16
drwxr-xr-x   2 root root 4096 abr 12 14:42 .
drwxr-xr-x 134 root root 4096 abr 12 14:30 ..
-rw-r--r--   1 root root  234 mar 15 10:11 50-cloud-init.yaml`}),e.jsx(r,{command:"cat /etc/netplan/50-cloud-init.yaml",output:`# This file is generated from information provided by the datasource. Changes
# to it will not persist across an instance reboot.
network:
    ethernets:
        enp3s0:
            dhcp4: true
    version: 2`})]}),e.jsx("p",{children:"Os arquivos são processados em ordem alfabética. Convenção:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"00-installer-config.yaml"})," — gerado pelo instalador (Server)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"01-network-manager-all.yaml"})," — gerado em Desktops com NM"]}),e.jsxs("li",{children:[e.jsx("code",{children:"50-cloud-init.yaml"})," — escrito pelo cloud-init"]}),e.jsxs("li",{children:[e.jsx("code",{children:"99-overrides.yaml"})," — sua configuração custom (sempre por cima)"]})]}),e.jsxs(n,{type:"warning",title:"Permissões",children:["Desde Netplan 0.106 os arquivos devem ter permissão ",e.jsx("code",{children:"600"})," (apenas root pode ler). Caso contrário ",e.jsx("code",{children:"netplan apply"})," emite um aviso."]}),e.jsx(s,{title:"wallyson@ubuntu: ~",children:e.jsx(r,{root:!0,command:"chmod 600 /etc/netplan/*.yaml"})}),e.jsx("h2",{children:"3. Sintaxe geral do YAML"}),e.jsx(t,{path:"/etc/netplan/01-exemplo.yaml",children:`network:
  version: 2
  renderer: networkd          # ou NetworkManager
  ethernets:
    NOME_INTERFACE:
      dhcp4: true|false
      dhcp6: true|false
      addresses: [IP/CIDR, ...]
      routes:
        - to: DESTINO
          via: GATEWAY
      nameservers:
        addresses: [DNS1, DNS2]
        search: [dominio1, dominio2]
  wifis:
    NOME_WIFI:
      access-points:
        "SSID":
          password: "senha"
  vlans:
    NOME_VLAN:
      id: ID
      link: INTERFACE_PAI
  bonds:
    NOME_BOND:
      interfaces: [eth0, eth1]
      parameters:
        mode: active-backup
  bridges:
    NOME_BRIDGE:
      interfaces: [eth0]
`}),e.jsx("h2",{children:"4. DHCP simples (caso mais comum)"}),e.jsx(t,{path:"/etc/netplan/01-dhcp.yaml",children:`network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: true
      dhcp6: true
`}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"netplan apply"}),e.jsx(r,{command:"ip -br a show enp3s0",output:"enp3s0           UP             192.168.1.100/24 fe80::a00:27ff:fe4b:891c/64"})]}),e.jsx("h2",{children:"5. IP estático completo"}),e.jsx(t,{path:"/etc/netplan/02-static.yaml",children:`network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: false
      addresses:
        - 192.168.1.100/24
        - 192.168.1.101/24    # IP secundário
      routes:
        - to: default
          via: 192.168.1.1
          metric: 100
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8, 8.8.4.4]
        search: [casa.lan, lab.local]
`}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"netplan generate",comment:"Apenas gera configs no /run/, não aplica"}),e.jsx(r,{root:!0,command:"netplan try",comment:"Aplica e reverte em 120s se você não confirmar (Enter)",output:`Do you want to keep these settings?

Press ENTER before the timeout to accept the new configuration

Changes will revert in 120 seconds
Configuration accepted.`}),e.jsx(r,{root:!0,command:"netplan apply"}),e.jsx(r,{command:"ip route",output:`default via 192.168.1.1 dev enp3s0 proto static metric 100
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.100
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.101`})]}),e.jsxs(n,{type:"tip",title:"Sempre teste com netplan try",children:[e.jsx("code",{children:"netplan try"})," aplica e te dá 120s para confirmar. Se você ficou sem rede (e portanto sem SSH), em 2 minutos a configuração anterior volta automaticamente — salva-vidas em servidores remotos."]}),e.jsx("h2",{children:"6. Múltiplas interfaces"}),e.jsx(t,{path:"/etc/netplan/03-multi.yaml",children:`network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:                   # WAN — DHCP do provedor
      dhcp4: true
    enp4s0:                   # LAN interna — IP fixo
      dhcp4: false
      addresses: [10.10.0.1/24]
    enp5s0:                   # Rede de gerência
      dhcp4: false
      addresses: [172.16.0.10/24]
      routes:
        - to: 172.16.0.0/16
          via: 172.16.0.1
`}),e.jsx("h2",{children:"7. VLAN (802.1Q)"}),e.jsx(t,{path:"/etc/netplan/04-vlan.yaml",children:`network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: false
  vlans:
    vlan10:
      id: 10
      link: enp3s0
      addresses: [192.168.10.5/24]
      routes:
        - to: default
          via: 192.168.10.1
    vlan20:
      id: 20
      link: enp3s0
      addresses: [192.168.20.5/24]
`}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"netplan apply"}),e.jsx(r,{command:"ip -br a",output:`lo               UNKNOWN        127.0.0.1/8 ::1/128
enp3s0           UP
vlan10@enp3s0    UP             192.168.10.5/24
vlan20@enp3s0    UP             192.168.20.5/24`})]}),e.jsx("h2",{children:"8. Bond (link aggregation)"}),e.jsx(t,{path:"/etc/netplan/05-bond.yaml",children:`network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: false
    enp4s0:
      dhcp4: false
  bonds:
    bond0:
      interfaces: [enp3s0, enp4s0]
      addresses: [192.168.1.100/24]
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [1.1.1.1]
      parameters:
        mode: 802.3ad           # LACP (precisa do switch)
        lacp-rate: fast
        mii-monitor-interval: 100
        transmit-hash-policy: layer3+4
`}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Modo"}),e.jsx("th",{children:"O que faz"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"active-backup"}),e.jsx("td",{children:"Apenas 1 escravo ativo; failover"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"balance-rr"}),e.jsx("td",{children:"Round-robin, agrega banda (sem switch)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"balance-xor"}),e.jsx("td",{children:"Hash → escolhe escravo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"broadcast"}),e.jsx("td",{children:"Envia em todos (raro)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"802.3ad"}),e.jsx("td",{children:"LACP (precisa switch compatível)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"balance-tlb"}),e.jsx("td",{children:"Balanceia transmissão"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"balance-alb"}),e.jsx("td",{children:"Balanceia tx + rx"})]})]})]}),e.jsx("h2",{children:"9. Bridge (para VMs e contêineres)"}),e.jsx(t,{path:"/etc/netplan/06-bridge.yaml",children:`network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: false
  bridges:
    br0:
      interfaces: [enp3s0]
      dhcp4: true
      parameters:
        stp: false
        forward-delay: 0
`}),e.jsx("p",{children:"Útil para conectar VMs (KVM/libvirt) ou contêineres (LXD) na mesma rede física da máquina host."}),e.jsx("h2",{children:"10. Wi-Fi (WPA2/WPA3-PSK)"}),e.jsx(t,{path:"/etc/netplan/10-wifi.yaml",children:`network:
  version: 2
  renderer: networkd
  wifis:
    wlp2s0:
      dhcp4: true
      access-points:
        "MinhaRedeWiFi":
          password: "senha-super-secreta"
        "RedeAberta":
          # Sem password
        "EmpresaWPA3":
          auth:
            key-management: sae
            password: "senhaWPA3"
`}),e.jsxs("p",{children:["Em desktops com NetworkManager, prefira ",e.jsx("code",{children:"nmcli"})," ou o applet gráfico — é mais prático."]}),e.jsx("h2",{children:"11. Comandos do Netplan"}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"netplan generate",comment:"Renderiza YAMLs em /run/systemd/network/ ou /run/NetworkManager/"}),e.jsx(r,{root:!0,command:"netplan apply",comment:"Aplica de fato (reload do renderer)"}),e.jsx(r,{root:!0,command:"netplan try",comment:"Aplica com rollback automático em 120s"}),e.jsx(r,{root:!0,command:"netplan try --timeout 60",comment:"Customiza o timeout"}),e.jsx(r,{command:"netplan status --all",comment:"Mostra estado atual de todas interfaces",output:`     Online state: online
    DNS Addresses: 127.0.0.53 (stub), 1.1.1.1
       DNS Search: casa.lan

●  2: enp3s0 ethernet UP (networkd: enp3s0)
        Addresses: 192.168.1.100/24
           Routes: default via 192.168.1.1`}),e.jsx(r,{command:"netplan get ethernets.enp3s0.dhcp4",comment:"Lê valor específico do YAML",output:"true"}),e.jsx(r,{root:!0,command:"netplan set ethernets.enp3s0.dhcp4=false",comment:"Edita por linha de comando"}),e.jsx(r,{root:!0,command:"netplan ip leases enp3s0",comment:"Mostra lease DHCP atual",output:`# This is private data. Do not parse.
ADDRESS=192.168.1.100
NETMASK=255.255.255.0
ROUTER=192.168.1.1
SERVER_ADDRESS=192.168.1.1
NEXT_SERVER=192.168.1.1
BROADCAST=192.168.1.255
T1=43200
T2=75600
LIFETIME=86400
DNS=192.168.1.1
HOSTNAME=ubuntu`})]}),e.jsx("h2",{children:"12. Validando YAML"}),e.jsx(s,{title:"wallyson@ubuntu: ~",children:e.jsx(r,{root:!0,command:"netplan generate",comment:"Erro de sintaxe será reportado aqui",output:`** (generate:2148): WARNING **: 14:51:02.412: Permissions for /etc/netplan/01-static.yaml are too open. Netplan configuration should NOT be accessible by others.
Error in network definition /etc/netplan/01-static.yaml line 7 column 14: expected mapping`})}),e.jsxs(n,{type:"danger",title:"YAML é sensível a indentação",children:["Use sempre ",e.jsx("strong",{children:"2 espaços"})," (nunca tab). Cada nível encadeia com 2 espaços a mais. Listas começam com ",e.jsx("code",{children:"- "}),". Erro muito comum: misturar 4 espaços em um lugar e 2 em outro."]}),e.jsx("h2",{children:"13. Trocando o renderer"}),e.jsxs("p",{children:["Se você quer migrar do ",e.jsx("code",{children:"NetworkManager"})," (desktop) para"," ",e.jsx("code",{children:"networkd"})," (servidor) ou vice-versa, basta trocar o"," ",e.jsx("code",{children:"renderer:"})," no YAML."]}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"systemctl status systemd-networkd",output:`● systemd-networkd.service - Network Configuration
     Loaded: loaded (/lib/systemd/system/systemd-networkd.service; enabled)
     Active: active (running) since Sat 2025-04-12 13:42:11 -03; 1h 10min ago
       Docs: man:systemd-networkd.service(8)
   Main PID: 421 (systemd-network)
     Status: "Processing requests..."`}),e.jsx(r,{root:!0,command:"systemctl status NetworkManager",output:"Unit NetworkManager.service could not be found."})]}),e.jsx("h2",{children:"14. Troubleshooting"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Sintoma"}),e.jsx("th",{children:"Solução"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:'"netplan apply não fez nada"'}),e.jsxs("td",{children:["Rode ",e.jsx("code",{children:"netplan --debug apply"})," e veja o que está sendo gerado."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Servidor sem rede após apply"}),e.jsxs("td",{children:["Acesse via console; remova/edite o YAML; rode ",e.jsx("code",{children:"netplan apply"}),". Sempre prefira ",e.jsx("code",{children:"netplan try"}),"!"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:'"Could not connect to system bus"'}),e.jsxs("td",{children:[e.jsx("code",{children:"systemctl restart systemd-networkd"})," e cheque ",e.jsx("code",{children:"journalctl -u systemd-networkd -e"}),"."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Cloud-init sobrescreve sua config"}),e.jsxs("td",{children:["Crie ",e.jsx("code",{children:"/etc/cloud/cloud.cfg.d/99-disable-network.cfg"})," ","com ",e.jsx("code",{children:"network: {config: disabled}"}),"."]})]})]})]}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"netplan --debug apply",output:`** (generate:3211): DEBUG: 14:55:42.114: Processing input file /etc/netplan/50-cloud-init.yaml..
** (generate:3211): DEBUG: 14:55:42.115: starting new processing pass
** (generate:3211): DEBUG: 14:55:42.115: enp3s0: setting default backend to networkd
** (generate:3211): DEBUG: 14:55:42.115: Generating output files..
** (generate:3211): DEBUG: 14:55:42.116: networkd: definition enp3s0 is not for us (backend 1)
DEBUG:netplan generated networkd configuration changed, restarting networkd
DEBUG:no netplan generated NM configuration exists`}),e.jsx(r,{root:!0,command:"journalctl -u systemd-networkd -n 30 --no-pager",comment:"Logs do networkd",output:`abr 12 14:55:42 ubuntu systemd[1]: Reloading systemd-networkd...
abr 12 14:55:42 ubuntu systemd-networkd[421]: Loaded files: /run/systemd/network/10-netplan-enp3s0.network
abr 12 14:55:42 ubuntu systemd-networkd[421]: enp3s0: Configured IP address 192.168.1.100/24
abr 12 14:55:42 ubuntu systemd-networkd[421]: enp3s0: Gained carrier
abr 12 14:55:42 ubuntu systemd-networkd[421]: enp3s0: Configured DHCPv4 lease
abr 12 14:55:42 ubuntu systemd-networkd[421]: Reloaded.`})]}),e.jsx("h2",{children:"15. Caso prático completo: servidor com bridge para libvirt"}),e.jsx(t,{path:"/etc/netplan/99-server.yaml",children:`network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: false
      dhcp6: false
  bridges:
    br0:
      interfaces: [enp3s0]
      addresses: [192.168.1.100/24]
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]
        search: [lab.local]
      parameters:
        stp: false
        forward-delay: 0
`}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(r,{root:!0,command:"chmod 600 /etc/netplan/99-server.yaml"}),e.jsx(r,{root:!0,command:"netplan try",output:"Configuration accepted."}),e.jsx(r,{command:"ip -br a",output:`lo               UNKNOWN        127.0.0.1/8 ::1/128
enp3s0           UP
br0              UP             192.168.1.100/24 fe80::a00:27ff:fe4b:891c/64`}),e.jsx(r,{command:"bridge link",output:"6: enp3s0@br0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 master br0 state forwarding priority 32 cost 4"})]}),e.jsxs("p",{children:["A partir daqui, KVM/libvirt ou LXD podem usar ",e.jsx("code",{children:"br0"})," como rede macvtap, dando IPs da LAN diretamente para as VMs/containers."]}),e.jsx(n,{type:"success",title:"Resumo do Netplan",children:e.jsxs("ol",{children:[e.jsxs("li",{children:["Edite YAML em ",e.jsx("code",{children:"/etc/netplan/"})," (perm 600)."]}),e.jsxs("li",{children:["Sempre teste com ",e.jsx("code",{children:"netplan try"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"netplan generate --debug"})," para depurar."]}),e.jsx("li",{children:"Cuidado com indentação YAML."}),e.jsx("li",{children:"Em desktops, prefira NetworkManager + nmcli."})]})})]})}export{m as default};

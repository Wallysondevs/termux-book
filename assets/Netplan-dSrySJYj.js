import{j as e}from"./index-C2xKMDcs.js";import{P as i}from"./PageContainer-D8Fa3g_u.js";import{C as o}from"./CodeBlock-OPQVSQze.js";import{I as r}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function l(){return e.jsxs(i,{title:"Rede no Termux (esqueça o Netplan)",subtitle:"Quem manda na rede do seu celular é o Android. Veja o que dá pra fazer no Termux: leitura de IP, Termux:API Wi-Fi, hostname e os limites do não-root.",difficulty:"intermediario",timeToRead:"20 min",children:[e.jsxs(r,{type:"danger",title:"Netplan NÃO existe no Android/Termux",children:["O ",e.jsx("code",{children:"Netplan"})," é exclusivo do Ubuntu — ele só gera arquivos para"," ",e.jsx("code",{children:"systemd-networkd"})," ou ",e.jsx("code",{children:"NetworkManager"}),", nenhum dos dois existe no Android. No celular quem decide IP, gateway, DNS, Wi-Fi e dados móveis é o próprio Android (via ",e.jsx("code",{children:"ConnectivityService"})," ","e o ",e.jsx("code",{children:"wpa_supplicant"})," do sistema). O Termux roda como um usuário comum e ",e.jsx("strong",{children:"não pode"})," alterar a configuração de rede sem root. Os comandos abaixo são quase todos"," ",e.jsx("strong",{children:"somente leitura"}),"."]}),e.jsx("h2",{children:"1. Como o Android gerencia a rede"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["O serviço ",e.jsx("code",{children:"ConnectivityService"})," (Java, dentro do"," ",e.jsx("code",{children:"system_server"}),") decide qual interface está ativa (Wi-Fi vs móvel vs Ethernet USB) e roteia o tráfego."]}),e.jsxs("li",{children:["Wi-Fi é controlado por ",e.jsx("code",{children:"WifiManager"})," + um"," ",e.jsx("code",{children:"wpa_supplicant"})," proprietário do fabricante."]}),e.jsxs("li",{children:["Dados móveis passam pelo ",e.jsx("code",{children:"RIL"})," (Radio Interface Layer) e pelo modem baseband — totalmente fora do alcance do Termux."]}),e.jsxs("li",{children:["DNS é configurado por ",e.jsx("code",{children:"netd"})," (daemon nativo) e geralmente aponta para um resolver interno em ",e.jsx("code",{children:"127.0.0.53"})," ou para o gateway."]}),e.jsxs("li",{children:["Não há ",e.jsx("code",{children:"/etc/network/interfaces"}),", não há"," ",e.jsx("code",{children:"/etc/netplan/"}),", não há ",e.jsx("code",{children:"/etc/resolv.conf"})," ","editável (no Termux ele aponta para um stub que reflete o resolver do Android)."]})]}),e.jsx("h2",{children:"2. Inspecionar a rede de dentro do Termux"}),e.jsxs("p",{children:["Sem root só dá pra ",e.jsx("em",{children:"olhar"}),". As ferramentas comuns funcionam em modo somente-leitura:"]}),e.jsx(o,{title:"Pacotes úteis",code:"pkg install iproute2 net-tools dnsutils inetutils termux-api"}),e.jsx(o,{title:"IP, interfaces e rotas (read-only)",code:`# Endereços por interface
ip -br addr
# Saída típica:
# lo               UNKNOWN        127.0.0.1/8 ::1/128
# wlan0            UP             192.168.0.42/24 fe80::.../64
# rmnet_data0      UP             10.x.x.x/30  (dados móveis)

# Rotas
ip route
# default via 192.168.0.1 dev wlan0

# DNS atual (resolver do Android)
getprop net.dns1
getprop net.dns2

# Gateway via Termux:API (mais confiável que getprop em Android moderno)
termux-wifi-connectioninfo | jq .`}),e.jsxs(r,{type:"warning",title:"ifconfig/ip set NÃO funcionam",children:["Comandos como ",e.jsx("code",{children:"ip addr add"}),", ",e.jsx("code",{children:"ip link set up/down"}),","," ",e.jsx("code",{children:"ip route add"}),", ",e.jsx("code",{children:"ifconfig wlan0 ..."})," retornam"," ",e.jsx("em",{children:"Operation not permitted"})," sem root. Isso é proteção do kernel Android (CAP_NET_ADMIN restrito)."]}),e.jsx("h2",{children:"3. Termux:API — Wi-Fi e conectividade"}),e.jsxs("p",{children:["O app companheiro ",e.jsx("strong",{children:"Termux:API"})," (F-Droid) expõe partes do ",e.jsx("em",{children:"WifiManager"})," e do ",e.jsx("em",{children:"ConnectivityManager"}),' do Android. É o equivalente moderno (e o único legítimo) ao "configurar rede" sem root.']}),e.jsx(o,{title:"Comandos termux-wifi-* e companhia",code:`pkg install termux-api

# Info da conexão Wi-Fi atual: SSID, BSSID, RSSI, IP, frequência
termux-wifi-connectioninfo

# Lista de redes que o último scan retornou
termux-wifi-scaninfo

# Liga/desliga o rádio Wi-Fi (em Android < 10; em 10+ exige usuário aprovar via UI)
termux-wifi-enable true
termux-wifi-enable false

# Estado geral de conectividade (tipo: WIFI / CELLULAR / NONE, métricas, captive portal)
termux-telephony-deviceinfo
termux-telephony-cellinfo`}),e.jsx(o,{title:"Exemplo: alertar quando trocar de Wi-Fi",code:`#!/data/data/com.termux/files/usr/bin/sh
LAST=""
while true; do
  CUR=$(termux-wifi-connectioninfo | jq -r .ssid)
  if [ "$CUR" != "$LAST" ]; then
    termux-notification --title "Wi-Fi" --content "Agora em: $CUR"
    LAST="$CUR"
  fi
  sleep 10
done`}),e.jsx("h2",{children:"4. Hostname, /etc/hosts e proxies"}),e.jsxs("p",{children:["Algumas coisas ",e.jsx("em",{children:"são"})," editáveis dentro do ",e.jsx("code",{children:"$PREFIX"})," do Termux porque ficam isoladas no seu sandbox:"]}),e.jsx(o,{title:"Coisas que VOCÊ controla",code:`# /etc/hosts do Termux (afeta só processos rodando no Termux)
echo "192.168.0.50  servidor.lan" >> $PREFIX/etc/hosts

# Proxy via variáveis de ambiente
export http_proxy=http://192.168.0.10:3128
export https_proxy=$http_proxy
export no_proxy=localhost,127.0.0.1

# Hostname visto por shell (não muda o do Android)
hostname meu-termux`}),e.jsx("h2",{children:"5. Servidores no Termux: o que muda na prática"}),e.jsxs(r,{type:"warning",title:"IP do celular muda o tempo todo",children:["Em rede móvel você está atrás de CGNAT — sem IP público. Em Wi-Fi o IP é DHCP do roteador e troca quando você reconecta. Para servir algo externamente use um túnel: ",e.jsx("code",{children:"ssh -R"}),", Cloudflare Tunnel (",e.jsx("code",{children:"cloudflared"}),"), ",e.jsx("code",{children:"tailscale"})," (via proot-distro) ou ",e.jsx("code",{children:"ngrok"}),"."]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Portas abaixo de 1024 são privilegiadas — sem root, escute em"," ",e.jsx("code",{children:"8080"}),", ",e.jsx("code",{children:"8443"}),", ",e.jsx("code",{children:"2222"})," etc."]}),e.jsxs("li",{children:["O ",e.jsx("code",{children:"nginx"}),", ",e.jsx("code",{children:"php-fpm"}),", ",e.jsx("code",{children:"postgres"}),","," ",e.jsx("code",{children:"node"})," etc. rodam normalmente — só não há"," ",e.jsx("code",{children:"systemd"})," nem ",e.jsx("code",{children:"networkd"}),' para "subir interface" (não precisa, o Android já fez isso).']}),e.jsxs("li",{children:["Para acessar do PC na mesma rede: pegue o IP via"," ",e.jsx("code",{children:"ip -br addr show wlan0"})," e conecte",e.jsx("code",{children:" http://<IP>:8080"}),"."]})]}),e.jsx("h2",{children:"6. VPN no Termux"}),e.jsxs("p",{children:["VPNs nativas (WireGuard, OpenVPN) ",e.jsx("strong",{children:"precisam"})," de"," ",e.jsx("code",{children:"tun/tap"}),", que o Android só permite via API"," ",e.jsx("em",{children:"VpnService"}),". Por isso instale o app correspondente (",e.jsx("em",{children:"WireGuard"}),", ",e.jsx("em",{children:"OpenVPN for Android"}),") — eles configuram a VPN no Android inteiro, e o Termux herda automaticamente porque toda sua conectividade passa pelo ",e.jsx("code",{children:"ConnectivityService"}),"."]}),e.jsx("h2",{children:"7. Tabela: Netplan/Ubuntu × Termux"}),e.jsx(o,{title:"Equivalências",code:`Ubuntu / Netplan                        Termux / Android
--------------------------------------  ----------------------------------
/etc/netplan/*.yaml                     (não existe — Android cuida)
netplan apply                           Wi-Fi/Mobile pela UI do Android
nmcli / NetworkManager                  termux-wifi-* (Termux:API)
ip addr add / ip route add              negado (sem CAP_NET_ADMIN)
/etc/resolv.conf editável               getprop net.dns1 (read-only)
systemd-networkd                        ConnectivityService (sistema)
ufw / iptables                          só com root + iptables do kernel
WireGuard CLI                           App "WireGuard" + VpnService`}),e.jsx(r,{type:"success",title:"Resumo",children:e.jsxs("ol",{children:[e.jsx("li",{children:"Esqueça Netplan — quem manda é o Android."}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"ip"}),"/",e.jsx("code",{children:"ifconfig"})," só para LER o estado."]}),e.jsxs("li",{children:["Para Wi-Fi: ",e.jsx("code",{children:"termux-wifi-*"})," via Termux:API."]}),e.jsx("li",{children:"Para servir algo: porta > 1024 + túnel reverso para sair do CGNAT."}),e.jsx("li",{children:"Para VPN: app Android nativo, Termux herda automaticamente."})]})})]})}export{l as default};

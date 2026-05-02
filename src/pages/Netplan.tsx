import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Netplan() {
  return (
    <PageContainer
      title="Rede no Termux (esqueça o Netplan)"
      subtitle="Quem manda na rede do seu celular é o Android. Veja o que dá pra fazer no Termux: leitura de IP, Termux:API Wi-Fi, hostname e os limites do não-root."
      difficulty="intermediario"
      timeToRead="20 min"
    >
      <AlertBox type="danger" title="Netplan NÃO existe no Android/Termux">
        O <code>Netplan</code> é exclusivo do Ubuntu — ele só gera arquivos para{" "}
        <code>systemd-networkd</code> ou <code>NetworkManager</code>, nenhum dos
        dois existe no Android. No celular quem decide IP, gateway, DNS, Wi-Fi
        e dados móveis é o próprio Android (via <code>ConnectivityService</code>{" "}
        e o <code>wpa_supplicant</code> do sistema). O Termux roda como um
        usuário comum e <strong>não pode</strong> alterar a configuração de
        rede sem root. Os comandos abaixo são quase todos{" "}
        <strong>somente leitura</strong>.
      </AlertBox>

      <h2>1. Como o Android gerencia a rede</h2>

      <ul>
        <li>
          O serviço <code>ConnectivityService</code> (Java, dentro do{" "}
          <code>system_server</code>) decide qual interface está ativa
          (Wi-Fi vs móvel vs Ethernet USB) e roteia o tráfego.
        </li>
        <li>
          Wi-Fi é controlado por <code>WifiManager</code> + um{" "}
          <code>wpa_supplicant</code> proprietário do fabricante.
        </li>
        <li>
          Dados móveis passam pelo <code>RIL</code> (Radio Interface Layer) e
          pelo modem baseband — totalmente fora do alcance do Termux.
        </li>
        <li>
          DNS é configurado por <code>netd</code> (daemon nativo) e geralmente
          aponta para um resolver interno em <code>127.0.0.53</code> ou para
          o gateway.
        </li>
        <li>
          Não há <code>/etc/network/interfaces</code>, não há{" "}
          <code>/etc/netplan/</code>, não há <code>/etc/resolv.conf</code>{" "}
          editável (no Termux ele aponta para um stub que reflete o resolver
          do Android).
        </li>
      </ul>

      <h2>2. Inspecionar a rede de dentro do Termux</h2>

      <p>
        Sem root só dá pra <em>olhar</em>. As ferramentas comuns funcionam em
        modo somente-leitura:
      </p>

      <CodeBlock
        title="Pacotes úteis"
        code={`pkg install iproute2 net-tools dnsutils inetutils termux-api`}
      />

      <CodeBlock
        title="IP, interfaces e rotas (read-only)"
        code={`# Endereços por interface
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
termux-wifi-connectioninfo | jq .`}
      />

      <AlertBox type="warning" title="ifconfig/ip set NÃO funcionam">
        Comandos como <code>ip addr add</code>, <code>ip link set up/down</code>,{" "}
        <code>ip route add</code>, <code>ifconfig wlan0 ...</code> retornam{" "}
        <em>Operation not permitted</em> sem root. Isso é proteção do kernel
        Android (CAP_NET_ADMIN restrito).
      </AlertBox>

      <h2>3. Termux:API — Wi-Fi e conectividade</h2>

      <p>
        O app companheiro <strong>Termux:API</strong> (F-Droid) expõe partes
        do <em>WifiManager</em> e do <em>ConnectivityManager</em> do Android.
        É o equivalente moderno (e o único legítimo) ao "configurar rede" sem
        root.
      </p>

      <CodeBlock
        title="Comandos termux-wifi-* e companhia"
        code={`pkg install termux-api

# Info da conexão Wi-Fi atual: SSID, BSSID, RSSI, IP, frequência
termux-wifi-connectioninfo

# Lista de redes que o último scan retornou
termux-wifi-scaninfo

# Liga/desliga o rádio Wi-Fi (em Android < 10; em 10+ exige usuário aprovar via UI)
termux-wifi-enable true
termux-wifi-enable false

# Estado geral de conectividade (tipo: WIFI / CELLULAR / NONE, métricas, captive portal)
termux-telephony-deviceinfo
termux-telephony-cellinfo`}
      />

      <CodeBlock
        title="Exemplo: alertar quando trocar de Wi-Fi"
        code={`#!/data/data/com.termux/files/usr/bin/sh
LAST=""
while true; do
  CUR=$(termux-wifi-connectioninfo | jq -r .ssid)
  if [ "$CUR" != "$LAST" ]; then
    termux-notification --title "Wi-Fi" --content "Agora em: $CUR"
    LAST="$CUR"
  fi
  sleep 10
done`}
      />

      <h2>4. Hostname, /etc/hosts e proxies</h2>

      <p>
        Algumas coisas <em>são</em> editáveis dentro do <code>$PREFIX</code> do
        Termux porque ficam isoladas no seu sandbox:
      </p>

      <CodeBlock
        title="Coisas que VOCÊ controla"
        code={`# /etc/hosts do Termux (afeta só processos rodando no Termux)
echo "192.168.0.50  servidor.lan" >> $PREFIX/etc/hosts

# Proxy via variáveis de ambiente
export http_proxy=http://192.168.0.10:3128
export https_proxy=$http_proxy
export no_proxy=localhost,127.0.0.1

# Hostname visto por shell (não muda o do Android)
hostname meu-termux`}
      />

      <h2>5. Servidores no Termux: o que muda na prática</h2>

      <AlertBox type="warning" title="IP do celular muda o tempo todo">
        Em rede móvel você está atrás de CGNAT — sem IP público. Em Wi-Fi o IP
        é DHCP do roteador e troca quando você reconecta. Para servir algo
        externamente use um túnel: <code>ssh -R</code>, Cloudflare Tunnel
        (<code>cloudflared</code>), <code>tailscale</code> (via proot-distro)
        ou <code>ngrok</code>.
      </AlertBox>

      <ul>
        <li>
          Portas abaixo de 1024 são privilegiadas — sem root, escute em{" "}
          <code>8080</code>, <code>8443</code>, <code>2222</code> etc.
        </li>
        <li>
          O <code>nginx</code>, <code>php-fpm</code>, <code>postgres</code>,{" "}
          <code>node</code> etc. rodam normalmente — só não há{" "}
          <code>systemd</code> nem <code>networkd</code> para "subir interface"
          (não precisa, o Android já fez isso).
        </li>
        <li>
          Para acessar do PC na mesma rede: pegue o IP via{" "}
          <code>ip -br addr show wlan0</code> e conecte
          <code> http://&lt;IP&gt;:8080</code>.
        </li>
      </ul>

      <h2>6. VPN no Termux</h2>

      <p>
        VPNs nativas (WireGuard, OpenVPN) <strong>precisam</strong> de{" "}
        <code>tun/tap</code>, que o Android só permite via API{" "}
        <em>VpnService</em>. Por isso instale o app correspondente
        (<em>WireGuard</em>, <em>OpenVPN for Android</em>) — eles configuram a
        VPN no Android inteiro, e o Termux herda automaticamente porque toda
        sua conectividade passa pelo <code>ConnectivityService</code>.
      </p>

      <h2>7. Tabela: Netplan/Ubuntu × Termux</h2>

      <CodeBlock
        title="Equivalências"
        code={`Ubuntu / Netplan                        Termux / Android
--------------------------------------  ----------------------------------
/etc/netplan/*.yaml                     (não existe — Android cuida)
netplan apply                           Wi-Fi/Mobile pela UI do Android
nmcli / NetworkManager                  termux-wifi-* (Termux:API)
ip addr add / ip route add              negado (sem CAP_NET_ADMIN)
/etc/resolv.conf editável               getprop net.dns1 (read-only)
systemd-networkd                        ConnectivityService (sistema)
ufw / iptables                          só com root + iptables do kernel
WireGuard CLI                           App "WireGuard" + VpnService`}
      />

      <AlertBox type="success" title="Resumo">
        <ol>
          <li>Esqueça Netplan — quem manda é o Android.</li>
          <li>Use <code>ip</code>/<code>ifconfig</code> só para LER o estado.</li>
          <li>Para Wi-Fi: <code>termux-wifi-*</code> via Termux:API.</li>
          <li>Para servir algo: porta &gt; 1024 + túnel reverso para sair do CGNAT.</li>
          <li>Para VPN: app Android nativo, Termux herda automaticamente.</li>
        </ol>
      </AlertBox>
    </PageContainer>
  );
}

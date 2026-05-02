import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Netplan() {
  return (
    <PageContainer
      title="Netplan — Configuração de Rede no Termux"
      subtitle="O sistema declarativo YAML que controla toda a rede do Termux desde a 17.10. DHCP, IP estático, Wi-Fi, VLAN, bonding, bridges e troubleshooting."
      difficulty="intermediario"
      timeToRead="40 min"
      category="Redes"
    >
      <p>
        O <strong>Netplan</strong> é o sistema oficial de configuração de rede do
        Termux desde a versão 17.10. Em vez de você editar diretamente os arquivos
        de cada renderer (systemd-networkd ou NetworkManager), você descreve a
        rede em <strong>YAML</strong> dentro de <code>/etc/netplan/</code> e
        roda <code>netplan apply</code> — o Netplan gera as configurações nativas
        no backend escolhido. É declarativo, idempotente e portável.
      </p>

      <Terminal title="wallyson@termux: ~">
        <Command command="ls /etc/netplan/" output="50-cloud-init.yaml" />
        <Command command="netplan --version" output="0.107.1" />
        <Command command="netplan status" output={`     Online state: online
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
                   192.168.1.0/24 from 192.168.1.100 metric 100 (link)`} />
      </Terminal>

      <h2>1. Arquitetura: Netplan + Renderer</h2>

      <p>
        O Netplan não é o serviço que coloca a rede no ar — ele apenas{" "}
        <em>traduz</em> seu YAML para a configuração do <strong>renderer</strong>{" "}
        que de fato gerencia as interfaces. Há dois renderers oficiais:
      </p>

      <table>
        <thead>
          <tr><th>Renderer</th><th>Quando usar</th><th>Configs geradas em</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>networkd</code> (systemd-networkd)</td>
            <td>Servidores Termux (padrão)</td>
            <td>/run/systemd/network/</td>
          </tr>
          <tr>
            <td><code>NetworkManager</code></td>
            <td>Desktops Termux (GNOME, KDE)</td>
            <td>/run/NetworkManager/system-connections/</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Estrutura do diretório /etc/netplan/</h2>

      <Terminal title="wallyson@termux: ~">
        <Command command="ls -la /etc/netplan/" output={`total 16
drwxr-xr-x   2 root root 4096 abr 12 14:42 .
drwxr-xr-x 134 root root 4096 abr 12 14:30 ..
-rw-r--r--   1 root root  234 mar 15 10:11 50-cloud-init.yaml`} />
        <Command command="cat /etc/netplan/50-cloud-init.yaml" output={`# This file is generated from information provided by the datasource. Changes
# to it will not persist across an instance reboot.
network:
    ethernets:
        enp3s0:
            dhcp4: true
    version: 2`} />
      </Terminal>

      <p>Os arquivos são processados em ordem alfabética. Convenção:</p>

      <ul>
        <li><code>00-installer-config.yaml</code> — gerado pelo instalador (Server)</li>
        <li><code>01-network-manager-all.yaml</code> — gerado em Desktops com NM</li>
        <li><code>50-cloud-init.yaml</code> — escrito pelo cloud-init</li>
        <li><code>99-overrides.yaml</code> — sua configuração custom (sempre por cima)</li>
      </ul>

      <InfoBox type="warning" title="Permissões">
        Desde Netplan 0.106 os arquivos devem ter permissão <code>600</code> (apenas
        root pode ler). Caso contrário <code>netplan apply</code> emite um aviso.
      </InfoBox>

      <Terminal title="wallyson@termux: ~">
        <Command root command="chmod 600 /etc/netplan/*.yaml" />
      </Terminal>

      <h2>3. Sintaxe geral do YAML</h2>

      <File path="/etc/netplan/01-exemplo.yaml">
{`network:
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
`}
      </File>

      <h2>4. DHCP simples (caso mais comum)</h2>

      <File path="/etc/netplan/01-dhcp.yaml">
{`network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: true
      dhcp6: true
`}
      </File>

      <Terminal title="wallyson@termux: ~">
        <Command root command="netplan apply" />
        <Command command="ip -br a show enp3s0" output="enp3s0           UP             192.168.1.100/24 fe80::a00:27ff:fe4b:891c/64" />
      </Terminal>

      <h2>5. IP estático completo</h2>

      <File path="/etc/netplan/02-static.yaml">
{`network:
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
`}
      </File>

      <Terminal title="wallyson@termux: ~">
        <Command root command="netplan generate" comment="Apenas gera configs no /run/, não aplica" />
        <Command root command="netplan try" comment="Aplica e reverte em 120s se você não confirmar (Enter)" output={`Do you want to keep these settings?

Press ENTER before the timeout to accept the new configuration

Changes will revert in 120 seconds
Configuration accepted.`} />
        <Command root command="netplan apply" />
        <Command command="ip route" output={`default via 192.168.1.1 dev enp3s0 proto static metric 100
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.100
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.101`} />
      </Terminal>

      <InfoBox type="tip" title="Sempre teste com netplan try">
        <code>netplan try</code> aplica e te dá 120s para confirmar. Se você
        ficou sem rede (e portanto sem SSH), em 2 minutos a configuração
        anterior volta automaticamente — salva-vidas em servidores remotos.
      </InfoBox>

      <h2>6. Múltiplas interfaces</h2>

      <File path="/etc/netplan/03-multi.yaml">
{`network:
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
`}
      </File>

      <h2>7. VLAN (802.1Q)</h2>

      <File path="/etc/netplan/04-vlan.yaml">
{`network:
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
`}
      </File>

      <Terminal title="wallyson@termux: ~">
        <Command root command="netplan apply" />
        <Command command="ip -br a" output={`lo               UNKNOWN        127.0.0.1/8 ::1/128
enp3s0           UP
vlan10@enp3s0    UP             192.168.10.5/24
vlan20@enp3s0    UP             192.168.20.5/24`} />
      </Terminal>

      <h2>8. Bond (link aggregation)</h2>

      <File path="/etc/netplan/05-bond.yaml">
{`network:
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
`}
      </File>

      <table>
        <thead><tr><th>Modo</th><th>O que faz</th></tr></thead>
        <tbody>
          <tr><td>active-backup</td><td>Apenas 1 escravo ativo; failover</td></tr>
          <tr><td>balance-rr</td><td>Round-robin, agrega banda (sem switch)</td></tr>
          <tr><td>balance-xor</td><td>Hash → escolhe escravo</td></tr>
          <tr><td>broadcast</td><td>Envia em todos (raro)</td></tr>
          <tr><td>802.3ad</td><td>LACP (precisa switch compatível)</td></tr>
          <tr><td>balance-tlb</td><td>Balanceia transmissão</td></tr>
          <tr><td>balance-alb</td><td>Balanceia tx + rx</td></tr>
        </tbody>
      </table>

      <h2>9. Bridge (para VMs e contêineres)</h2>

      <File path="/etc/netplan/06-bridge.yaml">
{`network:
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
`}
      </File>

      <p>
        Útil para conectar VMs (KVM/libvirt) ou contêineres (LXD) na mesma rede
        física da máquina host.
      </p>

      <h2>10. Wi-Fi (WPA2/WPA3-PSK)</h2>

      <File path="/etc/netplan/10-wifi.yaml">
{`network:
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
`}
      </File>

      <p>
        Em desktops com NetworkManager, prefira <code>nmcli</code> ou o applet
        gráfico — é mais prático.
      </p>

      <h2>11. Comandos do Netplan</h2>

      <Terminal title="wallyson@termux: ~">
        <Command root command="netplan generate" comment="Renderiza YAMLs em /run/systemd/network/ ou /run/NetworkManager/" />
        <Command root command="netplan apply" comment="Aplica de fato (reload do renderer)" />
        <Command root command="netplan try" comment="Aplica com rollback automático em 120s" />
        <Command root command="netplan try --timeout 60" comment="Customiza o timeout" />
        <Command command="netplan status --all" comment="Mostra estado atual de todas interfaces" output={`     Online state: online
    DNS Addresses: 127.0.0.53 (stub), 1.1.1.1
       DNS Search: casa.lan

●  2: enp3s0 ethernet UP (networkd: enp3s0)
        Addresses: 192.168.1.100/24
           Routes: default via 192.168.1.1`} />
        <Command command="netplan get ethernets.enp3s0.dhcp4" comment="Lê valor específico do YAML" output="true" />
        <Command root command="netplan set ethernets.enp3s0.dhcp4=false" comment="Edita por linha de comando" />
        <Command root command="netplan ip leases enp3s0" comment="Mostra lease DHCP atual" output={`# This is private data. Do not parse.
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
HOSTNAME=termux`} />
      </Terminal>

      <h2>12. Validando YAML</h2>

      <Terminal title="wallyson@termux: ~">
        <Command root command="netplan generate" comment="Erro de sintaxe será reportado aqui" output={`** (generate:2148): WARNING **: 14:51:02.412: Permissions for /etc/netplan/01-static.yaml are too open. Netplan configuration should NOT be accessible by others.
Error in network definition /etc/netplan/01-static.yaml line 7 column 14: expected mapping`} />
      </Terminal>

      <InfoBox type="danger" title="YAML é sensível a indentação">
        Use sempre <strong>2 espaços</strong> (nunca tab). Cada nível encadeia
        com 2 espaços a mais. Listas começam com <code>- </code>. Erro muito
        comum: misturar 4 espaços em um lugar e 2 em outro.
      </InfoBox>

      <h2>13. Trocando o renderer</h2>

      <p>
        Se você quer migrar do <code>NetworkManager</code> (desktop) para{" "}
        <code>networkd</code> (servidor) ou vice-versa, basta trocar o{" "}
        <code>renderer:</code> no YAML.
      </p>

      <Terminal title="wallyson@termux: ~">
        <Command root command="systemctl status systemd-networkd" output={`● systemd-networkd.service - Network Configuration
     Loaded: loaded (/lib/systemd/system/systemd-networkd.service; enabled)
     Active: active (running) since Sat 2025-04-12 13:42:11 -03; 1h 10min ago
       Docs: man:systemd-networkd.service(8)
   Main PID: 421 (systemd-network)
     Status: "Processing requests..."`} />
        <Command root command="systemctl status NetworkManager" output={`Unit NetworkManager.service could not be found.`} />
      </Terminal>

      <h2>14. Troubleshooting</h2>

      <table>
        <thead><tr><th>Sintoma</th><th>Solução</th></tr></thead>
        <tbody>
          <tr>
            <td>"netplan apply não fez nada"</td>
            <td>Rode <code>netplan --debug apply</code> e veja o que está sendo gerado.</td>
          </tr>
          <tr>
            <td>Servidor sem rede após apply</td>
            <td>Acesse via console; remova/edite o YAML; rode <code>netplan apply</code>. Sempre prefira <code>netplan try</code>!</td>
          </tr>
          <tr>
            <td>"Could not connect to system bus"</td>
            <td><code>systemctl restart systemd-networkd</code> e cheque <code>journalctl -u systemd-networkd -e</code>.</td>
          </tr>
          <tr>
            <td>Cloud-init sobrescreve sua config</td>
            <td>
              Crie <code>/etc/cloud/cloud.cfg.d/99-disable-network.cfg</code>{" "}
              com <code>{`network: {config: disabled}`}</code>.
            </td>
          </tr>
        </tbody>
      </table>

      <Terminal title="wallyson@termux: ~">
        <Command root command="netplan --debug apply" output={`** (generate:3211): DEBUG: 14:55:42.114: Processing input file /etc/netplan/50-cloud-init.yaml..
** (generate:3211): DEBUG: 14:55:42.115: starting new processing pass
** (generate:3211): DEBUG: 14:55:42.115: enp3s0: setting default backend to networkd
** (generate:3211): DEBUG: 14:55:42.115: Generating output files..
** (generate:3211): DEBUG: 14:55:42.116: networkd: definition enp3s0 is not for us (backend 1)
DEBUG:netplan generated networkd configuration changed, restarting networkd
DEBUG:no netplan generated NM configuration exists`} />
        <Command root command="journalctl -u systemd-networkd -n 30 --no-pager" comment="Logs do networkd" output={`abr 12 14:55:42 termux systemd[1]: Reloading systemd-networkd...
abr 12 14:55:42 termux systemd-networkd[421]: Loaded files: /run/systemd/network/10-netplan-enp3s0.network
abr 12 14:55:42 termux systemd-networkd[421]: enp3s0: Configured IP address 192.168.1.100/24
abr 12 14:55:42 termux systemd-networkd[421]: enp3s0: Gained carrier
abr 12 14:55:42 termux systemd-networkd[421]: enp3s0: Configured DHCPv4 lease
abr 12 14:55:42 termux systemd-networkd[421]: Reloaded.`} />
      </Terminal>

      <h2>15. Caso prático completo: servidor com bridge para libvirt</h2>

      <File path="/etc/netplan/99-server.yaml">
{`network:
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
`}
      </File>

      <Terminal title="wallyson@termux: ~">
        <Command root command="chmod 600 /etc/netplan/99-server.yaml" />
        <Command root command="netplan try" output="Configuration accepted." />
        <Command command="ip -br a" output={`lo               UNKNOWN        127.0.0.1/8 ::1/128
enp3s0           UP
br0              UP             192.168.1.100/24 fe80::a00:27ff:fe4b:891c/64`} />
        <Command command="bridge link" output={`6: enp3s0@br0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 master br0 state forwarding priority 32 cost 4`} />
      </Terminal>

      <p>
        A partir daqui, KVM/libvirt ou LXD podem usar <code>br0</code> como rede
        macvtap, dando IPs da LAN diretamente para as VMs/containers.
      </p>

      <InfoBox type="success" title="Resumo do Netplan">
        <ol>
          <li>Edite YAML em <code>/etc/netplan/</code> (perm 600).</li>
          <li>Sempre teste com <code>netplan try</code>.</li>
          <li>Use <code>netplan generate --debug</code> para depurar.</li>
          <li>Cuidado com indentação YAML.</li>
          <li>Em desktops, prefira NetworkManager + nmcli.</li>
        </ol>
      </InfoBox>
    </PageContainer>
  );
}

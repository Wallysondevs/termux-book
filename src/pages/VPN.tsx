import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function VPN() {
    return (
      <PageContainer
        title="VPN no Ubuntu"
        subtitle="Guia completo de VPN: instalar e configurar WireGuard, OpenVPN, conectar a VPNs corporativas, criar servidor VPN próprio."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <p>
          Uma <strong>VPN</strong> (Virtual Private Network) cria um túnel criptografado entre
          seu computador e um servidor, protegendo seu tráfego de rede. Usos comuns: acessar
          rede corporativa remotamente, proteger conexões em Wi-Fi público, acessar conteúdo
          geo-restrito e manter privacidade online.
        </p>

        <h2>1. WireGuard (Recomendado)</h2>
        <CodeBlock
          title="Instalar e configurar WireGuard"
          code={`# WireGuard é o protocolo VPN mais moderno:
  # - Mais rápido que OpenVPN
  # - Código mínimo (~4000 linhas vs ~100000 do OpenVPN)
  # - Integrado ao kernel Linux desde 5.6
  # - Criptografia state-of-the-art (ChaCha20, Curve25519)

  # Instalar WireGuard
  sudo apt install -y wireguard

  # === CONFIGURAR SERVIDOR VPN ===

  # Gerar par de chaves do servidor
  wg genkey | tee /etc/wireguard/server_private.key | wg pubkey > /etc/wireguard/server_public.key
  chmod 600 /etc/wireguard/server_private.key

  # Criar configuração do servidor
  sudo tee /etc/wireguard/wg0.conf > /dev/null << 'EOF'
  [Interface]
  Address = 10.0.0.1/24
  ListenPort = 51820
  PrivateKey = CHAVE_PRIVADA_DO_SERVIDOR

  # Habilitar NAT (para que clientes acessem a internet)
  PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
  PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

  # Cliente 1
  [Peer]
  PublicKey = CHAVE_PUBLICA_DO_CLIENTE
  AllowedIPs = 10.0.0.2/32
  EOF

  # Habilitar encaminhamento de pacotes
  echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p

  # Iniciar o WireGuard
  sudo wg-quick up wg0
  sudo systemctl enable wg-quick@wg0

  # Verificar status
  sudo wg show

  # === CONFIGURAR CLIENTE ===
  wg genkey | tee client_private.key | wg pubkey > client_public.key

  sudo tee /etc/wireguard/wg0.conf > /dev/null << 'EOF'
  [Interface]
  Address = 10.0.0.2/24
  PrivateKey = CHAVE_PRIVADA_DO_CLIENTE
  DNS = 1.1.1.1

  [Peer]
  PublicKey = CHAVE_PUBLICA_DO_SERVIDOR
  Endpoint = IP_DO_SERVIDOR:51820
  AllowedIPs = 0.0.0.0/0
  PersistentKeepalive = 25
  EOF

  # Conectar
  sudo wg-quick up wg0

  # Desconectar
  sudo wg-quick down wg0`}
        />

        <h2>2. OpenVPN</h2>
        <CodeBlock
          title="Instalar e usar OpenVPN"
          code={`# Instalar cliente OpenVPN
  sudo apt install -y openvpn

  # Conectar usando arquivo .ovpn (fornecido pela empresa/provedor)
  sudo openvpn --config arquivo.ovpn
  # Pede usuário e senha se configurado

  # Conectar em background
  sudo openvpn --config arquivo.ovpn --daemon

  # Via NetworkManager (interface gráfica)
  sudo apt install -y network-manager-openvpn-gnome
  # Reiniciar o NetworkManager:
  sudo systemctl restart NetworkManager
  # Configurações → Rede → VPN → Importar do arquivo

  # Verificar se está conectado
  ip addr show tun0    # Deve mostrar a interface tun0
  curl ifconfig.me     # Deve mostrar o IP do servidor VPN

  # Desconectar
  sudo killall openvpn`}
        />

        <h2>3. Conectar a VPNs Comerciais</h2>
        <CodeBlock
          title="Usar provedores VPN no Ubuntu"
          code={`# === NordVPN ===
  sh <(curl -sSf https://downloads.nordcdn.com/apps/linux/install.sh)
  nordvpn login
  nordvpn connect         # Servidor mais rápido
  nordvpn connect Brazil  # Servidor no Brasil
  nordvpn disconnect
  nordvpn status

  # === ProtonVPN ===
  # Instalar via repositório
  wget https://repo.protonvpn.com/debian/dists/stable/main/binary-all/protonvpn-stable-release_1.0.3-3_all.deb
  sudo dpkg -i protonvpn-stable-release_1.0.3-3_all.deb
  sudo apt update
  sudo apt install -y protonvpn-gnome-desktop
  # Abrir: ProtonVPN (aplicativo gráfico)

  # === VPN do trabalho (via NetworkManager) ===
  # Configurações → Rede → VPN → + Adicionar
  # Escolha o tipo: OpenVPN, WireGuard, L2TP, PPTP, IPSec
  # Importe o arquivo de configuração fornecido pelo TI

  # Instalar suporte a L2TP/IPSec
  sudo apt install -y network-manager-l2tp network-manager-l2tp-gnome

  # Via terminal com NetworkManager
  nmcli connection import type openvpn file config.ovpn
  nmcli connection up nome-da-vpn
  nmcli connection down nome-da-vpn`}
        />

        <h2>4. Firewall e Segurança</h2>
        <CodeBlock
          title="Configurar firewall para VPN"
          code={`# Abrir porta do WireGuard
  sudo ufw allow 51820/udp

  # Abrir porta do OpenVPN
  sudo ufw allow 1194/udp

  # Kill switch (bloquear internet se VPN cair)
  # Via UFW (WireGuard):
  sudo ufw default deny outgoing
  sudo ufw default deny incoming
  sudo ufw allow out on wg0     # Permitir tráfego pela VPN
  sudo ufw allow out to IP_DO_SERVIDOR port 51820 proto udp  # Permitir conexão ao servidor VPN
  sudo ufw allow out on lo      # Permitir loopback
  sudo ufw enable

  # Via iptables:
  iptables -A OUTPUT -o wg0 -j ACCEPT
  iptables -A OUTPUT -d IP_SERVIDOR -p udp --dport 51820 -j ACCEPT
  iptables -A OUTPUT -o lo -j ACCEPT
  iptables -A OUTPUT -j DROP

  # Verificar se DNS não está vazando (DNS leak)
  # Acesse: dnsleaktest.com
  # Se mostrar DNS do seu provedor real, há vazamento
  # Solução: Forçar DNS da VPN no WireGuard config:
  # DNS = 10.0.0.1 (DNS do servidor VPN)`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com VPN"
          code={`# VPN conecta mas não navega
  # 1. Verificar encaminhamento de pacotes no servidor:
  cat /proc/sys/net/ipv4/ip_forward    # Deve ser 1
  # 2. Verificar NAT no servidor:
  sudo iptables -t nat -L POSTROUTING
  # 3. Verificar DNS:
  resolvectl status

  # WireGuard: "RTNETLINK answers: Operation not permitted"
  # Solução: Usar sudo
  sudo wg-quick up wg0

  # OpenVPN: "TLS handshake failed"
  # Causa: Certificado expirado ou horário errado
  # Verificar horário:
  timedatectl

  # VPN lenta
  # WireGuard geralmente é mais rápido que OpenVPN
  # Testar velocidade:
  curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python3
  # Escolher servidor VPN mais próximo

  # Verificar se a VPN está funcionando
  curl ifconfig.me    # Deve mostrar IP do servidor VPN
  # Se mostrar seu IP real, a VPN não está roteando

  # DNS leak (vazamento de DNS)
  # Solução: Forçar DNS no cliente VPN
  # WireGuard: DNS = 1.1.1.1
  # OpenVPN: Adicionar ao .ovpn:
  # dhcp-option DNS 1.1.1.1`}
        />

        <AlertBox type="info" title="WireGuard vs OpenVPN">
          <strong>WireGuard</strong> é mais rápido, mais simples e mais seguro — use para novos
          setups. <strong>OpenVPN</strong> é mais maduro e tem mais opções de configuração —
          use quando a empresa exigir ou quando precisar de recursos avançados como autenticação
          por certificado com LDAP.
        </AlertBox>
      </PageContainer>
    );
  }
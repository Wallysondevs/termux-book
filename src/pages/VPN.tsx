import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function VPN() {
  return (
    <PageContainer
      title="VPN no Termux"
      subtitle="Por que VPNs reais (WireGuard/OpenVPN) não funcionam puro no Termux e quais são as alternativas: app Android nativo, sshuttle e túneis SSH."
      difficulty="intermediario"
      timeToRead="25 min"
    >
      <AlertBox type="danger" title="VPNs de kernel NÃO funcionam no Termux sem root">
        WireGuard, OpenVPN e qualquer VPN tradicional precisam criar uma interface{" "}
        <code>tun</code>/<code>tap</code> no kernel — e no Android isso só é permitido
        através da <strong>VpnService API</strong>, exclusiva para apps Android instalados
        via APK. O Termux <strong>não é um app de VPN</strong> e <strong>não tem root</strong>{" "}
        por padrão, então:
        <br />• <strong>Não</strong> use <code>pkg install wireguard</code> esperando um
        cliente funcional — esse pacote não existe e, mesmo se existisse, não conseguiria
        subir <code>wg0</code>.
        <br />• <strong>Não</strong> use <code>openvpn --config</code> — vai falhar com{" "}
        <em>"Cannot open TUN/TAP dev /dev/net/tun"</em>.
        <br />As alternativas reais estão abaixo: app Android oficial,{" "}
        <strong>sshuttle</strong> (VPN-poor-man via SSH) e port forwarding com SSH.
      </AlertBox>

      <h2>1. WireGuard / OpenVPN: use o app Android oficial</h2>
      <CodeBlock
        title="Aplicativos Android (Play Store / F-Droid)"
        code={`# WireGuard oficial (Google Play / F-Droid):
#   https://play.google.com/store/apps/details?id=com.wireguard.android
#   https://f-droid.org/packages/com.wireguard.android/

# OpenVPN para Android (de Arne Schwabe, F-Droid):
#   https://f-droid.org/packages/de.blinkt.openvpn/

# Esses apps usam a VpnService do Android e funcionam SEM root.
# Você importa o arquivo .conf (WireGuard) ou .ovpn (OpenVPN) e
# liga com um toque.

# COMO O TERMUX AJUDA:
# 1) Gerar chaves WireGuard offline (binário 'wg' do pacote 'wireguard-tools'):
pkg install -y wireguard-tools
wg genkey | tee privada.key | wg pubkey > publica.key
chmod 600 privada.key

# 2) Editar/gerar arquivos .conf que você importa no app:
nano cliente.conf
# [Interface]
# PrivateKey = <conteúdo de privada.key>
# Address    = 10.0.0.2/24
# DNS        = 1.1.1.1
#
# [Peer]
# PublicKey  = <chave_publica_do_servidor>
# Endpoint   = vpn.exemplo.com:51820
# AllowedIPs = 0.0.0.0/0

# 3) Mover para o storage e importar no app WireGuard
termux-setup-storage
mv cliente.conf $HOME/storage/shared/Download/`}
      />

      <h2>2. sshuttle — "VPN do pobre" via SSH (funciona no Termux com app companion)</h2>
      <AlertBox type="warning" title="Ainda exige VpnService">
        O <code>sshuttle</code> tradicional usa <code>iptables</code> e também precisa de
        permissões privilegiadas. No Android, a forma prática é usar o app{" "}
        <strong>"sshuttle-android"</strong> ou <strong>"SSHTunnel"</strong>, ou rodar o
        sshuttle dentro de uma distro via <code>proot-distro</code>{" "}
        <em>e</em> redirecionar manualmente. Para a maioria dos casos, basta SSH port
        forwarding (próxima seção).
      </AlertBox>
      <CodeBlock
        title="sshuttle dentro do proot-distro (cenário avançado)"
        code={`# 1) Instalar uma distro completa via proot
pkg install -y proot-distro
proot-distro install debian
proot-distro login debian

# 2) Dentro da distro
apt update && apt install -y sshuttle openssh-client

# 3) Encaminhar todo tráfego para uma rede via servidor SSH:
sshuttle -r usuario@servidor.exemplo.com 0/0
# (só os processos rodando DENTRO do proot vão pelo túnel —
# isso NÃO encaminha o tráfego do Android inteiro)`}
      />

      <h2>3. SSH Port Forwarding (a forma mais útil no Termux)</h2>
      <CodeBlock
        title="Tunelar portas específicas com OpenSSH (sem root, funciona puro no Termux)"
        code={`pkg install -y openssh

# === LOCAL FORWARDING ===
# Acessar um serviço da rede do servidor remoto como se fosse local.
# Ex.: PostgreSQL do servidor remoto disponível em localhost:5432 do celular
ssh -N -L 5432:localhost:5432 usuario@servidor.exemplo.com

# === REMOTE FORWARDING ===
# Expor um serviço do celular para o servidor remoto
# Ex.: app rodando na porta 3000 do Termux acessível em servidor:8080
ssh -N -R 8080:localhost:3000 usuario@servidor.exemplo.com

# === DYNAMIC FORWARDING (proxy SOCKS5) ===
# Cria um proxy SOCKS5 local (porta 1080); apps que aceitam SOCKS5
# (Firefox, curl --socks5, etc.) navegam pela conexão do servidor:
ssh -N -D 1080 usuario@servidor.exemplo.com

curl --socks5 localhost:1080 https://ifconfig.me
# Mostra o IP do servidor — você está "tunelado" pela conexão dele.

# Manter conexão estável
ssh -N -D 1080 -o ServerAliveInterval=60 -o ServerAliveCountMax=3 \\
    usuario@servidor.exemplo.com`}
      />

      <h2>4. Configurar um servidor WireGuard com a ajuda do Termux</h2>
      <CodeBlock
        title="Termux como console de administração (não como cliente)"
        code={`# O Termux é ótimo para gerar e distribuir configs WireGuard
# que serão consumidas por apps Android, roteadores ou PCs.

pkg install -y wireguard-tools qrencode

# Gerar par para o servidor
wg genkey | tee server.key | wg pubkey > server.pub

# Gerar par para o cliente
wg genkey | tee cliente.key | wg pubkey > cliente.pub

# Montar config do cliente
cat > cliente.conf <<EOF
[Interface]
PrivateKey = $(cat cliente.key)
Address    = 10.0.0.2/24
DNS        = 1.1.1.1

[Peer]
PublicKey  = $(cat server.pub)
Endpoint   = vpn.exemplo.com:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
EOF

# Gerar QR code (o app oficial WireGuard lê QR direto!)
qrencode -t ansiutf8 < cliente.conf
# escaneia com a câmera dentro do app WireGuard → importado em segundos`}
      />

      <h2>5. Verificar se você está mesmo tunelado</h2>
      <CodeBlock
        title="Conferência rápida"
        code={`# IP visto pela internet (deve ser do servidor VPN/proxy)
curl ifconfig.me

# Teste de DNS leak (mostra qual resolver está sendo usado)
curl https://1.1.1.1/cdn-cgi/trace

# Latência até o destino
ping -c 4 1.1.1.1`}
      />

      <AlertBox type="info" title="Resumo">
        <strong>VPN “de verdade” no celular = app Android nativo</strong> (WireGuard,
        OpenVPN Connect, ProtonVPN, NordVPN). O Termux entra como ferramenta para{" "}
        <em>gerar chaves</em>, <em>editar configs</em>, <em>servir QR codes</em> e fazer{" "}
        <em>port forwarding via SSH</em> — esses sim funcionam sem root.
      </AlertBox>
    </PageContainer>
  );
}

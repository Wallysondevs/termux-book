import{j as e}from"./index-BGu3owFd.js";import{P as r,I as s}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function c(){return e.jsxs(r,{title:"DNS — Resolução de Nomes no Termux",subtitle:"Guia completo de DNS: como funciona, configurar servidores DNS, systemd-resolved, dig, nslookup, hosts e DNS over HTTPS.",difficulty:"intermediario",timeToRead:"30 min",children:[e.jsx(s,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"/etc/resolv.conf"})," "," — "," ","servers."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"systemd-resolved"})," "," — "," ","daemon local."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"dig"})," "," — "," ","query."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"NetworkManager"})," "," — "," ","gerencia."]})]}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"DNS"})," (Domain Name System) é o sistema que traduz nomes de domínio (como ",e.jsx("code",{children:"google.com"}),") em endereços IP (como ",e.jsx("code",{children:"142.250.218.46"}),"). Sem DNS, você precisaria memorizar IPs para acessar qualquer site. No Termux, o ",e.jsx("strong",{children:"systemd-resolved"})," gerencia a resolução de nomes por padrão."]}),e.jsx("h2",{children:"1. Verificar e Configurar DNS"}),e.jsx(o,{title:"Gerenciar DNS no Termux",code:`# Ver o servidor DNS atual
  resolvectl status
  # Mostra o DNS de cada interface de rede

  # Ver o DNS de forma rápida
  resolvectl dns
  # Saída: Link 2 (enp0s3): 8.8.8.8 8.8.4.4

  # Testar resolução DNS
  dig google.com
  # Saída: google.com.  300  IN  A  142.250.218.46

  # Testar com servidor DNS específico
  dig @8.8.8.8 google.com
  dig @1.1.1.1 google.com

  # nslookup (mais simples)
  nslookup google.com
  nslookup google.com 8.8.8.8   # Usar DNS específico

  # host (ainda mais simples)
  host google.com
  host -t MX google.com    # Registros de email
  host -t NS google.com    # Servidores de nomes

  # === CONFIGURAR DNS PERMANENTEMENTE ===

  # Método 1: Via Netplan (recomendado para servidores)
  sudo nano /etc/netplan/01-network.yaml
  # Exemplo:
  # network:
  #   version: 2
  #   ethernets:
  #     enp0s3:
  #       dhcp4: true
  #       nameservers:
  #         addresses:
  #           - 8.8.8.8
  #           - 1.1.1.1
  #         search:
  #           - meudominio.com.br
  sudo netplan apply

  # Método 2: Via systemd-resolved
  sudo mkdir -p /etc/systemd/resolved.conf.d/
  sudo tee /etc/systemd/resolved.conf.d/dns.conf > /dev/null << 'EOF'
  [Resolve]
  DNS=8.8.8.8 1.1.1.1
  FallbackDNS=8.8.4.4 1.0.0.1
  DNSSEC=allow-downgrade
  DNSOverTLS=opportunistic
  EOF
  sudo systemctl restart systemd-resolved`}),e.jsx("h2",{children:"2. Servidores DNS Populares"}),e.jsx(o,{title:"Comparação de servidores DNS",code:`# === Google DNS ===
  # 8.8.8.8 e 8.8.4.4
  # Prós: Rápido, confiável, global
  # Contras: Google coleta dados de consulta

  # === Cloudflare DNS ===
  # 1.1.1.1 e 1.0.0.1
  # Prós: Mais rápido do mundo, foco em privacidade
  # Contras: Relativamente novo

  # === Quad9 ===
  # 9.9.9.9 e 149.112.112.112
  # Prós: Bloqueia domínios maliciosos automaticamente
  # Contras: Pode bloquear sites legítimos

  # === OpenDNS (Cisco) ===
  # 208.67.222.222 e 208.67.220.220
  # Prós: Filtro de conteúdo, segurança
  # Contras: Pode ser mais lento

  # Testar velocidade de cada DNS
  for dns in 8.8.8.8 1.1.1.1 9.9.9.9 208.67.222.222; do
    echo -n "DNS $dns: "
    dig @$dns google.com +stats | grep "Query time"
  done`}),e.jsx("h2",{children:"3. Arquivo /etc/hosts"}),e.jsx(o,{title:"Configurar resolução local com /etc/hosts",code:`# O arquivo /etc/hosts é consultado ANTES do DNS
  # Útil para: testes locais, bloquear sites, aliases

  sudo nano /etc/hosts

  # Formato: IP   hostname   [aliases]
  # Exemplos:
  127.0.0.1       localhost
  127.0.1.1       meu-computador
  192.168.1.100   servidor.local   servidor
  192.168.1.200   banco-de-dados.local   db

  # Bloquear sites (redirecionar para localhost)
  0.0.0.0     facebook.com
  0.0.0.0     www.facebook.com
  0.0.0.0     instagram.com
  0.0.0.0     www.instagram.com

  # Testar desenvolvimento local
  127.0.0.1   meusite.local
  127.0.0.1   api.meusite.local

  # Verificar se o /etc/hosts está funcionando
  ping servidor.local
  getent hosts servidor.local

  # Prioridade de resolução (em /etc/nsswitch.conf):
  # hosts: files mdns4_minimal [NOTFOUND=return] dns
  # "files" = /etc/hosts (consultado primeiro)
  # "dns" = servidor DNS (consultado depois)`}),e.jsx("h2",{children:"4. dig — Ferramenta de Diagnóstico DNS"}),e.jsx(o,{title:"Usar o dig para consultas DNS avançadas",code:`# Instalar (se necessário)
  pkg install -y dnsutils

  # Consulta básica
  dig exemplo.com

  # Tipos de registro:
  dig exemplo.com A          # IPv4
  dig exemplo.com AAAA       # IPv6
  dig exemplo.com MX         # Servidores de email
  dig exemplo.com NS         # Servidores de nomes
  dig exemplo.com TXT        # Registros de texto (SPF, DKIM, etc.)
  dig exemplo.com CNAME      # Alias
  dig exemplo.com SOA        # Start of Authority
  dig exemplo.com ANY        # Todos os registros

  # Consulta reversa (IP → domínio)
  dig -x 8.8.8.8
  # Saída: dns.google

  # Rastrear a resolução (mostra toda a cadeia DNS)
  dig +trace exemplo.com

  # Saída curta (apenas o resultado)
  dig +short exemplo.com
  # Saída: 93.184.216.34

  # Consultar sem cache (direto no autoritativo)
  dig +norecurse @a.root-servers.net exemplo.com

  # Ver TTL (tempo de cache)
  dig exemplo.com | grep -A1 "ANSWER SECTION"
  # O número antes de IN é o TTL em segundos

  # Verificar propagação DNS (após mudar registros)
  for dns in 8.8.8.8 1.1.1.1 9.9.9.9; do
    echo "DNS $dns:"
    dig @$dns +short meudominio.com.br
  done`}),e.jsx("h2",{children:"5. DNS over HTTPS (DoH) e DNS over TLS (DoT)"}),e.jsx(o,{title:"Configurar DNS criptografado",code:`# DNS tradicional é em texto plano — qualquer pessoa na rede pode ver
  # DoH e DoT criptografam as consultas DNS

  # Configurar DNS over TLS via systemd-resolved
  sudo tee /etc/systemd/resolved.conf.d/dot.conf > /dev/null << 'EOF'
  [Resolve]
  DNS=1.1.1.1#cloudflare-dns.com 1.0.0.1#cloudflare-dns.com
  DNSOverTLS=yes
  EOF
  sudo systemctl restart systemd-resolved

  # Verificar se DoT está funcionando
  resolvectl status | grep "DNS over TLS"

  # DNS over HTTPS no Firefox:
  # Configurações → Privacidade → DNS sobre HTTPS → Ativar
  # Provedor: Cloudflare ou NextDNS

  # Testar se DoH/DoT está funcionando:
  # Acesse: https://1.1.1.1/help (Cloudflare)
  # Ou: https://dnsleaktest.com`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(o,{title:"Problemas comuns com DNS",code:`# DNS não resolve (nenhum site abre)
  # 1. Verificar conectividade (sem DNS):
  ping -c 3 8.8.8.8   # Se funcionar, o problema é DNS
  # 2. Testar DNS manualmente:
  dig @8.8.8.8 google.com
  # 3. Verificar configuração:
  resolvectl status
  # 4. Reiniciar o serviço:
  sudo systemctl restart systemd-resolved

  # DNS lento
  # Mudar para DNS mais rápido (1.1.1.1 ou 8.8.8.8)
  # Verificar se não há DNS local com problema:
  resolvectl statistics

  # /etc/resolv.conf apontando para lugar errado
  ls -la /etc/resolv.conf
  # Deve ser link para: /run/systemd/resolve/stub-resolv.conf
  # Se não for:
  sudo ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf

  # Limpar cache DNS
  sudo resolvectl flush-caches
  # Verificar cache:
  sudo resolvectl statistics

  # Site específico não resolve (outros funcionam)
  # Testar com diferentes DNS:
  dig @8.8.8.8 site-problema.com
  dig @1.1.1.1 site-problema.com
  # Verificar /etc/hosts:
  grep site-problema /etc/hosts`}),e.jsxs(s,{type:"info",title:"DNS em servidores",children:["Para servidores que precisam de DNS próprio (resolver nomes internos), considere instalar o ",e.jsx("strong",{children:"Bind9"})," (servidor DNS completo) ou ",e.jsx("strong",{children:"dnsmasq"}),"(mais simples, bom para redes pequenas). Para apenas cache DNS local, o systemd-resolved já é suficiente."]})]})}export{c as default};

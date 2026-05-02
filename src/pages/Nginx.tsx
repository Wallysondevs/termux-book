import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Nginx() {
  return (
    <PageContainer
      title="Nginx no Termux — Servidor Web e Proxy Reverso"
      subtitle="Como instalar, configurar e servir sites com o Nginx rodando nativo no Termux (Android sem root)."
      difficulty="intermediario"
      timeToRead="30 min"
    >
      <p>
        O <strong>Nginx</strong> (pronuncia-se <em>engine-x</em>) é um servidor HTTP
        event-driven assíncrono famoso por consumir pouca memória e aguentar muitas
        conexões simultâneas. No Termux ele roda <strong>nativo</strong> (sem proot,
        sem container), perfeito pra servir arquivos estáticos, expor uma API local
        do celular ou usar como proxy reverso pra um Node/PHP rodando ao lado.
      </p>

      <AlertBox type="info" title="Caveats do Nginx no Termux">
        <ul>
          <li><strong>Portas &lt; 1024 não bindam sem root</strong>. No Android sem root, use porta <code>8080</code> (HTTP) e <code>8443</code> (HTTPS) em vez de <code>80</code> e <code>443</code>.</li>
          <li>Não existe <code>systemd</code>: você inicia o Nginx com <code>nginx</code> direto, ou via <code>sv</code> (runit) com <code>termux-services</code>.</li>
          <li>Config principal em <code>$PREFIX/etc/nginx/nginx.conf</code> (onde <code>$PREFIX = /data/data/com.termux/files/usr</code>).</li>
          <li>O <strong>IP do celular muda</strong> ao alternar entre Wi-Fi e dados móveis — não confie em IP fixo. Em rede móvel você fica atrás de NAT da operadora (CG-NAT) e geralmente não recebe conexão de fora.</li>
          <li>Não tem <code>www-data</code>, <code>sites-available</code>, <code>sudo</code> ou <code>UFW</code>. Tudo roda como o seu próprio usuário Termux.</li>
        </ul>
      </AlertBox>

      <h2>1. Instalação</h2>
      <CodeBlock
        title="Instalar Nginx no Termux"
        code={`# Atualiza repositórios
pkg update && pkg upgrade -y

# Instala o Nginx
pkg install -y nginx

# Confere a versão
nginx -v
# nginx version: nginx/1.27.x

# Mostra módulos compilados
nginx -V 2>&1 | tr ' ' '\\n' | grep -E '^--with'`}
      />

      <h2>2. Estrutura de diretórios no Termux</h2>
      <p>
        No Termux tudo vive dentro de <code>$PREFIX</code>. Não existem
        <code> /etc/nginx/sites-available </code> nem
        <code> /var/www/html</code>. A estrutura é minimalista:
      </p>
      <CodeBlock
        title="Onde mora o que"
        code={`# Configuração principal
$PREFIX/etc/nginx/nginx.conf

# Pasta padrão de servidor (DocumentRoot)
$PREFIX/share/nginx/html/

# Logs
$PREFIX/var/log/nginx/access.log
$PREFIX/var/log/nginx/error.log

# Binário
$PREFIX/bin/nginx

# Atalhos úteis
ls $PREFIX/etc/nginx/
ls $PREFIX/share/nginx/html/`}
      />

      <h2>3. Subir o Nginx (sem systemd)</h2>
      <CodeBlock
        title="Iniciar e parar manualmente"
        code={`# Inicia o Nginx (roda em background como daemon)
nginx

# Testa a config antes de qualquer reload
nginx -t

# Recarrega a config sem dropar conexões (SIGHUP)
nginx -s reload

# Parada graciosa (espera workers terminarem)
nginx -s quit

# Parada imediata
nginx -s stop

# Acesso local
curl http://localhost:8080`}
      />

      <AlertBox type="warning" title="Mude a porta default antes de subir">
        Por padrão o Nginx do Termux já vem configurado pra porta <strong>8080</strong>
        (justamente porque não dá pra bindar 80 sem root). Se você editar e tentar
        <code> listen 80;</code> sem root vai receber
        <code> bind() to 0.0.0.0:80 failed (13: Permission denied)</code>.
      </AlertBox>

      <h2>4. Rodar como serviço com termux-services</h2>
      <p>
        Pra subir o Nginx automaticamente quando você abrir o Termux, use o
        <code> termux-services</code> (runit):
      </p>
      <CodeBlock
        title="Configurar Nginx como serviço sv"
        code={`pkg install -y termux-services

# Reinicia a sessão Termux pra carregar o sv
exit
# (abra o Termux de novo)

# Habilita o serviço
sv-enable nginx

# Comandos do runit
sv up nginx       # inicia
sv down nginx     # para
sv restart nginx  # reinicia
sv status nginx   # status

# Logs do serviço
tail -f $PREFIX/var/log/sv/nginx/current`}
      />

      <h2>5. nginx.conf básico pra Termux</h2>
      <p>
        Aqui um <code>nginx.conf</code> mínimo, ajustado pra rodar sem root,
        servir estáticos e expor logs:
      </p>
      <CodeBlock
        title="$PREFIX/etc/nginx/nginx.conf"
        language="nginx"
        code={`worker_processes auto;
error_log /data/data/com.termux/files/usr/var/log/nginx/error.log;
pid       /data/data/com.termux/files/usr/var/run/nginx.pid;

events {
    worker_connections 512;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile      on;
    keepalive_timeout 65;
    server_tokens off;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml image/svg+xml;

    access_log /data/data/com.termux/files/usr/var/log/nginx/access.log;

    server {
        listen 8080;
        server_name _;

        root  /data/data/com.termux/files/usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }
}`}
      />
      <CodeBlock
        title="Aplicar"
        code={`nginx -t && nginx -s reload
curl -I http://localhost:8080`}
      />

      <h2>6. Servir um site estático</h2>
      <CodeBlock
        title="Sua primeira página"
        code={`mkdir -p $PREFIX/share/nginx/html
cat > $PREFIX/share/nginx/html/index.html <<'HTML'
<!doctype html>
<html lang="pt-BR">
  <head><meta charset="utf-8"><title>Servido do meu Android</title></head>
  <body>
    <h1>Olá do Termux!</h1>
    <p>Este HTML está sendo servido pelo Nginx rodando dentro do meu celular.</p>
  </body>
</html>
HTML

nginx -s reload
curl http://localhost:8080`}
      />

      <h2>7. Múltiplos "virtual hosts" (server blocks)</h2>
      <p>
        Não tem <code>sites-available/sites-enabled</code>, mas você pode
        criar uma pasta <code>conf.d/</code> e dar <code>include</code> nela:
      </p>
      <CodeBlock
        title="Adicionar conf.d/ ao nginx.conf"
        code={`mkdir -p $PREFIX/etc/nginx/conf.d

# Dentro do bloco http { ... } adicione:
#     include /data/data/com.termux/files/usr/etc/nginx/conf.d/*.conf;

nano $PREFIX/etc/nginx/nginx.conf`}
      />
      <CodeBlock
        title="$PREFIX/etc/nginx/conf.d/blog.conf"
        language="nginx"
        code={`server {
    listen 8080;
    server_name blog.local;

    root  /data/data/com.termux/files/home/sites/blog;
    index index.html;

    access_log /data/data/com.termux/files/usr/var/log/nginx/blog.access.log;
    error_log  /data/data/com.termux/files/usr/var/log/nginx/blog.error.log warn;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \\.(?:css|js|png|jpe?g|gif|svg|ico|woff2?)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}`}
      />
      <CodeBlock
        title="Testar com Host header"
        code={`mkdir -p ~/sites/blog
echo "<h1>Blog local</h1>" > ~/sites/blog/index.html
nginx -t && nginx -s reload

curl -H "Host: blog.local" http://localhost:8080`}
      />

      <h2>8. Modificadores de location</h2>
      <p>O <code>location</code> casa contra a URI da requisição. Os modificadores em ordem de prioridade:</p>
      <table>
        <thead>
          <tr><th>Modificador</th><th>Tipo de match</th><th>Exemplo</th></tr>
        </thead>
        <tbody>
          <tr><td><code>=</code></td><td>Exato</td><td><code>location = /</code></td></tr>
          <tr><td><code>^~</code></td><td>Prefixo (para a busca)</td><td><code>location ^~ /static/</code></td></tr>
          <tr><td><code>~</code></td><td>Regex case-sensitive</td><td><code>location ~ \.php$</code></td></tr>
          <tr><td><code>~*</code></td><td>Regex case-insensitive</td><td><code>location ~* \.(jpg|png)$</code></td></tr>
          <tr><td>(nenhum)</td><td>Prefixo simples</td><td><code>location /api</code></td></tr>
        </tbody>
      </table>

      <h2>9. Proxy reverso pra Node / Python / PHP</h2>
      <p>
        Cenário típico no Termux: você roda uma API (Node, Flask, FastAPI) na
        porta 3000 e quer expor por HTTP comum, com gzip e cache de estáticos.
      </p>
      <CodeBlock
        title="$PREFIX/etc/nginx/conf.d/api.conf"
        language="nginx"
        code={`server {
    listen 8080;
    server_name api.local;

    client_max_body_size 25m;
    proxy_connect_timeout 5s;
    proxy_read_timeout 60s;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket / SSE
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_buffering off;
    }
}`}
      />

      <h2>10. Acessar o servidor de outro dispositivo</h2>
      <CodeBlock
        title="Descobrir o IP do celular"
        code={`# IP da interface Wi-Fi (Android sem root só lê)
ifconfig 2>/dev/null | grep -A1 wlan
# ou
ip addr show wlan0 2>/dev/null | grep inet

# Pelo navegador de outro dispositivo na MESMA rede Wi-Fi:
# http://<ip-do-celular>:8080`}
      />
      <AlertBox type="warning" title="IP muda, e em rede móvel não funciona">
        O IP do celular muda quando você troca de Wi-Fi. Em rede de dados
        móveis (4G/5G), normalmente você fica atrás do CG-NAT da operadora e
        <strong> não recebe conexões externas</strong>. Pra expor pra internet
        use um túnel tipo <code>ngrok</code>, <code>cloudflared</code> ou
        <code> tailscale</code> (todos têm pacote no Termux ou rodam como
        binário ARM).
      </AlertBox>

      <h2>11. HTTPS no Termux</h2>
      <p>
        Você pode gerar um certificado autoassinado pra testes locais. Para
        Let's Encrypt válido você precisa expor o celular pra internet
        (via túnel) e usar o desafio DNS, já que a porta 80 não está
        disponível sem root.
      </p>
      <CodeBlock
        title="Certificado autoassinado"
        code={`pkg install -y openssl-tool

mkdir -p $PREFIX/etc/nginx/ssl
cd $PREFIX/etc/nginx/ssl

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\
  -keyout selfsigned.key -out selfsigned.crt \\
  -subj "/CN=meu-termux"`}
      />
      <CodeBlock
        title="server block com TLS na porta 8443"
        language="nginx"
        code={`server {
    listen 8443 ssl;
    server_name _;

    ssl_certificate     /data/data/com.termux/files/usr/etc/nginx/ssl/selfsigned.crt;
    ssl_certificate_key /data/data/com.termux/files/usr/etc/nginx/ssl/selfsigned.key;
    ssl_protocols       TLSv1.2 TLSv1.3;

    root  /data/data/com.termux/files/usr/share/nginx/html;
    index index.html;
}`}
      />
      <CodeBlock
        title="Testar"
        code={`nginx -t && nginx -s reload
curl -k https://localhost:8443`}
      />

      <h2>12. Logs e troubleshooting</h2>
      <CodeBlock
        title="Acompanhar requisições e erros"
        code={`tail -f $PREFIX/var/log/nginx/access.log
tail -f $PREFIX/var/log/nginx/error.log

# Quem está usando a porta 8080?
pkg install -y termux-tools
netstat -tlnp 2>/dev/null | grep 8080

# Testar config sem aplicar
nginx -t

# Mostrar a config completa já com includes resolvidos
nginx -T | less`}
      />

      <AlertBox type="danger" title="Erros típicos no Termux">
        <ul>
          <li><code>bind() to 0.0.0.0:80 failed (13: Permission denied)</code> → use porta &gt;= 1024.</li>
          <li><code>open() "/var/log/nginx/error.log" failed (2: No such file)</code> → você está usando paths absolutos do Linux. Troque por <code>$PREFIX/var/log/nginx/...</code> (caminho completo).</li>
          <li><code>nginx: [emerg] getpwnam("www-data") failed</code> → remova a diretiva <code>user www-data;</code>; no Termux não existe esse usuário.</li>
        </ul>
      </AlertBox>

      <h2>13. Manter o Nginx rodando com a tela apagada</h2>
      <p>
        O Android pode matar processos quando o aparelho fica em standby. Pra
        evitar, instale o app companion <strong>Termux:Boot</strong> e use o
        <code> termux-wake-lock</code>:
      </p>
      <CodeBlock
        title="Wake lock + boot"
        code={`# Mantém o Termux ativo (impede o Android de matar processos)
termux-wake-lock

# Para liberar
termux-wake-unlock

# Pra subir o Nginx automaticamente no boot:
# 1. Instale o app Termux:Boot na F-Droid/Play
# 2. Crie o script
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/start-nginx <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock
nginx
EOF
chmod +x ~/.termux/boot/start-nginx`}
      />

      <AlertBox type="info" title="Quando faz sentido rodar Nginx no Termux">
        Casos legítimos: servir um site estático pra rede local (LAN party,
        apresentação rápida), expor uma API de teste pro VS Code do PC,
        rodar uma dashboard de IoT do próprio celular, ou estudar configuração
        de servidor sem precisar de uma VM. Pra <strong>produção real</strong>,
        um VPS de R$ 20/mês é mais saudável que deixar o celular ligado 24/7.
      </AlertBox>
    </PageContainer>
  );
}

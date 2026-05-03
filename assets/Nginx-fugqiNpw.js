import{j as e}from"./index-BGu3owFd.js";import{P as i,I as r}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function l(){return e.jsxs(i,{title:"Nginx no Termux — Servidor Web e Proxy Reverso",subtitle:"Como instalar, configurar e servir sites com o Nginx rodando nativo no Termux (Android sem root).",difficulty:"intermediario",timeToRead:"30 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"nginx"})," "," — "," ","web server / proxy."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"/etc/nginx/sites-available/"})," "," — "," ","vhosts."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"nginx -t"})," "," — "," ","testa config."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"systemctl"})," "," — "," ","start/enable."]})]}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Nginx"})," (pronuncia-se ",e.jsx("em",{children:"engine-x"}),") é um servidor HTTP event-driven assíncrono famoso por consumir pouca memória e aguentar muitas conexões simultâneas. No Termux ele roda ",e.jsx("strong",{children:"nativo"})," (sem proot, sem container), perfeito pra servir arquivos estáticos, expor uma API local do celular ou usar como proxy reverso pra um Node/PHP rodando ao lado."]}),e.jsx(r,{type:"info",title:"Caveats do Nginx no Termux",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Portas < 1024 não bindam sem root"}),". No Android sem root, use porta ",e.jsx("code",{children:"8080"})," (HTTP) e ",e.jsx("code",{children:"8443"})," (HTTPS) em vez de ",e.jsx("code",{children:"80"})," e ",e.jsx("code",{children:"443"}),"."]}),e.jsxs("li",{children:["Não existe ",e.jsx("code",{children:"systemd"}),": você inicia o Nginx com ",e.jsx("code",{children:"nginx"})," direto, ou via ",e.jsx("code",{children:"sv"})," (runit) com ",e.jsx("code",{children:"termux-services"}),"."]}),e.jsxs("li",{children:["Config principal em ",e.jsx("code",{children:"$PREFIX/etc/nginx/nginx.conf"})," (onde ",e.jsx("code",{children:"$PREFIX = /data/data/com.termux/files/usr"}),")."]}),e.jsxs("li",{children:["O ",e.jsx("strong",{children:"IP do celular muda"})," ao alternar entre Wi-Fi e dados móveis — não confie em IP fixo. Em rede móvel você fica atrás de NAT da operadora (CG-NAT) e geralmente não recebe conexão de fora."]}),e.jsxs("li",{children:["Não tem ",e.jsx("code",{children:"www-data"}),", ",e.jsx("code",{children:"sites-available"}),", ",e.jsx("code",{children:"sudo"})," ou ",e.jsx("code",{children:"UFW"}),". Tudo roda como o seu próprio usuário Termux."]})]})}),e.jsx("h2",{children:"1. Instalação"}),e.jsx(o,{title:"Instalar Nginx no Termux",code:`# Atualiza repositórios
pkg update && pkg upgrade -y

# Instala o Nginx
pkg install -y nginx

# Confere a versão
nginx -v
# nginx version: nginx/1.27.x

# Mostra módulos compilados
nginx -V 2>&1 | tr ' ' '\\n' | grep -E '^--with'`}),e.jsx("h2",{children:"2. Estrutura de diretórios no Termux"}),e.jsxs("p",{children:["No Termux tudo vive dentro de ",e.jsx("code",{children:"$PREFIX"}),". Não existem",e.jsx("code",{children:" /etc/nginx/sites-available "})," nem",e.jsx("code",{children:" /var/www/html"}),". A estrutura é minimalista:"]}),e.jsx(o,{title:"Onde mora o que",code:`# Configuração principal
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
ls $PREFIX/share/nginx/html/`}),e.jsx("h2",{children:"3. Subir o Nginx (sem systemd)"}),e.jsx(o,{title:"Iniciar e parar manualmente",code:`# Inicia o Nginx (roda em background como daemon)
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
curl http://localhost:8080`}),e.jsxs(r,{type:"warning",title:"Mude a porta default antes de subir",children:["Por padrão o Nginx do Termux já vem configurado pra porta ",e.jsx("strong",{children:"8080"}),"(justamente porque não dá pra bindar 80 sem root). Se você editar e tentar",e.jsx("code",{children:" listen 80;"})," sem root vai receber",e.jsx("code",{children:" bind() to 0.0.0.0:80 failed (13: Permission denied)"}),"."]}),e.jsx("h2",{children:"4. Rodar como serviço com termux-services"}),e.jsxs("p",{children:["Pra subir o Nginx automaticamente quando você abrir o Termux, use o",e.jsx("code",{children:" termux-services"})," (runit):"]}),e.jsx(o,{title:"Configurar Nginx como serviço sv",code:`pkg install -y termux-services

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
tail -f $PREFIX/var/log/sv/nginx/current`}),e.jsx("h2",{children:"5. nginx.conf básico pra Termux"}),e.jsxs("p",{children:["Aqui um ",e.jsx("code",{children:"nginx.conf"})," mínimo, ajustado pra rodar sem root, servir estáticos e expor logs:"]}),e.jsx(o,{title:"$PREFIX/etc/nginx/nginx.conf",language:"nginx",code:`worker_processes auto;
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
}`}),e.jsx(o,{title:"Aplicar",code:`nginx -t && nginx -s reload
curl -I http://localhost:8080`}),e.jsx("h2",{children:"6. Servir um site estático"}),e.jsx(o,{title:"Sua primeira página",code:`mkdir -p $PREFIX/share/nginx/html
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
curl http://localhost:8080`}),e.jsx("h2",{children:'7. Múltiplos "virtual hosts" (server blocks)'}),e.jsxs("p",{children:["Não tem ",e.jsx("code",{children:"sites-available/sites-enabled"}),", mas você pode criar uma pasta ",e.jsx("code",{children:"conf.d/"})," e dar ",e.jsx("code",{children:"include"})," nela:"]}),e.jsx(o,{title:"Adicionar conf.d/ ao nginx.conf",code:`mkdir -p $PREFIX/etc/nginx/conf.d

# Dentro do bloco http { ... } adicione:
#     include /data/data/com.termux/files/usr/etc/nginx/conf.d/*.conf;

nano $PREFIX/etc/nginx/nginx.conf`}),e.jsx(o,{title:"$PREFIX/etc/nginx/conf.d/blog.conf",language:"nginx",code:`server {
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
}`}),e.jsx(o,{title:"Testar com Host header",code:`mkdir -p ~/sites/blog
echo "<h1>Blog local</h1>" > ~/sites/blog/index.html
nginx -t && nginx -s reload

curl -H "Host: blog.local" http://localhost:8080`}),e.jsx("h2",{children:"8. Modificadores de location"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"location"})," casa contra a URI da requisição. Os modificadores em ordem de prioridade:"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Modificador"}),e.jsx("th",{children:"Tipo de match"}),e.jsx("th",{children:"Exemplo"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"="})}),e.jsx("td",{children:"Exato"}),e.jsx("td",{children:e.jsx("code",{children:"location = /"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"^~"})}),e.jsx("td",{children:"Prefixo (para a busca)"}),e.jsx("td",{children:e.jsx("code",{children:"location ^~ /static/"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"~"})}),e.jsx("td",{children:"Regex case-sensitive"}),e.jsx("td",{children:e.jsx("code",{children:"location ~ \\.php$"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"~*"})}),e.jsx("td",{children:"Regex case-insensitive"}),e.jsx("td",{children:e.jsx("code",{children:"location ~* \\.(jpg|png)$"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"(nenhum)"}),e.jsx("td",{children:"Prefixo simples"}),e.jsx("td",{children:e.jsx("code",{children:"location /api"})})]})]})]}),e.jsx("h2",{children:"9. Proxy reverso pra Node / Python / PHP"}),e.jsx("p",{children:"Cenário típico no Termux: você roda uma API (Node, Flask, FastAPI) na porta 3000 e quer expor por HTTP comum, com gzip e cache de estáticos."}),e.jsx(o,{title:"$PREFIX/etc/nginx/conf.d/api.conf",language:"nginx",code:`server {
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
}`}),e.jsx("h2",{children:"10. Acessar o servidor de outro dispositivo"}),e.jsx(o,{title:"Descobrir o IP do celular",code:`# IP da interface Wi-Fi (Android sem root só lê)
ifconfig 2>/dev/null | grep -A1 wlan
# ou
ip addr show wlan0 2>/dev/null | grep inet

# Pelo navegador de outro dispositivo na MESMA rede Wi-Fi:
# http://<ip-do-celular>:8080`}),e.jsxs(r,{type:"warning",title:"IP muda, e em rede móvel não funciona",children:["O IP do celular muda quando você troca de Wi-Fi. Em rede de dados móveis (4G/5G), normalmente você fica atrás do CG-NAT da operadora e",e.jsx("strong",{children:" não recebe conexões externas"}),". Pra expor pra internet use um túnel tipo ",e.jsx("code",{children:"ngrok"}),", ",e.jsx("code",{children:"cloudflared"})," ou",e.jsx("code",{children:" tailscale"})," (todos têm pacote no Termux ou rodam como binário ARM)."]}),e.jsx("h2",{children:"11. HTTPS no Termux"}),e.jsx("p",{children:"Você pode gerar um certificado autoassinado pra testes locais. Para Let's Encrypt válido você precisa expor o celular pra internet (via túnel) e usar o desafio DNS, já que a porta 80 não está disponível sem root."}),e.jsx(o,{title:"Certificado autoassinado",code:`pkg install -y openssl-tool

mkdir -p $PREFIX/etc/nginx/ssl
cd $PREFIX/etc/nginx/ssl

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\
  -keyout selfsigned.key -out selfsigned.crt \\
  -subj "/CN=meu-termux"`}),e.jsx(o,{title:"server block com TLS na porta 8443",language:"nginx",code:`server {
    listen 8443 ssl;
    server_name _;

    ssl_certificate     /data/data/com.termux/files/usr/etc/nginx/ssl/selfsigned.crt;
    ssl_certificate_key /data/data/com.termux/files/usr/etc/nginx/ssl/selfsigned.key;
    ssl_protocols       TLSv1.2 TLSv1.3;

    root  /data/data/com.termux/files/usr/share/nginx/html;
    index index.html;
}`}),e.jsx(o,{title:"Testar",code:`nginx -t && nginx -s reload
curl -k https://localhost:8443`}),e.jsx("h2",{children:"12. Logs e troubleshooting"}),e.jsx(o,{title:"Acompanhar requisições e erros",code:`tail -f $PREFIX/var/log/nginx/access.log
tail -f $PREFIX/var/log/nginx/error.log

# Quem está usando a porta 8080?
pkg install -y termux-tools
netstat -tlnp 2>/dev/null | grep 8080

# Testar config sem aplicar
nginx -t

# Mostrar a config completa já com includes resolvidos
nginx -T | less`}),e.jsx(r,{type:"danger",title:"Erros típicos no Termux",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"bind() to 0.0.0.0:80 failed (13: Permission denied)"})," → use porta >= 1024."]}),e.jsxs("li",{children:[e.jsx("code",{children:'open() "/var/log/nginx/error.log" failed (2: No such file)'})," → você está usando paths absolutos do Linux. Troque por ",e.jsx("code",{children:"$PREFIX/var/log/nginx/..."})," (caminho completo)."]}),e.jsxs("li",{children:[e.jsx("code",{children:'nginx: [emerg] getpwnam("www-data") failed'})," → remova a diretiva ",e.jsx("code",{children:"user www-data;"}),"; no Termux não existe esse usuário."]})]})}),e.jsx("h2",{children:"13. Manter o Nginx rodando com a tela apagada"}),e.jsxs("p",{children:["O Android pode matar processos quando o aparelho fica em standby. Pra evitar, instale o app companion ",e.jsx("strong",{children:"Termux:Boot"})," e use o",e.jsx("code",{children:" termux-wake-lock"}),":"]}),e.jsx(o,{title:"Wake lock + boot",code:`# Mantém o Termux ativo (impede o Android de matar processos)
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
chmod +x ~/.termux/boot/start-nginx`}),e.jsxs(r,{type:"info",title:"Quando faz sentido rodar Nginx no Termux",children:["Casos legítimos: servir um site estático pra rede local (LAN party, apresentação rápida), expor uma API de teste pro VS Code do PC, rodar uma dashboard de IoT do próprio celular, ou estudar configuração de servidor sem precisar de uma VM. Pra ",e.jsx("strong",{children:"produção real"}),", um VPS de R$ 20/mês é mais saudável que deixar o celular ligado 24/7."]})]})}export{l as default};

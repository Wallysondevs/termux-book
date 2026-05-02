import{j as e}from"./index-d-w5ROEn.js";import{P as i}from"./PageContainer-t8f2nTRw.js";import{T as r,C as o,F as s,O as t}from"./Terminal-B39pZIiO.js";import{I as n}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function x(){return e.jsxs(i,{title:"Nginx — Servidor Web e Proxy Reverso",subtitle:"Guia completo do Nginx no Termux 0.118: instalar, server blocks, SSL/TLS com Let's Encrypt, proxy reverso, gzip, HTTP/2, hardening e logs.",difficulty:"intermediario",timeToRead:"55 min",category:"Servidores Web",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Nginx"})," (pronuncia-se ",e.jsx("em",{children:"engine-x"}),") foi escrito em 2002 por Igor Sysoev para resolver o ",e.jsx("strong",{children:"problema C10K"})," (atender 10 mil conexões concorrentes em um único servidor). Ao contrário do Apache, que historicamente usava um processo/thread por conexão, o Nginx adota uma arquitetura ",e.jsx("strong",{children:"event-driven assíncrona"}),": um pequeno número de processos ",e.jsx("em",{children:"worker"})," consegue manipular dezenas de milhares de conexões simultâneas com pouquíssima memória."]}),e.jsxs("p",{children:["Hoje o Nginx é o servidor web mais utilizado do planeta segundo o W3Techs, presente em sites como Netflix, Cloudflare, WordPress.com, Dropbox e GitHub. Ele acumula três papéis principais: ",e.jsx("strong",{children:"servidor HTTP estático"}),", ",e.jsx("strong",{children:"proxy reverso"}),"(terminando TLS na borda e encaminhando para Node, Python, PHP-FPM, etc.) e",e.jsx("strong",{children:" load balancer L7"})," (distribuindo tráfego entre instâncias)."]}),e.jsxs(n,{type:"info",title:"Versões disponíveis no Termux 0.118 (Noble)",children:["O repositório oficial entrega o pacote ",e.jsx("code",{children:"nginx"})," na série ",e.jsx("strong",{children:"1.24.x"}),"(mainline estável). Para versões mais novas (1.25+, 1.27 mainline) use o repositório oficial em ",e.jsx("code",{children:"nginx.org/packages/termux"}),". Para a maioria dos casos de produção, o pacote do Termux é mais que suficiente."]}),e.jsx("h2",{children:"1. Instalação e primeiro contato"}),e.jsxs("p",{children:["Termux 0.118 traz o Nginx pré-empacotado em quatro variantes: ",e.jsx("code",{children:"nginx-core"}),"(módulos básicos), ",e.jsx("code",{children:"nginx-full"})," (com mail, image filter, geoip2),",e.jsx("code",{children:"nginx-light"})," (módulos mínimos) e ",e.jsx("code",{children:"nginx-extras"})," (Lua, perl, modsecurity). O metapacote ",e.jsx("code",{children:"nginx"})," instala ",e.jsx("code",{children:"nginx-core"}),"."]}),e.jsxs(r,{title:"wallyson@termux: ~",children:[e.jsx(o,{root:!0,command:"pkg update && pkg install -y nginx",comment:"Instala o pacote nginx-core e abre as portas 80/443 via UFW (se ativo)",output:`Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  fontconfig-config fonts-dejavu-core libdeflate0 libfontconfig1 libjbig0
  libjpeg-turbo8 libjpeg8 libnginx-mod-http-geoip2 libnginx-mod-http-image-filter
  libnginx-mod-http-xslt-filter libnginx-mod-mail libnginx-mod-stream
  libnginx-mod-stream-geoip2 libtiff6 libwebp7 libxpm4 nginx-common nginx-core
Suggested packages:
  libgd-tools fcgiwrap nginx-doc ssl-cert
The following NEW packages will be installed:
  fontconfig-config fonts-dejavu-core libdeflate0 libfontconfig1 libjbig0
  libjpeg-turbo8 libjpeg8 libnginx-mod-http-geoip2 libnginx-mod-http-image-filter
  libnginx-mod-http-xslt-filter libnginx-mod-mail libnginx-mod-stream
  libnginx-mod-stream-geoip2 libtiff6 libwebp7 libxpm4 nginx nginx-common nginx-core
0 upgraded, 19 newly installed, 0 to remove and 0 not upgraded.
Need to get 2.864 kB of archives.
After this operation, 8.974 kB of additional disk space will be used.
Get:1 http://packages.termux.dev/apt/termux-main noble/main amd64 fonts-dejavu-core all 2.37-8 [1.041 kB]
Get:2 http://packages.termux.dev/apt/termux-main noble/main amd64 nginx-common all 1.24.0-termux [40,8 kB]
Get:3 http://packages.termux.dev/apt/termux-main noble/main amd64 nginx-core amd64 1.24.0-termux [501 kB]
...
Setting up nginx-common (1.24.0-termux) ...
Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /lib/systemd/system/nginx.service.
Setting up nginx-core (1.24.0-termux) ...
Setting up nginx (1.24.0-termux) ...
Processing triggers for man-db (2.12.0-4build2) ...
Processing triggers for ufw (0.36.2-6) ...`}),e.jsx(o,{command:"nginx -v",comment:"Mostra versão (vai para STDERR)",output:"nginx version: nginx/1.24.0 (Termux)"}),e.jsx(o,{command:"nginx -V 2>&1 | tr ' ' '\\\\n' | head -25",comment:"-V exibe TODOS os módulos compilados; use para descobrir se um módulo opcional já vem pronto",output:`nginx
version:
nginx/1.24.0
(Termux)
built
with
OpenSSL
3.0.13
30
Jan
2024
TLS
SNI
support
enabled
configure
arguments:
--with-cc-opt=-g
-O2
-Werror=implicit-function-declaration
-fno-strict-aliasing
-fstack-protector-strong`}),e.jsx(o,{root:!0,command:"systemctl status nginx --no-pager",output:`● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; preset: enabled)
     Active: active (running) since Sat 2025-04-12 14:23:11 -03; 12s ago
       Docs: man:nginx(8)
    Process: 4521 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
    Process: 4522 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
   Main PID: 4523 (nginx)
      Tasks: 5 (limit: 9265)
     Memory: 5.4M (peak: 6.1M)
        CPU: 38ms
     CGroup: /system.slice/nginx.service
             ├─4523 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             ├─4524 "nginx: worker process"
             ├─4525 "nginx: worker process"
             ├─4526 "nginx: worker process"
             └─4527 "nginx: worker process"

abr 12 14:23:11 termux systemd[1]: Starting nginx.service - A high performance web server...
abr 12 14:23:11 termux systemd[1]: Started nginx.service - A high performance web server...`}),e.jsx(o,{command:"curl -I http://localhost",comment:"-I faz HEAD; ótimo para inspecionar headers",output:`HTTP/1.1 200 OK
Server: nginx/1.24.0 (Termux)
Date: Sat, 12 Apr 2025 17:23:42 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Tue, 12 Mar 2024 13:52:18 GMT
Connection: keep-alive
ETag: "65f0a932-267"
Accept-Ranges: bytes`})]}),e.jsx("h3",{children:"1.1 Estrutura de diretórios"}),e.jsxs("p",{children:["Diferente do upstream (que coloca tudo em ",e.jsx("code",{children:"/etc/nginx/nginx.conf"}),"), o empacotamento Debian/Termux segue a convenção ",e.jsx("code",{children:"sites-available"})," /",e.jsx("code",{children:"sites-enabled"}),", idêntica à do Apache."]}),e.jsxs(r,{children:[e.jsx(o,{command:"tree -L 2 /etc/nginx",output:`/etc/nginx
├── conf.d                       # configs adicionais (incluídas globalmente)
├── fastcgi.conf                 # parâmetros FastCGI (PHP-FPM)
├── fastcgi_params               # idem (versão sem SCRIPT_FILENAME)
├── koi-utf
├── koi-win
├── mime.types                   # mapa extensão→MIME (cobre 800+ tipos)
├── modules-available
├── modules-enabled              # módulos dinâmicos ativos (.conf)
│   ├── 50-mod-http-geoip2.conf
│   ├── 50-mod-http-image-filter.conf
│   └── 50-mod-stream.conf
├── nginx.conf                   # arquivo MASTER
├── proxy_params                 # X-Forwarded-* prontos
├── scgi_params
├── sites-available              # virtual hosts (definidos)
│   └── default
├── sites-enabled                # virtual hosts (ativos = symlinks)
│   └── default -> /etc/nginx/sites-available/default
├── snippets                     # trechos reusáveis (snakeoil, fastcgi-php)
│   ├── fastcgi-php.conf
│   └── snakeoil.conf
├── uwsgi_params
└── win-utf

5 directories, 14 files`}),e.jsx(o,{command:"ls -la /var/www/html/ /var/log/nginx/",output:`/var/log/nginx/:
total 16
drwxr-x---  2 www-data adm  4096 abr 12 14:23 .
drwxrwxr-x 14 root     syslog 4096 abr 12 14:23 ..
-rw-r-----  1 www-data adm   612 abr 12 14:30 access.log
-rw-r-----  1 www-data adm     0 abr 12 14:23 error.log

/var/www/html/:
total 12
drwxr-xr-x 2 root root 4096 abr 12 14:23 .
drwxr-xr-x 3 root root 4096 abr 12 14:23 ..
-rw-r--r-- 1 root root  615 abr 12 14:23 index.nginx-debian.html`})]}),e.jsxs(n,{type:"tip",title:"Onde colocar suas mudanças",children:["Não edite ",e.jsx("code",{children:"/etc/nginx/nginx.conf"})," a menos que esteja ajustando parâmetros globais (workers, gzip, log_format). Cada site deve ter seu próprio arquivo em",e.jsx("code",{children:"/etc/nginx/sites-available/<dominio>"})," e ser ativado via symlink em",e.jsx("code",{children:"sites-enabled/"}),"."]}),e.jsxs("h2",{children:["2. Anatomia do ",e.jsx("code",{children:"nginx.conf"})]}),e.jsxs("p",{children:["O arquivo principal é dividido em ",e.jsx("strong",{children:"contextos"})," (blocos delimitados por chaves) que herdam diretivas hierarquicamente: ",e.jsx("code",{children:"main"})," → ",e.jsx("code",{children:"events"}),"→ ",e.jsx("code",{children:"http"})," → ",e.jsx("code",{children:"server"})," → ",e.jsx("code",{children:"location"}),"."]}),e.jsx(s,{path:"/etc/nginx/nginx.conf",children:`user www-data;                          # usuário dos workers (não muda em prod)
worker_processes auto;                  # 1 por core; "auto" = número de CPUs
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;             # conexões POR worker (768 * 4 cores = 3072)
    # multi_accept on;                  # aceita múltiplas conexões num evento
}

http {
    ##
    # Basic Settings
    ##
    sendfile on;                        # zero-copy via syscall sendfile()
    tcp_nopush on;                      # envia headers num único pacote
    tcp_nodelay on;                     # desativa Nagle (latência baixa)
    types_hash_max_size 2048;
    server_tokens off;                  # NÃO exponha "nginx/1.24.0" no header Server
    server_names_hash_bucket_size 128;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ##
    # SSL Settings
    ##
    ssl_protocols TLSv1.2 TLSv1.3;      # desativa SSLv3, TLSv1.0, 1.1
    ssl_prefer_server_ciphers on;

    ##
    # Logging Settings
    ##
    access_log /var/log/nginx/access.log;

    ##
    # Gzip Settings
    ##
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss text/javascript
               image/svg+xml;

    ##
    # Virtual Host Configs
    ##
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}`}),e.jsx("h3",{children:"2.1 Comandos essenciais para gerenciar"}),e.jsxs(r,{children:[e.jsx(o,{root:!0,command:"nginx -t",comment:"SEMPRE rode antes de reload!",output:`nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful`}),e.jsx(o,{root:!0,command:"nginx -T | head -40",comment:"-T testa E imprime config completa (todos includes resolvidos)"}),e.jsx(o,{root:!0,command:"systemctl reload nginx",comment:"reload = SIGHUP, sem dropar conexões. Use isso, NUNCA restart em produção."}),e.jsx(o,{root:!0,command:"nginx -s reload",comment:"equivalente, mais portável"}),e.jsx(o,{root:!0,command:"nginx -s stop",comment:"parada imediata (TERM)"}),e.jsx(o,{root:!0,command:"nginx -s quit",comment:"parada graciosa (espera workers terminarem)"}),e.jsx(o,{root:!0,command:"nginx -s reopen",comment:"reabre arquivos de log (útil após logrotate)"})]}),e.jsx("h2",{children:"3. Server Blocks (Virtual Hosts)"}),e.jsxs("p",{children:["Vamos servir dois sites no mesmo IP, distinguindo pelo cabeçalho ",e.jsx("code",{children:"Host"})," da requisição: ",e.jsx("code",{children:"blog.exemplo.com.br"})," e ",e.jsx("code",{children:"api.exemplo.com.br"}),"."]}),e.jsxs(r,{children:[e.jsx(o,{root:!0,command:"mkdir -p /var/www/blog.exemplo.com.br/html"}),e.jsx(o,{root:!0,command:"chown -R www-data:www-data /var/www/blog.exemplo.com.br"}),e.jsx(o,{root:!0,command:`bash -c 'echo "<h1>Blog do Wallyson</h1>" > /var/www/blog.exemplo.com.br/html/index.html'`}),e.jsx(o,{root:!0,command:"nano /etc/nginx/sites-available/blog.exemplo.com.br"})]}),e.jsx(s,{path:"/etc/nginx/sites-available/blog.exemplo.com.br",children:`server {
    listen 80;
    listen [::]:80;                                      # IPv6

    server_name blog.exemplo.com.br www.blog.exemplo.com.br;

    root /var/www/blog.exemplo.com.br/html;
    index index.html index.htm;

    access_log /var/log/nginx/blog.access.log;
    error_log  /var/log/nginx/blog.error.log warn;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache agressivo para assets versionados
    location ~* \\.(?:css|js|jpg|jpeg|png|gif|ico|woff2?|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}`}),e.jsxs(r,{children:[e.jsx(o,{root:!0,command:"ln -s /etc/nginx/sites-available/blog.exemplo.com.br /etc/nginx/sites-enabled/"}),e.jsx(o,{root:!0,command:"rm /etc/nginx/sites-enabled/default",comment:"remove o site default que captura todas as requisições"}),e.jsx(o,{root:!0,command:"nginx -t",output:`nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful`}),e.jsx(o,{root:!0,command:"systemctl reload nginx"}),e.jsx(o,{command:'curl -H "Host: blog.exemplo.com.br" http://localhost',output:"<h1>Blog do Wallyson</h1>"})]}),e.jsxs("h3",{children:["3.1 Diretivas ",e.jsx("code",{children:"listen"})," mais usadas"]}),e.jsx(r,{children:e.jsx(t,{children:`listen 80;                       # IPv4, todas as interfaces, porta 80
listen 80 default_server;        # vira o "site default" para Hosts não casados
listen [::]:80;                  # IPv6
listen 443 ssl http2;            # HTTPS com HTTP/2
listen 443 ssl;                  # HTTP/2 vai por http2 on; em 1.25+
listen unix:/run/nginx.sock;     # socket Unix (proxy_pass interno)
listen 8080 reuseport;           # SO_REUSEPORT — distribui kernel-side`})}),e.jsxs(n,{type:"warning",title:"default_server vs primeiro server",children:["Quando o cabeçalho ",e.jsx("code",{children:"Host"})," da requisição não bate com nenhum",e.jsx("code",{children:"server_name"}),", o Nginx escolhe o ",e.jsx("strong",{children:"server_block marcado com default_server"}),". Se nenhum estiver marcado, ele usa o ",e.jsx("em",{children:"primeiro"}),"server bloco configurado para aquela ",e.jsx("code",{children:"listen"}),". Sempre defina explicitamente um catch-all que retorne 444 (close connection)."]}),e.jsx("h3",{children:"3.2 Catch-all defensivo"}),e.jsx(s,{path:"/etc/nginx/sites-available/00-catchall",children:`server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    return 444;                # 444 = NGINX-only, fecha conexão sem responder
}`}),e.jsxs("h2",{children:["4. ",e.jsx("code",{children:"location"})," — o coração do roteamento"]}),e.jsxs("p",{children:["A diretiva ",e.jsx("code",{children:"location"})," casa contra a URI da requisição. Existem cinco modificadores, processados nesta ordem de prioridade:"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Modificador"}),e.jsx("th",{children:"Tipo de match"}),e.jsx("th",{children:"Exemplo"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"="})}),e.jsx("td",{children:"Exato"}),e.jsx("td",{children:e.jsx("code",{children:"location = / "})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"^~"})}),e.jsx("td",{children:"Prefixo, para a busca"}),e.jsx("td",{children:e.jsx("code",{children:"location ^~ /static/"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"~"})}),e.jsx("td",{children:"Regex (case-sensitive)"}),e.jsx("td",{children:e.jsx("code",{children:"location ~ \\\\.php$"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"~*"})}),e.jsx("td",{children:"Regex (case-insensitive)"}),e.jsx("td",{children:e.jsx("code",{children:"location ~* \\\\.(jpg|png)$"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"(nenhum)"}),e.jsx("td",{children:"Prefixo simples"}),e.jsx("td",{children:e.jsx("code",{children:"location /api"})})]})]})]}),e.jsx(s,{path:"/etc/nginx/sites-available/exemplo-locations",children:`server {
    listen 80;
    server_name app.exemplo.com.br;
    root /var/www/app/public;

    # Match exato — homepage
    location = / {
        try_files /index.html =404;
    }

    # Prefixo curto-circuita regex
    location ^~ /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Regex case-insensitive
    location ~* \\.(?:gif|jpe?g|png|webp|svg|ico)$ {
        expires 30d;
        access_log off;
        log_not_found off;
    }

    # Bloqueio de arquivos sensíveis
    location ~ /\\.(?!well-known) {        # nega .git, .env, .htaccess
        deny all;
        return 404;
    }

    # try_files: tenta arquivo, depois pasta, depois fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}`}),e.jsx("h2",{children:"5. Proxy reverso para Node.js / Python / Ruby"}),e.jsxs("p",{children:["Esta é a função MAIS usada do Nginx hoje em dia. Você roda sua app em",e.jsx("code",{children:"localhost:3000"})," (Node, Express, Fastify, FastAPI, Rails, Django) e o Nginx fica na borda terminando TLS, comprimindo, servindo estáticos e encaminhando o resto."]}),e.jsx(s,{path:"/etc/nginx/sites-available/api.exemplo.com.br",children:`upstream backend_node {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;             # múltiplas instâncias = load balancing
    keepalive 32;                      # mantém conexões abertas com upstream
}

server {
    listen 80;
    server_name api.exemplo.com.br;

    access_log /var/log/nginx/api.access.log;
    error_log  /var/log/nginx/api.error.log;

    # Limites
    client_max_body_size 25m;          # uploads até 25 MB
    client_body_buffer_size 128k;
    proxy_connect_timeout 5s;
    proxy_read_timeout 60s;
    proxy_send_timeout 60s;

    location / {
        proxy_pass http://backend_node;

        # Headers que toda app precisa receber
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;

        # WebSockets / SSE
        proxy_http_version 1.1;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_buffering off;           # importante para SSE/streaming
    }

    # Servir estáticos diretamente do disco — bypass do Node
    location /static/ {
        alias /var/www/app/public/;
        expires 7d;
        access_log off;
    }
}`}),e.jsxs(r,{children:[e.jsx(o,{root:!0,command:"ln -s /etc/nginx/sites-available/api.exemplo.com.br /etc/nginx/sites-enabled/"}),e.jsx(o,{root:!0,command:"nginx -t && systemctl reload nginx",output:`nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful`}),e.jsx(o,{command:"curl -i http://api.exemplo.com.br/health",output:`HTTP/1.1 200 OK
Server: nginx
Date: Sat, 12 Apr 2025 18:01:11 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 17
Connection: keep-alive
X-Powered-By: Express

{"status":"ok"}`})]}),e.jsxs(n,{type:"tip",title:"proxy_params",children:["O Termux já fornece um snippet pronto em ",e.jsx("code",{children:"/etc/nginx/proxy_params"})," com os cinco headers ",e.jsx("code",{children:"X-Forwarded-*"}),". Use ",e.jsx("code",{children:"include proxy_params;"}),"dentro do location ao invés de repetir as cinco linhas."]}),e.jsx("h2",{children:"6. Load balancing (camada 7)"}),e.jsxs("p",{children:["O bloco ",e.jsx("code",{children:"upstream"})," aceita várias estratégias de distribuição."]}),e.jsx(s,{path:"/etc/nginx/conf.d/upstream-app.conf",children:`upstream app_cluster {
    # Estratégia padrão: round-robin
    # least_conn;          # envia para o servidor com menos conexões ativas
    # ip_hash;             # session affinity por IP
    # hash $request_uri;   # afinidade por URI (cache local)
    # random two least_conn; # power-of-two-choices

    server 10.0.0.10:8080 weight=3 max_fails=3 fail_timeout=30s;
    server 10.0.0.11:8080 weight=1;
    server 10.0.0.12:8080 backup;          # usado SÓ se os outros caírem
    server 10.0.0.13:8080 down;            # marca como fora (manutenção)

    keepalive 64;
}`}),e.jsx("h2",{children:"7. SSL/TLS com Let's Encrypt (Certbot)"}),e.jsxs("p",{children:["Vamos colocar HTTPS no ",e.jsx("code",{children:"blog.exemplo.com.br"})," usando o",e.jsx("code",{children:"certbot"})," oficial via ",e.jsx("code",{children:"snap"})," (a versão do APT é antiga)."]}),e.jsxs(r,{children:[e.jsx(o,{root:!0,command:"snap install --classic certbot",output:"certbot 2.10.0 from Certbot Project (certbot-eff✓) installed"}),e.jsx(o,{root:!0,command:"ln -s /snap/bin/certbot /usr/bin/certbot"}),e.jsx(o,{root:!0,command:"certbot --nginx -d blog.exemplo.com.br -d www.blog.exemplo.com.br --redirect --agree-tos -m admin@exemplo.com.br",output:`Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for blog.exemplo.com.br and www.blog.exemplo.com.br

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/blog.exemplo.com.br/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/blog.exemplo.com.br/privkey.pem
This certificate expires on 2025-07-11.

Deploying certificate
Successfully deployed certificate for blog.exemplo.com.br to /etc/nginx/sites-enabled/blog.exemplo.com.br
Successfully deployed certificate for www.blog.exemplo.com.br to /etc/nginx/sites-enabled/blog.exemplo.com.br
Congratulations! You have successfully enabled HTTPS on https://blog.exemplo.com.br

NEXT STEPS:
- The certificate will need to be renewed before it expires. Certbot can automatically renew
  the certificate in the background, but you may need to take steps to enable that functionality.
  See https://certbot.org/renewal-setup for instructions.`}),e.jsx(o,{root:!0,command:"systemctl status snap.certbot.renew.timer --no-pager",output:`● snap.certbot.renew.timer - Timer renew for snap application certbot.renew
     Loaded: loaded (/etc/systemd/system/snap.certbot.renew.timer; enabled)
     Active: active (waiting) since Sat 2025-04-12 18:22:00 -03; 5min ago
    Trigger: Sun 2025-04-13 02:14:00 -03; 7h left
   Triggers: ● snap.certbot.renew.service`}),e.jsx(o,{root:!0,command:"certbot renew --dry-run",comment:"testa o renovamento sem realmente trocar",output:`Saving debug log to /var/log/letsencrypt/letsencrypt.log
Processing /etc/letsencrypt/renewal/blog.exemplo.com.br.conf
Account registered.
Simulating renewal of an existing certificate for blog.exemplo.com.br and www.blog.exemplo.com.br

Congratulations, all simulated renewals succeeded:
  /etc/letsencrypt/live/blog.exemplo.com.br/fullchain.pem (success)`})]}),e.jsx("h3",{children:'7.1 Configuração SSL endurecida (Mozilla "Intermediate")'}),e.jsx(s,{path:"/etc/nginx/sites-available/blog.exemplo.com.br (após certbot + ajustes)",children:`# HTTP → HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name blog.exemplo.com.br www.blog.exemplo.com.br;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name blog.exemplo.com.br www.blog.exemplo.com.br;

    root /var/www/blog.exemplo.com.br/html;
    index index.html;

    # Certificados Let's Encrypt
    ssl_certificate     /etc/letsencrypt/live/blog.exemplo.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blog.exemplo.com.br/privkey.pem;

    # Mozilla Intermediate (TLS 1.2 + 1.3)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 1.1.1.1 8.8.8.8 valid=300s;
    resolver_timeout 5s;

    # HSTS — 2 anos, inclui subdomínios, pronto para preload
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    location / {
        try_files $uri $uri/ =404;
    }
}`}),e.jsxs(r,{children:[e.jsx(o,{command:"curl -I https://blog.exemplo.com.br",output:`HTTP/2 200
server: nginx
date: Sat, 12 Apr 2025 18:30:11 GMT
content-type: text/html
content-length: 26
last-modified: Sat, 12 Apr 2025 17:50:00 GMT
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: geolocation=(), microphone=(), camera=()
etag: "67fa3f78-1a"
accept-ranges: bytes`}),e.jsx(o,{command:"curl -I http://blog.exemplo.com.br",comment:"HTTP deve redirecionar",output:`HTTP/1.1 301 Moved Permanently
Server: nginx
Date: Sat, 12 Apr 2025 18:30:14 GMT
Content-Type: text/html
Content-Length: 169
Connection: keep-alive
Location: https://blog.exemplo.com.br/`})]}),e.jsx("h2",{children:"8. Compressão gzip e Brotli"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"gzip"})," já vem ligado no Termux. Para Brotli (mais eficiente, ~20% menor) instale o módulo dinâmico ",e.jsx("code",{children:"libnginx-mod-brotli"})," via repositório de terceiros — não é empacotado oficialmente."]}),e.jsx(r,{children:e.jsx(o,{command:"curl -H 'Accept-Encoding: gzip' -I https://blog.exemplo.com.br/style.css",output:`HTTP/2 200
content-type: text/css
content-length: 4321
content-encoding: gzip
vary: Accept-Encoding
cache-control: public, immutable
expires: Mon, 12 May 2025 18:35:00 GMT`})}),e.jsx(s,{path:"/etc/nginx/conf.d/gzip.conf",children:`gzip on;
gzip_disable "msie6";          # IE6 quebra com gzip
gzip_vary on;                  # adiciona Vary: Accept-Encoding
gzip_min_length 1024;          # não comprime arquivos < 1 KB
gzip_proxied any;              # comprime mesmo via proxy upstream
gzip_comp_level 6;             # 1=rápido/grande, 9=lento/menor; 6 é o sweet-spot
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/json
    application/javascript
    application/xml+rss
    application/atom+xml
    application/rss+xml
    application/wasm
    image/svg+xml
    font/ttf
    font/otf;`}),e.jsx("h2",{children:"9. Rate limiting"}),e.jsxs("p",{children:["O Nginx implementa o algoritmo ",e.jsx("em",{children:"token bucket"})," com ",e.jsx("code",{children:"limit_req_zone"}),"(requisições) e ",e.jsx("code",{children:"limit_conn_zone"})," (conexões)."]}),e.jsx(s,{path:"/etc/nginx/conf.d/ratelimit.conf",children:`# Define duas zonas: uma para login (5 req/min) outra geral (10 req/s)
limit_req_zone $binary_remote_addr zone=login_zone:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=geral_zone:10m rate=10r/s;

# Conexões simultâneas por IP
limit_conn_zone $binary_remote_addr zone=conn_per_ip:10m;`}),e.jsx(s,{path:"/etc/nginx/sites-available/api.exemplo.com.br (com rate limit)",children:`server {
    listen 443 ssl http2;
    server_name api.exemplo.com.br;

    limit_conn conn_per_ip 20;             # máx 20 conexões TCP simultâneas

    location /login {
        limit_req zone=login_zone burst=3 nodelay;     # 5/min + 3 burst
        limit_req_status 429;                          # 429 Too Many Requests
        proxy_pass http://backend_node;
    }

    location / {
        limit_req zone=geral_zone burst=20 nodelay;    # 10/s + 20 burst
        proxy_pass http://backend_node;
    }
}`}),e.jsx(r,{children:e.jsx(o,{command:"for i in {1..10}; do curl -s -o /dev/null -w '%{http_code}\\\\n' https://api.exemplo.com.br/login; done",comment:"dispara 10 requests rápidos no /login",output:`200
200
200
200
429
429
429
429
429
429`})}),e.jsx("h2",{children:"10. Logs — formato, rotação e análise"}),e.jsxs("p",{children:["Por padrão o formato é o ",e.jsx("code",{children:"combined"})," (compatível com Apache)."]}),e.jsx(r,{children:e.jsx(o,{command:"tail -3 /var/log/nginx/access.log",output:`192.168.1.42 - - [12/Apr/2025:18:30:11 -0300] "GET / HTTP/2.0" 200 615 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
192.168.1.42 - - [12/Apr/2025:18:30:12 -0300] "GET /favicon.ico HTTP/2.0" 404 162 "https://blog.exemplo.com.br/" "Mozilla/5.0..."
192.168.1.50 - - [12/Apr/2025:18:30:18 -0300] "POST /login HTTP/2.0" 200 248 "https://blog.exemplo.com.br/" "curl/8.5.0"`})}),e.jsx(s,{path:"/etc/nginx/conf.d/log_format.conf",children:`log_format main_ext '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

log_format json_combined escape=json
    '{'
        '"time":"$time_iso8601",'
        '"remote_addr":"$remote_addr",'
        '"request":"$request",'
        '"status":$status,'
        '"bytes":$body_bytes_sent,'
        '"referer":"$http_referer",'
        '"ua":"$http_user_agent",'
        '"rt":$request_time,'
        '"upstream_rt":"$upstream_response_time"'
    '}';

access_log /var/log/nginx/access.json json_combined;`}),e.jsxs(r,{children:[e.jsx(o,{command:"awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn",comment:"distribuição de status codes",output:`   2410 200
    187 301
     94 304
     37 404
      3 502
      1 429`}),e.jsx(o,{command:"awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10",comment:"top 10 IPs que mais bateram no servidor",output:`    819 192.168.1.42
    412 10.0.0.5
    298 187.45.12.99
    211 200.144.32.18`})]}),e.jsxs(n,{type:"tip",title:"logrotate",children:["O Termux já instala ",e.jsx("code",{children:"/etc/logrotate.d/nginx"})," que rotaciona diariamente, mantém 14 cópias comprimidas e dispara ",e.jsx("code",{children:"nginx -s reopen"})," via postrotate. Verifique com ",e.jsx("code",{children:"cat /etc/logrotate.d/nginx"}),"."]}),e.jsx("h2",{children:"11. Servir uma SPA (React/Vue/Angular)"}),e.jsx(s,{path:"/etc/nginx/sites-available/spa.exemplo.com.br",children:`server {
    listen 443 ssl http2;
    server_name spa.exemplo.com.br;

    root /var/www/spa/dist;
    index index.html;

    # Imutáveis (build com hash no nome)
    location ~* \\.[a-f0-9]{8,}\\.(?:js|css|woff2|png|jpg|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Service worker — NUNCA cachear
    location = /sw.js {
        add_header Cache-Control "no-store";
        expires off;
    }

    # SPA fallback — toda rota desconhecida cai no index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API → backend
    location /api/ {
        proxy_pass http://127.0.0.1:4000/;
        include proxy_params;
    }

    ssl_certificate     /etc/letsencrypt/live/spa.exemplo.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/spa.exemplo.com.br/privkey.pem;
}`}),e.jsx("h2",{children:"12. Caso prático completo: site estático + API Node"}),e.jsxs("p",{children:["Vamos juntar tudo: domínio único ",e.jsx("code",{children:"app.exemplo.com.br"})," servindo SPA em",e.jsx("code",{children:"/"})," e proxy para Node em ",e.jsx("code",{children:"/api/"}),", com TLS, gzip, cache de assets e rate-limit."]}),e.jsx(s,{path:"/etc/nginx/sites-available/app.exemplo.com.br",children:`upstream app_backend {
    server 127.0.0.1:3000;
    keepalive 32;
}

limit_req_zone $binary_remote_addr zone=api_zone:10m rate=20r/s;

server {
    listen 80;
    listen [::]:80;
    server_name app.exemplo.com.br;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name app.exemplo.com.br;

    root /var/www/app/public;
    index index.html;

    access_log /var/log/nginx/app.access.log main_ext;
    error_log  /var/log/nginx/app.error.log warn;

    client_max_body_size 50m;

    # ===== Frontend =====
    location ~* \\.(?:css|js|woff2|png|jpg|svg|webp|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # ===== Backend =====
    location /api/ {
        limit_req zone=api_zone burst=40 nodelay;

        proxy_pass http://app_backend/;
        include proxy_params;

        # WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_buffering off;

        proxy_read_timeout 90s;
    }

    # ===== Bloqueios =====
    location ~ /\\.(git|env|htaccess) { deny all; return 404; }

    # ===== TLS =====
    ssl_certificate     /etc/letsencrypt/live/app.exemplo.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.exemplo.com.br/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
}`}),e.jsx("h2",{children:"13. Hardening e segurança"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"server_tokens off;"})})," — esconde a versão do Nginx no header ",e.jsx("code",{children:"Server"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Headers de segurança"})," via ",e.jsx("code",{children:"add_header"})," (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Content-Security-Policy)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Limite o tamanho do request"})," com ",e.jsx("code",{children:"client_max_body_size"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Bloqueie métodos perigosos"})," em endpoints somente-leitura."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Rate limit"})," em endpoints de autenticação."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Não exponha"})," ",e.jsx("code",{children:"/.git"}),", ",e.jsx("code",{children:".env"}),", ",e.jsx("code",{children:".htaccess"}),", ",e.jsx("code",{children:"backup.sql"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Use UFW"}),": ",e.jsx("code",{children:"ufw allow 'Nginx Full'"})," abre 80+443."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"fail2ban"})," com jail para Nginx (banir IPs com excesso de 401/403/429)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ModSecurity"})," via ",e.jsx("code",{children:"libnginx-mod-http-modsecurity"})," (WAF)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Auditar"})," com ",e.jsx("code",{children:"https://www.ssllabs.com/ssltest/"})," e ",e.jsx("code",{children:"nikto"}),"."]})]}),e.jsxs(r,{children:[e.jsx(o,{root:!0,command:"ufw allow 'Nginx Full'",output:`Rule added
Rule added (v6)`}),e.jsx(o,{root:!0,command:"ufw status numbered | grep -i nginx",output:`[ 1] Nginx Full                 ALLOW IN    Anywhere
[ 2] Nginx Full (v6)            ALLOW IN    Anywhere (v6)`})]}),e.jsx("h2",{children:"14. Troubleshooting"}),e.jsxs("h3",{children:["14.1 ",e.jsx("code",{children:"502 Bad Gateway"})]}),e.jsxs("p",{children:["O upstream está fora do ar ou recusando conexão. Veja ",e.jsx("code",{children:"error.log"}),":"]}),e.jsxs(r,{children:[e.jsx(o,{root:!0,command:"tail -f /var/log/nginx/error.log",output:'2025/04/12 18:42:11 [error] 4523#4523: *128 connect() failed (111: Connection refused) while connecting to upstream, client: 192.168.1.42, server: api.exemplo.com.br, request: "GET /health HTTP/2.0", upstream: "http://127.0.0.1:3000/health", host: "api.exemplo.com.br"'}),e.jsx(o,{command:"ss -tlnp | grep :3000",comment:"confirma se a app está escutando",output:"(vazio = nada escuta)"}),e.jsx(o,{root:!0,command:"systemctl restart minha-app.service"})]}),e.jsxs("h3",{children:["14.2 ",e.jsx("code",{children:"413 Request Entity Too Large"})]}),e.jsxs("p",{children:["Aumente ",e.jsx("code",{children:"client_max_body_size"}),". Padrão é 1 MB."]}),e.jsxs("h3",{children:["14.3 ",e.jsx("code",{children:"nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address in use)"})]}),e.jsxs(r,{children:[e.jsx(o,{root:!0,command:"ss -tlnp | grep ':80 '",output:'LISTEN 0 511 *:80 *:* users:(("apache2",pid=812,fd=4))'}),e.jsx(o,{root:!0,command:"systemctl stop apache2 && systemctl disable apache2",comment:"remova quem está usando a porta"})]}),e.jsx("h3",{children:"14.4 Cache do navegador não atualiza"}),e.jsxs("p",{children:["Verifique ",e.jsx("code",{children:"Cache-Control"}),"; ",e.jsx("code",{children:"immutable"})," + 1 ano só pode ser usado em assets versionados (com hash no nome). Para HTML use ",e.jsx("code",{children:"no-cache"}),"ou ",e.jsx("code",{children:"max-age=0, must-revalidate"}),"."]}),e.jsxs(n,{type:"success",title:"Próximos passos",children:["Aprenda também sobre ",e.jsx("strong",{children:"Apache"})," (alternativa clássica), ",e.jsx("strong",{children:"PHP-FPM"}),"(para servir WordPress, Laravel) e os bancos ",e.jsx("strong",{children:"MySQL/MariaDB"})," e",e.jsx("strong",{children:" PostgreSQL"})," que completam a stack LEMP/LAMP."]})]})}export{x as default};

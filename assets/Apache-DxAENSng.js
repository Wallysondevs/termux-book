import{j as e}from"./index-d-w5ROEn.js";import{P as t}from"./PageContainer-t8f2nTRw.js";import{T as o,C as r,F as s}from"./Terminal-B39pZIiO.js";import{I as a}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function h(){return e.jsxs(t,{title:"Apache HTTP Server — apache2 no Termux",subtitle:"O servidor web mais antigo e ainda mais flexível: módulos, virtual hosts, .htaccess, mod_rewrite, mod_ssl, mod_proxy e Let's Encrypt.",difficulty:"intermediario",timeToRead:"50 min",category:"Servidores Web",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Apache HTTP Server"})," nasceu em 1995 como sucessor do servidor NCSA HTTPd e literalmente carregou a web nas costas durante a década de 90 e 2000. Foi projetado em torno de uma arquitetura de ",e.jsx("strong",{children:"módulos carregáveis"}),": o núcleo é minúsculo e tudo (PHP, SSL, autenticação, compressão, rewrite, proxy) entra como módulo dinâmico. Essa modularidade é justamente o que ainda o torna a primeira escolha quando precisamos de ",e.jsx("code",{children:".htaccess"}),", ",e.jsx("code",{children:"mod_rewrite"})," com regras complexas ou integração mod_php embutida."]}),e.jsxs("p",{children:["No Termux o pacote chama-se ",e.jsx("code",{children:"apache2"})," e o empacotamento Debian introduz diretórios extras (",e.jsx("code",{children:"sites-available"}),", ",e.jsx("code",{children:"mods-available"}),") e ferramentas ",e.jsx("code",{children:"a2ensite"}),"/",e.jsx("code",{children:"a2enmod"})," que tornam a administração bastante agradável."]}),e.jsxs(a,{type:"info",title:"Apache no Termux 0.118 (Noble)",children:["Versão empacotada: ",e.jsx("strong",{children:"Apache 2.4.58"}),'. Estrutura totalmente Debian-style (não confunda com a estrutura "vanilla" usada em CentOS/RHEL).']}),e.jsx("h2",{children:"1. Instalação"}),e.jsxs(o,{title:"wallyson@termux: ~",children:[e.jsx(r,{root:!0,command:"pkg update && pkg install -y apache2",output:`Reading package lists... Done
Building dependency tree... Done
The following additional packages will be installed:
  apache2-bin apache2-data apache2-utils libapr1t64 libaprutil1-dbd-sqlite3
  libaprutil1-ldap libaprutil1t64 liblua5.3-0 ssl-cert
Suggested packages:
  apache2-doc apache2-suexec-pristine | apache2-suexec-custom www-browser
  openssl-blacklist
The following NEW packages will be installed:
  apache2 apache2-bin apache2-data apache2-utils libapr1t64
  libaprutil1-dbd-sqlite3 libaprutil1-ldap libaprutil1t64 liblua5.3-0 ssl-cert
0 upgraded, 10 newly installed, 0 to remove and 0 not upgraded.
Need to get 1.957 kB of archives.
After this operation, 8.302 kB of additional disk space will be used.
Get:1 http://packages.termux.dev/apt/termux-main noble/main amd64 libapr1t64 amd64 1.7.2-3.termux.1 [108 kB]
...
Setting up apache2 (2.4.58-termux.4) ...
Enabling module mpm_event.
Enabling module authz_core.
Enabling module authz_host.
Enabling module authn_core.
Enabling module auth_basic.
...
Created symlink /etc/systemd/system/multi-user.target.wants/apache2.service → /lib/systemd/system/apache2.service.
Created symlink /etc/systemd/system/multi-user.target.wants/apache-htcacheclean.service → /lib/systemd/system/apache-htcacheclean.service.
Processing triggers for ufw (0.36.2-6) ...
Processing triggers for man-db (2.12.0-4build2) ...`}),e.jsx(r,{command:"apache2 -v",output:`Server version: Apache/2.4.58 (Termux)
Server built:   2024-04-30T18:28:45`}),e.jsx(r,{command:"apache2 -M | head -20",comment:"lista módulos atualmente carregados",output:`Loaded Modules:
 core_module (static)
 so_module (static)
 watchdog_module (static)
 http_module (static)
 log_config_module (static)
 logio_module (static)
 version_module (static)
 unixd_module (static)
 access_compat_module (shared)
 alias_module (shared)
 auth_basic_module (shared)
 authn_core_module (shared)
 authn_file_module (shared)
 authz_core_module (shared)
 authz_host_module (shared)
 authz_user_module (shared)
 autoindex_module (shared)
 deflate_module (shared)
 dir_module (shared)
 env_module (shared)
 filter_module (shared)
 mime_module (shared)
 mpm_event_module (shared)
 negotiation_module (shared)
 reqtimeout_module (shared)
 setenvif_module (shared)
 status_module (shared)`}),e.jsx(r,{root:!0,command:"systemctl status apache2 --no-pager",output:`● apache2.service - The Apache HTTP Server
     Loaded: loaded (/lib/systemd/system/apache2.service; enabled; preset: enabled)
     Active: active (running) since Sat 2025-04-12 19:00:11 -03; 8s ago
       Docs: https://httpd.apache.org/docs/2.4/
    Process: 5102 ExecStart=/usr/sbin/apachectl start (code=exited, status=0/SUCCESS)
   Main PID: 5106 (apache2)
      Tasks: 55 (limit: 9265)
     Memory: 5.2M (peak: 6.0M)
        CPU: 95ms
     CGroup: /system.slice/apache2.service
             ├─5106 /usr/sbin/apache2 -k start
             ├─5108 /usr/sbin/apache2 -k start
             └─5109 /usr/sbin/apache2 -k start

abr 12 19:00:11 termux systemd[1]: Starting apache2.service - The Apache HTTP Server...
abr 12 19:00:11 termux apachectl[5105]: AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1.
abr 12 19:00:11 termux systemd[1]: Started apache2.service - The Apache HTTP Server.`}),e.jsx(r,{command:"curl -I http://localhost",output:`HTTP/1.1 200 OK
Date: Sat, 12 Apr 2025 22:00:21 GMT
Server: Apache/2.4.58 (Termux)
Last-Modified: Sat, 12 Apr 2025 22:00:11 GMT
ETag: "29cd-633c6bd4b5cba"
Accept-Ranges: bytes
Content-Length: 10701
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8`})]}),e.jsx("h2",{children:"2. Estrutura de diretórios"}),e.jsx(o,{children:e.jsx(r,{command:"tree -L 2 /etc/apache2",output:`/etc/apache2
├── apache2.conf                # arquivo MASTER
├── conf-available             # snippets globais (charset, security, serve-cgi-bin)
│   ├── charset.conf
│   ├── localized-error-pages.conf
│   ├── other-vhosts-access-log.conf
│   ├── security.conf
│   └── serve-cgi-bin.conf
├── conf-enabled               # symlinks dos snippets ativos
├── envvars                    # variáveis: APACHE_LOG_DIR, APACHE_RUN_USER...
├── magic
├── mods-available             # 100+ módulos disponíveis
│   ├── alias.conf
│   ├── alias.load
│   ├── deflate.conf
│   ├── deflate.load
│   ├── ssl.conf
│   ├── ssl.load
│   └── ...
├── mods-enabled               # symlinks dos módulos carregados
├── ports.conf                 # quais portas escutar (Listen 80 / Listen 443)
├── sites-available
│   ├── 000-default.conf
│   └── default-ssl.conf
└── sites-enabled
    └── 000-default.conf -> ../sites-available/000-default.conf

7 directories, ~150 files`})}),e.jsxs("h2",{children:["3. Comandos ",e.jsx("code",{children:"a2*"})," (Apache helpers do Debian)"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Comando"}),e.jsx("th",{children:"O que faz"}),e.jsx("th",{children:'Equivalente "manual"'})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"a2enmod <mod>"})}),e.jsx("td",{children:"Ativa módulo"}),e.jsx("td",{children:e.jsx("code",{children:"ln -s ../mods-available/X.load mods-enabled/"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"a2dismod <mod>"})}),e.jsx("td",{children:"Desativa módulo"}),e.jsx("td",{children:e.jsx("code",{children:"rm /etc/apache2/mods-enabled/X.*"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"a2ensite <site>"})}),e.jsx("td",{children:"Ativa virtual host"}),e.jsx("td",{children:e.jsx("code",{children:"ln -s ../sites-available/X.conf sites-enabled/"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"a2dissite <site>"})}),e.jsx("td",{children:"Desativa vhost"}),e.jsx("td",{children:e.jsx("code",{children:"rm sites-enabled/X.conf"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"a2enconf <c>"})}),e.jsx("td",{children:"Ativa snippet em conf-enabled"}),e.jsx("td",{children:"idem"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"a2query -m"})}),e.jsx("td",{children:"Lista módulos carregados"}),e.jsx("td",{children:e.jsx("code",{children:"apache2 -M"})})]})]})]}),e.jsxs(o,{children:[e.jsx(r,{root:!0,command:"a2enmod rewrite headers ssl deflate expires",output:`Enabling module rewrite.
Enabling module headers.
Considering dependency setenvif for ssl:
Module setenvif already enabled
Considering dependency mime for ssl:
Module mime already enabled
Considering dependency socache_shmcb for ssl:
Enabling module socache_shmcb.
Enabling module ssl.
See /usr/share/doc/apache2/README.Debian.gz on how to configure SSL and create self-signed certificates.
Module deflate already enabled
Enabling module expires.
To activate the new configuration, you need to run:
  systemctl restart apache2`}),e.jsx(r,{root:!0,command:"systemctl restart apache2"}),e.jsx(r,{command:"apache2ctl configtest",output:"Syntax OK"})]}),e.jsx("h2",{children:"4. Virtual Hosts"}),e.jsxs("p",{children:["Vamos criar dois sites: ",e.jsx("code",{children:"blog.exemplo.com.br"})," e ",e.jsx("code",{children:"app.exemplo.com.br"}),"."]}),e.jsxs(o,{children:[e.jsx(r,{root:!0,command:"mkdir -p /var/www/blog.exemplo.com.br/public_html"}),e.jsx(r,{root:!0,command:"chown -R www-data:www-data /var/www/blog.exemplo.com.br"}),e.jsx(r,{root:!0,command:`bash -c 'echo "<h1>Blog do Wallyson</h1>" > /var/www/blog.exemplo.com.br/public_html/index.html'`}),e.jsx(r,{root:!0,command:"nano /etc/apache2/sites-available/blog.exemplo.com.br.conf"})]}),e.jsx(s,{path:"/etc/apache2/sites-available/blog.exemplo.com.br.conf",children:`<VirtualHost *:80>
    ServerName  blog.exemplo.com.br
    ServerAlias www.blog.exemplo.com.br
    ServerAdmin webmaster@exemplo.com.br

    DocumentRoot /var/www/blog.exemplo.com.br/public_html

    <Directory /var/www/blog.exemplo.com.br/public_html>
        Options -Indexes +FollowSymLinks
        AllowOverride All           # permite .htaccess
        Require all granted
    </Directory>

    ErrorLog  \${APACHE_LOG_DIR}/blog.error.log
    CustomLog \${APACHE_LOG_DIR}/blog.access.log combined
    LogLevel warn
</VirtualHost>`}),e.jsxs(a,{type:"note",title:"A variável APACHE_LOG_DIR",children:["Essa variável é definida em ",e.jsx("code",{children:"/etc/apache2/envvars"})," e expandida pelo próprio Apache. Vale também: ",e.jsx("code",{children:"APACHE_RUN_USER"})," (default: www-data),",e.jsx("code",{children:"APACHE_RUN_GROUP"}),", ",e.jsx("code",{children:"APACHE_PID_FILE"}),", ",e.jsx("code",{children:"APACHE_LOCK_DIR"}),"."]}),e.jsxs(o,{children:[e.jsx(r,{root:!0,command:"a2ensite blog.exemplo.com.br.conf",output:`Enabling site blog.exemplo.com.br.
To activate the new configuration, you need to run:
  systemctl reload apache2`}),e.jsx(r,{root:!0,command:"a2dissite 000-default.conf",output:`Site 000-default disabled.
To activate the new configuration, you need to run:
  systemctl reload apache2`}),e.jsx(r,{root:!0,command:"apache2ctl configtest && systemctl reload apache2",output:"Syntax OK"}),e.jsx(r,{command:'curl -H "Host: blog.exemplo.com.br" http://localhost',output:"<h1>Blog do Wallyson</h1>"})]}),e.jsxs("h2",{children:["5. ",e.jsx("code",{children:".htaccess"})," e ",e.jsx("code",{children:"AllowOverride"})]}),e.jsxs("p",{children:["O Apache permite que diretivas sejam declaradas em arquivos ",e.jsx("code",{children:".htaccess"}),"dentro do próprio DocumentRoot — perfeito para shared hosting, WordPress, etc. O custo é desempenho (Apache lê o .htaccess a CADA request)."]}),e.jsx(s,{path:"/var/www/blog.exemplo.com.br/public_html/.htaccess",children:`# Permite que .html seja servido sem extensão
RewriteEngine On
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^([^.]+)$ $1.html [L]

# Bloqueia listagem de diretório
Options -Indexes

# Define headers
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
</IfModule>

# Cache de imagens
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/png  "access plus 1 month"
    ExpiresByType text/css   "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
</IfModule>

# Bloqueia acesso a arquivos sensíveis
<FilesMatch "^\\.(htaccess|env|git)">
    Require all denied
</FilesMatch>`}),e.jsxs(a,{type:"warning",title:"AllowOverride",children:["Para ",e.jsx("code",{children:".htaccess"})," funcionar você PRECISA ter ",e.jsx("code",{children:"AllowOverride All"}),"no ",e.jsx("code",{children:"<Directory>"}),". Se for ",e.jsx("code",{children:"None"})," (default), o Apache nem abre o arquivo — economizando I/O. Em produção alta performance, prefira mover as regras para o ",e.jsx("code",{children:"<VirtualHost>"})," e manter ",e.jsx("code",{children:"AllowOverride None"}),"."]}),e.jsxs("h2",{children:["6. ",e.jsx("code",{children:"mod_rewrite"})," — URL rewriting"]}),e.jsx(s,{path:"exemplos típicos de mod_rewrite",children:`# 1. Forçar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R=301,L]

# 2. Forçar www
RewriteCond %{HTTP_HOST} ^exemplo\\.com\\.br$ [NC]
RewriteRule ^(.*)$ https://www.exemplo.com.br/$1 [R=301,L]

# 3. Remover www
RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# 4. Front-controller (Laravel/Symfony/WordPress)
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]

# 5. Manter /api/* mas com versionamento
RewriteRule ^api/v1/(.*)$ /backend.php?version=1&path=$1 [L,QSA]

# 6. Bloquear bots ruins por User-Agent
RewriteCond %{HTTP_USER_AGENT} (semrush|ahrefs|mj12bot) [NC]
RewriteRule .* - [F,L]   # F = 403 Forbidden`}),e.jsxs("p",{children:["Flags mais úteis do ",e.jsx("code",{children:"RewriteRule"}),":"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Flag"}),e.jsx("th",{children:"Significado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"L"})}),e.jsx("td",{children:"Last — para de processar regras"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"R=301"})}),e.jsx("td",{children:"Redirect permanente"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"R=302"})}),e.jsx("td",{children:"Redirect temporário"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"QSA"})}),e.jsx("td",{children:"Query String Append (mantém ?a=1)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"NC"})}),e.jsx("td",{children:"No Case (case-insensitive)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"F"})}),e.jsx("td",{children:"403 Forbidden"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"G"})}),e.jsx("td",{children:"410 Gone"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"P"})}),e.jsx("td",{children:"Proxy (precisa mod_proxy)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"E=VAR:val"})}),e.jsx("td",{children:"Define variável de ambiente"})]})]})]}),e.jsxs("h2",{children:["7. ",e.jsx("code",{children:"mod_ssl"})," + Let's Encrypt"]}),e.jsxs(o,{children:[e.jsx(r,{root:!0,command:"snap install --classic certbot",output:"certbot 2.10.0 from Certbot Project (certbot-eff✓) installed"}),e.jsx(r,{root:!0,command:"ln -s /snap/bin/certbot /usr/bin/certbot"}),e.jsx(r,{root:!0,command:"certbot --apache -d blog.exemplo.com.br -d www.blog.exemplo.com.br --redirect --agree-tos -m admin@exemplo.com.br",output:`Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for blog.exemplo.com.br and www.blog.exemplo.com.br

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/blog.exemplo.com.br/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/blog.exemplo.com.br/privkey.pem
This certificate expires on 2025-07-11.

Deploying certificate
Successfully deployed certificate for blog.exemplo.com.br to /etc/apache2/sites-available/blog.exemplo.com.br-le-ssl.conf
Successfully deployed certificate for www.blog.exemplo.com.br to /etc/apache2/sites-available/blog.exemplo.com.br-le-ssl.conf
Congratulations! You have successfully enabled HTTPS on https://blog.exemplo.com.br

NEXT STEPS:
- The certificate will need to be renewed before it expires.`}),e.jsx(r,{command:"curl -I https://blog.exemplo.com.br",output:`HTTP/1.1 200 OK
Date: Sat, 12 Apr 2025 22:30:11 GMT
Server: Apache/2.4.58 (Termux)
Strict-Transport-Security: max-age=63072000
Content-Type: text/html`})]}),e.jsx(s,{path:"/etc/apache2/sites-available/blog.exemplo.com.br-le-ssl.conf",children:`<IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerName  blog.exemplo.com.br
    ServerAlias www.blog.exemplo.com.br
    ServerAdmin webmaster@exemplo.com.br

    DocumentRoot /var/www/blog.exemplo.com.br/public_html

    <Directory /var/www/blog.exemplo.com.br/public_html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    SSLEngine on
    SSLCertificateFile      /etc/letsencrypt/live/blog.exemplo.com.br/fullchain.pem
    SSLCertificateKeyFile   /etc/letsencrypt/live/blog.exemplo.com.br/privkey.pem
    Include /etc/letsencrypt/options-ssl-apache.conf

    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set Referrer-Policy "strict-origin-when-cross-origin"

    ErrorLog  \${APACHE_LOG_DIR}/blog.error.log
    CustomLog \${APACHE_LOG_DIR}/blog.access.log combined
</VirtualHost>
</IfModule>`}),e.jsxs("h2",{children:["8. ",e.jsx("code",{children:"mod_proxy"})," — Apache como reverse proxy"]}),e.jsx(o,{children:e.jsx(r,{root:!0,command:"a2enmod proxy proxy_http proxy_wstunnel proxy_balancer lbmethod_byrequests",output:`Considering dependency proxy for proxy_http:
Enabling module proxy.
Enabling module proxy_http.
Enabling module proxy_wstunnel.
Enabling module proxy_balancer.
Considering dependency slotmem_shm for lbmethod_byrequests:
Enabling module slotmem_shm.
Enabling module lbmethod_byrequests.
To activate the new configuration, you need to run:
  systemctl restart apache2`})}),e.jsx(s,{path:"/etc/apache2/sites-available/api.exemplo.com.br.conf",children:`<VirtualHost *:80>
    ServerName api.exemplo.com.br
    ProxyPreserveHost On
    ProxyRequests Off

    <Proxy *>
        Require all granted
    </Proxy>

    # Reverse proxy para Node escutando em 3000
    ProxyPass        / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    # WebSocket (Socket.io)
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*)$ "ws://127.0.0.1:3000/$1" [P,L]

    ErrorLog  \${APACHE_LOG_DIR}/api.error.log
    CustomLog \${APACHE_LOG_DIR}/api.access.log combined
</VirtualHost>`}),e.jsx("p",{children:"Para load balancing entre vários backends:"}),e.jsx(s,{path:"balanceador",children:`<Proxy balancer://node_cluster>
    BalancerMember http://127.0.0.1:3000 route=node1
    BalancerMember http://127.0.0.1:3001 route=node2
    BalancerMember http://127.0.0.1:3002 route=node3 status=+H   # hot-standby
    ProxySet lbmethod=byrequests
</Proxy>

ProxyPass        /api/ balancer://node_cluster/
ProxyPassReverse /api/ balancer://node_cluster/

# Painel de status do balancer
<Location "/balancer-manager">
    SetHandler balancer-manager
    Require local
</Location>`}),e.jsx("h2",{children:"9. MPMs: prefork, worker, event"}),e.jsxs("p",{children:["O Apache permite trocar o motor de execução. No Termux 0.118 o padrão é",e.jsx("code",{children:"mpm_event"})," (assíncrono, similar ao Nginx)."]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"MPM"}),e.jsx("th",{children:"Modelo"}),e.jsx("th",{children:"Quando usar"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mpm_prefork"})}),e.jsx("td",{children:"1 processo por conexão, sem threads"}),e.jsx("td",{children:"com mod_php (não é thread-safe)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mpm_worker"})}),e.jsx("td",{children:"processos com threads"}),e.jsx("td",{children:"genérico, baixo uso de memória"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mpm_event"})}),e.jsx("td",{children:"worker + I/O assíncrono"}),e.jsx("td",{children:"default; melhor para keep-alive"})]})]})]}),e.jsxs(o,{children:[e.jsx(r,{command:"apache2ctl -V | grep MPM",output:" Server MPM:     event"}),e.jsx(r,{root:!0,command:"a2dismod mpm_event && a2enmod mpm_prefork",comment:"troca para prefork (necessário com mod_php)",output:`Module mpm_event disabled.
Considering dependency mpm_prefork for mpm_prefork:
Enabling module mpm_prefork.
To activate the new configuration, you need to run:
  systemctl restart apache2`})]}),e.jsx(s,{path:"/etc/apache2/mods-available/mpm_event.conf",children:`<IfModule mpm_event_module>
    StartServers              2
    MinSpareThreads          25
    MaxSpareThreads          75
    ThreadLimit              64
    ThreadsPerChild          25
    MaxRequestWorkers       150
    MaxConnectionsPerChild    0
</IfModule>`}),e.jsx("h2",{children:"10. Logs e análise"}),e.jsxs(o,{children:[e.jsx(r,{command:"tail -3 /var/log/apache2/blog.access.log",output:`192.168.1.42 - - [12/Apr/2025:22:30:11 -0300] "GET / HTTP/1.1" 200 26 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0"
192.168.1.42 - - [12/Apr/2025:22:30:11 -0300] "GET /favicon.ico HTTP/1.1" 404 488 "https://blog.exemplo.com.br/" "Mozilla/5.0..."
192.168.1.50 - - [12/Apr/2025:22:30:18 -0300] "POST /wp-login.php HTTP/1.1" 401 1232 "-" "WordPress/6.4; https://malicioso.com"`}),e.jsx(r,{command:"tail -2 /var/log/apache2/blog.error.log",output:`[Sat Apr 12 22:31:01.184321 2025] [authz_core:error] [pid 5108] [client 192.168.1.50:54321] AH01630: client denied by server configuration: /var/www/blog.exemplo.com.br/public_html/.git
[Sat Apr 12 22:32:14.412987 2025] [php:error] [pid 5109] [client 187.45.99.10:33221] PHP Fatal error: Uncaught Error: Class 'PDO' not found in /var/www/blog/index.php:14`})]}),e.jsx("p",{children:"Definindo um formato customizado e mostrando IP real atrás de proxy:"}),e.jsx(s,{path:"/etc/apache2/apache2.conf (trecho)",children:`LogFormat "%h %l %u %t \\"%r\\" %>s %b \\"%{Referer}i\\" \\"%{User-Agent}i\\"" combined
LogFormat "%h %l %u %t \\"%r\\" %>s %b" common
LogFormat "%{X-Forwarded-For}i %l %u %t \\"%r\\" %>s %b \\"%{Referer}i\\" \\"%{User-Agent}i\\"" proxy

# Para usar com Cloudflare/Nginx na frente:
# CustomLog \${APACHE_LOG_DIR}/access.log proxy`}),e.jsx("h2",{children:"11. Compressão (mod_deflate) e cache (mod_expires)"}),e.jsx(s,{path:"/etc/apache2/conf-available/compress-cache.conf",children:`<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE \\
        text/html text/plain text/xml text/css text/javascript \\
        application/javascript application/json application/xml \\
        application/rss+xml application/atom+xml image/svg+xml font/ttf font/otf
</IfModule>

<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault                          "access plus 1 month"
    ExpiresByType text/html                 "access plus 0 seconds"
    ExpiresByType text/css                  "access plus 1 year"
    ExpiresByType application/javascript    "access plus 1 year"
    ExpiresByType image/jpeg                "access plus 1 year"
    ExpiresByType image/png                 "access plus 1 year"
    ExpiresByType image/svg+xml             "access plus 1 year"
    ExpiresByType font/woff2                "access plus 1 year"
</IfModule>`}),e.jsxs(o,{children:[e.jsx(r,{root:!0,command:"a2enconf compress-cache && systemctl reload apache2"}),e.jsx(r,{command:"curl -H 'Accept-Encoding: gzip' -I https://blog.exemplo.com.br",output:`HTTP/1.1 200 OK
Content-Encoding: gzip
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8
Cache-Control: max-age=0
Expires: Sat, 12 Apr 2025 22:35:00 GMT`})]}),e.jsx("h2",{children:"12. Hardening básico"}),e.jsx(s,{path:"/etc/apache2/conf-available/security.conf (ajustes)",children:`ServerTokens Prod              # esconde versão (Server: Apache)
ServerSignature Off            # remove rodapé "Apache/2.4.58 ..." em páginas de erro

TraceEnable Off                # desativa método TRACE (XSS via TRACE)

Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set Referrer-Policy "strict-origin-when-cross-origin"
Header set Permissions-Policy "geolocation=(), camera=(), microphone=()"

# Esconde headers sensíveis
Header unset X-Powered-By
Header unset Server`}),e.jsx("h2",{children:"13. Apache vs Nginx — quando escolher cada um"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Critério"}),e.jsx("th",{children:"Apache"}),e.jsx("th",{children:"Nginx"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Modelo"}),e.jsx("td",{children:"Processos/threads (MPM)"}),e.jsx("td",{children:"Event-driven assíncrono"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:".htaccess"}),e.jsx("td",{children:"Sim (per-directory)"}),e.jsx("td",{children:"Não suporta"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"mod_php embarcado"}),e.jsx("td",{children:"Sim (mpm_prefork)"}),e.jsx("td",{children:"Só via PHP-FPM"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Estáticos sob alta carga"}),e.jsx("td",{children:"Bom"}),e.jsx("td",{children:"Excelente"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Reverse proxy"}),e.jsx("td",{children:"mod_proxy (ok)"}),e.jsx("td",{children:"Nativo, otimizado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Configuração"}),e.jsx("td",{children:"Verbosa, XML-like"}),e.jsx("td",{children:"Minimalista, nginx.conf"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Curva de aprendizado"}),e.jsx("td",{children:"Mais fácil para iniciantes"}),e.jsx("td",{children:"Requer entender contextos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Memória por conexão"}),e.jsx("td",{children:"~1-2 MB (worker)"}),e.jsx("td",{children:"~10 KB"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Dinâmico em runtime"}),e.jsx("td",{children:"módulos via a2enmod"}),e.jsx("td",{children:"módulos compilados/dinâmicos"})]})]})]}),e.jsxs(a,{type:"tip",title:"Combo Nginx + Apache",children:["Em hosting compartilhado é comum colocar ",e.jsx("strong",{children:"Nginx na frente"})," (TLS, cache, gzip) e ",e.jsx("strong",{children:"Apache atrás"})," servindo PHP via mod_php — assim você ganha o desempenho do Nginx e mantém compatibilidade com ",e.jsx("code",{children:".htaccess"})," de clientes legados."]}),e.jsx("h2",{children:"14. Troubleshooting"}),e.jsxs(o,{children:[e.jsx(r,{root:!0,command:"apache2ctl configtest",output:`AH00112: Warning: DocumentRoot [/var/www/inexistente/] does not exist
AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1.
Syntax OK`}),e.jsx(r,{root:!0,command:"apache2ctl -S",comment:"-S lista TODOS os virtual hosts efetivamente carregados",output:`VirtualHost configuration:
*:80                   blog.exemplo.com.br (/etc/apache2/sites-enabled/blog.exemplo.com.br.conf:1)
*:443                  blog.exemplo.com.br (/etc/apache2/sites-enabled/blog.exemplo.com.br-le-ssl.conf:2)
ServerRoot: "/etc/apache2"
Main DocumentRoot: "/var/www/html"
Main ErrorLog: "/var/log/apache2/error.log"
Mutex default: dir="/var/run/apache2/" mechanism=default
Mutex mpm-accept: using_defaults
PidFile: "/var/run/apache2/apache2.pid"
User: name="www-data" id=33
Group: name="www-data" id=33`}),e.jsx(r,{root:!0,command:"journalctl -u apache2 -n 30 --no-pager"})]}),e.jsx("p",{children:e.jsx("strong",{children:"Erros frequentes:"})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"AH00072: make_sock: could not bind to address [::]:80"})," — outra coisa (Nginx?) está usando a porta 80."]}),e.jsxs("li",{children:[e.jsx("code",{children:"AH01797: client denied by server configuration"})," — falta ",e.jsx("code",{children:"Require all granted"})," no ",e.jsx("code",{children:"<Directory>"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"403 Forbidden"})," — permissões do filesystem (",e.jsx("code",{children:"chmod 755"})," em diretórios, ",e.jsx("code",{children:"644"})," em arquivos, dono ",e.jsx("code",{children:"www-data"}),")."]}),e.jsxs("li",{children:[e.jsx("code",{children:"500 Internal Server Error"})," + ",e.jsx("code",{children:".htaccess"})," não funciona — falta ",e.jsx("code",{children:"a2enmod rewrite"})," ou ",e.jsx("code",{children:"AllowOverride None"}),"."]})]}),e.jsxs(a,{type:"success",title:"Próximos passos",children:["Aprenda ",e.jsx("strong",{children:"PHP"})," (junto com Apache forma a stack LAMP),",e.jsx("strong",{children:" MariaDB/MySQL"})," e ",e.jsx("strong",{children:"PostgreSQL"}),". Considere também explorar ",e.jsx("strong",{children:"Nginx"})," se ainda não viu — entender as duas filosofias amplia muito sua visão de servidores web."]})]})}export{h as default};

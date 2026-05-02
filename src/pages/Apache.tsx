import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Apache() {
  return (
    <PageContainer
      title="Apache HTTP Server — apache2 no Ubuntu"
      subtitle="O servidor web mais antigo e ainda mais flexível: módulos, virtual hosts, .htaccess, mod_rewrite, mod_ssl, mod_proxy e Let's Encrypt."
      difficulty="intermediario"
      timeToRead="50 min"
      category="Servidores Web"
    >
      <p>
        O <strong>Apache HTTP Server</strong> nasceu em 1995 como sucessor do servidor NCSA
        HTTPd e literalmente carregou a web nas costas durante a década de 90 e 2000. Foi
        projetado em torno de uma arquitetura de <strong>módulos carregáveis</strong>: o
        núcleo é minúsculo e tudo (PHP, SSL, autenticação, compressão, rewrite, proxy) entra
        como módulo dinâmico. Essa modularidade é justamente o que ainda o torna a primeira
        escolha quando precisamos de <code>.htaccess</code>, <code>mod_rewrite</code> com
        regras complexas ou integração mod_php embutida.
      </p>
      <p>
        No Ubuntu o pacote chama-se <code>apache2</code> e o empacotamento Debian introduz
        diretórios extras (<code>sites-available</code>, <code>mods-available</code>) e
        ferramentas <code>a2ensite</code>/<code>a2enmod</code> que tornam a administração
        bastante agradável.
      </p>

      <InfoBox type="info" title="Apache no Ubuntu 24.04 (Noble)">
        Versão empacotada: <strong>Apache 2.4.58</strong>. Estrutura totalmente Debian-style
        (não confunda com a estrutura "vanilla" usada em CentOS/RHEL).
      </InfoBox>

      <h2>1. Instalação</h2>

      <Terminal title="wallyson@ubuntu: ~">
        <Command root command="apt update && apt install -y apache2"
          output={`Reading package lists... Done
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
Get:1 http://archive.ubuntu.com/ubuntu noble/main amd64 libapr1t64 amd64 1.7.2-3.1ubuntu0.1 [108 kB]
...
Setting up apache2 (2.4.58-1ubuntu8.4) ...
Enabling module mpm_event.
Enabling module authz_core.
Enabling module authz_host.
Enabling module authn_core.
Enabling module auth_basic.
...
Created symlink /etc/systemd/system/multi-user.target.wants/apache2.service → /lib/systemd/system/apache2.service.
Created symlink /etc/systemd/system/multi-user.target.wants/apache-htcacheclean.service → /lib/systemd/system/apache-htcacheclean.service.
Processing triggers for ufw (0.36.2-6) ...
Processing triggers for man-db (2.12.0-4build2) ...`}
        />
        <Command command="apache2 -v"
          output={`Server version: Apache/2.4.58 (Ubuntu)
Server built:   2024-04-30T18:28:45`} />
        <Command command="apache2 -M | head -20"
          comment="lista módulos atualmente carregados"
          output={`Loaded Modules:
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
 status_module (shared)`} />
        <Command root command="systemctl status apache2 --no-pager"
          output={`● apache2.service - The Apache HTTP Server
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

abr 12 19:00:11 ubuntu systemd[1]: Starting apache2.service - The Apache HTTP Server...
abr 12 19:00:11 ubuntu apachectl[5105]: AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1.
abr 12 19:00:11 ubuntu systemd[1]: Started apache2.service - The Apache HTTP Server.`} />
        <Command command="curl -I http://localhost"
          output={`HTTP/1.1 200 OK
Date: Sat, 12 Apr 2025 22:00:21 GMT
Server: Apache/2.4.58 (Ubuntu)
Last-Modified: Sat, 12 Apr 2025 22:00:11 GMT
ETag: "29cd-633c6bd4b5cba"
Accept-Ranges: bytes
Content-Length: 10701
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8`} />
      </Terminal>

      <h2>2. Estrutura de diretórios</h2>

      <Terminal>
        <Command command="tree -L 2 /etc/apache2"
          output={`/etc/apache2
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

7 directories, ~150 files`} />
      </Terminal>

      <h2>3. Comandos <code>a2*</code> (Apache helpers do Debian)</h2>

      <table>
        <thead>
          <tr><th>Comando</th><th>O que faz</th><th>Equivalente "manual"</th></tr>
        </thead>
        <tbody>
          <tr><td><code>a2enmod &lt;mod&gt;</code></td><td>Ativa módulo</td><td><code>ln -s ../mods-available/X.load mods-enabled/</code></td></tr>
          <tr><td><code>a2dismod &lt;mod&gt;</code></td><td>Desativa módulo</td><td><code>rm /etc/apache2/mods-enabled/X.*</code></td></tr>
          <tr><td><code>a2ensite &lt;site&gt;</code></td><td>Ativa virtual host</td><td><code>ln -s ../sites-available/X.conf sites-enabled/</code></td></tr>
          <tr><td><code>a2dissite &lt;site&gt;</code></td><td>Desativa vhost</td><td><code>rm sites-enabled/X.conf</code></td></tr>
          <tr><td><code>a2enconf &lt;c&gt;</code></td><td>Ativa snippet em conf-enabled</td><td>idem</td></tr>
          <tr><td><code>a2query -m</code></td><td>Lista módulos carregados</td><td><code>apache2 -M</code></td></tr>
        </tbody>
      </table>

      <Terminal>
        <Command root command="a2enmod rewrite headers ssl deflate expires"
          output={`Enabling module rewrite.
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
  systemctl restart apache2`} />
        <Command root command="systemctl restart apache2" />
        <Command command="apache2ctl configtest"
          output={`Syntax OK`} />
      </Terminal>

      <h2>4. Virtual Hosts</h2>

      <p>Vamos criar dois sites: <code>blog.exemplo.com.br</code> e <code>app.exemplo.com.br</code>.</p>

      <Terminal>
        <Command root command="mkdir -p /var/www/blog.exemplo.com.br/public_html" />
        <Command root command="chown -R www-data:www-data /var/www/blog.exemplo.com.br" />
        <Command root command={`bash -c 'echo "<h1>Blog do Wallyson</h1>" > /var/www/blog.exemplo.com.br/public_html/index.html'`} />
        <Command root command="nano /etc/apache2/sites-available/blog.exemplo.com.br.conf" />
      </Terminal>

      <File path="/etc/apache2/sites-available/blog.exemplo.com.br.conf">
{`<VirtualHost *:80>
    ServerName  blog.exemplo.com.br
    ServerAlias www.blog.exemplo.com.br
    ServerAdmin webmaster@exemplo.com.br

    DocumentRoot /var/www/blog.exemplo.com.br/public_html

    <Directory /var/www/blog.exemplo.com.br/public_html>
        Options -Indexes +FollowSymLinks
        AllowOverride All           # permite .htaccess
        Require all granted
    </Directory>

    ErrorLog  ` + '${APACHE_LOG_DIR}' + `/blog.error.log
    CustomLog ` + '${APACHE_LOG_DIR}' + `/blog.access.log combined
    LogLevel warn
</VirtualHost>`}
      </File>

      <InfoBox type="note" title="A variável APACHE_LOG_DIR">
        Essa variável é definida em <code>/etc/apache2/envvars</code> e expandida pelo
        próprio Apache. Vale também: <code>APACHE_RUN_USER</code> (default: www-data),
        <code>APACHE_RUN_GROUP</code>, <code>APACHE_PID_FILE</code>, <code>APACHE_LOCK_DIR</code>.
      </InfoBox>

      <Terminal>
        <Command root command="a2ensite blog.exemplo.com.br.conf"
          output={`Enabling site blog.exemplo.com.br.
To activate the new configuration, you need to run:
  systemctl reload apache2`} />
        <Command root command="a2dissite 000-default.conf"
          output={`Site 000-default disabled.
To activate the new configuration, you need to run:
  systemctl reload apache2`} />
        <Command root command="apache2ctl configtest && systemctl reload apache2"
          output={`Syntax OK`} />
        <Command command={`curl -H "Host: blog.exemplo.com.br" http://localhost`}
          output={`<h1>Blog do Wallyson</h1>`} />
      </Terminal>

      <h2>5. <code>.htaccess</code> e <code>AllowOverride</code></h2>
      <p>
        O Apache permite que diretivas sejam declaradas em arquivos <code>.htaccess</code>
        dentro do próprio DocumentRoot — perfeito para shared hosting, WordPress, etc. O
        custo é desempenho (Apache lê o .htaccess a CADA request).
      </p>

      <File path="/var/www/blog.exemplo.com.br/public_html/.htaccess">
{`# Permite que .html seja servido sem extensão
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
</FilesMatch>`}
      </File>

      <InfoBox type="warning" title="AllowOverride">
        Para <code>.htaccess</code> funcionar você PRECISA ter <code>AllowOverride All</code>
        no <code>&lt;Directory&gt;</code>. Se for <code>None</code> (default), o Apache nem
        abre o arquivo — economizando I/O. Em produção alta performance, prefira mover as
        regras para o <code>&lt;VirtualHost&gt;</code> e manter <code>AllowOverride None</code>.
      </InfoBox>

      <h2>6. <code>mod_rewrite</code> — URL rewriting</h2>

      <File path="exemplos típicos de mod_rewrite">
{`# 1. Forçar HTTPS
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
RewriteRule .* - [F,L]   # F = 403 Forbidden`}
      </File>

      <p>Flags mais úteis do <code>RewriteRule</code>:</p>
      <table>
        <thead><tr><th>Flag</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><code>L</code></td><td>Last — para de processar regras</td></tr>
          <tr><td><code>R=301</code></td><td>Redirect permanente</td></tr>
          <tr><td><code>R=302</code></td><td>Redirect temporário</td></tr>
          <tr><td><code>QSA</code></td><td>Query String Append (mantém ?a=1)</td></tr>
          <tr><td><code>NC</code></td><td>No Case (case-insensitive)</td></tr>
          <tr><td><code>F</code></td><td>403 Forbidden</td></tr>
          <tr><td><code>G</code></td><td>410 Gone</td></tr>
          <tr><td><code>P</code></td><td>Proxy (precisa mod_proxy)</td></tr>
          <tr><td><code>E=VAR:val</code></td><td>Define variável de ambiente</td></tr>
        </tbody>
      </table>

      <h2>7. <code>mod_ssl</code> + Let's Encrypt</h2>

      <Terminal>
        <Command root command="snap install --classic certbot"
          output={`certbot 2.10.0 from Certbot Project (certbot-eff✓) installed`} />
        <Command root command="ln -s /snap/bin/certbot /usr/bin/certbot" />
        <Command root command="certbot --apache -d blog.exemplo.com.br -d www.blog.exemplo.com.br --redirect --agree-tos -m admin@exemplo.com.br"
          output={`Saving debug log to /var/log/letsencrypt/letsencrypt.log
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
- The certificate will need to be renewed before it expires.`} />
        <Command command="curl -I https://blog.exemplo.com.br"
          output={`HTTP/1.1 200 OK
Date: Sat, 12 Apr 2025 22:30:11 GMT
Server: Apache/2.4.58 (Ubuntu)
Strict-Transport-Security: max-age=63072000
Content-Type: text/html`} />
      </Terminal>

      <File path="/etc/apache2/sites-available/blog.exemplo.com.br-le-ssl.conf">
{`<IfModule mod_ssl.c>
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

    ErrorLog  ` + '${APACHE_LOG_DIR}' + `/blog.error.log
    CustomLog ` + '${APACHE_LOG_DIR}' + `/blog.access.log combined
</VirtualHost>
</IfModule>`}
      </File>

      <h2>8. <code>mod_proxy</code> — Apache como reverse proxy</h2>

      <Terminal>
        <Command root command="a2enmod proxy proxy_http proxy_wstunnel proxy_balancer lbmethod_byrequests"
          output={`Considering dependency proxy for proxy_http:
Enabling module proxy.
Enabling module proxy_http.
Enabling module proxy_wstunnel.
Enabling module proxy_balancer.
Considering dependency slotmem_shm for lbmethod_byrequests:
Enabling module slotmem_shm.
Enabling module lbmethod_byrequests.
To activate the new configuration, you need to run:
  systemctl restart apache2`} />
      </Terminal>

      <File path="/etc/apache2/sites-available/api.exemplo.com.br.conf">
{`<VirtualHost *:80>
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

    ErrorLog  ` + '${APACHE_LOG_DIR}' + `/api.error.log
    CustomLog ` + '${APACHE_LOG_DIR}' + `/api.access.log combined
</VirtualHost>`}
      </File>

      <p>Para load balancing entre vários backends:</p>
      <File path="balanceador">
{`<Proxy balancer://node_cluster>
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
</Location>`}
      </File>

      <h2>9. MPMs: prefork, worker, event</h2>
      <p>
        O Apache permite trocar o motor de execução. No Ubuntu 24.04 o padrão é
        <code>mpm_event</code> (assíncrono, similar ao Nginx).
      </p>

      <table>
        <thead><tr><th>MPM</th><th>Modelo</th><th>Quando usar</th></tr></thead>
        <tbody>
          <tr><td><code>mpm_prefork</code></td><td>1 processo por conexão, sem threads</td><td>com mod_php (não é thread-safe)</td></tr>
          <tr><td><code>mpm_worker</code></td><td>processos com threads</td><td>genérico, baixo uso de memória</td></tr>
          <tr><td><code>mpm_event</code></td><td>worker + I/O assíncrono</td><td>default; melhor para keep-alive</td></tr>
        </tbody>
      </table>

      <Terminal>
        <Command command="apache2ctl -V | grep MPM"
          output={` Server MPM:     event`} />
        <Command root command="a2dismod mpm_event && a2enmod mpm_prefork"
          comment="troca para prefork (necessário com mod_php)"
          output={`Module mpm_event disabled.
Considering dependency mpm_prefork for mpm_prefork:
Enabling module mpm_prefork.
To activate the new configuration, you need to run:
  systemctl restart apache2`} />
      </Terminal>

      <File path="/etc/apache2/mods-available/mpm_event.conf">
{`<IfModule mpm_event_module>
    StartServers              2
    MinSpareThreads          25
    MaxSpareThreads          75
    ThreadLimit              64
    ThreadsPerChild          25
    MaxRequestWorkers       150
    MaxConnectionsPerChild    0
</IfModule>`}
      </File>

      <h2>10. Logs e análise</h2>

      <Terminal>
        <Command command="tail -3 /var/log/apache2/blog.access.log"
          output={`192.168.1.42 - - [12/Apr/2025:22:30:11 -0300] "GET / HTTP/1.1" 200 26 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0"
192.168.1.42 - - [12/Apr/2025:22:30:11 -0300] "GET /favicon.ico HTTP/1.1" 404 488 "https://blog.exemplo.com.br/" "Mozilla/5.0..."
192.168.1.50 - - [12/Apr/2025:22:30:18 -0300] "POST /wp-login.php HTTP/1.1" 401 1232 "-" "WordPress/6.4; https://malicioso.com"`} />
        <Command command="tail -2 /var/log/apache2/blog.error.log"
          output={`[Sat Apr 12 22:31:01.184321 2025] [authz_core:error] [pid 5108] [client 192.168.1.50:54321] AH01630: client denied by server configuration: /var/www/blog.exemplo.com.br/public_html/.git
[Sat Apr 12 22:32:14.412987 2025] [php:error] [pid 5109] [client 187.45.99.10:33221] PHP Fatal error: Uncaught Error: Class 'PDO' not found in /var/www/blog/index.php:14`} />
      </Terminal>

      <p>Definindo um formato customizado e mostrando IP real atrás de proxy:</p>
      <File path="/etc/apache2/apache2.conf (trecho)">
{`LogFormat "%h %l %u %t \\"%r\\" %>s %b \\"%{Referer}i\\" \\"%{User-Agent}i\\"" combined
LogFormat "%h %l %u %t \\"%r\\" %>s %b" common
LogFormat "%{X-Forwarded-For}i %l %u %t \\"%r\\" %>s %b \\"%{Referer}i\\" \\"%{User-Agent}i\\"" proxy

# Para usar com Cloudflare/Nginx na frente:
# CustomLog ` + '${APACHE_LOG_DIR}' + `/access.log proxy`}
      </File>

      <h2>11. Compressão (mod_deflate) e cache (mod_expires)</h2>

      <File path="/etc/apache2/conf-available/compress-cache.conf">
{`<IfModule mod_deflate.c>
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
</IfModule>`}
      </File>

      <Terminal>
        <Command root command="a2enconf compress-cache && systemctl reload apache2" />
        <Command command="curl -H 'Accept-Encoding: gzip' -I https://blog.exemplo.com.br"
          output={`HTTP/1.1 200 OK
Content-Encoding: gzip
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8
Cache-Control: max-age=0
Expires: Sat, 12 Apr 2025 22:35:00 GMT`} />
      </Terminal>

      <h2>12. Hardening básico</h2>

      <File path="/etc/apache2/conf-available/security.conf (ajustes)">
{`ServerTokens Prod              # esconde versão (Server: Apache)
ServerSignature Off            # remove rodapé "Apache/2.4.58 ..." em páginas de erro

TraceEnable Off                # desativa método TRACE (XSS via TRACE)

Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set Referrer-Policy "strict-origin-when-cross-origin"
Header set Permissions-Policy "geolocation=(), camera=(), microphone=()"

# Esconde headers sensíveis
Header unset X-Powered-By
Header unset Server`}
      </File>

      <h2>13. Apache vs Nginx — quando escolher cada um</h2>

      <table>
        <thead><tr><th>Critério</th><th>Apache</th><th>Nginx</th></tr></thead>
        <tbody>
          <tr><td>Modelo</td><td>Processos/threads (MPM)</td><td>Event-driven assíncrono</td></tr>
          <tr><td>.htaccess</td><td>Sim (per-directory)</td><td>Não suporta</td></tr>
          <tr><td>mod_php embarcado</td><td>Sim (mpm_prefork)</td><td>Só via PHP-FPM</td></tr>
          <tr><td>Estáticos sob alta carga</td><td>Bom</td><td>Excelente</td></tr>
          <tr><td>Reverse proxy</td><td>mod_proxy (ok)</td><td>Nativo, otimizado</td></tr>
          <tr><td>Configuração</td><td>Verbosa, XML-like</td><td>Minimalista, nginx.conf</td></tr>
          <tr><td>Curva de aprendizado</td><td>Mais fácil para iniciantes</td><td>Requer entender contextos</td></tr>
          <tr><td>Memória por conexão</td><td>~1-2 MB (worker)</td><td>~10 KB</td></tr>
          <tr><td>Dinâmico em runtime</td><td>módulos via a2enmod</td><td>módulos compilados/dinâmicos</td></tr>
        </tbody>
      </table>

      <InfoBox type="tip" title="Combo Nginx + Apache">
        Em hosting compartilhado é comum colocar <strong>Nginx na frente</strong> (TLS,
        cache, gzip) e <strong>Apache atrás</strong> servindo PHP via mod_php — assim você
        ganha o desempenho do Nginx e mantém compatibilidade com <code>.htaccess</code> de
        clientes legados.
      </InfoBox>

      <h2>14. Troubleshooting</h2>

      <Terminal>
        <Command root command="apache2ctl configtest"
          output={`AH00112: Warning: DocumentRoot [/var/www/inexistente/] does not exist
AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1.
Syntax OK`} />
        <Command root command="apache2ctl -S"
          comment="-S lista TODOS os virtual hosts efetivamente carregados"
          output={`VirtualHost configuration:
*:80                   blog.exemplo.com.br (/etc/apache2/sites-enabled/blog.exemplo.com.br.conf:1)
*:443                  blog.exemplo.com.br (/etc/apache2/sites-enabled/blog.exemplo.com.br-le-ssl.conf:2)
ServerRoot: "/etc/apache2"
Main DocumentRoot: "/var/www/html"
Main ErrorLog: "/var/log/apache2/error.log"
Mutex default: dir="/var/run/apache2/" mechanism=default
Mutex mpm-accept: using_defaults
PidFile: "/var/run/apache2/apache2.pid"
User: name="www-data" id=33
Group: name="www-data" id=33`} />
        <Command root command="journalctl -u apache2 -n 30 --no-pager" />
      </Terminal>

      <p><strong>Erros frequentes:</strong></p>
      <ul>
        <li><code>AH00072: make_sock: could not bind to address [::]:80</code> — outra coisa (Nginx?) está usando a porta 80.</li>
        <li><code>AH01797: client denied by server configuration</code> — falta <code>Require all granted</code> no <code>&lt;Directory&gt;</code>.</li>
        <li><code>403 Forbidden</code> — permissões do filesystem (<code>chmod 755</code> em diretórios, <code>644</code> em arquivos, dono <code>www-data</code>).</li>
        <li><code>500 Internal Server Error</code> + <code>.htaccess</code> não funciona — falta <code>a2enmod rewrite</code> ou <code>AllowOverride None</code>.</li>
      </ul>

      <InfoBox type="success" title="Próximos passos">
        Aprenda <strong>PHP</strong> (junto com Apache forma a stack LAMP),
        <strong> MariaDB/MySQL</strong> e <strong>PostgreSQL</strong>. Considere também
        explorar <strong>Nginx</strong> se ainda não viu — entender as duas filosofias amplia
        muito sua visão de servidores web.
      </InfoBox>
    </PageContainer>
  );
}

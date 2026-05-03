import{j as e}from"./index-BGu3owFd.js";import{P as r,I as a}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function l(){return e.jsxs(r,{title:"Apache HTTP Server no Termux",subtitle:"Instalar e configurar o apache2 rodando nativo no Termux: virtual hosts, mod_rewrite e .htaccess no Android sem root.",difficulty:"intermediario",timeToRead:"25 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"apache2"})," "," — "," ","daemon."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"DocumentRoot"})," "," — "," ","/var/www/html."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"VirtualHost"})," "," — "," ","múltiplos sites."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"a2enmod"})," "," — "," ","habilita módulo."]})]}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Apache HTTP Server"})," nasceu em 1995 e é famoso pela arquitetura de ",e.jsx("strong",{children:"módulos carregáveis"})," e pelo suporte a",e.jsx("code",{children:" .htaccess"}),". No Termux ele roda nativo (pacote",e.jsx("code",{children:" apache2"}),") — útil quando você precisa testar regras complexas de ",e.jsx("code",{children:"mod_rewrite"}),", hospedar um WordPress local ou ensinar/estudar virtual hosts diretamente do celular."]}),e.jsx(a,{type:"info",title:"Caveats do Apache no Termux",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Portas < 1024 não bindam sem root"}),". Use ",e.jsx("code",{children:"8080"})," em vez de ",e.jsx("code",{children:"80"})," e ",e.jsx("code",{children:"8443"})," em vez de ",e.jsx("code",{children:"443"}),"."]}),e.jsxs("li",{children:["Não existe ",e.jsx("code",{children:"systemd"}),", ",e.jsx("code",{children:"www-data"}),", ",e.jsx("code",{children:"sudo"}),", ",e.jsx("code",{children:"a2ensite"}),", ",e.jsx("code",{children:"a2enmod"})," nem a estrutura ",e.jsx("code",{children:"sites-available"}),". Tudo é editado direto em ",e.jsx("code",{children:"$PREFIX/etc/apache2/httpd.conf"}),"."]}),e.jsxs("li",{children:["Caminhos vivem em ",e.jsx("code",{children:"$PREFIX"})," (",e.jsx("code",{children:"/data/data/com.termux/files/usr"}),"), não em ",e.jsx("code",{children:"/etc"})," ou ",e.jsx("code",{children:"/var"}),"."]}),e.jsx("li",{children:"O IP do celular muda entre Wi-Fi e dados móveis e em 4G/5G você costuma estar atrás do CG-NAT da operadora."}),e.jsxs("li",{children:["Pra subir como serviço use ",e.jsx("code",{children:"termux-services"})," (runit) — ou simplesmente o binário ",e.jsx("code",{children:"httpd"}),"."]})]})}),e.jsx("h2",{children:"1. Instalação"}),e.jsx(o,{title:"Instalar o Apache no Termux",code:`pkg update && pkg upgrade -y
pkg install -y apache2

# Confere a versão (binário se chama "httpd" no Termux)
httpd -v
# Server version: Apache/2.4.x (Unix)

# Lista módulos compilados
httpd -l

# Lista módulos carregados via httpd.conf
httpd -M`}),e.jsx("h2",{children:"2. Estrutura de diretórios no Termux"}),e.jsx(o,{title:"Onde mora o que",code:`# Configuração principal
$PREFIX/etc/apache2/httpd.conf

# Configurações extras (incluídas no httpd.conf)
$PREFIX/etc/apache2/extra/

# DocumentRoot padrão
$PREFIX/share/apache2/default-site/htdocs/

# Logs
$PREFIX/var/log/apache2/access_log
$PREFIX/var/log/apache2/error_log

# Binários
$PREFIX/bin/httpd
$PREFIX/bin/apachectl`}),e.jsx("h2",{children:"3. Subir o Apache (sem systemd)"}),e.jsx(o,{title:"Iniciar e parar manualmente",code:`# Sobe o Apache (como daemon, em background)
httpd

# Equivalente, com checagens extras
apachectl start

# Para
apachectl stop

# Recarrega a config (graceful — não dropa conexões)
apachectl graceful

# Testa a config antes de aplicar
apachectl configtest
# Saída esperada: Syntax OK

# Acesso local
curl http://localhost:8080`}),e.jsxs(a,{type:"warning",title:"Mude a porta antes de subir",children:["Edite ",e.jsx("code",{children:"$PREFIX/etc/apache2/httpd.conf"})," e troque",e.jsx("code",{children:" Listen 80"})," por ",e.jsx("code",{children:"Listen 8080"}),". Sem isso o Apache vai falhar com ",e.jsx("code",{children:"permission denied"})," ao tentar bindar a porta 80."]}),e.jsx("h2",{children:"4. Como serviço com termux-services"}),e.jsx(o,{title:"apache2 como sv",code:`pkg install -y termux-services

# Reinicie o Termux (saia e entre de novo) pra o sv carregar
sv-enable apache2

sv up apache2
sv status apache2
sv down apache2

# Logs do serviço
tail -f $PREFIX/var/log/sv/apache2/current`}),e.jsx("h2",{children:"5. httpd.conf — anatomia mínima"}),e.jsxs("p",{children:['O Apache do Termux usa o esquema clássico "vanilla" (um único',e.jsx("code",{children:" httpd.conf"}),"), não o esquema Debian. Você adiciona sites e módulos no próprio arquivo (ou via ",e.jsx("code",{children:"Include"}),")."]}),e.jsx(o,{title:"$PREFIX/etc/apache2/httpd.conf (trechos importantes)",language:"apache",code:`ServerRoot "/data/data/com.termux/files/usr"

# Porta — sempre >= 1024 no Termux
Listen 8080

# Módulos (descomente conforme precisar)
LoadModule rewrite_module     libexec/apache2/mod_rewrite.so
LoadModule headers_module     libexec/apache2/mod_headers.so
LoadModule deflate_module     libexec/apache2/mod_deflate.so
LoadModule expires_module     libexec/apache2/mod_expires.so
LoadModule ssl_module         libexec/apache2/mod_ssl.so
LoadModule proxy_module       libexec/apache2/mod_proxy.so
LoadModule proxy_http_module  libexec/apache2/mod_proxy_http.so

# Sem User/Group www-data — comente as linhas:
# User  daemon
# Group daemon

ServerName localhost:8080

DocumentRoot "/data/data/com.termux/files/usr/share/apache2/default-site/htdocs"

<Directory "/data/data/com.termux/files/usr/share/apache2/default-site/htdocs">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

# Logs
ErrorLog  "/data/data/com.termux/files/usr/var/log/apache2/error_log"
CustomLog "/data/data/com.termux/files/usr/var/log/apache2/access_log" common

# Vhosts extras
Include etc/apache2/extra/httpd-vhosts.conf`}),e.jsx("h2",{children:"6. Servir uma página"}),e.jsx(o,{title:"Sua primeira página",code:`mkdir -p $PREFIX/share/apache2/default-site/htdocs
cat > $PREFIX/share/apache2/default-site/htdocs/index.html <<'HTML'
<!doctype html>
<html><body>
  <h1>Apache rodando no Termux!</h1>
</body></html>
HTML

apachectl configtest && apachectl graceful
curl http://localhost:8080`}),e.jsx("h2",{children:"7. Virtual Hosts"}),e.jsxs("p",{children:["Edite ",e.jsx("code",{children:"$PREFIX/etc/apache2/extra/httpd-vhosts.conf"})," (já incluído pelo ",e.jsx("code",{children:"httpd.conf"}),"):"]}),e.jsx(o,{title:"$PREFIX/etc/apache2/extra/httpd-vhosts.conf",language:"apache",code:`<VirtualHost *:8080>
    ServerName  blog.local
    DocumentRoot "/data/data/com.termux/files/home/sites/blog"

    <Directory "/data/data/com.termux/files/home/sites/blog">
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog  "/data/data/com.termux/files/usr/var/log/apache2/blog-error.log"
    CustomLog "/data/data/com.termux/files/usr/var/log/apache2/blog-access.log" combined
</VirtualHost>`}),e.jsx(o,{title:"Testar",code:`mkdir -p ~/sites/blog
echo "<h1>Blog do Termux</h1>" > ~/sites/blog/index.html

apachectl configtest && apachectl graceful
curl -H "Host: blog.local" http://localhost:8080`}),e.jsx("h2",{children:"8. .htaccess e AllowOverride"}),e.jsxs("p",{children:["Pra que o ",e.jsx("code",{children:".htaccess"})," funcione você precisa de ",e.jsx("code",{children:"AllowOverride All"})," no ",e.jsx("code",{children:"<Directory>"}),"."]}),e.jsx(o,{title:"~/sites/blog/.htaccess",language:"apache",code:`# Habilita rewrite
RewriteEngine On

# URLs amigáveis (front-controller estilo Laravel/WordPress)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]

# Bloqueia listagem de diretório
Options -Indexes

# Headers de segurança
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
</IfModule>

# Cache de assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType text/css   "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
</IfModule>

# Bloqueia .git, .env etc
<FilesMatch "^\\.(htaccess|env|git)">
    Require all denied
</FilesMatch>`}),e.jsx("h2",{children:"9. mod_rewrite — receitas úteis"}),e.jsx(o,{title:"Snippets típicos",language:"apache",code:`# 1. Forçar HTTPS (se você expor via túnel/ngrok)
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R=301,L]

# 2. Bloquear bots ruins por User-Agent
RewriteCond %{HTTP_USER_AGENT} (semrush|ahrefs|mj12bot) [NC]
RewriteRule .* - [F,L]

# 3. Versionamento de API
RewriteRule ^api/v1/(.*)$ /backend.php?version=1&path=$1 [L,QSA]`}),e.jsx("h2",{children:"10. Apache como reverse proxy"}),e.jsx("p",{children:"Mesma ideia do Nginx: você roda um Node/Python na porta 3000 e o Apache fica na frente:"}),e.jsx(o,{title:"vhost de proxy",language:"apache",code:`<VirtualHost *:8080>
    ServerName api.local

    ProxyPreserveHost On
    ProxyRequests Off

    <Proxy *>
        Require all granted
    </Proxy>

    ProxyPass        / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    ErrorLog  "/data/data/com.termux/files/usr/var/log/apache2/api-error.log"
    CustomLog "/data/data/com.termux/files/usr/var/log/apache2/api-access.log" combined
</VirtualHost>`}),e.jsx(o,{title:"Habilitar proxy no httpd.conf (descomente)",language:"apache",code:`LoadModule proxy_module      libexec/apache2/mod_proxy.so
LoadModule proxy_http_module libexec/apache2/mod_proxy_http.so`}),e.jsx("h2",{children:"11. HTTPS local (autoassinado)"}),e.jsx(o,{title:"Certificado de teste",code:`pkg install -y openssl-tool
mkdir -p $PREFIX/etc/apache2/ssl
cd $PREFIX/etc/apache2/ssl

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\
  -keyout server.key -out server.crt \\
  -subj "/CN=meu-termux"`}),e.jsx(o,{title:"vhost TLS na porta 8443",language:"apache",code:`Listen 8443

<VirtualHost *:8443>
    ServerName localhost
    DocumentRoot "/data/data/com.termux/files/usr/share/apache2/default-site/htdocs"

    SSLEngine on
    SSLCertificateFile    "/data/data/com.termux/files/usr/etc/apache2/ssl/server.crt"
    SSLCertificateKeyFile "/data/data/com.termux/files/usr/etc/apache2/ssl/server.key"
</VirtualHost>`}),e.jsx("h2",{children:"12. Logs e troubleshooting"}),e.jsx(o,{title:"Acompanhar erros",code:`tail -f $PREFIX/var/log/apache2/error_log
tail -f $PREFIX/var/log/apache2/access_log

# Conferir o que está usando a porta
netstat -tlnp 2>/dev/null | grep 8080

# Sempre antes de aplicar mudança:
apachectl configtest`}),e.jsx(a,{type:"danger",title:"Erros típicos no Termux",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"(13)Permission denied: AH00072: make_sock: could not bind to address [::]:80"})," → troque ",e.jsx("code",{children:"Listen 80"})," por ",e.jsx("code",{children:"Listen 8080"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"getpwnam: User daemon does not exist"})," → comente as diretivas ",e.jsx("code",{children:"User"})," e ",e.jsx("code",{children:"Group"})," no ",e.jsx("code",{children:"httpd.conf"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:".htaccess: directive not allowed here"})," → garanta ",e.jsx("code",{children:"AllowOverride All"})," no ",e.jsx("code",{children:"<Directory>"}),"."]})]})}),e.jsx("h2",{children:"13. Manter o Apache rodando"}),e.jsx(o,{title:"Wake lock + boot",code:`# Impede o Android de matar o processo em standby
termux-wake-lock

# Liberar
termux-wake-unlock

# Subir no boot do celular (precisa do app Termux:Boot)
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/start-apache <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock
httpd
EOF
chmod +x ~/.termux/boot/start-apache`}),e.jsxs(a,{type:"info",title:"Nginx ou Apache no Termux?",children:["Os dois rodam bem. O ",e.jsx("strong",{children:"Nginx"})," consome menos memória e é mais leve pra estáticos e proxy. O ",e.jsx("strong",{children:"Apache"})," brilha quando você precisa de ",e.jsx("code",{children:".htaccess"})," e ",e.jsx("code",{children:"mod_rewrite"}),"complexo (ex.: portar um projeto WordPress/Laravel local sem mexer em vhost)."]})]})}export{l as default};

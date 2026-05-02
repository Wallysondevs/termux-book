import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Apache() {
  return (
    <PageContainer
      title="Apache HTTP Server no Termux"
      subtitle="Instalar e configurar o apache2 rodando nativo no Termux: virtual hosts, mod_rewrite e .htaccess no Android sem root."
      difficulty="intermediario"
      timeToRead="25 min"
    >
      <p>
        O <strong>Apache HTTP Server</strong> nasceu em 1995 e é famoso pela
        arquitetura de <strong>módulos carregáveis</strong> e pelo suporte a
        <code> .htaccess</code>. No Termux ele roda nativo (pacote
        <code> apache2</code>) — útil quando você precisa testar regras
        complexas de <code>mod_rewrite</code>, hospedar um WordPress local ou
        ensinar/estudar virtual hosts diretamente do celular.
      </p>

      <AlertBox type="info" title="Caveats do Apache no Termux">
        <ul>
          <li><strong>Portas &lt; 1024 não bindam sem root</strong>. Use <code>8080</code> em vez de <code>80</code> e <code>8443</code> em vez de <code>443</code>.</li>
          <li>Não existe <code>systemd</code>, <code>www-data</code>, <code>sudo</code>, <code>a2ensite</code>, <code>a2enmod</code> nem a estrutura <code>sites-available</code>. Tudo é editado direto em <code>$PREFIX/etc/apache2/httpd.conf</code>.</li>
          <li>Caminhos vivem em <code>$PREFIX</code> (<code>/data/data/com.termux/files/usr</code>), não em <code>/etc</code> ou <code>/var</code>.</li>
          <li>O IP do celular muda entre Wi-Fi e dados móveis e em 4G/5G você costuma estar atrás do CG-NAT da operadora.</li>
          <li>Pra subir como serviço use <code>termux-services</code> (runit) — ou simplesmente o binário <code>httpd</code>.</li>
        </ul>
      </AlertBox>

      <h2>1. Instalação</h2>
      <CodeBlock
        title="Instalar o Apache no Termux"
        code={`pkg update && pkg upgrade -y
pkg install -y apache2

# Confere a versão (binário se chama "httpd" no Termux)
httpd -v
# Server version: Apache/2.4.x (Unix)

# Lista módulos compilados
httpd -l

# Lista módulos carregados via httpd.conf
httpd -M`}
      />

      <h2>2. Estrutura de diretórios no Termux</h2>
      <CodeBlock
        title="Onde mora o que"
        code={`# Configuração principal
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
$PREFIX/bin/apachectl`}
      />

      <h2>3. Subir o Apache (sem systemd)</h2>
      <CodeBlock
        title="Iniciar e parar manualmente"
        code={`# Sobe o Apache (como daemon, em background)
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
curl http://localhost:8080`}
      />

      <AlertBox type="warning" title="Mude a porta antes de subir">
        Edite <code>$PREFIX/etc/apache2/httpd.conf</code> e troque
        <code> Listen 80</code> por <code>Listen 8080</code>. Sem isso o
        Apache vai falhar com <code>permission denied</code> ao tentar
        bindar a porta 80.
      </AlertBox>

      <h2>4. Como serviço com termux-services</h2>
      <CodeBlock
        title="apache2 como sv"
        code={`pkg install -y termux-services

# Reinicie o Termux (saia e entre de novo) pra o sv carregar
sv-enable apache2

sv up apache2
sv status apache2
sv down apache2

# Logs do serviço
tail -f $PREFIX/var/log/sv/apache2/current`}
      />

      <h2>5. httpd.conf — anatomia mínima</h2>
      <p>
        O Apache do Termux usa o esquema clássico "vanilla" (um único
        <code> httpd.conf</code>), não o esquema Debian. Você adiciona
        sites e módulos no próprio arquivo (ou via <code>Include</code>).
      </p>
      <CodeBlock
        title="$PREFIX/etc/apache2/httpd.conf (trechos importantes)"
        language="apache"
        code={`ServerRoot "/data/data/com.termux/files/usr"

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
Include etc/apache2/extra/httpd-vhosts.conf`}
      />

      <h2>6. Servir uma página</h2>
      <CodeBlock
        title="Sua primeira página"
        code={`mkdir -p $PREFIX/share/apache2/default-site/htdocs
cat > $PREFIX/share/apache2/default-site/htdocs/index.html <<'HTML'
<!doctype html>
<html><body>
  <h1>Apache rodando no Termux!</h1>
</body></html>
HTML

apachectl configtest && apachectl graceful
curl http://localhost:8080`}
      />

      <h2>7. Virtual Hosts</h2>
      <p>
        Edite <code>$PREFIX/etc/apache2/extra/httpd-vhosts.conf</code> (já
        incluído pelo <code>httpd.conf</code>):
      </p>
      <CodeBlock
        title="$PREFIX/etc/apache2/extra/httpd-vhosts.conf"
        language="apache"
        code={`<VirtualHost *:8080>
    ServerName  blog.local
    DocumentRoot "/data/data/com.termux/files/home/sites/blog"

    <Directory "/data/data/com.termux/files/home/sites/blog">
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog  "/data/data/com.termux/files/usr/var/log/apache2/blog-error.log"
    CustomLog "/data/data/com.termux/files/usr/var/log/apache2/blog-access.log" combined
</VirtualHost>`}
      />
      <CodeBlock
        title="Testar"
        code={`mkdir -p ~/sites/blog
echo "<h1>Blog do Termux</h1>" > ~/sites/blog/index.html

apachectl configtest && apachectl graceful
curl -H "Host: blog.local" http://localhost:8080`}
      />

      <h2>8. .htaccess e AllowOverride</h2>
      <p>
        Pra que o <code>.htaccess</code> funcione você precisa
        de <code>AllowOverride All</code> no <code>&lt;Directory&gt;</code>.
      </p>
      <CodeBlock
        title="~/sites/blog/.htaccess"
        language="apache"
        code={`# Habilita rewrite
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
</FilesMatch>`}
      />

      <h2>9. mod_rewrite — receitas úteis</h2>
      <CodeBlock
        title="Snippets típicos"
        language="apache"
        code={`# 1. Forçar HTTPS (se você expor via túnel/ngrok)
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R=301,L]

# 2. Bloquear bots ruins por User-Agent
RewriteCond %{HTTP_USER_AGENT} (semrush|ahrefs|mj12bot) [NC]
RewriteRule .* - [F,L]

# 3. Versionamento de API
RewriteRule ^api/v1/(.*)$ /backend.php?version=1&path=$1 [L,QSA]`}
      />

      <h2>10. Apache como reverse proxy</h2>
      <p>
        Mesma ideia do Nginx: você roda um Node/Python na porta 3000 e o
        Apache fica na frente:
      </p>
      <CodeBlock
        title="vhost de proxy"
        language="apache"
        code={`<VirtualHost *:8080>
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
</VirtualHost>`}
      />
      <CodeBlock
        title="Habilitar proxy no httpd.conf (descomente)"
        language="apache"
        code={`LoadModule proxy_module      libexec/apache2/mod_proxy.so
LoadModule proxy_http_module libexec/apache2/mod_proxy_http.so`}
      />

      <h2>11. HTTPS local (autoassinado)</h2>
      <CodeBlock
        title="Certificado de teste"
        code={`pkg install -y openssl-tool
mkdir -p $PREFIX/etc/apache2/ssl
cd $PREFIX/etc/apache2/ssl

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\
  -keyout server.key -out server.crt \\
  -subj "/CN=meu-termux"`}
      />
      <CodeBlock
        title="vhost TLS na porta 8443"
        language="apache"
        code={`Listen 8443

<VirtualHost *:8443>
    ServerName localhost
    DocumentRoot "/data/data/com.termux/files/usr/share/apache2/default-site/htdocs"

    SSLEngine on
    SSLCertificateFile    "/data/data/com.termux/files/usr/etc/apache2/ssl/server.crt"
    SSLCertificateKeyFile "/data/data/com.termux/files/usr/etc/apache2/ssl/server.key"
</VirtualHost>`}
      />

      <h2>12. Logs e troubleshooting</h2>
      <CodeBlock
        title="Acompanhar erros"
        code={`tail -f $PREFIX/var/log/apache2/error_log
tail -f $PREFIX/var/log/apache2/access_log

# Conferir o que está usando a porta
netstat -tlnp 2>/dev/null | grep 8080

# Sempre antes de aplicar mudança:
apachectl configtest`}
      />

      <AlertBox type="danger" title="Erros típicos no Termux">
        <ul>
          <li><code>(13)Permission denied: AH00072: make_sock: could not bind to address [::]:80</code> → troque <code>Listen 80</code> por <code>Listen 8080</code>.</li>
          <li><code>getpwnam: User daemon does not exist</code> → comente as diretivas <code>User</code> e <code>Group</code> no <code>httpd.conf</code>.</li>
          <li><code>.htaccess: directive not allowed here</code> → garanta <code>AllowOverride All</code> no <code>&lt;Directory&gt;</code>.</li>
        </ul>
      </AlertBox>

      <h2>13. Manter o Apache rodando</h2>
      <CodeBlock
        title="Wake lock + boot"
        code={`# Impede o Android de matar o processo em standby
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
chmod +x ~/.termux/boot/start-apache`}
      />

      <AlertBox type="info" title="Nginx ou Apache no Termux?">
        Os dois rodam bem. O <strong>Nginx</strong> consome menos memória e é
        mais leve pra estáticos e proxy. O <strong>Apache</strong> brilha
        quando você precisa de <code>.htaccess</code> e <code>mod_rewrite</code>
        complexo (ex.: portar um projeto WordPress/Laravel local sem mexer
        em vhost).
      </AlertBox>
    </PageContainer>
  );
}

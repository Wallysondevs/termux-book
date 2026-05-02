import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PHP() {
  return (
    <PageContainer
      title="PHP no Termux"
      subtitle="PHP-CLI no Android: instalar, rodar scripts, servidor de desenvolvimento embutido (php -S), Composer e integração com Nginx via PHP-FPM."
      difficulty="intermediario"
      timeToRead="25 min"
    >
      <p>
        O <strong>PHP</strong> roda nativo no Termux — útil pra estudar a
        linguagem, escrever automações no celular, testar uma API rápida ou
        servir um WordPress/Laravel local. Tanto o <code>php</code> (CLI)
        quanto o <code>php-fpm</code> têm pacote oficial.
      </p>

      <AlertBox type="info" title="Caveats do PHP no Termux">
        <ul>
          <li>Não existe <code>sudo</code>, <code>systemctl</code> nem <code>phpenmod</code>/<code>phpdismod</code>. Você habilita extensões editando o <code>php.ini</code> direto.</li>
          <li>Tudo vive em <code>$PREFIX</code> (<code>/data/data/com.termux/files/usr</code>): binário em <code>$PREFIX/bin/php</code>, config em <code>$PREFIX/etc/php.ini</code>.</li>
          <li>O servidor embutido (<code>php -S</code>) é perfeito pra dev local. Em rede móvel você raramente recebe conexão de fora (CG-NAT).</li>
          <li>Portas &lt; 1024 não bindam sem root — use <code>8000</code>, <code>8080</code>.</li>
          <li>Esqueça LAMP enterprise no celular. Pra produção real, use um VPS.</li>
        </ul>
      </AlertBox>

      <h2>1. Instalação</h2>
      <CodeBlock
        title="Instalar PHP CLI"
        code={`pkg update && pkg upgrade -y
pkg install -y php

# Confere a versão (geralmente PHP 8.x)
php -v

# Lista todas as extensões carregadas
php -m

# Mostra a config completa (equivalente a phpinfo() no terminal)
php -i | less

# Caminho do php.ini ativo
php --ini`}
      />

      <h2>2. PHP-FPM (FastCGI Process Manager)</h2>
      <p>
        Use o <code>php-fpm</code> quando quiser plugar o PHP num servidor
        web (Nginx) via socket Unix. Pra rodar scripts CLI puros, o
        <code> php</code> sozinho basta.
      </p>
      <CodeBlock
        title="Instalar e iniciar o PHP-FPM"
        code={`pkg install -y php-fpm

# Config principal
ls $PREFIX/etc/php-fpm.d/

# Iniciar manualmente em foreground (pra debug)
php-fpm -F

# Em background como serviço:
pkg install -y termux-services
sv-enable php-fpm
sv up php-fpm
sv status php-fpm

# Logs
tail -f $PREFIX/var/log/sv/php-fpm/current`}
      />

      <h2>3. Servidor embutido — <code>php -S</code></h2>
      <p>
        O modo mais simples de servir PHP no celular. Sobe um web server
        single-thread perfeito pra desenvolvimento e testes.
      </p>
      <CodeBlock
        title="Subir um projeto PHP em segundos"
        code={`mkdir -p ~/php-app && cd ~/php-app

cat > index.php <<'PHP'
<?php
echo "<h1>Olá do Termux!</h1>";
echo "<p>PHP " . PHP_VERSION . " rodando no Android.</p>";
echo "<pre>" . print_r($_SERVER, true) . "</pre>";
PHP

# Sobe na porta 8000 (qualquer porta >= 1024 funciona)
php -S 0.0.0.0:8000

# Acesse no navegador do celular: http://localhost:8000
# De outro dispositivo na mesma Wi-Fi: http://<ip-do-celular>:8000`}
      />

      <CodeBlock
        title="Roteador (front-controller)"
        code={`# Pra que TODAS as requisições caiam num index.php (estilo Laravel/Slim):
php -S 0.0.0.0:8000 index.php

# Ou um router personalizado:
cat > router.php <<'PHP'
<?php
// Serve arquivos reais; se não existir, cai no index
if (preg_match('/\\.(?:png|jpg|css|js|ico)$/', $_SERVER['REQUEST_URI'])) {
    return false;
}
require __DIR__ . '/index.php';
PHP
php -S 0.0.0.0:8000 router.php`}
      />

      <AlertBox type="warning" title="php -S é single-thread">
        O servidor embutido processa <strong>uma requisição por vez</strong>.
        É ótimo pra dev, péssimo pra produção. Pra produção use Nginx +
        PHP-FPM (próxima seção).
      </AlertBox>

      <h2>4. Extensões PHP no Termux</h2>
      <p>
        Cada extensão é um pacote separado. Veja as mais usadas:
      </p>
      <CodeBlock
        title="Extensões disponíveis"
        code={`# Listar pacotes PHP no repositório do Termux
pkg search php-

# Mais comuns
pkg install -y php-apache    # módulo pro Apache (alternativa ao FPM)
pkg install -y php-pgsql     # PostgreSQL
# (PDO MySQL, mbstring, openssl, curl etc. já vêm builtin no pacote 'php')

# Confirma que carregou
php -m | grep -i pdo
php -m | grep -i curl`}
      />
      <AlertBox type="info" title="Habilitar extensão manualmente">
        Algumas extensões precisam ser ativadas no <code>$PREFIX/etc/php.ini</code>
        com uma linha tipo <code>extension=pdo_pgsql.so</code>. Edite com
        <code> nano $PREFIX/etc/php.ini</code>, salve e reinicie o PHP-FPM
        (<code>sv restart php-fpm</code>).
      </AlertBox>

      <h2>5. Integração Nginx + PHP-FPM</h2>
      <p>
        Combinação clássica pra servir aplicações PHP de verdade. Lembre-se
        de usar porta &gt;= 1024 no Nginx (veja a página do Nginx).
      </p>
      <CodeBlock
        title="Descobrir o socket do PHP-FPM"
        code={`# O Termux normalmente expõe o FPM via TCP (127.0.0.1:9000)
# Confirme em:
grep -E '^listen' $PREFIX/etc/php-fpm.d/www.conf
# Saída típica: listen = 127.0.0.1:9000`}
      />
      <CodeBlock
        title="$PREFIX/etc/nginx/conf.d/php-app.conf"
        language="nginx"
        code={`server {
    listen 8080;
    server_name _;

    root  /data/data/com.termux/files/home/php-app;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }

    # Bloqueia .env, .git etc.
    location ~ /\\. {
        deny all;
    }
}`}
      />
      <CodeBlock
        title="Subir tudo"
        code={`# 1) PHP-FPM
sv up php-fpm

# 2) Nginx
nginx -t && nginx -s reload   # ou: nginx (se ainda não estiver rodando)

# 3) Testar
curl http://localhost:8080`}
      />

      <h2>6. Composer</h2>
      <CodeBlock
        title="Instalar o Composer"
        code={`# Forma 1: pacote do Termux (mais simples)
pkg install -y composer
composer --version

# Forma 2: instalador oficial
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --install-dir=$PREFIX/bin --filename=composer
rm composer-setup.php

# Uso típico
mkdir ~/projeto && cd ~/projeto
composer init
composer require guzzlehttp/guzzle
composer install --no-dev`}
      />

      <h2>7. php.ini — ajustes úteis</h2>
      <CodeBlock
        title="Editar configurações comuns"
        code={`nano $PREFIX/etc/php.ini

# Sugestões pra desenvolvimento:
# memory_limit = 256M
# upload_max_filesize = 64M
# post_max_size = 64M
# date.timezone = America/Sao_Paulo
# display_errors = On            ; só em DEV
# error_reporting = E_ALL

# Após salvar, se estiver usando php-fpm:
sv restart php-fpm`}
      />

      <h2>8. Scripts CLI no celular</h2>
      <p>
        O lado realmente legal do PHP no Termux: usar como linguagem de
        script no Android.
      </p>
      <CodeBlock
        title="Exemplo: baixar e processar JSON"
        code={`cat > ~/clima.php <<'PHP'
<?php
$resp = file_get_contents("https://wttr.in/Recife?format=j1");
$j = json_decode($resp, true);
$temp = $j['current_condition'][0]['temp_C'];
$desc = $j['current_condition'][0]['weatherDesc'][0]['value'];
echo "Recife agora: {$temp}°C, {$desc}\\n";
PHP

php ~/clima.php`}
      />
      <CodeBlock
        title="Atalho executável"
        code={`# Adicione shebang e torne executável
sed -i '1i #!/data/data/com.termux/files/usr/bin/php' ~/clima.php
chmod +x ~/clima.php
~/clima.php`}
      />

      <h2>9. Troubleshooting</h2>
      <CodeBlock
        title="Erros comuns"
        code={`# "Class 'PDO' not found"
# -> a extensão não está carregada. Confira:
php -m | grep -i pdo
# Edite $PREFIX/etc/php.ini e habilite extension=pdo_xxx.so

# "502 Bad Gateway" no Nginx
# -> php-fpm não está rodando ou está em socket diferente
sv status php-fpm
grep -E '^listen' $PREFIX/etc/php-fpm.d/www.conf

# "Allowed memory size exhausted"
# -> aumente memory_limit no php.ini
sed -i 's/^memory_limit = .*/memory_limit = 512M/' $PREFIX/etc/php.ini
sv restart php-fpm

# "File not found." no Nginx ao abrir .php
# -> root do server block tem que apontar pro diretório real do projeto
#    e SCRIPT_FILENAME tem que estar correto
tail -f $PREFIX/var/log/nginx/error.log`}
      />

      <AlertBox type="info" title="PHP moderno">
        O PHP 8.x trouxe tipagem forte, JIT, fibers, enums, readonly properties
        e ganhos enormes de performance. Mesmo no Termux você consegue
        prototipar APIs e estudar Laravel/Symfony tranquilamente — só lembre
        que pra colocar no ar de verdade, um VPS é mais saudável que deixar
        o celular ligado 24/7.
      </AlertBox>
    </PageContainer>
  );
}

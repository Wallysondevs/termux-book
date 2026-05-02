import{j as e}from"./index-C2xKMDcs.js";import{P as i}from"./PageContainer-D8Fa3g_u.js";import{C as o}from"./CodeBlock-OPQVSQze.js";import{I as r}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function c(){return e.jsxs(i,{title:"PHP no Termux",subtitle:"PHP-CLI no Android: instalar, rodar scripts, servidor de desenvolvimento embutido (php -S), Composer e integração com Nginx via PHP-FPM.",difficulty:"intermediario",timeToRead:"25 min",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"PHP"})," roda nativo no Termux — útil pra estudar a linguagem, escrever automações no celular, testar uma API rápida ou servir um WordPress/Laravel local. Tanto o ",e.jsx("code",{children:"php"})," (CLI) quanto o ",e.jsx("code",{children:"php-fpm"})," têm pacote oficial."]}),e.jsx(r,{type:"info",title:"Caveats do PHP no Termux",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Não existe ",e.jsx("code",{children:"sudo"}),", ",e.jsx("code",{children:"systemctl"})," nem ",e.jsx("code",{children:"phpenmod"}),"/",e.jsx("code",{children:"phpdismod"}),". Você habilita extensões editando o ",e.jsx("code",{children:"php.ini"})," direto."]}),e.jsxs("li",{children:["Tudo vive em ",e.jsx("code",{children:"$PREFIX"})," (",e.jsx("code",{children:"/data/data/com.termux/files/usr"}),"): binário em ",e.jsx("code",{children:"$PREFIX/bin/php"}),", config em ",e.jsx("code",{children:"$PREFIX/etc/php.ini"}),"."]}),e.jsxs("li",{children:["O servidor embutido (",e.jsx("code",{children:"php -S"}),") é perfeito pra dev local. Em rede móvel você raramente recebe conexão de fora (CG-NAT)."]}),e.jsxs("li",{children:["Portas < 1024 não bindam sem root — use ",e.jsx("code",{children:"8000"}),", ",e.jsx("code",{children:"8080"}),"."]}),e.jsx("li",{children:"Esqueça LAMP enterprise no celular. Pra produção real, use um VPS."})]})}),e.jsx("h2",{children:"1. Instalação"}),e.jsx(o,{title:"Instalar PHP CLI",code:`pkg update && pkg upgrade -y
pkg install -y php

# Confere a versão (geralmente PHP 8.x)
php -v

# Lista todas as extensões carregadas
php -m

# Mostra a config completa (equivalente a phpinfo() no terminal)
php -i | less

# Caminho do php.ini ativo
php --ini`}),e.jsx("h2",{children:"2. PHP-FPM (FastCGI Process Manager)"}),e.jsxs("p",{children:["Use o ",e.jsx("code",{children:"php-fpm"})," quando quiser plugar o PHP num servidor web (Nginx) via socket Unix. Pra rodar scripts CLI puros, o",e.jsx("code",{children:" php"})," sozinho basta."]}),e.jsx(o,{title:"Instalar e iniciar o PHP-FPM",code:`pkg install -y php-fpm

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
tail -f $PREFIX/var/log/sv/php-fpm/current`}),e.jsxs("h2",{children:["3. Servidor embutido — ",e.jsx("code",{children:"php -S"})]}),e.jsx("p",{children:"O modo mais simples de servir PHP no celular. Sobe um web server single-thread perfeito pra desenvolvimento e testes."}),e.jsx(o,{title:"Subir um projeto PHP em segundos",code:`mkdir -p ~/php-app && cd ~/php-app

cat > index.php <<'PHP'
<?php
echo "<h1>Olá do Termux!</h1>";
echo "<p>PHP " . PHP_VERSION . " rodando no Android.</p>";
echo "<pre>" . print_r($_SERVER, true) . "</pre>";
PHP

# Sobe na porta 8000 (qualquer porta >= 1024 funciona)
php -S 0.0.0.0:8000

# Acesse no navegador do celular: http://localhost:8000
# De outro dispositivo na mesma Wi-Fi: http://<ip-do-celular>:8000`}),e.jsx(o,{title:"Roteador (front-controller)",code:`# Pra que TODAS as requisições caiam num index.php (estilo Laravel/Slim):
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
php -S 0.0.0.0:8000 router.php`}),e.jsxs(r,{type:"warning",title:"php -S é single-thread",children:["O servidor embutido processa ",e.jsx("strong",{children:"uma requisição por vez"}),". É ótimo pra dev, péssimo pra produção. Pra produção use Nginx + PHP-FPM (próxima seção)."]}),e.jsx("h2",{children:"4. Extensões PHP no Termux"}),e.jsx("p",{children:"Cada extensão é um pacote separado. Veja as mais usadas:"}),e.jsx(o,{title:"Extensões disponíveis",code:`# Listar pacotes PHP no repositório do Termux
pkg search php-

# Mais comuns
pkg install -y php-apache    # módulo pro Apache (alternativa ao FPM)
pkg install -y php-pgsql     # PostgreSQL
# (PDO MySQL, mbstring, openssl, curl etc. já vêm builtin no pacote 'php')

# Confirma que carregou
php -m | grep -i pdo
php -m | grep -i curl`}),e.jsxs(r,{type:"info",title:"Habilitar extensão manualmente",children:["Algumas extensões precisam ser ativadas no ",e.jsx("code",{children:"$PREFIX/etc/php.ini"}),"com uma linha tipo ",e.jsx("code",{children:"extension=pdo_pgsql.so"}),". Edite com",e.jsx("code",{children:" nano $PREFIX/etc/php.ini"}),", salve e reinicie o PHP-FPM (",e.jsx("code",{children:"sv restart php-fpm"}),")."]}),e.jsx("h2",{children:"5. Integração Nginx + PHP-FPM"}),e.jsx("p",{children:"Combinação clássica pra servir aplicações PHP de verdade. Lembre-se de usar porta >= 1024 no Nginx (veja a página do Nginx)."}),e.jsx(o,{title:"Descobrir o socket do PHP-FPM",code:`# O Termux normalmente expõe o FPM via TCP (127.0.0.1:9000)
# Confirme em:
grep -E '^listen' $PREFIX/etc/php-fpm.d/www.conf
# Saída típica: listen = 127.0.0.1:9000`}),e.jsx(o,{title:"$PREFIX/etc/nginx/conf.d/php-app.conf",language:"nginx",code:`server {
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
}`}),e.jsx(o,{title:"Subir tudo",code:`# 1) PHP-FPM
sv up php-fpm

# 2) Nginx
nginx -t && nginx -s reload   # ou: nginx (se ainda não estiver rodando)

# 3) Testar
curl http://localhost:8080`}),e.jsx("h2",{children:"6. Composer"}),e.jsx(o,{title:"Instalar o Composer",code:`# Forma 1: pacote do Termux (mais simples)
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
composer install --no-dev`}),e.jsx("h2",{children:"7. php.ini — ajustes úteis"}),e.jsx(o,{title:"Editar configurações comuns",code:`nano $PREFIX/etc/php.ini

# Sugestões pra desenvolvimento:
# memory_limit = 256M
# upload_max_filesize = 64M
# post_max_size = 64M
# date.timezone = America/Sao_Paulo
# display_errors = On            ; só em DEV
# error_reporting = E_ALL

# Após salvar, se estiver usando php-fpm:
sv restart php-fpm`}),e.jsx("h2",{children:"8. Scripts CLI no celular"}),e.jsx("p",{children:"O lado realmente legal do PHP no Termux: usar como linguagem de script no Android."}),e.jsx(o,{title:"Exemplo: baixar e processar JSON",code:`cat > ~/clima.php <<'PHP'
<?php
$resp = file_get_contents("https://wttr.in/Recife?format=j1");
$j = json_decode($resp, true);
$temp = $j['current_condition'][0]['temp_C'];
$desc = $j['current_condition'][0]['weatherDesc'][0]['value'];
echo "Recife agora: {$temp}°C, {$desc}\\n";
PHP

php ~/clima.php`}),e.jsx(o,{title:"Atalho executável",code:`# Adicione shebang e torne executável
sed -i '1i #!/data/data/com.termux/files/usr/bin/php' ~/clima.php
chmod +x ~/clima.php
~/clima.php`}),e.jsx("h2",{children:"9. Troubleshooting"}),e.jsx(o,{title:"Erros comuns",code:`# "Class 'PDO' not found"
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
tail -f $PREFIX/var/log/nginx/error.log`}),e.jsx(r,{type:"info",title:"PHP moderno",children:"O PHP 8.x trouxe tipagem forte, JIT, fibers, enums, readonly properties e ganhos enormes de performance. Mesmo no Termux você consegue prototipar APIs e estudar Laravel/Symfony tranquilamente — só lembre que pra colocar no ar de verdade, um VPS é mais saudável que deixar o celular ligado 24/7."})]})}export{c as default};

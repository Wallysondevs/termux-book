import{j as e}from"./index-DllpmZ7S.js";import{P as s}from"./PageContainer-D5o1LrsX.js";import{C as o}from"./CodeBlock-BCO78Zke.js";import{I as a}from"./InfoBox-StGQOtUJ.js";import"./house-CLqZi7qQ.js";import"./proxy-Xil2K0n2.js";function c(){return e.jsxs(s,{title:"PHP no Ubuntu — LAMP & LEMP Stack",subtitle:"Instalação completa do PHP, configuração com Apache (LAMP) e Nginx (LEMP), extensões, PHP-FPM, Composer e deploy de aplicações PHP.",difficulty:"intermediario",timeToRead:"35 min",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"PHP"})," é uma das linguagens mais utilizadas para desenvolvimento web, alimentando mais de 75% dos sites do mundo, incluindo WordPress, Laravel, Drupal e Magento. No Ubuntu, o PHP pode ser configurado com Apache (stack LAMP) ou Nginx (stack LEMP), cada um com vantagens diferentes."]}),e.jsx("h2",{children:"LAMP vs LEMP — Qual Escolher?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"LAMP"})," (Linux + Apache + MySQL + PHP) — Mais tradicional, configuração mais simples via ",e.jsx("code",{children:".htaccess"}),", ideal para hospedagem compartilhada e WordPress."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"LEMP"}),' (Linux + Nginx + MySQL + PHP) — Mais performático, usa menos memória, melhor para sites de alto tráfego. O "E" vem da pronúncia de Nginx ("Engine-X").']})]}),e.jsxs(a,{type:"info",title:"Qual usar?",children:["Para a maioria dos projetos modernos, o LEMP (Nginx + PHP-FPM) é a melhor escolha. Se você vai rodar WordPress ou precisa de compatibilidade com ",e.jsx("code",{children:".htaccess"}),", o LAMP (Apache) pode ser mais conveniente."]}),e.jsx("h2",{children:"1. Instalar o PHP"}),e.jsx(o,{title:"Instalação básica do PHP",code:`# Atualizar repositórios
  sudo apt update

  # Instalar o PHP com extensões comuns
  sudo apt install -y php php-cli php-common php-fpm

  # Verificar a versão instalada
  php -v
  # Saída esperada:
  # PHP 8.3.6 (cli) (built: Apr 15 2024 19:21:47) (NTS)
  # Copyright (c) The PHP Group
  # Zend Engine v4.3.6, Copyright (c) Zend Technologies
  #     with Zend OPcache v8.3.6

  # Ver os módulos PHP instalados
  php -m
  # Lista todos os módulos/extensões carregados

  # Ver a configuração completa do PHP
  php -i
  # Equivalente a phpinfo() — mostra TODAS as configurações

  # Localizar o arquivo php.ini ativo
  php --ini
  # Saída:
  # Configuration File (php.ini) Path: /etc/php/8.3/cli
  # Loaded Configuration File: /etc/php/8.3/cli/php.ini`}),e.jsx("h2",{children:"2. Instalar Extensões PHP"}),e.jsx(o,{title:"Extensões essenciais do PHP",code:`# Extensões para desenvolvimento web geral
  sudo apt install -y php-mysql php-pgsql php-sqlite3  # Bancos de dados
  sudo apt install -y php-xml php-mbstring php-json     # Processamento de dados
  sudo apt install -y php-curl php-gd php-zip           # HTTP, imagens, compressão
  sudo apt install -y php-intl php-bcmath               # Internacionalização, matemática
  sudo apt install -y php-readline php-tokenizer        # CLI e parsing

  # Extensões para Laravel
  sudo apt install -y php-xml php-mbstring php-curl php-zip php-bcmath     php-mysql php-pgsql php-redis php-gd php-intl

  # Extensões para WordPress
  sudo apt install -y php-mysql php-xml php-mbstring php-curl     php-gd php-zip php-imagick php-intl

  # Extensões de cache e performance
  sudo apt install -y php-redis php-memcached php-apcu php-opcache

  # Pesquisar extensões disponíveis
  apt search php- | grep "^php8.3-"

  # Verificar se uma extensão está instalada
  php -m | grep -i mysql
  # Saída: mysqli, mysqlnd, pdo_mysql

  # Habilitar/desabilitar extensões
  sudo phpenmod redis        # Habilitar a extensão redis
  sudo phpdismod xdebug      # Desabilitar a extensão xdebug
  sudo systemctl restart php8.3-fpm  # Reiniciar o PHP-FPM após mudanças`}),e.jsx("h2",{children:"3. LAMP Stack — PHP com Apache"}),e.jsx(o,{title:"Configurar LAMP (Apache + PHP)",code:`# Instalar Apache + PHP módulo Apache + MySQL
  sudo apt install -y apache2 libapache2-mod-php php-mysql mysql-server

  # Verificar que o módulo PHP está habilitado no Apache
  sudo a2enmod php8.3

  # Reiniciar o Apache
  sudo systemctl restart apache2

  # Testar: criar um arquivo phpinfo
  sudo tee /var/www/html/info.php > /dev/null << 'EOF'
  <?php
  phpinfo();
  ?>
  EOF

  # Acessar no navegador: http://seu-ip/info.php
  # Deve mostrar a página de informações do PHP

  # IMPORTANTE: Remover o info.php em produção (expõe dados sensíveis)
  sudo rm /var/www/html/info.php

  # Configurar Virtual Host para um projeto
  sudo tee /etc/apache2/sites-available/meu-projeto.conf > /dev/null << 'EOF'
  <VirtualHost *:80>
      ServerName meu-projeto.local
      DocumentRoot /var/www/meu-projeto/public

      <Directory /var/www/meu-projeto/public>
          AllowOverride All
          Require all granted
      </Directory>

      ErrorLog \${APACHE_LOG_DIR}/meu-projeto-error.log
      CustomLog \${APACHE_LOG_DIR}/meu-projeto-access.log combined
  </VirtualHost>
  EOF

  # Habilitar o site e o mod_rewrite (necessário para Laravel, WordPress, etc.)
  sudo a2ensite meu-projeto.conf
  sudo a2enmod rewrite
  sudo systemctl reload apache2`}),e.jsx("h2",{children:"4. LEMP Stack — PHP com Nginx"}),e.jsx(o,{title:"Configurar LEMP (Nginx + PHP-FPM)",code:`# Instalar Nginx + PHP-FPM + MySQL
  sudo apt install -y nginx php-fpm php-mysql mysql-server

  # Verificar que o PHP-FPM está rodando
  sudo systemctl status php8.3-fpm
  # Deve mostrar "active (running)"

  # O PHP-FPM usa um socket Unix para comunicação:
  ls /run/php/php8.3-fpm.sock

  # Configurar Virtual Host no Nginx com PHP
  sudo tee /etc/nginx/sites-available/meu-projeto > /dev/null << 'EOF'
  server {
      listen 80;
      server_name meu-projeto.local;
      root /var/www/meu-projeto/public;
      index index.php index.html;

      # Regra para URLs amigáveis (necessário para Laravel, WordPress, etc.)
      location / {
          try_files $uri $uri/ /index.php?$query_string;
      }

      # Passar requisições .php para o PHP-FPM
      location ~ .php$ {
          include snippets/fastcgi-php.conf;
          fastcgi_pass unix:/run/php/php8.3-fpm.sock;
          fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
          include fastcgi_params;
      }

      # Bloquear acesso a arquivos ocultos (.env, .git, etc.)
      location ~ /. {
          deny all;
      }
  }
  EOF

  # Habilitar o site
  sudo ln -s /etc/nginx/sites-available/meu-projeto /etc/nginx/sites-enabled/

  # Testar a configuração do Nginx
  sudo nginx -t
  # Saída: nginx: configuration file /etc/nginx/nginx.conf test is successful

  # Reiniciar o Nginx
  sudo systemctl reload nginx`}),e.jsxs(a,{type:"danger",title:"Nunca exponha o .env",children:["Frameworks como Laravel usam um arquivo ",e.jsx("code",{children:".env"})," com senhas e chaves de API. Certifique-se de que o ",e.jsx("code",{children:"root"})," do Nginx/Apache aponta para a pasta",e.jsx("code",{children:"public/"}),", nunca para a raiz do projeto. A regra de bloqueio de arquivos ocultos também é essencial."]}),e.jsx("h2",{children:"5. Configurar o PHP-FPM"}),e.jsx(o,{title:"Otimizar o PHP-FPM",code:`# Editar a configuração do pool padrão
  sudo nano /etc/php/8.3/fpm/pool.d/www.conf

  # Configurações importantes:
  # user = www-data                 ← usuário que executa os processos PHP
  # group = www-data                ← grupo
  # listen = /run/php/php8.3-fpm.sock  ← socket Unix (mais rápido que TCP)
  # pm = dynamic                    ← gerenciamento de processos
  # pm.max_children = 50            ← máximo de processos simultâneos
  # pm.start_servers = 5            ← processos iniciais
  # pm.min_spare_servers = 5        ← mínimo de processos ociosos
  # pm.max_spare_servers = 35       ← máximo de processos ociosos
  # pm.max_requests = 500           ← reiniciar processo após N requisições (previne memory leaks)

  # Editar o php.ini do FPM (diferente do CLI!)
  sudo nano /etc/php/8.3/fpm/php.ini

  # Configurações recomendadas para produção:
  # upload_max_filesize = 64M       ← tamanho máximo de upload
  # post_max_size = 64M             ← tamanho máximo de POST
  # memory_limit = 256M             ← memória máxima por processo
  # max_execution_time = 30         ← timeout em segundos
  # max_input_vars = 5000           ← variáveis de input (importante para WooCommerce)
  # date.timezone = America/Sao_Paulo  ← fuso horário

  # Habilitar OPcache (cache de bytecode — ESSENCIAL para performance)
  # No php.ini:
  # opcache.enable=1
  # opcache.memory_consumption=128
  # opcache.interned_strings_buffer=8
  # opcache.max_accelerated_files=10000
  # opcache.validate_timestamps=0   ← 0 em produção (não verifica mudanças)

  # Reiniciar o PHP-FPM após mudanças
  sudo systemctl restart php8.3-fpm

  # Ver o status dos processos PHP-FPM
  sudo systemctl status php8.3-fpm
  ps aux | grep php-fpm`}),e.jsx("h2",{children:"6. Composer — Gerenciador de Dependências"}),e.jsx(o,{title:"Instalar e usar o Composer",code:`# Instalar o Composer globalmente
  curl -sS https://getcomposer.org/installer | php
  sudo mv composer.phar /usr/local/bin/composer

  # Verificar a instalação
  composer --version
  # Saída: Composer version 2.7.6 2024-05-04

  # Criar um novo projeto Laravel
  composer create-project laravel/laravel meu-projeto

  # Instalar dependências de um projeto existente
  cd meu-projeto
  composer install              # Instala exatamente as versões do composer.lock
  composer install --no-dev     # Sem dependências de desenvolvimento (produção)

  # Adicionar dependências
  composer require guzzlehttp/guzzle           # Adicionar pacote
  composer require --dev phpunit/phpunit       # Dependência de desenvolvimento

  # Atualizar dependências
  composer update               # Atualiza todas as dependências
  composer update laravel/framework  # Atualiza um pacote específico

  # Autoload: gerar o arquivo de autoload otimizado (produção)
  composer dump-autoload --optimize

  # Limpar cache do Composer
  composer clear-cache`}),e.jsx("h2",{children:"7. Instalar Versões Múltiplas do PHP"}),e.jsx(o,{title:"Múltiplas versões do PHP via PPA",code:`# Adicionar o repositório Ondrej (mantém todas as versões do PHP)
  sudo add-apt-repository ppa:ondrej/php
  sudo apt update

  # Instalar PHP 8.1 ao lado do 8.3
  sudo apt install -y php8.1 php8.1-fpm php8.1-cli php8.1-mysql php8.1-xml php8.1-mbstring

  # Alternar a versão padrão do CLI
  sudo update-alternatives --config php
  # Escolha a versão desejada

  # Usar uma versão específica do PHP-FPM no Nginx
  # No arquivo de configuração do site, mude o socket:
  # fastcgi_pass unix:/run/php/php8.1-fpm.sock;  ← para PHP 8.1
  # fastcgi_pass unix:/run/php/php8.3-fpm.sock;  ← para PHP 8.3

  # Verificar quais versões estão instaladas
  dpkg -l | grep php | grep -E "^ii" | awk '{print $2}' | sort

  # Desabilitar uma versão no Apache
  sudo a2dismod php8.1
  sudo a2enmod php8.3
  sudo systemctl restart apache2`}),e.jsx("h2",{children:"8. Xdebug — Depuração de PHP"}),e.jsx(o,{title:"Instalar e configurar o Xdebug",code:`# Instalar o Xdebug
  sudo apt install -y php-xdebug

  # Configurar o Xdebug para debug remoto
  sudo tee /etc/php/8.3/mods-available/xdebug.ini > /dev/null << 'EOF'
  zend_extension=xdebug.so
  xdebug.mode=debug
  xdebug.start_with_request=yes
  xdebug.client_host=127.0.0.1
  xdebug.client_port=9003
  xdebug.log=/var/log/xdebug.log
  EOF

  # Habilitar o Xdebug
  sudo phpenmod xdebug
  sudo systemctl restart php8.3-fpm

  # Verificar que o Xdebug está ativo
  php -v
  # Deve mostrar: "with Xdebug v3.3.2"

  # No VS Code, instale a extensão "PHP Debug" e use este launch.json:
  # {
  #   "name": "Listen for Xdebug",
  #   "type": "php",
  #   "request": "launch",
  #   "port": 9003
  # }

  # IMPORTANTE: Desabilite o Xdebug em produção (impacta a performance)
  sudo phpdismod xdebug
  sudo systemctl restart php8.3-fpm`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(o,{title:"Problemas comuns com PHP no Ubuntu",code:`# Erro: "PHP Fatal error: Allowed memory size exhausted"
  # Solução: Aumentar memory_limit no php.ini
  sudo sed -i 's/memory_limit = .*/memory_limit = 512M/' /etc/php/8.3/fpm/php.ini
  sudo systemctl restart php8.3-fpm

  # Erro 502 Bad Gateway com Nginx
  # Causa: PHP-FPM não está rodando ou socket incorreto
  sudo systemctl status php8.3-fpm      # Verificar status
  ls -la /run/php/php8.3-fpm.sock       # Verificar se o socket existe
  sudo systemctl restart php8.3-fpm     # Reiniciar

  # Erro: "File not found" (Nginx + PHP)
  # Causa: root do Nginx não aponta para o diretório correto
  # Verificar no config do Nginx: root /var/www/meu-projeto/public;

  # Erro: Extensão PHP não encontrada
  # Solução: Instalar e habilitar
  sudo apt install -y php8.3-nome_extensao
  sudo phpenmod nome_extensao
  sudo systemctl restart php8.3-fpm

  # Verificar erros no log do PHP-FPM
  sudo tail -f /var/log/php8.3-fpm.log

  # Verificar permissões (PHP precisa ler os arquivos)
  sudo chown -R www-data:www-data /var/www/meu-projeto
  sudo find /var/www/meu-projeto -type d -exec chmod 755 {} ;
  sudo find /var/www/meu-projeto -type f -exec chmod 644 {} ;`}),e.jsx(a,{type:"info",title:"PHP em 2024+",children:"O PHP moderno (8.x) tem tipagem forte opcional, fibers (async), JIT compiler e performance comparável a muitas linguagens compiladas. Se você parou de usar PHP na versão 5.x, vale a pena revisitar — a linguagem evoluiu significativamente."})]})}export{c as default};

import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function DockerCompose() {
  return (
    <PageContainer
      title="Docker Compose"
      subtitle="Orquestre stacks multi-container com um único arquivo YAML — networks, volumes, healthchecks, dependências e variáveis de ambiente declarativas."
      difficulty="intermediario"
      timeToRead="50 min"
      category="Containers"
    >
      <p>
        <strong>Docker Compose v2</strong> é hoje um <em>plugin</em> do CLI do Docker (não mais
        o binário Python <code>docker-compose</code>). No Termux, ele vem no pacote{" "}
        <code>docker-compose-plugin</code>, instalado junto com o Docker Engine pelo repositório
        oficial. O comando passou de <code>docker-compose</code> (com hífen) para{" "}
        <code>docker compose</code> (com espaço).
      </p>

      <Terminal title="wallyson@termux: ~">
        <Command
          command="docker compose version"
          output={`Docker Compose version v2.29.7`}
        />
        <Command
          comment="Confere se o plugin está instalado"
          command="dpkg -l docker-compose-plugin"
          output={`||/ Name                 Versão                       Arquitetura  Descrição
+++-====================-============================-============-===============================
ii  docker-compose-plugin 2.29.7-1~termux.24.04~noble  amd64        Docker Compose (V2) plugin for the Docker CLI`}
        />
      </Terminal>

      <InfoBox type="warning" title="Compose v1 está descontinuado">
        Se você ainda tem <code>docker-compose</code> (Python, com hífen), remova:{" "}
        <code>pkg uninstall docker-compose</code>. A sintaxe e flags evoluíram — use sempre{" "}
        <code>docker compose</code>.
      </InfoBox>

      <h2>Estrutura de um docker-compose.yml</h2>

      <p>
        O arquivo descreve a stack inteira: serviços, redes, volumes, segredos. Não precisa mais
        da chave <code>version:</code> (Compose Spec ignora). Cada <em>serviço</em> vira um
        container; o nome do serviço também é o hostname acessível pelos outros serviços.
      </p>

      <File path="docker-compose.yml">
{`name: meublog

services:
  nginx:
    image: nginx:1.27-alpine
    container_name: blog-web
    restart: unless-stopped
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    networks:
      - frontnet
    depends_on:
      php:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 5s
      retries: 3

  php:
    image: php:8.3-fpm-alpine
    container_name: blog-php
    restart: unless-stopped
    volumes:
      - ./html:/var/www/html
    networks:
      - frontnet
      - backnet
    environment:
      DB_HOST: db
      DB_NAME: blog
      DB_USER: blog
      DB_PASSWORD: \${DB_PASSWORD:?defina DB_PASSWORD em .env}
    healthcheck:
      test: ["CMD-SHELL", "php-fpm -t"]
      interval: 30s
      retries: 3

  db:
    image: mariadb:11
    container_name: blog-db
    restart: unless-stopped
    environment:
      MARIADB_DATABASE: blog
      MARIADB_USER: blog
      MARIADB_PASSWORD: \${DB_PASSWORD}
      MARIADB_ROOT_PASSWORD: \${DB_ROOT_PASSWORD}
    volumes:
      - dbdata:/var/lib/mysql
    networks:
      - backnet
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: blog-redis
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redisdata:/data
    networks:
      - backnet

volumes:
  dbdata:
  redisdata:

networks:
  frontnet:
  backnet:`}
      </File>

      <h3>Arquivo .env</h3>

      <File path=".env">
{`COMPOSE_PROJECT_NAME=meublog
DB_PASSWORD=blog-pass-segura
DB_ROOT_PASSWORD=root-pass-mais-segura-ainda
TAG=1.27-alpine`}
      </File>

      <h2>Comandos do dia-a-dia</h2>

      <Terminal title="wallyson@termux: ~/meublog">
        <Command
          comment="Sobe a stack inteira em background"
          command="docker compose up -d"
          output={`[+] Running 4/4
 ✔ Network meublog_frontnet  Created                                       0.1s
 ✔ Network meublog_backnet   Created                                       0.1s
 ✔ Volume "meublog_dbdata"   Created                                       0.0s
 ✔ Volume "meublog_redisdata" Created                                      0.0s
 ✔ Container blog-redis      Started                                       0.4s
 ✔ Container blog-db         Started                                       0.4s
 ✔ Container blog-php        Started                                       0.5s
 ✔ Container blog-web        Started                                       0.6s`}
        />

        <Command
          command="docker compose ps"
          output={`NAME         IMAGE                 COMMAND                  SERVICE   CREATED         STATUS                   PORTS
blog-db      mariadb:11            "docker-entrypoint.s…"   db        45 seconds ago  Up 44s (healthy)         3306/tcp
blog-php     php:8.3-fpm-alpine    "docker-php-entrypoi…"   php       45 seconds ago  Up 44s (healthy)         9000/tcp
blog-redis   redis:7-alpine        "docker-entrypoint.s…"   redis     45 seconds ago  Up 44s                   6379/tcp
blog-web     nginx:1.27-alpine     "/docker-entrypoint.…"   nginx     45 seconds ago  Up 43s (healthy)         0.0.0.0:8080->80/tcp`}
        />

        <Command
          comment="Acompanha logs de todos os serviços, com cor por serviço"
          command="docker compose logs -f --tail 20"
          output={`blog-db      | 2025-04-12 14:55:00 0 [Note] mariadbd: ready for connections.
blog-redis   | 1:M 12 Apr 2025 14:55:01.123 * Ready to accept connections tcp
blog-php     | [12-Apr-2025 14:55:01] NOTICE: fpm is running, pid 1
blog-php     | [12-Apr-2025 14:55:01] NOTICE: ready to handle connections
blog-web     | 2025/04/12 14:55:02 [notice] 1#1: start worker processes
^C`}
        />

        <Command
          comment="Logs apenas do db, últimas 5 linhas"
          command="docker compose logs db --tail 5"
          output={`blog-db | 2025-04-12 14:55:00 0 [Note] InnoDB: log sequence number 47892
blog-db | 2025-04-12 14:55:00 0 [Note] Plugin 'FEEDBACK' is disabled.
blog-db | 2025-04-12 14:55:00 0 [Note] Server socket created on IP: '0.0.0.0'.
blog-db | 2025-04-12 14:55:00 0 [Note] Reading of all Master_info entries succeeded
blog-db | 2025-04-12 14:55:00 0 [Note] mariadbd: ready for connections.`}
        />
      </Terminal>

      <h3>exec, run, restart, stop, down</h3>

      <Terminal>
        <Command
          comment="Executa comando em serviço já rodando"
          command="docker compose exec db mariadb -u root -p$DB_ROOT_PASSWORD -e 'SHOW DATABASES;'"
          output={`+--------------------+
| Database           |
+--------------------+
| blog               |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+`}
        />
        <Command
          comment="Cria container efêmero (não persistente) — útil para tasks"
          command="docker compose run --rm php php artisan migrate"
          output={`Migration table created successfully.
Migrating: 2025_04_12_000001_create_posts_table
Migrated:  2025_04_12_000001_create_posts_table (45.21ms)`}
        />
        <Command
          command="docker compose restart php"
          output={`[+] Restarting 1/1
 ✔ Container blog-php  Started                                          0.5s`}
        />
        <Command
          comment="Para sem remover (containers ficam parados)"
          command="docker compose stop"
          output={`[+] Stopping 4/4
 ✔ Container blog-web   Stopped                                          1.2s
 ✔ Container blog-php   Stopped                                          0.4s
 ✔ Container blog-redis Stopped                                          0.4s
 ✔ Container blog-db    Stopped                                          1.8s`}
        />
        <Command
          comment="Para e remove containers + redes (volumes ficam)"
          command="docker compose down"
          output={`[+] Running 6/6
 ✔ Container blog-web   Removed                                          0.0s
 ✔ Container blog-php   Removed                                          0.0s
 ✔ Container blog-redis Removed                                          0.0s
 ✔ Container blog-db    Removed                                          0.0s
 ✔ Network meublog_frontnet Removed                                      0.2s
 ✔ Network meublog_backnet  Removed                                      0.2s`}
        />
        <Command
          comment="--volumes também remove volumes nomeados (PERDE DADOS!)"
          command="docker compose down --volumes --rmi all"
          output={`[+] Running 6/6
 ✔ Volume meublog_dbdata    Removed                                      0.1s
 ✔ Volume meublog_redisdata Removed                                      0.0s
Untagged: nginx:1.27-alpine
Untagged: php:8.3-fpm-alpine
Untagged: mariadb:11`}
        />
      </Terminal>

      <h3>Outros comandos úteis</h3>

      <Terminal>
        <Command
          comment="Mostra a configuração final efetiva (substitui variáveis, herda)"
          command="docker compose config"
          output={`name: meublog
services:
  db:
    container_name: blog-db
    environment:
      MARIADB_DATABASE: blog
      MARIADB_PASSWORD: blog-pass-segura
      MARIADB_ROOT_PASSWORD: root-pass-mais-segura-ainda
      MARIADB_USER: blog
    healthcheck:
      interval: 10s
      retries: 5
      test:
      - CMD
      - healthcheck.sh
      - --connect
      - --innodb_initialized
      timeout: 5s
    image: mariadb:11
    networks:
      backnet: null
    restart: unless-stopped
    volumes:
    - type: volume
      source: dbdata
      target: /var/lib/mysql
      volume: {}`}
        />
        <Command
          command="docker compose top"
          output={`blog-db
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
999                 12345               12300               0                   14:55               ?                   00:00:00            mariadbd

blog-php
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
0                   12500               12480               0                   14:55               ?                   00:00:00            php-fpm: master`}
        />
        <Command
          comment="Atualiza imagens sem reiniciar (pull)"
          command="docker compose pull"
          output={`[+] Pulling 4/4
 ✔ db Pulled                                                              4.2s
 ✔ nginx Pulled                                                           1.8s
 ✔ php Pulled                                                             3.1s
 ✔ redis Pulled                                                           1.4s`}
        />
        <Command
          comment="Recria só os serviços cujas imagens mudaram"
          command="docker compose up -d --pull always"
          output={`[+] Running 4/4
 ✔ Container blog-db    Recreated                                         1.4s
 ✔ Container blog-redis Running                                           0.0s
 ✔ Container blog-php   Recreated                                         0.6s
 ✔ Container blog-web   Recreated                                         0.5s`}
        />
      </Terminal>

      <h2>depends_on, condition e healthchecks</h2>

      <p>
        O <code>depends_on</code> garante apenas <em>ordem de inicialização</em>, não que o
        serviço esteja pronto. Para esperar o banco aceitar conexões, combine com{" "}
        <code>condition: service_healthy</code>.
      </p>

      <File path="trecho do compose">
{`services:
  app:
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
      migrations:
        condition: service_completed_successfully

  migrations:
    image: meu/migrator:latest
    command: ["./run-migrations.sh"]
    restart: "no"
    depends_on:
      db:
        condition: service_healthy`}
      </File>

      <table>
        <thead><tr><th>condition</th><th>Quando satisfaz</th></tr></thead>
        <tbody>
          <tr><td><code>service_started</code></td><td>Container iniciou (default)</td></tr>
          <tr><td><code>service_healthy</code></td><td>Healthcheck retornou healthy</td></tr>
          <tr><td><code>service_completed_successfully</code></td><td>Container saiu com código 0 (jobs)</td></tr>
        </tbody>
      </table>

      <h2>Profiles — sobe só o que você quer</h2>

      <p>
        Use <code>profiles</code> para separar serviços opcionais (debug, admin, monitoring) da
        stack default.
      </p>

      <File path="trecho do compose">
{`services:
  adminer:
    image: adminer:4
    ports: ["8081:8080"]
    profiles: ["debug"]
    networks: [backnet]

  prometheus:
    image: prom/prometheus
    profiles: ["monitoring"]`}
      </File>

      <Terminal>
        <Command
          comment="Sobe a stack default (sem adminer/prometheus)"
          command="docker compose up -d"
        />
        <Command
          comment="Sobe + adminer"
          command="docker compose --profile debug up -d adminer"
          output={`[+] Running 1/1
 ✔ Container meublog-adminer-1  Started                                   0.4s`}
        />
      </Terminal>

      <h2>Override e múltiplos arquivos</h2>

      <p>
        Por convenção, <code>docker-compose.override.yml</code> é lido automaticamente em cima
        do principal. Útil para alterar comportamento em desenvolvimento sem tocar no original.
      </p>

      <File path="docker-compose.override.yml (dev)">
{`services:
  php:
    volumes:
      - ./html:/var/www/html:rw
    environment:
      APP_DEBUG: "true"
      XDEBUG_MODE: develop,debug

  nginx:
    ports:
      - "80:80"
      - "443:443"

  mailhog:
    image: mailhog/mailhog
    ports:
      - "8025:8025"
    profiles: ["dev"]`}
      </File>

      <Terminal>
        <Command
          comment="Especificar arquivos manualmente (ex.: produção)"
          command="docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
        />
      </Terminal>

      <h2>Exemplo prático: stack LEMP completa</h2>

      <p>
        A stack acima serve como esqueleto para qualquer site PHP em produção pequena:
        <strong> nginx + php-fpm + mariadb + redis</strong>, com healthchecks, restart
        unless-stopped, redes segregadas e volumes persistentes. O <em>nginx</em> só conhece o
        php pela rede frontend; o <em>php</em> alcança o db pela rede backend; o <em>db</em>{" "}
        nunca é exposto ao host.
      </p>

      <File path="nginx/default.conf">
{`server {
    listen 80 default_server;
    server_name _;
    root /usr/share/nginx/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \\.php$ {
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME /var/www/html$fastcgi_script_name;
    }

    location ~ /\\.(ht|git) {
        deny all;
    }
}`}
      </File>

      <Terminal title="wallyson@termux: ~/meublog">
        <Command
          command="docker compose up -d --wait"
          output={`[+] Running 4/4
 ✔ Container blog-redis  Healthy                                         12.4s
 ✔ Container blog-db     Healthy                                         12.4s
 ✔ Container blog-php    Healthy                                         13.1s
 ✔ Container blog-web    Healthy                                         13.5s`}
        />
        <Command
          command="curl -s http://localhost:8080/info.php | grep -oP 'PHP Version \\K[\\d.]+' | head -1"
          output={`8.3.13`}
        />
      </Terminal>

      <InfoBox type="tip" title="--wait + healthcheck">
        <code>docker compose up -d --wait</code> só retorna quando todos os healthchecks ficam
        green. Ideal para scripts de CI/CD onde o próximo passo precisa que a stack esteja
        100% pronta antes de testar.
      </InfoBox>

      <h2>Cheat sheet</h2>

      <Terminal>
        <Command command="docker compose up -d" comment="Sobe em background" />
        <Command command="docker compose down" comment="Derruba (mantém volumes)" />
        <Command command="docker compose down -v" comment="Derruba e APAGA volumes" />
        <Command command="docker compose ps" comment="Status dos serviços" />
        <Command command="docker compose logs -f svc" comment="Logs ao vivo de um serviço" />
        <Command command="docker compose exec svc sh" comment="Shell num serviço" />
        <Command command="docker compose run --rm svc cmd" comment="Container efêmero" />
        <Command command="docker compose pull" comment="Atualiza imagens" />
        <Command command="docker compose build --no-cache" comment="Build limpo" />
        <Command command="docker compose config" comment="Mostra config efetiva" />
        <Command command="docker compose top" comment="Processos por serviço" />
      </Terminal>
    </PageContainer>
  );
}

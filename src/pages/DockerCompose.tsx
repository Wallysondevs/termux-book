import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function DockerCompose() {
  return (
    <PageContainer
      title="Docker Compose no Termux"
      subtitle="Orquestrar stacks multi-container — só dá certo dentro de proot-distro com Docker funcionando, ou contra um Docker remoto via SSH."
      difficulty="avancado"
      timeToRead="20 min"
    >
      <AlertBox type="danger" title="Pré-requisito: Docker funcionando">
        O <code>docker compose</code> é apenas um plugin do CLI do Docker. Como o Docker NÃO
        roda nativo no Termux (veja a página de Docker), o Compose só funciona dentro de um
        <code>proot-distro</code> com <code>dockerd</code> rodando, ou apontado para um host
        Docker remoto via SSH (<code>DOCKER_HOST=ssh://user@host</code>). Stacks que usem
        <code>networks</code> tipo bridge tendem a falhar no proot — prefira{" "}
        <code>network_mode: host</code>.
      </AlertBox>

      <h2>Instalação</h2>
      <CodeBlock
        title="Dentro do proot Ubuntu/Debian"
        code={`apt update
apt install -y docker-compose-plugin

docker compose version`}
      />

      <p>
        Se preferir controlar um Docker remoto, instale só o CLI no proot e exporte
        <code>DOCKER_HOST</code>:
      </p>

      <CodeBlock
        title="Compose contra host remoto"
        code={`apt install -y docker-ce-cli docker-compose-plugin
export DOCKER_HOST=ssh://usuario@vps.exemplo.com
docker compose ps`}
      />

      <h2>Estrutura mínima de um docker-compose.yml</h2>
      <CodeBlock
        title="docker-compose.yml (adaptado para proot)"
        code={`name: meublog

services:
  nginx:
    image: nginx:alpine
    network_mode: host       # bridge não rola no proot
    volumes:
      - ./html:/usr/share/nginx/html:ro
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    network_mode: host
    volumes:
      - redisdata:/data

volumes:
  redisdata:`}
      />

      <h2>Comandos do dia-a-dia</h2>
      <CodeBlock
        title="Ciclo de vida"
        code={`# Subir em background
docker compose up -d

# Status
docker compose ps

# Logs ao vivo
docker compose logs -f --tail 50

# Executar comando num serviço
docker compose exec redis redis-cli ping

# Reiniciar
docker compose restart nginx

# Parar (mantém containers)
docker compose stop

# Derrubar (remove containers e redes)
docker compose down

# Derrubar e APAGAR volumes
docker compose down -v`}
      />

      <h2>Variáveis de ambiente (.env)</h2>
      <CodeBlock
        title=".env + uso"
        code={`# .env (mesmo diretório do compose.yml)
COMPOSE_PROJECT_NAME=meublog
DB_PASSWORD=segredo

# No compose:
# environment:
#   DB_PASSWORD: \${DB_PASSWORD}`}
      />

      <h2>Limitações reais no Termux/proot</h2>
      <ul>
        <li><code>networks:</code> tipo bridge raramente funciona — use <code>network_mode: host</code>.</li>
        <li>Sem <code>healthcheck</code> dependentes de cgroups confiáveis.</li>
        <li>Storage driver <code>vfs</code> faz <code>build</code> ficar muito lento.</li>
        <li>Portas &lt; 1024 dentro do proot só com root do proot (e mesmo assim sem mapear no Android).</li>
        <li><code>docker compose up --wait</code> pode pendurar se algum healthcheck depender de DNS interno.</li>
      </ul>

      <AlertBox type="info" title="Recomendação prática">
        Para uso sério, mantenha o Compose num servidor remoto (VPS, Raspberry Pi, mini-PC) e
        use o Termux como cliente: <code>ssh user@host docker compose up -d</code> ou{" "}
        <code>DOCKER_HOST=ssh://user@host docker compose ps</code>.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        title="Comandos mais usados"
        code={`docker compose up -d              # sobe em background
docker compose down               # derruba (mantém volumes)
docker compose down -v            # derruba e apaga volumes
docker compose ps                 # status
docker compose logs -f svc        # logs ao vivo
docker compose exec svc sh        # shell num serviço
docker compose run --rm svc cmd   # container efêmero
docker compose pull               # atualiza imagens
docker compose config             # mostra config efetiva`}
      />
    </PageContainer>
  );
}

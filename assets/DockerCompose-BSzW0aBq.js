import{j as o}from"./index-C2xKMDcs.js";import{P as s}from"./PageContainer-D8Fa3g_u.js";import{C as e}from"./CodeBlock-OPQVSQze.js";import{I as r}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function m(){return o.jsxs(s,{title:"Docker Compose no Termux",subtitle:"Orquestrar stacks multi-container — só dá certo dentro de proot-distro com Docker funcionando, ou contra um Docker remoto via SSH.",difficulty:"avancado",timeToRead:"20 min",children:[o.jsxs(r,{type:"danger",title:"Pré-requisito: Docker funcionando",children:["O ",o.jsx("code",{children:"docker compose"})," é apenas um plugin do CLI do Docker. Como o Docker NÃO roda nativo no Termux (veja a página de Docker), o Compose só funciona dentro de um",o.jsx("code",{children:"proot-distro"})," com ",o.jsx("code",{children:"dockerd"})," rodando, ou apontado para um host Docker remoto via SSH (",o.jsx("code",{children:"DOCKER_HOST=ssh://user@host"}),"). Stacks que usem",o.jsx("code",{children:"networks"})," tipo bridge tendem a falhar no proot — prefira"," ",o.jsx("code",{children:"network_mode: host"}),"."]}),o.jsx("h2",{children:"Instalação"}),o.jsx(e,{title:"Dentro do proot Ubuntu/Debian",code:`apt update
apt install -y docker-compose-plugin

docker compose version`}),o.jsxs("p",{children:["Se preferir controlar um Docker remoto, instale só o CLI no proot e exporte",o.jsx("code",{children:"DOCKER_HOST"}),":"]}),o.jsx(e,{title:"Compose contra host remoto",code:`apt install -y docker-ce-cli docker-compose-plugin
export DOCKER_HOST=ssh://usuario@vps.exemplo.com
docker compose ps`}),o.jsx("h2",{children:"Estrutura mínima de um docker-compose.yml"}),o.jsx(e,{title:"docker-compose.yml (adaptado para proot)",code:`name: meublog

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
  redisdata:`}),o.jsx("h2",{children:"Comandos do dia-a-dia"}),o.jsx(e,{title:"Ciclo de vida",code:`# Subir em background
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
docker compose down -v`}),o.jsx("h2",{children:"Variáveis de ambiente (.env)"}),o.jsx(e,{title:".env + uso",code:`# .env (mesmo diretório do compose.yml)
COMPOSE_PROJECT_NAME=meublog
DB_PASSWORD=segredo

# No compose:
# environment:
#   DB_PASSWORD: \${DB_PASSWORD}`}),o.jsx("h2",{children:"Limitações reais no Termux/proot"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("code",{children:"networks:"})," tipo bridge raramente funciona — use ",o.jsx("code",{children:"network_mode: host"}),"."]}),o.jsxs("li",{children:["Sem ",o.jsx("code",{children:"healthcheck"})," dependentes de cgroups confiáveis."]}),o.jsxs("li",{children:["Storage driver ",o.jsx("code",{children:"vfs"})," faz ",o.jsx("code",{children:"build"})," ficar muito lento."]}),o.jsx("li",{children:"Portas < 1024 dentro do proot só com root do proot (e mesmo assim sem mapear no Android)."}),o.jsxs("li",{children:[o.jsx("code",{children:"docker compose up --wait"})," pode pendurar se algum healthcheck depender de DNS interno."]})]}),o.jsxs(r,{type:"info",title:"Recomendação prática",children:["Para uso sério, mantenha o Compose num servidor remoto (VPS, Raspberry Pi, mini-PC) e use o Termux como cliente: ",o.jsx("code",{children:"ssh user@host docker compose up -d"})," ou"," ",o.jsx("code",{children:"DOCKER_HOST=ssh://user@host docker compose ps"}),"."]}),o.jsx("h2",{children:"Cheat sheet"}),o.jsx(e,{title:"Comandos mais usados",code:`docker compose up -d              # sobe em background
docker compose down               # derruba (mantém volumes)
docker compose down -v            # derruba e apaga volumes
docker compose ps                 # status
docker compose logs -f svc        # logs ao vivo
docker compose exec svc sh        # shell num serviço
docker compose run --rm svc cmd   # container efêmero
docker compose pull               # atualiza imagens
docker compose config             # mostra config efetiva`})]})}export{m as default};

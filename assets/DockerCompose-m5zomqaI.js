import{j as e}from"./index-BGu3owFd.js";import{P as s,I as r}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function a(){return e.jsxs(s,{title:"Docker Compose no Termux",subtitle:"Orquestrar stacks multi-container — só dá certo dentro de proot-distro com Docker funcionando, ou contra um Docker remoto via SSH.",difficulty:"avancado",timeToRead:"20 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"docker-compose"})," "," — "," ","orquestra YAML."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"services"})," "," — "," ","containers."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"networks"})," "," — "," ","redes."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"volumes"})," "," — "," ","persistência."]})]}),e.jsxs(r,{type:"danger",title:"Pré-requisito: Docker funcionando",children:["O ",e.jsx("code",{children:"docker compose"})," é apenas um plugin do CLI do Docker. Como o Docker NÃO roda nativo no Termux (veja a página de Docker), o Compose só funciona dentro de um",e.jsx("code",{children:"proot-distro"})," com ",e.jsx("code",{children:"dockerd"})," rodando, ou apontado para um host Docker remoto via SSH (",e.jsx("code",{children:"DOCKER_HOST=ssh://user@host"}),"). Stacks que usem",e.jsx("code",{children:"networks"})," tipo bridge tendem a falhar no proot — prefira"," ",e.jsx("code",{children:"network_mode: host"}),"."]}),e.jsx("h2",{children:"Instalação"}),e.jsx(o,{title:"Dentro do proot Ubuntu/Debian",code:`apt update
apt install -y docker-compose-plugin

docker compose version`}),e.jsxs("p",{children:["Se preferir controlar um Docker remoto, instale só o CLI no proot e exporte",e.jsx("code",{children:"DOCKER_HOST"}),":"]}),e.jsx(o,{title:"Compose contra host remoto",code:`apt install -y docker-ce-cli docker-compose-plugin
export DOCKER_HOST=ssh://usuario@vps.exemplo.com
docker compose ps`}),e.jsx("h2",{children:"Estrutura mínima de um docker-compose.yml"}),e.jsx(o,{title:"docker-compose.yml (adaptado para proot)",code:`name: meublog

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
  redisdata:`}),e.jsx("h2",{children:"Comandos do dia-a-dia"}),e.jsx(o,{title:"Ciclo de vida",code:`# Subir em background
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
docker compose down -v`}),e.jsx("h2",{children:"Variáveis de ambiente (.env)"}),e.jsx(o,{title:".env + uso",code:`# .env (mesmo diretório do compose.yml)
COMPOSE_PROJECT_NAME=meublog
DB_PASSWORD=segredo

# No compose:
# environment:
#   DB_PASSWORD: \${DB_PASSWORD}`}),e.jsx("h2",{children:"Limitações reais no Termux/proot"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"networks:"})," tipo bridge raramente funciona — use ",e.jsx("code",{children:"network_mode: host"}),"."]}),e.jsxs("li",{children:["Sem ",e.jsx("code",{children:"healthcheck"})," dependentes de cgroups confiáveis."]}),e.jsxs("li",{children:["Storage driver ",e.jsx("code",{children:"vfs"})," faz ",e.jsx("code",{children:"build"})," ficar muito lento."]}),e.jsx("li",{children:"Portas < 1024 dentro do proot só com root do proot (e mesmo assim sem mapear no Android)."}),e.jsxs("li",{children:[e.jsx("code",{children:"docker compose up --wait"})," pode pendurar se algum healthcheck depender de DNS interno."]})]}),e.jsxs(r,{type:"info",title:"Recomendação prática",children:["Para uso sério, mantenha o Compose num servidor remoto (VPS, Raspberry Pi, mini-PC) e use o Termux como cliente: ",e.jsx("code",{children:"ssh user@host docker compose up -d"})," ou"," ",e.jsx("code",{children:"DOCKER_HOST=ssh://user@host docker compose ps"}),"."]}),e.jsx("h2",{children:"Cheat sheet"}),e.jsx(o,{title:"Comandos mais usados",code:`docker compose up -d              # sobe em background
docker compose down               # derruba (mantém volumes)
docker compose down -v            # derruba e apaga volumes
docker compose ps                 # status
docker compose logs -f svc        # logs ao vivo
docker compose exec svc sh        # shell num serviço
docker compose run --rm svc cmd   # container efêmero
docker compose pull               # atualiza imagens
docker compose config             # mostra config efetiva`})]})}export{a as default};

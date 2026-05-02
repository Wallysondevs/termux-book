import{j as e}from"./index-CbmJLKV7.js";import{P as n}from"./PageContainer-C07HsLrK.js";import{T as r,C as o,F as s}from"./Terminal-BBUvJLoF.js";import{I as d}from"./InfoBox-OReRpdzk.js";import"./house-Cv6RfdLC.js";import"./proxy-BQXFYY1E.js";function u(){return e.jsxs(n,{title:"Docker",subtitle:"Construa, distribua e execute aplicações em containers no Termux 0.118 — do `docker run` ao Dockerfile multi-stage, redes, volumes e healthchecks.",difficulty:"intermediario",timeToRead:"60 min",category:"Containers",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Docker"})," empacota processos junto com suas dependências em ",e.jsx("em",{children:"imagens"})," ","imutáveis e as executa como ",e.jsx("em",{children:"containers"})," isolados pelo kernel Linux (namespaces, cgroups, capabilities, seccomp). Um container compartilha o kernel do host — ao contrário de uma VM, não há hipervisor, o overhead é mínimo, o boot é instantâneo, e a densidade por servidor é gigantesca."]}),e.jsxs("p",{children:["No Termux 0.118 (Noble Numbat), o pacote oficial da ",e.jsx("strong",{children:"Docker Inc."})," é sempre preferível ao ",e.jsx("code",{children:"docker.io"})," dos repositórios universe (que costuma ficar várias minor versions atrás) e ao snap ",e.jsx("code",{children:"docker"})," (que confina o daemon e cria problemas de bind-mount, networking e cgroups). Use sempre o repositório APT oficial."]}),e.jsxs(r,{title:"wallyson@termux: ~",children:[e.jsx(o,{command:"docker --version",output:"Docker version 27.3.1, build ce12230"}),e.jsx(o,{command:"docker run --rm hello-world",output:`Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c1ec31eb5944: Pull complete
Digest: sha256:d000bc569937abbe195e20322a0bde6b2922d805332fd6d8a68b19f524b7d21d
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.`})]}),e.jsx("h2",{children:"Instalação oficial (repositório docker.com)"}),e.jsxs("p",{children:["O procedimento abaixo segue exatamente a documentação oficial da Docker e usa o keyring moderno em ",e.jsx("code",{children:"/etc/apt/keyrings/"})," com a opção ",e.jsx("code",{children:"signed-by"})," em vez do depreciado ",e.jsx("code",{children:"apt-key"}),"."]}),e.jsxs(r,{title:"wallyson@termux: ~",children:[e.jsx(o,{root:!0,comment:"Remova qualquer versão antiga conflitante (não falha se nada estiver instalado)",command:"for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do pkg remove -y $pkg; done",output:`Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Package 'docker.io' is not installed, so not removed
Package 'docker-doc' is not installed, so not removed
Package 'docker-compose' is not installed, so not removed
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.`}),e.jsx(o,{root:!0,comment:"Dependências para baixar a chave GPG oficial",command:"pkg update && pkg install -y ca-certificates curl",output:`Hit:1 http://packages.termux.dev/apt/termux-main noble InRelease
Hit:2 http://packages.termux.dev/apt/termux-main noble-updates InRelease
Hit:3 http://packages.termux.dev/apt/termux-main noble-security InRelease
Reading package lists... Done
ca-certificates is already the newest version (20240203).
curl is already the newest version (8.5.0-termux.4).
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.`}),e.jsx(o,{root:!0,command:"install -m 0755 -d /etc/apt/keyrings"}),e.jsx(o,{root:!0,comment:"Baixa o keyring oficial da Docker (formato .asc)",command:"curl -fsSL https://download.docker.com/linux/termux/gpg -o /etc/apt/keyrings/docker.asc && chmod a+r /etc/apt/keyrings/docker.asc"}),e.jsx(o,{root:!0,comment:"Cria sources.list.d/docker.list usando o codename do Termux (noble)",command:'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/termux $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null'}),e.jsx(o,{root:!0,command:"pkg update",output:`Hit:1 http://packages.termux.dev/apt/termux-main noble InRelease
Get:5 https://download.docker.com/linux/termux noble InRelease [48,8 kB]
Get:6 https://download.docker.com/linux/termux noble/stable amd64 Packages [22,1 kB]
Fetched 70,9 kB in 1s (51,0 kB/s)
Reading package lists... Done`}),e.jsx(o,{root:!0,comment:"Instala engine, CLI, containerd, plugin buildx e plugin compose v2",command:"pkg install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin",output:`Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  containerd.io docker-buildx-plugin docker-ce docker-ce-cli
  docker-ce-rootless-extras docker-compose-plugin pigz slirp4netns
0 upgraded, 8 newly installed, 0 to remove and 0 not upgraded.
Need to get 100 MB of archives.
After this operation, 393 MB of additional disk space will be used.
Get:1 https://download.docker.com/linux/termux noble/stable amd64 containerd.io amd64 1.7.22-1 [29,9 MB]
Get:2 https://download.docker.com/linux/termux noble/stable amd64 docker-ce-cli amd64 5:27.3.1-1~termux.24.04~noble [14,8 MB]
Get:3 https://download.docker.com/linux/termux noble/stable amd64 docker-ce amd64 5:27.3.1-1~termux.24.04~noble [18,5 MB]
...
Setting up docker-ce (5:27.3.1-1~termux.24.04~noble) ...
Created symlink /etc/systemd/system/multi-user.target.wants/docker.service → /lib/systemd/system/docker.service.
Created symlink /etc/systemd/system/sockets.target.wants/docker.socket → /lib/systemd/system/docker.socket.
Setting up docker-buildx-plugin (0.17.1-1~termux.24.04~noble) ...
Setting up docker-compose-plugin (2.29.7-1~termux.24.04~noble) ...
Processing triggers for man-db (2.12.0-4build2) ...`})]}),e.jsxs(d,{type:"warning",title:"Por que NÃO instalar via snap?",children:["O snap ",e.jsx("code",{children:"docker"})," roda em confinamento estrito, fora do ",e.jsx("code",{children:"/var/lib/docker"})," ","padrão. Isso quebra: bind-mounts em ",e.jsx("code",{children:"/home"}),", ",e.jsx("code",{children:"/etc"})," ou diretórios fora de ",e.jsx("code",{children:"$HOME"}),"; ferramentas que esperam o socket em"," ",e.jsx("code",{children:"/var/run/docker.sock"}),"; cgroups v2 com systemd. Use sempre o pacote oficial."]}),e.jsx("h3",{children:"Adicionar seu usuário ao grupo docker"}),e.jsxs("p",{children:["Por padrão, o socket ",e.jsx("code",{children:"/var/run/docker.sock"})," pertence a"," ",e.jsx("code",{children:"root:docker"}),". Sem estar no grupo, você seria obrigado a prefixar todo comando com ",e.jsx("code",{children:"sudo"}),"."]}),e.jsxs(r,{children:[e.jsx(o,{root:!0,command:"usermod -aG docker wallyson"}),e.jsx(o,{comment:"É preciso fazer logout/login (ou usar newgrp) para o grupo passar a valer",command:"newgrp docker"}),e.jsx(o,{command:"id",output:"uid=1000(wallyson) gid=1000(wallyson) grupos=1000(wallyson),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),100(users),114(lpadmin),988(docker)"}),e.jsx(o,{command:"docker info | head -20",output:`Client: Docker Engine - Community
 Version:    27.3.1
 Context:    default
 Debug Mode: false
 Plugins:
  buildx: Docker Buildx (Docker Inc.)
    Version:  v0.17.1
    Path:     /usr/libexec/docker/cli-plugins/docker-buildx
  compose: Docker Compose (Docker Inc.)
    Version:  v2.29.7
    Path:     /usr/libexec/docker/cli-plugins/docker-compose

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 1
 Server Version: 27.3.1
 Storage Driver: overlay2`})]}),e.jsxs(d,{type:"danger",title:"Grupo docker = root sem senha",children:["Pertencer ao grupo ",e.jsx("code",{children:"docker"})," equivale a ter ",e.jsx("strong",{children:"root sem senha"})," na máquina, porque você pode fazer"," ",e.jsx("code",{children:"docker run --privileged -v /:/host alpine chroot /host"}),". Em servidores compartilhados use ",e.jsx("code",{children:"rootless docker"})," ou ferramentas como"," ",e.jsx("code",{children:"podman"})," sem daemon."]}),e.jsx("h2",{children:"Comandos do dia-a-dia"}),e.jsx("h3",{children:"docker run — tudo começa aqui"}),e.jsxs("p",{children:[e.jsx("code",{children:"docker run"})," cria um container a partir de uma imagem e o inicia. Se a imagem não existir localmente, ele faz ",e.jsx("code",{children:"pull"})," antes. As flags abaixo são as que você usará todo dia."]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Flag"}),e.jsx("th",{children:"Significado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-d, --detach"})}),e.jsx("td",{children:"Roda em background, retorna o ID"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--name NOME"})}),e.jsxs("td",{children:["Nome amigável (caso contrário, gera ",e.jsx("em",{children:"nostalgic_einstein"}),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-p HOST:CTR"})}),e.jsx("td",{children:"Mapeia porta TCP do host para o container"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-p HOST:CTR/udp"})}),e.jsx("td",{children:"Mapeia porta UDP"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-v HOST:CTR[:ro]"})}),e.jsx("td",{children:"Bind-mount de arquivo/diretório"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-v VOLUME:CTR"})}),e.jsx("td",{children:"Volume nomeado gerenciado pelo Docker"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-e VAR=valor"})}),e.jsx("td",{children:"Variável de ambiente"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--env-file ARQ"})}),e.jsx("td",{children:"Lê várias variáveis de um arquivo .env"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--rm"})}),e.jsx("td",{children:"Remove o container quando ele sair"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-it"})}),e.jsx("td",{children:"Interativo + TTY (use para shell)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--network REDE"})}),e.jsx("td",{children:"Conecta à rede especificada"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--restart POLICY"})}),e.jsx("td",{children:"no, on-failure, always, unless-stopped"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--user UID[:GID]"})}),e.jsx("td",{children:"Roda como UID arbitrário"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--memory 512m"})}),e.jsx("td",{children:"Limita RAM"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--cpus 1.5"})}),e.jsx("td",{children:"Limita CPU"})]})]})]}),e.jsxs(r,{title:"wallyson@termux: ~",children:[e.jsx(o,{comment:"Sobe um Nginx em background, mapeia 8080 do host para 80 do container",command:"docker run -d --name web -p 8080:80 --restart unless-stopped nginx:alpine",output:`Unable to find image 'nginx:alpine' locally
alpine: Pulling from library/nginx
9b2f3b7b3fea: Pull complete
6a8d7b3f2f4d: Pull complete
fa7c1ec56ab4: Pull complete
d2e7c1a32d8d: Pull complete
1b21a83c39a5: Pull complete
a8f1e3a14e51: Pull complete
0512f4f9a32e: Pull complete
Digest: sha256:4f6f3df2e0c8b3a1cb5cb4fae90f3f99ab1c92e1b5e0f9d1f9d2c0b3a1cb5cb4
Status: Downloaded newer image for nginx:alpine
1f4d3e2c5b6a7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4e5d6c7b8a9f0e1d2c`}),e.jsx(o,{command:"curl -s -I http://localhost:8080",output:`HTTP/1.1 200 OK
Server: nginx/1.27.2
Date: Sat, 12 Apr 2025 14:23:47 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Wed, 02 Oct 2024 15:05:03 GMT
Connection: keep-alive
ETag: "66fd900f-267"
Accept-Ranges: bytes`})]}),e.jsx("h3",{children:"docker ps — ver o que está rodando"}),e.jsxs(r,{children:[e.jsx(o,{command:"docker ps",output:`CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                   NAMES
1f4d3e2c5b6a   nginx:alpine   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   web`}),e.jsx(o,{comment:"-a inclui parados; -q só IDs (útil em pipes)",command:"docker ps -a -q",output:`1f4d3e2c5b6a
9d8c7b6a5e4f`}),e.jsx(o,{command:"docker ps --format 'table {{.Names}}\\t{{.Status}}\\t{{.Ports}}'",output:`NAMES   STATUS         PORTS
web     Up 2 minutes   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp`})]}),e.jsx("h3",{children:"docker exec — entrar num container vivo"}),e.jsxs(r,{children:[e.jsx(o,{command:"docker exec -it web sh",output:`/ # cat /etc/os-release
NAME="Alpine Linux"
ID=alpine
VERSION_ID=3.20.3
PRETTY_NAME="Alpine Linux v3.20"
/ # nginx -v
nginx version: nginx/1.27.2
/ # exit`}),e.jsx(o,{comment:"Executa um comando único, sem TTY",command:"docker exec web nginx -t",output:`nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful`})]}),e.jsx("h3",{children:"docker logs — diagnosticar saídas"}),e.jsxs(r,{children:[e.jsx(o,{command:"docker logs --tail 5 web",output:`/docker-entrypoint.sh: Configuration complete; ready for start up
2025/04/12 14:21:33 [notice] 1#1: using the "epoll" event method
2025/04/12 14:21:33 [notice] 1#1: nginx/1.27.2
2025/04/12 14:21:33 [notice] 1#1: OS: Linux 6.8.0-45-generic
2025/04/12 14:21:33 [notice] 1#1: start worker processes`}),e.jsx(o,{comment:"-f acompanha em tempo real (Ctrl-C para sair)",command:"docker logs -f --since 1m web",output:`172.17.0.1 - - [12/Apr/2025:14:25:11 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.5.0" "-"
172.17.0.1 - - [12/Apr/2025:14:25:14 +0000] "GET /favicon.ico HTTP/1.1" 404 153 "-" "curl/8.5.0" "-"
^C`})]}),e.jsx("h3",{children:"Ciclo de vida: stop, start, restart, rm"}),e.jsxs(r,{children:[e.jsx(o,{command:"docker stop web",output:"web"}),e.jsx(o,{command:"docker start web",output:"web"}),e.jsx(o,{command:"docker restart web",output:"web"}),e.jsx(o,{comment:"-f força mesmo se estiver rodando",command:"docker rm -f web",output:"web"}),e.jsx(o,{command:"docker rmi nginx:alpine",output:`Untagged: nginx:alpine
Untagged: nginx@sha256:4f6f3df2e0c8b3a1cb5cb4fae90f3f99ab1c92e1b5e0f9d1f9d2c0b3a1cb5cb4
Deleted: sha256:9d8c7b6a5e4f3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c
Deleted: sha256:8c7b6a5e4f3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b`})]}),e.jsx("h2",{children:"Imagens — pull, push, tag, history"}),e.jsxs(r,{children:[e.jsx(o,{command:"docker pull termux:24.04",output:`24.04: Pulling from library/termux
ce1261c6d567: Pull complete
Digest: sha256:80dd3c3b9c6cecb9f1667e9290b3bc61b78c2678c02cbdae5f0fea92cc6734ab
Status: Downloaded newer image for termux:24.04
docker.io/library/termux:24.04`}),e.jsx(o,{command:"docker images",output:`REPOSITORY    TAG       IMAGE ID       CREATED       SIZE
termux        24.04     a04dc4851cbc   3 weeks ago   78.1MB
nginx         alpine    9d8c7b6a5e4f   5 weeks ago   42.6MB
hello-world   latest    d2c94e258dcb   2 years ago   13.3kB`}),e.jsx(o,{comment:"Renomeia (tag) localmente",command:"docker tag termux:24.04 registry.exemplo.com/wallyson/base:1.0"}),e.jsx(o,{command:"docker history nginx:alpine --no-trunc | head -8",output:`IMAGE                                     CREATED       CREATED BY                          SIZE
sha256:9d8c7b6a5e4f...                    5 weeks ago   CMD ["nginx" "-g" "daemon off;"]    0B
<missing>                                 5 weeks ago   STOPSIGNAL SIGQUIT                  0B
<missing>                                 5 weeks ago   EXPOSE 80/tcp                       0B
<missing>                                 5 weeks ago   ENTRYPOINT ["/docker-entrypoint…"]  0B
<missing>                                 5 weeks ago   COPY 30-tune-worker-processes…      4.62kB
<missing>                                 5 weeks ago   RUN /bin/sh -c set -x &&  ad…       9.86MB
<missing>                                 5 weeks ago   ENV NGINX_VERSION=1.27.2            0B`}),e.jsx(o,{comment:"Login antes de docker push (Docker Hub usa $HOME/.docker/config.json)",command:"docker login",output:`Login with your Docker ID to push and pull images from Docker Hub.
Username: wallyson
Password:
Login Succeeded`}),e.jsx(o,{command:"docker push registry.exemplo.com/wallyson/base:1.0",output:`The push refers to repository [registry.exemplo.com/wallyson/base]
1c2b3a4e5d6c: Pushed
1.0: digest: sha256:80dd3c3b9c6cecb9f1667e9290b3bc61b78c2678c02cbdae5f0fea92cc6734ab size: 529`})]}),e.jsx("h2",{children:"Dockerfile — construir suas próprias imagens"}),e.jsxs("p",{children:["Um ",e.jsx("code",{children:"Dockerfile"})," é uma receita declarativa lida de cima para baixo. Cada instrução cria uma ",e.jsx("em",{children:"layer"})," imutável; o Docker reaproveita layers idênticas entre builds através do ",e.jsx("em",{children:"build cache"}),". A ordem das instruções importa — mantenha o que muda menos no topo."]}),e.jsx(s,{path:"Dockerfile",children:`# syntax=docker/dockerfile:1.7
FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

FROM base AS builder
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

FROM base AS runner
RUN addgroup -S app && adduser -S app -G app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget -qO- http://localhost:3000/health || exit 1
ENTRYPOINT ["node", "dist/server.js"]`}),e.jsx("h3",{children:"Instruções essenciais"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Instrução"}),e.jsx("th",{children:"Para que serve"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"FROM"})}),e.jsxs("td",{children:["Imagem base. Use ",e.jsx("em",{children:"tags"})," imutáveis (24.04, não latest)."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"WORKDIR"})}),e.jsx("td",{children:"Define o diretório de trabalho (cria se não existe)."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"COPY src dst"})}),e.jsx("td",{children:"Copia do contexto de build para a imagem."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ADD"})}),e.jsx("td",{children:"Como COPY mas extrai .tar e baixa URLs. Evite, prefira COPY."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"RUN"})}),e.jsx("td",{children:"Executa um comando durante o build, gera nova layer."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ENV K=V"})}),e.jsx("td",{children:"Variável de ambiente persistente em runtime."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ARG K=V"})}),e.jsxs("td",{children:["Variável só do tempo de build (use ",e.jsx("code",{children:"--build-arg"}),")."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"USER"})}),e.jsx("td",{children:"Troca o UID/GID que executa as próximas instruções e o ENTRYPOINT."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"EXPOSE 80"})}),e.jsxs("td",{children:["Documenta porta (não publica — quem publica é ",e.jsx("code",{children:"-p"}),")."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"VOLUME /data"})}),e.jsx("td",{children:"Marca diretório como volume anônimo se nada for montado."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:'ENTRYPOINT ["bin"]'})}),e.jsx("td",{children:"Comando principal (não sobrescrito por argumentos)."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:'CMD ["arg"]'})}),e.jsx("td",{children:"Argumentos padrão para o ENTRYPOINT."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"HEALTHCHECK CMD ..."})}),e.jsx("td",{children:"Como o Docker descobre se o container está saudável."})]})]})]}),e.jsxs(r,{children:[e.jsx(o,{comment:"Constrói a imagem com tag, ignorando cache",command:"docker build -t wallyson/api:1.2.0 -f Dockerfile --no-cache .",output:`[+] Building 47.3s (16/16) FINISHED                              docker:default
 => [internal] load build definition from Dockerfile                       0.0s
 => => transferring dockerfile: 743B                                        0.0s
 => [internal] load metadata for docker.io/library/node:22-alpine          1.4s
 => [internal] load .dockerignore                                          0.0s
 => => transferring context: 84B                                           0.0s
 => [base 1/2] FROM docker.io/library/node:22-alpine@sha256:abcd...        2.1s
 => [internal] load build context                                          0.2s
 => => transferring context: 1.43MB                                        0.2s
 => [base 2/2] WORKDIR /app                                                0.1s
 => [deps 1/2] COPY package.json package-lock.json ./                      0.0s
 => [deps 2/2] RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev 18.2s
 => [builder 1/4] COPY package.json package-lock.json ./                   0.0s
 => [builder 2/4] RUN --mount=type=cache,target=/root/.npm npm ci         11.7s
 => [builder 3/4] COPY . .                                                 0.0s
 => [builder 4/4] RUN npm run build                                       12.5s
 => [runner 1/4] RUN addgroup -S app && adduser -S app -G app             0.4s
 => [runner 2/4] COPY --from=deps /app/node_modules ./node_modules         0.6s
 => [runner 3/4] COPY --from=builder /app/dist ./dist                      0.1s
 => [runner 4/4] COPY --from=builder /app/package.json ./                  0.0s
 => exporting to image                                                     0.4s
 => => exporting layers                                                    0.4s
 => => writing image sha256:b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4   0.0s
 => => naming to docker.io/wallyson/api:1.2.0                              0.0s`}),e.jsx(o,{command:"docker images wallyson/api",output:`REPOSITORY      TAG     IMAGE ID       CREATED          SIZE
wallyson/api    1.2.0   b3c4d5e6f7a8   23 seconds ago   163MB`})]}),e.jsx("h3",{children:".dockerignore — não envie lixo no contexto"}),e.jsx(s,{path:".dockerignore",children:`node_modules
npm-debug.log*
.git
.gitignore
.env
.env.*
dist
build
coverage
.vscode
.idea
*.md
Dockerfile*
docker-compose*.yml`}),e.jsxs(d,{type:"tip",title:"Por que multi-stage?",children:["O estágio ",e.jsx("code",{children:"builder"})," instala TODO o devDependencies e compila. O estágio",e.jsx("code",{children:" runner"})," recebe só o que vai a produção (",e.jsx("code",{children:"dist/"})," +"," ",e.jsx("code",{children:"node_modules"})," sem dev). Resultado: imagem 5–10× menor e sem ferramentas de build (toolchain, gcc, headers) que ampliariam a superfície de ataque."]}),e.jsx("h2",{children:"Volumes — onde os dados vivem"}),e.jsxs("p",{children:["O sistema de arquivos do container é uma ",e.jsx("em",{children:"union FS"})," efêmera. Para preservar dados entre execuções, monte um ",e.jsx("strong",{children:"volume nomeado"})," (gerenciado pelo Docker em"," ",e.jsx("code",{children:"/var/lib/docker/volumes/"}),") ou um ",e.jsx("strong",{children:"bind-mount"})," (caminho do host)."]}),e.jsxs(r,{children:[e.jsx(o,{command:"docker volume create pgdata",output:"pgdata"}),e.jsx(o,{command:"docker volume ls",output:`DRIVER    VOLUME NAME
local     pgdata`}),e.jsx(o,{command:"docker volume inspect pgdata",output:`[
    {
        "CreatedAt": "2025-04-12T14:38:02-03:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/pgdata/_data",
        "Name": "pgdata",
        "Options": null,
        "Scope": "local"
    }
]`}),e.jsx(o,{comment:"Volume nomeado (preferível para banco de dados)",command:"docker run -d --name pg -e POSTGRES_PASSWORD=secret -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:16-alpine",output:"abc123def456789..."}),e.jsx(o,{comment:"Bind-mount: edite no host, vê no container instantaneamente",command:"docker run --rm -v $PWD:/site:ro -p 8080:80 nginx:alpine"})]}),e.jsx("h3",{children:"Diferença bind-mount × volume nomeado × tmpfs"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Sintaxe"}),e.jsx("th",{children:"Persistência"}),e.jsx("th",{children:"Uso típico"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Volume nomeado"}),e.jsx("td",{children:e.jsx("code",{children:"-v nome:/dest"})}),e.jsx("td",{children:"Sim, gerenciado"}),e.jsx("td",{children:"BD, dados de aplicação"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Bind-mount"}),e.jsx("td",{children:e.jsx("code",{children:"-v /host:/dest"})}),e.jsx("td",{children:"Sim, direto no host"}),e.jsx("td",{children:"Dev (live reload), configs"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tmpfs"}),e.jsx("td",{children:e.jsx("code",{children:"--tmpfs /tmp"})}),e.jsx("td",{children:"Não (RAM)"}),e.jsx("td",{children:"Cache, segredos efêmeros"})]})]})]}),e.jsx("h2",{children:"Networking"}),e.jsxs("p",{children:["Por padrão, todo container é conectado à rede ",e.jsx("code",{children:"bridge"})," (NAT). Crie redes customizadas para que containers se enxerguem por nome (DNS embutido)."]}),e.jsxs(r,{children:[e.jsx(o,{command:"docker network ls",output:`NETWORK ID     NAME      DRIVER    SCOPE
71d2a3b4c5d6   bridge    bridge    local
8e9f0a1b2c3d   host      host      local
f0e1d2c3b4a5   none      null      local`}),e.jsx(o,{command:"docker network create --driver bridge --subnet 172.30.0.0/16 lemp",output:"a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789a"}),e.jsx(o,{command:"docker run -d --name db --network lemp -e MARIADB_ROOT_PASSWORD=root mariadb:11"}),e.jsx(o,{command:"docker run -d --name app --network lemp -p 8080:80 wallyson/api:1.2.0"}),e.jsx(o,{comment:"Dentro do container 'app', o nome 'db' resolve para o IP da rede lemp",command:"docker exec app getent hosts db",output:"172.30.0.2      db"}),e.jsx(o,{command:"docker network inspect lemp --format '{{range .Containers}}{{.Name}} {{.IPv4Address}}{{println}}{{end}}'",output:`db 172.30.0.2/16
app 172.30.0.3/16`})]}),e.jsxs(d,{type:"info",title:"Drivers de rede mais usados",children:[e.jsx("strong",{children:"bridge"})," (padrão, isolado) · ",e.jsx("strong",{children:"host"})," (compartilha a stack de rede do host, sem isolamento) · ",e.jsx("strong",{children:"none"})," (sem rede) · ",e.jsx("strong",{children:"macvlan"})," (container ganha MAC próprio na LAN) · ",e.jsx("strong",{children:"overlay"})," (multi-host em Swarm)."]}),e.jsx("h2",{children:"Healthcheck"}),e.jsxs("p",{children:["Um ",e.jsx("code",{children:"HEALTHCHECK"})," faz o Docker marcar o container como"," ",e.jsx("code",{children:"healthy"})," ou ",e.jsx("code",{children:"unhealthy"}),". Orquestradores (Compose, Swarm, Kubernetes via probes) usam isso para reiniciar containers doentes."]}),e.jsxs(r,{children:[e.jsx(o,{command:"docker inspect --format '{{json .State.Health}}' app",output:'{"Status":"healthy","FailingStreak":0,"Log":[{"Start":"2025-04-12T14:45:01-03:00","End":"2025-04-12T14:45:01-03:00","ExitCode":0,"Output":"{\\"status\\":\\"ok\\"}"}]}'}),e.jsx(o,{command:"docker ps --format 'table {{.Names}}\\\\t{{.Status}}'",output:`NAMES   STATUS
app     Up 5 minutes (healthy)
db      Up 5 minutes`})]}),e.jsx("h2",{children:"Limpeza de espaço"}),e.jsxs(r,{children:[e.jsx(o,{command:"docker system df",output:`TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          14        3         3.241GB   2.187GB (67%)
Containers      8         2         1.2MB     1.1MB (91%)
Local Volumes   6         1         842.3MB   612.7MB (72%)
Build Cache     124       0         1.821GB   1.821GB`}),e.jsx(o,{comment:"Remove containers parados, redes não usadas, imagens dangling e build cache",command:"docker system prune",output:`WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - unused build cache

Are you sure you want to continue? [y/N] y
Deleted Containers:
9d8c7b6a5e4f3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c

Deleted Networks:
my-old-net

Deleted Images:
deleted: sha256:1a2b3c4d5e6f...

Total reclaimed space: 1.421GB`}),e.jsx(o,{comment:"-a remove TODAS as imagens não usadas (não só dangling); --volumes inclui volumes",command:"docker system prune -a --volumes",output:"Total reclaimed space: 3.842GB"})]}),e.jsx("h2",{children:"Cheat sheet final"}),e.jsxs(r,{title:"Comandos essenciais",children:[e.jsx(o,{command:"docker run -it --rm alpine sh",comment:"Shell descartável"}),e.jsx(o,{command:"docker exec -it CTR bash",comment:"Entrar num container"}),e.jsx(o,{command:"docker logs -f --tail 50 CTR",comment:"Acompanhar logs"}),e.jsx(o,{command:"docker cp ARQ CTR:/dst",comment:"Copiar arquivo para container"}),e.jsx(o,{command:"docker cp CTR:/src ARQ",comment:"Copiar arquivo de container"}),e.jsx(o,{command:"docker stats",comment:"top em tempo real (CPU/MEM/IO)"}),e.jsx(o,{command:"docker inspect CTR | jq '.[0].NetworkSettings'",comment:"Detalhes em JSON"}),e.jsx(o,{command:"docker save IMG -o img.tar",comment:"Exporta imagem para arquivo"}),e.jsx(o,{command:"docker load -i img.tar",comment:"Importa de arquivo"}),e.jsx(o,{command:"docker commit CTR nova:tag",comment:"Snapshot do container"})]}),e.jsxs(d,{type:"success",title:"Boas práticas resumo",children:["Sempre fixe versões (",e.jsx("code",{children:"nginx:1.27-alpine"}),", nunca ",e.jsx("code",{children:"latest"}),"); use usuário não-root no Dockerfile (",e.jsx("code",{children:"USER app"}),"); habilite"," ",e.jsx("code",{children:"HEALTHCHECK"}),"; faça ",e.jsx("code",{children:"multi-stage"})," para reduzir o tamanho; adicione um ",e.jsx("code",{children:".dockerignore"})," bem feito; nunca coloque secrets via"," ",e.jsx("code",{children:"ENV"})," — use ",e.jsx("code",{children:"--secret"})," do BuildKit ou variáveis em runtime."]})]})}export{u as default};

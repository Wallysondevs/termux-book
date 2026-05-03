import{j as e}from"./index-BGu3owFd.js";import{P as s,I as r}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function c(){return e.jsxs(s,{title:"Docker no Termux",subtitle:"Como (tentar) usar Docker dentro de proot-distro no Termux — limitações, workarounds e alternativas como podman.",difficulty:"avancado",timeToRead:"40 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Docker"})," "," — "," ","runtime de containers."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Image"})," "," — "," ","template."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Container"})," "," — "," ","instância."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Dockerfile"})," "," — "," ","build."]})]}),e.jsxs(r,{type:"danger",title:"Docker NÃO roda nativo no Termux",children:["O Docker Engine depende de funcionalidades do kernel Linux (cgroups v2, namespaces, overlayfs, iptables) que o kernel do Android ",e.jsx("strong",{children:"bloqueia para apps sem root"}),". Não existe pacote ",e.jsx("code",{children:"docker-ce"})," oficial no Termux. O caminho viável é rodar Docker dentro de uma distro Linux instalada via ",e.jsx("code",{children:"proot-distro"})," — e mesmo assim com restrições sérias (sem rede do tipo ",e.jsx("code",{children:"bridge"}),', sem cgroups, alguns containers simplesmente não sobem). Se você precisa de Docker "de verdade" no celular, considere um servidor remoto (VPS) controlado por SSH a partir do Termux.']}),e.jsx("h2",{children:"Por que não funciona nativo"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["O Android não expõe ",e.jsx("code",{children:"/sys/fs/cgroup"})," de forma utilizável por apps comuns."]}),e.jsxs("li",{children:["Não há ",e.jsx("code",{children:"iptables"}),"/",e.jsx("code",{children:"nftables"})," com privilégio de criar bridges."]}),e.jsxs("li",{children:["Sem root no ",e.jsx("code",{children:"/dev"}),", o daemon não consegue criar ",e.jsx("code",{children:"/dev/shm"}),", loop devices, etc."]}),e.jsxs("li",{children:["O Termux roda em UID isolado dentro de ",e.jsx("code",{children:"/data/data/com.termux"}),"."]})]}),e.jsx("h2",{children:"1. Caminho recomendado: Docker dentro de proot-distro"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"proot-distro"})," é um wrapper do Termux que instala uma distro Linux (Ubuntu, Debian, Alpine…) num diretório e a executa via ",e.jsx("code",{children:"proot"})," (chroot em userland). Dentro dela você consegue instalar o Docker, mas com a flag ",e.jsx("code",{children:"--no-startup-scripts"}),"e usando ",e.jsx("code",{children:"dockerd"})," com várias flags de fallback."]}),e.jsx(o,{title:"Instalar proot-distro e uma Ubuntu",code:`# No Termux
pkg update && pkg upgrade -y
pkg install -y proot-distro

# Listar distros disponíveis
proot-distro list

# Instalar Ubuntu
proot-distro install ubuntu

# Entrar
proot-distro login ubuntu`}),e.jsx(o,{title:"Dentro do Ubuntu (proot): instalar Docker",code:`# Já estamos como root dentro do proot
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg iptables uidmap

# Repositório oficial
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \\
  -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \\
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" \\
  > /etc/apt/sources.list.d/docker.list

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin`}),e.jsxs(r,{type:"warning",title:"dockerd vai falhar ao iniciar normal",children:["Como não há systemd e nem cgroups completos, o ",e.jsx("code",{children:"service docker start"})," não vai funcionar. Você precisa iniciar o ",e.jsx("code",{children:"dockerd"})," manualmente com flags que desligam recursos indisponíveis."]}),e.jsx(o,{title:"Subir o daemon manualmente (proot)",code:`# Em um shell dentro do proot
dockerd \\
  --iptables=false \\
  --bridge=none \\
  --storage-driver=vfs \\
  --cgroup-parent=docker.slice \\
  > /var/log/dockerd.log 2>&1 &

# Em outro shell (também no proot)
docker info
docker run --rm hello-world`}),e.jsxs("p",{children:["O storage driver ",e.jsx("code",{children:"vfs"})," é lento e gasta muito espaço, mas é o único que funciona sem overlayfs privilegiado. Sem rede bridge, containers só conseguem rede com",e.jsx("code",{children:"--network host"})," (e mesmo isso pode falhar dependendo do kernel do aparelho)."]}),e.jsx("h2",{children:"2. Comandos básicos (quando funciona)"}),e.jsx(o,{title:"Run, ps, exec, logs, stop",code:`# Container interativo
docker run -it --rm --network host alpine sh

# Background
docker run -d --name web --network host nginx:alpine

# Listar
docker ps
docker ps -a

# Logs
docker logs -f web

# Entrar
docker exec -it web sh

# Parar e remover
docker stop web
docker rm web
docker rmi nginx:alpine`}),e.jsx("h2",{children:"3. Imagens e Dockerfile"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"docker build"})," funciona razoavelmente no proot — só é lento. Use imagens pequenas (Alpine) sempre que possível porque ",e.jsx("code",{children:"vfs"})," duplica cada layer."]}),e.jsx(o,{title:"Dockerfile mínimo",code:`# Dockerfile
FROM alpine:3.20
RUN apk add --no-cache python3
WORKDIR /app
COPY app.py .
CMD ["python3", "app.py"]`}),e.jsx(o,{title:"Build e push",code:`docker build -t meu/app:1.0 .
docker images
docker tag meu/app:1.0 ghcr.io/usuario/app:1.0
docker login ghcr.io
docker push ghcr.io/usuario/app:1.0`}),e.jsx("h2",{children:"4. Volumes"}),e.jsxs("p",{children:["Bind mounts funcionam para diretórios ",e.jsx("strong",{children:"dentro do proot"}),". Você pode montar caminhos compartilhados com o Android se preparar antes (",e.jsx("code",{children:"termux-setup-storage"})," + symlink dentro do proot)."]}),e.jsx(o,{title:"Bind mount e volume",code:`# Bind mount de diretório do proot
docker run -d --name nginx \\
  --network host \\
  -v /root/site:/usr/share/nginx/html:ro \\
  nginx:alpine

# Volume nomeado (gerenciado pelo Docker)
docker volume create dados
docker run -d --name pg \\
  --network host \\
  -v dados:/var/lib/postgresql/data \\
  postgres:16`}),e.jsx("h2",{children:"5. Alternativa: podman (rootless, experimental)"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"podman"})," não usa daemon e suporta modo rootless. No proot ele tende a funcionar melhor que o Docker para casos simples, e a CLI é praticamente idêntica (",e.jsx("code",{children:"alias docker=podman"})," resolve a maior parte dos comandos)."]}),e.jsx(o,{title:"Instalar podman dentro do proot Ubuntu",code:`apt install -y podman

# Teste
podman info
podman run --rm hello-world

# Compatibilidade com docker CLI
echo 'alias docker=podman' >> ~/.bashrc`}),e.jsxs(r,{type:"warning",title:"Limitações do podman no proot",children:["Mesmo o podman pode falhar em criar redes, montar overlay, ou usar ",e.jsx("code",{children:"--userns"}),". Para uso real, considere Alpine + podman + storage driver ",e.jsx("code",{children:"vfs"}),"."]}),e.jsx("h2",{children:"6. Alternativa: usar o Termux como CLIENTE de um Docker remoto"}),e.jsxs("p",{children:["Esta é a abordagem mais confiável: instale apenas o ",e.jsx("code",{children:"docker-cli"})," em um servidor remoto (VPS, mini-PC em casa) e controle do celular via SSH ou via",e.jsx("code",{children:"DOCKER_HOST"}),"."]}),e.jsx(o,{title:"Apontar docker CLI para servidor remoto",code:`# No Termux (proot Ubuntu basta o pacote docker-ce-cli)
apt install -y docker-ce-cli

# Configurar acesso via SSH (recomendado)
export DOCKER_HOST=ssh://usuario@servidor.exemplo.com

docker ps
docker run --rm hello-world`}),e.jsx("h2",{children:"7. Diagnóstico"}),e.jsx(o,{title:"Quando dockerd não sobe",code:`# Ver o log que o dockerd cuspiu
tail -100 /var/log/dockerd.log

# Sintomas comuns:
# - "failed to start daemon: Error initializing network controller"
#   -> use --bridge=none --iptables=false
# - "cgroups: cgroup mountpoint does not exist"
#   -> tente: mkdir -p /sys/fs/cgroup && mount -t tmpfs none /sys/fs/cgroup
# - "overlay2 storage driver: not supported"
#   -> use --storage-driver=vfs

# Confirmar capacidades do kernel
cat /proc/version
zcat /proc/config.gz 2>/dev/null | grep -i cgroup`}),e.jsx("h2",{children:"Resumo"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Termux puro:"})," sem Docker."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"proot-distro + Docker:"})," funciona pra brincar, lento, sem rede bridge."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"podman rootless:"})," alternativa um pouco mais estável."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Docker remoto via SSH:"})," a opção realmente útil no dia-a-dia."]})]})]})}export{c as default};

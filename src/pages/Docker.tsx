import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Docker() {
  return (
    <PageContainer
      title="Docker no Termux"
      subtitle="Como (tentar) usar Docker dentro de proot-distro no Termux — limitações, workarounds e alternativas como podman."
      difficulty="avancado"
      timeToRead="40 min"
    >
      <AlertBox type="danger" title="Docker NÃO roda nativo no Termux">
        O Docker Engine depende de funcionalidades do kernel Linux (cgroups v2, namespaces,
        overlayfs, iptables) que o kernel do Android <strong>bloqueia para apps sem root</strong>.
        Não existe pacote <code>docker-ce</code> oficial no Termux. O caminho viável é rodar
        Docker dentro de uma distro Linux instalada via <code>proot-distro</code> — e mesmo
        assim com restrições sérias (sem rede do tipo <code>bridge</code>, sem cgroups, alguns
        containers simplesmente não sobem). Se você precisa de Docker "de verdade" no celular,
        considere um servidor remoto (VPS) controlado por SSH a partir do Termux.
      </AlertBox>

      <h2>Por que não funciona nativo</h2>
      <ul>
        <li>O Android não expõe <code>/sys/fs/cgroup</code> de forma utilizável por apps comuns.</li>
        <li>Não há <code>iptables</code>/<code>nftables</code> com privilégio de criar bridges.</li>
        <li>Sem root no <code>/dev</code>, o daemon não consegue criar <code>/dev/shm</code>, loop devices, etc.</li>
        <li>O Termux roda em UID isolado dentro de <code>/data/data/com.termux</code>.</li>
      </ul>

      <h2>1. Caminho recomendado: Docker dentro de proot-distro</h2>
      <p>
        O <code>proot-distro</code> é um wrapper do Termux que instala uma distro Linux (Ubuntu,
        Debian, Alpine…) num diretório e a executa via <code>proot</code> (chroot em userland).
        Dentro dela você consegue instalar o Docker, mas com a flag <code>--no-startup-scripts</code>
        e usando <code>dockerd</code> com várias flags de fallback.
      </p>

      <CodeBlock
        title="Instalar proot-distro e uma Ubuntu"
        code={`# No Termux
pkg update && pkg upgrade -y
pkg install -y proot-distro

# Listar distros disponíveis
proot-distro list

# Instalar Ubuntu
proot-distro install ubuntu

# Entrar
proot-distro login ubuntu`}
      />

      <CodeBlock
        title="Dentro do Ubuntu (proot): instalar Docker"
        code={`# Já estamos como root dentro do proot
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
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin`}
      />

      <AlertBox type="warning" title="dockerd vai falhar ao iniciar normal">
        Como não há systemd e nem cgroups completos, o <code>service docker start</code> não vai
        funcionar. Você precisa iniciar o <code>dockerd</code> manualmente com flags que
        desligam recursos indisponíveis.
      </AlertBox>

      <CodeBlock
        title="Subir o daemon manualmente (proot)"
        code={`# Em um shell dentro do proot
dockerd \\
  --iptables=false \\
  --bridge=none \\
  --storage-driver=vfs \\
  --cgroup-parent=docker.slice \\
  > /var/log/dockerd.log 2>&1 &

# Em outro shell (também no proot)
docker info
docker run --rm hello-world`}
      />

      <p>
        O storage driver <code>vfs</code> é lento e gasta muito espaço, mas é o único que
        funciona sem overlayfs privilegiado. Sem rede bridge, containers só conseguem rede com
        <code>--network host</code> (e mesmo isso pode falhar dependendo do kernel do
        aparelho).
      </p>

      <h2>2. Comandos básicos (quando funciona)</h2>
      <CodeBlock
        title="Run, ps, exec, logs, stop"
        code={`# Container interativo
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
docker rmi nginx:alpine`}
      />

      <h2>3. Imagens e Dockerfile</h2>
      <p>
        O <code>docker build</code> funciona razoavelmente no proot — só é lento. Use imagens
        pequenas (Alpine) sempre que possível porque <code>vfs</code> duplica cada layer.
      </p>

      <CodeBlock
        title="Dockerfile mínimo"
        code={`# Dockerfile
FROM alpine:3.20
RUN apk add --no-cache python3
WORKDIR /app
COPY app.py .
CMD ["python3", "app.py"]`}
      />

      <CodeBlock
        title="Build e push"
        code={`docker build -t meu/app:1.0 .
docker images
docker tag meu/app:1.0 ghcr.io/usuario/app:1.0
docker login ghcr.io
docker push ghcr.io/usuario/app:1.0`}
      />

      <h2>4. Volumes</h2>
      <p>
        Bind mounts funcionam para diretórios <strong>dentro do proot</strong>. Você pode
        montar caminhos compartilhados com o Android se preparar antes
        (<code>termux-setup-storage</code> + symlink dentro do proot).
      </p>

      <CodeBlock
        title="Bind mount e volume"
        code={`# Bind mount de diretório do proot
docker run -d --name nginx \\
  --network host \\
  -v /root/site:/usr/share/nginx/html:ro \\
  nginx:alpine

# Volume nomeado (gerenciado pelo Docker)
docker volume create dados
docker run -d --name pg \\
  --network host \\
  -v dados:/var/lib/postgresql/data \\
  postgres:16`}
      />

      <h2>5. Alternativa: podman (rootless, experimental)</h2>
      <p>
        O <code>podman</code> não usa daemon e suporta modo rootless. No proot ele tende a
        funcionar melhor que o Docker para casos simples, e a CLI é praticamente idêntica
        (<code>alias docker=podman</code> resolve a maior parte dos comandos).
      </p>

      <CodeBlock
        title="Instalar podman dentro do proot Ubuntu"
        code={`apt install -y podman

# Teste
podman info
podman run --rm hello-world

# Compatibilidade com docker CLI
echo 'alias docker=podman' >> ~/.bashrc`}
      />

      <AlertBox type="warning" title="Limitações do podman no proot">
        Mesmo o podman pode falhar em criar redes, montar overlay, ou usar <code>--userns</code>.
        Para uso real, considere Alpine + podman + storage driver <code>vfs</code>.
      </AlertBox>

      <h2>6. Alternativa: usar o Termux como CLIENTE de um Docker remoto</h2>
      <p>
        Esta é a abordagem mais confiável: instale apenas o <code>docker-cli</code> em um
        servidor remoto (VPS, mini-PC em casa) e controle do celular via SSH ou via
        <code>DOCKER_HOST</code>.
      </p>

      <CodeBlock
        title="Apontar docker CLI para servidor remoto"
        code={`# No Termux (proot Ubuntu basta o pacote docker-ce-cli)
apt install -y docker-ce-cli

# Configurar acesso via SSH (recomendado)
export DOCKER_HOST=ssh://usuario@servidor.exemplo.com

docker ps
docker run --rm hello-world`}
      />

      <h2>7. Diagnóstico</h2>
      <CodeBlock
        title="Quando dockerd não sobe"
        code={`# Ver o log que o dockerd cuspiu
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
zcat /proc/config.gz 2>/dev/null | grep -i cgroup`}
      />

      <h2>Resumo</h2>
      <ul>
        <li><strong>Termux puro:</strong> sem Docker.</li>
        <li><strong>proot-distro + Docker:</strong> funciona pra brincar, lento, sem rede bridge.</li>
        <li><strong>podman rootless:</strong> alternativa um pouco mais estável.</li>
        <li><strong>Docker remoto via SSH:</strong> a opção realmente útil no dia-a-dia.</li>
      </ul>
    </PageContainer>
  );
}

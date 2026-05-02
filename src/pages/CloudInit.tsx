import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function CloudInit() {
  return (
    <PageContainer
      title="Termux como Cliente de Cloud (no lugar de Cloud-Init)"
      subtitle="O Termux não usa cloud-init, mas pode ser o seu console portátil para provisionar e gerenciar VMs em AWS, GCP, DigitalOcean, etc."
      difficulty="intermediario"
      timeToRead="25 min"
    >
      <AlertBox type="info" title="Esta página foi reescrita">
        O <strong>cloud-init</strong> é a ferramenta que roda DENTRO de uma VM cloud na
        primeira inicialização (configura usuários, hostname, SSH, pacotes). O Termux roda
        em Android, não é uma VM cloud, e nunca recebe cloud-init. O que faz sentido é o
        contrário: usar o Termux como <strong>cliente</strong> que provisiona e configura VMs
        cloud via SSH, Terraform, Ansible, ou as APIs/CLIs dos provedores.
      </AlertBox>

      <h2>Setup inicial no Termux</h2>
      <CodeBlock
        title="Pacotes essenciais"
        code={`pkg update && pkg upgrade -y

# Cliente SSH e ferramentas básicas
pkg install -y openssh git curl jq python

# Editor de YAML
pkg install -y vim

# Gerar chave SSH (para acessar suas VMs)
ssh-keygen -t ed25519 -C "termux@$(getprop ro.product.model)"
cat ~/.ssh/id_ed25519.pub`}
      />

      <h2>1. Acessar e gerenciar VMs por SSH</h2>
      <CodeBlock
        title="Conectar e usar ssh config"
        code={`# Conexão direta
ssh ubuntu@1.2.3.4

# Configurar atalhos em ~/.ssh/config
mkdir -p ~/.ssh && chmod 700 ~/.ssh
cat >> ~/.ssh/config <<'EOF'
Host vps
  HostName 1.2.3.4
  User ubuntu
  IdentityFile ~/.ssh/id_ed25519
  ServerAliveInterval 60
EOF

ssh vps                       # conecta
scp arquivo.tar.gz vps:~/     # copia
rsync -avz site/ vps:/var/www/  # sincroniza`}
      />

      <h2>2. Terraform (provisionar infra)</h2>
      <p>
        O Terraform tem binário ARM64 que roda no Termux. Ele cria VMs, redes, discos, e pode
        injetar <strong>user-data</strong> (cloud-init) na criação da instância.
      </p>

      <CodeBlock
        title="Instalar Terraform no Termux"
        code={`# Termux não tem pacote oficial — baixe binário ARM64
ARCH=arm64
VER=1.9.8
curl -LO https://releases.hashicorp.com/terraform/\${VER}/terraform_\${VER}_linux_\${ARCH}.zip
unzip terraform_\${VER}_linux_\${ARCH}.zip
mv terraform $PREFIX/bin/
terraform version`}
      />

      <CodeBlock
        title="main.tf — criar Droplet com user-data"
        code={`terraform {
  required_providers {
    digitalocean = { source = "digitalocean/digitalocean" }
  }
}

variable "do_token" {}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_droplet" "web" {
  image    = "ubuntu-24-04-x64"
  name     = "web-1"
  region   = "nyc3"
  size     = "s-1vcpu-1gb"
  ssh_keys = [data.digitalocean_ssh_key.minha.id]
  user_data = file("\${path.module}/cloud-init.yaml")
}

data "digitalocean_ssh_key" "minha" {
  name = "termux"
}

output "ip" {
  value = digitalocean_droplet.web.ipv4_address
}`}
      />

      <CodeBlock
        title="cloud-init.yaml — provisão básica que vai PARA a VM (não pra o Termux)"
        code={`#cloud-config
hostname: web-1
package_update: true
packages:
  - nginx
  - ufw
  - fail2ban
runcmd:
  - ufw allow OpenSSH
  - ufw allow 'Nginx Full'
  - ufw --force enable
  - systemctl enable --now nginx
users:
  - name: deploy
    sudo: ALL=(ALL) NOPASSWD:ALL
    shell: /bin/bash
    ssh_authorized_keys:
      - ssh-ed25519 AAAA... termux`}
      />

      <CodeBlock
        title="Aplicar"
        code={`export TF_VAR_do_token=dop_v1_xxxxxxxx
terraform init
terraform plan
terraform apply
terraform output ip`}
      />

      <h2>3. Ansible (configurar VMs já existentes)</h2>
      <CodeBlock
        title="Instalar Ansible no Termux"
        code={`pkg install -y python
pip install --upgrade pip
pip install ansible

ansible --version`}
      />

      <CodeBlock
        title="inventory.ini + playbook"
        code={`# inventory.ini
[web]
1.2.3.4 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_ed25519

# playbook.yml
- hosts: web
  become: yes
  tasks:
    - name: Instalar nginx
      apt:
        name: nginx
        update_cache: yes
    - name: Garantir nginx ativo
      service:
        name: nginx
        state: started
        enabled: yes
    - name: Copiar index.html
      copy:
        src: ./index.html
        dest: /var/www/html/index.html`}
      />

      <CodeBlock
        title="Rodar"
        code={`ansible -i inventory.ini web -m ping
ansible-playbook -i inventory.ini playbook.yml`}
      />

      <h2>4. CLIs dos provedores</h2>
      <CodeBlock
        title="AWS CLI, doctl, gcloud"
        code={`# AWS CLI v2 não tem build oficial p/ Termux — use a v1 via pip:
pip install awscli
aws configure
aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId,State.Name,PublicIpAddress]'

# DigitalOcean
pip install doctl  # ou baixar binário ARM64 do GitHub releases
doctl auth init
doctl compute droplet list

# Google Cloud — sem suporte oficial no Termux,
# alternativa: rode dentro de proot-distro Ubuntu`}
      />

      <h2>5. Scripts simples de provisão (sem cloud-init)</h2>
      <p>
        Para servidores pequenos, um shell script idempotente enviado por SSH resolve sem
        precisar de Terraform/Ansible.
      </p>

      <CodeBlock
        title="provision.sh enviado e executado por SSH"
        code={`#!/bin/bash
set -euo pipefail
apt-get update
apt-get install -y nginx ufw fail2ban
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
systemctl enable --now nginx fail2ban`}
      />

      <CodeBlock
        title="Executar do Termux"
        code={`scp provision.sh vps:/tmp/
ssh vps 'sudo bash /tmp/provision.sh'`}
      />

      <h2>6. Manter sessões longas: tmux</h2>
      <p>
        Conexão móvel cai com frequência. Use <code>tmux</code> no Termux (e no servidor) para
        não perder operações longas.
      </p>

      <CodeBlock
        title="tmux"
        code={`pkg install -y tmux
tmux new -s ops

# Dentro do tmux, conecte ao servidor:
ssh vps

# Se cair, reconecte e:
tmux attach -t ops`}
      />

      <AlertBox type="info" title="Resumo">
        Termux NÃO recebe cloud-init. Mas com <strong>SSH + Terraform + Ansible</strong> (e os
        CLIs dos provedores) ele vira um console portátil completo para provisionar e operar
        VMs cloud — inclusive escrevendo o user-data cloud-init que será executado dentro
        delas.
      </AlertBox>
    </PageContainer>
  );
}

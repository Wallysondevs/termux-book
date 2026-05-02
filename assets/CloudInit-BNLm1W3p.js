import{j as e}from"./index-C2xKMDcs.js";import{P as s}from"./PageContainer-D8Fa3g_u.js";import{C as i}from"./CodeBlock-OPQVSQze.js";import{I as o}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function c(){return e.jsxs(s,{title:"Termux como Cliente de Cloud (no lugar de Cloud-Init)",subtitle:"O Termux não usa cloud-init, mas pode ser o seu console portátil para provisionar e gerenciar VMs em AWS, GCP, DigitalOcean, etc.",difficulty:"intermediario",timeToRead:"25 min",children:[e.jsxs(o,{type:"info",title:"Esta página foi reescrita",children:["O ",e.jsx("strong",{children:"cloud-init"})," é a ferramenta que roda DENTRO de uma VM cloud na primeira inicialização (configura usuários, hostname, SSH, pacotes). O Termux roda em Android, não é uma VM cloud, e nunca recebe cloud-init. O que faz sentido é o contrário: usar o Termux como ",e.jsx("strong",{children:"cliente"})," que provisiona e configura VMs cloud via SSH, Terraform, Ansible, ou as APIs/CLIs dos provedores."]}),e.jsx("h2",{children:"Setup inicial no Termux"}),e.jsx(i,{title:"Pacotes essenciais",code:`pkg update && pkg upgrade -y

# Cliente SSH e ferramentas básicas
pkg install -y openssh git curl jq python

# Editor de YAML
pkg install -y vim

# Gerar chave SSH (para acessar suas VMs)
ssh-keygen -t ed25519 -C "termux@$(getprop ro.product.model)"
cat ~/.ssh/id_ed25519.pub`}),e.jsx("h2",{children:"1. Acessar e gerenciar VMs por SSH"}),e.jsx(i,{title:"Conectar e usar ssh config",code:`# Conexão direta
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
rsync -avz site/ vps:/var/www/  # sincroniza`}),e.jsx("h2",{children:"2. Terraform (provisionar infra)"}),e.jsxs("p",{children:["O Terraform tem binário ARM64 que roda no Termux. Ele cria VMs, redes, discos, e pode injetar ",e.jsx("strong",{children:"user-data"})," (cloud-init) na criação da instância."]}),e.jsx(i,{title:"Instalar Terraform no Termux",code:`# Termux não tem pacote oficial — baixe binário ARM64
ARCH=arm64
VER=1.9.8
curl -LO https://releases.hashicorp.com/terraform/\${VER}/terraform_\${VER}_linux_\${ARCH}.zip
unzip terraform_\${VER}_linux_\${ARCH}.zip
mv terraform $PREFIX/bin/
terraform version`}),e.jsx(i,{title:"main.tf — criar Droplet com user-data",code:`terraform {
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
}`}),e.jsx(i,{title:"cloud-init.yaml — provisão básica que vai PARA a VM (não pra o Termux)",code:`#cloud-config
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
      - ssh-ed25519 AAAA... termux`}),e.jsx(i,{title:"Aplicar",code:`export TF_VAR_do_token=dop_v1_xxxxxxxx
terraform init
terraform plan
terraform apply
terraform output ip`}),e.jsx("h2",{children:"3. Ansible (configurar VMs já existentes)"}),e.jsx(i,{title:"Instalar Ansible no Termux",code:`pkg install -y python
pip install --upgrade pip
pip install ansible

ansible --version`}),e.jsx(i,{title:"inventory.ini + playbook",code:`# inventory.ini
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
        dest: /var/www/html/index.html`}),e.jsx(i,{title:"Rodar",code:`ansible -i inventory.ini web -m ping
ansible-playbook -i inventory.ini playbook.yml`}),e.jsx("h2",{children:"4. CLIs dos provedores"}),e.jsx(i,{title:"AWS CLI, doctl, gcloud",code:`# AWS CLI v2 não tem build oficial p/ Termux — use a v1 via pip:
pip install awscli
aws configure
aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId,State.Name,PublicIpAddress]'

# DigitalOcean
pip install doctl  # ou baixar binário ARM64 do GitHub releases
doctl auth init
doctl compute droplet list

# Google Cloud — sem suporte oficial no Termux,
# alternativa: rode dentro de proot-distro Ubuntu`}),e.jsx("h2",{children:"5. Scripts simples de provisão (sem cloud-init)"}),e.jsx("p",{children:"Para servidores pequenos, um shell script idempotente enviado por SSH resolve sem precisar de Terraform/Ansible."}),e.jsx(i,{title:"provision.sh enviado e executado por SSH",code:`#!/bin/bash
set -euo pipefail
apt-get update
apt-get install -y nginx ufw fail2ban
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
systemctl enable --now nginx fail2ban`}),e.jsx(i,{title:"Executar do Termux",code:`scp provision.sh vps:/tmp/
ssh vps 'sudo bash /tmp/provision.sh'`}),e.jsx("h2",{children:"6. Manter sessões longas: tmux"}),e.jsxs("p",{children:["Conexão móvel cai com frequência. Use ",e.jsx("code",{children:"tmux"})," no Termux (e no servidor) para não perder operações longas."]}),e.jsx(i,{title:"tmux",code:`pkg install -y tmux
tmux new -s ops

# Dentro do tmux, conecte ao servidor:
ssh vps

# Se cair, reconecte e:
tmux attach -t ops`}),e.jsxs(o,{type:"info",title:"Resumo",children:["Termux NÃO recebe cloud-init. Mas com ",e.jsx("strong",{children:"SSH + Terraform + Ansible"})," (e os CLIs dos provedores) ele vira um console portátil completo para provisionar e operar VMs cloud — inclusive escrevendo o user-data cloud-init que será executado dentro delas."]})]})}export{c as default};

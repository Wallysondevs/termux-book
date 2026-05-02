import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function CloudInit() {
    return (
      <PageContainer
        title="Cloud-Init — Provisionamento Automático"
        subtitle="Guia completo do Cloud-Init no Ubuntu: configuração automática de servidores, user-data, network config, scripts de inicialização e debug."
        difficulty="avancado"
        timeToRead="30 min"
      >
        <p>
          O <strong>Cloud-Init</strong> é a ferramenta padrão para provisionamento automático de
          instâncias em nuvem. Quando você cria uma VM na AWS, Google Cloud, Azure, DigitalOcean
          ou qualquer provedor de nuvem, é o Cloud-Init que configura hostname, cria usuários,
          instala pacotes, configura rede e executa scripts na primeira inicialização.
        </p>

        <h2>Como o Cloud-Init Funciona</h2>
        <ul>
          <li><strong>Detect</strong> — Detecta em qual nuvem está rodando (AWS, GCP, Azure, etc.)</li>
          <li><strong>Init</strong> — Configura rede, hostname, monta discos</li>
          <li><strong>Config</strong> — Cria usuários, instala pacotes, escreve arquivos</li>
          <li><strong>Final</strong> — Executa scripts, reboota se necessário</li>
        </ul>

        <h2>1. Conceitos e Verificação</h2>
        <CodeBlock
          title="Verificar e entender o Cloud-Init"
          code={`# Verificar se o Cloud-Init está instalado
  cloud-init --version
  # Saída: /usr/bin/cloud-init 24.1

  # Instalar (se necessário)
  sudo apt install -y cloud-init

  # Ver o status da execução
  cloud-init status
  # Saída: status: done  (ou: running, error)

  # Ver detalhes da execução
  cloud-init status --long
  # Mostra: datasource, erros, tempo de cada fase

  # Ver qual datasource (nuvem) foi detectado
  cloud-init query ds
  # Saída: DataSourceEc2, DataSourceGCE, DataSourceAzure, etc.

  # Ver metadados da instância
  cloud-init query instance_id
  cloud-init query region
  cloud-init query local_hostname

  # Logs do Cloud-Init
  cat /var/log/cloud-init.log           # Log completo
  cat /var/log/cloud-init-output.log    # Saída dos scripts

  # Ver a configuração que foi aplicada
  sudo cloud-init query userdata
  sudo cat /var/lib/cloud/instance/user-data.txt`}
        />

        <h2>2. User-Data — Configuração Principal</h2>
        <CodeBlock
          title="Criar user-data para provisionamento"
          code={`# User-data é passado ao criar a instância na nuvem
  # Formato: YAML começando com #cloud-config

  #cloud-config

  # Definir hostname
  hostname: meu-servidor
  fqdn: meu-servidor.exemplo.com.br

  # Criar usuários
  users:
    - name: admin
      groups: sudo, docker
      shell: /bin/bash
      sudo: ALL=(ALL) NOPASSWD:ALL
      ssh_authorized_keys:
        - ssh-rsa AAAAB3... chave-publica
    - name: deploy
      groups: www-data
      shell: /bin/bash

  # Instalar pacotes
  package_update: true
  package_upgrade: true
  packages:
    - nginx
    - docker.io
    - docker-compose
    - fail2ban
    - ufw
    - htop
    - git
    - curl

  # Escrever arquivos
  write_files:
    - path: /etc/nginx/sites-available/default
      content: |
        server {
            listen 80;
            server_name _;
            root /var/www/html;
            index index.html;
        }
      owner: root:root
      permissions: '0644'

    - path: /opt/scripts/setup.sh
      content: |
        #!/bin/bash
        echo "Setup concluído em $(date)" >> /var/log/setup.log
      permissions: '0755'

  # Executar comandos na primeira inicialização
  runcmd:
    - systemctl enable nginx
    - systemctl start nginx
    - ufw allow 22
    - ufw allow 80
    - ufw allow 443
    - ufw --force enable
    - systemctl enable fail2ban
    - /opt/scripts/setup.sh

  # Configurar timezone
  timezone: America/Sao_Paulo

  # Configurar locale
  locale: pt_BR.UTF-8

  # Reiniciar após configuração (se necessário)
  power_state:
    mode: reboot
    message: "Reiniciando após provisionamento"
    timeout: 30
    condition: true`}
        />

        <h2>3. Módulos do Cloud-Init</h2>
        <CodeBlock
          title="Módulos mais usados"
          code={`# === GERENCIAR DISCOS ===
  #cloud-config
  disk_setup:
    /dev/sdb:
      table_type: gpt
      layout: true
      overwrite: false

  fs_setup:
    - device: /dev/sdb1
      filesystem: ext4
      label: dados

  mounts:
    - [/dev/sdb1, /dados, ext4, "defaults,nofail", "0", "2"]

  # === CONFIGURAR SWAP ===
  swap:
    filename: /swapfile
    size: 2G

  # === SSH ===
  ssh_pwauth: false       # Desabilitar login por senha
  disable_root: true      # Desabilitar login como root

  ssh_keys:
    rsa_private: |
      -----BEGIN RSA PRIVATE KEY-----
      ...
      -----END RSA PRIVATE KEY-----
    rsa_public: ssh-rsa AAAAB3...

  # === FIREWALL COM UFW ===
  runcmd:
    - ufw default deny incoming
    - ufw default allow outgoing
    - ufw allow ssh
    - ufw allow http
    - ufw allow https
    - ufw --force enable

  # === DOCKER ===
  runcmd:
    - curl -fsSL https://get.docker.com | sh
    - usermod -aG docker admin
    - systemctl enable docker

  # === CERTIFICADO SSL ===
  runcmd:
    - snap install --classic certbot
    - ln -s /snap/bin/certbot /usr/bin/certbot
    - certbot --nginx -d meusite.com.br --non-interactive --agree-tos -m admin@email.com`}
        />

        <h2>4. Testar Cloud-Init Localmente</h2>
        <CodeBlock
          title="Testar configuração sem nuvem"
          code={`# Validar a sintaxe do user-data
  cloud-init devel schema --config-file user-data.yaml

  # Simular execução do Cloud-Init (modo single)
  sudo cloud-init single --name write_files --frequency once

  # Limpar o estado do Cloud-Init (para re-executar)
  sudo cloud-init clean
  # Ou limpar completamente:
  sudo cloud-init clean --logs --seed

  # Re-executar o Cloud-Init
  sudo cloud-init init
  sudo cloud-init modules --mode config
  sudo cloud-init modules --mode final

  # Testar com Multipass (VMs Ubuntu locais)
  sudo snap install multipass

  # Criar VM com user-data
  multipass launch --name teste --cloud-init user-data.yaml

  # Verificar se funcionou
  multipass exec teste -- cloud-init status --long
  multipass shell teste

  # Testar com LXD
  lxc launch ubuntu:24.04 teste --config=user.user-data="$(cat user-data.yaml)"

  # Ver o que seria executado (dry-run)
  cloud-init devel render /var/lib/cloud/instance/user-data.txt`}
        />

        <h2>5. Network Config</h2>
        <CodeBlock
          title="Configurar rede via Cloud-Init"
          code={`# Cloud-Init pode configurar a rede via network-config
  # Formato Netplan (padrão no Ubuntu):

  #cloud-config
  network:
    version: 2
    ethernets:
      eth0:
        dhcp4: true
      eth1:
        addresses:
          - 10.0.0.10/24
        routes:
          - to: 10.0.0.0/8
            via: 10.0.0.1
        nameservers:
          addresses:
            - 8.8.8.8
            - 1.1.1.1

  # Desabilitar gerenciamento de rede pelo Cloud-Init
  # (útil se você configura rede manualmente)
  # Criar arquivo:
  # /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
  # network: {config: disabled}`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com Cloud-Init"
          code={`# Cloud-Init não executou
  # Verificar status:
  cloud-init status --long
  # Ver logs:
  sudo cat /var/log/cloud-init.log | tail -50
  sudo cat /var/log/cloud-init-output.log

  # User-data não foi aplicado
  # Verificar se o user-data chegou:
  sudo cat /var/lib/cloud/instance/user-data.txt
  # Se estiver vazio, o provedor de nuvem não passou o user-data

  # Cloud-Init executa APENAS na primeira inicialização
  # Para re-executar:
  sudo cloud-init clean
  sudo reboot
  # Após o reboot, o Cloud-Init executará novamente

  # Erro de YAML no user-data
  # Validar YAML:
  python3 -c "import yaml; yaml.safe_load(open('user-data.yaml'))"
  # Ou usar o validador do Cloud-Init:
  cloud-init devel schema --config-file user-data.yaml

  # Pacotes não foram instalados
  # Verificar se package_update está como true
  # Ver log específico:
  grep -i "apt\|package" /var/log/cloud-init.log

  # Script runcmd não executou
  # Os scripts rodam como root
  # Verificar saída:
  cat /var/log/cloud-init-output.log`}
        />

        <AlertBox type="info" title="Cloud-Init e Terraform">
          O Cloud-Init é frequentemente usado com <strong>Terraform</strong> e
          <strong>Ansible</strong>. O Terraform cria a infraestrutura (VMs, redes, discos) e
          passa o user-data do Cloud-Init para o provisionamento inicial. Depois, o Ansible
          pode ser usado para configurações mais complexas.
        </AlertBox>
      </PageContainer>
    );
  }
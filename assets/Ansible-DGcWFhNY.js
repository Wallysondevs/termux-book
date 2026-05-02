import{j as e}from"./index-C2xKMDcs.js";import{P as s}from"./PageContainer-D8Fa3g_u.js";import{C as a}from"./CodeBlock-OPQVSQze.js";import{I as i}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function m(){return e.jsxs(s,{title:"Ansible — Automação de Infraestrutura",subtitle:"Guia completo do Ansible no Termux: instalação, inventários, playbooks, roles, modules, vaults e automação de servidores em escala.",difficulty:"avancado",timeToRead:"40 min",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Ansible"})," é uma ferramenta de automação de infraestrutura que permite configurar, gerenciar e fazer deploy em centenas de servidores simultaneamente usando apenas SSH. Diferente de ferramentas como Puppet ou Chef, o Ansible é ",e.jsx("em",{children:"agentless"})," — não precisa instalar nada nos servidores gerenciados, apenas SSH e Python."]}),e.jsx("h2",{children:"Por Que Ansible?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Agentless"})," — Não precisa instalar software nos servidores gerenciados. Usa SSH."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Idempotente"})," — Executar a mesma tarefa várias vezes produz o mesmo resultado. Se o servidor já está configurado, nada muda."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"YAML"})," — Configuração em YAML legível por humanos, não em linguagem de programação."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Push-based"})," — Você executa os comandos do seu computador e eles são aplicados nos servidores remotos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Extensível"})," — Milhares de módulos para cloud (AWS, Azure, GCP), containers (Docker, K8s), redes e mais."]})]}),e.jsx("h2",{children:"1. Instalação do Ansible"}),e.jsx(a,{title:"Instalar o Ansible no Termux",code:`# Método 1: Via apt (versão estável do Termux)
  pkg update
  pkg install -y ansible

  # Método 2: Via PPA (versão mais recente)
  sudo add-apt-repository --yes ppa:ansible/ansible
  pkg update
  pkg install -y ansible

  # Método 3: Via pip (última versão, mais flexível)
  pkg install -y python3-pip
  pip3 install ansible

  # Verificar a instalação
  ansible --version
  # Saída:
  # ansible [core 2.16.6]
  #   config file = /etc/ansible/ansible.cfg
  #   configured module search path = ['/home/user/.ansible/plugins/modules']
  #   ansible python module location = /usr/lib/python3/dist-packages/ansible
  #   python version = 3.12.3

  # Verificar a conectividade com um servidor (via ping module)
  ansible localhost -m ping
  # Saída esperada:
  # localhost | SUCCESS => {
  #     "changed": false,
  #     "ping": "pong"
  # }`}),e.jsx("h2",{children:"2. Inventário — Definir Servidores"}),e.jsx("p",{children:"O inventário define quais servidores o Ansible vai gerenciar. Pode ser um arquivo estático (INI ou YAML) ou dinâmico (script que consulta uma API de cloud)."}),e.jsx(a,{title:"Criar inventários de servidores",code:`# Inventário básico em formato INI (/etc/ansible/hosts ou inventory.ini)
  # Cada linha é um servidor, agrupados por [nome_do_grupo]

  cat > inventory.ini << 'EOF'
  # Servidores Web
  [webservers]
  web1.exemplo.com
  web2.exemplo.com
  192.168.1.100

  # Servidores de Banco de Dados
  [dbservers]
  db1.exemplo.com ansible_port=2222
  db2.exemplo.com ansible_user=admin

  # Servidor com configurações específicas
  [monitoring]
  monitor.exemplo.com ansible_host=10.0.0.50 ansible_user=deploy ansible_ssh_private_key_file=~/.ssh/deploy_key

  # Grupo de grupos — "production" inclui webservers e dbservers
  [production:children]
  webservers
  dbservers

  # Variáveis para todos os servidores de um grupo
  [webservers:vars]
  http_port=80
  ansible_python_interpreter=/usr/bin/python3

  # Variáveis globais para TODOS os hosts
  [all:vars]
  ansible_user=u0_a123
  ansible_become=yes
  ansible_become_method=sudo
  EOF

  # Inventário em formato YAML (inventory.yml)
  cat > inventory.yml << 'EOF'
  all:
    vars:
      ansible_user: u0_a123
      ansible_become: yes
    children:
      webservers:
        hosts:
          web1.exemplo.com:
          web2.exemplo.com:
        vars:
          http_port: 80
      dbservers:
        hosts:
          db1.exemplo.com:
            ansible_port: 2222
          db2.exemplo.com:
      production:
        children:
          webservers:
          dbservers:
  EOF

  # Listar hosts do inventário
  ansible-inventory -i inventory.ini --list
  ansible-inventory -i inventory.ini --graph
  # Saída:
  # @all:
  #   |--@webservers:
  #   |  |--web1.exemplo.com
  #   |  |--web2.exemplo.com
  #   |--@dbservers:
  #   |  |--db1.exemplo.com`}),e.jsx("h2",{children:"3. Comandos Ad-Hoc"}),e.jsx(a,{title:"Executar comandos rápidos com Ansible",code:`# Sintaxe: ansible <padrão_hosts> -i <inventário> -m <módulo> -a <argumentos>

  # Ping em todos os servidores
  ansible all -i inventory.ini -m ping

  # Ping apenas nos servidores web
  ansible webservers -i inventory.ini -m ping

  # Executar um comando shell em todos os servidores
  ansible all -i inventory.ini -m shell -a "uptime"
  # Saída:
  # web1.exemplo.com | SUCCESS | rc=0 >>
  #  14:32:01 up 45 days, 3:12, 2 users, load average: 0.15, 0.10, 0.08

  # Ver uso de disco
  ansible all -i inventory.ini -m shell -a "df -h /"

  # Ver memória disponível
  ansible all -i inventory.ini -m shell -a "free -h"

  # Instalar um pacote em todos os servidores
  ansible webservers -i inventory.ini -m apt -a "name=nginx state=present" --become

  # Reiniciar um serviço
  ansible webservers -i inventory.ini -m systemd -a "name=nginx state=restarted" --become

  # Copiar um arquivo para os servidores
  ansible all -i inventory.ini -m copy -a "src=./config.conf dest=/etc/app/config.conf" --become

  # Criar um usuário
  ansible all -i inventory.ini -m user -a "name=deploy state=present shell=/bin/bash" --become

  # Executar em apenas 2 servidores por vez (limitar paralelismo)
  ansible all -i inventory.ini -m shell -a "pkg update" --become -f 2`}),e.jsx("h2",{children:"4. Playbooks — Automação Estruturada"}),e.jsx(a,{title:"Criar e executar playbooks",code:`# Playbook básico: instalar e configurar o Nginx
  cat > setup-nginx.yml << 'EOF'
  ---
  # Um playbook é uma lista de "plays"
  # Cada play define hosts + tarefas
  - name: Instalar e configurar o Nginx
    hosts: webservers
    become: yes  # Executar como root (sudo)
    vars:
      http_port: 80
      server_name: meu-site.com

    tasks:
      - name: Atualizar cache do apt
        apt:
          update_cache: yes
          cache_valid_time: 3600  # Não atualizar se foi atualizado há menos de 1h

      - name: Instalar o Nginx
        apt:
          name: nginx
          state: present  # present = instalar, absent = remover, latest = atualizar

      - name: Copiar configuração do site
        template:
          src: templates/nginx-site.conf.j2
          dest: "/etc/nginx/sites-available/{{ server_name }}"
          owner: root
          group: root
          mode: '0644'
        notify: Reiniciar Nginx  # Executa o handler se o arquivo mudou

      - name: Habilitar o site
        file:
          src: "/etc/nginx/sites-available/{{ server_name }}"
          dest: "/etc/nginx/sites-enabled/{{ server_name }}"
          state: link
        notify: Reiniciar Nginx

      - name: Remover site padrão
        file:
          path: /etc/nginx/sites-enabled/default
          state: absent
        notify: Reiniciar Nginx

      - name: Garantir que o Nginx está rodando e habilitado no boot
        systemd:
          name: nginx
          state: started
          enabled: yes

      - name: Abrir porta HTTP no firewall
        ufw:
          rule: allow
          port: "{{ http_port }}"
          proto: tcp

    handlers:
      # Handlers são executados APENAS quando notificados por uma task
      # E são executados apenas UMA VEZ no final, mesmo se notificados várias vezes
      - name: Reiniciar Nginx
        systemd:
          name: nginx
          state: restarted
  EOF

  # Executar o playbook
  ansible-playbook -i inventory.ini setup-nginx.yml

  # Executar com verbose (mostra detalhes)
  ansible-playbook -i inventory.ini setup-nginx.yml -v    # básico
  ansible-playbook -i inventory.ini setup-nginx.yml -vvv  # muito detalhado

  # Executar em modo check (dry-run — mostra o que faria sem executar)
  ansible-playbook -i inventory.ini setup-nginx.yml --check

  # Executar apenas em servidores específicos
  ansible-playbook -i inventory.ini setup-nginx.yml --limit web1.exemplo.com

  # Executar a partir de uma task específica
  ansible-playbook -i inventory.ini setup-nginx.yml --start-at-task="Copiar configuração"

  # Pedir confirmação antes de cada task
  ansible-playbook -i inventory.ini setup-nginx.yml --step`}),e.jsx("h2",{children:"5. Templates Jinja2"}),e.jsx(a,{title:"Usar templates com variáveis",code:`# Criar o template Jinja2 para a configuração do Nginx
  mkdir -p templates
  cat > templates/nginx-site.conf.j2 << 'EOF'
  server {
      listen {{ http_port }};
      server_name {{ server_name }};
      root /var/www/{{ server_name }}/html;
      index index.html;

      # Configurado pelo Ansible em {{ ansible_date_time.iso8601 }}
      # Hostname: {{ ansible_hostname }}

      location / {
          try_files $uri $uri/ =404;
      }

      {% if enable_ssl | default(false) %}
      listen 443 ssl;
      ssl_certificate /etc/ssl/certs/{{ server_name }}.crt;
      ssl_certificate_key /etc/ssl/private/{{ server_name }}.key;
      {% endif %}

      {% for location in custom_locations | default([]) %}
      location {{ location.path }} {
          proxy_pass {{ location.upstream }};
      }
      {% endfor %}
  }
  EOF

  # O Ansible substitui {{ variavel }} pelos valores definidos no playbook
  # {% if %} e {% for %} são condicionais e loops do Jinja2`}),e.jsx("h2",{children:"6. Roles — Organizar Playbooks"}),e.jsx(a,{title:"Criar e usar Roles",code:`# Roles organizam playbooks em uma estrutura modular e reutilizável

  # Criar a estrutura de uma role
  ansible-galaxy role init roles/nginx
  # Estrutura criada:
  # roles/nginx/
  # ├── defaults/main.yml    ← variáveis padrão (menor prioridade)
  # ├── files/               ← arquivos estáticos para copiar
  # ├── handlers/main.yml    ← handlers (reiniciar serviços, etc.)
  # ├── meta/main.yml        ← metadados e dependências
  # ├── tasks/main.yml       ← tarefas principais
  # ├── templates/           ← templates Jinja2
  # ├── tests/               ← testes
  # └── vars/main.yml        ← variáveis (maior prioridade)

  # Usar uma role em um playbook
  cat > site.yml << 'EOF'
  ---
  - name: Configurar servidores web
    hosts: webservers
    become: yes
    roles:
      - nginx
      - { role: certbot, when: enable_ssl | default(false) }
      - role: app-deploy
        vars:
          app_version: "2.1.0"
  EOF

  # Instalar roles da comunidade (Ansible Galaxy)
  ansible-galaxy install geerlingguy.docker
  ansible-galaxy install geerlingguy.mysql
  ansible-galaxy install geerlingguy.nginx

  # Instalar roles listadas em um arquivo requirements
  cat > requirements.yml << 'EOF'
  ---
  roles:
    - name: geerlingguy.docker
      version: "7.1.0"
    - name: geerlingguy.certbot
    - name: geerlingguy.firewall
  collections:
    - name: community.general
    - name: community.docker
  EOF

  ansible-galaxy install -r requirements.yml`}),e.jsx("h2",{children:"7. Ansible Vault — Gerenciar Segredos"}),e.jsx(a,{title:"Criptografar dados sensíveis com Vault",code:`# Criar um arquivo criptografado
  ansible-vault create secrets.yml
  # Pede uma senha e abre o editor para adicionar variáveis:
  # db_password: "senha_super_secreta"
  # api_key: "abc123def456"

  # Criptografar um arquivo existente
  ansible-vault encrypt vars/production.yml

  # Editar um arquivo criptografado
  ansible-vault edit secrets.yml

  # Descriptografar um arquivo
  ansible-vault decrypt secrets.yml

  # Ver o conteúdo sem descriptografar permanentemente
  ansible-vault view secrets.yml

  # Mudar a senha de um arquivo
  ansible-vault rekey secrets.yml

  # Executar playbook que usa arquivos criptografados
  ansible-playbook site.yml --ask-vault-pass
  # Ou usando um arquivo com a senha:
  ansible-playbook site.yml --vault-password-file ~/.vault_pass

  # Criptografar apenas uma variável (string)
  ansible-vault encrypt_string 'senha_secreta' --name 'db_password'
  # Saída (cole no YAML):
  # db_password: !vault |
  #   $ANSIBLE_VAULT;1.1;AES256
  #   3836626...

  # Usar vault com diferentes IDs (para diferentes ambientes)
  ansible-vault create --vault-id prod@prompt secrets-prod.yml
  ansible-vault create --vault-id dev@prompt secrets-dev.yml`}),e.jsx("h2",{children:"8. Playbook Completo de Exemplo"}),e.jsx(a,{title:"Deploy completo de uma aplicação web",code:`cat > deploy-app.yml << 'EOF'
  ---
  - name: Deploy completo da aplicação
    hosts: webservers
    become: yes
    vars:
      app_name: minha-app
      app_user: deploy
      app_dir: "/var/www/{{ app_name }}"
      repo_url: "https://github.com/usuario/{{ app_name }}.git"
      app_branch: main
      node_version: "20"

    pre_tasks:
      - name: Atualizar cache do apt
        apt:
          update_cache: yes
          cache_valid_time: 3600

    tasks:
      - name: Criar usuário da aplicação
        user:
          name: "{{ app_user }}"
          shell: /bin/bash
          create_home: yes

      - name: Instalar dependências do sistema
        apt:
          name:
            - git
            - nginx
            - curl
            - build-essential
          state: present

      - name: Instalar Node.js via NodeSource
        shell: |
          curl -fsSL https://deb.nodesource.com/setup_{{ node_version }}.x | bash -
          pkg install -y nodejs
        args:
          creates: /usr/bin/node

      - name: Clonar/Atualizar repositório
        git:
          repo: "{{ repo_url }}"
          dest: "{{ app_dir }}"
          version: "{{ app_branch }}"
          force: yes
        become_user: "{{ app_user }}"
        register: git_result

      - name: Instalar dependências Node.js
        npm:
          path: "{{ app_dir }}"
          state: present
        become_user: "{{ app_user }}"
        when: git_result.changed

      - name: Build da aplicação
        shell: npm run build
        args:
          chdir: "{{ app_dir }}"
        become_user: "{{ app_user }}"
        when: git_result.changed

      - name: Configurar Nginx
        template:
          src: templates/nginx-app.conf.j2
          dest: "/etc/nginx/sites-available/{{ app_name }}"
        notify: Reload Nginx

      - name: Habilitar site no Nginx
        file:
          src: "/etc/nginx/sites-available/{{ app_name }}"
          dest: "/etc/nginx/sites-enabled/{{ app_name }}"
          state: link
        notify: Reload Nginx

    handlers:
      - name: Reload Nginx
        systemd:
          name: nginx
          state: reloaded
  EOF`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(a,{title:"Problemas comuns com Ansible",code:`# Erro: "Permission denied (publickey)"
  # Solução: Verificar chave SSH
  ssh -i ~/.ssh/sua_chave user@servidor   # Teste manual primeiro
  # Adicionar no inventário: ansible_ssh_private_key_file=~/.ssh/sua_chave

  # Erro: "Missing sudo password"
  # Solução: Adicionar --ask-become-pass ou configurar NOPASSWD no sudoers
  ansible-playbook site.yml --ask-become-pass

  # Erro: "Python not found on remote host"
  # Solução: Instalar Python no servidor ou especificar o caminho
  ansible all -m raw -a "pkg install -y python3" --become
  # Ou no inventário: ansible_python_interpreter=/usr/bin/python3

  # Erro: "Host key verification failed"
  # Solução: Desabilitar checagem (dev) ou adicionar a chave
  export ANSIBLE_HOST_KEY_CHECKING=False
  # Ou em ansible.cfg:
  # [defaults]
  # host_key_checking = False

  # Depurar uma task específica
  ansible-playbook site.yml -vvv --start-at-task="Nome da task"

  # Testar conectividade com todos os servidores
  ansible all -i inventory.ini -m ping -u u0_a123 --private-key=~/.ssh/key.pem

  # Listar todas as tasks de um playbook
  ansible-playbook site.yml --list-tasks

  # Listar todos os hosts afetados
  ansible-playbook site.yml --list-hosts`}),e.jsxs(i,{type:"info",title:"Ansible vs Terraform",children:["Ansible é para ",e.jsx("strong",{children:"configuração"})," de servidores (instalar pacotes, configurar serviços, fazer deploy). Terraform é para ",e.jsx("strong",{children:"provisionamento"}),"de infraestrutura (criar VMs, redes, load balancers na cloud). Em projetos reais, eles são frequentemente usados juntos: Terraform cria os servidores, Ansible os configura."]})]})}export{m as default};

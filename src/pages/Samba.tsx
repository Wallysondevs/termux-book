import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Samba() {
    return (
      <PageContainer
        title="Samba — Compartilhamento de Arquivos"
        subtitle="Guia completo do Samba no Ubuntu: compartilhar pastas com Windows, macOS e Linux na rede local, permissões, autenticação e segurança."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <p>
          O <strong>Samba</strong> implementa o protocolo SMB/CIFS, permitindo que máquinas
          Linux compartilhem arquivos e impressoras com Windows, macOS e outros sistemas na
          rede local. É a forma mais fácil de criar um servidor de arquivos acessível por
          qualquer computador ou dispositivo na rede.
        </p>

        <h2>1. Instalação e Configuração Básica</h2>
        <CodeBlock
          title="Instalar e configurar o Samba"
          code={`# Instalar o Samba
  sudo apt update
  sudo apt install -y samba samba-common-bin

  # Verificar o status
  sudo systemctl status smbd
  sudo systemctl enable smbd

  # Verificar a versão
  smbd --version

  # O arquivo de configuração principal
  sudo nano /etc/samba/smb.conf

  # Verificar se a configuração está correta
  testparm
  # Mostra a configuração efetiva e aponta erros

  # Estrutura do smb.conf:
  # [global]     → configurações gerais
  # [compartilhamento]  → cada pasta compartilhada`}
        />

        <h2>2. Compartilhamento Público (sem senha)</h2>
        <CodeBlock
          title="Criar compartilhamento acessível sem autenticação"
          code={`# Criar diretório para compartilhamento
  sudo mkdir -p /srv/samba/publico
  sudo chmod 777 /srv/samba/publico

  # Adicionar ao smb.conf
  sudo tee -a /etc/samba/smb.conf > /dev/null << 'EOF'

  [Publico]
     path = /srv/samba/publico
     browseable = yes
     read only = no
     guest ok = yes
     create mask = 0664
     directory mask = 0775
     force user = nobody
     force group = nogroup
  EOF

  # Reiniciar o Samba
  sudo systemctl restart smbd

  # Testar acesso local
  smbclient //localhost/Publico -N
  # -N = sem senha (guest)

  # Acessar de outro Linux:
  # smbclient //192.168.1.100/Publico -N
  # Ou montar:
  # sudo mount -t cifs //192.168.1.100/Publico /mnt/publico -o guest

  # Acessar do Windows:
  # Explorador de Arquivos → \\192.168.1.100\Publico

  # Acessar do macOS:
  # Finder → Ir → Conectar ao Servidor → smb://192.168.1.100/Publico`}
        />

        <h2>3. Compartilhamento com Autenticação</h2>
        <CodeBlock
          title="Criar compartilhamento protegido por senha"
          code={`# O Samba tem seu próprio banco de usuários (separado do Linux)
  # O usuário precisa existir no Linux E no Samba

  # Criar usuário no Linux (se não existir)
  sudo useradd -M -s /usr/sbin/nologin smbuser
  # -M = sem home, -s nologin = não pode fazer login no sistema

  # Adicionar usuário ao Samba (definir senha SMB)
  sudo smbpasswd -a smbuser
  # Digite a senha do Samba (pode ser diferente da senha do Linux)

  # Habilitar o usuário
  sudo smbpasswd -e smbuser

  # Criar diretório compartilhado
  sudo mkdir -p /srv/samba/documentos
  sudo chown smbuser:smbuser /srv/samba/documentos
  sudo chmod 770 /srv/samba/documentos

  # Adicionar ao smb.conf
  sudo tee -a /etc/samba/smb.conf > /dev/null << 'EOF'

  [Documentos]
     path = /srv/samba/documentos
     browseable = yes
     read only = no
     valid users = smbuser, @smbgrupo
     create mask = 0660
     directory mask = 0770
     force group = smbuser
  EOF

  # Para compartilhamento com grupo
  sudo groupadd smbgrupo
  sudo usermod -aG smbgrupo usuario1
  sudo usermod -aG smbgrupo usuario2

  # Reiniciar
  sudo systemctl restart smbd

  # Testar
  smbclient //localhost/Documentos -U smbuser

  # Gerenciar usuários Samba
  sudo pdbedit -L                  # Listar usuários
  sudo smbpasswd -x smbuser        # Remover usuário
  sudo smbpasswd smbuser            # Mudar senha`}
        />

        <h2>4. Montar Compartilhamento Samba no Linux</h2>
        <CodeBlock
          title="Acessar pastas Samba de outro computador"
          code={`# Instalar cliente SMB
  sudo apt install -y cifs-utils

  # Montar manualmente
  sudo mkdir -p /mnt/samba
  sudo mount -t cifs //192.168.1.100/Documentos /mnt/samba \
    -o username=smbuser,password=senha,uid=$(id -u),gid=$(id -g)

  # Montar sem expor senha na linha de comando
  # Criar arquivo de credenciais:
  sudo tee /etc/samba/.credentials > /dev/null << 'EOF'
  username=smbuser
  password=senha_secreta
  domain=WORKGROUP
  EOF
  sudo chmod 600 /etc/samba/.credentials

  # Montar usando o arquivo:
  sudo mount -t cifs //192.168.1.100/Documentos /mnt/samba \
    -o credentials=/etc/samba/.credentials,uid=$(id -u),gid=$(id -g)

  # Montagem automática no boot (fstab)
  echo '//192.168.1.100/Documentos /mnt/samba cifs credentials=/etc/samba/.credentials,uid=1000,gid=1000,iocharset=utf8 0 0' | sudo tee -a /etc/fstab
  sudo mount -a

  # Desmontar
  sudo umount /mnt/samba`}
        />

        <h2>5. Configuração Avançada</h2>
        <CodeBlock
          title="Configurações avançadas do smb.conf"
          code={`# Editar a seção [global] do smb.conf
  sudo nano /etc/samba/smb.conf

  [global]
     workgroup = WORKGROUP
     server string = Servidor de Arquivos Ubuntu
     server role = standalone server
     
     # Segurança
     security = user
     map to guest = never
     
     # Performance
     socket options = TCP_NODELAY IPTOS_LOWDELAY
     use sendfile = yes
     aio read size = 16384
     aio write size = 16384
     
     # Logging
     log file = /var/log/samba/log.%m
     max log size = 1000
     logging = file
     
     # Restringir acesso por IP
     hosts allow = 192.168.1.0/24 127.0.0.1
     hosts deny = 0.0.0.0/0
     
     # Desabilitar protocolos antigos (segurança)
     min protocol = SMB2
     
     # Charset (para acentos em nomes de arquivos)
     unix charset = UTF-8
     dos charset = CP850

  # Compartilhamento somente leitura
  [ISO]
     path = /srv/isos
     browseable = yes
     read only = yes
     guest ok = yes

  # Home directories (cada usuário acessa seu /home)
  [homes]
     comment = Home Directories
     browseable = no
     read only = no
     valid users = %S
     create mask = 0700
     directory mask = 0700`}
        />

        <h2>6. Firewall</h2>
        <CodeBlock
          title="Configurar firewall para Samba"
          code={`# Abrir portas do Samba no UFW
  sudo ufw allow samba
  # Ou especificamente:
  sudo ufw allow 139/tcp
  sudo ufw allow 445/tcp
  sudo ufw allow 137/udp
  sudo ufw allow 138/udp

  # Restringir acesso apenas à rede local
  sudo ufw allow from 192.168.1.0/24 to any app Samba

  # Verificar
  sudo ufw status`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com Samba"
          code={`# Não consigo acessar o compartilhamento
  # 1. Verificar se o Samba está rodando:
  sudo systemctl status smbd
  # 2. Verificar configuração:
  testparm
  # 3. Verificar firewall:
  sudo ufw status
  # 4. Verificar se a porta está escutando:
  sudo ss -tlnp | grep 445

  # "Access denied" ao acessar
  # Verificar se o usuário existe no Samba:
  sudo pdbedit -L | grep smbuser
  # Se não existir, adicionar:
  sudo smbpasswd -a smbuser

  # Problemas com permissões (pode ler mas não escrever)
  # Verificar permissões do diretório:
  ls -la /srv/samba/
  # Corrigir:
  sudo chown -R smbuser:smbgrupo /srv/samba/documentos
  sudo chmod -R 770 /srv/samba/documentos

  # Windows não encontra o servidor
  # Verificar se estão no mesmo WORKGROUP
  # No Windows: Propriedades do Computador → Grupo de Trabalho
  # No smb.conf: workgroup = WORKGROUP (mesmo nome)

  # Acentos em nomes de arquivos aparecem errados
  # No [global] do smb.conf:
  # unix charset = UTF-8

  # Ver logs de erro
  sudo tail -f /var/log/samba/log.smbd`}
        />

        <AlertBox type="info" title="Samba vs NFS">
          Use <strong>Samba</strong> quando precisar compartilhar com Windows/macOS ou em
          redes mistas. Use <strong>NFS</strong> para compartilhamento entre máquinas Linux
          (mais rápido e nativo). Para ambos os cenários, o Samba é a escolha mais versátil.
        </AlertBox>
      </PageContainer>
    );
  }
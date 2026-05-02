import{j as o}from"./index-d-w5ROEn.js";import{P as s}from"./PageContainer-t8f2nTRw.js";import{C as e}from"./CodeBlock-D742nO-w.js";import{I as a}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function m(){return o.jsxs(s,{title:"Hierarquia do Sistema de Arquivos (FHS)",subtitle:"O mapa do Linux — entenda o que existe em cada diretório, de / até /var/log, e por que tudo está onde está.",difficulty:"iniciante",timeToRead:"20 min",children:[o.jsxs("p",{children:["No Linux, tudo começa em ",o.jsx("strong",{children:"/"}),' (barra) — a raiz. Diferente do Windows que tem letras de drive (C:, D:, E:), no Linux existe apenas uma árvore de diretórios a partir da raiz. Todos os discos, pen drives e partições são "montados" em algum ponto dessa árvore.']}),o.jsxs("p",{children:["O ",o.jsx("strong",{children:"FHS"})," (Filesystem Hierarchy Standard) é a especificação que define onde cada tipo de arquivo deve ficar. Todas as distribuições Linux respeitam esse padrão, o que significa que o conhecimento sobre a estrutura de arquivos é portátil entre Termux, Fedora, Arch e outros."]}),o.jsx("h2",{children:"Mapa Completo dos Diretórios"}),o.jsx(e,{title:"A árvore de diretórios do Linux",code:`/                    ← Raiz (Root) — tudo começa aqui
├── bin/             ← Binários essenciais (ls, cp, cat, bash)
├── boot/            ← Arquivos do bootloader e kernel
├── dev/             ← Dispositivos de hardware (disco, teclado, mouse)
├── etc/             ← Arquivos de configuração do sistema
├── home/            ← Diretórios pessoais dos usuários
│   ├── joao/       ← Pasta do usuário "joao" (~)
│   └── maria/      ← Pasta do usuário "maria"
├── lib/             ← Bibliotecas compartilhadas (.so files)
├── lib64/           ← Bibliotecas de 64 bits
├── lost+found/      ← Arquivos recuperados após falha de disco
├── media/           ← Pontos de montagem automáticos (USB, CD)
├── mnt/             ← Ponto de montagem temporário manual
├── opt/             ← Software opcional de terceiros
├── proc/            ← Sistema de arquivos virtual: informações do kernel
├── root/            ← Pasta home do usuário root (administrador)
├── run/             ← Dados de runtime (PIDs, sockets)
├── sbin/            ← Binários de sistema (comandos para root)
├── snap/            ← Pacotes snap instalados
├── srv/             ← Dados de serviços (sites web, FTP)
├── sys/             ← Sistema de arquivos virtual: dispositivos do kernel
├── tmp/             ← Arquivos temporários (apagados no reboot)
├── usr/             ← Programas e dados dos usuários
│   ├── bin/        ← Programas dos usuários (python3, vim, gcc)
│   ├── lib/        ← Bibliotecas dos programas
│   ├── local/      ← Software instalado manualmente (fora do apt)
│   └── share/      ← Dados compartilhados (ícones, documentação)
└── var/             ← Dados variáveis (logs, banco de dados, cache)
    ├── log/        ← Logs do sistema
    ├── cache/      ← Cache de aplicações
    ├── lib/        ← Estado persistente de aplicações
    └── www/        ← Arquivos de sites web (convenção para /srv)`}),o.jsx("h2",{children:"Detalhamento de Cada Diretório"}),o.jsx("h3",{children:"/etc — As Configurações"}),o.jsxs("p",{children:[o.jsx("code",{children:"/etc"}),' contém todos os arquivos de configuração do sistema e dos serviços instalados. É o "painel de controle" do Linux em formato de texto.']}),o.jsx(e,{title:"Arquivos importantes em /etc",code:`/etc/apt/sources.list        # Repositórios do APT
/etc/apt/sources.list.d/     # Repositórios extras (um arquivo por PPA)
/etc/hostname                # Nome do computador
/etc/hosts                   # Mapeamento local host → IP
/etc/fstab                   # Tabela de sistemas de arquivos (montagens)
/etc/passwd                  # Informações dos usuários
/etc/shadow                  # Senhas criptografadas (apenas root lê)
/etc/group                   # Definição dos grupos
/etc/sudoers                 # Configuração do sudo
/etc/ssh/sshd_config         # Configuração do servidor SSH
/etc/nginx/                  # Configuração do Nginx
/etc/mysql/                  # Configuração do MySQL
/etc/systemd/system/         # Arquivos de service customizados
/etc/ufw/                    # Configuração do firewall UFW
/etc/environment             # Variáveis de ambiente do sistema
/etc/locale.gen              # Locales configurados
/etc/timezone                # Fuso horário atual`}),o.jsx("h3",{children:"/var — Dados Variáveis"}),o.jsx(e,{title:"O que fica em /var",code:`/var/log/syslog          # Log geral do sistema (Termux)
/var/log/auth.log        # Tentativas de login, sudo, SSH
/var/log/kern.log        # Mensagens do kernel
/var/log/dpkg.log        # Log de instalações/remoções de pacotes
/var/log/apt/history.log # Histórico detalhado do APT
/var/log/nginx/          # Logs de acesso e erro do Nginx
/var/log/mysql/          # Logs do MySQL
/var/log/ufw.log         # Log do firewall UFW
/var/cache/apt/archives/ # Cache de pacotes .deb baixados pelo APT
/var/lib/dpkg/           # Base de dados de pacotes instalados
/var/lib/mysql/          # Banco de dados MySQL
/var/www/html/           # Arquivos de site web padrão do Apache/Nginx
/var/mail/               # Caixas de email locais`}),o.jsx("h3",{children:"/proc e /sys — O Kernel em Tempo Real"}),o.jsxs("p",{children:["Estes são ",o.jsx("strong",{children:"sistemas de arquivos virtuais"}),". Os arquivos não existem no disco — são gerados pelo kernel em tempo real. Ler esses arquivos é uma janela direta para o estado do kernel e do hardware."]}),o.jsx(e,{title:"Explorando /proc e /sys",code:`# Informações do processador:
cat /proc/cpuinfo

# Informações de memória:
cat /proc/meminfo

# Versão do kernel:
cat /proc/version

# Lista de processos em execução (cada PID tem uma pasta):
ls /proc/
# 1  2  3  ...  1234  (números são PIDs de processos)

# Ver informações de um processo específico (PID 1 = systemd):
cat /proc/1/cmdline   # Linha de comando que iniciou o processo
cat /proc/1/status    # Status atual do processo
ls /proc/1/fd/        # File descriptors abertos pelo processo

# Partições e montagens em tempo real:
cat /proc/mounts
cat /proc/partitions

# Estatísticas de rede em tempo real:
cat /proc/net/dev

# Parâmetros do kernel (ajustáveis com sysctl):
ls /proc/sys/
cat /proc/sys/net/ipv4/ip_forward  # 0=desabilitado, 1=habilitado`}),o.jsx("h3",{children:"/dev — Dispositivos"}),o.jsx(e,{title:"Dispositivos importantes em /dev",code:`/dev/sda         # Primeiro disco SATA/SAS
/dev/sda1        # Primeira partição do primeiro disco
/dev/sdb         # Segundo disco (pen drive, HD externo)
/dev/nvme0n1     # Primeiro SSD NVMe
/dev/nvme0n1p1   # Primeira partição do SSD NVMe
/dev/sr0         # Drive de CD/DVD
/dev/null        # "Buraco negro" — descarta tudo que recebe
/dev/zero        # Gera zeros infinitamente (útil com dd)
/dev/random      # Gera bytes aleatórios verdadeiros (mais lento)
/dev/urandom     # Gera bytes pseudoaleatórios (mais rápido)
/dev/tty         # Terminal atual
/dev/tty1-6      # Terminais virtuais (Ctrl+Alt+F1 a F6)
/dev/pts/        # Terminais de pseudo-terminal (janelas de terminal gráfico)

# Exemplos práticos:
# Descartar saída de um comando:
ls -la > /dev/null

# Criar arquivo de 1GB zerado:
dd if=/dev/zero of=arquivo.bin bs=1M count=1024`}),o.jsx("h3",{children:"/home — Os Arquivos Pessoais"}),o.jsx(e,{title:"Estrutura do /home",code:`# Cada usuário tem seu próprio diretório em /home/
/home/joao/
├── Desktop/         # Área de trabalho
├── Documents/       # Documentos
├── Downloads/       # Downloads
├── Music/           # Músicas
├── Pictures/        # Imagens
├── Videos/          # Vídeos
├── .bashrc          # Configuração do shell Bash (arquivo oculto)
├── .bash_profile    # Executado no login interativo
├── .profile         # Variáveis de ambiente do usuário
├── .ssh/            # Chaves SSH e hosts conhecidos
├── .config/         # Configurações de aplicativos gráficos
├── .local/          # Dados locais de aplicativos
└── .cache/          # Cache de aplicativos

# Arquivos começando com . (ponto) são ocultos
# Ver arquivos ocultos:
ls -la ~
ls -la /home/joao/`}),o.jsx("h2",{children:"Montando e Desmontando Sistemas de Arquivos"}),o.jsx(e,{title:"Montar e desmontar dispositivos",code:`# Ver discos e partições disponíveis
lsblk
fdisk -l

# Ver sistemas de arquivos montados
df -h
mount | column -t

# Montar um pen drive manualmente
sudo mkdir -p /mnt/pendrive
sudo mount /dev/sdb1 /mnt/pendrive

# Montar com tipo específico
sudo mount -t exfat /dev/sdb1 /mnt/pendrive  # Para FAT32/exFAT

# Desmontar
sudo umount /mnt/pendrive
# Alternativa:
sudo umount /dev/sdb1

# Montar automaticamente no boot (editar /etc/fstab):
sudo nano /etc/fstab

# Formato do fstab:
# DISPOSITIVO  PONTO_MOUNT  TIPO  OPÇÕES  DUMP  PASS
UUID=abc123  /mnt/dados  ext4  defaults,nofail  0  2

# Encontrar o UUID de um dispositivo:
blkid /dev/sdb1`}),o.jsxs(a,{type:"warning",title:"Use UUID no /etc/fstab, não /dev/sdb",children:["A letra de um disco (sda, sdb) pode mudar entre reboots se você adicionar novos discos. Use sempre o UUID, que é permanente. Encontre com ",o.jsx("code",{children:"blkid"}),"."]})]})}export{m as default};

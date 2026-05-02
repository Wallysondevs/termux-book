import{j as e}from"./index-CsDtDb2_.js";import{P as s}from"./PageContainer-DdYPssra.js";import{C as a}from"./CodeBlock-CCueYP-d.js";import{I as o}from"./InfoBox-CFJp2Xi7.js";import"./house-BVOOG_Vc.js";import"./proxy-BaSd2E5R.js";function p(){return e.jsxs(s,{title:"APT — Gerenciador de Pacotes",subtitle:"O coração do Ubuntu. APT instala, remove, atualiza e gerencia todo o software do sistema com comandos simples e poderosos.",difficulty:"iniciante",timeToRead:"25 min",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"APT"})," (Advanced Package Tool) é o gerenciador de pacotes do Ubuntu e de todas as distribuições baseadas em Debian. Ele é responsável por instalar, remover e atualizar software, resolvendo dependências automaticamente. Com um único comando, você pode instalar um aplicativo completo com todas as bibliotecas que ele precisa."]}),e.jsx("h2",{children:"Os Comandos: apt vs apt-get"}),e.jsxs("p",{children:["Você vai encontrar dois comandos na documentação: ",e.jsx("code",{children:"apt"})," e ",e.jsx("code",{children:"apt-get"}),". O ",e.jsx("code",{children:"apt"})," é a versão moderna, com saída mais amigável e barra de progresso. O ",e.jsx("code",{children:"apt-get"})," é o clássico, mais estável para scripts. Para uso no terminal do dia a dia, use sempre ",e.jsx("code",{children:"apt"}),"."]}),e.jsxs(o,{type:"info",title:"O que é uma flag (parâmetro)?",children:["Flags são instruções extras passadas a um comando, sempre precedidas por ",e.jsx("code",{children:"-"}),"(flag curta, uma letra) ou ",e.jsx("code",{children:"--"})," (flag longa, palavra completa). Exemplo: ",e.jsx("code",{children:"apt install -y nginx"})," — o ",e.jsx("code",{children:"-y"})," é a flag, o ",e.jsx("code",{children:"nginx"}),"é o pacote. Flags modificam o comportamento do comando."]}),e.jsx("h2",{children:"1. Atualização do Sistema"}),e.jsx(a,{title:"Manter o sistema atualizado",code:`# PASSO 1: Atualizar a LISTA de pacotes disponíveis
sudo apt update
# Baixa informações dos repositórios sobre versões novas.
# Não instala nada — apenas "verifica o que há de novo".

# PASSO 2: Instalar as atualizações
sudo apt upgrade
# Instala versões mais novas dos pacotes já instalados.
# Vai perguntar "Deseja continuar? [S/n]" antes de instalar.

# A flag -y (ou --yes) responde "sim" automaticamente para todas as confirmações.
# Sem ela, o apt sempre pede confirmação antes de instalar ou remover.
sudo apt upgrade -y

# Fazer os dois de uma vez (a forma mais comum no dia a dia):
sudo apt update && sudo apt upgrade -y
# O && significa "execute o próximo comando SOMENTE se o anterior funcionou"

# PASSO AVANÇADO: Atualização completa (inclui mudanças de dependências)
sudo apt full-upgrade -y
# Pode instalar E remover pacotes se necessário.
# Necessário para grandes atualizações (ex: nova versão do kernel).

# Ver o que seria atualizado SEM instalar nada:
apt list --upgradable`}),e.jsxs(o,{type:"danger",title:"Sempre faça apt update antes de instalar",children:["Se você rodar ",e.jsx("code",{children:"sudo apt install alguma-coisa"})," sem antes fazer",e.jsx("code",{children:"sudo apt update"}),", pode instalar uma versão desatualizada do pacote ou receber erros de dependência. Sempre atualize a lista primeiro."]}),e.jsx("h2",{children:"2. Instalação de Pacotes"}),e.jsx(a,{title:"Instalar software com apt",code:`# Instalar um único pacote
sudo apt install vim
# Vai perguntar "Deseja continuar? [S/n]" — confirme com Enter ou S

# Instalar múltiplos pacotes de uma vez (separe por espaço)
sudo apt install git curl wget htop

# A flag -y confirma automaticamente, sem precisar responder às perguntas
sudo apt install -y nginx mysql-server php
# Equivalente a ficar digitando "S" para cada confirmação

# Instalar uma versão específica de um pacote
sudo apt install firefox=124.0+build3-0ubuntu0.24.04.1
# O = especifica a versão exata desejada

# Instalar um arquivo .deb baixado manualmente
sudo apt install ./nome-do-arquivo.deb
# O ./ indica que é um arquivo LOCAL (na pasta atual), não do repositório.
# O apt resolve as dependências automaticamente!

# Reinstalar um pacote que ficou corrompido
sudo apt install --reinstall nginx
# --reinstall = baixa e instala de novo, sobrescrevendo os arquivos atuais

# Instalar sem pacotes recomendados (instalação mais enxuta/mínima)
sudo apt install --no-install-recommends python3
# Pacotes recomendados são opcionais — sem esta flag, o apt os instala automaticamente`}),e.jsx("h2",{children:"3. Busca e Informações"}),e.jsx(a,{title:"Pesquisar e inspecionar pacotes",code:`# Buscar pacotes pelo nome ou pela descrição
apt search vlc
apt search "video player"

# Ver informações detalhadas de um pacote ANTES de instalar
apt show nginx

# Saída do apt show:
# Package: nginx
# Version: 1.24.0-2ubuntu7
# Priority: optional
# Section: web
# Installed-Size: 3.021 kB
# Depends: libpcre2-8-0, ...   ← dependências que serão instaladas junto
# Description: small, powerful, scalable web/proxy server

# Listar TODOS os pacotes instalados no sistema
apt list --installed
# --installed = filtrar apenas os que já estão no sistema

# Verificar se um pacote específico está instalado
apt list --installed | grep nginx
# O | (pipe) passa a saída de um comando como entrada do próximo.
# grep filtra as linhas que contêm "nginx".

# Ver quais arquivos um pacote instalou
dpkg -L nginx
# -L = List files (listar arquivos do pacote)

# Descobrir qual pacote instalou um arquivo específico
dpkg -S /usr/bin/python3
# -S = Search (buscar qual pacote possui esse arquivo)

# Ver dependências de um pacote
apt depends nginx

# Ver quais pacotes dependem de um dado pacote
apt rdepends nginx
# rdepends = reverse depends (dependências reversas)`}),e.jsx("h2",{children:"4. Remoção de Pacotes"}),e.jsx(a,{title:"Remover software de forma limpa",code:`# Remover um pacote (mantém arquivos de configuração em /etc/)
sudo apt remove nginx

# Remover um pacote E seus arquivos de configuração (purge = limpeza total)
sudo apt purge nginx
# Use purge quando quiser começar do zero com um serviço,
# ou quando a configuração estiver corrompida.

# Remover dependências que não são mais necessárias
sudo apt autoremove
# Quando você remove um pacote, suas dependências ficam "órfãs".
# autoremove identifica e remove essas dependências desnecessárias.

# A combinação mais completa e limpa:
sudo apt purge nginx && sudo apt autoremove -y

# Remover múltiplos pacotes de uma vez
sudo apt purge apache2 apache2-utils apache2-data`}),e.jsxs(o,{type:"warning",title:"remove vs purge",children:[e.jsx("code",{children:"apt remove"})," remove os binários mas mantém arquivos de configuração em",e.jsx("code",{children:"/etc/"}),". ",e.jsx("code",{children:"apt purge"})," remove tudo, incluindo as configurações. Se você vai reinstalar o serviço, use ",e.jsx("code",{children:"remove"}),". Se quer começar do zero (ex: limpar configurações ruins do MySQL), use ",e.jsx("code",{children:"purge"}),"."]}),e.jsx("h2",{children:"5. Limpeza de Cache"}),e.jsx(a,{title:"Liberar espaço em disco",code:`# O APT guarda todos os .deb baixados em /var/cache/apt/archives/
# Com o tempo, isso pode ocupar vários GB.

# Ver quanto espaço o cache ocupa:
du -sh /var/cache/apt/archives/
# du = disk usage (uso de disco)
# -s = summary (mostrar apenas o total, não listar cada arquivo)
# -h = human readable (mostrar em KB, MB, GB — não em bytes brutos)

# Remover .deb de versões ANTIGAS (mantém a versão atual instalada)
sudo apt autoclean
# Seguro — mantém os pacotes atuais no cache caso precise reinstalar sem internet.

# Remover TODOS os .deb do cache (economiza mais espaço)
sudo apt clean

# Ver o que o autoremove iria remover SEM fazer nada (simulação):
sudo apt autoremove --dry-run
# --dry-run = "ensaio geral" — mostra o que aconteceria, mas não executa

# Limpeza completa de uma vez:
sudo apt autoremove -y && sudo apt clean`}),e.jsx("h2",{children:"6. Repositórios e Sources.list"}),e.jsxs("p",{children:["O APT busca pacotes em ",e.jsx("strong",{children:"repositórios"}),". A lista de repositórios fica em",e.jsx("code",{children:"/etc/apt/sources.list"})," e nos arquivos em ",e.jsx("code",{children:"/etc/apt/sources.list.d/"}),"."]}),e.jsx(a,{title:"Entendendo e gerenciando repositórios",code:`# Ver repositórios configurados:
cat /etc/apt/sources.list

# Formato de uma linha de repositório:
# deb https://archive.ubuntu.com/ubuntu noble main restricted universe multiverse
# ^   ^                                 ^      ^    ^         ^        ^
# tipo  URL do servidor                  codinome componentes

# Habilitar repositório universe (pacotes mantidos pela comunidade):
sudo add-apt-repository universe
# universe = pacotes open source mantidos pela comunidade (não pela Canonical)

# Habilitar multiverse (software com restrições de licença):
sudo add-apt-repository multiverse
# multiverse = software proprietário ou com restrições legais (ex: codecs de vídeo)

# Adicionar repositório PPA (Personal Package Archive):
sudo add-apt-repository ppa:nome/repositorio
# PPA = repositórios mantidos por desenvolvedores independentes no Launchpad

# Exemplos de PPAs populares:
sudo add-apt-repository ppa:graphics-drivers/ppa     # Drivers NVIDIA recentes

# Remover um PPA:
sudo add-apt-repository --remove ppa:nome/repositorio
# --remove = inverso do comando, remove em vez de adicionar

# Após adicionar qualquer repositório, sempre atualize a lista:
sudo apt update`}),e.jsx("h2",{children:"7. Repositório de Terceiros (Manual)"}),e.jsx(a,{title:"Adicionar repositório com chave GPG",code:`# Exemplo: Adicionar repositório oficial do VS Code (Microsoft)

# 1. Baixar e instalar a chave GPG do repositório
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | \\
    gpg --dearmor | \\
    sudo tee /usr/share/keyrings/microsoft.gpg > /dev/null
# wget = baixar da internet
# -q = quiet (silencioso, sem barra de progresso)
# -O- = output para stdout (- = saída padrão, em vez de salvar em arquivo)
# gpg --dearmor = converter a chave do formato texto para binário
# tee = salvar em arquivo E também mostrar na tela
# > /dev/null = descartar a saída da tela (só queremos salvar o arquivo)

# 2. Adicionar o repositório
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft.gpg] \\
    https://packages.microsoft.com/repos/code stable main" | \\
    sudo tee /etc/apt/sources.list.d/vscode.list
# arch=amd64 = este repositório é para processadores 64-bit (x86_64)
# signed-by = usar esta chave para verificar a autenticidade dos pacotes

# 3. Atualizar e instalar
sudo apt update
sudo apt install code`}),e.jsx("h2",{children:"8. Comandos Úteis do dpkg"}),e.jsx(a,{title:"dpkg — o instalador de baixo nível",code:`# dpkg é o programa que de fato instala os .deb. O APT usa o dpkg por baixo.

# Instalar um arquivo .deb manualmente (sem resolver dependências!)
sudo dpkg -i google-chrome-stable_current_amd64.deb
# -i = install (instalar)
# Se faltar dependências, o dpkg falhará. Corrija com:
sudo apt install -f
# -f = fix-broken (corrigir dependências quebradas)

# Ver todos os pacotes instalados
dpkg -l
# -l = list (listar)

# Ver arquivos instalados por um pacote
dpkg -L firefox
# -L = List files of package (listar arquivos DO pacote, letra maiúscula)

# Ver qual pacote instalou um arquivo específico
dpkg -S /usr/bin/firefox
# -S = Search (buscar qual pacote possui esse caminho)

# Verificar status e informações de um pacote
dpkg -s nginx
# -s = status

# Reconfigurar um pacote (refaz as perguntas de configuração):
sudo dpkg-reconfigure tzdata     # Reconfigurar fuso horário
sudo dpkg-reconfigure locales    # Reconfigurar idioma do sistema`})]})}export{p as default};

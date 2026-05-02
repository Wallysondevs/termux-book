import{j as e}from"./index-CsDtDb2_.js";import{P as s}from"./PageContainer-DdYPssra.js";import{C as o}from"./CodeBlock-CCueYP-d.js";import{I as a}from"./InfoBox-CFJp2Xi7.js";import"./house-BVOOG_Vc.js";import"./proxy-BaSd2E5R.js";function c(){return e.jsxs(s,{title:"Guia de Instalação do Ubuntu",subtitle:"Instalação completa do Ubuntu Desktop e Server — do pen drive bootável até o primeiro login, passo a passo.",difficulty:"iniciante",timeToRead:"30 min",children:[e.jsx("p",{children:"Instalar o Ubuntu é um dos processos mais simples no mundo Linux. Diferente do Arch Linux (que exige linha de comando pura), o Ubuntu tem um instalador gráfico intuitivo com botões grandes e linguagem clara. Este guia cobre Ubuntu 24.04 LTS (Noble Numbat) tanto para Desktop quanto para Server."}),e.jsx("h2",{children:"Pré-Requisitos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Pen drive de pelo menos ",e.jsx("strong",{children:"4GB"})," (será formatado)"]}),e.jsx("li",{children:"Conexão com internet (recomendado durante a instalação)"}),e.jsx("li",{children:"PC com boot UEFI ou BIOS legada"}),e.jsx("li",{children:"Mínimo: 25GB de disco, 4GB RAM. Recomendado: 50GB+ disco, 8GB RAM"}),e.jsx("li",{children:"Backup de todos os dados importantes — a instalação pode apagar dados"})]}),e.jsx("h2",{children:"1. Baixar a ISO"}),e.jsxs("p",{children:["Acesse ",e.jsx("code",{children:"ubuntu.com/download"})," e baixe a versão desejada:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Ubuntu Desktop"}),": Para uso pessoal com interface gráfica. Arquivo ~5GB."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ubuntu Server"}),": Para servidores, sem interface gráfica. Arquivo ~2GB."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ubuntu LTS"}),": Versão de suporte longo (5 anos). Recomendado para todos."]})]}),e.jsxs(a,{type:"success",title:"Verifique o checksum SHA256",children:["Após baixar, verifique a integridade do arquivo para garantir que não foi corrompido:",e.jsx("code",{children:"sha256sum ubuntu-24.04-desktop-amd64.iso"})," e compare com o hash no site oficial."]}),e.jsx("h2",{children:"2. Criar o Pen Drive Bootável"}),e.jsx("h3",{children:"No Linux"}),e.jsx(o,{title:"Gravar ISO no pen drive (Linux)",code:`# Descobrir o dispositivo do pen drive
lsblk
# Identifique pelo tamanho. Exemplo: /dev/sdb (14.5G)

# Desmontar se estiver montado
sudo umount /dev/sdb1

# Gravar a ISO
sudo dd bs=4M if=ubuntu-24.04-desktop-amd64.iso \\
    of=/dev/sdb status=progress oflag=sync

# Alternativa mais rápida com pv:
sudo apt install pv
pv ubuntu-24.04-desktop-amd64.iso | sudo dd bs=4M of=/dev/sdb oflag=sync`}),e.jsx("h3",{children:"No Windows ou macOS"}),e.jsxs("p",{children:["Use o ",e.jsx("strong",{children:"balenaEtcher"})," (",e.jsx("code",{children:"etcher.balena.io"}),") — selecione a ISO, selecione o pen drive, clique em Flash. É simples assim. Outra opção no Windows é o ",e.jsx("strong",{children:"Rufus"})," (",e.jsx("code",{children:"rufus.ie"}),")."]}),e.jsx("h2",{children:"3. Dar Boot pelo Pen Drive"}),e.jsx("p",{children:"Insira o pen drive, reinicie o computador e entre no menu de boot:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ASUS"}),": F8 ou ESC"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Acer"}),": F12"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Dell"}),": F12"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"HP"}),": F9 ou ESC"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Lenovo"}),": F12 ou Fn+F12"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"MSI"}),": F11"]})]}),e.jsxs("p",{children:["Se o pen drive não aparecer, desabilite o ",e.jsx("strong",{children:"Secure Boot"})," na BIOS/UEFI (normalmente em Security → Secure Boot → Disabled)."]}),e.jsx("h2",{children:"4. Instalação do Ubuntu Desktop"}),e.jsx("h3",{children:"Tela de Boas-Vindas"}),e.jsxs("p",{children:["Após o boot, você pode escolher ",e.jsx("strong",{children:'"Try Ubuntu"'})," (testar sem instalar) ou",e.jsx("strong",{children:'"Install Ubuntu"'}),". Escolha instalar. Selecione o idioma ",e.jsx("strong",{children:"Português (Brasil)"}),' e clique em "Instalar Ubuntu".']}),e.jsx("h3",{children:"Configurações Iniciais"}),e.jsx(o,{title:"Telas do instalador Ubuntu 24.04",code:`Tela 1: Tipo de teclado
  → Português (Brasil) — ABNT2 com Ç
  → Clique em "Identificar Teclado" se não souber o layout

Tela 2: Atualizações e outros programas
  → "Instalação Normal" = inclui navegador, software de escritório, apps de mídia
  → "Instalação Mínima" = apenas o básico (navegador e utilitários)
  ✓ "Baixar atualizações ao instalar o Ubuntu"
  ✓ "Instalar software de terceiros" (drivers proprietários NVIDIA, Wi-Fi, codecs)

Tela 3: Tipo de instalação (MAIS IMPORTANTE)
  → "Apagar disco e instalar o Ubuntu" (mais simples, apaga tudo)
  → "Instalar ao lado do Windows" (dual-boot automático)
  → "Outra opção" (particionamento manual — avançado)

  Opções avançadas (se aparecer):
  ✓ "Usar LVM" — gerenciamento de volumes lógicos (recomendado)
  ✓ "Criptografar disco" — solicita senha a cada boot`}),e.jsxs(a,{type:"danger",title:"Atenção ao particionamento!",children:['A opção "Apagar disco e instalar o Ubuntu" vai apagar ',e.jsx("strong",{children:"tudo no disco"}),'. Se você tem Windows ou outros dados, escolha "Instalar ao lado do Windows" para dual-boot, ou faça backup antes de prosseguir.']}),e.jsx("h3",{children:"Particionamento Manual (Opção Avançada)"}),e.jsx(o,{title:"Esquema de partições recomendado",code:`# Para um disco de 250GB com UEFI:

/dev/sda1  →  512MB  →  EFI System Partition  →  fat32  →  /boot/efi
/dev/sda2  →  2GB    →  Linux swap             →  swap
/dev/sda3  →  50GB   →  Raiz do sistema        →  ext4   →  /
/dev/sda4  →  197GB  →  Arquivos pessoais       →  ext4   →  /home

# Ter /home separado é vantajoso: se precisar reinstalar o sistema,
# seus arquivos em /home ficam intactos.

# Para discos menores (ex: 60GB SSD):
/dev/sda1  →  512MB  →  EFI   →  fat32  →  /boot/efi
/dev/sda2  →  2GB    →  swap
/dev/sda3  →  57GB   →  /     →  ext4   →  /`}),e.jsx("h3",{children:"Informações Pessoais"}),e.jsx(o,{title:"Configuração de usuário",code:`Nome completo: João Silva
Nome do computador: ubuntu-joao    # sem espaços, preferência por hífens
Nome de usuário: joao              # tudo minúsculo, sem espaços
Senha: ••••••••                   # use uma senha forte

Opções de login:
○ Fazer login automaticamente     # Conveniente mas menos seguro
● Solicitar senha para entrar      # Recomendado`}),e.jsxs("p",{children:["A instalação começa e leva entre 10-20 minutos dependendo da velocidade do disco e da internet. Ao final, clique em ",e.jsx("strong",{children:'"Reiniciar"'})," e remova o pen drive quando solicitado."]}),e.jsx("h2",{children:"5. Instalação do Ubuntu Server"}),e.jsxs("p",{children:["O Ubuntu Server usa o instalador ",e.jsx("strong",{children:"Subiquity"}),", uma interface de texto (não gráfica) que funciona em qualquer servidor."]}),e.jsx(o,{title:"Etapas do instalador Ubuntu Server",code:`# Tela 1: Idioma
  → Escolha English (o Server é frequentemente gerenciado em inglês)
  → Ou Português do Brasil se preferir

# Tela 2: Tipo de teclado
  → Layout: Portuguese (Brazil)
  → Variant: Portuguese (Brazil, eliminate dead keys) [ABNT2]

# Tela 3: Tipo de instalação
  → Ubuntu Server (padrão)
  → Ubuntu Server (minimized) — para containers e VMs

# Tela 4: Configuração de rede
  → Se cabo ethernet: detecta automaticamente via DHCP
  → Se Wi-Fi: selecione a rede e digite a senha

# Tela 5: Proxy HTTP
  → Deixe em branco se não tiver proxy corporativo

# Tela 6: Mirror do Ubuntu
  → O instalador testa e seleciona o mais rápido automaticamente
  → Pode deixar o padrão

# Tela 7: Armazenamento (Particionamento)
  → "Use entire disk" = usar o disco todo (recomendado)
  → "Use entire disk with LVM" = com gerenciamento de volumes
  → "Custom storage layout" = manual

# Tela 8: Perfil (Usuário)
  → Seu nome, nome do servidor, usuário, senha

# Tela 9: Ubuntu Pro (opcional)
  → Pode pular clicando em "Skip for now"
  → Ubuntu Pro oferece ESM (Extended Security Maintenance)

# Tela 10: Pacotes extras
  ✓ OpenSSH server ← MARQUE ESTE para poder acessar remotamente!
  □ Various snaps (selecione se quiser Docker, etc)

# Instalação começa automaticamente. Ao final: Reboot.`}),e.jsxs(a,{type:"warning",title:"OpenSSH no Server é essencial!",children:["Na instalação do Ubuntu Server, ",e.jsx("strong",{children:"marque OpenSSH server"}),". Sem ele, você não conseguirá acessar o servidor remotamente via SSH. Se esquecer, instale depois:",e.jsx("code",{children:"sudo apt install openssh-server"})]}),e.jsx("h2",{children:"6. Primeiras Verificações Após Instalar"}),e.jsx(o,{title:"Verificações pós-instalação",code:`# Verificar versão do Ubuntu instalada
lsb_release -a
# Distributor ID: Ubuntu
# Description:    Ubuntu 24.04.1 LTS
# Release:        24.04
# Codename:       noble

# Verificar kernel
uname -r
# 6.8.0-31-generic

# Verificar espaço em disco
df -h

# Verificar memória RAM disponível
free -h

# Verificar internet
ping -c 3 google.com

# Atualizar o sistema antes de mais nada
sudo apt update && sudo apt upgrade -y`})]})}export{c as default};

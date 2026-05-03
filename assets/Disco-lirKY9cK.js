import{j as e}from"./index-BGu3owFd.js";import{P as r,I as a}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function c(){return e.jsxs(r,{title:"Gerenciamento de Storage no Termux",subtitle:"Como verificar uso de espaço, limpar cache do Termux e inspecionar o storage compartilhado do Android — sem cair na armadilha de ferramentas que precisam de root.",difficulty:"iniciante",timeToRead:"15 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"lsblk"})," "," — "," ","árvore."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"df -h"})," "," — "," ","uso."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"du -sh"})," "," — "," ","tamanho de pasta."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"fdisk"})," "," — "," ","particiona."]})]}),e.jsxs(a,{type:"warning",title:"O que NÃO funciona no Termux puro",children:[e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"lsblk"})," — instala, mas mostra lista vazia: o Android não expõe block devices ao app sem root."]}),e.jsxs("li",{children:[e.jsx("code",{children:"smartctl"})," / ",e.jsx("code",{children:"smartmontools"})," — não há disco SATA/NVMe no celular; o storage é eMMC/UFS gerenciado pelo controlador interno e não responde a comandos SMART."]}),e.jsxs("li",{children:[e.jsx("code",{children:"badblocks"}),", ",e.jsx("code",{children:"fdisk"}),", ",e.jsx("code",{children:"parted"}),","," ",e.jsx("code",{children:"mkfs.*"})," — nada disso encosta no storage real do Android sem root completo + reflash."]})]}),"Use as ferramentas listadas abaixo, todas funcionam puro no Termux."]}),e.jsx("h2",{children:"1. Verificar espaço em disco"}),e.jsx(o,{title:"df e du — funcionam normalmente",code:`# Espaço por filesystem (visível ao Termux)
df -h
# Saídas típicas que importam:
# /data           → onde está o $PREFIX (instalação do Termux)
# /storage/emulated → storage compartilhado (DCIM, Downloads, etc.)

# Espaço com tipo de filesystem
df -hT

# Tamanho de um diretório
du -sh $PREFIX
du -sh ~

# Tamanho de cada item dentro de uma pasta, ordenado
du -sh ~/* 2>/dev/null | sort -rh | head

# Top 20 maiores diretórios na home
du -ah ~ 2>/dev/null | sort -rh | head -20

# Espaço usado pelo storage compartilhado (após termux-setup-storage)
du -sh ~/storage/shared/ 2>/dev/null
du -sh ~/storage/dcim/ 2>/dev/null
du -sh ~/storage/downloads/ 2>/dev/null

# Inodes (número de arquivos)
df -ih`}),e.jsx("h2",{children:"2. Navegador interativo — ncdu"}),e.jsx(o,{title:"Encontrar o que está enchendo o storage",code:`pkg install -y ncdu

# Analisar a home do Termux
ncdu ~

# Analisar o storage compartilhado
ncdu ~/storage/shared

# Atalhos:
#   setas → navegar
#   d     → deletar item
#   q     → sair`}),e.jsx("h2",{children:"3. Informações de storage do Android (Termux:API)"}),e.jsx(o,{title:"termux-api: dados que só o Android tem",code:`# Instalar (precisa também do app Termux:API da F-Droid)
pkg install -y termux-api

# Informações de storage do dispositivo
termux-storage-get /tmp/escolhido.txt   # abre seletor de arquivo do Android
termux-info | grep -i storage           # caminhos do Termux

# Espaço total/livre do storage compartilhado em JSON
df --output=source,size,used,avail,pcent ~/storage/shared`}),e.jsx("h2",{children:"4. Liberar espaço no Termux"}),e.jsx(o,{title:"Limpezas seguras",code:`# Cache de pacotes (pkg/apt)
pkg clean
# Equivale a: apt clean — apaga ~/$PREFIX/var/cache/apt/archives/*.deb

# Pacotes que não são mais dependência de ninguém
apt autoremove -y

# Cache do pip
pip cache purge 2>/dev/null

# Cache do npm
npm cache clean --force 2>/dev/null

# Cache do cargo
rm -rf ~/.cargo/registry/cache/* 2>/dev/null

# Logs do Termux (se você gerou algum)
ls -lh $PREFIX/var/log/ 2>/dev/null

# Lixeira do gerenciador de arquivos do Android (não é do Termux,
# mas costuma ocupar espaço): apague pelo app de arquivos do celular.

# Arquivos temporários
rm -rf $PREFIX/tmp/* /data/data/com.termux/cache/* 2>/dev/null`}),e.jsx("h2",{children:"5. Backup do Termux antes de limpar"}),e.jsx(o,{title:"tar para o storage compartilhado",code:`# Backup completo da home + $PREFIX (cuidado: pode dar 1-2 GB)
termux-setup-storage   # garantir acesso
tar --exclude='$PREFIX/tmp' -cJf \\
  ~/storage/shared/termux-backup-$(date +%F).tar.xz \\
  -C /data/data/com.termux/files home usr

# Backup só da home
tar -cJf ~/storage/shared/home-$(date +%F).tar.xz -C ~ .`}),e.jsx("h2",{children:"6. Troubleshooting"}),e.jsx(o,{title:"Problemas comuns",code:`# "No space left on device"
df -h
du -sh ~/* | sort -rh | head
# Limpar cache de pacotes:
pkg clean

# pkg install falhando por falta de espaço
apt clean && pkg autoclean

# /sdcard cheio mas df mostra livre
# Pode ser cache de apps Android (não dá para limpar pelo Termux):
# vá em Configurações > Armazenamento > limpar cache no próprio Android.

# ~/storage/ não existe ou está vazio
termux-setup-storage
# E aceite o popup de permissão.

# Quero ver tamanho de cada app Android instalado
# Não é possível pelo Termux (sem root). Use o app
# Configurações > Apps do próprio Android.`}),e.jsxs(a,{type:"info",title:"Resumo",children:["Para storage no Termux você só precisa de ",e.jsx("code",{children:"df"}),", ",e.jsx("code",{children:"du"}),","," ",e.jsx("code",{children:"ncdu"})," e ",e.jsx("code",{children:"pkg clean"}),". Tudo que envolve block devices, SMART ou particionamento ",e.jsx("strong",{children:"não é território do Termux"})," — é território do firmware Android."]})]})}export{c as default};

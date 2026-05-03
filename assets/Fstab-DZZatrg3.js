import{j as e}from"./index-BGu3owFd.js";import{P as s,I as r}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function c(){return e.jsxs(s,{title:"Montagem de Storage no Android — não há /etc/fstab editável",subtitle:"Como o Android monta /data, /sdcard e cartões SD automaticamente, e como o Termux acessa o storage compartilhado via termux-setup-storage.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"/etc/fstab"})," "," — "," ","montagens."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"UUID"})," "," — "," ","identificador."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Options"})," "," — "," ","noatime, ro."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"mount -a"})," "," — "," ","aplica."]})]}),e.jsxs(r,{type:"warning",title:"Não existe /etc/fstab editável no Android",children:["Em distros Linux desktop, ",e.jsx("code",{children:"/etc/fstab"})," define o que montar no boot. No Android ",e.jsx("strong",{children:"quem decide o que montar é o init/vold"})," (códigos do próprio sistema operacional), a partir de partições fixas definidas no firmware. Não há",e.jsx("code",{children:" /etc/fstab"})," que o Termux possa editar para “montar mais um disco”. Tudo o que existe em ",e.jsx("code",{children:"$PREFIX/etc/"})," serve para o Termux, não para o kernel do Android. Para o Termux ",e.jsx("em",{children:"enxergar"})," o storage compartilhado existe um único comando: ",e.jsx("code",{children:"termux-setup-storage"}),"."]}),e.jsx("h2",{children:"1. termux-setup-storage — a única coisa que você roda"}),e.jsx(o,{title:"Conceder acesso ao storage compartilhado",code:`# Roda uma vez (mostra o popup do Android pedindo permissão)
termux-setup-storage

# Após autorizar, surge a pasta ~/storage/ com symlinks:
ls -l ~/storage/
# Saída típica:
# dcim     -> /storage/emulated/0/DCIM
# downloads-> /storage/emulated/0/Download
# movies   -> /storage/emulated/0/Movies
# music    -> /storage/emulated/0/Music
# pictures -> /storage/emulated/0/Pictures
# shared   -> /storage/emulated/0/
# external-1 -> /storage/XXXX-XXXX/Android/data/com.termux/files (cartão SD, se houver)

# Usar
ls ~/storage/downloads
cp arquivo.txt ~/storage/shared/Documents/`}),e.jsx("h2",{children:"2. Ver o que está montado (read-only para você)"}),e.jsx(o,{title:"mount, df e findmnt",code:`# Lista tudo que o kernel Android montou — informativo, NÃO se edita
mount | head -20

# Saída típica (resumo):
# rootfs on / type rootfs (ro,seclabel,size=...)
# tmpfs on /dev type tmpfs (rw,seclabel,nosuid,relatime,mode=755)
# /dev/block/dm-XX on /data type f2fs (rw,seclabel,nosuid,nodev,noatime,...)
# /dev/fuse on /storage/emulated type fuse (rw,nosuid,nodev,noexec,noatime,...)
# tmpfs on /storage type tmpfs (rw,seclabel,nosuid,nodev,noexec,relatime,...)

# Espaço disponível
df -h

# Onde está montado um caminho específico
df -h $PREFIX
df -h ~/storage/shared/`}),e.jsx(r,{type:"warning",title:"Por que você NÃO pode editar isso",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"mount"})," e ",e.jsx("code",{children:"umount"})," exigem capability"," ",e.jsx("code",{children:"CAP_SYS_ADMIN"})," — bloqueada no Termux por padrão."]}),e.jsxs("li",{children:["O kernel do Android usa SELinux ",e.jsx("em",{children:"enforcing"}),": mesmo com root convencional, tentar remontar ",e.jsx("code",{children:"/system"})," ou ",e.jsx("code",{children:"/data"})," com opções diferentes quase sempre falha."]}),e.jsx("li",{children:"Não existe arquivo de texto que sobreviva ao reboot e altere a tabela de montagem. Tudo é gerado pelo init a partir do firmware."})]})}),e.jsx("h2",{children:"3. Cartão SD — quando aparece e quando não"}),e.jsx(o,{title:"Acessar SD a partir do Termux",code:`# Após termux-setup-storage, se houver SD físico:
ls ~/storage/external-1/
# Esse caminho é /storage/XXXX-XXXX/Android/data/com.termux/files
# É a única pasta do SD onde o Termux pode escrever sem root,
# por causa do Scoped Storage (Android 11+).

# Tentar escrever fora dela falha com 'Permission denied':
echo teste > /storage/XXXX-XXXX/qualquer.txt   # ❌ EACCES

# Ler outras pastas do SD pode até funcionar para mídia,
# mas escrever só dá em ~/storage/external-1/.`}),e.jsx("h2",{children:"4. Montar um “volume” lógico do seu jeito (workarounds)"}),e.jsx(o,{title:"Soluções que funcionam sem root",code:`# Criptografar uma pasta privada (parece um volume montado)
pkg install -y gocryptfs
mkdir -p ~/secret-cifra ~/secret-claro
gocryptfs -init ~/secret-cifra
gocryptfs ~/secret-cifra ~/secret-claro
# Use ~/secret-claro como pasta normal; desmonta com:
fusermount -u ~/secret-claro

# Montar diretório remoto via SSHFS
pkg install -y sshfs
mkdir -p ~/servidor
sshfs usuario@servidor:/home/usuario ~/servidor
# Desmontar
fusermount -u ~/servidor

# Para imagens/ISOs use proot-distro (faz "mount" lógico do rootfs).`}),e.jsx("h2",{children:"5. Resumo: o equivalente “Termux” do fstab"}),e.jsx(o,{title:"Cheatsheet",code:`Distro Linux                    | Termux / Android
--------------------------------|----------------------------------------
editar /etc/fstab               | rodar termux-setup-storage (uma vez)
mount /dev/sdb1 /mnt/dados      | usar ~/storage/shared (já montado)
mount -o loop arq.iso /mnt/iso  | proot-distro / archivemount
mount -t cifs //srv/share ...   | sshfs usuario@srv:/path ~/srv
swapon /swapfile                | não há swap configurável (kernel decide)
fsck /dev/sdb1                  | não acessível (block device protegido)`}),e.jsxs(r,{type:"info",title:"Em uma frase",children:["No Android, storage é “monte automático e ponto”. O Termux participa via"," ",e.jsx("code",{children:"termux-setup-storage"})," e via FUSE (",e.jsx("code",{children:"sshfs"}),","," ",e.jsx("code",{children:"gocryptfs"}),"). Editar fstab não é uma opção — nem é necessário."]})]})}export{c as default};

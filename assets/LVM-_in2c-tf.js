import{j as e}from"./index-BGu3owFd.js";import{P as r,I as a}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function c(){return e.jsxs(r,{title:"LVM no Android — por que não funciona e como o storage realmente é organizado",subtitle:"LVM (pvcreate/vgcreate/lvcreate) não existe no Android. Entenda o layout real do storage do Android: /data, /sdcard, OBB e como o Termux acessa cada parte.",difficulty:"intermediario",timeToRead:"10 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"LVM"})," "," — "," ","particionamento flexível."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"PV/VG/LV"})," "," — "," ","camadas."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"lvextend"})," "," — "," ","redimensiona."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Snapshot"})," "," — "," ","suportado."]})]}),e.jsxs(a,{type:"danger",title:"LVM não funciona no Android",children:["O ",e.jsx("strong",{children:"LVM"})," precisa criar e gerenciar partições em block devices (",e.jsx("code",{children:"/dev/sdX"}),", ",e.jsx("code",{children:"/dev/nvmeXn1"}),") — coisa que ",e.jsx("strong",{children:"não existe"}),"no Android sem root completo + reflash da partição ",e.jsx("code",{children:"/data"}),". O pacote",e.jsx("code",{children:" lvm2"})," ",e.jsx("strong",{children:"não está nos repositórios do Termux"}),", e mesmo se você compilasse, comandos como ",e.jsx("code",{children:"pvcreate"}),", ",e.jsx("code",{children:"vgcreate"}),",",e.jsx("code",{children:" lvcreate"})," falhariam porque o storage interno é uma única partição formatada em F2FS/ext4 gerenciada pelo Android. Esqueça LVM no celular."]}),e.jsx("h2",{children:"Como o storage realmente é organizado no Android"}),e.jsxs("p",{children:["Android não expõe discos como Linux desktop. Em vez de ",e.jsx("code",{children:"/dev/sda1"}),",",e.jsx("code",{children:" /dev/sda2"})," etc, você tem partições fixas definidas pelo fabricante e montadas pelo bootloader. As mais relevantes para quem usa Termux:"]}),e.jsx(o,{title:"Partições principais do Android",code:`/data        → partição de userdata. Onde ficam apps + Termux.
              Caminho do Termux: /data/data/com.termux/files/
              ($PREFIX = /data/data/com.termux/files/usr)

/sdcard      → storage compartilhado (Internal Shared Storage).
              É um symlink para /storage/emulated/0/.
              Aqui ficam Downloads, DCIM, Music, Documents...

/storage/XXXX-XXXX → cartão SD físico (se houver), montado com FUSE.
                     Acesso limitado em Android 11+ (Scoped Storage).

/system, /vendor, /product → read-only, parte da imagem do Android.
                              Termux não toca nelas.

Android/data/<package>     → diretório privado de cada app no /sdcard
Android/obb/<package>      → "Opaque Binary Blobs" (assets de jogos)`}),e.jsx("h2",{children:"Vendo o storage do Termux"}),e.jsx(o,{title:"Comandos que funcionam",code:`# Espaço total e usado das partições visíveis ao Termux
df -h

# Tamanho do $PREFIX (toda a instalação do Termux)
du -sh $PREFIX

# Tamanho da home
du -sh ~

# Habilitar acesso ao /sdcard a partir do Termux
termux-setup-storage
# Após autorizar, surge ~/storage/ com symlinks:
ls -l ~/storage/

# Ver tamanho do storage compartilhado
du -sh ~/storage/shared/`}),e.jsx("h2",{children:"Por que não dá para criar “volumes lógicos” no Android"}),e.jsx(o,{title:"O que falta",code:`# Para LVM funcionar você precisaria:
#  1. Acesso a block devices reais (/dev/block/sdaXX) — exige root.
#  2. Poder reformatar /data — exige reflash via fastboot/recovery.
#  3. Kernel com módulo dm-mod habilitado.
#  4. Aceitar que o Android não bootaria mais (ele espera /data
#     ext4/f2fs, não dm-linear).

# Tentativas de "particionar" o storage interno via fdisk falham:
fdisk -l
# Mostra apenas dispositivos read-only ou nada (sem root).

# A "alternativa" mais próxima de volumes flexíveis no Android é:
#  - Adoptable Storage (cartão SD vira parte do /data, fabricante-dependente)
#  - Loop devices em arquivos (proot-distro usa isso para o rootfs)`}),e.jsx("h2",{children:"Equivalentes práticos no Termux"}),e.jsx(o,{title:"O que substitui LVM no dia a dia",code:`# "Quero juntar dois discos num pool"           → impossível sem root + reflash
# "Quero snapshot de um diretório"               → tar / rsync / btrfs (em proot-distro)
# "Quero redimensionar partição sem desmontar"   → não se aplica (storage é gerido pelo Android)
# "Quero migrar dados para outro storage"        → cp -a / rsync para ~/storage/shared/
# "Quero criptografar um volume"                 → gocryptfs / cryfs (rodam no Termux)

# Exemplo: criptografar uma pasta privada com gocryptfs
pkg install -y gocryptfs
mkdir -p ~/cripto-cifra ~/cripto-clara
gocryptfs -init ~/cripto-cifra
gocryptfs ~/cripto-cifra ~/cripto-clara`}),e.jsxs(a,{type:"info",title:"Resumo",children:["No Android, storage é um recurso fechado gerenciado pelo SO. Use"," ",e.jsx("code",{children:"termux-setup-storage"})," para ganhar acesso a ",e.jsx("code",{children:"~/storage/shared"}),", e organize seus dados em diretórios — não em volumes lógicos. Para flexibilidade real (snapshots, pools, criptografia em nível de volume) use um servidor Linux remoto e acesse via SSH a partir do Termux."]})]})}export{c as default};

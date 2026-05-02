import{j as o}from"./index-C2xKMDcs.js";import{P as r}from"./PageContainer-D8Fa3g_u.js";import{C as e}from"./CodeBlock-OPQVSQze.js";import{I as a}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function m(){return o.jsxs(r,{title:"LVM no Android — por que não funciona e como o storage realmente é organizado",subtitle:"LVM (pvcreate/vgcreate/lvcreate) não existe no Android. Entenda o layout real do storage do Android: /data, /sdcard, OBB e como o Termux acessa cada parte.",difficulty:"intermediario",timeToRead:"10 min",children:[o.jsxs(a,{type:"danger",title:"LVM não funciona no Android",children:["O ",o.jsx("strong",{children:"LVM"})," precisa criar e gerenciar partições em block devices (",o.jsx("code",{children:"/dev/sdX"}),", ",o.jsx("code",{children:"/dev/nvmeXn1"}),") — coisa que ",o.jsx("strong",{children:"não existe"}),"no Android sem root completo + reflash da partição ",o.jsx("code",{children:"/data"}),". O pacote",o.jsx("code",{children:" lvm2"})," ",o.jsx("strong",{children:"não está nos repositórios do Termux"}),", e mesmo se você compilasse, comandos como ",o.jsx("code",{children:"pvcreate"}),", ",o.jsx("code",{children:"vgcreate"}),",",o.jsx("code",{children:" lvcreate"})," falhariam porque o storage interno é uma única partição formatada em F2FS/ext4 gerenciada pelo Android. Esqueça LVM no celular."]}),o.jsx("h2",{children:"Como o storage realmente é organizado no Android"}),o.jsxs("p",{children:["Android não expõe discos como Linux desktop. Em vez de ",o.jsx("code",{children:"/dev/sda1"}),",",o.jsx("code",{children:" /dev/sda2"})," etc, você tem partições fixas definidas pelo fabricante e montadas pelo bootloader. As mais relevantes para quem usa Termux:"]}),o.jsx(e,{title:"Partições principais do Android",code:`/data        → partição de userdata. Onde ficam apps + Termux.
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
Android/obb/<package>      → "Opaque Binary Blobs" (assets de jogos)`}),o.jsx("h2",{children:"Vendo o storage do Termux"}),o.jsx(e,{title:"Comandos que funcionam",code:`# Espaço total e usado das partições visíveis ao Termux
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
du -sh ~/storage/shared/`}),o.jsx("h2",{children:"Por que não dá para criar “volumes lógicos” no Android"}),o.jsx(e,{title:"O que falta",code:`# Para LVM funcionar você precisaria:
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
#  - Loop devices em arquivos (proot-distro usa isso para o rootfs)`}),o.jsx("h2",{children:"Equivalentes práticos no Termux"}),o.jsx(e,{title:"O que substitui LVM no dia a dia",code:`# "Quero juntar dois discos num pool"           → impossível sem root + reflash
# "Quero snapshot de um diretório"               → tar / rsync / btrfs (em proot-distro)
# "Quero redimensionar partição sem desmontar"   → não se aplica (storage é gerido pelo Android)
# "Quero migrar dados para outro storage"        → cp -a / rsync para ~/storage/shared/
# "Quero criptografar um volume"                 → gocryptfs / cryfs (rodam no Termux)

# Exemplo: criptografar uma pasta privada com gocryptfs
pkg install -y gocryptfs
mkdir -p ~/cripto-cifra ~/cripto-clara
gocryptfs -init ~/cripto-cifra
gocryptfs ~/cripto-cifra ~/cripto-clara`}),o.jsxs(a,{type:"info",title:"Resumo",children:["No Android, storage é um recurso fechado gerenciado pelo SO. Use"," ",o.jsx("code",{children:"termux-setup-storage"})," para ganhar acesso a ",o.jsx("code",{children:"~/storage/shared"}),", e organize seus dados em diretórios — não em volumes lógicos. Para flexibilidade real (snapshots, pools, criptografia em nível de volume) use um servidor Linux remoto e acesse via SSH a partir do Termux."]})]})}export{m as default};

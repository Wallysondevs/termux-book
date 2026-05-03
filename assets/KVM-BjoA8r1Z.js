import{j as e}from"./index-BGu3owFd.js";import{P as s,I as o}from"./InfoBox-cbYNoYJG.js";import{C as r}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function l(){return e.jsxs(s,{title:"Virtualização no Termux — proot-distro e QEMU TCG",subtitle:"Por que KVM/QEMU acelerado não funciona no Android e quais as alternativas reais: proot-distro para rodar distros Linux e QEMU em modo TCG para testes.",difficulty:"avancado",timeToRead:"20 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"KVM"})," "," — "," ","virt nativa."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"QEMU"})," "," — "," ","emulador."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"libvirt"})," "," — "," ","API."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"virt-manager"})," "," — "," ","GUI."]})]}),e.jsxs(o,{type:"danger",title:"KVM, QEMU acelerado e virt-manager NÃO rodam no Android",children:["O ",e.jsx("strong",{children:"KVM"})," exige acesso ao módulo ",e.jsx("code",{children:"/dev/kvm"})," do kernel e às instruções de virtualização do CPU (VT-x/AMD-V em x86, EL2 em ARM). O Android",e.jsx("strong",{children:" bloqueia isso"})," — o kernel não expõe ",e.jsx("code",{children:"/dev/kvm"})," para apps, nem mesmo com root convencional. Pacotes como ",e.jsx("code",{children:"qemu-kvm"}),",",e.jsx("code",{children:" libvirt"}),", ",e.jsx("code",{children:"virt-manager"})," e ",e.jsx("code",{children:"virtinst"}),e.jsx("strong",{children:" não existem"})," nos repositórios do Termux. Esqueça rodar VMs aceleradas no celular: o que dá para fazer é ",e.jsx("strong",{children:"proot-distro"})," (chroot-like, mesmo kernel) ou ",e.jsx("strong",{children:"QEMU em modo TCG"})," (emulação puramente em software, absurdamente lento — só serve para testes)."]}),e.jsxs("p",{children:["Esta página mostra as duas alternativas reais para “rodar outro sistema” dentro do Termux: ",e.jsx("strong",{children:"proot-distro"})," (Ubuntu, Debian, Arch, Alpine, Fedora etc. com userland próprio compartilhando o kernel do Android) e ",e.jsx("strong",{children:"QEMU TCG"}),"(emulação completa de uma arquitetura, sem aceleração de hardware)."]}),e.jsx("h2",{children:"1. proot-distro — distros Linux dentro do Termux"}),e.jsxs("p",{children:[e.jsx("code",{children:"proot-distro"})," instala o rootfs de uma distro e a executa via"," ",e.jsx("code",{children:"proot"})," (não precisa root). Você ganha ",e.jsx("code",{children:"apt"})," de verdade,",e.jsx("code",{children:" systemd"})," NÃO funciona, mas a maioria dos pacotes CLI roda."]}),e.jsx(r,{title:"Instalar e usar proot-distro",code:`# Instalar a ferramenta
pkg update && pkg install -y proot-distro

# Listar distros disponíveis
proot-distro list

# Instalar Ubuntu
proot-distro install ubuntu

# Entrar no Ubuntu
proot-distro login ubuntu

# Dentro do Ubuntu (você é root no rootfs):
apt update && apt install -y nginx python3-pip
exit

# Outras distros úteis
proot-distro install debian
proot-distro install archlinux
proot-distro install alpine
proot-distro install fedora

# Remover uma distro
proot-distro remove ubuntu

# Backup do rootfs
proot-distro backup ubuntu --output ~/storage/shared/ubuntu.tar.gz
proot-distro restore ~/storage/shared/ubuntu.tar.gz`}),e.jsxs(o,{type:"warning",title:"Limitações do proot-distro",children:["Não tem ",e.jsx("code",{children:"systemd"})," (use ",e.jsx("code",{children:"service"})," ou rode em foreground), não tem ",e.jsx("code",{children:"/dev/kvm"}),", não roda Docker nativo, e a performance fica em torno de",e.jsx("strong",{children:" 70–90%"})," do nativo por causa do ",e.jsx("code",{children:"proot"}),". Algumas syscalls do kernel Android podem retornar erros estranhos (ex: ",e.jsx("code",{children:"fork()"})," sob carga)."]}),e.jsx("h2",{children:"2. QEMU em modo TCG — emulação por software"}),e.jsxs("p",{children:["Se você precisa rodar uma arquitetura diferente (ex: testar um binário x86_64 num celular ARM64) e não dá para usar ",e.jsx("code",{children:"box64"}),", dá para instalar QEMU no Termux em ",e.jsx("strong",{children:"modo TCG"})," (sem aceleração). É lento — pense em ~5% da velocidade nativa — mas funciona para boots de teste."]}),e.jsx(r,{title:"QEMU TCG no Termux",code:`# Instalar QEMU (system emulators são pesados: ~200 MB)
pkg install -y qemu-system-x86-64-headless qemu-utils

# Criar disco virtual qcow2 de 10 GB
qemu-img create -f qcow2 alpine.qcow2 10G

# Baixar uma ISO leve (Alpine x86_64)
curl -LO https://dl-cdn.alpinelinux.org/alpine/v3.20/releases/x86_64/alpine-virt-3.20.0-x86_64.iso

# Bootar a ISO em modo TCG (sem -enable-kvm, sem -accel kvm)
qemu-system-x86_64 \\
  -m 512 \\
  -smp 2 \\
  -hda alpine.qcow2 \\
  -cdrom alpine-virt-3.20.0-x86_64.iso \\
  -boot d \\
  -nographic \\
  -accel tcg

# Sair do console serial: Ctrl-A depois X`}),e.jsxs(o,{type:"warning",title:"Performance",children:["TCG emula CPU instrução por instrução. Boot de Alpine que leva 10s num PC pode levar ",e.jsx("strong",{children:"5–10 minutos"})," no celular. Use só para testes pontuais (validar um script de boot, ver um kernel panic, etc)."]}),e.jsx("h2",{children:"3. Quando usar o quê?"}),e.jsx(r,{title:"Resumo prático",code:`# Quero apt/dnf/pacman e ferramentas Linux que não estão no Termux
→ proot-distro (90% dos casos)

# Quero rodar binário x86 num ARM
→ box64 / box86 (mais rápido que QEMU)

# Quero bootar uma ISO real, ver bootloader, kernel etc
→ qemu-system-* em modo TCG (lento, mas funciona)

# Quero rodar Windows / Wine
→ proot-distro + wine (instável) OU app Android Winlator

# Quero KVM/libvirt/virt-manager de verdade
→ Esqueça. Use um PC. O Android não expõe /dev/kvm.`}),e.jsx("h2",{children:"4. Bonus: Docker dentro do proot-distro"}),e.jsx(r,{title:"Docker em Ubuntu via proot (com caveats)",code:`proot-distro login ubuntu
apt update && apt install -y docker.io
# dockerd NÃO sobe sem cgroups corretos — você vai precisar de:
#   - Kernel Android com namespace user habilitado
#   - Truques com 'tini' / dockerd-rootless-setuptool.sh
#   - Aceitar que muitos containers vão quebrar
# Para a maioria dos casos use apenas 'podman' ou rode containers num servidor remoto via SSH.`}),e.jsx(o,{type:"info",title:"Alternativa recomendada",children:"Se o objetivo é “virtualizar para desenvolver”, considere usar o Termux apenas como cliente SSH para um servidor remoto (VPS, Raspberry Pi, PC de casa) onde KVM/Docker rodam de verdade. O celular vira terminal portátil, não hipervisor."})]})}export{l as default};

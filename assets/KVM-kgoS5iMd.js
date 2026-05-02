import{j as e}from"./index-d-w5ROEn.js";import{P as t}from"./PageContainer-t8f2nTRw.js";import{T as i,C as o,F as r}from"./Terminal-B39pZIiO.js";import{I as s}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function u(){return e.jsxs(t,{title:"KVM, QEMU e libvirt",subtitle:"Virtualização nativa do kernel Linux: provisione, gerencie e snapshote VMs com virsh, virt-install e virt-manager no Termux.",difficulty:"avancado",timeToRead:"55 min",category:"Containers",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"KVM (Kernel-based Virtual Machine)"})," é o módulo do kernel Linux que transforma o próprio kernel em um ",e.jsx("em",{children:"hipervisor tipo 1"}),", usando as instruções de virtualização do processador (Intel ",e.jsx("code",{children:"VT-x"}),", AMD ",e.jsx("code",{children:"AMD-V"}),"). Quem emula os dispositivos (disco, rede, USB) é o ",e.jsx("strong",{children:"QEMU"}),"; quem oferece uma API de alto nível para gerenciar tudo isso é a ",e.jsx("strong",{children:"libvirt"}),", com o seu cliente CLI ",e.jsx("code",{children:"virsh"})," e a GUI ",e.jsx("code",{children:"virt-manager"}),"."]}),e.jsx("h2",{children:"Pré-requisitos: a CPU suporta?"}),e.jsxs(i,{title:"wallyson@termux: ~",children:[e.jsx(o,{comment:"Conta quantos núcleos suportam virtualização (vmx=Intel, svm=AMD)",command:"egrep -c '(vmx|svm)' /proc/cpuinfo",output:"16"}),e.jsx(o,{comment:"Se for 0, ative VT-x/AMD-V no firmware (BIOS/UEFI)",command:"lscpu | grep -i virtual",output:`Virtualization:                       VT-x
Virtualization type:                  full`}),e.jsx(o,{comment:"Confere se o módulo KVM está carregado",command:"lsmod | grep kvm",output:`kvm_intel             450560  0
kvm                  1404928  1 kvm_intel
irqbypass              12288  1 kvm`}),e.jsx(o,{comment:"Ferramenta da Termux Project para checar tudo de uma vez (vem em cpu-checker)",command:"kvm-ok",output:`INFO: /dev/kvm exists
KVM acceleration can be used`})]}),e.jsxs(s,{type:"warning",title:"Sem aceleração?",children:["Se ",e.jsx("code",{children:"kvm-ok"})," reclamar de ",e.jsx("em",{children:"BIOS"}),", entre na UEFI e ative"," ",e.jsx("code",{children:"Intel Virtualization Technology"}),", ",e.jsx("code",{children:"VT-d"})," ou"," ",e.jsx("code",{children:"SVM Mode"}),". Em laptops Lenovo costuma estar em ",e.jsx("em",{children:"Security → Virtualization"}),"."]}),e.jsx("h2",{children:"Instalação da stack libvirt"}),e.jsxs(i,{children:[e.jsx(o,{root:!0,command:"pkg update && pkg install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager ovmf cpu-checker",output:`Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  bridge-utils cpu-checker libvirt-clients libvirt-daemon libvirt-daemon-config-network
  libvirt-daemon-driver-qemu libvirt-daemon-system libvirt0 libvirt-glib-1.0-0
  ovmf qemu-block-extra qemu-kvm qemu-system-common qemu-system-data qemu-system-gui
  qemu-system-x86 qemu-utils virtinst virt-manager
0 upgraded, 19 newly installed, 0 to remove and 0 not upgraded.
Need to get 84,2 MB of archives.
After this operation, 387 MB of additional disk space will be used.
...
Setting up libvirt-daemon-system (10.0.0-termux) ...
Created symlink /etc/systemd/system/multi-user.target.wants/libvirtd.service → /lib/systemd/system/libvirtd.service.
Created symlink /etc/systemd/system/sockets.target.wants/virtlockd.socket → /lib/systemd/system/virtlockd.socket.
adduser: O usuário 'libvirt-qemu' já existe.`}),e.jsx(o,{root:!0,comment:"Adiciona seu usuário aos grupos libvirt e kvm",command:"usermod -aG libvirt,kvm wallyson"}),e.jsx(o,{comment:"Faça logout/login. Confere ativando o grupo agora",command:"newgrp libvirt"}),e.jsx(o,{command:"systemctl is-active libvirtd",output:"active"}),e.jsx(o,{command:"virsh list --all",output:` Id   Nome   Estado
-----------------------`})]}),e.jsx("h2",{children:"Redes libvirt"}),e.jsxs("p",{children:["Por padrão, libvirt cria a rede ",e.jsx("code",{children:"default"})," (NAT em"," ",e.jsx("code",{children:"192.168.122.0/24"}),") com DHCP servido por ",e.jsx("code",{children:"dnsmasq"})," embutido. Para que VMs apareçam como IPs na sua LAN, monte uma ",e.jsx("strong",{children:"bridge"})," com Netplan e crie uma rede libvirt do tipo bridge."]}),e.jsxs(i,{children:[e.jsx(o,{command:"virsh net-list --all",output:` Nome      Estado   Início automático   Persistente
---------------------------------------------------------
 default   active   yes                  yes`}),e.jsx(o,{command:"virsh net-info default",output:`Nome:           default
UUID:           a1b2c3d4-e5f6-7890-abcd-ef0123456789
Ativo:          sim
Persistente:    sim
Início automático: sim
Bridge:         virbr0`}),e.jsx(o,{command:"ip -br addr show virbr0",output:"virbr0           UP             192.168.122.1/24"})]}),e.jsx("h3",{children:"Bridge real para LAN com Netplan"}),e.jsx(r,{path:"/etc/netplan/01-bridge.yaml",children:`network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: false
      dhcp6: false
  bridges:
    br0:
      interfaces: [enp3s0]
      dhcp4: true
      parameters:
        stp: false
        forward-delay: 0`}),e.jsx(r,{path:"bridge-libvirt.xml",children:`<network>
  <name>br0</name>
  <forward mode="bridge"/>
  <bridge name="br0"/>
</network>`}),e.jsxs(i,{children:[e.jsx(o,{root:!0,command:"netplan apply"}),e.jsx(o,{command:"virsh net-define bridge-libvirt.xml",output:"Rede br0 definida a partir de bridge-libvirt.xml"}),e.jsx(o,{command:"virsh net-start br0",output:"Rede br0 iniciada"}),e.jsx(o,{command:"virsh net-autostart br0",output:"A rede br0 marcada como inicializada automaticamente"})]}),e.jsx("h2",{children:"Pools de armazenamento"}),e.jsxs(i,{children:[e.jsx(o,{command:"virsh pool-list --all",output:` Nome        Estado   Início automático
---------------------------------------
 default     active   yes
 isos        active   yes`}),e.jsx(o,{command:"virsh pool-info default",output:`Nome:               default
UUID:               5e4f3d2c-1b0a-9f8e-7d6c-5b4a3f2e1d0c
Estado:             em execução
Persistente:        sim
Início automático:  sim
Capacidade:         931,51 GiB
Alocação:           421,38 GiB
Disponível:         510,12 GiB`}),e.jsx(o,{command:"ls -lh /var/lib/libvirt/images/",output:`total 24G
-rw-------  1 libvirt-qemu kvm  20G abr 12 15:01 termux-server.qcow2
-rw-------  1 libvirt-qemu kvm 4,1G abr 12 15:01 termux-server-snap1.qcow2`})]}),e.jsx("h2",{children:"Criando VMs com virt-install"}),e.jsxs("p",{children:[e.jsx("code",{children:"virt-install"})," é o jeito não-interativo de criar VMs. As flags abaixo cobrem 99% dos casos."]}),e.jsxs(i,{children:[e.jsx(o,{comment:"Baixa a ISO do Termux Server (em /var/lib/libvirt/isos/)",root:!0,command:"wget -P /var/lib/libvirt/isos https://releases.termux.dev/24.04/termux-24.04.1-live-server-amd64.iso",output:`--2025-04-12 15:10:01--  https://releases.termux.dev/24.04/termux-24.04.1-live-server-amd64.iso
Resolvendo releases.termux.dev (releases.termux.dev)... 185.125.190.40
Conectando-se a releases.termux.dev (releases.termux.dev)|185.125.190.40|:443... conectado.
A requisição HTTP foi enviada, aguardando resposta... 200 OK
Tamanho: 2715254784 (2,5G) [application/x-iso9660-image]
Salvando em: '/var/lib/libvirt/isos/termux-24.04.1-live-server-amd64.iso'

termux-24.04.1-live-server-amd64.iso       100%[==============================>]   2,53G  47,2MB/s    em 55s

2025-04-12 15:10:56 (47,2 MB/s) - '/var/lib/libvirt/isos/termux-24.04.1-live-server-amd64.iso' salvo`}),e.jsx(o,{command:`virt-install \\
  --name termux-noble \\
  --memory 4096 \\
  --vcpus 4 \\
  --cpu host-passthrough \\
  --disk size=40,format=qcow2,bus=virtio \\
  --cdrom /var/lib/libvirt/isos/termux-24.04.1-live-server-amd64.iso \\
  --os-variant termux.04 \\
  --network network=br0,model=virtio \\
  --graphics spice \\
  --boot uefi`,output:`Iniciando a instalação...
Alocando 'termux-noble.qcow2'                                         |  40 GB  00:00:01
Criando o domínio...                                                  |    0 B  00:00:00
Aguardando que a instalação seja concluída.`}),e.jsx(o,{comment:"Lista todas as variantes de SO conhecidas (aceita termux.04, debian12, fedora40, etc)",command:"virt-install --osinfo list | grep termux",output:`termux.04
termux.10`})]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Flag"}),e.jsx("th",{children:"Significado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--name"})}),e.jsx("td",{children:"Nome do domínio (VM)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--memory MB"})}),e.jsx("td",{children:"RAM"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--vcpus N"})}),e.jsx("td",{children:"vCPUs (sockets,cores,threads se preciso)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--cpu host-passthrough"})}),e.jsx("td",{children:"Repassa CPU real (melhor performance)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--disk path=...,size=,format=,bus="})}),e.jsx("td",{children:"Disco virtual (qcow2 + virtio)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--cdrom ISO"})}),e.jsx("td",{children:"Boot pelo ISO"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--location URL/ISO"})}),e.jsx("td",{children:"Para instalação por kernel/initrd direto"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--network"})}),e.jsx("td",{children:"bridge=br0 ou network=default,model=virtio"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--graphics"})}),e.jsx("td",{children:"spice (padrão), vnc, none"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--boot uefi"})}),e.jsx("td",{children:"Usa OVMF (UEFI) em vez de BIOS legacy"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--noautoconsole"})}),e.jsx("td",{children:"Não abre console; cria e libera o terminal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"--cloud-init user-data=..."})}),e.jsx("td",{children:"Injeta cloud-init"})]})]})]}),e.jsx("h2",{children:"virsh — gerenciando VMs"}),e.jsxs(i,{children:[e.jsx(o,{command:"virsh list --all",output:` Id   Nome           Estado
-------------------------------
 1    termux-noble   em execução
 -    debian-test    desligar`}),e.jsx(o,{command:"virsh start debian-test",output:"Domínio 'debian-test' iniciado"}),e.jsx(o,{command:"virsh shutdown debian-test",output:"Domínio 'debian-test' está sendo desligado"}),e.jsx(o,{comment:"Equivalente a puxar o cabo de força — corte instantâneo",command:"virsh destroy debian-test",output:"Domínio 'debian-test' destruído"}),e.jsx(o,{comment:"Remove a definição da VM (mantém o disco)",command:"virsh undefine debian-test --nvram",output:"Domínio 'debian-test' indefinido"}),e.jsx(o,{comment:"Anexa o console serial (sair: Ctrl-])",command:"virsh console termux-noble",output:`Conectado ao domínio termux-noble
Caractere de escape é ^] (Ctrl + ])

Termux 0.118 termux-noble ttyS0

termux-noble login: `}),e.jsx(o,{command:"virsh dominfo termux-noble",output:`Id:             1
Nome:           termux-noble
UUID:           7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a
Tipo de SO:     hvm
Estado:         em execução
CPU(s):         4
Tempo de CPU:   142,3s
Memória máxima: 4194304 KiB
Memória usada:  4194304 KiB
Persistente:    sim
Início automático: desabilitado
Domínio gerenciado: sim
Modelo de segurança: apparmor
DOI:            0
Rótulo de segurança: libvirt-7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a (enforcing)`}),e.jsx(o,{command:"virsh domifaddr termux-noble",output:` Nome     Endereço MAC         Protocolo   Endereço
-------------------------------------------------------------------------------
 vnet0    52:54:00:5b:8c:1f    ipv4        192.168.1.142/24`})]}),e.jsx("h3",{children:"Editar uma VM (XML)"}),e.jsxs(i,{children:[e.jsx(o,{comment:"Abre o XML no $EDITOR; valida e aplica ao salvar",command:"virsh edit termux-noble",output:"Domínio 'termux-noble' XML configuration edited."}),e.jsx(o,{command:"virsh dumpxml termux-noble | head -20",output:`<domain type='kvm'>
  <name>termux-noble</name>
  <uuid>7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a</uuid>
  <metadata>
    <libosinfo:libosinfo xmlns:libosinfo="http://libosinfo.org/xmlns/libvirt/domain/1.0">
      <libosinfo:os id="http://termux.dev/termux/24.04"/>
    </libosinfo:libosinfo>
  </metadata>
  <memory unit='KiB'>4194304</memory>
  <currentMemory unit='KiB'>4194304</currentMemory>
  <vcpu placement='static'>4</vcpu>
  <os firmware='efi'>
    <type arch='x86_64' machine='pc-q35-8.2'>hvm</type>
    <boot dev='hd'/>
  </os>
  <features>
    <acpi/>
    <apic/>
  </features>
  <cpu mode='host-passthrough' check='none' migratable='on'/>`})]}),e.jsx("h2",{children:"Snapshots"}),e.jsxs(i,{children:[e.jsx(o,{comment:"Snapshot interno (mais simples, qcow2 in-place)",command:"virsh snapshot-create-as --domain termux-noble --name pre-upgrade --description 'Antes do dist-upgrade'",output:"Captura de tela do domínio pre-upgrade criada"}),e.jsx(o,{command:"virsh snapshot-list termux-noble",output:` Nome          Hora de criação                Estado
--------------------------------------------------------
 pre-upgrade   2025-04-12 15:25:18 -0300      running`}),e.jsx(o,{command:"virsh snapshot-revert termux-noble pre-upgrade"}),e.jsx(o,{command:"virsh snapshot-delete termux-noble pre-upgrade",output:"Captura de tela do domínio pre-upgrade excluída"})]}),e.jsx("h2",{children:"Clones"}),e.jsxs(i,{children:[e.jsx(o,{comment:"VM origem precisa estar parada",command:"virsh shutdown termux-noble"}),e.jsx(o,{command:"virt-clone --original termux-noble --name termux-clone --auto-clone",output:`A alocação de 'termux-clone.qcow2'                                    |  40 GB  00:00:34

Clonagem feita com sucesso.`})]}),e.jsx("h2",{children:"Discos qcow2 — qemu-img"}),e.jsxs(i,{children:[e.jsx(o,{command:"qemu-img create -f qcow2 -o preallocation=metadata extra.qcow2 50G",output:"Formatting 'extra.qcow2', fmt=qcow2 cluster_size=65536 extended_l2=off preallocation=metadata compression_type=zlib size=53687091200 lazy_refcounts=off refcount_bits=16"}),e.jsx(o,{command:"qemu-img info termux-noble.qcow2",output:`image: termux-noble.qcow2
file format: qcow2
virtual size: 40 GiB (42949672960 bytes)
disk size: 12.4 GiB
cluster_size: 65536
Format specific information:
    compat: 1.1
    compression type: zlib
    lazy refcounts: false
    refcount bits: 16
    corrupt: false
    extended l2: false`}),e.jsx(o,{command:"qemu-img convert -O raw termux-noble.qcow2 termux-noble.raw"}),e.jsx(o,{command:"qemu-img resize termux-noble.qcow2 +10G",output:"Image resized."})]}),e.jsx("h2",{children:"virt-manager — GUI"}),e.jsxs("p",{children:["Para quem prefere interface gráfica, ",e.jsx("code",{children:"virt-manager"})," oferece tudo: criar VM, ver console SPICE, gerenciar redes/pools, snapshots, clones. Pode ser usado"," ",e.jsx("em",{children:"remotamente"})," via SSH adicionando uma conexão"," ",e.jsx("code",{children:"qemu+ssh://wallyson@servidor/system"}),"."]}),e.jsx(i,{children:e.jsx(o,{command:"virt-manager &"})}),e.jsxs(s,{type:"tip",title:"Performance: virtio é obrigatório",children:["Sempre use ",e.jsx("code",{children:"bus=virtio"})," em discos e ",e.jsx("code",{children:"model=virtio"})," em interfaces de rede. O driver virtio é paravirtualizado: sem emular hardware real, ganha 5–10× em IO e reduz uso de CPU. Em Windows convidado, baixe os"," ",e.jsx("em",{children:"VirtIO ISO drivers"})," da Fedora People."]}),e.jsx("h2",{children:"Cheat sheet virsh"}),e.jsxs(i,{children:[e.jsx(o,{command:"virsh list --all",comment:"Lista todas as VMs"}),e.jsx(o,{command:"virsh start NOME",comment:"Inicia"}),e.jsx(o,{command:"virsh shutdown NOME",comment:"Desliga gracefully"}),e.jsx(o,{command:"virsh reboot NOME",comment:"Reinicia"}),e.jsx(o,{command:"virsh destroy NOME",comment:"Força-desliga (kill)"}),e.jsx(o,{command:"virsh undefine NOME --nvram",comment:"Remove definição"}),e.jsx(o,{command:"virsh autostart NOME",comment:"Liga no boot do host"}),e.jsx(o,{command:"virsh suspend NOME",comment:"Pausa (RAM intacta)"}),e.jsx(o,{command:"virsh resume NOME",comment:"Continua"}),e.jsx(o,{command:"virsh save NOME arq",comment:"Hibernar para arquivo"}),e.jsx(o,{command:"virsh restore arq",comment:"Restaurar do arquivo"}),e.jsx(o,{command:"virsh console NOME",comment:"Console serial (Ctrl-] sai)"}),e.jsx(o,{command:"virsh edit NOME",comment:"Editar XML"}),e.jsx(o,{command:"virsh net-list --all",comment:"Listar redes"}),e.jsx(o,{command:"virsh pool-list --all",comment:"Listar pools"}),e.jsx(o,{command:"virsh snapshot-create-as NOME snap",comment:"Snapshot rápido"})]})]})}export{u as default};

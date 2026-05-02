import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function KVM() {
  return (
    <PageContainer
      title="KVM, QEMU e libvirt"
      subtitle="Virtualização nativa do kernel Linux: provisione, gerencie e snapshote VMs com virsh, virt-install e virt-manager no Termux."
      difficulty="avancado"
      timeToRead="55 min"
      category="Containers"
    >
      <p>
        <strong>KVM (Kernel-based Virtual Machine)</strong> é o módulo do kernel Linux que
        transforma o próprio kernel em um <em>hipervisor tipo 1</em>, usando as instruções de
        virtualização do processador (Intel <code>VT-x</code>, AMD <code>AMD-V</code>). Quem
        emula os dispositivos (disco, rede, USB) é o <strong>QEMU</strong>; quem oferece uma
        API de alto nível para gerenciar tudo isso é a <strong>libvirt</strong>, com o seu
        cliente CLI <code>virsh</code> e a GUI <code>virt-manager</code>.
      </p>

      <h2>Pré-requisitos: a CPU suporta?</h2>

      <Terminal title="wallyson@termux: ~">
        <Command
          comment="Conta quantos núcleos suportam virtualização (vmx=Intel, svm=AMD)"
          command="egrep -c '(vmx|svm)' /proc/cpuinfo"
          output={`16`}
        />
        <Command
          comment="Se for 0, ative VT-x/AMD-V no firmware (BIOS/UEFI)"
          command="lscpu | grep -i virtual"
          output={`Virtualization:                       VT-x
Virtualization type:                  full`}
        />
        <Command
          comment="Confere se o módulo KVM está carregado"
          command="lsmod | grep kvm"
          output={`kvm_intel             450560  0
kvm                  1404928  1 kvm_intel
irqbypass              12288  1 kvm`}
        />
        <Command
          comment="Ferramenta da Termux Project para checar tudo de uma vez (vem em cpu-checker)"
          command="kvm-ok"
          output={`INFO: /dev/kvm exists
KVM acceleration can be used`}
        />
      </Terminal>

      <InfoBox type="warning" title="Sem aceleração?">
        Se <code>kvm-ok</code> reclamar de <em>BIOS</em>, entre na UEFI e ative{" "}
        <code>Intel Virtualization Technology</code>, <code>VT-d</code> ou{" "}
        <code>SVM Mode</code>. Em laptops Lenovo costuma estar em <em>Security → Virtualization
        </em>.
      </InfoBox>

      <h2>Instalação da stack libvirt</h2>

      <Terminal>
        <Command
          root
          command="pkg update && pkg install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager ovmf cpu-checker"
          output={`Reading package lists... Done
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
adduser: O usuário 'libvirt-qemu' já existe.`}
        />
        <Command
          root
          comment="Adiciona seu usuário aos grupos libvirt e kvm"
          command="usermod -aG libvirt,kvm wallyson"
        />
        <Command
          comment="Faça logout/login. Confere ativando o grupo agora"
          command="newgrp libvirt"
        />
        <Command
          command="systemctl is-active libvirtd"
          output={`active`}
        />
        <Command
          command="virsh list --all"
          output={` Id   Nome   Estado
-----------------------`}
        />
      </Terminal>

      <h2>Redes libvirt</h2>

      <p>
        Por padrão, libvirt cria a rede <code>default</code> (NAT em{" "}
        <code>192.168.122.0/24</code>) com DHCP servido por <code>dnsmasq</code> embutido. Para
        que VMs apareçam como IPs na sua LAN, monte uma <strong>bridge</strong> com Netplan e
        crie uma rede libvirt do tipo bridge.
      </p>

      <Terminal>
        <Command
          command="virsh net-list --all"
          output={` Nome      Estado   Início automático   Persistente
---------------------------------------------------------
 default   active   yes                  yes`}
        />
        <Command
          command="virsh net-info default"
          output={`Nome:           default
UUID:           a1b2c3d4-e5f6-7890-abcd-ef0123456789
Ativo:          sim
Persistente:    sim
Início automático: sim
Bridge:         virbr0`}
        />
        <Command
          command="ip -br addr show virbr0"
          output={`virbr0           UP             192.168.122.1/24`}
        />
      </Terminal>

      <h3>Bridge real para LAN com Netplan</h3>

      <File path="/etc/netplan/01-bridge.yaml">
{`network:
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
        forward-delay: 0`}
      </File>

      <File path="bridge-libvirt.xml">
{`<network>
  <name>br0</name>
  <forward mode="bridge"/>
  <bridge name="br0"/>
</network>`}
      </File>

      <Terminal>
        <Command root command="netplan apply" />
        <Command command="virsh net-define bridge-libvirt.xml" output={`Rede br0 definida a partir de bridge-libvirt.xml`} />
        <Command command="virsh net-start br0" output={`Rede br0 iniciada`} />
        <Command command="virsh net-autostart br0" output={`A rede br0 marcada como inicializada automaticamente`} />
      </Terminal>

      <h2>Pools de armazenamento</h2>

      <Terminal>
        <Command
          command="virsh pool-list --all"
          output={` Nome        Estado   Início automático
---------------------------------------
 default     active   yes
 isos        active   yes`}
        />
        <Command
          command="virsh pool-info default"
          output={`Nome:               default
UUID:               5e4f3d2c-1b0a-9f8e-7d6c-5b4a3f2e1d0c
Estado:             em execução
Persistente:        sim
Início automático:  sim
Capacidade:         931,51 GiB
Alocação:           421,38 GiB
Disponível:         510,12 GiB`}
        />
        <Command
          command="ls -lh /var/lib/libvirt/images/"
          output={`total 24G
-rw-------  1 libvirt-qemu kvm  20G abr 12 15:01 termux-server.qcow2
-rw-------  1 libvirt-qemu kvm 4,1G abr 12 15:01 termux-server-snap1.qcow2`}
        />
      </Terminal>

      <h2>Criando VMs com virt-install</h2>

      <p>
        <code>virt-install</code> é o jeito não-interativo de criar VMs. As flags abaixo cobrem
        99% dos casos.
      </p>

      <Terminal>
        <Command
          comment="Baixa a ISO do Termux Server (em /var/lib/libvirt/isos/)"
          root
          command="wget -P /var/lib/libvirt/isos https://releases.termux.dev/24.04/termux-24.04.1-live-server-amd64.iso"
          output={`--2025-04-12 15:10:01--  https://releases.termux.dev/24.04/termux-24.04.1-live-server-amd64.iso
Resolvendo releases.termux.dev (releases.termux.dev)... 185.125.190.40
Conectando-se a releases.termux.dev (releases.termux.dev)|185.125.190.40|:443... conectado.
A requisição HTTP foi enviada, aguardando resposta... 200 OK
Tamanho: 2715254784 (2,5G) [application/x-iso9660-image]
Salvando em: '/var/lib/libvirt/isos/termux-24.04.1-live-server-amd64.iso'

termux-24.04.1-live-server-amd64.iso       100%[==============================>]   2,53G  47,2MB/s    em 55s

2025-04-12 15:10:56 (47,2 MB/s) - '/var/lib/libvirt/isos/termux-24.04.1-live-server-amd64.iso' salvo`}
        />

        <Command
          command={`virt-install \\
  --name termux-noble \\
  --memory 4096 \\
  --vcpus 4 \\
  --cpu host-passthrough \\
  --disk size=40,format=qcow2,bus=virtio \\
  --cdrom /var/lib/libvirt/isos/termux-24.04.1-live-server-amd64.iso \\
  --os-variant termux.04 \\
  --network network=br0,model=virtio \\
  --graphics spice \\
  --boot uefi`}
          output={`Iniciando a instalação...
Alocando 'termux-noble.qcow2'                                         |  40 GB  00:00:01
Criando o domínio...                                                  |    0 B  00:00:00
Aguardando que a instalação seja concluída.`}
        />

        <Command
          comment="Lista todas as variantes de SO conhecidas (aceita termux.04, debian12, fedora40, etc)"
          command="virt-install --osinfo list | grep termux"
          output={`termux.04
termux.10`}
        />
      </Terminal>

      <table>
        <thead><tr><th>Flag</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><code>--name</code></td><td>Nome do domínio (VM)</td></tr>
          <tr><td><code>--memory MB</code></td><td>RAM</td></tr>
          <tr><td><code>--vcpus N</code></td><td>vCPUs (sockets,cores,threads se preciso)</td></tr>
          <tr><td><code>--cpu host-passthrough</code></td><td>Repassa CPU real (melhor performance)</td></tr>
          <tr><td><code>--disk path=...,size=,format=,bus=</code></td><td>Disco virtual (qcow2 + virtio)</td></tr>
          <tr><td><code>--cdrom ISO</code></td><td>Boot pelo ISO</td></tr>
          <tr><td><code>--location URL/ISO</code></td><td>Para instalação por kernel/initrd direto</td></tr>
          <tr><td><code>--network</code></td><td>bridge=br0 ou network=default,model=virtio</td></tr>
          <tr><td><code>--graphics</code></td><td>spice (padrão), vnc, none</td></tr>
          <tr><td><code>--boot uefi</code></td><td>Usa OVMF (UEFI) em vez de BIOS legacy</td></tr>
          <tr><td><code>--noautoconsole</code></td><td>Não abre console; cria e libera o terminal</td></tr>
          <tr><td><code>--cloud-init user-data=...</code></td><td>Injeta cloud-init</td></tr>
        </tbody>
      </table>

      <h2>virsh — gerenciando VMs</h2>

      <Terminal>
        <Command
          command="virsh list --all"
          output={` Id   Nome           Estado
-------------------------------
 1    termux-noble   em execução
 -    debian-test    desligar`}
        />
        <Command command="virsh start debian-test" output={`Domínio 'debian-test' iniciado`} />
        <Command command="virsh shutdown debian-test" output={`Domínio 'debian-test' está sendo desligado`} />
        <Command
          comment="Equivalente a puxar o cabo de força — corte instantâneo"
          command="virsh destroy debian-test"
          output={`Domínio 'debian-test' destruído`}
        />
        <Command
          comment="Remove a definição da VM (mantém o disco)"
          command="virsh undefine debian-test --nvram"
          output={`Domínio 'debian-test' indefinido`}
        />
        <Command
          comment="Anexa o console serial (sair: Ctrl-])"
          command="virsh console termux-noble"
          output={`Conectado ao domínio termux-noble
Caractere de escape é ^] (Ctrl + ])

Termux 0.118 termux-noble ttyS0

termux-noble login: `}
        />
        <Command
          command="virsh dominfo termux-noble"
          output={`Id:             1
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
Rótulo de segurança: libvirt-7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a (enforcing)`}
        />
        <Command
          command="virsh domifaddr termux-noble"
          output={` Nome     Endereço MAC         Protocolo   Endereço
-------------------------------------------------------------------------------
 vnet0    52:54:00:5b:8c:1f    ipv4        192.168.1.142/24`}
        />
      </Terminal>

      <h3>Editar uma VM (XML)</h3>

      <Terminal>
        <Command
          comment="Abre o XML no $EDITOR; valida e aplica ao salvar"
          command="virsh edit termux-noble"
          output={`Domínio 'termux-noble' XML configuration edited.`}
        />
        <Command
          command="virsh dumpxml termux-noble | head -20"
          output={`<domain type='kvm'>
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
  <cpu mode='host-passthrough' check='none' migratable='on'/>`}
        />
      </Terminal>

      <h2>Snapshots</h2>

      <Terminal>
        <Command
          comment="Snapshot interno (mais simples, qcow2 in-place)"
          command="virsh snapshot-create-as --domain termux-noble --name pre-upgrade --description 'Antes do dist-upgrade'"
          output={`Captura de tela do domínio pre-upgrade criada`}
        />
        <Command
          command="virsh snapshot-list termux-noble"
          output={` Nome          Hora de criação                Estado
--------------------------------------------------------
 pre-upgrade   2025-04-12 15:25:18 -0300      running`}
        />
        <Command
          command="virsh snapshot-revert termux-noble pre-upgrade"
        />
        <Command
          command="virsh snapshot-delete termux-noble pre-upgrade"
          output={`Captura de tela do domínio pre-upgrade excluída`}
        />
      </Terminal>

      <h2>Clones</h2>

      <Terminal>
        <Command
          comment="VM origem precisa estar parada"
          command="virsh shutdown termux-noble"
        />
        <Command
          command="virt-clone --original termux-noble --name termux-clone --auto-clone"
          output={`A alocação de 'termux-clone.qcow2'                                    |  40 GB  00:00:34

Clonagem feita com sucesso.`}
        />
      </Terminal>

      <h2>Discos qcow2 — qemu-img</h2>

      <Terminal>
        <Command command="qemu-img create -f qcow2 -o preallocation=metadata extra.qcow2 50G" output={`Formatting 'extra.qcow2', fmt=qcow2 cluster_size=65536 extended_l2=off preallocation=metadata compression_type=zlib size=53687091200 lazy_refcounts=off refcount_bits=16`} />
        <Command command="qemu-img info termux-noble.qcow2" output={`image: termux-noble.qcow2
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
    extended l2: false`} />
        <Command command="qemu-img convert -O raw termux-noble.qcow2 termux-noble.raw" />
        <Command command="qemu-img resize termux-noble.qcow2 +10G" output={`Image resized.`} />
      </Terminal>

      <h2>virt-manager — GUI</h2>

      <p>
        Para quem prefere interface gráfica, <code>virt-manager</code> oferece tudo: criar VM,
        ver console SPICE, gerenciar redes/pools, snapshots, clones. Pode ser usado{" "}
        <em>remotamente</em> via SSH adicionando uma conexão{" "}
        <code>qemu+ssh://wallyson@servidor/system</code>.
      </p>

      <Terminal>
        <Command command="virt-manager &" />
      </Terminal>

      <InfoBox type="tip" title="Performance: virtio é obrigatório">
        Sempre use <code>bus=virtio</code> em discos e <code>model=virtio</code> em interfaces
        de rede. O driver virtio é paravirtualizado: sem emular hardware real, ganha 5–10× em
        IO e reduz uso de CPU. Em Windows convidado, baixe os{" "}
        <em>VirtIO ISO drivers</em> da Fedora People.
      </InfoBox>

      <h2>Cheat sheet virsh</h2>

      <Terminal>
        <Command command="virsh list --all" comment="Lista todas as VMs" />
        <Command command="virsh start NOME" comment="Inicia" />
        <Command command="virsh shutdown NOME" comment="Desliga gracefully" />
        <Command command="virsh reboot NOME" comment="Reinicia" />
        <Command command="virsh destroy NOME" comment="Força-desliga (kill)" />
        <Command command="virsh undefine NOME --nvram" comment="Remove definição" />
        <Command command="virsh autostart NOME" comment="Liga no boot do host" />
        <Command command="virsh suspend NOME" comment="Pausa (RAM intacta)" />
        <Command command="virsh resume NOME" comment="Continua" />
        <Command command="virsh save NOME arq" comment="Hibernar para arquivo" />
        <Command command="virsh restore arq" comment="Restaurar do arquivo" />
        <Command command="virsh console NOME" comment="Console serial (Ctrl-] sai)" />
        <Command command="virsh edit NOME" comment="Editar XML" />
        <Command command="virsh net-list --all" comment="Listar redes" />
        <Command command="virsh pool-list --all" comment="Listar pools" />
        <Command command="virsh snapshot-create-as NOME snap" comment="Snapshot rápido" />
      </Terminal>
    </PageContainer>
  );
}

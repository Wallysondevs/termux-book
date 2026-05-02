import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function LVM() {
  return (
    <PageContainer
      title="LVM no Android — por que não funciona e como o storage realmente é organizado"
      subtitle="LVM (pvcreate/vgcreate/lvcreate) não existe no Android. Entenda o layout real do storage do Android: /data, /sdcard, OBB e como o Termux acessa cada parte."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <AlertBox type="danger" title="LVM não funciona no Android">
        O <strong>LVM</strong> precisa criar e gerenciar partições em block devices
        (<code>/dev/sdX</code>, <code>/dev/nvmeXn1</code>) — coisa que <strong>não existe</strong>
        no Android sem root completo + reflash da partição <code>/data</code>. O pacote
        <code> lvm2</code> <strong>não está nos repositórios do Termux</strong>, e mesmo se
        você compilasse, comandos como <code>pvcreate</code>, <code>vgcreate</code>,
        <code> lvcreate</code> falhariam porque o storage interno é uma única partição
        formatada em F2FS/ext4 gerenciada pelo Android. Esqueça LVM no celular.
      </AlertBox>

      <h2>Como o storage realmente é organizado no Android</h2>
      <p>
        Android não expõe discos como Linux desktop. Em vez de <code>/dev/sda1</code>,
        <code> /dev/sda2</code> etc, você tem partições fixas definidas pelo fabricante e
        montadas pelo bootloader. As mais relevantes para quem usa Termux:
      </p>

      <CodeBlock
        title="Partições principais do Android"
        code={`/data        → partição de userdata. Onde ficam apps + Termux.
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
Android/obb/<package>      → "Opaque Binary Blobs" (assets de jogos)`}
      />

      <h2>Vendo o storage do Termux</h2>
      <CodeBlock
        title="Comandos que funcionam"
        code={`# Espaço total e usado das partições visíveis ao Termux
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
du -sh ~/storage/shared/`}
      />

      <h2>Por que não dá para criar “volumes lógicos” no Android</h2>
      <CodeBlock
        title="O que falta"
        code={`# Para LVM funcionar você precisaria:
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
#  - Loop devices em arquivos (proot-distro usa isso para o rootfs)`}
      />

      <h2>Equivalentes práticos no Termux</h2>
      <CodeBlock
        title="O que substitui LVM no dia a dia"
        code={`# "Quero juntar dois discos num pool"           → impossível sem root + reflash
# "Quero snapshot de um diretório"               → tar / rsync / btrfs (em proot-distro)
# "Quero redimensionar partição sem desmontar"   → não se aplica (storage é gerido pelo Android)
# "Quero migrar dados para outro storage"        → cp -a / rsync para ~/storage/shared/
# "Quero criptografar um volume"                 → gocryptfs / cryfs (rodam no Termux)

# Exemplo: criptografar uma pasta privada com gocryptfs
pkg install -y gocryptfs
mkdir -p ~/cripto-cifra ~/cripto-clara
gocryptfs -init ~/cripto-cifra
gocryptfs ~/cripto-cifra ~/cripto-clara`}
      />

      <AlertBox type="info" title="Resumo">
        No Android, storage é um recurso fechado gerenciado pelo SO. Use{" "}
        <code>termux-setup-storage</code> para ganhar acesso a <code>~/storage/shared</code>,
        e organize seus dados em diretórios — não em volumes lógicos. Para flexibilidade
        real (snapshots, pools, criptografia em nível de volume) use um servidor Linux
        remoto e acesse via SSH a partir do Termux.
      </AlertBox>
    </PageContainer>
  );
}

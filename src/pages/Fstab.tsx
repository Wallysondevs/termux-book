import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Fstab() {
  return (
    <PageContainer
      title="Montagem de Storage no Android — não há /etc/fstab editável"
      subtitle="Como o Android monta /data, /sdcard e cartões SD automaticamente, e como o Termux acessa o storage compartilhado via termux-setup-storage."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <AlertBox type="warning" title="Não existe /etc/fstab editável no Android">
        Em distros Linux desktop, <code>/etc/fstab</code> define o que montar no boot. No
        Android <strong>quem decide o que montar é o init/vold</strong> (códigos do próprio
        sistema operacional), a partir de partições fixas definidas no firmware. Não há
        <code> /etc/fstab</code> que o Termux possa editar para “montar mais um disco”.
        Tudo o que existe em <code>$PREFIX/etc/</code> serve para o Termux, não para o
        kernel do Android. Para o Termux <em>enxergar</em> o storage compartilhado existe
        um único comando: <code>termux-setup-storage</code>.
      </AlertBox>

      <h2>1. termux-setup-storage — a única coisa que você roda</h2>
      <CodeBlock
        title="Conceder acesso ao storage compartilhado"
        code={`# Roda uma vez (mostra o popup do Android pedindo permissão)
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
cp arquivo.txt ~/storage/shared/Documents/`}
      />

      <h2>2. Ver o que está montado (read-only para você)</h2>
      <CodeBlock
        title="mount, df e findmnt"
        code={`# Lista tudo que o kernel Android montou — informativo, NÃO se edita
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
df -h ~/storage/shared/`}
      />

      <AlertBox type="warning" title="Por que você NÃO pode editar isso">
        <ul>
          <li>
            <code>mount</code> e <code>umount</code> exigem capability{" "}
            <code>CAP_SYS_ADMIN</code> — bloqueada no Termux por padrão.
          </li>
          <li>
            O kernel do Android usa SELinux <em>enforcing</em>: mesmo com root convencional,
            tentar remontar <code>/system</code> ou <code>/data</code> com opções diferentes
            quase sempre falha.
          </li>
          <li>
            Não existe arquivo de texto que sobreviva ao reboot e altere a tabela de
            montagem. Tudo é gerado pelo init a partir do firmware.
          </li>
        </ul>
      </AlertBox>

      <h2>3. Cartão SD — quando aparece e quando não</h2>
      <CodeBlock
        title="Acessar SD a partir do Termux"
        code={`# Após termux-setup-storage, se houver SD físico:
ls ~/storage/external-1/
# Esse caminho é /storage/XXXX-XXXX/Android/data/com.termux/files
# É a única pasta do SD onde o Termux pode escrever sem root,
# por causa do Scoped Storage (Android 11+).

# Tentar escrever fora dela falha com 'Permission denied':
echo teste > /storage/XXXX-XXXX/qualquer.txt   # ❌ EACCES

# Ler outras pastas do SD pode até funcionar para mídia,
# mas escrever só dá em ~/storage/external-1/.`}
      />

      <h2>4. Montar um “volume” lógico do seu jeito (workarounds)</h2>
      <CodeBlock
        title="Soluções que funcionam sem root"
        code={`# Criptografar uma pasta privada (parece um volume montado)
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

# Para imagens/ISOs use proot-distro (faz "mount" lógico do rootfs).`}
      />

      <h2>5. Resumo: o equivalente “Termux” do fstab</h2>
      <CodeBlock
        title="Cheatsheet"
        code={`Distro Linux                    | Termux / Android
--------------------------------|----------------------------------------
editar /etc/fstab               | rodar termux-setup-storage (uma vez)
mount /dev/sdb1 /mnt/dados      | usar ~/storage/shared (já montado)
mount -o loop arq.iso /mnt/iso  | proot-distro / archivemount
mount -t cifs //srv/share ...   | sshfs usuario@srv:/path ~/srv
swapon /swapfile                | não há swap configurável (kernel decide)
fsck /dev/sdb1                  | não acessível (block device protegido)`}
      />

      <AlertBox type="info" title="Em uma frase">
        No Android, storage é “monte automático e ponto”. O Termux participa via{" "}
        <code>termux-setup-storage</code> e via FUSE (<code>sshfs</code>,{" "}
        <code>gocryptfs</code>). Editar fstab não é uma opção — nem é necessário.
      </AlertBox>
    </PageContainer>
  );
}

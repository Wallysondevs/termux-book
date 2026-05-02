import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Particoes() {
  return (
    <PageContainer
      title="Storage do Android e o Termux"
      subtitle="Entenda /data, /sdcard, scoped storage, OBB e como o Termux acessa o armazenamento compartilhado via termux-setup-storage."
      difficulty="iniciante"
      timeToRead="15 min"
    >
      <AlertBox type="danger" title="NÃO use fdisk/parted/gparted no Android — risco de brick">
        O esquema de partições do Android é controlado pelo bootloader e por
        partições críticas como <code>boot</code>, <code>system</code>,{" "}
        <code>vendor</code>, <code>vbmeta</code>, <code>userdata</code>. Mexer
        com <code>fdisk</code>, <code>parted</code> ou <code>gparted</code> no
        bloco do celular pode <strong>brickar o aparelho permanentemente</strong>
        . Sem root o Termux nem te deixa fazer isso (os blocos são read-only) —
        e mesmo com root, <strong>não faça</strong>. Este capítulo é sobre
        entender o storage existente, não sobre alterá-lo.
      </AlertBox>

      <p>
        Em vez de gerenciar partições, no Android você lida com{" "}
        <strong>áreas lógicas de storage</strong> definidas pelo sistema:
        armazenamento interno do app, armazenamento compartilhado (a "memória"
        do usuário) e cartão SD opcional. O Termux precisa de uma permissão
        explícita para ler/escrever fora da própria área.
      </p>

      <h2>1. As "partições" lógicas que você verá</h2>
      <CodeBlock
        title="Áreas de storage do Android"
        code={`# === ÁREA PRIVADA DO TERMUX (sandbox do app) ===
# Caminho real:  /data/data/com.termux/files
# Atalho ($HOME): /data/data/com.termux/files/home
# $PREFIX:        /data/data/com.termux/files/usr
# - Só o Termux acessa
# - Não exige permissão extra
# - Apagado se você desinstalar o Termux
echo $HOME
echo $PREFIX

# === STORAGE COMPARTILHADO ("memória interna" do usuário) ===
# Caminho:  /sdcard  (link para /storage/emulated/0)
# Mesmo lugar onde ficam Downloads, Pictures, DCIM, etc.
# Acessível por outros apps e pelo cabo USB.
# REQUER permissão concedida via 'termux-setup-storage'.

# === CARTÃO SD EXTERNO (se houver) ===
# Caminho típico:  /storage/XXXX-XXXX  (UUID do cartão)
# Em Android moderno, escrita restrita a diretórios do próprio app.

# === ARMAZENAMENTO INTERNO DO APARELHO (sistema) ===
# /system, /vendor, /product → read-only, ROM do Android
# /data                      → dados de todos os apps (acesso só com root)
# Esses NÃO são para você mexer.

# Ver montagens visíveis ao Termux
mount | head -20
df -h`}
      />

      <h2>2. termux-setup-storage</h2>
      <CodeBlock
        title="Habilitar acesso ao /sdcard"
        code={`# Roda uma vez para criar links em ~/storage/ apontando
# para as pastas padrão do Android.
termux-setup-storage
# Isso dispara o popup do Android pedindo permissão.
# Depois de aceitar, você terá:

ls ~/storage
# downloads/    -> /sdcard/Download
# dcim/         -> /sdcard/DCIM
# pictures/     -> /sdcard/Pictures
# music/        -> /sdcard/Music
# movies/       -> /sdcard/Movies
# shared/       -> /sdcard
# external-1/   -> cartão SD (se houver)

# Exemplo: copiar um arquivo do Termux para Downloads
cp ~/relatorio.pdf ~/storage/downloads/

# Listar Downloads
ls ~/storage/downloads/`}
      />

      <h2>3. Tipos de Storage do Android (informativo)</h2>
      <CodeBlock
        title="Conceitos para você não se perder"
        code={`# Internal Storage (do app)
#  → privada, sandbox, sem permissão extra
#  → no Termux: $HOME e $PREFIX

# Shared Storage (a "memória do celular")
#  → /sdcard, visível ao usuário e a outros apps
#  → acesso pelo Termux só após termux-setup-storage

# Scoped Storage (Android 10+)
#  → restrição: cada app só vê o que criou (em pastas como
#    Android/data/<package>/) ou usa MediaStore para fotos/áudio.
#  → o Termux ainda consegue ler/escrever em /sdcard graças à
#    permissão MANAGE_EXTERNAL_STORAGE.

# OBB (Opaque Binary Blob)
#  → /sdcard/Android/obb/<package>/, dados grandes de apps/jogos.

# External Storage (cartão SD)
#  → mount em /storage/<uuid>; em Android moderno, escrita
#    livre só dentro de /storage/<uuid>/Android/data/<seu-app>/.

# RESUMO PRÁTICO no Termux:
# - Para guardar configs/scripts: $HOME (~)
# - Para compartilhar com outros apps: ~/storage/shared (= /sdcard)
# - Para fotos: ~/storage/dcim, ~/storage/pictures`}
      />

      <h2>4. Sistemas de arquivos por baixo (informativo)</h2>
      <CodeBlock
        title="O que está montado e como"
        code={`# Ver tudo o que está montado
mount

# Tipos comuns que você vai encontrar no Android:
# ext4   → /data, /system (em ROMs antigas)
# f2fs   → muito comum em /data de celulares modernos (otimizado para flash)
# erofs  → read-only, /system e /vendor em Android 10+
# tmpfs  → /dev, /run, etc.
# fuse   → /sdcard (sdcardfs/FUSE expõe /data/media como /sdcard)
# proc, sysfs, cgroup → pseudo-filesystems do kernel

# Você pode ver com:
df -hT 2>/dev/null
cat /proc/mounts | head -20

# NADA disso você formata, redimensiona ou recria pelo Termux.
# Tudo é gerenciado pelo Android.`}
      />

      <h2>5. Espaço em disco e limpeza</h2>
      <CodeBlock
        title="Liberar espaço no Termux"
        code={`# Quanto o Termux ocupa
du -sh $PREFIX
du -sh $HOME

# Maiores diretórios em $HOME
du -sh ~/* 2>/dev/null | sort -rh | head -10

# Cache do gerenciador de pacotes
pkg clean
# Remove .deb baixados em $PREFIX/var/cache/apt/archives

# Limpar pacotes não usados
pkg autoclean

# Espaço livre da partição /data (a do Termux)
df -h $PREFIX

# Espaço livre do storage compartilhado
df -h /sdcard 2>/dev/null`}
      />

      <h2>Troubleshooting</h2>
      <CodeBlock
        title="Problemas comuns de storage"
        code={`# 'Permission denied' ao escrever em /sdcard
# → Rode 'termux-setup-storage' e aceite o popup.
# → Em Android 11+, talvez precise dar "Acesso a todos os
#   arquivos" manualmente em Configurações → Apps → Termux →
#   Permissões → Arquivos e mídia → Permitir gerenciar todos.

# /sdcard sumiu / link quebrado
ls -la ~/storage
# Recrie:
rm -rf ~/storage
termux-setup-storage

# 'No space left on device' ao instalar pacote
df -h $PREFIX
pkg clean
pkg autoclean
# Apague caches/projetos grandes em ~/

# Não vejo o cartão SD em ~/storage/external-1
# → Em Android moderno, o Termux só enxerga /storage/<uuid>/
#   Android/data/com.termux/. Para o cartão "todo" você precisa
#   de root ou de um app gerenciador de arquivos do Android.

# 'fdisk: cannot open /dev/block/...': Permission denied
# → CORRETO. Não tente. Você não particiona Android pelo Termux.`}
      />

      <AlertBox type="info" title="Backup é o substituto do 'particionar'">
        Como você não cria partições, a estratégia de backup no Termux é
        diferente: copie <code>$HOME</code> e (se quiser) <code>$PREFIX</code>{" "}
        com <code>tar</code>/<code>rsync</code> para <code>~/storage/shared</code>{" "}
        e de lá envie para nuvem/PC. Veja o capítulo de Backup para o passo a
        passo.
      </AlertBox>
    </PageContainer>
  );
}

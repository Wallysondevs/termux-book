import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Compressao() {
    return (
      <PageContainer
        title="Compressão e Arquivamento"
        subtitle="Guia completo de compressão no Ubuntu: tar, gzip, bzip2, xz, zip, 7z, zstd — criar, extrair, listar e comparar formatos."
        difficulty="iniciante"
        timeToRead="20 min"
      >
        <p>
          A <strong>compressão</strong> reduz o tamanho de arquivos para economizar espaço
          e transferir mais rápido. No Linux, é comum separar <strong>arquivamento</strong>
          (juntar vários arquivos em um — <code>tar</code>) da <strong>compressão</strong>
          (reduzir tamanho — <code>gzip</code>, <code>xz</code>), mas o <code>tar</code>
          pode fazer ambos em um comando.
        </p>

        <h2>1. tar (Tape Archive)</h2>
        <CodeBlock
          title="O canivete suíço do arquivamento"
          code={`# tar combina múltiplos arquivos em um (.tar)
  # e pode comprimir com gzip, bzip2 ou xz

  # === CRIAR ARQUIVOS ===
  # tar.gz (gzip — mais comum, rápido)
  tar czf backup.tar.gz pasta/
  tar czf backup.tar.gz arquivo1 arquivo2 pasta/

  # tar.bz2 (bzip2 — melhor compressão, mais lento)
  tar cjf backup.tar.bz2 pasta/

  # tar.xz (xz — melhor compressão, mais lento ainda)
  tar cJf backup.tar.xz pasta/

  # tar.zst (zstd — rápido E boa compressão, moderno)
  tar --zstd -cf backup.tar.zst pasta/

  # Flags essenciais:
  # c = create (criar)
  # x = extract (extrair)
  # t = list (listar conteúdo)
  # z = gzip
  # j = bzip2
  # J = xz
  # f = file (nome do arquivo, sempre por último!)
  # v = verbose (mostrar progresso)

  # === EXTRAIR ===
  tar xzf backup.tar.gz                    # Extrair no diretório atual
  tar xzf backup.tar.gz -C /destino/       # Extrair em diretório específico
  tar xjf backup.tar.bz2
  tar xJf backup.tar.xz

  # Extrair arquivo específico
  tar xzf backup.tar.gz pasta/arquivo.txt

  # === LISTAR CONTEÚDO (sem extrair) ===
  tar tzf backup.tar.gz
  tar tjf backup.tar.bz2
  tar tJf backup.tar.xz

  # === EXCLUIR ARQUIVOS ===
  tar czf backup.tar.gz pasta/ --exclude="*.log" --exclude="node_modules"
  tar czf backup.tar.gz pasta/ --exclude-from=exclusoes.txt

  # === COM PROGRESSO ===
  tar czf backup.tar.gz pasta/ -v          # Lista cada arquivo
  # Com barra de progresso:
  tar cf - pasta/ | pv | gzip > backup.tar.gz`}
        />

        <h2>2. gzip, bzip2, xz</h2>
        <CodeBlock
          title="Comprimir arquivos individuais"
          code={`# gzip (rápido, compressão boa)
  gzip arquivo.txt           # Cria arquivo.txt.gz (remove original)
  gzip -k arquivo.txt        # Manter original (-k = keep)
  gzip -9 arquivo.txt        # Máxima compressão (1-9)
  gunzip arquivo.txt.gz      # Descomprimir
  zcat arquivo.txt.gz        # Ver conteúdo sem descomprimir

  # bzip2 (mais lento, melhor compressão)
  bzip2 arquivo.txt
  bzip2 -k arquivo.txt
  bunzip2 arquivo.txt.bz2
  bzcat arquivo.txt.bz2

  # xz (mais lento, melhor compressão de todos)
  xz arquivo.txt
  xz -k arquivo.txt
  xz -9 arquivo.txt          # Máxima compressão
  unxz arquivo.txt.xz
  xzcat arquivo.txt.xz

  # zstd (Zstandard — rápido E boa compressão)
  sudo apt install -y zstd
  zstd arquivo.txt
  zstd -k arquivo.txt
  zstd -19 arquivo.txt       # Máxima (1-19)
  unzstd arquivo.txt.zst
  zstdcat arquivo.txt.zst

  # Comparação (arquivo de 100MB):
  # gzip:  ~35MB, 2s
  # bzip2: ~30MB, 8s
  # xz:    ~25MB, 30s
  # zstd:  ~32MB, 0.5s ← mais rápido!`}
        />

        <h2>3. zip e 7z</h2>
        <CodeBlock
          title="Formatos compatíveis com Windows"
          code={`# === ZIP (universal, compatível com Windows) ===
  sudo apt install -y zip unzip

  # Criar
  zip arquivo.zip arquivo.txt
  zip -r backup.zip pasta/         # Recursivo (diretórios)
  zip -r backup.zip pasta/ -x "*.log"  # Excluir padrão
  zip -e secreto.zip arquivo.txt   # Com senha

  # Extrair
  unzip backup.zip
  unzip backup.zip -d /destino/    # Em diretório específico
  unzip -l backup.zip              # Listar conteúdo
  unzip -o backup.zip              # Sobrescrever sem perguntar

  # === 7-Zip (melhor compressão) ===
  sudo apt install -y p7zip-full

  # Criar
  7z a backup.7z pasta/
  7z a -p backup.7z pasta/         # Com senha
  7z a -mx=9 backup.7z pasta/     # Máxima compressão

  # Extrair
  7z x backup.7z
  7z x backup.7z -o/destino/

  # Listar
  7z l backup.7z

  # === RAR (proprietário) ===
  sudo apt install -y unrar
  unrar x arquivo.rar              # Extrair
  unrar l arquivo.rar              # Listar`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com compressão"
          code={`# "tar: Removing leading '/' from member names"
  # Normal! tar remove o / para segurança (caminhos relativos)
  # Para manter caminhos absolutos (não recomendado):
  tar czf backup.tar.gz -P /caminho/absoluto

  # Arquivo corrompido
  # Verificar integridade:
  gzip -t arquivo.gz          # Testar gzip
  tar tzf arquivo.tar.gz      # Testar tar.gz
  7z t arquivo.7z             # Testar 7z
  zip -T arquivo.zip          # Testar zip

  # Arquivo muito grande para zip (>4GB)
  # Use tar.gz, tar.xz ou 7z

  # Dividir arquivo grande
  split -b 1G backup.tar.gz backup.tar.gz.part-
  # Juntar:
  cat backup.tar.gz.part-* > backup.tar.gz

  # Compressão não reduz tamanho (arquivos já comprimidos)
  # Vídeos, imagens e ZIPs já estão comprimidos
  # tar sem compressão é melhor para agrupar esses arquivos:
  tar cf backup.tar pasta-de-videos/`}
        />

        <AlertBox type="info" title="Qual formato usar?">
          <strong>tar.gz</strong> — padrão Linux, rápido, bom para backups.
          <strong>tar.xz</strong> — quando tamanho importa mais que velocidade.
          <strong>tar.zst</strong> — melhor de dois mundos (rápido + bom ratio).
          <strong>zip</strong> — quando precisa compartilhar com Windows.
          <strong>7z</strong> — melhor compressão absoluta.
        </AlertBox>
      </PageContainer>
    );
  }
import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ExpansoesBash() {
    return (
      <PageContainer
        title="Expansões do Bash"
        subtitle="Guia completo de expansões do shell Bash: variáveis, chaves, til, aritmética, command substitution, globbing e manipulação de strings."
        difficulty="intermediario"
        timeToRead="25 min"
      >
        <p>
          As <strong>expansões do Bash</strong> são mecanismos que transformam o texto que você
          digita antes de o comando ser executado. Dominar as expansões permite escrever comandos
          mais curtos, poderosos e elegantes — desde renomear dezenas de arquivos em uma linha
          até fazer cálculos e manipular strings diretamente no terminal.
        </p>

        <h2>1. Expansão de Chaves (Brace Expansion)</h2>
        <CodeBlock
          title="Gerar sequências e combinações com {}"
          code={`# Expansão de listas
  echo {a,b,c}
  # Saída: a b c

  echo arquivo.{txt,pdf,csv}
  # Saída: arquivo.txt arquivo.pdf arquivo.csv

  # Criar múltiplos arquivos de uma vez
  touch arquivo{1,2,3,4,5}.txt
  # Cria: arquivo1.txt arquivo2.txt arquivo3.txt arquivo4.txt arquivo5.txt

  # Criar estrutura de diretórios
  mkdir -p projeto/{src,tests,docs,config}
  # Cria: projeto/src, projeto/tests, projeto/docs, projeto/config

  # Expansão de sequência (ranges)
  echo {1..10}
  # Saída: 1 2 3 4 5 6 7 8 9 10

  echo {a..z}
  # Saída: a b c d ... x y z

  echo {A..Z}
  # Saída: A B C D ... X Y Z

  echo {01..12}
  # Saída: 01 02 03 04 05 06 07 08 09 10 11 12 (com zero à esquerda!)

  # Sequência com passo
  echo {0..100..10}
  # Saída: 0 10 20 30 40 50 60 70 80 90 100

  echo {a..z..2}
  # Saída: a c e g i k m o q s u w y

  # Combinações aninhadas
  echo {A,B}{1,2,3}
  # Saída: A1 A2 A3 B1 B2 B3

  # Usos práticos:
  # Backup de arquivo
  cp config.yaml{,.bak}
  # Equivale a: cp config.yaml config.yaml.bak

  # Renomear extensão
  mv arquivo.{txt,md}
  # Equivale a: mv arquivo.txt arquivo.md

  # Criar meses do ano
  mkdir {01..12}-2024`}
        />

        <h2>2. Expansão de Variáveis</h2>
        <CodeBlock
          title="Manipulação avançada de variáveis"
          code={`# Expansão básica
  nome="João"
  echo $nome          # João
  echo \${nome}        # João (forma segura com delimitador)

  # Valor padrão (se variável não existir)
  echo \${EDITOR:-vim}           # Usa "vim" se EDITOR não estiver definida
  echo \${DB_PORT:-5432}         # Usa "5432" se DB_PORT não existir

  # Atribuir valor padrão
  echo \${EDITOR:=vim}           # Define EDITOR como "vim" se não existir

  # Erro se variável não existir
  \${API_KEY:?Erro: API_KEY não definida}

  # Comprimento da string
  texto="Ubuntu Linux"
  echo \${#texto}                # 12

  # Substring
  echo \${texto:0:6}             # Ubuntu (posição 0, 6 caracteres)
  echo \${texto:7}               # Linux (da posição 7 até o final)
  echo \${texto: -5}             # Linux (últimos 5, note o espaço!)

  # Substituição de padrão
  arquivo="foto.jpg"
  echo \${arquivo/.jpg/.png}     # foto.png (substitui primeira ocorrência)
  echo \${arquivo//./_}          # Substitui TODAS as ocorrências

  # Remoção de prefixo
  caminho="/home/user/documentos/arquivo.txt"
  echo \${caminho##*/}           # arquivo.txt (remove tudo até último /)
  echo \${caminho#*/}            # home/user/documentos/arquivo.txt (remove até primeiro /)

  # Remoção de sufixo
  echo \${caminho%/*}            # /home/user/documentos (remove a partir do último /)
  echo \${caminho%%/*}           # (vazio - remove a partir do primeiro /)
  echo \${arquivo%.*}            # foto (remove extensão)
  echo \${arquivo##*.}           # jpg (pega apenas a extensão)

  # Maiúsculas e minúsculas
  texto="hello world"
  echo \${texto^}                # Hello world (primeira letra maiúscula)
  echo \${texto^^}               # HELLO WORLD (tudo maiúscula)
  texto="HELLO"
  echo \${texto,}                # hELLO (primeira letra minúscula)
  echo \${texto,,}               # hello (tudo minúscula)`}
        />

        <h2>3. Command Substitution</h2>
        <CodeBlock
          title="Usar saída de comandos como valores"
          code={`# Sintaxe: $(comando) ou \`comando\`
  # $(comando) é preferível (mais legível e aninhável)

  # Data em nome de arquivo
  backup="backup-$(date +%Y%m%d).tar.gz"
  echo $backup
  # Saída: backup-20240715.tar.gz

  # Contar arquivos
  echo "Existem $(ls | wc -l) arquivos neste diretório"

  # Usar em variáveis
  IP=$(hostname -I | awk '{print $1}')
  echo "Meu IP: $IP"

  # Aninhar substituições
  echo "Kernel: $(uname -r) em $(hostname)"

  # Usar em condições
  if [ $(whoami) = "root" ]; then
    echo "Você é root!"
  fi

  # Usar em loops
  for user in $(cut -d: -f1 /etc/passwd | head -5); do
    echo "Usuário: $user"
  done

  # Process substitution <() — tratar saída como arquivo
  diff <(ls dir1) <(ls dir2)
  # Compara o conteúdo de dois diretórios

  # Aritimética com $(())
  echo $((2 + 3))       # 5
  echo $((10 * 5))      # 50
  echo $((100 / 3))     # 33 (inteiro)
  echo $((2 ** 10))     # 1024 (potência)
  echo $((15 % 4))      # 3 (módulo)

  # Incremento
  i=0
  echo $((i++))         # 0 (retorna e incrementa)
  echo $((++i))         # 2 (incrementa e retorna)`}
        />

        <h2>4. Globbing (Expansão de Nomes de Arquivo)</h2>
        <CodeBlock
          title="Padrões para selecionar arquivos"
          code={`# * = qualquer sequência de caracteres (exceto /)
  ls *.txt              # Todos os .txt
  ls foto*              # Tudo que começa com "foto"
  ls *.{jpg,png,gif}    # Todos os JPG, PNG e GIF

  # ? = exatamente um caractere
  ls arquivo?.txt       # arquivo1.txt, arquivoA.txt, etc.
  ls ???.txt            # Nomes de 3 letras com extensão .txt

  # [] = um caractere do conjunto
  ls arquivo[123].txt   # arquivo1.txt, arquivo2.txt, arquivo3.txt
  ls arquivo[a-z].txt   # arquivoa.txt até arquivoz.txt
  ls arquivo[!0-9].txt  # NÃO numérico (! = negação)
  ls [A-Z]*.txt         # Começam com maiúscula

  # Globbing estendido (habilitar com shopt -s extglob)
  shopt -s extglob

  # ?(padrão) = 0 ou 1 ocorrência
  ls ?(foto)*.jpg       # Arquivos que opcionalmente começam com "foto"

  # *(padrão) = 0 ou mais
  ls *(teste).txt       # teste.txt, testeteste.txt, etc.

  # +(padrão) = 1 ou mais
  ls +(foto).jpg        # foto.jpg, fotofoto.jpg, etc.

  # @(padrão) = exatamente 1
  ls @(foto|imagem).jpg # foto.jpg OU imagem.jpg

  # !(padrão) = tudo exceto
  ls !(*.txt)           # Todos os arquivos que NÃO são .txt
  rm !(importante.*)    # Remove tudo EXCETO arquivos "importante.*"

  # globstar (** = recursivo)
  shopt -s globstar
  ls **/*.py            # Todos os .py em qualquer subdiretório
  ls **/*.{js,ts}       # Todos os JS e TS recursivamente`}
        />

        <h2>5. Expansão do Til (~)</h2>
        <CodeBlock
          title="Atalhos com ~"
          code={`# ~ = diretório home do usuário atual
  echo ~
  # Saída: /home/usuario

  cd ~                  # Ir para home
  ls ~/documentos       # Listar documentos no home

  # ~usuario = home de outro usuário
  echo ~root            # /root
  echo ~www-data        # /var/www

  # ~+ = diretório atual (equivale a $PWD)
  echo ~+

  # ~- = diretório anterior (equivale a $OLDPWD)
  echo ~-
  cd ~-                 # Voltar ao diretório anterior (mesmo que cd -)`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com expansões"
          code={`# Expansão não funciona dentro de aspas simples
  echo '$HOME'          # Saída literal: $HOME
  echo "$HOME"          # Saída expandida: /home/usuario
  # Regra: aspas simples = literal, aspas duplas = expande variáveis

  # Glob não encontra arquivos (retorna o padrão literal)
  ls *.xyz              # Se não houver .xyz, mostra erro
  # Solução: usar nullglob
  shopt -s nullglob     # Padrão sem match retorna vazio
  shopt -s failglob     # Padrão sem match retorna erro

  # Espaços em nomes de arquivo
  # ERRADO: for f in $(ls); do   ← quebra em espaços
  # CERTO:
  for f in *; do echo "$f"; done
  # Sempre use aspas duplas ao redor de variáveis!

  # Prevenir expansão (escapar)
  echo \$HOME            # Saída: $HOME
  echo \\*               # Saída: * (literal)

  # Debug: ver como o Bash expande
  set -x                # Ativa modo debug (mostra expansões)
  echo {1..5}
  set +x                # Desativa modo debug`}
        />

        <AlertBox type="info" title="Ordem das expansões no Bash">
          O Bash processa as expansões nesta ordem: 1) Brace expansion, 2) Tilde expansion,
          3) Parameter/variable expansion, 4) Command substitution, 5) Arithmetic expansion,
          6) Word splitting, 7) Pathname expansion (globbing). Entender essa ordem ajuda a
          prever o comportamento de comandos complexos.
        </AlertBox>
      </PageContainer>
    );
  }
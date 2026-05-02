import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function ScriptsBash() {
    return (
      <PageContainer
        title="Scripts Bash — Automação no Terminal"
        subtitle="Guia completo de shell scripting: variáveis, condições, loops, funções, arrays, tratamento de erros, debug e boas práticas."
        difficulty="intermediario"
        timeToRead="35 min"
      >
        <p>
          <strong>Scripts Bash</strong> automatizam tarefas repetitivas no terminal. Um script
          é simplesmente um arquivo de texto com uma sequência de comandos que o Bash executa
          em ordem. Desde backups automáticos até deploys complexos, scripts são a base da
          automação em servidores Linux.
        </p>

        <h2>1. Primeiro Script</h2>
        <CodeBlock
          title="Criar e executar scripts Bash"
          code={`# Criar um script
  cat > meu-script.sh << 'EOF'
  #!/bin/bash
  # Shebang (#!/bin/bash) — indica qual interpretador usar

  echo "Olá! Hoje é $(date +%d/%m/%Y)"
  echo "Você está logado como: $USER"
  echo "Diretório atual: $PWD"
  echo "Hostname: $(hostname)"
  EOF

  # Tornar executável
  chmod +x meu-script.sh

  # Executar
  ./meu-script.sh
  # Ou: bash meu-script.sh

  # Usar cabeçalho profissional
  cat > script-pro.sh << 'SCRIPT'
  #!/usr/bin/env bash
  #
  # Nome: script-pro.sh
  # Descrição: Exemplo de script profissional
  # Autor: Seu Nome
  # Data: 2024-07-15
  # Versão: 1.0
  #
  set -euo pipefail   # Modo estrito (recomendado!)
  # -e = sair se qualquer comando falhar
  # -u = erro se usar variável não definida
  # -o pipefail = erro se qualquer parte do pipe falhar

  IFS=$'\n\t'   # Separador padrão (evita problemas com espaços)

  echo "Script iniciado"
  SCRIPT`}
        />

        <h2>2. Variáveis e Parâmetros</h2>
        <CodeBlock
          title="Trabalhar com variáveis e argumentos"
          code={`#!/bin/bash
  # Variáveis (sem espaços ao redor do =!)
  nome="Ubuntu"
  versao=24
  caminho="/home/$USER"

  # Usar variáveis
  echo "Sistema: $nome $versao"
  echo "Home: \${caminho}"

  # Variáveis de ambiente
  echo "User: $USER"
  echo "Home: $HOME"
  echo "Shell: $SHELL"
  echo "Path: $PATH"

  # Parâmetros posicionais (argumentos do script)
  # ./script.sh arg1 arg2 arg3
  echo "Nome do script: $0"
  echo "Primeiro argumento: $1"
  echo "Segundo argumento: $2"
  echo "Todos os argumentos: $@"
  echo "Número de argumentos: $#"
  echo "PID do script: $$"
  echo "Status do último comando: $?"

  # Ler input do usuário
  read -p "Qual seu nome? " nome_usuario
  echo "Olá, $nome_usuario!"

  # Ler senha (sem mostrar)
  read -sp "Senha: " senha
  echo ""

  # Valor padrão
  nome=\${1:-"Ubuntu"}   # Usa $1 ou "Ubuntu" se não informado

  # Comando como variável
  data=$(date +%Y%m%d)
  arquivos=$(ls | wc -l)

  # Arrays
  frutas=("maçã" "banana" "laranja" "uva")
  echo "\${frutas[0]}"          # maçã
  echo "\${frutas[@]}"          # todos
  echo "\${#frutas[@]}"         # quantidade (4)
  frutas+=("manga")             # adicionar
  unset frutas[1]               # remover

  # Associative arrays (Bash 4+)
  declare -A config
  config[host]="localhost"
  config[porta]="5432"
  config[banco]="meuapp"
  echo "\${config[host]}:\${config[porta]}"`}
        />

        <h2>3. Condições (if/else)</h2>
        <CodeBlock
          title="Estruturas condicionais"
          code={`#!/bin/bash

  # if básico
  if [ -f "/etc/hostname" ]; then
      echo "Arquivo existe"
  fi

  # if/else
  if [ "$USER" = "root" ]; then
      echo "Você é root!"
  else
      echo "Você NÃO é root"
  fi

  # if/elif/else
  idade=25
  if [ "$idade" -lt 18 ]; then
      echo "Menor de idade"
  elif [ "$idade" -lt 65 ]; then
      echo "Adulto"
  else
      echo "Idoso"
  fi

  # Operadores de comparação (números):
  # -eq  igual         [ "$a" -eq "$b" ]
  # -ne  diferente     [ "$a" -ne "$b" ]
  # -gt  maior que     [ "$a" -gt "$b" ]
  # -ge  maior ou igual
  # -lt  menor que
  # -le  menor ou igual

  # Operadores de string:
  # =    igual         [ "$a" = "$b" ]
  # !=   diferente
  # -z   string vazia  [ -z "$var" ]
  # -n   string não vazia

  # Testes de arquivo:
  # -f   é arquivo regular    [ -f "/etc/hosts" ]
  # -d   é diretório         [ -d "/home" ]
  # -e   existe              [ -e "/tmp/test" ]
  # -r   é legível           [ -r "arquivo" ]
  # -w   é gravável
  # -x   é executável
  # -s   tamanho > 0

  # Operadores lógicos
  if [ -f "config.yaml" ] && [ -r "config.yaml" ]; then
      echo "Config existe e é legível"
  fi

  if [ "$1" = "start" ] || [ "$1" = "run" ]; then
      echo "Iniciando..."
  fi

  # [[ ]] — versão melhorada (suporta regex, glob)
  if [[ "$email" =~ ^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$ ]]; then
      echo "Email válido"
  fi

  # case (switch)
  case "$1" in
      start)
          echo "Iniciando..."
          ;;
      stop)
          echo "Parando..."
          ;;
      restart)
          echo "Reiniciando..."
          ;;
      *)
          echo "Uso: $0 {start|stop|restart}"
          exit 1
          ;;
  esac`}
        />

        <h2>4. Loops</h2>
        <CodeBlock
          title="Loops for, while e until"
          code={`#!/bin/bash

  # for com lista
  for fruta in maçã banana laranja; do
      echo "Fruta: $fruta"
  done

  # for com range
  for i in {1..10}; do
      echo "Número: $i"
  done

  # for estilo C
  for ((i=0; i<5; i++)); do
      echo "Índice: $i"
  done

  # for com arquivos
  for arquivo in *.txt; do
      echo "Processando: $arquivo"
      wc -l "$arquivo"
  done

  # for com resultado de comando
  for user in $(cut -d: -f1 /etc/passwd | head -5); do
      echo "Usuário: $user"
  done

  # while
  contador=1
  while [ $contador -le 5 ]; do
      echo "Contagem: $contador"
      ((contador++))
  done

  # while lendo arquivo linha por linha
  while IFS= read -r linha; do
      echo "Linha: $linha"
  done < arquivo.txt

  # while infinito (com break)
  while true; do
      read -p "Digite 'sair' para encerrar: " input
      if [ "$input" = "sair" ]; then
          break
      fi
      echo "Você digitou: $input"
  done

  # until (executa ATÉ a condição ser verdadeira)
  until [ -f "/tmp/pronto.flag" ]; do
      echo "Esperando arquivo..."
      sleep 5
  done
  echo "Arquivo encontrado!"`}
        />

        <h2>5. Funções</h2>
        <CodeBlock
          title="Criar e usar funções"
          code={`#!/bin/bash

  # Definir função
  log() {
      echo "[$(date +%H:%M:%S)] $*"
  }

  erro() {
      echo "[ERRO] $*" >&2
      exit 1
  }

  # Chamar
  log "Script iniciado"
  log "Processando dados..."

  # Função com retorno
  verificar_root() {
      if [ "$(id -u)" -ne 0 ]; then
          return 1
      fi
      return 0
  }

  if verificar_root; then
      echo "É root"
  else
      echo "Não é root"
  fi

  # Função com parâmetros
  criar_backup() {
      local origem="$1"
      local destino="$2"
      local data=$(date +%Y%m%d)

      if [ ! -d "$origem" ]; then
          erro "Diretório $origem não existe"
      fi

      tar czf "\${destino}/backup-\${data}.tar.gz" "$origem"
      log "Backup criado: \${destino}/backup-\${data}.tar.gz"
  }

  criar_backup "/home/usuario" "/backup"

  # Função que retorna valor via echo
  obter_tamanho() {
      du -sh "$1" 2>/dev/null | awk '{print $1}'
  }

  tamanho=$(obter_tamanho "/var/log")
  echo "Tamanho de /var/log: $tamanho"`}
        />

        <h2>6. Tratamento de Erros</h2>
        <CodeBlock
          title="Lidar com erros em scripts"
          code={`#!/bin/bash
  set -euo pipefail

  # trap — executar código ao sair (cleanup)
  cleanup() {
      echo "Limpando arquivos temporários..."
      rm -f /tmp/meu-script-*
  }
  trap cleanup EXIT         # Executa ao sair (sucesso ou erro)
  trap cleanup ERR          # Executa em caso de erro
  trap "echo 'Interrompido!'; exit 1" INT TERM  # Ctrl+C

  # Verificar se comando existe
  if ! command -v docker &>/dev/null; then
      echo "Docker não está instalado"
      exit 1
  fi

  # Executar com tratamento de erro
  if ! rsync -av /dados/ /backup/; then
      echo "Falha no backup!" >&2
      exit 1
  fi

  # Ignorar erro de um comando específico
  rm arquivo-que-pode-nao-existir.txt 2>/dev/null || true

  # Timeout para comandos
  timeout 30 wget https://example.com/arquivo.tar.gz || echo "Timeout!"`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Debug de scripts"
          code={`# Executar em modo debug (mostra cada comando)
  bash -x meu-script.sh

  # Ativar debug dentro do script
  set -x    # Ativar debug
  # ... código ...
  set +x    # Desativar debug

  # Verificar sintaxe sem executar
  bash -n meu-script.sh

  # ShellCheck — linter para scripts Bash
  sudo apt install -y shellcheck
  shellcheck meu-script.sh
  # Aponta erros comuns, problemas de portabilidade e boas práticas

  # Erro: "Permission denied"
  chmod +x script.sh

  # Erro: "bad interpreter: No such file or directory"
  # Causa: \r\n no final das linhas (arquivo criado no Windows)
  # Solução:
  sed -i 's/\r$//' script.sh
  # Ou: dos2unix script.sh`}
        />

        <AlertBox type="info" title="Quando usar Bash vs Python">
          Use <strong>Bash</strong> para: automação de comandos do sistema, pipes, tarefas
          rápidas do terminal, scripts de deploy. Use <strong>Python</strong> para: lógica
          complexa, manipulação de dados, APIs, scripts maiores que 100 linhas. A regra:
          se o script tem mais lógica que comandos, use Python.
        </AlertBox>
      </PageContainer>
    );
  }
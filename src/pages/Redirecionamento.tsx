import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Redirecionamento() {
    return (
      <PageContainer
        title="Redirecionamento e Pipes"
        subtitle="Guia completo de redirecionamento no Bash: stdin, stdout, stderr, pipes, tee, xargs, substituição de processos e combinações avançadas."
        difficulty="intermediario"
        timeToRead="25 min"
      >
        <p>
          O <strong>redirecionamento</strong> permite controlar para onde vai a saída de um
          comando e de onde vem sua entrada. Junto com <strong>pipes</strong> (<code>|</code>),
          é uma das funcionalidades mais poderosas do terminal Linux, permitindo encadear
          comandos para criar fluxos de processamento complexos.
        </p>

        <h2>1. Descritores de Arquivo</h2>
        <CodeBlock
          title="Entender stdin, stdout e stderr"
          code={`# Todo processo no Linux tem 3 fluxos padrão:
  # stdin  (0) → entrada padrão (teclado)
  # stdout (1) → saída padrão (tela)
  # stderr (2) → saída de erro (tela)

  # Exemplo: o comando ls
  ls /home          # stdout → lista de arquivos (tela)
  ls /inexistente   # stderr → mensagem de erro (tela)

  # O número do descritor é usado no redirecionamento:
  # 0 = stdin
  # 1 = stdout (padrão, pode omitir)
  # 2 = stderr`}
        />

        <h2>2. Redirecionar Saída (stdout)</h2>
        <CodeBlock
          title="Enviar saída para arquivos"
          code={`# > (redirecionar, SOBRESCREVE o arquivo)
  echo "Olá" > arquivo.txt
  ls -la > listagem.txt
  date > data.txt

  # >> (redirecionar, ADICIONA ao final)
  echo "Linha 1" > log.txt
  echo "Linha 2" >> log.txt
  echo "Linha 3" >> log.txt
  cat log.txt
  # Saída:
  # Linha 1
  # Linha 2
  # Linha 3

  # Criar arquivo vazio
  > arquivo.txt
  # Ou: truncate -s 0 arquivo.txt

  # Redirecionar para /dev/null (descartar saída)
  comando > /dev/null     # Ignorar saída
  find / -name "*.conf" > /dev/null 2>&1   # Ignorar tudo`}
        />

        <h2>3. Redirecionar Erros (stderr)</h2>
        <CodeBlock
          title="Controlar saída de erros"
          code={`# Redirecionar apenas erros
  ls /inexistente 2> erros.txt
  # stdout vai para a tela, stderr vai para erros.txt

  # Redirecionar stdout e stderr separadamente
  comando > saida.txt 2> erros.txt

  # Redirecionar ambos para o mesmo arquivo
  comando > tudo.txt 2>&1
  # Ou (sintaxe moderna):
  comando &> tudo.txt

  # Adicionar ambos ao arquivo
  comando >> tudo.txt 2>&1
  comando &>> tudo.txt

  # Descartar erros, manter saída
  find / -name "*.conf" 2>/dev/null

  # Descartar saída, manter erros
  comando > /dev/null

  # Descartar tudo
  comando &> /dev/null`}
        />

        <h2>4. Pipes (|)</h2>
        <CodeBlock
          title="Encadear comandos com pipes"
          code={`# O pipe (|) envia o stdout de um comando para o stdin do próximo

  # Exemplos básicos
  ls -la | less                    # Paginar saída
  ps aux | grep nginx              # Filtrar processos
  cat /etc/passwd | wc -l          # Contar linhas
  history | grep "apt install"     # Buscar no histórico

  # Encadear múltiplos pipes
  cat access.log | grep "404" | sort | uniq -c | sort -rn | head -10
  # 1. Ler o arquivo
  # 2. Filtrar linhas com "404"
  # 3. Ordenar
  # 4. Contar únicos
  # 5. Ordenar por contagem (reverso)
  # 6. Top 10

  # Pipe com stderr também (|&)
  comando |& grep "erro"
  # Envia stdout E stderr pelo pipe

  # Exemplos práticos
  # Top 10 maiores arquivos
  du -ah /var | sort -rh | head -10

  # Processos usando mais memória
  ps aux --sort=-%mem | head -10

  # IPs mais frequentes no log
  awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

  # Contar arquivos por extensão
  find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn`}
        />

        <h2>5. Redirecionar Entrada (stdin)</h2>
        <CodeBlock
          title="Fornecer entrada a partir de arquivos"
          code={`# < (redirecionar entrada)
  wc -l < arquivo.txt      # Contar linhas do arquivo
  sort < nomes.txt          # Ordenar conteúdo do arquivo
  mysql -u root < script.sql  # Executar SQL

  # Here Document (<<) — entrada inline
  cat << 'EOF'
  Isso é um texto
  com múltiplas linhas
  que será enviado ao cat
  EOF

  # Here String (<<<)
  grep "Ubuntu" <<< "Eu uso Ubuntu"
  wc -w <<< "contar estas palavras"

  # Here Document com variáveis
  nome="João"
  cat << EOF
  Olá, $nome!
  Bem-vindo ao Ubuntu.
  EOF

  # Here Document sem expandir variáveis (aspas no delimitador)
  cat << 'EOF'
  Isso não expande $variavel
  EOF`}
        />

        <h2>6. tee, xargs e Substituição de Processos</h2>
        <CodeBlock
          title="Ferramentas avançadas de redirecionamento"
          code={`# tee — enviar para arquivo E tela ao mesmo tempo
  ls -la | tee listagem.txt           # Mostra na tela E salva
  ls -la | tee -a listagem.txt        # Adiciona ao arquivo
  ls -la | tee arquivo1.txt arquivo2.txt  # Salvar em dois arquivos

  # Uso com sudo
  echo "texto" | sudo tee /etc/arquivo.conf
  # Funciona! (ao contrário de sudo echo > /etc/arquivo)

  # xargs — converter stdin em argumentos
  find . -name "*.tmp" | xargs rm     # Remover arquivos encontrados
  cat urls.txt | xargs wget           # Baixar URLs da lista
  echo "1 2 3" | xargs -n 1 echo     # Um por linha
  find . -name "*.jpg" | xargs -I {} cp {} /backup/  # Usar placeholder

  # Substituição de processos <() e >()
  diff <(ls dir1) <(ls dir2)          # Comparar listagens
  comm <(sort file1) <(sort file2)    # Comparar arquivos ordenados

  # Combinar tudo
  ps aux | tee processos.txt | grep nginx | wc -l`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com redirecionamento"
          code={`# "Permission denied" ao redirecionar com sudo
  # ERRADO: sudo echo "texto" > /etc/arquivo  (o > é executado sem sudo)
  # CERTO:
  echo "texto" | sudo tee /etc/arquivo
  # Ou:
  sudo bash -c 'echo "texto" > /etc/arquivo'

  # Arquivo ficou vazio ao redirecionar para ele mesmo
  # ERRADO: sort arquivo.txt > arquivo.txt  (sobrescreve antes de ler!)
  # CERTO:
  sort arquivo.txt > temp.txt && mv temp.txt arquivo.txt
  # Ou: sort -o arquivo.txt arquivo.txt

  # Pipe não funciona com alias
  # Aliases não são expandidos em pipes subshells
  # Use o caminho completo ou funções`}
        />

        <AlertBox type="info" title="Filosofia Unix">
          A filosofia Unix é: cada programa faz uma coisa bem, e pipes os conectam.
          <code>grep</code> filtra, <code>sort</code> ordena, <code>wc</code> conta,
          <code>awk</code> processa — juntos, fazem praticamente qualquer coisa.
        </AlertBox>
      </PageContainer>
    );
  }
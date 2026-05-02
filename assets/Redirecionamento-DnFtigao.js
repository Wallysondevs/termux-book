import{j as o}from"./index-CsDtDb2_.js";import{P as a}from"./PageContainer-DdYPssra.js";import{C as e}from"./CodeBlock-CCueYP-d.js";import{I as r}from"./InfoBox-CFJp2Xi7.js";import"./house-BVOOG_Vc.js";import"./proxy-BaSd2E5R.js";function m(){return o.jsxs(a,{title:"Redirecionamento e Pipes",subtitle:"Guia completo de redirecionamento no Bash: stdin, stdout, stderr, pipes, tee, xargs, substituição de processos e combinações avançadas.",difficulty:"intermediario",timeToRead:"25 min",children:[o.jsxs("p",{children:["O ",o.jsx("strong",{children:"redirecionamento"})," permite controlar para onde vai a saída de um comando e de onde vem sua entrada. Junto com ",o.jsx("strong",{children:"pipes"})," (",o.jsx("code",{children:"|"}),"), é uma das funcionalidades mais poderosas do terminal Linux, permitindo encadear comandos para criar fluxos de processamento complexos."]}),o.jsx("h2",{children:"1. Descritores de Arquivo"}),o.jsx(e,{title:"Entender stdin, stdout e stderr",code:`# Todo processo no Linux tem 3 fluxos padrão:
  # stdin  (0) → entrada padrão (teclado)
  # stdout (1) → saída padrão (tela)
  # stderr (2) → saída de erro (tela)

  # Exemplo: o comando ls
  ls /home          # stdout → lista de arquivos (tela)
  ls /inexistente   # stderr → mensagem de erro (tela)

  # O número do descritor é usado no redirecionamento:
  # 0 = stdin
  # 1 = stdout (padrão, pode omitir)
  # 2 = stderr`}),o.jsx("h2",{children:"2. Redirecionar Saída (stdout)"}),o.jsx(e,{title:"Enviar saída para arquivos",code:`# > (redirecionar, SOBRESCREVE o arquivo)
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
  find / -name "*.conf" > /dev/null 2>&1   # Ignorar tudo`}),o.jsx("h2",{children:"3. Redirecionar Erros (stderr)"}),o.jsx(e,{title:"Controlar saída de erros",code:`# Redirecionar apenas erros
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
  comando &> /dev/null`}),o.jsx("h2",{children:"4. Pipes (|)"}),o.jsx(e,{title:"Encadear comandos com pipes",code:`# O pipe (|) envia o stdout de um comando para o stdin do próximo

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
  find . -type f | sed 's/.*.//' | sort | uniq -c | sort -rn`}),o.jsx("h2",{children:"5. Redirecionar Entrada (stdin)"}),o.jsx(e,{title:"Fornecer entrada a partir de arquivos",code:`# < (redirecionar entrada)
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
  EOF`}),o.jsx("h2",{children:"6. tee, xargs e Substituição de Processos"}),o.jsx(e,{title:"Ferramentas avançadas de redirecionamento",code:`# tee — enviar para arquivo E tela ao mesmo tempo
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
  ps aux | tee processos.txt | grep nginx | wc -l`}),o.jsx("h2",{children:"Troubleshooting"}),o.jsx(e,{title:"Problemas comuns com redirecionamento",code:`# "Permission denied" ao redirecionar com sudo
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
  # Use o caminho completo ou funções`}),o.jsxs(r,{type:"info",title:"Filosofia Unix",children:["A filosofia Unix é: cada programa faz uma coisa bem, e pipes os conectam.",o.jsx("code",{children:"grep"})," filtra, ",o.jsx("code",{children:"sort"})," ordena, ",o.jsx("code",{children:"wc"})," conta,",o.jsx("code",{children:"awk"})," processa — juntos, fazem praticamente qualquer coisa."]})]})}export{m as default};

import{j as o}from"./index-DllpmZ7S.js";import{P as e}from"./PageContainer-D5o1LrsX.js";import{C as a}from"./CodeBlock-BCO78Zke.js";import"./house-CLqZi7qQ.js";import"./proxy-Xil2K0n2.js";function d(){return o.jsxs(e,{title:"Comandos Avançados",subtitle:"awk, sed, find avançado, xargs, cut, tr, jq — processamento de texto e automação de alto nível no terminal.",difficulty:"avancado",timeToRead:"35 min",children:[o.jsxs("p",{children:["Com o domínio dos comandos básicos, é hora de conhecer as ferramentas que separam usuários avançados de iniciantes. ",o.jsx("code",{children:"awk"})," e ",o.jsx("code",{children:"sed"})," são linguagens de processamento de texto poderosas. Combinados com pipes, transformam o terminal em um ambiente de processamento de dados extremamente eficiente."]}),o.jsx("h2",{children:"sed — Editor de Fluxo de Texto"}),o.jsxs("p",{children:["O ",o.jsx("code",{children:"sed"})," (Stream EDitor) processa texto linha por linha, aplicando transformações como substituição, exclusão e inserção."]}),o.jsx(a,{title:"sed: substituição e edição de texto",code:`# Substituição básica (primeira ocorrência por linha)
sed 's/antigo/novo/' arquivo.txt

# Substituição global (todas as ocorrências por linha)
sed 's/antigo/novo/g' arquivo.txt

# Substituição sem diferenciar maiúsculas/minúsculas
sed 's/erro/aviso/gi' arquivo.txt

# Substituição DIRETAMENTE no arquivo (in-place)
sed -i 's/antigo/novo/g' arquivo.txt

# Fazer backup antes de editar in-place
sed -i.bak 's/antigo/novo/g' arquivo.txt
# Cria: arquivo.txt.bak (original) e arquivo.txt (modificado)

# Deletar linhas que contêm um padrão
sed '/comentario/d' arquivo.txt
sed '/^#/d' arquivo.txt    # Deletar linhas que começam com #
sed '/^$/d' arquivo.txt    # Deletar linhas vazias

# Imprimir apenas linhas que contêm padrão
sed -n '/erro/p' arquivo.txt

# Imprimir linhas de 3 a 7
sed -n '3,7p' arquivo.txt

# Inserir linha antes da linha 5
sed '5iNova linha aqui' arquivo.txt

# Adicionar linha após linha 5
sed '5aNova linha aqui' arquivo.txt

# Exemplos práticos:

# Mudar endereço IP em arquivo de configuração
sed -i 's/192.168.1.100/10.0.0.100/g' /etc/nginx/nginx.conf

# Remover comentários e linhas vazias de config:
sed -e '/^#/d' -e '/^$/d' /etc/ssh/sshd_config

# Extrair valor de configuração
sed -n 's/^Port //p' /etc/ssh/sshd_config`}),o.jsx("h2",{children:"awk — Processamento de Dados Tabulares"}),o.jsxs("p",{children:["O ",o.jsx("code",{children:"awk"})," é uma linguagem de processamento de texto orientada a campos. É ideal para processar arquivos com colunas (logs, CSV, saída de comandos como ",o.jsx("code",{children:"ps"}),")."]}),o.jsx(a,{title:"awk: processando colunas e campos",code:`# Estrutura: awk 'padrão { ação }' arquivo

# Imprimir primeira coluna (campo) de cada linha
awk '{print $1}' arquivo.txt

# Imprimir colunas específicas
ps aux | awk '{print $1, $2, $11}'  # user, PID, comando

# Separador personalizado (padrão é espaço/tab)
awk -F: '{print $1, $3}' /etc/passwd    # usuário:UID
awk -F, '{print $2}' dados.csv           # segunda coluna de CSV

# Filtrar linhas e imprimir campos
ps aux | awk '$3 > 1.0 {print $1, $2, $3}'  # Processos usando >1% CPU

# Calcular soma de uma coluna
df -h | awk '{sum += $2} END {print "Total:", sum}'

# Contar linhas
awk 'END {print NR}' arquivo.txt   # NR = número de registros (linhas)

# Variáveis especiais do awk:
# $0  = linha inteira
# $1  = primeiro campo
# $NF = último campo (Number of Fields)
# NR  = número da linha atual
# NF  = número de campos na linha
# FS  = separador de campo (pode mudar)

# Exemplos práticos:

# Ver tamanho total dos arquivos em /var/log
ls -la /var/log/*.log | awk '{total += $5} END {print "Total:", total/1024/1024 "MB"}'

# Extrair domínios únicos de um log de acesso nginx
awk '{print $7}' /var/log/nginx/access.log | \\
    grep -oE 'https?://[^/]+' | \\
    sort | uniq -c | sort -rn

# Mostrar apenas usuários com UID >= 1000 (usuários normais)
awk -F: '$3 >= 1000 {print $1, "UID:", $3}' /etc/passwd

# Calcular média de CPU dos processos
ps aux | awk 'NR>1 {sum += $3} END {print "Média CPU:", sum/NR "%"}'`}),o.jsx("h2",{children:"cut — Extrair Campos de Texto"}),o.jsx(a,{title:"cut: extração de colunas",code:`# Extrair por posição de caractere (1-indexed)
cut -c1-10 arquivo.txt      # Primeiros 10 caracteres de cada linha
cut -c5 arquivo.txt         # Apenas o 5º caractere

# Extrair por campo (delimitador)
cut -d: -f1 /etc/passwd     # Primeiro campo (nome de usuário)
cut -d: -f1,3 /etc/passwd   # Primeiro e terceiro campos
cut -d: -f1-3 /etc/passwd   # Campos 1 a 3

# Exemplos:
# Listar apenas nomes de usuários:
cut -d: -f1 /etc/passwd

# Listar extensões de arquivos:
ls /etc | grep "\\." | rev | cut -d. -f1 | rev | sort | uniq`}),o.jsx("h2",{children:"tr — Transliterar e Transformar"}),o.jsx(a,{title:"tr: transformando caracteres",code:`# Converter letras minúsculas para maiúsculas
echo "hello world" | tr 'a-z' 'A-Z'
# HELLO WORLD

# Converter maiúsculas para minúsculas
echo "HELLO WORLD" | tr 'A-Z' 'a-z'

# Remover caracteres
echo "h-e-l-l-o" | tr -d '-'
# hello

# Remover dígitos
echo "abc123def456" | tr -d '0-9'
# abcdef

# Squezar espaços duplos em único espaço
echo "hello    world" | tr -s ' '
# hello world

# Substituir espaços por underscores:
echo "meu arquivo com espacos" | tr ' ' '_'
# meu_arquivo_com_espacos

# Remover quebras de linha:
cat arquivo.txt | tr -d '
'`}),o.jsx("h2",{children:"find Avançado"}),o.jsx(a,{title:"find com critérios complexos",code:`# Encontrar e executar ação (delete sem confirmação — CUIDADO!)
find /tmp -name "*.tmp" -mtime +7 -delete   # Apagar .tmp com mais de 7 dias

# Encontrar e executar comando personalizado
find /home -name "*.log" -exec gzip {} ;
find /var/log -name "*.log" -exec chmod 640 {} ;

# Execução com confirmação:
find /tmp -name "*.tmp" -ok rm {} ;   # -ok pede confirmação para cada arquivo

# Múltiplos critérios (AND implícito)
find /home -name "*.pdf" -size +5M -mtime -30
# PDFs maiores que 5MB modificados nos últimos 30 dias

# OR com -o
find /tmp -name "*.tmp" -o -name "*.log"

# NOT com ! ou -not
find /etc -name "*.conf" -not -name "*.bak"

# Por tipo e permissão:
find / -type f -perm -4000 2>/dev/null   # Arquivos com SUID (importante para segurança)
find / -type f -perm -2000 2>/dev/null   # Arquivos com SGID

# Por dono:
find /home -user joao -type f

# Por modificação mais recente que um arquivo referência
find /etc -newer /etc/passwd

# Combinar find com xargs para melhor performance
find /var/log -name "*.log" -print0 | xargs -0 gzip`}),o.jsx("h2",{children:"sort, uniq e Processamento de Dados"}),o.jsx(a,{title:"Processamento avançado de dados",code:`# Ordenar por múltiplas colunas
sort -k2,2 -k1,1 arquivo.txt   # Ordenar por coluna 2, depois por coluna 1

# Ordenar CSV pelo segundo campo numericamente:
sort -t, -k2 -n dados.csv

# Combinar para análise de logs:
# Top 10 IPs com mais requests em nginx:
awk '{print $1}' /var/log/nginx/access.log | \\
    sort | uniq -c | sort -rn | head -10

# Ver quais extensões mais aparecem em um diretório:
find . -type f | sed 's/.*\\.//' | sort | uniq -c | sort -rn

# join — juntar dois arquivos por campo comum (como SQL JOIN)
join -t: -1 1 -2 3 arquivo1.txt arquivo2.txt`}),o.jsx("h2",{children:"jq — Processamento de JSON"}),o.jsx(a,{title:"Processar JSON na linha de comando",code:`# Instalar jq
sudo apt install jq

# Formatar JSON bonito
echo '{"nome":"João","idade":25}' | jq .

# Extrair campo específico
echo '{"nome":"João","cidade":"SP"}' | jq '.nome'
# "João"

# Extrair de arquivo JSON
jq '.users[0].name' dados.json

# Iterar em array
jq '.[] | .name' lista.json

# Filtrar e transformar
cat package.json | jq '.dependencies | keys'

# Exemplos práticos com APIs:
curl -s https://api.github.com/repos/torvalds/linux | \\
    jq '{nome: .name, estrelas: .stargazers_count, forks: .forks}'

# Processar saída de docker inspect:
docker inspect meu-container | jq '.[0].NetworkSettings.IPAddress'

# Formatar saída de API em tabela:
curl -s https://jsonplaceholder.typicode.com/users | \\
    jq -r '.[] | [.name, .email, .company.name] | @csv'`})]})}export{d as default};

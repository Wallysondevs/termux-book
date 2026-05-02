import{j as o}from"./index-CsDtDb2_.js";import{P as r}from"./PageContainer-DdYPssra.js";import{C as e}from"./CodeBlock-CCueYP-d.js";import{I as a}from"./InfoBox-CFJp2Xi7.js";import"./house-BVOOG_Vc.js";import"./proxy-BaSd2E5R.js";function l(){return o.jsxs(r,{title:"Navegação no Terminal",subtitle:"Movendo-se pelo sistema de arquivos com ls, cd, pwd, find, tree e muito mais — o básico que você vai usar todos os dias.",difficulty:"iniciante",timeToRead:"15 min",children:[o.jsx("p",{children:"O terminal pode parecer intimidador no começo, mas a navegação pelo sistema de arquivos do Linux segue uma lógica simples e consistente. Com poucos comandos, você se moverá pelo sistema com mais velocidade do que com qualquer interface gráfica."}),o.jsxs(a,{type:"info",title:"Como ler os comandos deste guia",children:["Ao longo deste guia, você verá letras após um ",o.jsx("code",{children:"-"})," (traço). Essas são as",o.jsx("strong",{children:" flags"})," — opções que mudam o comportamento de um comando. Exemplo: ",o.jsx("code",{children:"ls -l"})," — o ",o.jsx("code",{children:"ls"})," é o comando, o ",o.jsx("code",{children:"-l"})," é a flag que pede a listagem detalhada. Flags curtas (uma letra) usam ",o.jsx("code",{children:"-"}),". Flags longas (palavra) usam ",o.jsx("code",{children:"--"})," (dois traços), ex: ",o.jsx("code",{children:"--help"}),". Múltiplas flags curtas podem ser combinadas: ",o.jsx("code",{children:"-lah"})," = ",o.jsx("code",{children:"-l -a -h"}),"."]}),o.jsx("h2",{children:"pwd — Onde Estou?"}),o.jsx(e,{title:"Print Working Directory — mostrar o diretório atual",code:`pwd
# /home/joao
# pwd = Print Working Directory (imprimir o diretório de trabalho atual)

# O "~" no prompt representa seu diretório home (/home/seu-usuario)
# joao@ubuntu:~$       ← você está em /home/joao  (o ~ é atalho para home)
# joao@ubuntu:~$ cd /etc
# joao@ubuntu:/etc$    ← você está em /etc`}),o.jsx("h2",{children:"ls — Listar Conteúdo do Diretório"}),o.jsx(e,{title:"Todas as flags do ls explicadas",code:`# Listar o diretório atual (apenas nomes)
ls

# -l = long format (formato longo com detalhes)
# Mostra: permissões, links, dono, grupo, tamanho, data e nome
ls -l

# -a = all (todos os arquivos)
# Inclui arquivos ocultos (os que começam com . como .bashrc, .ssh)
ls -a

# -h = human readable (legível por humanos)
# Mostra tamanhos em KB, MB, GB em vez de bytes brutos (ex: 4,0K em vez de 4096)
ls -h

# -S = Sort by Size (ordenar por tamanho, maior primeiro)
ls -S

# -t = sort by Time (ordenar por data de modificação, mais recente primeiro)
ls -t

# -r = reverse (inverter a ordem da listagem)
ls -r

# -R = Recursive (listar recursivamente todos os subdiretórios)
ls -R

# === COMBINAÇÕES MAIS USADAS ===

# -la = detalhes + arquivos ocultos (muito comum)
ls -la

# -lah = detalhes + ocultos + tamanhos legíveis (a combinação mais popular)
ls -lah

# Saída de ls -lah:
# total 44K
# drwxr-x--- 12 joao joao 4,0K mar 27 10:00 .
# drwxr-xr-x  3 root root 4,0K mar 26 09:15 ..
# -rw-r--r--  1 joao joao  220 mar 26 09:15 .bash_logout
# -rw-r--r--  1 joao joao 3,5K mar 26 09:15 .bashrc
# drwxr-xr-x  2 joao joao 4,0K mar 27 09:00 Downloads
# ^           ^ ^    ^    ^    ^              ^
# permissões  links  user  group tamanho data  nome

# -lhS = detalhes + legível + ordenado por tamanho (para encontrar arquivos grandes)
ls -lhS

# -lht = detalhes + legível + ordenado por data (mais recente primeiro)
ls -lht

# Listar um diretório específico (sem precisar navegar até lá)
ls /etc
ls -la /var/log

# -F = classify (classificar com símbolos no final do nome)
# / = diretório  |  * = executável  |  @ = link simbólico
ls -F`}),o.jsx("h2",{children:"cd — Mudar de Diretório"}),o.jsx(e,{title:"Navegando pelos diretórios",code:`# Ir para o diretório home do usuário atual
cd         # sem argumentos = vai para home
cd ~       # ~ é o atalho para /home/seu-usuario
cd /home/joao  # o caminho completo (absoluto)

# Ir para um diretório usando caminho absoluto (começa com /)
cd /etc
cd /var/log
cd /usr/local/bin

# Ir para um subdiretório usando caminho relativo (sem /)
# Relativo = em relação ao diretório atual
cd Downloads               # pasta Downloads dentro do diretório atual
cd Documents/Projetos      # subpasta dentro de Documents

# Voltar um nível (ir para o diretório pai)
cd ..       # .. = diretório pai (um nível acima)

# Voltar dois níveis
cd ../..    # pai do pai

# Voltar para o diretório em que você estava antes (histórico de um passo)
cd -        # muito útil para alternar entre dois diretórios

# Exemplo de uso do cd -:
cd /etc/ssh    # vai para /etc/ssh
cd /var/log    # vai para /var/log
cd -           # volta para /etc/ssh   ← prático!

# Dica essencial: use Tab para autocompletar!
# Digite "cd /etc/ss" e pressione Tab → completa para "cd /etc/ssh/"
# Se houver mais de uma opção, pressione Tab duas vezes para ver todas.`}),o.jsx("h2",{children:"find — Encontrar Arquivos e Diretórios"}),o.jsx(e,{title:"find: busca com flags explicadas",code:`# Estrutura: find [onde buscar] [critérios] [ação]

# -name = filtrar por nome exato (sensível a maiúsculas/minúsculas)
find /home -name "arquivo.txt"

# -iname = filtrar por nome (insensível a maiúsculas/minúsculas)
# i = case insensitive
find /home -iname "foto*.jpg"

# -name com curinga * (qualquer sequência de caracteres)
find /home -name "*.pdf"     # todos os arquivos .pdf

# -type = filtrar pelo tipo
# -type f = file (arquivos regulares)
# -type d = directory (diretórios)
# -type l = link (links simbólicos)
find /etc -type f            # apenas arquivos
find /etc -type d            # apenas diretórios

# -mtime = modified time (tempo de modificação)
# -mtime -1 = modificados nas ÚLTIMAS 24 horas (o - significa "menos de")
# -mtime +7 = modificados há MAIS de 7 dias (o + significa "mais de")
find /home -mtime -1         # modificados hoje
find /var/log -mtime +30     # logs com mais de 30 dias

# -size = filtrar por tamanho
# + = maior que   |   - = menor que
# c = bytes | k = kilobytes | M = megabytes | G = gigabytes
find /var -size +100M        # arquivos maiores que 100MB
find /tmp -size -1k          # arquivos menores que 1KB

# -user = filtrar por dono do arquivo
find / -user joao            # todos os arquivos do usuário joao

# -exec = executar um comando para cada resultado
# {} = onde o nome do arquivo encontrado será inserido
# ; = marca o fim do comando que será executado
find /home -name "*.log" -exec rm {} ;
# Para cada .log encontrado, executa: rm [nome-do-arquivo]

# -not = inverter critério (encontrar o oposto)
find /etc -name "*.conf" -not -name "*.bak"
# Arquivos .conf que NÃO sejam .bak`}),o.jsx("h2",{children:"tree — Visualizar em Árvore"}),o.jsx(e,{title:"tree: visualização hierárquica",code:`# Instalar (não vem por padrão):
sudo apt install tree

# Ver estrutura do diretório atual
tree

# -L = Level (nível máximo de profundidade)
tree -L 2    # ver apenas 2 níveis de subdiretórios

# -a = all (incluir arquivos ocultos que começam com .)
tree -a

# -s = size (mostrar tamanho dos arquivos)
# -h = human readable (tamanhos em KB, MB — combinado com -s)
tree -sh

# -d = directories only (mostrar apenas diretórios, sem arquivos)
tree -d

# Ver um diretório específico
tree /etc/ssh

# Saída:
# /etc/ssh
# ├── moduli
# ├── ssh_config
# ├── ssh_config.d
# │   └── 50-systemd-user.conf
# └── sshd_config`}),o.jsx("h2",{children:"which e whereis — Localizar Programas"}),o.jsx(e,{title:"Encontrar onde estão os executáveis",code:`# which = mostra o caminho completo de um comando no PATH
which python3
# /usr/bin/python3

which git
# /usr/bin/git

# whereis = localiza o binário, o manual e o código-fonte de um comando
whereis python3
# python3: /usr/bin/python3 /usr/lib/python3 /usr/share/man/man1/python3.1.gz
#           ^executável       ^bibliotecas     ^manual

# type = mostra como o shell interpreta um comando
type ls
# ls is aliased to 'ls --color=auto'   ← é um alias (apelido)

type cd
# cd is a shell builtin               ← comando interno do próprio shell

type which
# which is /usr/bin/which              ← é um executável externo`}),o.jsx("h2",{children:"Caminhos Absolutos vs Relativos"}),o.jsx(a,{type:"info",title:"Entendendo caminhos — conceito fundamental",children:o.jsxs("ul",{className:"mt-1 mb-0",children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Caminho absoluto"}),": Começa com ",o.jsx("code",{children:"/"}),". Ex: ",o.jsx("code",{children:"/home/joao/Downloads"}),". Funciona de qualquer lugar no sistema."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Caminho relativo"}),": Não começa com ",o.jsx("code",{children:"/"}),". Ex: ",o.jsx("code",{children:"Downloads"})," ou ",o.jsx("code",{children:"../etc"}),". É relativo ao diretório em que você está agora."]}),o.jsxs("li",{children:[o.jsx("code",{children:"."})," (ponto simples) = o diretório atual"]}),o.jsxs("li",{children:[o.jsx("code",{children:".."})," (dois pontos) = diretório pai (um nível acima)"]}),o.jsxs("li",{children:[o.jsx("code",{children:"~"})," (til) = diretório home do usuário atual (",o.jsx("code",{children:"/home/seu-usuario"}),")"]})]})}),o.jsx("h2",{children:"Atalhos de Teclado no Terminal"}),o.jsx(e,{title:"Atalhos essenciais para produtividade",code:`Ctrl + C      # Cancelar/interromper o comando em execução
Ctrl + Z      # Pausar processo e mandá-lo para background
Ctrl + D      # Fechar o terminal (ou encerrar entrada de texto com EOF)
Ctrl + L      # Limpar a tela (equivale ao comando "clear")
Ctrl + A      # Mover cursor para o INÍCIO da linha
Ctrl + E      # Mover cursor para o FIM da linha
Ctrl + U      # Apagar tudo ANTES do cursor (do início até o cursor)
Ctrl + K      # Apagar tudo DEPOIS do cursor (do cursor até o fim)
Ctrl + W      # Apagar a palavra anterior (antes do cursor)
Ctrl + R      # Pesquisar no histórico de comandos (reverse search)
Alt + .       # Inserir o último ARGUMENTO do comando anterior
Tab           # Autocompletar nome de arquivo, diretório ou comando
Tab Tab       # Mostrar TODAS as possibilidades de autocomplete
↑ / ↓         # Navegar pelo histórico de comandos`}),o.jsx("h2",{children:"Histórico de Comandos"}),o.jsx(e,{title:"Reutilizando comandos do histórico",code:`# Ver histórico completo de comandos
history
# Mostra uma lista numerada de todos os comandos anteriores

# Ver apenas os últimos N comandos
history 20    # Ver os últimos 20

# Executar o comando de número específico do histórico
!42           # Executa exatamente o que estava na linha 42 do history

# Executar o último comando que COMEÇOU com "apt"
!apt

# Repetir o último comando executado
!!

# Pesquisar no histórico interativamente (muito útil!):
# Pressione Ctrl+R e comece a digitar qualquer parte do comando
# (reverse-i-search)\`apt': sudo apt update
# Continue pressionando Ctrl+R para ver resultados anteriores

# Limpar o histórico (apaga todos os comandos salvos)
history -c`})]})}export{l as default};

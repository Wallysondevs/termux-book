import{j as e}from"./index-CbmJLKV7.js";import{P as a}from"./PageContainer-C07HsLrK.js";import{T as r,C as i,O as s,F as n}from"./Terminal-BBUvJLoF.js";import{I as d}from"./InfoBox-OReRpdzk.js";import"./house-Cv6RfdLC.js";import"./proxy-BQXFYY1E.js";function x(){return e.jsxs(a,{title:"Vim e Neovim",subtitle:"O editor modal que sobreviveu décadas e ainda domina servidores e estações de desenvolvedores no mundo todo.",difficulty:"intermediario",timeToRead:"50 min",category:"Desenvolvimento",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Vim"})," (Vi IMproved) é o sucessor moderno do ",e.jsx("code",{children:"vi"}),", o editor que acompanha praticamente toda instalação UNIX desde os anos 70. No Termux 0.118, o Vim vem pré-instalado em modo ",e.jsx("em",{children:"tiny"})," (apenas o suficiente para edição básica de arquivos de configuração); para tirar proveito real, instalamos o pacote ",e.jsx("code",{children:"vim"})," completo ou o ",e.jsx("strong",{children:"Neovim"}),", fork moderno escrito em C com suporte nativo a Lua e LSP."]}),e.jsxs("p",{children:["A grande característica do Vim é ser um ",e.jsx("strong",{children:"editor modal"}),": ao contrário do nano, do gedit ou do VS Code, em que tudo o que você digita vai parar no arquivo, no Vim cada tecla pode ter dezenas de significados dependendo do ",e.jsx("em",{children:"modo"})," em que você está. Esse paradigma assusta no início, mas após algumas semanas é o que torna a edição de texto absurdamente rápida — porque suas mãos nunca saem da fileira do meio do teclado."]}),e.jsx("h2",{children:"1. Instalação no Termux 0.118"}),e.jsxs("p",{children:["Vamos começar verificando o que já vem instalado e depois instalar a versão completa. Em uma instalação Termux padrão, você terá apenas o ",e.jsx("code",{children:"vim-tiny"}),", que é o binário ",e.jsx("code",{children:"/usr/bin/vi"})," e mostra a mensagem ",e.jsx("em",{children:'"Sorry, the command is not available in this version"'})," para muitos comandos avançados."]}),e.jsxs(r,{title:"wallyson@termux: ~",children:[e.jsx(i,{command:"which vi vim nvim",output:`/usr/bin/vi
/usr/bin/vim`,comment:"Verifica o que já está instalado"}),e.jsx(i,{command:"dpkg -l | grep -E 'vim|neovim'",output:`ii  vim-common         2:9.1.0016-termux.4   all          Vi IMproved - Common files
ii  vim-tiny           2:9.1.0016-termux.4   amd64        Vi IMproved - enhanced vi editor - compact version
ii  xxd                2:9.1.0016-termux.4   amd64        tool to make (or reverse) a hex dump`}),e.jsx(i,{root:!0,command:"pkg install -y vim neovim",output:`Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  libgpm2 libluajit-5.1-2 libluajit-5.1-common libmsgpackc2 libtree-sitter0
  libunibilium4 libvim-common neovim-runtime vim-runtime
Suggested packages:
  ctags vim-doc vim-scripts neovim-qt python3-pynvim
The following NEW packages will be installed:
  libgpm2 libluajit-5.1-2 libluajit-5.1-common libmsgpackc2 libtree-sitter0
  libunibilium4 libvim-common neovim neovim-runtime vim vim-runtime
0 upgraded, 11 newly installed, 0 to remove and 0 not upgraded.
Need to get 24.6 MB of archives.
After this operation, 87.4 MB of additional disk space will be used.
Get:1 http://packages.termux.dev/apt/termux-main noble/main amd64 libgpm2 amd64 1.20.7-11 [14.8 kB]
Get:2 http://packages.termux.dev/apt/termux-main noble/main amd64 vim-runtime all 2:9.1.0016-termux.4 [7.347 kB]
Get:3 http://packages.termux.dev/apt/termux-main noble/main amd64 vim amd64 2:9.1.0016-termux.4 [1.747 kB]
Get:4 http://packages.termux.dev/apt/termux-main noble/universe amd64 neovim-runtime all 0.9.5-7 [10.6 MB]
Get:5 http://packages.termux.dev/apt/termux-main noble/universe amd64 neovim amd64 0.9.5-7 [2.184 kB]
Fetched 24.6 MB in 3s (8.054 kB/s)
Setting up vim (2:9.1.0016-termux.4) ...
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/vim (vim) in auto mode
Setting up neovim (0.9.5-7) ...
Processing triggers for man-db (2.12.0-4build2) ...`}),e.jsx(i,{command:"vim --version | head -3",output:`VIM - Vi IMproved 9.1 (2024 Jan 02, compiled May 22 2025 16:30:11)
Included patches: 1-16, 24-1418
Modified by team+vim@tracker.debian.org`}),e.jsx(i,{command:"nvim --version | head -3",output:`NVIM v0.9.5
Build type: RelWithDebInfo
LuaJIT 2.1.1703358377`})]}),e.jsxs(d,{type:"tip",title:"Versões mais novas do Neovim",children:["O Neovim no repositório padrão é a 0.9.5; a versão estável atual em 2025 é a 0.10.x. Para a versão mais recente, use o ",e.jsx("code",{children:"PPA neovim-ppa/unstable"})," ou baixe o AppImage oficial em ",e.jsx("code",{children:"github.com/neovim/neovim/releases"}),"."]}),e.jsx("h3",{children:"1.1 Definir o editor padrão do sistema"}),e.jsxs(r,{children:[e.jsx(i,{root:!0,command:"update-alternatives --config editor",output:`There are 4 choices for the alternative editor (providing /usr/bin/editor).

  Selection    Path                Priority   Status
------------------------------------------------------------
* 0            /bin/nano            40        auto mode
  1            /bin/ed             -100       manual mode
  2            /bin/nano            40        manual mode
  3            /usr/bin/vim.basic   30        manual mode
  4            /usr/bin/vim.tiny    15        manual mode

Press <enter> to keep the current choice[*], or type selection number: 3
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/editor (editor) in manual mode`}),e.jsx(i,{command:'echo "export EDITOR=vim" >> ~/.bashrc && source ~/.bashrc'}),e.jsx(i,{command:"echo $EDITOR",output:"vim"})]}),e.jsx("h2",{children:"2. Os 4 modos do Vim"}),e.jsx("p",{children:"Entender os modos é entender o Vim. A confusão clássica do iniciante (digitar texto e ver letras virando comandos aleatórios) sempre vem de estar no modo errado."}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Modo"}),e.jsx("th",{children:"Como entrar"}),e.jsx("th",{children:"Para que serve"}),e.jsx("th",{children:"Sair"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Normal"})}),e.jsxs("td",{children:["É o padrão ao abrir; ",e.jsx("kbd",{children:"Esc"})," de qualquer modo"]}),e.jsx("td",{children:"Navegar, deletar, copiar, colar, executar comandos curtos"}),e.jsx("td",{children:"—"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Insert"})}),e.jsxs("td",{children:[e.jsx("kbd",{children:"i"}),", ",e.jsx("kbd",{children:"I"}),", ",e.jsx("kbd",{children:"a"}),", ",e.jsx("kbd",{children:"A"}),", ",e.jsx("kbd",{children:"o"}),", ",e.jsx("kbd",{children:"O"})]}),e.jsx("td",{children:"Digitar texto livremente"}),e.jsxs("td",{children:[e.jsx("kbd",{children:"Esc"})," ou ",e.jsx("kbd",{children:"Ctrl-["})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Visual"})}),e.jsxs("td",{children:[e.jsx("kbd",{children:"v"})," (caractere), ",e.jsx("kbd",{children:"V"})," (linha), ",e.jsx("kbd",{children:"Ctrl-v"})," (bloco)"]}),e.jsx("td",{children:"Selecionar texto para operar"}),e.jsx("td",{children:e.jsx("kbd",{children:"Esc"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Command-line"})}),e.jsxs("td",{children:[e.jsx("kbd",{children:":"}),", ",e.jsx("kbd",{children:"/"}),", ",e.jsx("kbd",{children:"?"})]}),e.jsx("td",{children:"Comandos longos: salvar, sair, substituir, etc"}),e.jsxs("td",{children:[e.jsx("kbd",{children:"Enter"})," ou ",e.jsx("kbd",{children:"Esc"})]})]})]})]}),e.jsxs(r,{children:[e.jsx(i,{command:"vim hello.txt"}),e.jsx(s,{children:`# Você está agora dentro do Vim, em modo Normal.
# A barra de status inferior fica vazia.
# Pressione 'i' → aparece "-- INSERT --" embaixo. Digite normalmente.
# Pressione Esc → volta para Normal.
# Pressione ':' → cursor desce para a barra de comando, aguardando :w, :q, etc.`})]}),e.jsx("h2",{children:"3. Navegação em modo Normal"}),e.jsxs("p",{children:["A regra de ouro: ",e.jsx("strong",{children:"nunca use as setas"}),". Use ",e.jsx("kbd",{children:"h"})," ",e.jsx("kbd",{children:"j"})," ",e.jsx("kbd",{children:"k"})," ",e.jsx("kbd",{children:"l"}),". Parece bobo, mas é o que mantém suas mãos na home row."]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tecla"}),e.jsx("th",{children:"Ação"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"h"})," ",e.jsx("kbd",{children:"j"})," ",e.jsx("kbd",{children:"k"})," ",e.jsx("kbd",{children:"l"})]}),e.jsx("td",{children:"esquerda, baixo, cima, direita"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"w"})," / ",e.jsx("kbd",{children:"W"})]}),e.jsx("td",{children:"próxima palavra (W ignora pontuação)"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"b"})," / ",e.jsx("kbd",{children:"B"})]}),e.jsx("td",{children:"palavra anterior"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"e"})," / ",e.jsx("kbd",{children:"E"})]}),e.jsx("td",{children:"fim da palavra atual"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"0"})}),e.jsx("td",{children:"início da linha (coluna 1)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"^"})}),e.jsx("td",{children:"primeiro caractere não-branco da linha"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"$"})}),e.jsx("td",{children:"fim da linha"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"gg"})}),e.jsx("td",{children:"primeira linha do arquivo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"G"})}),e.jsx("td",{children:"última linha do arquivo"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"123G"})," ou ",e.jsx("kbd",{children:":123"})]}),e.jsx("td",{children:"vai para a linha 123"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"Ctrl-d"})," / ",e.jsx("kbd",{children:"Ctrl-u"})]}),e.jsx("td",{children:"meia tela para baixo / cima"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"Ctrl-f"})," / ",e.jsx("kbd",{children:"Ctrl-b"})]}),e.jsx("td",{children:"tela inteira para frente / trás"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"%"})}),e.jsxs("td",{children:["pula para o par ",e.jsx("code",{children:"("})," ",e.jsx("code",{children:")"})," ",e.jsx("code",{children:"["})," ",e.jsx("code",{children:"]"})," ",e.jsx("code",{children:"{"})," ",e.jsx("code",{children:"}"})]})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"{"})," / ",e.jsx("kbd",{children:"}"})]}),e.jsx("td",{children:"parágrafo anterior / próximo"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"*"})," / ",e.jsx("kbd",{children:"#"})]}),e.jsx("td",{children:"busca a palavra sob o cursor (frente / trás)"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"fX"})," / ",e.jsx("kbd",{children:"FX"})]}),e.jsx("td",{children:"vai para o próximo / anterior caractere X na linha"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"tX"})," / ",e.jsx("kbd",{children:"TX"})]}),e.jsx("td",{children:"vai até (antes de) o próximo / anterior X"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:";"})," / ",e.jsx("kbd",{children:","})]}),e.jsxs("td",{children:["repete o último ",e.jsx("kbd",{children:"f"}),"/",e.jsx("kbd",{children:"t"})," para frente / trás"]})]})]})]}),e.jsx("h3",{children:"3.1 Busca e localização"}),e.jsxs(r,{children:[e.jsx(i,{command:"vim /etc/passwd"}),e.jsx(s,{children:`# Em modo Normal:
# /root        Enter   → busca "root" para frente, cursor pula até a 1ª ocorrência
# n                    → próxima ocorrência
# N                    → ocorrência anterior
# ?bash        Enter   → busca "bash" para trás
# *                    → busca a palavra sob o cursor (palavra inteira)
# g*                   → idem, mas correspondência parcial`})]}),e.jsx("h2",{children:"4. Edição em modo Normal — o coração do Vim"}),e.jsxs("p",{children:["Toda edição em Vim segue o padrão ",e.jsx("code",{children:"[contagem][operador][movimento]"}),". Por exemplo: ",e.jsx("kbd",{children:"3dw"}),' = "delete 3 words". ',e.jsx("kbd",{children:"d$"}),' = "delete até o fim da linha". Esse vocabulário é o que torna Vim poderoso.']}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Operador"}),e.jsx("th",{children:"Significado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"d"})}),e.jsx("td",{children:"delete (recorta)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"c"})}),e.jsx("td",{children:"change (deleta + entra em Insert)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"y"})}),e.jsx("td",{children:"yank (copia)"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:">"})," / ",e.jsx("kbd",{children:"<"})]}),e.jsx("td",{children:"indenta para a direita / esquerda"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"="})}),e.jsx("td",{children:"auto-indenta"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"gu"})," / ",e.jsx("kbd",{children:"gU"})]}),e.jsx("td",{children:"minúsculas / maiúsculas"})]})]})]}),e.jsx("p",{children:"Combinados com movimentos:"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Combinação"}),e.jsx("th",{children:"O que faz"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"dd"})}),e.jsx("td",{children:"deleta a linha inteira"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"5dd"})}),e.jsx("td",{children:"deleta 5 linhas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"D"})}),e.jsxs("td",{children:["deleta do cursor até o fim da linha (= ",e.jsx("kbd",{children:"d$"}),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"dw"})}),e.jsx("td",{children:"deleta até o início da próxima palavra"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"diw"})}),e.jsxs("td",{children:["deleta a ",e.jsx("em",{children:"palavra inteira"})," sob o cursor"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:'di"'})}),e.jsx("td",{children:"deleta tudo dentro das aspas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"da("})}),e.jsxs("td",{children:["deleta tudo entre parênteses, ",e.jsx("em",{children:"incluindo"})," os parênteses"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("kbd",{children:["ci","{"]})}),e.jsxs("td",{children:["apaga conteúdo de ",e.jsx("code",{children:"{}"})," e entra em Insert"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"yy"})}),e.jsx("td",{children:"copia a linha"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"p"})," / ",e.jsx("kbd",{children:"P"})]}),e.jsx("td",{children:"cola depois / antes do cursor"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"x"})}),e.jsx("td",{children:"deleta o caractere sob o cursor"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"r<c>"})}),e.jsxs("td",{children:["substitui o caractere por ",e.jsx("kbd",{children:"c"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"u"})}),e.jsx("td",{children:"desfaz"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl-r"})}),e.jsx("td",{children:"refaz"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"."})}),e.jsx("td",{children:"repete a última edição (incrivelmente útil)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"J"})}),e.jsx("td",{children:"junta a linha de baixo na atual"})]})]})]}),e.jsxs(d,{type:"tip",title:"O famoso 'text objects'",children:[e.jsxs("p",{children:["O grande segredo do Vim moderno são os ",e.jsx("em",{children:"text objects"}),": ",e.jsx("kbd",{children:"i"})," (inner) e ",e.jsx("kbd",{children:"a"})," (around) combinados com delimitadores: ",e.jsx("kbd",{children:"w"})," palavra, ",e.jsx("kbd",{children:"s"})," sentença, ",e.jsx("kbd",{children:"p"})," parágrafo, ",e.jsx("kbd",{children:'"'})," ",e.jsx("kbd",{children:"'"})," ",e.jsx("kbd",{children:"`"})," aspas, ",e.jsx("kbd",{children:"("})," ",e.jsx("kbd",{children:"["})," ",e.jsx("kbd",{children:"{"})," blocos, ",e.jsx("kbd",{children:"t"})," tag HTML/XML."]}),e.jsxs("p",{children:["Exemplos: ",e.jsx("kbd",{children:"cit"}),' = "change inner tag" (apaga tudo dentro de uma tag HTML). ',e.jsxs("kbd",{children:["da","{"]}),' = "delete around braces". ',e.jsx("kbd",{children:'yi"'}),' = "yank inner double-quotes".']})]}),e.jsx("h2",{children:"5. Modo Insert — entrando para digitar"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tecla"}),e.jsx("th",{children:"O que faz"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"i"})}),e.jsx("td",{children:"insere antes do cursor"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"I"})}),e.jsx("td",{children:"insere no início da linha (não-branco)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"a"})}),e.jsx("td",{children:"insere depois do cursor (append)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"A"})}),e.jsx("td",{children:"insere no fim da linha"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"o"})}),e.jsx("td",{children:"abre nova linha abaixo e entra em Insert"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"O"})}),e.jsx("td",{children:"abre nova linha acima"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"s"})}),e.jsx("td",{children:"substitui o caractere e entra em Insert"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"S"})}),e.jsx("td",{children:"substitui a linha inteira"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"Ctrl-w"})," (em Insert)"]}),e.jsx("td",{children:"apaga a palavra anterior"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"Ctrl-u"})," (em Insert)"]}),e.jsx("td",{children:"apaga até o início da linha"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"Ctrl-n"})," / ",e.jsx("kbd",{children:"Ctrl-p"})]}),e.jsx("td",{children:"autocompletar (próximo / anterior)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl-r <reg>"})}),e.jsx("td",{children:"insere o conteúdo de um registrador"})]})]})]}),e.jsx("h2",{children:"6. Modo Visual — selecionar para operar"}),e.jsxs(r,{children:[e.jsx(i,{command:"vim /etc/nginx/nginx.conf"}),e.jsx(s,{children:`# Em Normal:
# v        → modo Visual caractere; mova com hjkl/w/b para selecionar
# V        → modo Visual linha (seleciona linhas inteiras)
# Ctrl-v   → modo Visual bloco (retangular — ÓTIMO para colunas!)
#
# Com seleção ativa:
#   d   → deleta a seleção
#   y   → copia a seleção
#   c   → deleta + Insert
#   >   → indenta para a direita
#   <   → indenta para a esquerda
#   =   → re-indenta
#   ~   → inverte case
#   u/U → tudo minúsculo / maiúsculo
#   :   → entra modo Command, já com '<,'> aplicado à seleção`})]}),e.jsxs("p",{children:["O modo Visual Bloco (",e.jsx("kbd",{children:"Ctrl-v"}),") é uma das funcionalidades mais poderosas: ele permite editar várias linhas ao mesmo tempo. Por exemplo, para comentar 10 linhas consecutivas em um arquivo Python:"]}),e.jsx(s,{children:`1. Posicione o cursor na coluna 1 da primeira linha
2. Pressione Ctrl-v
3. Pressione 9j  (estende a seleção 9 linhas para baixo)
4. Pressione I   (Insert no início do bloco)
5. Digite "# "  (espaço incluso)
6. Pressione Esc → todas as 10 linhas ganham o "# " na frente`}),e.jsx("h2",{children:"7. Modo Command-line — comandos longos"}),e.jsxs("p",{children:["Comandos iniciados por ",e.jsx("kbd",{children:":"})," são ",e.jsx("em",{children:"ex commands"})," (herdados do antigo editor ex). São o que você usa para salvar, sair, substituir, abrir arquivos, configurar opções."]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Comando"}),e.jsx("th",{children:"Ação"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":w"})}),e.jsx("td",{children:"salva (write)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":w nome.txt"})}),e.jsx("td",{children:"salva com outro nome"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":w !sudo tee %"})}),e.jsx("td",{children:"salva com sudo (truque clássico para arquivos protegidos)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":q"})}),e.jsx("td",{children:"sai"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":q!"})}),e.jsx("td",{children:"sai descartando alterações"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:":wq"})," ou ",e.jsx("code",{children:":x"})," ou ",e.jsx("kbd",{children:"ZZ"})]}),e.jsx("td",{children:"salva e sai"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":qa"})}),e.jsx("td",{children:"sai de todos os buffers"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":e arquivo"})}),e.jsx("td",{children:"abre outro arquivo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":e!"})}),e.jsx("td",{children:"recarrega do disco (descarta mudanças)"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:":bn"})," / ",e.jsx("code",{children:":bp"})]}),e.jsx("td",{children:"próximo / anterior buffer"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:":ls"})," ou ",e.jsx("code",{children:":buffers"})]}),e.jsx("td",{children:"lista buffers abertos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":b 3"})}),e.jsx("td",{children:"vai para o buffer 3"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":bd"})}),e.jsx("td",{children:"fecha o buffer atual"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":sp arquivo"})}),e.jsx("td",{children:"split horizontal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":vsp arquivo"})}),e.jsx("td",{children:"split vertical"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"Ctrl-w"})," + ",e.jsx("kbd",{children:"h/j/k/l"})]}),e.jsx("td",{children:"navega entre splits"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("kbd",{children:"Ctrl-w"})," + ",e.jsx("kbd",{children:"="})]}),e.jsx("td",{children:"iguala tamanhos das splits"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":tabnew"})}),e.jsx("td",{children:"nova tab"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"gt"})," / ",e.jsx("code",{children:"gT"})]}),e.jsx("td",{children:"próxima / anterior tab"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:":set number"})," / ",e.jsx("code",{children:":set nu!"})]}),e.jsx("td",{children:"liga / desliga numeração"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":set paste"})}),e.jsx("td",{children:"desliga auto-indent (cole sem destruir formatação)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":!comando"})}),e.jsx("td",{children:"executa comando shell sem sair do Vim"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:":r !date"})}),e.jsx("td",{children:"insere a saída de um comando no buffer"})]})]})]}),e.jsx("h3",{children:"7.1 Substituição (search and replace)"}),e.jsxs("p",{children:["A sintaxe é ",e.jsx("code",{children:":[range]s/padrão/substituto/[flags]"}),". Sem range, opera apenas na linha atual; com ",e.jsx("code",{children:"%"})," opera no arquivo inteiro."]}),e.jsxs(r,{children:[e.jsx(i,{command:"vim app.py"}),e.jsx(s,{children:`:s/foo/bar/                 → substitui a 1ª "foo" da linha atual
:s/foo/bar/g                → todas as "foo" da linha atual
:%s/foo/bar/g               → todas as "foo" do arquivo
:%s/foo/bar/gc              → idem, mas pede confirmação a cada ocorrência
:%s/\\<foo\\>/bar/g           → apenas a palavra inteira "foo"
:%s/^\\s*//                  → remove espaços do início de cada linha
:%s/\\s\\+$//                 → remove espaços/tabs no fim de cada linha
:5,20s/foo/bar/g            → entre as linhas 5 e 20
:'<,'>s/foo/bar/g           → na seleção visual (ex prefixa automaticamente '<,'>)
:%s/\\(\\w\\+\\)@\\(\\w\\+\\)/\\2@\\1/g  → troca user@host por host@user (grupos)`})]}),e.jsx("h2",{children:"8. Registradores e macros"}),e.jsxs("p",{children:['O Vim tem dezenas de "clipboards" chamados ',e.jsx("strong",{children:"registradores"}),". Quando você deleta com ",e.jsx("kbd",{children:"d"})," ou copia com ",e.jsx("kbd",{children:"y"}),", o conteúdo vai para o registrador sem nome (",e.jsx("code",{children:'""'}),"). Você pode escolher um registrador prefixando com"," ",e.jsx("code",{children:'"x'})," onde ",e.jsx("code",{children:"x"})," é uma letra."]}),e.jsx(s,{children:`"ayy        → copia a linha para o registrador 'a'
"ap         → cola o conteúdo do registrador 'a'
:reg        → mostra todos os registradores em uso
"+y         → copia para o clipboard do sistema (precisa vim-gtk3)
"+p         → cola do clipboard do sistema
"0          → último yank (não muda com deletes)
"_d         → "black hole": deleta SEM enviar ao clipboard`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Macros"})," são sequências gravadas de teclas. Comece com ",e.jsx("kbd",{children:"q<letra>"})," ","para gravar, faça as edições, pressione ",e.jsx("kbd",{children:"q"})," de novo para parar. Execute com",e.jsx("kbd",{children:"@<letra>"}),". Repita com ",e.jsx("kbd",{children:"@@"}),"."]}),e.jsxs(r,{children:[e.jsx(i,{command:"vim lista.txt"}),e.jsx(s,{children:`# Suponha que lista.txt tem:
#   alice
#   bob
#   carol
#
# Quero virar:
#   echo "Olá alice";
#   echo "Olá bob";
#   echo "Olá carol";
#
# 1. Posicione na primeira linha
# 2. qa                   → começa a gravar no registrador 'a'
# 3. I echo "Olá          → entra Insert, digita
# 4. <Esc>A";             → vai pro fim da linha, append, fecha
# 5. <Esc>j               → próxima linha
# 6. q                    → para a gravação
# 7. 2@a                  → executa a macro 2 vezes para as linhas restantes`})]}),e.jsx("h2",{children:"9. Configurando o ~/.vimrc"}),e.jsxs("p",{children:["O Vim padrão é deliberadamente minimalista. Para torná-lo agradável, criamos um arquivo"," ",e.jsx("code",{children:"~/.vimrc"})," com nossas opções. Eis um ",e.jsx("em",{children:"vimrc"})," moderno e equilibrado que serve como ótimo ponto de partida:"]}),e.jsx(n,{path:"~/.vimrc",children:`" =============================================================
" Configuração base do Vim — Termux 0.118
" =============================================================

" --- Comportamento geral ---
set nocompatible              " desliga modo legado vi
syntax on                     " syntax highlighting
filetype plugin indent on     " detecta tipo + plugins + indent automático
set encoding=utf-8
set fileencoding=utf-8
set hidden                    " permite trocar buffer sem salvar
set mouse=a                   " mouse funciona em todos os modos
set clipboard=unnamedplus     " yank vai pro clipboard do sistema
set updatetime=300            " mais responsivo
set timeoutlen=500            " timeout de mappings

" --- Aparência ---
set number                    " numeração
set relativenumber            " números relativos (incrível com hjkl)
set cursorline                " destaca a linha do cursor
set scrolloff=8               " mantém 8 linhas visíveis acima/abaixo
set sidescrolloff=8
set signcolumn=yes            " sempre mostra coluna de sinais
set termguicolors             " cores 24-bit
set background=dark
colorscheme habamax           " tema escuro built-in (Vim 9+)

" --- Indentação ---
set expandtab                 " tab vira espaços
set tabstop=4                 " tab visualmente = 4 espaços
set shiftwidth=4              " indent por nível = 4 espaços
set softtabstop=4
set autoindent
set smartindent

" --- Busca ---
set ignorecase                " busca case-insensitive
set smartcase                 " ... a menos que use maiúscula
set incsearch                 " mostra resultado enquanto digita
set hlsearch                  " destaca todas as ocorrências

" --- Splits ---
set splitright                " :vsp abre à direita
set splitbelow                " :sp abre embaixo

" --- Persistência ---
set undofile                  " mantém histórico de undo entre sessões
set undodir=~/.vim/undo//
set backupdir=~/.vim/backup//
set directory=~/.vim/swap//

" Cria diretórios se não existirem
for d in ['~/.vim/undo', '~/.vim/backup', '~/.vim/swap']
  if !isdirectory(expand(d))
    call mkdir(expand(d), 'p', 0700)
  endif
endfor

" =============================================================
" Mappings personalizados
" =============================================================

let mapleader = " "           " barra de espaço como leader

" Salvar / sair rapidamente
nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>
nnoremap <leader>x :x<CR>

" Limpa highlight da busca
nnoremap <leader><space> :nohlsearch<CR>

" Navegação entre splits sem Ctrl-w
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" Move linha selecionada para cima/baixo (Visual)
vnoremap J :m '>+1<CR>gv=gv
vnoremap K :m '<-2<CR>gv=gv

" Mantém seleção ao indentar
vnoremap < <gv
vnoremap > >gv

" Copia para o clipboard do sistema
vnoremap <leader>y "+y
nnoremap <leader>p "+p`}),e.jsxs(r,{children:[e.jsx(i,{command:"vim ~/.vimrc"}),e.jsx(s,{children:"# cole o conteúdo acima, salve com :w, recarregue com :so %"})]}),e.jsx("h2",{children:"10. Gerenciador de plugins: vim-plug"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"vim-plug"})," é o gerenciador de plugins mais popular pela simplicidade. Instale com um único comando:"]}),e.jsx(r,{children:e.jsx(i,{command:"curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim",output:`  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   148  100   148    0     0    734      0 --:--:-- --:--:-- --:--:--   738
100 32294  100 32294    0     0  85.5k      0 --:--:-- --:--:-- --:--:-- 85.5k`})}),e.jsxs("p",{children:["Adicione um bloco ",e.jsx("code",{children:"plug#begin/end"})," ao seu ",e.jsx("code",{children:"~/.vimrc"}),":"]}),e.jsx(n,{path:"~/.vimrc (trecho de plugins)",children:`" --- Plugins (vim-plug) ---
call plug#begin('~/.vim/plugged')

Plug 'preservim/nerdtree'                  " árvore de arquivos
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'                    " fuzzy finder
Plug 'tpope/vim-commentary'                " gcc/gc para comentar
Plug 'tpope/vim-surround'                  " cs"' troca aspas
Plug 'tpope/vim-fugitive'                  " :Git status / :Git diff
Plug 'airblade/vim-gitgutter'              " indicador de mudanças à esquerda
Plug 'vim-airline/vim-airline'             " statusline bonita
Plug 'vim-airline/vim-airline-themes'
Plug 'morhetz/gruvbox'                     " esquema de cores
Plug 'sheerun/vim-polyglot'                " syntax para 600+ linguagens
Plug 'dense-analysis/ale'                  " linter assíncrono
Plug 'neoclide/coc.nvim', {'branch': 'release'}  " LSP completo (Vim 8.1+)

call plug#end()

" Tema
colorscheme gruvbox

" Atalho NERDTree
nnoremap <leader>e :NERDTreeToggle<CR>

" Atalhos fzf
nnoremap <C-p> :Files<CR>
nnoremap <leader>f :Rg<CR>
nnoremap <leader>b :Buffers<CR>`}),e.jsx(r,{children:e.jsx(i,{command:"vim +PlugInstall +qall",output:`Updated. Elapsed time: 4.123 sec.
[==]
Finishing ... Done!
- Finishing ... Done!
- nerdtree: Cloned
- fzf: Cloned
- fzf.vim: Cloned
- vim-commentary: Cloned
- vim-surround: Cloned
- vim-fugitive: Cloned
- vim-gitgutter: Cloned
- vim-airline: Cloned
- vim-airline-themes: Cloned
- gruvbox: Cloned
- vim-polyglot: Cloned
- ale: Cloned
- coc.nvim: Cloned`})}),e.jsxs(d,{type:"info",title:"Comandos úteis do vim-plug",children:[e.jsx("code",{children:":PlugInstall"})," instala novos plugins listados."," ",e.jsx("code",{children:":PlugUpdate"})," atualiza todos."," ",e.jsx("code",{children:":PlugClean"})," remove plugins não listados."," ",e.jsx("code",{children:":PlugStatus"})," mostra estado."]}),e.jsx("h2",{children:"11. Neovim com Lua e lazy.nvim"}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Neovim"})," rompeu com o modelo de Vimscript adotando ",e.jsx("strong",{children:"Lua"})," ","como linguagem de configuração. Isso traz performance, modularidade e ecossistema moderno. A configuração vai em ",e.jsx("code",{children:"~/.config/nvim/init.lua"}),"."]}),e.jsx(r,{children:e.jsx(i,{command:"mkdir -p ~/.config/nvim && nvim ~/.config/nvim/init.lua"})}),e.jsx(n,{path:"~/.config/nvim/init.lua",children:`-- =============================================================
-- Neovim — init.lua mínimo e poderoso
-- =============================================================

-- Opções básicas
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.expandtab = true
vim.opt.tabstop = 2
vim.opt.shiftwidth = 2
vim.opt.smartindent = true
vim.opt.termguicolors = true
vim.opt.clipboard = "unnamedplus"
vim.opt.signcolumn = "yes"
vim.opt.scrolloff = 8
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.undofile = true
vim.g.mapleader = " "
vim.g.maplocalleader = " "

-- Bootstrap do lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git", "clone", "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- Plugins
require("lazy").setup({
  { "catppuccin/nvim", name = "catppuccin", priority = 1000,
    config = function() vim.cmd.colorscheme "catppuccin-mocha" end },

  { "nvim-treesitter/nvim-treesitter", build = ":TSUpdate",
    config = function()
      require("nvim-treesitter.configs").setup({
        ensure_installed = { "lua", "python", "javascript", "typescript",
                             "bash", "json", "yaml", "html", "css", "go", "rust" },
        highlight = { enable = true },
        indent = { enable = true },
      })
    end },

  { "nvim-telescope/telescope.nvim",
    dependencies = { "nvim-lua/plenary.nvim" },
    config = function()
      local t = require("telescope.builtin")
      vim.keymap.set("n", "<leader>ff", t.find_files)
      vim.keymap.set("n", "<leader>fg", t.live_grep)
      vim.keymap.set("n", "<leader>fb", t.buffers)
    end },

  { "neovim/nvim-lspconfig",
    config = function()
      local lsp = require("lspconfig")
      lsp.pyright.setup({})       -- Python
      lsp.tsserver.setup({})      -- TypeScript/JavaScript
      lsp.rust_analyzer.setup({}) -- Rust
      lsp.gopls.setup({})         -- Go
      lsp.lua_ls.setup({})        -- Lua
    end },

  { "hrsh7th/nvim-cmp",
    dependencies = { "hrsh7th/cmp-nvim-lsp", "L3MON4D3/LuaSnip" },
    config = function()
      local cmp = require("cmp")
      cmp.setup({
        sources = { { name = "nvim_lsp" }, { name = "luasnip" } },
        mapping = cmp.mapping.preset.insert({
          ["<CR>"]  = cmp.mapping.confirm({ select = true }),
          ["<Tab>"] = cmp.mapping.select_next_item(),
        }),
      })
    end },

  { "nvim-tree/nvim-tree.lua",
    config = function()
      require("nvim-tree").setup({})
      vim.keymap.set("n", "<leader>e", ":NvimTreeToggle<CR>")
    end },

  { "lewis6991/gitsigns.nvim", config = true },
  { "nvim-lualine/lualine.nvim", config = true },
})`}),e.jsxs(r,{children:[e.jsx(i,{command:"nvim",output:`# Ao abrir pela 1ª vez, o lazy.nvim clona-se sozinho e instala todos os plugins.
# Aguarde a janela "Lazy" mostrar tudo verde, então :q.
# Use :Lazy para gerenciar.
# Use :LspInfo para ver servidores LSP rodando.
# Use :checkhealth para diagnóstico completo.`}),e.jsx(i,{command:"nvim --headless '+Lazy! sync' +qa",output:`[lazy.nvim] loading plugin specs...
[lazy.nvim] installed 11 plugins`,comment:"Pode ser usado em scripts/CI"})]}),e.jsx("h2",{children:"12. LSP, autocompletar e diagnostics"}),e.jsxs("p",{children:["Com ",e.jsx("code",{children:"nvim-lspconfig"})," + ",e.jsx("code",{children:"nvim-cmp"}),", o Neovim vira um IDE completo. Para Python instale o servidor:"]}),e.jsxs(r,{children:[e.jsx(i,{command:"pip install --user pyright",output:`Collecting pyright
  Downloading pyright-1.1.380-py3-none-any.whl (5.6 kB)
Installing collected packages: pyright
Successfully installed pyright-1.1.380`}),e.jsx(i,{command:"nvim hello.py"}),e.jsx(s,{children:`# Dentro do Neovim, abra qualquer arquivo .py:
# - As setas/letras aparecem com cores via Treesitter
# - Erros aparecem no signcolumn (■ vermelho à esquerda)
# - Coloque o cursor numa função → "K" mostra documentação
# - "gd" pula para a definição
# - "gr" lista referências
# - "<leader>rn" renomeia em todo o projeto
# - Ctrl-Space abre o menu de autocompletar`})]}),e.jsx(d,{type:"success",title:"Neovim como IDE",children:"Com Treesitter (parsing), LSP (intelligence), Telescope (busca fuzzy), nvim-cmp (autocompletar) e gitsigns (Git), o Neovim atinge paridade prática com VS Code para 90% dos casos — e roda em SSH em qualquer servidor sem latência de GUI."}),e.jsx("h2",{children:"13. Sobrevivendo: como sair do Vim 😄"}),e.jsx("p",{children:"A piada mais antiga da computação. Anote no espelho:"}),e.jsx(s,{children:`Esc      → garante que está em modo Normal
:q       → sai (se não houver alterações)
:q!      → sai e descarta tudo
:wq      → salva e sai
ZZ       → atalho equivalente a :wq
ZQ       → atalho equivalente a :q!`}),e.jsx("h2",{children:"14. Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Execute ",e.jsx("code",{children:"vimtutor"})," no terminal — tutorial oficial de 30 min com prática real."]}),e.jsxs("li",{children:["Aprenda ",e.jsx("code",{children:":help text-objects"}),", ",e.jsx("code",{children:":help motion"}),", ",e.jsx("code",{children:":help registers"}),"."]}),e.jsx("li",{children:"Estude um plugin por semana, não 20 de uma vez."}),e.jsxs("li",{children:["Para Neovim avançado: ",e.jsx("a",{href:"https://github.com/LazyVim/LazyVim",children:"LazyVim"})," e ",e.jsx("a",{href:"https://nvchad.com/",children:"NvChad"})," são distros pré-configuradas excelentes."]})]})]})}export{x as default};

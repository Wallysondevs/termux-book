import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, Output, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Vim() {
  return (
    <PageContainer
      title="Vim e Neovim"
      subtitle="O editor modal que sobreviveu décadas e ainda domina servidores e estações de desenvolvedores no mundo todo."
      difficulty="intermediario"
      timeToRead="50 min"
      category="Desenvolvimento"
    >
      <p>
        O <strong>Vim</strong> (Vi IMproved) é o sucessor moderno do <code>vi</code>, o editor que
        acompanha praticamente toda instalação UNIX desde os anos 70. No Termux 0.118, o Vim vem
        pré-instalado em modo <em>tiny</em> (apenas o suficiente para edição básica de arquivos
        de configuração); para tirar proveito real, instalamos o pacote <code>vim</code> completo
        ou o <strong>Neovim</strong>, fork moderno escrito em C com suporte nativo a Lua e LSP.
      </p>

      <p>
        A grande característica do Vim é ser um <strong>editor modal</strong>: ao contrário do
        nano, do gedit ou do VS Code, em que tudo o que você digita vai parar no arquivo, no Vim
        cada tecla pode ter dezenas de significados dependendo do <em>modo</em> em que você está.
        Esse paradigma assusta no início, mas após algumas semanas é o que torna a edição de
        texto absurdamente rápida — porque suas mãos nunca saem da fileira do meio do teclado.
      </p>

      <h2>1. Instalação no Termux 0.118</h2>

      <p>
        Vamos começar verificando o que já vem instalado e depois instalar a versão completa.
        Em uma instalação Termux padrão, você terá apenas o <code>vim-tiny</code>, que é
        o binário <code>/usr/bin/vi</code> e mostra a mensagem <em>"Sorry, the command is not
        available in this version"</em> para muitos comandos avançados.
      </p>

      <Terminal title="wallyson@termux: ~">
        <Command command="which vi vim nvim" output={`/usr/bin/vi
/usr/bin/vim`} comment="Verifica o que já está instalado" />

        <Command command="dpkg -l | grep -E 'vim|neovim'" output={`ii  vim-common         2:9.1.0016-termux.4   all          Vi IMproved - Common files
ii  vim-tiny           2:9.1.0016-termux.4   amd64        Vi IMproved - enhanced vi editor - compact version
ii  xxd                2:9.1.0016-termux.4   amd64        tool to make (or reverse) a hex dump`} />

        <Command root command="pkg install -y vim neovim" output={`Reading package lists... Done
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
Processing triggers for man-db (2.12.0-4build2) ...`} />

        <Command command="vim --version | head -3" output={`VIM - Vi IMproved 9.1 (2024 Jan 02, compiled May 22 2025 16:30:11)
Included patches: 1-16, 24-1418
Modified by team+vim@tracker.debian.org`} />

        <Command command="nvim --version | head -3" output={`NVIM v0.9.5
Build type: RelWithDebInfo
LuaJIT 2.1.1703358377`} />
      </Terminal>

      <InfoBox type="tip" title="Versões mais novas do Neovim">
        O Neovim no repositório padrão é a 0.9.5; a versão estável atual em 2025 é a 0.10.x.
        Para a versão mais recente, use o <code>PPA neovim-ppa/unstable</code> ou baixe o AppImage
        oficial em <code>github.com/neovim/neovim/releases</code>.
      </InfoBox>

      <h3>1.1 Definir o editor padrão do sistema</h3>

      <Terminal>
        <Command root command="update-alternatives --config editor" output={`There are 4 choices for the alternative editor (providing /usr/bin/editor).

  Selection    Path                Priority   Status
------------------------------------------------------------
* 0            /bin/nano            40        auto mode
  1            /bin/ed             -100       manual mode
  2            /bin/nano            40        manual mode
  3            /usr/bin/vim.basic   30        manual mode
  4            /usr/bin/vim.tiny    15        manual mode

Press <enter> to keep the current choice[*], or type selection number: 3
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/editor (editor) in manual mode`} />

        <Command command='echo "export EDITOR=vim" >> ~/.bashrc && source ~/.bashrc' />
        <Command command="echo $EDITOR" output="vim" />
      </Terminal>

      <h2>2. Os 4 modos do Vim</h2>

      <p>
        Entender os modos é entender o Vim. A confusão clássica do iniciante (digitar texto e
        ver letras virando comandos aleatórios) sempre vem de estar no modo errado.
      </p>

      <table>
        <thead>
          <tr>
            <th>Modo</th>
            <th>Como entrar</th>
            <th>Para que serve</th>
            <th>Sair</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Normal</strong></td><td>É o padrão ao abrir; <kbd>Esc</kbd> de qualquer modo</td><td>Navegar, deletar, copiar, colar, executar comandos curtos</td><td>—</td></tr>
          <tr><td><strong>Insert</strong></td><td><kbd>i</kbd>, <kbd>I</kbd>, <kbd>a</kbd>, <kbd>A</kbd>, <kbd>o</kbd>, <kbd>O</kbd></td><td>Digitar texto livremente</td><td><kbd>Esc</kbd> ou <kbd>Ctrl-[</kbd></td></tr>
          <tr><td><strong>Visual</strong></td><td><kbd>v</kbd> (caractere), <kbd>V</kbd> (linha), <kbd>Ctrl-v</kbd> (bloco)</td><td>Selecionar texto para operar</td><td><kbd>Esc</kbd></td></tr>
          <tr><td><strong>Command-line</strong></td><td><kbd>:</kbd>, <kbd>/</kbd>, <kbd>?</kbd></td><td>Comandos longos: salvar, sair, substituir, etc</td><td><kbd>Enter</kbd> ou <kbd>Esc</kbd></td></tr>
        </tbody>
      </table>

      <Terminal>
        <Command command="vim hello.txt" />
        <Output>{`# Você está agora dentro do Vim, em modo Normal.
# A barra de status inferior fica vazia.
# Pressione 'i' → aparece "-- INSERT --" embaixo. Digite normalmente.
# Pressione Esc → volta para Normal.
# Pressione ':' → cursor desce para a barra de comando, aguardando :w, :q, etc.`}</Output>
      </Terminal>

      <h2>3. Navegação em modo Normal</h2>

      <p>
        A regra de ouro: <strong>nunca use as setas</strong>. Use <kbd>h</kbd> <kbd>j</kbd>{" "}
        <kbd>k</kbd> <kbd>l</kbd>. Parece bobo, mas é o que mantém suas mãos na home row.
      </p>

      <table>
        <thead><tr><th>Tecla</th><th>Ação</th></tr></thead>
        <tbody>
          <tr><td><kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd></td><td>esquerda, baixo, cima, direita</td></tr>
          <tr><td><kbd>w</kbd> / <kbd>W</kbd></td><td>próxima palavra (W ignora pontuação)</td></tr>
          <tr><td><kbd>b</kbd> / <kbd>B</kbd></td><td>palavra anterior</td></tr>
          <tr><td><kbd>e</kbd> / <kbd>E</kbd></td><td>fim da palavra atual</td></tr>
          <tr><td><kbd>0</kbd></td><td>início da linha (coluna 1)</td></tr>
          <tr><td><kbd>^</kbd></td><td>primeiro caractere não-branco da linha</td></tr>
          <tr><td><kbd>$</kbd></td><td>fim da linha</td></tr>
          <tr><td><kbd>gg</kbd></td><td>primeira linha do arquivo</td></tr>
          <tr><td><kbd>G</kbd></td><td>última linha do arquivo</td></tr>
          <tr><td><kbd>123G</kbd> ou <kbd>:123</kbd></td><td>vai para a linha 123</td></tr>
          <tr><td><kbd>Ctrl-d</kbd> / <kbd>Ctrl-u</kbd></td><td>meia tela para baixo / cima</td></tr>
          <tr><td><kbd>Ctrl-f</kbd> / <kbd>Ctrl-b</kbd></td><td>tela inteira para frente / trás</td></tr>
          <tr><td><kbd>%</kbd></td><td>pula para o par <code>(</code> <code>)</code> <code>[</code> <code>]</code> <code>{`{`}</code> <code>{`}`}</code></td></tr>
          <tr><td><kbd>{`{`}</kbd> / <kbd>{`}`}</kbd></td><td>parágrafo anterior / próximo</td></tr>
          <tr><td><kbd>*</kbd> / <kbd>#</kbd></td><td>busca a palavra sob o cursor (frente / trás)</td></tr>
          <tr><td><kbd>fX</kbd> / <kbd>FX</kbd></td><td>vai para o próximo / anterior caractere X na linha</td></tr>
          <tr><td><kbd>tX</kbd> / <kbd>TX</kbd></td><td>vai até (antes de) o próximo / anterior X</td></tr>
          <tr><td><kbd>;</kbd> / <kbd>,</kbd></td><td>repete o último <kbd>f</kbd>/<kbd>t</kbd> para frente / trás</td></tr>
        </tbody>
      </table>

      <h3>3.1 Busca e localização</h3>

      <Terminal>
        <Command command="vim /etc/passwd" />
        <Output>{`# Em modo Normal:
# /root        Enter   → busca "root" para frente, cursor pula até a 1ª ocorrência
# n                    → próxima ocorrência
# N                    → ocorrência anterior
# ?bash        Enter   → busca "bash" para trás
# *                    → busca a palavra sob o cursor (palavra inteira)
# g*                   → idem, mas correspondência parcial`}</Output>
      </Terminal>

      <h2>4. Edição em modo Normal — o coração do Vim</h2>

      <p>
        Toda edição em Vim segue o padrão <code>[contagem][operador][movimento]</code>. Por
        exemplo: <kbd>3dw</kbd> = "delete 3 words". <kbd>d$</kbd> = "delete até o fim da linha".
        Esse vocabulário é o que torna Vim poderoso.
      </p>

      <table>
        <thead><tr><th>Operador</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><kbd>d</kbd></td><td>delete (recorta)</td></tr>
          <tr><td><kbd>c</kbd></td><td>change (deleta + entra em Insert)</td></tr>
          <tr><td><kbd>y</kbd></td><td>yank (copia)</td></tr>
          <tr><td><kbd>{`>`}</kbd> / <kbd>{`<`}</kbd></td><td>indenta para a direita / esquerda</td></tr>
          <tr><td><kbd>=</kbd></td><td>auto-indenta</td></tr>
          <tr><td><kbd>gu</kbd> / <kbd>gU</kbd></td><td>minúsculas / maiúsculas</td></tr>
        </tbody>
      </table>

      <p>Combinados com movimentos:</p>

      <table>
        <thead><tr><th>Combinação</th><th>O que faz</th></tr></thead>
        <tbody>
          <tr><td><kbd>dd</kbd></td><td>deleta a linha inteira</td></tr>
          <tr><td><kbd>5dd</kbd></td><td>deleta 5 linhas</td></tr>
          <tr><td><kbd>D</kbd></td><td>deleta do cursor até o fim da linha (= <kbd>d$</kbd>)</td></tr>
          <tr><td><kbd>dw</kbd></td><td>deleta até o início da próxima palavra</td></tr>
          <tr><td><kbd>diw</kbd></td><td>deleta a <em>palavra inteira</em> sob o cursor</td></tr>
          <tr><td><kbd>di"</kbd></td><td>deleta tudo dentro das aspas</td></tr>
          <tr><td><kbd>da(</kbd></td><td>deleta tudo entre parênteses, <em>incluindo</em> os parênteses</td></tr>
          <tr><td><kbd>ci{`{`}</kbd></td><td>apaga conteúdo de <code>{`{}`}</code> e entra em Insert</td></tr>
          <tr><td><kbd>yy</kbd></td><td>copia a linha</td></tr>
          <tr><td><kbd>p</kbd> / <kbd>P</kbd></td><td>cola depois / antes do cursor</td></tr>
          <tr><td><kbd>x</kbd></td><td>deleta o caractere sob o cursor</td></tr>
          <tr><td><kbd>r&lt;c&gt;</kbd></td><td>substitui o caractere por <kbd>c</kbd></td></tr>
          <tr><td><kbd>u</kbd></td><td>desfaz</td></tr>
          <tr><td><kbd>Ctrl-r</kbd></td><td>refaz</td></tr>
          <tr><td><kbd>.</kbd></td><td>repete a última edição (incrivelmente útil)</td></tr>
          <tr><td><kbd>J</kbd></td><td>junta a linha de baixo na atual</td></tr>
        </tbody>
      </table>

      <InfoBox type="tip" title="O famoso 'text objects'">
        <p>O grande segredo do Vim moderno são os <em>text objects</em>: <kbd>i</kbd> (inner) e <kbd>a</kbd> (around) combinados com delimitadores: <kbd>w</kbd> palavra, <kbd>s</kbd> sentença, <kbd>p</kbd> parágrafo, <kbd>"</kbd> <kbd>'</kbd> <kbd>`</kbd> aspas, <kbd>(</kbd> <kbd>[</kbd> <kbd>{`{`}</kbd> blocos, <kbd>t</kbd> tag HTML/XML.</p>
        <p>Exemplos: <kbd>cit</kbd> = "change inner tag" (apaga tudo dentro de uma tag HTML). <kbd>da{`{`}</kbd> = "delete around braces". <kbd>yi"</kbd> = "yank inner double-quotes".</p>
      </InfoBox>

      <h2>5. Modo Insert — entrando para digitar</h2>

      <table>
        <thead><tr><th>Tecla</th><th>O que faz</th></tr></thead>
        <tbody>
          <tr><td><kbd>i</kbd></td><td>insere antes do cursor</td></tr>
          <tr><td><kbd>I</kbd></td><td>insere no início da linha (não-branco)</td></tr>
          <tr><td><kbd>a</kbd></td><td>insere depois do cursor (append)</td></tr>
          <tr><td><kbd>A</kbd></td><td>insere no fim da linha</td></tr>
          <tr><td><kbd>o</kbd></td><td>abre nova linha abaixo e entra em Insert</td></tr>
          <tr><td><kbd>O</kbd></td><td>abre nova linha acima</td></tr>
          <tr><td><kbd>s</kbd></td><td>substitui o caractere e entra em Insert</td></tr>
          <tr><td><kbd>S</kbd></td><td>substitui a linha inteira</td></tr>
          <tr><td><kbd>Ctrl-w</kbd> (em Insert)</td><td>apaga a palavra anterior</td></tr>
          <tr><td><kbd>Ctrl-u</kbd> (em Insert)</td><td>apaga até o início da linha</td></tr>
          <tr><td><kbd>Ctrl-n</kbd> / <kbd>Ctrl-p</kbd></td><td>autocompletar (próximo / anterior)</td></tr>
          <tr><td><kbd>Ctrl-r &lt;reg&gt;</kbd></td><td>insere o conteúdo de um registrador</td></tr>
        </tbody>
      </table>

      <h2>6. Modo Visual — selecionar para operar</h2>

      <Terminal>
        <Command command="vim /etc/nginx/nginx.conf" />
        <Output>{`# Em Normal:
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
#   :   → entra modo Command, já com '<,'> aplicado à seleção`}</Output>
      </Terminal>

      <p>
        O modo Visual Bloco (<kbd>Ctrl-v</kbd>) é uma das funcionalidades mais poderosas:
        ele permite editar várias linhas ao mesmo tempo. Por exemplo, para comentar 10 linhas
        consecutivas em um arquivo Python:
      </p>

      <Output>{`1. Posicione o cursor na coluna 1 da primeira linha
2. Pressione Ctrl-v
3. Pressione 9j  (estende a seleção 9 linhas para baixo)
4. Pressione I   (Insert no início do bloco)
5. Digite "# "  (espaço incluso)
6. Pressione Esc → todas as 10 linhas ganham o "# " na frente`}</Output>

      <h2>7. Modo Command-line — comandos longos</h2>

      <p>
        Comandos iniciados por <kbd>:</kbd> são <em>ex commands</em> (herdados do antigo editor
        ex). São o que você usa para salvar, sair, substituir, abrir arquivos, configurar opções.
      </p>

      <table>
        <thead><tr><th>Comando</th><th>Ação</th></tr></thead>
        <tbody>
          <tr><td><code>:w</code></td><td>salva (write)</td></tr>
          <tr><td><code>:w nome.txt</code></td><td>salva com outro nome</td></tr>
          <tr><td><code>:w !sudo tee %</code></td><td>salva com sudo (truque clássico para arquivos protegidos)</td></tr>
          <tr><td><code>:q</code></td><td>sai</td></tr>
          <tr><td><code>:q!</code></td><td>sai descartando alterações</td></tr>
          <tr><td><code>:wq</code> ou <code>:x</code> ou <kbd>ZZ</kbd></td><td>salva e sai</td></tr>
          <tr><td><code>:qa</code></td><td>sai de todos os buffers</td></tr>
          <tr><td><code>:e arquivo</code></td><td>abre outro arquivo</td></tr>
          <tr><td><code>:e!</code></td><td>recarrega do disco (descarta mudanças)</td></tr>
          <tr><td><code>:bn</code> / <code>:bp</code></td><td>próximo / anterior buffer</td></tr>
          <tr><td><code>:ls</code> ou <code>:buffers</code></td><td>lista buffers abertos</td></tr>
          <tr><td><code>:b 3</code></td><td>vai para o buffer 3</td></tr>
          <tr><td><code>:bd</code></td><td>fecha o buffer atual</td></tr>
          <tr><td><code>:sp arquivo</code></td><td>split horizontal</td></tr>
          <tr><td><code>:vsp arquivo</code></td><td>split vertical</td></tr>
          <tr><td><kbd>Ctrl-w</kbd> + <kbd>h/j/k/l</kbd></td><td>navega entre splits</td></tr>
          <tr><td><kbd>Ctrl-w</kbd> + <kbd>=</kbd></td><td>iguala tamanhos das splits</td></tr>
          <tr><td><code>:tabnew</code></td><td>nova tab</td></tr>
          <tr><td><code>gt</code> / <code>gT</code></td><td>próxima / anterior tab</td></tr>
          <tr><td><code>:set number</code> / <code>:set nu!</code></td><td>liga / desliga numeração</td></tr>
          <tr><td><code>:set paste</code></td><td>desliga auto-indent (cole sem destruir formatação)</td></tr>
          <tr><td><code>:!comando</code></td><td>executa comando shell sem sair do Vim</td></tr>
          <tr><td><code>:r !date</code></td><td>insere a saída de um comando no buffer</td></tr>
        </tbody>
      </table>

      <h3>7.1 Substituição (search and replace)</h3>

      <p>
        A sintaxe é <code>:[range]s/padrão/substituto/[flags]</code>. Sem range, opera apenas
        na linha atual; com <code>%</code> opera no arquivo inteiro.
      </p>

      <Terminal>
        <Command command="vim app.py" />
        <Output>{`:s/foo/bar/                 → substitui a 1ª "foo" da linha atual
:s/foo/bar/g                → todas as "foo" da linha atual
:%s/foo/bar/g               → todas as "foo" do arquivo
:%s/foo/bar/gc              → idem, mas pede confirmação a cada ocorrência
:%s/\\<foo\\>/bar/g           → apenas a palavra inteira "foo"
:%s/^\\s*//                  → remove espaços do início de cada linha
:%s/\\s\\+$//                 → remove espaços/tabs no fim de cada linha
:5,20s/foo/bar/g            → entre as linhas 5 e 20
:'<,'>s/foo/bar/g           → na seleção visual (ex prefixa automaticamente '<,'>)
:%s/\\(\\w\\+\\)@\\(\\w\\+\\)/\\2@\\1/g  → troca user@host por host@user (grupos)`}</Output>
      </Terminal>

      <h2>8. Registradores e macros</h2>

      <p>
        O Vim tem dezenas de "clipboards" chamados <strong>registradores</strong>. Quando você
        deleta com <kbd>d</kbd> ou copia com <kbd>y</kbd>, o conteúdo vai para o registrador
        sem nome (<code>""</code>). Você pode escolher um registrador prefixando com{" "}
        <code>"x</code> onde <code>x</code> é uma letra.
      </p>

      <Output>{`"ayy        → copia a linha para o registrador 'a'
"ap         → cola o conteúdo do registrador 'a'
:reg        → mostra todos os registradores em uso
"+y         → copia para o clipboard do sistema (precisa vim-gtk3)
"+p         → cola do clipboard do sistema
"0          → último yank (não muda com deletes)
"_d         → "black hole": deleta SEM enviar ao clipboard`}</Output>

      <p>
        <strong>Macros</strong> são sequências gravadas de teclas. Comece com <kbd>q&lt;letra&gt;</kbd>{" "}
        para gravar, faça as edições, pressione <kbd>q</kbd> de novo para parar. Execute com
        <kbd>@&lt;letra&gt;</kbd>. Repita com <kbd>@@</kbd>.
      </p>

      <Terminal>
        <Command command="vim lista.txt" />
        <Output>{`# Suponha que lista.txt tem:
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
# 7. 2@a                  → executa a macro 2 vezes para as linhas restantes`}</Output>
      </Terminal>

      <h2>9. Configurando o ~/.vimrc</h2>

      <p>
        O Vim padrão é deliberadamente minimalista. Para torná-lo agradável, criamos um arquivo{" "}
        <code>~/.vimrc</code> com nossas opções. Eis um <em>vimrc</em> moderno e equilibrado
        que serve como ótimo ponto de partida:
      </p>

      <File path="~/.vimrc">
{`" =============================================================
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
nnoremap <leader>p "+p`}
      </File>

      <Terminal>
        <Command command="vim ~/.vimrc" />
        <Output>{`# cole o conteúdo acima, salve com :w, recarregue com :so %`}</Output>
      </Terminal>

      <h2>10. Gerenciador de plugins: vim-plug</h2>

      <p>
        O <code>vim-plug</code> é o gerenciador de plugins mais popular pela simplicidade.
        Instale com um único comando:
      </p>

      <Terminal>
        <Command command="curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim" output={`  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   148  100   148    0     0    734      0 --:--:-- --:--:-- --:--:--   738
100 32294  100 32294    0     0  85.5k      0 --:--:-- --:--:-- --:--:-- 85.5k`} />
      </Terminal>

      <p>
        Adicione um bloco <code>plug#begin/end</code> ao seu <code>~/.vimrc</code>:
      </p>

      <File path="~/.vimrc (trecho de plugins)">
{`" --- Plugins (vim-plug) ---
call plug#begin('~/.vim/plugged')

Plug 'preservim/nerdtree'                  " árvore de arquivos
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'                    " fuzzy finder
Plug 'tpope/vim-commentary'                " gcc/gc para comentar
Plug 'tpope/vim-surround'                  " cs\"' troca aspas
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
nnoremap <leader>b :Buffers<CR>`}
      </File>

      <Terminal>
        <Command command="vim +PlugInstall +qall" output={`Updated. Elapsed time: 4.123 sec.
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
- coc.nvim: Cloned`} />
      </Terminal>

      <InfoBox type="info" title="Comandos úteis do vim-plug">
        <code>:PlugInstall</code> instala novos plugins listados.{" "}
        <code>:PlugUpdate</code> atualiza todos.{" "}
        <code>:PlugClean</code> remove plugins não listados.{" "}
        <code>:PlugStatus</code> mostra estado.
      </InfoBox>

      <h2>11. Neovim com Lua e lazy.nvim</h2>

      <p>
        O <strong>Neovim</strong> rompeu com o modelo de Vimscript adotando <strong>Lua</strong>{" "}
        como linguagem de configuração. Isso traz performance, modularidade e ecossistema moderno.
        A configuração vai em <code>~/.config/nvim/init.lua</code>.
      </p>

      <Terminal>
        <Command command="mkdir -p ~/.config/nvim && nvim ~/.config/nvim/init.lua" />
      </Terminal>

      <File path="~/.config/nvim/init.lua">
{`-- =============================================================
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
})`}
      </File>

      <Terminal>
        <Command command="nvim" output={`# Ao abrir pela 1ª vez, o lazy.nvim clona-se sozinho e instala todos os plugins.
# Aguarde a janela "Lazy" mostrar tudo verde, então :q.
# Use :Lazy para gerenciar.
# Use :LspInfo para ver servidores LSP rodando.
# Use :checkhealth para diagnóstico completo.`} />

        <Command command="nvim --headless '+Lazy! sync' +qa" output={`[lazy.nvim] loading plugin specs...
[lazy.nvim] installed 11 plugins`} comment="Pode ser usado em scripts/CI" />
      </Terminal>

      <h2>12. LSP, autocompletar e diagnostics</h2>

      <p>
        Com <code>nvim-lspconfig</code> + <code>nvim-cmp</code>, o Neovim vira um IDE completo.
        Para Python instale o servidor:
      </p>

      <Terminal>
        <Command command="pip install --user pyright" output={`Collecting pyright
  Downloading pyright-1.1.380-py3-none-any.whl (5.6 kB)
Installing collected packages: pyright
Successfully installed pyright-1.1.380`} />

        <Command command="nvim hello.py" />
        <Output>{`# Dentro do Neovim, abra qualquer arquivo .py:
# - As setas/letras aparecem com cores via Treesitter
# - Erros aparecem no signcolumn (■ vermelho à esquerda)
# - Coloque o cursor numa função → "K" mostra documentação
# - "gd" pula para a definição
# - "gr" lista referências
# - "<leader>rn" renomeia em todo o projeto
# - Ctrl-Space abre o menu de autocompletar`}</Output>
      </Terminal>

      <InfoBox type="success" title="Neovim como IDE">
        Com Treesitter (parsing), LSP (intelligence), Telescope (busca fuzzy), nvim-cmp
        (autocompletar) e gitsigns (Git), o Neovim atinge paridade prática com VS Code para
        90% dos casos — e roda em SSH em qualquer servidor sem latência de GUI.
      </InfoBox>

      <h2>13. Sobrevivendo: como sair do Vim 😄</h2>

      <p>
        A piada mais antiga da computação. Anote no espelho:
      </p>

      <Output>{`Esc      → garante que está em modo Normal
:q       → sai (se não houver alterações)
:q!      → sai e descarta tudo
:wq      → salva e sai
ZZ       → atalho equivalente a :wq
ZQ       → atalho equivalente a :q!`}</Output>

      <h2>14. Próximos passos</h2>

      <ul>
        <li>Execute <code>vimtutor</code> no terminal — tutorial oficial de 30 min com prática real.</li>
        <li>Aprenda <code>:help text-objects</code>, <code>:help motion</code>, <code>:help registers</code>.</li>
        <li>Estude um plugin por semana, não 20 de uma vez.</li>
        <li>Para Neovim avançado: <a href="https://github.com/LazyVim/LazyVim">LazyVim</a> e <a href="https://nvchad.com/">NvChad</a> são distros pré-configuradas excelentes.</li>
      </ul>
    </PageContainer>
  );
}

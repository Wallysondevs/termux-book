import{j as e}from"./index-d-w5ROEn.js";import{P as i}from"./PageContainer-t8f2nTRw.js";import{T as r,C as s,F as t,O as n}from"./Terminal-B39pZIiO.js";import{I as o}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function x(){return e.jsxs(i,{title:"Visual Studio Code",subtitle:"O editor de código mais usado do planeta — instalação correta no Termux, customização, extensões essenciais e desenvolvimento remoto.",difficulty:"iniciante",timeToRead:"40 min",category:"Desenvolvimento",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Visual Studio Code"})," (ou apenas ",e.jsx("em",{children:"VS Code"}),") é o editor de código open source da Microsoft, baseado no framework Electron. Apesar de ser distribuído também como Snap no Termux, a forma ",e.jsx("strong",{children:"oficialmente recomendada"})," é instalar a versão ",e.jsx("code",{children:".deb"})," do repositório oficial da Microsoft, que traz integração mais rápida com o sistema, ícones nativos, melhor inicialização e atualizações via"," ",e.jsx("code",{children:"apt"})," junto com os outros pacotes do sistema."]}),e.jsxs("p",{children:["Nesta página vamos cobrir: instalação a partir do repositório Microsoft (com chave GPG), instalação alternativa via Snap, configuração inicial do ",e.jsx("code",{children:"settings.json"}),", atalhos essenciais, extensões obrigatórias, depuração com ",e.jsx("code",{children:"launch.json"}),", tarefas com ",e.jsx("code",{children:"tasks.json"})," e o ecossistema de Desenvolvimento Remoto (SSH, Containers, WSL)."]}),e.jsx("h2",{children:"1. Instalação via repositório oficial Microsoft"}),e.jsxs("p",{children:["O passo-a-passo abaixo configura o keyring moderno (",e.jsx("code",{children:"signed-by"}),") em vez do antigo ",e.jsx("code",{children:"apt-key"}),", que está deprecado desde o Termux 0.118."]}),e.jsxs(r,{title:"wallyson@termux: ~",children:[e.jsx(s,{root:!0,command:"pkg install -y wget gpg apt-transport-https",output:`Reading package lists... Done
Building dependency tree... Done
gpg is already the newest version (2.4.4-termux.2).
wget is already the newest version (1.21.4-termux.1).
The following NEW packages will be installed:
  apt-transport-https
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.`}),e.jsx(s,{command:"wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg",comment:"Baixa e converte a chave PGP da Microsoft"}),e.jsx(s,{root:!0,command:"install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg",comment:"Move a chave para o local oficial /etc/apt/keyrings"}),e.jsx(s,{root:!0,command:`sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'`,comment:"Cria o sources.list apontando ao repositório do VS Code"}),e.jsx(s,{command:"rm packages.microsoft.gpg"}),e.jsx(s,{root:!0,command:"pkg update",output:`Hit:1 http://packages.termux.dev/apt/termux-main noble InRelease
Hit:2 http://packages.termux.dev/apt/termux-main noble-updates InRelease
Hit:3 http://packages.termux.dev/apt/termux-main noble-security InRelease
Get:4 https://packages.microsoft.com/repos/code stable InRelease [3.591 B]
Get:5 https://packages.microsoft.com/repos/code stable/main amd64 Packages [232 kB]
Fetched 236 kB in 2s (134 kB/s)
Reading package lists... Done`}),e.jsx(s,{root:!0,command:"pkg install -y code",output:`Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  code
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 99,2 MB of archives.
After this operation, 376 MB of additional disk space will be used.
Get:1 https://packages.microsoft.com/repos/code stable/main amd64 code amd64 1.93.1-1726079302 [99,2 MB]
Fetched 99,2 MB in 8s (12,4 MB/s)
Selecting previously unselected package code.
(Reading database ... 198432 files and directories currently installed.)
Preparing to unpack .../code_1.93.1-1726079302_amd64.deb ...
Unpacking code (1.93.1-1726079302) ...
Setting up code (1.93.1-1726079302) ...
update-alternatives: using /usr/bin/code to provide /usr/bin/editor (editor) in auto mode
Processing triggers for desktop-file-utils (0.27-2build1) ...
Processing triggers for mailcap (3.70+nmutermux) ...
Processing triggers for gnome-menus (3.36.0-1.termux) ...
Processing triggers for hicolor-icon-theme (0.17-2) ...`}),e.jsx(s,{command:"code --version",output:`1.93.1
38c31bc77e0dd6ae88a4e9cc93428cc27a56ba40
x64`})]}),e.jsxs(o,{type:"success",title:"Por que NÃO usar o snap?",children:["O Snap do VS Code tem startup mais lento (≈3s vs 1s no .deb), conflita com o tema do sistema (ícones genéricos), tem menos integração com o GNOME e exige permissões extras para acessar arquivos fora de ",e.jsx("code",{children:"~/snap"}),". Use o ",e.jsx("code",{children:".deb"})," oficial."]}),e.jsx("h3",{children:"1.1 Alternativa: Snap"}),e.jsx(r,{children:e.jsx(s,{root:!0,command:"snap install --classic code",output:"code 1.93.1 from Visual Studio Code (vscode✓) installed"})}),e.jsx("h3",{children:"1.2 Atualizar futuramente"}),e.jsx(r,{children:e.jsx(s,{root:!0,command:"pkg update && pkg upgrade code",output:"code is already the newest version (1.93.1-1726079302)."})}),e.jsx("h2",{children:"2. Primeira execução e configuração"}),e.jsxs(r,{children:[e.jsx(s,{command:"code",comment:"Abre o VS Code (modo GUI)"}),e.jsx(s,{command:"code .",comment:"Abre o diretório atual como workspace"}),e.jsx(s,{command:"code arquivo.py",comment:"Abre arquivo específico"}),e.jsx(s,{command:"code --diff a.txt b.txt",comment:"Compara dois arquivos lado a lado"}),e.jsx(s,{command:"code --user-data-dir /tmp/vsc-clean",comment:"Inicia com perfil limpo (debug)"})]}),e.jsxs("p",{children:["Configurações ficam em ",e.jsx("code",{children:"~/.config/Code/User/"}),". Os principais arquivos:"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Arquivo"}),e.jsx("th",{children:"Conteúdo"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"settings.json"})}),e.jsx("td",{children:"Preferências globais do editor"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"keybindings.json"})}),e.jsx("td",{children:"Atalhos personalizados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"snippets/"})}),e.jsx("td",{children:"Snippets de código por linguagem"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tasks.json"})}),e.jsxs("td",{children:["Tarefas (pode ser global ou por projeto em ",e.jsx("code",{children:".vscode/"}),")"]})]})]})]}),e.jsx("h3",{children:"2.1 settings.json — exemplo recomendado"}),e.jsxs("p",{children:["Abra com ",e.jsx("kbd",{children:"Ctrl+Shift+P"}),' → "Preferences: Open User Settings (JSON)".']}),e.jsx(t,{path:"~/.config/Code/User/settings.json",children:`{
  // ============ Editor ============
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrainsMono Nerd Font', 'Fira Code', monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.5,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": true,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.rulers": [80, 100, 120],
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.smoothScrolling": true,
  "editor.suggestSelection": "first",
  "editor.linkedEditing": true,

  // ============ Workbench ============
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.startupEditor": "none",
  "workbench.editor.enablePreview": false,
  "workbench.tree.indent": 16,

  // ============ Files ============
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.exclude": {
    "**/__pycache__": true,
    "**/.pytest_cache": true,
    "**/node_modules": true,
    "**/.DS_Store": true
  },

  // ============ Terminal ============
  "terminal.integrated.fontFamily": "'JetBrainsMono Nerd Font'",
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.defaultProfile.linux": "bash",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.scrollback": 10000,

  // ============ Git ============
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "git.openRepositoryInParentFolders": "always",

  // ============ Languages ============
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.tabSize": 4
  },
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[json]":       { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[html]":       { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[css]":        { "editor.defaultFormatter": "esbenp.prettier-vscode" },

  // ============ Telemetria (off) ============
  "telemetry.telemetryLevel": "off",
  "update.mode": "manual"
}`}),e.jsx("h2",{children:"3. Atalhos essenciais (Termux/Linux)"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atalho"}),e.jsx("th",{children:"Ação"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+P"})}),e.jsx("td",{children:"Quick Open — busca arquivos por nome"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Shift+P"})}),e.jsx("td",{children:"Command Palette — qualquer ação por nome"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Shift+F"})}),e.jsx("td",{children:"Busca global no workspace"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Shift+H"})}),e.jsx("td",{children:"Substituição global"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+B"})}),e.jsx("td",{children:"Toggle sidebar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+`"})}),e.jsx("td",{children:"Abre/fecha terminal integrado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Shift+`"})}),e.jsx("td",{children:"Novo terminal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+/"})}),e.jsx("td",{children:"Comentar/descomentar linha(s)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Alt+↑/↓"})}),e.jsx("td",{children:"Move linha(s) para cima/baixo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Shift+Alt+↑/↓"})}),e.jsx("td",{children:"Duplica linha(s)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+D"})}),e.jsx("td",{children:"Multi-cursor: seleciona próxima ocorrência"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Shift+L"})}),e.jsx("td",{children:"Multi-cursor: TODAS as ocorrências"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Alt+Click"})}),e.jsx("td",{children:"Adiciona cursor onde clicar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Alt+↑/↓"})}),e.jsx("td",{children:"Cursor na linha de cima/baixo (multi-line)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Shift+K"})}),e.jsx("td",{children:"Deleta a linha"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Enter"})}),e.jsx("td",{children:"Insere linha abaixo (sem importar onde está o cursor)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Shift+Enter"})}),e.jsx("td",{children:"Insere linha acima"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"F2"})}),e.jsx("td",{children:"Renomeia símbolo (em todo o projeto via LSP)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"F12"})}),e.jsx("td",{children:"Vai para definição"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Alt+F12"})}),e.jsx("td",{children:"Peek Definition (popup)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Shift+F12"})}),e.jsx("td",{children:"Mostra todas as referências"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Shift+O"})}),e.jsx("td",{children:"Vai para símbolo no arquivo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+T"})}),e.jsx("td",{children:"Vai para símbolo no workspace"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+G"})}),e.jsx("td",{children:"Vai para a linha N"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+\\\\"})}),e.jsx("td",{children:"Split editor"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+1/2/3"})}),e.jsx("td",{children:"Foca grupo de editor 1/2/3"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("kbd",{children:"Ctrl+Tab"})}),e.jsx("td",{children:"Alterna entre arquivos abertos"})]})]})]}),e.jsxs(o,{type:"tip",title:"Ver TODOS os atalhos",children:[e.jsx("kbd",{children:"Ctrl+K Ctrl+S"})," abre o editor visual de keybindings, com busca e edição. Para customizar, edite ",e.jsx("code",{children:"~/.config/Code/User/keybindings.json"}),"."]}),e.jsx("h2",{children:"4. Extensões essenciais"}),e.jsxs("p",{children:["Instale via interface (",e.jsx("kbd",{children:"Ctrl+Shift+X"}),") ou pela CLI:"]}),e.jsxs(r,{children:[e.jsx(s,{command:"code --install-extension ms-python.python",output:`Installing extensions...
Extension 'ms-python.python' v2024.14.0 was successfully installed.`}),e.jsx(s,{command:"code --install-extension ms-python.vscode-pylance"}),e.jsx(s,{command:"code --install-extension ms-python.black-formatter"}),e.jsx(s,{command:"code --install-extension dbaeumer.vscode-eslint"}),e.jsx(s,{command:"code --install-extension esbenp.prettier-vscode"}),e.jsx(s,{command:"code --install-extension ms-azuretools.vscode-docker"}),e.jsx(s,{command:"code --install-extension eamodio.gitlens"}),e.jsx(s,{command:"code --install-extension ms-vscode-remote.remote-ssh"}),e.jsx(s,{command:"code --install-extension ms-vscode-remote.remote-containers"}),e.jsx(s,{command:"code --install-extension ms-vscode-remote.remote-wsl"}),e.jsx(s,{command:"code --install-extension ms-vsliveshare.vsliveshare"}),e.jsx(s,{command:"code --install-extension pkief.material-icon-theme"}),e.jsx(s,{command:"code --install-extension zhuangtongfa.material-theme",comment:"One Dark Pro"}),e.jsx(s,{command:"code --install-extension EditorConfig.EditorConfig"}),e.jsx(s,{command:"code --install-extension christian-kohler.path-intellisense"}),e.jsx(s,{command:"code --install-extension yzhang.markdown-all-in-one"}),e.jsx(s,{command:"code --install-extension redhat.vscode-yaml"}),e.jsx(s,{command:"code --list-extensions",output:`christian-kohler.path-intellisense
dbaeumer.vscode-eslint
eamodio.gitlens
EditorConfig.EditorConfig
esbenp.prettier-vscode
ms-azuretools.vscode-docker
ms-python.black-formatter
ms-python.python
ms-python.vscode-pylance
ms-vscode-remote.remote-containers
ms-vscode-remote.remote-ssh
ms-vscode-remote.remote-wsl
ms-vsliveshare.vsliveshare
pkief.material-icon-theme
redhat.vscode-yaml
yzhang.markdown-all-in-one
zhuangtongfa.material-theme`})]}),e.jsx("h3",{children:"4.1 Lista comentada"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Extensão"}),e.jsx("th",{children:"Para que serve"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Python + Pylance"}),e.jsx("td",{children:"IntelliSense, debugger, Jupyter, refactoring para Python"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"ESLint"}),e.jsx("td",{children:"Lint em tempo real para JS/TS"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Prettier"}),e.jsx("td",{children:"Formatador para JS/TS/JSON/CSS/HTML/MD"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Docker"}),e.jsx("td",{children:"Sintaxe Dockerfile, gerencia containers/imagens da sidebar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"GitLens"}),e.jsx("td",{children:"Blame inline, histórico do arquivo, comparações poderosas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Live Share"}),e.jsx("td",{children:"Pair programming em tempo real"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Remote-SSH"}),e.jsx("td",{children:"Edita arquivos em servidores remotos via SSH"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Remote-Containers (Dev Containers)"}),e.jsx("td",{children:"Abre o projeto em um container isolado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Remote-WSL"}),e.jsx("td",{children:"Quando estiver no Windows com WSL Termux"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Material Icon Theme"}),e.jsx("td",{children:"Ícones bonitos por linguagem/framework"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"One Dark Pro"}),e.jsx("td",{children:"Tema escuro inspirado no Atom"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"EditorConfig"}),e.jsxs("td",{children:["Respeita ",e.jsx("code",{children:".editorconfig"})," do projeto"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Path Intellisense"}),e.jsx("td",{children:"Autocompleta caminhos de arquivos em strings"})]})]})]}),e.jsx("h2",{children:"5. Terminal integrado"}),e.jsxs("p",{children:["Pressione ",e.jsx("kbd",{children:"Ctrl+`"}),". O terminal compartilha as variáveis de ambiente do seu shell. Você pode dividir, ter múltiplos perfis, e usar ",e.jsx("code",{children:"code-insiders"})," ou"," ",e.jsx("code",{children:"code"})," dentro dele para abrir arquivos."]}),e.jsxs(r,{children:[e.jsx(s,{command:"cd ~/projeto && code .",output:"(abre o projeto em uma nova janela do VS Code)"}),e.jsx(s,{command:"ls -la",output:`total 32
drwxr-xr-x  5 wallyson wallyson 4096 abr 12 14:23 .
drwxr-xr-x 32 wallyson wallyson 4096 abr 12 14:20 ..
drwxr-xr-x  8 wallyson wallyson 4096 abr 12 14:23 .git
-rw-r--r--  1 wallyson wallyson  192 abr 12 14:21 .gitignore
-rw-r--r--  1 wallyson wallyson 1234 abr 12 14:23 main.py
drwxr-xr-x  3 wallyson wallyson 4096 abr 12 14:23 src
drwxr-xr-x  2 wallyson wallyson 4096 abr 12 14:23 tests`})]}),e.jsx("h2",{children:"6. Tasks — automação por projeto"}),e.jsxs("p",{children:["Crie ",e.jsx("code",{children:".vscode/tasks.json"})," na raiz do projeto. ",e.jsx("kbd",{children:"Ctrl+Shift+P"}),' → "Tasks: Configure Task" pode te guiar; ou crie manualmente:']}),e.jsx(t,{path:".vscode/tasks.json",children:`{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build",
      "type": "shell",
      "command": "npm run build",
      "group": { "kind": "build", "isDefault": true },
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "test",
      "type": "shell",
      "command": "pytest -v",
      "group": { "kind": "test", "isDefault": true },
      "presentation": { "reveal": "always", "panel": "dedicated" }
    },
    {
      "label": "lint",
      "type": "shell",
      "command": "ruff check src/ && mypy src/",
      "problemMatcher": []
    },
    {
      "label": "docker:up",
      "type": "shell",
      "command": "docker compose up -d",
      "presentation": { "reveal": "silent" }
    }
  ]
}`}),e.jsxs("p",{children:["Execute com ",e.jsx("kbd",{children:"Ctrl+Shift+B"})," (build padrão) ou ",e.jsx("kbd",{children:"Ctrl+Shift+P"}),' → "Tasks: Run Task".']}),e.jsx("h2",{children:"7. Debug — launch.json"}),e.jsxs("p",{children:['Aba "Run and Debug" (',e.jsx("kbd",{children:"Ctrl+Shift+D"}),') → "create a launch.json file". Exemplo para um projeto Node.js + Python:']}),e.jsx(t,{path:".vscode/launch.json",children:`{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: arquivo atual",
      "type": "debugpy",
      "request": "launch",
      "program": "\${file}",
      "console": "integratedTerminal",
      "justMyCode": true
    },
    {
      "name": "Python: módulo",
      "type": "debugpy",
      "request": "launch",
      "module": "myapp.cli",
      "args": ["--verbose", "build"],
      "env": { "PYTHONPATH": "\${workspaceFolder}/src" }
    },
    {
      "name": "Python: pytest",
      "type": "debugpy",
      "request": "launch",
      "module": "pytest",
      "args": ["-v", "tests/test_api.py::test_login"]
    },
    {
      "name": "Node: server.js",
      "type": "node",
      "request": "launch",
      "program": "\${workspaceFolder}/server.js",
      "envFile": "\${workspaceFolder}/.env",
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Node: anexar a processo",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true
    },
    {
      "name": "Chrome: Frontend",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "\${workspaceFolder}/src"
    }
  ]
}`}),e.jsxs("p",{children:["Coloque breakpoints clicando à esquerda do número da linha. Pressione ",e.jsx("kbd",{children:"F5"})," para iniciar debug, ",e.jsx("kbd",{children:"F10"})," step over, ",e.jsx("kbd",{children:"F11"})," step into, ",e.jsx("kbd",{children:"Shift+F11"})," ","step out, ",e.jsx("kbd",{children:"F9"})," toggle breakpoint."]}),e.jsx("h2",{children:"8. Multi-cursor e edição em massa"}),e.jsx(n,{children:`Ctrl+D                  → seleciona próxima ocorrência da palavra atual (cumulativo)
Ctrl+Shift+L            → seleciona TODAS as ocorrências de uma vez
Ctrl+U                  → desfaz a última seleção de cursor
Alt+Click               → adiciona cursor onde clicar
Ctrl+Alt+↑              → adiciona cursor na linha de cima
Ctrl+Alt+↓              → adiciona cursor na linha de baixo
Shift+Alt+I             → adiciona cursor no fim de cada linha selecionada
Ctrl+Shift+P "Transform to ..."  → uppercase, lowercase, title case, kebab, snake, etc`}),e.jsx("h2",{children:"9. Remote Development"}),e.jsxs("p",{children:['Talvez a feature mais subestimada do VS Code. Você edita arquivos que estão em outra máquina (servidor SSH, container Docker, WSL) com a mesma fluidez de uma sessão local — os plugins e o "VS Code Server" rodam ',e.jsx("em",{children:"do outro lado"}),"."]}),e.jsx("h3",{children:"9.1 Remote-SSH"}),e.jsx(r,{children:e.jsx(s,{command:"cat ~/.ssh/config",output:`Host servidor-prod
    HostName 203.0.113.42
    User deploy
    IdentityFile ~/.ssh/id_ed25519
    Port 22

Host servidor-dev
    HostName 192.168.1.50
    User wallyson
    ForwardAgent yes`})}),e.jsxs("p",{children:["No VS Code: ",e.jsx("kbd",{children:"Ctrl+Shift+P"}),' → "Remote-SSH: Connect to Host..." → escolha'," ",e.jsx("code",{children:"servidor-prod"}),". Uma nova janela abre conectada. ",e.jsx("code",{children:"code ."})," dentro do terminal SSH também funciona se você tiver o ",e.jsx("em",{children:"VS Code CLI"})," instalado lá."]}),e.jsx("h3",{children:"9.2 Dev Containers"}),e.jsxs("p",{children:["Crie ",e.jsx("code",{children:".devcontainer/devcontainer.json"}),":"]}),e.jsx(t,{path:".devcontainer/devcontainer.json",children:`{
  "name": "Python 3.12 + Node 20",
  "image": "mcr.microsoft.com/devcontainers/python:3.12",
  "features": {
    "ghcr.io/devcontainers/features/node:1": { "version": "20" },
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  },
  "forwardPorts": [3000, 5173, 8000],
  "postCreateCommand": "pip install -r requirements.txt && npm install",
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.vscode-pylance",
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint"
      ],
      "settings": {
        "python.defaultInterpreterPath": "/usr/local/bin/python"
      }
    }
  },
  "remoteUser": "vscode"
}`}),e.jsx("p",{children:'Abra o projeto e clique em "Reopen in Container". O VS Code constrói a imagem, monta seu workspace dentro e instala extensões automaticamente.'}),e.jsx("h2",{children:"10. Snippets personalizados"}),e.jsxs("p",{children:[e.jsx("kbd",{children:"Ctrl+Shift+P"}),' → "Snippets: Configure Snippets" → escolha "python.json" (ou nova global).']}),e.jsx(t,{path:"~/.config/Code/User/snippets/python.json",children:`{
  "Print debug":  {
    "prefix": "pdb",
    "body": [
      "print(f\\"DEBUG \${1:label}: {\${2:value}!r}\\")"
    ],
    "description": "Print de debug formatado"
  },
  "Pytest fixture": {
    "prefix": "pyfix",
    "body": [
      "@pytest.fixture",
      "def \${1:name}():",
      "    \${2:# setup}",
      "    yield \${3:value}",
      "    \${4:# teardown}"
    ]
  },
  "FastAPI endpoint": {
    "prefix": "fapi",
    "body": [
      "@app.\${1|get,post,put,delete|}(\\"/\${2:path}\\", response_model=\${3:Model})",
      "async def \${4:handler}(\${5:params}):",
      "    \${0:pass}"
    ]
  }
}`}),e.jsx("h2",{children:"11. Sincronizar configurações entre máquinas"}),e.jsxs("p",{children:["VS Code tem ",e.jsx("strong",{children:"Settings Sync"})," nativo. ",e.jsx("kbd",{children:"Ctrl+Shift+P"}),' → "Settings Sync: Turn On" → faz login com GitHub ou Microsoft. Sincroniza Settings, Keybindings, Extensions, Snippets e UI State.']}),e.jsx("h2",{children:"12. Comandos da CLI úteis"}),e.jsxs(r,{children:[e.jsx(s,{command:"code --help | head -30",output:`Visual Studio Code 1.93.1

Usage: code [options][paths...]

To read from stdin, append '-' (e.g. 'ps aux | grep code | code -')

Options
  -d --diff <file> <file>           Compare two files with each other.
  -m --merge <p1> <p2> <base> <res> Perform a three-way merge.
  -a --add <folder>                 Add folder(s) to the last active window.
  -g --goto <file:line[:character]> Open a file at the path on the specified line.
  -n --new-window                   Force to open a new window.
  -r --reuse-window                 Force to open a file or folder in last window.
  -w --wait                         Wait for the files to be closed before returning.
     --user-data-dir <dir>          Specifies the directory for user data.
     --extensions-dir <dir>         Set extensions root path.
     --list-extensions              List installed extensions.
     --install-extension <ext>      Install an extension.
     --uninstall-extension <ext>    Uninstall an extension.
     --status                       Print process usage and diagnostics.
     --verbose                      Print verbose output.`}),e.jsx(s,{command:"code --status",output:`Version:          Code 1.93.1
OS Version:       Linux x64 6.8.0-45-generic
CPUs:             AMD Ryzen 7 5800X (16 x 4849)
Memory (System):  31.27GB (12.84GB free)
Load (avg):       1, 0, 0
VM:               0%
Screen Reader:    no
Process Argv:     --crash-reporter-id ...
GPU Status:       2d_canvas: enabled
                  gpu_compositing: enabled
                  webgl: enabled`})]}),e.jsx("h2",{children:"13. Troubleshooting comum"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Problema"}),e.jsx("th",{children:"Solução"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"VS Code não abre, sem erro"}),e.jsxs("td",{children:[e.jsx("code",{children:"code --verbose"})," no terminal para ver mensagens"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Fonte com ligaduras quebradas"}),e.jsxs("td",{children:["Instalar ",e.jsx("code",{children:"fonts-firacode"})," ou ",e.jsx("em",{children:"JetBrainsMono Nerd Font"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Tela borrada (HiDPI)"}),e.jsxs("td",{children:["Adicionar ",e.jsx("code",{children:"--enable-features=UseOzonePlatform --ozone-platform=wayland"})," no atalho"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Extension host crashed"}),e.jsxs("td",{children:["Desabilitar extensões uma a uma com ",e.jsx("code",{children:"code --disable-extension"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Lentidão"}),e.jsxs("td",{children:[e.jsx("code",{children:"code --status"})," e desabilitar extensões pesadas (TabNine, GitLens em projetos enormes)"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Não atualiza"}),e.jsx("td",{children:e.jsx("code",{children:"pkg update && pkg upgrade code"})})]})]})]}),e.jsxs(o,{type:"note",title:"VSCodium — alternativa 100% open source",children:["O VS Code que a Microsoft distribui contém marcas e telemetria proprietárias. Existe o"," ",e.jsx("a",{href:"https://vscodium.com",children:"VSCodium"}),", build do mesmo código sem esses extras. O marketplace é o ",e.jsx("em",{children:"Open VSX"}),", com a maioria das extensões populares. Boa escolha para quem leva privacidade a sério."]})]})}export{x as default};

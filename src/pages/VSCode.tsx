import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, Output, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function VSCode() {
  return (
    <PageContainer
      title="Visual Studio Code"
      subtitle="O editor de código mais usado do planeta — instalação correta no Termux, customização, extensões essenciais e desenvolvimento remoto."
      difficulty="iniciante"
      timeToRead="40 min"
      category="Desenvolvimento"
    >
      <p>
        O <strong>Visual Studio Code</strong> (ou apenas <em>VS Code</em>) é o editor de código
        open source da Microsoft, baseado no framework Electron. Apesar de ser distribuído
        também como Snap no Termux, a forma <strong>oficialmente recomendada</strong> é instalar
        a versão <code>.deb</code> do repositório oficial da Microsoft, que traz integração mais
        rápida com o sistema, ícones nativos, melhor inicialização e atualizações via{" "}
        <code>apt</code> junto com os outros pacotes do sistema.
      </p>

      <p>
        Nesta página vamos cobrir: instalação a partir do repositório Microsoft (com chave GPG),
        instalação alternativa via Snap, configuração inicial do <code>settings.json</code>,
        atalhos essenciais, extensões obrigatórias, depuração com <code>launch.json</code>,
        tarefas com <code>tasks.json</code> e o ecossistema de Desenvolvimento Remoto (SSH,
        Containers, WSL).
      </p>

      <h2>1. Instalação via repositório oficial Microsoft</h2>

      <p>
        O passo-a-passo abaixo configura o keyring moderno (<code>signed-by</code>) em vez do
        antigo <code>apt-key</code>, que está deprecado desde o Termux 0.118.
      </p>

      <Terminal title="wallyson@termux: ~">
        <Command root command="pkg install -y wget gpg apt-transport-https" output={`Reading package lists... Done
Building dependency tree... Done
gpg is already the newest version (2.4.4-termux.2).
wget is already the newest version (1.21.4-termux.1).
The following NEW packages will be installed:
  apt-transport-https
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.`} />

        <Command
          command='wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg'
          comment="Baixa e converte a chave PGP da Microsoft"
        />

        <Command root command='install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg'
          comment="Move a chave para o local oficial /etc/apt/keyrings" />

        <Command root command={`sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'`}
          comment="Cria o sources.list apontando ao repositório do VS Code" />

        <Command command="rm packages.microsoft.gpg" />

        <Command root command="pkg update" output={`Hit:1 http://packages.termux.dev/apt/termux-main noble InRelease
Hit:2 http://packages.termux.dev/apt/termux-main noble-updates InRelease
Hit:3 http://packages.termux.dev/apt/termux-main noble-security InRelease
Get:4 https://packages.microsoft.com/repos/code stable InRelease [3.591 B]
Get:5 https://packages.microsoft.com/repos/code stable/main amd64 Packages [232 kB]
Fetched 236 kB in 2s (134 kB/s)
Reading package lists... Done`} />

        <Command root command="pkg install -y code" output={`Reading package lists... Done
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
Processing triggers for hicolor-icon-theme (0.17-2) ...`} />

        <Command command="code --version" output={`1.93.1
38c31bc77e0dd6ae88a4e9cc93428cc27a56ba40
x64`} />
      </Terminal>

      <InfoBox type="success" title="Por que NÃO usar o snap?">
        O Snap do VS Code tem startup mais lento (≈3s vs 1s no .deb), conflita com o tema do
        sistema (ícones genéricos), tem menos integração com o GNOME e exige permissões extras
        para acessar arquivos fora de <code>~/snap</code>. Use o <code>.deb</code> oficial.
      </InfoBox>

      <h3>1.1 Alternativa: Snap</h3>

      <Terminal>
        <Command root command="snap install --classic code" output={`code 1.93.1 from Visual Studio Code (vscode✓) installed`} />
      </Terminal>

      <h3>1.2 Atualizar futuramente</h3>

      <Terminal>
        <Command root command="pkg update && pkg upgrade code" output={`code is already the newest version (1.93.1-1726079302).`} />
      </Terminal>

      <h2>2. Primeira execução e configuração</h2>

      <Terminal>
        <Command command="code" comment="Abre o VS Code (modo GUI)" />
        <Command command="code ." comment="Abre o diretório atual como workspace" />
        <Command command="code arquivo.py" comment="Abre arquivo específico" />
        <Command command="code --diff a.txt b.txt" comment="Compara dois arquivos lado a lado" />
        <Command command="code --user-data-dir /tmp/vsc-clean" comment="Inicia com perfil limpo (debug)" />
      </Terminal>

      <p>
        Configurações ficam em <code>~/.config/Code/User/</code>. Os principais arquivos:
      </p>

      <table>
        <thead><tr><th>Arquivo</th><th>Conteúdo</th></tr></thead>
        <tbody>
          <tr><td><code>settings.json</code></td><td>Preferências globais do editor</td></tr>
          <tr><td><code>keybindings.json</code></td><td>Atalhos personalizados</td></tr>
          <tr><td><code>snippets/</code></td><td>Snippets de código por linguagem</td></tr>
          <tr><td><code>tasks.json</code></td><td>Tarefas (pode ser global ou por projeto em <code>.vscode/</code>)</td></tr>
        </tbody>
      </table>

      <h3>2.1 settings.json — exemplo recomendado</h3>

      <p>
        Abra com <kbd>Ctrl+Shift+P</kbd> → "Preferences: Open User Settings (JSON)".
      </p>

      <File path="~/.config/Code/User/settings.json">
{`{
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
}`}
      </File>

      <h2>3. Atalhos essenciais (Termux/Linux)</h2>

      <table>
        <thead><tr><th>Atalho</th><th>Ação</th></tr></thead>
        <tbody>
          <tr><td><kbd>Ctrl+P</kbd></td><td>Quick Open — busca arquivos por nome</td></tr>
          <tr><td><kbd>Ctrl+Shift+P</kbd></td><td>Command Palette — qualquer ação por nome</td></tr>
          <tr><td><kbd>Ctrl+Shift+F</kbd></td><td>Busca global no workspace</td></tr>
          <tr><td><kbd>Ctrl+Shift+H</kbd></td><td>Substituição global</td></tr>
          <tr><td><kbd>Ctrl+B</kbd></td><td>Toggle sidebar</td></tr>
          <tr><td><kbd>Ctrl+`</kbd></td><td>Abre/fecha terminal integrado</td></tr>
          <tr><td><kbd>Ctrl+Shift+`</kbd></td><td>Novo terminal</td></tr>
          <tr><td><kbd>Ctrl+/</kbd></td><td>Comentar/descomentar linha(s)</td></tr>
          <tr><td><kbd>Alt+↑/↓</kbd></td><td>Move linha(s) para cima/baixo</td></tr>
          <tr><td><kbd>Shift+Alt+↑/↓</kbd></td><td>Duplica linha(s)</td></tr>
          <tr><td><kbd>Ctrl+D</kbd></td><td>Multi-cursor: seleciona próxima ocorrência</td></tr>
          <tr><td><kbd>Ctrl+Shift+L</kbd></td><td>Multi-cursor: TODAS as ocorrências</td></tr>
          <tr><td><kbd>Alt+Click</kbd></td><td>Adiciona cursor onde clicar</td></tr>
          <tr><td><kbd>Ctrl+Alt+↑/↓</kbd></td><td>Cursor na linha de cima/baixo (multi-line)</td></tr>
          <tr><td><kbd>Ctrl+Shift+K</kbd></td><td>Deleta a linha</td></tr>
          <tr><td><kbd>Ctrl+Enter</kbd></td><td>Insere linha abaixo (sem importar onde está o cursor)</td></tr>
          <tr><td><kbd>Ctrl+Shift+Enter</kbd></td><td>Insere linha acima</td></tr>
          <tr><td><kbd>F2</kbd></td><td>Renomeia símbolo (em todo o projeto via LSP)</td></tr>
          <tr><td><kbd>F12</kbd></td><td>Vai para definição</td></tr>
          <tr><td><kbd>Alt+F12</kbd></td><td>Peek Definition (popup)</td></tr>
          <tr><td><kbd>Shift+F12</kbd></td><td>Mostra todas as referências</td></tr>
          <tr><td><kbd>Ctrl+Shift+O</kbd></td><td>Vai para símbolo no arquivo</td></tr>
          <tr><td><kbd>Ctrl+T</kbd></td><td>Vai para símbolo no workspace</td></tr>
          <tr><td><kbd>Ctrl+G</kbd></td><td>Vai para a linha N</td></tr>
          <tr><td><kbd>Ctrl+\\</kbd></td><td>Split editor</td></tr>
          <tr><td><kbd>Ctrl+1/2/3</kbd></td><td>Foca grupo de editor 1/2/3</td></tr>
          <tr><td><kbd>Ctrl+Tab</kbd></td><td>Alterna entre arquivos abertos</td></tr>
        </tbody>
      </table>

      <InfoBox type="tip" title="Ver TODOS os atalhos">
        <kbd>Ctrl+K Ctrl+S</kbd> abre o editor visual de keybindings, com busca e edição.
        Para customizar, edite <code>~/.config/Code/User/keybindings.json</code>.
      </InfoBox>

      <h2>4. Extensões essenciais</h2>

      <p>
        Instale via interface (<kbd>Ctrl+Shift+X</kbd>) ou pela CLI:
      </p>

      <Terminal>
        <Command command="code --install-extension ms-python.python" output={`Installing extensions...
Extension 'ms-python.python' v2024.14.0 was successfully installed.`} />
        <Command command="code --install-extension ms-python.vscode-pylance" />
        <Command command="code --install-extension ms-python.black-formatter" />
        <Command command="code --install-extension dbaeumer.vscode-eslint" />
        <Command command="code --install-extension esbenp.prettier-vscode" />
        <Command command="code --install-extension ms-azuretools.vscode-docker" />
        <Command command="code --install-extension eamodio.gitlens" />
        <Command command="code --install-extension ms-vscode-remote.remote-ssh" />
        <Command command="code --install-extension ms-vscode-remote.remote-containers" />
        <Command command="code --install-extension ms-vscode-remote.remote-wsl" />
        <Command command="code --install-extension ms-vsliveshare.vsliveshare" />
        <Command command="code --install-extension pkief.material-icon-theme" />
        <Command command="code --install-extension zhuangtongfa.material-theme" comment="One Dark Pro" />
        <Command command="code --install-extension EditorConfig.EditorConfig" />
        <Command command="code --install-extension christian-kohler.path-intellisense" />
        <Command command="code --install-extension yzhang.markdown-all-in-one" />
        <Command command="code --install-extension redhat.vscode-yaml" />

        <Command command="code --list-extensions" output={`christian-kohler.path-intellisense
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
zhuangtongfa.material-theme`} />
      </Terminal>

      <h3>4.1 Lista comentada</h3>

      <table>
        <thead><tr><th>Extensão</th><th>Para que serve</th></tr></thead>
        <tbody>
          <tr><td>Python + Pylance</td><td>IntelliSense, debugger, Jupyter, refactoring para Python</td></tr>
          <tr><td>ESLint</td><td>Lint em tempo real para JS/TS</td></tr>
          <tr><td>Prettier</td><td>Formatador para JS/TS/JSON/CSS/HTML/MD</td></tr>
          <tr><td>Docker</td><td>Sintaxe Dockerfile, gerencia containers/imagens da sidebar</td></tr>
          <tr><td>GitLens</td><td>Blame inline, histórico do arquivo, comparações poderosas</td></tr>
          <tr><td>Live Share</td><td>Pair programming em tempo real</td></tr>
          <tr><td>Remote-SSH</td><td>Edita arquivos em servidores remotos via SSH</td></tr>
          <tr><td>Remote-Containers (Dev Containers)</td><td>Abre o projeto em um container isolado</td></tr>
          <tr><td>Remote-WSL</td><td>Quando estiver no Windows com WSL Termux</td></tr>
          <tr><td>Material Icon Theme</td><td>Ícones bonitos por linguagem/framework</td></tr>
          <tr><td>One Dark Pro</td><td>Tema escuro inspirado no Atom</td></tr>
          <tr><td>EditorConfig</td><td>Respeita <code>.editorconfig</code> do projeto</td></tr>
          <tr><td>Path Intellisense</td><td>Autocompleta caminhos de arquivos em strings</td></tr>
        </tbody>
      </table>

      <h2>5. Terminal integrado</h2>

      <p>
        Pressione <kbd>Ctrl+`</kbd>. O terminal compartilha as variáveis de ambiente do
        seu shell. Você pode dividir, ter múltiplos perfis, e usar <code>code-insiders</code> ou{" "}
        <code>code</code> dentro dele para abrir arquivos.
      </p>

      <Terminal>
        <Command command="cd ~/projeto && code ." output={`(abre o projeto em uma nova janela do VS Code)`} />
        <Command command="ls -la" output={`total 32
drwxr-xr-x  5 wallyson wallyson 4096 abr 12 14:23 .
drwxr-xr-x 32 wallyson wallyson 4096 abr 12 14:20 ..
drwxr-xr-x  8 wallyson wallyson 4096 abr 12 14:23 .git
-rw-r--r--  1 wallyson wallyson  192 abr 12 14:21 .gitignore
-rw-r--r--  1 wallyson wallyson 1234 abr 12 14:23 main.py
drwxr-xr-x  3 wallyson wallyson 4096 abr 12 14:23 src
drwxr-xr-x  2 wallyson wallyson 4096 abr 12 14:23 tests`} />
      </Terminal>

      <h2>6. Tasks — automação por projeto</h2>

      <p>
        Crie <code>.vscode/tasks.json</code> na raiz do projeto. <kbd>Ctrl+Shift+P</kbd> → "Tasks:
        Configure Task" pode te guiar; ou crie manualmente:
      </p>

      <File path=".vscode/tasks.json">
{`{
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
}`}
      </File>

      <p>
        Execute com <kbd>Ctrl+Shift+B</kbd> (build padrão) ou <kbd>Ctrl+Shift+P</kbd> → "Tasks: Run Task".
      </p>

      <h2>7. Debug — launch.json</h2>

      <p>
        Aba "Run and Debug" (<kbd>Ctrl+Shift+D</kbd>) → "create a launch.json file". Exemplo
        para um projeto Node.js + Python:
      </p>

      <File path=".vscode/launch.json">
{`{
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
}`}
      </File>

      <p>
        Coloque breakpoints clicando à esquerda do número da linha. Pressione <kbd>F5</kbd> para
        iniciar debug, <kbd>F10</kbd> step over, <kbd>F11</kbd> step into, <kbd>Shift+F11</kbd>{" "}
        step out, <kbd>F9</kbd> toggle breakpoint.
      </p>

      <h2>8. Multi-cursor e edição em massa</h2>

      <Output>{`Ctrl+D                  → seleciona próxima ocorrência da palavra atual (cumulativo)
Ctrl+Shift+L            → seleciona TODAS as ocorrências de uma vez
Ctrl+U                  → desfaz a última seleção de cursor
Alt+Click               → adiciona cursor onde clicar
Ctrl+Alt+↑              → adiciona cursor na linha de cima
Ctrl+Alt+↓              → adiciona cursor na linha de baixo
Shift+Alt+I             → adiciona cursor no fim de cada linha selecionada
Ctrl+Shift+P "Transform to ..."  → uppercase, lowercase, title case, kebab, snake, etc`}</Output>

      <h2>9. Remote Development</h2>

      <p>
        Talvez a feature mais subestimada do VS Code. Você edita arquivos que estão em outra
        máquina (servidor SSH, container Docker, WSL) com a mesma fluidez de uma sessão local —
        os plugins e o "VS Code Server" rodam <em>do outro lado</em>.
      </p>

      <h3>9.1 Remote-SSH</h3>

      <Terminal>
        <Command command="cat ~/.ssh/config" output={`Host servidor-prod
    HostName 203.0.113.42
    User deploy
    IdentityFile ~/.ssh/id_ed25519
    Port 22

Host servidor-dev
    HostName 192.168.1.50
    User wallyson
    ForwardAgent yes`} />
      </Terminal>

      <p>
        No VS Code: <kbd>Ctrl+Shift+P</kbd> → "Remote-SSH: Connect to Host..." → escolha{" "}
        <code>servidor-prod</code>. Uma nova janela abre conectada. <code>code .</code> dentro
        do terminal SSH também funciona se você tiver o <em>VS Code CLI</em> instalado lá.
      </p>

      <h3>9.2 Dev Containers</h3>

      <p>
        Crie <code>.devcontainer/devcontainer.json</code>:
      </p>

      <File path=".devcontainer/devcontainer.json">
{`{
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
}`}
      </File>

      <p>
        Abra o projeto e clique em "Reopen in Container". O VS Code constrói a imagem, monta
        seu workspace dentro e instala extensões automaticamente.
      </p>

      <h2>10. Snippets personalizados</h2>

      <p>
        <kbd>Ctrl+Shift+P</kbd> → "Snippets: Configure Snippets" → escolha "python.json" (ou nova
        global).
      </p>

      <File path="~/.config/Code/User/snippets/python.json">
{`{
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
}`}
      </File>

      <h2>11. Sincronizar configurações entre máquinas</h2>

      <p>
        VS Code tem <strong>Settings Sync</strong> nativo. <kbd>Ctrl+Shift+P</kbd> → "Settings
        Sync: Turn On" → faz login com GitHub ou Microsoft. Sincroniza Settings, Keybindings,
        Extensions, Snippets e UI State.
      </p>

      <h2>12. Comandos da CLI úteis</h2>

      <Terminal>
        <Command command="code --help | head -30" output={`Visual Studio Code 1.93.1

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
     --verbose                      Print verbose output.`} />

        <Command command="code --status" output={`Version:          Code 1.93.1
OS Version:       Linux x64 6.8.0-45-generic
CPUs:             AMD Ryzen 7 5800X (16 x 4849)
Memory (System):  31.27GB (12.84GB free)
Load (avg):       1, 0, 0
VM:               0%
Screen Reader:    no
Process Argv:     --crash-reporter-id ...
GPU Status:       2d_canvas: enabled
                  gpu_compositing: enabled
                  webgl: enabled`} />
      </Terminal>

      <h2>13. Troubleshooting comum</h2>

      <table>
        <thead><tr><th>Problema</th><th>Solução</th></tr></thead>
        <tbody>
          <tr><td>VS Code não abre, sem erro</td><td><code>code --verbose</code> no terminal para ver mensagens</td></tr>
          <tr><td>Fonte com ligaduras quebradas</td><td>Instalar <code>fonts-firacode</code> ou <em>JetBrainsMono Nerd Font</em></td></tr>
          <tr><td>Tela borrada (HiDPI)</td><td>Adicionar <code>--enable-features=UseOzonePlatform --ozone-platform=wayland</code> no atalho</td></tr>
          <tr><td>Extension host crashed</td><td>Desabilitar extensões uma a uma com <code>code --disable-extension</code></td></tr>
          <tr><td>Lentidão</td><td><code>code --status</code> e desabilitar extensões pesadas (TabNine, GitLens em projetos enormes)</td></tr>
          <tr><td>Não atualiza</td><td><code>pkg update && pkg upgrade code</code></td></tr>
        </tbody>
      </table>

      <InfoBox type="note" title="VSCodium — alternativa 100% open source">
        O VS Code que a Microsoft distribui contém marcas e telemetria proprietárias. Existe o{" "}
        <a href="https://vscodium.com">VSCodium</a>, build do mesmo código sem esses extras. O
        marketplace é o <em>Open VSX</em>, com a maioria das extensões populares. Boa escolha
        para quem leva privacidade a sério.
      </InfoBox>
    </PageContainer>
  );
}

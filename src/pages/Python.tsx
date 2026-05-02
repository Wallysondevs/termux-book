import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Python() {
    return (
      <PageContainer
        title="Python no Ubuntu"
        subtitle="Gerenciar versões do Python, pip, venv, pyenv, instalar pacotes, criar projetos e boas práticas de desenvolvimento Python no Ubuntu."
        difficulty="iniciante"
        timeToRead="30 min"
      >
        <p>
          O <strong>Python</strong> já vem pré-instalado no Ubuntu (é usado internamente pelo
          sistema). No entanto, é importante saber gerenciar versões, ambientes virtuais e
          pacotes para desenvolvimento sem conflitar com o Python do sistema.
        </p>

        <h2>1. Python no Ubuntu</h2>
        <CodeBlock
          title="Verificar e instalar Python"
          code={`# Verificar versão instalada
  python3 --version
  # Saída: Python 3.12.3 (no Ubuntu 24.04)

  # O Python 2 não vem mais instalado por padrão
  # python --version → erro (não existe mais)

  # Instalar ferramentas essenciais
  sudo apt install -y python3-pip python3-venv python3-dev

  # python3-pip   → gerenciador de pacotes
  # python3-venv  → ambientes virtuais
  # python3-dev   → headers para compilar extensões C

  # Instalar versão adicional do Python
  sudo apt install -y python3.11   # ou python3.10, etc.
  # Usar: python3.11 --version

  # IMPORTANTE: Nunca use sudo pip install!
  # Isso pode quebrar pacotes do sistema
  # Sempre use ambientes virtuais (venv)`}
        />

        <AlertBox type="danger" title="Não mexa no Python do sistema">
          O Ubuntu usa Python internamente (apt, GNOME, etc.). Nunca desinstale o
          <code>python3</code> do sistema nem use <code>sudo pip install</code> para
          instalar pacotes globalmente. Use sempre <strong>ambientes virtuais</strong>
          (venv) ou <strong>pyenv</strong> para projetos.
        </AlertBox>

        <h2>2. Ambientes Virtuais (venv)</h2>
        <CodeBlock
          title="Criar e usar ambientes virtuais"
          code={`# Criar ambiente virtual
  python3 -m venv meu-projeto-venv
  # Cria uma pasta "meu-projeto-venv" com Python isolado

  # Ativar o ambiente virtual
  source meu-projeto-venv/bin/activate
  # O prompt muda: (meu-projeto-venv) usuario@host:~$

  # Agora pip instala apenas dentro do venv
  pip install flask requests pandas
  pip install -r requirements.txt

  # Verificar pacotes instalados
  pip list
  pip freeze

  # Gerar requirements.txt
  pip freeze > requirements.txt

  # Desativar o ambiente virtual
  deactivate

  # Deletar o venv (simplesmente apague a pasta)
  rm -rf meu-projeto-venv

  # Workflow típico de projeto:
  mkdir meu-projeto && cd meu-projeto
  python3 -m venv .venv          # .venv por convenção
  source .venv/bin/activate
  pip install flask
  pip freeze > requirements.txt
  # Adicione .venv/ ao .gitignore!`}
        />

        <h2>3. pyenv — Gerenciar Múltiplas Versões</h2>
        <CodeBlock
          title="Instalar e usar o pyenv"
          code={`# Instalar dependências de compilação
  sudo apt install -y make build-essential libssl-dev zlib1g-dev \
    libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
    libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev \
    libffi-dev liblzma-dev

  # Instalar o pyenv
  curl https://pyenv.run | bash

  # Adicionar ao .bashrc (ou .zshrc)
  echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
  echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
  echo 'eval "$(pyenv init -)"' >> ~/.bashrc
  source ~/.bashrc

  # Listar versões disponíveis
  pyenv install --list | grep "^  3\."

  # Instalar uma versão
  pyenv install 3.12.4
  pyenv install 3.11.9

  # Listar versões instaladas
  pyenv versions

  # Definir versão global (padrão)
  pyenv global 3.12.4

  # Definir versão para um projeto (cria .python-version)
  cd meu-projeto
  pyenv local 3.11.9
  # Agora, dentro desta pasta, python aponta para 3.11.9

  # Definir versão para a sessão atual
  pyenv shell 3.10.14

  # Desinstalar uma versão
  pyenv uninstall 3.10.14`}
        />

        <h2>4. pip — Gerenciador de Pacotes</h2>
        <CodeBlock
          title="Instalar e gerenciar pacotes Python"
          code={`# SEMPRE dentro de um venv!
  source .venv/bin/activate

  # Instalar pacotes
  pip install flask
  pip install "django>=4.0,<5.0"   # Versão específica
  pip install flask==3.0.3          # Versão exata

  # Instalar de requirements.txt
  pip install -r requirements.txt

  # Atualizar pacote
  pip install --upgrade flask
  pip install --upgrade pip         # Atualizar o próprio pip

  # Desinstalar
  pip uninstall flask

  # Ver informações de um pacote
  pip show flask

  # Buscar pacotes
  pip search flask   # (pode estar desabilitado no PyPI)

  # Ver pacotes desatualizados
  pip list --outdated

  # Gerar requirements.txt
  pip freeze > requirements.txt

  # Instalar pacotes de desenvolvimento separadamente
  pip install -r requirements.txt      # Produção
  pip install -r requirements-dev.txt  # Desenvolvimento

  # requirements-dev.txt:
  # -r requirements.txt
  # pytest
  # black
  # flake8
  # mypy

  # Usar pip com cache desabilitado (para CI/CD)
  pip install --no-cache-dir -r requirements.txt`}
        />

        <h2>5. Ferramentas de Desenvolvimento</h2>
        <CodeBlock
          title="Ferramentas essenciais para Python"
          code={`# === Formatadores ===
  pip install black
  black meu_codigo.py            # Formata automaticamente
  black --check .                # Verifica sem alterar

  pip install isort
  isort .                        # Organiza imports

  # === Linters ===
  pip install flake8
  flake8 meu_codigo.py

  pip install pylint
  pylint meu_codigo.py

  pip install ruff               # Linter ultrarrápido (escrito em Rust)
  ruff check .
  ruff format .                  # Também formata

  # === Type checking ===
  pip install mypy
  mypy meu_codigo.py

  # === Testes ===
  pip install pytest
  pytest                         # Roda todos os testes
  pytest -v                      # Verbose
  pytest -x                      # Para no primeiro erro
  pytest --cov=meu_modulo        # Cobertura de código

  # === Gerenciadores de projeto modernos ===
  # Poetry (gerencia deps + venv + build)
  pip install poetry
  poetry new meu-projeto
  poetry add flask
  poetry install

  # UV (ultrarrápido, escrito em Rust)
  pip install uv
  uv venv
  uv pip install flask`}
        />

        <h2>6. Criar e Executar Projetos</h2>
        <CodeBlock
          title="Estrutura de projetos Python"
          code={`# Estrutura recomendada:
  # meu-projeto/
  # ├── .venv/
  # ├── src/
  # │   └── meu_modulo/
  # │       ├── __init__.py
  # │       └── main.py
  # ├── tests/
  # │   └── test_main.py
  # ├── requirements.txt
  # ├── pyproject.toml
  # └── README.md

  # Criar projeto
  mkdir -p meu-projeto/{src/meu_modulo,tests}
  cd meu-projeto
  python3 -m venv .venv
  source .venv/bin/activate

  # Criar módulo
  touch src/meu_modulo/__init__.py
  cat > src/meu_modulo/main.py << 'EOF'
  def saudacao(nome: str) -> str:
      return f"Olá, {nome}!"

  if __name__ == "__main__":
      print(saudacao("Ubuntu"))
  EOF

  # Executar
  python src/meu_modulo/main.py

  # Criar servidor web rápido (para testes)
  python3 -m http.server 8000
  # Abre um servidor web servindo o diretório atual

  # Servidor JSON rápido
  python3 -c "
  from http.server import HTTPServer, BaseHTTPRequestHandler
  import json

  class Handler(BaseHTTPRequestHandler):
      def do_GET(self):
          self.send_response(200)
          self.send_header('Content-Type', 'application/json')
          self.end_headers()
          self.wfile.write(json.dumps({'status': 'ok'}).encode())

  HTTPServer(('', 8000), Handler).serve_forever()
  "`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com Python"
          code={`# "externally-managed-environment" ao usar pip
  # Causa: Ubuntu 23.04+ protege o Python do sistema
  # Solução: Use venv!
  python3 -m venv .venv
  source .venv/bin/activate
  pip install pacote

  # Ou forçar (NÃO recomendado):
  # pip install --break-system-packages pacote

  # "ModuleNotFoundError"
  # 1. Verificar se está no venv certo:
  which python
  # 2. Instalar o módulo:
  pip install nome-do-modulo

  # Problemas com compilação (headers faltando)
  sudo apt install -y python3-dev build-essential
  # Para pacotes específicos:
  sudo apt install -y libpq-dev      # psycopg2
  sudo apt install -y libffi-dev     # cffi
  sudo apt install -y libxml2-dev    # lxml

  # Versão errada do Python
  python3 --version
  # Se precisar de outra versão, use pyenv

  # pip muito lento
  # Usar uv (10-100x mais rápido):
  pip install uv
  uv pip install -r requirements.txt`}
        />
      </PageContainer>
    );
  }
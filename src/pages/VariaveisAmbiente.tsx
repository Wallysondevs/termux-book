import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function VariaveisAmbiente() {
    return (
      <PageContainer
        title="Variáveis de Ambiente"
        subtitle="Guia completo de variáveis de ambiente no Ubuntu: PATH, HOME, definir, exportar, persistir, .env e boas práticas de configuração."
        difficulty="iniciante"
        timeToRead="20 min"
      >
        <p>
          <strong>Variáveis de ambiente</strong> são valores dinâmicos que afetam o
          comportamento de processos no sistema. Elas armazenam configurações como caminhos
          de execução (<code>PATH</code>), diretório home (<code>HOME</code>), credenciais
          de APIs e muito mais. Todo programa no Linux herda as variáveis do processo pai.
        </p>

        <h2>1. Ver Variáveis de Ambiente</h2>
        <CodeBlock
          title="Listar e inspecionar variáveis"
          code={`# Ver todas as variáveis de ambiente
  env
  # Ou: printenv

  # Ver uma variável específica
  echo $PATH
  echo $HOME
  echo $USER
  echo $SHELL
  echo $LANG
  printenv HOME

  # Variáveis importantes do sistema:
  # PATH   → Diretórios onde o shell busca executáveis
  # HOME   → Diretório home do usuário (/home/usuario)
  # USER   → Nome do usuário atual
  # SHELL  → Shell padrão (/bin/bash)
  # LANG   → Idioma do sistema (pt_BR.UTF-8)
  # PWD    → Diretório atual
  # TERM   → Tipo de terminal
  # EDITOR → Editor padrão
  # DISPLAY → Servidor gráfico (X11)
  # XDG_*  → Diretórios padrão (Desktop, Downloads, etc.)

  # Ver variáveis filtradas
  env | grep -i proxy
  env | grep -i path
  env | sort    # Todas, ordenadas`}
        />

        <h2>2. Definir Variáveis</h2>
        <CodeBlock
          title="Criar e exportar variáveis"
          code={`# Variável local (só no shell atual)
  NOME="Ubuntu"
  echo $NOME    # Ubuntu

  # Exportar para processos filhos
  export NOME="Ubuntu"
  # Agora scripts e programas chamados deste shell também veem $NOME

  # Definir e exportar em uma linha
  export API_KEY="minha-chave-secreta"
  export DATABASE_URL="postgres://user:pass@localhost:5432/db"

  # Remover variável
  unset NOME

  # Variável para um único comando
  DATABASE_URL="postgres://..." python3 app.py
  # A variável existe apenas durante a execução do comando

  # Adicionar ao PATH
  export PATH="$PATH:/opt/meu-programa/bin"
  # Adiciona /opt/meu-programa/bin ao final do PATH

  # Prepend ao PATH (prioridade maior)
  export PATH="/usr/local/go/bin:$PATH"`}
        />

        <h2>3. Persistir Variáveis</h2>
        <CodeBlock
          title="Tornar variáveis permanentes"
          code={`# Variáveis definidas no terminal são PERDIDAS ao fechar
  # Para persistir, adicione a um arquivo de configuração:

  # === POR USUÁRIO ===
  # ~/.bashrc — carregado em todo terminal interativo
  echo 'export EDITOR="nano"' >> ~/.bashrc
  echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.bashrc
  source ~/.bashrc    # Recarregar

  # ~/.profile — carregado no login (ideal para variáveis de sessão)
  echo 'export JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"' >> ~/.profile

  # === PARA TODO O SISTEMA ===
  # /etc/environment — formato simples (sem export)
  sudo nano /etc/environment
  # Adicionar:
  # JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
  # EDITOR="nano"

  # /etc/profile.d/ — scripts carregados no login (todos os usuários)
  sudo tee /etc/profile.d/meu-app.sh > /dev/null << 'EOF'
  export APP_ENV="production"
  export APP_PORT="8080"
  EOF

  # === PARA SERVIÇOS (systemd) ===
  # Editar o arquivo .service:
  # [Service]
  # Environment="APP_ENV=production"
  # Environment="PORT=8080"
  # EnvironmentFile=/etc/meu-app/config.env`}
        />

        <h2>4. Arquivos .env</h2>
        <CodeBlock
          title="Usar arquivos .env para configuração"
          code={`# Arquivo .env — padrão para aplicações modernas
  cat > .env << 'EOF'
  DATABASE_URL=postgres://user:pass@localhost:5432/meuapp
  REDIS_URL=redis://localhost:6379
  API_KEY=chave-secreta-aqui
  APP_ENV=development
  PORT=3000
  DEBUG=true
  EOF

  # Carregar .env no Bash
  set -a    # Exportar todas as variáveis definidas
  source .env
  set +a

  # Ou usar export explícito:
  export $(grep -v '^#' .env | xargs)

  # IMPORTANTE: Adicionar .env ao .gitignore!
  echo ".env" >> .gitignore

  # Criar .env.example (template sem valores secretos)
  cat > .env.example << 'EOF'
  DATABASE_URL=postgres://user:password@localhost:5432/dbname
  REDIS_URL=redis://localhost:6379
  API_KEY=your-api-key-here
  APP_ENV=development
  PORT=3000
  EOF

  # Frameworks que carregam .env automaticamente:
  # Node.js → dotenv: require('dotenv').config()
  # Python  → python-dotenv
  # Ruby    → dotenv gem
  # Docker Compose → lê .env automaticamente`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com variáveis"
          code={`# Variável não está definida
  # Verificar:
  echo $MINHA_VAR
  # Se vazio, verificar se foi exportada:
  export | grep MINHA_VAR

  # Variável definida no .bashrc não funciona no cron
  # Cron não carrega .bashrc!
  # Defina variáveis no próprio crontab:
  # EDITOR=nano crontab -e
  # PATH=/usr/local/bin:/usr/bin:/bin
  # APP_ENV=production
  # * * * * * /home/user/script.sh

  # Espaços no valor da variável
  # ERRADO: export NOME = valor
  # CERTO:  export NOME="valor com espaços"

  # Variável não disponível para outro usuário
  # Variáveis no ~/.bashrc são por usuário
  # Para todo o sistema: use /etc/environment

  # PATH quebrado (não encontra comandos)
  # Restaurar PATH padrão:
  export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

  # Ver de onde uma variável vem
  # Abrir novo terminal e rastrear:
  bash -xl 2>&1 | grep MINHA_VAR`}
        />

        <AlertBox type="warning" title="Segurança de variáveis">
          Nunca coloque senhas ou chaves de API diretamente no código ou no
          <code>.bashrc</code>. Use arquivos <code>.env</code> (adicionados ao
          <code>.gitignore</code>) ou gerenciadores de secrets como o
          <strong>pass</strong>, <strong>Vault</strong> ou variáveis de CI/CD.
        </AlertBox>
      </PageContainer>
    );
  }
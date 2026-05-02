import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function NodeJS() {
    return (
      <PageContainer
        title="Node.js no Ubuntu"
        subtitle="Instalação via NVM, gerenciamento de versões, NPM, Yarn, PNPM, criação de projetos, PM2 para produção e deploy de aplicações Node.js."
        difficulty="intermediario"
        timeToRead="35 min"
      >
        <p>
          O <strong>Node.js</strong> é um runtime JavaScript construído sobre o motor V8 do Chrome,
          permitindo executar JavaScript fora do navegador. É a base de frameworks como Express,
          Next.js, Nest.js, e ferramentas como Webpack, Vite e ESLint.
        </p>

        <h2>Métodos de Instalação</h2>
        <ul>
          <li><strong>NVM (recomendado)</strong> — Gerenciador de versões. Permite ter múltiplas versões instaladas e alternar entre elas facilmente.</li>
          <li><strong>NodeSource</strong> — Repositório oficial com versões atualizadas. Instala uma única versão global.</li>
          <li><strong>apt</strong> — Versão dos repositórios do Ubuntu. Geralmente desatualizada.</li>
          <li><strong>fnm</strong> — Alternativa ao NVM, escrita em Rust (mais rápida).</li>
        </ul>

        <h2>1. Instalar via NVM (Recomendado)</h2>
        <CodeBlock
          title="Instalar o NVM e o Node.js"
          code={`# Instalar o NVM (Node Version Manager)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  # Recarregar o shell (ou fechar e abrir o terminal)
  source ~/.bashrc

  # Verificar que o NVM foi instalado
  nvm --version
  # Saída: 0.39.7

  # Listar versões do Node.js disponíveis para instalação
  nvm ls-remote
  # Lista TODAS as versões (são muitas!)

  # Listar apenas versões LTS
  nvm ls-remote --lts

  # Instalar a versão LTS mais recente (recomendado)
  nvm install --lts
  # Saída: Installing latest LTS version.
  # Now using node v20.14.0 (npm v10.7.0)

  # Instalar uma versão específica
  nvm install 22        # Última versão do Node 22
  nvm install 20.14.0   # Versão exata
  nvm install 18        # Node 18 LTS

  # Verificar a versão instalada
  node -v    # Saída: v20.14.0
  npm -v     # Saída: 10.7.0

  # Ver versões instaladas localmente
  nvm ls
  # Saída:
  #        v18.20.3
  # ->     v20.14.0  (default)
  #        v22.3.0
  # default -> 20 (-> v20.14.0)

  # Alternar entre versões
  nvm use 18            # Usar Node 18 nesta sessão
  nvm use 22            # Usar Node 22 nesta sessão
  nvm use default       # Voltar para a versão padrão

  # Definir a versão padrão permanentemente
  nvm alias default 20  # Node 20 será o padrão

  # Desinstalar uma versão
  nvm uninstall 18

  # Usar uma versão temporariamente para um único comando
  nvm exec 18 node -v   # Executa com Node 18 sem mudar a sessão`}
        />

        <AlertBox type="info" title="NVM e novos terminais">
          O NVM configura a versão do Node.js <strong>por sessão de terminal</strong>.
          Se você abrir um novo terminal, ele usará a versão definida como <code>default</code>.
          Para projetos que precisam de uma versão específica, crie um arquivo
          <code>.nvmrc</code> na raiz do projeto com o número da versão (ex: <code>20</code>).
        </AlertBox>

        <h2>2. Instalar via NodeSource (Alternativa)</h2>
        <CodeBlock
          title="Instalar Node.js via repositório NodeSource"
          code={`# Instalar o Node.js 20 via NodeSource
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs

  # Instalar o Node.js 22
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y nodejs

  # Verificar a instalação
  node -v
  npm -v

  # Este método instala o Node globalmente via apt
  # Vantagem: simples, um comando
  # Desvantagem: não permite múltiplas versões facilmente`}
        />

        <h2>3. Gerenciadores de Pacotes: NPM, Yarn, PNPM</h2>
        <CodeBlock
          title="Comparação e instalação dos gerenciadores"
          code={`# === NPM (já vem com o Node.js) ===
  npm -v                           # Verificar versão
  npm init -y                      # Criar package.json
  npm install express              # Instalar pacote (dependência)
  npm install -D typescript        # Instalar como devDependency
  npm install -g nodemon           # Instalar globalmente
  npm uninstall express            # Remover pacote
  npm update                       # Atualizar todos os pacotes
  npm audit                        # Verificar vulnerabilidades
  npm audit fix                    # Corrigir vulnerabilidades automaticamente
  npm run dev                      # Executar script definido no package.json
  npm list                         # Listar pacotes instalados
  npm list -g --depth=0            # Listar pacotes globais

  # === YARN ===
  # Instalar o Yarn
  corepack enable
  corepack prepare yarn@stable --activate
  # Ou via NPM:
  npm install -g yarn

  yarn -v                          # Verificar versão
  yarn init -y                     # Criar package.json
  yarn add express                 # Instalar pacote
  yarn add -D typescript           # DevDependency
  yarn global add nodemon          # Instalar globalmente
  yarn remove express              # Remover pacote
  yarn upgrade                     # Atualizar todos
  yarn dev                         # Executar script (sem "run")

  # === PNPM ===
  # Instalar o PNPM (mais rápido, economiza disco)
  corepack enable
  corepack prepare pnpm@latest --activate
  # Ou via NPM:
  npm install -g pnpm

  pnpm -v                          # Verificar versão
  pnpm init                        # Criar package.json
  pnpm add express                 # Instalar pacote
  pnpm add -D typescript           # DevDependency
  pnpm add -g nodemon              # Instalar globalmente
  pnpm remove express              # Remover pacote
  pnpm update                      # Atualizar todos
  pnpm dev                         # Executar script

  # Por que PNPM?
  # - Usa hard links: pacotes são armazenados uma vez no disco
  # - node_modules mais rápido e menor
  # - Strict: não permite imports fantasmas (hoisting)
  # - Workspaces nativos para monorepos`}
        />

        <h2>4. Criar e Executar Projetos</h2>
        <CodeBlock
          title="Primeiros passos com Node.js"
          code={`# Criar um projeto Node.js
  mkdir meu-projeto && cd meu-projeto
  npm init -y

  # Criar um servidor HTTP básico
  cat > index.js << 'EOF'
  const http = require('http');

  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Olá do Node.js!</h1>');
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(\`Servidor rodando em http://localhost:\${PORT}\`);
  });
  EOF

  # Executar
  node index.js
  # Saída: Servidor rodando em http://localhost:3000

  # Criar um projeto Express (framework web mais popular)
  npm install express

  cat > app.js << 'EOF'
  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ mensagem: 'API funcionando!', timestamp: new Date() });
  });

  app.get('/usuarios', (req, res) => {
    res.json([
      { id: 1, nome: 'João', email: 'joao@exemplo.com' },
      { id: 2, nome: 'Maria', email: 'maria@exemplo.com' }
    ]);
  });

  app.listen(PORT, () => {
    console.log(\`Express rodando na porta \${PORT}\`);
  });
  EOF

  node app.js

  # Usando ES Modules (import/export) ao invés de require
  # No package.json, adicione: "type": "module"
  # Depois use: import express from 'express';`}
        />

        <h2>5. TypeScript com Node.js</h2>
        <CodeBlock
          title="Configurar TypeScript"
          code={`# Instalar TypeScript e tipos do Node
  npm install -D typescript @types/node ts-node

  # Criar tsconfig.json
  npx tsc --init
  # Ou criar manualmente:
  cat > tsconfig.json << 'EOF'
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "commonjs",
      "lib": ["ES2022"],
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "resolveJsonModule": true,
      "declaration": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
  }
  EOF

  # Criar arquivo TypeScript
  mkdir src
  cat > src/index.ts << 'EOF'
  interface Usuario {
    id: number;
    nome: string;
    email: string;
  }

  const usuarios: Usuario[] = [
    { id: 1, nome: "João", email: "joao@exemplo.com" }
  ];

  console.log("Usuários:", usuarios);
  EOF

  # Compilar e executar
  npx tsc              # Compila para JavaScript em dist/
  node dist/index.js   # Executa o JavaScript compilado

  # Executar TypeScript diretamente (desenvolvimento)
  npx ts-node src/index.ts

  # Ou usar tsx (mais rápido que ts-node)
  npm install -D tsx
  npx tsx src/index.ts`}
        />

        <h2>6. PM2 — Gerenciador de Processos para Produção</h2>
        <CodeBlock
          title="Usar PM2 para deploy em produção"
          code={`# Instalar o PM2 globalmente
  npm install -g pm2

  # Iniciar uma aplicação
  pm2 start app.js
  pm2 start app.js --name "minha-api"     # Com nome customizado
  pm2 start app.js -i max                 # Modo cluster (usa todos os CPUs)
  pm2 start app.js -i 4                   # 4 instâncias

  # Gerenciar processos
  pm2 list                    # Listar todos os processos
  pm2 status                  # Status detalhado
  pm2 show minha-api          # Detalhes de um processo
  pm2 logs                    # Ver logs de todos os processos
  pm2 logs minha-api          # Logs de um processo específico
  pm2 monit                   # Monitor em tempo real (CPU, RAM)

  # Controlar processos
  pm2 stop minha-api          # Parar
  pm2 restart minha-api       # Reiniciar
  pm2 reload minha-api        # Reload sem downtime (graceful)
  pm2 delete minha-api        # Remover do PM2

  # Auto-restart no boot do sistema
  pm2 startup                 # Gera o comando de setup
  # Execute o comando que o PM2 mostrar (sudo ...)
  pm2 save                    # Salva a lista atual de processos

  # Arquivo de configuração (ecosystem.config.js)
  cat > ecosystem.config.js << 'EOF'
  module.exports = {
    apps: [{
      name: 'minha-api',
      script: 'dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3001
      }
    }]
  };
  EOF

  pm2 start ecosystem.config.js             # Produção
  pm2 start ecosystem.config.js --env development  # Desenvolvimento`}
        />

        <h2>7. Ferramentas de Desenvolvimento</h2>
        <CodeBlock
          title="Ferramentas essenciais para desenvolvimento Node.js"
          code={`# Nodemon — reinicia automaticamente ao salvar
  npm install -D nodemon
  npx nodemon app.js
  # No package.json: "dev": "nodemon app.js"

  # ESLint — Linter para código JavaScript/TypeScript
  npm install -D eslint @eslint/js
  npx eslint --init

  # Prettier — Formatador de código
  npm install -D prettier
  echo '{"semi": true, "singleQuote": true}' > .prettierrc

  # Vitest — Framework de testes (rápido, compatível com Jest)
  npm install -D vitest
  # No package.json: "test": "vitest"

  # dotenv — Variáveis de ambiente
  npm install dotenv
  # Criar arquivo .env:
  echo "DATABASE_URL=postgres://..." > .env
  echo "API_KEY=abc123" >> .env
  # No código: require('dotenv').config()
  # NUNCA commite o .env! Adicione ao .gitignore

  # Ferramentas de banco de dados
  npm install prisma           # ORM moderno
  npm install drizzle-orm      # ORM leve e type-safe
  npm install pg               # Driver PostgreSQL
  npm install mongoose          # ODM para MongoDB`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com Node.js no Ubuntu"
          code={`# Erro: "node: command not found" após instalar via NVM
  # Solução: Recarregar o shell
  source ~/.bashrc
  # Ou verificar se o NVM está carregando no .bashrc:
  grep -c "NVM_DIR" ~/.bashrc

  # Erro: "EACCES: permission denied" ao instalar globalmente
  # NUNCA use sudo com npm se instalou via NVM!
  # Se usou apt/NodeSource:
  mkdir -p ~/.npm-global
  npm config set prefix '~/.npm-global'
  echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
  source ~/.bashrc

  # Erro: "MODULE_NOT_FOUND"
  # Solução: Instalar dependências
  npm install   # ou: rm -rf node_modules && npm install

  # Erro: "ENOSPC: System limit for number of file watchers reached"
  # Solução: Aumentar o limite de watchers
  echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p

  # Porta já em uso
  # Encontrar e matar o processo na porta
  lsof -i :3000
  kill -9 PID_DO_PROCESSO
  # Ou usar: npx kill-port 3000

  # node_modules corrompido
  rm -rf node_modules package-lock.json
  npm install

  # Limpar cache do NPM
  npm cache clean --force`}
        />

        <AlertBox type="info" title="Node.js LTS vs Current">
          O Node.js tem dois tipos de release: <strong>LTS</strong> (Long Term Support, 
          versões pares: 18, 20, 22) e <strong>Current</strong> (versões ímpares: 19, 21, 23).
          Para produção, sempre use LTS. Current é para testar funcionalidades novas.
        </AlertBox>
      </PageContainer>
    );
  }
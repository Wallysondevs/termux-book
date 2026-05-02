import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function PostgreSQL() {
    return (
      <PageContainer
        title="PostgreSQL no Ubuntu"
        subtitle="Instalação, configuração, gerenciamento de bancos, usuários, backup, replicação, tunning de performance e segurança do PostgreSQL."
        difficulty="intermediario"
        timeToRead="35 min"
      >
        <p>
          O <strong>PostgreSQL</strong> é o banco de dados relacional open source mais avançado
          do mundo. Suporta JSON, full-text search, tipos geoespaciais (PostGIS), replicação,
          particionamento e extensibilidade via extensões. É usado por empresas como Apple,
          Instagram, Spotify e o governo brasileiro.
        </p>

        <h2>1. Instalação</h2>
        <CodeBlock
          title="Instalar o PostgreSQL no Ubuntu"
          code={`# Instalar o PostgreSQL (versão dos repositórios do Ubuntu)
  sudo apt update
  sudo apt install -y postgresql postgresql-contrib

  # postgresql-contrib inclui extensões úteis como:
  # - pg_stat_statements (análise de queries)
  # - pgcrypto (criptografia)
  # - uuid-ossp (geração de UUIDs)
  # - hstore (key-value store)

  # Verificar a versão
  psql --version
  # Saída: psql (PostgreSQL) 16.3

  # Verificar o status do serviço
  sudo systemctl status postgresql
  sudo systemctl enable postgresql

  # Instalar versão específica via repositório oficial
  sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
  sudo apt update
  sudo apt install -y postgresql-16`}
        />

        <h2>2. Acessar e Gerenciar o PostgreSQL</h2>
        <CodeBlock
          title="Comandos básicos do psql"
          code={`# O PostgreSQL cria um usuário de sistema "postgres" durante a instalação
  # Acessar o psql como superusuário
  sudo -u postgres psql
  # Você está agora no prompt: postgres=#

  # Comandos internos do psql (começam com \):
  # \l         → listar todos os bancos de dados
  # \du        → listar todos os usuários/roles
  # \dt        → listar tabelas do banco atual
  # \d tabela  → descrever estrutura de uma tabela
  # \c banco   → conectar a outro banco
  # \i arquivo → executar arquivo SQL
  # \q         → sair do psql
  # \?         → ajuda dos comandos internos
  # \h CREATE  → ajuda sobre um comando SQL

  # Criar um novo usuário (role)
  sudo -u postgres createuser --interactive
  # Ou via SQL:
  sudo -u postgres psql -c "CREATE USER meuusuario WITH PASSWORD 'senha_segura';"

  # Criar um banco de dados
  sudo -u postgres createdb meubanco
  # Ou via SQL:
  sudo -u postgres psql -c "CREATE DATABASE meubanco OWNER meuusuario;"

  # Dar todas as permissões ao usuário no banco
  sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE meubanco TO meuusuario;"

  # Conectar com usuário e banco específicos
  psql -U meuusuario -d meubanco -h localhost
  # Se der erro de autenticação, veja a seção de configuração abaixo

  # Executar SQL diretamente do terminal
  psql -U meuusuario -d meubanco -c "SELECT version();"

  # Executar arquivo SQL
  psql -U meuusuario -d meubanco -f script.sql`}
        />

        <h2>3. Configuração de Autenticação</h2>
        <CodeBlock
          title="Configurar pg_hba.conf e postgresql.conf"
          code={`# O PostgreSQL controla autenticação via pg_hba.conf
  # Localizar o arquivo:
  sudo -u postgres psql -c "SHOW hba_file;"
  # Geralmente: /etc/postgresql/16/main/pg_hba.conf

  # Editar a autenticação
  sudo nano /etc/postgresql/16/main/pg_hba.conf

  # Formato: TYPE  DATABASE  USER  ADDRESS  METHOD
  # Métodos comuns:
  # peer     → usa o usuário do sistema (sem senha, apenas local)
  # md5      → senha com hash MD5
  # scram-sha-256 → senha com SCRAM (mais seguro, padrão no PG 14+)
  # trust    → sem autenticação (NUNCA em produção!)

  # Configuração recomendada para desenvolvimento:
  # local   all   all                     peer
  # host    all   all   127.0.0.1/32      scram-sha-256
  # host    all   all   ::1/128           scram-sha-256

  # Para permitir conexões de qualquer IP (produção com firewall):
  # host    all   all   0.0.0.0/0         scram-sha-256

  # Configurar o PostgreSQL para aceitar conexões externas
  sudo nano /etc/postgresql/16/main/postgresql.conf
  # Altere:
  # listen_addresses = 'localhost'  →  listen_addresses = '*'
  # port = 5432

  # Reiniciar após mudanças
  sudo systemctl restart postgresql

  # Testar a conexão
  psql -U meuusuario -d meubanco -h 127.0.0.1`}
        />

        <h2>4. Operações SQL Comuns</h2>
        <CodeBlock
          title="SQL essencial no PostgreSQL"
          code={`# Conectar ao banco
  psql -U meuusuario -d meubanco -h localhost

  # Criar tabela
  CREATE TABLE usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      idade INTEGER CHECK (idade >= 0),
      ativo BOOLEAN DEFAULT true,
      criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  # Inserir dados
  INSERT INTO usuarios (nome, email, idade) VALUES
      ('João Silva', 'joao@email.com', 28),
      ('Maria Santos', 'maria@email.com', 34),
      ('Pedro Costa', 'pedro@email.com', 22);

  # Consultar dados
  SELECT * FROM usuarios;
  SELECT nome, email FROM usuarios WHERE idade > 25 ORDER BY nome;
  SELECT COUNT(*) FROM usuarios WHERE ativo = true;

  # Atualizar dados
  UPDATE usuarios SET idade = 29 WHERE email = 'joao@email.com';

  # Deletar dados
  DELETE FROM usuarios WHERE id = 3;

  # Criar índice (acelerar consultas)
  CREATE INDEX idx_usuarios_email ON usuarios(email);
  CREATE INDEX idx_usuarios_nome ON usuarios USING gin(to_tsvector('portuguese', nome));

  # Full-text search em português
  SELECT * FROM usuarios
  WHERE to_tsvector('portuguese', nome) @@ to_tsquery('portuguese', 'João');

  # JSON no PostgreSQL
  CREATE TABLE configuracoes (
      id SERIAL PRIMARY KEY,
      dados JSONB NOT NULL
  );

  INSERT INTO configuracoes (dados) VALUES
      ('{"tema": "escuro", "idioma": "pt-BR", "notificacoes": true}');

  SELECT dados->>'tema' FROM configuracoes;
  SELECT * FROM configuracoes WHERE dados @> '{"idioma": "pt-BR"}';`}
        />

        <h2>5. Backup e Restauração</h2>
        <CodeBlock
          title="Backup do PostgreSQL"
          code={`# Backup de um banco (formato SQL)
  sudo -u postgres pg_dump meubanco > backup-$(date +%Y%m%d).sql

  # Backup comprimido
  sudo -u postgres pg_dump meubanco | gzip > backup-$(date +%Y%m%d).sql.gz

  # Backup em formato custom (mais eficiente, permite restauração parcial)
  sudo -u postgres pg_dump -Fc meubanco > backup-$(date +%Y%m%d).dump

  # Backup de todos os bancos
  sudo -u postgres pg_dumpall > backup-todos-$(date +%Y%m%d).sql

  # Backup apenas da estrutura (sem dados)
  sudo -u postgres pg_dump --schema-only meubanco > estrutura.sql

  # Backup apenas dos dados (sem estrutura)
  sudo -u postgres pg_dump --data-only meubanco > dados.sql

  # === RESTAURAÇÃO ===

  # Restaurar de SQL
  sudo -u postgres psql meubanco < backup.sql

  # Restaurar de dump custom
  sudo -u postgres pg_restore -d meubanco backup.dump

  # Restaurar para um banco novo
  sudo -u postgres createdb meubanco_restaurado
  sudo -u postgres pg_restore -d meubanco_restaurado backup.dump

  # Restaurar apenas uma tabela
  sudo -u postgres pg_restore -d meubanco -t usuarios backup.dump

  # Script de backup automático
  cat > /usr/local/bin/backup-postgres.sh << 'SCRIPT'
  #!/bin/bash
  BACKUP_DIR="/backup/postgres"
  RETENTION=7
  mkdir -p "$BACKUP_DIR"
  DATE=$(date +%Y%m%d_%H%M)

  sudo -u postgres pg_dumpall | gzip > "$BACKUP_DIR/all-$DATE.sql.gz"

  find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$RETENTION -delete

  echo "Backup PostgreSQL concluído: $DATE"
  SCRIPT
  chmod +x /usr/local/bin/backup-postgres.sh`}
        />

        <h2>6. Tunning de Performance</h2>
        <CodeBlock
          title="Otimizar o PostgreSQL"
          code={`# Editar postgresql.conf
  sudo nano /etc/postgresql/16/main/postgresql.conf

  # Configurações recomendadas (ajustar conforme RAM do servidor):

  # Para servidor com 8GB de RAM:
  # shared_buffers = 2GB            # 25% da RAM (cache de dados)
  # effective_cache_size = 6GB      # 75% da RAM (estimativa de cache do SO)
  # work_mem = 64MB                 # Memória por operação de sort/hash
  # maintenance_work_mem = 512MB    # Memória para VACUUM, CREATE INDEX
  # wal_buffers = 64MB              # Buffer para WAL (Write-Ahead Log)

  # Para SSDs:
  # random_page_cost = 1.1          # Padrão é 4.0 (para HDDs)
  # effective_io_concurrency = 200  # Padrão é 1

  # Conexões:
  # max_connections = 100           # Ajustar conforme necessidade
  # Usar PgBouncer para connection pooling em produção

  # Logging:
  # log_min_duration_statement = 1000  # Logar queries > 1 segundo
  # log_statement = 'ddl'           # Logar DDL (CREATE, ALTER, DROP)

  # Aplicar mudanças
  sudo systemctl restart postgresql

  # Verificar configuração atual
  sudo -u postgres psql -c "SHOW shared_buffers;"
  sudo -u postgres psql -c "SHOW work_mem;"

  # Analisar uma query lenta
  EXPLAIN ANALYZE SELECT * FROM usuarios WHERE email = 'joao@email.com';

  # VACUUM — limpar dados mortos e atualizar estatísticas
  sudo -u postgres vacuumdb --all --analyze

  # Ver tamanho dos bancos
  sudo -u postgres psql -c "SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) FROM pg_database ORDER BY pg_database_size(pg_database.datname) DESC;"`}
        />

        <h2>7. Extensões Úteis</h2>
        <CodeBlock
          title="Instalar e usar extensões do PostgreSQL"
          code={`# Listar extensões disponíveis
  sudo -u postgres psql -c "SELECT * FROM pg_available_extensions ORDER BY name;"

  # Instalar extensões (dentro do psql, conectado ao banco)
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";    -- Gerar UUIDs
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";     -- Criptografia
  CREATE EXTENSION IF NOT EXISTS "pg_trgm";      -- Busca fuzzy/similar
  CREATE EXTENSION IF NOT EXISTS "hstore";       -- Key-value store
  CREATE EXTENSION IF NOT EXISTS "pg_stat_statements"; -- Análise de queries

  # Gerar UUID
  SELECT uuid_generate_v4();

  # Busca fuzzy (encontrar nomes parecidos)
  SELECT * FROM usuarios
  WHERE similarity(nome, 'João') > 0.3
  ORDER BY similarity(nome, 'João') DESC;

  # PostGIS — dados geoespaciais
  sudo apt install -y postgresql-16-postgis-3
  # No psql:
  CREATE EXTENSION postgis;

  # pgAdmin — Interface gráfica para gerenciar PostgreSQL
  sudo apt install -y pgadmin4
  # Ou via container:
  # docker run -p 5050:80 -e PGADMIN_DEFAULT_EMAIL=admin@admin.com -e PGADMIN_DEFAULT_PASSWORD=admin dpage/pgadmin4`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com PostgreSQL"
          code={`# Erro: "FATAL: Peer authentication failed"
  # Causa: pg_hba.conf usa "peer" mas você está tentando com senha
  # Solução: Mudar para md5 ou scram-sha-256 no pg_hba.conf
  sudo nano /etc/postgresql/16/main/pg_hba.conf
  # Mudar "peer" para "scram-sha-256" na linha do local
  sudo systemctl restart postgresql

  # Erro: "could not connect to server: Connection refused"
  # Verificar se o PostgreSQL está rodando:
  sudo systemctl status postgresql
  # Verificar se está escutando na porta correta:
  sudo ss -tlnp | grep 5432

  # Erro: "FATAL: role 'meuusuario' does not exist"
  # Criar o usuário:
  sudo -u postgres createuser meuusuario

  # Erro: "FATAL: database 'meubanco' does not exist"
  # Criar o banco:
  sudo -u postgres createdb meubanco

  # Reset de senha do PostgreSQL
  sudo -u postgres psql -c "ALTER USER meuusuario WITH PASSWORD 'nova_senha';"

  # Ver conexões ativas
  sudo -u postgres psql -c "SELECT * FROM pg_stat_activity;"

  # Matar uma conexão travada
  sudo -u postgres psql -c "SELECT pg_terminate_backend(PID);"

  # Ver logs do PostgreSQL
  sudo tail -f /var/log/postgresql/postgresql-16-main.log`}
        />

        <AlertBox type="info" title="PostgreSQL vs MySQL">
          O PostgreSQL é geralmente preferido para: dados complexos, JSON, full-text search,
          integridade referencial forte e compliance. O MySQL é mais usado em: hospedagem
          compartilhada, WordPress, aplicações web simples. Para novos projetos, o PostgreSQL
          é a escolha mais versátil.
        </AlertBox>
      </PageContainer>
    );
  }
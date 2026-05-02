import{j as e}from"./index-C2xKMDcs.js";import{P as s}from"./PageContainer-D8Fa3g_u.js";import{C as o}from"./CodeBlock-OPQVSQze.js";import{I as a}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function l(){return e.jsxs(s,{title:"PostgreSQL no Termux",subtitle:"Instalação, inicialização do cluster, autenticação, backup e tunning do PostgreSQL rodando nativo no Termux.",difficulty:"intermediario",timeToRead:"35 min",children:[e.jsxs(a,{type:"info",title:"Caveats no Termux",children:["O PostgreSQL roda ",e.jsx("strong",{children:"nativo"})," via ",e.jsx("code",{children:"pkg install postgresql"}),", sem precisar de proot. Algumas diferenças importantes em relação ao Linux desktop:",e.jsx("br",{}),"• Não há ",e.jsx("code",{children:"systemd"})," — o cluster é iniciado com ",e.jsx("code",{children:"pg_ctl"})," ou via runit.",e.jsx("br",{}),"• O socket fica em ",e.jsx("code",{children:"$PREFIX/var/run/postgresql"}),".",e.jsx("br",{}),"• O ",e.jsx("code",{children:"initdb"})," precisa ser executado manualmente na primeira vez.",e.jsx("br",{}),"• Não existe usuário ",e.jsx("code",{children:"postgres"}),' de sistema — você é o "superusuário" do seu próprio cluster.']}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"PostgreSQL"})," é o banco de dados relacional open source mais avançado do mundo: JSONB, full-text search, tipos geoespaciais (PostGIS), CTEs, replicação e extensibilidade via extensões. No Termux ele roda muito bem para desenvolvimento, APIs locais e pequenas aplicações."]}),e.jsx("h2",{children:"1. Instalação"}),e.jsx(o,{title:"Instalar o PostgreSQL no Termux",code:`pkg update
pkg install -y postgresql

# Verificar versão
psql --version
postgres --version

# Diretório de dados (você escolhe — convenção comum):
export PGDATA="$PREFIX/var/lib/postgresql"
mkdir -p "$PGDATA"

# Inicializar o cluster (apenas na primeira vez)
initdb "$PGDATA"
# Saída: "Success. You can now start the database server"

# Diretório do socket (criado automaticamente)
mkdir -p $PREFIX/var/run/postgresql`}),e.jsx("h2",{children:"2. Iniciar e Parar o Servidor"}),e.jsx(o,{title:"Subir o postgres no Termux",code:`export PGDATA="$PREFIX/var/lib/postgresql"

# Iniciar via pg_ctl (recomendado)
pg_ctl -D "$PGDATA" -l "$PGDATA/server.log" start

# Status
pg_ctl -D "$PGDATA" status

# Parar
pg_ctl -D "$PGDATA" stop

# Como serviço persistente via runit
pkg install -y termux-services
sv-enable postgresql
sv up postgresql
sv status postgresql

# Evitar que o Android mate o processo
termux-wake-lock`}),e.jsx("h2",{children:"3. Acessar e Gerenciar"}),e.jsx(o,{title:"Comandos básicos do psql",code:`# No Termux, seu usuário do sistema (Android) é o superusuário do cluster.
# Conectar ao banco padrão (o nome do usuário Termux):
psql postgres

# Comandos internos do psql:
# \\l         → listar bancos
# \\du        → listar usuários/roles
# \\dt        → listar tabelas
# \\d tabela  → estrutura da tabela
# \\c banco   → conectar a outro banco
# \\i arq.sql → executar arquivo
# \\q         → sair

# Criar usuário (role)
createuser --interactive
# ou via SQL:
psql -c "CREATE USER meuusuario WITH PASSWORD 'senha_segura';"

# Criar banco
createdb meubanco
psql -c "CREATE DATABASE meubanco OWNER meuusuario;"

# Permissões
psql -c "GRANT ALL PRIVILEGES ON DATABASE meubanco TO meuusuario;"

# Conectar com usuário e banco
psql -U meuusuario -d meubanco -h localhost

# SQL inline / arquivo
psql -d meubanco -c "SELECT version();"
psql -d meubanco -f script.sql`}),e.jsx("h2",{children:"4. Configuração de Autenticação"}),e.jsx(o,{title:"pg_hba.conf e postgresql.conf no Termux",code:`# Localizar arquivos
psql -c "SHOW hba_file;"
psql -c "SHOW config_file;"
# Geralmente:
#   $PREFIX/var/lib/postgresql/pg_hba.conf
#   $PREFIX/var/lib/postgresql/postgresql.conf

nano $PREFIX/var/lib/postgresql/pg_hba.conf

# Formato: TYPE  DATABASE  USER  ADDRESS  METHOD
# Métodos:
#   trust          → sem senha (NUNCA em produção!)
#   md5            → senha com hash MD5
#   scram-sha-256  → padrão moderno e mais seguro
#   peer           → usa o user do SO (no Termux funciona pra você mesmo)

# Recomendado para uso local no Termux:
# local   all   all                     peer
# host    all   all   127.0.0.1/32      scram-sha-256
# host    all   all   ::1/128           scram-sha-256

# Para acessar de outros aparelhos na LAN:
# host    all   all   192.168.0.0/24    scram-sha-256

nano $PREFIX/var/lib/postgresql/postgresql.conf
# listen_addresses = 'localhost'   → 'localhost,192.168.0.10'  ou '*'
# port = 5432

# Recarregar configuração
pg_ctl -D "$PGDATA" reload`}),e.jsx("h2",{children:"5. SQL Essencial"}),e.jsx(o,{title:"SQL no PostgreSQL",code:`psql -U meuusuario -d meubanco -h localhost

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    idade INTEGER CHECK (idade >= 0),
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO usuarios (nome, email, idade) VALUES
    ('João Silva', 'joao@email.com', 28),
    ('Maria Santos', 'maria@email.com', 34);

SELECT * FROM usuarios;
SELECT nome FROM usuarios WHERE idade > 25 ORDER BY nome;

UPDATE usuarios SET idade = 29 WHERE email = 'joao@email.com';
DELETE FROM usuarios WHERE id = 3;

CREATE INDEX idx_usuarios_email ON usuarios(email);

-- JSONB (matador do PostgreSQL)
CREATE TABLE configuracoes (
    id SERIAL PRIMARY KEY,
    dados JSONB NOT NULL
);
INSERT INTO configuracoes (dados) VALUES
    ('{"tema":"escuro","idioma":"pt-BR","notificacoes":true}');
SELECT dados->>'tema' FROM configuracoes;
SELECT * FROM configuracoes WHERE dados @> '{"idioma":"pt-BR"}';`}),e.jsx("h2",{children:"6. Backup e Restauração"}),e.jsx(o,{title:"pg_dump / pg_restore no Termux",code:`# Backup SQL puro
pg_dump meubanco > backup-$(date +%Y%m%d).sql

# Comprimido
pg_dump meubanco | gzip > backup-$(date +%Y%m%d).sql.gz

# Formato custom (mais eficiente, permite restore parcial)
pg_dump -Fc meubanco > backup-$(date +%Y%m%d).dump

# Todos os bancos + roles
pg_dumpall > backup-todos-$(date +%Y%m%d).sql

# Apenas estrutura ou apenas dados
pg_dump --schema-only meubanco > estrutura.sql
pg_dump --data-only   meubanco > dados.sql

# Restaurar
psql meubanco < backup.sql
pg_restore -d meubanco backup.dump

# Restaurar uma única tabela
pg_restore -d meubanco -t usuarios backup.dump

# Backup automático para o storage compartilhado do Android
termux-setup-storage
cat > $PREFIX/bin/backup-postgres.sh << 'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
DIR="$HOME/storage/shared/Backups/postgres"
mkdir -p "$DIR"
DATE=$(date +%Y%m%d_%H%M)
pg_dumpall | gzip > "$DIR/all-$DATE.sql.gz"
find "$DIR" -name "*.sql.gz" -mtime +7 -delete
echo "Backup PostgreSQL: $DATE"
SCRIPT
chmod +x $PREFIX/bin/backup-postgres.sh`}),e.jsx("h2",{children:"7. Tunning de Performance (modo celular)"}),e.jsx(o,{title:"Ajustes para o ambiente Termux",code:`nano $PREFIX/var/lib/postgresql/postgresql.conf

# Celulares têm pouca RAM compartilhada — vá leve!
# shared_buffers = 64MB
# effective_cache_size = 256MB
# work_mem = 4MB
# maintenance_work_mem = 32MB
# max_connections = 20

# SSD/UFS: o storage do Android é flash:
# random_page_cost = 1.1
# effective_io_concurrency = 100

# Logs (queries lentas)
# log_min_duration_statement = 500

pg_ctl -D "$PGDATA" restart

# Ver e analisar
psql -c "SHOW shared_buffers;"
psql -d meubanco -c "EXPLAIN ANALYZE SELECT * FROM usuarios WHERE email='joao@email.com';"
vacuumdb --all --analyze
psql -c "SELECT datname, pg_size_pretty(pg_database_size(datname))
         FROM pg_database ORDER BY pg_database_size(datname) DESC;"`}),e.jsx("h2",{children:"8. Extensões Úteis"}),e.jsx(o,{title:"Extensões disponíveis",code:`-- listar extensões
SELECT * FROM pg_available_extensions ORDER BY name;

-- ativar dentro de um banco
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "hstore";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

SELECT uuid_generate_v4();

SELECT * FROM usuarios
WHERE similarity(nome, 'João') > 0.3
ORDER BY similarity(nome, 'João') DESC;`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(o,{title:"Problemas comuns no Termux",code:`# "could not connect to server: No such file or directory"
# O servidor não está rodando, ou o socket está em outro lugar.
pg_ctl -D "$PGDATA" status
pg_ctl -D "$PGDATA" start

# "FATAL: role 'X' does not exist"
createuser X
# ou
psql -c "CREATE USER X;"

# "FATAL: database 'meubanco' does not exist"
createdb meubanco

# Trocar senha
psql -c "ALTER USER meuusuario WITH PASSWORD 'nova_senha';"

# Conexões ativas
psql -c "SELECT pid, usename, datname, state FROM pg_stat_activity;"

# Matar conexão
psql -c "SELECT pg_terminate_backend(PID);"

# Logs do servidor
tail -f $PGDATA/server.log

# Processo morre quando a tela apaga
termux-wake-lock`}),e.jsxs(a,{type:"success",title:"Dica",children:["Para acessar do PC ou de outro celular, descubra o IP do aparelho com"," ",e.jsx("code",{children:"ifconfig"})," (ou veja em Configurações > Wi-Fi). Lembre-se: em rede móvel o IP muda — para acesso estável, use Wi-Fi ou um túnel reverso (SSH, ngrok, cloudflared)."]})]})}export{l as default};

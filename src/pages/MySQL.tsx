import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function MySQL() {
    return (
      <PageContainer
        title="MySQL / MariaDB no Ubuntu"
        subtitle="Instalação, configuração, gerenciamento de bancos e usuários, backup, segurança, replicação e performance do MySQL/MariaDB."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <p>
          O <strong>MySQL</strong> é o banco de dados relacional open source mais popular do mundo,
          usado por WordPress, Facebook, Twitter e milhões de aplicações web. O <strong>MariaDB</strong>
          é um fork compatível criado pelo fundador original do MySQL, com melhorias de performance
          e recursos extras. No Ubuntu, ambos funcionam de forma quase idêntica.
        </p>

        <h2>1. Instalação</h2>
        <CodeBlock
          title="Instalar MySQL ou MariaDB"
          code={`# === MySQL ===
  sudo apt update
  sudo apt install -y mysql-server

  # === MariaDB (alternativa recomendada) ===
  sudo apt install -y mariadb-server

  # Verificar status
  sudo systemctl status mysql    # ou: mariadb
  sudo systemctl enable mysql

  # Verificar versão
  mysql --version
  # MySQL: Ver 8.0.37 ou MariaDB: Ver 10.11.7

  # Executar script de segurança (ESSENCIAL para produção)
  sudo mysql_secure_installation
  # 1. Definir senha do root (ou configurar validação)
  # 2. Remover usuários anônimos → Y
  # 3. Desabilitar login root remoto → Y
  # 4. Remover banco de teste → Y
  # 5. Recarregar tabelas de privilégios → Y`}
        />

        <h2>2. Acessar e Gerenciar</h2>
        <CodeBlock
          title="Comandos básicos do MySQL"
          code={`# Acessar como root (no Ubuntu, usa auth_socket por padrão)
  sudo mysql
  # Ou com senha:
  mysql -u root -p

  # Comandos internos:
  # SHOW DATABASES;       → listar bancos
  # USE nome_banco;       → selecionar banco
  # SHOW TABLES;          → listar tabelas
  # DESCRIBE tabela;      → ver estrutura da tabela
  # SHOW PROCESSLIST;     → ver conexões ativas
  # STATUS;               → informações do servidor
  # EXIT; ou \q           → sair

  # Criar banco de dados
  CREATE DATABASE meuapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

  # Criar usuário
  CREATE USER 'meuusuario'@'localhost' IDENTIFIED BY 'SenhaForte123!';

  # Dar permissões
  GRANT ALL PRIVILEGES ON meuapp.* TO 'meuusuario'@'localhost';
  FLUSH PRIVILEGES;

  # Permissões mais restritivas (produção)
  GRANT SELECT, INSERT, UPDATE, DELETE ON meuapp.* TO 'app_user'@'localhost';
  FLUSH PRIVILEGES;

  # Permitir acesso remoto (de qualquer IP)
  CREATE USER 'admin'@'%' IDENTIFIED BY 'SenhaForte123!';
  GRANT ALL ON meuapp.* TO 'admin'@'%';
  FLUSH PRIVILEGES;

  # Conectar com usuário
  mysql -u meuusuario -p meuapp

  # Executar SQL de um arquivo
  mysql -u meuusuario -p meuapp < script.sql

  # Executar SQL diretamente
  mysql -u meuusuario -p -e "SELECT COUNT(*) FROM meuapp.usuarios;"`}
        />

        <h2>3. SQL Essencial</h2>
        <CodeBlock
          title="Operações SQL comuns"
          code={`# Criar tabela
  CREATE TABLE usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL,
      ativo BOOLEAN DEFAULT TRUE,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_email (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  # Inserir dados
  INSERT INTO usuarios (nome, email, senha) VALUES
      ('João Silva', 'joao@email.com', SHA2('senha123', 256)),
      ('Maria Santos', 'maria@email.com', SHA2('senha456', 256));

  # Consultar
  SELECT * FROM usuarios;
  SELECT nome, email FROM usuarios WHERE ativo = TRUE ORDER BY nome;
  SELECT COUNT(*) as total FROM usuarios;

  # Atualizar
  UPDATE usuarios SET nome = 'João da Silva' WHERE id = 1;

  # Deletar
  DELETE FROM usuarios WHERE id = 3;

  # Joins
  SELECT p.titulo, u.nome AS autor
  FROM posts p
  INNER JOIN usuarios u ON p.autor_id = u.id
  WHERE p.publicado = TRUE;

  # Índices (acelerar consultas)
  CREATE INDEX idx_nome ON usuarios(nome);
  ALTER TABLE usuarios ADD INDEX idx_criado (criado_em);

  # Ver índices
  SHOW INDEX FROM usuarios;

  # Full-text search
  ALTER TABLE posts ADD FULLTEXT INDEX ft_conteudo (titulo, conteudo);
  SELECT * FROM posts WHERE MATCH(titulo, conteudo) AGAINST('ubuntu' IN BOOLEAN MODE);`}
        />

        <h2>4. Configuração</h2>
        <CodeBlock
          title="Configurar MySQL para performance e segurança"
          code={`# Arquivo de configuração
  sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
  # Ou MariaDB:
  sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf

  # Aceitar conexões externas (por padrão só aceita localhost)
  # bind-address = 0.0.0.0   ← aceita qualquer IP
  # bind-address = 127.0.0.1 ← apenas local (padrão, mais seguro)

  # Performance (para servidor com 8GB RAM):
  # innodb_buffer_pool_size = 4G    # 50-70% da RAM (cache de dados)
  # innodb_log_file_size = 256M     # Tamanho do redo log
  # max_connections = 150           # Máximo de conexões simultâneas
  # query_cache_type = 0            # Desabilitado no MySQL 8+ (usar ProxySQL)
  # slow_query_log = 1              # Logar queries lentas
  # slow_query_log_file = /var/log/mysql/slow.log
  # long_query_time = 1             # Queries > 1 segundo

  # Charset UTF-8 (para suportar emojis e caracteres especiais)
  # character-set-server = utf8mb4
  # collation-server = utf8mb4_unicode_ci

  # Reiniciar após mudanças
  sudo systemctl restart mysql

  # Verificar variáveis
  SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
  SHOW VARIABLES LIKE 'max_connections';
  SHOW VARIABLES LIKE 'slow_query_log';`}
        />

        <h2>5. Backup e Restauração</h2>
        <CodeBlock
          title="Backup do MySQL"
          code={`# Backup de um banco
  mysqldump -u root -p meuapp > backup-meuapp-$(date +%Y%m%d).sql

  # Backup de todos os bancos
  mysqldump -u root -p --all-databases > backup-todos-$(date +%Y%m%d).sql

  # Backup comprimido
  mysqldump -u root -p meuapp | gzip > backup-$(date +%Y%m%d).sql.gz

  # Backup com rotinas e triggers
  mysqldump -u root -p --routines --triggers meuapp > backup-completo.sql

  # Backup apenas estrutura (sem dados)
  mysqldump -u root -p --no-data meuapp > estrutura.sql

  # Backup apenas dados
  mysqldump -u root -p --no-create-info meuapp > dados.sql

  # Restaurar
  mysql -u root -p meuapp < backup.sql

  # Restaurar de arquivo comprimido
  gunzip < backup.sql.gz | mysql -u root -p meuapp

  # Script de backup automático
  cat > /usr/local/bin/backup-mysql.sh << 'SCRIPT'
  #!/bin/bash
  DIR="/backup/mysql"
  DATE=$(date +%Y%m%d_%H%M)
  mkdir -p "$DIR"

  mysqldump -u root --all-databases | gzip > "$DIR/all-$DATE.sql.gz"

  find "$DIR" -name "*.sql.gz" -mtime +7 -delete

  echo "Backup MySQL: $DATE"
  SCRIPT
  chmod +x /usr/local/bin/backup-mysql.sh`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com MySQL"
          code={`# Erro: "Access denied for user 'root'@'localhost'"
  # No Ubuntu, root usa auth_socket (não precisa de senha via sudo)
  sudo mysql
  # Para mudar para autenticação por senha:
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'NovaSenha123!';
  FLUSH PRIVILEGES;

  # Erro: "Can't connect to local MySQL server"
  # Verificar se está rodando:
  sudo systemctl status mysql
  sudo systemctl start mysql

  # Reset de senha do root (esqueceu a senha)
  sudo systemctl stop mysql
  sudo mysqld_safe --skip-grant-tables &
  mysql -u root
  USE mysql;
  # MySQL 8:
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'NovaSenha!';
  # MariaDB:
  SET PASSWORD FOR 'root'@'localhost' = PASSWORD('NovaSenha!');
  FLUSH PRIVILEGES;
  EXIT;
  sudo systemctl restart mysql

  # MySQL consumindo muita memória
  # Reduzir innodb_buffer_pool_size
  # Reduzir max_connections

  # Ver queries lentas
  sudo cat /var/log/mysql/slow.log

  # Ver tamanho dos bancos
  SELECT table_schema AS banco,
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Tamanho (MB)'
  FROM information_schema.TABLES
  GROUP BY table_schema
  ORDER BY SUM(data_length + index_length) DESC;`}
        />

        <AlertBox type="info" title="MySQL vs MariaDB">
          O MariaDB é um fork do MySQL criado pelo fundador original (Monty Widenius) após a 
          aquisição pela Oracle. São 99% compatíveis. O MariaDB tem: melhor performance em
          alguns cenários, mais storage engines, e é totalmente GPL. Para novos projetos,
          ambos são boas escolhas.
        </AlertBox>
      </PageContainer>
    );
  }
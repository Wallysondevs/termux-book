import{j as a}from"./index-C2xKMDcs.js";import{P as r}from"./PageContainer-D8Fa3g_u.js";import{C as o}from"./CodeBlock-OPQVSQze.js";import{I as e}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function u(){return a.jsxs(r,{title:"MariaDB no Termux",subtitle:"Instalação, configuração, gerenciamento de bancos e usuários, backup e performance do MariaDB (substituto do MySQL) no Termux.",difficulty:"intermediario",timeToRead:"30 min",children:[a.jsxs(e,{type:"warning",title:"Use 'mariadb', não 'mysql'",children:["O Termux ",a.jsxs("strong",{children:["não distribui o pacote ",a.jsx("code",{children:"mysql"})]}),". O equivalente oficial é o ",a.jsx("strong",{children:"MariaDB"})," (",a.jsx("code",{children:"pkg install mariadb"}),"), um fork 100% compatível criado pelo autor original do MySQL. O cliente ",a.jsx("code",{children:"mysql"})," e utilitários como ",a.jsx("code",{children:"mysqldump"})," vêm junto e mantêm os mesmos comandos."]}),a.jsxs("p",{children:["O ",a.jsx("strong",{children:"MariaDB"})," é um banco de dados relacional open source totalmente compatível com o MySQL. No Termux roda nativo (sem proot, sem root) e é ótimo para APIs locais, prototipagem, testes e mesmo pequenos serviços expostos na rede local."]}),a.jsxs(e,{type:"info",title:"Caveats no Android",children:["Não há ",a.jsx("code",{children:"systemd"})," no Termux — o servidor é iniciado manualmente (",a.jsx("code",{children:"mariadbd"}),") ou via runit (",a.jsx("code",{children:"sv-enable mariadb"}),"). Portas abaixo de 1024 exigem root; o MariaDB usa 3306 (livre). Os arquivos ficam em",a.jsx("code",{children:" $PREFIX/var/lib/mysql"})," e configs em ",a.jsx("code",{children:"$PREFIX/etc/my.cnf.d/"}),"."]}),a.jsx("h2",{children:"1. Instalação"}),a.jsx(o,{title:"Instalar o MariaDB no Termux",code:`# Atualizar índices e instalar
pkg update
pkg install -y mariadb

# Verificar versão (cliente e servidor compartilham binários)
mariadb --version
mariadbd --version

# Inicializar o diretório de dados (apenas na primeira vez)
mariadb-install-db

# Diretórios usados:
#   Dados:  $PREFIX/var/lib/mysql
#   Conf:   $PREFIX/etc/my.cnf.d/
#   Socket: $PREFIX/tmp/mysql.sock`}),a.jsx("h2",{children:"2. Iniciar e Parar o Servidor"}),a.jsx(o,{title:"Subir o mariadbd no Termux",code:`# Iniciar em background (uma sessão Termux)
mariadbd-safe &

# Parar
mysqladmin -u root shutdown

# Como serviço via runit (persistente entre sessões)
pkg install -y termux-services
sv-enable mariadb
sv up mariadb        # iniciar
sv down mariadb      # parar
sv status mariadb    # status

# Dica: rode 'termux-wake-lock' para evitar que o Android
# mate o processo quando a tela apaga.`}),a.jsx("h2",{children:"3. Acessar e Gerenciar"}),a.jsx(o,{title:"Comandos básicos do cliente mysql/mariadb",code:`# Acessar como root (sem senha por padrão no Termux)
mariadb -u root
# ou: mysql -u root  (alias do mesmo cliente)

# Comandos internos:
# SHOW DATABASES;       → listar bancos
# USE nome_banco;       → selecionar banco
# SHOW TABLES;          → listar tabelas
# DESCRIBE tabela;      → ver estrutura
# SHOW PROCESSLIST;     → conexões ativas
# STATUS;               → infos do servidor
# EXIT; ou \\q          → sair

# Criar banco
CREATE DATABASE meuapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Criar usuário
CREATE USER 'meuusuario'@'localhost' IDENTIFIED BY 'SenhaForte123!';

# Permissões
GRANT ALL PRIVILEGES ON meuapp.* TO 'meuusuario'@'localhost';
FLUSH PRIVILEGES;

# Permissões mais restritas
GRANT SELECT, INSERT, UPDATE, DELETE ON meuapp.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;

# Permitir acesso de outros dispositivos da LAN (cuidado!)
CREATE USER 'admin'@'%' IDENTIFIED BY 'SenhaForte123!';
GRANT ALL ON meuapp.* TO 'admin'@'%';
FLUSH PRIVILEGES;

# Conectar com usuário
mariadb -u meuusuario -p meuapp

# Executar SQL de arquivo
mariadb -u meuusuario -p meuapp < script.sql

# Executar SQL inline
mariadb -u meuusuario -p -e "SELECT COUNT(*) FROM meuapp.usuarios;"`}),a.jsx("h2",{children:"4. SQL Essencial"}),a.jsx(o,{title:"Operações SQL comuns",code:`-- Criar tabela
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserir
INSERT INTO usuarios (nome, email, senha) VALUES
    ('João Silva', 'joao@email.com', SHA2('senha123', 256)),
    ('Maria Santos', 'maria@email.com', SHA2('senha456', 256));

-- Consultar
SELECT * FROM usuarios;
SELECT nome, email FROM usuarios WHERE ativo = TRUE ORDER BY nome;

-- Atualizar / deletar
UPDATE usuarios SET nome = 'João da Silva' WHERE id = 1;
DELETE FROM usuarios WHERE id = 3;

-- Joins
SELECT p.titulo, u.nome AS autor
FROM posts p
INNER JOIN usuarios u ON p.autor_id = u.id
WHERE p.publicado = TRUE;

-- Índices
CREATE INDEX idx_nome ON usuarios(nome);
SHOW INDEX FROM usuarios;

-- Full-text search
ALTER TABLE posts ADD FULLTEXT INDEX ft_conteudo (titulo, conteudo);
SELECT * FROM posts WHERE MATCH(titulo, conteudo) AGAINST('termux' IN BOOLEAN MODE);`}),a.jsx("h2",{children:"5. Configuração"}),a.jsx(o,{title:"Tunar performance e segurança no Termux",code:`# Arquivo principal
nano $PREFIX/etc/my.cnf.d/mariadb-server.cnf

# Aceitar conexões da LAN (padrão é só localhost):
# [mysqld]
# bind-address = 0.0.0.0
# port         = 3306

# Performance (celular típico — vá com calma com a RAM):
# innodb_buffer_pool_size = 128M    # poucos MB no celular!
# innodb_log_file_size    = 32M
# max_connections         = 30

# Charset UTF-8 (emojis e acentos)
# character-set-server = utf8mb4
# collation-server     = utf8mb4_unicode_ci

# Reiniciar
mysqladmin -u root shutdown
mariadbd-safe &

# Verificar variáveis
mariadb -u root -e "SHOW VARIABLES LIKE 'innodb_buffer_pool_size';"
mariadb -u root -e "SHOW VARIABLES LIKE 'max_connections';"`}),a.jsx("h2",{children:"6. Backup e Restauração"}),a.jsx(o,{title:"Backup com mysqldump (vem com o pacote mariadb)",code:`# Backup de um banco
mysqldump -u root meuapp > backup-meuapp-$(date +%Y%m%d).sql

# Todos os bancos
mysqldump -u root --all-databases > backup-todos-$(date +%Y%m%d).sql

# Comprimido
mysqldump -u root meuapp | gzip > backup-$(date +%Y%m%d).sql.gz

# Estrutura / dados separados
mysqldump -u root --no-data meuapp > estrutura.sql
mysqldump -u root --no-create-info meuapp > dados.sql

# Restaurar
mariadb -u root meuapp < backup.sql
gunzip < backup.sql.gz | mariadb -u root meuapp

# Backup automático (script salvo no storage compartilhado)
termux-setup-storage   # autoriza acesso a ~/storage
cat > $PREFIX/bin/backup-mariadb.sh << 'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
DIR="$HOME/storage/shared/Backups/mariadb"
DATE=$(date +%Y%m%d_%H%M)
mkdir -p "$DIR"
mysqldump -u root --all-databases | gzip > "$DIR/all-$DATE.sql.gz"
find "$DIR" -name "*.sql.gz" -mtime +7 -delete
echo "Backup MariaDB: $DATE"
SCRIPT
chmod +x $PREFIX/bin/backup-mariadb.sh`}),a.jsx("h2",{children:"Troubleshooting"}),a.jsx(o,{title:"Problemas comuns no Termux",code:`# "Can't connect to local MySQL server through socket"
# O servidor não está rodando — suba:
mariadbd-safe &

# "Access denied for user 'root'@'localhost'"
# Sem senha por padrão; basta:
mariadb -u root

# Definir senha do root
mariadb -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'NovaSenha!'; FLUSH PRIVILEGES;"

# Reset de senha esquecida
mysqladmin -u root shutdown
mariadbd-safe --skip-grant-tables &
mariadb -u root -e "FLUSH PRIVILEGES; ALTER USER 'root'@'localhost' IDENTIFIED BY 'NovaSenha!';"
mysqladmin -u root -p shutdown
mariadbd-safe &

# Processo morrendo quando a tela apaga
termux-wake-lock

# Tamanho dos bancos
mariadb -u root -e "SELECT table_schema AS banco,
  ROUND(SUM(data_length + index_length)/1024/1024, 2) AS MB
  FROM information_schema.TABLES GROUP BY table_schema;"

# Logs
ls $PREFIX/var/lib/mysql/*.err`}),a.jsxs(e,{type:"info",title:"MariaDB = MySQL no Termux",children:["Tudo que você aprende sobre MySQL (sintaxe SQL, drivers ",a.jsx("code",{children:"mysql-connector"}),", WordPress, frameworks etc) funciona com o MariaDB. A diferença prática no Termux é só o nome do pacote (",a.jsx("code",{children:"mariadb"}),") e a ausência de ",a.jsx("code",{children:"systemctl"})," — use ",a.jsx("code",{children:"mariadbd-safe &"})," ou ",a.jsx("code",{children:"termux-services"}),"."]})]})}export{u as default};

import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Samba() {
  return (
    <PageContainer
      title="Samba (smbclient) no Termux"
      subtitle="Como acessar compartilhamentos SMB/CIFS de Windows, NAS e Linux a partir do Termux usando o cliente smbclient."
      difficulty="intermediario"
      timeToRead="20 min"
    >
      <AlertBox type="warning" title="Servidor Samba NÃO funciona bem no Android">
        Rodar um <strong>servidor Samba (smbd)</strong> no Termux é praticamente inviável:
        <br />• A porta <strong>445/TCP</strong> é reservada pelo Android e não pode ser
        ligada por apps sem root.
        <br />• Sem root não há broadcast SMB, então o aparelho não aparece em
        "Vizinhança de Rede" do Windows.
        <br />• Não existe <code>systemd</code> e não existem usuários Unix completos para o
        backend de autenticação.
        <br />Por isso este capítulo cobre apenas o <strong>cliente</strong>{" "}
        (<code>smbclient</code>), que funciona muito bem para acessar Windows, NAS, roteadores
        e servidores Linux/macOS a partir do seu celular.
      </AlertBox>

      <p>
        O protocolo <strong>SMB/CIFS</strong> é o padrão usado por Windows e NAS para
        compartilhar pastas e impressoras. No Termux você pode <em>consumir</em> esses
        compartilhamentos com o utilitário <code>smbclient</code>, listar pastas, baixar
        arquivos e até montar (com root) um share remoto.
      </p>

      <h2>1. Instalação</h2>
      <CodeBlock
        title="Instalar o cliente Samba no Termux"
        code={`pkg update
pkg install -y samba

# Esse pacote traz:
#   smbclient   → cliente interativo (estilo FTP)
#   nmblookup   → resolver nomes NetBIOS
#   rpcclient   → consultas RPC ao servidor

# Verificar versão
smbclient --version`}
      />

      <h2>2. Descobrir Servidores na Rede</h2>
      <CodeBlock
        title="Listar máquinas SMB visíveis"
        code={`# Resolver nome NetBIOS para IP (se a rede permitir broadcast)
nmblookup MEU-PC

# Listar compartilhamentos de um servidor
smbclient -L //192.168.0.10 -N
# -L  lista shares
# -N  conexão sem senha (guest)

# Com usuário/senha
smbclient -L //192.168.0.10 -U usuario
# (digita a senha quando pedido)

# Especificar workgroup
smbclient -L //192.168.0.10 -U usuario -W WORKGROUP`}
      />

      <h2>3. Acessar um Compartilhamento</h2>
      <CodeBlock
        title="Sessão interativa estilo FTP"
        code={`# Conectar a um share
smbclient //192.168.0.10/Documentos -U usuario

# Comandos dentro da shell smb:
#   ls               → listar
#   cd pasta         → entrar em pasta
#   get arquivo      → baixar
#   put arquivo      → enviar
#   mget *.pdf       → baixar vários
#   mput *.jpg       → enviar vários
#   recurse ON; prompt OFF; mget *  → baixar tudo recursivo
#   mkdir pasta      → criar pasta
#   rm arquivo       → apagar
#   exit             → sair

# Acesso anônimo (guest)
smbclient //192.168.0.10/Publico -N

# Conexão usando arquivo de credenciais (não expõe senha em ps)
cat > ~/.smbcred <<'EOF'
username=usuario
password=minha_senha
domain=WORKGROUP
EOF
chmod 600 ~/.smbcred
smbclient //192.168.0.10/Documentos -A ~/.smbcred`}
      />

      <h2>4. Baixar e Enviar Arquivos em Lote</h2>
      <CodeBlock
        title="Cópias não interativas via smbclient"
        code={`# Baixar um único arquivo direto
smbclient //192.168.0.10/Documentos -U usuario \\
  -c "get relatorio.pdf $HOME/storage/downloads/relatorio.pdf"

# Enviar arquivo
smbclient //192.168.0.10/Documentos -U usuario \\
  -c "put $HOME/storage/dcim/foto.jpg foto.jpg"

# Sincronizar uma pasta inteira
smbclient //192.168.0.10/Documentos -U usuario -c "
  recurse ON
  prompt OFF
  cd Projetos
  lcd $HOME/storage/shared/Backup
  mget *
"

# Antes disso, dê acesso ao storage compartilhado:
termux-setup-storage`}
      />

      <h2>5. Montar um Share (apenas com ROOT)</h2>
      <CodeBlock
        title="Montar via cifs-utils — só funciona em aparelho com root"
        code={`# IMPORTANTE: 'mount -t cifs' só funciona se o kernel tiver suporte
# a CIFS habilitado E você tiver root no aparelho.
# A maioria dos celulares NÃO atende a esses dois requisitos.

# Se atender:
pkg install -y cifs-utils
mkdir -p $HOME/mnt/samba
su -c "mount -t cifs //192.168.0.10/Documentos $HOME/mnt/samba \\
  -o username=usuario,password=senha,uid=$(id -u),gid=$(id -g)"

# Para usuários sem root: prefira sempre 'smbclient' ou um app
# Android nativo (ex.: "X-plore", "Solid Explorer", "CX File Explorer")
# que implementam SMB em userspace.`}
      />

      <h2>Troubleshooting</h2>
      <CodeBlock
        title="Problemas comuns no Termux"
        code={`# "NT_STATUS_HOST_UNREACHABLE"
# Confira o IP e se o aparelho está na mesma rede:
ping 192.168.0.10

# "NT_STATUS_LOGON_FAILURE"
# Usuário, senha ou domínio errado. Algumas redes pedem o domínio:
smbclient //192.168.0.10/Share -U "DOMINIO\\\\usuario"

# "protocol negotiation failed: NT_STATUS_CONNECTION_RESET"
# O servidor exige SMB1 (legado) ou SMB3 mínimo. Forçar versão:
smbclient -m SMB3 //192.168.0.10/Share -U usuario
smbclient -m NT1  //192.168.0.10/Share -U usuario   # legacy

# Servidor não aparece via nmblookup
# Roteadores modernos bloqueiam broadcast. Use o IP direto.

# Acentos errados nos nomes dos arquivos
smbclient //srv/Share -U user --option='unix charset=UTF-8'`}
      />

      <AlertBox type="info" title="Para servir arquivos do celular">
        Se o seu objetivo é deixar arquivos do celular acessíveis a outros dispositivos da
        rede, prefira protocolos que funcionam bem sem root: <strong>SSH/SFTP</strong>{" "}
        (<code>pkg install openssh</code> + <code>sshd</code>),{" "}
        <strong>HTTP estático</strong> (<code>python -m http.server 8080</code>) ou um
        <strong> servidor WebDAV</strong>. Para SMB de verdade, use um app Android como
        "Servers Ultimate" ou um NAS dedicado.
      </AlertBox>
    </PageContainer>
  );
}

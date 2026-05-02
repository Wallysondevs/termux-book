import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, Output, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Usuarios() {
  return (
    <PageContainer
      title="Usuários, Grupos e sudo"
      subtitle="Tudo sobre /etc/passwd, /etc/shadow, /etc/group, useradd/adduser, usermod, passwd, chage, sudoers, PAM e o ecossistema completo de gestão de identidades no Ubuntu 24.04."
      difficulty="intermediario"
      timeToRead="55 min"
      category="Usuários e Processos"
    >
      <p>
        O Linux é um sistema operacional <strong>multiusuário</strong> e <strong>multitarefa</strong> desde
        as suas origens em 1991. Cada arquivo, cada processo, cada conexão de rede está associada a um
        usuário (UID) e a um grupo (GID), que determinam o que aquele processo pode ou não fazer. Saber
        gerir usuários no Ubuntu é a habilidade mais fundamental de qualquer sysadmin: sem ela, nada de
        permissões, nada de sudo, nada de hardening, nada de SSH com restrições. Esta página cobre cada
        arquivo, cada comando e cada flag importante do ecossistema de identidades no Ubuntu 24.04 LTS.
      </p>

      <p>
        O Ubuntu segue uma filosofia particular dentro do mundo Debian: <strong>o usuário root vem
        bloqueado</strong> (sem senha definida, com asterisco no shadow). Você nunca faz login direto
        como root: o primeiro usuário criado durante a instalação é colocado no grupo <code>sudo</code> e
        usa <code>sudo</code> para escalar privilégios. Isso é ótimo para auditoria, mas exige entender
        muito bem como o sudo funciona.
      </p>

      <Terminal title="wallyson@ubuntu: ~">
        <Command
          command="whoami && id"
          comment="Quem sou eu agora? Que UID/GID e grupos secundários?"
          output={`wallyson
uid=1000(wallyson) gid=1000(wallyson) grupos=1000(wallyson),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),100(users),114(lpadmin),134(lxd)`}
        />
        <Command
          command="getent passwd wallyson"
          comment="A entrada completa do usuário, lendo via NSS"
          output={`wallyson:x:1000:1000:Wallyson Silva,,,:/home/wallyson:/bin/bash`}
        />
      </Terminal>

      <h2>1. Os arquivos de identidade</h2>

      <p>
        O Linux guarda informação sobre usuários e grupos em quatro arquivos de texto puro localizados
        em <code>/etc/</code>. Eles são lidos por bibliotecas (NSS — Name Service Switch) e por PAM,
        nunca diretamente por aplicações comuns. Mexer neles à mão é possível mas frágil — sempre
        prefira os comandos <code>useradd</code>, <code>usermod</code>, <code>passwd</code>,
        <code>vipw</code>, <code>vigr</code>.
      </p>

      <h3>/etc/passwd — usuários do sistema</h3>

      <p>
        Apesar do nome, <strong>não contém senhas</strong>. É legível por todos os usuários porque
        muitos comandos (como <code>ls -l</code>) precisam mapear UID para nome. Cada linha tem 7
        campos separados por dois-pontos (<code>:</code>):
      </p>

      <File path="/etc/passwd (linha do wallyson)">
{`wallyson:x:1000:1000:Wallyson Silva,,,:/home/wallyson:/bin/bash
│        │ │    │    │              │              │
│        │ │    │    │              │              └─ shell de login (/bin/bash, /bin/false, /usr/sbin/nologin...)
│        │ │    │    │              └─────────────── diretório home
│        │ │    │    └────────────────────────────── GECOS (nome real, sala, telefones — separados por vírgula)
│        │ │    └─────────────────────────────────── GID primário (referência a /etc/group)
│        │ └──────────────────────────────────────── UID (0=root, 1-999=sistema, 1000+=humanos no Ubuntu)
│        └────────────────────────────────────────── senha (sempre 'x' — verdadeira está em /etc/shadow)
└─────────────────────────────────────────────────── nome de login`}
      </File>

      <Terminal>
        <Command
          command="head -5 /etc/passwd"
          output={`root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync`}
        />
        <Command
          command="tail -5 /etc/passwd"
          output={`systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
wallyson:x:1000:1000:Wallyson Silva,,,:/home/wallyson:/bin/bash
lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
fwupd-refresh:x:113:121:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin
postgres:x:114:122:PostgreSQL administrator,,,:/var/lib/postgresql:/bin/bash`}
        />
        <Command
          command="wc -l /etc/passwd"
          comment="Quantos usuários (incluindo de sistema)"
          output={`38 /etc/passwd`}
        />
        <Command
          command="awk -F: '$3 >= 1000 && $3 < 65534 {print $1, $3}' /etc/passwd"
          comment="Apenas humanos (UID >= 1000 e != nobody)"
          output={`wallyson 1000
ana 1001
joao 1002`}
        />
      </Terminal>

      <h3>/etc/shadow — senhas e políticas</h3>

      <p>
        Este sim contém os <em>hashes</em> das senhas. Permissões 640 (root:shadow), nunca legível por
        usuários comuns. Nove campos:
      </p>

      <File path="/etc/shadow (linha do wallyson, sudo cat /etc/shadow)">
{`wallyson:$y$j9T$LdGB1...$kPQrSt/...:20056:0:99999:7:::
│        │                            │     │ │     │ │││
│        │                            │     │ │     │ │││└─ reservado
│        │                            │     │ │     │ ││└── data de expiração da conta (dias desde 1970)
│        │                            │     │ │     │ │└─── dias antes da expiração para conta inativa
│        │                            │     │ │     │ └──── dias de aviso antes da senha expirar
│        │                            │     │ │     └────── tempo máximo de validade da senha (99999 ≈ nunca)
│        │                            │     │ └──────────── tempo mínimo entre trocas de senha
│        │                            │     └────────────── última troca de senha (em dias desde 1970)
│        │                            └──────────────────── (continuação do hash)
│        └───────────────────────────────────────────────── hash da senha ($y$ = yescrypt, padrão Ubuntu 22.04+)
└────────────────────────────────────────────────────────── login`}
      </File>

      <p>
        Os prefixos <code>$id$</code> identificam o algoritmo de hash:
      </p>

      <table>
        <thead><tr><th>Prefixo</th><th>Algoritmo</th><th>Status no Ubuntu</th></tr></thead>
        <tbody>
          <tr><td><code>$1$</code></td><td>MD5</td><td>obsoleto, jamais use</td></tr>
          <tr><td><code>$2a$ $2b$ $2y$</code></td><td>bcrypt</td><td>aceito mas não default</td></tr>
          <tr><td><code>$5$</code></td><td>SHA-256</td><td>aceito (legacy)</td></tr>
          <tr><td><code>$6$</code></td><td>SHA-512</td><td>default no Ubuntu 20.04 e anteriores</td></tr>
          <tr><td><code>$y$</code></td><td>yescrypt</td><td>default no Ubuntu 22.04+ (mais resistente)</td></tr>
        </tbody>
      </table>

      <Terminal>
        <Command
          root
          command="awk -F: '{print $1, substr($2,1,3)}' /etc/shadow | head -8"
          output={`root *
daemon *
bin *
sys *
sync *
games *
man *
wallyson $y$`}
        />
        <Command
          root
          command="grep '^wallyson:' /etc/shadow | cut -d: -f3,5"
          comment="Última troca (dias desde 1970) e validade máxima"
          output={`20056:99999`}
        />
        <Command
          command="date -d '1970-01-01 +20056 days' '+%Y-%m-%d'"
          comment="Convertendo dias-de-época em data legível"
          output={`2024-12-08`}
        />
      </Terminal>

      <InfoBox type="warning" title="Conta bloqueada vs sem senha">
        Um <code>!</code> ou <code>*</code> no início do hash significa <strong>conta bloqueada</strong>
        (não consegue logar com senha — ainda pode com chave SSH). Um campo vazio significa
        <strong>conta sem senha</strong> (extremamente perigoso — qualquer um loga). Use <code>passwd -S
        usuario</code> para ver o estado.
      </InfoBox>

      <h3>/etc/group — grupos</h3>

      <File path="/etc/group">
{`sudo:x:27:wallyson,ana
│    │ │  │
│    │ │  └─ membros (lista separada por vírgula)
│    │ └──── GID
│    └────── senha do grupo (raríssimo usar; quase sempre 'x')
└─────────── nome do grupo`}
      </File>

      <Terminal>
        <Command
          command="getent group sudo"
          output={`sudo:x:27:wallyson,ana`}
        />
        <Command
          command="groups wallyson"
          comment="Todos os grupos do usuário"
          output={`wallyson : wallyson adm cdrom sudo dip plugdev users lpadmin lxd`}
        />
        <Command
          command="getent group | awk -F: '$3 >= 1000 && $3 < 65534'"
          comment="Grupos criados por humanos"
          output={`wallyson:x:1000:
ana:x:1001:
joao:x:1002:
docker:x:998:wallyson
desenvolvedores:x:1100:wallyson,ana,joao`}
        />
      </Terminal>

      <h3>/etc/gshadow — senhas de grupo</h3>

      <p>
        Praticamente nunca usado em sistemas modernos, mas existe por simetria com shadow. Permissão
        640 (root:shadow). Quatro campos: <code>nome:hash:admins:membros</code>.
      </p>

      <Terminal>
        <Command
          root
          command="head -5 /etc/gshadow"
          output={`root:*::
daemon:*::
bin:*::
sys:*::
adm:*::syslog,wallyson`}
        />
      </Terminal>

      <h3>Grupos importantes que o Ubuntu cria</h3>

      <table>
        <thead><tr><th>Grupo</th><th>GID</th><th>Para quê serve</th></tr></thead>
        <tbody>
          <tr><td>root</td><td>0</td><td>superusuário</td></tr>
          <tr><td>adm</td><td>4</td><td>leitura de logs em /var/log</td></tr>
          <tr><td>tty</td><td>5</td><td>acesso a terminais virtuais</td></tr>
          <tr><td>disk</td><td>6</td><td>acesso bruto a /dev/sd*, /dev/nvme* (cuidado!)</td></tr>
          <tr><td>sudo</td><td>27</td><td>autorização para escalar privilégios via sudo</td></tr>
          <tr><td>audio</td><td>29</td><td>acesso a /dev/snd/* (PipeWire abstrai)</td></tr>
          <tr><td>video</td><td>44</td><td>acesso a /dev/video* (webcam, GPU)</td></tr>
          <tr><td>plugdev</td><td>46</td><td>montar dispositivos removíveis</td></tr>
          <tr><td>netdev</td><td>118</td><td>controlar interfaces de rede via NetworkManager</td></tr>
          <tr><td>lpadmin</td><td>114</td><td>administrar impressoras via CUPS</td></tr>
          <tr><td>docker</td><td>variável</td><td>usar docker sem sudo (= root, atenção)</td></tr>
        </tbody>
      </table>

      <h2>2. useradd — criar usuário (baixo nível)</h2>

      <p>
        <code>useradd</code> é a ferramenta de baixo nível, presente em qualquer Linux. Não cria home
        nem copia skel sem flags explícitas. Lê defaults de <code>/etc/default/useradd</code> e
        <code>/etc/login.defs</code>.
      </p>

      <Terminal>
        <Command
          root
          command="useradd --help"
          output={`Uso: useradd [opções] LOGIN
       useradd -D
       useradd -D [opções]

Opções:
  -b, --base-dir BASE_DIR       diretório base para o home
  -c, --comment COMMENT         campo GECOS do novo usuário
  -d, --home-dir HOME_DIR       diretório home do novo usuário
  -D, --defaults                imprimir ou alterar a configuração padrão
  -e, --expiredate EXPIRE_DATE  data de expiração da conta
  -f, --inactive INACTIVE       período de inatividade da senha
  -g, --gid GROUP               nome ou ID do grupo primário
  -G, --groups GROUPS           lista de grupos suplementares
  -h, --help                    exibir mensagem de ajuda
  -k, --skel SKEL_DIR           diretório skel alternativo
  -K, --key KEY=VALUE           sobrescrever defaults de /etc/login.defs
  -l, --no-log-init             não adicionar ao banco lastlog/faillog
  -m, --create-home             criar diretório home
  -M, --no-create-home          não criar diretório home
  -N, --no-user-group           não criar grupo do mesmo nome
  -o, --non-unique              permitir UID duplicado
  -p, --password PASSWORD       senha criptografada
  -r, --system                  criar conta de sistema
  -s, --shell SHELL             shell de login
  -u, --uid UID                 UID do novo usuário
  -U, --user-group              criar grupo do mesmo nome
  -Z, --selinux-user SEUSER     usuário SELinux para mapeamento`}
        />
        <Command
          root
          command="useradd -D"
          comment="Mostra os defaults"
          output={`GROUP=100
HOME=/home
INACTIVE=-1
EXPIRE=
SHELL=/bin/sh
SKEL=/etc/skel
CREATE_MAIL_SPOOL=no`}
        />
      </Terminal>

      <InfoBox type="warning" title="useradd no Ubuntu = shell errado!">
        Repare que o default é <code>SHELL=/bin/sh</code>. Quase ninguém quer isso. Por isso o Ubuntu
        recomenda <code>adduser</code> (que usa <code>/bin/bash</code> e é interativo). Se for usar
        <code>useradd</code>, sempre passe <code>-s /bin/bash -m</code>.
      </InfoBox>

      <h3>Exemplos práticos com useradd</h3>

      <Terminal>
        <Command
          root
          command="useradd -m -s /bin/bash -c 'Maria Souza' -G sudo,docker maria"
          comment="Cria maria com home, bash, GECOS e nos grupos sudo e docker"
        />
        <Command
          root
          command="getent passwd maria"
          output={`maria:x:1003:1003:Maria Souza:/home/maria:/bin/bash`}
        />
        <Command
          root
          command="ls -la /home/maria"
          output={`total 20
drwxr-x--- 2 maria maria 4096 abr  9 14:32 .
drwxr-xr-x 5 root  root  4096 abr  9 14:32 ..
-rw-r--r-- 1 maria maria  220 abr  9 14:32 .bash_logout
-rw-r--r-- 1 maria maria 3771 abr  9 14:32 .bashrc
-rw-r--r-- 1 maria maria  807 abr  9 14:32 .profile`}
        />
        <Command
          root
          command="passwd maria"
          comment="Define a senha (a conta vem bloqueada por padrão)"
          output={`Nova senha: 
Redigite a nova senha: 
passwd: senha atualizada com sucesso`}
        />
        <Command
          root
          command="passwd -S maria"
          comment="Status: PS=password set, conta liberada"
          output={`maria PS 2025-04-09 0 99999 7 -1 (Senha definida, yescrypt.)`}
        />
      </Terminal>

      <h3>Usuário de sistema (para serviços)</h3>

      <Terminal>
        <Command
          root
          command="useradd -r -s /usr/sbin/nologin -d /var/lib/myapp -M myapp"
          comment="-r = UID baixo (sistema), nologin, sem home criado"
        />
        <Command
          root
          command="getent passwd myapp"
          output={`myapp:x:115:122::/var/lib/myapp:/usr/sbin/nologin`}
        />
      </Terminal>

      <h3>Forçar UID/GID específicos (containers/migração)</h3>

      <Terminal>
        <Command
          root
          command="useradd -m -u 2000 -g 2000 -s /bin/bash backup"
          comment="UID e GID fixos"
        />
        <Command
          root
          command="id backup"
          output={`uid=2000(backup) gid=2000(backup) grupos=2000(backup)`}
        />
      </Terminal>

      <h3>Conta com expiração</h3>

      <Terminal>
        <Command
          root
          command="useradd -m -s /bin/bash -e 2025-12-31 estagiario"
          comment="Conta expira automaticamente em 31/12/2025"
        />
        <Command
          root
          command="chage -l estagiario"
          output={`Última alteração de senha                                  : nunca
A senha expira                                             : nunca
Senha inativa                                              : nunca
Conta expira                                               : dez 31, 2025
Número mínimo de dias entre as alterações de senha         : 0
Número máximo de dias entre alterações de senha            : 99999
Número de dias de aviso antes da senha expirar             : 7`}
        />
      </Terminal>

      <h2>3. adduser — wrapper interativo (preferido no Ubuntu)</h2>

      <p>
        <code>adduser</code> é um script Perl criado pelo Debian que <strong>chama</strong>
        <code>useradd</code> mas com defaults sensatos: cria home, copia <code>/etc/skel</code>, define
        bash, pergunta senha e GECOS. <strong>É a forma idiomática no Ubuntu</strong>.
      </p>

      <Terminal>
        <Command
          root
          command="adduser carlos"
          output={`Adding user 'carlos' ...
Adding new group 'carlos' (1004) ...
Adding new user 'carlos' (1004) with group 'carlos' (1004) ...
Creating home directory '/home/carlos' ...
Copying files from '/etc/skel' ...
Nova senha: 
Redigite a nova senha: 
passwd: senha atualizada com sucesso
Changing the user information for carlos
Enter the new value, or press ENTER for the default
        Full Name []: Carlos Pereira
        Room Number []: 
        Work Phone []: 
        Home Phone []: 
        Other []: 
Is the information correct? [Y/n] Y
Adding new user 'carlos' to supplemental groups 'users' ...
Adding user 'carlos' to group 'users' ...`}
        />
      </Terminal>

      <h3>Adicionar a um grupo</h3>

      <Terminal>
        <Command
          root
          command="adduser carlos sudo"
          output={`Adding user 'carlos' to group 'sudo' ...
Adding user carlos to group sudo
Done.`}
        />
        <Command
          root
          command="adduser carlos docker"
          output={`Adding user 'carlos' to group 'docker' ...
Adding user carlos to group docker
Done.`}
        />
      </Terminal>

      <InfoBox type="tip" title="adduser sem prompts (script)">
        Para automação, <code>adduser</code> aceita <code>--gecos '' --disabled-password</code> e você
        define a senha depois com <code>chpasswd</code>: <code>echo 'carlos:Senh@123' | chpasswd</code>.
      </InfoBox>

      <h2>4. usermod — modificar usuário existente</h2>

      <Terminal>
        <Command
          root
          command="usermod --help"
          output={`Uso: usermod [opções] LOGIN

Opções:
  -c, --comment COMMENT         novo valor para campo GECOS
  -d, --home HOME_DIR           novo diretório home
  -e, --expiredate EXPIRE_DATE  data de expiração da conta
  -f, --inactive INACTIVE       inatividade da senha
  -g, --gid GROUP               novo grupo primário
  -G, --groups GROUPS           lista de grupos suplementares (substitui!)
  -a, --append                  adicionar a grupos (usar com -G)
  -l, --login NEW_LOGIN         novo nome de login
  -L, --lock                    bloquear a conta
  -m, --move-home               mover conteúdo do home (usar com -d)
  -p, --password PASSWORD       nova senha criptografada
  -s, --shell SHELL             novo shell de login
  -u, --uid UID                 novo UID
  -U, --unlock                  desbloquear a conta
  -Z, --selinux-user SEUSER     novo mapeamento SELinux`}
        />
      </Terminal>

      <InfoBox type="danger" title="usermod -G SEM -a destrói grupos!">
        <code>usermod -G docker carlos</code> remove carlos de TODOS os outros grupos suplementares
        (incluindo sudo!) e o coloca apenas em docker. Sempre use <code>-aG</code> para adicionar:
        <code>usermod -aG docker carlos</code>.
      </InfoBox>

      <Terminal>
        <Command
          root
          command="usermod -aG docker,libvirt carlos"
          comment="Adiciona carlos a docker E libvirt (preserva os outros)"
        />
        <Command
          root
          command="id carlos"
          output={`uid=1004(carlos) gid=1004(carlos) grupos=1004(carlos),27(sudo),100(users),135(libvirt),998(docker)`}
        />
        <Command
          root
          command="usermod -s /usr/bin/zsh carlos"
          comment="Trocar shell"
        />
        <Command
          root
          command="usermod -L carlos"
          comment="Bloquear (insere ! antes do hash em /etc/shadow)"
        />
        <Command
          root
          command="passwd -S carlos"
          output={`carlos L 2025-04-09 0 99999 7 -1 (Senha bloqueada.)`}
        />
        <Command
          root
          command="usermod -U carlos"
          comment="Desbloquear"
        />
        <Command
          root
          command="usermod -l charles -d /home/charles -m carlos"
          comment="Renomeia carlos→charles e move o home"
        />
      </Terminal>

      <h2>5. userdel — remover usuário</h2>

      <Terminal>
        <Command
          root
          command="userdel charles"
          comment="Remove o usuário, MAS deixa /home/charles intocado"
        />
        <Command
          root
          command="userdel -r maria"
          comment="-r = remove home, mailspool e tudo associado"
          output={`userdel: maria mail spool (/var/mail/maria) not found`}
        />
        <Command
          root
          command="userdel -r -f estagiario"
          comment="-f = força (mesmo se logado ou outros processos rodando)"
        />
      </Terminal>

      <InfoBox type="warning" title="userdel -r e arquivos do usuário fora do home">
        <code>userdel -r</code> só remove o home e o mail spool. Arquivos do usuário em
        <code>/srv</code>, <code>/var/www</code>, <code>/tmp</code>, etc, ficam órfãos. Use
        <code>find / -uid 1003 2&gt;/dev/null</code> antes de deletar para auditar.
      </InfoBox>

      <h2>6. passwd — gerenciar senhas</h2>

      <Terminal>
        <Command
          command="passwd"
          comment="Sem argumentos: troca a própria senha"
          output={`Trocando senha para wallyson.
Senha atual: 
Nova senha: 
Redigite a nova senha: 
passwd: senha atualizada com sucesso`}
        />
        <Command
          root
          command="passwd carlos"
          comment="Como root: troca a senha de outro (não pede a antiga)"
          output={`Nova senha: 
Redigite a nova senha: 
passwd: senha atualizada com sucesso`}
        />
      </Terminal>

      <h3>Flags importantes do passwd</h3>

      <table>
        <thead><tr><th>Flag</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td><code>-l</code></td><td>lock (insere ! no shadow)</td></tr>
          <tr><td><code>-u</code></td><td>unlock</td></tr>
          <tr><td><code>-d</code></td><td>delete: deixa a conta SEM senha (perigoso)</td></tr>
          <tr><td><code>-e</code></td><td>expira a senha imediatamente (força troca no próximo login)</td></tr>
          <tr><td><code>-S</code></td><td>status</td></tr>
          <tr><td><code>-n N</code></td><td>mínimo N dias entre trocas</td></tr>
          <tr><td><code>-x N</code></td><td>máximo N dias antes de expirar</td></tr>
          <tr><td><code>-w N</code></td><td>avisar N dias antes</td></tr>
          <tr><td><code>-i N</code></td><td>inativar conta N dias após expirar</td></tr>
        </tbody>
      </table>

      <Terminal>
        <Command
          root
          command="passwd -e carlos"
          output={`passwd: a informação de validade da senha está sendo modificada
passwd: senha atualizada com sucesso`}
        />
        <Command
          root
          command="passwd -S carlos"
          output={`carlos PS 1970-01-01 0 99999 7 -1 (Senha definida, yescrypt.)`}
        />
        <Command
          root
          command="passwd -n 7 -x 90 -w 14 -i 30 carlos"
          comment="Mín 7d entre trocas, máx 90d, aviso 14d antes, inativa 30d depois"
        />
      </Terminal>

      <h3>chpasswd — em massa</h3>

      <Terminal>
        <Command
          root
          command={`echo 'carlos:Senh@Forte2025' | chpasswd`}
          comment="Define senha sem prompt (útil para scripts)"
        />
        <Command
          root
          command={`cat usuarios.txt | chpasswd`}
          comment="Onde usuarios.txt tem 'usuario:senha' por linha"
        />
      </Terminal>

      <h2>7. chage — políticas de envelhecimento de senha</h2>

      <Terminal>
        <Command
          command="chage -l wallyson"
          output={`Última alteração de senha                                  : abr 09, 2025
A senha expira                                             : nunca
Senha inativa                                              : nunca
Conta expira                                               : nunca
Número mínimo de dias entre as alterações de senha         : 0
Número máximo de dias entre alterações de senha            : 99999
Número de dias de aviso antes da senha expirar             : 7`}
        />
        <Command
          root
          command="chage -M 90 -m 7 -W 14 -I 30 -E 2026-12-31 carlos"
          comment="Política completa: máx 90, mín 7, aviso 14, inativa 30, conta expira em 2026"
        />
        <Command
          root
          command="chage -l carlos"
          output={`Última alteração de senha                                  : abr 09, 2025
A senha expira                                             : jul 08, 2025
Senha inativa                                              : ago 07, 2025
Conta expira                                               : dez 31, 2026
Número mínimo de dias entre as alterações de senha         : 7
Número máximo de dias entre alterações de senha            : 90
Número de dias de aviso antes da senha expirar             : 14`}
        />
        <Command
          root
          command="chage -d 0 carlos"
          comment="Força troca de senha no próximo login"
        />
      </Terminal>

      <h2>8. groupadd, groupmod, groupdel, gpasswd</h2>

      <Terminal>
        <Command
          root
          command="groupadd desenvolvedores"
          comment="Cria grupo com próximo GID disponível"
        />
        <Command
          root
          command="groupadd -g 1100 desenvolvedores"
          comment="GID específico"
        />
        <Command
          root
          command="groupadd -r systemgroup"
          comment="Grupo de sistema (GID baixo)"
        />
        <Command
          root
          command="groupmod -n devs desenvolvedores"
          comment="Renomear"
        />
        <Command
          root
          command="groupmod -g 1200 devs"
          comment="Mudar GID (cuidado: arquivos do GID antigo ficam órfãos)"
        />
        <Command
          root
          command="groupdel devs"
          comment="Remover (falha se for grupo primário de algum usuário)"
        />
        <Command
          root
          command="gpasswd -a carlos devs"
          comment="Adicionar carlos ao grupo devs"
          output={`Adicionando o usuário carlos no grupo devs`}
        />
        <Command
          root
          command="gpasswd -d carlos devs"
          comment="Remover carlos de devs"
          output={`Removendo o usuário carlos do grupo devs`}
        />
        <Command
          root
          command="gpasswd -A wallyson devs"
          comment="Definir wallyson como administrador do grupo (raro)"
        />
        <Command
          root
          command="gpasswd -M ana,joao,carlos devs"
          comment="Substitui TODA a lista de membros"
        />
      </Terminal>

      <h3>newgrp — trocar grupo primário temporariamente</h3>

      <Terminal>
        <Command
          command="id -gn"
          output={`wallyson`}
        />
        <Command
          command="newgrp docker"
          comment="Inicia novo shell com docker como grupo primário"
        />
        <Command
          command="id -gn"
          output={`docker`}
        />
        <Command
          command="exit"
          comment="Volta ao shell original com grupo wallyson"
        />
      </Terminal>

      <h2>9. id, who, w, last, lastlog, finger</h2>

      <Terminal>
        <Command
          command="id"
          output={`uid=1000(wallyson) gid=1000(wallyson) grupos=1000(wallyson),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),100(users),114(lpadmin),134(lxd)`}
        />
        <Command
          command="id -u"
          output={`1000`}
        />
        <Command
          command="id -un"
          output={`wallyson`}
        />
        <Command
          command="id -G"
          output={`1000 4 24 27 30 46 100 114 134`}
        />
        <Command
          command="id ana"
          output={`uid=1001(ana) gid=1001(ana) grupos=1001(ana),100(users),998(docker)`}
        />
        <Command
          command="who"
          comment="Quem está logado agora"
          output={`wallyson tty7         2025-04-09 08:14 (:0)
wallyson pts/0        2025-04-09 09:23 (192.168.1.50)
ana      pts/1        2025-04-09 10:45 (10.0.0.7)`}
        />
        <Command
          command="who -aH"
          output={`NOME     LINHA        TEMPO DE LOGIN     OCIOSO          PID COMENTÁRIO   SAÍDA
           system boot  2025-04-09 07:58
           run-level 5  2025-04-09 07:58
LOGIN    tty1         2025-04-09 07:59               714 id=tty1
wallyson tty7         2025-04-09 08:14   .          1429 (:0)
wallyson pts/0        2025-04-09 09:23   .          5018 (192.168.1.50)
ana      pts/1        2025-04-09 10:45   00:12      6201 (10.0.0.7)`}
        />
        <Command
          command="w"
          comment="Quem + o que está fazendo + load"
          output={` 11:47:23 up  3:49,  3 users,  load average: 0,28, 0,34, 0,31
USUÁRIO  TTY      DE               LOGIN@   OCIOSO  JCPU  PCPU O QUE
wallyson tty7     :0               08:14    3:33m  1:17  0.05s /usr/bin/gnome-shell
wallyson pts/0    192.168.1.50     09:23    0.00s  0.45s 0.01s w
ana      pts/1    10.0.0.7         10:45   12:02   0.30s 0.30s -bash`}
        />
        <Command
          command="last -n 10"
          comment="Histórico de logins (lê /var/log/wtmp)"
          output={`wallyson pts/0    192.168.1.50     Wed Apr  9 09:23   still logged in
ana      pts/1    10.0.0.7         Wed Apr  9 10:45   still logged in
wallyson tty7     :0               Wed Apr  9 08:14   still logged in
reboot   system boot 6.8.0-49-generic Wed Apr  9 07:58   still running
wallyson pts/2    192.168.1.50     Tue Apr  8 19:12 - 22:48  (03:36)
ana      pts/0    10.0.0.7         Tue Apr  8 14:30 - 18:02  (03:32)
wallyson tty7     :0               Tue Apr  8 08:01 - down   (11:30)
reboot   system boot 6.8.0-49-generic Tue Apr  8 08:00 - 19:31  (11:31)

wtmp begins Wed Apr  2 09:11:03 2025`}
        />
        <Command
          command="last -F wallyson"
          comment="Datas completas, apenas wallyson"
        />
        <Command
          command="lastb"
          comment="Tentativas de login MALSUCEDIDAS (lê /var/log/btmp, requer root)"
          output={`root     ssh:notty    192.0.2.45       Wed Apr  9 11:02 - 11:02  (00:00)
admin    ssh:notty    198.51.100.7     Wed Apr  9 10:58 - 10:58  (00:00)
oracle   ssh:notty    198.51.100.7     Wed Apr  9 10:58 - 10:58  (00:00)`}
        />
        <Command
          command="lastlog"
          comment="Último login de cada usuário (lê /var/log/lastlog)"
          output={`Nome de usuário Porta    De               Último
root                                       **Nunca logou**
wallyson         tty7     :0               Wed Apr  9 08:14:33 -0300 2025
ana              pts/1    10.0.0.7         Wed Apr  9 10:45:11 -0300 2025
carlos                                     **Nunca logou**`}
        />
        <Command
          root
          command="apt install finger -y"
        />
        <Command
          command="finger wallyson"
          output={`Login: wallyson                       Name: Wallyson Silva
Directory: /home/wallyson             Shell: /bin/bash
On since Wed Apr  9 08:14 (-03) on tty7 from :0
On since Wed Apr  9 09:23 (-03) on pts/0 from 192.168.1.50
Mail last read Wed Apr  9 09:25 2025 (-03)
No Plan.`}
        />
      </Terminal>

      <h2>10. sudo — o coração do Ubuntu</h2>

      <p>
        <code>sudo</code> permite executar comandos como outro usuário (default: root) <em>se</em> a
        política em <code>/etc/sudoers</code> permitir. No Ubuntu, todo usuário no grupo
        <code>sudo</code> recebe permissão total — graças à linha <code>%sudo ALL=(ALL:ALL) ALL</code>.
      </p>

      <Terminal>
        <Command
          command="sudo -V | head -3"
          output={`Sudo version 1.9.15p5
Sudoers policy plugin version 1.9.15p5
Sudoers file grammar version 50`}
        />
        <Command
          command="sudo -l"
          comment="O que EU posso rodar com sudo"
          output={`Os usuários autorizados para wallyson em ubuntu:
    Os usuários podem rodar os seguintes comandos em ubuntu:
        (ALL : ALL) ALL`}
        />
        <Command
          command="sudo -ll"
          comment="Forma longa, com origem da regra"
          output={`Sudoers entry: wallyson em ubuntu, vindo de /etc/sudoers
    RunAsUsers: ALL
    RunAsGroups: ALL
    Comandos:
        ALL`}
        />
      </Terminal>

      <h3>Flags úteis do sudo</h3>

      <table>
        <thead><tr><th>Flag</th><th>O que faz</th></tr></thead>
        <tbody>
          <tr><td><code>-i</code></td><td>shell de login como root (carrega /root/.bashrc)</td></tr>
          <tr><td><code>-s</code></td><td>shell sem login</td></tr>
          <tr><td><code>-u USER</code></td><td>roda como outro usuário (default: root)</td></tr>
          <tr><td><code>-g GROUP</code></td><td>roda com outro grupo primário</td></tr>
          <tr><td><code>-E</code></td><td>preserva variáveis de ambiente</td></tr>
          <tr><td><code>-H</code></td><td>define HOME para o do usuário-alvo</td></tr>
          <tr><td><code>-k</code></td><td>invalida o cache de credencial (próximo sudo pede senha)</td></tr>
          <tr><td><code>-K</code></td><td>remove totalmente o cache</td></tr>
          <tr><td><code>-v</code></td><td>renova o timestamp sem rodar comando</td></tr>
          <tr><td><code>-n</code></td><td>não interage (falha se precisar senha)</td></tr>
          <tr><td><code>-l</code></td><td>lista privilégios</td></tr>
          <tr><td><code>!!</code></td><td>(bash) <code>sudo !!</code> repete o último comando com sudo</td></tr>
        </tbody>
      </table>

      <Terminal>
        <Command
          command="sudo -i"
          comment="Vira root com ambiente limpo de root"
          output={`[sudo] senha para wallyson: 
root@ubuntu:~# `}
        />
        <Command
          root
          command="exit"
          output={`logout
wallyson@ubuntu:~$ `}
        />
        <Command
          command="sudo -u postgres psql"
          comment="Roda psql como postgres"
        />
        <Command
          command="sudo -E env | grep PATH"
          comment="-E preserva PATH/LANG do usuário"
          output={`PATH=/home/wallyson/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
LANG=pt_BR.UTF-8`}
        />
        <Command
          command="cat /etc/shadow"
          output={`cat: /etc/shadow: Permissão negada`}
        />
        <Command
          command="sudo !!"
          comment="Repete com sudo (bash history expansion)"
          output={`sudo cat /etc/shadow
[sudo] senha para wallyson: 
root:!:20056:0:99999:7:::
...`}
        />
      </Terminal>

      <h2>11. /etc/sudoers e /etc/sudoers.d/</h2>

      <p>
        O arquivo principal é <code>/etc/sudoers</code> (modo 440, root:root). NUNCA edite com
        <code>nano</code> ou <code>vim</code> diretamente — use <code>visudo</code>, que valida a
        sintaxe antes de salvar (um erro pode te bloquear permanentemente do sudo).
      </p>

      <Terminal>
        <Command
          root
          command="visudo"
          comment="Abre /etc/sudoers no editor configurado (nano por padrão no Ubuntu)"
        />
        <Command
          root
          command="visudo -c"
          comment="Apenas valida"
          output={`/etc/sudoers: parsed OK
/etc/sudoers.d/README: parsed OK
/etc/sudoers.d/admin: parsed OK`}
        />
        <Command
          root
          command="visudo -f /etc/sudoers.d/devs"
          comment="Edita um drop-in (preferido a tocar no sudoers principal)"
        />
      </Terminal>

      <File path="/etc/sudoers (trecho relevante no Ubuntu)">
{`# Defaults
Defaults        env_reset
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
Defaults        use_pty
Defaults        logfile="/var/log/sudo.log"

# Aliases (opcionais)
User_Alias      ADMINS = wallyson, ana
Cmnd_Alias      RESTART_WEB = /bin/systemctl restart nginx, /bin/systemctl restart apache2

# Regras
root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
%admin  ALL=(ALL) ALL

# Drop-ins
@includedir /etc/sudoers.d`}
      </File>

      <h3>Sintaxe de uma regra</h3>

      <File path="formato">
{`USUARIO   HOSTS=(RUNAS_USERS:RUNAS_GROUPS)  [TAGS:]  COMANDOS
                                            ^^^^^^
                                    NOPASSWD:, PASSWD:, SETENV:, NOSETENV:, LOG_INPUT:, LOG_OUTPUT:`}
      </File>

      <h3>Exemplos comuns em /etc/sudoers.d/</h3>

      <File path="/etc/sudoers.d/devs">
{`# devs podem reiniciar nginx sem senha
%devs   ALL=(root) NOPASSWD: /bin/systemctl restart nginx, /bin/systemctl status nginx

# carlos pode rodar APENAS apt update e apt upgrade -y como root, sem senha
carlos  ALL=(root) NOPASSWD: /usr/bin/apt update, /usr/bin/apt upgrade -y

# ana pode rodar qualquer comando como o usuário deploy
ana     ALL=(deploy) ALL

# bot de CI executa apenas o script de deploy
deploybot ALL=(www-data) NOPASSWD: /opt/scripts/deploy.sh

# Permitir manter HOME ao usar sudo
Defaults:wallyson  !env_reset, env_keep += "HOME"

# Loggar entrada e saída de TUDO que carlos rodar
Defaults:carlos    log_input, log_output`}
      </File>

      <Terminal>
        <Command
          root
          command="install -m 440 -o root -g root /dev/stdin /etc/sudoers.d/devs <<< '%devs ALL=(root) NOPASSWD: /bin/systemctl restart nginx'"
          comment="Cria drop-in com permissões corretas"
        />
        <Command
          root
          command="ls -l /etc/sudoers.d/"
          output={`total 12
-r--r----- 1 root root 958 abr  9 12:00 README
-r--r----- 1 root root  76 abr  9 14:23 devs
-r--r----- 1 root root 132 nov 14 09:11 admin`}
        />
      </Terminal>

      <InfoBox type="danger" title="Cuidado com curingas em sudoers">
        <code>carlos ALL=(root) NOPASSWD: /usr/bin/vim /etc/nginx/*</code> parece restritivo, mas
        carlos pode digitar <code>:!bash</code> dentro do vim e virar root. <strong>Edite arquivos com
        sudoedit</strong>, não com vim direto. Sudoedit copia o arquivo para um tmp, abre como o
        usuário, e só copia de volta como root.
      </InfoBox>

      <h3>sudoedit — edição segura</h3>

      <Terminal>
        <Command
          command="sudoedit /etc/nginx/nginx.conf"
          comment="Equivalente a sudo -e"
        />
      </Terminal>

      <File path="/etc/sudoers.d/nginx-admin (forma segura)">
{`%nginx-admin  ALL=(root) NOPASSWD: sudoedit /etc/nginx/nginx.conf, sudoedit /etc/nginx/sites-available/*`}
      </File>

      <h2>12. PAM — Pluggable Authentication Modules</h2>

      <p>
        O PAM é a camada que <em>realmente</em> autentica o usuário. Cada serviço (login, sshd, sudo,
        passwd, gdm) tem um arquivo em <code>/etc/pam.d/</code> que descreve quatro estágios:
        <strong>auth</strong>, <strong>account</strong>, <strong>password</strong>, <strong>session</strong>.
      </p>

      <Terminal>
        <Command
          command="ls /etc/pam.d/"
          output={`chfn          common-auth          cron       login    polkit-1   sshd
chpasswd      common-password      gdm-launch sudo     ppp        su
chsh          common-session       gdm-password sudo-i postlogin  systemd-user
common-account common-session-noninteractive  newusers passwd     vmtoolsd`}
        />
        <Command
          command="cat /etc/pam.d/sudo"
          output={`#%PAM-1.0

session    required   pam_env.so readenv=1 user_readenv=0
session    required   pam_env.so readenv=1 envfile=/etc/default/locale user_readenv=0
@include common-auth
@include common-account
@include common-session-noninteractive`}
        />
        <Command
          command="cat /etc/pam.d/common-auth"
          output={`# here are the per-package modules (the "Primary" block)
auth    [success=1 default=ignore]      pam_unix.so nullok
# here's the fallback if no module succeeds
auth    requisite                       pam_deny.so
# prime the stack with a positive return value if there isn't one already;
auth    required                        pam_permit.so
# and here are more per-package modules (the "Additional" block)
auth    optional                        pam_cap.so
# end of pam-auth-update config`}
        />
      </Terminal>

      <h3>Forçar política de senhas com pam_pwquality</h3>

      <Terminal>
        <Command
          root
          command="apt install libpam-pwquality -y"
        />
        <Command
          root
          command="cat /etc/security/pwquality.conf"
          output={`# minlen = tamanho mínimo
# minclass = mínimo de classes (lower, upper, digit, other)
# maxrepeat = máximo de mesmo char repetido
# dcredit = créditos por dígitos (negativo = exige)
# ucredit, lcredit, ocredit = idem para upper, lower, other`}
        />
      </Terminal>

      <File path="/etc/security/pwquality.conf (política rígida)">
{`minlen = 12
minclass = 3
maxrepeat = 3
dcredit = -1
ucredit = -1
lcredit = -1
ocredit = -1
difok = 5
enforce_for_root`}
      </File>

      <h3>Limites de recursos: /etc/security/limits.conf</h3>

      <File path="/etc/security/limits.d/90-devs.conf">
{`#<domain>  <type>  <item>     <value>
@devs      soft    nproc      4096
@devs      hard    nproc      8192
@devs      soft    nofile     65536
@devs      hard    nofile     131072
carlos     hard    maxlogins  3
*          hard    core       0`}
      </File>

      <Terminal>
        <Command
          command="ulimit -a"
          output={`real-time non-blocking time  (microseconds, -R) unlimited
core file size              (blocks, -c) 0
data seg size               (kbytes, -d) unlimited
scheduling priority                 (-e) 0
file size                   (blocks, -f) unlimited
pending signals                     (-i) 30461
max locked memory           (kbytes, -l) 8221284
max memory size             (kbytes, -m) unlimited
open files                          (-n) 1024
pipe size                (512 bytes, -p) 8
POSIX message queues         (bytes, -q) 819200
real-time priority                  (-r) 0
stack size                  (kbytes, -s) 8192
cpu time                   (seconds, -t) unlimited
max user processes                  (-u) 30461
virtual memory              (kbytes, -v) unlimited
file locks                          (-x) unlimited`}
        />
      </Terminal>

      <h2>13. Primeiro usuário, root e Ubuntu</h2>

      <p>
        Depois de uma instalação fresca do Ubuntu, o usuário criado fica no grupo <code>sudo</code>. O
        usuário root vem com a senha bloqueada — você verifica assim:
      </p>

      <Terminal>
        <Command
          root
          command="passwd -S root"
          output={`root L 2024-12-08 0 99999 7 -1 (Senha bloqueada.)`}
        />
        <Command
          root
          command="su -"
          comment="Tenta virar root via su (sem sudo) — vai falhar"
          output={`Senha: 
su: Falha de autenticação`}
        />
      </Terminal>

      <p>
        Para realmente <strong>habilitar</strong> o login root (não recomendado em servidores
        públicos):
      </p>

      <Terminal>
        <Command
          root
          command="passwd root"
          output={`Nova senha: 
Redigite a nova senha: 
passwd: senha atualizada com sucesso`}
        />
        <Command
          root
          command="passwd -S root"
          output={`root P 2025-04-09 0 99999 7 -1 (Senha definida, yescrypt.)`}
        />
      </Terminal>

      <p>
        Para <strong>desabilitar</strong> de novo (volta ao default Ubuntu):
      </p>

      <Terminal>
        <Command
          root
          command="passwd -dl root"
          comment="-d remove senha, -l bloqueia"
        />
      </Terminal>

      <h2>14. /etc/skel — modelo de novo home</h2>

      <p>
        Tudo que está em <code>/etc/skel</code> é copiado para o home recém-criado de cada novo
        usuário. Customize aqui dotfiles padrão da sua organização.
      </p>

      <Terminal>
        <Command
          command="ls -la /etc/skel"
          output={`total 24
drwxr-xr-x   2 root root 4096 abr  1 09:11 .
drwxr-xr-x 138 root root 4096 abr  9 11:12 ..
-rw-r--r--   1 root root  220 abr  1 09:11 .bash_logout
-rw-r--r--   1 root root 3771 abr  1 09:11 .bashrc
-rw-r--r--   1 root root  807 abr  1 09:11 .profile`}
        />
        <Command
          root
          command={`cp ~/.vimrc /etc/skel/`}
          comment="Todo novo usuário ganha o seu vimrc"
        />
      </Terminal>

      <h2>15. NSS — getent</h2>

      <p>
        <code>getent</code> consulta as bases definidas em <code>/etc/nsswitch.conf</code> — útil
        quando você usa LDAP, SSSD, Active Directory, e a entrada NÃO está em /etc/passwd.
      </p>

      <Terminal>
        <Command
          command="cat /etc/nsswitch.conf | head -7"
          output={`# /etc/nsswitch.conf
passwd:         files systemd
group:          files systemd
shadow:         files
gshadow:        files
hosts:          files mdns4_minimal [NOTFOUND=return] dns
networks:       files`}
        />
        <Command
          command="getent passwd 1000"
          output={`wallyson:x:1000:1000:Wallyson Silva,,,:/home/wallyson:/bin/bash`}
        />
        <Command
          command="getent group sudo"
          output={`sudo:x:27:wallyson,ana`}
        />
        <Command
          command="getent hosts ubuntu.com"
          output={`185.125.190.20  ubuntu.com`}
        />
      </Terminal>

      <h2>16. Resumão final + boas práticas</h2>

      <InfoBox type="success" title="Checklist de criação de usuário no Ubuntu">
        <ol>
          <li>Use <code>adduser nome</code> (não <code>useradd</code>) para humanos.</li>
          <li>Use <code>useradd -r -s /usr/sbin/nologin</code> para serviços.</li>
          <li>Política de senha: <code>chage -M 90 -W 14</code>.</li>
          <li>NUNCA edite /etc/sudoers direto: <code>visudo -f /etc/sudoers.d/seuarquivo</code>.</li>
          <li>Drop-ins em /etc/sudoers.d/ devem ser modo 440, root:root, sem ponto/til no nome.</li>
          <li>Para edições com sudo, prefira <code>sudoedit</code> a <code>sudo vim</code>.</li>
          <li>Audite com <code>last</code>, <code>lastb</code>, <code>journalctl _COMM=sudo</code>.</li>
          <li>Hardening: pam_pwquality + pam_tally2/pam_faillock + 2FA (libpam-google-authenticator).</li>
          <li>Containers/k8s: defina UID:GID fixos com <code>useradd -u 10001 -g 10001</code>.</li>
        </ol>
      </InfoBox>

      <InfoBox type="note" title="Logs onde olhar">
        <ul>
          <li><code>/var/log/auth.log</code> — autenticações (PAM, sudo, sshd)</li>
          <li><code>/var/log/wtmp</code> — logins (use <code>last</code>)</li>
          <li><code>/var/log/btmp</code> — logins falhos (<code>lastb</code>)</li>
          <li><code>/var/log/lastlog</code> — último login de cada usuário (<code>lastlog</code>)</li>
          <li><code>journalctl _COMM=sudo</code> — invocações do sudo</li>
          <li><code>/var/log/sudo.log</code> — se ativou <code>logfile</code> em sudoers</li>
        </ul>
      </InfoBox>
    </PageContainer>
  );
}

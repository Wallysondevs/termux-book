import{j as e}from"./index-CsDtDb2_.js";import{P as d}from"./PageContainer-DdYPssra.js";import{T as s,C as o,F as r}from"./Terminal-DW_1sD2n.js";import{I as a}from"./InfoBox-CFJp2Xi7.js";import"./house-BVOOG_Vc.js";import"./proxy-BaSd2E5R.js";function m(){return e.jsxs(d,{title:"Usuários, Grupos e sudo",subtitle:"Tudo sobre /etc/passwd, /etc/shadow, /etc/group, useradd/adduser, usermod, passwd, chage, sudoers, PAM e o ecossistema completo de gestão de identidades no Ubuntu 24.04.",difficulty:"intermediario",timeToRead:"55 min",category:"Usuários e Processos",children:[e.jsxs("p",{children:["O Linux é um sistema operacional ",e.jsx("strong",{children:"multiusuário"})," e ",e.jsx("strong",{children:"multitarefa"})," desde as suas origens em 1991. Cada arquivo, cada processo, cada conexão de rede está associada a um usuário (UID) e a um grupo (GID), que determinam o que aquele processo pode ou não fazer. Saber gerir usuários no Ubuntu é a habilidade mais fundamental de qualquer sysadmin: sem ela, nada de permissões, nada de sudo, nada de hardening, nada de SSH com restrições. Esta página cobre cada arquivo, cada comando e cada flag importante do ecossistema de identidades no Ubuntu 24.04 LTS."]}),e.jsxs("p",{children:["O Ubuntu segue uma filosofia particular dentro do mundo Debian: ",e.jsx("strong",{children:"o usuário root vem bloqueado"})," (sem senha definida, com asterisco no shadow). Você nunca faz login direto como root: o primeiro usuário criado durante a instalação é colocado no grupo ",e.jsx("code",{children:"sudo"})," e usa ",e.jsx("code",{children:"sudo"})," para escalar privilégios. Isso é ótimo para auditoria, mas exige entender muito bem como o sudo funciona."]}),e.jsxs(s,{title:"wallyson@ubuntu: ~",children:[e.jsx(o,{command:"whoami && id",comment:"Quem sou eu agora? Que UID/GID e grupos secundários?",output:`wallyson
uid=1000(wallyson) gid=1000(wallyson) grupos=1000(wallyson),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),100(users),114(lpadmin),134(lxd)`}),e.jsx(o,{command:"getent passwd wallyson",comment:"A entrada completa do usuário, lendo via NSS",output:"wallyson:x:1000:1000:Wallyson Silva,,,:/home/wallyson:/bin/bash"})]}),e.jsx("h2",{children:"1. Os arquivos de identidade"}),e.jsxs("p",{children:["O Linux guarda informação sobre usuários e grupos em quatro arquivos de texto puro localizados em ",e.jsx("code",{children:"/etc/"}),". Eles são lidos por bibliotecas (NSS — Name Service Switch) e por PAM, nunca diretamente por aplicações comuns. Mexer neles à mão é possível mas frágil — sempre prefira os comandos ",e.jsx("code",{children:"useradd"}),", ",e.jsx("code",{children:"usermod"}),", ",e.jsx("code",{children:"passwd"}),",",e.jsx("code",{children:"vipw"}),", ",e.jsx("code",{children:"vigr"}),"."]}),e.jsx("h3",{children:"/etc/passwd — usuários do sistema"}),e.jsxs("p",{children:["Apesar do nome, ",e.jsx("strong",{children:"não contém senhas"}),". É legível por todos os usuários porque muitos comandos (como ",e.jsx("code",{children:"ls -l"}),") precisam mapear UID para nome. Cada linha tem 7 campos separados por dois-pontos (",e.jsx("code",{children:":"}),"):"]}),e.jsx(r,{path:"/etc/passwd (linha do wallyson)",children:`wallyson:x:1000:1000:Wallyson Silva,,,:/home/wallyson:/bin/bash
│        │ │    │    │              │              │
│        │ │    │    │              │              └─ shell de login (/bin/bash, /bin/false, /usr/sbin/nologin...)
│        │ │    │    │              └─────────────── diretório home
│        │ │    │    └────────────────────────────── GECOS (nome real, sala, telefones — separados por vírgula)
│        │ │    └─────────────────────────────────── GID primário (referência a /etc/group)
│        │ └──────────────────────────────────────── UID (0=root, 1-999=sistema, 1000+=humanos no Ubuntu)
│        └────────────────────────────────────────── senha (sempre 'x' — verdadeira está em /etc/shadow)
└─────────────────────────────────────────────────── nome de login`}),e.jsxs(s,{children:[e.jsx(o,{command:"head -5 /etc/passwd",output:`root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync`}),e.jsx(o,{command:"tail -5 /etc/passwd",output:`systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
wallyson:x:1000:1000:Wallyson Silva,,,:/home/wallyson:/bin/bash
lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
fwupd-refresh:x:113:121:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin
postgres:x:114:122:PostgreSQL administrator,,,:/var/lib/postgresql:/bin/bash`}),e.jsx(o,{command:"wc -l /etc/passwd",comment:"Quantos usuários (incluindo de sistema)",output:"38 /etc/passwd"}),e.jsx(o,{command:"awk -F: '$3 >= 1000 && $3 < 65534 {print $1, $3}' /etc/passwd",comment:"Apenas humanos (UID >= 1000 e != nobody)",output:`wallyson 1000
ana 1001
joao 1002`})]}),e.jsx("h3",{children:"/etc/shadow — senhas e políticas"}),e.jsxs("p",{children:["Este sim contém os ",e.jsx("em",{children:"hashes"})," das senhas. Permissões 640 (root:shadow), nunca legível por usuários comuns. Nove campos:"]}),e.jsx(r,{path:"/etc/shadow (linha do wallyson, sudo cat /etc/shadow)",children:`wallyson:$y$j9T$LdGB1...$kPQrSt/...:20056:0:99999:7:::
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
└────────────────────────────────────────────────────────── login`}),e.jsxs("p",{children:["Os prefixos ",e.jsx("code",{children:"$id$"})," identificam o algoritmo de hash:"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Prefixo"}),e.jsx("th",{children:"Algoritmo"}),e.jsx("th",{children:"Status no Ubuntu"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"$1$"})}),e.jsx("td",{children:"MD5"}),e.jsx("td",{children:"obsoleto, jamais use"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"$2a$ $2b$ $2y$"})}),e.jsx("td",{children:"bcrypt"}),e.jsx("td",{children:"aceito mas não default"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"$5$"})}),e.jsx("td",{children:"SHA-256"}),e.jsx("td",{children:"aceito (legacy)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"$6$"})}),e.jsx("td",{children:"SHA-512"}),e.jsx("td",{children:"default no Ubuntu 20.04 e anteriores"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"$y$"})}),e.jsx("td",{children:"yescrypt"}),e.jsx("td",{children:"default no Ubuntu 22.04+ (mais resistente)"})]})]})]}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"awk -F: '{print $1, substr($2,1,3)}' /etc/shadow | head -8",output:`root *
daemon *
bin *
sys *
sync *
games *
man *
wallyson $y$`}),e.jsx(o,{root:!0,command:"grep '^wallyson:' /etc/shadow | cut -d: -f3,5",comment:"Última troca (dias desde 1970) e validade máxima",output:"20056:99999"}),e.jsx(o,{command:"date -d '1970-01-01 +20056 days' '+%Y-%m-%d'",comment:"Convertendo dias-de-época em data legível",output:"2024-12-08"})]}),e.jsxs(a,{type:"warning",title:"Conta bloqueada vs sem senha",children:["Um ",e.jsx("code",{children:"!"})," ou ",e.jsx("code",{children:"*"})," no início do hash significa ",e.jsx("strong",{children:"conta bloqueada"}),"(não consegue logar com senha — ainda pode com chave SSH). Um campo vazio significa",e.jsx("strong",{children:"conta sem senha"})," (extremamente perigoso — qualquer um loga). Use ",e.jsx("code",{children:"passwd -S usuario"})," para ver o estado."]}),e.jsx("h3",{children:"/etc/group — grupos"}),e.jsx(r,{path:"/etc/group",children:`sudo:x:27:wallyson,ana
│    │ │  │
│    │ │  └─ membros (lista separada por vírgula)
│    │ └──── GID
│    └────── senha do grupo (raríssimo usar; quase sempre 'x')
└─────────── nome do grupo`}),e.jsxs(s,{children:[e.jsx(o,{command:"getent group sudo",output:"sudo:x:27:wallyson,ana"}),e.jsx(o,{command:"groups wallyson",comment:"Todos os grupos do usuário",output:"wallyson : wallyson adm cdrom sudo dip plugdev users lpadmin lxd"}),e.jsx(o,{command:"getent group | awk -F: '$3 >= 1000 && $3 < 65534'",comment:"Grupos criados por humanos",output:`wallyson:x:1000:
ana:x:1001:
joao:x:1002:
docker:x:998:wallyson
desenvolvedores:x:1100:wallyson,ana,joao`})]}),e.jsx("h3",{children:"/etc/gshadow — senhas de grupo"}),e.jsxs("p",{children:["Praticamente nunca usado em sistemas modernos, mas existe por simetria com shadow. Permissão 640 (root:shadow). Quatro campos: ",e.jsx("code",{children:"nome:hash:admins:membros"}),"."]}),e.jsx(s,{children:e.jsx(o,{root:!0,command:"head -5 /etc/gshadow",output:`root:*::
daemon:*::
bin:*::
sys:*::
adm:*::syslog,wallyson`})}),e.jsx("h3",{children:"Grupos importantes que o Ubuntu cria"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Grupo"}),e.jsx("th",{children:"GID"}),e.jsx("th",{children:"Para quê serve"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"root"}),e.jsx("td",{children:"0"}),e.jsx("td",{children:"superusuário"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"adm"}),e.jsx("td",{children:"4"}),e.jsx("td",{children:"leitura de logs em /var/log"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tty"}),e.jsx("td",{children:"5"}),e.jsx("td",{children:"acesso a terminais virtuais"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"disk"}),e.jsx("td",{children:"6"}),e.jsx("td",{children:"acesso bruto a /dev/sd*, /dev/nvme* (cuidado!)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"sudo"}),e.jsx("td",{children:"27"}),e.jsx("td",{children:"autorização para escalar privilégios via sudo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"audio"}),e.jsx("td",{children:"29"}),e.jsx("td",{children:"acesso a /dev/snd/* (PipeWire abstrai)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"video"}),e.jsx("td",{children:"44"}),e.jsx("td",{children:"acesso a /dev/video* (webcam, GPU)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"plugdev"}),e.jsx("td",{children:"46"}),e.jsx("td",{children:"montar dispositivos removíveis"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"netdev"}),e.jsx("td",{children:"118"}),e.jsx("td",{children:"controlar interfaces de rede via NetworkManager"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"lpadmin"}),e.jsx("td",{children:"114"}),e.jsx("td",{children:"administrar impressoras via CUPS"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"docker"}),e.jsx("td",{children:"variável"}),e.jsx("td",{children:"usar docker sem sudo (= root, atenção)"})]})]})]}),e.jsx("h2",{children:"2. useradd — criar usuário (baixo nível)"}),e.jsxs("p",{children:[e.jsx("code",{children:"useradd"})," é a ferramenta de baixo nível, presente em qualquer Linux. Não cria home nem copia skel sem flags explícitas. Lê defaults de ",e.jsx("code",{children:"/etc/default/useradd"})," e",e.jsx("code",{children:"/etc/login.defs"}),"."]}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"useradd --help",output:`Uso: useradd [opções] LOGIN
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
  -Z, --selinux-user SEUSER     usuário SELinux para mapeamento`}),e.jsx(o,{root:!0,command:"useradd -D",comment:"Mostra os defaults",output:`GROUP=100
HOME=/home
INACTIVE=-1
EXPIRE=
SHELL=/bin/sh
SKEL=/etc/skel
CREATE_MAIL_SPOOL=no`})]}),e.jsxs(a,{type:"warning",title:"useradd no Ubuntu = shell errado!",children:["Repare que o default é ",e.jsx("code",{children:"SHELL=/bin/sh"}),". Quase ninguém quer isso. Por isso o Ubuntu recomenda ",e.jsx("code",{children:"adduser"})," (que usa ",e.jsx("code",{children:"/bin/bash"})," e é interativo). Se for usar",e.jsx("code",{children:"useradd"}),", sempre passe ",e.jsx("code",{children:"-s /bin/bash -m"}),"."]}),e.jsx("h3",{children:"Exemplos práticos com useradd"}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"useradd -m -s /bin/bash -c 'Maria Souza' -G sudo,docker maria",comment:"Cria maria com home, bash, GECOS e nos grupos sudo e docker"}),e.jsx(o,{root:!0,command:"getent passwd maria",output:"maria:x:1003:1003:Maria Souza:/home/maria:/bin/bash"}),e.jsx(o,{root:!0,command:"ls -la /home/maria",output:`total 20
drwxr-x--- 2 maria maria 4096 abr  9 14:32 .
drwxr-xr-x 5 root  root  4096 abr  9 14:32 ..
-rw-r--r-- 1 maria maria  220 abr  9 14:32 .bash_logout
-rw-r--r-- 1 maria maria 3771 abr  9 14:32 .bashrc
-rw-r--r-- 1 maria maria  807 abr  9 14:32 .profile`}),e.jsx(o,{root:!0,command:"passwd maria",comment:"Define a senha (a conta vem bloqueada por padrão)",output:`Nova senha: 
Redigite a nova senha: 
passwd: senha atualizada com sucesso`}),e.jsx(o,{root:!0,command:"passwd -S maria",comment:"Status: PS=password set, conta liberada",output:"maria PS 2025-04-09 0 99999 7 -1 (Senha definida, yescrypt.)"})]}),e.jsx("h3",{children:"Usuário de sistema (para serviços)"}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"useradd -r -s /usr/sbin/nologin -d /var/lib/myapp -M myapp",comment:"-r = UID baixo (sistema), nologin, sem home criado"}),e.jsx(o,{root:!0,command:"getent passwd myapp",output:"myapp:x:115:122::/var/lib/myapp:/usr/sbin/nologin"})]}),e.jsx("h3",{children:"Forçar UID/GID específicos (containers/migração)"}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"useradd -m -u 2000 -g 2000 -s /bin/bash backup",comment:"UID e GID fixos"}),e.jsx(o,{root:!0,command:"id backup",output:"uid=2000(backup) gid=2000(backup) grupos=2000(backup)"})]}),e.jsx("h3",{children:"Conta com expiração"}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"useradd -m -s /bin/bash -e 2025-12-31 estagiario",comment:"Conta expira automaticamente em 31/12/2025"}),e.jsx(o,{root:!0,command:"chage -l estagiario",output:`Última alteração de senha                                  : nunca
A senha expira                                             : nunca
Senha inativa                                              : nunca
Conta expira                                               : dez 31, 2025
Número mínimo de dias entre as alterações de senha         : 0
Número máximo de dias entre alterações de senha            : 99999
Número de dias de aviso antes da senha expirar             : 7`})]}),e.jsx("h2",{children:"3. adduser — wrapper interativo (preferido no Ubuntu)"}),e.jsxs("p",{children:[e.jsx("code",{children:"adduser"})," é um script Perl criado pelo Debian que ",e.jsx("strong",{children:"chama"}),e.jsx("code",{children:"useradd"})," mas com defaults sensatos: cria home, copia ",e.jsx("code",{children:"/etc/skel"}),", define bash, pergunta senha e GECOS. ",e.jsx("strong",{children:"É a forma idiomática no Ubuntu"}),"."]}),e.jsx(s,{children:e.jsx(o,{root:!0,command:"adduser carlos",output:`Adding user 'carlos' ...
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
Adding user 'carlos' to group 'users' ...`})}),e.jsx("h3",{children:"Adicionar a um grupo"}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"adduser carlos sudo",output:`Adding user 'carlos' to group 'sudo' ...
Adding user carlos to group sudo
Done.`}),e.jsx(o,{root:!0,command:"adduser carlos docker",output:`Adding user 'carlos' to group 'docker' ...
Adding user carlos to group docker
Done.`})]}),e.jsxs(a,{type:"tip",title:"adduser sem prompts (script)",children:["Para automação, ",e.jsx("code",{children:"adduser"})," aceita ",e.jsx("code",{children:"--gecos '' --disabled-password"})," e você define a senha depois com ",e.jsx("code",{children:"chpasswd"}),": ",e.jsx("code",{children:"echo 'carlos:Senh@123' | chpasswd"}),"."]}),e.jsx("h2",{children:"4. usermod — modificar usuário existente"}),e.jsx(s,{children:e.jsx(o,{root:!0,command:"usermod --help",output:`Uso: usermod [opções] LOGIN

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
  -Z, --selinux-user SEUSER     novo mapeamento SELinux`})}),e.jsxs(a,{type:"danger",title:"usermod -G SEM -a destrói grupos!",children:[e.jsx("code",{children:"usermod -G docker carlos"})," remove carlos de TODOS os outros grupos suplementares (incluindo sudo!) e o coloca apenas em docker. Sempre use ",e.jsx("code",{children:"-aG"})," para adicionar:",e.jsx("code",{children:"usermod -aG docker carlos"}),"."]}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"usermod -aG docker,libvirt carlos",comment:"Adiciona carlos a docker E libvirt (preserva os outros)"}),e.jsx(o,{root:!0,command:"id carlos",output:"uid=1004(carlos) gid=1004(carlos) grupos=1004(carlos),27(sudo),100(users),135(libvirt),998(docker)"}),e.jsx(o,{root:!0,command:"usermod -s /usr/bin/zsh carlos",comment:"Trocar shell"}),e.jsx(o,{root:!0,command:"usermod -L carlos",comment:"Bloquear (insere ! antes do hash em /etc/shadow)"}),e.jsx(o,{root:!0,command:"passwd -S carlos",output:"carlos L 2025-04-09 0 99999 7 -1 (Senha bloqueada.)"}),e.jsx(o,{root:!0,command:"usermod -U carlos",comment:"Desbloquear"}),e.jsx(o,{root:!0,command:"usermod -l charles -d /home/charles -m carlos",comment:"Renomeia carlos→charles e move o home"})]}),e.jsx("h2",{children:"5. userdel — remover usuário"}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"userdel charles",comment:"Remove o usuário, MAS deixa /home/charles intocado"}),e.jsx(o,{root:!0,command:"userdel -r maria",comment:"-r = remove home, mailspool e tudo associado",output:"userdel: maria mail spool (/var/mail/maria) not found"}),e.jsx(o,{root:!0,command:"userdel -r -f estagiario",comment:"-f = força (mesmo se logado ou outros processos rodando)"})]}),e.jsxs(a,{type:"warning",title:"userdel -r e arquivos do usuário fora do home",children:[e.jsx("code",{children:"userdel -r"})," só remove o home e o mail spool. Arquivos do usuário em",e.jsx("code",{children:"/srv"}),", ",e.jsx("code",{children:"/var/www"}),", ",e.jsx("code",{children:"/tmp"}),", etc, ficam órfãos. Use",e.jsx("code",{children:"find / -uid 1003 2>/dev/null"})," antes de deletar para auditar."]}),e.jsx("h2",{children:"6. passwd — gerenciar senhas"}),e.jsxs(s,{children:[e.jsx(o,{command:"passwd",comment:"Sem argumentos: troca a própria senha",output:`Trocando senha para wallyson.
Senha atual: 
Nova senha: 
Redigite a nova senha: 
passwd: senha atualizada com sucesso`}),e.jsx(o,{root:!0,command:"passwd carlos",comment:"Como root: troca a senha de outro (não pede a antiga)",output:`Nova senha: 
Redigite a nova senha: 
passwd: senha atualizada com sucesso`})]}),e.jsx("h3",{children:"Flags importantes do passwd"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Flag"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-l"})}),e.jsx("td",{children:"lock (insere ! no shadow)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-u"})}),e.jsx("td",{children:"unlock"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-d"})}),e.jsx("td",{children:"delete: deixa a conta SEM senha (perigoso)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-e"})}),e.jsx("td",{children:"expira a senha imediatamente (força troca no próximo login)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-S"})}),e.jsx("td",{children:"status"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-n N"})}),e.jsx("td",{children:"mínimo N dias entre trocas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-x N"})}),e.jsx("td",{children:"máximo N dias antes de expirar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-w N"})}),e.jsx("td",{children:"avisar N dias antes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-i N"})}),e.jsx("td",{children:"inativar conta N dias após expirar"})]})]})]}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"passwd -e carlos",output:`passwd: a informação de validade da senha está sendo modificada
passwd: senha atualizada com sucesso`}),e.jsx(o,{root:!0,command:"passwd -S carlos",output:"carlos PS 1970-01-01 0 99999 7 -1 (Senha definida, yescrypt.)"}),e.jsx(o,{root:!0,command:"passwd -n 7 -x 90 -w 14 -i 30 carlos",comment:"Mín 7d entre trocas, máx 90d, aviso 14d antes, inativa 30d depois"})]}),e.jsx("h3",{children:"chpasswd — em massa"}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"echo 'carlos:Senh@Forte2025' | chpasswd",comment:"Define senha sem prompt (útil para scripts)"}),e.jsx(o,{root:!0,command:"cat usuarios.txt | chpasswd",comment:"Onde usuarios.txt tem 'usuario:senha' por linha"})]}),e.jsx("h2",{children:"7. chage — políticas de envelhecimento de senha"}),e.jsxs(s,{children:[e.jsx(o,{command:"chage -l wallyson",output:`Última alteração de senha                                  : abr 09, 2025
A senha expira                                             : nunca
Senha inativa                                              : nunca
Conta expira                                               : nunca
Número mínimo de dias entre as alterações de senha         : 0
Número máximo de dias entre alterações de senha            : 99999
Número de dias de aviso antes da senha expirar             : 7`}),e.jsx(o,{root:!0,command:"chage -M 90 -m 7 -W 14 -I 30 -E 2026-12-31 carlos",comment:"Política completa: máx 90, mín 7, aviso 14, inativa 30, conta expira em 2026"}),e.jsx(o,{root:!0,command:"chage -l carlos",output:`Última alteração de senha                                  : abr 09, 2025
A senha expira                                             : jul 08, 2025
Senha inativa                                              : ago 07, 2025
Conta expira                                               : dez 31, 2026
Número mínimo de dias entre as alterações de senha         : 7
Número máximo de dias entre alterações de senha            : 90
Número de dias de aviso antes da senha expirar             : 14`}),e.jsx(o,{root:!0,command:"chage -d 0 carlos",comment:"Força troca de senha no próximo login"})]}),e.jsx("h2",{children:"8. groupadd, groupmod, groupdel, gpasswd"}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"groupadd desenvolvedores",comment:"Cria grupo com próximo GID disponível"}),e.jsx(o,{root:!0,command:"groupadd -g 1100 desenvolvedores",comment:"GID específico"}),e.jsx(o,{root:!0,command:"groupadd -r systemgroup",comment:"Grupo de sistema (GID baixo)"}),e.jsx(o,{root:!0,command:"groupmod -n devs desenvolvedores",comment:"Renomear"}),e.jsx(o,{root:!0,command:"groupmod -g 1200 devs",comment:"Mudar GID (cuidado: arquivos do GID antigo ficam órfãos)"}),e.jsx(o,{root:!0,command:"groupdel devs",comment:"Remover (falha se for grupo primário de algum usuário)"}),e.jsx(o,{root:!0,command:"gpasswd -a carlos devs",comment:"Adicionar carlos ao grupo devs",output:"Adicionando o usuário carlos no grupo devs"}),e.jsx(o,{root:!0,command:"gpasswd -d carlos devs",comment:"Remover carlos de devs",output:"Removendo o usuário carlos do grupo devs"}),e.jsx(o,{root:!0,command:"gpasswd -A wallyson devs",comment:"Definir wallyson como administrador do grupo (raro)"}),e.jsx(o,{root:!0,command:"gpasswd -M ana,joao,carlos devs",comment:"Substitui TODA a lista de membros"})]}),e.jsx("h3",{children:"newgrp — trocar grupo primário temporariamente"}),e.jsxs(s,{children:[e.jsx(o,{command:"id -gn",output:"wallyson"}),e.jsx(o,{command:"newgrp docker",comment:"Inicia novo shell com docker como grupo primário"}),e.jsx(o,{command:"id -gn",output:"docker"}),e.jsx(o,{command:"exit",comment:"Volta ao shell original com grupo wallyson"})]}),e.jsx("h2",{children:"9. id, who, w, last, lastlog, finger"}),e.jsxs(s,{children:[e.jsx(o,{command:"id",output:"uid=1000(wallyson) gid=1000(wallyson) grupos=1000(wallyson),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),100(users),114(lpadmin),134(lxd)"}),e.jsx(o,{command:"id -u",output:"1000"}),e.jsx(o,{command:"id -un",output:"wallyson"}),e.jsx(o,{command:"id -G",output:"1000 4 24 27 30 46 100 114 134"}),e.jsx(o,{command:"id ana",output:"uid=1001(ana) gid=1001(ana) grupos=1001(ana),100(users),998(docker)"}),e.jsx(o,{command:"who",comment:"Quem está logado agora",output:`wallyson tty7         2025-04-09 08:14 (:0)
wallyson pts/0        2025-04-09 09:23 (192.168.1.50)
ana      pts/1        2025-04-09 10:45 (10.0.0.7)`}),e.jsx(o,{command:"who -aH",output:`NOME     LINHA        TEMPO DE LOGIN     OCIOSO          PID COMENTÁRIO   SAÍDA
           system boot  2025-04-09 07:58
           run-level 5  2025-04-09 07:58
LOGIN    tty1         2025-04-09 07:59               714 id=tty1
wallyson tty7         2025-04-09 08:14   .          1429 (:0)
wallyson pts/0        2025-04-09 09:23   .          5018 (192.168.1.50)
ana      pts/1        2025-04-09 10:45   00:12      6201 (10.0.0.7)`}),e.jsx(o,{command:"w",comment:"Quem + o que está fazendo + load",output:` 11:47:23 up  3:49,  3 users,  load average: 0,28, 0,34, 0,31
USUÁRIO  TTY      DE               LOGIN@   OCIOSO  JCPU  PCPU O QUE
wallyson tty7     :0               08:14    3:33m  1:17  0.05s /usr/bin/gnome-shell
wallyson pts/0    192.168.1.50     09:23    0.00s  0.45s 0.01s w
ana      pts/1    10.0.0.7         10:45   12:02   0.30s 0.30s -bash`}),e.jsx(o,{command:"last -n 10",comment:"Histórico de logins (lê /var/log/wtmp)",output:`wallyson pts/0    192.168.1.50     Wed Apr  9 09:23   still logged in
ana      pts/1    10.0.0.7         Wed Apr  9 10:45   still logged in
wallyson tty7     :0               Wed Apr  9 08:14   still logged in
reboot   system boot 6.8.0-49-generic Wed Apr  9 07:58   still running
wallyson pts/2    192.168.1.50     Tue Apr  8 19:12 - 22:48  (03:36)
ana      pts/0    10.0.0.7         Tue Apr  8 14:30 - 18:02  (03:32)
wallyson tty7     :0               Tue Apr  8 08:01 - down   (11:30)
reboot   system boot 6.8.0-49-generic Tue Apr  8 08:00 - 19:31  (11:31)

wtmp begins Wed Apr  2 09:11:03 2025`}),e.jsx(o,{command:"last -F wallyson",comment:"Datas completas, apenas wallyson"}),e.jsx(o,{command:"lastb",comment:"Tentativas de login MALSUCEDIDAS (lê /var/log/btmp, requer root)",output:`root     ssh:notty    192.0.2.45       Wed Apr  9 11:02 - 11:02  (00:00)
admin    ssh:notty    198.51.100.7     Wed Apr  9 10:58 - 10:58  (00:00)
oracle   ssh:notty    198.51.100.7     Wed Apr  9 10:58 - 10:58  (00:00)`}),e.jsx(o,{command:"lastlog",comment:"Último login de cada usuário (lê /var/log/lastlog)",output:`Nome de usuário Porta    De               Último
root                                       **Nunca logou**
wallyson         tty7     :0               Wed Apr  9 08:14:33 -0300 2025
ana              pts/1    10.0.0.7         Wed Apr  9 10:45:11 -0300 2025
carlos                                     **Nunca logou**`}),e.jsx(o,{root:!0,command:"apt install finger -y"}),e.jsx(o,{command:"finger wallyson",output:`Login: wallyson                       Name: Wallyson Silva
Directory: /home/wallyson             Shell: /bin/bash
On since Wed Apr  9 08:14 (-03) on tty7 from :0
On since Wed Apr  9 09:23 (-03) on pts/0 from 192.168.1.50
Mail last read Wed Apr  9 09:25 2025 (-03)
No Plan.`})]}),e.jsx("h2",{children:"10. sudo — o coração do Ubuntu"}),e.jsxs("p",{children:[e.jsx("code",{children:"sudo"})," permite executar comandos como outro usuário (default: root) ",e.jsx("em",{children:"se"})," a política em ",e.jsx("code",{children:"/etc/sudoers"})," permitir. No Ubuntu, todo usuário no grupo",e.jsx("code",{children:"sudo"})," recebe permissão total — graças à linha ",e.jsx("code",{children:"%sudo ALL=(ALL:ALL) ALL"}),"."]}),e.jsxs(s,{children:[e.jsx(o,{command:"sudo -V | head -3",output:`Sudo version 1.9.15p5
Sudoers policy plugin version 1.9.15p5
Sudoers file grammar version 50`}),e.jsx(o,{command:"sudo -l",comment:"O que EU posso rodar com sudo",output:`Os usuários autorizados para wallyson em ubuntu:
    Os usuários podem rodar os seguintes comandos em ubuntu:
        (ALL : ALL) ALL`}),e.jsx(o,{command:"sudo -ll",comment:"Forma longa, com origem da regra",output:`Sudoers entry: wallyson em ubuntu, vindo de /etc/sudoers
    RunAsUsers: ALL
    RunAsGroups: ALL
    Comandos:
        ALL`})]}),e.jsx("h3",{children:"Flags úteis do sudo"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Flag"}),e.jsx("th",{children:"O que faz"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-i"})}),e.jsx("td",{children:"shell de login como root (carrega /root/.bashrc)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-s"})}),e.jsx("td",{children:"shell sem login"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-u USER"})}),e.jsx("td",{children:"roda como outro usuário (default: root)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-g GROUP"})}),e.jsx("td",{children:"roda com outro grupo primário"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-E"})}),e.jsx("td",{children:"preserva variáveis de ambiente"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-H"})}),e.jsx("td",{children:"define HOME para o do usuário-alvo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-k"})}),e.jsx("td",{children:"invalida o cache de credencial (próximo sudo pede senha)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-K"})}),e.jsx("td",{children:"remove totalmente o cache"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-v"})}),e.jsx("td",{children:"renova o timestamp sem rodar comando"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-n"})}),e.jsx("td",{children:"não interage (falha se precisar senha)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"-l"})}),e.jsx("td",{children:"lista privilégios"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"!!"})}),e.jsxs("td",{children:["(bash) ",e.jsx("code",{children:"sudo !!"})," repete o último comando com sudo"]})]})]})]}),e.jsxs(s,{children:[e.jsx(o,{command:"sudo -i",comment:"Vira root com ambiente limpo de root",output:`[sudo] senha para wallyson: 
root@ubuntu:~# `}),e.jsx(o,{root:!0,command:"exit",output:`logout
wallyson@ubuntu:~$ `}),e.jsx(o,{command:"sudo -u postgres psql",comment:"Roda psql como postgres"}),e.jsx(o,{command:"sudo -E env | grep PATH",comment:"-E preserva PATH/LANG do usuário",output:`PATH=/home/wallyson/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
LANG=pt_BR.UTF-8`}),e.jsx(o,{command:"cat /etc/shadow",output:"cat: /etc/shadow: Permissão negada"}),e.jsx(o,{command:"sudo !!",comment:"Repete com sudo (bash history expansion)",output:`sudo cat /etc/shadow
[sudo] senha para wallyson: 
root:!:20056:0:99999:7:::
...`})]}),e.jsx("h2",{children:"11. /etc/sudoers e /etc/sudoers.d/"}),e.jsxs("p",{children:["O arquivo principal é ",e.jsx("code",{children:"/etc/sudoers"})," (modo 440, root:root). NUNCA edite com",e.jsx("code",{children:"nano"})," ou ",e.jsx("code",{children:"vim"})," diretamente — use ",e.jsx("code",{children:"visudo"}),", que valida a sintaxe antes de salvar (um erro pode te bloquear permanentemente do sudo)."]}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"visudo",comment:"Abre /etc/sudoers no editor configurado (nano por padrão no Ubuntu)"}),e.jsx(o,{root:!0,command:"visudo -c",comment:"Apenas valida",output:`/etc/sudoers: parsed OK
/etc/sudoers.d/README: parsed OK
/etc/sudoers.d/admin: parsed OK`}),e.jsx(o,{root:!0,command:"visudo -f /etc/sudoers.d/devs",comment:"Edita um drop-in (preferido a tocar no sudoers principal)"})]}),e.jsx(r,{path:"/etc/sudoers (trecho relevante no Ubuntu)",children:`# Defaults
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
@includedir /etc/sudoers.d`}),e.jsx("h3",{children:"Sintaxe de uma regra"}),e.jsx(r,{path:"formato",children:`USUARIO   HOSTS=(RUNAS_USERS:RUNAS_GROUPS)  [TAGS:]  COMANDOS
                                            ^^^^^^
                                    NOPASSWD:, PASSWD:, SETENV:, NOSETENV:, LOG_INPUT:, LOG_OUTPUT:`}),e.jsx("h3",{children:"Exemplos comuns em /etc/sudoers.d/"}),e.jsx(r,{path:"/etc/sudoers.d/devs",children:`# devs podem reiniciar nginx sem senha
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
Defaults:carlos    log_input, log_output`}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"install -m 440 -o root -g root /dev/stdin /etc/sudoers.d/devs <<< '%devs ALL=(root) NOPASSWD: /bin/systemctl restart nginx'",comment:"Cria drop-in com permissões corretas"}),e.jsx(o,{root:!0,command:"ls -l /etc/sudoers.d/",output:`total 12
-r--r----- 1 root root 958 abr  9 12:00 README
-r--r----- 1 root root  76 abr  9 14:23 devs
-r--r----- 1 root root 132 nov 14 09:11 admin`})]}),e.jsxs(a,{type:"danger",title:"Cuidado com curingas em sudoers",children:[e.jsx("code",{children:"carlos ALL=(root) NOPASSWD: /usr/bin/vim /etc/nginx/*"})," parece restritivo, mas carlos pode digitar ",e.jsx("code",{children:":!bash"})," dentro do vim e virar root. ",e.jsx("strong",{children:"Edite arquivos com sudoedit"}),", não com vim direto. Sudoedit copia o arquivo para um tmp, abre como o usuário, e só copia de volta como root."]}),e.jsx("h3",{children:"sudoedit — edição segura"}),e.jsx(s,{children:e.jsx(o,{command:"sudoedit /etc/nginx/nginx.conf",comment:"Equivalente a sudo -e"})}),e.jsx(r,{path:"/etc/sudoers.d/nginx-admin (forma segura)",children:"%nginx-admin  ALL=(root) NOPASSWD: sudoedit /etc/nginx/nginx.conf, sudoedit /etc/nginx/sites-available/*"}),e.jsx("h2",{children:"12. PAM — Pluggable Authentication Modules"}),e.jsxs("p",{children:["O PAM é a camada que ",e.jsx("em",{children:"realmente"})," autentica o usuário. Cada serviço (login, sshd, sudo, passwd, gdm) tem um arquivo em ",e.jsx("code",{children:"/etc/pam.d/"})," que descreve quatro estágios:",e.jsx("strong",{children:"auth"}),", ",e.jsx("strong",{children:"account"}),", ",e.jsx("strong",{children:"password"}),", ",e.jsx("strong",{children:"session"}),"."]}),e.jsxs(s,{children:[e.jsx(o,{command:"ls /etc/pam.d/",output:`chfn          common-auth          cron       login    polkit-1   sshd
chpasswd      common-password      gdm-launch sudo     ppp        su
chsh          common-session       gdm-password sudo-i postlogin  systemd-user
common-account common-session-noninteractive  newusers passwd     vmtoolsd`}),e.jsx(o,{command:"cat /etc/pam.d/sudo",output:`#%PAM-1.0

session    required   pam_env.so readenv=1 user_readenv=0
session    required   pam_env.so readenv=1 envfile=/etc/default/locale user_readenv=0
@include common-auth
@include common-account
@include common-session-noninteractive`}),e.jsx(o,{command:"cat /etc/pam.d/common-auth",output:`# here are the per-package modules (the "Primary" block)
auth    [success=1 default=ignore]      pam_unix.so nullok
# here's the fallback if no module succeeds
auth    requisite                       pam_deny.so
# prime the stack with a positive return value if there isn't one already;
auth    required                        pam_permit.so
# and here are more per-package modules (the "Additional" block)
auth    optional                        pam_cap.so
# end of pam-auth-update config`})]}),e.jsx("h3",{children:"Forçar política de senhas com pam_pwquality"}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"apt install libpam-pwquality -y"}),e.jsx(o,{root:!0,command:"cat /etc/security/pwquality.conf",output:`# minlen = tamanho mínimo
# minclass = mínimo de classes (lower, upper, digit, other)
# maxrepeat = máximo de mesmo char repetido
# dcredit = créditos por dígitos (negativo = exige)
# ucredit, lcredit, ocredit = idem para upper, lower, other`})]}),e.jsx(r,{path:"/etc/security/pwquality.conf (política rígida)",children:`minlen = 12
minclass = 3
maxrepeat = 3
dcredit = -1
ucredit = -1
lcredit = -1
ocredit = -1
difok = 5
enforce_for_root`}),e.jsx("h3",{children:"Limites de recursos: /etc/security/limits.conf"}),e.jsx(r,{path:"/etc/security/limits.d/90-devs.conf",children:`#<domain>  <type>  <item>     <value>
@devs      soft    nproc      4096
@devs      hard    nproc      8192
@devs      soft    nofile     65536
@devs      hard    nofile     131072
carlos     hard    maxlogins  3
*          hard    core       0`}),e.jsx(s,{children:e.jsx(o,{command:"ulimit -a",output:`real-time non-blocking time  (microseconds, -R) unlimited
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
file locks                          (-x) unlimited`})}),e.jsx("h2",{children:"13. Primeiro usuário, root e Ubuntu"}),e.jsxs("p",{children:["Depois de uma instalação fresca do Ubuntu, o usuário criado fica no grupo ",e.jsx("code",{children:"sudo"}),". O usuário root vem com a senha bloqueada — você verifica assim:"]}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"passwd -S root",output:"root L 2024-12-08 0 99999 7 -1 (Senha bloqueada.)"}),e.jsx(o,{root:!0,command:"su -",comment:"Tenta virar root via su (sem sudo) — vai falhar",output:`Senha: 
su: Falha de autenticação`})]}),e.jsxs("p",{children:["Para realmente ",e.jsx("strong",{children:"habilitar"})," o login root (não recomendado em servidores públicos):"]}),e.jsxs(s,{children:[e.jsx(o,{root:!0,command:"passwd root",output:`Nova senha: 
Redigite a nova senha: 
passwd: senha atualizada com sucesso`}),e.jsx(o,{root:!0,command:"passwd -S root",output:"root P 2025-04-09 0 99999 7 -1 (Senha definida, yescrypt.)"})]}),e.jsxs("p",{children:["Para ",e.jsx("strong",{children:"desabilitar"})," de novo (volta ao default Ubuntu):"]}),e.jsx(s,{children:e.jsx(o,{root:!0,command:"passwd -dl root",comment:"-d remove senha, -l bloqueia"})}),e.jsx("h2",{children:"14. /etc/skel — modelo de novo home"}),e.jsxs("p",{children:["Tudo que está em ",e.jsx("code",{children:"/etc/skel"})," é copiado para o home recém-criado de cada novo usuário. Customize aqui dotfiles padrão da sua organização."]}),e.jsxs(s,{children:[e.jsx(o,{command:"ls -la /etc/skel",output:`total 24
drwxr-xr-x   2 root root 4096 abr  1 09:11 .
drwxr-xr-x 138 root root 4096 abr  9 11:12 ..
-rw-r--r--   1 root root  220 abr  1 09:11 .bash_logout
-rw-r--r--   1 root root 3771 abr  1 09:11 .bashrc
-rw-r--r--   1 root root  807 abr  1 09:11 .profile`}),e.jsx(o,{root:!0,command:"cp ~/.vimrc /etc/skel/",comment:"Todo novo usuário ganha o seu vimrc"})]}),e.jsx("h2",{children:"15. NSS — getent"}),e.jsxs("p",{children:[e.jsx("code",{children:"getent"})," consulta as bases definidas em ",e.jsx("code",{children:"/etc/nsswitch.conf"})," — útil quando você usa LDAP, SSSD, Active Directory, e a entrada NÃO está em /etc/passwd."]}),e.jsxs(s,{children:[e.jsx(o,{command:"cat /etc/nsswitch.conf | head -7",output:`# /etc/nsswitch.conf
passwd:         files systemd
group:          files systemd
shadow:         files
gshadow:        files
hosts:          files mdns4_minimal [NOTFOUND=return] dns
networks:       files`}),e.jsx(o,{command:"getent passwd 1000",output:"wallyson:x:1000:1000:Wallyson Silva,,,:/home/wallyson:/bin/bash"}),e.jsx(o,{command:"getent group sudo",output:"sudo:x:27:wallyson,ana"}),e.jsx(o,{command:"getent hosts ubuntu.com",output:"185.125.190.20  ubuntu.com"})]}),e.jsx("h2",{children:"16. Resumão final + boas práticas"}),e.jsx(a,{type:"success",title:"Checklist de criação de usuário no Ubuntu",children:e.jsxs("ol",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"adduser nome"})," (não ",e.jsx("code",{children:"useradd"}),") para humanos."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"useradd -r -s /usr/sbin/nologin"})," para serviços."]}),e.jsxs("li",{children:["Política de senha: ",e.jsx("code",{children:"chage -M 90 -W 14"}),"."]}),e.jsxs("li",{children:["NUNCA edite /etc/sudoers direto: ",e.jsx("code",{children:"visudo -f /etc/sudoers.d/seuarquivo"}),"."]}),e.jsx("li",{children:"Drop-ins em /etc/sudoers.d/ devem ser modo 440, root:root, sem ponto/til no nome."}),e.jsxs("li",{children:["Para edições com sudo, prefira ",e.jsx("code",{children:"sudoedit"})," a ",e.jsx("code",{children:"sudo vim"}),"."]}),e.jsxs("li",{children:["Audite com ",e.jsx("code",{children:"last"}),", ",e.jsx("code",{children:"lastb"}),", ",e.jsx("code",{children:"journalctl _COMM=sudo"}),"."]}),e.jsx("li",{children:"Hardening: pam_pwquality + pam_tally2/pam_faillock + 2FA (libpam-google-authenticator)."}),e.jsxs("li",{children:["Containers/k8s: defina UID:GID fixos com ",e.jsx("code",{children:"useradd -u 10001 -g 10001"}),"."]})]})}),e.jsx(a,{type:"note",title:"Logs onde olhar",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"/var/log/auth.log"})," — autenticações (PAM, sudo, sshd)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"/var/log/wtmp"})," — logins (use ",e.jsx("code",{children:"last"}),")"]}),e.jsxs("li",{children:[e.jsx("code",{children:"/var/log/btmp"})," — logins falhos (",e.jsx("code",{children:"lastb"}),")"]}),e.jsxs("li",{children:[e.jsx("code",{children:"/var/log/lastlog"})," — último login de cada usuário (",e.jsx("code",{children:"lastlog"}),")"]}),e.jsxs("li",{children:[e.jsx("code",{children:"journalctl _COMM=sudo"})," — invocações do sudo"]}),e.jsxs("li",{children:[e.jsx("code",{children:"/var/log/sudo.log"})," — se ativou ",e.jsx("code",{children:"logfile"})," em sudoers"]})]})})]})}export{m as default};

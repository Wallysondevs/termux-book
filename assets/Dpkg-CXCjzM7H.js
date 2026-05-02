import{j as e}from"./index-CbmJLKV7.js";import{P as a}from"./PageContainer-C07HsLrK.js";import{C as o}from"./CodeBlock-hEuZNnwQ.js";import{I as r}from"./InfoBox-OReRpdzk.js";import"./house-Cv6RfdLC.js";import"./proxy-BQXFYY1E.js";function p(){return e.jsxs(a,{title:"dpkg — Gerenciador de Pacotes de Baixo Nível",subtitle:"Guia completo do dpkg no Termux: instalar .deb, listar pacotes, verificar arquivos, reconfigurar e resolver problemas de pacotes.",difficulty:"intermediario",timeToRead:"20 min",children:[e.jsxs("p",{children:["O ",e.jsx("strong",{children:"dpkg"})," é o gerenciador de pacotes de baixo nível do Debian/Termux. Enquanto o ",e.jsx("code",{children:"apt"})," resolve dependências automaticamente, o dpkg trabalha diretamente com arquivos ",e.jsx("code",{children:".deb"}),". É útil para instalar pacotes baixados manualmente, diagnosticar problemas e inspecionar o sistema de pacotes."]}),e.jsx("h2",{children:"1. Instalar e Remover Pacotes"}),e.jsx(o,{title:"Gerenciar pacotes .deb com dpkg",code:`# Instalar um pacote .deb
  sudo dpkg -i pacote.deb
  # Se faltar dependências:
  pkg install -f   # Instalar dependências faltantes

  # Instalar múltiplos .deb de uma vez
  sudo dpkg -i *.deb
  pkg install -f

  # Remover pacote (mantém configurações)
  sudo dpkg -r nome-do-pacote

  # Remover pacote completamente (incluindo configurações)
  sudo dpkg -P nome-do-pacote
  # P = purge

  # Reconfiguar um pacote
  sudo dpkg-reconfigure nome-do-pacote
  # Exemplos úteis:
  sudo dpkg-reconfigure locales       # Configurar idiomas
  sudo dpkg-reconfigure tzdata        # Configurar fuso horário
  sudo dpkg-reconfigure keyboard-configuration  # Teclado`}),e.jsx("h2",{children:"2. Listar e Buscar Pacotes"}),e.jsx(o,{title:"Consultar o banco de dados de pacotes",code:`# Listar todos os pacotes instalados
  dpkg -l
  # Saída: ii = instalado, rc = removido com configs mantidas

  # Filtrar por nome
  dpkg -l | grep nginx
  dpkg -l "python3*"

  # Verificar se um pacote está instalado
  dpkg -s nginx
  # Mostra: versão, descrição, dependências, etc.

  # Listar arquivos de um pacote instalado
  dpkg -L nginx
  # Mostra todos os arquivos instalados pelo pacote

  # Descobrir qual pacote instalou um arquivo
  dpkg -S /usr/bin/git
  # Saída: git: /usr/bin/git

  # Buscar qual pacote fornece um arquivo
  dpkg -S /etc/nginx/nginx.conf
  # Saída: nginx-common: /etc/nginx/nginx.conf

  # Listar pacotes por tamanho
  dpkg-query -W --showformat='\${Installed-Size}	\${Package}
' | sort -rn | head -20

  # Ver informações de um .deb (sem instalar)
  dpkg -I pacote.deb
  dpkg -c pacote.deb   # Listar conteúdo do .deb`}),e.jsx("h2",{children:"3. Resolver Problemas"}),e.jsx(o,{title:"Corrigir problemas com dpkg",code:`# Erro: "dpkg was interrupted"
  sudo dpkg --configure -a

  # Erro: "Sub-process /usr/bin/dpkg returned an error"
  pkg install -f     # Tentar corrigir dependências
  sudo dpkg --configure -a

  # Forçar instalação (ignorar dependências — use com cuidado!)
  sudo dpkg -i --force-depends pacote.deb

  # Forçar remoção de pacote travado
  sudo dpkg --remove --force-remove-reinstreq pacote-travado

  # Verificar integridade de todos os pacotes
  sudo dpkg --audit

  # Verificar se arquivos de um pacote estão intactos
  sudo dpkg --verify nginx
  # Se não mostrar nada, tudo OK

  # Reinstalar pacote (substituir arquivos corrompidos)
  pkg install --reinstall nginx

  # Extrair .deb sem instalar
  dpkg-deb -x pacote.deb /tmp/extraido/
  # Útil para inspecionar o conteúdo

  # Criar .deb a partir de diretório
  dpkg-deb --build diretorio pacote.deb`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(o,{title:"Problemas comuns com dpkg",code:`# Lock file travado
  # "Could not get lock /var/lib/dpkg/lock"
  # Esperar outro processo terminar ou:
  sudo rm /var/lib/dpkg/lock-frontend
  sudo rm /var/lib/dpkg/lock
  sudo dpkg --configure -a

  # Pacote em estado inconsistente
  sudo dpkg --remove --force-remove-reinstreq nome-pacote
  pkg update
  pkg install -f

  # Listar pacotes quebrados
  dpkg -l | grep -E "^(iU|iF|iH)"

  # Banco de dados dpkg corrompido
  # Restaurar backup:
  sudo cp /var/backups/dpkg.status.0 /var/lib/dpkg/status
  pkg update`}),e.jsxs(r,{type:"info",title:"dpkg vs apt",children:["Use ",e.jsx("code",{children:"apt"})," para o dia a dia — ele chama o dpkg internamente e resolve dependências. Use ",e.jsx("code",{children:"dpkg"})," quando precisar instalar ",e.jsx("code",{children:".deb"}),"baixados manualmente, diagnosticar problemas de pacotes ou quando o apt falhar."]})]})}export{p as default};

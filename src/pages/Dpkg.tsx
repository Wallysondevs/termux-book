import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Dpkg() {
    return (
      <PageContainer
        title="dpkg — Gerenciador de Pacotes de Baixo Nível"
        subtitle="Guia completo do dpkg no Ubuntu: instalar .deb, listar pacotes, verificar arquivos, reconfigurar e resolver problemas de pacotes."
        difficulty="intermediario"
        timeToRead="20 min"
      >
        <p>
          O <strong>dpkg</strong> é o gerenciador de pacotes de baixo nível do Debian/Ubuntu.
          Enquanto o <code>apt</code> resolve dependências automaticamente, o dpkg trabalha
          diretamente com arquivos <code>.deb</code>. É útil para instalar pacotes baixados
          manualmente, diagnosticar problemas e inspecionar o sistema de pacotes.
        </p>

        <h2>1. Instalar e Remover Pacotes</h2>
        <CodeBlock
          title="Gerenciar pacotes .deb com dpkg"
          code={`# Instalar um pacote .deb
  sudo dpkg -i pacote.deb
  # Se faltar dependências:
  sudo apt install -f   # Instalar dependências faltantes

  # Instalar múltiplos .deb de uma vez
  sudo dpkg -i *.deb
  sudo apt install -f

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
  sudo dpkg-reconfigure keyboard-configuration  # Teclado`}
        />

        <h2>2. Listar e Buscar Pacotes</h2>
        <CodeBlock
          title="Consultar o banco de dados de pacotes"
          code={`# Listar todos os pacotes instalados
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
  dpkg-query -W --showformat='\${Installed-Size}\t\${Package}\n' | sort -rn | head -20

  # Ver informações de um .deb (sem instalar)
  dpkg -I pacote.deb
  dpkg -c pacote.deb   # Listar conteúdo do .deb`}
        />

        <h2>3. Resolver Problemas</h2>
        <CodeBlock
          title="Corrigir problemas com dpkg"
          code={`# Erro: "dpkg was interrupted"
  sudo dpkg --configure -a

  # Erro: "Sub-process /usr/bin/dpkg returned an error"
  sudo apt install -f     # Tentar corrigir dependências
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
  sudo apt install --reinstall nginx

  # Extrair .deb sem instalar
  dpkg-deb -x pacote.deb /tmp/extraido/
  # Útil para inspecionar o conteúdo

  # Criar .deb a partir de diretório
  dpkg-deb --build diretorio pacote.deb`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com dpkg"
          code={`# Lock file travado
  # "Could not get lock /var/lib/dpkg/lock"
  # Esperar outro processo terminar ou:
  sudo rm /var/lib/dpkg/lock-frontend
  sudo rm /var/lib/dpkg/lock
  sudo dpkg --configure -a

  # Pacote em estado inconsistente
  sudo dpkg --remove --force-remove-reinstreq nome-pacote
  sudo apt update
  sudo apt install -f

  # Listar pacotes quebrados
  dpkg -l | grep -E "^(iU|iF|iH)"

  # Banco de dados dpkg corrompido
  # Restaurar backup:
  sudo cp /var/backups/dpkg.status.0 /var/lib/dpkg/status
  sudo apt update`}
        />

        <AlertBox type="info" title="dpkg vs apt">
          Use <code>apt</code> para o dia a dia — ele chama o dpkg internamente e resolve
          dependências. Use <code>dpkg</code> quando precisar instalar <code>.deb</code>
          baixados manualmente, diagnosticar problemas de pacotes ou quando o apt falhar.
        </AlertBox>
      </PageContainer>
    );
  }
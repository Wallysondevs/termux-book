import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function PPA() {
    return (
      <PageContainer
        title="PPA — Repositórios Pessoais"
        subtitle="Guia completo de PPAs no Ubuntu: adicionar, remover, gerenciar repositórios de terceiros, segurança e alternativas."
        difficulty="intermediario"
        timeToRead="20 min"
      >
        <p>
          Os <strong>PPAs</strong> (Personal Package Archives) são repositórios mantidos pela
          comunidade no Launchpad, permitindo instalar software que não está nos repositórios
          oficiais do Ubuntu ou versões mais recentes de pacotes existentes. São a forma mais
          fácil de obter software atualizado no Ubuntu.
        </p>

        <h2>1. Adicionar e Usar PPAs</h2>
        <CodeBlock
          title="Gerenciar PPAs no Ubuntu"
          code={`# Adicionar um PPA
  sudo add-apt-repository ppa:nome-do-usuario/nome-do-ppa
  sudo apt update

  # Exemplos de PPAs populares:
  # Drivers NVIDIA mais recentes
  sudo add-apt-repository ppa:graphics-drivers/ppa

  # Git mais recente
  sudo add-apt-repository ppa:git-core/ppa

  # LibreOffice mais recente
  sudo add-apt-repository ppa:libreoffice/ppa

  # GIMP mais recente
  sudo add-apt-repository ppa:ubuntuhandbook1/gimp

  # Após adicionar, instalar o pacote:
  sudo apt update
  sudo apt install nome-do-pacote

  # Adicionar PPA sem confirmação interativa
  sudo add-apt-repository -y ppa:git-core/ppa

  # Ver quais PPAs estão adicionados
  ls /etc/apt/sources.list.d/
  # Ou:
  grep -r "^deb " /etc/apt/sources.list.d/
  # Ou usando apt:
  apt policy | grep -E "ppa\.launchpad"`}
        />

        <h2>2. Remover PPAs</h2>
        <CodeBlock
          title="Remover PPAs e fazer downgrade de pacotes"
          code={`# Remover um PPA (mantém os pacotes instalados)
  sudo add-apt-repository --remove ppa:nome-do-usuario/nome-do-ppa
  sudo apt update

  # Remover PPA e fazer downgrade dos pacotes para a versão oficial
  sudo apt install -y ppa-purge
  sudo ppa-purge ppa:nome-do-usuario/nome-do-ppa
  # O ppa-purge:
  # 1. Remove o PPA
  # 2. Faz downgrade de todos os pacotes do PPA para a versão dos repos oficiais
  # 3. Atualiza a lista de pacotes

  # Remover manualmente o arquivo do PPA
  sudo rm /etc/apt/sources.list.d/nome-do-ppa*.list
  sudo rm /etc/apt/sources.list.d/nome-do-ppa*.sources
  sudo apt update

  # Listar pacotes instalados de um PPA específico
  apt list --installed 2>/dev/null | grep "ppa-name"

  # Verificar de qual repositório um pacote vem
  apt policy nome-do-pacote
  # Mostra todas as versões disponíveis e de onde vêm`}
        />

        <h2>3. Repositórios de Terceiros (não-PPA)</h2>
        <CodeBlock
          title="Adicionar repositórios externos"
          code={`# Alguns softwares usam repositórios próprios (não são PPAs do Launchpad)

  # === Docker (repositório oficial) ===
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
  sudo apt update
  sudo apt install docker-ce

  # === VS Code (repositório da Microsoft) ===
  wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
  sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/
  echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
  sudo apt update
  sudo apt install code

  # === Google Chrome ===
  wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /etc/apt/keyrings/google.gpg
  echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
  sudo apt update
  sudo apt install google-chrome-stable

  # === PostgreSQL (versões mais recentes) ===
  sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
  sudo apt update`}
        />

        <h2>4. Segurança com PPAs</h2>
        <CodeBlock
          title="Boas práticas de segurança"
          code={`# PPAs são mantidos por QUALQUER PESSOA — não são verificados pela Canonical
  # Boas práticas:

  # 1. Verificar reputação do PPA
  # Acesse: https://launchpad.net/~nome-do-usuario/+archive/ubuntu/nome-do-ppa
  # Veja: número de usuários, data de criação, pacotes

  # 2. Verificar as chaves GPG
  apt-key list      # Lista chaves de repositórios (método antigo)
  ls /etc/apt/keyrings/  # Método novo (Ubuntu 22.04+)

  # 3. Preferir alternativas quando possível:
  # - Flatpak (flathub.org)
  # - Snap (snapcraft.io)
  # - AppImage (appimage.org)
  # - Repositórios oficiais do software

  # 4. Fixar versão de pacote (impedir atualização automática)
  sudo tee /etc/apt/preferences.d/pin-pacote > /dev/null << 'EOF'
  Package: nome-do-pacote
  Pin: version 1.2.3*
  Pin-Priority: 1001
  EOF

  # 5. Verificar pacotes instalados de PPAs
  # Se suspeitar de algo:
  apt list --installed 2>/dev/null | while read pkg; do
    apt policy "$(echo $pkg | cut -d/ -f1)" 2>/dev/null | grep -q "ppa.launchpad" && echo "$pkg"
  done

  # Gerenciar chaves GPG (formato moderno)
  # As chaves agora ficam em /etc/apt/keyrings/ (formato .gpg)
  # Não use mais apt-key add (depreciado)`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com PPAs"
          code={`# Erro: "The repository does not have a Release file"
  # Causa: PPA não suporta sua versão do Ubuntu
  # Solução: Verificar no Launchpad se há suporte para sua versão
  lsb_release -cs   # Sua versão (noble, jammy, etc.)
  # Remover o PPA:
  sudo add-apt-repository --remove ppa:nome/ppa

  # Erro: "NO_PUBKEY XXXXXXXX"
  # Solução: Importar a chave
  sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys XXXXXXXX
  # Ou (método moderno):
  sudo gpg --keyserver keyserver.ubuntu.com --recv-keys XXXXXXXX
  sudo gpg --export XXXXXXXX | sudo tee /etc/apt/keyrings/nome.gpg > /dev/null

  # Erro: "Conflicting values set for option Signed-By"
  # Causa: PPA duplicado
  # Solução: Remover duplicatas
  ls /etc/apt/sources.list.d/
  # Remover arquivos duplicados

  # apt update falha por causa de um PPA
  # Desabilitar temporariamente:
  sudo mv /etc/apt/sources.list.d/ppa-problematico.list /tmp/
  sudo apt update
  # Investigar e corrigir, depois voltar:
  sudo mv /tmp/ppa-problematico.list /etc/apt/sources.list.d/`}
        />

        <AlertBox type="warning" title="PPAs e atualizações do Ubuntu">
          Ao atualizar o Ubuntu para uma nova versão (ex: 22.04 → 24.04), todos os PPAs
          são <strong>automaticamente desabilitados</strong>. Após a atualização, você precisa
          reativar manualmente cada PPA e verificar se ele suporta a nova versão.
        </AlertBox>
      </PageContainer>
    );
  }
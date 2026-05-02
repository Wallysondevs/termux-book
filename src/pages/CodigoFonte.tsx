import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function CodigoFonte() {
    return (
      <PageContainer
        title="Compilar Código Fonte no Ubuntu"
        subtitle="Guia completo para compilar software a partir do código fonte: ./configure, make, make install, checkinstall, dependências e boas práticas."
        difficulty="avancado"
        timeToRead="25 min"
      >
        <p>
          Compilar a partir do código fonte permite instalar a versão mais recente de qualquer
          software, aplicar patches, otimizar para seu hardware e entender como o software é
          construído. É o método usado quando o pacote não está disponível no apt/snap/flatpak
          ou quando você precisa de uma versão específica.
        </p>

        <h2>1. Preparar o Ambiente</h2>
        <CodeBlock
          title="Instalar ferramentas de compilação"
          code={`# Instalar o essencial para compilação
  sudo apt install -y build-essential
  # Inclui: gcc, g++, make, dpkg-dev, libc6-dev

  # Ferramentas extras comuns
  sudo apt install -y cmake automake autoconf libtool pkg-config
  sudo apt install -y git wget curl

  # Instalar dependências de desenvolvimento (headers)
  # Cada software tem suas dependências — leia o README/INSTALL

  # Verificar ferramentas
  gcc --version       # Compilador C
  g++ --version       # Compilador C++
  make --version      # Build system
  cmake --version     # Build system moderno`}
        />

        <h2>2. O Processo Clássico</h2>
        <CodeBlock
          title="./configure && make && make install"
          code={`# O processo clássico de compilação tem 3 passos:

  # 1. Baixar o código fonte
  wget https://exemplo.com/software-1.0.tar.gz
  tar xzf software-1.0.tar.gz
  cd software-1.0

  # Ou clonar do Git:
  git clone https://github.com/autor/software.git
  cd software

  # 2. Configurar (detectar sistema, verificar dependências)
  ./configure
  # Opções comuns:
  ./configure --prefix=/usr/local       # Onde instalar (padrão)
  ./configure --prefix=/opt/software    # Instalar em local customizado
  ./configure --enable-feature          # Habilitar recurso opcional
  ./configure --disable-feature         # Desabilitar recurso
  ./configure --with-library=/caminho   # Caminho de biblioteca

  # Se der erro de dependência:
  # "configure: error: Package requirements (libssl) were not met"
  # Instalar: sudo apt install libssl-dev

  # 3. Compilar
  make
  # Ou com múltiplos cores (mais rápido):
  make -j$(nproc)
  # $(nproc) = número de CPUs

  # 4. Instalar
  sudo make install

  # 5. Verificar
  which software
  software --version

  # Desinstalar (se make uninstall existir)
  sudo make uninstall`}
        />

        <h2>3. checkinstall — Método Recomendado</h2>
        <CodeBlock
          title="Usar checkinstall para criar pacotes .deb"
          code={`# checkinstall cria um .deb ao invés de instalar diretamente
  # Vantagens: pode desinstalar com apt, rastrear arquivos, sem conflitos
  sudo apt install -y checkinstall

  # Ao invés de "sudo make install", use:
  sudo checkinstall --default
  # Cria: software_1.0-1_amd64.deb
  # Instala automaticamente

  # Com opções customizadas:
  sudo checkinstall \
    --pkgname=meu-software \
    --pkgversion=1.0 \
    --maintainer="seu@email.com" \
    --provides=meu-software

  # Desinstalar (como qualquer pacote):
  sudo apt remove meu-software

  # Reinstalar o .deb:
  sudo dpkg -i meu-software_1.0-1_amd64.deb`}
        />

        <h2>4. CMake — Build System Moderno</h2>
        <CodeBlock
          title="Compilar projetos com CMake"
          code={`# Muitos projetos modernos usam CMake ao invés de autotools
  # O processo é similar mas usa diretórios de build:

  # Baixar o código
  git clone https://github.com/autor/projeto.git
  cd projeto

  # Criar diretório de build (out-of-source)
  mkdir build && cd build

  # Configurar
  cmake ..
  # Com opções:
  cmake .. -DCMAKE_INSTALL_PREFIX=/usr/local
  cmake .. -DCMAKE_BUILD_TYPE=Release
  cmake .. -DBUILD_TESTS=ON

  # Compilar
  cmake --build . -j$(nproc)
  # Ou: make -j$(nproc)

  # Instalar
  sudo cmake --install .
  # Ou: sudo make install`}
        />

        <h2>5. Encontrar Dependências</h2>
        <CodeBlock
          title="Resolver dependências de compilação"
          code={`# Padrão no Ubuntu: pacotes -dev contêm os headers
  # Se o configure pede "libfoo", instale "libfoo-dev"
  sudo apt install -y libfoo-dev

  # Dependências comuns:
  sudo apt install -y \
    libssl-dev \
    libcurl4-openssl-dev \
    libxml2-dev \
    libsqlite3-dev \
    libjpeg-dev \
    libpng-dev \
    zlib1g-dev \
    libreadline-dev \
    libncurses5-dev \
    libffi-dev

  # Buscar pacote de desenvolvimento:
  apt search libssl | grep dev

  # Instalar dependências de um pacote do Ubuntu (para recompilar)
  sudo apt build-dep nome-do-pacote

  # Verificar quais pacotes fornecem um arquivo
  apt-file search "openssl/ssl.h"
  # Instalar apt-file se necessário:
  sudo apt install -y apt-file
  sudo apt-file update`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns ao compilar"
          code={`# "configure: error: C compiler cannot create executables"
  # Instalar build-essential:
  sudo apt install -y build-essential

  # "No package 'xxx' found" (pkg-config)
  # Instalar o pacote -dev:
  sudo apt install -y libxxx-dev

  # "fatal error: xxx.h: No such file or directory"
  # Encontrar qual pacote fornece o header:
  apt-file search xxx.h
  # Instalar o pacote -dev correspondente

  # make dá erro de compilação
  # Limpar e tentar novamente:
  make clean
  make -j1   # Compilar com 1 core (mais fácil ver o erro)

  # Conflito com software instalado via apt
  # Usar prefixo diferente:
  ./configure --prefix=/opt/software
  # Ou usar checkinstall para gerenciar como pacote

  # Remover software compilado manualmente
  # Se usou checkinstall: sudo apt remove nome
  # Se usou make install e tem make uninstall: sudo make uninstall
  # Se não tem uninstall: use o install_manifest.txt ou reinstale com checkinstall`}
        />

        <AlertBox type="info" title="Quando compilar vs usar apt/snap/flatpak">
          Prefira <strong>apt</strong> (estável, atualizado, testado). Use
          <strong>snap/flatpak</strong> se precisar de versão mais recente. Compile do fonte
          apenas se: precisa de uma versão muito específica, precisa de opções de compilação
          customizadas, ou o software não está empacotado.
        </AlertBox>
      </PageContainer>
    );
  }
import{j as a}from"./index-d-w5ROEn.js";import{P as i}from"./PageContainer-t8f2nTRw.js";import{C as e}from"./CodeBlock-D742nO-w.js";import{I as o}from"./InfoBox-CC8iv9sT.js";import"./house-BxulrXL6.js";import"./proxy-Ap2-YjtX.js";function l(){return a.jsxs(i,{title:"AppImage — Aplicativos Portáteis no Linux",subtitle:"Como usar, criar, gerenciar e integrar AppImages no Termux. Aplicativos em um único arquivo, sem instalação e sem dependências.",difficulty:"iniciante",timeToRead:"25 min",children:[a.jsxs("p",{children:["O ",a.jsx("strong",{children:"AppImage"})," é um formato de distribuição de software para Linux onde o aplicativo inteiro — binário, bibliotecas e recursos — vem em um ",a.jsx("em",{children:"único arquivo"}),". Não precisa instalar, não precisa de root, não precisa de gerenciador de pacotes. Basta baixar, dar permissão de execução e rodar."]}),a.jsx("h2",{children:"AppImage vs Snap vs Flatpak"}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"AppImage"})," — Um arquivo, sem instalação, sem sandbox. Portátil (roda de um pendrive). Sem atualizações automáticas por padrão. Ideal para: testar versões, apps portáteis, distribuição simples."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Snap"})," — Repositório centralizado (Snap Store), sandbox, atualizações automáticas. Pode ser mais lento na primeira abertura. Ideal para: apps do dia a dia, servidores."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Flatpak"})," — Repositório descentralizado (Flathub), sandbox, bom isolamento. Ideal para: apps desktop, gaming (Steam)."]})]}),a.jsx("h2",{children:"1. Usar um AppImage"}),a.jsx(e,{title:"Baixar e executar um AppImage",code:`# Passo 1: Baixar o AppImage (exemplo: Krita, editor de imagens)
  wget https://download.kde.org/stable/krita/5.2.2/krita-5.2.2-x86_64.appimage

  # Passo 2: Dar permissão de execução
  chmod +x krita-5.2.2-x86_64.appimage

  # Passo 3: Executar
  ./krita-5.2.2-x86_64.appimage

  # Pronto! O aplicativo abre sem instalar nada.

  # Executar com argumentos
  ./app.AppImage --help
  ./app.AppImage arquivo.txt

  # Verificar o conteúdo do AppImage (listar arquivos internos)
  ./app.AppImage --appimage-extract
  # Extrai todo o conteúdo para a pasta squashfs-root/

  # Montar o AppImage como diretório (sem extrair)
  ./app.AppImage --appimage-mount
  # Mostra o caminho de montagem temporária

  # Mover para uma pasta organizada
  mkdir -p ~/Applications
  mv krita-5.2.2-x86_64.appimage ~/Applications/
  # A convenção é usar ~/Applications/ para AppImages`}),a.jsxs(o,{type:"info",title:"FUSE necessário",children:["AppImages usam FUSE (Filesystem in Userspace) para montar o conteúdo. No Termux 0.118+, pode ser necessário instalar: ",a.jsx("code",{children:"pkg install -y libfuse2"}),". Sem isso, o AppImage pode dar erro ao executar."]}),a.jsx("h2",{children:"2. Integrar ao Sistema"}),a.jsx(e,{title:"Criar atalho no menu de aplicativos",code:`# Instalar a dependência FUSE (necessário no Termux 0.118+)
  pkg install -y libfuse2

  # Método 1: Criar um arquivo .desktop manualmente
  cat > ~/.local/share/applications/krita.desktop << 'EOF'
  [Desktop Entry]
  Name=Krita
  Exec=/home/seu_usuario/Applications/krita-5.2.2-x86_64.appimage
  Icon=krita
  Type=Application
  Categories=Graphics;2DGraphics;RasterGraphics;
  Comment=Editor de imagens profissional
  Terminal=false
  EOF

  # Método 2: Usar o AppImageLauncher (integração automática)
  sudo add-apt-repository ppa:appimagelauncher-team/stable
  pkg update
  pkg install -y appimagelauncher

  # Com o AppImageLauncher instalado:
  # - Ao abrir um AppImage pela primeira vez, ele pergunta se quer integrar
  # - Cria atalho no menu automaticamente
  # - Move o arquivo para ~/Applications/
  # - Permite desintegrar depois

  # Método 3: Usar o appimaged (daemon em background)
  # Monitora ~/Applications/ e cria atalhos automaticamente
  wget https://github.com/AppImage/appimaged/releases/download/continuous/appimaged-x86_64.AppImage
  chmod +x appimaged-x86_64.AppImage
  ./appimaged-x86_64.AppImage --install
  # Agora qualquer AppImage em ~/Applications/ terá atalho no menu`}),a.jsx("h2",{children:"3. Atualizar AppImages"}),a.jsx(e,{title:"Manter AppImages atualizados",code:`# Instalar o AppImageUpdate (atualização delta — só baixa o que mudou)
  wget https://github.com/AppImageCommunity/AppImageUpdate/releases/latest/download/AppImageUpdate-x86_64.AppImage
  chmod +x AppImageUpdate-x86_64.AppImage

  # Atualizar um AppImage
  ./AppImageUpdate-x86_64.AppImage krita-5.2.2-x86_64.appimage
  # Baixa apenas as diferenças (delta update), muito mais rápido

  # Verificar se há atualização disponível
  ./AppImageUpdate-x86_64.AppImage --check krita-5.2.2-x86_64.appimage

  # Usar o Gear Lever (gerenciador gráfico de AppImages)
  flatpak install flathub it.mijorus.gearlever
  # Interface gráfica para:
  # - Organizar AppImages
  # - Criar atalhos
  # - Verificar atualizações
  # - Gerenciar permissões`}),a.jsx("h2",{children:"4. Onde Encontrar AppImages"}),a.jsx(e,{title:"Repositórios de AppImages",code:`# AppImageHub — Catálogo centralizado
  # https://www.appimagehub.com/
  # Categorias: Audio, Video, Gráficos, Desenvolvimento, Jogos, etc.

  # Alguns AppImages populares:
  # - Krita (editor de imagens): krita.org
  # - LibreOffice: libreoffice.org
  # - Kdenlive (editor de vídeo): kdenlive.org
  # - Audacity (editor de áudio): audacityteam.org
  # - MuseScore (edição de partituras): musescore.org
  # - Subsurface (mergulho): subsurface-divelog.org
  # - Calibre (e-books): calibre-ebook.com
  # - FreeCAD: freecad.org
  # - Blender: blender.org

  # Verificar se um AppImage é confiável:
  # 1. Baixe sempre do site oficial do projeto
  # 2. Verifique a assinatura GPG se disponível
  # 3. Verifique o hash SHA256:
  sha256sum app.AppImage
  # Compare com o hash publicado no site oficial`}),a.jsx("h2",{children:"5. Criar seu Próprio AppImage"}),a.jsx(e,{title:"Empacotar uma aplicação como AppImage",code:`# Instalar ferramentas necessárias
  pkg install -y desktop-file-utils

  # Baixar o linuxdeploy (ferramenta de empacotamento)
  wget https://github.com/linuxdeploy/linuxdeploy/releases/latest/download/linuxdeploy-x86_64.AppImage
  chmod +x linuxdeploy-x86_64.AppImage

  # Estrutura básica necessária:
  # AppDir/
  # ├── usr/
  # │   ├── bin/meu-app          ← binário
  # │   ├── lib/                 ← bibliotecas
  # │   └── share/
  # │       ├── applications/
  # │       │   └── meu-app.desktop  ← arquivo desktop
  # │       └── icons/
  # │           └── hicolor/256x256/apps/
  # │               └── meu-app.png  ← ícone
  # └── AppRun                    ← script de entrada

  # Criar o AppImage com linuxdeploy
  ./linuxdeploy-x86_64.AppImage     --appdir AppDir     --executable /usr/bin/meu-app     --desktop-file AppDir/usr/share/applications/meu-app.desktop     --icon-file AppDir/usr/share/icons/hicolor/256x256/apps/meu-app.png     --output appimage

  # Para aplicações Python:
  # Use python-appimage ou pyinstaller + linuxdeploy
  pip install python-appimage
  python-appimage build app -p 3.12 meu-script.py`}),a.jsx("h2",{children:"Troubleshooting"}),a.jsx(e,{title:"Problemas comuns com AppImages",code:`# Erro: "dlopen(): error loading libfuse.so.2"
  # Solução: Instalar FUSE 2
  pkg install -y libfuse2

  # Erro: "Permission denied"
  # Solução: Dar permissão de execução
  chmod +x aplicativo.AppImage

  # Erro: "FATAL: kernel too old"
  # Causa: AppImage compilado para kernel mais novo
  # Solução: Atualizar o kernel ou baixar versão compatível

  # AppImage não abre, sem mensagem de erro
  # Rodar no terminal para ver os erros:
  ./aplicativo.AppImage
  # Se der erro de biblioteca:
  ldd --version  # Verificar versão do glibc

  # Ícone não aparece no menu
  # Solução: Recriar o cache de ícones
  gtk-update-icon-cache ~/.local/share/icons/hicolor/ 2>/dev/null
  update-desktop-database ~/.local/share/applications/

  # Sandbox: AppImage precisa de acesso a algo que está bloqueado
  # AppImages NÃO são sandboxed por padrão
  # Se quiser sandbox, use com firejail:
  pkg install -y firejail
  firejail ./aplicativo.AppImage

  # Extrair e rodar sem FUSE (alternativa)
  ./aplicativo.AppImage --appimage-extract
  ./squashfs-root/AppRun`}),a.jsxs(o,{type:"warning",title:"Segurança",children:["Diferente de Snaps e Flatpaks, AppImages ",a.jsx("strong",{children:"não"})," são isolados (sandbox) por padrão. Um AppImage malicioso tem acesso total ao seu sistema. Baixe apenas de fontes confiáveis e verifique checksums quando possível."]})]})}export{l as default};

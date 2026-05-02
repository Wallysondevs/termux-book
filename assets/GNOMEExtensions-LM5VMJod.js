import{j as e}from"./index-CbmJLKV7.js";import{P as o}from"./PageContainer-C07HsLrK.js";import{C as a}from"./CodeBlock-hEuZNnwQ.js";import{I as s}from"./InfoBox-OReRpdzk.js";import"./house-Cv6RfdLC.js";import"./proxy-BQXFYY1E.js";function d(){return e.jsxs(o,{title:"GNOME Extensions — Personalizar o Desktop",subtitle:"Guia completo de extensões do GNOME Shell no Termux: instalar, gerenciar, configurar e as melhores extensões para produtividade e visual.",difficulty:"iniciante",timeToRead:"25 min",children:[e.jsxs("p",{children:["As ",e.jsx("strong",{children:"extensões do GNOME Shell"})," permitem personalizar completamente o comportamento e a aparência do desktop Termux. Desde adicionar um dock (barra de aplicativos), até mudar o layout dos workspaces, adicionar um relógio mundial ou monitorar CPU/RAM — tudo é possível com extensões."]}),e.jsx("h2",{children:"1. Instalar o Suporte a Extensões"}),e.jsx(a,{title:"Preparar o sistema para extensões",code:`# Instalar o GNOME Shell Extensions e a ferramenta de gerenciamento
  pkg install -y gnome-shell-extensions gnome-shell-extension-manager

  # Instalar o GNOME Tweaks (configurações avançadas do GNOME)
  pkg install -y gnome-tweaks

  # Verificar a versão do GNOME Shell (extensões são específicas por versão)
  gnome-shell --version
  # Saída: GNOME Shell 46.0

  # Método 1: Extension Manager (GUI — RECOMENDADO)
  # Abra o "Extension Manager" no menu de aplicativos
  # Permite: buscar, instalar, atualizar e configurar extensões

  # Método 2: Site extensions.gnome.org
  # 1. Instale o conector do navegador:
  pkg install -y gnome-browser-connector
  # 2. Instale a extensão do navegador:
  #    Firefox: GNOME Shell Integration
  #    Chrome: GNOME Shell Integration
  # 3. Acesse: https://extensions.gnome.org
  # 4. Clique no toggle ON/OFF para instalar

  # Método 3: Via terminal
  # Listar extensões instaladas
  gnome-extensions list

  # Habilitar uma extensão
  gnome-extensions enable nome-da-extensao@autor

  # Desabilitar uma extensão
  gnome-extensions disable nome-da-extensao@autor

  # Ver informações de uma extensão
  gnome-extensions info nome-da-extensao@autor`}),e.jsx("h2",{children:"2. Extensões Essenciais"}),e.jsx(a,{title:"As melhores extensões para Termux",code:`# === PRODUTIVIDADE ===

  # Dash to Dock — Dock permanente (como macOS)
  # Transforma o dash do GNOME em um dock sempre visível
  # Configurações: posição, tamanho, auto-hide, transparência
  # ID: dash-to-dock@micxgx.gmail.com

  # Dash to Panel — Barra de tarefas (como Windows)
  # Combina a barra superior com o dash em uma barra de tarefas
  # ID: dash-to-panel@jderose9.github.com

  # AppIndicator — Ícones da bandeja do sistema
  # Mostra ícones de aplicativos como Dropbox, Steam, Discord na barra
  # ESSENCIAL — muitos apps precisam disso
  # ID: appindicatorsupport@rgcjonas.gmail.com

  # Clipboard Indicator — Histórico de área de transferência
  # Mantém histórico de textos copiados (Ctrl+C)
  # ID: clipboard-indicator@tudmotu.com

  # GSConnect — Integração com celular Android
  # Conecta seu celular Android ao Termux (via KDE Connect)
  # Transferir arquivos, notificações, SMS, controle remoto
  # ID: gsconnect@andyholmes.github.io

  # === VISUAL ===

  # Blur my Shell — Efeito de desfoque elegante
  # Adiciona blur na barra superior, overview e lockscreen
  # ID: blur-my-shell@aunetx

  # User Themes — Temas personalizados
  # Permite instalar e usar temas do GNOME Shell personalizados
  # ID: user-theme@gnome-shell-extensions.gcampax.github.com

  # Just Perfection — Customização total do GNOME
  # Esconder/mostrar elementos, mudar animações, ajustar comportamentos
  # O "canivete suíço" da personalização GNOME
  # ID: just-perfection-desktop@just-perfection

  # === SISTEMA ===

  # Vitals — Monitor de sistema na barra
  # Mostra CPU, RAM, temperatura, rede, disco na barra superior
  # ID: Vitals@CoreCoding.com

  # Caffeine — Impedir suspensão
  # Um clique para impedir que a tela desligue (útil para apresentações)
  # ID: caffeine@pataber.com

  # Night Theme Switcher — Troca automática claro/escuro
  # Alterna entre tema claro e escuro baseado no horário
  # ID: nightthemeswitcher@romainvigier.fr`}),e.jsx("h2",{children:"3. Instalar Extensões Manualmente"}),e.jsx(a,{title:"Instalar extensões via terminal",code:`# Baixar uma extensão do extensions.gnome.org
  # 1. Acesse a página da extensão
  # 2. Copie o UUID (ex: dash-to-dock@micxgx.gmail.com)
  # 3. Baixe o .zip correspondente à sua versão do GNOME

  # Instalar a extensão manualmente
  gnome-extensions install extensao.zip
  # Reiniciar o GNOME Shell:
  # Wayland: Faça logout e login
  # X11: Alt+F2, digite "r", Enter

  # Instalar do repositório Git (para desenvolvedores)
  cd ~/.local/share/gnome-shell/extensions/
  git clone https://github.com/autor/extensao.git nome-da-extensao@autor

  # Diretório onde extensões ficam instaladas:
  ls ~/.local/share/gnome-shell/extensions/
  # Extensões do sistema (para todos os usuários):
  ls /usr/share/gnome-shell/extensions/

  # Remover uma extensão
  gnome-extensions uninstall nome-da-extensao@autor

  # Resetar todas as extensões (desabilitar tudo)
  gsettings set org.gnome.shell enabled-extensions "[]"
  # Ou desabilitar todas de uma vez:
  gnome-extensions list | while read ext; do
    gnome-extensions disable "$ext" 2>/dev/null
  done`}),e.jsx("h2",{children:"4. Configurar Temas do GNOME"}),e.jsx(a,{title:"Instalar e aplicar temas",code:`# Instalar temas populares
  pkg install -y gnome-themes-extra   # Temas extras do GNOME
  pkg install -y papirus-icon-theme   # Ícones Papirus (os mais populares)
  pkg install -y arc-theme            # Tema Arc (limpo e moderno)

  # Instalar temas manualmente
  # 1. Baixe o tema de gnome-look.org
  # 2. Extraia para:
  mkdir -p ~/.themes      # Temas GTK e GNOME Shell
  mkdir -p ~/.icons       # Temas de ícones e cursores

  # Aplicar temas via GNOME Tweaks
  # Abra Tweaks → Aparência → Temas

  # Aplicar temas via terminal (gsettings)
  # Tema GTK (janelas, botões)
  gsettings set org.gnome.desktop.interface gtk-theme 'Arc-Dark'

  # Tema de ícones
  gsettings set org.gnome.desktop.interface icon-theme 'Papirus-Dark'

  # Tema de cursor
  gsettings set org.gnome.desktop.interface cursor-theme 'Adwaita'

  # Tema do GNOME Shell (precisa da extensão User Themes)
  gsettings set org.gnome.shell.extensions.user-theme name 'Arc-Dark'

  # Alterar o papel de parede
  gsettings set org.gnome.desktop.background picture-uri 'file:///caminho/imagem.jpg'
  gsettings set org.gnome.desktop.background picture-uri-dark 'file:///caminho/imagem-dark.jpg'

  # Ver tema atual
  gsettings get org.gnome.desktop.interface gtk-theme
  gsettings get org.gnome.desktop.interface icon-theme

  # Resetar para o tema padrão
  gsettings reset org.gnome.desktop.interface gtk-theme`}),e.jsx("h2",{children:"5. GNOME Tweaks — Configurações Avançadas"}),e.jsx(a,{title:"Personalizar com GNOME Tweaks e dconf",code:`# Abrir o GNOME Tweaks
  gnome-tweaks

  # Configurações úteis via terminal (dconf/gsettings):

  # Mostrar botões minimizar e maximizar nas janelas
  gsettings set org.gnome.desktop.wm.preferences button-layout ':minimize,maximize,close'
  # Botões à esquerda (estilo macOS):
  gsettings set org.gnome.desktop.wm.preferences button-layout 'close,minimize,maximize:'

  # Mostrar porcentagem da bateria
  gsettings set org.gnome.desktop.interface show-battery-percentage true

  # Relógio com segundos
  gsettings set org.gnome.desktop.interface clock-show-seconds true

  # Mostrar dia da semana no relógio
  gsettings set org.gnome.desktop.interface clock-show-weekday true

  # Desabilitar animações (para PCs lentos)
  gsettings set org.gnome.desktop.interface enable-animations false

  # Centralizar novas janelas
  gsettings set org.gnome.mutter center-new-windows true

  # Hot corner (canto superior esquerdo ativa o overview)
  gsettings set org.gnome.desktop.interface enable-hot-corners false

  # Número de workspaces fixo
  gsettings set org.gnome.mutter dynamic-workspaces false
  gsettings set org.gnome.desktop.wm.preferences num-workspaces 4

  # Usar dconf-editor para explorar TODAS as configurações
  pkg install -y dconf-editor
  dconf-editor`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(a,{title:"Problemas comuns com extensões",code:`# Extensão não aparece ou não funciona
  # 1. Verificar compatibilidade com a versão do GNOME:
  gnome-shell --version
  # 2. Reiniciar o GNOME Shell:
  # X11: Alt+F2 → r → Enter
  # Wayland: Logout e login

  # Tela preta ou travamento após instalar extensão
  # 1. Acesse o TTY: Ctrl+Alt+F3
  # 2. Desabilite a extensão problemática:
  gnome-extensions disable nome-da-extensao@autor
  # 3. Volte para a interface: Ctrl+Alt+F2 (ou F1)

  # Desabilitar TODAS as extensões (modo seguro)
  gsettings set org.gnome.shell disable-user-extensions true
  # Para reabilitar:
  gsettings set org.gnome.shell disable-user-extensions false

  # Extensões não aparecem no Extension Manager
  # Solução: Reinstalar o conector
  pkg install --reinstall gnome-browser-connector

  # Resetar o GNOME para as configurações padrão
  dconf reset -f /org/gnome/

  # Ver logs de erros do GNOME Shell (útil para debug)
  journalctl -f -o cat /usr/bin/gnome-shell
  # Ou ver no Looking Glass: Alt+F2 → lg → Enter`}),e.jsx(s,{type:"warning",title:"Extensões e atualizações do Termux",children:"Ao atualizar o Termux para uma nova versão (ex: 22.04 → 24.04), algumas extensões podem parar de funcionar porque a versão do GNOME Shell muda. Sempre verifique a compatibilidade das suas extensões após uma atualização major do sistema."})]})}export{d as default};

import{j as e}from"./index-DllpmZ7S.js";import{P as o}from"./PageContainer-D5o1LrsX.js";import{C as s}from"./CodeBlock-BCO78Zke.js";import{I as a}from"./InfoBox-StGQOtUJ.js";import"./house-CLqZi7qQ.js";import"./proxy-Xil2K0n2.js";function c(){return e.jsxs(o,{title:"GNOME & Desktop Ubuntu",subtitle:"Configurando, personalizando e dominando o GNOME — o ambiente gráfico padrão do Ubuntu.",difficulty:"iniciante",timeToRead:"20 min",children:[e.jsxs("p",{children:["O Ubuntu usa o ",e.jsx("strong",{children:"GNOME"})," como ambiente gráfico padrão desde o Ubuntu 17.10. O GNOME (GNU Network Object Model Environment) é um dos ambientes de desktop mais modernos e polidos do Linux, com design limpo e foco em simplicidade. O Ubuntu customiza levemente o GNOME vanilla com sua própria estética laranja/roxa."]}),e.jsx("h2",{children:"GNOME: Conceitos Básicos"}),e.jsx("h3",{children:"Activities Overview"}),e.jsxs("p",{children:["Pressione a tecla ",e.jsx("strong",{children:"Super"}),' (tecla Windows) ou clique em "Activities" no canto superior esquerdo para abrir o Overview. Aqui você pode:']}),e.jsxs("ul",{children:[e.jsx("li",{children:"Ver todas as janelas abertas"}),e.jsx("li",{children:"Pesquisar aplicativos digitando diretamente"}),e.jsx("li",{children:"Navegar entre workspaces (áreas de trabalho)"}),e.jsx("li",{children:"Pesquisar arquivos, configurações e até fazer cálculos"})]}),e.jsx("h3",{children:"Atalhos de Teclado Essenciais"}),e.jsx(s,{title:"Atalhos do GNOME mais usados",code:`Super                  # Abrir Activities Overview
Super + A              # Ver todos os aplicativos (App Grid)
Super + H              # Minimizar janela atual
Super + D              # Mostrar área de trabalho
Super + F              # Colocar janela em tela cheia
Super + ←/→            # Encaixar janela à esquerda/direita (tile)
Super + ↑/↓            # Maximizar / Restaurar janela
Super + Shift + ←/→    # Mover janela para workspace anterior/próximo
Super + número         # Mudar para workspace específico
Alt + F4               # Fechar janela
Alt + Tab              # Alternar entre aplicativos abertos
Alt + \`               # Alternar entre janelas do mesmo app
Ctrl + Alt + T         # Abrir Terminal (no Ubuntu)
Ctrl + Alt + Del       # Menu de logout/reiniciar/desligar`}),e.jsx("h2",{children:"Configurações do Sistema"}),e.jsxs("p",{children:["O aplicativo ",e.jsx("strong",{children:"Configurações"}),' (Settings) é o painel de controle do Ubuntu. Acesse por: Activities → "Configurações" ou clique no menu do canto superior direito → ícone de chave.']}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Aparência"}),": Tema claro/escuro, cor de destaque, tamanho de ícones"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Monitores"}),": Resolução, taxa de atualização, múltiplos monitores"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Teclado"}),": Atalhos, layout de teclado, idioma de entrada"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Privacidade"}),": Histórico de arquivos, rastreamento, câmera, microfone"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Energia"}),": Suspensão, brilho, bateria (notebooks)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Usuários"}),": Gerenciar contas de usuário"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sobre"}),": Informações do sistema, versão do Ubuntu, número de série do hardware"]})]}),e.jsx("h2",{children:"GNOME Tweaks: Personalizações Avançadas"}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"GNOME Tweaks"})," (anteriormente chamado de GNOME Tweak Tool) expõe configurações avançadas que não estão no painel de Configurações padrão."]}),e.jsx(s,{title:"Instalar GNOME Tweaks",code:`sudo apt install gnome-tweaks

# Abrir via Activities → "Tweaks" ou:
gnome-tweaks`}),e.jsx("p",{children:"O que você pode fazer com GNOME Tweaks:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Fontes"}),": Mudar fonte do sistema, tamanho, renderização"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Extensões"}),": Ativar/desativar extensões do GNOME"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Janelas"}),": Comportamento de maximização, botões da barra de título"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Área de trabalho"}),": Mostrar ícones na área de trabalho, lixeira"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Barra superior"}),": Mostrar dia da semana, segundos no relógio"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Inicialização"}),": Gerenciar aplicativos que iniciam com o sistema"]})]}),e.jsx("h2",{children:"Extensões do GNOME"}),e.jsx("p",{children:"As extensões do GNOME são pequenos complementos que adicionam funcionalidades ao shell. Você pode gerenciá-las pelo site oficial ou pela linha de comando."}),e.jsx(s,{title:"Gerenciar extensões",code:`# Instalar o gerenciador de extensões via GUI
sudo apt install gnome-shell-extensions
sudo apt install gnome-shell-extension-manager

# Ou instalar via snap:
sudo snap install extension-manager

# Extensões populares (instale pelo Extension Manager ou extensions.gnome.org):
# - Dash to Dock: Barra de tarefas fixa como no Windows/macOS
# - Blur my Shell: Efeito de desfoque na barra superior e Dash
# - GSConnect: Integração com smartphone (compartilhar arquivos, notificações)
# - Caffeine: Impede a tela de desligar quando você precisa (ex: vídeos)
# - Grand Theft Focus: Corrige janelas que aparecem em segundo plano
# - AppIndicator: Suporte a ícones de bandeja do sistema

# Listar extensões instaladas via linha de comando:
gnome-extensions list

# Habilitar/desabilitar extensão:
gnome-extensions enable nome-da-extensao@autor
gnome-extensions disable nome-da-extensao@autor`}),e.jsxs(a,{type:"info",title:"Site de extensões GNOME",children:["Visite ",e.jsx("code",{children:"extensions.gnome.org"}),' para descobrir, instalar e gerenciar extensões diretamente pelo navegador. Você precisa instalar a extensão do navegador "GNOME Shell integration" e ter o ',e.jsx("code",{children:"chrome-gnome-shell"})," instalado no sistema."]}),e.jsx("h2",{children:"Temas Visuais"}),e.jsx(s,{title:"Mudar tema GTK e ícones",code:`# Instalar coleção de temas populares
sudo apt install gnome-themes-extra
sudo apt install papirus-icon-theme
sudo apt install arc-theme

# Aplicar tema via GNOME Tweaks → Aparência
# Ou via linha de comando com gsettings:

# Mudar tema GTK
gsettings set org.gnome.desktop.interface gtk-theme 'Arc-Dark'

# Mudar tema de ícones
gsettings set org.gnome.desktop.interface icon-theme 'Papirus-Dark'

# Mudar cursor
gsettings set org.gnome.desktop.interface cursor-theme 'DMZ-White'

# Mudar fonte do sistema
gsettings set org.gnome.desktop.interface font-name 'Ubuntu 11'
gsettings set org.gnome.desktop.interface monospace-font-name 'Ubuntu Mono 13'

# Ativar tema escuro (Ubuntu 22.04+)
gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'

# Voltar para tema claro
gsettings set org.gnome.desktop.interface color-scheme 'prefer-light'`}),e.jsx("h2",{children:"Workspaces (Áreas de Trabalho)"}),e.jsx(s,{title:"Configurar workspaces",code:`# Ver configuração atual de workspaces
gsettings get org.gnome.mutter dynamic-workspaces
# true = workspaces dinâmicos (criados automaticamente)
# false = número fixo de workspaces

# Fixar número de workspaces (ex: 4)
gsettings set org.gnome.mutter dynamic-workspaces false
gsettings set org.gnome.desktop.wm.preferences num-workspaces 4

# No GNOME Tweaks → Workspaces:
# - Static Workspaces: número fixo
# - Dynamic Workspaces: criados/removidos automaticamente

# Atalhos para workspaces:
# Super + número      → Ir para workspace N
# Super + Shift + número → Mover janela para workspace N
# Ctrl + Alt + ←/→   → Navegar entre workspaces (alternativo)`}),e.jsx("h2",{children:"Aplicativos Padrão do Ubuntu"}),e.jsx("p",{children:"O Ubuntu 24.04 LTS vem com os seguintes aplicativos pré-instalados:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Firefox"}),": Navegador web"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"LibreOffice"}),": Suite de escritório (Writer, Calc, Impress)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Thunderbird"}),": Cliente de e-mail"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Nautilus"}),": Gerenciador de arquivos (Files)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"GNOME Calendar"}),": Calendário"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"GNOME Photos"}),": Gerenciador de fotos"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Rhythmbox"}),": Player de música"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Shotwell"}),": Edição básica de fotos"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"GNOME Software"}),": Loja de aplicativos gráfica"]})]}),e.jsx("h2",{children:"Múltiplos Monitores"}),e.jsx(s,{title:"Configurar múltiplos monitores",code:`# Via interface gráfica:
# Configurações → Monitores

# Via linha de comando (xrandr - para sessões X11):
# Ver monitores disponíveis:
xrandr

# Exemplo de saída:
# Screen 0: minimum 8x8, current 3840x1080
# HDMI-1 connected 1920x1080+0+0
# DP-1 connected 1920x1080+1920+0

# Configurar resolução de um monitor:
xrandr --output HDMI-1 --mode 1920x1080 --rate 60

# Monitor secundário à direita do principal:
xrandr --output HDMI-1 --primary --output DP-1 --right-of HDMI-1

# Espelhar monitores:
xrandr --output DP-1 --same-as HDMI-1

# Para sessões Wayland (Ubuntu 22.04+), use o painel de Configurações
# pois o xrandr tem suporte limitado no Wayland`}),e.jsxs(a,{type:"warning",title:"X11 vs Wayland",children:["O Ubuntu 22.04+ usa ",e.jsx("strong",{children:"Wayland"}),' como sessão padrão, o que melhora segurança e suporte a displays de alta resolução. Alguns aplicativos mais antigos podem não funcionar perfeitamente no Wayland. Se precisar, você pode voltar ao X11 na tela de login: clique no ícone de engrenagem antes de fazer login e selecione "Ubuntu em Xorg".']}),e.jsx("h2",{children:"Desempenho e Recursos"}),e.jsx(s,{title:"Verificar uso de recursos do sistema gráfico",code:`# Ver uso de memória geral
free -h

# Ver processos do GNOME Shell
ps aux | grep gnome-shell

# Reiniciar o GNOME Shell sem fechar aplicativos (apenas X11):
# Alt + F2 → digitar "r" → Enter

# No Wayland, não é possível reiniciar o Shell sem sair da sessão.
# Faça logout e login novamente.

# Ver uso de GPU (se tiver NVIDIA):
nvidia-smi

# Para AMD e Intel:
sudo apt install intel-gpu-tools
sudo intel_gpu_top`})]})}export{c as default};

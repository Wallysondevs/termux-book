import{j as a}from"./index-DllpmZ7S.js";import{P as o}from"./PageContainer-D5o1LrsX.js";import{C as s}from"./CodeBlock-BCO78Zke.js";import{I as e}from"./InfoBox-StGQOtUJ.js";import"./house-CLqZi7qQ.js";import"./proxy-Xil2K0n2.js";function d(){return a.jsxs(o,{title:"Snap & Flatpak",subtitle:"Instalando aplicativos via Snap Store e Flathub — entenda os formatos universais de pacotes e suas diferenças.",difficulty:"iniciante",timeToRead:"15 min",children:[a.jsxs("p",{children:["Além do APT (para pacotes .deb), o Ubuntu suporta dois formatos modernos de distribuição de aplicativos: ",a.jsx("strong",{children:"Snap"})," (criado pela Canonical) e ",a.jsx("strong",{children:"Flatpak"}),"(criado pelo projeto freedesktop.org). Ambos instalam aplicativos de forma isolada do sistema, com todas as dependências embutidas."]}),a.jsx("h2",{children:"Snap: O Formato da Canonical"}),a.jsx("p",{children:"Snaps são pacotes que incluem o aplicativo e todas as suas dependências. São atualizados automaticamente e funcionam em qualquer distribuição Linux que tenha o snapd instalado."}),a.jsx("h3",{children:"Comandos Essenciais do Snap"}),a.jsx(s,{title:"Gerenciando snaps",code:`# Buscar um snap
snap find firefox
snap find spotify

# Instalar um snap
sudo snap install spotify
sudo snap install code --classic
sudo snap install discord

# A flag --classic dá acesso irrestrito ao sistema de arquivos
# (necessário para IDEs, editores e ferramentas de desenvolvimento)

# Ver snaps instalados
snap list

# Informações sobre um snap
snap info spotify

# Atualizar todos os snaps
sudo snap refresh

# Atualizar um snap específico
sudo snap refresh spotify

# Remover um snap
sudo snap remove spotify

# Reverter para a versão anterior de um snap
sudo snap revert spotify

# Ver histórico de atualizações
snap changes`}),a.jsx("h3",{children:"Snaps Populares"}),a.jsx(s,{title:"Snaps mais usados",code:`# Ferramentas de desenvolvimento
sudo snap install code --classic          # VS Code
sudo snap install intellij-idea-community --classic
sudo snap install pycharm-community --classic
sudo snap install android-studio --classic
sudo snap install sublime-text --classic
sudo snap install postman

# Navegadores
sudo snap install chromium
sudo snap install brave
sudo snap install opera

# Comunicação
sudo snap install discord
sudo snap install slack --classic
sudo snap install telegram-desktop
sudo snap install zoom-client

# Multimídia
sudo snap install vlc
sudo snap install spotify
sudo snap install obs-studio

# Produtividade
sudo snap install notion-snap-reborn
sudo snap install obsidian --classic`}),a.jsxs(e,{type:"warning",title:"Snaps e performance de inicialização",children:["Snaps podem demorar mais para abrir na primeira vez depois do boot do sistema porque precisam ser montados. O Firefox no Ubuntu 22.04+ é um snap por padrão, o que pode causar demora inicial. Se isso incomodar, você pode instalar a versão .deb:",a.jsx("code",{children:"sudo snap remove firefox"})," e depois instalar pelo repositório da Mozilla."]}),a.jsx("h3",{children:"Gerenciando Canais de Atualização"}),a.jsx(s,{title:"Canais (channels) do Snap",code:`# Cada snap tem canais: stable, candidate, beta, edge
# stable = versão estável (padrão)
# candidate = próxima versão estável, para testes
# beta = funcionalidades novas, pode ter bugs
# edge = build mais recente do código fonte, instável

# Instalar em canal específico
sudo snap install brave --channel=beta

# Mudar o canal de um snap instalado
sudo snap switch spotify --channel=beta
sudo snap refresh spotify

# Ver qual canal está sendo usado
snap info spotify | grep tracking`}),a.jsx("h2",{children:"Flatpak: O Formato Universal"}),a.jsx("p",{children:"Flatpak é o padrão da comunidade Linux (apoiado por Red Hat, Fedora, GNOME). O Flathub é o repositório central e maior loja de aplicativos para Flatpak."}),a.jsx("h3",{children:"Instalando o Flatpak"}),a.jsx(s,{title:"Configurar Flatpak e Flathub",code:`# Instalar o Flatpak
sudo apt install flatpak

# Instalar o plugin do GNOME Software (para integração com a Loja de Apps)
sudo apt install gnome-software-plugin-flatpak

# Adicionar o repositório Flathub (principal fonte de Flatpaks)
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

# IMPORTANTE: Após adicionar o Flathub, reinicie o sistema
# para que os aplicativos apareçam no GNOME Software`}),a.jsx("h3",{children:"Comandos Flatpak"}),a.jsx(s,{title:"Gerenciando flatpaks",code:`# Buscar aplicativo no Flathub
flatpak search firefox

# Instalar aplicativo do Flathub
flatpak install flathub org.mozilla.firefox
flatpak install flathub com.spotify.Client
flatpak install flathub com.discordapp.Discord
flatpak install flathub org.videolan.VLC

# Você pode confirmar com "y" ou aceitar automaticamente com -y:
flatpak install -y flathub com.spotify.Client

# Listar flatpaks instalados
flatpak list

# Executar um flatpak
flatpak run com.spotify.Client

# Atualizar todos os flatpaks
flatpak update

# Atualizar um flatpak específico
flatpak update com.spotify.Client

# Remover um flatpak
flatpak uninstall com.spotify.Client

# Remover flatpaks não utilizados (runtimes órfãos)
flatpak uninstall --unused

# Informações de um flatpak instalado
flatpak info com.spotify.Client`}),a.jsx("h3",{children:"Flatpak e Permissões"}),a.jsx(s,{title:"Gerenciar permissões de flatpaks",code:`# Instalar Flatseal para gerenciar permissões graficamente
flatpak install flathub com.github.tchx84.Flatseal

# Ver permissões de um aplicativo
flatpak info --show-permissions com.spotify.Client

# Dar permissão para acessar um diretório específico
flatpak override --user --filesystem=/home/joao/Musicas com.spotify.Client

# Remover permissão de acesso à câmera
flatpak override --user --nodevice=all com.discordapp.Discord

# Resetar todas as permissões de um app para o padrão
flatpak override --user --reset com.spotify.Client`}),a.jsx("h2",{children:"Snap vs Flatpak vs APT: Quando Usar Cada Um?"}),a.jsx(e,{type:"info",title:"Guia prático de escolha",children:a.jsxs("ul",{className:"mt-1 mb-0",children:[a.jsxs("li",{children:[a.jsx("strong",{children:"APT (.deb)"}),": Para ferramentas do sistema, bibliotecas, servidores e aplicativos que precisam de integração profunda com o sistema. Mais rápido, mais confiável, sem overhead de isolamento."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Snap"}),": Para aplicativos proprietários como Spotify, Discord, e para ferramentas de desenvolvimento (VS Code, JetBrains IDEs). Vantagem: atualização automática."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Flatpak"}),": Para aplicativos de terceiros onde você quer controle fino de permissões. Flathub tem uma curadoria rigorosa. Preferido pela comunidade Linux em geral."]})]})}),a.jsx("h2",{children:"GNOME Software: A Loja de Aplicativos"}),a.jsxs("p",{children:["O ",a.jsx("strong",{children:"GNOME Software"})," é a loja de aplicativos gráfica do Ubuntu. Com Flatpak e Snap configurados, ele exibe todos os tipos de pacotes em uma interface unificada. Você pode buscar, instalar, atualizar e remover aplicativos clicando — sem precisar de linha de comando."]}),a.jsx(s,{title:"Abrir a loja de aplicativos",code:`# Via Activities → "Centro de Programas" ou "Software"
# Ou via terminal:
gnome-software

# Para forçar atualização de todos os apps instalados (snap + flatpak + apt):
gnome-software --mode=updates`}),a.jsx("h2",{children:"Desinstalação Completa"}),a.jsx(s,{title:"Remover snap e flatpak limpos",code:`# Remover snap com dados do usuário também:
sudo snap remove --purge spotify

# Remover flatpak com dados do usuário:
flatpak uninstall com.spotify.Client
rm -rf ~/.var/app/com.spotify.Client  # Dados do usuário

# Limpar runtimes Flatpak não usados:
flatpak uninstall --unused`})]})}export{d as default};

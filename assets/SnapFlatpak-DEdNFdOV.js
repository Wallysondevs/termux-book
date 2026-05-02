import{j as e}from"./index-C2xKMDcs.js";import{P as a}from"./PageContainer-D8Fa3g_u.js";import{C as o}from"./CodeBlock-OPQVSQze.js";import{I as r}from"./InfoBox-xGrDgu5s.js";import"./house-Bt-S4rq8.js";import"./proxy-Brrn8MfJ.js";function m(){return e.jsxs(a,{title:"Termux:API & Apps Companion",subtitle:"Conheça os apps complementares do Termux (Termux:API, Termux:Boot, Termux:Widget, Termux:X11, Termux:Tasker, Termux:Float, Termux:Styling) e as ferramentas CLI termux-*.",difficulty:"iniciante",timeToRead:"20 min",children:[e.jsxs(r,{type:"info",title:"Snap e Flatpak não existem no Termux",children:["Snap e Flatpak são formatos de pacote para Linux desktop e ",e.jsx("strong",{children:"não rodam no Android"}),". No Termux, as funcionalidades extras vêm como ",e.jsx("strong",{children:"apps Android separados"})," instalados do ",e.jsx("strong",{children:"F-Droid"})," (loja de apps livres) — eles se comunicam com o Termux via intents."]}),e.jsxs("p",{children:["O Termux principal é só o emulador de terminal. Para acessar recursos do Android (câmera, GPS, SMS, sensores, notificações) e estender as funcionalidades, existem vários",e.jsx("strong",{children:" apps companion"})," publicados pela mesma equipe. Todos seguem o mesmo padrão: instale o app pelo F-Droid e use o pacote ",e.jsx("code",{children:"pkg install termux-api"})," (ou similar) no Termux para liberar os comandos CLI."]}),e.jsx("h2",{children:"Por que F-Droid e não Google Play?"}),e.jsxs(r,{type:"warning",title:"Não use a versão da Play Store",children:["As versões publicadas na Play Store estão ",e.jsx("strong",{children:"desatualizadas e descontinuadas"})," desde 2020 (a Google mudou a política de ",e.jsx("code",{children:"targetSdk"})," e quebrou o Termux). Sempre instale do ",e.jsx("a",{href:"https://f-droid.org",children:"F-Droid"})," ou do GitHub Releases oficial. Misturar versões do Play e do F-Droid causa erros de assinatura."]}),e.jsx("h2",{children:"1. Termux:API — Acesso a recursos do Android"}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"Termux:API"})," expõe câmera, áudio, sensores, notificações, contatos, SMS, clipboard e mais via comandos ",e.jsx("code",{children:"termux-*"})," no shell."]}),e.jsx(o,{title:"Instalar e usar Termux:API",code:`# 1. Instale o app "Termux:API" pelo F-Droid
# 2. No Termux, instale o pacote CLI:
pkg install termux-api

# Tirar foto pela câmera traseira
termux-camera-photo -c 0 ~/foto.jpg

# Listar câmeras disponíveis
termux-camera-info

# Ler localização GPS atual
termux-location -p gps

# Mostrar notificação no Android
termux-notification --title "Backup" --content "Concluído com sucesso"

# Ler/escrever na área de transferência do Android
echo "texto copiado" | termux-clipboard-set
termux-clipboard-get

# Vibrar o celular
termux-vibrate -d 500

# Bateria
termux-battery-status

# Falar texto (TTS)
termux-tts-speak "Olá mundo"

# Tirar print da tela / capturar áudio
termux-microphone-record -f /sdcard/audio.m4a -l 10

# Enviar SMS
termux-sms-send -n "+5511999999999" "Mensagem de teste"

# Ler SMS recebidos
termux-sms-list -l 5`}),e.jsx("h2",{children:"2. Termux:Boot — Rodar scripts ao ligar o celular"}),e.jsxs("p",{children:["Permite executar scripts automaticamente quando o Android termina de bootar. Útil para iniciar ",e.jsx("code",{children:"sshd"}),", túneis SSH, sincronizações ou qualquer daemon."]}),e.jsx(o,{title:"Configurar Termux:Boot",code:`# 1. Instale "Termux:Boot" pelo F-Droid
# 2. Abra o app uma vez (essencial para o Android registrar a permissão)
# 3. Crie a pasta de scripts:
mkdir -p ~/.termux/boot

# 4. Crie um script (precisa ser executável)
cat > ~/.termux/boot/start-sshd <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock
sshd
EOF

chmod +x ~/.termux/boot/start-sshd

# Reinicie o celular para testar`}),e.jsx("h2",{children:"3. Termux:Widget — Atalhos na tela inicial"}),e.jsx("p",{children:"Coloca um widget na home do Android para executar scripts com um toque."}),e.jsx(o,{title:"Criar atalhos com Termux:Widget",code:`# 1. Instale "Termux:Widget" pelo F-Droid
# 2. Crie a pasta de scripts:
mkdir -p ~/.shortcuts

# 3. Adicione um script
cat > ~/.shortcuts/atualizar <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
pkg update -y && pkg upgrade -y
EOF

chmod +x ~/.shortcuts/atualizar

# 4. Na tela inicial do Android: adicionar widget → "Termux:Widget"
# Os scripts em ~/.shortcuts aparecem como atalhos clicáveis`}),e.jsx("h2",{children:"4. Termux:X11 — Servidor gráfico no Android"}),e.jsx("p",{children:"App companion que roda um servidor X11 no Android, permitindo usar XFCE, i3, openbox e aplicativos GUI Linux dentro do Termux."}),e.jsx(o,{title:"Configurar Termux:X11 com XFCE",code:`# 1. Instale "Termux:X11" pelo F-Droid
# 2. No Termux, ative o repositório x11 e instale o servidor + ambiente:
pkg install x11-repo
pkg install termux-x11-nightly xfce4 dbus

# 3. Inicie o servidor X (em segundo plano)
termux-x11 :0 &

# 4. Em outra sessão Termux, exporte o display e inicie o XFCE
export DISPLAY=:0
dbus-launch --exit-with-session xfce4-session &

# 5. Abra o app Termux:X11 — você verá o desktop`}),e.jsx("h2",{children:"5. Termux:Tasker — Integração com automação Android"}),e.jsx("p",{children:"Plugin para o app Tasker (automação de Android). Permite que o Tasker execute scripts do Termux como parte de uma rotina."}),e.jsx(o,{title:"Termux:Tasker",code:`# 1. Instale "Termux:Tasker" pelo F-Droid
# 2. Crie a pasta de tarefas:
mkdir -p ~/.termux/tasker

# 3. Coloque o script
cat > ~/.termux/tasker/notificar.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
termux-notification --title "Tasker" --content "$1"
EOF
chmod +x ~/.termux/tasker/notificar.sh

# 4. No Tasker, adicione ação: Plugin → Termux:Tasker
#    e selecione o script. Argumentos vão para $1, $2, ...`}),e.jsx("h2",{children:"6. Termux:Float — Janela flutuante"}),e.jsx("p",{children:"Roda o Termux numa janela flutuante sobre os outros apps do Android. Útil para anotações rápidas ou monitoramento."}),e.jsx(o,{title:"Termux:Float",code:`# 1. Instale "Termux:Float" pelo F-Droid
# 2. Conceda permissão "exibir sobre outros apps" nas configs do Android
# 3. Abra o app — uma janelinha do Termux aparece, arrastável
#    Comandos do shell normal funcionam, mas é uma sessão isolada`}),e.jsx("h2",{children:"7. Termux:Styling — Cores e fontes"}),e.jsxs("p",{children:["App pequeno com vários temas de cor e fontes prontos para o Termux. Aplica editando ",e.jsx("code",{children:"~/.termux/colors.properties"})," e ",e.jsx("code",{children:"~/.termux/font.ttf"}),"."]}),e.jsx(o,{title:"Termux:Styling",code:`# 1. Instale "Termux:Styling" pelo F-Droid
# 2. Toque longo na tela do Termux → "More" → "Style"
# 3. Escolha um esquema de cores (Solarized, Dracula, Nord, ...)
#    e uma fonte (Hack, Fira Code, JetBrains Mono, ...)
# 4. Após aplicar, recarregue:
termux-reload-settings`}),e.jsxs(r,{type:"success",title:"Resumo dos pacotes CLI",children:["Cada app companion tem um pacote correspondente que precisa ser instalado:",e.jsx("code",{children:"termux-api"}),", ",e.jsx("code",{children:"termux-x11-nightly"})," etc. O app sozinho não basta — e o pacote sozinho também não. Os dois trabalham em conjunto via intents do Android."]})]})}export{m as default};

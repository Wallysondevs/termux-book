import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function SnapFlatpak() {
  return (
    <PageContainer
      title="Termux:API & Apps Companion"
      subtitle="Conheça os apps complementares do Termux (Termux:API, Termux:Boot, Termux:Widget, Termux:X11, Termux:Tasker, Termux:Float, Termux:Styling) e as ferramentas CLI termux-*."
      difficulty="iniciante"
      timeToRead="20 min"
    >
      <AlertBox type="info" title="Snap e Flatpak não existem no Termux">
        Snap e Flatpak são formatos de pacote para Linux desktop e <strong>não rodam no Android</strong>.
        No Termux, as funcionalidades extras vêm como <strong>apps Android separados</strong> instalados
        do <strong>F-Droid</strong> (loja de apps livres) — eles se comunicam com o Termux via intents.
      </AlertBox>

      <p>
        O Termux principal é só o emulador de terminal. Para acessar recursos do Android (câmera,
        GPS, SMS, sensores, notificações) e estender as funcionalidades, existem vários
        <strong> apps companion</strong> publicados pela mesma equipe. Todos seguem o mesmo padrão:
        instale o app pelo F-Droid e use o pacote <code>pkg install termux-api</code> (ou similar)
        no Termux para liberar os comandos CLI.
      </p>

      <h2>Por que F-Droid e não Google Play?</h2>
      <AlertBox type="warning" title="Não use a versão da Play Store">
        As versões publicadas na Play Store estão <strong>desatualizadas e descontinuadas</strong> desde
        2020 (a Google mudou a política de <code>targetSdk</code> e quebrou o Termux).
        Sempre instale do <a href="https://f-droid.org">F-Droid</a> ou do GitHub Releases oficial.
        Misturar versões do Play e do F-Droid causa erros de assinatura.
      </AlertBox>

      <h2>1. Termux:API — Acesso a recursos do Android</h2>
      <p>
        O <strong>Termux:API</strong> expõe câmera, áudio, sensores, notificações, contatos,
        SMS, clipboard e mais via comandos <code>termux-*</code> no shell.
      </p>
      <CodeBlock
        title="Instalar e usar Termux:API"
        code={`# 1. Instale o app "Termux:API" pelo F-Droid
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
termux-sms-list -l 5`}
      />

      <h2>2. Termux:Boot — Rodar scripts ao ligar o celular</h2>
      <p>
        Permite executar scripts automaticamente quando o Android termina de bootar.
        Útil para iniciar <code>sshd</code>, túneis SSH, sincronizações ou qualquer daemon.
      </p>
      <CodeBlock
        title="Configurar Termux:Boot"
        code={`# 1. Instale "Termux:Boot" pelo F-Droid
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

# Reinicie o celular para testar`}
      />

      <h2>3. Termux:Widget — Atalhos na tela inicial</h2>
      <p>
        Coloca um widget na home do Android para executar scripts com um toque.
      </p>
      <CodeBlock
        title="Criar atalhos com Termux:Widget"
        code={`# 1. Instale "Termux:Widget" pelo F-Droid
# 2. Crie a pasta de scripts:
mkdir -p ~/.shortcuts

# 3. Adicione um script
cat > ~/.shortcuts/atualizar <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
pkg update -y && pkg upgrade -y
EOF

chmod +x ~/.shortcuts/atualizar

# 4. Na tela inicial do Android: adicionar widget → "Termux:Widget"
# Os scripts em ~/.shortcuts aparecem como atalhos clicáveis`}
      />

      <h2>4. Termux:X11 — Servidor gráfico no Android</h2>
      <p>
        App companion que roda um servidor X11 no Android, permitindo usar XFCE, i3,
        openbox e aplicativos GUI Linux dentro do Termux.
      </p>
      <CodeBlock
        title="Configurar Termux:X11 com XFCE"
        code={`# 1. Instale "Termux:X11" pelo F-Droid
# 2. No Termux, ative o repositório x11 e instale o servidor + ambiente:
pkg install x11-repo
pkg install termux-x11-nightly xfce4 dbus

# 3. Inicie o servidor X (em segundo plano)
termux-x11 :0 &

# 4. Em outra sessão Termux, exporte o display e inicie o XFCE
export DISPLAY=:0
dbus-launch --exit-with-session xfce4-session &

# 5. Abra o app Termux:X11 — você verá o desktop`}
      />

      <h2>5. Termux:Tasker — Integração com automação Android</h2>
      <p>
        Plugin para o app Tasker (automação de Android). Permite que o Tasker execute
        scripts do Termux como parte de uma rotina.
      </p>
      <CodeBlock
        title="Termux:Tasker"
        code={`# 1. Instale "Termux:Tasker" pelo F-Droid
# 2. Crie a pasta de tarefas:
mkdir -p ~/.termux/tasker

# 3. Coloque o script
cat > ~/.termux/tasker/notificar.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
termux-notification --title "Tasker" --content "$1"
EOF
chmod +x ~/.termux/tasker/notificar.sh

# 4. No Tasker, adicione ação: Plugin → Termux:Tasker
#    e selecione o script. Argumentos vão para $1, $2, ...`}
      />

      <h2>6. Termux:Float — Janela flutuante</h2>
      <p>
        Roda o Termux numa janela flutuante sobre os outros apps do Android.
        Útil para anotações rápidas ou monitoramento.
      </p>
      <CodeBlock
        title="Termux:Float"
        code={`# 1. Instale "Termux:Float" pelo F-Droid
# 2. Conceda permissão "exibir sobre outros apps" nas configs do Android
# 3. Abra o app — uma janelinha do Termux aparece, arrastável
#    Comandos do shell normal funcionam, mas é uma sessão isolada`}
      />

      <h2>7. Termux:Styling — Cores e fontes</h2>
      <p>
        App pequeno com vários temas de cor e fontes prontos para o Termux. Aplica
        editando <code>~/.termux/colors.properties</code> e <code>~/.termux/font.ttf</code>.
      </p>
      <CodeBlock
        title="Termux:Styling"
        code={`# 1. Instale "Termux:Styling" pelo F-Droid
# 2. Toque longo na tela do Termux → "More" → "Style"
# 3. Escolha um esquema de cores (Solarized, Dracula, Nord, ...)
#    e uma fonte (Hack, Fira Code, JetBrains Mono, ...)
# 4. Após aplicar, recarregue:
termux-reload-settings`}
      />

      <AlertBox type="success" title="Resumo dos pacotes CLI">
        Cada app companion tem um pacote correspondente que precisa ser instalado:
        <code>termux-api</code>, <code>termux-x11-nightly</code> etc. O app sozinho não basta —
        e o pacote sozinho também não. Os dois trabalham em conjunto via intents do Android.
      </AlertBox>
    </PageContainer>
  );
}

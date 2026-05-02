import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Multimedia() {
    return (
      <PageContainer
        title="Multimídia e Codecs no Ubuntu"
        subtitle="Instalação de codecs, reprodução de áudio e vídeo, edição de imagens, gravação de tela, conversão de formatos e streaming no Ubuntu."
        difficulty="iniciante"
        timeToRead="30 min"
      >
        <p>
          Por questões de licenciamento, o Ubuntu não inclui codecs proprietários por padrão.
          Isso significa que arquivos MP3, MP4, H.264, H.265, AAC e outros formatos populares
          podem não funcionar sem instalar pacotes extras. Este guia cobre tudo o que você
          precisa para ter uma experiência multimídia completa.
        </p>

        <h2>1. Instalar Codecs e Formatos</h2>
        <CodeBlock
          title="Instalar todos os codecs necessários"
          code={`# Instalar o pacote de codecs restritos do Ubuntu (ESSENCIAL)
  # Inclui: MP3, MP4, H.264, AAC, MPEG-4, Windows Media, e mais
  sudo apt install -y ubuntu-restricted-extras
  # Vai pedir para aceitar a licença EULA da Microsoft (fontes TrueType)
  # Use Tab para selecionar "Sim" e Enter para confirmar

  # Instalar codecs extras para formatos adicionais
  sudo apt install -y libavcodec-extra    # Codecs extras do FFmpeg
  sudo apt install -y gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly
  sudo apt install -y gstreamer1.0-libav  # Integração FFmpeg com GStreamer

  # Suporte a DVDs comerciais (criptografados com CSS)
  sudo apt install -y libdvd-pkg
  sudo dpkg-reconfigure libdvd-pkg   # Compila a biblioteca de descriptografia

  # Instalar VAAPI e VDPAU (aceleração de vídeo por hardware)
  # Para GPUs Intel:
  sudo apt install -y intel-media-va-driver vainfo
  # Para GPUs AMD:
  sudo apt install -y mesa-va-drivers vainfo
  # Para GPUs NVIDIA:
  sudo apt install -y vdpauinfo

  # Verificar aceleração de hardware
  vainfo     # Mostra capacidades VA-API
  vdpauinfo  # Mostra capacidades VDPAU

  # Verificar quais codecs estão instalados
  gst-inspect-1.0 | grep -i "h264\|h265\|mp3\|aac"`}
        />

        <AlertBox type="info" title="Por que codecs não vêm pré-instalados?">
          Codecs como MP3 e H.264 são protegidos por patentes em alguns países. O Ubuntu,
          mantido pela Canonical (empresa sediada no Reino Unido), não pode distribuí-los
          por padrão. O pacote <code>ubuntu-restricted-extras</code> resolve isso para o usuário.
        </AlertBox>

        <h2>2. Reprodutores de Vídeo</h2>
        <CodeBlock
          title="Instalar reprodutores de vídeo"
          code={`# VLC — O reprodutor mais completo e versátil
  sudo apt install -y vlc
  # Reproduz praticamente QUALQUER formato de vídeo e áudio
  # Também faz streaming, conversão e captura de tela

  # Reproduzir um vídeo via terminal
  vlc video.mp4
  # Reproduzir em modo sem interface gráfica
  cvlc video.mp4

  # MPV — Reprodutor minimalista e leve (baseado em MPlayer)
  sudo apt install -y mpv
  # Atalhos do MPV:
  # Espaço       = play/pause
  # Setas         = avançar/retroceder
  # f             = fullscreen
  # m             = mudo
  # 9/0           = volume -/+
  # [ / ]         = velocidade -/+

  # Celluloid — Frontend gráfico para o MPV
  sudo apt install -y celluloid

  # Reproduzir um vídeo com MPV via terminal
  mpv video.mp4
  mpv --fullscreen video.mp4
  mpv --volume=50 video.mp4

  # Reproduzir vídeo da internet
  mpv "https://url-do-video.mp4"
  # MPV também reproduz streams do YouTube (com yt-dlp instalado)
  mpv "https://www.youtube.com/watch?v=ID_DO_VIDEO"`}
        />

        <h2>3. Reprodutores de Áudio</h2>
        <CodeBlock
          title="Instalar reprodutores de áudio"
          code={`# Rhythmbox — Reprodutor padrão do Ubuntu (já vem instalado)
  # Gerencia biblioteca de músicas, podcasts e rádios online

  # Audacious — Leve, parecido com o Winamp
  sudo apt install -y audacious

  # Clementine/Strawberry — Gerenciador de música completo
  sudo apt install -y strawberry
  # Suporta: Last.fm, Spotify (local), Tidal, Subsonic

  # Spotify (cliente oficial)
  sudo snap install spotify

  # Reproduzir áudio via terminal
  mpv musica.mp3
  # Ou com o play do Sox:
  sudo apt install -y sox libsox-fmt-all
  play musica.mp3
  play musica.flac

  # Converter entre formatos de áudio
  ffmpeg -i musica.flac musica.mp3         # FLAC → MP3
  ffmpeg -i musica.wav -b:a 320k musica.mp3  # WAV → MP3 320kbps
  ffmpeg -i musica.mp3 -acodec flac musica.flac  # MP3 → FLAC

  # PulseAudio/PipeWire — Controle de áudio do sistema
  pavucontrol   # Interface gráfica para controle de áudio
  # Permite: escolher saída, controlar volume por aplicativo, configurar microfone`}
        />

        <h2>4. FFmpeg — Canivete Suíço de Mídia</h2>
        <CodeBlock
          title="Usar o FFmpeg para conversão e edição"
          code={`# Instalar o FFmpeg
  sudo apt install -y ffmpeg

  # Verificar a versão e codecs disponíveis
  ffmpeg -version
  ffmpeg -codecs | head -30

  # === CONVERSÃO DE VÍDEO ===
  # Converter MP4 para MKV (sem re-codificar — instantâneo)
  ffmpeg -i video.mp4 -c copy video.mkv

  # Converter para MP4 com H.264 (compatível com tudo)
  ffmpeg -i video.avi -c:v libx264 -c:a aac -b:a 192k output.mp4

  # Converter para H.265/HEVC (50% menor, mesma qualidade)
  ffmpeg -i video.mp4 -c:v libx265 -crf 28 -c:a aac output-h265.mp4
  # CRF: 0 = lossless, 23 = padrão, 28 = menor arquivo, 51 = pior qualidade

  # Reduzir tamanho de um vídeo
  ffmpeg -i grande.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k menor.mp4

  # === CONVERSÃO DE ÁUDIO ===
  ffmpeg -i audio.wav audio.mp3             # WAV → MP3
  ffmpeg -i audio.flac -b:a 320k audio.mp3  # FLAC → MP3 320kbps
  ffmpeg -i video.mp4 -vn -acodec mp3 audio.mp3  # Extrair áudio de vídeo

  # === MANIPULAÇÃO ===
  # Cortar um trecho do vídeo (de 1:30 até 3:00)
  ffmpeg -i video.mp4 -ss 00:01:30 -to 00:03:00 -c copy trecho.mp4

  # Unir vários vídeos
  echo "file 'parte1.mp4'" > lista.txt
  echo "file 'parte2.mp4'" >> lista.txt
  ffmpeg -f concat -safe 0 -i lista.txt -c copy completo.mp4

  # Redimensionar vídeo para 720p
  ffmpeg -i video.mp4 -vf scale=1280:720 video-720p.mp4

  # Criar GIF de um trecho do vídeo
  ffmpeg -i video.mp4 -ss 00:00:05 -t 3 -vf "fps=10,scale=480:-1" output.gif

  # Adicionar legenda ao vídeo
  ffmpeg -i video.mp4 -vf subtitles=legenda.srt output.mp4

  # Extrair frames do vídeo (1 frame por segundo)
  ffmpeg -i video.mp4 -vf fps=1 frame_%04d.png

  # Ver informações detalhadas de um arquivo de mídia
  ffprobe video.mp4
  ffprobe -v quiet -print_format json -show_streams video.mp4`}
        />

        <h2>5. Edição de Imagens</h2>
        <CodeBlock
          title="Ferramentas de edição de imagens"
          code={`# GIMP — Editor de imagens profissional (alternativa ao Photoshop)
  sudo apt install -y gimp

  # Inkscape — Editor de vetores SVG (alternativa ao Illustrator)
  sudo apt install -y inkscape

  # ImageMagick — Manipulação de imagens via terminal
  sudo apt install -y imagemagick

  # Converter entre formatos
  convert imagem.png imagem.jpg
  convert imagem.bmp imagem.webp

  # Redimensionar imagem
  convert imagem.jpg -resize 800x600 imagem-reduzida.jpg
  convert imagem.jpg -resize 50% imagem-metade.jpg

  # Comprimir JPEG (qualidade 80%)
  convert imagem.jpg -quality 80 imagem-comprimida.jpg

  # Converter em lote (todos os PNGs para JPG)
  mogrify -format jpg *.png

  # Adicionar texto a uma imagem
  convert imagem.jpg -pointsize 36 -fill white -gravity south \
    -annotate +0+20 'Legenda aqui' imagem-com-texto.jpg

  # Criar thumbnail de 200x200
  convert imagem.jpg -thumbnail 200x200^ -gravity center -extent 200x200 thumb.jpg

  # Informações da imagem
  identify imagem.jpg
  # Saída: imagem.jpg JPEG 1920x1080 1920x1080+0+0 8-bit sRGB 245KB

  # Captura de tela via terminal
  gnome-screenshot                  # Captura tela inteira
  gnome-screenshot -a               # Captura área selecionada
  gnome-screenshot -w               # Captura janela ativa
  gnome-screenshot -d 5             # Captura com delay de 5 segundos`}
        />

        <h2>6. Gravação de Tela</h2>
        <CodeBlock
          title="Gravar a tela no Ubuntu"
          code={`# OBS Studio — O melhor para gravação e streaming
  sudo apt install -y obs-studio
  # Ou via Flatpak (versão mais recente):
  flatpak install flathub com.obsproject.Studio

  # SimpleScreenRecorder — Simples e eficiente
  sudo apt install -y simplescreenrecorder

  # Kazam — Gravador leve
  sudo apt install -y kazam

  # Gravar tela via terminal com FFmpeg
  # Gravar tela inteira com áudio
  ffmpeg -f x11grab -video_size 1920x1080 -framerate 30 -i :0.0 \
    -f pulse -ac 2 -i default \
    -c:v libx264 -preset ultrafast -c:a aac gravacao.mp4

  # Gravar apenas uma área da tela (posição 100,200, tamanho 800x600)
  ffmpeg -f x11grab -video_size 800x600 -framerate 30 -i :0.0+100,200 \
    -c:v libx264 -preset ultrafast gravacao-area.mp4

  # Pressione Q para parar a gravação

  # GNOME nativo (Ubuntu 22.04+):
  # Ctrl+Shift+Alt+R → inicia/para gravação rápida
  # Os vídeos são salvos em ~/Vídeos/`}
        />

        <h2>7. Download de Vídeos</h2>
        <CodeBlock
          title="Baixar vídeos do YouTube e outros sites"
          code={`# Instalar o yt-dlp (fork moderno do youtube-dl)
  sudo apt install -y yt-dlp
  # Ou via pip (versão mais recente):
  pip3 install -U yt-dlp

  # Baixar um vídeo
  yt-dlp "https://www.youtube.com/watch?v=ID_DO_VIDEO"

  # Baixar na melhor qualidade disponível
  yt-dlp -f "bestvideo+bestaudio" --merge-output-format mp4 URL

  # Baixar apenas o áudio (MP3)
  yt-dlp -x --audio-format mp3 URL

  # Baixar playlist inteira
  yt-dlp -o "%(playlist_index)s-%(title)s.%(ext)s" URL_DA_PLAYLIST

  # Baixar legendas
  yt-dlp --write-sub --sub-lang pt URL

  # Listar formatos disponíveis
  yt-dlp -F URL
  # Escolher um formato específico
  yt-dlp -f 137+140 URL   # 137=1080p video, 140=áudio

  # Baixar de outros sites (Instagram, Twitter, TikTok, etc.)
  yt-dlp "https://www.instagram.com/p/ID_DO_POST/"
  yt-dlp "https://www.tiktok.com/@user/video/ID"`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com multimídia"
          code={`# Vídeo sem som ou som sem vídeo
  # Solução: Instalar todos os codecs
  sudo apt install -y ubuntu-restricted-extras gstreamer1.0-plugins-bad \
    gstreamer1.0-plugins-ugly gstreamer1.0-libav

  # Áudio não funciona em nenhum aplicativo
  # Verificar PipeWire/PulseAudio
  systemctl --user status pipewire     # Ubuntu 22.04+
  systemctl --user restart pipewire

  # Vídeo trava ou engasga
  # Verificar se aceleração por hardware está ativa
  vainfo   # Deve listar os perfis suportados
  # Se não funcionar, instalar os drivers VA-API corretos

  # Tela preta no VLC
  # Solução: Desabilitar aceleração de hardware no VLC
  # Ferramentas → Preferências → Vídeo → Saída → X11

  # FFmpeg: "Unknown encoder"
  # Solução: Instalar codecs extras
  sudo apt install -y libavcodec-extra

  # Microfone não funciona
  # Verificar no PulseAudio
  pavucontrol   # Aba "Input Devices" — verificar se o mic está ativo
  # Verificar permissões
  arecord -l   # Lista dispositivos de captura de áudio`}
        />

        <AlertBox type="info" title="PipeWire vs PulseAudio">
          O Ubuntu 22.04+ usa o <strong>PipeWire</strong> como servidor de áudio padrão,
          substituindo o PulseAudio. O PipeWire é compatível com PulseAudio, ALSA e JACK,
          oferecendo menor latência e melhor suporte a Bluetooth. Comandos do PulseAudio
          (como <code>pavucontrol</code>) continuam funcionando normalmente.
        </AlertBox>
      </PageContainer>
    );
  }
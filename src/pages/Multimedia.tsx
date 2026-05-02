import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Multimedia() {
  return (
    <PageContainer
      title="Multimídia no Termux"
      subtitle="FFmpeg, yt-dlp, mpv, sox e a API Termux:API (termux-media-player, termux-microphone-record) para áudio, vídeo, conversão e captura."
      difficulty="iniciante"
      timeToRead="25 min"
    >
      <AlertBox type="info" title="No Termux, áudio é via Android">
        Termux roda em Android e <strong>não usa PulseAudio/PipeWire/ALSA</strong>
        como um Linux desktop. Para tocar mídia ou gravar microfone do
        celular, o caminho oficial é o app companion <strong>Termux:API</strong>
        (instale via F-Droid) que expõe comandos como
        <code> termux-media-player</code> e <code>termux-microphone-record</code>.
        Para processar arquivos (converter, cortar, baixar), as ferramentas
        clássicas <strong>FFmpeg, yt-dlp, mpv, sox</strong> rodam nativamente.
      </AlertBox>

      <h2>1. Instalar as ferramentas básicas</h2>
      <CodeBlock
        title="Pacotes que realmente existem no Termux"
        code={`pkg update && pkg upgrade -y

# Núcleo de manipulação de mídia
pkg install -y ffmpeg          # canivete suíço de áudio/vídeo
pkg install -y yt-dlp          # baixar vídeos (YouTube e ~1000 sites)
pkg install -y mpv             # player de linha de comando
pkg install -y sox             # processamento de áudio
pkg install -y lame            # encoder MP3
pkg install -y imagemagick     # conversão/edição de imagens

# Para acessar funções do Android (mídia, microfone, câmera, etc.):
pkg install -y termux-api
# IMPORTANTE: também instale o app "Termux:API" pelo F-Droid.
# Sem o app, os comandos termux-* não funcionam.`}
      />

      <h2>2. Tocar áudio / vídeo no celular</h2>
      <CodeBlock
        title="termux-media-player (usa o player nativo do Android)"
        code={`# Tocar um arquivo (precisa do app Termux:API instalado)
termux-media-player play ~/storage/music/musica.mp3

# Pausar / continuar
termux-media-player pause
termux-media-player play

# Estado atual
termux-media-player info

# Parar
termux-media-player stop

# Dica: dê acesso ao storage primeiro
termux-setup-storage
# Daí ~/storage/shared aponta para /sdcard, ~/storage/music etc.`}
      />

      <h2>3. mpv no terminal</h2>
      <CodeBlock
        title="Player leve para áudio (vídeo precisa de Termux:X11)"
        code={`# Áudio funciona direto no Termux
mpv musica.mp3
mpv --no-video https://stream.radio.exemplo/aac

# Atalhos:
# Espaço = play/pause  | seta = +/- 5s  | 9/0 = volume  | q = sair

# Para vídeo com janela, é necessário o app Termux:X11 + servidor X:
# 1) Instale o app Termux:X11 do F-Droid
# 2) pkg install x11-repo && pkg install -y termux-x11-nightly
# 3) Em outra sessão: termux-x11 :0 &
# 4) export DISPLAY=:0 && mpv video.mp4`}
      />

      <h2>4. Gravar microfone</h2>
      <CodeBlock
        title="termux-microphone-record (Termux:API)"
        code={`# Gravar 30 segundos em formato padrão (3gp/AMR)
termux-microphone-record -d -l 30 -f ~/gravacao.3gp

# Parâmetros úteis:
# -d            inicia gravação em background
# -l SEGUNDOS   duração máxima
# -f ARQUIVO    arquivo de saída
# -e EXT        codec/encoder (aac, amr_wb, amr_nb, default)
# -b BITRATE    bits por segundo (ex: 128000)
# -r RATE       sample rate (ex: 44100)

# Status
termux-microphone-record -i

# Parar antes do tempo
termux-microphone-record -q

# Converter pra WAV/MP3 com FFmpeg
ffmpeg -i ~/gravacao.3gp ~/gravacao.wav
ffmpeg -i ~/gravacao.3gp -b:a 192k ~/gravacao.mp3`}
      />

      <h2>5. FFmpeg — conversão e edição</h2>
      <CodeBlock
        title="Receitas usuais"
        code={`# Versão e codecs
ffmpeg -version
ffmpeg -codecs | head -30

# === VÍDEO ===
# Remuxar (sem recodificar) — quase instantâneo
ffmpeg -i video.mp4 -c copy video.mkv

# Recomprimir para H.264 (compatível com tudo)
ffmpeg -i entrada.avi -c:v libx264 -c:a aac -b:a 128k saida.mp4

# H.265/HEVC (~50% menor, mesma qualidade)
ffmpeg -i entrada.mp4 -c:v libx265 -crf 28 -c:a aac saida-h265.mp4

# Cortar trecho de 1:30 a 3:00 (sem recodificar)
ffmpeg -i video.mp4 -ss 00:01:30 -to 00:03:00 -c copy trecho.mp4

# Reduzir resolução para 720p
ffmpeg -i video.mp4 -vf scale=1280:720 video-720p.mp4

# Criar GIF de 3 segundos
ffmpeg -i video.mp4 -ss 00:00:05 -t 3 -vf "fps=10,scale=480:-1" out.gif

# === ÁUDIO ===
ffmpeg -i audio.wav audio.mp3
ffmpeg -i audio.flac -b:a 320k audio.mp3
ffmpeg -i video.mp4 -vn -acodec copy audio.aac   # extrair áudio

# === INFO ===
ffprobe video.mp4
ffprobe -v quiet -print_format json -show_streams video.mp4`}
      />

      <h2>6. Sox e LAME — áudio</h2>
      <CodeBlock
        title="Processamento e codificação de áudio"
        code={`# Tocar (saída via OpenSL/AAudio do Android — pode falhar; prefira mpv)
play musica.wav

# Converter formatos
sox entrada.wav saida.flac
sox entrada.mp3 saida.ogg

# Normalizar volume
sox entrada.wav --norm saida.wav

# Cortar de 10s a 30s
sox entrada.wav saida.wav trim 10 20

# Misturar dois arquivos
sox -m a.wav b.wav mix.wav

# Codificar MP3 com LAME (qualidade 0 = melhor, 9 = pior)
lame -V 2 entrada.wav saida.mp3`}
      />

      <h2>7. yt-dlp — baixar vídeos</h2>
      <CodeBlock
        title="Funciona muito bem no Termux"
        code={`# Atualizar (versão do pip costuma ser mais nova)
pkg install -y python
pip install -U yt-dlp

# Baixar um vídeo
yt-dlp "https://www.youtube.com/watch?v=ID"

# Melhor qualidade combinada (vídeo + áudio em mp4)
yt-dlp -f "bestvideo+bestaudio" --merge-output-format mp4 URL

# Só áudio em MP3
yt-dlp -x --audio-format mp3 URL

# Playlist inteira, com índice no nome do arquivo
yt-dlp -o "%(playlist_index)s-%(title)s.%(ext)s" URL_PLAYLIST

# Legendas em pt
yt-dlp --write-sub --sub-lang pt URL

# Listar formatos disponíveis
yt-dlp -F URL

# Baixar para o storage compartilhado (Galeria do Android vê)
termux-setup-storage
yt-dlp -o "~/storage/shared/Download/%(title)s.%(ext)s" URL`}
      />

      <h2>8. ImageMagick — imagens</h2>
      <CodeBlock
        title="Edição em lote"
        code={`# Converter formato
convert imagem.png imagem.jpg

# Redimensionar
convert imagem.jpg -resize 800x600 menor.jpg
convert imagem.jpg -resize 50%      metade.jpg

# Comprimir JPEG
convert imagem.jpg -quality 80 comprimida.jpg

# Lote: todos os PNGs viram JPG
mogrify -format jpg *.png

# Thumbnail quadrado 200x200
convert in.jpg -thumbnail 200x200^ -gravity center -extent 200x200 thumb.jpg

# Info
identify imagem.jpg`}
      />

      <h2>9. Câmera e tirar fotos via Termux:API</h2>
      <CodeBlock
        title="Comandos extras úteis"
        code={`# Listar câmeras
termux-camera-info

# Tirar foto com a câmera 0 (geralmente traseira)
termux-camera-photo -c 0 ~/foto.jpg

# Tocar um som de notificação rápido
termux-media-player play ~/storage/music/notif.mp3

# Texto-para-fala
termux-tts-speak "Download finalizado"`}
      />

      <h2>Troubleshooting</h2>
      <CodeBlock
        title="Problemas comuns"
        code={`# "termux-media-player: command not found"
# Faltou o pacote OU o app Termux:API
pkg install -y termux-api
# E instale o app "Termux:API" do F-Droid.

# "Permission denied" ao gravar/ler em /sdcard
termux-setup-storage
# Aceite o pop-up de permissão no Android.

# yt-dlp diz que está desatualizado
pip install -U yt-dlp

# FFmpeg reclama de codec ausente
# O FFmpeg do Termux já vem com x264, x265, aac, opus, vorbis, mp3.
# Para algo exótico, recompile do código-fonte (raro precisar).

# mpv abre janela mas trava
# Janela = X11 = precisa do Termux:X11 ativo + DISPLAY=:0`}
      />

      <AlertBox type="info" title="Dica de fluxo">
        Combine: <strong>yt-dlp</strong> baixa, <strong>FFmpeg</strong> corta
        e converte, <strong>termux-media-player</strong> reproduz no celular.
        É um pequeno estúdio multimídia rodando no bolso, sem precisar de PC.
      </AlertBox>
    </PageContainer>
  );
}

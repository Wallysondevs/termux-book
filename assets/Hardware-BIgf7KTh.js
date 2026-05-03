import{j as e}from"./index-BGu3owFd.js";import{P as a,I as r}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function c(){return e.jsxs(a,{title:"Hardware do Celular — Diagnóstico via Termux",subtitle:"Como inspecionar CPU, memória, bateria, sensores, Wi-Fi e telefonia do Android usando /proc, getprop e a Termux:API.",difficulty:"iniciante",timeToRead:"20 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"lscpu"})," "," — "," ","CPU."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"lspci/lsusb"})," "," — "," ","periféricos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"lshw"})," "," — "," ","listagem."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"sensors"})," "," — "," ","temperaturas."]})]}),e.jsxs(r,{type:"warning",title:"Esqueça lspci, lsusb, dmidecode, lshw",children:["Essas ferramentas de PC ",e.jsx("strong",{children:"não existem ou retornam vazio no Android"}),". O kernel do celular não expõe um barramento PCI/USB tradicional para o espaço de usuário, e não há tabelas SMBIOS/DMI. Para ver hardware do celular use ",e.jsx("code",{children:"/proc/*"}),", ",e.jsx("code",{children:"getprop"})," e os comandos da ",e.jsx("strong",{children:"Termux:API"}),"."]}),e.jsx("p",{children:"Diferente de um PC, o hardware de um Android é fixo (não tem placas plugáveis). Em troca, o aparelho tem coisas que PC não tem: bateria, sensores (acelerômetro, giroscópio, luz), modem celular, GPS, NFC, múltiplas câmeras e Wi-Fi/Bluetooth integrados. O Termux acessa parte disso via a API do Android."}),e.jsx("h2",{children:"1. Visão Geral do Aparelho"}),e.jsx(o,{title:"Identificação básica via getprop",code:`# 'getprop' lê propriedades do sistema Android
getprop ro.product.manufacturer    # ex: samsung, xiaomi, google
getprop ro.product.model           # ex: SM-G998B, Pixel 7
getprop ro.product.brand
getprop ro.product.device
getprop ro.build.version.release   # versão Android (ex: 14)
getprop ro.build.version.sdk       # API level (ex: 34)
getprop ro.product.cpu.abi         # arquitetura (ex: arm64-v8a)
getprop ro.serialno                # geralmente vazio sem root no Android moderno

# Snapshot completo (centenas de linhas)
getprop | head -50

# Resumo "neofetch-like" no Termux
pkg install neofetch
neofetch`}),e.jsx("h2",{children:"2. CPU"}),e.jsx(o,{title:"Processador do celular",code:`# Detalhes da CPU (cada núcleo aparece separadamente)
cat /proc/cpuinfo

# Quantos núcleos
nproc

# Frequência atual de cada núcleo (kHz)
for c in /sys/devices/system/cpu/cpu[0-9]*/cpufreq/scaling_cur_freq; do
  echo "$c: $(cat $c 2>/dev/null) kHz"
done

# Frequência máxima/mínima suportada
cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_max_freq 2>/dev/null
cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_min_freq 2>/dev/null

# Governador atual (geralmente 'schedutil' no Android)
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor 2>/dev/null
# Sem root você NÃO consegue mudar o governador.

# Big.LITTLE: muitos celulares têm núcleos rápidos + econômicos.
# Veja com:
cat /sys/devices/system/cpu/possible
cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_max_freq
cat /sys/devices/system/cpu/cpu7/cpufreq/cpuinfo_max_freq 2>/dev/null`}),e.jsx("h2",{children:"3. Memória RAM e Armazenamento"}),e.jsx(o,{title:"RAM, swap e espaço livre",code:`# Uso de memória
free -h
# Em Android, 'Swap' geralmente vem do ZRAM (compressão em RAM),
# não de partição de disco.

# Detalhe completo
cat /proc/meminfo | head -20

# Espaço de armazenamento visível ao Termux
df -h $PREFIX                 # partição /data (interna do Termux)
df -h /sdcard 2>/dev/null     # storage compartilhado (após termux-setup-storage)

# Tamanho do PREFIX (instalação do Termux)
du -sh $PREFIX

# Monitor em tempo real
pkg install htop
htop`}),e.jsx("h2",{children:"4. Bateria (Termux:API)"}),e.jsx(o,{title:"Status da bateria via termux-api",code:`# Instalar
pkg install termux-api
# E instale o app companion 'Termux:API' do F-Droid.

# Status completo (JSON)
termux-battery-status
# Saída exemplo:
# {
#   "health": "GOOD",
#   "percentage": 87,
#   "plugged": "UNPLUGGED",
#   "status": "DISCHARGING",
#   "temperature": 31.2,
#   "current": -512000
# }

# Extrair só a porcentagem
termux-battery-status | jq -r .percentage

# Monitorar continuamente
while true; do
  echo "$(date +%T) -> $(termux-battery-status | jq -r .percentage)%"
  sleep 30
done`}),e.jsx("h2",{children:"5. Sensores e Telefonia"}),e.jsx(o,{title:"Acelerômetro, Wi-Fi, telefonia, localização",code:`# Listar todos os sensores disponíveis
termux-sensor -l

# Ler 3 amostras do acelerômetro
termux-sensor -s accelerometer -n 3

# Wi-Fi conectado (SSID, frequência, IP, RSSI)
termux-wifi-connectioninfo

# Redes Wi-Fi visíveis (varredura)
termux-wifi-scaninfo

# Informações da telefonia (operadora, tipo de rede)
termux-telephony-deviceinfo
termux-telephony-cellinfo     # torres celulares próximas

# Localização (GPS / network)
termux-location -p gps

# Volume de áudio
termux-volume

# Lanterna / câmera flash
termux-torch on
termux-torch off

# Câmera — listar e tirar foto
termux-camera-info
termux-camera-photo -c 0 ~/foto.jpg`}),e.jsx("h2",{children:"6. Rede e Conectividade"}),e.jsx(o,{title:"Interfaces e endereços (read-only)",code:`# Interfaces de rede (ifconfig pode estar limitado)
ifconfig 2>/dev/null
ip addr show 2>/dev/null

# IP público (precisa internet)
curl -s https://ifconfig.me

# Termux:API para Wi-Fi
termux-wifi-connectioninfo | jq

# Sem root NÃO dá pra:
# - alterar IP, rotas ou MAC
# - escanear pacotes em modo monitor
# - abrir portas < 1024
# Tudo isso é restrição do Android.`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(o,{title:"Problemas comuns",code:`# 'lspci' / 'lsusb' / 'dmidecode' não retornam nada
# → Esperado. Esses comandos pressupõem barramentos do PC que o
#   Android não expõe ao espaço de usuário. Use getprop e /proc.

# termux-* dizem "API not available"
# → Você instalou o pacote 'termux-api' mas falta o APP companion
#   'Termux:API' (F-Droid ou GitHub). Os dois são necessários.

# termux-sensor / termux-location não retornam dados
# → Permissões. No Android, vá em:
#   Configurações → Apps → Termux:API → Permissões → conceda
#   Localização, Sensores, etc.

# Frequência da CPU sempre mostra o mínimo
# → Android pode estar economizando energia. Plugue na tomada
#   e cheque sob carga. Não tente forçar o governador sem root.

# Bateria esquenta ou drena rápido com Termux
# → Provavelmente um wake-lock esquecido ou laço apertado.
termux-wake-unlock
# E revise scripts em ~/.termux/boot/.`}),e.jsxs(r,{type:"info",title:"Quer mais detalhes do hardware?",children:["Apps Android como ",e.jsx("strong",{children:"CPU-Z"}),", ",e.jsx("strong",{children:"AIDA64"})," e"," ",e.jsx("strong",{children:"Device Info HW"})," mostram informações do SoC, sensores e câmeras com muito mais profundidade que o Termux consegue ler. Use-os em paralelo quando precisar de inventário completo do aparelho."]})]})}export{c as default};

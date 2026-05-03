import{j as e}from"./index-BGu3owFd.js";import{P as s,I as r}from"./InfoBox-cbYNoYJG.js";import{C as o}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function l(){return e.jsxs(s,{title:"Kernel Android (Linux) visto pelo Termux",subtitle:"O kernel do Android é Linux, mas é fechado e lockado pelo fabricante. Veja o que dá pra inspecionar e o que NÃO dá pra fazer no Termux.",difficulty:"intermediario",timeToRead:"12 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Kernel"})," "," — "," ","núcleo Linux."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"uname -r"})," "," — "," ","versão."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"modprobe"})," "," — "," ","carrega módulo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"DKMS"})," "," — "," ","recompila."]})]}),e.jsxs(r,{type:"warning",title:"Você NÃO troca o kernel do Android pelo Termux",children:["O kernel é compilado e assinado pelo fabricante e gravado em uma partição read-only (",e.jsx("code",{children:"boot"}),"). Trocar exige"," ",e.jsx("strong",{children:"desbloqueio do bootloader"}),","," ",e.jsx("strong",{children:"root"})," e geralmente uma ",e.jsx("strong",{children:"custom ROM"})," ","(LineageOS, etc.). Nada disso é feito de dentro do Termux. Aqui você só consegue ",e.jsx("em",{children:"inspecionar"})," o kernel, não modificá-lo."]}),e.jsxs("p",{children:["O Android usa um ",e.jsx("strong",{children:"fork do kernel Linux"}),' mantido pelo Google + patches do fabricante do SoC (Qualcomm, MediaTek, Exynos, Tensor). Cada aparelho tem seu próprio kernel; não existe "atualizar o kernel via pkg" como em distros desktop.']}),e.jsx("h2",{children:"1. Informações do Kernel"}),e.jsx(o,{title:"Inspecionar o kernel atual",code:`# Versão do kernel
uname -r
# Saída exemplo: 4.19.157-android11-perf+
# 4.19   = versão Linux upstream usada como base
# 157    = patch level
# android11 = branch do Android Common Kernel
# -perf  = build "performance" do fabricante

# Informações completas
uname -a
# Linux localhost 4.19.157-android11-perf+ #1 SMP PREEMPT ... aarch64

# Arquitetura (quase sempre aarch64 hoje em dia)
uname -m

# Versão completa via /proc
cat /proc/version

# Linha de comando passada ao kernel no boot
cat /proc/cmdline 2>/dev/null
# Em vários Androids isso é restrito sem root.

# Build do Android (não é o kernel, mas é útil)
getprop ro.build.version.release   # ex: 14
getprop ro.build.version.sdk       # ex: 34
getprop ro.build.fingerprint`}),e.jsx("h2",{children:"2. Mensagens do Kernel (dmesg)"}),e.jsx(o,{title:"Ler dmesg — geralmente bloqueado sem root",code:`# Tentar ler dmesg
dmesg 2>&1 | tail -30
# Em Android >= 4.1, dmesg é restrito por kptr_restrict /
# dmesg_restrict. Sem root você normalmente vê:
#   "dmesg: read kernel buffer failed: Operation not permitted"

# Verificar a restrição
cat /proc/sys/kernel/dmesg_restrict 2>/dev/null
cat /proc/sys/kernel/kptr_restrict 2>/dev/null

# Você ainda pode ler alguns counters em /proc:
cat /proc/loadavg                  # carga (1m, 5m, 15m)
cat /proc/uptime                   # tempo ligado
cat /proc/meminfo | head -5
cat /proc/cpuinfo | head -20
cat /proc/stat | head -5
ls /proc/sys/kernel/                # parâmetros visíveis (read-only sem root)`}),e.jsx("h2",{children:"3. Módulos do Kernel (informativo)"}),e.jsx(o,{title:"Android quase sempre tem kernel monolítico ou módulos imutáveis",code:`# Ver módulos carregados (geralmente vazio em Android,
# pois muitos kernels são compilados monolíticos):
cat /proc/modules 2>/dev/null
lsmod 2>/dev/null

# Em aparelhos com GKI (Generic Kernel Image, Android 11+),
# existem 'vendor modules' — mas são carregados pelo init do
# Android, não pelo usuário. Você NÃO usa modprobe/insmod sem root.

# Para um app de espaço de usuário (Termux), módulos do kernel
# são opacos. Não tente compilar/inserir módulos: você não tem
# os headers do kernel exato do seu aparelho disponíveis.`}),e.jsx("h2",{children:"4. Parâmetros do Kernel"}),e.jsx(o,{title:"sysctl — leitura sim, escrita não (sem root)",code:`# Listar parâmetros visíveis
ls /proc/sys/

# Ler um parâmetro
cat /proc/sys/kernel/hostname
cat /proc/sys/net/ipv4/ip_forward
cat /proc/sys/vm/swappiness

# Tentar escrever (sem root → Permission denied)
echo 1 > /proc/sys/net/ipv4/ip_forward
# Resultado: bash: /proc/sys/net/ipv4/ip_forward: Permission denied

# O comando 'sysctl' nem vem por padrão no Termux; mesmo
# instalando, escrita exige root. Aceite que esses ajustes
# pertencem ao SO Android, não ao Termux.`}),e.jsx("h2",{children:"Troubleshooting"}),e.jsx(o,{title:"Dúvidas comuns",code:`# "Como atualizo o kernel do meu celular?"
# Resposta: você não atualiza pelo Termux. O kernel só muda via
# atualização OTA do Android (System Update) OU instalando uma
# custom ROM (LineageOS, Pixel Experience, etc.) com bootloader
# desbloqueado — operação fora do escopo do Termux e arriscada.

# "Como compilo um módulo .ko?"
# Resposta: precisa dos headers exatos do kernel do seu aparelho
# (raramente disponíveis), toolchain ARM64, e root para inserir.
# Não é um caso de uso prático no Termux.

# "Posso ver logs do sistema Android?"
# Sim, com a Termux:API (app companion):
pkg install termux-api
# (e instale o app Termux:API)
# logcat NÃO funciona no Termux sem root. A Termux:API expõe
# acesso a Battery, Sensors, Wi-Fi, etc — não ao log do kernel.

# Confirmar arquitetura para baixar binários certos
uname -m
# aarch64  → ARM 64-bit (quase todos os celulares modernos)
# armv7l   → ARM 32-bit (aparelhos antigos)
# x86_64   → emuladores / ChromeOS`}),e.jsxs(r,{type:"info",title:"Resumo prático",children:["Do Termux você ",e.jsx("strong",{children:"lê"})," informações do kernel (",e.jsx("code",{children:"uname"}),", ",e.jsx("code",{children:"/proc/*"}),", ",e.jsx("code",{children:"getprop"}),") mas"," ",e.jsx("strong",{children:"não modifica"})," nada. Para mudar o kernel do Android é preciso desbloqueio de bootloader + root + custom ROM — assunto fora do escopo deste livro."]})]})}export{l as default};

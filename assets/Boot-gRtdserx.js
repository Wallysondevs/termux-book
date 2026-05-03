import{j as o}from"./index-BGu3owFd.js";import{P as a,I as r}from"./InfoBox-cbYNoYJG.js";import{C as e}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function m(){return o.jsxs(a,{title:"Processo de Boot do Android e Auto-início do Termux",subtitle:"Como o Android inicializa (bootloader → kernel → init → zygote) e como fazer o Termux executar scripts no boot via Termux:Boot.",difficulty:"intermediario",timeToRead:"15 min",children:[o.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),o.jsx("h2",{children:"Glossário rápido"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"GRUB"})," "," — "," ","bootloader."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"/boot/efi"})," "," — "," ","ESP."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"systemd-boot"})," "," — "," ","minimalista."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Plymouth"})," "," — "," ","splash."]})]}),o.jsxs(r,{type:"info",title:"Não há GRUB, UEFI ou systemd no Android",children:["O Android usa um ",o.jsx("strong",{children:"bootloader proprietário"})," (Little Kernel, ABL, fastboot) gravado no aparelho de fábrica — nada de GRUB, UEFI ou BIOS. O Termux roda como app de usuário, então não controla o boot do sistema. O que você pode fazer é usar o app companion ",o.jsx("strong",{children:"Termux:Boot"})," ","para executar scripts logo após o Android terminar de iniciar."]}),o.jsx("p",{children:"Entender o boot do Android ajuda a diagnosticar problemas e configurar o Termux para iniciar serviços (sshd, cron, túneis, etc.) automaticamente quando o aparelho liga. Diferente do PC, você não troca o bootloader sem desbloquear o aparelho (e perder a garantia)."}),o.jsx("h2",{children:"1. Sequência de Boot do Android"}),o.jsx(e,{title:"Etapas do boot do Android",code:`# Sequência completa de boot do Android:
# 1. Boot ROM (chip)        → código gravado no SoC, carrega o bootloader
# 2. Bootloader (aboot/LK)  → Little Kernel ou Android Bootloader
#                             (proprietário do fabricante; fastboot mode aqui)
# 3. Kernel Linux           → kernel Android (fork do Linux upstream)
# 4. init (PID 1)           → lê /init.rc, monta partições, inicia daemons
# 5. zygote                 → processo Java pai de todos os apps
# 6. system_server          → serviços Android (ActivityManager, etc.)
# 7. Launcher (Home)        → tela inicial do Android

# Você só consegue ver o final dessa cadeia, do Termux:
cat /proc/version           # versão do kernel Android
getprop ro.bootloader       # nome/versão do bootloader (proprietário)
getprop ro.build.version.release   # versão do Android (ex: 14)
getprop ro.boot.bootreason  # motivo do último boot (cold, reboot, etc.)

# Ver tempo desde o boot
uptime
cat /proc/uptime            # segundos desde o boot

# Mensagens do kernel (read-only, sem root pode aparecer vazio)
dmesg 2>/dev/null | tail -20
# Em quase todo Android moderno dmesg é restrito sem root.`}),o.jsx("h2",{children:"2. Termux:Boot — Auto-iniciar scripts"}),o.jsx(e,{title:"Instalar e configurar Termux:Boot",code:`# Termux:Boot é um app companion (instale pelo F-Droid ou GitHub
# do Termux). Depois de instalado:
# 1. Abra o app Termux:Boot pelo menos UMA vez (sem isso o Android
#    não autoriza o RECEIVE_BOOT_COMPLETED).
# 2. Coloque seus scripts em ~/.termux/boot/
# 3. Reinicie o aparelho — os scripts rodam após o boot.

# Criar o diretório
mkdir -p ~/.termux/boot

# Exemplo: iniciar sshd e crond no boot
cat > ~/.termux/boot/start-services <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
# Mantém o CPU acordado durante a execução
termux-wake-lock

# Inicia o servidor SSH (porta 8022 por padrão)
sshd

# Inicia cron (se você tiver instalado: pkg install cronie)
crond
EOF

chmod +x ~/.termux/boot/start-services

# Você pode ter vários scripts em ~/.termux/boot/ — todos rodam.
# Ordem alfabética; prefixe com 00-, 10-, 20- para ordenar.

ls -la ~/.termux/boot/`}),o.jsx("h2",{children:"3. Serviços no Termux (sem systemd)"}),o.jsx(e,{title:"Termux usa runit (sv), não systemd",code:`# Termux NÃO tem systemd, systemctl, journalctl ou targets.
# Para gerenciar serviços de longa duração, use o pacote termux-services
# (baseado no runit).

pkg install termux-services

# Saia e entre no Termux para o ambiente recarregar.
# Habilitar um serviço (ex: sshd):
sv-enable sshd
sv up sshd

# Ver status
sv status sshd

# Parar / iniciar / reiniciar
sv down sshd
sv up sshd
sv restart sshd

# Desabilitar do boot do Termux
sv-disable sshd

# Logs ficam em $PREFIX/var/log/sv/<servico>/

# Para um serviço sobreviver ao fechamento da UI do Termux,
# combine com:
termux-wake-lock      # impede o Android matar o processo
termux-wake-unlock    # libera`}),o.jsx("h2",{children:"4. Recovery, Fastboot e Modo de Manutenção (informativo)"}),o.jsx(e,{title:"Modos de boot do Android (NÃO acessíveis pelo Termux)",code:`# Esses modos existem no Android mas NÃO são controlados pelo Termux.
# São acessados desligando o aparelho e segurando combinações de
# botões durante o boot (varia por fabricante):
#
# - Recovery        → restauração de fábrica, atualizações OTA, sideload
#                     (TWRP ou recovery do fabricante)
# - Fastboot/Bootloader → flashar imagens (boot.img, system.img)
#                     requer 'fastboot' do PC e geralmente bootloader
#                     desbloqueado
# - Safe Mode       → boot só com apps do sistema (sem apps de usuário)
# - Download Mode   → modo Samsung (Odin) / Xiaomi (EDL)
#
# Ver propriedades atuais
getprop ro.boot.mode             # ex: normal, recovery, charger
getprop ro.product.model         # modelo do aparelho
getprop ro.build.fingerprint     # fingerprint da ROM`}),o.jsx("h2",{children:"Troubleshooting"}),o.jsx(e,{title:"Problemas comuns com Termux:Boot",code:`# Scripts em ~/.termux/boot/ não rodam após reiniciar:
# 1. Confirme que o app Termux:Boot está instalado E foi aberto
#    pelo menos uma vez.
# 2. Cheque permissão de execução:
chmod +x ~/.termux/boot/*

# 3. Em alguns fabricantes (Xiaomi, Huawei, Oppo, Samsung), o
#    "otimizador de bateria" mata apps em background. Vá em:
#    Configurações → Apps → Termux:Boot/Termux → Bateria →
#    "Sem restrições" / "Permitir auto-inicialização".

# 4. Use logger para debugar:
cat > ~/.termux/boot/debug <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
date >> ~/boot.log
echo "boot script rodou" >> ~/boot.log
EOF
chmod +x ~/.termux/boot/debug
# Reinicie e cheque ~/boot.log

# Termux fechou sozinho durante boot:
# Use termux-wake-lock no início do script para evitar que o
# Android suspenda/mate o processo.

# Aparelho reiniciou sozinho? Veja o motivo:
getprop sys.boot.reason
getprop ro.boot.bootreason`}),o.jsxs(r,{type:"warning",title:"Otimizadores de bateria são o inimigo",children:["Em fabricantes chineses (MIUI, ColorOS, EMUI, OneUI), o sistema mata agressivamente processos em background. Para que ",o.jsx("code",{children:"Termux:Boot"})," ","e ",o.jsx("code",{children:"termux-wake-lock"})," funcionem, você precisa marcar o Termux como ",o.jsx("strong",{children:'"sem restrições de bateria"'})," e/ou"," ",o.jsx("strong",{children:"permitir auto-início"})," nas configurações do Android."]})]})}export{m as default};

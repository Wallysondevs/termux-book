import{j as s}from"./index-DllpmZ7S.js";import{P as a}from"./PageContainer-D5o1LrsX.js";import{C as e}from"./CodeBlock-BCO78Zke.js";import{I as o}from"./InfoBox-StGQOtUJ.js";import"./house-CLqZi7qQ.js";import"./proxy-Xil2K0n2.js";function u(){return s.jsxs(a,{title:"Timeshift — Snapshots do Sistema",subtitle:"Guia completo do Timeshift no Ubuntu: criar, gerenciar e restaurar snapshots do sistema, agendamento automático e recuperação de desastres.",difficulty:"iniciante",timeToRead:"25 min",children:[s.jsxs("p",{children:["O ",s.jsx("strong",{children:"Timeshift"}),' é a ferramenta de restauração do sistema mais popular no Ubuntu/Linux. Funciona como o "Restauração do Sistema" do Windows ou o Time Machine do macOS — cria snapshots do sistema que podem ser restaurados se algo der errado após uma atualização, instalação de driver ou configuração.']}),s.jsx("h2",{children:"rsync vs Btrfs — Modos de Operação"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"rsync"})," — Funciona em qualquer sistema de arquivos (ext4, xfs, etc.). Cria hard links para economizar espaço. Mais lento, mas mais compatível."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Btrfs"})," — Usa snapshots nativos do Btrfs. Quase instantâneo, não usa espaço extra até que arquivos sejam modificados (Copy-on-Write). Requer partição Btrfs."]})]}),s.jsx("h2",{children:"1. Instalar e Configurar"}),s.jsx(e,{title:"Instalar o Timeshift",code:`# Instalar o Timeshift
  sudo apt update
  sudo apt install -y timeshift

  # Abrir a interface gráfica
  sudo timeshift-gtk
  # Ou via terminal (para servidores):
  sudo timeshift --list

  # Na primeira execução:
  # 1. Escolha o modo: RSYNC (recomendado) ou BTRFS
  # 2. Escolha o disco de destino (onde os snapshots serão salvos)
  #    - Idealmente um disco/partição DIFERENTE do sistema
  #    - Se não tiver outro disco, pode usar o mesmo
  # 3. Configure a frequência dos snapshots
  # 4. Escolha os diretórios a incluir

  # Configurar via terminal
  sudo timeshift --create --comments "Primeiro snapshot"
  # Saída:
  # Creating new snapshot...
  # Saving to device: /dev/sda2
  # Snapshot saved: 2024-07-15_14-30-00`}),s.jsx("h2",{children:"2. Criar Snapshots"}),s.jsx(e,{title:"Criar e gerenciar snapshots",code:`# Criar um snapshot manual com comentário
  sudo timeshift --create --comments "Antes de atualizar o kernel"

  # Criar snapshot com tag específica
  sudo timeshift --create --tags D   # Daily
  sudo timeshift --create --tags W   # Weekly
  sudo timeshift --create --tags M   # Monthly
  sudo timeshift --create --tags O   # On-demand (manual)

  # Listar todos os snapshots
  sudo timeshift --list
  # Saída:
  # Device : /dev/sda2
  # -----------------------------------------------
  # Num   Name                    Tags  Description
  # -----------------------------------------------
  # 0  >  2024-07-15_14-30-00     O     Antes de atualizar o kernel
  # 1  >  2024-07-14_02-00-00     D     Snapshot automático diário
  # 2  >  2024-07-07_02-00-00     W     Snapshot automático semanal

  # Ver detalhes de um snapshot
  sudo timeshift --list --snapshot-device /dev/sda2

  # Deletar um snapshot específico
  sudo timeshift --delete --snapshot '2024-07-14_02-00-00'

  # Deletar todos os snapshots
  sudo timeshift --delete-all

  # Ver espaço usado pelos snapshots
  du -sh /timeshift/snapshots/*/`}),s.jsx("h2",{children:"3. Restaurar o Sistema"}),s.jsx(e,{title:"Restaurar a partir de um snapshot",code:`# === VIA INTERFACE GRÁFICA (recomendado) ===
  sudo timeshift-gtk
  # 1. Selecione o snapshot desejado
  # 2. Clique em "Restaurar"
  # 3. Revise o que será restaurado
  # 4. Confirme
  # 5. Reinicie o computador

  # === VIA TERMINAL ===
  # Listar snapshots disponíveis
  sudo timeshift --list

  # Restaurar um snapshot específico
  sudo timeshift --restore --snapshot '2024-07-15_14-30-00'

  # Restaurar sem pedir confirmação (para scripts)
  sudo timeshift --restore --snapshot '2024-07-15_14-30-00' --yes

  # Pular arquivos específicos durante a restauração
  sudo timeshift --restore --snapshot '2024-07-15_14-30-00'     --skip-grub   # Não restaurar o GRUB

  # === RESTAURAR QUANDO O SISTEMA NÃO INICIA ===
  # 1. Bootar com Ubuntu Live USB
  # 2. Instalar o Timeshift no Live:
  sudo apt install -y timeshift
  # 3. Montar a partição com os snapshots:
  sudo mount /dev/sda2 /mnt
  # 4. Restaurar:
  sudo timeshift --restore --snapshot-device /dev/sda2
  # 5. Selecione o snapshot e restaure
  # 6. Reinicie sem o USB`}),s.jsxs(o,{type:"warning",title:"O que o Timeshift protege e o que não protege",children:["O Timeshift, por padrão, faz snapshot apenas dos ",s.jsx("strong",{children:"arquivos do sistema"}),"(",s.jsx("code",{children:"/"}),"), não dos seus arquivos pessoais (",s.jsx("code",{children:"/home"}),"). Isso é proposital: ele restaura o sistema sem apagar seus documentos. Se quiser incluir o ",s.jsx("code",{children:"/home"}),", ative nas configurações — mas para backup pessoal, use rsync ou BorgBackup."]}),s.jsx("h2",{children:"4. Agendamento Automático"}),s.jsx(e,{title:"Configurar snapshots automáticos",code:`# Via interface gráfica:
  # Timeshift → Configurações → Agendamento
  # - Mensal: manter últimos 2 snapshots
  # - Semanal: manter últimos 3 snapshots
  # - Diário: manter últimos 5 snapshots
  # - Horário: manter últimos 6 snapshots
  # - Boot: criar snapshot a cada boot

  # Via linha de comando (editar config):
  sudo nano /etc/timeshift/timeshift.json

  # Configuração recomendada:
  # {
  #   "backup_device_uuid": "UUID_DO_DISCO",
  #   "schedule_monthly": "true",
  #   "count_monthly": "2",
  #   "schedule_weekly": "true",
  #   "count_weekly": "3",
  #   "schedule_daily": "true",
  #   "count_daily": "5",
  #   "schedule_hourly": "false",
  #   "count_hourly": "6",
  #   "schedule_boot": "false",
  #   "count_boot": "5",
  #   "exclude": [
  #     "/home/**",
  #     "/root/**"
  #   ],
  #   "exclude_apps": []
  # }

  # Verificar se o agendamento está ativo
  # O Timeshift usa cron para agendamento
  sudo cat /etc/cron.d/timeshift-*

  # Executar snapshot agendado manualmente
  sudo timeshift --check
  # Verifica se um snapshot agendado está pendente e o executa`}),s.jsx("h2",{children:"5. Boas Práticas"}),s.jsx(e,{title:"Dicas para uso eficiente do Timeshift",code:`# 1. Sempre criar snapshot ANTES de:
  sudo timeshift --create --comments "Antes: apt upgrade"
  sudo apt upgrade -y

  sudo timeshift --create --comments "Antes: instalar driver NVIDIA"
  sudo apt install -y nvidia-driver-545

  sudo timeshift --create --comments "Antes: mudanças no fstab"
  sudo nano /etc/fstab

  # 2. Verificar espaço em disco regularmente
  df -h /timeshift
  # Se estiver enchendo, reduzir o número de snapshots mantidos

  # 3. Usar disco separado para snapshots (se possível)
  # Snapshots no mesmo disco que o sistema não protegem contra falha de disco
  # Idealmente, use um segundo HD/SSD

  # 4. Testar a restauração periodicamente
  # Crie uma VM, restaure o snapshot e verifique

  # 5. Combinar com backup do /home
  # Timeshift para o sistema, rsync/BorgBackup para dados pessoais
  rsync -avh --exclude='.cache' /home/usuario/ /backup/home/

  # 6. Manter snapshots úteis com bons comentários
  sudo timeshift --create --comments "Sistema estável após config completa"
  # Snapshots sem comentário são difíceis de identificar depois`}),s.jsx("h2",{children:"Troubleshooting"}),s.jsx(e,{title:"Problemas comuns com Timeshift",code:`# Timeshift ocupa muito espaço
  # Solução: Limpar snapshots antigos
  sudo timeshift --list
  sudo timeshift --delete --snapshot 'nome-do-snapshot'
  # Ou reduzir o número de snapshots mantidos na configuração

  # Erro: "No snapshots found on device"
  # Solução: Verificar se o disco está montado
  lsblk
  sudo mount /dev/sda2 /mnt
  sudo timeshift --list --snapshot-device /dev/sda2

  # Snapshot demora muito para criar (modo rsync)
  # Causa: Muitos arquivos ou disco lento
  # Solução: Excluir pastas grandes desnecessárias
  # Na config, adicione exclusões:
  # /var/cache/apt/archives
  # /tmp
  # /var/tmp
  # /snap

  # Erro ao restaurar: "GRUB not found"
  # Solução: Reinstalar o GRUB após restaurar
  sudo grub-install /dev/sda
  sudo update-grub

  # Timeshift não inicia (interface gráfica)
  # Verificar dependências:
  sudo apt install --reinstall timeshift
  # Executar via terminal para ver erros:
  sudo timeshift-gtk 2>&1`}),s.jsxs(o,{type:"info",title:"Timeshift vs Snapper",children:["Se você usa Btrfs, o ",s.jsx("strong",{children:"Snapper"})," é uma alternativa ao Timeshift com integração mais profunda ao sistema de snapshots do Btrfs. O openSUSE usa Snapper por padrão. No Ubuntu com ext4, o Timeshift com rsync é a melhor opção."]})]})}export{u as default};

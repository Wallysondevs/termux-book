import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function IOStat() {
    return (
      <PageContainer
        title="Monitoramento de Performance: iostat, top, htop"
        subtitle="Guia completo de ferramentas de monitoramento no Ubuntu: CPU, memória, disco, rede e processos em tempo real."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <p>
          Monitorar a performance do sistema é essencial para identificar gargalos, diagnosticar
          lentidão e planejar upgrades. O Ubuntu oferece diversas ferramentas para monitorar
          CPU, memória, disco e rede — desde as básicas como <strong>top</strong> até as
          avançadas como <strong>iostat</strong>, <strong>vmstat</strong> e <strong>sar</strong>.
        </p>

        <h2>1. iostat — Monitorar I/O de Disco e CPU</h2>
        <CodeBlock
          title="Usar o iostat para análise de disco"
          code={`# Instalar o sysstat (inclui iostat, sar, mpstat, etc.)
  sudo apt install -y sysstat

  # Habilitar coleta de dados do sysstat
  sudo sed -i 's/ENABLED="false"/ENABLED="true"/' /etc/default/sysstat
  sudo systemctl enable sysstat
  sudo systemctl start sysstat

  # Uso básico do iostat
  iostat
  # Mostra estatísticas de CPU e todos os discos

  # Atualizar a cada 2 segundos, 5 vezes
  iostat 2 5

  # Estatísticas estendidas de disco (mais detalhes)
  iostat -x
  # Colunas importantes:
  # r/s     → leituras por segundo
  # w/s     → escritas por segundo
  # rkB/s   → KB lidos por segundo
  # wkB/s   → KB escritos por segundo
  # await   → tempo médio de espera (ms) — alto = disco lento
  # %util   → utilização do disco — 100% = saturado

  # Apenas discos (sem CPU)
  iostat -d

  # Apenas CPU
  iostat -c

  # Estatísticas de um disco específico
  iostat -x sda 1
  # Atualiza a cada 1 segundo, mostrando apenas sda

  # Formato legível (MB ao invés de blocos)
  iostat -xm

  # Exemplo de interpretação:
  # Device   r/s   w/s   rkB/s   wkB/s  await  %util
  # sda      150   50    6000    2000    0.5    35%   ← Saudável
  # sda      500   200   20000   8000    15.0   98%   ← Gargalo!`}
        />

        <h2>2. top e htop — Monitorar Processos</h2>
        <CodeBlock
          title="Monitorar CPU, memória e processos"
          code={`# top — monitor de processos (já instalado)
  top
  # Teclas dentro do top:
  # P     → ordenar por CPU
  # M     → ordenar por memória
  # N     → ordenar por PID
  # k     → matar um processo (pede o PID)
  # r     → renice (mudar prioridade)
  # 1     → mostrar cada CPU individual
  # c     → mostrar comando completo
  # q     → sair

  # top com filtro de usuário
  top -u www-data

  # top mostrando apenas um processo
  top -p 1234

  # === htop (versão melhorada do top) ===
  sudo apt install -y htop
  htop
  # Teclas dentro do htop:
  # F2    → configurações
  # F3    → buscar processo
  # F4    → filtrar
  # F5    → modo árvore (mostra processos pai/filho)
  # F6    → ordenar por coluna
  # F9    → matar processo (selecione o sinal)
  # F10   → sair
  # Space → marcar processo
  # U     → desmarcar todos
  # t     → toggle tree view

  # === btop (versão mais bonita e moderna) ===
  sudo apt install -y btop
  btop
  # Interface gráfica no terminal com CPU, RAM, disco, rede

  # === glances (monitor completo) ===
  sudo apt install -y glances
  glances
  # Mostra tudo: CPU, RAM, disco, rede, containers Docker, etc.`}
        />

        <h2>3. vmstat — Estatísticas de Memória Virtual</h2>
        <CodeBlock
          title="Monitorar memória e swap"
          code={`# vmstat básico (atualizar a cada 1 segundo)
  vmstat 1
  # Saída:
  # procs ---memory--- ---swap-- ---io--- -system- ----cpu----
  # r  b   swpd   free   buff  cache   si   so    bi    bo  in   cs us sy id wa
  # 1  0      0 2048000 128000 512000   0    0   100    50 500  800 15  5 78  2

  # Colunas importantes:
  # r     → processos aguardando CPU (se > nCPUs, gargalo de CPU)
  # b     → processos bloqueados em I/O (se alto, gargalo de disco)
  # swpd  → swap usado (KB) — se alto, falta RAM
  # si/so → swap in/out — se > 0 constantemente, precisa de mais RAM
  # wa    → % CPU esperando I/O — se alto, disco é o gargalo

  # free — ver memória
  free -h
  # Saída:
  #               total    used    free    shared  buff/cache  available
  # Mem:          16Gi     4.2Gi   8.0Gi   256Mi   3.8Gi       11Gi
  # Swap:         4.0Gi    0B      4.0Gi

  # IMPORTANTE: "available" é a memória REAL disponível
  # "free" não conta buff/cache que pode ser liberado

  # Monitorar memória continuamente
  watch -n 1 free -h`}
        />

        <h2>4. Monitorar Rede</h2>
        <CodeBlock
          title="Ferramentas de monitoramento de rede"
          code={`# ss — ver conexões de rede (substituto do netstat)
  ss -tlnp              # TCP listening com PID
  ss -ulnp              # UDP listening com PID
  ss -s                 # Resumo de conexões
  ss -t state established  # Conexões TCP estabelecidas

  # iftop — tráfego de rede em tempo real
  sudo apt install -y iftop
  sudo iftop
  sudo iftop -i eth0    # Interface específica

  # nethogs — tráfego por processo
  sudo apt install -y nethogs
  sudo nethogs
  sudo nethogs eth0     # Interface específica

  # nload — gráfico de banda no terminal
  sudo apt install -y nload
  nload

  # iperf3 — teste de velocidade entre dois pontos
  sudo apt install -y iperf3
  # No servidor:
  iperf3 -s
  # No cliente:
  iperf3 -c IP_DO_SERVIDOR

  # Verificar velocidade da internet
  # (precisa de speedtest-cli ou curl)
  curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python3`}
        />

        <h2>5. sar — Dados Históricos de Performance</h2>
        <CodeBlock
          title="Analisar performance histórica"
          code={`# O sar (do pacote sysstat) coleta dados a cada 10 minutos
  # e armazena em /var/log/sysstat/

  # Ver uso de CPU hoje
  sar
  # Ou: sar -u

  # Ver uso de memória
  sar -r

  # Ver uso de disco
  sar -d

  # Ver dados de um dia específico (arquivos em /var/log/sysstat/)
  sar -u -f /var/log/sysstat/sa15   # Dia 15

  # Ver uso de rede
  sar -n DEV    # Por interface
  sar -n SOCK   # Sockets

  # Gerar relatório completo
  sar -A > relatorio-performance.txt

  # Ver load average
  sar -q
  # Se load > número de CPUs → sistema sobrecarregado

  # Ver swap usage ao longo do dia
  sar -S

  # dstat — alternativa moderna ao sar (tempo real)
  sudo apt install -y dstat
  dstat
  dstat -cdngy 5     # CPU, disco, rede, pages, sys a cada 5s`}
        />

        <h2>6. Monitorar Disco</h2>
        <CodeBlock
          title="Ferramentas para análise de uso de disco"
          code={`# df — espaço em disco por partição
  df -h
  df -h /home     # Apenas uma partição

  # du — espaço usado por diretório
  du -sh /var/log        # Tamanho total de /var/log
  du -sh /var/*          # Tamanho de cada subdiretório de /var
  du -sh /* 2>/dev/null | sort -rh | head -20   # Top 20 maiores

  # ncdu — du interativo (navegar por diretórios)
  sudo apt install -y ncdu
  ncdu /
  # Use setas para navegar, Enter para entrar, d para deletar

  # Encontrar arquivos grandes
  sudo find / -xdev -type f -size +100M -exec ls -lh {} \; 2>/dev/null | sort -k5 -rh

  # Monitorar I/O por processo
  sudo iotop
  sudo iotop -o    # Apenas processos com I/O ativo

  # Testar velocidade do disco
  # Escrita:
  dd if=/dev/zero of=/tmp/test bs=1M count=1024 oflag=dsync
  # Leitura:
  dd if=/tmp/test of=/dev/null bs=1M
  rm /tmp/test

  # fio — benchmark de disco profissional
  sudo apt install -y fio
  fio --name=test --ioengine=libaio --iodepth=32 --rw=randread --bs=4k --direct=1 --size=1G --runtime=30`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Diagnosticar lentidão do sistema"
          code={`# Sistema lento — checklist rápido:
  # 1. CPU sobrecarregada?
  uptime   # Load average > número de CPUs = problema
  htop     # Ver qual processo consome mais CPU

  # 2. Sem memória?
  free -h   # "available" < 10% = problema
  # Encontrar processos que usam mais memória:
  ps aux --sort=-%mem | head -10

  # 3. Disco saturado?
  iostat -x 1   # %util > 90% = gargalo
  # Disco cheio?
  df -h

  # 4. Rede lenta?
  sudo iftop     # Ver tráfego em tempo real
  ping -c 10 8.8.8.8  # Testar latência

  # 5. Muitos processos?
  ps aux | wc -l   # Contar processos
  # Matar processos zumbis:
  ps aux | grep Z

  # Comando "tudo em um" para diagnóstico rápido
  echo "=== LOAD ===" && uptime && echo "=== MEM ===" && free -h && echo "=== DISK ===" && df -h / && echo "=== TOP CPU ===" && ps aux --sort=-%cpu | head -5`}
        />

        <AlertBox type="info" title="Monitoramento em produção">
          Para servidores em produção, considere ferramentas de monitoramento contínuo como
          <strong>Prometheus + Grafana</strong>, <strong>Zabbix</strong> ou
          <strong>Netdata</strong>. Elas oferecem dashboards visuais, alertas automáticos
          e histórico de longo prazo.
        </AlertBox>
      </PageContainer>
    );
  }
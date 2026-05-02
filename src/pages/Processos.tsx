import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Processos() {
    return (
      <PageContainer
        title="Gerenciamento de Processos"
        subtitle="Guia completo de processos no Ubuntu: ps, top, htop, kill, nice, jobs, sinais, prioridade e monitoramento avançado."
        difficulty="iniciante"
        timeToRead="25 min"
      >
        <p>
          Todo programa em execução no Linux é um <strong>processo</strong>. Cada processo
          tem um <strong>PID</strong> (Process ID) único, um dono, prioridade e consome
          recursos (CPU, memória, I/O). Saber gerenciar processos é essencial para manter
          o sistema responsivo e resolver problemas de performance.
        </p>

        <h2>1. Ver Processos (ps)</h2>
        <CodeBlock
          title="Listar processos em execução"
          code={`# Ver seus processos
  ps
  # Saída: PID, TTY, TIME, CMD

  # Ver todos os processos do sistema
  ps aux
  # a = todos os usuários
  # u = formato de usuário (com CPU%, MEM%)
  # x = incluir processos sem terminal

  # Saída do ps aux:
  # USER   PID %CPU %MEM   VSZ   RSS TTY  STAT START TIME COMMAND
  # root     1  0.0  0.1 16920 10240 ?    Ss   10:00 0:01 /sbin/init

  # STAT (estado):
  # R = Rodando        S = Dormindo (esperando I/O)
  # D = Dormindo (não interrompível)
  # T = Parado (Ctrl+Z)
  # Z = Zombie (finalizado mas não coletado pelo pai)

  # Filtrar processos
  ps aux | grep nginx
  ps aux | grep -v grep | grep nginx  # Sem o próprio grep

  # Ver processos em árvore
  ps auxf              # Árvore com detalhes
  pstree               # Árvore visual
  pstree -p            # Com PIDs
  pstree -u usuario    # De um usuário

  # Formato customizado
  ps -eo pid,ppid,user,%cpu,%mem,comm --sort=-%cpu | head -15
  # -e = todos, -o = colunas customizadas

  # Ver threads de um processo
  ps -T -p 1234

  # Ver processos de um usuário
  ps -u usuario

  # Contar processos
  ps aux | wc -l`}
        />

        <h2>2. Monitoramento em Tempo Real</h2>
        <CodeBlock
          title="top, htop e btop"
          code={`# top — monitor básico (já instalado)
  top
  # Atalhos dentro do top:
  # P = ordenar por CPU
  # M = ordenar por memória
  # k = matar processo (pede PID)
  # q = sair
  # 1 = mostrar cada core da CPU
  # c = mostrar comando completo

  # htop — monitor interativo (muito melhor!)
  sudo apt install -y htop
  htop
  # Atalhos do htop:
  # F5 = modo árvore
  # F6 = ordenar
  # F9 = matar processo (escolher sinal)
  # F4 = filtrar
  # / = buscar
  # Setas + Enter = selecionar processo

  # btop — monitor moderno e bonito
  sudo apt install -y btop
  btop
  # Interface visual rica com gráficos de CPU, memória, rede e disco

  # Outras ferramentas de monitoramento
  watch -n 1 "ps aux --sort=-%cpu | head -10"   # Atualizar a cada 1s
  glances                  # Monitor avançado (pip install glances)
  nmon                     # Monitor IBM (sudo apt install nmon)`}
        />

        <h2>3. Sinais e Kill</h2>
        <CodeBlock
          title="Enviar sinais a processos"
          code={`# Listar todos os sinais
  kill -l

  # Sinais mais importantes:
  # SIGTERM (15) — Terminar educadamente (padrão)
  # SIGKILL (9)  — Matar forçadamente (não pode ser ignorado)
  # SIGHUP (1)   — Recarregar configuração
  # SIGSTOP (19) — Pausar processo
  # SIGCONT (18) — Continuar processo pausado
  # SIGINT (2)   — Interromper (Ctrl+C)
  # SIGTSTP (20) — Suspender (Ctrl+Z)

  # Matar processo por PID
  kill 1234           # SIGTERM (pede para terminar)
  kill -9 1234        # SIGKILL (forçar — último recurso!)
  kill -15 1234       # SIGTERM explícito

  # Matar por nome
  killall nginx       # Mata TODOS os processos chamados "nginx"
  killall -9 nginx    # Forçar

  # pkill — matar por padrão
  pkill firefox       # Mata processos que contêm "firefox"
  pkill -u usuario    # Mata todos os processos de um usuário
  pkill -f "python app.py"  # Buscar no comando completo (-f)

  # Recarregar configuração (sem matar)
  kill -HUP 1234      # Muitos daemons recarregam com SIGHUP
  sudo systemctl reload nginx  # Forma preferida para serviços

  # Encontrar PID de um processo
  pgrep nginx         # PIDs de processos chamados "nginx"
  pgrep -a nginx      # Com comando completo
  pidof nginx         # PID do processo exato`}
        />

        <h2>4. Prioridade (nice/renice)</h2>
        <CodeBlock
          title="Controlar prioridade de processos"
          code={`# Nice value: -20 (mais alta prioridade) a 19 (mais baixa)
  # Valor padrão: 0
  # Somente root pode usar valores negativos (aumentar prioridade)

  # Ver prioridade
  ps -eo pid,ni,comm | head -20
  top    # Coluna NI

  # Iniciar com prioridade baixa (não prejudica outros processos)
  nice -n 10 comando-pesado
  nice -n 19 tar czf backup.tar.gz /dados   # Menor prioridade

  # Iniciar com prioridade alta (precisa de root)
  sudo nice -n -10 processo-importante

  # Mudar prioridade de processo em execução
  renice 10 -p 1234          # Reduzir prioridade
  sudo renice -5 -p 1234    # Aumentar prioridade

  # Mudar prioridade de todos os processos de um usuário
  sudo renice 10 -u usuario`}
        />

        <h2>5. Jobs e Background</h2>
        <CodeBlock
          title="Controlar processos em background"
          code={`# Executar em background
  comando &
  sleep 300 &

  # Ctrl+Z — suspender processo atual
  # fg — retomar em foreground
  # bg — retomar em background

  # Listar jobs
  jobs
  jobs -l     # Com PIDs

  # Retomar job específico
  fg %1       # Job 1 em foreground
  bg %2       # Job 2 em background

  # Manter rodando após fechar terminal
  nohup comando &
  nohup ./script.sh > saida.log 2>&1 &

  # disown — desacoplar job do terminal
  ./processo-longo &
  disown %1

  # screen/tmux — sessões persistentes (melhor que nohup)
  sudo apt install -y tmux
  tmux new -s minha-sessao
  # Ctrl+B, D = desacoplar
  tmux attach -t minha-sessao
  tmux ls     # Listar sessões`}
        />

        <h2>6. Monitoramento Avançado</h2>
        <CodeBlock
          title="Ferramentas avançadas de monitoramento"
          code={`# Uso de CPU por core em tempo real
  mpstat -P ALL 1
  # (sudo apt install sysstat)

  # Estatísticas de I/O de disco
  iostat -x 1

  # Ver memória virtual e estatísticas do sistema
  vmstat 1 5     # Atualizar a cada 1s, 5 vezes

  # Ver quanta memória cada processo usa (ordenado)
  ps aux --sort=-%mem | head -20    # Top 20 por memória
  ps aux --sort=-%cpu | head -20    # Top 20 por CPU

  # Processos consumindo I/O de disco
  sudo iotop
  # (sudo apt install iotop-c)

  # Rastrear chamadas de sistema (debug avançado)
  strace -p 1234                    # Rastrear processo existente
  strace -c ls                      # Resumo de syscalls

  # /proc — informações em tempo real
  cat /proc/1234/status             # Status do processo
  cat /proc/1234/cmdline            # Comando que iniciou
  ls -la /proc/1234/fd/             # Arquivos abertos
  cat /proc/loadavg                 # Load average do sistema`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com processos"
          code={`# Processo não morre com kill
  # Tentar SIGTERM primeiro:
  kill 1234
  # Esperar 5 segundos, depois SIGKILL:
  kill -9 1234

  # Processo zombie (Z no ps)
  # Zombies são processos que terminaram mas o pai não coletou o status
  # Solução: matar o processo PAI
  ps -eo pid,ppid,stat,comm | grep Z
  # Encontrar o PPID e matar:
  kill -9 PPID

  # "Cannot allocate memory" (sem memória)
  free -h                   # Ver memória
  ps aux --sort=-%mem | head -10  # Quem está usando
  # Matar o processo que consome mais ou adicionar swap

  # Sistema lento — encontrar o culpado
  top     # Verificar CPU e memória
  # Processo com 100% CPU? Matar ou reduzir prioridade:
  renice 19 -p PID

  # Load average alto
  uptime
  # Load > número de cores = sistema sobrecarregado
  nproc    # Ver número de cores
  # Investigar com top/htop

  # Muitos processos de um serviço
  pgrep -c apache2    # Contar processos Apache
  # Se excessivo, ajustar configuração do serviço

  # Listar processos usando uma porta
  sudo ss -tlnp | grep :80
  sudo fuser -v 80/tcp

  # Listar processos usando um arquivo
  sudo fuser -mv /mnt/dados
  sudo lsof /var/log/syslog`}
        />

        <AlertBox type="info" title="Sinais: SIGTERM vs SIGKILL">
          Sempre use <code>kill</code> (SIGTERM) primeiro — ele permite que o processo
          salve dados e limpe recursos. Só use <code>kill -9</code> (SIGKILL) como
          <strong>último recurso</strong> — ele mata instantaneamente sem dar chance
          de cleanup, podendo causar corrupção de dados.
        </AlertBox>
      </PageContainer>
    );
  }
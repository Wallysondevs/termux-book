import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Cron() {
    return (
      <PageContainer
        title="Cron — Agendamento de Tarefas"
        subtitle="Guia completo do cron e systemd timers no Ubuntu: agendar tarefas automáticas, sintaxe do crontab, exemplos práticos e monitoramento."
        difficulty="intermediario"
        timeToRead="25 min"
      >
        <p>
          O <strong>cron</strong> é o agendador de tarefas padrão do Linux. Permite executar
          comandos e scripts automaticamente em horários e intervalos definidos — backups
          diários, limpeza de logs, sincronização de dados, relatórios semanais e qualquer
          tarefa que precise rodar periodicamente.
        </p>

        <h2>1. Sintaxe do Crontab</h2>
        <CodeBlock
          title="Entender a sintaxe do crontab"
          code={`# Formato: minuto hora dia-do-mês mês dia-da-semana comando
  #          ┌───── minuto (0-59)
  #          │ ┌───── hora (0-23)
  #          │ │ ┌───── dia do mês (1-31)
  #          │ │ │ ┌───── mês (1-12)
  #          │ │ │ │ ┌───── dia da semana (0-7, 0 e 7 = domingo)
  #          │ │ │ │ │
  #          * * * * *  comando

  # Caracteres especiais:
  # *     → qualquer valor
  # ,     → lista de valores (1,3,5)
  # -     → intervalo (1-5)
  # /     → passo (*/5 = a cada 5)

  # Exemplos de horários:
  # * * * * *          → a cada minuto
  # */5 * * * *        → a cada 5 minutos
  # 0 * * * *          → a cada hora (no minuto 0)
  # 0 */2 * * *        → a cada 2 horas
  # 30 8 * * *         → todos os dias às 8:30
  # 0 2 * * *          → todos os dias às 2:00 da manhã
  # 0 8,12,18 * * *    → às 8:00, 12:00 e 18:00
  # 0 9-17 * * *       → de hora em hora das 9 às 17
  # 0 2 * * 0          → todo domingo às 2:00
  # 0 2 * * 1-5        → de segunda a sexta às 2:00
  # 0 0 1 * *          → todo dia 1 à meia-noite
  # 0 0 1 1 *          → 1 de janeiro à meia-noite
  # 0 0 * * 1          → toda segunda à meia-noite

  # Atalhos especiais:
  # @reboot            → executar ao iniciar o sistema
  # @yearly            → 0 0 1 1 * (anual)
  # @monthly           → 0 0 1 * * (mensal)
  # @weekly            → 0 0 * * 0 (semanal)
  # @daily             → 0 0 * * * (diário)
  # @hourly            → 0 * * * * (horário)`}
        />

        <h2>2. Gerenciar o Crontab</h2>
        <CodeBlock
          title="Editar e gerenciar agendamentos"
          code={`# Editar o crontab do usuário atual
  crontab -e
  # Na primeira vez, escolha o editor (nano é mais fácil)

  # Ver os agendamentos atuais
  crontab -l

  # Remover todos os agendamentos
  crontab -r

  # Editar crontab de outro usuário (como root)
  sudo crontab -u www-data -e
  sudo crontab -u www-data -l

  # Editar o crontab do root
  sudo crontab -e

  # Exemplos práticos de agendamentos:

  # Backup diário às 2:00
  0 2 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1

  # Limpar logs semanalmente
  0 3 * * 0 find /var/log -name "*.log" -mtime +30 -delete

  # Verificar espaço em disco a cada hora
  0 * * * * df -h / | tail -1 | awk '{if ($5+0 > 80) print "ALERTA: Disco em " $5}' | mail -s "Alerta Disco" admin@email.com

  # Reiniciar serviço todo dia às 4:00
  0 4 * * * systemctl restart minha-app

  # Rodar script Python a cada 15 minutos
  */15 * * * * /usr/bin/python3 /opt/scripts/coleta-dados.py

  # Sincronizar dados com servidor remoto a cada 6 horas
  0 */6 * * * rsync -avz /dados/ usuario@servidor:/backup/dados/ >> /var/log/sync.log 2>&1

  # Ao iniciar o sistema
  @reboot /opt/scripts/startup.sh`}
        />

        <AlertBox type="warning" title="Cuidados com o cron">
          O cron executa comandos em um ambiente <strong>mínimo</strong> — variáveis como
          <code>PATH</code>, <code>HOME</code> e <code>LANG</code> podem não estar definidas.
          Sempre use caminhos absolutos nos comandos (ex: <code>/usr/bin/python3</code>
          ao invés de <code>python3</code>).
        </AlertBox>

        <h2>3. Dicas e Boas Práticas</h2>
        <CodeBlock
          title="Boas práticas para agendamentos"
          code={`# 1. Sempre redirecionar saída (senão gera emails)
  0 2 * * * /script.sh >> /var/log/script.log 2>&1
  # >> = append ao log
  # 2>&1 = redirecionar erros também

  # 2. Definir PATH no início do crontab
  PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
  SHELL=/bin/bash

  # 3. Definir variáveis de ambiente
  MAILTO=admin@email.com    # Enviar saída por email
  HOME=/home/usuario

  # 4. Usar lock para evitar execuções sobrepostas
  * * * * * flock -n /tmp/meu-script.lock /usr/local/bin/meu-script.sh
  # flock garante que só uma instância rode por vez

  # 5. Gerar logs com timestamp
  0 * * * * echo "[$(date)] Executando..." >> /var/log/meu-cron.log && /script.sh >> /var/log/meu-cron.log 2>&1

  # 6. Testar o comando ANTES de colocar no cron
  # Execute manualmente primeiro!

  # 7. Usar diretórios cron.d para scripts do sistema
  # /etc/cron.d/         → crontabs do sistema (formato com usuário)
  # /etc/cron.daily/     → scripts executados diariamente
  # /etc/cron.weekly/    → scripts executados semanalmente
  # /etc/cron.monthly/   → scripts executados mensalmente
  # /etc/cron.hourly/    → scripts executados de hora em hora

  # Para usar cron.daily (ex):
  sudo cp meu-script.sh /etc/cron.daily/meu-script
  sudo chmod +x /etc/cron.daily/meu-script
  # O script será executado automaticamente todo dia`}
        />

        <h2>4. Systemd Timers (Alternativa Moderna)</h2>
        <CodeBlock
          title="Usar systemd timers ao invés de cron"
          code={`# Systemd timers são mais modernos e oferecem:
  # - Logs integrados (journalctl)
  # - Dependências entre serviços
  # - Controle de recursos (CPU, memória)
  # - Execução com atraso aleatório (evitar picos)

  # Criar o serviço (o que será executado)
  sudo tee /etc/systemd/system/meu-backup.service > /dev/null << 'EOF'
  [Unit]
  Description=Backup automático diário

  [Service]
  Type=oneshot
  ExecStart=/usr/local/bin/backup.sh
  StandardOutput=journal
  StandardError=journal
  EOF

  # Criar o timer (quando será executado)
  sudo tee /etc/systemd/system/meu-backup.timer > /dev/null << 'EOF'
  [Unit]
  Description=Timer do backup diário

  [Timer]
  OnCalendar=*-*-* 02:00:00
  RandomizedDelaySec=1800
  Persistent=true

  [Install]
  WantedBy=timers.target
  EOF

  # Ativar e iniciar o timer
  sudo systemctl daemon-reload
  sudo systemctl enable meu-backup.timer
  sudo systemctl start meu-backup.timer

  # Verificar timers ativos
  systemctl list-timers --all

  # Ver quando o timer vai executar
  systemctl status meu-backup.timer

  # Ver logs da execução
  journalctl -u meu-backup.service

  # Executar manualmente (para testar)
  sudo systemctl start meu-backup.service`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com cron"
          code={`# Cron não executa o script
  # 1. Verificar se o serviço cron está rodando:
  sudo systemctl status cron

  # 2. Verificar logs do cron:
  grep CRON /var/log/syslog
  # Ou:
  journalctl -u cron --since "1 hour ago"

  # 3. Verificar permissões do script:
  ls -la /caminho/do/script.sh
  # Deve ter permissão de execução (chmod +x)

  # 4. Verificar se o PATH está correto:
  # Testar: which python3 → /usr/bin/python3
  # No cron, use o caminho completo

  # 5. Verificar se não está em /etc/cron.deny:
  cat /etc/cron.deny 2>/dev/null

  # Script funciona manualmente mas não no cron
  # Causa mais comum: variáveis de ambiente
  # Solução: Definir variáveis no script
  #!/bin/bash
  export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
  export HOME=/home/usuario

  # Cron envia muitos emails
  # Redirecionar saída para /dev/null:
  0 * * * * /script.sh > /dev/null 2>&1
  # Ou definir MAILTO="" no crontab`}
        />
      </PageContainer>
    );
  }
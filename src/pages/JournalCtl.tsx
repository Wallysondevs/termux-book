import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function JournalCtl() {
    return (
      <PageContainer
        title="journalctl — Logs do Sistema"
        subtitle="Guia completo do journalctl no Ubuntu: visualizar, filtrar, pesquisar e gerenciar logs do systemd, serviços, kernel e aplicações."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <p>
          O <strong>journalctl</strong> é a ferramenta para acessar os logs do systemd journal,
          o sistema centralizado de logs do Ubuntu. Ele captura logs do kernel, serviços systemd,
          aplicações e mensagens do sistema em um formato estruturado e indexado, permitindo
          buscas rápidas e filtros poderosos.
        </p>

        <h2>1. Visualizar Logs</h2>
        <CodeBlock
          title="Comandos básicos do journalctl"
          code={`# Ver todos os logs (do mais antigo ao mais recente)
  journalctl
  # Use Setas para navegar, Q para sair, / para buscar

  # Ver logs do boot atual
  journalctl -b
  # Boot anterior:
  journalctl -b -1
  # Dois boots atrás:
  journalctl -b -2

  # Listar boots disponíveis
  journalctl --list-boots
  # Saída:
  # -2 abc123... Seg 2024-07-13 08:00:00 — Seg 2024-07-13 23:59:59
  # -1 def456... Ter 2024-07-14 08:00:00 — Ter 2024-07-14 22:30:00
  #  0 ghi789... Qua 2024-07-15 08:00:00 — Qua 2024-07-15 14:30:00

  # Ver as últimas N linhas
  journalctl -n 50      # Últimas 50 linhas
  journalctl -n 100     # Últimas 100 linhas

  # Seguir logs em tempo real (como tail -f)
  journalctl -f
  # Ctrl+C para parar

  # Ver logs sem paginação (saída direta)
  journalctl --no-pager

  # Ver logs em formato JSON
  journalctl -o json
  journalctl -o json-pretty    # JSON formatado

  # Ver logs com timestamps curtos
  journalctl -o short-iso      # Formato ISO
  journalctl -o short-precise  # Com microssegundos`}
        />

        <h2>2. Filtrar por Serviço/Unidade</h2>
        <CodeBlock
          title="Filtrar logs por serviço systemd"
          code={`# Logs de um serviço específico
  journalctl -u nginx
  journalctl -u ssh
  journalctl -u postgresql
  journalctl -u docker

  # Logs de um serviço em tempo real
  journalctl -u nginx -f

  # Últimas 20 linhas de um serviço
  journalctl -u nginx -n 20

  # Combinar múltiplos serviços
  journalctl -u nginx -u php8.3-fpm

  # Logs do kernel (equivalente a dmesg)
  journalctl -k
  journalctl --dmesg

  # Logs de um processo específico (pelo PID)
  journalctl _PID=1234

  # Logs de um executável específico
  journalctl /usr/sbin/nginx

  # Logs de um usuário específico
  journalctl _UID=1000

  # Logs do grupo root
  journalctl _GID=0`}
        />

        <h2>3. Filtrar por Tempo</h2>
        <CodeBlock
          title="Filtrar logs por período"
          code={`# Logs desde uma data/hora específica
  journalctl --since "2024-07-15 10:00:00"

  # Logs até uma data/hora
  journalctl --until "2024-07-15 12:00:00"

  # Combinar desde e até (intervalo)
  journalctl --since "2024-07-15 10:00" --until "2024-07-15 12:00"

  # Formatos relativos de tempo
  journalctl --since "1 hour ago"
  journalctl --since "30 minutes ago"
  journalctl --since "2 days ago"
  journalctl --since yesterday
  journalctl --since today

  # Exemplos práticos:
  # "O que aconteceu na última hora?"
  journalctl --since "1 hour ago" -n 100

  # "Logs do Nginx de ontem"
  journalctl -u nginx --since yesterday --until today

  # "Erros do SSH nos últimos 30 minutos"
  journalctl -u ssh --since "30 min ago" -p err`}
        />

        <h2>4. Filtrar por Prioridade</h2>
        <CodeBlock
          title="Filtrar por nível de severidade"
          code={`# O journalctl usa os níveis de prioridade syslog:
  # 0 = emerg    → sistema inutilizável
  # 1 = alert    → ação imediata necessária
  # 2 = crit     → condições críticas
  # 3 = err      → condições de erro
  # 4 = warning  → condições de aviso
  # 5 = notice   → normal mas significativo
  # 6 = info     → informacional
  # 7 = debug    → mensagens de debug

  # Ver apenas erros e acima (emerg, alert, crit, err)
  journalctl -p err
  # Ou por nome:
  journalctl -p 3

  # Ver apenas erros críticos
  journalctl -p crit

  # Ver warnings e acima
  journalctl -p warning

  # Combinar com filtro de serviço e tempo
  journalctl -u nginx -p err --since "1 hour ago"

  # Contar erros por serviço
  journalctl -p err --since today -o json | grep -o '"_SYSTEMD_UNIT":"[^"]*"' | sort | uniq -c | sort -rn`}
        />

        <h2>5. Pesquisa e Grep</h2>
        <CodeBlock
          title="Buscar texto nos logs"
          code={`# Buscar por texto (grep integrado)
  journalctl -g "error"
  journalctl -g "Failed password"
  journalctl -g "Out of memory"

  # Busca case-insensitive
  journalctl -g "(?i)error"

  # Combinar grep com filtros
  journalctl -u ssh -g "Failed password" --since "1 hour ago"

  # Usar grep externo para filtros mais complexos
  journalctl -u nginx --no-pager | grep -i "502"
  journalctl --no-pager | grep -E "error|fail|crash"

  # Contar ocorrências
  journalctl -u ssh --no-pager | grep -c "Failed password"

  # Extrair IPs de tentativas de login falhadas
  journalctl -u ssh --no-pager | grep "Failed password" | grep -oP '\d+\.\d+\.\d+\.\d+' | sort | uniq -c | sort -rn

  # Ver logs de um container Docker
  journalctl CONTAINER_NAME=meu-container
  # Ou pelo ID:
  journalctl CONTAINER_ID=abc123`}
        />

        <h2>6. Gerenciar o Tamanho dos Logs</h2>
        <CodeBlock
          title="Controlar espaço em disco usado pelo journal"
          code={`# Ver quanto espaço os logs ocupam
  journalctl --disk-usage
  # Saída: Archived and active journals take up 2.3G in the file system.

  # Limpar logs antigos (manter últimos 7 dias)
  sudo journalctl --vacuum-time=7d

  # Limitar tamanho total dos logs (manter no máximo 500MB)
  sudo journalctl --vacuum-size=500M

  # Manter apenas os últimos N arquivos de log
  sudo journalctl --vacuum-files=5

  # Configurar limite permanente
  sudo nano /etc/systemd/journald.conf
  # Descomente e ajuste:
  # SystemMaxUse=500M        ← tamanho máximo no disco
  # SystemMaxFileSize=50M    ← tamanho máximo por arquivo
  # MaxRetentionSec=1month   ← tempo máximo de retenção
  # SystemKeepFree=1G        ← espaço mínimo livre no disco

  # Aplicar mudanças
  sudo systemctl restart systemd-journald

  # Verificar a configuração atual
  systemd-analyze cat-config systemd/journald.conf

  # Rotacionar logs manualmente
  sudo journalctl --rotate`}
        />

        <h2>7. Logs de Aplicações Específicas</h2>
        <CodeBlock
          title="Acessar logs de serviços comuns"
          code={`# === SSH / Login ===
  journalctl -u ssh -p err               # Erros do SSH
  journalctl -u ssh -g "Failed password"  # Tentativas de login falhadas
  journalctl -u ssh -g "Accepted"         # Logins bem-sucedidos

  # === Nginx/Apache ===
  journalctl -u nginx                    # Todos os logs do Nginx
  # Ou diretamente nos arquivos:
  sudo tail -f /var/log/nginx/access.log
  sudo tail -f /var/log/nginx/error.log

  # === Docker ===
  journalctl -u docker                   # Daemon do Docker
  docker logs nome-container             # Logs de um container

  # === PostgreSQL ===
  journalctl -u postgresql
  sudo tail -f /var/log/postgresql/postgresql-16-main.log

  # === Firewall (UFW) ===
  journalctl -g "UFW"
  journalctl -g "UFW BLOCK"

  # === Kernel / Hardware ===
  journalctl -k -p err                   # Erros do kernel
  journalctl -k -g "USB"                 # Dispositivos USB
  journalctl -k -g "error\|fail"        # Erros de hardware

  # === Cron ===
  journalctl -u cron
  journalctl -g "CRON"

  # === Rede ===
  journalctl -u NetworkManager
  journalctl -u systemd-networkd`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Diagnosticar problemas com journalctl"
          code={`# O servidor reiniciou sozinho — por quê?
  # Ver logs do boot anterior
  journalctl -b -1 -p err
  # Procurar por OOM Killer (sem memória):
  journalctl -b -1 -g "Out of memory"
  # Procurar por kernel panic:
  journalctl -b -1 -k -g "panic"

  # Serviço não inicia — diagnóstico
  journalctl -u meu-servico -n 50
  sudo systemctl status meu-servico

  # Quem fez login no sistema?
  journalctl -g "session opened" --since today
  journalctl -g "New session" --since today

  # Disco encheu — quem está escrevendo?
  journalctl --disk-usage
  sudo journalctl --vacuum-size=200M   # Limpar imediatamente

  # Logs não estão sendo gravados
  sudo systemctl status systemd-journald
  # Verificar permissões:
  ls -la /var/log/journal/
  # Se o diretório não existir (logs apenas em RAM):
  sudo mkdir -p /var/log/journal
  sudo systemd-tmpfiles --create --prefix /var/log/journal
  sudo systemctl restart systemd-journald

  # Exportar logs para arquivo (para enviar ao suporte)
  journalctl -b --since "1 hour ago" > logs-debug.txt
  journalctl -u nginx -p err --since today > nginx-errors.txt`}
        />

        <AlertBox type="info" title="journalctl vs arquivos de log tradicionais">
          O journalctl centraliza todos os logs, mas muitos serviços ainda escrevem em
          arquivos tradicionais em <code>/var/log/</code> (Nginx, Apache, MySQL). Para esses,
          use <code>tail -f</code> ou <code>less</code>. O journal captura stdout/stderr
          dos serviços systemd automaticamente.
        </AlertBox>
      </PageContainer>
    );
  }
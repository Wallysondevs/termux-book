import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Systemd() {
  return (
    <PageContainer
      title="Serviços no Termux (sem systemd)"
      subtitle="Termux NÃO usa systemd. Aprenda termux-services (runit/sv), tmux, nohup e Termux:Boot para gerenciar processos longos e auto-start."
      difficulty="intermediario"
      timeToRead="20 min"
    >
      <AlertBox type="danger" title="Termux NÃO usa systemd">
        O Android não tem <code>systemd</code> e o Termux roda sem PID 1 próprio — ele
        é apenas um processo de usuário. Esqueça <code>systemctl</code>,{" "}
        <code>journalctl</code>, units <code>.service</code>/<code>.timer</code>,
        targets, <code>networkd</code>, <code>resolved</code> etc. No Termux usamos:
        <ul>
          <li><strong>termux-services</strong> (baseado em <em>runit</em>) para serviços com supervisão e auto-restart;</li>
          <li><strong>tmux</strong> para manter shells/processos vivos depois de fechar o app;</li>
          <li><strong>Termux:Boot</strong> (app companheiro) para rodar scripts no boot do celular;</li>
          <li><strong>nohup</strong> / <strong>disown</strong> / <strong>&amp;</strong> para colocar processos em background.</li>
        </ul>
      </AlertBox>

      <p>
        No Linux desktop você dá <code>systemctl enable nginx</code> e pronto.
        No Termux o ciclo de vida é diferente: o sistema operacional é o Android,
        que mata processos quando precisa de RAM, e cada vez que você fecha o
        app Termux todos os filhos do shell são encerrados. Para conviver com
        isso existe um conjunto pequeno de ferramentas — vamos ver cada uma.
      </p>

      <h2>1. termux-services (runit)</h2>

      <p>
        O pacote <code>termux-services</code> traz o supervisor <em>runit</em>{" "}
        adaptado para o Termux. Cada serviço fica em{" "}
        <code>$PREFIX/var/service/NOME/</code> com um script <code>run</code> que
        executa o programa em primeiro plano. O <code>runsv</code> mantém o
        processo vivo, reinicia em caso de falha e roteia logs.
      </p>

      <CodeBlock
        title="Instalando e iniciando o supervisor"
        code={`pkg install termux-services

# Ative o supervisor de serviços (sv) — ele sobe junto com o shell.
# Feche e abra o Termux uma vez OU rode:
source $PREFIX/etc/profile.d/start-services.sh`}
      />

      <p>
        Pacotes como <code>openssh</code>, <code>postgresql</code>,{" "}
        <code>mariadb</code>, <code>nginx</code>, <code>cronie</code> e{" "}
        <code>tor</code> já vêm com diretório de serviço pronto.
      </p>

      <CodeBlock
        title="Habilitando, iniciando e parando serviços"
        code={`pkg install openssh

# Habilita (cria symlink em $PREFIX/var/service/sshd)
sv-enable sshd

# Comandos do sv (equivalentes ao systemctl):
sv up sshd          # start
sv down sshd        # stop
sv restart sshd     # restart
sv status sshd      # status -> "run: sshd: (pid 1234) 12s"

# Lista todos os serviços conhecidos:
ls $PREFIX/var/service/

# Desabilita (remove o symlink)
sv-disable sshd`}
      />

      <CodeBlock
        title="Logs dos serviços"
        code={`# runit grava em $PREFIX/var/log/sv/NOME/current
tail -f $PREFIX/var/log/sv/sshd/current`}
      />

      <h2>2. Criando um serviço próprio</h2>

      <p>
        Basta criar um diretório com um script <code>run</code> executável que
        rode o programa em <strong>foreground</strong> (sem <code>&amp;</code>).
        O <code>runsv</code> cuida do resto.
      </p>

      <CodeBlock
        title="Exemplo: monitor de site simples"
        code={`mkdir -p $PREFIX/var/service/site-monitor/log

cat > $PREFIX/var/service/site-monitor/run <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
exec 2>&1
URL="https://meusite.com"
while true; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$URL")
  echo "$(date '+%F %T') $URL -> $CODE"
  sleep 30
done
EOF
chmod +x $PREFIX/var/service/site-monitor/run

# Log opcional via svlogd
cat > $PREFIX/var/service/site-monitor/log/run <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
exec svlogd -tt $PREFIX/var/log/sv/site-monitor
EOF
chmod +x $PREFIX/var/service/site-monitor/log/run

sv up site-monitor
sv status site-monitor`}
      />

      <AlertBox type="info" title="Por que foreground?">
        Diferente do systemd, o runit assume que o processo NÃO se daemoniza.
        Se o seu binário tem flag <code>--daemon</code>/<code>-D</code>,
        DESLIGUE — o <code>runsv</code> precisa do PID real para supervisionar.
        Por isso o <code>nginx</code> roda com <code>daemon off;</code> no
        <code>nginx.conf</code> embaixo do supervisor.
      </AlertBox>

      <h2>3. tmux — sessões persistentes</h2>

      <p>
        O Termux pode ser fechado pelo Android a qualquer momento. Para
        processos interativos longos (compilar algo, rodar Python, baixar
        torrent) use <code>tmux</code>: a sessão fica viva mesmo quando você
        fecha a janela do Termux (desde que o app continue rodando em
        background).
      </p>

      <CodeBlock
        title="Fluxo básico do tmux"
        code={`pkg install tmux

tmux new -s trabalho       # cria sessão chamada "trabalho"
# ... rode seus comandos ...
# Detach:  Ctrl-b  d
tmux ls                    # lista sessões
tmux attach -t trabalho    # reanexa
tmux kill-session -t trabalho`}
      />

      <AlertBox type="warning" title="Wake lock para o Android não matar">
        Mesmo dentro do tmux, o Android pode suspender o Termux. Ative o wake
        lock pelo notificação do app ou rode <code>termux-wake-lock</code> (do
        pacote <code>termux-api</code>). Para liberar:{" "}
        <code>termux-wake-unlock</code>.
      </AlertBox>

      <h2>4. nohup, disown e background</h2>

      <p>
        Para um único comando que precisa sobreviver ao fim da sessão atual
        (mas você não quer um serviço completo), use background tradicional:
      </p>

      <CodeBlock
        title="Background simples"
        code={`# Roda em background imediatamente
python servidor.py &

# nohup: ignora SIGHUP quando o shell sai, redireciona stdout/stderr
nohup python servidor.py > server.log 2>&1 &

# disown: remove um job já em background da tabela do shell
python servidor.py &
disown %1

# Lista jobs
jobs -l`}
      />

      <h2>5. Termux:Boot — auto-start ao ligar o celular</h2>

      <p>
        O Android não chama nada do Termux automaticamente. Para rodar scripts
        quando o aparelho liga, instale o app companheiro{" "}
        <strong>Termux:Boot</strong> (F-Droid). Ele executa todo arquivo
        executável dentro de <code>~/.termux/boot/</code> logo após o boot.
      </p>

      <CodeBlock
        title="Auto-start de termux-services no boot"
        code={`mkdir -p ~/.termux/boot

# Mantém CPU acordada e sobe o supervisor de serviços
cat > ~/.termux/boot/start-services <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock
sv-enable sshd
EOF
chmod +x ~/.termux/boot/start-services`}
      />

      <AlertBox type="info" title="Termux:Boot precisa de permissão">
        Abra o app Termux:Boot UMA vez depois de instalar — sem isso, o Android
        não dispara o BOOT_COMPLETED para ele. Em fabricantes como Xiaomi/Oppo
        habilite "Autostart" nas configurações do app, senão o sistema bloqueia.
      </AlertBox>

      <h2>6. Tarefas agendadas (substituto do systemd timer)</h2>

      <p>
        Não há <code>systemd-timer</code>. As opções são:
      </p>

      <ul>
        <li>
          <strong>cronie</strong> + termux-services:{" "}
          <code>pkg install cronie</code>, <code>sv-enable crond</code>, edite
          com <code>crontab -e</code>.
        </li>
        <li>
          <strong>termux-job-scheduler</strong> (do pacote{" "}
          <code>termux-api</code>): usa o <em>JobScheduler</em> do Android, que
          é o jeito “certo” no Android moderno e respeita Doze mode.
        </li>
        <li>
          <strong>Tasker</strong> (pago, Play Store) chamando scripts via
          intent <code>RUN_COMMAND</code>.
        </li>
      </ul>

      <CodeBlock
        title="Exemplo com termux-job-scheduler"
        code={`pkg install termux-api

# Roda backup.sh a cada 6h, mesmo com tela apagada
termux-job-scheduler \\
  --script ~/scripts/backup.sh \\
  --period-ms 21600000 \\
  --persisted true

# Lista jobs ativos
termux-job-scheduler --pending

# Cancela
termux-job-scheduler --cancel-all`}
      />

      <h2>7. Tabela de equivalências systemd → Termux</h2>

      <CodeBlock
        title="Cheat sheet"
        code={`systemctl start X            ->  sv up X
systemctl stop X             ->  sv down X
systemctl restart X          ->  sv restart X
systemctl status X           ->  sv status X
systemctl enable X           ->  sv-enable X
systemctl disable X          ->  sv-disable X
systemctl daemon-reload      ->  (não existe — sv recarrega sozinho)
journalctl -u X              ->  tail -f $PREFIX/var/log/sv/X/current
systemd-timer / cron         ->  cronie OU termux-job-scheduler
auto-start no boot           ->  ~/.termux/boot/  (app Termux:Boot)
nohup / disown               ->  iguais
processo longo interativo    ->  tmux`}
      />

      <AlertBox type="success" title="Resumo">
        <ol>
          <li>Não procure systemd — ele não existe e não vai existir no Android sem root.</li>
          <li>Para serviços supervisionados: <code>termux-services</code> + <code>sv</code>.</li>
          <li>Para sessões interativas que sobrevivem: <code>tmux</code> + wake lock.</li>
          <li>Para auto-start no boot: app <code>Termux:Boot</code> + <code>~/.termux/boot/</code>.</li>
          <li>Para agendar: <code>cronie</code> (simples) ou <code>termux-job-scheduler</code> (correto no Android).</li>
        </ol>
      </AlertBox>
    </PageContainer>
  );
}

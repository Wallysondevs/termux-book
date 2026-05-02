import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AppImage() {
  return (
    <PageContainer
      title="Termux:Boot — Auto-iniciar scripts"
      subtitle="Como rodar scripts automaticamente quando o Android termina de bootar: sshd, túneis SSH, cron substituto, sincronizações."
      difficulty="iniciante"
      timeToRead="20 min"
    >
      <AlertBox type="info" title="AppImage não roda no Termux">
        AppImages são binários ELF para Linux desktop x86_64 e <strong>não funcionam no Android/Termux</strong>
        (arquitetura ARM, sem FUSE de userspace, sem glibc). O equivalente prático para
        "executar algo automaticamente" no Termux é o app <strong>Termux:Boot</strong> com a pasta
        <code>~/.termux/boot/</code>, que executa scripts no boot do celular.
      </AlertBox>

      <h2>1. Instalar Termux:Boot</h2>
      <p>
        O Termux:Boot é um app Android complementar instalado pelo F-Droid. Ele recebe o
        broadcast <code>BOOT_COMPLETED</code> do Android e roda os scripts colocados em
        <code> ~/.termux/boot/</code>.
      </p>
      <CodeBlock
        title="Setup inicial"
        code={`# 1. Instale "Termux:Boot" pelo F-Droid
#    https://f-droid.org/packages/com.termux.boot/

# 2. Abra o app Termux:Boot UMA VEZ (essencial!).
#    Sem isso, o Android nunca dá a permissão de iniciar no boot.

# 3. No Termux, crie a pasta de scripts:
mkdir -p ~/.termux/boot

# 4. Coloque scripts executáveis dentro dela.
#    Eles rodam em ordem alfabética, em background, ao ligar o celular.`}
      />

      <AlertBox type="warning" title="Wake-lock é importante">
        O Android adormece a CPU agressivamente. Se quiser que serviços (sshd, túneis) continuem
        rodando, ative o wake-lock: <code>termux-wake-lock</code> no início do script
        e <code>termux-wake-unlock</code> quando terminar (ou nunca, se for daemon contínuo).
      </AlertBox>

      <h2>2. Exemplo: iniciar sshd no boot</h2>
      <CodeBlock
        title="~/.termux/boot/01-sshd"
        code={`#!/data/data/com.termux/files/usr/bin/sh
# Garante que o pacote esteja instalado: pkg install openssh
termux-wake-lock
sshd`}
      />
      <CodeBlock
        title="Tornar executável"
        code={`chmod +x ~/.termux/boot/01-sshd

# Verificar:
ls -l ~/.termux/boot/

# Testar manualmente sem reiniciar:
sh ~/.termux/boot/01-sshd
logcat -s 'Termux-Boot' &   # ver os logs (precisa permissão)`}
      />

      <h2>3. Exemplo: túnel SSH reverso para acessar de fora</h2>
      <p>
        Se você tem um servidor (VPS) na nuvem, dá para abrir um túnel reverso e acessar
        o celular de qualquer lugar — mesmo atrás de NAT/4G.
      </p>
      <CodeBlock
        title="~/.termux/boot/02-tunnel"
        code={`#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock

# Reabre o túnel automaticamente se cair (autossh é o ideal: pkg install autossh)
while true; do
  ssh -N -R 2222:localhost:8022 \\
      -o ServerAliveInterval=30 \\
      -o ExitOnForwardFailure=yes \\
      usuario@meu-vps.exemplo.com
  sleep 10
done`}
      />
      <p>
        No VPS, basta rodar <code>ssh -p 2222 usuario_termux@localhost</code> para entrar no
        celular.
      </p>

      <h2>4. Exemplo: substituto de cron</h2>
      <p>
        Termux não tem <code>cron</code> nativo (sem <code>systemd</code> e sem permissão para
        <code>cron</code> rodar como daemon do sistema). A combinação Termux:Boot + loop com
        <code> sleep</code> resolve a maioria dos casos.
      </p>
      <CodeBlock
        title="~/.termux/boot/03-cron"
        code={`#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock

while true; do
  # Roda backup todo dia às 03:00
  hora=$(date +%H:%M)
  if [ "$hora" = "03:00" ]; then
    tar czf ~/storage/shared/backup-$(date +%F).tgz "$PREFIX"
  fi
  sleep 60
done`}
      />
      <p>
        Para rotinas mais sofisticadas, instale <code>cronie</code> da fonte ou use o app
        <strong> Tasker</strong> + <strong>Termux:Tasker</strong>.
      </p>

      <h2>5. Exemplo: sincronizar com a nuvem ao ligar</h2>
      <CodeBlock
        title="~/.termux/boot/04-rclone-sync"
        code={`#!/data/data/com.termux/files/usr/bin/sh
# Requer: pkg install rclone  (e rclone config feito antes)
termux-wake-lock
sleep 30   # aguarda a rede estabilizar

rclone sync ~/storage/shared/Documents gdrive:Backup/Documents \\
  --log-file ~/rclone.log

termux-wake-unlock`}
      />

      <h2>Boas práticas</h2>
      <AlertBox type="warning" title="Cuidado">
        <ul className="mt-1 mb-0 list-disc pl-5">
          <li>Sempre dê <code>chmod +x</code>. Sem permissão, o script é silenciosamente ignorado.</li>
          <li>Use shebang absoluto: <code>#!/data/data/com.termux/files/usr/bin/sh</code> (ou <code>bash</code>).</li>
          <li>Prefixe com números (<code>01-</code>, <code>02-</code>) para controlar ordem.</li>
          <li>Não rode comandos que pedem interação (ex: <code>pkg install</code> sem <code>-y</code>).</li>
          <li>Logue para arquivo: <code>... &gt;&gt; ~/boot.log 2&gt;&amp;1</code> ajuda a debugar.</li>
        </ul>
      </AlertBox>
    </PageContainer>
  );
}

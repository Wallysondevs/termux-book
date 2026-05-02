import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Boot() {
    return (
      <PageContainer
        title="Processo de Boot do Ubuntu"
        subtitle="Guia completo do boot no Ubuntu: UEFI vs BIOS, GRUB, systemd, targets, serviços de inicialização e recuperação."
        difficulty="avancado"
        timeToRead="25 min"
      >
        <p>
          Entender o processo de boot é essencial para diagnosticar problemas de
          inicialização, configurar dual boot, otimizar o tempo de boot e recuperar
          sistemas que não iniciam. O Ubuntu usa GRUB como bootloader e systemd para
          gerenciar serviços.
        </p>

        <h2>1. Sequência de Boot</h2>
        <CodeBlock
          title="Etapas do boot do Ubuntu"
          code={`# Sequência completa de boot:
  # 1. UEFI/BIOS → firmware do computador
  # 2. GRUB → bootloader (escolhe qual kernel carregar)
  # 3. Kernel Linux → carrega drivers, monta root filesystem
  # 4. initramfs → sistema de arquivos temporário na RAM
  # 5. systemd (PID 1) → inicia serviços na ordem correta
  # 6. Login (GDM/TTY) → tela de login

  # Ver tempo de boot
  systemd-analyze
  # Saída: Startup finished in 3.2s (firmware) + 2.1s (loader) +
  #        4.5s (kernel) + 8.3s (userspace) = 18.1s

  # Ver serviços mais lentos
  systemd-analyze blame
  # Lista serviços por tempo de inicialização

  # Grafo visual do boot
  systemd-analyze plot > boot.svg
  # Abre no navegador para ver visualmente

  # Ver árvore de dependências
  systemd-analyze critical-chain

  # Mensagens de boot
  dmesg                      # Mensagens do kernel
  journalctl -b              # Logs do boot atual
  journalctl -b -1           # Logs do boot anterior`}
        />

        <h2>2. GRUB (Bootloader)</h2>
        <CodeBlock
          title="Configurar o GRUB"
          code={`# Arquivo de configuração
  sudo nano /etc/default/grub

  # Opções importantes:
  # GRUB_TIMEOUT=5              → Tempo de espera (segundos)
  # GRUB_DEFAULT=0              → Entrada padrão (0 = primeira)
  # GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"  → Parâmetros do kernel
  # GRUB_DISABLE_OS_PROBER=false → Detectar outros SOs (dual boot)

  # Após alterar, atualizar:
  sudo update-grub

  # Mostrar menu GRUB (útil para dual boot)
  # Editar /etc/default/grub:
  # GRUB_TIMEOUT_STYLE=menu
  # GRUB_TIMEOUT=10
  sudo update-grub

  # Acessar menu GRUB no boot:
  # Pressione ESC ou Shift durante o boot

  # Modo recovery (via GRUB):
  # No menu GRUB → Advanced options → Recovery mode

  # Reinstalar GRUB (se não inicia)
  # Bootar de USB live, depois:
  sudo mount /dev/sda2 /mnt
  sudo mount /dev/sda1 /mnt/boot/efi    # Se UEFI
  sudo grub-install --root-directory=/mnt /dev/sda
  sudo chroot /mnt update-grub`}
        />

        <h2>3. Systemd Targets</h2>
        <CodeBlock
          title="Targets (equivalente a runlevels)"
          code={`# Targets substituem os antigos runlevels:
  # poweroff.target    → Desligar (runlevel 0)
  # rescue.target      → Modo single-user (runlevel 1)
  # multi-user.target  → Multiusuário sem GUI (runlevel 3)
  # graphical.target   → Com interface gráfica (runlevel 5)
  # reboot.target      → Reiniciar (runlevel 6)

  # Ver target atual
  systemctl get-default
  # Saída: graphical.target (desktop) ou multi-user.target (servidor)

  # Mudar target padrão
  sudo systemctl set-default multi-user.target    # Sem GUI
  sudo systemctl set-default graphical.target     # Com GUI

  # Mudar target agora (sem reiniciar)
  sudo systemctl isolate multi-user.target    # Desligar GUI
  sudo systemctl isolate graphical.target     # Ligar GUI

  # Modo emergência (mínimo, root filesystem read-only)
  sudo systemctl isolate emergency.target`}
        />

        <h2>4. Gerenciar Serviços de Boot</h2>
        <CodeBlock
          title="Controlar o que inicia no boot"
          code={`# Listar serviços habilitados
  systemctl list-unit-files --state=enabled

  # Desabilitar serviço do boot
  sudo systemctl disable nome-do-servico
  # O serviço NÃO será deletado, apenas não inicia no boot

  # Habilitar serviço no boot
  sudo systemctl enable nome-do-servico

  # Mascarar serviço (impedir completamente de iniciar)
  sudo systemctl mask nome-do-servico
  sudo systemctl unmask nome-do-servico

  # Ver dependências de um serviço
  systemctl list-dependencies nginx.service

  # Criar serviço customizado
  sudo tee /etc/systemd/system/meuapp.service > /dev/null << 'EOF'
  [Unit]
  Description=Minha Aplicação
  After=network.target

  [Service]
  Type=simple
  User=www-data
  WorkingDirectory=/opt/meuapp
  ExecStart=/usr/bin/python3 app.py
  Restart=on-failure
  RestartSec=5

  [Install]
  WantedBy=multi-user.target
  EOF

  sudo systemctl daemon-reload
  sudo systemctl enable --now meuapp`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns de boot"
          code={`# Ubuntu não inicia (tela preta)
  # 1. No GRUB, editar entrada (pressione 'e')
  # 2. Na linha "linux", trocar "quiet splash" por "nomodeset"
  # 3. Pressione Ctrl+X para iniciar
  # 4. Se funcionar, editar /etc/default/grub permanentemente

  # Boot muito lento
  systemd-analyze blame    # Ver o que está demorando
  # Desabilitar serviços desnecessários:
  sudo systemctl disable snap.lxd.daemon.service
  sudo systemctl disable ModemManager.service

  # "A start job is running for..." (demora 90s)
  # Geralmente é rede. Verificar:
  systemctl status systemd-networkd-wait-online.service

  # GRUB não aparece (dual boot)
  sudo os-prober               # Detectar outros SOs
  sudo update-grub

  # Modo recovery via GRUB:
  # GRUB → Advanced options → Recovery mode → root shell
  # Remontar filesystem como escrita:
  mount -o remount,rw /
  # Fazer os reparos necessários

  # Kernel panic
  # Geralmente hardware com defeito ou módulo do kernel quebrado
  # Bootar com kernel anterior via GRUB

  # Verificar logs do boot anterior (se o boot anterior falhou):
  journalctl -b -1 --no-pager | grep -i error`}
        />

        <AlertBox type="info" title="Otimizar tempo de boot">
          Desabilite serviços desnecessários com <code>systemctl disable</code>,
          use SSD (faz a maior diferença), e considere usar
          <code>systemd-analyze blame</code> para encontrar gargalos.
        </AlertBox>
      </PageContainer>
    );
  }
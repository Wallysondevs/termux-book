import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Localizacao() {
    return (
      <PageContainer
        title="Localização, Idioma e Fuso Horário"
        subtitle="Configurar idioma do sistema, layout de teclado, fuso horário, formatos de data/moeda e locale no Ubuntu para português brasileiro."
        difficulty="iniciante"
        timeToRead="25 min"
      >
        <p>
          A <strong>localização</strong> (locale) define como o sistema exibe datas, números,
          moeda, idioma de menus e mensagens de erro. No Ubuntu, isso é controlado por variáveis
          de ambiente que seguem o padrão POSIX. Configurar corretamente a localização garante
          que o sistema funcione em português brasileiro, com formato de data dd/mm/aaaa,
          moeda R$ e teclado ABNT2.
        </p>

        <h2>1. Verificar e Configurar o Locale</h2>
        <CodeBlock
          title="Gerenciar locale do sistema"
          code={`# Ver todas as configurações de locale atuais
  locale
  # Saída:
  # LANG=pt_BR.UTF-8
  # LC_CTYPE="pt_BR.UTF-8"
  # LC_NUMERIC=pt_BR.UTF-8
  # LC_TIME=pt_BR.UTF-8
  # LC_COLLATE="pt_BR.UTF-8"
  # LC_MONETARY=pt_BR.UTF-8
  # LC_MESSAGES="pt_BR.UTF-8"
  # LC_ALL=

  # O que cada variável controla:
  # LANG         → idioma padrão (afeta tudo que não tem LC_* específico)
  # LC_CTYPE     → classificação de caracteres (maiúscula, acentos)
  # LC_NUMERIC   → formato de números (1.000,50 vs 1,000.50)
  # LC_TIME      → formato de data e hora (dd/mm/aaaa vs mm/dd/yyyy)
  # LC_COLLATE   → ordenação de strings (á depois de a ou no final?)
  # LC_MONETARY  → formato de moeda (R$ 1.000,50 vs $1,000.50)
  # LC_MESSAGES  → idioma das mensagens do sistema
  # LC_ALL       → sobrescreve TODAS as outras (usar com cuidado)

  # Listar locales disponíveis no sistema
  locale -a
  # Saída: C, C.UTF-8, en_US.UTF-8, pt_BR.UTF-8, POSIX, ...

  # Gerar um novo locale (se não existir)
  sudo locale-gen pt_BR.UTF-8
  sudo locale-gen en_US.UTF-8

  # Reconstruir os locales
  sudo dpkg-reconfigure locales
  # Interface interativa para selecionar os locales desejados

  # Definir o locale padrão do sistema
  sudo update-locale LANG=pt_BR.UTF-8
  # Isso edita o arquivo /etc/default/locale

  # Aplicar imediatamente (sem reiniciar)
  export LANG=pt_BR.UTF-8
  source /etc/default/locale

  # Instalar pacote de idioma completo (GUI + corretor ortográfico)
  sudo apt install -y language-pack-pt language-pack-gnome-pt
  sudo apt install -y hunspell-pt-br    # Corretor ortográfico`}
        />

        <AlertBox type="info" title="UTF-8 é essencial">
          Sempre use locales com <code>.UTF-8</code> (ex: <code>pt_BR.UTF-8</code>).
          UTF-8 suporta todos os caracteres do português (ç, ã, é, ü, etc.) e emojis.
          Locales sem UTF-8 podem causar problemas com acentos e caracteres especiais.
        </AlertBox>

        <h2>2. Configurar o Fuso Horário</h2>
        <CodeBlock
          title="Gerenciar fuso horário com timedatectl"
          code={`# Ver a configuração atual de data/hora
  timedatectl
  # Saída:
  #                Local time: Seg 2024-07-15 14:30:00 -03
  #            Universal time: Seg 2024-07-15 17:30:00 UTC
  #                  RTC time: Seg 2024-07-15 17:30:00
  #                 Time zone: America/Sao_Paulo (-03, -0300)
  # System clock synchronized: yes
  #               NTP service: active

  # Listar fusos horários disponíveis
  timedatectl list-timezones
  # São mais de 400 — filtrar:
  timedatectl list-timezones | grep America
  timedatectl list-timezones | grep Sao_Paulo

  # Definir o fuso horário
  sudo timedatectl set-timezone America/Sao_Paulo
  # Outros fusos do Brasil:
  # America/Sao_Paulo     → Brasília, SP, RJ, MG, RS, PR, SC (UTC-3)
  # America/Manaus        → Amazonas, Rondônia, Roraima (UTC-4)
  # America/Belem         → Pará, Amapá, Tocantins (UTC-3)
  # America/Recife        → Nordeste (UTC-3)
  # America/Cuiaba        → Mato Grosso, Mato Grosso do Sul (UTC-4)
  # America/Rio_Branco    → Acre (UTC-5)
  # America/Noronha       → Fernando de Noronha (UTC-2)

  # Habilitar sincronização NTP (relógio automático pela internet)
  sudo timedatectl set-ntp true

  # Ver o status do NTP
  timedatectl show-timesync --all

  # Definir data/hora manualmente (desabilita NTP)
  sudo timedatectl set-ntp false
  sudo timedatectl set-time "2024-07-15 14:30:00"

  # Instalar e configurar o chrony (NTP mais moderno)
  sudo apt install -y chrony
  sudo systemctl enable chrony
  chronyc tracking    # Ver status de sincronização
  chronyc sources     # Ver servidores NTP em uso`}
        />

        <h2>3. Configurar o Layout do Teclado</h2>
        <CodeBlock
          title="Configurar teclado ABNT2 e outros layouts"
          code={`# Ver a configuração atual do teclado
  localectl
  # Saída:
  # System Locale: LANG=pt_BR.UTF-8
  #    VC Keymap: (unset)
  #   X11 Layout: br
  #   X11 Model: pc105

  # Listar layouts de teclado disponíveis
  localectl list-keymaps        # Para console (TTY)
  localectl list-x11-keymap-layouts  # Para interface gráfica

  # Definir layout do teclado
  # ABNT2 (teclado brasileiro padrão):
  sudo localectl set-x11-keymap br pc105
  # Teclado US Internacional (com dead keys para acentos):
  sudo localectl set-x11-keymap us pc105 intl
  # Teclado US básico:
  sudo localectl set-x11-keymap us pc105

  # Configurar layout para o console (TTY, sem interface gráfica)
  sudo localectl set-keymap br-abnt2

  # Alternar entre layouts via interface gráfica:
  # Configurações → Região e Idioma → Fontes de Entrada
  # Adicione os layouts desejados
  # Use Super+Espaço para alternar entre eles

  # Configurar via arquivo (persistente)
  sudo nano /etc/default/keyboard
  # XKBLAYOUT="br"
  # XKBMODEL="pc105"
  # XKBVARIANT=""
  # XKBOPTIONS="terminate:ctrl_alt_bksp"

  # Aplicar mudanças sem reiniciar
  sudo dpkg-reconfigure keyboard-configuration
  sudo setupcon`}
        />

        <h2>4. Formatos de Data, Número e Moeda</h2>
        <CodeBlock
          title="Personalizar formatos regionais"
          code={`# Testar como diferentes locales formatam dados
  # Data:
  LC_TIME=pt_BR.UTF-8 date
  # Saída: Seg 15 Jul 2024 14:30:00 -03

  LC_TIME=en_US.UTF-8 date
  # Saída: Mon Jul 15 2024 02:30:00 PM EDT

  # Números:
  printf "%'.2f\n" 1234567.89
  # Com pt_BR: 1.234.567,89
  # Com en_US: 1,234,567.89

  # Moeda:
  locale -k LC_MONETARY | head -5
  # currency_symbol="R$"
  # int_curr_symbol="BRL "
  # mon_decimal_point=","
  # mon_thousands_sep="."

  # Definir locale diferente por variável (sem mudar o sistema)
  # Útil para scripts que precisam de formato específico
  export LC_NUMERIC=en_US.UTF-8   # Números em inglês
  export LC_TIME=pt_BR.UTF-8      # Data em português

  # Forçar locale C/POSIX para scripts (formato neutro, sem localização)
  LC_ALL=C sort arquivo.txt       # Ordenação ASCII padrão
  LC_ALL=C date                   # Data em formato padrão inglês`}
        />

        <h2>5. Configurar Idioma de Aplicativos</h2>
        <CodeBlock
          title="Instalar e gerenciar idiomas no Ubuntu"
          code={`# Instalar suporte completo ao português brasileiro
  sudo apt install -y language-pack-pt
  sudo apt install -y language-pack-gnome-pt   # Para GNOME
  sudo apt install -y libreoffice-l10n-pt-br   # LibreOffice em PT-BR
  sudo apt install -y thunderbird-locale-pt-br # Thunderbird em PT-BR
  sudo apt install -y firefox-locale-pt        # Firefox em PT-BR

  # Verificar idiomas instalados
  check-language-support -l pt_BR
  # Lista pacotes que ainda faltam instalar

  # Instalar todos os pacotes de idioma que faltam
  sudo apt install -y $(check-language-support -l pt_BR)

  # Forçar um aplicativo a rodar em idioma específico
  LANG=en_US.UTF-8 firefox         # Firefox em inglês
  LANG=pt_BR.UTF-8 libreoffice     # LibreOffice em português

  # Configurar idioma do GNOME via dconf
  gsettings set org.gnome.system.locale region 'pt_BR.UTF-8'

  # Prioridade de idiomas no GNOME
  # Configurações → Região e Idioma → Idioma
  # Arraste para reordenar a preferência`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com localização"
          code={`# Erro: "locale: Cannot set LC_ALL to default locale"
  # Solução: Gerar o locale faltante
  sudo locale-gen pt_BR.UTF-8
  sudo update-locale LANG=pt_BR.UTF-8
  # Reiniciar a sessão

  # Caracteres estranhos no terminal (ex: Ã§ ao invés de ç)
  # Causa: Encoding errado
  # Solução: Verificar e corrigir
  echo $LANG   # Deve ser pt_BR.UTF-8
  # Se não for:
  export LANG=pt_BR.UTF-8
  # No terminal: Preferências → Codificação → UTF-8

  # Teclado não digita acentos (ç, ã, é)
  # Solução: Verificar layout
  localectl
  # Se não for "br", configurar:
  sudo localectl set-x11-keymap br pc105

  # Horário errado após dual-boot com Windows
  # Causa: Windows usa RTC em local time, Linux usa UTC
  # Solução: Configurar Linux para usar local time no RTC
  sudo timedatectl set-local-rtc 1
  # Ou (melhor): Configurar Windows para usar UTC:
  # No Windows: reg add "HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /t REG_DWORD /d 1

  # Mensagens do sistema em inglês mesmo com locale pt_BR
  # Solução: Instalar pacotes de tradução
  sudo apt install -y language-pack-pt language-pack-gnome-pt
  sudo update-locale LANG=pt_BR.UTF-8
  # Reiniciar`}
        />

        <AlertBox type="info" title="Locale para servidores">
          Em servidores, é comum usar <code>en_US.UTF-8</code> como locale padrão,
          mesmo no Brasil. Isso facilita a pesquisa de mensagens de erro em inglês 
          no Google/Stack Overflow. Defina o fuso horário como <code>America/Sao_Paulo</code>
          mas mantenha o idioma em inglês.
        </AlertBox>
      </PageContainer>
    );
  }
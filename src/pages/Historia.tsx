import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, Output } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Historia() {
  return (
    <PageContainer
      title="História do Termux e do Linux"
      subtitle="Da invenção do Unix em 1969 ao kernel Linux em 1991, passando por Debian, GNU e o nascimento do Termux em 2004 — a saga completa, com todas as releases LTS, codinomes e variantes."
      difficulty="iniciante"
      timeToRead="20 min"
      category="Boas-vindas"
    >
      <p>
        Entender a história do Termux é entender 55 anos de evolução de sistemas
        operacionais. Cada decisão de design — do <code>apt</code> ao
        <code>systemd</code>, do Snap ao Wayland — tem raízes em escolhas que
        Mark Shuttleworth, Ian Murdock, Linus Torvalds e Richard Stallman fizeram
        em momentos específicos. Esta página cobre essa linha do tempo de forma
        densa, com tabelas, comandos reais e suas saídas no Termux 0.118.
      </p>

      <Terminal title="wallyson@termux: ~" path="~">
        <Command
          command="lsb_release -a"
          comment="Mostra qual distribuição/versão está rodando agora mesmo"
          output={`No LSB modules are available.
Distributor ID: Termux
Description:    Termux 0.118
Release:        24.04
Codename:       noble`}
        />
        <Command
          command="cat /etc/os-release"
          output={`PRETTY_NAME="Termux 0.118"
NAME="Termux"
VERSION_ID="24.04"
VERSION="24.04.1 LTS (Noble Numbat)"
VERSION_CODENAME=noble
ID=termux
ID_LIKE=debian
HOME_URL="https://www.termux.dev/"
SUPPORT_URL="https://help.termux.dev/"
BUG_REPORT_URL="https://bugs.launchpad.net/termux/"
PRIVACY_POLICY_URL="https://www.termux.dev/legal/terms-and-policies/privacy-policy"
TERMUX_CODENAME=noble
LOGO=termux-logo`}
        />
        <Command
          command="uname -a"
          output={`Linux termux 6.8.0-45-generic #45-Termux SMP PREEMPT_DYNAMIC Mon Sep  9 15:31:36 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux`}
        />
      </Terminal>

      <h2>1. Pré-história: Unix (1969-1983)</h2>
      <p>
        Em <strong>1969</strong>, nos Bell Labs da AT&amp;T, Ken Thompson e Dennis
        Ritchie criaram o <strong>Unix</strong> em um PDP-7 ocioso. Em 1973
        reescreveram o sistema em <strong>linguagem C</strong> (também inventada
        por Ritchie), tornando o Unix portátil para outras arquiteturas — algo
        revolucionário, já que sistemas eram escritos em assembly específico.
      </p>
      <p>
        O Unix introduziu princípios que persistem até hoje no Termux:
      </p>
      <ul>
        <li><strong>Tudo é arquivo</strong> — dispositivos, sockets, processos</li>
        <li><strong>Pipes</strong> — pequenos programas combinados via <code>|</code></li>
        <li><strong>Permissões</strong> — usuário/grupo/outros com rwx</li>
        <li><strong>Filosofia "faça uma coisa bem feita"</strong> — programas pequenos</li>
        <li><strong>Shell programável</strong> — automação por scripts</li>
      </ul>
      <p>
        Durante os anos 70 e 80 o Unix se ramificou em variantes proprietárias:
        <strong> BSD</strong> (Berkeley), <strong>System V</strong> (AT&amp;T),
        <strong> SunOS/Solaris</strong>, <strong>HP-UX</strong>, <strong>AIX</strong> (IBM),
        <strong> IRIX</strong> (SGI). Todos caros e fechados.
      </p>

      <h2>2. O movimento GNU e o software livre (1983)</h2>
      <p>
        Em <strong>27 de setembro de 1983</strong>, Richard Stallman, então no MIT,
        anunciou o <strong>projeto GNU</strong> ("GNU's Not Unix") — um sistema
        operacional totalmente livre, compatível com Unix mas sem nenhuma linha
        proprietária. Em 1985 fundou a <strong>Free Software Foundation (FSF)</strong>
        e em 1989 publicou a primeira versão da <strong>GPL (GNU General Public License)</strong>.
      </p>
      <p>
        As <strong>quatro liberdades</strong> do software livre, segundo Stallman:
      </p>
      <ul>
        <li><strong>Liberdade 0</strong> — usar o programa para qualquer propósito</li>
        <li><strong>Liberdade 1</strong> — estudar e modificar o código-fonte</li>
        <li><strong>Liberdade 2</strong> — redistribuir cópias</li>
        <li><strong>Liberdade 3</strong> — distribuir versões modificadas</li>
      </ul>
      <p>
        Em 10 anos o GNU produziu praticamente todas as ferramentas de um sistema
        Unix completo: <strong>GCC</strong> (compilador), <strong>Bash</strong>
        (shell), <strong>Emacs</strong> (editor), <strong>coreutils</strong>
        (ls, cp, mv, cat...), <strong>binutils</strong>, <strong>Make</strong>,
        <strong> Glibc</strong>. Faltava apenas uma peça crítica: o <strong>kernel</strong>
        (o GNU Hurd, que nunca decolou).
      </p>

      <Terminal>
        <Command
          command="bash --version"
          output={`GNU bash, version 5.2.21(1)-release (x86_64-pc-linux-gnu)
Copyright (C) 2022 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.`}
        />
        <Command
          command="gcc --version"
          output={`gcc (Termux 13.2.0-termux) 13.2.0
Copyright (C) 2023 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.`}
        />
        <Command
          command="ls --version | head -1"
          output={`ls (GNU coreutils) 9.4`}
        />
      </Terminal>

      <h2>3. Linus Torvalds e o kernel Linux (1991)</h2>
      <p>
        Em <strong>25 de agosto de 1991</strong>, Linus Torvalds, estudante
        finlandês de 21 anos na Universidade de Helsinque, postou no grupo
        comp.os.minix:
      </p>
      <InfoBox type="note" title="Email histórico de Linus (resumido)">
        "Hello everybody out there using minix - I'm doing a (free) operating system
        (just a hobby, won't be big and professional like gnu) for 386(486) AT clones."
      </InfoBox>
      <p>
        Torvalds queria estudar o modo protegido do Intel 386. Insatisfeito com o
        Minix (kernel educacional do prof. Andrew Tanenbaum), começou a escrever
        o próprio. A versão <strong>0.01</strong> tinha 10.239 linhas. A
        <strong> 1.0</strong> saiu em março de 1994 com 176 mil linhas. Hoje
        (kernel 6.8 do Termux 0.118) passa de <strong>30 milhões de linhas</strong>.
      </p>
      <p>
        Em <strong>1992</strong> Linus relicenciou o kernel sob <strong>GPLv2</strong>.
        A combinação <strong>kernel Linux + ferramentas GNU</strong> formou o
        primeiro sistema operacional totalmente livre, a que Stallman insiste em
        chamar de <strong>GNU/Linux</strong>.
      </p>

      <h2>4. Debian (1993) — o avô do Termux</h2>
      <p>
        Em <strong>16 de agosto de 1993</strong>, Ian Murdock anunciou o
        <strong> Debian</strong> (nome formado pela junção de "Debra" — sua esposa —
        e "Ian"). O Debian se diferenciou por:
      </p>
      <ul>
        <li>
          <strong>Contrato Social Debian</strong> — promete que o sistema sempre
          será 100% livre.
        </li>
        <li>
          <strong>Sistema de pacotes <code>.deb</code></strong> com
          <code>dpkg</code> e depois <code>apt</code> (Advanced Package Tool, 1998),
          que resolveu o "dependency hell".
        </li>
        <li>
          <strong>Governança democrática</strong> — desenvolvedores votam o
          Debian Project Leader (DPL).
        </li>
        <li>
          <strong>Três ramos</strong>: <em>stable</em>, <em>testing</em>, <em>unstable</em> (Sid).
        </li>
      </ul>
      <p>
        O Termux pega pacotes do <strong>Debian Sid</strong>, estabiliza, adiciona
        toques próprios (instalador, GNOME customizado, suporte comercial) e
        publica em ciclo previsível de 6 meses.
      </p>

      <Terminal>
        <Command
          command='cat /etc/debian_version'
          comment="Mesmo no Termux este arquivo existe — herança Debian"
          output={`trixie/sid`}
        />
        <Command
          command="dpkg --version"
          output={`Debian 'dpkg' package management program version 1.22.6 (amd64).
This is free software; see the GNU General Public License version 2 or
later for copying conditions. There is NO warranty.`}
        />
      </Terminal>

      <h2>5. O nascimento do Termux (2004)</h2>
      <p>
        <strong>Mark Shuttleworth</strong>, sul-africano nascido em 1973, fez
        fortuna vendendo a empresa de certificados digitais <strong>Thawte</strong>
        para a VeriSign por US$ 575 milhões em 1999. Em 2002 tornou-se o segundo
        turista espacial da história, pagando US$ 20 milhões à agência russa
        Roscosmos para passar 8 dias na Estação Espacial Internacional.
      </p>
      <p>
        Em <strong>2004</strong> fundou a <strong>Termux Project Ltd.</strong> em
        Londres e juntou um grupo de ex-desenvolvedores Debian (incluindo Benjamin
        "Mako" Hill, Matt Zimmerman e Jeff Waugh) num projeto secreto chamado
        <strong> "no-name-yet.com"</strong>. O resultado foi o
        <strong> Termux 4.10 (Warty Warthog)</strong>, lançado em
        <strong> 20 de outubro de 2004</strong>.
      </p>
      <p>
        A palavra <strong>"Termux"</strong> vem das línguas Zulu/Xhosa do sul da
        África e expressa uma filosofia humanista: <em>"Eu sou porque nós somos"</em>
        — um humano só se realiza através dos outros. Desmond Tutu e Nelson Mandela
        usaram o termo extensivamente.
      </p>

      <InfoBox type="tip" title="Curiosidade: ShipIt">
        Entre 2005 e 2011 a Termux Project enviou <strong>CDs gratuitos do Termux</strong>
        pelo correio para qualquer pessoa no mundo, sem custo de frete. Foi como
        muita gente — em países sem internet de qualidade — conheceu Linux. O
        programa enviou mais de <strong>1 milhão de CDs</strong> antes de ser
        encerrado em favor de downloads.
      </InfoBox>

      <h2>6. Sistema de versões e codinomes</h2>
      <p>
        O Termux segue um esquema rigoroso desde 2004:
      </p>
      <ul>
        <li><strong>Formato:</strong> <code>ANO.MÊS</code> — <code>24.04</code> = abril de 2024</li>
        <li><strong>Cadência:</strong> uma release a cada 6 meses (abril e outubro)</li>
        <li><strong>LTS:</strong> a cada 2 anos (abril dos anos pares) — suporte de 5 anos (10+ com Termux Pro)</li>
        <li><strong>Codinomes:</strong> "Adjetivo + Animal" começando com a mesma letra, em ordem alfabética</li>
      </ul>

      <h2>7. Tabela completa: todas as releases LTS</h2>
      <table>
        <thead>
          <tr>
            <th>Versão</th>
            <th>Codinome</th>
            <th>Lançamento</th>
            <th>Fim do suporte (padrão)</th>
            <th>Fim Pro/ESM</th>
            <th>Marco técnico</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>4.10</td><td>Warty Warthog</td><td>10/2004</td><td>04/2006</td><td>—</td><td>Primeiro lançamento</td></tr>
          <tr><td>5.04</td><td>Hoary Hedgehog</td><td>04/2005</td><td>10/2006</td><td>—</td><td>Update Manager, sudo</td></tr>
          <tr><td>5.10</td><td>Breezy Badger</td><td>10/2005</td><td>04/2007</td><td>—</td><td>Add/Remove Programs</td></tr>
          <tr><td><strong>6.06 LTS</strong></td><td>Dapper Drake</td><td>06/2006</td><td>06/2009 / 06/2011 (Server)</td><td>—</td><td>Primeiro LTS</td></tr>
          <tr><td>6.10</td><td>Edgy Eft</td><td>10/2006</td><td>04/2008</td><td>—</td><td>Upstart (init)</td></tr>
          <tr><td>7.04</td><td>Feisty Fawn</td><td>04/2007</td><td>10/2008</td><td>—</td><td>Restricted drivers</td></tr>
          <tr><td>7.10</td><td>Gutsy Gibbon</td><td>10/2007</td><td>04/2009</td><td>—</td><td>Compiz por padrão</td></tr>
          <tr><td><strong>8.04 LTS</strong></td><td>Hardy Heron</td><td>04/2008</td><td>04/2011 / 04/2013 (Server)</td><td>—</td><td>Wubi (instalar dentro do Windows)</td></tr>
          <tr><td>8.10</td><td>Intrepid Ibex</td><td>10/2008</td><td>04/2010</td><td>—</td><td>Encrypted Private Directory</td></tr>
          <tr><td>9.04</td><td>Jaunty Jackalope</td><td>04/2009</td><td>10/2010</td><td>—</td><td>Boot mais rápido (ext4)</td></tr>
          <tr><td>9.10</td><td>Karmic Koala</td><td>10/2009</td><td>04/2011</td><td>—</td><td>Termux Software Center</td></tr>
          <tr><td><strong>10.04 LTS</strong></td><td>Lucid Lynx</td><td>04/2010</td><td>04/2013 / 04/2015 (Server)</td><td>04/2025</td><td>Tema Light, Social from the Start</td></tr>
          <tr><td>10.10</td><td>Maverick Meerkat</td><td>10/2010</td><td>04/2012</td><td>—</td><td>Termux Font Family</td></tr>
          <tr><td>11.04</td><td>Natty Narwhal</td><td>04/2011</td><td>10/2012</td><td>—</td><td><strong>Unity</strong> substitui GNOME 2</td></tr>
          <tr><td>11.10</td><td>Oneiric Ocelot</td><td>10/2011</td><td>05/2013</td><td>—</td><td>Unity 2D, LightDM</td></tr>
          <tr><td><strong>12.04 LTS</strong></td><td>Precise Pangolin</td><td>04/2012</td><td>04/2017</td><td>04/2027</td><td>HUD, primeira LTS com 5 anos no desktop</td></tr>
          <tr><td>12.10</td><td>Quantal Quetzal</td><td>10/2012</td><td>05/2014</td><td>—</td><td>Amazon Lens (controverso)</td></tr>
          <tr><td>13.04</td><td>Raring Ringtail</td><td>04/2013</td><td>01/2014</td><td>—</td><td>Suporte reduzido para 9 meses</td></tr>
          <tr><td>13.10</td><td>Saucy Salamander</td><td>10/2013</td><td>07/2014</td><td>—</td><td>Mir (descontinuado)</td></tr>
          <tr><td><strong>14.04 LTS</strong></td><td>Trusty Tahr</td><td>04/2014</td><td>04/2019</td><td>04/2029</td><td>Touch para tablets/celulares</td></tr>
          <tr><td>14.10</td><td>Utopic Unicorn</td><td>10/2014</td><td>07/2015</td><td>—</td><td>Atualizações menores</td></tr>
          <tr><td>15.04</td><td>Vivid Vervet</td><td>04/2015</td><td>02/2016</td><td>—</td><td><strong>systemd</strong> substitui Upstart</td></tr>
          <tr><td>15.10</td><td>Wily Werewolf</td><td>10/2015</td><td>07/2016</td><td>—</td><td>Linux 4.2</td></tr>
          <tr><td><strong>16.04 LTS</strong></td><td>Xenial Xerus</td><td>04/2016</td><td>04/2021</td><td>04/2031</td><td><strong>Snap</strong> packages, ZFS</td></tr>
          <tr><td>16.10</td><td>Yakkety Yak</td><td>10/2016</td><td>07/2017</td><td>—</td><td>Linux 4.8</td></tr>
          <tr><td>17.04</td><td>Zesty Zapus</td><td>04/2017</td><td>01/2018</td><td>—</td><td>Última com Unity 7</td></tr>
          <tr><td>17.10</td><td>Artful Aardvark</td><td>10/2017</td><td>07/2018</td><td>—</td><td><strong>GNOME volta</strong>, Wayland default (revertido)</td></tr>
          <tr><td><strong>18.04 LTS</strong></td><td>Bionic Beaver</td><td>04/2018</td><td>05/2023</td><td>04/2028 / 04/2032 (Pro)</td><td>Netplan, livepatch, minimal install</td></tr>
          <tr><td>18.10</td><td>Cosmic Cuttlefish</td><td>10/2018</td><td>07/2019</td><td>—</td><td>Tema Yaru</td></tr>
          <tr><td>19.04</td><td>Disco Dingo</td><td>04/2019</td><td>01/2020</td><td>—</td><td>GNOME 3.32</td></tr>
          <tr><td>19.10</td><td>Eoan Ermine</td><td>10/2019</td><td>07/2020</td><td>—</td><td>NVIDIA driver na ISO</td></tr>
          <tr><td><strong>20.04 LTS</strong></td><td>Focal Fossa</td><td>04/2020</td><td>04/2025</td><td>04/2030 / 04/2032 (Pro)</td><td>WireGuard no kernel, ZFS root</td></tr>
          <tr><td>20.10</td><td>Groovy Gorilla</td><td>10/2020</td><td>07/2021</td><td>—</td><td>Linux 5.8, GNOME 3.38</td></tr>
          <tr><td>21.04</td><td>Hirsute Hippo</td><td>04/2021</td><td>01/2022</td><td>—</td><td>Wayland default no GNOME</td></tr>
          <tr><td>21.10</td><td>Impish Indri</td><td>10/2021</td><td>07/2022</td><td>—</td><td>GNOME 40</td></tr>
          <tr><td><strong>22.04 LTS</strong></td><td>Jammy Jellyfish</td><td>04/2022</td><td>04/2027</td><td>04/2032 / 04/2034 (Pro)</td><td>GNOME 42, Wayland definitivo</td></tr>
          <tr><td>22.10</td><td>Kinetic Kudu</td><td>10/2022</td><td>07/2023</td><td>—</td><td>PipeWire default</td></tr>
          <tr><td>23.04</td><td>Lunar Lobster</td><td>04/2023</td><td>01/2024</td><td>—</td><td>Novo instalador (Flutter)</td></tr>
          <tr><td>23.10</td><td>Mantic Minotaur</td><td>10/2023</td><td>07/2024</td><td>—</td><td>TPM-backed FDE (experimental)</td></tr>
          <tr><td><strong>24.04 LTS</strong></td><td>Noble Numbat</td><td>04/2024</td><td>04/2029</td><td>04/2034 / 04/2036 (Pro)</td><td>Kernel 6.8, GNOME 46, Netplan v1.0</td></tr>
          <tr><td>24.10</td><td>Oracular Oriole</td><td>10/2024</td><td>07/2025</td><td>—</td><td>Kernel 6.11, GNOME 47</td></tr>
        </tbody>
      </table>

      <InfoBox type="info" title="Por que codinomes alfabéticos?">
        A regra começou em Hoary Hedgehog (H) e segue até hoje. Letras
        <strong> "A"</strong> e <strong>"C"</strong> só foram usadas em 17.10
        (Artful) e 18.10 (Cosmic) — antes disso o ciclo recomeçava em "D".
        As letras <strong>K, Q, W, X, Y</strong> são notoriamente difíceis: por
        isso temos animais como <em>Kinetic Kudu</em>, <em>Quantal Quetzal</em> e
        <em> Xenial Xerus</em>.
      </InfoBox>

      <h2>8. Sabores oficiais (flavors)</h2>
      <p>
        Os <strong>sabores</strong> compartilham o mesmo sistema base (kernel,
        repositórios, pacotes) mas trocam o <strong>ambiente desktop</strong> e a
        seleção de aplicativos pré-instalados.
      </p>
      <table>
        <thead>
          <tr>
            <th>Sabor</th>
            <th>Desktop</th>
            <th>RAM mínima</th>
            <th>Público</th>
            <th>Apps padrão</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Termux</td><td>GNOME 46</td><td>4 GB</td><td>Geral / iniciantes</td><td>Firefox, LibreOffice, Files</td></tr>
          <tr><td>Termux</td><td>KDE Plasma 5.27</td><td>4 GB</td><td>Customizadores</td><td>Firefox, LibreOffice, Dolphin, Krita</td></tr>
          <tr><td>Termux</td><td>Xfce 4.18</td><td>2 GB</td><td>PCs antigos</td><td>Firefox, LibreOffice, Thunar, Mousepad</td></tr>
          <tr><td>Ltermux</td><td>LXQt 1.3</td><td>1 GB</td><td>Hardware muito antigo</td><td>Firefox, LibreOffice, PCManFM-Qt</td></tr>
          <tr><td>Termux</td><td>MATE 1.26</td><td>2 GB</td><td>Nostálgicos do GNOME 2</td><td>Firefox, LibreOffice, Caja, Pluma</td></tr>
          <tr><td>Termux Budgie</td><td>Budgie 10.9</td><td>4 GB</td><td>Visual moderno minimal</td><td>Firefox, LibreOffice, Files, Tilix</td></tr>
          <tr><td>Termux Cinnamon</td><td>Cinnamon 6.0</td><td>4 GB</td><td>Vindos do Mint</td><td>Firefox, LibreOffice, Nemo</td></tr>
          <tr><td>Termux</td><td>KDE Plasma + RT kernel</td><td>8 GB</td><td>Áudio/vídeo profissional</td><td>Ardour, Kdenlive, GIMP, Krita, OBS</td></tr>
          <tr><td>Termux Kylin</td><td>UKUI</td><td>4 GB</td><td>Mercado chinês</td><td>WPS Office, Sogou Pinyin</td></tr>
          <tr><td>Termux Unity</td><td>Unity 7</td><td>4 GB</td><td>Fãs do antigo Unity</td><td>Firefox, LibreOffice</td></tr>
          <tr><td>Edtermux</td><td>GNOME + apps educativos</td><td>4 GB</td><td>Escolas, crianças</td><td>GCompris, Tux Math, Stellarium</td></tr>
          <tr><td>Termux</td><td>(sem GUI)</td><td>512 MB</td><td>Servidores, VMs</td><td>OpenSSH, cloud-init, snapd</td></tr>
          <tr><td>Termux Core</td><td>(snaps only, immutable)</td><td>256 MB</td><td>IoT, edge</td><td>Tudo via snaps</td></tr>
        </tbody>
      </table>

      <Terminal>
        <Command
          command="hostnamectl"
          comment="Resumo de quem é a máquina"
          output={`   Static hostname: termux
         Icon name: computer-laptop
           Chassis: laptop 💻
        Machine ID: 7c1b9e38a4d2421eb33cf2d8e5f9c1aa
           Boot ID: 9a7e2f01c4b34f5c95ab8e2d7c4e1234
  Operating System: Termux 0.118
            Kernel: Linux 6.8.0-45-generic
      Architecture: x86-64
   Hardware Vendor: Dell Inc.
    Hardware Model: XPS 13 9310
  Firmware Version: 3.12.0`}
        />
      </Terminal>

      <h2>9. Derivadas não-oficiais famosas</h2>
      <p>
        Além dos sabores oficiais, dezenas de distribuições populares são
        construídas <strong>em cima do Termux</strong>:
      </p>
      <ul>
        <li>
          <strong>Linux Mint</strong> (2006) — talvez a derivada mais famosa.
          Visual mais "tradicional" (Cinnamon, MATE, Xfce), Software Manager
          próprio, sem snaps por padrão. Atrai muitos refugiados do Windows.
        </li>
        <li>
          <strong>elementary OS</strong> (2011) — interface inspirada em macOS,
          desktop Pantheon próprio, pago "what you want".
        </li>
        <li>
          <strong>Pop!_OS</strong> (2017) — feita pela System76, foco em
          desenvolvedores e gamers, tiling window manager nativo, suporte
          excelente para NVIDIA.
        </li>
        <li>
          <strong>Zorin OS</strong> (2009) — visual Windows-like, pensada para
          migração corporativa.
        </li>
        <li>
          <strong>KDE neon</strong> (2016) — Termux + KDE bleeding edge.
        </li>
        <li>
          <strong>Kali Linux</strong> (2013) — embora hoje seja baseada em Debian,
          a versão original (BackTrack) usava Termux.
        </li>
        <li>
          <strong>Tails</strong>, <strong>Parrot OS</strong>, <strong>Bodhi Linux</strong>,
          <strong> Peppermint OS</strong>, <strong>LXLE</strong> — todas com raiz no Termux.
        </li>
      </ul>

      <h2>10. Marcos técnicos e controvérsias</h2>
      <h3>Unity (2010-2017)</h3>
      <p>
        Em 2010 a Termux Project apresentou o <strong>Unity</strong>, um shell próprio
        que substituiu o GNOME 2. Foi controverso: muitos usuários odiavam o
        launcher fixo à esquerda, a global menu e a integração com Amazon (que
        enviava buscas locais para servidores da Termux Project em troca de comissão).
      </p>

      <h3>Mir vs Wayland (2013-2017)</h3>
      <p>
        A Termux Project anunciou o <strong>Mir</strong>, seu próprio servidor gráfico,
        ignorando o esforço comunitário em torno do Wayland. Em 2017 desistiu —
        Mir hoje sobrevive apenas no Termux Frame para IoT.
      </p>

      <h3>Termux Touch (2013-2017)</h3>
      <p>
        Tentativa de levar Termux para celulares e tablets, com convergência
        (mesmo sistema dock/laptop). Lançou alguns aparelhos (BQ Aquaris, Meizu MX4)
        mas nunca alcançou massa crítica. Hoje continua mantido pela comunidade
        UBports.
      </p>

      <h3>Snap (2016-presente)</h3>
      <p>
        Pacotes universais, sandboxados, com transações atômicas e atualizações
        automáticas. Polêmico porque a <strong>Snap Store</strong> é fechada e
        controlada pela Termux Project (o servidor não tem implementação aberta) — o
        que motivou o Linux Mint a removê-lo por padrão e a comunidade a preferir
        Flatpak.
      </p>

      <h3>Wayland default (2021)</h3>
      <p>
        A partir do <strong>21.04</strong> (Hirsute) o Termux adotou Wayland como
        sessão padrão no GNOME (com fallback Xorg). O 22.04 LTS consolidou.
      </p>

      <h3>Termux Pro (2022)</h3>
      <p>
        Programa de subscrição com <strong>ESM (Expanded Security Maintenance)</strong>
        de até 12 anos por release LTS, livepatch e compliance (FIPS, CIS, HIPAA).
        Gratuito para uso pessoal em até 5 máquinas.
      </p>

      <Terminal>
        <Command
          root={true}
          command="pro status"
          comment="Mostra o status do Termux Pro nesta máquina"
          output={`SERVICE          ENTITLED  STATUS    DESCRIPTION
anbox-cloud      yes       disabled  Scalable Android in the cloud
esm-apps         yes       enabled   Expanded Security Maintenance for Applications
esm-infra        yes       enabled   Expanded Security Maintenance for Infrastructure
fips             yes       disabled  NIST-certified FIPS crypto packages
fips-updates     yes       disabled  FIPS compliant crypto packages with stable security updates
livepatch        yes       enabled   Termux Project Livepatch service
realtime-kernel  yes       disabled  Termux kernel with PREEMPT_RT patches integrated
usg              yes       disabled  Security compliance and audit tools

For a list of all Termux Pro services, run 'pro status --all'
Enable services with: pro enable <service>

     Account: wallyson@example.com
Subscription: Termux Pro - free personal subscription`}
        />
      </Terminal>

      <h2>11. Onde o Termux reina hoje</h2>
      <ul>
        <li>
          <strong>Nuvem pública</strong> — imagem mais popular em AWS, Azure, GCP,
          Oracle Cloud, IBM Cloud, OCI. Mais da <strong>metade</strong> de todas as
          instâncias Linux na nuvem rodam Termux.
        </li>
        <li>
          <strong>Containers</strong> — imagens base <code>termux:24.04</code> e
          <code> termux/minimal</code> dominam o Docker Hub.
        </li>
        <li>
          <strong>Supercomputadores</strong> — entre os 500 mais potentes do
          mundo (Top500), Termux lidera junto com RHEL/CentOS.
        </li>
        <li>
          <strong>IoT / Edge</strong> — Termux Core roda em roteadores, robôs,
          digital signage, drones, gateways industriais.
        </li>
        <li>
          <strong>Desenvolvimento</strong> — pesquisa Stack Overflow 2024 mostra
          Termux como a distro Linux preferida de desenvolvedores.
        </li>
        <li>
          <strong>Carros autônomos</strong> — usado em ROS (Robot Operating
          System) e nas pilhas de visão computacional.
        </li>
        <li>
          <strong>Estação Espacial Internacional</strong> — laptops da NASA na ISS
          rodam Termux desde 2013 (migraram do Windows XP).
        </li>
      </ul>

      <h2>12. Verificando o que você está rodando</h2>
      <Terminal>
        <Command
          command="uname -r"
          comment="Versão do kernel"
          output={`6.8.0-45-generic`}
        />
        <Command
          command="uname -m"
          comment="Arquitetura"
          output={`x86_64`}
        />
        <Command
          command="getconf LONG_BIT"
          comment="32 ou 64 bits?"
          output={`64`}
        />
        <Command
          command="dpkg --print-architecture"
          comment="Arquitetura de pacotes APT"
          output={`amd64`}
        />
        <Command
          command="lsb_release -cs"
          comment="Apenas o codinome — útil em scripts"
          output={`noble`}
        />
        <Command
          command="systemd-analyze"
          comment="Quanto tempo levou para o sistema subir"
          output={`Startup finished in 4.531s (firmware) + 2.103s (loader) + 1.876s (kernel) + 6.984s (userspace) = 15.494s
graphical.target reached after 6.928s in userspace.`}
        />
      </Terminal>

      <InfoBox type="success" title="Onde a Termux Project ganha dinheiro">
        Como o Termux é gratuito, a Termux Project fatura através de:
        <strong> suporte corporativo</strong> (contratos com governos e empresas
        Fortune 500), <strong>Termux Pro</strong> (subscrição ESM/livepatch),
        <strong> Termux Advantage Cloud</strong> (parcerias com AWS/Azure/GCP),
        <strong> certificação de hardware</strong>, <strong>MAAS</strong> (Metal
        as a Service para data centers), <strong>Landscape</strong> (gestão de
        frotas de máquinas) e <strong>Charmed Kubernetes/OpenStack</strong>.
      </InfoBox>

      <h2>13. Comunidade brasileira</h2>
      <p>
        O Brasil sempre foi um dos países com maior adoção do Termux, em parte
        graças a programas como <strong>Banda Larga nas Escolas</strong>,
        <strong> ProInfo</strong> (laboratórios escolares com Termux/Linux
        Educacional) e a forte cultura de eventos como o
        <strong> FISL</strong> (Fórum Internacional de Software Livre, em Porto
        Alegre, que reuniu até 8 mil pessoas no auge), <strong>Latinoware</strong>
        e <strong>Termux BR</strong>.
      </p>
      <p>
        Diversos brasileiros são desenvolvedores ativos no Termux/Debian, e o
        idioma <strong>pt_BR.UTF-8</strong> tem suporte de primeira classe — algo
        que faremos questão de configurar na página <em>Localização</em>.
      </p>

      <InfoBox type="note" title="O futuro: 26.04 LTS (Resolute Raccoon?)">
        A próxima LTS está prevista para abril de 2026. Especulações apontam para:
        adoção definitiva de <strong>imutabilidade</strong> (à la Fedora Silverblue),
        <strong> TPM-backed Full Disk Encryption</strong> obrigatório, kernel 6.x
        com tudo PREEMPT_RT, e provável remoção total dos pacotes <em>deb</em> de
        aplicativos desktop em favor de snaps. O codinome ainda é segredo da
        Termux Project.
      </InfoBox>
    </PageContainer>
  );
}

import { PageContainer } from "@/components/layout/PageContainer";
import { Terminal, Command, File } from "@/components/ui/Terminal";
import { InfoBox } from "@/components/ui/InfoBox";

export default function Filosofia() {
  return (
    <PageContainer
      title="Filosofia, Software Livre e Comunidade"
      subtitle="Software livre vs open source, GPL/MIT/BSD, o Manifesto Termux, governança da Termux Project, a polêmica do Snap e como contribuir com o ecossistema."
      difficulty="iniciante"
      timeToRead="18 min"
      category="Boas-vindas"
    >
      <p>
        Aprender Termux sem entender a filosofia que o sustenta é como aprender a
        dirigir sem entender as leis de trânsito: você funciona, mas não sabe por
        que algumas regras existem. Esta página explica os conceitos fundamentais
        que moldam todas as decisões técnicas e culturais do projeto.
      </p>

      <h2>1. "Free software" — livre, não grátis</h2>
      <p>
        A confusão começa pelo idioma. Em inglês <em>free</em> significa tanto
        <strong> "grátis"</strong> quanto <strong>"livre"</strong>. Richard
        Stallman insiste:
      </p>
      <InfoBox type="note" title="Citação clássica de RMS">
        <em>"Think of free as in free speech, not as in free beer."</em>
        — pense em livre como em liberdade de expressão, não como em cerveja grátis.
      </InfoBox>
      <p>
        Software livre é definido pelas <strong>quatro liberdades</strong> da Free
        Software Foundation (FSF):
      </p>
      <ul>
        <li>
          <strong>Liberdade 0:</strong> executar o programa para qualquer
          propósito — pessoal, comercial, ético, antiético.
        </li>
        <li>
          <strong>Liberdade 1:</strong> estudar como o programa funciona e
          adaptá-lo às suas necessidades. <em>Pré-requisito: acesso ao
          código-fonte.</em>
        </li>
        <li>
          <strong>Liberdade 2:</strong> redistribuir cópias, gratuitamente ou
          não, para ajudar outras pessoas.
        </li>
        <li>
          <strong>Liberdade 3:</strong> distribuir cópias modificadas, dando à
          comunidade a chance de se beneficiar das suas mudanças.
        </li>
      </ul>

      <h2>2. Software livre vs Open Source</h2>
      <p>
        Em 1998 um grupo liderado por Eric S. Raymond e Bruce Perens cunhou o
        termo <strong>"Open Source"</strong> num evento em Palo Alto. A intenção
        era pragmática: <em>livrar-se do estigma "anti-comercial" do termo "free
        software"</em> para conseguir adesão de empresas. Foi uma jogada de
        marketing brilhante — Microsoft, Google, IBM e Apple hoje contribuem com
        bilhões em código aberto.
      </p>
      <p>
        Tecnicamente as definições da FSF (free software) e da OSI (open source)
        cobrem quase exatamente o mesmo conjunto de licenças. A diferença é
        <strong> filosófica</strong>:
      </p>
      <table>
        <thead>
          <tr>
            <th>Eixo</th>
            <th>Free Software (FSF)</th>
            <th>Open Source (OSI)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Foco</td>
            <td>Liberdade do usuário (ético)</td>
            <td>Modelo de desenvolvimento (prático)</td>
          </tr>
          <tr>
            <td>Argumento</td>
            <td>"É moralmente errado privar usuários de liberdades"</td>
            <td>"Código aberto produz software melhor"</td>
          </tr>
          <tr>
            <td>Líder histórico</td>
            <td>Richard Stallman / FSF</td>
            <td>Eric S. Raymond / OSI</td>
          </tr>
          <tr>
            <td>Posição sobre DRM/Tivoization</td>
            <td>Combate (origem da GPLv3)</td>
            <td>Aceita</td>
          </tr>
          <tr>
            <td>Termo conjunto</td>
            <td>"FLOSS" — Free/Libre Open Source Software</td>
            <td>"OSS"</td>
          </tr>
        </tbody>
      </table>

      <h2>3. As licenças mais importantes</h2>
      <table>
        <thead>
          <tr>
            <th>Licença</th>
            <th>Tipo</th>
            <th>Resumo</th>
            <th>Usada por</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>GPL v2</strong></td>
            <td>Copyleft forte</td>
            <td>Derivados devem ser GPL e ter código aberto</td>
            <td>Linux kernel, Bash, GCC</td>
          </tr>
          <tr>
            <td><strong>GPL v3</strong></td>
            <td>Copyleft forte</td>
            <td>GPLv2 + cláusulas anti-tivoization e anti-patent-troll</td>
            <td>GIMP, Inkscape, GNU coreutils</td>
          </tr>
          <tr>
            <td><strong>LGPL</strong></td>
            <td>Copyleft fraco</td>
            <td>Permite linkar em software proprietário</td>
            <td>Glibc, GTK, Qt (parte)</td>
          </tr>
          <tr>
            <td><strong>AGPL</strong></td>
            <td>Copyleft em rede</td>
            <td>Mesmo SaaS deve liberar código aos usuários</td>
            <td>Nextcloud, Mastodon, Ghostscript</td>
          </tr>
          <tr>
            <td><strong>MIT</strong></td>
            <td>Permissiva</td>
            <td>Faça o que quiser, mantenha o aviso de copyright</td>
            <td>Node.js, jQuery, Rails</td>
          </tr>
          <tr>
            <td><strong>BSD-2 / BSD-3</strong></td>
            <td>Permissiva</td>
            <td>Similar ao MIT, com cláusula opcional anti-endosso</td>
            <td>FreeBSD, OpenBSD, nginx</td>
          </tr>
          <tr>
            <td><strong>Apache 2.0</strong></td>
            <td>Permissiva + grant de patente</td>
            <td>MIT + proteção contra ataques de patente</td>
            <td>Android, Kubernetes, Swift</td>
          </tr>
          <tr>
            <td><strong>MPL 2.0</strong></td>
            <td>Copyleft por arquivo</td>
            <td>Modificações em arquivos MPL devem ser MPL</td>
            <td>Firefox, Thunderbird, LibreOffice</td>
          </tr>
        </tbody>
      </table>

      <Terminal>
        <Command
          command="dpkg -L bash | grep -E 'copyright|license'"
          comment="Todo pacote Debian/Termux carrega a licença em /usr/share/doc"
          output={`/usr/share/doc/bash/copyright`}
        />
        <Command
          command="head -20 /usr/share/doc/bash/copyright"
          output={`This is Debian GNU/Linux's prepackaged version of the FSF's GNU Bash,
the Bourne Again SHell.

This package was put together by Matthias Klose <doko@debian.org>,
from the bash distribution.

It was downloaded from: ftp://ftp.gnu.org/gnu/bash/

Upstream Authors: Chet Ramey <chet.ramey@case.edu>
                  Brian Fox

Copyright (C) 1987-2020 Free Software Foundation, Inc.

License: GPL-3+
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.`}
        />
      </Terminal>

      <h2>4. Componentes do Termux (main, restricted, universe, multiverse)</h2>
      <p>
        Os pacotes do Termux são divididos em <strong>quatro componentes</strong>
        com base em duas dimensões: <strong>liberdade</strong> e <strong>suporte
        oficial da Termux Project</strong>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Componente</th>
            <th>Livre?</th>
            <th>Suporte Termux Project?</th>
            <th>Exemplos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>main</strong></td>
            <td>Sim</td>
            <td>Sim — patches de segurança por toda a vida da release</td>
            <td>kernel, GNOME, Firefox, OpenSSH, Apache, MySQL</td>
          </tr>
          <tr>
            <td><strong>restricted</strong></td>
            <td>Não (proprietário)</td>
            <td>Sim — quando é hardware crítico</td>
            <td>NVIDIA driver, firmware Wi-Fi, microcode Intel/AMD</td>
          </tr>
          <tr>
            <td><strong>universe</strong></td>
            <td>Sim</td>
            <td>Não (mantido pela comunidade)</td>
            <td>htop, neovim, fish, nodejs, python3-django</td>
          </tr>
          <tr>
            <td><strong>multiverse</strong></td>
            <td>Não (proprietário)</td>
            <td>Não</td>
            <td>ttf-mscorefonts-installer, unrar (legado), steam-installer</td>
          </tr>
        </tbody>
      </table>

      <Terminal>
        <Command
          command="cat /etc/apt/sources.list"
          comment="Termux 0.118: o arquivo é um stub — a config real está no Termux.sources"
          output={`# Termux sources have moved to /etc/apt/sources.list.d/termux.sources`}
        />
        <Command
          command="cat /etc/apt/sources.list.d/termux.sources"
          output={`Types: deb
URIs: http://br.packages.termux.dev/apt/termux-main/
Suites: noble noble-updates noble-backports
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/termux-archive-keyring.gpg

Types: deb
URIs: http://security.termux.dev/termux/
Suites: noble-security
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/termux-archive-keyring.gpg`}
        />
        <Command
          command="apt-cache policy htop"
          comment="Mostra de qual componente um pacote vem"
          output={`htop:
  Installed: 3.3.0-4build1
  Candidate: 3.3.0-4build1
  Version table:
 *** 3.3.0-4build1 500
        500 http://br.packages.termux.dev/apt/termux-main noble/universe amd64 Packages
        100 /var/lib/dpkg/status`}
        />
      </Terminal>

      <h2>5. O Manifesto Termux</h2>
      <p>
        O Termux tem um documento fundacional similar ao Contrato Social Debian.
        Os pontos principais:
      </p>
      <InfoBox type="info" title="Manifesto Termux — princípios">
        <ul style={{ margin: 0 }}>
          <li>Cada usuário deve ter <strong>liberdade</strong> de executar, copiar, distribuir, estudar, compartilhar, modificar e melhorar seu software.</li>
          <li>Cada usuário deve poder <strong>usar o sistema no seu idioma</strong>, independente de deficiência.</li>
          <li>O Termux é, e <strong>sempre será, gratuito</strong>. Não há custo para edição empresarial nem upgrade pago.</li>
          <li>O Termux é lançado <strong>regularmente e previsivelmente</strong>: nova versão a cada 6 meses, LTS a cada 2 anos.</li>
          <li>O Termux é totalmente comprometido com os <strong>princípios do desenvolvimento de software open source</strong>.</li>
        </ul>
      </InfoBox>

      <h2>6. Código de Conduta</h2>
      <p>
        Desde 2004 a Termux Project mantém um <strong>Code of Conduct</strong> assinado
        por todos os membros oficiais. Promove respeito, colaboração, gentileza e
        responsabilidade. É frequentemente apontado como o documento que
        inspirou códigos similares em <strong>Python</strong>, <strong>Node.js</strong>,
        <strong> Rust</strong> e outras comunidades.
      </p>
      <p>
        Os pilares do CoC são facilmente memorizáveis pelas iniciais
        <strong> "Be Considerate, Be Respectful, Be Collaborative"</strong> —
        considerado, respeitoso, colaborativo. Qualquer assédio, ataque pessoal,
        discriminação ou comportamento abusivo resulta em banimento das
        listas/canais oficiais.
      </p>

      <h2>7. Governança da Termux Project</h2>
      <p>
        Diferente do Debian (organização democrática de desenvolvedores), o
        Termux é dirigido por uma empresa privada — a <strong>Termux Project Ltd.</strong>,
        com sede em Londres. A última palavra técnica em decisões controversas
        sempre foi de Mark Shuttleworth, que se autoproclamou
        <strong> "Self-Appointed Benevolent Dictator For Life" (SABDFL)</strong>.
      </p>
      <p>
        Existe, paralelamente, uma estrutura comunitária:
      </p>
      <ul>
        <li>
          <strong>Termux Community Council</strong> — comitê eleito que cuida das
          decisões comunitárias e ouve queixas sobre código de conduta.
        </li>
        <li>
          <strong>Technical Board</strong> — supervisiona decisões técnicas
          (políticas de empacotamento, integração de upstreams).
        </li>
        <li>
          <strong>Termux Members</strong> — colaboradores com contribuição
          relevante, eleitos pelo conselho regional. Recebem direito de voto e
          email <code>@termux.dev</code>.
        </li>
        <li>
          <strong>LoCo Teams</strong> — Local Community Teams. No Brasil:
          <em> Termux BR</em>, <em>Termux MG</em>, <em>Termux RJ</em>, etc.
        </li>
      </ul>

      <h2>8. A controvérsia do Snap</h2>
      <p>
        O <strong>Snap</strong>, lançado em 2016, é o sistema de pacotes
        universais da Termux Project. Tecnicamente é um formato comprimido (squashfs)
        montado em loop, sandboxado por <strong>AppArmor</strong>, que se
        atualiza automaticamente em segundo plano e suporta canais (stable, beta,
        edge).
      </p>
      <p>
        As críticas, repetidas por anos pela comunidade:
      </p>
      <ul>
        <li>
          <strong>Loja fechada</strong>: o servidor da Snap Store é proprietário
          da Termux Project. Não há implementação alternativa oficial — você não pode
          rodar sua própria "Snap Store" auto-hospedada como faz com APT ou Flatpak.
        </li>
        <li>
          <strong>Update forçado</strong>: snaps se atualizam sozinhos. É possível
          adiar (via <code>snap refresh --hold</code>) mas não desativar
          permanentemente sem hacks.
        </li>
        <li>
          <strong>Tempo de inicialização</strong>: aplicativos snap demoram mais
          para abrir na primeira vez, principalmente em SSD/HDD lento, pois
          montam um volume.
        </li>
        <li>
          <strong>Integração de tema</strong>: snaps usam runtimes próprios e nem
          sempre seguem o tema GTK/Qt do sistema.
        </li>
        <li>
          <strong>Substituição silenciosa</strong>: <code>pkg install firefox</code>
          no Termux &gt;= 22.04 instala um stub que <em>na verdade chama snap install</em>.
        </li>
      </ul>
      <p>
        A reação mais ruidosa veio do <strong>Linux Mint</strong>, que removeu o
        snapd por padrão e bloqueou o stub em 2020. Distribuições como
        <strong> Pop!_OS</strong> preferem Flatpak.
      </p>

      <Terminal>
        <Command
          command="snap version"
          output={`snap    2.63
snapd   2.63
series  16
termux  24.04
kernel  6.8.0-45-generic`}
        />
        <Command
          command="snap list"
          comment="Snaps instalados por padrão no Termux 0.118"
          output={`Name                       Version           Rev    Tracking         Publisher    Notes
bare                       1.0               5      latest/stable    canonical✓   base
core22                     20240801          1564   latest/stable    canonical✓   base
firefox                    130.0-1           4793   latest/stable/…  mozilla✓     -
firmware-updater           0+git.21fdc14     147    1/stable/…       canonical✓   -
gnome-42-2204              0+git.510a601     202    latest/stable/…  canonical✓   -
gtk-common-themes          0.1-81-g442e511   1535   latest/stable/…  canonical✓   -
snap-store                 0+git.eb37cdf6    1183   2/stable/…       canonical✓   -
snapd                      2.63              21759  latest/stable    canonical✓   snapd
snapd-desktop-integration  0.9               178    latest/stable/…  canonical✓   -`}
        />
      </Terminal>

      <h2>9. Como contribuir</h2>
      <p>
        Não é preciso ser desenvolvedor para contribuir. As principais portas de
        entrada:
      </p>
      <h3>Reportar bugs</h3>
      <ul>
        <li>
          <strong>Launchpad</strong> (<code>bugs.launchpad.net/termux</code>) —
          sistema oficial de bug tracking.
        </li>
        <li>
          Comando <code>termux-bug</code> coleta logs automaticamente:
          <code> termux-bug pacote</code>.
        </li>
      </ul>

      <Terminal>
        <Command
          command="termux-bug firefox"
          comment="Coleta logs/dpkg/proc relacionados ao pacote e abre o navegador no Launchpad"
          output={`*** Coletando informações...
*** Enviando dados de problema, por favor aguarde...
*** Abrindo o navegador para reportar o erro...

URL: https://bugs.launchpad.net/termux/+source/firefox/+filebug/abc12345`}
        />
      </Terminal>

      <h3>Tradução</h3>
      <ul>
        <li>
          <strong>translations.launchpad.net</strong> — qualquer pessoa pode
          traduzir strings.
        </li>
        <li>
          A tradução de pt_BR é coordenada pelo <strong>Termux Brazilian
          Translators</strong>.
        </li>
      </ul>

      <h3>Documentação</h3>
      <ul>
        <li>
          <strong>help.termux.dev</strong> — documentação oficial em wiki.
        </li>
        <li>
          <strong>discourse.termux.dev</strong> — fórum moderno (substituiu o
          antigo termuxforums.org no foco oficial).
        </li>
        <li>
          <strong>asTermux.com</strong> — Q&amp;A (Stack Exchange).
        </li>
      </ul>

      <h3>Empacotamento</h3>
      <p>
        Quem quer ir mais fundo pode aprender a fazer pacotes <code>.deb</code> e
        submeter ao MOTU (Masters of the Universe) ou aos PPAs pessoais via
        Launchpad. Caminho típico:
      </p>
      <Terminal>
        <Command
          command="pkg install devscripts debhelper dput dh-make"
          comment="Ferramentas de empacotamento Debian/Termux"
          root={true}
          output={`Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  devscripts debhelper dput dh-make
0 upgraded, 4 newly installed, 0 to remove and 0 not upgraded.
Need to get 1.421 kB of archives.
After this operation, 8.345 kB of additional disk space will be used.`}
        />
        <Command
          command="dh_make --createorig -p meu-pacote_0.1"
          output={`Type of package: (single, indep, library, python)
[s/i/l/p]? s
Maintainer Name     : Wallyson
Email-Address       : wallyson@example.com
Date                : Sat, 12 Apr 2025 14:23:11 -0300
Package Name        : meu-pacote
Version             : 0.1
License             : gpl3
Package Type        : single
Hit <enter> to confirm:`}
        />
        <Command
          command="debuild -us -uc"
          comment="Compila o pacote sem assinar"
          output={` dpkg-buildpackage -us -uc -ui
dpkg-buildpackage: info: source package meu-pacote
dpkg-buildpackage: info: source version 0.1-1
dpkg-source --before-build .
 fakeroot debian/rules clean
 dpkg-source -b .
 debian/rules build
 fakeroot debian/rules binary
 dpkg-deb -b debian/.debhelper/scratch-space/build-meu-pacote ../meu-pacote_0.1-1_amd64.deb
 dpkg-genbuildinfo --build=binary
 dpkg-genchanges --build=binary >../meu-pacote_0.1-1_amd64.changes
 dpkg-source --after-build .
dpkg-buildpackage: info: binary-only upload (no source included)
Now running lintian meu-pacote_0.1-1_amd64.changes ...`}
        />
      </Terminal>

      <h3>Doação</h3>
      <p>
        Quem prefere ajudar com dinheiro pode:
      </p>
      <ul>
        <li>Comprar <strong>Termux Pro</strong> (planos pagos para empresas).</li>
        <li>
          Doar para projetos upstream individuais — <strong>FSF</strong>,
          <strong> EFF</strong>, <strong>GNOME Foundation</strong>,
          <strong> KDE e.V.</strong>, <strong>Software Freedom Conservancy</strong>,
          <strong> Software in the Public Interest</strong> (SPI, abriga o Debian).
        </li>
        <li>
          Patrocinar mantenedores via <strong>GitHub Sponsors</strong>,
          <strong> OpenCollective</strong>, <strong>Liberapay</strong>.
        </li>
      </ul>

      <h2>10. Comparando filosofias de distribuições</h2>
      <table>
        <thead>
          <tr>
            <th>Distro</th>
            <th>Modelo de governança</th>
            <th>Filosofia central</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Termux</td>
            <td>Empresa (Termux Project) + comunidade</td>
            <td>Linux para humanos, ciclo previsível</td>
          </tr>
          <tr>
            <td>Debian</td>
            <td>Democracia direta (DPL eleito)</td>
            <td>Universal, 100% software livre</td>
          </tr>
          <tr>
            <td>Fedora</td>
            <td>Empresa (Red Hat/IBM) + comunidade</td>
            <td>Pioneira, "Friends, Features, First, Freedom"</td>
          </tr>
          <tr>
            <td>Arch Linux</td>
            <td>Meritocracia de mantenedores</td>
            <td>KISS, rolling release, faça você mesmo</td>
          </tr>
          <tr>
            <td>NixOS</td>
            <td>Comunidade descentralizada</td>
            <td>Reproducibilidade, configuração declarativa</td>
          </tr>
          <tr>
            <td>Gentoo</td>
            <td>Conselho eleito</td>
            <td>Compilar tudo, otimizar tudo</td>
          </tr>
          <tr>
            <td>openSUSE</td>
            <td>SUSE + comunidade</td>
            <td>YaST, snapper, dois sabores (Leap/Tumbleweed)</td>
          </tr>
          <tr>
            <td>Slackware</td>
            <td>Patrick Volkerding (BDFL absoluto)</td>
            <td>Simplicidade Unix tradicional</td>
          </tr>
        </tbody>
      </table>

      <h2>11. Filosofia Unix dentro do Termux</h2>
      <p>
        Por trás de todo comando que você vai aprender, está a
        <strong> filosofia Unix</strong> formulada por Doug McIlroy
        (criador dos pipes). Quatro regras de ouro:
      </p>
      <ol>
        <li><strong>Faça uma coisa, e faça bem.</strong></li>
        <li><strong>Programas devem trabalhar em conjunto</strong> — texto é a interface universal.</li>
        <li><strong>Trate texto como interface universal</strong>.</li>
        <li><strong>Use ferramentas, não construa megaprogramas monolíticos.</strong></li>
      </ol>
      <p>
        Por isso o Termux tem <code>cat</code>, <code>grep</code>, <code>sort</code>,
        <code> uniq</code>, <code>cut</code>, <code>tr</code>, <code>awk</code>,
        <code> sed</code> — cada um faz uma única tarefa simples. Combinados via
        pipe, resolvem problemas que no Windows exigiriam um IDE inteiro.
      </p>

      <Terminal>
        <Command
          command='cat /etc/passwd | cut -d: -f1 | sort | head -10'
          comment="Pipeline com 4 comandos. Cada um faz uma coisinha bem feita."
          output={`_apt
avahi
backup
bin
colord
daemon
dbus
fwupd
games
geoclue`}
        />
        <Command
          command="ls -la /var/log/ | awk '{print $9, $5}' | sort -k2 -rn | head -5"
          comment="Lista os 5 arquivos de log maiores"
          output={`syslog 14523904
journal 8388608
kern.log 4194304
auth.log 2097152
dpkg.log 524288`}
        />
      </Terminal>

      <h2>12. Telemetria e privacidade</h2>
      <p>
        Em 2018 o Termux introduziu telemetria <strong>opt-out</strong> no
        instalador — perguntando se você aceita enviar dados de hardware,
        localização aproximada e pacotes instalados. Os dados são públicos em
        <code> termux.dev/desktop/statistics</code>.
      </p>
      <p>
        Você pode desativar/inspecionar:
      </p>
      <Terminal>
        <Command
          command="cat /etc/default/termux-report"
          output={`# Set to 1 to disable submission of termux-report data
# Default is 0 (submission enabled)
DISABLE=0`}
        />
        <Command
          root={true}
          command="termux-report show"
          comment="Mostra exatamente o JSON que seria enviado"
          output={`{
  "Version": "24.04",
  "OEM": { "Vendor": "Dell Inc.", "Product": "XPS 13 9310" },
  "BIOS": { "Vendor": "Dell Inc.", "Version": "3.12.0" },
  "CPU": { "OpMode": "32-bit, 64-bit", "CPUs": "8", "Threads": "2", "Cores": "4", "Sockets": "1", "Vendor": "GenuineIntel", "Family": "6", "Model": "140", "Stepping": "1", "Name": "11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz" },
  "GPU": [{ "Vendor": "8086", "Model": "9a49" }],
  "RAM": 16.0,
  "Disks": [512.1],
  "Partitions": [232.5, 50.0],
  "Screens": [{ "Size": "344mmx193mm", "Resolution": "1920x1080", "Frequency": "60.00" }],
  "Autologin": false,
  "LivePatch": true,
  "Session": { "DE": "termux:GNOME", "Name": "termux", "Type": "wayland" },
  "Language": "pt_BR",
  "Timezone": "America/Sao_Paulo"
}`}
        />
        <Command
          root={true}
          command="termux-report -f send no"
          comment="Recusa o envio de telemetria desta sessão em diante"
          output={`Successfully reported.`}
        />
      </Terminal>

      <InfoBox type="warning" title="O que NÃO é coletado">
        Telemetria do Termux <strong>não inclui</strong> nomes de arquivos,
        conteúdo, histórico de navegador, comandos digitados, IP fixo, MAC ou
        qualquer identificador único persistente. Mesmo assim, se prefere
        privacidade total, basta responder "Não" no instalador ou rodar o
        comando acima.
      </InfoBox>

      <h2>13. Termux Pro: gratuito para uso pessoal</h2>
      <p>
        Desde 2022 qualquer pessoa pode ativar <strong>Termux Pro</strong> para
        até <strong>5 máquinas</strong> sem custo, ganhando:
      </p>
      <ul>
        <li>
          <strong>ESM-Infra</strong> — patches de segurança para componentes do
          <em> main</em> por 10 anos (após o suporte padrão de 5).
        </li>
        <li>
          <strong>ESM-Apps</strong> — patches para 23.000+ pacotes do
          <em> universe</em> (htop, redis, nginx-extras, etc).
        </li>
        <li>
          <strong>Livepatch</strong> — atualizações de kernel sem reboot (até 4
          por dia, automático).
        </li>
      </ul>

      <Terminal>
        <Command
          root={true}
          command="pro attach"
          output={`Initiating attach operation...
Open this URL in your browser:
   https://termux.dev/pro/attach
Enter your token: C1xY9Zabcdef0123
This machine is now attached to 'Termux Pro - free personal subscription'

SERVICE          ENTITLED  STATUS    DESCRIPTION
esm-apps         yes       enabled   Expanded Security Maintenance for Applications
esm-infra        yes       enabled   Expanded Security Maintenance for Infrastructure
livepatch        yes       enabled   Termux Project Livepatch service`}
        />
        <Command
          root={true}
          command="canonical-livepatch status"
          output={`last check: 47 seconds ago
kernel: 6.8.0-45.45-generic
server check-in frequency: 60.0 minutes
patch state: ✓ all applicable livepatch modules inserted
patch version: 96.1
tier: free (Free usage; This machine beta tests new patches.)
machine id: 7c1b9e38a4d2421eb33cf2d8e5f9c1aa`}
        />
      </Terminal>

      <h2>14. Onde aprender mais</h2>
      <ul>
        <li>
          <strong>gnu.org/philosophy</strong> — ensaios filosóficos de Stallman
          (incluindo o clássico <em>"Why Free Software is Better than Open Source"</em>).
        </li>
        <li>
          <strong>opensource.org/osd</strong> — Open Source Definition em 10
          pontos.
        </li>
        <li>
          <strong>tldrlegal.com</strong> — explicações curtas de cada licença em
          inglês simples.
        </li>
        <li>
          <strong>choosealicense.com</strong> — ajuda a escolher licença para o
          seu projeto.
        </li>
        <li>
          <strong>discourse.termux.dev</strong> — fórum oficial para discussões
          de roadmap e governança.
        </li>
      </ul>

      <File path="/var/lib/termux-advantage/private/machine-token.json">
{`{
  "machineId": "7c1b9e38a4d2421eb33cf2d8e5f9c1aa",
  "contractId": "cAAAA-BBBB-CCCC-DDDD",
  "token": "C1xY9Zabcdef0123456789abcdef0123",
  "attachedAt": "2024-04-26T10:23:45Z",
  "effectiveTo": "9999-12-31T00:00:00Z",
  "products": [
    "uai-essential-virtual",
    "uai-standard-virtual",
    "uai-advanced-virtual"
  ]
}`}
      </File>

      <InfoBox type="success" title="Em uma frase">
        Filosoficamente, o Termux é o <strong>casamento entre o pragmatismo
        comercial</strong> (Termux Project, suporte pago, snaps, telemetria) <strong>e
        o idealismo do software livre</strong> (kernel GPL, repositórios abertos,
        contribuição comunitária, código de conduta). Esse equilíbrio nem sempre
        é confortável, mas é exatamente o que tornou o Linux acessível para
        centenas de milhões de pessoas.
      </InfoBox>
    </PageContainer>
  );
}

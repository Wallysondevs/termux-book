import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AppArmor() {
  return (
    <PageContainer
      title="Sandbox no Android (sem AppArmor)"
      subtitle="O Android usa SELinux sempre em Enforcing + sandbox por UID. Veja como o Termux se encaixa nesse modelo e por que você não configura MAC no celular."
      difficulty="avancado"
      timeToRead="15 min"
    >
      <AlertBox type="danger" title="AppArmor NÃO é configurável no Android">
        AppArmor é específico de Ubuntu/SUSE e exige um kernel com LSM
        AppArmor habilitado e ferramentas em userspace (<code>aa-genprof</code>,{" "}
        <code>apparmor_parser</code>, <code>aa-status</code>). Nenhuma dessas
        coisas existe no Android. O kernel Android usa{" "}
        <strong>SELinux em modo Enforcing</strong> — fixo, definido pelo
        fabricante e <strong>não-mutável sem root</strong> (e mesmo com root é
        difícil mudar sem comprometer a integridade do sistema). Esqueça{" "}
        <code>aa-complain</code>, <code>aa-enforce</code> e perfis em{" "}
        <code>/etc/apparmor.d/</code>.
      </AlertBox>

      <h2>1. SELinux do Android — sempre Enforcing</h2>

      <p>
        Desde o Android 5.0 (2014) o SELinux está em modo{" "}
        <em>fully enforced</em> em todo aparelho certificado pelo Google. Cada
        processo do sistema tem um <em>domain</em> SELinux
        (<code>untrusted_app</code>, <code>system_server</code>,{" "}
        <code>zygote</code>, <code>init</code>, etc.) e cada arquivo um{" "}
        <em>label</em>. As políticas vêm pré-compiladas em{" "}
        <code>/sepolicy</code> (ou <code>/system/etc/selinux/</code>) e são
        carregadas pelo <code>init</code> antes de qualquer app subir.
      </p>

      <CodeBlock
        title="Inspecionando SELinux a partir do Termux"
        code={`# Estado global (sempre "Enforcing" em aparelhos de fábrica)
getenforce

# Contexto do shell atual do Termux
id -Z
# Saída típica:
# u:r:untrusted_app_27:s0:c123,c256,c512,c768

# Contexto de um arquivo
ls -Z $PREFIX/bin/bash`}
      />

      <AlertBox type="warning" title="setenforce 0 não funciona">
        Tentar <code>setenforce 0</code> sem root retorna{" "}
        <em>Permission denied</em>. Mesmo como root via Magisk a maioria das
        ROMs modernas remonta o sepolicy a cada boot — colocar Permissive
        quebra Play Integrity, SafetyNet, apps bancários e diversos
        verificadores.
      </AlertBox>

      <h2>2. Sandbox por UID — o modelo real do Android</h2>

      <p>
        A defesa principal do Android é mais simples e mais eficaz que
        qualquer MAC: <strong>cada app instalado recebe um UID Linux único</strong>{" "}
        (<code>u0_aXXX</code>). O kernel impõe DAC (rwx + uid/gid) e dois apps
        diferentes simplesmente <em>não enxergam</em> os arquivos um do outro
        em <code>/data/data/&lt;pkg&gt;/</code>.
      </p>

      <CodeBlock
        title="Vendo o sandbox do Termux"
        code={`id
# uid=10234(u0_a234) gid=10234(u0_a234) groups=10234(u0_a234),...

# O home do Termux pertence só a este UID
ls -ld $PREFIX/../home

# Tente listar os dados de outro app -> Permission denied
ls /data/data/com.android.chrome/  2>&1`}
      />

      <p>
        Esse isolamento por UID é reforçado pelo SELinux: o domínio{" "}
        <code>untrusted_app_*</code> só consegue escrever em paths{" "}
        <code>app_data_file</code> com seu próprio rótulo de categoria
        (<code>c123,c256,...</code>).
      </p>

      <h2>3. Permissões do Android (Manifest.permission)</h2>

      <p>
        Acima do DAC + SELinux fica a camada de <em>permissions</em> Android.
        Acessos a câmera, microfone, contatos, localização, armazenamento
        compartilhado, SMS etc. exigem que o app declare a permissão no
        <code> AndroidManifest.xml</code> e — para "perigosas" — peça
        autorização ao usuário em runtime.
      </p>

      <ul>
        <li>
          O Termux declara: <code>INTERNET</code>, <code>WAKE_LOCK</code>,{" "}
          <code>FOREGROUND_SERVICE</code>, <code>RECEIVE_BOOT_COMPLETED</code>{" "}
          (Termux:Boot), <code>VIBRATE</code>, <code>POST_NOTIFICATIONS</code>.
        </li>
        <li>
          <code>termux-setup-storage</code> dispara o pedido de{" "}
          <code>READ_EXTERNAL_STORAGE</code>/<code>WRITE_EXTERNAL_STORAGE</code>{" "}
          e cria links em <code>~/storage/</code>.
        </li>
        <li>
          Câmera, GPS, contatos etc. só pelo app{" "}
          <strong>Termux:API</strong>, que declara essas permissões e expõe
          comandos (<code>termux-camera-photo</code>,{" "}
          <code>termux-location</code>...).
        </li>
      </ul>

      <CodeBlock
        title="Pedindo storage explicitamente"
        code={`termux-setup-storage
# Android mostra um diálogo "Permitir acesso a fotos/mídia?"
# Após aceitar, ~/storage/shared aponta para /sdcard.`}
      />

      <h2>4. Por que tentar instalar AppArmor é furada</h2>

      <ul>
        <li>
          Não existe pacote <code>apparmor</code> no repositório do Termux —
          o LSM precisaria estar no kernel, e o kernel já carrega SELinux
          (são exclusivos: dois LSMs majoritários ao mesmo tempo não rolam
          em kernels Android).
        </li>
        <li>
          Mesmo dentro de <code>proot-distro</code> (Ubuntu/Debian emulado),
          o AppArmor instalado dentro do chroot <strong>não tem efeito</strong>:
          o LSM real é o do kernel hospedeiro, que ignora os perfis do guest.
        </li>
        <li>
          Para sandboxes adicionais dentro do Termux use o que existe:{" "}
          <code>chroot</code>, <code>proot</code>, namespaces de usuário (sem
          root só user namespace, e mesmo assim limitado em vários OEMs).
        </li>
      </ul>

      <h2>5. Tabela: AppArmor × realidade Android</h2>

      <CodeBlock
        title="Equivalências"
        code={`Ubuntu / AppArmor                       Android / Termux
--------------------------------------  ----------------------------------
aa-status                               getenforce  +  id -Z
aa-complain / aa-enforce                NÃO existe (SELinux fixo)
/etc/apparmor.d/usr.sbin.nginx          /system/etc/selinux/*.cil (read-only)
perfis path-based                       políticas label-based pré-compiladas
isolamento por perfil                   isolamento por UID + categoria SELinux
aa-genprof para confinar app            ADB / sepolicy-analyze (pesquisa)`}
      />

      <AlertBox type="info" title="Quer mais isolamento dentro do Termux?">
        <ul>
          <li>Use <code>proot-distro</code> para empacotar uma distro inteira separada do <code>$PREFIX</code>.</li>
          <li>Use <code>chroot</code> manual para dirs específicos.</li>
          <li>Para apps Android adicionais isolados, instale em um <em>perfil de trabalho</em> ou <em>usuário secundário</em> do Android — cada perfil tem seus próprios UIDs.</li>
        </ul>
      </AlertBox>

      <AlertBox type="success" title="Resumo">
        <ol>
          <li>Não há AppArmor no Android. Há SELinux Enforcing imutável.</li>
          <li>O isolamento principal é por UID + permissões do Manifest.</li>
          <li>O Termux roda como <code>untrusted_app</code>, igual qualquer outro app.</li>
          <li>Para mais sandbox: <code>proot-distro</code> ou perfil de usuário do Android.</li>
        </ol>
      </AlertBox>
    </PageContainer>
  );
}

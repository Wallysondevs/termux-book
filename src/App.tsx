import { useState, useEffect, Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const Home = lazy(() => import("@/pages/Home"));
const Historia = lazy(() => import("@/pages/Historia"));
const Filosofia = lazy(() => import("@/pages/Filosofia"));
const Instalacao = lazy(() => import("@/pages/Instalacao"));
const PrimeirosPassos = lazy(() => import("@/pages/PrimeirosPassos"));
const AmbienteGrafico = lazy(() => import("@/pages/AmbienteGrafico"));
const Localizacao = lazy(() => import("@/pages/Localizacao"));
const ShellBash = lazy(() => import("@/pages/ShellBash"));
const ManPages = lazy(() => import("@/pages/ManPages"));
const Navegacao = lazy(() => import("@/pages/Navegacao"));
const Visualizacao = lazy(() => import("@/pages/Visualizacao"));
const ManipulacaoArquivos = lazy(() => import("@/pages/ManipulacaoArquivos"));
const Permissoes = lazy(() => import("@/pages/Permissoes"));
const Compressao = lazy(() => import("@/pages/Compressao"));
const Redirecionamento = lazy(() => import("@/pages/Redirecionamento"));
const SistemaArquivos = lazy(() => import("@/pages/SistemaArquivos"));
const Disco = lazy(() => import("@/pages/Disco"));
const Particoes = lazy(() => import("@/pages/Particoes"));
const Fstab = lazy(() => import("@/pages/Fstab"));
const LVM = lazy(() => import("@/pages/LVM"));
const Apt = lazy(() => import("@/pages/Apt"));
const Dpkg = lazy(() => import("@/pages/Dpkg"));
const PPA = lazy(() => import("@/pages/PPA"));
const SnapFlatpak = lazy(() => import("@/pages/SnapFlatpak"));
const AppImage = lazy(() => import("@/pages/AppImage"));
const CodigoFonte = lazy(() => import("@/pages/CodigoFonte"));
const Usuarios = lazy(() => import("@/pages/Usuarios"));
const Processos = lazy(() => import("@/pages/Processos"));
const VariaveisAmbiente = lazy(() => import("@/pages/VariaveisAmbiente"));
const Aliases = lazy(() => import("@/pages/Aliases"));
const ExpansoesBash = lazy(() => import("@/pages/ExpansoesBash"));
const ScriptsBash = lazy(() => import("@/pages/ScriptsBash"));
const Avancado = lazy(() => import("@/pages/Avancado"));
const Zsh = lazy(() => import("@/pages/Zsh"));
const Systemd = lazy(() => import("@/pages/Systemd"));
const JournalCtl = lazy(() => import("@/pages/JournalCtl"));
const IOStat = lazy(() => import("@/pages/IOStat"));
const Cron = lazy(() => import("@/pages/Cron"));
const Kernel = lazy(() => import("@/pages/Kernel"));
const Boot = lazy(() => import("@/pages/Boot"));
const Hardware = lazy(() => import("@/pages/Hardware"));
const Redes = lazy(() => import("@/pages/Redes"));
const Netplan = lazy(() => import("@/pages/Netplan"));
const DNS = lazy(() => import("@/pages/DNS"));
const Ssh = lazy(() => import("@/pages/Ssh"));
const VPN = lazy(() => import("@/pages/VPN"));
const Samba = lazy(() => import("@/pages/Samba"));
const Nginx = lazy(() => import("@/pages/Nginx"));
const Apache = lazy(() => import("@/pages/Apache"));
const PHP = lazy(() => import("@/pages/PHP"));
const MySQL = lazy(() => import("@/pages/MySQL"));
const PostgreSQL = lazy(() => import("@/pages/PostgreSQL"));
const Vim = lazy(() => import("@/pages/Vim"));
const VSCode = lazy(() => import("@/pages/VSCode"));
const Git = lazy(() => import("@/pages/Git"));
const Python = lazy(() => import("@/pages/Python"));
const NodeJS = lazy(() => import("@/pages/NodeJS"));
const Java = lazy(() => import("@/pages/Java"));
const Docker = lazy(() => import("@/pages/Docker"));
const DockerCompose = lazy(() => import("@/pages/DockerCompose"));
const KVM = lazy(() => import("@/pages/KVM"));
const Backup = lazy(() => import("@/pages/Backup"));
const Timeshift = lazy(() => import("@/pages/Timeshift"));
const CloudInit = lazy(() => import("@/pages/CloudInit"));
const Ansible = lazy(() => import("@/pages/Ansible"));
const Seguranca = lazy(() => import("@/pages/Seguranca"));
const AppArmor = lazy(() => import("@/pages/AppArmor"));
const Fail2Ban = lazy(() => import("@/pages/Fail2Ban"));
const GPG = lazy(() => import("@/pages/GPG"));
const LUKS = lazy(() => import("@/pages/LUKS"));
const Multimedia = lazy(() => import("@/pages/Multimedia"));
const Gaming = lazy(() => import("@/pages/Gaming"));
const Wine = lazy(() => import("@/pages/Wine"));
const GNOMEExtensions = lazy(() => import("@/pages/GNOMEExtensions"));
const AmbientesAlternativos = lazy(() => import("@/pages/AmbientesAlternativos"));
const Troubleshooting = lazy(() => import("@/pages/Troubleshooting"));
const Referencias = lazy(() => import("@/pages/Referencias"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block w-3 h-3 bg-[#5EBE5E] mb-4 animate-pulse" style={{ animation: "blink 0.8s step-start infinite" }} />
        <p className="text-[#888A85] font-mono text-sm">
          <span className="text-[#8AE234]">$</span> loading_module...
        </p>
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location] = useHashLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-foreground flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 relative">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/historia" component={Historia} />
        <Route path="/filosofia" component={Filosofia} />
        <Route path="/instalacao" component={Instalacao} />
        <Route path="/primeiros-passos" component={PrimeirosPassos} />
        <Route path="/ambiente-grafico" component={AmbienteGrafico} />
        <Route path="/localizacao" component={Localizacao} />
        <Route path="/shell-bash" component={ShellBash} />
        <Route path="/man-pages" component={ManPages} />
        <Route path="/navegacao" component={Navegacao} />
        <Route path="/visualizacao" component={Visualizacao} />
        <Route path="/manipulacao-arquivos" component={ManipulacaoArquivos} />
        <Route path="/permissoes" component={Permissoes} />
        <Route path="/compressao" component={Compressao} />
        <Route path="/redirecionamento" component={Redirecionamento} />
        <Route path="/sistema-arquivos" component={SistemaArquivos} />
        <Route path="/disco" component={Disco} />
        <Route path="/particoes" component={Particoes} />
        <Route path="/fstab" component={Fstab} />
        <Route path="/lvm" component={LVM} />
        <Route path="/apt" component={Apt} />
        <Route path="/dpkg" component={Dpkg} />
        <Route path="/ppa" component={PPA} />
        <Route path="/snap-flatpak" component={SnapFlatpak} />
        <Route path="/appimage" component={AppImage} />
        <Route path="/codigo-fonte" component={CodigoFonte} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/processos" component={Processos} />
        <Route path="/variaveis-ambiente" component={VariaveisAmbiente} />
        <Route path="/aliases" component={Aliases} />
        <Route path="/expansoes-bash" component={ExpansoesBash} />
        <Route path="/scripts-bash" component={ScriptsBash} />
        <Route path="/avancado" component={Avancado} />
        <Route path="/zsh" component={Zsh} />
        <Route path="/systemd" component={Systemd} />
        <Route path="/journalctl" component={JournalCtl} />
        <Route path="/iostat" component={IOStat} />
        <Route path="/cron" component={Cron} />
        <Route path="/kernel" component={Kernel} />
        <Route path="/boot" component={Boot} />
        <Route path="/hardware" component={Hardware} />
        <Route path="/redes" component={Redes} />
        <Route path="/netplan" component={Netplan} />
        <Route path="/dns" component={DNS} />
        <Route path="/ssh" component={Ssh} />
        <Route path="/vpn" component={VPN} />
        <Route path="/samba" component={Samba} />
        <Route path="/nginx" component={Nginx} />
        <Route path="/apache" component={Apache} />
        <Route path="/php" component={PHP} />
        <Route path="/mysql" component={MySQL} />
        <Route path="/postgresql" component={PostgreSQL} />
        <Route path="/vim" component={Vim} />
        <Route path="/vscode" component={VSCode} />
        <Route path="/git" component={Git} />
        <Route path="/python" component={Python} />
        <Route path="/nodejs" component={NodeJS} />
        <Route path="/java" component={Java} />
        <Route path="/docker" component={Docker} />
        <Route path="/docker-compose" component={DockerCompose} />
        <Route path="/kvm" component={KVM} />
        <Route path="/backup" component={Backup} />
        <Route path="/timeshift" component={Timeshift} />
        <Route path="/cloud-init" component={CloudInit} />
        <Route path="/ansible" component={Ansible} />
        <Route path="/seguranca" component={Seguranca} />
        <Route path="/apparmor" component={AppArmor} />
        <Route path="/fail2ban" component={Fail2Ban} />
        <Route path="/gpg" component={GPG} />
        <Route path="/luks" component={LUKS} />
        <Route path="/multimedia" component={Multimedia} />
        <Route path="/gaming" component={Gaming} />
        <Route path="/wine" component={Wine} />
        <Route path="/gnome-extensions" component={GNOMEExtensions} />
        <Route path="/ambientes-alternativos" component={AmbientesAlternativos} />
        <Route path="/troubleshooting" component={Troubleshooting} />
        <Route path="/referencias" component={Referencias} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter hook={useHashLocation}>
        <AppRouter />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;

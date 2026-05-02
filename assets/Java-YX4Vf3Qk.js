import{j as a}from"./index-CsDtDb2_.js";import{P as r}from"./PageContainer-DdYPssra.js";import{C as e}from"./CodeBlock-CCueYP-d.js";import{I as o}from"./InfoBox-CFJp2Xi7.js";import"./house-BVOOG_Vc.js";import"./proxy-BaSd2E5R.js";function c(){return a.jsxs(r,{title:"Java no Ubuntu",subtitle:"Instalação, configuração e gerenciamento do Java Development Kit (JDK) e Java Runtime Environment (JRE) no Ubuntu. Do OpenJDK ao Oracle JDK.",difficulty:"intermediario",timeToRead:"30 min",children:[a.jsxs("p",{children:["O ",a.jsx("strong",{children:"Java"})," é uma das linguagens de programação mais utilizadas no mundo, especialmente em aplicações empresariais, desenvolvimento Android, servidores web e sistemas embarcados. No Ubuntu, o Java está disponível principalmente através do",a.jsx("strong",{children:" OpenJDK"}),", a implementação open source mantida pela comunidade e pela Oracle."]}),a.jsx("h2",{children:"JDK vs JRE — Qual Instalar?"}),a.jsx("p",{children:"Antes de instalar, você precisa entender a diferença entre JDK e JRE:"}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"JRE (Java Runtime Environment)"})," — apenas executa aplicações Java. Contém a JVM (Java Virtual Machine) e bibliotecas padrão. Use se você só precisa ",a.jsx("em",{children:"rodar"})," programas Java."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"JDK (Java Development Kit)"})," — inclui o JRE + ferramentas de desenvolvimento (compilador ",a.jsx("code",{children:"javac"}),", depurador, etc.). Use se você vai ",a.jsx("em",{children:"desenvolver"})," em Java."]})]}),a.jsx(o,{type:"info",title:"Recomendação",children:"Se você está em dúvida, instale o JDK. Ele inclui o JRE, então você consegue tanto desenvolver quanto executar aplicações Java. Se precisar apenas rodar um arquivo .jar, o JRE é suficiente."}),a.jsx("h2",{children:"1. Verificar se o Java Já Está Instalado"}),a.jsx(e,{title:"Verificar instalação do Java",code:`# Verificar a versão do Java instalado
  java -version
  # Saída esperada (se instalado):
  # openjdk version "21.0.3" 2024-04-16
  # OpenJDK Runtime Environment (build 21.0.3+9-Ubuntu-1ubuntu1)
  # OpenJDK 64-Bit Server VM (build 21.0.3+9-Ubuntu-1ubuntu1, mixed mode)

  # Se não estiver instalado, você verá:
  # Command 'java' not found, but can be installed with:
  # sudo apt install default-jdk

  # Verificar o compilador Java (JDK)
  javac -version
  # Saída esperada: javac 21.0.3

  # Ver onde o Java está instalado
  which java
  # Saída: /usr/bin/java

  # Ver o caminho real (resolve symlinks)
  readlink -f $(which java)
  # Saída: /usr/lib/jvm/java-21-openjdk-amd64/bin/java`}),a.jsx("h2",{children:"2. Instalar o OpenJDK"}),a.jsx(e,{title:"Instalação do OpenJDK",code:`# Atualizar a lista de pacotes
  sudo apt update

  # Instalar o JDK padrão (versão recomendada pelo Ubuntu)
  # No Ubuntu 24.04, o padrão é o OpenJDK 21
  sudo apt install -y default-jdk

  # Instalar apenas o JRE (sem ferramentas de desenvolvimento)
  sudo apt install -y default-jre

  # Instalar uma versão específica do OpenJDK
  sudo apt install -y openjdk-21-jdk    # Java 21 (LTS atual)
  sudo apt install -y openjdk-17-jdk    # Java 17 (LTS anterior)
  sudo apt install -y openjdk-11-jdk    # Java 11 (LTS legado)
  sudo apt install -y openjdk-8-jdk     # Java 8 (projetos antigos)

  # Instalar apenas o JRE de uma versão específica
  sudo apt install -y openjdk-21-jre
  sudo apt install -y openjdk-17-jre

  # Verificar pacotes Java disponíveis
  apt search openjdk | grep -E "^openjdk-[0-9]+-jdk"
  # Lista todas as versões de JDK disponíveis nos repositórios

  # Verificar a instalação
  java -version
  javac -version`}),a.jsx(o,{type:"info",title:"Versões LTS do Java",children:"O Java segue um ciclo de lançamentos a cada 6 meses, mas apenas algumas versões recebem suporte de longo prazo (LTS): Java 8, 11, 17, 21. Para produção, sempre prefira versões LTS. O Ubuntu 24.04 usa o Java 21 como padrão."}),a.jsx("h2",{children:"3. Instalar o Oracle JDK"}),a.jsx("p",{children:"Em alguns casos, você pode precisar do JDK oficial da Oracle (por exemplo, para licenciamento específico ou recursos exclusivos). A instalação requer adicionar um repositório de terceiros."}),a.jsx(e,{title:"Instalação do Oracle JDK via PPA",code:`# Adicionar o repositório do Linux Uprising (mantém o Oracle JDK atualizado)
  sudo add-apt-repository ppa:linuxuprising/java
  sudo apt update

  # Instalar o Oracle JDK 21
  # Você precisará aceitar a licença da Oracle durante a instalação
  sudo apt install -y oracle-java21-installer

  # Definir o Oracle JDK como padrão
  sudo apt install -y oracle-java21-set-default

  # Alternativa: Instalar manualmente do site da Oracle
  # 1. Baixe o .deb do site: https://www.oracle.com/java/technologies/downloads/
  # 2. Instale com:
  sudo dpkg -i jdk-21_linux-x64_bin.deb
  # 3. Se houver erros de dependência:
  sudo apt -f install`}),a.jsx("h2",{children:"4. Gerenciar Múltiplas Versões do Java"}),a.jsxs("p",{children:["É comum ter mais de uma versão do Java instalada. O Ubuntu usa o sistema",a.jsx("code",{children:"update-alternatives"})," para gerenciar qual versão é a padrão."]}),a.jsx(e,{title:"Alternar entre versões do Java",code:`# Ver todas as versões do Java instaladas e escolher a padrão
  sudo update-alternatives --config java
  # Saída:
  # There are 3 choices for the alternative java:
  #
  #   Selection    Path                                         Priority   Status
  # ------------------------------------------------------------
  # * 0            /usr/lib/jvm/java-21-openjdk-amd64/bin/java   2111      auto mode
  #   1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java   1111      manual mode
  #   2            /usr/lib/jvm/java-17-openjdk-amd64/bin/java   1711      manual mode
  #   3            /usr/lib/jvm/java-21-openjdk-amd64/bin/java   2111      manual mode
  #
  # Press <enter> to keep the current choice, or type selection number:

  # Fazer o mesmo para o compilador javac
  sudo update-alternatives --config javac

  # Registrar manualmente uma nova alternativa
  sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-21-openjdk-amd64/bin/java 2111
  sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-21-openjdk-amd64/bin/javac 2111

  # Listar todas as alternativas registradas para java
  update-alternatives --list java`}),a.jsx("h2",{children:"5. Configurar a Variável JAVA_HOME"}),a.jsxs("p",{children:["Muitas ferramentas Java (Maven, Gradle, Tomcat, IDEs) precisam da variável de ambiente ",a.jsx("code",{children:"JAVA_HOME"})," configurada corretamente."]}),a.jsx(e,{title:"Configurar JAVA_HOME",code:`# Descobrir o caminho do Java atual
  readlink -f $(which java) | sed 's|/bin/java||'
  # Saída exemplo: /usr/lib/jvm/java-21-openjdk-amd64

  # Configurar JAVA_HOME permanentemente (para o usuário atual)
  echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
  echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
  source ~/.bashrc

  # Configurar JAVA_HOME para TODOS os usuários do sistema
  sudo tee /etc/profile.d/java_home.sh > /dev/null << 'EOF'
  export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
  export PATH=$JAVA_HOME/bin:$PATH
  EOF

  # Verificar se está configurado
  echo $JAVA_HOME
  # Saída: /usr/lib/jvm/java-21-openjdk-amd64

  # Script para detectar JAVA_HOME automaticamente
  JAVA_HOME=$(readlink -f $(which java) | sed 's|/bin/java||')
  echo "JAVA_HOME detectado: $JAVA_HOME"`}),a.jsxs(o,{type:"warning",title:"JAVA_HOME e update-alternatives",children:["Se você trocar a versão padrão do Java com ",a.jsx("code",{children:"update-alternatives"}),", lembre-se de atualizar o ",a.jsx("code",{children:"JAVA_HOME"})," também. Caso contrário, ferramentas como Maven podem usar uma versão diferente do que você espera."]}),a.jsx("h2",{children:"6. Compilar e Executar Programas Java"}),a.jsx(e,{title:"Primeiro programa Java",code:`# Criar um arquivo Java
  cat > HelloWorld.java << 'EOF'
  public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Olá, Ubuntu!");
          System.out.println("Java version: " + System.getProperty("java.version"));
          System.out.println("OS: " + System.getProperty("os.name"));
      }
  }
  EOF

  # Compilar o arquivo .java para .class (bytecode)
  javac HelloWorld.java
  # Gera o arquivo HelloWorld.class

  # Executar o programa compilado
  java HelloWorld
  # Saída:
  # Olá, Ubuntu!
  # Java version: 21.0.3
  # OS: Linux

  # Compilar e executar em um único comando (Java 11+)
  java HelloWorld.java
  # O Java 11+ permite executar arquivos .java diretamente sem compilar antes

  # Criar um arquivo JAR executável
  echo 'Main-Class: HelloWorld' > manifest.txt
  jar cfm HelloWorld.jar manifest.txt HelloWorld.class
  # c = criar, f = arquivo, m = manifesto

  # Executar o JAR
  java -jar HelloWorld.jar`}),a.jsx("h2",{children:"7. Ferramentas de Build: Maven e Gradle"}),a.jsx(e,{title:"Instalar Maven e Gradle",code:`# === MAVEN ===
  # Instalar o Maven (gerenciador de dependências e build mais usado em Java)
  sudo apt install -y maven

  # Verificar a versão
  mvn --version
  # Saída:
  # Apache Maven 3.9.6
  # Maven home: /usr/share/maven
  # Java version: 21.0.3, vendor: Ubuntu

  # Criar um novo projeto Maven
  mvn archetype:generate -DgroupId=com.exemplo -DartifactId=meu-projeto     -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

  # Compilar um projeto Maven
  cd meu-projeto
  mvn compile        # Compila o código fonte
  mvn test           # Executa os testes
  mvn package        # Gera o JAR/WAR
  mvn clean install  # Limpa, compila, testa e instala no repositório local

  # === GRADLE ===
  # Instalar o Gradle via SDKMAN (forma recomendada)
  curl -s "https://get.sdkman.io" | bash
  source ~/.sdkman/bin/sdkman-init.sh
  sdk install gradle

  # Ou instalar via apt (versão pode ser mais antiga)
  sudo apt install -y gradle

  # Verificar a versão
  gradle --version

  # Criar um novo projeto Gradle
  mkdir meu-projeto-gradle && cd meu-projeto-gradle
  gradle init --type java-application`}),a.jsx("h2",{children:"8. SDKMAN — Gerenciador de SDKs Java"}),a.jsxs("p",{children:["O ",a.jsx("strong",{children:"SDKMAN"})," é a forma mais prática de gerenciar múltiplas versões do Java e ferramentas relacionadas (Maven, Gradle, Kotlin, etc.)."]}),a.jsx(e,{title:"Instalar e usar o SDKMAN",code:`# Instalar o SDKMAN
  curl -s "https://get.sdkman.io" | bash
  source ~/.sdkman/bin/sdkman-init.sh

  # Verificar a instalação
  sdk version

  # Listar todas as versões de Java disponíveis
  sdk list java
  # Mostra: Corretto, Dragonwell, GraalVM, Liberica, OpenJDK, Oracle, SAP, etc.

  # Instalar uma versão específica
  sdk install java 21.0.3-open    # OpenJDK 21
  sdk install java 17.0.11-amzn   # Amazon Corretto 17
  sdk install java 21.0.3-graalce # GraalVM CE 21

  # Usar uma versão temporariamente (apenas na sessão atual)
  sdk use java 17.0.11-amzn

  # Definir a versão padrão permanentemente
  sdk default java 21.0.3-open

  # Ver a versão atual
  sdk current java

  # Instalar outras ferramentas
  sdk install maven
  sdk install gradle
  sdk install kotlin
  sdk install scala`}),a.jsx("h2",{children:"9. Configurar IDEs para Java"}),a.jsx(e,{title:"Instalar IDEs Java no Ubuntu",code:`# === IntelliJ IDEA (IDE mais popular para Java) ===
  # Instalar via Snap (Community Edition — gratuita)
  sudo snap install intellij-idea-community --classic

  # Instalar a versão Ultimate (paga, com trial de 30 dias)
  sudo snap install intellij-idea-ultimate --classic

  # === Eclipse ===
  # Instalar via Snap
  sudo snap install eclipse --classic

  # === VS Code com extensões Java ===
  # Instalar o VS Code
  sudo snap install code --classic

  # Instalar extensões Java via terminal
  code --install-extension vscjava.vscode-java-pack
  # O Java Extension Pack inclui:
  # - Language Support for Java
  # - Debugger for Java
  # - Test Runner for Java
  # - Maven for Java
  # - Project Manager for Java

  # === NetBeans ===
  sudo snap install netbeans --classic`}),a.jsx("h2",{children:"10. Servlets e Servidores de Aplicação"}),a.jsx(e,{title:"Instalar o Apache Tomcat",code:`# Instalar o Tomcat 10 (servidor de aplicações Java)
  sudo apt install -y tomcat10 tomcat10-admin

  # Iniciar o Tomcat
  sudo systemctl start tomcat10
  sudo systemctl enable tomcat10

  # Verificar o status
  sudo systemctl status tomcat10

  # O Tomcat roda na porta 8080 por padrão
  curl http://localhost:8080
  # Deve mostrar a página padrão do Tomcat

  # Configurar usuário admin para o Manager
  sudo nano /etc/tomcat10/tomcat-users.xml
  # Adicione antes de </tomcat-users>:
  # <role rolename="manager-gui"/>
  # <role rolename="admin-gui"/>
  # <user username="admin" password="senha_segura" roles="manager-gui,admin-gui"/>

  # Reiniciar após configurar
  sudo systemctl restart tomcat10

  # Acessar o Manager: http://localhost:8080/manager/html

  # Fazer deploy de uma aplicação .war
  sudo cp minha-app.war /var/lib/tomcat10/webapps/
  # O Tomcat faz deploy automático do .war`}),a.jsx("h2",{children:"Troubleshooting"}),a.jsx(e,{title:"Problemas comuns com Java no Ubuntu",code:`# Erro: "java: command not found"
  # Solução: Instalar o Java
  sudo apt install -y default-jdk

  # Erro: "JAVA_HOME is not set"
  # Solução: Configurar a variável
  export JAVA_HOME=$(readlink -f $(which java) | sed 's|/bin/java||')

  # Erro: "Unsupported major.minor version"
  # Causa: Arquivo compilado com versão mais nova do que o JRE instalado
  # Solução: Verificar versões e usar a mesma para compilar e executar
  java -version     # versão do runtime
  javac -version    # versão do compilador

  # Erro: "Could not find or load main class"
  # Causa: Classpath incorreto ou nome da classe errado
  # Solução: Verificar o nome e executar do diretório correto
  java -cp . MinhaClasse

  # Problema: Maven usa versão errada do Java
  # Solução: Verificar JAVA_HOME usado pelo Maven
  mvn --version  # mostra qual Java o Maven está usando

  # Desinstalar completamente o Java
  sudo apt purge -y 'openjdk-*' 'default-jdk*' 'default-jre*'
  sudo apt autoremove -y

  # Verificar quais pacotes Java estão instalados
  dpkg -l | grep -E '(jdk|jre|java)'`}),a.jsxs(o,{type:"info",title:"Java no Docker",children:["Para projetos em produção, considere usar imagens Docker oficiais do Java como ",a.jsx("code",{children:"eclipse-temurin:21-jdk"})," ou ",a.jsx("code",{children:"amazoncorretto:21"}),". Isso garante consistência entre desenvolvimento e produção."]})]})}export{c as default};

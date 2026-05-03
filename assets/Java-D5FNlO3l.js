import{j as a}from"./index-BGu3owFd.js";import{P as r,I as o}from"./InfoBox-cbYNoYJG.js";import{C as e}from"./CodeBlock-D4kWtW6Y.js";import"./house-BlvEJiKe.js";import"./proxy-C2ahmsHM.js";function d(){return a.jsxs(r,{title:"Java no Termux",subtitle:"Instalação e uso do OpenJDK no Termux para desenvolvimento CLI em Java, Kotlin, com Maven e Gradle.",difficulty:"intermediario",timeToRead:"25 min",children:[a.jsx(o,{type:"info",title:"Pré-requisitos",children:'Ler "Primeiros Passos" e ter terminal Linux/Termux disponível.'}),a.jsx("h2",{children:"Glossário rápido"}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"JDK"})," "," — "," ","dev kit."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"JRE"})," "," — "," ","runtime."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"javac"})," "," — "," ","compilador."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Maven"})," "," — "," ","build tool."]})]}),a.jsxs("p",{children:["O ",a.jsx("strong",{children:"Java"})," é uma das linguagens de programação mais utilizadas no mundo. No Termux, o Java está disponível através do ",a.jsx("strong",{children:"OpenJDK"})," compilado nativamente para ARM (aarch64), o que permite rodar ferramentas CLI Java, compilar código com ",a.jsx("code",{children:"javac"}),", executar ",a.jsx("code",{children:".jar"})," e usar Maven/Gradle direto no celular — sem precisar de proot ou emulação x86."]}),a.jsxs(o,{type:"info",title:"OpenJDK no Termux: CLI sim, GUI não",children:["O OpenJDK do Termux roda como binário ARM nativo, ótimo para ferramentas de linha de comando, build systems (Maven, Gradle), interpretadores Kotlin/Scala, servidores HTTP embutidos e scripts de automação. Aplicações desktop Java (Swing, AWT, JavaFX) ",a.jsx("strong",{children:"NÃO funcionam"})," no Termux puro — não há servidor X embutido nem suporte a essas toolkits ARM. Para GUI Java seria necessário Termux:X11 + proot-distro com uma distro Linux completa (e ainda assim é instável). Foque em uso CLI."]}),a.jsx(o,{type:"warning",title:"Sem Tomcat / Spring Boot enterprise",children:"Servidores de aplicação enterprise (Tomcat, WildFly, Payara) e stacks Spring Boot voltadas a deploy em produção não são casos de uso adequados para um celular. Use o Termux para desenvolvimento e testes locais; deploy de produção fica para um servidor de verdade."}),a.jsx("h2",{children:"JDK vs JRE — Qual Instalar?"}),a.jsxs("p",{children:["No Termux moderno só existe um pacote unificado: o ",a.jsx("code",{children:"openjdk-17"}),", que já inclui tanto o runtime (JRE) quanto as ferramentas de desenvolvimento (compilador ",a.jsx("code",{children:"javac"}),", ",a.jsx("code",{children:"jar"}),", ",a.jsx("code",{children:"jshell"}),", etc.)."]}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"JRE (Java Runtime Environment)"})," — apenas executa aplicações Java. Contém a JVM e bibliotecas padrão."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"JDK (Java Development Kit)"})," — inclui o JRE + ferramentas de desenvolvimento. No Termux, instalar o JDK é o caminho normal."]})]}),a.jsx("h2",{children:"1. Verificar se o Java Já Está Instalado"}),a.jsx(e,{title:"Verificar instalação do Java",code:`# Verificar a versão do Java instalado
java -version
# Saída esperada (se instalado):
# openjdk version "17.0.x" ...
# OpenJDK Runtime Environment (build 17.0.x)
# OpenJDK 64-Bit Server VM (build 17.0.x, mixed mode)

# Verificar o compilador Java (JDK)
javac -version
# Saída esperada: javac 17.0.x

# Ver onde o Java está instalado
which java
# Saída: /data/data/com.termux/files/usr/bin/java

# Ver o caminho real (resolve symlinks)
readlink -f $(which java)
# Saída: /data/data/com.termux/files/usr/lib/jvm/java-17-openjdk/bin/java`}),a.jsx("h2",{children:"2. Instalar o OpenJDK"}),a.jsx(e,{title:"Instalação do OpenJDK no Termux",code:`# Atualizar a lista de pacotes
pkg update

# Instalar o OpenJDK 17 (versão LTS suportada pelo Termux)
pkg install -y openjdk-17

# Verificar a instalação
java -version
javac -version

# Buscar pacotes Java disponíveis no repositório
pkg search openjdk
# Tipicamente aparece: openjdk-17`}),a.jsxs(o,{type:"info",title:"Por que só openjdk-17 no Termux?",children:["Manter um JDK ARM atualizado dá trabalho, então o Termux mantém uma versão LTS por vez (atualmente OpenJDK 17). Se você precisa de Java 21+ ou Java 8, pode tentar o SDKMAN (mas ele baixa builds x86_64 que não rodam) ou usar",a.jsx("code",{children:"proot-distro"})," com Debian/Ubuntu e instalar lá."]}),a.jsx("h2",{children:"3. Configurar a Variável JAVA_HOME"}),a.jsxs("p",{children:["Maven, Gradle e várias ferramentas Java precisam da variável de ambiente",a.jsx("code",{children:"JAVA_HOME"})," configurada corretamente."]}),a.jsx(e,{title:"Configurar JAVA_HOME",code:`# Descobrir o caminho do Java atual
readlink -f $(which java) | sed 's|/bin/java||'
# Saída exemplo: /data/data/com.termux/files/usr/lib/jvm/java-17-openjdk

# Configurar JAVA_HOME permanentemente no shell
echo 'export JAVA_HOME=$PREFIX/lib/jvm/java-17-openjdk' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Se você usa zsh
echo 'export JAVA_HOME=$PREFIX/lib/jvm/java-17-openjdk' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc

# Verificar se está configurado
echo $JAVA_HOME

# Detectar JAVA_HOME automaticamente
JAVA_HOME=$(readlink -f $(which java) | sed 's|/bin/java||')
echo "JAVA_HOME detectado: $JAVA_HOME"`}),a.jsx("h2",{children:"4. Compilar e Executar Programas Java"}),a.jsx(e,{title:"Primeiro programa Java",code:`# Criar um arquivo Java
cat > HelloWorld.java << 'EOF'
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Olá, Termux!");
        System.out.println("Java version: " + System.getProperty("java.version"));
        System.out.println("OS: " + System.getProperty("os.name"));
        System.out.println("Arch: " + System.getProperty("os.arch"));
    }
}
EOF

# Compilar o arquivo .java para .class (bytecode)
javac HelloWorld.java
# Gera o arquivo HelloWorld.class

# Executar o programa compilado
java HelloWorld
# Saída:
# Olá, Termux!
# Java version: 17.0.x
# OS: Linux
# Arch: aarch64

# Compilar e executar em um único comando (Java 11+)
java HelloWorld.java
# O Java 11+ permite executar arquivos .java diretamente sem compilar antes

# Criar um arquivo JAR executável
echo 'Main-Class: HelloWorld' > manifest.txt
jar cfm HelloWorld.jar manifest.txt HelloWorld.class
# c = criar, f = arquivo, m = manifesto

# Executar o JAR
java -jar HelloWorld.jar`}),a.jsx("h2",{children:"5. JShell — REPL do Java"}),a.jsx(e,{title:"Experimentar Java interativamente",code:`# Abrir o REPL do Java (vem junto do OpenJDK 17)
jshell

# Dentro do jshell:
jshell> int x = 10;
jshell> int y = 32;
jshell> System.out.println(x + y);
42

jshell> /exit`}),a.jsx("h2",{children:"6. Ferramentas de Build: Maven e Gradle"}),a.jsx(e,{title:"Instalar Maven e Gradle",code:`# === MAVEN ===
# Instalar o Maven (gerenciador de dependências e build mais usado em Java)
pkg install -y maven

# Verificar a versão
mvn --version
# Saída:
# Apache Maven 3.9.x
# Maven home: /data/data/com.termux/files/usr/share/maven
# Java version: 17.0.x

# Criar um novo projeto Maven
mvn archetype:generate -DgroupId=com.exemplo -DartifactId=meu-projeto \\
  -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

# Compilar um projeto Maven
cd meu-projeto
mvn compile        # Compila o código fonte
mvn test           # Executa os testes
mvn package        # Gera o JAR
mvn clean install  # Limpa, compila, testa e instala no repositório local (~/.m2)

# === GRADLE ===
# Instalar o Gradle pelo Termux
pkg install -y gradle

# Verificar a versão
gradle --version

# Criar um novo projeto Gradle
mkdir meu-projeto-gradle && cd meu-projeto-gradle
gradle init --type java-application`}),a.jsxs(o,{type:"warning",title:"Build no celular = bateria + calor",children:["Compilar projetos Java grandes consome MUITA CPU e bateria. Para builds pesadas, conecte o celular ao carregador, evite ambientes quentes e considere rodar com ",a.jsx("code",{children:"termux-wake-lock"})," para impedir o Android de matar o processo."]}),a.jsx("h2",{children:"7. Kotlin no Termux"}),a.jsx(e,{title:"Instalar e usar o Kotlin",code:`# Instalar o compilador Kotlin
pkg install -y kotlin

# Verificar versão
kotlinc -version

# Criar um arquivo Kotlin
cat > hello.kt << 'EOF'
fun main() {
    println("Olá do Kotlin no Termux!")
}
EOF

# Compilar para JAR executável
kotlinc hello.kt -include-runtime -d hello.jar

# Executar
java -jar hello.jar

# REPL Kotlin
kotlinc`}),a.jsx("h2",{children:"8. Troubleshooting"}),a.jsx(e,{title:"Problemas comuns com Java no Termux",code:`# Erro: "java: command not found"
# Solução: Instalar o Java
pkg install -y openjdk-17

# Erro: "JAVA_HOME is not set"
# Solução: Configurar a variável
export JAVA_HOME=$(readlink -f $(which java) | sed 's|/bin/java||')

# Erro: "Unsupported major.minor version" / "class file version 61.0"
# Causa: Arquivo compilado com versão mais nova do que o JRE instalado
# Solução: Recompilar com a versão local
javac MinhaClasse.java
java MinhaClasse

# Erro: "Could not find or load main class"
# Causa: Classpath incorreto ou nome da classe errado
# Solução: Verificar o nome e executar do diretório correto
java -cp . MinhaClasse

# Erro de GUI: "No X11 DISPLAY variable was set" / "HeadlessException"
# Causa: Tentar abrir Swing/AWT/JavaFX no Termux puro
# Solução: NÃO use bibliotecas gráficas Java no Termux. Use apenas CLI.
# Para forçar modo headless:
java -Djava.awt.headless=true MinhaClasse

# Problema: Maven usa versão errada do Java
# Solução: Verificar JAVA_HOME usado pelo Maven
mvn --version  # mostra qual Java o Maven está usando

# OutOfMemoryError em projetos grandes
# Solução: Limitar heap (celular tem RAM limitada)
export MAVEN_OPTS="-Xmx512m"
export GRADLE_OPTS="-Xmx512m"

# Desinstalar o Java
pkg uninstall openjdk-17 maven gradle kotlin`}),a.jsxs(o,{type:"info",title:"Casos de uso reais para Java no Termux",children:["Boas aplicações: estudar a linguagem, rodar scripts/CLI tools Java existentes (ex.: ",a.jsx("code",{children:"plantuml.jar"}),", ",a.jsx("code",{children:"checkstyle.jar"}),", ",a.jsx("code",{children:"jbang"}),"), compilar libs Maven/Gradle pequenas, brincar com Kotlin/Scala, executar servidores HTTP embutidos (Javalin, Spark) para testes de API local. Para Android dev de verdade (apps APK), o caminho é Android Studio em um PC, não Termux."]})]})}export{d as default};

import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Git() {
    return (
      <PageContainer
        title="Git — Controle de Versão"
        subtitle="Guia completo do Git no Ubuntu: instalar, configurar, branches, merge, rebase, stash, reset, tags, GitHub e workflows profissionais."
        difficulty="iniciante"
        timeToRead="35 min"
      >
        <p>
          O <strong>Git</strong> é o sistema de controle de versão mais usado no mundo.
          Ele rastreia todas as mudanças no seu código, permite colaborar com outros
          desenvolvedores, reverter para versões anteriores e trabalhar em múltiplas
          funcionalidades simultaneamente com branches.
        </p>

        <h2>1. Instalação e Configuração</h2>
        <CodeBlock
          title="Instalar e configurar o Git"
          code={`# Instalar Git
  sudo apt install -y git

  # Verificar versão
  git --version

  # Configuração inicial (obrigatório!)
  git config --global user.name "Seu Nome"
  git config --global user.email "seu@email.com"

  # Configurações recomendadas
  git config --global init.defaultBranch main
  git config --global core.editor "nano"    # Ou vim, code
  git config --global pull.rebase false     # Merge ao fazer pull
  git config --global color.ui auto
  git config --global core.autocrlf input   # Normalizar fim de linha

  # Ver todas as configurações
  git config --list
  git config --global --list

  # Configurar SSH para GitHub/GitLab
  ssh-keygen -t ed25519 -C "seu@email.com"
  cat ~/.ssh/id_ed25519.pub
  # Copie e adicione em GitHub → Settings → SSH Keys

  # Testar conexão
  ssh -T git@github.com
  # Saída: "Hi usuario! You've successfully authenticated"`}
        />

        <h2>2. Operações Básicas</h2>
        <CodeBlock
          title="Comandos essenciais do dia a dia"
          code={`# Criar repositório
  mkdir meu-projeto && cd meu-projeto
  git init

  # Clonar repositório existente
  git clone https://github.com/usuario/repo.git
  git clone git@github.com:usuario/repo.git    # Via SSH

  # Status (ver mudanças)
  git status
  git status -s    # Formato curto

  # Adicionar arquivos ao staging
  git add arquivo.txt      # Arquivo específico
  git add .                # Todos os arquivos
  git add *.py             # Padrão
  git add -p               # Interativo (escolher partes)

  # Commit
  git commit -m "Mensagem descritiva"
  git commit -am "Mensagem"   # Add + commit (só tracked files)

  # Ver histórico
  git log
  git log --oneline          # Uma linha por commit
  git log --oneline -20      # Últimos 20
  git log --graph --oneline  # Com grafo de branches
  git log --stat             # Com arquivos modificados
  git log -p arquivo.txt     # Histórico de um arquivo

  # Diferenças
  git diff                   # Working dir vs staging
  git diff --staged          # Staging vs último commit
  git diff main..develop     # Entre branches
  git diff HEAD~3            # Últimos 3 commits`}
        />

        <h2>3. Branches</h2>
        <CodeBlock
          title="Trabalhar com branches"
          code={`# Criar branch
  git branch feature/login
  git checkout -b feature/login    # Criar e mudar
  git switch -c feature/login      # Git 2.23+ (alternativa moderna)

  # Listar branches
  git branch        # Locais
  git branch -a     # Locais + remotas
  git branch -v     # Com último commit

  # Mudar de branch
  git checkout main
  git switch main    # Git 2.23+

  # Merge (juntar branches)
  git checkout main
  git merge feature/login
  # Se não houver conflito: merge automático
  # Se houver conflito: resolver manualmente

  # Deletar branch
  git branch -d feature/login      # Se já foi merged
  git branch -D feature/login      # Forçar (mesmo sem merge)

  # Branch remota
  git push -u origin feature/login  # Push e track
  git push origin --delete feature/login  # Deletar remota

  # Renomear branch
  git branch -m nome-antigo nome-novo`}
        />

        <h2>4. Merge e Conflitos</h2>
        <CodeBlock
          title="Resolver conflitos de merge"
          code={`# Merge: integrar mudanças de outra branch
  git checkout main
  git merge feature/login

  # Se houver conflito:
  # Auto-merging arquivo.txt
  # CONFLICT (content): Merge conflict in arquivo.txt

  # O arquivo terá marcadores de conflito:
  <<<<<<< HEAD
  código da branch main
  =======
  código da feature/login
  >>>>>>> feature/login

  # 1. Editar o arquivo removendo os marcadores
  # 2. Escolher qual código manter (ou combinar)
  # 3. Adicionar e commitar
  git add arquivo.txt
  git commit -m "Resolver conflito em arquivo.txt"

  # Abortar o merge (voltar ao estado anterior)
  git merge --abort

  # === REBASE (alternativa ao merge) ===
  git checkout feature/login
  git rebase main
  # Reaplica seus commits em cima do main
  # Resulta em histórico linear (mais limpo)
  # NUNCA faça rebase de commits já publicados!

  # Rebase interativo (editar commits)
  git rebase -i HEAD~3
  # Permite: squash, reword, reorder, drop commits`}
        />

        <h2>5. Stash, Reset e Revert</h2>
        <CodeBlock
          title="Salvar temporariamente, desfazer mudanças"
          code={`# === STASH (guardar mudanças temporariamente) ===
  git stash                  # Guardar mudanças
  git stash save "mensagem"  # Com descrição
  git stash list             # Listar stashes
  git stash pop              # Restaurar e remover
  git stash apply            # Restaurar sem remover
  git stash drop stash@{0}   # Remover um stash
  git stash clear            # Remover todos

  # === RESET (desfazer commits) ===
  git reset HEAD~1            # Desfazer último commit (mantém arquivos)
  git reset --soft HEAD~1     # Desfazer commit (mantém no staging)
  git reset --hard HEAD~1     # Desfazer commit (PERDE mudanças!)
  git reset HEAD arquivo.txt  # Remover do staging

  # === REVERT (desfazer commit criando novo commit) ===
  git revert abc1234          # Reverte um commit específico
  # Seguro para commits já publicados (não reescreve histórico)

  # === CHECKOUT (restaurar arquivo) ===
  git checkout -- arquivo.txt      # Descartar mudanças locais
  git restore arquivo.txt          # Git 2.23+ (alternativa moderna)
  git restore --staged arquivo.txt # Remover do staging

  # === CHERRY-PICK (aplicar commit específico) ===
  git cherry-pick abc1234     # Aplica um commit de outra branch`}
        />

        <h2>6. Trabalhando com Remotos</h2>
        <CodeBlock
          title="Push, pull e repositórios remotos"
          code={`# Ver remotos
  git remote -v

  # Adicionar remoto
  git remote add origin https://github.com/usuario/repo.git

  # Push (enviar commits)
  git push origin main
  git push -u origin main    # -u = definir upstream (só na primeira vez)
  git push                   # Após definir upstream

  # Pull (baixar e integrar)
  git pull                   # Fetch + merge
  git pull --rebase          # Fetch + rebase

  # Fetch (baixar sem integrar)
  git fetch origin           # Baixar mudanças
  git fetch --all            # De todos os remotos

  # Tags (marcar versões)
  git tag v1.0.0
  git tag -a v1.0.0 -m "Versão 1.0.0"    # Tag anotada
  git push origin v1.0.0                   # Push da tag
  git push origin --tags                   # Push de todas as tags

  # .gitignore (ignorar arquivos)
  cat > .gitignore << 'EOF'
  node_modules/
  .env
  *.log
  .venv/
  __pycache__/
  .DS_Store
  dist/
  build/
  EOF`}
        />

        <h2>Troubleshooting</h2>
        <CodeBlock
          title="Problemas comuns com Git"
          code={`# Fiz commit na branch errada
  git stash          # Guardar mudanças
  git checkout branch-certa
  git stash pop      # Restaurar na branch certa

  # Preciso mudar a mensagem do último commit
  git commit --amend -m "Nova mensagem"
  # CUIDADO: Não faça isso se já fez push!

  # Arquivo grande no histórico (repositório pesado)
  # Verificar:
  git rev-list --objects --all | sort -k 2 | head
  # Usar git-filter-repo para remover

  # "detached HEAD"
  git checkout main    # Voltar para a branch

  # Desfazer git add (remover do staging)
  git restore --staged .

  # Recuperar commit deletado
  git reflog             # Mostra histórico de HEADs
  git checkout abc1234   # Restaurar commit

  # Push rejeitado (non-fast-forward)
  git pull --rebase
  git push`}
        />

        <AlertBox type="info" title="Workflow recomendado">
          Use <strong>Git Flow</strong> para projetos grandes (main, develop, feature/*,
          release/*, hotfix/*) ou <strong>GitHub Flow</strong> para projetos menores
          (main + feature branches com Pull Requests). O importante é: nunca commite
          diretamente na main em equipe — sempre use branches e Pull Requests.
        </AlertBox>
      </PageContainer>
    );
  }
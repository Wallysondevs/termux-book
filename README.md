# Termux — Livro Completo

Guia profundo de [Termux](https://termux.dev/) (terminal Linux para Android) em português brasileiro. Cada comando explicado, cada saída detalhada — sem encurtamentos.

**Online:** https://wallysondevs.github.io/termux-book/

## Stack

- React 19 + Vite 7
- Tailwind CSS v4 (`@layer base`-aware)
- Wouter (router leve)
- Framer Motion + Lucide React
- Deploy estático para GitHub Pages

## Desenvolvimento

```sh
npm install
npm run dev          # vite (preview local)
npm run build        # build de produção (base /termux-book/)
```

## Deploy

O deploy é feito automaticamente para a branch `gh-pages` via GitHub Pages. Cada arquivo da `dist/` é copiado para a raiz da branch.

## Conteúdo

19 trilhas, 76+ páginas cobrindo desde a instalação no F-Droid até `proot-distro`, Termux:API, hosting de servidores no Android, scripts com Termux:Boot e pentest ético.

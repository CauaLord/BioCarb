# BioCarb | Site do Inova Week 2026

Site do projeto BioCarb (UVV): carvão ativado produzido no Espírito Santo com fibra de coco e caroço de fruta.
Feito em React + TypeScript, com animações em framer-motion, empacotado com esbuild num único `index.html`.

## O que você precisa ter instalado

- **Node.js 18 ou mais novo** (recomendado: 20 ou 22 LTS). Confira com `node -v`.
- **npm** (já vem com o Node). Confira com `npm -v`.
- **Git**, para subir no GitHub.
- **Internet** na primeira instalação (baixa as dependências) e para carregar as fontes do Google Fonts.

Não precisa instalar nada globalmente: React, framer-motion, esbuild e TypeScript são baixados pelo `npm install` dentro da pasta do projeto.

## Primeira vez

```bash
npm install
```

Isso cria a pasta `node_modules/` (não vai para o GitHub, está no `.gitignore`).

## Editar com a página atualizando sozinha

```bash
npm run dev
```

Abra http://localhost:5173. Toda vez que você salvar um arquivo em `src/`, a página recarrega.
Para parar: `Ctrl + C` no terminal.

## Gerar a versão final

```bash
npm run build
```

Gera `dist/index.html`, um arquivo único com CSS e JavaScript dentro. É esse arquivo que vai para o GitHub Pages
(pode renomear para `Inova.html` para manter o link atual). Ele também abre com dois cliques, sem servidor.

## Checar erros de tipo (opcional)

```bash
npm run typecheck
```

## Onde mexer

| Quero mudar... | Arquivo |
|---|---|
| Qualquer texto do site | `src/data.ts` |
| WhatsApp e e-mail | `src/data.ts`, constante `CONTATO` |
| Fase atual do roadmap | `src/data.ts`, constante `FASE_ATUAL` |
| Cores, fontes, espaçamentos, responsivo | `src/styles.css` |
| Abertura e coluna de filtro | `src/components/Hero.tsx` |
| Partículas marrons da parte turva | `src/components/Particles.tsx` |
| Contador do caminhão | `src/components/Truck.tsx` |
| Zoom dentro do grão | `src/components/Pores.tsx` |
| As 10 etapas e suas animações | `src/components/Process10.tsx` |
| Demais seções (Canvas, roadmap, equipe, contato...) | `src/components/Sections.tsx` |
| Menu, ordem das seções, tecla A | `src/App.tsx` |
| Título da aba, fontes, metatags | `index.template.html` |

## Atalho de apresentação

Tecla **A** faz a página rolar sozinha. **Esc** (ou mexer no mouse) para.

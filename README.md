# Agentic Engineering Manifesto

This repository is the canonical home for the **Agentic Engineering Manifesto** — principles and practices for building software with AI agents. The source document is [`agentic-engineering-manifesto.md`](agentic-engineering-manifesto.md).

## Repository layout

| Path | Purpose |
| --- | --- |
| `agentic-engineering-manifesto.md` | Source-of-truth manifesto |
| `src/pages/index.astro` | Renders the manifesto as HTML at build time |
| `.github/workflows/deploy.yml` | Builds and deploys to GitHub Pages on push to `main` |

## Reading and editing

- **Read:** open [`agentic-engineering-manifesto.md`](agentic-engineering-manifesto.md) in this repo, or use the published site after deployment.
- **Change:** edit `agentic-engineering-manifesto.md`, commit, and push; the site rebuilds automatically when GitHub Actions is configured.

## Local development

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production output: `npm run build`
- Preview build locally: `npm run preview`

## Publishing on GitHub Pages

1. Create the GitHub repository `mahdavipanah/agentic-engineering-manifesto` and push this project to the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push a commit to `main` (or run the workflow manually from the Actions tab).
5. After deploy finishes, the site is available at:
   - `https://mahdavipanah.github.io/agentic-engineering-manifesto/`

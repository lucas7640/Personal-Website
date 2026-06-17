# Lucas's Digital Portfolio — Claude Code Project Memory

This file is loaded automatically by Claude Code at the start of every session in this repo. Keep it tight; bigger isn't better.

---

## What this codebase does

[A static portfolio showcasing CAD models, FEA analysis, and design work from my time at university. Built to present my engineering projects in a clean, visual format.]

---

## Architecture (in one diagram)

```
[Portfolio Site / HTML + CSS + JS]  →  [GitHub Pages]
        │
   [Assets — images, PDFs, project files]
```

---

## Conventions we actually enforce


- [x] Naming: lowercase, kebab-case filenames (about-me.html, main.css)
- [x] Folder structure: /assets for images, /css for stylesheets, /js for scripts
- [x] Commit messages: plain English description of what changed
---

## Common gotchas (read before editing)

- Images must be compressed before adding to /assets or the site loads slowly
- Always test how the site looks on mobile after making layout changes
- File names are case sensitive on GitHub Pages (Home.html ≠ home.html)

---


## Commands that matter

| Command | What it does |
|---|---|
| `git add .` | Stage all changed files |
| `git commit -m "message"` | Save changes with a description |
| `git push` | Deploy to GitHub Pages |

---

## When working on this codebase

- **Plan first, code second.** Show me what you're going to build before touching files.
- **Match existing patterns.** Mirror the existing HTML/CSS structure when adding new pages.
- **Review before done.** Check how it looks in the browser before calling it finished.
---

## Out of scope for Claude Code in this repo

- Do not modify images or 3D render files directly
- Do not change the GitHub Pages deployment settings

---

## Last updated: May 4, 2026 · Maintainer: Lucas
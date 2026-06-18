# Lux is the Way — site update (drop-in files)

Plain static HTML/CSS/JS. No build step. Commit these straight into
`lucas7640/Personal-Website` and GitHub Pages serves them as-is.

## What to copy into the repo root

| File | Action |
|---|---|
| `style.css` | **Replaces** your existing `style.css`. The pages link this one external file instead of duplicating CSS inline. |
| `main.js` | New — nav toggle, scroll reveal, gallery lightbox. |
| `index.html` | Replaces — elevated hero (glowing crest) + a Caladan "moment to admire the view" interlude. |
| `art.html` | Replaces — gallery, lightbox wired to `main.js`. |
| `essays.html` | Replaces — links your three existing essays. |
| `videos.html` | Replaces — see "Add your films" below. |
| `about.html` | Replaces. |
| `bulletin.html` | **New page** — the Bulletin Board. Add it; the nav already links it. |

Your existing essay article pages (`human-consciousness-bubbles.html`,
`butlerian-jihad.html`, `gom-jabbar.html`) still work. To make them match,
swap their inline `<style>` for `<link rel="stylesheet" href="style.css" />`
and add the `Board` link to their nav — or ask me to regenerate them.

## Add your real content (replaces placeholders)

- **Drawings** — put images in `assets/img/`, then in `art.html` replace a
  `<div class="ph">01</div>` with `<img src="assets/img/your.jpg" alt="Title" />`
  and set `data-full="assets/img/your.jpg"` on that `<figure>` for the lightbox.
- **Videos** — in `videos.html` replace each placeholder block with the YouTube
  embed iframe shown in the comment there (use your real `VIDEO_ID`).
- **Portrait** — in `about.html`, swap the `<div class="ph">L</div>` for
  `<img src="assets/img/portrait.jpg" alt="Lucas" />`.

## Turn on the Bulletin Board (one-time, free)

The board uses **Giscus** — real comments backed by your repo's GitHub Discussions, no server.

1. Repo → **Settings → General → Features → Discussions** ✓
2. Install the **Giscus app**: https://github.com/apps/giscus (grant it this repo)
3. Go to **https://giscus.app**, enter `lucas7640/Personal-Website`, choose a
   Discussion **category** (e.g. *Announcements*, or create one called *Bulletin*),
   and mapping **pathname**.
4. It gives you a `data-repo-id` and `data-category-id`. Paste both into the
   `<script src="https://giscus.app/client.js" …>` block in `bulletin.html`,
   then delete the grey "setup" note above it.

Until you do step 4, the board shows a friendly setup note instead of comments.

## Publish

Commit + push to `main`. GitHub Pages redeploys in ~1 minute.
```bash
git add style.css main.js index.html art.html essays.html videos.html about.html bulletin.html
git commit -m "Redesign: elevated Atreides/Corrino aesthetic + bulletin board"
git push
```

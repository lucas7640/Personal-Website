# Lucas — Portfolio

A clean, static portfolio site for art, essays, and film. Built as plain HTML/CSS/JS — no build step, no dependencies. Hosts on GitHub Pages for free.

## Pages

- `index.html` — Home
- `art.html` — Art gallery (with lightbox)
- `essays.html` — Essay index → individual essays live in `essays/`
- `videos.html` — Film / YouTube embeds
- `about.html` — About

## How to add your own content

**Art:** Put image files in `assets/img/`. In `art.html`, replace a placeholder block
`<div class="ph">01</div>` with `<img src="assets/img/your-file.jpg" alt="Title">`,
and set `data-full="assets/img/your-file.jpg"` on that `<figure>` so the lightbox opens the full image.

**Essays:** Copy `essays/sample-essay.html`, write your piece inside `.article__body`, save it
with a new filename, then add a row in `essays.html` linking to it.

**Videos:** In `videos.html`, replace `dQw4w9WgXcQ` in each embed URL with your own YouTube
video id (the part after `watch?v=`). Update the channel link too.

**About / links:** Edit `about.html` — bio text, email, and social links near the bottom.

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio` — or `yourusername.github.io` for a root URL).
2. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/REPO.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / root → Save.**
4. Wait ~1 minute. Your site is live at `https://YOURUSERNAME.github.io/REPO/`
   (or `https://YOURUSERNAME.github.io/` if you named the repo `yourusername.github.io`).

The `.nojekyll` file is included so GitHub serves the files as-is.

# Army Lists

A small static website of phase-by-phase table references for tabletop army lists (Warhammer 40,000). The main page lists every army; each army opens its own reference page.

Hosted on GitHub Pages — plain HTML/CSS/JS, no build step.

## Structure

```
index.html              Main page: cards linking to each army list
jsons/
  mechs-list.json       BattleScribe-style roster export (source for unit stats and tags)
lists/
  machine-spirit.html   Adeptus Mechanicus – The Inevitable Force of Machine Spirit
```

Each list page is self-contained (inline CSS and JS) and links back to `../index.html`.

## Machine Spirit list

Warhammer 40,000 (11th edition) Adeptus Mechanicus reference, built for an iPad Air 3 at the table. Every ability and stratagem is grouped by game phase, with an Imperative / canticle / Icon of War tracker (saved in browser storage), a per-unit filter (Show unit, grouped into Characters / Infantry / Vehicle) and a unit profile panel with keyword tags. A "↑ Top" button in the phase bar jumps back to the top, and the "Start of battle round" section is collapsed by default. Unit stats come from `jsons/mechs-list.json`. Rule data is embedded in the page as JavaScript (`E`, `PHASES`, `REMIND`, `PROFILES`). Design notes and open rules questions are in `CLAUDE.md`.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit <http://localhost:8000>.

## Add a new list

1. Create `lists/<name>.html` (copy an existing list as a starting point and keep the "← All army lists" back link).
2. Add a `.card` link to it in `index.html`.
3. Commit and push to `main`.

## Deployment

GitHub Pages serves the `main` branch from the repository root (Settings → Pages → Deploy from a branch → `main` / `/ (root)`). Use relative links only, since the site lives under `/<repo-name>/`.

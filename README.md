# Army Lists

A small static website of table references for tabletop army lists (Warhammer 40,000, Age of Sigmar, Kill Team, Legions Imperialis). The main page lists every army; each army opens its own reference page.

Hosted on GitHub Pages — plain HTML/CSS/JS, no build step.

## Structure

```
index.html              Main page: cards linking to each army list ("Lists" and "Friendly Lists")
jsons/
  mechs-list.json       BattleScribe-style roster export (source for unit stats and tags)
lists/
  machine-spirit.html   Adeptus Mechanicus – The Inevitable Force of Machine Spirit
  cities-of-sigmar.html Age of Sigmar – Cities of Sigmar
  sanctifiers.html      Kill Team – Sanctifiers
  legions-imperialis.html  Legions Imperialis – Ranger Brigade (Solar Auxilia)
  ironwall.html         Legions Imperialis – BG-XIV «Ironwall» (friendly list, Death Guard)
context/                Per-game notes (sources, data layout, conventions, pitfalls)
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

1. Read `context/README.md` and the file for the game.
2. Create `lists/<name>.html` (copy a list of the same game as a starting point, keep the "← All army lists" back link, and give it its own `localStorage` key).
3. Add a `.card` link to it in `index.html` ("Lists" for my own, "Friendly Lists" for other players') and a row in `context/README.md`.
4. Commit and push to `main`.

## Deployment

GitHub Pages serves the `main` branch from the repository root (Settings → Pages → Deploy from a branch → `main` / `/ (root)`). Use relative links only, since the site lives under `/<repo-name>/`.

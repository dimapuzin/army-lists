# CLAUDE.md

Static website of army-list table references, hosted on GitHub Pages. See `README.md` for the overview.

## Game context
- Per-game notes (roster JSON layout, phase tabs, card kinds, rule conventions) live in `context/`. Read `context/README.md` first, then the file for the game before building or editing a list.

## Layout
- `index.html` — main page; one `.card` per army list, in two sections: "Lists" (my own) and "Friendly Lists" (other players' rosters).
- `lists/mine/*.html` — one page per list of mine, `lists/friendly/*.html` — one page per other player's list (inline `<style>` and `<script>`). Pages sit two levels deep: links to the main page are `../../index.html`.
- `js/<name>-rules.js` — the rule texts of one list, loaded by that page after the first render (`../../js/<name>-rules.js`). HTML and JS files are never mixed in one folder.

## Page weight
Goal: every HTML page arrives in one TCP round trip. The first flight is about 14.6 KB (10 segments), minus response headers, so keep the **gzipped HTML at or under 13 KB** (hard ceiling 14 KB). GitHub Pages serves gzip only, no brotli, and its output is about 0.1 KB larger than `gzip -9`. Full reasoning, measurements and numbers: `context/legions-imperialis.md` > Page weight.
- **Check after every edit of a page** (nothing is built, so measure the file itself):
  `for f in index.html lists/*/*.html; do printf '%-34s %6s\n' $f $(gzip -9c $f | wc -c); done`. Do the same for `js/*.js` (not limited, they load after the first render). Current gzipped sizes: index 2.2 KB, Ironwall 9.7, Ranger Brigade 9.2, Sanctifiers 12.3, Machine Spirit 13.1, Cities of Sigmar 13.4 (the last two are over the 13 KB goal, still under 14.6). Do not let a page grow past its current size without saying so.
- **No web fonts, no external requests.** System fonts only (see Conventions). No images, icon fonts or libraries.
- **Move secondary text to `js/<name>-rules.js`**: anything folded or tap-to-open (the "Full rule" text of cards, rule and trait glossaries, weapon-rule glossaries). Keep what is visible on the first render (summaries, options, notes, stats, unit data) in the page. The page writes empty `<span|p data-k="...">` slots, `fill()` fills them from `window.<PREFIX>_RULES` after the file loads (called at the end of `render()` and in the script's `onload`). Per-game details: the "Page weight" section in each `context/<game>.md`.
- **Keep the CSS lean:** no duplicate selectors or declarations, no unused custom properties, no per-element `font-family` where it inherits, no commented-out rules.
- **Keep data compact:** one entry per fact, no text repeated in two places (a rule text lives in exactly one file), no duplicated keys. Rule text from the source is copied as is; never shorten or reword rules to save bytes.
- **Not done on purpose:** minifying CSS or JS (saves only about 1 KB gzipped and breaks hand editing and the no-build-step rule), brotli (not available on GitHub Pages).
- **Test after moving text out:** load the page with `--allow-file-access-from-files --virtual-time-budget=5000`, wait about 800 ms in a test script and check that `document.querySelectorAll('[data-k]:empty')` is empty for every unit chip (temp copy of the page, not the repo file).

## Conventions
- Plain HTML/CSS/vanilla JS. No build step, no frameworks, no package manager.
- Use **relative links only** (site is served from `/<repo-name>/` on GitHub Pages). Never use root-absolute paths like `/lists/mine/x.html`.
- Keep the shared look: CSS variables on `:root`, dark mode via `prefers-color-scheme` plus `data-theme`, no web fonts, only iPadOS system fonts: `--head` = Avenir Next Condensed, Arial Narrow, DIN Condensed (headings, numbers; weights 600/700) and `--body` = Charter, Iowan Old Style, Georgia (rules text). Pages must work at phone width (tables are used at the game table, often on a phone).
- Every list page keeps a "← All army lists" link to `../../index.html`.
- Adding a list: create `lists/mine/<name>.html` (friendly lists: `lists/friendly/<name>.html`) and `js/<name>-rules.js`, add a card in `index.html` (right section), add a row to `context/README.md`. Each page needs its own `localStorage` key prefix/key, since all pages share one origin.
- Rules text comes from the user's supplied roster and rules; do not invent rules or stats.

## Machine Spirit list (`lists/mine/machine-spirit.html`)
Warhammer 40,000, 11th edition, Adeptus Mechanicus. Roster 1985/2000 pts, Strike Force; Cohort Cybernetica + Lords of the Forge; Warlord Belisarius Cawl. Source: BattleScribe-style roster JSON plus pasted army/detachment/stratagem rules (not in the repo).
- Data is embedded JS: rule cards in `E`, phases in `PHASES`, cross-phase links in `REMIND`, unit stats/weapons/keyword tags in `PROFILES`, unit filter labels in `UNITS`, Show unit columns in `UNIT_GROUPS`. Roster source for stats and tags: `jsons/mechs-list.json`.
- Units in the roster: Cawl, Thulia, Enginseer; Fusiliers + Marshal (merged like Kastelans + Datasmith); Skitarii Rangers x2 (replaced Vanguard); Servitor Battleclade; Ironstrider Ballistarii; Onager Dunecrawler x2; Skorpius Disintegrator x2. Card `units` arrays use keys `rangers`, `fusiliers` (also covers the Marshal), `kastelan`, etc.
- Tracker state (Imperative, canticle, Icon of War) is saved in `localStorage` under the `msp-` prefix, always wrapped in try/catch.
- Layout: header, two-column tool panel (trackers | Show unit), unit profile (name, keyword tags pills, base values only, no modifiers), sticky phase bar, then per phase Abilities | Stratagems columns plus "Also in play" links.
- Tool panel: Imperative, canticle and Icon of War use the same `.pick` button style: label on its own line, buttons wrap onto several lines inside the column width (button text may wrap too; no sideways scrolling). Right column is `max-content` wide; Show unit has an "All" chip plus three columns Characters / Infantry / Vehicle (`UNIT_GROUPS`), sorted alphabetically, chips nowrap on one line, small font (.8rem). Stacks to one column below 760px.
- Phase bar: a "↑ Top" button on the right (outside the scrolling tabs) scrolls to the page top so the unit profile is visible.
- "Start of battle round" is collapsible and collapsed by default (`COLLAPSIBLE` / `collapsed`); jump links open it when needed.
- Card border by type: brass = stratagem, red = detachment rule, ink = army rule, teal = enhancement, grey = unit ability. Selected options are outlined red.
- Target device: iPad Air 3 Safari, 834x1112 portrait / 1112x834 landscape. All eight phase tabs must fit in portrait; keep large tap zones. Dense layout: do not add padding or shrink text sizes casually. Two columns above 760px, stacked below; tighter margins below 560px.
- Palette tokens (light/dark): bg #f5f2ef/#20110f, surface #fdfbfa/#301b19, option box #f8f5f2/#3b221f, chip #f0ece6/#472d29, border #d8cfc4/#553732, red #8e1f17/#c9473c, brass #8a6a1f/#d1aa52, teal (opponent's turn) #2f6f64/#78b3a6. Fonts: system fonts (Avenir Next Condensed headings/stats, Charter rules), body 17px/1.55.
- Deliberately removed (do not re-add unless asked): Before the battle section, search field, CP counter, points/faction in header. Possible return: Vingh's Wafers and opening Aegis Protocol under Battle round.
- Open rules points: Cawl and Thulia both have Supreme Commander (check legality); detachment points mismatch (pasted rules Cohort 2DP/Lords 1DP vs roster Cohort 1/Lords 2); Blistering Salvoes only the ferrumite cannon half applies; unused enhancements left out (Necromechanic, Lord of Machines, Emotionless Clarity, Arch-negator, TL-4Ø9).

## Cities of Sigmar list (`lists/mine/cities-of-sigmar.html`)
Age of Sigmar, 4th edition, Cities of Sigmar. Roster 1990/2000 pts, battle formation Swift Reinforcements; General: Freeguild Marshal and Relic Envoy. Source: BattleScribe-style roster `jsons/cities.json` plus pasted battle traits, Spell Lore (Spells of the Collegiate Arcane) and Prayer Lore (Scriptures of Sigmar) (not in the repo).
- Same page skeleton, CSS tokens and render code as the Machine Spirit page, plus three trackers in `.controls` (Full Power! multi-select, Special Ammunition, and one multi-select row per battle tactic card; button labels are short descriptions, not rule names; `localStorage` prefix `cos-`, in try/catch) that outline the matching option on the cards. Tracker buttons wrap onto several lines inside the left column (no sideways scrolling). "Start of battle round" is collapsible and collapsed by default (`COLLAPSIBLE` / `collapsed`); jump links open it. Data: rule cards in `E`, phases in `PHASES`, cross-phase links in `REMIND`, unit stats/weapons/tags in `PROFILES` (generated from the roster JSON), Show unit labels in `UNITS` / `UNIT_GROUPS` (Heroes / Infantry / Cavalry).
- Units: Marshal & Relic Envoy (`marshal`), Cavalier-Marshal, Mallus Forgepriest (Priest, gets the prayers), Alchemite Warforger (Wizard, gets the spells), Cannonade Cogfort, Gallants, Grenadiers, Steelhelms x2, Cavaliers x2. Card `units` arrays decide who sees a card; army-wide traits use `ALL`.
- Phases (8 tabs): Battle round, Hero, Movement, Shooting, Charge, Combat, End of turn, Always on & setup. Battle tactic cards sit in End of turn; enhancements in Always on (Emergency Bellows in End of turn).
- Card kinds: army = battle trait (ink), det = battle formation (red), unit = unit ability (grey), enh = enhancement (teal), spell = blue (`--blue` #2f5f9a / #7aa7d9), prayer = brass (both shown in a "Spells & prayers" column only in phases that have them).
- AoS 4 convention: "non-HERO SIGMARITE CAVALRY" negates the whole keyword group, so it excludes only units having all of those keywords.

## Sanctifiers list (`lists/mine/sanctifiers.html`)
Kill Team 3rd edition, Sanctifiers. Source: Wahapedia page (no roster file). Details in `context/kill-team.md`.
- Same skeleton and CSS as the other pages. Tool panel: three multi-select pick rows (Strategy ploys, Firefight ploys, Faction equipment; `localStorage` prefix `kts-`) where only the picked cards are shown, and Show operative (All + Command & support / Fire / Melee) with a profile and weapon-rule glossary.
- Two tabs only: Strategic Gambit (collapsible, collapsed by default via `COLLAPSIBLE` / `collapsed`) and Action. Strategic Gambit holds Ministorum Sermon and Ecclesiarchy Texts; Action holds operative abilities and equipment (left; Blaze and Cherub Fly are not cards, Blaze only appears in the weapon-rule glossary) and strategy plus firefight ploys (right).

## Legions Imperialis lists (`lists/mine/legions-imperialis.html`, `lists/friendly/ironwall.html`)
- Ranger Brigade (mine, Solar Auxilia, 750 pts: Sub-Cohort 370 + Pioneer Company 380) and BG-XIV «Ironwall» (friendly list, Loyalist Legiones Astartes / Death Guard, 750 pts: Demi-company 440 + Brethren of Iron 310). Source: pasted roster text plus Epic Heresy pages (Legion Builder cannot be read).
- Layout differs from the other games: no phases, rail or trackers. Show unit chips, Formation control (models-lost counters per formation, Break Point, BROKEN badge, folded per formation on phones, saved in `localStorage`), then per formation one full-width unit card (models, weapons, collapsed upgrades, one "Rules & traits" row of tap-to-open names). Formation rules appear when a unit is picked. A unit in several formations gets one card.
- Target: Show unit + Formation control + one unit card on one iPad Air 3 screen, both orientations. Do not add padding or enlarge the tool panel casually.
- `context/legions-imperialis.md` has the recipe for adding a list, the data schema, source URLs and how to extract them, roster reading rules and pitfalls. Read it before touching these pages.

## Workflow
- Test locally with `python3 -m http.server 8000`.
- Commit only when asked. Deploy = push to `main`.

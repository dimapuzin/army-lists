# Warhammer 40,000 (11th edition)

## Source data
- Roster: BattleScribe-style JSON in `jsons/` (e.g. `mechs-list.json`), `roster.gameSystemName` = "Warhammer 40,000 11th Edition". Plus pasted army / detachment / stratagem / enhancement rules, which are not in the repo.
- Layout: `roster.forces[0].selections[]` are the army. Top entries are options (Battle Size, Detachment, Force Disposition, Show/Hide Options); units follow with `type` `unit` or `model`.
- Per unit: `profiles[]` (`typeName` "Unit" for stats, "Abilities", ranged/melee weapon profiles), `categories[]` (keywords, including `Faction: ...`), `selections[]` (models, wargear, enhancements). Points are in `costs` (`pts`).
- Stats are M, T, Sv, InSv, W, Ld, OC. Weapon rows: Range, A, BS/WS, S, AP, D, keywords. Count identical weapons across models with the selection `number`.
- Total points are in `roster.costs`; the limit is in `roster.costLimits`.

## Turn structure used as page tabs
Start of battle round, Command, Movement, Shooting, Charge, Fight, Opponent's turn (reactions), Always on. The Fight phase is both players' turns.

## Card kinds
Stratagem (brass, with CP cost), detachment rule (red), army rule (ink), enhancement (teal), unit ability (grey). Page layout is Abilities | Stratagems columns per phase.

## Conventions and pitfalls
- Merge units that share rules (for example Kastelans + Datasmith, Fusiliers + Marshal) and use one filter key.
- Several copies of the same unit: show one profile and a "N units" note.
- Stratagems list the units they can target in `units`, so the Show unit filter works.
- Keep rules ambiguities visible (for example duplicate "must be your Warlord" abilities, detachment point mismatches between roster and pasted rules). The Machine Spirit open points are in `CLAUDE.md`.
- Enhancements not taken in the roster are left out.
- See `CLAUDE.md` for the full Machine Spirit page spec (trackers, Imperative, canticle, Icon of War).

## Page weight (Machine Spirit page)
- Goal (user): HTML small enough for one TCP round trip, about 13 KB gzipped (`gzip -9c lists/mine/machine-spirit.html | wc -c`; see `context/legions-imperialis.md` > Page weight for the reasoning). Now 13.1 KB; was 15.0 KB.
- No web fonts: `--head` = Avenir Next Condensed, Arial Narrow, DIN Condensed; `--body` = Charter, Iowan Old Style, Georgia (iPadOS system fonts).
- The "Full rule" texts (the folded `<details>` on each card, 38 cards, 8.3 KB raw) are not in `E`. They live in `js/machine-spirit-rules.js` as `window.MSP_FULL = {card id: text}`, one per line. `cardHTML()` writes an empty `<p data-k="card id">`, `fill()` (end of `render()` and on the script's `onload`) fills it. The script is added at the end of the page script, so it is requested after the first render. New card: add it to `E` without `full`, and add its id and text to the rules file.
- Check after editing: load the page with `--allow-file-access-from-files --virtual-time-budget=5000`, wait about 800 ms, and `document.querySelectorAll('[data-k]:empty')` must be empty for every Show unit chip.
- Headless Chrome on Linux has none of the system fonts. For layout screenshots use a temp copy with `Liberation Sans Narrow` / `Liberation Serif` as stand-ins; with them the tool panel's Show unit chips overlap the Icon of War buttons at 834 px, the same as before this change (the real Saira / Avenir widths are narrower, so check on the iPad).

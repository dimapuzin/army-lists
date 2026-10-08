# Age of Sigmar (4th edition)

## Source data
- Roster: BattleScribe-style JSON in `jsons/` (e.g. `cities.json`), catalogue "Cities of Sigmar", force "General's Handbook". Plus pasted battle traits, spell lore and prayer lore, which are not in the repo.
- Layout differs from 40k: `roster.forces[0]` holds only options (Battle Formation, Battle Tactic Cards). The army is in **`roster.forces[0].forces[]`** (each force is a "Regiment"), whose `selections[]` are the units (`type` "unit").
- Per unit: `profiles[]` with `typeName`: "Unit" (stats Move, Health, Save, Control), "Ability (Activated/Passive/Command)", "Ranged Weapon", "Melee Weapon". `categories[]` are the keywords.
- Weapons sit in model selections: `unit.selections[type=model].selections[]`. Weapon characteristics: Rng, Atk, Hit, Wnd, Rnd, Dmg, Ability ("-" means none). The selection `number` is already the total count of that weapon; sum across model groups, do not multiply by model count.
- Ability profiles have `Timing`, `Declare`, `Effect`, `Keywords`, `Cost`. Text contains `**` and `^^` markdown; strip it. Newlines inside text are bullets or paragraphs.
- Category noise to drop from keyword tags: `Regimental ...`, `Illegal Units`, `Freeguild Veteran`, `Thaumaturgical Specialist`, `Sigmarite Infantry/Cavalry` (duplicates). Strip suffixes like `(1/10)`.
- Enhancements show as upgrade selections with a `group` (Artefacts of Power, Heroic Traits, Decorations for Valour, Ironweld Innovations). The unit with an `General` upgrade is the General.
- Spell and prayer lores are not in the roster; they come from pasted text. The Wizard / Priest keyword in `categories` says who casts or chants.

## Turn structure used as page tabs (8)
Start of battle round, Hero, Movement, Shooting, Charge, Combat (both turns), End of turn, Always on & setup. Timing text maps to tabs: "Any Hero/Charge/Combat Phase" goes to that phase; "End of Any Turn" and battle tactics go to End of turn; Deployment and passives go to Always on.

## Card kinds
Army = battle trait (ink), det = battle formation (red), unit = unit ability (grey), enh = enhancement (teal), spell (blue), prayer (brass). Spells and prayers show in a "Spells & prayers" column only in phases that have them.

## Rules conventions
- "Under orders" comes from Form Up! and the Relic Envoy; it gates many abilities.
- "Unit type" means warscroll name, so two units of the same warscroll count as one type.
- "non-HERO SIGMARITE CAVALRY" negates the whole keyword group: it excludes only units having all those keywords.
- Once Per Turn (Army) / Once Per Battle (Army) limits are shared across the army, show them in the card `when` line.
- Spells use a casting value and 2D6 roll; prayers a chanting value and D6 roll. Display as "Cast N" / "Chant N" in the cost slot.
- Command abilities have a CP cost (show as "1 CP").

## Trackers on the Cities page
Full Power! (multi-select), Special Ammunition (single), one multi-select row per battle tactic card. Selected options outline red on the cards. State in `localStorage` with prefix `cos-`, always in try/catch.

## Pitfalls
- Units appearing twice in the roster (Steelhelms, Cavaliers) get one filter chip labelled "×2".
- Some ability keyword text is ambiguous (for example `non-Hero Cities of Sigmar Infantry`); keep the roster wording on the card and note the interpretation.
- Full spec of the Cities page: `CLAUDE.md`.

## Page weight (Cities of Sigmar page)
- Goal (user): HTML small enough for one TCP round trip (see `context/legions-imperialis.md` > Page weight). `gzip -9c lists/mine/cities-of-sigmar.html | wc -c` is now 13.4 KB (was 15.5 KB).
- No web fonts: `--head` = Avenir Next Condensed, Arial Narrow, DIN Condensed; `--body` = Charter, Iowan Old Style, Georgia (iPadOS system fonts).
- The "Full rule" texts (the folded `<details>` on each card, 37 cards, about 15 KB raw) are not in `E`. They live in `js/cities-of-sigmar-rules.js` as `window.COS_FULL = {card id: text}`, one per line. `cardHTML()` writes an empty `<p data-k="card id">`, `fill()` (end of `render()` and on the script's `onload`) fills it. The script is added at the end of the page script, so it is requested after the first render. New card: add it to `E` without `full`, and add its id and text to the rules file.
- Check after editing: load the page with `--allow-file-access-from-files --virtual-time-budget=5000`, wait about 800 ms, and `document.querySelectorAll('[data-k]:empty')` must be empty for every Show unit chip.
- Headless Chrome on Linux has none of the system fonts; for layout screenshots use a temp copy with `Liberation Sans Narrow` / `Liberation Serif`. With them the Show unit chips overlap the Special Ammunition and battle tactic rows at 834 px, the same as with the old web fonts' stand-ins, so check that area on the iPad.

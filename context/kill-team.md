# Kill Team

Kill Team 3rd edition. First list: `lists/mine/sanctifiers.html` (Sanctifiers, Adeptus Ministorum).

## Source data
- No roster JSON exists. Data came from the Wahapedia kill team page (`https://wahapedia.ru/kill-team3/kill-teams/sanctifiers/`, February 2026 version). WebFetch refuses to return the rules verbatim; download with `curl -sL -A "Mozilla/5.0"` and strip tags to text instead.
- The user supplied the roster (Conflagrator dropped, two Missionary loadouts `missionaryM` / `missionaryF`), so `UNITS` lists only those operatives.
- Embedded JS: `PROFILES` (APL, Move, Save, Wounds, base, keyword tags, weapons with `t` = r/m and `wr` rule array), `RULES` (weapon rule text for the profile glossary), `E` (cards), `PHASES`, `REMIND`.

## Turn structure used as page tabs
- Kill Team has no fixed phases, so the tabs are: 1 Strategic Gambit (Strategy phase: Ready step, gambit; Ecclesiarchy Texts and Ministorum Sermon) and 2 Action (activations: operative abilities, unique actions, equipment, and both strategy and firefight ploys; the user wants ploy effects there). Operative abilities and actions are not tabs content: they are shown on the selected operative's card. Action holds only equipment and ploys.

## Card kinds
- army = faction rule (ink), unit = operative ability (grey), enh = faction equipment (teal), sploy = strategy ploy (brass), fploy = firefight ploy (red).
- Strategy ploys, firefight ploys and faction equipment each have a multi-select pick row (`localStorage` prefix `kts-`; no "None" button, a pressed button is tapped again to clear; buttons show only the `hint`). Only picked cards are shown (`PICKED_KINDS` in `matches`); with nothing picked those cards are hidden. Ploys sit in the right column and use `hint` as the pick-button label.
- Show operative: one flat alphabetical chip list, tapping the selected chip deselects it. The operative card shows stats, ranged and melee weapon tables side by side (type in the table header), its abilities and actions (short text, expandable "Full rule"), the picked ploys and equipment that apply to it, the "Weapon rules used here" glossary, and the keyword tags at the bottom.

## Rules conventions
- Ploy CP costs are not on the source page, so none are shown. Do not add "1CP" without a source.
- The roster has two Missionaries with different loadouts, shown as two operatives; each lists only its own weapons.
- Short descriptions (`sum`) of every card are 15 words at most; the full wording lives in `js/sanctifiers-rules.js`. Shortening a `sum` also changes it in the tabs.

## Pitfalls
- Grid tracks inside `.ctrl-col` need `grid-template-columns:minmax(0,1fr)`, otherwise long ploy labels widen the column and overlap Show operative. The pick rows wrap here (`.pick{flex-wrap:wrap}`) because labels are long.
- JS strings containing a `"` inch mark must use backticks, not double quotes.

## Page weight (Sanctifiers page)
- Goal (user): HTML small enough for one TCP round trip (see `context/legions-imperialis.md` > Page weight). `gzip -9c lists/mine/sanctifiers.html | wc -c` is now 11.3 KB (was 15.2 KB).
- No web fonts: `--head` = Avenir Next Condensed, Arial Narrow, DIN Condensed; `--body` = Charter, Iowan Old Style, Georgia (iPadOS system fonts).
- Two kinds of text live in `js/sanctifiers-rules.js` as `window.KTS_RULES = {f:{card id: full rule}, w:{weapon rule key: text}}` (one per line): the "Full rule" of each card in `E` (31 cards) and the weapon-rule glossary (`RULES`, 17 entries, shown under "Weapon rules used here" in the operative profile). `cardHTML()` and `renderProfile()` write empty slots `<p data-k="f:id">` / `<span data-k="w:key">`; `fill()` (end of `render()`, end of `renderProfile()` and on the script's `onload`) fills them. A weapon rule key with no entry in `w` has its line removed (the old code filtered such keys out up front), and the whole fold goes if no line is left. The script is added at the end of the page script, so it is requested after the first render. New card: add it to `E` without `full`, and add its id and text under `f`.
- Check after editing: load the page with `--allow-file-access-from-files --virtual-time-budget=5000`, wait about 800 ms, and `document.querySelectorAll('[data-k]:empty')` must be empty for every Show operative chip.
- Headless Chrome on Linux has none of the system fonts; for layout screenshots use a temp copy with `Liberation Sans Narrow` / `Liberation Serif` as stand-ins.

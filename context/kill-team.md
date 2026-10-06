# Kill Team

Kill Team 3rd edition. First list: `lists/sanctifiers.html` (Sanctifiers, Adeptus Ministorum).

## Source data
- No roster JSON exists. Data came from the Wahapedia kill team page (`https://wahapedia.ru/kill-team3/kill-teams/sanctifiers/`, February 2026 version). WebFetch refuses to return the rules verbatim; download with `curl -sL -A "Mozilla/5.0"` and strip tags to text instead.
- The page lists every operative, so the list page shows the whole team. If the user supplies a roster, filter `UNITS` to it.
- Embedded JS: `PROFILES` (APL, Move, Save, Wounds, base, keyword tags, weapons with `t` = r/m and `wr` rule array), `RULES` (weapon rule text for the profile glossary), `E` (cards), `PHASES`, `REMIND`.

## Turn structure used as page tabs
- Kill Team has no fixed phases, so the tabs are: 1 Strategic Gambit (Strategy phase: Ready step, gambit; Ecclesiarchy Texts and Ministorum Sermon) and 2 Action (activations: operative abilities, unique actions, equipment, and both strategy and firefight ploys; the user wants ploy effects there). Passive operative abilities also sit in Action.

## Card kinds
- army = faction rule (ink), unit = operative ability (grey), enh = faction equipment (teal), sploy = strategy ploy (brass), fploy = firefight ploy (red).
- Strategy ploys, firefight ploys and faction equipment each have a multi-select pick row (`localStorage` prefix `kts-`). Only picked cards are shown (`PICKED_KINDS` in `matches`); with nothing picked those cards are hidden. Ploys sit in the right column and use `hint` as the pick-button label.
- Show operative: All chip plus groups Command & support / Fire / Melee. The profile shows APL, Move, Save, Wounds, base size, keyword tags, ranged and melee weapons, and a "Weapon rules used here" glossary.

## Rules conventions
- Ploy CP costs are not on the source page, so none are shown. Do not add "1CP" without a source.
- Missionary has four loadouts; all weapons are listed with a note since no roster says which one is taken.

## Pitfalls
- Grid tracks inside `.ctrl-col` need `grid-template-columns:minmax(0,1fr)`, otherwise long ploy labels widen the column and overlap Show operative. The pick rows wrap here (`.pick{flex-wrap:wrap}`) because labels are long.
- JS strings containing a `"` inch mark must use backticks, not double quotes.

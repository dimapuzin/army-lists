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

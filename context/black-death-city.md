# Black Death City

Playtest rulebook 1.01 (`rules/BlackDeathCity-Playtest-1.01.pdf`, 97 MB; read pages in ranges of 20 max). Guild Mercenaries pages 51-70: fighters list 55, armoury 56-60, Spell Lores 61-62, skills 63-64, fighter scrolls 65-70. Page numbers in the book are printed on the page, the PDF page numbers match.

## Page `lists/mine/black-death-city.html`
- Kill Team style: no phases, one card per distinct loadout (`FIGHTERS` in the page, weapons in `WEAP`). "Show fighter" chips filter to one card, tap again to show all (`localStorage` key `bdc-sel`).
- Roster (994 silver): High Wizard (Arcane Staff, Grimoire), Guild Cleric (Arcane Staff, Grimoire), Guild Champion (Full-Plate, Sword, Flail, Wooden Stakes), Guild Champion (Full-Plate, Warhammer), Hunting Dog x3, Guild Mercenary x3 (Shield, Sword). Cost = recruit cost + gear.
- Wizard and Cleric cards show all six spells of their lore (Sanctioned Magic / Saints), rendered by `fill()` from `window.BDC_RULES.l`. Gear text (`g`), held-item rule are in `js/black-death-city-rules.js` and appear under "Rules reminders"; weapon trait texts (`t`) open from the trait chips.
- Spells are collapsed (`details`); signature spells are outlined red with a "Signature" tag: Wizard Eldritch Barrier + Flaming Weapon, Cleric Bless Thy Blade (`sig` in `FIGHTERS`).
- Armour shown is the effective value (Full-Plate 4+, Shield makes 6+ into 5+).

## Status
Page is final (user decision). Page weight: HTML 4.9 KB gzipped, rules JS 2.5 KB.

## Decisions
- Skills: Champion (Sword, Flail) has Right On Time, Champion (Warhammer) has Feint (Old Dogs, p.63). The Seasoned Warrior line was removed from the Champion cards on purpose; do not re-add.
- Trait chips: tapping shows the full text under the weapons table; one open per card.

## Open points
- The High Wizard has no skills chosen (Veteran of the City / Master of Spellcraft picks beyond the signature spells).
- Weapon trait texts (Weapon Traits section, rulebook pp. 26-28) are used in full; tapping a trait chip shows them. Other "pg xx" references in the book are still placeholders.

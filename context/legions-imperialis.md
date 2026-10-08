# Legions Imperialis

Solar Auxilia list "Ranger Brigade": `lists/legions-imperialis.html` (Sub-Cohort 370 pts (HQ is a Legate Commander Detachment, 16 pts) + Pioneer Company 380 pts = 750 pts).

## Source data
- No roster JSON. The user pasted the roster as text (Legion Builder export). `legionbuilder.app/reference/detachments` is a client-rendered Next.js page, so WebFetch/curl return nothing useful.
- Stats, weapon profiles, special rules and weapon traits come from Epic Heresy: `https://epicheresy.ru/li2023/factions/solar_auxilia/detachments/`, `.../legions_imperialis_rules/weapon_traits/`, `.../special_rules/`. Download with `curl -sL -A "Mozilla/5.0"` and strip tags; WebFetch summarises and paraphrases.
- Army rules Chain of Command, Solar Auxilia HQ (X) and Close Formation Fighting are on `.../factions/solar_auxilia/`, not on the special rules page.

## Page layout (differs from the other games)
- No phases, no tabs, no rail. Tool panel, kept compact so Show unit, Formation control and one unit card fit one iPad Air 3 screen (834x~980 portrait, 1112x~690 landscape): Show unit is a wrapping chip bar with inline group labels (All + Infantry / Bastion & artillery / Armour & air), Formation control sits below it with the two formation boxes side by side (one column below 640px; unit rows go two-up at 1000px+). Do not add padding or enlarge this panel casually.
- Main = one section per formation (name, pts, formation strength, break point), one card per roster entry; identical entries are merged with a `×N` count (`n`).
- Cards are full width, one per row; inside, left column = Models + Upgrades, right column = Weapons used + Rules & traits (stacks below 700px).
- Card: points, tags (slot, type, detachment size), models table, weapons used table (traits shown under the name on phones), "Upgrades & choices taken" (outlined), then Army rules / Special rules / Weapon traits with full text always visible. Only rules and traits the unit uses are shown.
- Data in embedded JS: `UNITS`, `UNIT_GROUPS`, `MODELS`, `WEAPONS`, `FORMATIONS` (entries), `TRAITS`, `RULES`, `FACTION_RULES`.

## Rules conventions
- Roster points = datasheet base + upgrades (Tercio 30+12, Infernus 60+5). Roster slot words (compulsory/optional/choice) are ignored.
- Pioneer break point 8 and strength 16 = 19 models minus the 3 Tarantulas (Automated Sentry).
- Avenger: the roster names only nose and wing weapons; bolt cannon and tail gun are standard on the datasheet and are shown as such.
- Epic Heresy lists Sentinel missile launcher twice with different profiles; both are shown as profile 1 / 2.

## Formation control
- Per roster entry a +/- counter of models lost (max = detachment size x count). Rules (Playing the Game, Withdrawing and Break Points): Break Point = half the starting models, rounded up; a Formation is Broken when models destroyed equals or exceeds it. Ogryns and tanks count as one model, only Titans and Knights count wounds.
- Per formation: strength, break point, lost / break point, models left, BROKEN badge. Automated Sentry entries (Tarantula) show a counter but are "not counted" in the sum, since they are ignored for the Break Point.
- State in `localStorage` key `li-lost` (try/catch); Reset asks for confirmation. The panel re-renders on its own so open rule texts on the cards are not collapsed.

## Formation rules
- Source: `https://epicheresy.ru/li2023/factions/solar_auxilia/formations/` (Sub-Cohort: Disciplined Ranks; Pioneer Company: Forward Positions). The iconic formations page lists other pre-built formations (Solar Pattern etc.) and does not apply to this list.
- Shown only while a unit chip is selected, as a collapsed "Formation rules" fold at the top of that formation's section; a unit in two formations (Tactical Command) shows both. For Pioneer Company the fold also says which rule the picked unit gets: Infiltrate if it is Infantry without Bulky, else Forward Deployment (derived from the rule text, not stored per unit).

## Ironwall (friendly list)
- `lists/ironwall.html`: BG-XIV «Ironwall», another player's list, shown in the "Friendly Lists" section of `index.html` (my own lists stay under "Lists"). Loyalist Legiones Astartes, 750 pts: Death Guard Legion Demi-company 440 pts (strength 23, BP 12) and Death Guard Brethren of Iron 310 pts (strength 15, BP 8).
- Built by copying `legions-imperialis.html` and replacing the data block, so layout and behaviour are the same. localStorage key is `ironwall-lost` (keys are shared by all pages on the same origin, so every list needs its own).
- Data: Legiones Astartes and Mechanicum Taghmata detachments on Epic Heresy (`.../factions/legiones_astartes/detachments/`, `.../mechanicum_taghmata/detachments/`), Cybernetica Cortex / Cortex Controller on `.../factions/mechanicum_taghmata/`, Demi-Company rules on `.../factions/legiones_astartes/formations/`, Brethren of Iron on `.../formations/bonded_cybernetica/legiones_astartes/`, Sons of Barbarus on `.../factions/legiones_astartes/special_rules/`.
- Roster reading: "(N)" is the detachment size as taken; "xN" is the model count (Rapier Battery "(2), 40pts, x2" = one detachment of 2 models, 40 pts, not 80). Rhino Detachment 35 pts = 10 base + 20 for 2 more Rhinos + 5 havoc launcher pintle on one Rhino. Slot words (compulsory/optional/choice) are ignored. Points add up: 25+40+50+50+35+35+95+110 = 440; 25+25+25+55+110+35+35 = 310.
- Open points: the Thallax datasheet lists lightning guns and multi-melta without "or", so both are shown; Thanatar uses the standard loadout (plasma mortar + mauler bolt cannon); the Legion Tactical Detachment has no special rules on its datasheet.
- Code additions shared with the Ranger Brigade page: entries can set `m` (merge key) so one unit chip can show two different cards (Tactical Detachment with plasma vs missile support); merged cards union their rules; formations can set `short` for the narrow Formation control heading.

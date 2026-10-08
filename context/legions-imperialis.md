# Legions Imperialis

Lists: `lists/mine/legions-imperialis.html` (my list, "Ranger Brigade", Solar Auxilia) and `lists/friendly/ironwall.html` (friendly list, BG-XIV «Ironwall», Death Guard Legiones Astartes). Both share the same page code; only the data block, hero text, footer, `localStorage` key and rules file differ. Each page has a companion rules file (`js/legions-imperialis-rules.js`, `js/ironwall-rules.js`) holding the rule and trait texts; see Page weight below.

## How to add a new Legions Imperialis list (recipe)
1. Copy the newest page of this game (`lists/friendly/ironwall.html`) to `lists/mine/<name>.html` (or `lists/friendly/<name>.html` for another player's list), and its rules file `js/ironwall-rules.js` to `js/<name>-rules.js`. In the page, change the file name in the line `rs.src="../../js/ironwall-rules.js"` (and in the `fill()` comment).
2. Replace the data block: everything from `const UNITS = {` up to (not including) `const FSTATE_KEY`. It holds `UNITS`, `UNIT_GROUPS`, `FACTION_RULES`, `MODELS`, `WEAPONS`, `FORMATIONS` (schema below). Replace the contents of the new rules file with the texts of this list (`t` = traits, `r` = special rules).
3. Change the `localStorage` key `FSTATE_KEY` to a new unique value. All pages share one origin, so a reused key makes two lists share counters. Used so far: `li-lost` (Ranger Brigade), `ironwall-lost`.
4. Update `<title>`, `<h1>`, the `.meta` line (game, army, total points, formation names) and the `<footer>` source note.
5. Add a card to `index.html`: under "Lists" for my own lists, under "Friendly Lists" for another player's roster (new card colour class `.card.<x>` with `--<x>-bg` / `--<x>-line` tokens in both colour schemes; existing: `li`, `dg`).
6. Add the list to the table in `context/README.md` and note roster quirks at the bottom of this file.
7. Verify at iPad Air 3 sizes (see Layout) and at 390px wide with headless Chrome: `google-chrome --headless --no-sandbox --disable-gpu --window-size=834,980 --screenshot=out.png file:///.../lists/mine/<name>.html`. For behaviour checks append a `<script>` that clicks buttons and writes the result into `document.title`, then `--dump-dom | grep -o '<title>[^<]*'` (use a temp copy, not the repo file). Always run this data check the same way: for every entry, `LI_RULES.r[ruleKey(r)]`, `LI_RULES.t[traitKey(t)]`, `MODELS[id]` and `UNITS[e.u]` must exist (collect misses into the title; both pages currently give none). Load the page from `file://` with `--allow-file-access-from-files` and `--virtual-time-budget=5000` so the rules file loads, and wait about 800 ms in the test script before reading. After the rules file has loaded, `document.querySelectorAll('[data-k]:empty')` must be empty for every unit chip.

## Source data
- The user pastes the roster as text (Legion Builder export). `legionbuilder.app/reference/detachments` is a client-rendered Next.js page: WebFetch and curl return nothing useful. Do not try again.
- Epic Heresy (`https://epicheresy.ru/li2023/...`) has everything: stats, weapon profiles, special rules, traits, formations. Download with `curl -sL -A "Mozilla/5.0" <url>`, strip `<script>/<style>`, turn closing block tags into newlines and table cells (`</td>`, `</th>`) into ` | `, unescape HTML. WebFetch summarises and paraphrases, so use it only to locate things. In the stripped text, table cells end up on separate lines ending in `|`; join lines ending in `|` with the next line to get one row per line. Detachment datasheets start at the last occurrence of the title line (the first occurrence is the table of contents).
- Page map: detachments `.../factions/<faction>/detachments/` (factions: `solar_auxilia`, `legiones_astartes`, `mechanicum_taghmata`, `dark_mechanicum`, `collegia_titanica`, `knight_households`); formations `.../factions/<faction>/formations/`; faction rules `.../factions/<faction>/` (Solar Auxilia: Chain of Command, Solar Auxilia HQ (X), Close Formation Fighting; Mechanicum: Cybernetica Cortex (X), Cortex Controller); Legiones Astartes legion rules `.../factions/legiones_astartes/special_rules/` (e.g. Death Guard Sons of Barbarus); support formations `.../formations/bonded_cybernetica/<faction>/` (e.g. Brethren of Iron); generic rules `.../legions_imperialis_rules/special_rules/`, `.../weapon_traits/`, break point and morale rules `.../legions_imperialis_rules/playing_the_game/`.
- `.../formations/iconic_formations/<faction>/` lists ready-made themed formations (Solar Pattern Sub-Cohort etc.); a roster formation named like a core one (Sub-Cohort, Demi-company) is NOT there.
- In rule/trait text, headings are single lines equal to the rule name; split on those using the table of contents order. Rules with a parameter are stored without it (`Inspire`, `Jink`, `Invulnerable Save`, `Transport`, `Cybernetica Cortex`); `ruleKey` / `traitKey` strip the bracket part and map every `Arc (...)` to `Arc (Front/Rear)`.

## Reading the roster text
- `Name (N), X pts`: N = detachment size as taken (base size plus added models), X = points as taken. `xN` under a unit = number of models with that choice (a Rapier Battery "(2), 40pts, x2" is one detachment of 2 models at 40 pts, not 80). `Additional ...` lines are upgrades; `Sponsons:`, `Pintle:`, `Main:`, `Hull:` lines are weapon choices (cost shown only when not free). Words `compulsory`, `optional`, `choice` are slot labels and are ignored.
- Points check: datasheet base + upgrades must equal the roster points (Tercio 30+12=42, Rhino detachment 10+20+5=35). Formation strength = sum of detachment sizes; Break Point = half of strength rounded up. They must match the roster; if not, find out why before building (Automated Sentry detachments are ignored for Break Point: Pioneer Company 19 models − 3 Tarantulas = 16).
- Use `Detachment Size` and unit lines from the datasheet; do not invent loadouts. Weapon lines on a datasheet without "or" are all carried (Thallax lightning guns + multi-melta); with "or" only the chosen one is shown and listed under taken choices as free. Standard weapons the roster does not mention are shown with the datasheet note (Avenger bolt cannon, tail gun).
- Epic Heresy sometimes repeats a weapon name for a second profile (Sentinel missile launcher; missile launchers; Rapier quad launcher has an unnamed second row). Show both as `profile 1 / profile 2` when both are carried.

## Page layout (differs from the other games)
- No phases, tabs, rail or trackers. Order: hero (back link, list name, meta line), tool panel, then one section per formation.
- Tool panel is kept compact so Show unit, Formation control and one unit card fit one iPad Air 3 screen (834x~980 portrait, 1112x~690 landscape). Do not add padding or enlarge it casually.
  - Show unit: wrapping chip bar, "All" chip plus inline group labels (`UNIT_GROUPS`, 2-3 groups, chips alphabetical). Chip keys are the entry `u` values.
  - Formation control: two formation boxes side by side (one column and each box foldable below 640px; folded by default on phones, header stays visible with strength, break point and lost total; tapping a header folds/unfolds only on phones; fold state is not saved). Unit rows go two-up at 1000px and wider.
- Formation section heading shows only the formation name (user removed points, strength and break point there; they live in Formation control).
- Unit cards are full width, one per row. Tags: slot, type, detachment size, and `In: A + B` when the unit is in several formations. Inside: left column = models table + collapsed "Upgrades & choices taken" (with the points note), right column = weapons table + one "Rules & traits" row; stacks below 700px. No "Models" / "Weapons used" headings (user removed them). Weapon traits move under the weapon name on phones.
- "Rules & traits" is one row of name buttons (stripe colour: ink = army/faction rule, red = special rule, brass = weapon trait); tapping a name opens its full text under the row, several can be open. Only rules and traits the unit actually has are shown.
- Formation rules: shown only while a unit chip is selected, as a collapsed "Formation rules" fold at the top of each formation section that contains the unit (a unit in two formations shows both, even if its card is in only one section). A rule with `grant:true` (Pioneer Company Forward Positions) also states which rule the picked unit gets.
- Palette: both pages use the same olive-grey tokens defined at the top of the file. Fonts: both pages load no web fonts, only iPadOS system fonts: `--head` = Avenir Next Condensed, Arial Narrow, DIN Condensed; `--body` = Charter, Iowan Old Style, Georgia (sizes as in `CLAUDE.md`, which still names the web fonts for the other games). Headless Chrome on Linux has none of these fonts, so for layout screenshots use a temp copy with `Liberation Sans Narrow` / `Liberation Serif` as stand-ins (similar widths); the real look needs the iPad.

## Data schema (embedded JS)
- `UNITS = {key: chip label}`, `UNIT_GROUPS = {group: [keys]}`, `FACTION_RULES = [rule names shown as army rules]`.
- `MODELS = {id: {n, mv, sv, caf, mor, w}}` (strings with inch marks use backticks; `–` for no value). `WEAPONS = {id: {n, r, d, h, ap, tr:[traits]}}`.
- `FORMATIONS = [{id, name, short?, pts, strength, bp, note?, rules?:[{n, t, grant?}], units:[entry]}]`. `short` is the heading in Formation control. `note` is a line under the section heading.
- Entry: `{id, u, m?, n, name, slot, type, pts, size, models:[[modelId,count]], weapons:[[weaponId, "on" text]], taken:[{t, p}], note?, rules:[names with brackets as printed]}`. `n` = identical copies in that formation (card shows `×n`, `pts each (total)`); `pts` = points each as taken; counter maximum = `size * n`.
- Cards merge entries of the same unit across formations (one card, shown in the first formation, counts added, rules unioned). Set `m` (merge key) when two entries of one chip differ and must stay separate cards (Tactical Detachment with plasma vs missile support).
- Rule texts are not in the page. The rules file defines `window.LI_RULES = {t:{trait name: text}, r:{rule name: text}}`, holding only the texts used on the page, keyed by `traitKey` / `ruleKey` names (one entry per line, readable). Heavy Barrage automatically pulls in Barrage.
- How the texts get into the cards: `glossary()` and `formationRules()` write empty `<span data-k="r:Name">` / `data-k="t:Name"` slots, `fill()` (called at the end of `render()` and again on the rules script's `onload`) fills every empty slot from `window.LI_RULES`. The rules script is added by `document.createElement("script")` at the end of the page script, so it is requested only after the first render. Tapping a rule name before the file has arrived opens an empty text that fills in when it lands; offline on a first visit the names show without text.

## Page weight
- Goal (user): HTML small enough for one TCP round trip. Initial congestion window is 10 segments, about 14.6 KB, so aim for the gzipped HTML (GitHub Pages serves gzip, not brotli; its output is about 0.1 KB larger than `gzip -9`) at or under about 13 KB, minus response headers. Check with `gzip -9c lists/<name>.html | wc -c`.
- Measured for `legions-imperialis.html` before the split (gzipped): JS code 3.2 KB, `RULES` 3.1, `TRAITS` 2.5, CSS 2.5, `FORMATIONS` 1.3, `MODELS`+`WEAPONS` 0.7, HTML 0.7, `UNITS` 0.2; total 14.9 KB. The rules and traits text was 38% of it, which is why it moved to the rules file (gzipped HTML now 9.1 KB for Ranger Brigade, 9.8 KB for Ironwall; rules files 6.2 KB each).
- Not done, would save more: minifying CSS and JS (about 1 KB; breaks hand editing and the no-build-step rule), dropping the duplicate `data-theme` dark token block.

## Formation control rules
- Counter = models lost per entry (not wounds). Source: Playing the Game, "Withdrawing and Break Points": Break Point = half the starting models rounded up; a Formation is Broken when models destroyed equals or exceeds it; Titans and Knights count wounds instead (not yet implemented, none in the lists so far). A 2-wound Ogryn or tank is one model.
- Entries with the Automated Sentry rule show a counter but are labelled "(not counted)" and left out of the sum.
- Shown per formation: Strength current/start, Break point, Lost x/BP, BROKEN badge. Counter labels strip `Auxilia ` / `Legion ` prefixes and `Squadron/Battery/Patrol/Section/Detachment/Maniple` suffixes.
- State in `localStorage` (`FSTATE_KEY`, try/catch, values clamped on load). Reset asks for confirmation. `renderFC()` redraws only the panel, so open rule texts on the cards stay open.

## Decisions and user preferences so far
- Cards show full text of every rule and trait the unit has (user: "keep all special rules and weapon traits"), but as tap-to-open names to save space.
- A unit that exists in several formations gets one card.
- Friendly lists (other players) go in their own index section, same page type and rules as my lists.
- Formation points, strength and break point were removed from the section heading above the cards; do not re-add.

## Lists
### Ranger Brigade (`lists/mine/legions-imperialis.html`, key `li-lost`)
- Solar Auxilia, 750 pts: Sub-Cohort 370 (strength 23, BP 12; HQ is a Legate Commander Detachment 16 pts; was a Tactical Command 10 pts, formation total then 364) and Pioneer Company 380 (16, BP 8). Formation rules: Disciplined Ranks, Forward Positions (Infiltrate for Infantry without Bulky, else Forward Deployment).
- Units: Legate Commander, Tactical Command (Pioneer only), Lasrifle Tercio x2 (+2 flamer auxiliaries), Ogryn Charonite Section x2, Malcador Infernus x2 (lascannon sponsons, pintle heavy stubber), Veletaris Storm Section, Tarantula Battery (Hyperios, Automated Sentry), Rapier Battery (mole mortar), Avenger Strike Fighter (lascannon, wing bombs), Aethon Heavy Sentinel Patrol, Medusa Battery.
- Infantry carry the army rule Close Formation Fighting; Chain of Command is the army rule that Solar Auxilia HQ (X) unlocks.
### BG-XIV «Ironwall» (`lists/friendly/ironwall.html`, key `ironwall-lost`, friendly list)
- Loyalist Legiones Astartes, 750 pts, both formations Death Guard: Legion Demi-company 440 (23, BP 12) and Brethren of Iron 310 (15, BP 8). Formation rules: Sons of Barbarus (both), Dedicated Transports, Heart of the Legion, Brethren of Iron support-formation text (Cortex Controller on Legion HQ/Core, Mechanicum units get Line within 8").
- Units: Command Squad (both formations, one card, Cortex Controller added by Brethren), Rapier Battery, Tactical Detachment x2 (plasma support) and x1 (missile support, separate card via `m`), Rhino Detachment x2 (3 Rhinos, one havoc launcher), Xiphon Interceptor, Glaive (laser destroyer sponsons), Thallax Cohort x2, Thanatar Maniple (plasma mortar + mauler bolt cannon), Vultarax Squadron x2.
- Open points: Thallax carry both listed weapons (no "or" on the datasheet); Legion Tactical Detachment shows no special rules (none on its datasheet).

## Pitfalls
- A JS string with an inch mark `"` must use backticks (or escape it).
- Datasheet special-rule lists contain brackets as printed (`Cybernetica Cortex (Advance, First Fire)`); the card shows that text, `ruleKey` finds the rule text.
- Keep the rules file in sync with what the data uses: a missing key renders an empty rule text silently (the `data-k` slot stays empty). After editing, check that every `tr` entry and every `rules` name resolves (compare against the `t` / `r` keys of `LI_RULES`).
- A rules file edit changes a separate file that browsers may have cached; when testing on the deployed site, hard-reload.
- The Formation control heading must stay short; long formation names need `short`.

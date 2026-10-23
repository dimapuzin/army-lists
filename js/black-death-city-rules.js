window.BDC_RULES = {
t: {
  "Arcane": "<i>(Critical hits on 5+)</i> Attack rolls made with this weapon score critical hits on a natural roll of 5 or 6.",
  "Bludgeon": "<i>(Critical hits deal 1 damage when saved)</i> Each time an armour roll successfully saves a critical hit scored by this weapon, the target suffers 1 damage.",
  "Guard": "<i>(1 miss can parry a hit)</i> When a fighter makes a parry, instead of using a hit they can use a missed attack roll from this weapon. They can do this once each melee attack.",
  "Natural Weapon": "<i>(Cannot parry)</i> Attacks made with this weapon cannot be used to parry.",
  "Off-hand": "<i>(1 extra attack)</i> When making a melee attack action, this weapon can be used to make an off-hand attack.",
  "Two-handed": "<i>(1 per fighter. No off-hand attack)</i> A fighter can only be equipped with 1 two-handed weapon.<br>A fighter cannot make off-hand attacks if they are equipped with a two-handed weapon.",
  "Unwieldy": "<i>(-1 to attack rolls)</i> Subtract 1 from attack rolls made with this weapon.",
  "Wrap": "<i>(Cannot parry or be parried)</i> Attacks made by this weapon cannot be parried, and they cannot be used to parry another attack."
},
g: {
  "Grimoire": "<i>Item.</i> Once per battle, after this fighter has made casting roll, you can re-roll the casting roll.",
  "Full-Plate": "<i>Armour value 4+.</i> Fighters equipped with this armour cannot be equipped with two-handed ranged weapons with the exception of a Brace of Pistols.",
  "Shield": "<i>Held Item.</i> Improve this fighter's Armour value by 1, to a maximum of 2+. (For example, 6+ becomes 5+.)",
  "Wooden Stakes": "<i>Item, Rare: 0-1.</i> Once per battle, while this fighter is engaged in melee with a <i>Undead</i> or <i>Demon</i> fighter that is bloodied, it can use the following bonus action:<br><b>Drive the Stake [Bonus Action]:</b> Pick an enemy <i>Demon</i> or <i>Undead</i> fighter this fighter is engaged in melee with, that is bloodied, to be the target. Roll a dice. On a 2+ the target is immediately taken down. In the aftermath of battle, this fighter earns 10 bonus experience.",
  "Held": "Some items have the <i>Held Item</i> keyword (eg. Shields). These items count towards the number of melee weapons a fighter can be equipped with instead of the number of items. In addition, they have the following rules:<br><b>Two-Handed Melee Weapons:</b> A fighter can be equipped with a <i>held item</i> and a <i>two-handed</i> melee weapon (eg. a Spear and Shield), however, subtract 1 from the Attacks value of the fighter's <i>two-handed</i> melee weapons.<br><b>Two-Handed Ranged Weapons:</b> A fighter cannot be equipped with a <i>held item</i> and a <i>two-handed</i> ranged weapon."
},
l: {
  sanct: [
    ["Arcane Missile","Attack Spell","7+","Pick the closest visible enemy fighter within 15\" of the caster to be the target. That fighter is hit with the following attack: <b>Rend -1, Damage d3.</b>","Add 1 to the Damage value.","10+"],
    ["Flaming Weapon","Enchant Spell","7+","Pick a visible friendly fighter within 6\" of the caster to be the target, then pick 1 of the target's melee weapons to <i>ignited</i> until the end of the round. While a weapon is <i>ignited</i>: it gains the <i>Arcane</i> Weapon Trait; improve its Rend characteristic by 1.","Increase the range of the spell from 6\" to 12\".","10+"],
    ["Eldritch Barrier","Cantrip Spell","7+","Pick 2 visible points on a platform or the battlefield floor, each within 9\" of the caster, 6\" of each other and the same elevation. A barrier is drawn between these two points.<br>The barrier remains in play until the end of the round or the caster is taken down. While the barrier is in play: subtract 1 from attack rolls made by ranged attacks that cross the barrier; fighters that are activated in the barrier or move across the barrier suffer d3 damage.","The 2 points can be set up within 9\" of each other instead of 6\".","10+"],
    ["Silence","Hex Spell","7+","Pick a visible enemy <i>Wizard</i> or <i>Priest</i> within 12\" to be the target. Until the end of the round, that fighter cannot make arcane actions.","Increase the range from 12\" to 18\".","10+"],
    ["Torrent of Fire","Attack Spell","8+","Place the flame template. Each fighter in its area is targeted and hit with the following attack: <b>Rend -1, Damage d3+1.</b>","The Rend value is -2.","12+"],
    ["Umbral Vortex","Attack Spell","9+","Place the blast template centred on a visible point within 15\" of the caster, it then scatters d6\". Each fighter in its area is hit with the following attack: <b>Rend -1, Damage d3+1.</b><br>After the attacks have been resolved, the blast template remains where it is. It represents a vortex that is in play until the end of the round.<br>Line of sight cannot be drawn across the vortex for fighters on the same elevation. In addition, fighters who start their activation within the vortex, or move across it, are hit with the same attack.<br>At the end of the round, remove the vortex.","It does not scatter.","13+"]
  ],
  saints: [
    ["Healing Essence","Healing Spell","6+","Pick a visible friendly fighter within 15\" of the caster to be the target. Heal d3 life points to the target.","Heal 3 life points instead of d3.","10+"],
    ["Bless Thy Blade","Enchant Spell","7+","Pick a visible friendly fighter within 9\" of the caster to have <i>blessed blades</i> until the end of the round. While a fighter has <i>blessed blades</i>, add 1 to hit rolls for melee attacks made by them.","If critically cast, up to 2 friendly fighters can be picked instead of 1.","10+"],
    ["Godspeed","Aura Spell","6+","Until the end of the round, the caster has a 9\" aura of <i>godspeed</i>. Fighter who begin a move while they are within the aura add 1\" to the maximum distance they can move.","Increase the range of the aura from 9\" to 12\".","10+"],
    ["Will of The Saints","Enchant Spell","7+","Pick a visible friendly fighter within 15\" of the caster. That fighter has the <i>Will of the Saints</i> until the end of the round. While a fighter has the <i>Will of the Saints</i>, improve their Armour value by 1, to a maximum of 2+. (For example, 6+ becomes 5+).","If critically cast, up to 2 friendly fighters can be picked instead of 1.","10+"],
    ["Holy Strength","Aura Spell","7+","Until the end of the round, the caster has a 6\" aura of <i>holy strength</i>. Add 1 to the Critical Damage values of melee weapons used by friendly fighters while they are within the aura.","Increase the range of the aura from 6\" to 9\".","10+"],
    ["Consecrated Ground","Aura Spell","8+","Pick a visible point on the battlefield floor within 12\" of the caster. While a friendly fighter is within 3\" of that point, their armour value is improved by 1.<br>The spell remains in play. While this spell is in play, the caster must pass a Willpower test at the start of their activation, else the spell ends. If they attempt to cast this spell again while it is still in play, the first instance of it ends (even if they fail to cast it again).<br>If the caster is taken down, the spell ends.","While the spell is in play, friendly fighters are affected while they are within 6\" of that point, instead of 3\".","12+"]
  ]
}
};

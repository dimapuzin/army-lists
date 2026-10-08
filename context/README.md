# Game context for Claude

One file per game system. Read the matching file before building or editing a list page in `lists/mine/` or `lists/friendly/`. They hold what is not obvious from the code: roster JSON layout, phase structure, card kinds, and pitfalls met so far.

| Game | File | Lists using it |
|---|---|---|
| Warhammer 40,000 (11th edition) | `warhammer-40k.md` | `lists/mine/machine-spirit.html` |
| Age of Sigmar (4th edition) | `age-of-sigmar.md` | `lists/mine/cities-of-sigmar.html` |
| Kill Team (3rd edition) | `kill-team.md` | `lists/mine/sanctifiers.html` |
| Legions Imperialis | `legions-imperialis.md` | `lists/mine/legions-imperialis.html`, `lists/friendly/ironwall.html` |

Rules for every game:
- Rules text comes from the user's roster JSON (`jsons/`) and pasted rules. Never invent rules or stats. If something is missing or ambiguous, say so on the page or ask.
- Keep this folder factual: add a note when a decision, quirk or user preference would otherwise be re-discovered. Do not paste full rules text here.
- Adding a new game: create `context/<game>.md` using the same headings as the existing files and add a row above.

# CONTINUITY.md – Projektstand

> Wird von JEDEM Agent gelesen (Kontext) und aktualisiert (nach Abschluss).
> Format ist FEST – keine Abschnitte hinzufügen oder entfernen!

---

## Meta

| Key | Value |
|-----|-------|
| **App** | [PROJEKTNAME / APP-NAME] |
| **Phase** | [z.B. Phase 1 – MVP] |
| **Sprint/Milestone** | [z.B. Auth-System implementieren] |
| **Last Updated** | [YYYY-MM-DD HH:MM] |
| **Last Agent** | [/setup, /product, /planner, /architect, /ux, /database, /builder, /tester, /reviewer, /status] |

---

## Aktueller Status

**Status:** 🟢 On Track | 🟡 Verzögert | 🔴 Blocked

**Zusammenfassung (1-2 Sätze):**
[Was wurde zuletzt gemacht? Wo stehen wir?]

---

## Letzter Agent-Output

**Agent:** /[name]
**Aktion:** [Was wurde gemacht?]
**Ergebnis:** ✅ Abgeschlossen | 🔄 Teilweise | ❌ Fehlgeschlagen
**Dateien geändert/erstellt:**
- `path/to/file1.ts` – [was wurde geändert]
- `path/to/file2.ts` – [was wurde geändert]

**Testing Notes (nur /builder):**
[Hinweise für /tester – was manuell geprüft werden muss]

---

## Nächster Schritt

**Empfohlener Agent:** `/[agent]`
**Konkreter Prompt:**
```
/[agent] [Exakter Prompt, den der User copy-pasten kann]
```

**Alternativ (falls Blocker):**
```
/[agent] [Alternativer Pfad]
```

---

## Offene Entscheidungen

| # | Frage | Kontext | Entscheidung |
|---|-------|---------|-------------|
| 1 | [Offene Frage] | [Warum relevant] | ⏳ Offen / ✅ Entschieden: [Was] |

---

## Blocker

| # | Blocker | Seit | Impact | Owner |
|---|---------|------|--------|-------|
| – | Keine aktuellen Blocker | – | – | – |

---

## Abgeschlossene User Stories (aktuelle Phase)

| US-ID | Titel | Status | Agent-Chain |
|-------|-------|--------|-------------|
| US-001 | [Titel] | ✅ Done / 🔄 In Progress | /planner → /architect → /builder → /tester ✅ |

---

## Backlog-Referenzen

Aktive Specs in `docs/backlog/`:
- [ ] `docs/backlog/US-001-[name].md` – [Status]
- [ ] `docs/backlog/US-002-[name].md` – [Status]

---

## Loop-Tracker

> Bei Tester→Builder oder Reviewer→Builder Rückschleifen hier tracken.
> Max 2 Loops, dann Eskalation an User.

| Datum | Loop | Agent-Pair | Issue | Resolution | Loop # |
|-------|------|-----------|-------|------------|--------|
| – | – | – | – | – | – |

---

## Session-Historie (letzte 5)

| Datum | Agent | Aktion | Ergebnis |
|-------|-------|--------|----------|
| [YYYY-MM-DD] | /[agent] | [Was] | ✅/❌ |

---

*CONTINUITY.md Template v1.1 | BMAD Lite v3.3*

---
id: US-X.Y
title: Kurzer Titel
status: ready
priority: high | medium | low
phase: X
created: YYYY-MM-DD
updated: YYYY-MM-DD
assigned_agent: null
depends_on: []
blocks: []
effort: "Xh"
risk: low | medium | high
---

# US-X.Y: Kurzer Titel

## User Story

**Als** [Rolle]
**möchte ich** [Funktion/Feature]
**damit** [Nutzen/Wert]

## Acceptance Criteria

| ID | Given | When | Then | Verification | Status |
|----|-------|------|------|--------------|--------|
| AC-X.Y.1 | [Ausgangssituation] | [Aktion] | [Erwartetes Ergebnis] | e2e/unit/manual | ⏳ |
| AC-X.Y.2 | [Ausgangssituation] | [Aktion] | [Erwartetes Ergebnis] | e2e/unit/manual | ⏳ |

### AC-Status Legende

- ⏳ Ausstehend
- ✅ Verifiziert
- ❌ Fehlgeschlagen
- 🚫 Blocked

## Technical Notes

<!-- Technische Details, betroffene Dateien, API-Struktur etc. -->

**Betroffene Dateien:**
- `src/...`
- `api/...`

**Datenbank:**
- Tabelle: X
- RLS Policy: Y

**Abhängigkeiten:**
- Package Z

## Definition of Done

- [ ] TypeScript kompiliert ohne Fehler
- [ ] ESLint ohne Warnungen
- [ ] Alle AC ✅ verifiziert
- [ ] E2E Tests geschrieben (wenn Verification = e2e)
- [ ] Security-Review passed (bei Auth/Admin Features)
- [ ] CONTINUITY.md aktualisiert
- [ ] Code-Review/PR approved

## Out of Scope

<!-- Was gehört NICHT zu dieser Story -->

- Feature A (separate Story)
- Refactoring B (Tech Debt)

## Open Questions

<!-- Offene Fragen an Stakeholder -->

- [ ] Frage 1?
- [x] Frage 2? → **Antwort**

## Agent Log

| Datum | Agent | Aktion | Ergebnis |
|-------|-------|--------|----------|
| YYYY-MM-DD | /planner | Story erstellt | ready |

---

## Notizen

<!-- Freie Notizen während der Implementierung -->

# CLAUDE.md - Projektspezifische Anweisungen

## Projekt: [PROJEKT-NAME]

<!-- Ersetze [PROJEKT-NAME] mit deinem Projektnamen -->

---

## Multi-Agent System

### Agent-Rollen

| Phase | Agent | Aufgabe | Command |
|-------|-------|---------|---------|
| Plan | PLANNER | User Stories, Requirements | `/planner` |
| Design | ARCHITECT | Konzepte, Datenmodell-Design | `/architect` |
| DB | DATABASE | Migrations, RLS Policies | `/database` |
| Code | BUILDER | Features, API, UI, Fixes | `/builder` |
| Test | TESTER | E2E Tests, Verifikation | `/tester` |
| Review | REVIEWER | Security-Audit | `/reviewer` |
| Status | STATUS | Fortschritt prüfen | `/status` |

### Workflow

```
/planner → /architect → /database → /builder → /tester → /reviewer
```

### Kritische Regeln

- CONTINUITY.md VOR und NACH jedem Agent-Aufruf aktualisieren
- Agents sind stateless - immer vollständigen Kontext übergeben
- YAML für strukturierte Ergebnisse (token-effizient)

---

## Acceptance Criteria & Definition of Done

### Zentrale Prinzipien

**Jeder Task MUSS haben:**
1. **Acceptance Criteria (AC)** - Wann ist das Feature funktional fertig?
2. **Definition of Done (DoD)** - Welche Qualitätsstandards müssen erfüllt sein?

### Definition of Done (Global)

```yaml
definition_of_done:
  code:
    - "TypeScript kompiliert ohne Fehler"
    - "Keine Lint Warnungen"
    - "Keine console.log im Production-Code"

  security:
    - "Keine Secrets im Code"
    # Projekt-spezifische Regeln hier ergänzen

  tests:
    - "Alle existierenden Tests grün"
    - "Neue Funktionalität hat Tests"

  documentation:
    - "CONTINUITY.md aktualisiert"
```

### Acceptance Criteria Template

```yaml
acceptance_criteria:
  - id: "AC-001"
    given: "Vorbedingung"
    when: "Aktion"
    then: "Erwartetes Ergebnis"
    verification: "e2e|unit|manual"
```

### Workflow mit AC/DoD

```
┌─────────────────────────────────────────────────────────────┐
│ 1. PLANNER definiert AC                                      │
│    → "Ohne AC kein Start!"                                   │
├─────────────────────────────────────────────────────────────┤
│ 2. Agents arbeiten                                           │
│    → Jeder Agent prüft seine DoD vor Abschluss              │
├─────────────────────────────────────────────────────────────┤
│ 3. TESTER verifiziert AC                                     │
│    → Jede AC wird explizit getestet und dokumentiert        │
├─────────────────────────────────────────────────────────────┤
│ 4. REVIEWER prüft Gesamtqualität                            │
│    → Security DoD + Globale DoD erfüllt?                    │
├─────────────────────────────────────────────────────────────┤
│ 5. Task als "completed" markieren                            │
│    → NUR wenn alle AC ✅ und DoD ✅                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Dokumentations-Hierarchie

```
┌─────────────────────────────────────────────────────────────┐
│ 1. CONTINUITY.md (Ledger) - IMMER AKTUELL                   │
│    → Aktueller Status, aktiver Task, letzte 5 Ergebnisse    │
├─────────────────────────────────────────────────────────────┤
│ 2. Externe Docs (Notion, etc.)                              │
│    → Architektur, Entscheidungen, Lessons Learned           │
├─────────────────────────────────────────────────────────────┤
│ 3. Git Commits                                               │
│    → Was wurde geändert und warum                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Projekt-spezifische Konfiguration

<!--
Ergänze hier projekt-spezifische Informationen:

### URLs & Domains
| Service | URL |
|---------|-----|
| App | https://... |

### Test-User
| Email | Passwort | Verwendung |
|-------|----------|------------|
| test@example.com | Test123! | E2E Tests |

### Security-Regeln
- ...

### Lessons Learned
- **DATUM**: Beschreibung. **Lektion:** ...
-->

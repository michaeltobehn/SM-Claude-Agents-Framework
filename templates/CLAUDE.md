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
| UX | UX | UI/UX Specs, Components, Accessibility | `/ux` |
| DB | DATABASE | Migrations, RLS Policies | `/database` |
| Code | BUILDER | Features, API, UI, Fixes | `/builder` |
| Test | TESTER | E2E Tests, Verifikation | `/tester` |
| Review | REVIEWER | Security-Audit | `/reviewer` |
| Status | STATUS | Fortschritt prüfen | `/status` |

### Workflow

```
/planner → /architect → /ux → /database → /builder → /tester → /reviewer
```

### Kritische Regeln

- CONTINUITY.md VOR und NACH jedem Agent-Aufruf aktualisieren
- Agents sind stateless - immer vollständigen Kontext übergeben
- YAML für strukturierte Ergebnisse (token-effizient)
- **Strikte Rollentrennung**: BUILDER schreibt KEINE Tests, TESTER fixt KEINEN Code
- Nach Abschluss: Handoff an nächsten Agent dokumentieren

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

**WICHTIG:** NUR verifizierte User verwenden! Keine Test-User erfinden!

| Email | Passwort | Rolle | DB-ID | Verwendung |
|-------|----------|-------|-------|------------|
| test@example.com | Test123! | Standard | uuid-... | E2E Tests |

### Security-Regeln
- signOut() NIEMALS mit scope:'local'
- Token nur via Hash-Fragment (#access_token) oder POST
- Keine Secrets im Code

### Lessons Learned
- **DATUM**: Beschreibung. **Lektion:** ...
-->

---

## Database Migration Regeln

### KRITISCH: Migration = Datei + Push + Verify

**Regel:** Eine Migration gilt erst als DONE wenn alle 3 Schritte erfolgreich:

```bash
# 1. Migration erstellen
# supabase/migrations/NNN_beschreibung.sql

# 2. Push zur Remote-DB
supabase db push

# 3. Verify - Local = Remote
supabase migration list --linked
```

### Naming Convention

```
✅ RICHTIG: NNN_beschreibung.sql (fortlaufende Nummer)
   Beispiel: 025_add_audit_log.sql

❌ FALSCH: YYYYMMDD_beschreibung.sql (Datum)
   Problem: Mehrere Migrations am selben Tag → Duplikate
```

---

## TESTER Agent - Spezifische Regeln

**1. Test-Konfiguration:**
- ALLE URLs, Credentials und Test-Daten aus `e2e/test.config.ts` verwenden
- NIEMALS eigene Test-User, URLs oder Domains erfinden
- Bei fehlenden Daten: User fragen, nicht raten

**2. Test-Ausführung:**
- Tests über UI ausführen, nicht nur API-Tests
- Screenshots bei wichtigen Schritten speichern
- Cleanup nach jedem Test (temporäre Daten löschen)

**3. Pflicht-Importe in Test-Dateien:**
```typescript
import { URLS, TEST_USERS, TIMEOUTS } from './test.config'
```

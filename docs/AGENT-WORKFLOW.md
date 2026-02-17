# Agent Workflow & Handoff Protocol

> Strukturiertes Arbeiten mit Multi-Agent Orchestration

---

## Agent-Wechsel Prozedur

### Grundprinzip

```
┌─────────────────────────────────────────────────────────────────────┐
│ PLANNER erstellt IMMER einen Copy-Paste-Prompt für den nächsten     │
│ Agent. User kopiert Prompt in NEUEN Chat.                           │
│ → Saubere Kontexttrennung zwischen Agents                           │
└─────────────────────────────────────────────────────────────────────┘
```

### Prompt-Format für Agent-Handoff

```markdown
## /[agent] - [Story-ID]: [Titel]

**Story:** [Link zur Story-Datei]

### Kontext
[Kurze Situationsbeschreibung]

### Aufgabe
[Was soll implementiert/getestet/reviewed werden]

### Acceptance Criteria
| ID | Beschreibung | Status |
|----|--------------|--------|
| AC-X.1 | ... | ⏳ |

### Technische Details
[Relevante Dateien, Patterns, Constraints]

### Definition of Done
- [ ] Checkliste

### Handoff
[Nächster Agent nach Abschluss]
```

---

## Strikte Rollentrennung

```
┌─────────────────────────────────────────────────────────────────────┐
│ ⚠️  JEDER AGENT HAT EINE KLAR DEFINIERTE VERANTWORTUNG              │
│     Agents dürfen NUR ihre eigenen Aufgaben erledigen!              │
└─────────────────────────────────────────────────────────────────────┘
```

| Agent | DARF | DARF NICHT |
|-------|------|------------|
| **PLANNER** | User Stories schreiben, AC definieren | Code schreiben, Tests schreiben |
| **ARCHITECT** | Design dokumentieren, Struktur planen | Code implementieren, Tests schreiben |
| **UX** | UI Specs, Components, Accessibility | Backend-Code, DB-Migrations |
| **DATABASE** | Migrations schreiben, RLS Policies | UI-Code, API-Handler, Tests |
| **BUILDER** | Feature-Code, API-Handler, UI-Komponenten | E2E Tests schreiben, Security-Audits |
| **TESTER** | E2E Tests schreiben, AC verifizieren | Feature-Code fixen, Security-Audits |
| **REVIEWER** | Code reviewen, Security-Findings dokumentieren | Code ändern, Tests schreiben |

### Warum Rollentrennung?

1. **Qualitätssicherung**: Wer Code schreibt, sollte nicht die eigenen Tests schreiben
2. **Vier-Augen-Prinzip**: Review durch anderen Agent als Implementierer
3. **Spezialisierung**: Jeder Agent ist Experte in seinem Bereich
4. **Nachvollziehbarkeit**: Klare Verantwortlichkeiten im Agent Log

### Was tun bei Grenzfällen?

**Beispiel:** BUILDER implementiert Feature und möchte gleich E2E Tests schreiben

```yaml
# FALSCH ❌
builder_output:
  changes:
    - file: "src/pages/AdminApps.tsx"
      action: "created"
    - file: "e2e/admin-apps.spec.ts"  # ← NICHT Aufgabe des BUILDER!
      action: "created"

# RICHTIG ✅
builder_output:
  changes:
    - file: "src/pages/AdminApps.tsx"
      action: "created"
  handoff_to_tester:
    - "AdminApps Page implementiert"
    - "AC-2.1.1 bis AC-2.1.5 müssen verifiziert werden"
    - "E2E Tests für /admin/apps Seite benötigt"
```

---

## Handoff-Pflicht

Nach Abschluss seiner Arbeit MUSS jeder Agent:

1. **Status auf `review` setzen** (nicht `done`!)
2. **Handoff dokumentieren** im Agent Log
3. **Nächsten Agent benennen** (wer übernimmt?)
4. **NICHT selbst weiterarbeiten** an Aufgaben anderer Agents

### Agent Log Beispiel

```markdown
| Datum | Agent | Aktion | Ergebnis |
|-------|-------|--------|----------|
| 2026-02-05 | /planner | Story erstellt | ready |
| 2026-02-05 | /builder | Feature implementiert | → handoff to /tester |
| 2026-02-05 | /tester | E2E Tests geschrieben | → handoff to /reviewer |
| 2026-02-05 | /reviewer | Security approved | status: done |
```

---

## Dokumentations-Pflicht

### Single Source of Truth

```
┌─────────────────────────────────────────────────────────────────────┐
│ Story-Datei (docs/backlog/phase-X/*.md) ist PRIMÄR                  │
│ Alle anderen Dateien werden daraus ABGELEITET!                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Drei Dokumentations-Ebenen

| Datei | Zweck | Wer aktualisiert | Wann |
|-------|-------|------------------|------|
| **Story-Datei** | Primär: Status, AC, Agent-Log | Arbeitender Agent | Bei jeder Änderung |
| **backlog/README.md** | Übersicht: Sprint-Status | ORCHESTRATOR | Nach Agent-Abschluss |
| **CONTINUITY.md** | Session-State: Aktiver Task | ORCHESTRATOR | VOR/NACH Agent-Aufruf |

### Workflow im Detail

```yaml
# 1. ORCHESTRATOR startet Agent
orchestrator_vor_agent:
  - "Liest Story-Datei für Kontext"
  - "Aktualisiert CONTINUITY.md: Aktiver Task = Story-Link"
  - "Startet Agent mit Aufgabe"

# 2. AGENT arbeitet
agent_während_arbeit:
  - "Aktualisiert NUR die Story-Datei:"
    - "status: ready → in_progress"
    - "Agent Log: Aktion dokumentieren"
    - "AC-Status: ⏳ → ✅/❌"
    - "DoD-Checkliste: [ ] → [x]"
  - "Aktualisiert NICHT:"
    - "backlog/README.md (macht ORCHESTRATOR)"
    - "CONTINUITY.md (macht ORCHESTRATOR)"

# 3. AGENT ist fertig
agent_nach_abschluss:
  - "Setzt status: review in Story-Datei"
  - "Dokumentiert Handoff im Agent Log"
  - "Gibt YAML-Ergebnis zurück"

# 4. ORCHESTRATOR übernimmt
orchestrator_nach_agent:
  - "Validiert Agent-Ergebnis"
  - "Aktualisiert backlog/README.md: Status-Spalte"
  - "Aktualisiert CONTINUITY.md: Sprint Backlog + Aktiver Task"
```

---

## Recovery bei Problemen

### Bei Test-Failures

```
TESTER findet Bug → Handoff zurück an BUILDER mit:
- Welcher Test failed
- Fehlermeldung
- fix_suggestion

BUILDER fixt → TESTER re-testet → Loop bis grün
```

### Bei Security-Findings

```
REVIEWER findet Issue → Status: changes_required
- severity: critical/high/medium/low
- file:line Referenz
- fix Empfehlung

BUILDER fixt → REVIEWER re-reviewed
```

### Bei Blocker

```
Agent kann nicht fortfahren → Status: blocked
- Blocker beschreiben in Story-Datei
- depends_on aktualisieren
- User informieren
```

---

## Quick Reference

### Schnelle Aufgaben (direkt zu Agent)

| Aufgabe | Agent |
|---------|-------|
| Bug Fix | `/builder` direkt |
| Kleine UI-Änderung | `/builder` direkt |
| DB-Migration | `/database` direkt |
| Test ausführen | `/tester` direkt |

### Neue Features (voller Workflow)

```
/planner → /architect → /ux → /database → /builder → /tester → /reviewer
```

*Dokumentversion: 1.1 | Stand: Februar 2026*

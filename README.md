# Claude Agent Framework (BMAD Lite)

> Multi-Agent Orchestration für Claude Code Projekte
> Inspiriert von [BMAD Quick Flow](https://github.com/bmad-code-org/BMAD-METHOD)

## Übersicht

Ein leichtgewichtiges Framework für strukturierte Software-Entwicklung mit Claude Code.

```
┌─────────────────────────────────────────────────────────────┐
│                    7 Spezialisierte Agents                   │
├─────────────────────────────────────────────────────────────┤
│ /planner   → User Stories, Acceptance Criteria              │
│ /architect → Design, Datenmodelle                           │
│ /database  → Migrations, RLS Policies                       │
│ /builder   → Code, Features, Fixes                          │
│ /tester    → E2E Tests, Verifikation                        │
│ /reviewer  → Security-Audit, Code-Review                    │
│ /status    → Migration-Fortschritt prüfen                   │
└─────────────────────────────────────────────────────────────┘
```

## Quick Install

```bash
# In dein Projekt-Verzeichnis wechseln
cd /path/to/your/project

# Framework installieren
curl -sSL https://raw.githubusercontent.com/YOUR_USER/claude-agent-framework/main/install.sh | bash

# ODER manuell
git clone https://github.com/YOUR_USER/claude-agent-framework.git /tmp/caf
/tmp/caf/scripts/install.sh
```

## Manuelle Installation

1. **Kopiere den `.claude/` Ordner** in dein Projekt
2. **Kopiere `docs/CONTINUITY.md`** Template
3. **Passe `CLAUDE.md`** an (oder erstelle neu mit Template)

```bash
cp -r claude-agent-framework/.claude/ your-project/
cp claude-agent-framework/templates/CONTINUITY.md your-project/docs/
cp claude-agent-framework/templates/CLAUDE.md your-project/
```

## Enthaltene Dateien

```
your-project/
├── .claude/
│   ├── commands/
│   │   ├── planner.md      # /planner Command
│   │   ├── architect.md    # /architect Command
│   │   ├── database.md     # /database Command
│   │   ├── builder.md      # /builder Command
│   │   ├── tester.md       # /tester Command
│   │   ├── reviewer.md     # /reviewer Command
│   │   └── status.md       # /status Command
│   └── settings.json       # Claude Code Einstellungen
├── docs/
│   └── CONTINUITY.md       # Ledger für Session-State
└── CLAUDE.md               # Projekt-Anweisungen
```

## Workflow

```
/planner → /architect → /database → /builder → /tester → /reviewer
```

1. **PLANNER** definiert Acceptance Criteria
2. **ARCHITECT** entwirft die Lösung
3. **DATABASE** erstellt Migrations
4. **BUILDER** implementiert
5. **TESTER** verifiziert
6. **REVIEWER** prüft Security

## Kernkonzepte

### Acceptance Criteria (AC)

```yaml
acceptance_criteria:
  - id: "AC-001"
    given: "User ist eingeloggt"
    when: "User klickt Logout"
    then: "Session wird invalidiert"
    verification: "e2e"
```

### Definition of Done (DoD)

Jeder Agent hat spezifische DoD-Checklisten:
- Code kompiliert
- Lint grün
- Tests geschrieben
- CONTINUITY.md aktualisiert

### CONTINUITY.md

Zentraler Ledger für Session-State:
- Aktueller Status
- Aktiver Task mit AC-Tracking
- Letzte Agent-Ergebnisse
- Kontext für nächste Session

## Anpassung

### Projekt-spezifische Regeln

Bearbeite `CLAUDE.md` für:
- Security-Regeln
- Test-User
- URLs/Domains
- Lessons Learned

### Agent-Prompts anpassen

Bearbeite `.claude/commands/*.md` für:
- Projekt-Kontext
- Tech-Stack
- Spezifische Constraints

## Lizenz

MIT
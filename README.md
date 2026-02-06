# Claude Agent Framework (BMAD Lite)

> Multi-Agent Orchestration für Claude Code Projekte
> Inspiriert von [BMAD Quick Flow](https://github.com/bmad-code-org/BMAD-METHOD)
>
> **[Notion Dokumentation](https://www.notion.so/Claude-Code-Agent-System-BMAD-Lite-2fe1bad1d18a819593d4cd231c3a6a92)**

## Übersicht

Ein leichtgewichtiges Framework für strukturierte Software-Entwicklung mit Claude Code.

```
┌─────────────────────────────────────────────────────────────┐
│                    8 Spezialisierte Agents                   │
├─────────────────────────────────────────────────────────────┤
│ /planner   → User Stories, Acceptance Criteria              │
│ /architect → Design, Datenmodelle                           │
│ /ux        → UI/UX Specs, Components, Accessibility         │
│ /database  → Migrations, RLS Policies                       │
│ /builder   → Code, Features, Fixes                          │
│ /tester    → E2E Tests, Verifikation                        │
│ /reviewer  → Security-Audit, Code-Review                    │
│ /status    → Migration-Fortschritt prüfen                   │
└─────────────────────────────────────────────────────────────┘
```

## Dokumentation

| Dokument | Inhalt |
|----------|--------|
| [QUICK-START.md](docs/QUICK-START.md) | Installation und Erste Schritte |
| [AGENT-WORKFLOW.md](docs/AGENT-WORKFLOW.md) | Handoff-Protokoll und Rollentrennung |
| [DEPLOYMENT-STRATEGY.md](docs/DEPLOYMENT-STRATEGY.md) | Wann und wie deployen |

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
│   │   ├── ux.md           # /ux Command
│   │   ├── database.md     # /database Command
│   │   ├── builder.md      # /builder Command
│   │   ├── tester.md       # /tester Command
│   │   ├── reviewer.md     # /reviewer Command
│   │   └── status.md       # /status Command
│   └── settings.json       # Claude Code Einstellungen
├── docs/
│   ├── CONTINUITY.md       # Ledger für Session-State
│   └── backlog/            # User Stories (optional)
│       ├── README.md       # Sprint-Übersicht
│       └── _template.md    # Story-Template
└── CLAUDE.md               # Projekt-Anweisungen
```

## Workflow

```
/planner → /architect → /ux → /database → /builder → /tester → /reviewer
```

1. **PLANNER** definiert Acceptance Criteria
2. **ARCHITECT** entwirft die Lösung
3. **UX** spezifiziert Components & Accessibility
4. **DATABASE** erstellt Migrations
5. **BUILDER** implementiert
6. **TESTER** verifiziert
7. **REVIEWER** prüft Security

## Kernkonzepte

### Strikte Rollentrennung

```
BUILDER schreibt Code      → TESTER schreibt Tests
TESTER findet Bugs         → BUILDER fixt
REVIEWER findet Issues     → BUILDER fixt
```

Agents übernehmen **NIEMALS** Aufgaben anderer Agents!

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

### Handoff-Protokoll

Nach Abschluss **MUSS** jeder Agent:
1. Status auf `review` setzen
2. Handoff im Agent Log dokumentieren
3. Nächsten Agent benennen

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
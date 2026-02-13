# Claude Agent Framework (BMAD Lite)

> Multi-Agent Orchestration für Claude Code Projekte
> Inspiriert von [BMAD Quick Flow](https://github.com/bmad-code-org/BMAD-METHOD)
>
> **[Notion Dokumentation](https://www.notion.so/Claude-Code-Agent-System-BMAD-Lite-2fe1bad1d18a819593d4cd231c3a6a92)**

## Übersicht

Ein leichtgewichtiges Framework für strukturierte Software-Entwicklung mit Claude Code.
Optimiert für Nicht-Programmierer die mit KI-gestützter Entwicklung arbeiten.

```
┌─────────────────────────────────────────────────────────────┐
│                    9 Spezialisierte Agents                   │
├─────────────────────────────────────────────────────────────┤
│ /product   → Ideen, Strategie, Feature-Bewertung            │
│ /planner   → User Stories, Acceptance Criteria              │
│ /architect → Design, Datenmodelle, Spezifikationen          │
│ /ux        → UI/UX Specs, Components, Accessibility         │
│ /database  → Migrations, RLS Policies                       │
│ /builder   → Code, Features, Fixes (mit Guardrails)         │
│ /tester    → E2E Tests, AC-Verifikation                     │
│ /reviewer  → Security-Audit, Code-Review                    │
│ /status    → Projekt-Navigator, nächster Schritt            │
└─────────────────────────────────────────────────────────────┘
```

## Dokumentation

| Dokument | Inhalt |
|----------|--------|
| [QUICK-START.md](docs/QUICK-START.md) | Installation und Erste Schritte |
| [AGENT-WORKFLOW.md](docs/AGENT-WORKFLOW.md) | Handoff-Protokoll und Rollentrennung |
| [DEPLOYMENT-STRATEGY.md](docs/DEPLOYMENT-STRATEGY.md) | Wann und wie deployen |
| [FILE-PROTECTION.md](docs/FILE-PROTECTION.md) | Defense in Depth – Dateischutz |
| [CHANGELOG-v3.md](CHANGELOG-v3.md) | Alle Änderungen v3.0 → v3.1 |

## Quick Install

```bash
# In dein Projekt-Verzeichnis wechseln
cd /path/to/your/project

# Framework installieren
curl -sSL https://raw.githubusercontent.com/michaeltobehn/SM-Claude-Agents-Framework/main/scripts/install.sh | bash

# ODER manuell
git clone https://github.com/michaeltobehn/SM-Claude-Agents-Framework.git /tmp/caf
/tmp/caf/scripts/install.sh
```

## Manuelle Installation

1. **Kopiere den `.claude/` Ordner** in dein Projekt
2. **Kopiere `docs/CONTINUITY.md`** Template
3. **Passe `CLAUDE.md`** an (oder erstelle neu mit Template)

```bash
cp -r SM-Claude-Agents-Framework/.claude/ your-project/
cp SM-Claude-Agents-Framework/templates/CONTINUITY.md your-project/docs/
cp SM-Claude-Agents-Framework/templates/CLAUDE.md your-project/
```

## Enthaltene Dateien

```
your-project/
├── .claude/
│   ├── commands/
│   │   ├── product.md      # /product Command
│   │   ├── planner.md      # /planner Command
│   │   ├── architect.md    # /architect Command
│   │   ├── ux.md           # /ux Command
│   │   ├── database.md     # /database Command
│   │   ├── builder.md      # /builder Command
│   │   ├── tester.md       # /tester Command
│   │   ├── reviewer.md     # /reviewer Command
│   │   └── status.md       # /status Command
│   ├── hooks/
│   │   └── protect-files.sh # File Protection Hook (PreToolUse)
│   └── settings.json       # Permissions (deny/ask/allow) + Hook-Registrierung
├── docs/
│   ├── CONTINUITY.md       # Ledger für Session-State
│   └── backlog/            # User Stories
│       ├── README.md       # Sprint-Übersicht
│       └── _template.md    # Story-Template
├── templates/
│   └── testing/            # Playwright E2E Templates
│       ├── playwright.config.ts
│       ├── auth.spec.ts
│       ├── _example.spec.ts
│       ├── global-setup.ts
│       ├── global-teardown.ts
│       └── .env.test.example
└── CLAUDE.md               # Projekt-Anweisungen (ANPASSEN!)
```

## Workflow

```
/product → /planner → /architect → /ux → /database → /builder → /tester → /reviewer
    ↑                                                                          
    └── "Ich hab eine Idee..."              /status → Jederzeit: Wo stehen wir?
```

1. **PRODUCT** – Idee besprechen, challengen, entscheiden (Build/Park/Kill)
2. **PLANNER** – User Stories und Acceptance Criteria definieren
3. **ARCHITECT** – Technisches Design und Datenmodell
4. **UX** – UI-Spezifikation und Accessibility
5. **DATABASE** – Migrations und RLS Policies
6. **BUILDER** – Code implementieren (mit Spec-Pflicht)
7. **TESTER** – Gegen ACs verifizieren
8. **REVIEWER** – Security-Audit, letzter Check vor Production

### Schnelle Aufgaben

Nicht alles braucht den vollen Workflow:

- **Bug Fix:** `/builder` direkt
- **Kleine UI-Änderung:** `/builder` direkt
- **DB-Migration:** `/database` direkt
- **Idee diskutieren:** `/product` direkt
- **Wo stehen wir?:** `/status` direkt

## Kernkonzepte

### Automatisches Kontext-Loading

Jeder Agent liest beim Start automatisch:
1. **CLAUDE.md** – Projekt-Regeln, Tech Stack, Security
2. **CONTINUITY.md** – Aktueller Projektstand
3. **docs/backlog/** – Relevante Specs und User Stories

### Strikte Rollentrennung

```
PRODUCT denkt nach       → PLANNER formalisiert
PLANNER schreibt Stories → ARCHITECT entwirft
BUILDER schreibt Code    → TESTER schreibt Tests
TESTER findet Bugs       → BUILDER fixt
REVIEWER findet Issues   → BUILDER fixt
```

Agents übernehmen **NIEMALS** Aufgaben anderer Agents!

### Handoff-Protokoll

Nach Abschluss **MUSS** jeder Agent:
1. CONTINUITY.md aktualisieren
2. Nächsten Agent mit **konkretem Prompt** empfehlen

### Builder-Guardrails

Der Builder hat spezielle Schutzmaßnahmen:
- **Spec-Pflicht:** Neues Feature ohne Spec → Fragt nach
- **Datei-Limit:** Mehr als 3 Dateien → Beschreibt erst den Plan
- **Dependency-Schutz:** Keine neuen Dependencies ohne Freigabe
- **Idiomatic-Pflicht:** Immer der kanonische Weg der Technologie

### File Protection (Defense in Depth)

Framework-Dateien sind vor Agent-Zugriff geschützt – 3 Schichten:

| Schicht | Mechanismus | Zuverlässigkeit |
|---------|------------|-----------------|
| 1. Hook | `PreToolUse` Shell-Script | Deterministisch |
| 2. CLAUDE.md | Prompt-Level Instruktionen | Soft |
| 3. settings.json | `deny` Rules | Zusätzliche Schicht |

Details: [FILE-PROTECTION.md](docs/FILE-PROTECTION.md)

### CONTINUITY.md

Zentraler Ledger für Session-State:
- Aktueller Status und Phase
- Aktiver Task mit AC-Tracking
- Letzte Agent-Ergebnisse
- Kontext für nächste Session

## Anpassung

### CLAUDE.md (PFLICHT)

Bearbeite `CLAUDE.md` für dein Projekt:
- Tech Stack und Infrastruktur
- Security-Regeln und Constraints
- Test-User und Test-Commands
- URLs und Domains
- Lessons Learned

### Agent-Prompts (optional)

Die Agents unter `.claude/commands/` sind generisch.
Projekt-spezifische Anpassungen gehören in `CLAUDE.md`, nicht in die Agents.

## Lizenz

MIT

---

BMAD Lite v3.1 | Stand: 13. Februar 2026

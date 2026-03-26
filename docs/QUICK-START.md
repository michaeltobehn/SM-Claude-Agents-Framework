# Quick Start Guide

## Installation

### Option 1: Automatisch (empfohlen)

```bash
# In dein Projekt-Verzeichnis wechseln
cd /path/to/your/project

# Framework installieren
curl -sSL https://raw.githubusercontent.com/michaeltobehn/SM-Claude-Agents-Framework/main/scripts/install.sh | bash
```

> **Wichtig:** Du musst dich im Projekt-Root befinden (dort wo `.git/`, `package.json` o.ä. liegt).

### Option 2: Manuell

```bash
# Repo klonen
git clone https://github.com/michaeltobehn/SM-Claude-Agents-Framework.git /tmp/caf

# Installer ausführen
/tmp/caf/scripts/install.sh

# Oder einzelne Dateien kopieren:
cp -r /tmp/caf/.claude/ your-project/
cp /tmp/caf/templates/CONTINUITY.md your-project/
cp /tmp/caf/templates/CLAUDE.md your-project/
```

## Nach der Installation

### 1. Setup starten

```
/setup [Deine Projekt-Beschreibung hier einfügen]
```

Der Setup-Agent konfiguriert CLAUDE.md und CONTINUITY.md für dein Projekt.

### 2. Status prüfen

```
/status
```

## Die 10 Agents

| Command | Wann verwenden |
|---------|---------------|
| `/setup` | Ersteinrichtung, Projekt konfigurieren |
| `/product` | Ideen bewerten, Strategie, Feature-Bewertung |
| `/planner` | User Stories planen, Acceptance Criteria definieren |
| `/architect` | Technisches Design, Datenmodell entwerfen |
| `/ux` | UI/UX Specs, Component Design, Accessibility |
| `/database` | Migrations erstellen, RLS Policies |
| `/builder` | Code schreiben, Features implementieren |
| `/tester` | E2E Tests ausführen, AC verifizieren |
| `/reviewer` | Security-Audit, Code-Review |
| `/status` | Aktuellen Fortschritt prüfen, nächster Schritt |

## Typischer Workflow

```
User: /product Ich möchte Feature X bauen
→ PRODUCT bewertet: Priorität, Aufwand, Strategie-Fit

User: /planner Implementiere Feature X
→ PLANNER erstellt Acceptance Criteria (Given-When-Then)

User: /architect
→ ARCHITECT entwirft Datenmodell + technisches Design

User: /ux
→ UX spezifiziert Components, States, Accessibility

User: /database
→ DATABASE erstellt Migrations + RLS Policies

User: /builder
→ BUILDER implementiert Code

User: /tester
→ TESTER verifiziert alle Acceptance Criteria

User: /reviewer
→ REVIEWER prüft Security + Code-Qualität
```

## Best Practices

### Acceptance Criteria

Immer im Given-When-Then Format:

```yaml
- id: "AC-001"
  given: "User ist auf Login-Seite"
  when: "User gibt gültige Credentials ein"
  then: "User wird eingeloggt und zu /dashboard redirected"
  verification: "e2e"
```

### Definition of Done

Jeder Agent hat seine DoD-Checkliste. Task ist erst fertig wenn ALLE Punkte ✅!

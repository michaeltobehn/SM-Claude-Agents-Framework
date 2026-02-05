# Quick Start Guide

## Installation

### Option 1: Script (empfohlen)

```bash
# In dein Projekt-Verzeichnis
cd /path/to/your/project

# Installer ausführen
/path/to/claude-agent-framework/scripts/install.sh .
```

### Option 2: Manuell

```bash
# Kopiere die Dateien
cp -r /path/to/claude-agent-framework/.claude/ your-project/
cp /path/to/claude-agent-framework/templates/CONTINUITY.md your-project/docs/
cp /path/to/claude-agent-framework/templates/CLAUDE.md your-project/
```

## Nach der Installation

### 1. CLAUDE.md anpassen

Öffne `CLAUDE.md` und ergänze:

```markdown
## Projekt: [DEIN-PROJEKT-NAME]

### URLs & Domains
| Service | URL |
|---------|-----|
| App | https://deine-app.com |

### Test-User
| Email | Passwort | Verwendung |
|-------|----------|------------|
| test@example.com | Test123! | E2E Tests |
```

### 2. CONTINUITY.md initialisieren

Ersetze `[PROJEKT-NAME]` und setze den initialen Status:

```markdown
# Mein Projekt - Continuity Ledger

## Aktueller Status

| Feld | Wert |
|------|------|
| **Phase** | Setup |
| **Aktiver Task** | Keiner |
```

### 3. Ersten Task starten

```
/planner Implementiere Feature X
```

## Die 7 Agents

| Command | Wann verwenden |
|---------|---------------|
| `/planner` | Neues Feature planen, Acceptance Criteria definieren |
| `/architect` | Technisches Design, Datenmodell entwerfen |
| `/database` | Migrations erstellen, RLS Policies |
| `/builder` | Code schreiben, Features implementieren |
| `/tester` | E2E Tests ausführen, AC verifizieren |
| `/reviewer` | Security-Audit, Code-Review |
| `/status` | Aktuellen Fortschritt prüfen |

## Typischer Workflow

```
User: /planner Implementiere User-Authentifizierung

→ PLANNER erstellt AC:
  - AC-001: Given nicht eingeloggt, When Login, Then Session aktiv
  - AC-002: Given eingeloggt, When Logout, Then Session gelöscht

User: /architect

→ ARCHITECT entwirft:
  - Datenmodell (users, sessions)
  - Auth-Flow Diagramm

User: /database

→ DATABASE erstellt:
  - Migration für users-Tabelle
  - RLS Policies

User: /builder

→ BUILDER implementiert:
  - Login/Logout API
  - Frontend-Komponenten

User: /tester

→ TESTER verifiziert:
  - AC-001: ✅ passed
  - AC-002: ✅ passed

User: /reviewer

→ REVIEWER prüft:
  - Security-Checkliste ✅
  - Approval: APPROVED
```

## Best Practices

### CONTINUITY.md pflegen

- **VOR** jedem Agent-Aufruf: Status checken
- **NACH** jedem Agent-Aufruf: Ergebnis dokumentieren
- Aktiven Task mit AC-Tracking führen

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

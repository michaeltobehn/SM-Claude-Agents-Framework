# Templates – BMAD Lite v3.3

Diese Templates werden bei der Installation in das Projekt-Root kopiert.
Der `/setup` Agent füllt sie dann projektspezifisch aus.

## Dateien

| Template | Ziel | Beschreibung |
|----------|------|-------------|
| `CLAUDE.md` | `./CLAUDE.md` | Generische Projekt-Konfiguration mit Platzhaltern. Wird vom `/setup` Agent mit Tech Stack, Conventions und Security Rules gefüllt. |
| `CONTINUITY.md` | `./CONTINUITY.md` | Projektstand-Tracking. Wird von jedem Agent gelesen UND aktualisiert. Festes Schema – nicht verändern. |
| `backlog/_template.md` | `./docs/backlog/_template.md` | Vorlage für User Stories. /planner kopiert dieses Template für jede neue Story. |
| `presets/` | – | Vorkonfigurierte CLAUDE.md Varianten für bekannte Projekt-Setups. |

## Setup-Workflow (empfohlen)

1. `install.sh` ausführen → Framework wird installiert
2. `/setup [Projekt-Spec]` in Claude Code → CLAUDE.md wird generiert
3. `/status` → Prüft ob alles korrekt eingerichtet ist

## Alternatives Setup

### Preset verwenden
1. Preset aus `presets/` nach `./CLAUDE.md` kopieren
2. Projektspezifische Werte anpassen (Name, Domains, etc.)

### Manuell
1. `templates/CLAUDE.md` als Basis nehmen
2. Alle `[PLATZHALTER]` manuell ersetzen

## Schema-Regeln CONTINUITY.md

Das Format ist FEST. Agents dürfen:
- Werte in bestehenden Feldern ändern
- Zeilen in Tabellen hinzufügen
- Abschnitte NICHT hinzufügen oder entfernen
- Überschriften NICHT umbenennen
- Struktur NICHT verändern

Dies stellt sicher, dass jeder Agent die gleiche Struktur vorfindet,
unabhängig davon welcher Agent zuletzt geschrieben hat.

# Templates – BMAD Lite v3.0

Diese Templates werden bei der Installation in das Projekt-Root kopiert.
Der User passt sie dann an sein Projekt an.

## Dateien

| Template | Ziel | Beschreibung |
|----------|------|-------------|
| `CLAUDE.md` | `./CLAUDE.md` | Projekt-Konfiguration – Tech Stack, Conventions, Security Rules. Wird von jedem Agent beim Start gelesen. **MUSS angepasst werden.** |
| `CONTINUITY.md` | `./CONTINUITY.md` | Projektstand-Tracking. Wird von jedem Agent gelesen UND aktualisiert. Festes Schema – nicht verändern. |
| `docs/backlog/_TEMPLATE.md` | `./docs/backlog/_TEMPLATE.md` | Vorlage für User Stories. /planner kopiert dieses Template für jede neue Story. |
| `install.sh` | – | Installations-Script mit Backup-Option und Merge-Logik. |

## Anpassung CLAUDE.md

Nach der Installation MUSS der User folgende Abschnitte anpassen:

1. **Projekt** – Name, Owner, Repo-URL
2. **Tech Stack** – Falls abweichend vom SUPERMATT-Default
3. **Monorepo-Struktur** – An tatsächliche Struktur anpassen
4. **Datenbank-Konventionen** – Tabellen-Prefixes, Naming
5. **Domains & Deployment** – Richtige URLs und Vercel-Projekte
6. **Environment Variables** – Projekt-spezifische Vars

## Schema-Regeln CONTINUITY.md

Das Format ist FEST. Agents dürfen:
- ✅ Werte in bestehenden Feldern ändern
- ✅ Zeilen in Tabellen hinzufügen
- ❌ Abschnitte hinzufügen oder entfernen
- ❌ Überschriften umbenennen
- ❌ Struktur verändern

Dies stellt sicher, dass jeder Agent die gleiche Struktur vorfindet,
unabhängig davon welcher Agent zuletzt geschrieben hat.

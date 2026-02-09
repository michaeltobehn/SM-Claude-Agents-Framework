# BMAD Lite v3.0 – Changelog

> Update-Datum: 2026-02-09

## Neuer Agent

### `/product` (NEU)
- Product Strategist / CPO-Rolle
- Sparringspartner für Ideen, Strategie, Feature-Bewertung
- Sitzt VOR dem Planner im Workflow
- Entscheidet OB gebaut wird, nicht WIE

## Neuer Workflow

```
/product → /planner → /architect → /ux → /database → /builder → /tester → /reviewer
    ↑                                                                          
    └── Idee, Problem, Frage                                                   

/status → Jederzeit: Wo stehen wir? Was kommt als nächstes?
```

## Änderungen an allen Agents (U-002 bis U-005)

### Kontext-Ladeblock
Jeder Agent liest jetzt beim Start:
1. CLAUDE.md (Projekt-Regeln, Tech Stack)
2. docs/CONTINUITY.md (aktueller Stand)
3. docs/backlog/ (relevante Specs)

### YAML-Outputs entfernt
Alle "Erwartetes Ergebnis"-YAML-Blöcke ersetzt durch natürlichsprachliche Anweisungen. Agents produzieren jetzt Ergebnisse statt Beschreibungen.

### Handoff-Protokoll integriert
Jeder Agent hat jetzt einen Handoff-Block mit:
- CONTINUITY.md aktualisieren
- Konkreten nächsten Agent-Aufruf empfehlen

### Hardcoded Werte entfernt
Keine Supabase-IDs, App-URLs oder Tech-Stack-Details mehr in Agent-Prompts. Alles referenziert CLAUDE.md.

## Agent-spezifische Änderungen

### `/planner` (U-007)
- Akzeptiert jetzt natürliche Sprache
- Übersetzt selbst in User Stories und ACs
- Bestätigt mit User bevor finalisiert wird
- Schreibt Ergebnis nach docs/backlog/

### `/builder` (U-006)
- Neue Guardrails:
  - Spec-Pflicht bei neuen Features (ohne Spec → User fragen)
  - Max 3 Dateien ändern ohne vorher zu fragen
  - Keine neuen Dependencies ohne Freigabe
  - Keine Config-Änderungen ohne Freigabe

### `/status` (U-008)
- Umgebaut zum Projekt-Navigator
- Gibt konkrete Agent-Aufrufe mit Prompt vor
- Unterstützt Spezial-Modi: "next", "blocker", "summary"

### `/tester` (U-009)
- Liest jetzt explizit ACs aus docs/backlog/
- Liest Testing Notes vom Builder
- AC-Verifikation mit ✅/❌ pro Criteria

## Installation

```bash
# Alle Dateien in .claude/commands/ ersetzen
cp -r .claude/commands/ /path/to/your-project/.claude/commands/
```

## Offene Updates (Prio 3)

- U-010: /devops Agent (optional)
- U-011: /debug Agent (optional)
- U-012: README Install-URL fixen
- U-013: CONTINUITY.md Template aktualisieren

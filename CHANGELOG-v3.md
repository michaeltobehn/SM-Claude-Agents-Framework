# BMAD Lite – Changelog

---

## v3.2 (2026-02-13)

### Unit-Test-Strategie + API-Test-Templates
- **NEU:** Vitest-Konfiguration (`templates/testing/vitest.config.ts`) – jsdom, React plugin, tsconfigPaths, coverage v8
- **NEU:** Testing Library Setup (`templates/testing/setup.ts`) – jest-dom Matchers, Cleanup
- **NEU:** 7 Unit-Test-Templates in `templates/testing/unit/`:
  - `_example.test.ts` – Generische Vorlage
  - `zustand-store.test.ts` – Zustand Store Pattern (getState/setState, Actions, Computed)
  - `zod-schema.test.ts` – Zod Validation Pattern (parse, safeParse, Fehlermeldungen)
  - `server-action.test.ts` – Next.js Server Action Unit Pattern (gemockter Supabase)
  - `drizzle-query.test.ts` – Drizzle ORM Query Pattern (gemockte DB)
  - `util-function.test.ts` – Pure Utility Functions (Formatter, Parser, Helpers)
  - `react-component.test.tsx` – React Testing Library (Rendering, Interaktion, States)
- **NEU:** 5 API-Test-Templates in `templates/testing/api/`:
  - `_example.api.test.ts` – Generische API-Vorlage
  - `api-route.test.ts` – Next.js Route Handler (GET/POST/PATCH/DELETE)
  - `rls-policy.test.ts` – Supabase RLS Policy Integration (echte Instanz, ANON KEY)
  - `server-action.api.test.ts` – Server Action Integration (voller Flow)
  - `middleware.test.ts` – Next.js Middleware (Auth-Redirect, CORS)

### Agent-Erweiterungen
- **Tester:** Erweitert auf E2E, Unit & API Tests (111 → 203 Zeilen)
  - Scope-Entscheidung statt reinem Deployment-Check
  - Neue Sections: "Unit Tests: Vitest" und "API Tests: Vitest"
  - Template-Referenzen, Mocking-Prinzip, RLS-Test-Pflicht
  - Erweiterte DoD mit Scope, Vitest run, Coverage, RLS
- **Reviewer:** Erweiterte Workaround-Erkennung und Test-Integrität (93 → 105 Zeilen)
  - +querySelector statt getByRole → Changes Required
  - +Unmocked Supabase in Unit Tests → Blocked
  - +Service Role Key in RLS-Tests → Blocked
  - +Namenskonvention (.test.ts vs .spec.ts) prüfen
  - +Unit/API Tests für ACs mit entsprechender Verification vorhanden?

### Framework-Konfiguration
- **settings.json:** +deny `Edit(vitest.config.ts)`, +allow `Bash(pnpm vitest:*)` und `Bash(npx vitest:*)`
- **protect-files.sh:** +`vitest.config.ts` in PROTECTED_PATTERNS
- **CLAUDE.md Template:** v1.1 → v1.2
  - +Tech Stack: Vitest + React Testing Library
  - +Canonical Patterns: Vitest statt Jest, getByRole statt querySelector
  - +Nicht verwenden: Jest
  - +Tester-Regeln: Namenskonvention, Mocking, Service Role Key, querySelector
  - +File Protection: vitest.config.ts

### Templates & Docs
- **Backlog Template:** Verification-Typ +`api`, Test Results mit Verification-Spalte, +Coverage Block
- **.env.test.example:** Supabase-Vars prominenter für RLS-Tests, Service Role Key Warnung

### Install Script
- Version v3.1 → v3.2
- Installiert jetzt Unit-Templates (7 Dateien) und API-Templates (5 Dateien)
- Installiert vitest.config.ts und setup.ts
- Erweiterte Zusammenfassung mit allen Test-Template-Kategorien

---

## v3.1 (2026-02-13)

### File Protection (Defense in Depth)
- **NEU:** `protect-files.sh` PreToolUse Hook unter `.claude/hooks/`
- **NEU:** `settings.json` mit deny/ask/allow Permissions + Hook-Registrierung
- **NEU:** `docs/FILE-PROTECTION.md` – Dokumentation des 3-Schichten-Schutzsystems
- **NEU:** File Protection Zones Section in CLAUDE.md Template

### Idiomatic over Expedient (Code-Qualitätsprinzip)
- **Builder:** Neue Guardrail "Idiomatic-Pflicht" – immer kanonischer Weg der Technologie
- **Reviewer:** Neue Checkliste "Workaround-Erkennung" – nicht-idiomatische Patterns sind Approval-Kriterium
- **CLAUDE.md:** Neue Section "Code-Qualitätsprinzip" mit Entscheidungsbaum

### Testing Templates (Playwright E2E)
- **NEU:** `templates/testing/` mit vorkonfiguriertem Playwright Setup:
  - `playwright.config.ts` – Auth-State-Reuse, headed mode, Reporter
  - `auth.spec.ts` – Supabase Auth Testmuster
  - `_example.spec.ts` – Vorlage für neue Tests
  - `global-setup.ts` / `global-teardown.ts` – Auth-State Management
  - `.env.test.example` – Test-Umgebungsvariablen

### Install Script
- Installiert jetzt Hooks (`chmod +x`) und Testing Templates
- Zeigt detaillierte Zusammenfassung aller installierten Komponenten
- Version-Bump auf v3.1

### Sonstige Änderungen
- CLAUDE.md Template: Reviewer-Regeln hinzugefügt
- README.md: Aktualisiert für neue Dateien und File Protection Section

---

## v3.0 (2026-02-09)

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
- ~~U-012: README Install-URL fixen~~ (erledigt in v3.1)
- U-013: CONTINUITY.md Template aktualisieren

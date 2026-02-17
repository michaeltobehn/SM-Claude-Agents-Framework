# CLAUDE.md – [PROJEKTNAME]

> Dieses File wird von JEDEM Agent beim Start gelesen.
> Es definiert Projekt-Regeln, Tech Stack und Security-Constraints.
> NICHT manuell editieren während ein Agent läuft\!
>
> **Generiert von:** `/setup` Agent | **Template:** BMAD Lite v3.3

---

## Projekt

| Key | Value |
|-----|-------|
| **Name** | [PROJEKTNAME] |
| **Owner** | [NAME (email)] |
| **Repo** | [REPO-NAME] |
| **Typ** | [Monorepo / Single-App / Library] |

---

## Tech Stack (verbindlich)

> Dieser Abschnitt wird vom `/setup` Agent basierend auf der Projekt-Spec generiert.

| Layer | Technologie | Version |
|-------|-------------|---------|
| Framework | [z.B. Next.js, Nuxt, SvelteKit, Express] | [Version] |
| Language | [z.B. TypeScript (strict), Python] | [Version] |
| Auth | [z.B. Supabase Auth, NextAuth, Clerk] | – |
| Database | [z.B. PostgreSQL, MongoDB, SQLite] | – |
| ORM | [z.B. Drizzle, Prisma, TypeORM] | – |
| Styling | [z.B. TailwindCSS, styled-components] | – |
| Testing (Unit) | [z.B. Vitest, Jest, pytest] | – |
| Testing (E2E) | [z.B. Playwright, Cypress] | – |
| Package Manager | [npm / pnpm / yarn / bun] | – |
| Hosting | [z.B. Vercel, AWS, Docker] | – |

### Nicht verwenden (explizit verboten)

> Technologien die bewusst ausgeschlossen werden (mit Begründung).

- ❌ [Technologie] ([Grund – z.B. "wir nutzen X stattdessen"])

---

## Projekt-Struktur

> Anpassen an die tatsächliche Verzeichnisstruktur des Projekts.

```
[projektname]/
├── src/                   # Quellcode
├── tests/                 # Tests
├── docs/
│   ├── backlog/           # User Stories & Specs (Planner Output)
│   ├── architecture/      # ADRs & Technical Designs
│   └── decisions/         # Kill/Park Entscheidungen
├── CLAUDE.md              # ← Du bist hier
└── CONTINUITY.md          # Aktueller Projektstand
```

---

## Datenbank-Konventionen

> Entfernen wenn das Projekt keine Datenbank hat.

### Naming
- [z.B. Snake_case für Tabellen und Spalten]
- [z.B. UUID als Primary Keys]
- [z.B. `created_at`, `updated_at` in jeder Tabelle]

### Security
- [z.B. RLS Policies, Prepared Statements, etc.]

---

## Code-Standards

### Allgemein
- Explizite Types – kein `any`
- Kleine Funktionen/Komponenten – max 150 Zeilen
- Keine Magic Numbers/Strings – Konstanten verwenden

### Commits
- Format: Conventional Commits (Englisch)
- `feat(scope): add feature description`
- `fix(scope): resolve bug description`
- `docs: update documentation`
- Keine Mega-Commits

### Code-Qualitätsprinzip: Idiomatic over Expedient

Jede Implementierung folgt dem idiomatischen Weg der verwendeten Technologie:

- **Canonical Patterns:** Nutze die dokumentierten Patterns der gewählten Libraries/Frameworks.
- **Keine impliziten Shortcuts:** Wenn eine Lösung vom dokumentierten Weg abweicht, ist das ein Signal, nicht eine Lösung. Eskalation an `/architect`.
- **Intentional Simplicity:** Einfachheit ist erwünscht – aber nur wenn sie bewusst gewählt wird (YAGNI/KISS), nicht weil die richtige Lösung zu aufwändig erscheint.
- **No Broken Windows:** Kein "erstmal so, später besser." Wenn die richtige Lösung jetzt nicht machbar ist, wird das als Blocker dokumentiert – nicht als Workaround implementiert.

**Entscheidungsregel für alle Agents:**
```
Ist die Lösung der dokumentierte/idiomatische Weg?
  → JA: Implementieren
  → NEIN: Warum nicht?
    → Constraint (Zeit, Tooling, Dependency): Eskalation an /architect
    → Overengineering (YAGNI): Einfachere Lösung MIT Begründung
    → Unbekannt: Recherche, dann entscheiden
```

---

## Security-Constraints

### Absolut tabu
- ❌ Secrets in Code oder .env committen
- ❌ SQL Queries ohne Parameter-Binding
- ❌ Produktionsdaten in Development verwenden
- ❌ `dangerouslySetInnerHTML` ohne Sanitization
- ❌ Neue Dependencies ohne explizite Freigabe durch User

### Projektspezifische Security-Regeln

> Vom `/setup` Agent basierend auf dem Tech Stack generiert.

---

## Design-System

> Entfernen wenn das Projekt kein UI hat.

### Projektspezifische Design-Regeln

> Vom `/setup` Agent oder `/ux` Agent definiert.

---

## Domains & Deployment

> Vom `/setup` Agent basierend auf der Projekt-Spec generiert.

| App/Service | Domain | Hosting |
|-------------|--------|---------|
| [App-Name] | [domain.tld] | [Vercel/AWS/etc.] |

### Environment Variables
```
# Projektspezifische Env-Vars hier eintragen
```

---

## Agent-Regeln

### Für ALLE Agents
1. Lies IMMER zuerst CLAUDE.md + CONTINUITY.md
2. Halte dich an den Tech Stack – keine Alternativen vorschlagen
3. Update CONTINUITY.md nach Abschluss deiner Arbeit
4. Empfehle den nächsten Agent mit konkretem Prompt

### Für /builder speziell
- Neues Feature ohne Spec in docs/backlog/ → STOP, frag nach
- Mehr als 3 neue Dateien → Beschreibe erst den Plan
- Neue Dependency → STOP, frag nach Freigabe
- Arbeite IMMER auf Feature Branch: `feature/US-[ID]-[kurzbeschreibung]`
- Idiomatische Patterns Pflicht (siehe Code-Qualitätsprinzip)

### Für /reviewer speziell
- Workaround-Erkennung als Approval-Kriterium
- Nicht-idiomatische Patterns → Changes Required oder Blocked

### Für /database speziell
- JEDE Migration hat ein Rollback-Script
- KEINE Änderungen an Produktionsdaten

### Für /tester speziell
- Max 2 Tester→Builder Loops, dann Eskalation an User
- Namenskonvention: `.test.ts` = Unit/API Tests, `.spec.ts` = E2E Tests – NIEMALS mischen
- Kein `any` in Test-Code

---

## File Protection Zones

Geschützte Dateien dürfen NUR vom User manuell geändert werden. Schutzmechanismus: PreToolUse Hook (`protect-files.sh`) + deny-Rules in settings.json + diese Instruktionen.

**Protected (nur User darf ändern):**
- `CLAUDE.md` – Projekt-Verfassung
- `.claude/commands/*`, `.claude/skills/*`, `.claude/agents/*` – Agent-Definitionen
- `.claude/settings.json`, `.claude/hooks/*` – Permissions & Hooks
- `.env`, `.env.local`, `.env.test`, `.env.production` – Secrets

Bei Änderungsbedarf → STOP, dem User beschreiben WAS und WARUM, User ändert selbst.

**Open (normaler Arbeitsbereich):**
- `src/**` – Builder Hauptarbeitsbereich
- `tests/**` – Tester Hauptarbeitsbereich
- `docs/**` – Alle Agents
- `migrations/**` – Database Agent

---

*CLAUDE.md v2.0 | BMAD Lite v3.3 | Generiert: [DATUM]*

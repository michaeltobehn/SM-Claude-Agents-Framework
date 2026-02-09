# CLAUDE.md – SUPERMATT App Suite

> Dieses File wird von JEDEM Agent beim Start gelesen.
> Es definiert Projekt-Regeln, Tech Stack und Security-Constraints.
> NICHT manuell editieren während ein Agent läuft!

---

## Projekt

| Key | Value |
|-----|-------|
| **Suite** | SUPERMATT App Suite |
| **Owner** | Michael Tobehn (mt@supermatt.agency) |
| **Repo** | `supermatt-app-suite` (Monorepo) |
| **Apps** | Auth, TRAX, Friday, Subz |

---

## Tech Stack (verbindlich)

| Layer | Technologie | Version |
|-------|-------------|---------|
| Framework | Next.js (App Router) | 14+ |
| Language | TypeScript (strict) | 5.x |
| Auth | Supabase Auth (PKCE Flow) | – |
| Database | Supabase PostgreSQL | – |
| ORM | Drizzle | – |
| Styling | TailwindCSS + shadcn/ui | – |
| State (Client) | Zustand | – |
| State (Server) | TanStack Query | – |
| Validation | Zod | – |
| Linting | Biome | – |
| Package Manager | pnpm | – |
| Monorepo | Turborepo | – |
| Hosting | Vercel | – |
| Email | Resend | – |

### Nicht verwenden (explizit verboten)
- ❌ GraphQL (Overkill)
- ❌ Prisma (wir nutzen Drizzle)
- ❌ styled-components / CSS Modules (wir nutzen Tailwind)
- ❌ Redux / MobX (wir nutzen Zustand)
- ❌ Express / Fastify (wir nutzen Next.js API Routes)

---

## Monorepo-Struktur

```
supermatt-app-suite/
├── apps/
│   ├── auth/              # SSO Portal – auth.supermatt.agency
│   ├── trax/              # Zeiterfassung – trax.supermatt.agency
│   ├── friday/            # Kunden-Portal – friday.supermatt.agency
│   └── subz/              # Abo-Management – subz.supermatt.agency
├── packages/
│   ├── ui/                # Shared shadcn/ui Components
│   ├── shared/            # Shared Types, Constants, Utils
│   ├── db/                # Shared Drizzle Schema, Migrations, Client
│   └── config/            # Shared ESLint, TS, Tailwind Configs
├── docs/
│   ├── backlog/           # User Stories & Specs (Planner Output)
│   ├── architecture/      # ADRs & Technical Designs
│   └── decisions/         # Kill/Park Entscheidungen
├── CLAUDE.md              # ← Du bist hier
├── CONTINUITY.md          # Aktueller Projektstand
└── turbo.json
```

---

## Datenbank-Konventionen

### Shared Schemas (packages/db)
Diese Tabellen sind App-übergreifend:
- `organizations` – Mandanten
- `users` – User-Profile (linked to Supabase Auth)
- `user_roles` – Rollen pro App pro Organization
- `subscriptions` – Abo-Status (Subz)

### App-spezifische Schemas
Jede App hat eigene Tabellen mit Prefix:
- TRAX: `trax_clients`, `trax_projects`, `trax_tasks`, `trax_time_entries`
- Friday: `friday_customers`, `friday_projects`, `friday_tasks`
- Subz: `subz_plans`, `subz_subscriptions`

### Naming
- Snake_case für Tabellen und Spalten
- UUID als Primary Keys (immer `id`)
- `organization_id` als Tenant-Identifier in JEDER Tabelle
- `created_at`, `updated_at` in jeder Tabelle
- Soft Delete via `archived` Boolean (kein `deleted_at`)

### RLS (Row Level Security)
- ✅ JEDE Tabelle hat RLS Policies
- ✅ IMMER `organization_id` als Filter
- ❌ NIEMALS Service Key im Client-Code
- ❌ NIEMALS RLS deaktivieren, auch nicht "kurz zum Testen"

---

## Code-Standards

### TypeScript
```typescript
// ✅ Explizite Types, keine any
interface TimeEntry {
  id: string;
  userId: string;
  taskId: string;
  duration: number;
  billable: boolean;
}

// ❌ VERBOTEN
const entry: any = { ... }
let data = response.json() // missing type
```

### Komponenten
```typescript
// ✅ Kleine Komponenten, explizite Props
interface TimerButtonProps {
  isRunning: boolean;
  onToggle: () => void;
}

export function TimerButton({ isRunning, onToggle }: TimerButtonProps) {
  return (
    <Button variant={isRunning ? "destructive" : "default"} onClick={onToggle}>
      {isRunning ? "Stop" : "Start"}
    </Button>
  );
}

// ❌ VERBOTEN: Komponenten > 150 Zeilen, implizite Props
```

### Imports
```typescript
// ✅ Explizite Imports aus packages
import { Button } from "@supermatt/ui/button";
import { type User } from "@supermatt/shared/types";
import { db } from "@supermatt/db";

// ❌ Relative Imports über App-Grenzen hinweg
import { Button } from "../../../packages/ui/button";
```

### Commits
- Format: Conventional Commits (Englisch)
- `feat(trax): add timer start/stop functionality`
- `fix(auth): resolve PKCE token refresh race condition`
- `docs: update CONTINUITY.md after Phase 1 completion`
- Keine Mega-Commits – max 3 Dateien pro Commit bei Features

---

## Security-Constraints

### Absolut tabu
- ❌ Secrets in Code oder .env.local committen
- ❌ Service Role Key im Client/Browser
- ❌ SQL Queries ohne Parameter-Binding
- ❌ Produktionsdaten in Development verwenden
- ❌ RLS Policies deaktivieren
- ❌ `dangerouslySetInnerHTML` ohne Sanitization
- ❌ Neue Dependencies ohne explizite Freigabe durch User

### Auth-Regeln
- Supabase Auth mit PKCE Flow (kein Implicit Flow)
- Session Refresh via Middleware
- Protected Routes: Server-seitig validieren, nicht nur Client-seitig
- Logout = Session invalidieren + Redirect + Page Reload

### API-Regeln
- Input Validation mit Zod auf JEDEM Endpoint
- Rate Limiting auf Auth-Endpoints
- CORS nur für eigene Domains (*.supermatt.agency)

---

## Design-System

### Farben
- Primary: Zinc-Palette (shadcn/ui default)
- Akzent: Schwarz/Weiß – minimalistisch
- Dark Mode als Standard, Light Mode optional

### Layout-Prinzipien
- Sidebar-Navigation (links, collapsible)
- Content-Area mit max-width
- Responsive: Mobile-first, aber Desktop-optimiert
- Editorial-inspiriert: Viel Whitespace, klare Typografie

### Komponenten-Hierarchie
1. shadcn/ui Basis-Komponenten (packages/ui)
2. App-spezifische Composite-Komponenten (apps/*/components)
3. Page-Level Layouts (apps/*/app/layout.tsx)

---

## Domains & Deployment

| App | Domain | Vercel Project |
|-----|--------|---------------|
| Auth | auth.supermatt.agency | sm-auth |
| TRAX | trax.supermatt.agency | sm-trax |
| Friday | friday.supermatt.agency | sm-friday |
| Subz | subz.supermatt.agency | sm-subz |

### Environment Variables (pro App)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # NUR Server-seitig!
NEXT_PUBLIC_APP_URL=
RESEND_API_KEY=                # NUR wo E-Mail nötig
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

### Für /database speziell
- JEDE Migration hat ein Rollback-Script
- KEINE Änderungen an Produktionsdaten
- RLS Policy für JEDE neue Tabelle – ohne Ausnahme

### Für /tester speziell
- Nach Logout IMMER Page Reload, dann prüfen ob Session wirklich weg
- Auth-Tests sind PFLICHT bei jeder Auth-Änderung
- Max 2 Tester→Builder Loops, dann Eskalation an User

---

## Notion-Integration

Notion ist die Single Source of Truth für Projektdokumentation.
Das Agent-Framework arbeitet mit lokalen Files (docs/, CONTINUITY.md).

**Sync-Verantwortung liegt beim User** – nicht bei den Agents.
Agents lesen/schreiben NICHT direkt in Notion.

Relevante Notion-Seiten (Referenz):
- SM-TRAX Spec: `2de1bad1d18a8138813fe30d77dd1aca`
- Friday/Client Platform: `2e21bad1d18a81209686e6c7974ef579`
- Agent-System Doku: `2fe1bad1d18a819593d4cd231c3a6a92`

---

*CLAUDE.md v1.0 | SUPERMATT App Suite | Stand: 2026-02-09*

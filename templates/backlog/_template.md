# US-[ID]: [Titel]

> Erstellt von: /planner | Datum: [YYYY-MM-DD]
> App: [AUTH / TRAX / FRIDAY / SUBZ]
> Priorität: [P0-Critical / P1-High / P2-Medium / P3-Low]

---

## User Story

**Als** [Rolle: Admin / Member / Kunde / System]
**möchte ich** [Funktion/Aktion],
**damit** [Nutzen/Geschäftswert].

---

## Acceptance Criteria

### AC-1: [Kurztitel]
- **Given:** [Ausgangszustand]
- **When:** [Aktion/Trigger]
- **Then:** [Erwartetes Ergebnis]
- **Verification:** [e2e / unit / api / manual]

### AC-2: [Kurztitel]
- **Given:** [Ausgangszustand]
- **When:** [Aktion/Trigger]
- **Then:** [Erwartetes Ergebnis]
- **Verification:** [e2e / unit / api / manual]

### AC-3: [Kurztitel]
- **Given:** [Ausgangszustand]
- **When:** [Aktion/Trigger]
- **Then:** [Erwartetes Ergebnis]
- **Verification:** [e2e / unit / api / manual]

---

## Scope

### In Scope
- [Was gehört dazu]

### Out of Scope
- [Was explizit NICHT dazugehört]

---

## Technical Notes (/architect)

> Wird von /architect ausgefüllt nach technischem Design.

**Betroffene Tabellen:**
- [Tabelle] – [Was ändert sich]

**API Endpoints:**
- `[METHOD] /api/[path]` – [Beschreibung]

**Komponenten:**
- `[ComponentName]` – [Beschreibung]

**Dependencies:**
- [Bestehende Abhängigkeiten oder neue Packages]

---

## UX Notes (/ux)

> Wird von /ux ausgefüllt nach UI-Spezifikation.

**User Flow:**
1. [Schritt 1]
2. [Schritt 2]
3. [Schritt 3]

**Component States:**
- Loading: [Beschreibung]
- Empty: [Beschreibung]
- Error: [Beschreibung]
- Success: [Beschreibung]

**Responsive:**
- Mobile: [Verhalten]
- Desktop: [Verhalten]

---

## Database Notes (/database)

> Wird von /database ausgefüllt nach Migration.

**Migration:**
- File: `drizzle/[NNNN]_[name].sql`
- Rollback: `drizzle/[NNNN]_[name]_rollback.sql`

**RLS Policies:**
- [Policy-Name] – [Beschreibung]

---

## Implementation Notes (/builder)

> Wird von /builder ausgefüllt nach Implementierung.

**Branch:** `feature/US-[ID]-[kurzbeschreibung]`

**Dateien erstellt/geändert:**
- `[path]` – [Was]

**Testing Notes für /tester:**
- [Worauf besonders achten]
- [Bekannte Edge Cases]
- [Setup-Schritte für manuellen Test]

---

## Test Results (/tester)

> Wird von /tester ausgefüllt nach Verifikation.

| AC | Verification | Status | Notes |
|----|-------------|--------|-------|
| AC-1 | e2e / unit / api / manual | ✅ / ❌ | [Details] |
| AC-2 | e2e / unit / api / manual | ✅ / ❌ | [Details] |
| AC-3 | e2e / unit / api / manual | ✅ / ❌ | [Details] |

**Auth-Tests (Pflicht bei Auth-Änderungen):**
- [ ] Login funktioniert
- [ ] Logout invalidiert Session (nach Reload geprüft!)
- [ ] Protected Route blockt unauthentifizierte User
- [ ] RLS Policy greift korrekt

**Unit/API Test Coverage (falls applicable):**
```
pnpm vitest run --coverage
Statements: [X]% | Branches: [X]% | Functions: [X]% | Lines: [X]%
```

**Ergebnis:** ✅ Alle ACs bestanden / ❌ Rückgabe an /builder (Loop #[N])

---

## Review (/reviewer)

> Wird von /reviewer ausgefüllt als letzter Check.

**Security-Checkliste:**
- [ ] Keine Secrets im Code
- [ ] Input Validation auf allen Endpoints
- [ ] RLS Policies vorhanden und korrekt
- [ ] Keine `any` Types
- [ ] Keine ungenutzten Dependencies

**Approval:** ✅ Approved / ⚠️ Changes Required / 🚫 Blocked

**Findings:**
- [Finding 1]
- [Finding 2]

---

## Status-Tracking

| Agent | Status | Datum | Notes |
|-------|--------|-------|-------|
| /planner | ✅ | [YYYY-MM-DD] | Story definiert |
| /architect | ⏳ | – | – |
| /ux | ⏳ | – | – |
| /database | ⏳ | – | – |
| /builder | ⏳ | – | – |
| /tester | ⏳ | – | – |
| /reviewer | ⏳ | – | – |

---

*Backlog Template v1.1 | BMAD Lite v3.2*

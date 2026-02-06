# Deployment-Strategie

> Wann und wie deployen - Hybrid-Ansatz

---

## Entscheidungsbaum

```
┌─────────────────────────────────────────────────────────────────┐
│ ENTSCHEIDUNGSBAUM: Wann deployen?                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Änderung gemacht?                                              │
│       │                                                         │
│       ├── Frontend-only (Pages, Components, Styles)             │
│       │       └── ✅ SOFORT deployen                            │
│       │                                                         │
│       ├── API erweitern (bestehender Endpoint)                  │
│       │       └── ✅ SOFORT deployen                            │
│       │                                                         │
│       └── Neue API (+1 Serverless Function)                     │
│               │                                                 │
│               ├── Limit nicht erreicht?                         │
│               │       └── ✅ Deployen                           │
│               │                                                 │
│               └── Limit erreicht?                               │
│                       └── ⏸️ SAMMELN bis Limit gelöst           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Regeln

| Änderungstyp | Aktion | Grund |
|--------------|--------|-------|
| Frontend-only | ✅ Sofort deployen | Kein Limit-Impact |
| API erweitern | ✅ Sofort deployen | Kein neuer Endpoint |
| Neue API | ⏸️ Sammeln | Hosting-Limits prüfen |

---

## Hosting-Limits beachten

### Vercel Hobby Plan

```yaml
limit: 12 Serverless Functions
workarounds:
  - "APIs konsolidieren (?stats=true statt /stats)"
  - "Query-Parameter statt neue Endpoints"
  - "Vercel Pro Plan ($20/mo) für unbegrenzt"
```

### API-Konsolidierung Beispiel

```typescript
// VORHER: 4 separate Endpoints
// /api/admin/users
// /api/admin/users/pending
// /api/admin/users/stats
// /api/admin/users/[id]

// NACHHER: 1 konsolidierter Endpoint mit Query-Parametern
// /api/users?pending=true
// /api/users?stats=true
// /api/users?id=xxx
```

---

## Deployment-Verantwortung

| Wer | Wann | Was |
|-----|------|-----|
| BUILDER | Nach Implementierung | Prüft ob Deploy möglich (Limit) |
| ORCHESTRATOR | Nach Review | Entscheidet über Deploy-Zeitpunkt |
| User | Bei Blocker | Entscheidet über Hosting Upgrade |

---

## Deployment-Checkliste

### Vor dem Deploy

- [ ] TypeScript kompiliert ohne Fehler
- [ ] Lint grün
- [ ] Tests lokal grün
- [ ] Keine Secrets im Code
- [ ] Environment-Variablen gesetzt

### Bei DB-Änderungen

```bash
# Migration = Datei + Push + Verify (alle 3!)
supabase db push
supabase migration list --linked  # Local = Remote?
```

### Nach dem Deploy

- [ ] Production-URL erreichbar
- [ ] Kritische Flows manuell testen
- [ ] Logs auf Fehler prüfen

---

## Lessons Learned

### Migration = Datei + Push + Verify

**Problem:** Migrations werden lokal erstellt aber nie gepusht → Features fehlen in Production

**Regel:** Eine Migration gilt erst als DONE wenn:
1. Datei erstellt
2. `supabase db push` ausgeführt
3. `supabase migration list --linked` zeigt Sync

### Code != Deployed

**Problem:** BUILDER macht lokale Änderungen, vergisst commit/push → TESTER testet alte Version

**Regel:** Nach Implementierung IMMER:
1. `git add` relevante Dateien
2. `git commit` mit Co-Authored-By
3. `git push` zum Remote
4. Vercel Auto-Deploy abwarten
5. DANN erst an TESTER handoff

*Dokumentversion: 1.0 | Stand: Februar 2026*

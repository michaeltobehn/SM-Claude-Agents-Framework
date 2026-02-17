# Backlog

> Single Source of Truth für User Stories

---

## Sprint-Übersicht

### Aktiv: Phase X - [Name]

> **Ziel:** [Kurze Beschreibung]

| Story | Titel | Prio | Status | Agent | Effort | Depends On |
|-------|-------|------|--------|-------|--------|------------|
| [US-X.1](phase-X/US-X.1-title.md) | Titel | high | 📋 ready | /builder | 2h | - |
| [US-X.2](phase-X/US-X.2-title.md) | Titel | medium | ⏳ in_progress | /tester | 1h | US-X.1 |
| [US-X.3](phase-X/US-X.3-title.md) | Titel | low | ✅ done | - | 4h | - |

### Dependency Graph

```
US-X.1 ─────┐
            │
US-X.2 ────┼──► US-X.4 ──► US-X.5
            │
US-X.3 ─────┘
```

### Empfohlene Reihenfolge

1. **Parallel möglich:** US-X.1 + US-X.2 (keine Abhängigkeiten)
2. **Danach:** US-X.3 (wartet auf US-X.1)
3. **Zuletzt:** US-X.4 (höchstes Risiko)

### Risk Assessment

| Story | Risk Level | Mitigation |
|-------|------------|------------|
| US-X.1 | 🟢 LOW | Kein Breaking Change |
| US-X.2 | 🟡 MEDIUM | Rollback vorbereitet |
| US-X.3 | 🔴 HIGH | Backup mandatory |

---

## Status-Legende

| Status | Icon | Bedeutung |
|--------|------|-----------|
| `ready` | 📋 | Story spezifiziert, Agent kann starten |
| `in_progress` | ⏳ | Agent arbeitet aktiv |
| `review` | 🔍 | Wartet auf TESTER/REVIEWER |
| `done` | ✅ | Alle AC ✅, DoD ✅ |
| `blocked` | 🚫 | Wartet auf Dependency |
| `deferred` | ⏸️ | Verschoben (Blocker, Prio) |

---

## Archiv

- [Phase 0](archive/phase-0/) - Setup
- [Phase 1](archive/phase-1/) - Beschreibung

---

*Letzte Aktualisierung: YYYY-MM-DD*

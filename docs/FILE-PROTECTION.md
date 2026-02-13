# 🔴 File Protection – BMAD Lite v3.1

## Problem

Claude Code hat per Default Schreibzugriff auf alle Dateien im Projekt. Ohne Schutz kann ein Agent:
- `CLAUDE.md` "optimieren" und damit die Projekt-Verfassung ändern
- Agent-Definitionen in `.claude/commands/` modifizieren
- `.env` Dateien lesen oder überschreiben
- Test-Infrastruktur "verbessern" und damit das Setup brechen

## Lösung: Defense in Depth (3 Schichten)

| Schicht | Mechanismus | Zuverlässigkeit |
|---------|------------|-----------------|
| **1. Hook** | `PreToolUse` Shell-Script | ✅ Deterministisch |
| **2. CLAUDE.md** | Prompt-Level Instruktionen | ⚠️ Soft – Agent respektiert sie |
| **3. settings.json** | `deny` Rules | ❌ Buggy (bekannte Issues) |

Alle drei Schichten zusammen bieten maximalen Schutz.

## 2-Zonen-Modell

| Zone | Dateien | Schutz |
|------|---------|--------|
| 🔴 **Protected** | `CLAUDE.md`, `.claude/*`, `.env*`, Test-Infra Configs | Hook + CLAUDE.md + deny |
| 🟢 **Open** | `src/`, `tests/`, `docs/`, `migrations/` | Agent-Prompt Guardrails |

## Installation

### 1. Hook kopieren

```bash
mkdir -p .claude/hooks
cp templates/hooks/protect-files.sh .claude/hooks/
chmod +x .claude/hooks/protect-files.sh
```

### 2. settings.json mergen

Wenn `.claude/settings.json` bereits existiert, die `hooks` und `permissions.deny` Einträge manuell übernehmen.

Wenn nicht:

```bash
cp templates/settings.json .claude/settings.json
```

### 3. CLAUDE.md Section prüfen

Die "File Protection Zones" Section sollte bereits im CLAUDE.md Template enthalten sein. Falls nicht, den Block aus dem Template übernehmen.

### 4. Testen

```bash
# Claude Code starten und versuchen CLAUDE.md zu editieren:
# → Sollte "🔴 BLOCKED" Meldung zeigen
```

## Anpassen

### Protected Files erweitern

In `protect-files.sh` die `PROTECTED_PATTERNS` Liste erweitern:

```bash
PROTECTED_PATTERNS=(
  # ... bestehende Patterns ...
  
  # Projekt-spezifisch hinzufügen:
  "docker-compose.yml"
  "Dockerfile"
)
```

### Test-Infrastruktur freigeben

Wenn der `/tester` Agent `playwright.config.ts` ändern darf, die entsprechenden Einträge aus `PROTECTED_PATTERNS` entfernen.

## Bekannte Einschränkungen

- **settings.json deny-Rules** sind per Stand Februar 2026 nicht 100% zuverlässig (GitHub Issues #6699, #12918, #18837). Deshalb der Hook als primärer Schutzmechanismus.
- **allowed-tools im Skill-Frontmatter** wird ebenfalls nicht zuverlässig enforced (Issue #18837). CLAUDE.md Instruktionen sind aktuell zuverlässiger.
- **Bash-Umgehung**: Ein Agent könnte theoretisch `sed` oder `echo >` nutzen statt Edit/Write. Der Hook fängt nur Edit/Write/MultiEdit ab. Für paranoidere Setups: zusätzlichen Bash-Hook implementieren.

## Warum kein 4-Zonen-Modell?

Die "Controlled" Zone (package.json, tsconfig) klingt theoretisch elegant, ist aber praktisch schwer durchzusetzen – der Builder *muss* manchmal package.json ändern. Das ist besser über Prompt-Instruktionen gelöst ("frage vorher") als über harte Blocks.

---

*BMAD Lite v3.1 | Stand: 10. Februar 2026*

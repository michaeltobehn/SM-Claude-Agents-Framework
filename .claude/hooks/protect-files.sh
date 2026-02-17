#!/bin/bash
# =============================================================================
# BMAD Lite – File Protection Hook (PreToolUse)
# =============================================================================
# Blockiert Edit/Write auf geschützte Framework-Dateien.
# Exit 2 = Block (stderr wird an Claude zurückgefüttert)
# Exit 0 = Erlaubt
#
# Installation:
#   1. Datei nach .claude/hooks/protect-files.sh kopieren
#   2. chmod +x .claude/hooks/protect-files.sh
#   3. In .claude/settings.json registrieren (siehe unten)
#
# Registrierung in .claude/settings.json:
#   {
#     "hooks": {
#       "PreToolUse": [{
#         "matcher": "Edit|Write|MultiEdit",
#         "hooks": [{
#           "type": "command",
#           "command": ".claude/hooks/protect-files.sh"
#         }]
#       }]
#     }
#   }
#
# 🔧 ANPASSEN: Protected Files Liste an dein Projekt anpassen
# =============================================================================

# --- Protected Files (🔧 ANPASSEN) ---
# Framework-Dateien die nur der User manuell ändern darf.
# Patterns werden als Substring-Match gegen den Dateipfad geprüft.
PROTECTED_PATTERNS=(
  # Framework-Verfassung
  "CLAUDE.md"

  # Agent-Definitionen & Settings
  ".claude/commands/"
  ".claude/skills/"
  ".claude/agents/"
  ".claude/settings.json"
  ".claude/settings.local.json"
  ".claude/hooks/"

  # Secrets
  ".env"
  ".env.local"
  ".env.test"
  ".env.production"

  # Test-Infrastruktur (🔧 ANPASSEN: entfernen wenn Tester diese ändern darf)
  "playwright.config.ts"
  "vitest.config.ts"
  "global-setup.ts"
  "global-teardown.ts"
)

# --- Hook Logic (nicht ändern) ---

# Claude Code sendet Tool-Input als JSON via stdin
INPUT=$(cat)

# Dateipfad extrahieren (Edit/Write/MultiEdit haben unterschiedliche Felder)
FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    ti = data.get('tool_input', {})
    # Edit tool
    path = ti.get('file_path', '')
    # Write/Create tool
    if not path:
        path = ti.get('path', '')
    # MultiEdit: prüfe alle Dateien
    if not path and 'edits' in ti:
        paths = [e.get('file_path', '') for e in ti.get('edits', [])]
        path = '|||'.join(paths)
    print(path)
except:
    print('')
" 2>/dev/null)

# Kein Pfad gefunden → erlauben (kein File-Edit)
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# MultiEdit: mehrere Pfade prüfen
IFS='|||' read -ra PATHS <<< "$FILE_PATH"

for path in "${PATHS[@]}"; do
  for pattern in "${PROTECTED_PATTERNS[@]}"; do
    if [[ "$path" == *"$pattern"* ]]; then
      echo "🔴 BLOCKED: '$path' ist eine geschützte Framework-Datei." >&2
      echo "" >&2
      echo "Diese Datei darf nur vom User manuell geändert werden." >&2
      echo "Geschütztes Pattern: '$pattern'" >&2
      echo "" >&2
      echo "Wenn eine Änderung nötig ist:" >&2
      echo "  1. Beschreibe dem User WAS und WARUM geändert werden soll" >&2
      echo "  2. Schlage die konkrete Änderung vor" >&2
      echo "  3. Der User führt die Änderung selbst durch" >&2
      exit 2
    fi
  done
done

# Kein Match → erlauben
exit 0

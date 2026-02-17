#!/bin/bash
# BMAD Lite v3.2 – Install Script
# Installiert das Claude Code Agent Framework in ein bestehendes Projekt

set -e

REPO_URL="https://github.com/michaeltobehn/SM-Claude-Agents-Framework.git"
TMP_DIR="/tmp/sm-caf-$$"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Farben
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo "🤖 BMAD Lite v3.2 – Agent Framework Installer"
echo "================================================"
echo ""

# 1. Prüfe ob wir in einem Projekt-Root sind
if [ ! -f "package.json" ] && [ ! -f "turbo.json" ]; then
  echo -e "${YELLOW}⚠️  Kein package.json oder turbo.json gefunden.${NC}"
  read -p "Trotzdem fortfahren? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Abgebrochen."
    exit 1
  fi
fi

# 2. Prüfe ob .claude/ bereits existiert
if [ -d ".claude" ]; then
  echo -e "${YELLOW}⚠️  .claude/ Verzeichnis existiert bereits!${NC}"
  echo ""
  echo "Optionen:"
  echo "  [b] Backup erstellen (.claude.backup-TIMESTAMP) und überschreiben"
  echo "  [s] Überspringen (nur fehlende Templates installieren)"
  echo "  [a] Abbrechen"
  echo ""
  read -p "Wahl (b/s/a): " -n 1 -r
  echo
  case $REPLY in
    b|B)
      BACKUP=".claude.backup-$(date +%Y%m%d-%H%M%S)"
      cp -r .claude "$BACKUP"
      echo -e "${GREEN}✅ Backup erstellt: $BACKUP${NC}"
      INSTALL_AGENTS=true
      ;;
    s|S)
      echo "Agents werden übersprungen."
      INSTALL_AGENTS=false
      ;;
    *)
      echo "Abgebrochen."
      exit 0
      ;;
  esac
else
  INSTALL_AGENTS=true
fi

# 3. Clone Repo
echo ""
echo "📥 Lade Framework..."
git clone --quiet "$REPO_URL" "$TMP_DIR" 2>/dev/null || {
  echo -e "${RED}❌ Git Clone fehlgeschlagen. Prüfe die URL und deine Verbindung.${NC}"
  exit 1
}

# 4. Installiere Agents + Hooks
if [ "$INSTALL_AGENTS" = true ]; then
  cp -r "$TMP_DIR/.claude/" .
  echo -e "${GREEN}✅ .claude/ Agents installiert${NC}"

  # Hook ausführbar machen
  if [ -f ".claude/hooks/protect-files.sh" ]; then
    chmod +x .claude/hooks/protect-files.sh
    echo -e "${GREEN}✅ File Protection Hook aktiviert${NC}"
  fi
fi

# 5. Templates installieren (ohne Überschreiben)
install_template() {
  local src="$1"
  local dest="$2"
  local name="$3"

  if [ -f "$dest" ]; then
    echo -e "${YELLOW}⏭️  $name existiert bereits – übersprungen${NC}"
  else
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"
    echo -e "${GREEN}✅ $name installiert${NC}"
  fi
}

echo ""
echo "📋 Templates installieren..."

install_template "$TMP_DIR/templates/CLAUDE.md" "./CLAUDE.md" "CLAUDE.md"
install_template "$TMP_DIR/templates/CONTINUITY.md" "./CONTINUITY.md" "CONTINUITY.md"

# docs/backlog Template
mkdir -p docs/backlog
install_template "$TMP_DIR/templates/backlog/_template.md" "./docs/backlog/_template.md" "Backlog Template"

# docs Verzeichnisse
mkdir -p docs/architecture
mkdir -p docs/decisions
echo -e "${GREEN}✅ docs/ Verzeichnisse erstellt${NC}"

# 6. Testing Templates installieren
echo ""
echo "🧪 Testing Templates installieren..."

# E2E (Playwright)
mkdir -p templates/testing/e2e
for f in playwright.config.ts auth.spec.ts _example.spec.ts global-setup.ts global-teardown.ts .env.test.example; do
  install_template "$TMP_DIR/templates/testing/$f" "./templates/testing/$f" "Testing: $f"
done

# Vitest Konfiguration
install_template "$TMP_DIR/templates/testing/vitest.config.ts" "./templates/testing/vitest.config.ts" "Testing: vitest.config.ts"
install_template "$TMP_DIR/templates/testing/setup.ts" "./templates/testing/setup.ts" "Testing: setup.ts"

# Unit Test Templates (Vitest)
mkdir -p templates/testing/unit
for f in _example.test.ts zustand-store.test.ts zod-schema.test.ts server-action.test.ts drizzle-query.test.ts util-function.test.ts react-component.test.tsx; do
  install_template "$TMP_DIR/templates/testing/unit/$f" "./templates/testing/unit/$f" "Testing (Unit): $f"
done

# API Test Templates (Vitest)
mkdir -p templates/testing/api
for f in _example.api.test.ts api-route.test.ts rls-policy.test.ts server-action.api.test.ts middleware.test.ts; do
  install_template "$TMP_DIR/templates/testing/api/$f" "./templates/testing/api/$f" "Testing (API): $f"
done

# 7. Cleanup
rm -rf "$TMP_DIR"

# 8. Zusammenfassung
echo ""
echo "================================================"
echo -e "${GREEN}🎉 Installation abgeschlossen!${NC}"
echo ""
echo "Installiert:"
echo "  ✅ 9 Agents (.claude/commands/)"
echo "  ✅ File Protection Hook (.claude/hooks/)"
echo "  ✅ Settings mit deny/ask/allow (.claude/settings.json)"
echo "  ✅ Templates (CLAUDE.md, CONTINUITY.md, Backlog)"
echo "  ✅ Testing Templates (Playwright E2E)"
echo "  ✅ Testing Templates (Vitest Unit – 7 Templates)"
echo "  ✅ Testing Templates (Vitest API – 5 Templates)"
echo "  ✅ Vitest Konfiguration (vitest.config.ts + setup.ts)"
echo ""
echo "Nächste Schritte:"
echo "  1. CLAUDE.md anpassen (Tech Stack, Domains, Conventions)"
echo "  2. CONTINUITY.md initialisieren (aktuelle Phase eintragen)"
echo "  3. In Claude Code (VSCode): /status eingeben"
echo ""
echo "Agents verfügbar:"
echo "  /product /planner /architect /ux /database /builder /tester /reviewer /status"
echo ""
echo "Docs: https://github.com/michaeltobehn/SM-Claude-Agents-Framework"
echo "================================================"

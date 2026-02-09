#!/bin/bash
# BMAD Lite v3.0 – Install Script
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
echo "🤖 BMAD Lite v3.0 – Agent Framework Installer"
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

# 4. Installiere Agents
if [ "$INSTALL_AGENTS" = true ]; then
  cp -r "$TMP_DIR/.claude/" .
  echo -e "${GREEN}✅ .claude/ Agents installiert${NC}"
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
install_template "$TMP_DIR/templates/docs/backlog/_TEMPLATE.md" "./docs/backlog/_TEMPLATE.md" "Backlog Template"

# docs Verzeichnisse
mkdir -p docs/architecture
mkdir -p docs/decisions
echo -e "${GREEN}✅ docs/ Verzeichnisse erstellt${NC}"

# 6. Cleanup
rm -rf "$TMP_DIR"

# 7. Zusammenfassung
echo ""
echo "================================================"
echo -e "${GREEN}🎉 Installation abgeschlossen!${NC}"
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

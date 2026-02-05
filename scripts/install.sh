#!/bin/bash

# Claude Agent Framework - Installer
# Usage: ./install.sh [target-directory]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Determine script directory (where the framework is)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

# Target directory (current dir or provided argument)
TARGET_DIR="${1:-.}"
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║       Claude Agent Framework (BMAD Lite) Installer         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Framework: ${YELLOW}$SCRIPT_DIR${NC}"
echo -e "Target:    ${YELLOW}$TARGET_DIR${NC}"
echo ""

# Check if target is a git repo
if [ ! -d "$TARGET_DIR/.git" ]; then
    echo -e "${YELLOW}⚠️  Warning: Target is not a git repository${NC}"
fi

# Check if .claude already exists
if [ -d "$TARGET_DIR/.claude" ]; then
    echo -e "${YELLOW}⚠️  .claude/ directory already exists${NC}"
    read -p "Overwrite? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Aborted.${NC}"
        exit 1
    fi
fi

# Create directories
echo -e "${GREEN}Creating directories...${NC}"
mkdir -p "$TARGET_DIR/.claude/commands"
mkdir -p "$TARGET_DIR/docs"

# Copy .claude/commands
echo -e "${GREEN}Installing agent commands...${NC}"
cp -r "$SCRIPT_DIR/.claude/commands/"* "$TARGET_DIR/.claude/commands/"

# Copy settings.json if not exists
if [ ! -f "$TARGET_DIR/.claude/settings.json" ]; then
    cp "$SCRIPT_DIR/.claude/settings.json" "$TARGET_DIR/.claude/settings.json"
    echo -e "  ${GREEN}✓${NC} .claude/settings.json"
else
    echo -e "  ${YELLOW}⏭${NC} .claude/settings.json (exists, skipped)"
fi

# Copy CONTINUITY.md template if not exists
if [ ! -f "$TARGET_DIR/docs/CONTINUITY.md" ]; then
    cp "$SCRIPT_DIR/templates/CONTINUITY.md" "$TARGET_DIR/docs/CONTINUITY.md"
    echo -e "  ${GREEN}✓${NC} docs/CONTINUITY.md"
else
    echo -e "  ${YELLOW}⏭${NC} docs/CONTINUITY.md (exists, skipped)"
fi

# Copy CLAUDE.md template if not exists
if [ ! -f "$TARGET_DIR/CLAUDE.md" ]; then
    cp "$SCRIPT_DIR/templates/CLAUDE.md" "$TARGET_DIR/CLAUDE.md"
    echo -e "  ${GREEN}✓${NC} CLAUDE.md"
else
    echo -e "  ${YELLOW}⏭${NC} CLAUDE.md (exists, skipped)"
fi

# List installed commands
echo ""
echo -e "${GREEN}Installed agent commands:${NC}"
for cmd in "$TARGET_DIR/.claude/commands/"*.md; do
    name=$(basename "$cmd" .md)
    echo -e "  ${GREEN}✓${NC} /$name"
done

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    Installation complete!                   ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Next steps:"
echo -e "  1. Edit ${YELLOW}CLAUDE.md${NC} with your project-specific config"
echo -e "  2. Edit ${YELLOW}docs/CONTINUITY.md${NC} - replace [PROJEKT-NAME]"
echo -e "  3. Start with ${YELLOW}/status${NC} or ${YELLOW}/planner${NC}"
echo ""
echo -e "Workflow: ${YELLOW}/planner → /architect → /database → /builder → /tester → /reviewer${NC}"

import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * BMAD Lite – Unit Test Template
 * ================================
 * Kopiere diese Datei als Startpunkt für neue Unit-Test-Suites.
 *
 * Naming: src/[module]/__tests__/[name].test.ts
 *         ODER tests/unit/[name].test.ts
 *
 * Konvention:
 *   *.test.ts  → Vitest (Unit & API Tests)
 *   *.spec.ts  → Playwright (E2E Tests) – NICHT mischen!
 *
 * Struktur pro Test:
 *   1. Arrange – Setup, Mocks, Testdaten
 *   2. Act    – Funktion/Aktion ausführen
 *   3. Assert – Ergebnis prüfen
 *
 * Ausführen:
 *   pnpm vitest run tests/unit/_example.test.ts     → Einzeln
 *   pnpm vitest run tests/unit/                     → Alle Unit Tests
 *   pnpm vitest                                     → Watch Mode
 *
 * 🔧 ANPASSEN: Imports, Testdaten und Assertions an dein Modul anpassen
 */

// ═══════════════════════════════════════════════════════════════
// Module: [MODULE NAME]
// Backlog: docs/backlog/[story-id].md
// ═══════════════════════════════════════════════════════════════

// 🔧 ANPASSEN: Import des zu testenden Moduls
// import { myFunction } from '@/lib/my-module';

describe('[Modulname]', () => {
  // ─── Setup ───
  beforeEach(() => {
    vi.clearAllMocks();
    // 🔧 ANPASSEN: Mocks und Testdaten zurücksetzen
  });

  // ═══ HAPPY PATH ═══

  it('sollte [erwartetes Standard-Verhalten]', () => {
    // Arrange
    // const input = 'test-input';

    // Act
    // const result = myFunction(input);

    // Assert
    // expect(result).toBe('expected-output');
  });

  it('sollte [zweites Standard-Verhalten]', () => {
    // Arrange
    // const input = { key: 'value' };

    // Act
    // const result = myFunction(input);

    // Assert
    // expect(result).toEqual({ transformed: 'value' });
  });

  // ═══ EDGE CASES ═══

  it('sollte mit [Grenzfall] umgehen', () => {
    // Beispiel: Leerer Input
    // const result = myFunction('');
    // expect(result).toBe('');
  });

  it('sollte mit [Null/Undefined] umgehen', () => {
    // Beispiel: Null-Safety
    // const result = myFunction(null);
    // expect(result).toBeNull();
  });

  // ═══ ERROR CASES ═══

  it('sollte bei [Fehlerbedingung] werfen', () => {
    // Beispiel: Ungültiger Input
    // expect(() => myFunction('invalid')).toThrow('Expected error message');
  });

  it('sollte bei [zweiter Fehlerbedingung] werfen', () => {
    // Beispiel: Fehlende Pflichtfelder
    // expect(() => myFunction(undefined)).toThrow();
  });
});

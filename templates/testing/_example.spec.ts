import { test, expect } from '@playwright/test';

/**
 * BMAD Lite – Test Template
 * ==========================
 * Kopiere diese Datei als Startpunkt für neue Test-Suites.
 *
 * Naming: tests/[feature].spec.ts
 * Beispiele:
 *   tests/timer.spec.ts
 *   tests/projects.spec.ts
 *   tests/settings.spec.ts
 *
 * Struktur pro Test:
 *   1. Arrange – Setup, Navigation
 *   2. Act    – User-Aktion ausführen
 *   3. Assert – Ergebnis prüfen
 *
 * Selektor-Reihenfolge (bevorzugt → Fallback):
 *   1. getByRole()     → Semantisch, stabil
 *   2. getByLabel()    → Für Form-Elemente
 *   3. getByText()     → Sichtbarer Text
 *   4. getByTestId()   → data-testid Attribute
 *   5. locator()       → CSS/XPath (LETZTER Ausweg)
 *
 * Ausführen:
 *   npx playwright test tests/_example.spec.ts --headed
 */

// ═══════════════════════════════════════════════════════════════
// Feature: [FEATURE NAME]
// User Story: Als [Rolle] möchte ich [Funktion], damit [Nutzen]
// Backlog: docs/backlog/[story-id].md
// ═══════════════════════════════════════════════════════════════

test.describe('Feature: [Name]', () => {
  // ─── Setup für alle Tests dieser Suite ───
  test.beforeEach(async ({ page }) => {
    // Navigation zur Startseite des Features
    await page.goto('/feature-route');
    // Optional: Warten bis Seite geladen
    // await expect(page.getByRole('heading', { name: 'Feature' })).toBeVisible();
  });

  // ═══ HAPPY PATH ═══

  test('sollte [erwartetes Standard-Verhalten]', async ({ page }) => {
    // Arrange
    // (beforeEach hat uns bereits zur Seite navigiert)

    // Act
    await page.getByRole('button', { name: 'Aktion' }).click();

    // Assert
    await expect(page.getByText('Erfolgreich')).toBeVisible();
  });

  test('sollte [zweites Standard-Verhalten]', async ({ page }) => {
    // Arrange
    await page.getByLabel('Feld').fill('Wert');

    // Act
    await page.getByRole('button', { name: 'Speichern' }).click();

    // Assert
    await expect(page.getByText('Gespeichert')).toBeVisible();
  });

  // ═══ EDGE CASES ═══

  test('sollte mit [Grenzfall] umgehen', async ({ page }) => {
    // Beispiel: Leerer Zustand
    // await expect(page.getByText('Keine Einträge')).toBeVisible();
  });

  test('sollte mit [langem Input] umgehen', async ({ page }) => {
    // Beispiel: Sehr langer Text
    // const longText = 'A'.repeat(1000);
    // await page.getByLabel('Name').fill(longText);
    // await page.getByRole('button', { name: 'Speichern' }).click();
    // await expect(page.getByText(/Fehler|Maximal/i)).toBeVisible();
  });

  // ═══ ERROR CASES ═══

  test('sollte Fehler anzeigen wenn [Fehlerbedingung]', async ({ page }) => {
    // Beispiel: Server-Fehler simulieren
    // await page.route('**/api/feature', (route) =>
    //   route.fulfill({ status: 500, body: 'Internal Server Error' })
    // );
    // await page.getByRole('button', { name: 'Laden' }).click();
    // await expect(page.getByText(/Fehler|Error/i)).toBeVisible();
  });

  // ═══ ACCESSIBILITY ═══

  test('sollte per Keyboard bedienbar sein', async ({ page }) => {
    // Tab-Navigation
    // await page.keyboard.press('Tab');
    // await expect(page.getByRole('button', { name: 'Aktion' })).toBeFocused();
    // Enter zum Auslösen
    // await page.keyboard.press('Enter');
  });
});

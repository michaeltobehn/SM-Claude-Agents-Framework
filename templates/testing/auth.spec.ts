import { test, expect } from '@playwright/test';

/**
 * BMAD Lite – Auth E2E Tests (PFLICHT)
 * =====================================
 * Diese Tests sind für JEDES Projekt Pflicht das Supabase Auth nutzt.
 *
 * Voraussetzung:
 * - Auth-State via global-setup.ts (automatisch)
 * - .env.test mit TEST_USER_EMAIL, TEST_USER_PASSWORD
 *
 * Ausführen:
 *   npx playwright test tests/auth.spec.ts --headed    → Visuell
 *   npx playwright test tests/auth.spec.ts             → Headless
 *
 * 🔧 ANPASSEN: Selektoren und URLs an dein Projekt anpassen
 */

test.describe('Auth: Login & Session', () => {
  test('eingeloggter User sieht Dashboard', async ({ page }) => {
    // Auth-State wird automatisch geladen (storageState in config)
    await page.goto('/dashboard');

    // 🔧 ANPASSEN: Was sieht ein eingeloggter User?
    await expect(page).toHaveURL(/\/(dashboard|home|app)/);
    // Beispiel: Navigation oder User-Element sichtbar
    // await expect(page.getByTestId('user-menu')).toBeVisible();
  });

  test('Session überlebt Page Reload', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/(dashboard|home|app)/);

    // Seite neu laden
    await page.reload();

    // Immer noch eingeloggt
    await expect(page).toHaveURL(/\/(dashboard|home|app)/);
    // User sollte NICHT auf Login redirected werden
    await expect(page).not.toHaveURL(/\/login/);
  });
});

test.describe('Auth: Protected Routes', () => {
  test('nicht-eingeloggter User wird zu Login redirected', async ({ browser }) => {
    // Neuer Context OHNE Auth-State
    const context = await browser.newContext();
    const page = await context.newPage();

    // 🔧 ANPASSEN: Protected Route deines Projekts
    await page.goto('/dashboard');

    // Sollte zu Login redirecten
    await expect(page).toHaveURL(/\/login/);

    await context.close();
  });

  test('Login-Seite ist erreichbar', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/login');

    // 🔧 ANPASSEN: Was zeigt die Login-Seite?
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByRole('button', { name: /log\s*in|anmelden|sign\s*in/i })).toBeVisible();

    await context.close();
  });
});

test.describe('Auth: Logout', () => {
  test('Logout invalidiert Session', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/(dashboard|home|app)/);

    // 🔧 ANPASSEN: Logout-Flow deines Projekts
    // Option A: Logout-Button direkt sichtbar
    // await page.getByRole('button', { name: /logout|abmelden|sign out/i }).click();

    // Option B: User-Menu öffnen, dann Logout
    // await page.getByTestId('user-menu').click();
    // await page.getByRole('menuitem', { name: /logout|abmelden/i }).click();

    // ⚠️ WICHTIG: Nach Logout IMMER Seite neu laden um zu verifizieren!
    await page.reload();

    // Sollte NICHT mehr auf Dashboard sein
    // await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('Auth: Fehlerbehandlung', () => {
  test('ungültige Credentials zeigen Fehlermeldung', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/login');
    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: /log\s*in|anmelden|sign\s*in/i }).click();

    // 🔧 ANPASSEN: Fehlermeldung deines Projekts
    // await expect(page.getByText(/ungültig|invalid|fehler|error/i)).toBeVisible();

    // Sollte auf Login-Seite bleiben
    await expect(page).toHaveURL(/\/login/);

    await context.close();
  });

  test('leere Felder zeigen Validierung', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/login');
    await page.getByRole('button', { name: /log\s*in|anmelden|sign\s*in/i }).click();

    // Browser-native Validierung oder Custom-Validierung
    // 🔧 ANPASSEN: Validierungsverhalten prüfen
    await expect(page).toHaveURL(/\/login/);

    await context.close();
  });
});

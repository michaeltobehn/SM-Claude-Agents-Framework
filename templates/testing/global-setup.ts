import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * BMAD Lite – Global Auth Setup
 * ==============================
 * Loggt sich EINMAL ein und speichert den Auth-State.
 * Alle Tests nutzen diesen State → kein Login pro Test nötig.
 *
 * Voraussetzung: .env.test mit TEST_USER_EMAIL und TEST_USER_PASSWORD
 *
 * Anpassen:
 * - Login-Route (default: /login)
 * - Selektoren für Email/Password/Button
 * - Redirect-URL nach Login (default: /dashboard)
 */

const AUTH_FILE = path.join(__dirname, 'playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Auth-Verzeichnis erstellen falls nicht vorhanden
  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Env-Variablen prüfen
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      '❌ TEST_USER_EMAIL und TEST_USER_PASSWORD müssen in .env.test gesetzt sein.\n' +
        '   Erstelle .env.test mit:\n' +
        '   TEST_USER_EMAIL=test@example.com\n' +
        '   TEST_USER_PASSWORD=dein-test-passwort\n'
    );
  }

  // ═══ LOGIN FLOW ═══
  // 🔧 ANPASSEN: Route und Selektoren an dein Projekt anpassen

  await page.goto('/login');

  // Email eingeben
  await page.getByLabel('Email').fill(email);

  // Passwort eingeben
  await page.getByLabel('Password').fill(password);
  // Alternative Selektoren falls nötig:
  // await page.getByLabel('Passwort').fill(password);
  // await page.getByPlaceholder('Passwort eingeben').fill(password);

  // Login Button klicken
  await page.getByRole('button', { name: /log\s*in|anmelden|sign\s*in/i }).click();

  // Warten bis Login erfolgreich
  // 🔧 ANPASSEN: Redirect-URL nach erfolgreichem Login
  await expect(page).toHaveURL(/\/(dashboard|home|app)/, { timeout: 15_000 });

  // Auth-State speichern
  await page.context().storageState({ path: AUTH_FILE });

  console.log('✅ Auth-State gespeichert:', AUTH_FILE);
});

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// .env.test laden (falls vorhanden)
dotenv.config({ path: '.env.test' });

/**
 * BMAD Lite – Playwright Konfiguration
 * =====================================
 * Vorkonfiguriert für:
 * - Headed Mode (lokales Debugging)
 * - Auth State Reuse (schnellere Tests)
 * - Env-basierte Base URL
 *
 * Verwendung:
 *   npx playwright test                     → Headless (CI)
 *   npx playwright test --headed            → Headed (Debugging)
 *   npx playwright test --headed --ui       → UI Mode (interaktiv)
 *   npx playwright test tests/auth.spec.ts  → Einzelne Suite
 *
 * Env-Variablen (.env.test):
 *   BASE_URL=http://localhost:3000
 *   TEST_USER_EMAIL=test@example.com
 *   TEST_USER_PASSWORD=testpassword123
 */
export default defineConfig({
  // Test-Verzeichnis
  testDir: './tests',

  // Parallele Tests pro File deaktiviert (Auth-State-Konflikte vermeiden)
  fullyParallel: false,

  // CI: Keine Retries. Lokal: 1 Retry für Flaky-Erkennung
  retries: process.env.CI ? 0 : 1,

  // Anzahl paralleler Worker
  workers: process.env.CI ? 1 : 2,

  // Reporter
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Globale Einstellungen für alle Tests
  use: {
    // Base URL aus Environment oder localhost
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Trace bei Fehler aufzeichnen (für Debugging)
    trace: 'on-first-retry',

    // Screenshots bei Fehler
    screenshot: 'only-on-failure',

    // Video bei Fehler (hilfreich für visuelles Debugging)
    video: 'on-first-retry',

    // Timeouts
    actionTimeout: 10_000,
    navigationTimeout: 15_000,

    // Viewport
    viewport: { width: 1280, height: 720 },
  },

  // Projekte / Browser
  projects: [
    // Auth Setup – läuft VOR allen Tests
    {
      name: 'auth-setup',
      testMatch: /global-setup\.ts/,
      teardown: 'auth-cleanup',
    },
    {
      name: 'auth-cleanup',
      testMatch: /global-teardown\.ts/,
    },

    // Hauptprojekt: Chromium mit Auth-State
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['auth-setup'],
    },

    // Optional: Firefox (auskommentieren wenn benötigt)
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['auth-setup'],
    // },

    // Optional: Mobile Safari (auskommentieren wenn benötigt)
    // {
    //   name: 'mobile-safari',
    //   use: {
    //     ...devices['iPhone 13'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['auth-setup'],
    // },
  ],

  // Dev Server automatisch starten (nur lokal, nicht in CI)
  ...(process.env.CI
    ? {}
    : {
        webServer: {
          command: 'pnpm dev',
          url: 'http://localhost:3000',
          reuseExistingServer: true,
          timeout: 30_000,
        },
      }),
});

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * BMAD Lite – Vitest Konfiguration
 * ===================================
 * Vorkonfiguriert für:
 * - Next.js App Router (React Server Components)
 * - TypeScript Path Aliases (@/ Imports)
 * - React Testing Library
 * - Supabase Mocking
 *
 * Verwendung:
 *   pnpm vitest                       → Watch Mode (Entwicklung)
 *   pnpm vitest run                   → Einmaliger Lauf (CI)
 *   pnpm vitest run --coverage        → Mit Coverage-Report
 *   pnpm vitest run src/stores/       → Einzelnes Verzeichnis
 *   pnpm vitest run tests/api/        → Nur API-Tests
 *
 * Env-Variablen (.env.test):
 *   BASE_URL=http://localhost:3000
 *   TEST_USER_EMAIL=test@example.com
 *   TEST_USER_PASSWORD=changeme
 *   SUPABASE_URL=https://xxx.supabase.co        (für RLS-Tests)
 *   SUPABASE_ANON_KEY=eyJ...                     (für RLS-Tests)
 *
 * Namenskonvention:
 *   *.test.ts  → Vitest (Unit & API Tests)
 *   *.spec.ts  → Playwright (E2E Tests) – wird hier AUSGESCHLOSSEN
 */
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],

  test: {
    // Test-Umgebung: jsdom für React-Komponenten
    environment: 'jsdom',

    // Setup-Datei für Testing Library Matchers
    setupFiles: ['./tests/setup.ts'],

    // Test-Pattern: nur .test.ts/.test.tsx
    include: [
      'src/**/*.test.{ts,tsx}',
      'tests/unit/**/*.test.{ts,tsx}',
      'tests/api/**/*.test.{ts,tsx}',
    ],

    // E2E Tests explizit ausschließen (Playwright zuständig)
    exclude: [
      'tests/**/*.spec.ts',
      'node_modules',
      '.next',
    ],

    // Coverage-Konfiguration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      // 🔧 ANPASSEN: Coverage-Schwellen an Projekt-Reife anpassen
      thresholds: {
        statements: 60,
        branches: 60,
        functions: 60,
        lines: 60,
      },
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.*',
        '**/*.d.ts',
        '**/types/',
      ],
    },

    // Globale Test-Utilities (describe, it, expect ohne Import)
    globals: true,
  },
});

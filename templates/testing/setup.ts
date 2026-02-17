/**
 * BMAD Lite – Vitest Setup
 * =========================
 * Wird vor jedem Test-Run ausgeführt (setupFiles in vitest.config.ts).
 *
 * Stellt bereit:
 * - @testing-library/jest-dom Matchers (toBeInTheDocument, toHaveClass, etc.)
 * - Cleanup nach jedem Test (React Testing Library)
 *
 * 🔧 ANPASSEN: Weitere globale Mocks oder Setup hier einfügen
 */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// React Testing Library: DOM nach jedem Test aufräumen
afterEach(() => {
  cleanup();
});

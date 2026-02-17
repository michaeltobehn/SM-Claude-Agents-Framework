import { test as teardown } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * BMAD Lite – Global Auth Teardown
 * =================================
 * Räumt den gespeicherten Auth-State auf nach Testlauf.
 * Optional: Kann auch Test-Daten aufräumen.
 */

const AUTH_FILE = path.join(__dirname, 'playwright/.auth/user.json');

teardown('cleanup auth state', async () => {
  // Auth-State-Datei entfernen
  if (fs.existsSync(AUTH_FILE)) {
    fs.unlinkSync(AUTH_FILE);
    console.log('🧹 Auth-State aufgeräumt:', AUTH_FILE);
  }
});

import { describe, it, expect, beforeAll, afterAll } from 'vitest';

/**
 * BMAD Lite – API Test Template
 * ===============================
 * Kopiere diese Datei als Startpunkt für neue API-Test-Suites.
 *
 * Naming: tests/api/[feature].api.test.ts
 *         ODER tests/api/[feature].test.ts
 *
 * Konvention:
 *   *.test.ts  → Vitest (Unit & API Tests)
 *   *.spec.ts  → Playwright (E2E Tests) – NICHT mischen!
 *
 * Struktur pro Test:
 *   1. Arrange – Request vorbereiten, Auth-Token holen
 *   2. Act    – HTTP-Request ausführen
 *   3. Assert – Response Status, Body, Headers prüfen
 *
 * Ausführen:
 *   pnpm vitest run tests/api/_example.api.test.ts  → Einzeln
 *   pnpm vitest run tests/api/                      → Alle API Tests
 *
 * ⚠️ WICHTIG: API-Tests können gegen echte Endpunkte laufen.
 *    Env-Variablen in .env.test konfigurieren!
 *
 * 🔧 ANPASSEN: URLs, Auth und Assertions an deine API anpassen
 */

// ═══════════════════════════════════════════════════════════════
// API: [ENDPOINT / FEATURE NAME]
// Backlog: docs/backlog/[story-id].md
// ═══════════════════════════════════════════════════════════════

// 🔧 ANPASSEN: Base URL aus Environment
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

describe('API: [Feature Name]', () => {
  // ─── Auth Setup ───
  // let authToken: string;

  // beforeAll(async () => {
  //   🔧 ANPASSEN: Auth-Token für API-Requests holen
  //   const response = await fetch(`${BASE_URL}/api/auth/login`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       email: process.env.TEST_USER_EMAIL,
  //       password: process.env.TEST_USER_PASSWORD,
  //     }),
  //   });
  //   const data = await response.json();
  //   authToken = data.token;
  // });

  // ═══ GET ═══

  it('sollte Liste abrufen (GET /api/[resource])', async () => {
    // Arrange
    // const url = `${BASE_URL}/api/resource`;

    // Act
    // const response = await fetch(url, {
    //   headers: { Authorization: `Bearer ${authToken}` },
    // });
    // const data = await response.json();

    // Assert
    // expect(response.status).toBe(200);
    // expect(Array.isArray(data)).toBe(true);
  });

  it('sollte Einzelressource abrufen (GET /api/[resource]/:id)', async () => {
    // Arrange
    // const id = 'resource-123';

    // Act
    // const response = await fetch(`${BASE_URL}/api/resource/${id}`, {
    //   headers: { Authorization: `Bearer ${authToken}` },
    // });
    // const data = await response.json();

    // Assert
    // expect(response.status).toBe(200);
    // expect(data.id).toBe(id);
  });

  // ═══ POST ═══

  it('sollte Ressource erstellen (POST /api/[resource])', async () => {
    // Arrange
    // const payload = {
    //   name: 'Test-Ressource',
    //   description: 'Erstellt durch API-Test',
    // };

    // Act
    // const response = await fetch(`${BASE_URL}/api/resource`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${authToken}`,
    //   },
    //   body: JSON.stringify(payload),
    // });
    // const data = await response.json();

    // Assert
    // expect(response.status).toBe(201);
    // expect(data.name).toBe('Test-Ressource');
    // expect(data.id).toBeDefined();
  });

  // ═══ ERROR CASES ═══

  it('sollte 401 bei fehlendem Auth-Token zurückgeben', async () => {
    // Arrange & Act
    // const response = await fetch(`${BASE_URL}/api/resource`, {
    //   headers: {}, // Kein Auth-Header
    // });

    // Assert
    // expect(response.status).toBe(401);
  });

  it('sollte 400 bei ungültigem Payload zurückgeben', async () => {
    // Arrange
    // const invalidPayload = { name: '' }; // Pflichtfeld leer

    // Act
    // const response = await fetch(`${BASE_URL}/api/resource`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${authToken}`,
    //   },
    //   body: JSON.stringify(invalidPayload),
    // });

    // Assert
    // expect(response.status).toBe(400);
  });

  it('sollte 404 bei nicht existierender Ressource zurückgeben', async () => {
    // Arrange & Act
    // const response = await fetch(`${BASE_URL}/api/resource/non-existent-id`, {
    //   headers: { Authorization: `Bearer ${authToken}` },
    // });

    // Assert
    // expect(response.status).toBe(404);
  });
});

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/scenarios',
  outputDir: 'artifacts/media',
  timeout: 120000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  expect: {
    timeout: 30000
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'artifacts/report', open: 'never' }],
    ['junit', { outputFile: 'artifacts/junit/results.xml' }]
  ],
  use: {
    baseURL: 'https://www.americanas.com.br',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});

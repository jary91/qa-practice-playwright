import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  use: { headless: true },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
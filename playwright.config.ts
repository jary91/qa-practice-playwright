import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  use: { 
    headless: true,
    baseURL: process.env.BASE_URL,
},
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  projects: [
    {
      name: 'Order flow tests',
      testMatch: 'tests/order/**/*.spec.ts',
    },
    {
      name: 'Upload flow tests',
      testMatch: 'tests/upload/**/*.spec.ts',
    },
  ],
  }
);
import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  use: { 
    headless: true,
    baseURL: process.env.BASE_URL
},
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  projects: [
    {
      name: 'Setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'Order flow',
      testMatch: 'tests/order/**/*.spec.ts',
      dependencies: ['Setup'],
      use: {
        storageState: '.auth/login.json'
      }
    },
    {
      name: 'File upload',
      testMatch: 'tests/upload/**/*.spec.ts',
    }
  ],
  }
);
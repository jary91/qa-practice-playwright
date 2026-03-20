# E2E Tests – Shopping Cart (Playwright)

This project contains end-to-end tests for a sample e-commerce application using Playwright.

---

## Tech Stack

- **Framework:** Playwright
- **Language:** TypeScript
- **Node.js:** >= 16 recommended

---

## Prerequisites

Make sure you have installed:

- Node.js (v16 or higher)
- npm (comes with Node.js)

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <project-folder>
```
2. Install NPM:
```bash
npm install
```
3. Install Playwright:
```bash
npx playwright install
```
4. Create local .env file
```bash
cp .env-example .env
```
---
## Running Tests
Run all tests
```bash
npx playwright test
```

Run all tests in UI mode
```bash
npx playwright test --ui
```

Run specific test file
```bash
npx playwright test tests/example.spec.ts
```

## Project Structure

```bash
├── tests/
│
├── fixtures/
│
├── helpers/
│
├── page-objects/
├── playwright.config.ts
├── package.json
├── .env
```
# E2E Tests (Playwright): QA Practice testing app

This repository implements a focused Playwright + TypeScript end-to-end test suite for a demo app.
The goal is to verify order actions and file upload behavior through page-object abstractions and central fixtures.

---

## Tech Stack

- **Framework:** Playwright (@playwright/test)
- **Language:** TypeScript
- **Runtime:** Node.js 16+
- **Test architecture:** Page object model + fixtures + data-driven inputs

---

## Prerequisites

- Node.js 16 or higher
- npm (bundled with Node.js)
- URL and credentials in environmental variables (dotEnv)

---

## Setup

1. Clone repository:

```bash
git clone <repo-url>
cd qa-practice-playwright
```

2. Install dependencies:

```bash
npm ci
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Copy and populate environment file (base URL and user credentials):

```bash
cp .env-example .env
```

5. (Optional) build TypeScript check:

```bash
npm run test:tsc
```

---

## Configuration

- `playwright.config.ts` defines:
  - `testDir: 'tests'`
  - `use.baseURL` from `process.env.BASE_URL`
  - `headless: true` default
  - reporters: list + html (`playwright-report`)
  - projects: `Order flow tests` and `Upload flow tests`

- Environment variables used:
  - `BASE_URL`
  - `USERNAME`
  - `PASSWORD`

---

## package.json scripts

- `npm test` -> `npx playwright test`
- `npm run test:order` -> `npx playwright test --project="Order flow tests"`
- `npm run test:upload` -> `npx playwright test --project="Upload flow tests"`
- `npm run test:order:ui` -> `npx playwright test --project="Order flow tests" --ui`
- `npm run test:upload:ui` -> `npx playwright test --project="Upload flow tests" --ui`
- `npm run test:ui` -> `npx playwright test --ui`
- `npm run test:tsc` -> `npx tsc --noEmit`
- `npm run pretest` -> type-check before tests
- `npm run test:report` -> generate and open report (`playwright show-report`)

---

## Test suites

### Order flow

`tests/order/order-e2e.spec.ts`
- Uses custom fixtures from `page-objects/order-pages/fixtures.ts`
- Flow:
  - login
  - select first N products
  - verify cart total and items
  - checkout page fill shipping details (from `test-data/shipping-details.ts`)
  - submit order + assert confirmation
  - logout and login page validation

### Upload flow

`tests/upload/file-upload.spec.ts`
- Uses fixtures from `page-objects/upload-pages/fixtures.ts`
- Uploads multiple files (json/docx/jpg/pdf) via helper `helpers/get-upload-file.ts`
- Verifies upload validation and confirmation text

---

## Folder layout

- `page-objects/`
  - `order-pages/` - `login.page.ts`, `product.page.ts`, `cart.page.ts`, `shipping-details.page.ts`, fixtures extension
  - `upload-pages/` - `upload.page.ts`, fixtures extension
- `tests/` - actual test specs under `order/` and `upload/`
- `helpers/` - utility function(s) (`get-upload-file.ts`)
- `test-data/` - predefined payloads (`shipping-details.ts`, `files-to-upload/`)
- `playwright-report/` - generated HTML test report output

---

## How to run

Run all tests:

```bash
npm test
```

Order flow project only:

```bash
npm run test:order
```

Upload flow project only:

```bash
npm run test:upload
```

Open report after execution:

```bash
npm run test:report
```

---

## Notes for reviewer

- The project is structured around explicit fixture extension in page-object dirs (`test.extend`), which keeps test file dependencies clear and shared setup localized.
- The order test currently assumes quantity `1` per added product and uses deterministic first-N product selection; this is a known improvement area.
- Upload test uses central helper for file metadata and regex checks with explicit expected file names.
- Existing patterns align with maintainable POM without introducing external frameworks besides Playwright.

# Playwright Test Automation

This repository contains a Playwright + TypeScript test automation setup for UI and API verification.

## Project structure

- `tests/UI` — UI test suites and page-object-based helpers.
- `tests/API` — API test suites and endpoint/request helpers.
- `tests/UI/demoQA` — UI test suites and page-object-based helpers for DemoQA UI.
- `tests/API/demoQA` — API test suites and endpoint/request helpers for DemoQA API.
- `playwright.config.ts` — Playwright configuration, projects, reporters, and shared test settings.
- `Dockerfile` — container image used to run the test suite in a consistent environment.
- `.github/workflows/deploy-vps.yml` — GitHub Actions workflow for running selected suites and publishing the Playwright report.

## CI/CD

The project uses GitHub Actions with a manual workflow dispatch.

The workflow:

- builds a Docker image from the repository,
- runs the selected Playwright suite inside the container,
- publishes the generated HTML report to GitHub Pages.

## Run examples

Install dependencies:

```bash
npm install
npx playwright install --with-deps
```

Run the full suite:

```bash
npm run test
```

Run selected suites:

```bash
npm run test:ui:desktop
npm run test:ui:mobile
npm run test:ui:all
npm run test:api
npm run test:ui:demo
npm run test:api:demo
npm run test:all:demo
```

Open the HTML report:

```bash
npm run test:report
```


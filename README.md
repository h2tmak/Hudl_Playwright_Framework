# Hudl Playwright Framework

Production-oriented Playwright and TypeScript tests for Hudl's login and password-reset flows. The framework uses Page Object Model, isolated browser contexts, cross-browser projects, and environment-based credentials.

## Repository

GitHub: [h2tmak/Hudl_Playwright_Framework](https://github.com/h2tmak/Hudl_Playwright_Framework)

Clone the repository and enter its folder:

```shell
git clone https://github.com/h2tmak/Hudl_Playwright_Framework.git
cd Hudl_Playwright_Framework
```

## Prerequisites

- Node.js 24 or later
- npm

## Installation

```shell
npm ci
npx playwright install
```

## Configuration

Copy `.env.example` to `.env` and set credentials for the authenticated tests:

```dotenv
HUDL_EMAIL=your-email
HUDL_PASSWORD=your-password
BASE_URL=https://www.hudl.com
```

Never commit `.env` or put credentials in test code. Tests that require account credentials are skipped when the two credential variables are absent; non-authenticated validation tests still run. Use a dedicated test account and store CI credentials as GitHub Actions secrets named `HUDL_EMAIL` and `HUDL_PASSWORD`.

`BASE_URL` defaults to `https://www.hudl.com`; it can point at an approved test environment.

## Running tests

```shell
npm test
npm run test:headed
npm run test:ui
npx playwright test tests/login/login.spec.ts
npx playwright test --project=chromium
```

The default test run executes Chromium, Firefox, and WebKit projects in parallel. Tests use Playwright auto-waiting and do not rely on fixed sleeps.

## Reports and diagnostics

```shell
npm run report
```

The HTML report is written to `playwright-report/`. On test failure, Playwright retains screenshots, videos, and traces under `test-results/`. Open a trace with:

```shell
npx playwright show-trace test-results/<test-folder>/trace.zip
```

## Quality checks

```shell
npm run lint
npm run format
npm run format:check
npm run typecheck
```

Husky runs lint, formatting, and the test suite before a commit. Browser binaries must be installed before running the hook's test command.

## CI

The GitHub Actions workflow runs lint and type checks, then tests each browser in a separate matrix job. Configure the `HUDL_EMAIL` and `HUDL_PASSWORD` repository or environment secrets for authenticated coverage. The HTML reports are uploaded after each run; test artifacts are uploaded on failure.

## Project layout

```text
config/                 Environment configuration
constants/              Shared messages
fixtures/               Non-sensitive test data
pages/                  Page objects and reusable UI actions
tests/login/            Login, validation, and password-reset specs
utils/                  Environment access and logging
.github/workflows/      GitHub Actions CI
```

## Sample commit strategy

Create a focused feature branch and use a descriptive Conventional Commit message:

```shell
git switch -c test/add-login-validation
git add .
git commit -m "test: add Hudl login validation coverage"
```

The pre-commit hook runs configured quality checks. Push the branch and open a pull request so the browser matrix and report artifacts are available for review.

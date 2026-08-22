# Neha Mangla — Engineering Portfolio

Neha Mangla's Senior Full Stack Engineer portfolio, featuring enterprise SaaS case studies in workforce scheduling, asynchronous data imports, and performance analytics.

## Technology

- Next.js App Router, React, and TypeScript
- CSS with Tailwind's PostCSS pipeline
- ESLint and Node.js's built-in test runner

## Routes

- `/` — portfolio home
- `/work/workforce-calendar` — workforce scheduling case study
- `/work/custom-metrics-import` — asynchronous imports case study
- `/work/coaching-effectiveness` — performance analytics case study

Unknown routes render the portfolio's not-found page.

## Project structure

- `app/` — routes, layout, metadata, and global styles
- `components/` — page sections and case-study presentation
- `data/` — case-study and project content
- `lib/` — shared server-side utilities
- `public/` — portfolio images and icons
- `tests/` — rendered-route checks

## Local development

Node.js 22.13.0 or newer is required.

```bash
nvm use 22
npm ci
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

`npm test` builds the application and verifies rendered portfolio routes using a standard Next.js server.

## Deployment

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Keep the detected framework as Next.js.
4. Keep the default build command as `npm run build`.
5. Set `NEXT_PUBLIC_SITE_URL` after the final production domain is known.
6. Redeploy after setting or changing the production URL.

For local development, metadata uses `http://localhost:3000`. On Vercel, the production URL is resolved from `NEXT_PUBLIC_SITE_URL`, then Vercel's production and preview URL variables.

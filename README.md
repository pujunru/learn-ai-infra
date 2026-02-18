# Learn AI Infra Study Tracker

Next.js + React app for organizing a 4-week AI infrastructure study plan and tracking progress.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## CI

GitHub Actions CI is configured in `.github/workflows/ci.yml` and runs on push/PR:
- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm build`

## Deploy to GitHub Pages

Deployment is configured in `.github/workflows/deploy.yml`.

1. Push this repo to GitHub.
2. In GitHub repo settings, go to `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` (or run the deploy workflow manually from Actions).

The workflow builds a static export (`out/`) and publishes it to GitHub Pages.

## Notes

- `next.config.ts` auto-detects GitHub Actions and applies repo-based `basePath` for project pages.
- For `<user>.github.io` repositories, it keeps base path empty.

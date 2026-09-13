# Faizan Ahmed Sheikh — Portfolio

React + TypeScript + Vite portfolio for Faizan Ahmed Sheikh.

## Pages

- `/` — portfolio
- `/education` — education and recognition
- `/experience` — practical experience
- `/studio` — owner-only publishing interface

## Owner Content Studio

`/studio` lets the repository owner add projects, awards, certificates and participation milestones without changing page code. It commits structured content directly to `Faizan-ahmed-ags/portfolio` with a fine-grained GitHub token, then Vercel can redeploy from `main` automatically.

See [`CONTENT-GUIDE.md`](./CONTENT-GUIDE.md) for the one-time token setup.

## Content files

- `src/data/projects.json`
- `src/data/certificates.json`

## Development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

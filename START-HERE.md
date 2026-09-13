# Faizan Portfolio — Studio Edition

This is the complete editable portfolio source with the new Google Student Ambassador award and an owner publishing screen at `/studio`.

## Run locally

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Deploy to Vercel

Push this folder to `Faizan-ahmed-ags/portfolio`, then import that repository into Vercel. The included `vercel.json` configures Vite and clean routes for `/education`, `/experience`, and `/studio`.

## Add content without editing code

After the repository is live, open:

`https://YOUR-DOMAIN/studio`

Create a fine-grained GitHub personal access token restricted to the `portfolio` repository with **Contents: Read and write**. Paste it into Studio. The token is held only in browser session storage.

Studio can publish:

- Awards and certificates with image upload
- Participation milestones
- Projects

Each publish commits to GitHub, and a Git-connected Vercel deployment updates automatically.

See `CONTENT-GUIDE.md` for details.

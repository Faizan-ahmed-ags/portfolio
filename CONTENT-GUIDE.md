# Portfolio Content Studio

Open `/studio` on the deployed portfolio to publish new content without editing code.

## One-time setup

Create a **fine-grained GitHub personal access token** with:

- Repository access: **Only select repositories → portfolio**
- Repository permission: **Contents → Read and write**
- A sensible expiration date

Paste the token into `/studio`. It is stored only in browser `sessionStorage` for that browser session; it is not committed into GitHub or sent to Vercel.

## What you can publish

### Awards / certificates / participation
Studio uploads the image into `public/certificates/` and inserts the new item into `src/data/certificates.json`.

### Projects
Studio inserts a project into `src/data/projects.json`. The homepage renders it automatically, including a generic visual card for newly added projects.

Every publish is a GitHub commit to `main`. When Vercel is connected to this repository, Vercel redeploys automatically.

## Current content storage

- `src/data/certificates.json`
- `src/data/projects.json`
- `public/certificates/`
- `public/images/`
- `public/resume/`

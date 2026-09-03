# Anmol Singh — Portfolio

A premium developer portfolio built with React, Vite, Tailwind CSS and Framer
Motion — built from your resume content (MedScan AI, PlantDx, Thapar Institute,
skills, and your real GitHub/LinkedIn/LeetCode links) — plus a small Express +
MongoDB backend that stores contact form messages and a private `/admin` page
to read them.

## Two parts, two servers

```
anmol-portfolio/        ← the React site (Vite dev server, port 5173)
anmol-portfolio/server/ ← the API (Express, port 4000)
```

Both need to be running for the contact form and admin page to work.

## 1. Start the backend

```bash
cd server
npm install
npm run dev
```

This connects to the MongoDB Atlas cluster you gave me, using the connection
string already saved in `server/.env`. You should see:

```
[db] Connected to MongoDB Atlas
[server] listening on http://localhost:4000
```

**Before you deploy this anywhere public:** the database password was shared
in plain text in our conversation, so I'd treat it as already exposed —
rotate it from the MongoDB Atlas dashboard (Database Access → edit user →
new password), then update `MONGODB_URI` in `server/.env` to match. Never
commit `server/.env` to a public GitHub repo — it's already in
`server/.gitignore`.

## 2. Start the frontend

In a separate terminal, from the project root:

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional, preview the production build locally
```

The build output goes to `dist/` — deploy that folder to Vercel, Netlify, GitHub
Pages, or any static host.

## Editing your content

Everything you'll want to change day to day lives in `src/data/`, not inside
components:

- `src/data/social.js` — email, GitHub, LinkedIn, LeetCode, resume path
- `src/data/projects.js` — add/edit projects (each one gets its own detail page
  automatically at `/projects/<slug>`)
- `src/data/skills.js` — the skills grid, grouped by category
- `src/data/experience.js` — the Experience & Education timeline

## Resume file

Your real resume PDF is already placed at `public/resume.pdf` and wired up to
every "Download Resume" button. Swap that file whenever you update your resume
— no code changes needed.

## The admin page

There is no button or nav link to it anywhere in the UI, on purpose. Go to it
directly:

```
http://localhost:5173/admin
```

Sign in with:

- **ID:** `Anmol-Singh-Chehal`
- **Password:** the one you gave me

The password is never stored in plain text — the backend only keeps a salted
hash (`server/.env` → `ADMIN_PASSWORD_HASH` / `ADMIN_PASSWORD_SALT`), and
compares against that at login. To change the password later:

```bash
cd server
node scripts/hash-password.js "your-new-password"
```

Paste the two printed lines into `server/.env`, restart the backend, and the
old password stops working immediately.

Once signed in you land on `/admin/dashboard`, which has:

- A search bar (matches name, email, or message text)
- Filters for read/unread and a date range
- Sort by newest or oldest
- Mark-as-read/unread and delete on each message

The session token lives in `sessionStorage` (not `localStorage`), so signing
out of the browser tab or closing it ends the admin session automatically.

## Connecting elsewhere later

- `src/services/api.js` — generic request helper, point `VITE_API_BASE_URL`
  (in the root `.env`) at wherever you deploy the backend
- `src/services/contact.js` — now posts to the real `/api/contact` endpoint
- `src/services/admin.js` — login, search/filter messages, mark read, delete
- `src/services/github.js` — calls the public GitHub API directly (no key
  needed); swap for your own backend if you want authenticated stats

## Deploying

- **Frontend:** any static host (Vercel, Netlify, GitHub Pages). Set
  `VITE_API_BASE_URL` to your deployed backend's URL before building.
- **Backend:** any Node host (Render, Railway, Fly.io, a VPS). Set the same
  environment variables from `server/.env` in that host's dashboard — don't
  upload `.env` itself. Update `CORS_ORIGIN` to your deployed frontend URL so
  the browser is allowed to call the API.

## Notes

- Theme (light/dark) persists in `localStorage` and respects system preference
  on first visit.
- The GitHub repo count on the "Beyond the resume" section fetches live from
  the public GitHub API in the browser — if that request fails (e.g. rate
  limiting or no network), it falls back to a "View repositories on GitHub"
  link instead of showing broken data.
- The hero visual is a hand-illustrated avatar (SVG, not a photo or AI
  generation) with a simple floating animation — this environment doesn't
  have an image-generation tool available.

# SASC — UC Berkeley Southeast Asian Student Coalition

Public website for [SASC](https://www.instagram.com/ucbsasc), a student-run coalition at UC Berkeley
supporting Southeast Asian students through mentorship, cultural programming, and community. A React +
TypeScript single-page app built with Vite and Material UI, deployed on Netlify with Firebase for
member registration and event RSVPs.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| UI | Material UI (MUI) 5, Emotion |
| Routing | React Router DOM 6 |
| Animation | Framer Motion |
| Backend | Firebase (Firestore + Auth) — member registration, RSVPs, check-in |
| Hosting | Netlify |

## Getting Started

**Prerequisites:** Node.js 20 (see `.nvmrc`), npm, Git.

```bash
git clone git@github.com:khoaang/ucbsasc.git
cd ucbsasc
npm install
cp .env.example .env.local   # fill in Firebase config, see below
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Environment Variables

Copy `.env.example` to `.env.local` (git-ignored) and fill in real values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_FIREBASE_API_KEY` | Yes | Firebase project config |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | Firebase project config |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firebase project config |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | Firebase project config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase project config |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase project config |
| `VITE_FIREBASE_MEASUREMENT_ID` | No | Firebase Analytics |
| `VITE_ADMIN_PASS` | No | Passcode gating the hidden `/admin/members` page. Leave unset to keep it locked out. |

Without Firebase configured, the site still runs — RSVP/registration forms will show a "temporarily
unavailable" message instead of failing silently.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check (`tsc -b`) and build the production bundle to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |

## Project Structure

```
src/
├── App.tsx              # Router + layout shell (routes are defined here)
├── main.tsx              # React entry point
├── components/           # Shared components (Navbar, Footer, modals, guards)
│   ├── events/            # One component per event card/modal + shared EventCard
│   └── home/              # Homepage-only modals
├── data/                  # Editable content — see "Updating Site Content" below
├── firebase/              # Firestore/Auth helpers (config, members, rsvps)
├── hooks/                 # Shared React hooks
├── pages/                 # Route-level page components
└── theme/                 # MUI theme + color tokens

public/                   # Static assets served as-is (images, logo)
docs/                     # Deeper reference docs (see below)
netlify.toml              # Build command + redirects (see "Deployment")
```

## Pages & Routes

| Route | Page | Notes |
| --- | --- | --- |
| `/` | Home | Hero, program highlights, mailing list signup |
| `/about` | About | History, mission, leadership, programs |
| `/events` | Events | Upcoming/past event cards |
| `/lead` | Lead | Leadership & involvement hub |
| `/resources` | Resources | Immigration/legal links, media kit |
| `/contact` | Contact | Ways to reach SASC |
| `/qr` | QR Generator | Hidden — used for tabling, no navbar link |
| `/checkin` | Student Slate | Hidden — event check-in flow |
| `/admin/members` | Member Management | Hidden, gated by `VITE_ADMIN_PASS` |

A few short-link routes (`/seaso26`, `/seagrad26`, `/tos-vendor`, etc.) exist both as Netlify redirects
in `netlify.toml` (which win in production) and as React routes in `App.tsx` (which keep those links
working when running locally without Netlify's redirect layer).

## Updating Site Content

Most day-to-day updates (new officers, a new event, a seasonal banner) are data edits, not new
components:

- **Current banner / next-event CTA on Home** → `src/data/season.ts`
- **Officer & director roster** → `src/data/leadership.ts`
- **Lead page copy** (branch descriptions, application steps) → `src/data/lead.ts`
- **Flagship program descriptions** → `src/data/programs.ts`
- **A new event card** → add a component under `src/components/events/` (copy an existing one for
  layout) and render it from `src/pages/Events.tsx`

## Deployment

Hosted on Netlify (`netlify.toml`): builds with `npm run build`, publishes `dist/`, pinned to Node 20.
`netlify.toml` also owns the short-link redirects mentioned above — add new ones there, not just in
`App.tsx`, so they work in production.

## Contributing

1. Create a branch off `main` (`git checkout -b feature/your-feature`).
2. Run `npm run lint` and `npm run build` before opening a PR — both must pass cleanly.
3. Keep commits and PR descriptions focused on the "why," not just the "what."
4. See [docs/development-guide.md](docs/development-guide.md) for troubleshooting and deeper workflow notes.

## License

MIT — see [LICENSE](LICENSE).

# Development Guide

Deeper reference for day-to-day work on this repo. Start with the main [README](../README.md) for
setup, environment variables, and project structure — this doc covers conventions and troubleshooting.

## Code Style

- Components: `PascalCase` filenames (`EventCard.tsx`), function components with named exports of
  their default.
- Hooks and utilities: `camelCase` (`usePageTitle.ts`).
- Types/interfaces: `PascalCase`, no `I` prefix.
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) where ESLint doesn't
  already enforce something.
- Run `npm run lint` before opening a PR — CI-equivalent checks are just ESLint + `tsc -b` (part of
  `npm run build`).

## Adding an Event Card

Event cards are self-contained components under `src/components/events/`, each rendering an
`EventCard` (the shared layout in `src/components/events/EventCard.tsx`) with its own copy, dates, and
optional RSVP form. To add one:

1. Copy the closest existing event component (a static recap card like `AnniversaryRecap.tsx`, or one
   with an RSVP form like `HalloweenMovieNight.tsx`) as a starting point.
2. Update the title, date, location, description, and image (`public/`).
3. Import and render it from `src/pages/Events.tsx`.
4. If it needs RSVPs, wire it to `src/firebase/rsvps.ts` (see an existing form-based card for the
   pattern) and make sure `VITE_FIREBASE_*` env vars are set.

## Adding a Page

```tsx
// src/pages/NewPage.tsx
import { Container, Typography } from '@mui/material';
import { usePageTitle } from '../hooks/usePageTitle';

const NewPage = () => {
  usePageTitle('New Page');
  return (
    <Container>
      <Typography variant="h1">New Page</Typography>
    </Container>
  );
};

export default NewPage;
```

Then add a lazy-loaded route in `src/App.tsx`:

```tsx
const NewPage = lazy(() => import('./pages/NewPage'));
// ...
<Route path="/new-page" element={<NewPage />} />
```

If it's a public page, add a link in `src/components/Navbar.tsx`. If it's intentionally hidden (like
`/qr` or `/checkin`), skip the navbar entry.

## Troubleshooting

**Module not found**
Check the import path is relative to the importing file, and that the file actually exists —
this project doesn't use path aliases (no `@/` imports).

**Type errors on props**
Make sure the component's prop type/interface is exported if another file imports it, and that you're
passing all required fields.

**Node version or dependency issues**
```bash
node --version   # should match .nvmrc (20)
npm cache clean --force
rm -rf node_modules
npm install
```

**RSVP/registration forms show "temporarily unavailable"**
Firebase env vars aren't set. Copy `.env.example` to `.env.local` and fill in real values (see the
README's Environment Variables section).

## Contribution Process

1. Branch off `main`.
2. Make your change; run `npm run lint` and `npm run build`.
3. Open a PR with context on *why* the change is needed (screenshots for visual changes).
4. Keep PRs scoped — content/data edits (`src/data/*.ts`) and feature work are easier to review
   separately.

## Further Reading

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material UI Docs](https://mui.com/)
- [Vite Docs](https://vitejs.dev/)

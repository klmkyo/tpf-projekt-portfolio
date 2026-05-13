# STUDIO_GALLERY portfolio

React + TypeScript implementation of the Figma portfolio prototype for the TPF laboratory checklist.

## Stack

- Vite
- React Router
- Tailwind CSS
- Firebase Authentication
- Contentsquare UXA
- Hotjar
- Google Analytics 4
- pnpm

## Routes

- `/work` - public portfolio/gallery page
- `/contact` - contact form page
- `/login` - Firebase email/password login page
- `/admin` - protected portfolio manager page
- `/admin/new` - protected add-project form
- `*` - 404 fallback

## Local setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Fill `.env` with values from Firebase, Google Analytics, Contentsquare, and Hotjar:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GA_MEASUREMENT_ID=G-EPV1414MV4
VITE_HOTJAR_SITE_ID=
VITE_CONTENTSQUARE_TAG_ID=529ebf7774b06
```

Firebase Email/Password sign-in must be enabled in Firebase Console. Create the admin user there, then sign in through `/login`.

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
```

## Deploy

The app builds to static files in `dist`, so it can be deployed to Railway, Netlify, Vercel, Firebase Hosting, or any static host.

For Railway:

1. Connect the GitHub repository in Railway.
2. Set the build command to `pnpm build`.
3. Set the start command to `pnpm preview --host 0.0.0.0 --port $PORT`.
4. Add the same environment variables listed above.

## Documentation Screenshots

Add final screenshots here after configuring real Firebase and analytics accounts:

- Application screenshots: `/work`, `/contact`, `/login`, `/admin`
- Google Analytics real-time or reports screenshot
- Contentsquare dashboard screenshot
- Hotjar dashboard or heatmap/session screenshot, if Hotjar is also configured
- Deployment URL screenshot

## Notes

The live Figma MCP connection timed out during implementation, so the UI was implemented from the provided `figma-export.pdf` and its embedded raster assets. The extracted assets are stored in `src/assets/extracted`.

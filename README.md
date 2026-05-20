# STUDIO_GALLERY portfolio

React + TypeScript implementation of the Figma portfolio prototype for the TPF laboratory checklist.
The public site is backed by a Firebase Auth + Firestore content editor so the admin page can update
shared portfolio copy and projects without touching the code.

## Stack

- Vite
- React Router
- Tailwind CSS
- Firebase Authentication
- Firebase Firestore content editor with compressed image uploads
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

Fill `.env` with the analytics values you want to use:

```bash
VITE_GA_MEASUREMENT_ID=G-EPV1414MV4
VITE_HOTJAR_SITE_ID=
VITE_CONTENTSQUARE_TAG_ID=529ebf7774b06
```

Firebase is initialized with the project configuration in `src/lib/firebase.ts`:

```ts
apiKey: "AIzaSyDUB52FkZ1dzM1qy7RhHaQY04T7_oKD4QY"
authDomain: "tpf-projekt-eeff2.firebaseapp.com"
projectId: "tpf-projekt-eeff2"
storageBucket: "tpf-projekt-eeff2.firebasestorage.app"
messagingSenderId: "804943686132"
appId: "1:804943686132:web:53e362f3b8e368fc4531a1"
measurementId: "G-Y3JMG0XGBG"
```

Firebase Email/Password sign-in must be enabled in Firebase Console. Create the admin user there, then sign in through `/login`.
The admin content editor reads and writes the `siteContent/portfolio` document in Firestore. The document must exist before the public pages can render content.
Project and hero images are uploaded from the admin UI, compressed in the browser, and stored as `data:` URLs inside the same Firestore document. No separate Storage bucket setup is required for this project.

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
```

## Deploy

The app builds to static files in `dist`, so it can be deployed to Cloudflare Workers, Railway, Netlify, Vercel, Firebase Hosting, or any static host.

For Cloudflare:

1. Run `pnpm install`.
2. Build and deploy with `pnpm deploy:cf`.
3. The deployment uses `wrangler.json`, which serves `./dist` and falls back to `index.html` for SPA routes.

For Railway:

1. Connect the GitHub repository in Railway.
2. Set the build command to `pnpm build`.
3. Set the start command to `pnpm preview --host 0.0.0.0 --port $PORT`.
4. Add the same environment variables listed above.

## Documentation Screenshots

Add final screenshots here after configuring real Firebase and analytics accounts:

- Application screenshots: `/work`, `/contact`, `/login`, `/admin`
- Admin content editor screenshots: `/admin`, `/admin/new`
- Google Analytics real-time or reports screenshot
- Contentsquare dashboard screenshot
- Hotjar dashboard or heatmap/session screenshot, if Hotjar is also configured
- Deployment URL screenshot

## Notes

The live Figma MCP connection timed out during implementation, so the UI was implemented from the provided `figma-export.pdf` and its embedded raster assets. The extracted assets are stored in `src/assets/extracted`.

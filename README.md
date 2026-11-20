# Web10 UI

React + TypeScript UI for Web10, built with the Next.js App Router. The app is server-rendered by default; the home page is explicitly dynamic so the API status is fetched on each request.

## Requirements

- Node.js 20+
- The Web10 API running at `http://127.0.0.1:3000` (optional for rendering; the page shows an offline state if it is unavailable)

## Setup

```sh
cd web10-ui
npm install
cp .env.example .env.local
```

`.env.local`:

```env
API_URL=http://127.0.0.1:3000
NEXT_PUBLIC_API_URL=http://127.0.0.1:3000
```

`API_URL` is used by server components and is not exposed to the browser. `NEXT_PUBLIC_API_URL` is available for future client-side code.

## Run

```sh
npm run dev
```

Open <http://localhost:3001>.

Production build:

```sh
npm run build
npm start
```

## SSR notes

- The App Router renders React server components on the server.
- `src/app/page.tsx` uses `export const dynamic = "force-dynamic"` and fetches `/api/health` with `cache: "no-store"`, so the status card is rendered per request rather than at build time.
- If the API is offline, the page still renders and displays an unavailable state.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server on port 3001 |
| `npm run build` | Production build |
| `npm start` | Production server on port 3001 |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |

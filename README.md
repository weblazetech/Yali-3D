# Yali Dental Clinic website

Static, content-led website for Yali Dental Clinic, opening in Hyderabad. Built with Astro 7, TypeScript, Three.js and GSAP ScrollTrigger.

The repository currently contains a **review-only build**. It is not authorised for public publication: contact details, clinical copy and operational details still require confirmation (see [`docs/REVIEW.md`](docs/REVIEW.md)). The source is in the public `weblazetech/Yali-3D` GitHub repository; the code being public is not publication approval for the clinic.

## Requirements

- Node.js 22.23.4 or newer (required by Astro 7)
- npm 9.6.5 or newer

## Run locally

From the repository root (or `C:\Code\Yali\website` in the workspace):

```bash
npm install
npm run dev
# http://localhost:4321
```

Other commands:

```bash
npm run check     # Astro + TypeScript diagnostics
npm run build     # static production build in dist/
npm run preview   # preview the production build
```

## Base URL, canonical URLs and sitemap

The production domain has **not** been supplied. Nothing is hard-coded.

- By default (`SITE_URL` unset) the build omits canonical URLs, `og:url`, the sitemap and the `Sitemap:` line in `robots.txt`. This avoids publishing an invented domain.
- Set `SITE_URL` before a public build:

```bash
SITE_URL=https://the-verified-domain.example npm run build
```

The value must be an absolute URL. It is used for canonical URLs, Open Graph URLs, the Organization structured data (`url` and `logo`) and the generated `sitemap-index.xml`. A future deployment should set this to the verified clinic domain.

`Dentist` structured data is intentionally **not** emitted. It depends on a confirmed address, hours and location, which are not available yet.

## Project structure

```
.
├── public/
│   ├── fonts/                     self-hosted Lora and DM Sans (latin subset)
│   ├── images/
│   │   ├── yali-crest-*.png       active red/gold crest, transparent background
│   │   └── fallback/              composed stills rendered from the 3D models
│   └── favicon.svg
├── src/
│   ├── components/                shared UI, stages, explorer, steppers, FAQ
│   ├── data/
│   │   ├── site.ts                clinic state, contact channels, navigation
│   │   ├── treatments.ts          treatment copy and FAQ content
│   │   ├── concerns.ts            concern selector content
│   │   ├── doctor.ts              verified biography data (qualifications/timeline empty)
│   │   ├── visit.ts               visit stages, home FAQs
│   │   ├── about.ts               purpose, principles
│   │   ├── contact.ts             contact status copy
│   │   └── privacy.ts             privacy copy
│   ├── layouts/BaseLayout.astro   head, metadata, header, footer, observability
│   ├── pages/                     nine routes, 404, robots.txt endpoint
│   ├── scripts/
│   │   ├── ui.ts                  header, menu, motion control, reveals
│   │   ├── story.ts               chapter selection and the bounded ScrollTrigger pin
│   │   ├── home-3d.ts             single-canvas coordinator for the homepage
│   │   ├── implant-explorer.ts    explorer controls and WebGL fallback
│   │   └── three/                 renderer, models, scenes and generated molar geometry
│   └── styles/global.css          tokens, layout and component styles
├── docs/REVIEW.md                 pending facts, approvals and release checks
└── docs/DESIGN.md                 implemented design system
```

## Content and configuration

- **Clinic state:** `src/data/site.ts` sets `state: 'prelaunch' | 'open'`. Prelaunch is the current, honest state. Switching to `open` does not invent details: address, hours and map links are only rendered when present.
- **Contact channels:** `phone` and `whatsapp` are `null` until a real number is verified. When a channel exists, `tel:` and WhatsApp actions are rendered automatically, and the WhatsApp link opens a short generic message. No placeholder number exists anywhere in the project.
- **Treatments:** `src/data/treatments.ts` is the single source for the three treatment pages. All three share the same section order (addresses, assessment, options, timing and cost, follow-up, FAQs).
- **Doctor data:** `src/data/doctor.ts` intentionally has an empty qualifications list and an empty verified timeline. Do not add inferred dates or expand "PG" into a qualification.
- **Privacy and observability:** `src/data/privacy.ts` describes the implemented behaviour, not a template. It currently discloses Vercel Web Analytics and Speed Insights, the absence of patient accounts and enquiry forms, and what happens when a Call or WhatsApp link is followed. Update it if hosting, observability or contact behaviour changes.

## 3D and motion

- The homepage uses **one active WebGL canvas at a time**. The hero and treatment-story stages hand the renderer over through `home-3d.ts`; the offscreen stage shows its composed still.
- Three.js and GSAP are loaded through dynamic imports only on the routes that need them.
- The implant explorer uses the same geometry as the story and supports assembled/exploded views, rotation, and reset. Rotation is an explicit control and never captures page scrolling.
- Rendering pauses when a stage is offscreen, the tab is hidden, or the scene is idle. Listeners, observers and GPU resources are disposed with the stage.
- A visible **Reduce motion** control in the header is backed by the operating system preference and persisted in `localStorage`. Reduced motion swaps every WebGL stage for a composed still and removes the pinned scroll sequence.
- When WebGL 2, the 3D module, or a model context fails, the stage keeps the still illustration, the chapter/explorer controls remain usable, and the caption explains the fallback. The rotate control is disabled rather than pretending to work.

The molar is an original procedural mesh generated once from a signed field of overlapping spheres (Three.js `MarchingCubes`) and baked into a compact buffer geometry. The crown and implant are built from Three.js primitives. No external model files or paid 3D services are used.

## Performance

Measured on the production build with a fresh browser context (Edge headless, local `astro preview`, compressed transfer as reported by Resource Timing):

| Route | Initial payload | Deferred 3D |
|---|---|---|
| `/` | ~157 KB | ~183 KB (Three.js scene chunk + GSAP + ScrollTrigger) |
| `/treatments/dental-implants` | ~146 KB | ~139 KB (scene chunk) |
| `/treatments` | ~91 KB | none |
| `/treatments/root-canals-crowns` | ~91 KB | none |
| `/about` | ~91 KB | none |
| `/contact` | ~90 KB | none |

Gzip build sizes: scene chunk 138.2 KB, GSAP 26.5 KB, ScrollTrigger 17 KB, CSS 7.8 KB, fonts 57.3 KB, crest 18.4 KB. Raw build sizes are listed in `docs/REVIEW.md`. Both measurements are far below the 1 MB initial and 3 MB deferred targets. These figures exclude Vercel Analytics and Speed Insights, which are rendered only in Vercel builds.

## Accessibility notes

- Semantic landmarks, one `h1` per page and logical heading order.
- All selectors use buttons with tab semantics when enhanced; without JavaScript every panel is readable and the FAQ uses native `details`/`summary`.
- Visible focus rings, 44 × 44 CSS pixel controls, keyboard support for tabs and the mobile menu (including Escape and focus return).
- Automated check results are recorded in `docs/REVIEW.md`. They are not a substitute for manual screen-reader testing.

## Vercel Analytics and Speed Insights

Both Astro components are imported in `src/layouts/BaseLayout.astro`:

```astro
import Analytics from '@vercel/analytics/astro';
import SpeedInsights from '@vercel/speed-insights/astro';
...
{vercelObservabilityEnabled && <Analytics />}
{vercelObservabilityEnabled && <SpeedInsights />}
```

- These are the Astro components, not the Next.js/React imports. The site is Astro, so `@vercel/analytics/next` and React components do not apply.
- `vercelObservabilityEnabled` is true only when the build runs with `VERCEL=1`, which Vercel sets. Local builds and previews therefore do not request `/_vercel/insights/script.js` or `/_vercel/speed-insights/script.js` and do not produce 404s.
- On a Vercel deployment, enable Web Analytics and Speed Insights in the project dashboard. The platform serves both endpoints.
- Both are used for aggregate traffic and performance reporting, not advertising or cross-site tracking. Web Analytics is cookieless. The privacy page and homepage FAQ disclose both. No patient information is collected.
- They are deliberately not loaded on non-Vercel hosts because the endpoints are Vercel-specific.

## Deployment

`npm run build` writes a self-contained static site to `dist/`. To deploy on Vercel:

- Framework preset: Astro.
- Build command: `npm run build`.
- Output directory: `dist`.
- Set the verified `SITE_URL` for canonical URLs and the sitemap when the domain is confirmed.
- Enable Web Analytics and Speed Insights in the Vercel project after the first deployment.

The existing `weblazetech/Yali-3D` repository is public; make it private or move the internal review docs if they should not be public.

Public publication is blocked until the launch gates in [`docs/REVIEW.md`](docs/REVIEW.md) are resolved, including at least one verified contact channel and Dr. Reddy's clinical review.

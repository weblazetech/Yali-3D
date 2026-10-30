# Internal review, pending content and release checklist

Status: **private review build, not for public publication.**
Build date: 30 October 2026.
Source: `website/`. Production build: `website/dist/`. Local preview: `npm run preview`.

This document is internal. It is not rendered on the website and must not be treated as clinical approval.

## 1. Release decision

The site is complete as a review build and passes the local checks recorded in section 7. It must not be published publicly until the gates below are resolved. A private preview deployment was not created because the Sites preview workflow was not available in this execution session.

Two items are public-launch blockers on their own:

1. **No verified contact channel.** `clinic.phone` and `clinic.whatsapp` are `null`, so the site correctly renders no Call or WhatsApp actions. Public enquiries are not possible yet.
2. **Clinical content has not been reviewed by Dr. Reddy.** All treatment explanations, FAQ answers, and the implant labels/assembly views are drafted general information and require his review before publication.

## 2. Launch gates

| Gate | Status | What is needed | Owner |
|---|---|---|---|
| Verified phone and WhatsApp number | Open. No channel configured. | Two verified channels (or one), with display and international format. Public enquiry is blocked until then. | Clinic |
| Clinical review of treatment pages | Open. | Dr. Reddy to review all copy in `src/data/treatments.ts` and the FAQs. | Dr. Reddy |
| Implant model labels and assembly | Open. | Clinical review of the Crown / Connector / Implant labels, the exploded sequence, and the statement that these are illustrations. | Dr. Reddy |
| Exact postgraduate qualification and specialty | Open. | Supplied confirmation. Do not expand "PG" into "MDS" or add a specialty. | Clinic |
| Current vs former hospital and teaching affiliations | Open. | Confirm each affiliation and whether it may be published. | Clinic |
| Implantology years: "17 years" vs "2016 to 2026" | Open. Unresolved conflict. | One verified formulation, or omit. | Clinic |
| Implant volume and retention statistics | Open. No source or attribution supplied. | Evidence and attribution, or leave omitted. Current build publishes neither. | Clinic |
| Diagnostics, treatments and surgical procedures available at Yali | Open. | Confirm which are available at the clinic and which are hospital/referral only. Current copy avoids claiming specific in-clinic scope. | Clinic |
| Address, neighbourhood, consultation hours, map | Open. | Approved operational details. Set `state: 'open'` and populate the configuration only after confirmation. | Clinic |
| Hygiene and material-selection practices | Open. Omitted. | Confirmed practices for publication. The site currently invites questions instead of asserting practices. | Clinic / Dr. Reddy |
| Authentic photography of Dr. Reddy and the clinic | Missing. | Supplied, approved photography. The current typographic introduction is deliberate; no stock or generated person or interior has been used. | Clinic |
| Reviews and testimonials | None. | Authentic, attributable reviews earned by Yali. Prior-practice reviews must not be presented as Yali's. No reviews section is present. | Clinic |
| Production domain and deployment authorisation | Open. | Verified base URL for `SITE_URL`, hosting decision, and explicit authorisation to publish. | Clinic |
| Privacy and hosting disclosure | Draft. | Confirm the hosting provider and any logging behaviour, then update `src/data/privacy.ts`. | Clinic / web |
| Opening announcement wording | Draft. | Approve the exact prelaunch/open wording. Current wording is "Opening in Hyderabad." only. | Clinic |

## 3. Confirmed facts used

- Clinic name: Yali Dental Clinic.
- Tagline: "Guardians of Your Smile." (from `YALI BRANDING.pdf`).
- City: Hyderabad; neighbourhood and address undecided.
- Care areas described: root canal treatment, crowns, dental implants, and oral and maxillofacial care.
- Dr. B. V. Ramakrishna Reddy practises implant and surgical dentistry and guides care at Yali.
- Prelaunch status while operational details are undecided.
- Call/WhatsApp, with appointments confirmed manually, once a verified channel exists.

## 4. Deliberate omissions

- No phone number, WhatsApp number, address, hours, map, or appointment availability.
- No qualifications, hospital affiliations, awards, rankings, or founding story.
- No dated career timeline. `doctor.timeline` is empty; the timeline component is implemented but is not rendered without verified milestones.
- No implant volume, retention rate, success rate, or other numerical claims.
- No patient testimonials, review scores, or reviews from a prior practice.
- No clinic interior, doctor portrait, or patient imagery.
- No analytics, cookies, forms, patient accounts, payments, scheduling integration, blog, or second language.
- No clinical claim of "painless", "guaranteed", or accredited care.
- "International-standard treatment" is written as an ambition and explicitly says it is an aim, not an accreditation.

## 5. Implemented routes and content

| Route | Status | Notes |
|---|---|---|
| `/` | Complete review build | Hero, doctor introduction, treatment story, treatment links, principles, first-visit stepper, FAQs, enquiry path. |
| `/treatments` | Complete review build | Concern selector (progressive enhancement), all treatment links, page anatomy explainer. |
| `/treatments/root-canals-crowns` | Complete review build | Root canal and crown sections, assessment, options, timing/cost, follow-up, 5 FAQs. Clinical review required. |
| `/treatments/dental-implants` | Complete review build | Single tooth, multi-tooth, full-arch, assessment, options, timing/cost, follow-up, 5 FAQs, implant explorer. |
| `/treatments/oral-maxillofacial-care` | Complete review build | Verified surgical background described generally, clinic/hospital/referral distinction, 5 FAQs. Scope confirmation pending. |
| `/about` | Complete review build | Purpose, doctor biography (confirmed material only), care philosophy, opening status. Qualifications and timeline omitted. |
| `/your-visit` | Complete review build | Five stages, preparation list, questions worth asking. Hygiene/material practices omitted pending confirmation. |
| `/contact` | Complete review build | Honest prelaunch status, no fake contact actions, address/hours placeholders, urgent-concern guidance. |
| `/privacy` | Complete review build | Describes actual implemented behaviour; no invented analytics or retention claims. |
| `/404` | Complete review build | Helpful fallback with `noindex`. |

## 6. Interactions and states

- Mobile menu: disclosure navigation with focus move on open, Escape to close, focus return, and no-JS fallback where the navigation stays visible.
- Reduce motion: visible header control, persisted choice, initialised from the OS preference, with live syncing when the OS preference changes and no explicit user choice is stored.
- Treatment story: three direct chapter buttons, a skip link to treatment information, a bounded desktop pin (180% of the pinned height), and no pin on mobile or with reduced motion.
- Implant explorer: rotate (auto-rotation), stop, assembled/exploded, reset. Rotation is an explicit control and never captures page scrolling. Without WebGL the rotate control is disabled and the hint says why; assembled/exploded continue to work with the composed stills.
- FAQ: native `details`/`summary`, keyboard operable, content readable without JavaScript.
- First-visit stepper and concern selector: all content is in ordinary HTML before JavaScript; JavaScript adds tab semantics and hides inactive panels.
- One active canvas: the homepage coordinator disposes one stage before activating the other. Offscreen and hidden-tab rendering is paused.
- Fallbacks: WebGL 2 unavailable, 3D chunk failure, reduced motion, and JS disabled all leave the page readable, with chapter selection and treatment links intact.
- No unsupported control is shown as working. The rotate control is disabled in fallback states.

## 7. Verification performed

Environment: Windows, Node 24.16.0, Astro 7.4.4, Edge 141 headless via Playwright (`msedge` channel). Production build served with `astro preview`.

### 7.1 Commands

| Command | Result |
|---|---|
| `npm run check` | 0 errors, 0 warnings, 0 hints across 46 files. |
| `npm run build` | 10 static pages built into `dist/` (nine routes, 404, robots.txt). |
| Build with `SITE_URL=https://example.org` | Canonical URLs, `og:url`, Organization JSON-LD, `sitemap-index.xml` and robots sitemap line generated. |
| Final build without `SITE_URL` | No canonical, `og:url`, sitemap, or invented domain. Expected for review. |

### 7.2 Route, link and layout sweep

- Nine routes and 404 returned HTTP 200 from the production preview.
- Exactly one `h1` on every route; unique route titles and meta descriptions.
- No console errors or page errors on any route.
- All internal links resolved; no broken anchors or links.
- No horizontal overflow at 375, 768, 1024 and 1440 CSS pixels on any route.
- 200% text enlargement on the homepage produced no horizontal overflow.
- No `tel:` or `wa.me` links exist in the prelaunch build (no number is configured).

### 7.3 Interaction audit

65 automated interaction checks passed, including:

- Desktop navigation, mobile menu open/close/Escape, motion control and dataset changes.
- Story chapter selection by click and keyboard, status text, panel visibility, skip link target and focus.
- Story pin creation, one-canvas invariant after scrolling between stages.
- Implant explorer rotate/stop, assembled/exploded, reset, labels, and disabled rotation in fallback.
- Concern selector and both steppers.
- FAQ open/close.
- JavaScript disabled: navigation, all story panels, all stepper panels and all concern panels remain visible and readable.
- Reduced motion: no canvas, still visible, story selection works, no pin.
- WebGL unavailable: no canvas, still visible, honest WebGL caption, rotate disabled, exploded view still works.
- Aborted 3D chunk: no canvas, stills visible, honest failure caption, no uncaught errors.

### 7.4 Accessibility audit

Automated checks on eight routes at 1440 and 375:

- 0 contrast failures across 1,200+ visible text elements (thresholds 4.5:1 normal, 3:1 large).
- 0 touch-target failures under the project's 44 × 44 CSS pixel standard for non-inline controls.
- 0 heading-order failures; exactly one `h1` inside `main`; header, nav, main and footer landmarks present and labelled.
- 0 duplicate IDs; 0 broken `aria-controls`/`aria-labelledby`/`aria-describedby` references; 0 images without an `alt` attribute; 0 empty-name controls; 0 focusable elements inside `aria-hidden` regions.
- Keyboard focus test: first Tab reveals and focuses the skip link, then the brand, primary navigation, motion control and hero actions in visual order. Every tested element had a visible 2 px solid focus outline; selected chapter buttons keep a visible outline. Screen-reader announcement was not tested.

Key measured contrast pairs:

| Pair | Ratio |
|---|---|
| Charcoal `#383434` on ivory `#FFFBF6` | 11.93:1 |
| Muted `#6D5F57` on ivory | 5.95:1 |
| Muted `#6D5F57` on sand-soft `#F4EBE2` | 5.21:1 |
| Deep terracotta `#854431` on ivory | 7.11:1 |
| Deep terracotta on sand `#DDCCBC` | 4.68:1 |
| Ivory on deep terracotta | 7.11:1 |
| Footer muted `#D9C8BB` on charcoal | 7.57:1 |

Brand terracotta `#B06449` on ivory measures 4.28:1. It is used for decorative marks and large/non-text elements only; functional text uses deep terracotta.

These are automated checks. Screen-reader testing, real-device touch testing, and browser-specific focus behaviour were not performed (see section 9).

### 7.5 Payload measurements

Method: production build, fresh browser context, Edge headless, `performance.getEntriesByType('resource')` transfer sizes; gzip sizes with Node `zlib` at level 9. The local preview applied compression; the figures below therefore approximate compressed transfer. No CDN or Brotli assumption is included.

| Route | Initial payload | Deferred 3D |
|---|---|---|
| `/` | 156 KB | 183 KB |
| `/treatments/dental-implants` | 146 KB | 139 KB |
| `/treatments` | 90 KB | none |
| `/treatments/root-canals-crowns` | 90 KB | none |
| `/about` | 90 KB | none |
| `/contact` | 89 KB | none |

Largest build assets (raw / gzip):

- `_astro/scenes.*.js`: 554.6 KB / 138.2 KB (Three.js, models and scenes; deferred).
- `_astro/gsap.*.js`: 68.3 KB / 26.5 KB (deferred, desktop story only).
- `_astro/ScrollTrigger.*.js`: 41.7 KB / 17.0 KB (deferred).
- `_astro/BaseLayout.*.css`: 36.6 KB / 7.5 KB.
- Fonts: 57.5 KB total (Lora 600, DM Sans variable, latin subset, self-hosted).
- Crest PNG at 128 px: 17.7 KB (header and footer).
- Fallback stills: 7.3–31.5 KB each; only route-relevant stills load.

Both targets pass: initial payload below 1 MB and deferred 3D below 3 MB per route.

### 7.6 Prelaunch and open-state rendering

- Prelaunch build checked: "Opening in Hyderabad.", no contact actions, no address/hours/map, honest contact status.
- Open state tested with **temporary fixture data** (state `open`, a non-real test number, test address/hours/map) and then removed. In that build: `tel:` and `wa.me` links rendered, the contact page showed the test address/hours and directions link, the homepage status changed, footer details rendered, and no "Opening in Hyderabad" copy remained on the homepage or about page.
- The fixture was reverted, the site rebuilt, and the final `dist/` was checked for the fixture strings and number. None are present.

## 8. Content and claims audit

- No numerical statistics, retention rates, implant volumes, rankings, awards, "pioneered", or outcome guarantees.
- No qualifications expanded or invented. "PG" is not presented as "MDS".
- No prior-practice reviews or testimonials.
- No patient or clinic photography. The crest is extracted from the supplied brand PDF; the 3D models and stills are original illustrations.
- No em or en dashes in the source copy.
- The only opening/availability wording is derived from configuration and avoids unconfirmed details.
- Clinical statements remain subject to Dr. Reddy's review. Examples that need particular attention: anaesthesia and discomfort wording, healing factors, implant longevity wording ("Many implants last for years"), and the oral and maxillofacial scope description.

## 9. Not tested / remaining limitations

- Browsers: only Edge (Chromium) was tested. Current Chrome, Safari, Firefox, iOS Safari, and Android Chrome were not available in this execution session.
- Screen readers and real assistive technology were not tested.
- Real-device touch, 3D performance, and thermal behaviour were not tested on phones.
- The open-state build was tested with fixture data only; it has not been tested with the clinic's real details.
- The career timeline component has no verified data and is therefore not rendered. It has not been visually reviewed with real milestones.
- The molar is a stylised procedural illustration. Its crown/root silhouette was not clinically approved.
- The crown story view and implant exploded view are explanatory illustrations, not anatomical diagrams. Labels and sequencing require review.
- The print stylesheet is minimal and was not verified.
- A live change of the operating-system reduced-motion preference while the page is open was not exercised; the control and initial OS detection were tested.
- No real private Sites preview was deployed.

## 10. Review checklist

- [ ] Confirm at least one verified contact channel and add it to `src/data/site.ts`.
- [ ] Dr. Reddy reviews and approves all treatment, FAQ and visit copy.
- [ ] Dr. Reddy reviews the implant labels and exploded view.
- [ ] Confirm the postgraduate qualification wording.
- [ ] Confirm current/former hospital and teaching affiliations.
- [ ] Resolve the implantology-years conflict.
- [ ] Confirm or omit implant volume/retention statistics.
- [ ] Confirm the clinic/hospital scope for oral and maxillofacial care.
- [ ] Confirm the address, neighbourhood, hours, map and opening status.
- [ ] Confirm hygiene and material-selection practices, or keep them omitted.
- [ ] Supply authentic doctor/clinic photography if it is to be used.
- [ ] Approve the privacy page and hosting disclosure.
- [ ] Set the verified `SITE_URL` and confirm the production domain.
- [ ] Run manual browser/device and screen-reader checks.
- [ ] Obtain explicit authorisation before public publication.

## 11. How to change clinic state (internal)

`src/data/site.ts` is the only operational switch.

```ts
state: 'open',                                  // 'prelaunch' | 'open'
phone: { value: '+91XXXXXXXXXX', display: '…' }, // only after verification
whatsapp: { value: '+91XXXXXXXXXX', display: '…' },
addressLines: ['…', '…', '…'],                   // only when approved
hours: [{ label: 'Monday to Saturday', value: '…' }],
mapsUrl: 'https://…',                            // only an approved directions link
```

The WhatsApp message is a short generic enquiry and must not ask for symptoms or medical details. Appointments remain manually confirmed. Re-run `npm run check` and `npm run build` after any change, and re-run the route/contact checks because the state branches render different contact content.

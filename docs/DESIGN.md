# Design system: Yali Dental Clinic

This is the implemented design system, not an aspirational one. Values match `src/styles/global.css`.

## 1. Design read

A family dental clinic for prospective patients in Hyderabad, in a warm editorial register. Trust first, calm and specific copy, cinematic but restrained motion. The guardian crest is the identity; the 3D tooth is a supporting illustration, never the source of essential information.

- Variance: moderate. Asymmetric editorial blocks, a wide hero headline, but no loud patterns.
- Motion: restrained. One pointer-reactive hero, one bounded scroll sequence, short chapter transitions.
- Density: low. Generous section spacing, readable line lengths, information grouped into rules rather than cards.

## 2. Brand source

- Crest and palette extracted from `YALI BRANDING.pdf` pages 3–4.
- Crest extracted from the terracotta page at 300 dpi, background removed, stored as transparent PNG (`public/images/yali-crest-128.png` for the interface, `yali-crest-640.png` for social metadata).
- Exact tagline preserved: **“Guardians of Your Smile.”**
- The rounded arch of the crest becomes the site’s image and 3D-stage motif.

## 3. Color

| Token | Value | Role |
|---|---|---|
| `--ivory` | `#FFFBF6` | Main background |
| `--sand` | `#DDCCBC` | Supporting surfaces, stage |
| `--terracotta` | `#B06449` | Decorative marks and large shapes |
| `--charcoal` | `#383434` | Body text, footer surface |
| `--clay` | `#854431` | Buttons, links, focus indicators, functional accent |
| `--clay-deep` | `#6B3324` | Hover state |
| `--sand-soft` | `#F4EBE2` | Section tint, aside surfaces |
| `--line` / `--line-strong` | `#E7D9CC` / `#D7C2B2` | Hairlines and borders |
| `--ink-muted` | `#6D5F57` | Secondary text |
| `--ink-on-dark` | `#FDF6EE` | Text on charcoal |
| `--ink-on-dark-muted` | `#D9C8BB` | Secondary text on charcoal |

Rules:

- `#B06449` is not used for functional text; it measures 4.28:1 on ivory. Small functional text uses `--clay`.
- Every background has a tested text colour on it. Key pairs are listed in `docs/REVIEW.md`.
- No gradients on text. Gradients appear only in the stage surface and the enquiry panel, and never carry essential information.
- Deep terracotta is also the focus colour on light surfaces; the footer overrides it to a light peach so the ring remains visible on charcoal.

## 4. Typography

- **Headings:** Lora 600, self-hosted latin subset. Page titles, section headings and content headings use Lora. Small interface labels (footer column labels, table labels, controls) use DM Sans 600 so they read as interface, not editorial copy.
- **Body/interface:** DM Sans variable, weights 400/500/600, self-hosted latin subset.
- Fluid scale via `clamp()`: `--step--1` 13–14 px, `--step-0` 16–17 px, `--step-1` 18–20 px, `--step-2` 22–28 px, `--step-3` 28–40 px, `--step-4` 34–52 px.
- Hero headline: `clamp(2.4rem, 4.4vw, 3.35rem)`, line-height 1.06, tracking −0.02em. Two lines at 768 px and above in the tested viewport, three at 375 px.
- Body line-height 1.65, measure capped at 62–68 ch. Paragraphs use `text-wrap: pretty`; headings use `text-wrap: balance`.
- No em or en dashes in copy.

## 5. Layout and space

- Container: `min(100% − 2 × gutter, 1240px)`, gutter `clamp(1.25rem, 4vw, 3rem)`.
- Section padding: `clamp(4rem, 8vw, 7rem)`.
- Header height: 76 px; sticky with a translucent ivory surface and a hairline that appears after the top sentinel leaves.
- Breakpoints: 480, 640, 760, 860, 900, 960, 1024, 1200. Layouts are mobile-first and tested at 375, 768, 1024 and 1440.
- Radii: 6 px controls, 10 px panels, 16 px media/feature panels. The arch is the only large, expressive radius.
- No horizontal overflow at the tested widths, including at 200% text enlargement on the homepage.

## 6. The arch and the stage

The crest’s arch is reused as:

- the hero and story 3D stages,
- the doctor’s portrait substitute,
- a nested hairline inside each stage.

Stage construction:

- Sand gradient surface, ivory highlight at the top, deeper sand at the base.
- A 1 px terracotta inset arch outline.
- A soft floor shadow (hero and implant; removed in the story because the crown illustration floats above a prepared tooth).
- A transparent WebGL canvas above the surface, with a composed still underneath until the first frame renders.
- Meaningful labels and descriptions always live outside the canvas, in HTML.

## 7. Components

- **Header:** crest + wordmark, four primary links, visible Reduce motion control, responsive disclosure menu.
- **Buttons:** 48 px primary/secondary, 6 px radius, tactile 1 px press, deep terracotta primary.
- **Text links:** underline offset, 44 px minimum height for standalone links, arrow icon with a 3 px hover shift.
- **Chapter buttons:** segmented pill-like controls with numbered labels; selected state is deep terracotta with ivory text; pressed state is explicit.
- **Stage tools:** 44 px controls; pressed state charcoal with ivory text; disabled state reduces opacity and never pretends to work.
- **Stepper:** vertical stage list on the left, white panel on the right; active row uses sand-soft and deep terracotta text.
- **Concern selector:** pill tabs with charcoal selected state; the panel pairs a plain explanation with a questions card.
- **FAQ:** native `details`/`summary`, 56 px summary rows, plus/minus mark, no JavaScript dependency.
- **Treatment page:** sticky-free “On this page” aside, five ruled sections with a label column, then FAQs, related care and enquiry.
- **Footer:** charcoal surface, crest, tagline, clinic status, route/treatment links, privacy.
- **Notices:** 3 px terracotta left rule and sand-soft surface for contextual warnings, never for essential contact actions.

## 8. Interaction and motion

- Native scrolling is preserved everywhere. One bounded ScrollTrigger pin exists on desktop only (1024 px+, motion allowed), 180% of viewport height, with direct chapter buttons and a skip link.
- No scroll hijacking, no horizontal scroll, no scroll cues.
- Hero pointer response is limited to fine pointers and affects only rotation and a key light; it never blocks scrolling.
- Rendering is demand driven: the loop stops when the scene is settled, offscreen, or the tab is hidden.
- GSAP is loaded only for the desktop story and only when the story is near the viewport.
- Motion is motivated: entrance establishes depth; chapter transitions show the change of subject; hover/focus/press provide state feedback.
- Reduced motion removes the pin and swaps every 3D stage for a composed still. The preference is initialised from the OS, can be overridden with the visible control, and is persisted.
- Fallback states preserve content and controls: chapter selection, assembled/exploded views, treatment links, and honest captions.

## 9. 3D direction

- Original, non-graphic, warm ivory models. No anatomical gore, no clinical photography.
- Molar: generated once from a signed field of overlapping spheres with Three.js `MarchingCubes`, baked to a compact geometry, then rendered with a satin physical material.
- Crown: a turned lathe profile with cusp lobes and a sand margin, shown above a prepared abutment tooth in the story.
- Implant: threaded fixture, hexagonal connector and crown as separate groups, reusable in the story and the explorer.
- Studio lighting from warm procedural environment reflections, a key, a terracotta fill and a rim.
- Labels for Crown / Connector / Implant are HTML, not canvas text.
- All models are illustrations and are labelled as such; none imply clinical photography.

## 10. Accessibility embedded in the design

- 44 × 44 CSS px minimum for controls.
- Visible 2 px focus ring with 3 px offset, switched to a light peach on charcoal.
- Colour is never the only signal: selected chapters have a filled background and `aria-selected`, step rows have a tinted background and `aria-selected`, the motion toggle has text/state.
- Content is readable before JavaScript: all panels are in HTML, the FAQ is native, navigation remains visible without JavaScript.
- The shortcuts (skip link, direct chapter controls, skip animation) are visible rather than hidden behind gestures.
- The design avoids hiding essential content behind hover-only states.

## 11. Voice

- Calm, specific, second person where it helps, no jargon without explanation.
- "We" is used sparingly; the clinic does not claim outcomes.
- Honest prelaunch language: “Opening in Hyderabad.” and “not published yet” rather than placeholder actions.
- Claims are either verified and supplied, or omitted. The words "best", "painless", "guaranteed", "pioneering" and numerical outcome claims are not used.

## 12. Intentionally not done

- No stock or generated photography of people or clinics.
- No testimonial or review section without authentic, attributable material.
- No three-equal-card feature row.
- No decorative blobs, glassmorphism, neon, AI-purple gradients, or scroll-hijacking.
- No deep navigation or extra service claims beyond the supplied care areas.

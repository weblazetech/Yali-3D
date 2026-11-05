# Design system: Yali Dental Clinic

This is the implemented design system, not an aspirational one. Values match `src/styles/global.css`.

## 1. Design read

A family dental clinic for prospective patients in Hyderabad, in a warm editorial register. Trust first, calm and specific copy, cinematic but restrained motion. The guardian crest is the identity; the 3D tooth is a supporting illustration, never the source of essential information.

- Variance: moderate. Asymmetric editorial blocks, a wide hero headline, but no loud patterns.
- Motion: restrained. One pointer-reactive hero, one bounded scroll sequence, short chapter transitions.
- Density: low. Generous section spacing, readable line lengths, information grouped into rules rather than cards.
- Palette: warm beige ground, crest red for action and weight, gold reserved for the crest and the footer.

## 2. Brand source

- The crest composition and tagline come from `YALI BRANDING.pdf`; the active red/gold crest artwork was supplied separately on 31 October 2026.
- Crest extracted from the supplied 2000 px artwork with the beige ground removed, stored as transparent PNG (`public/images/yali-crest-128.png` for the interface, `yali-crest-640.png` for social metadata).
- Exact tagline preserved: **“Guardians of Your Smile.”**
- The rounded arch of the crest becomes the site’s image and 3D-stage motif.
- This palette supersedes the ivory/sand/terracotta tokens listed in `PLAN.md`; the plan and PDF remain intact as source material.

## 3. Color

| Token | Value | Role |
|---|---|---|
| `--ivory` | `#ECE4D9` | Main background (warm beige) |
| `--sand` | `#E3D7C8` | Supporting surfaces, stage |
| `--crest-red` / `--terracotta` | `#B02A1F` | Crest red; decorative marks and large shapes |
| `--gold` | `#FFBE00` | Crest gold; footer labels, tagline and focus on red |
| `--charcoal` | `#332C28` | Body text |
| `--clay` | `#8C1F16` | Buttons, links, focus indicators, functional accent |
| `--clay-deep` | `#7E1B13` | Hover state, footer surface |
| `--clay-soft` | `#F6E3B4` | Gold tint for text selection |
| `--sand-soft` | `#F4ECE1` | Section tint, aside surfaces |
| `--sand-deep` | `#D5C2AE` | Deeper stage edge |
| `--line` / `--line-strong` | `#E1D2C1` / `#D1BDA9` | Hairlines and borders |
| `--white` | `#FBF5EC` | Panels |
| `--ink-muted` | `#5F534A` | Secondary text |
| `--ink-on-dark` | `#F6EBDC` | Text on the red footer |
| `--ink-on-dark-muted` | `#E4CDB7` | Secondary text on the red footer |

Rules:

- Gold is never used for text on the beige ground (1.32:1). It is used on the deep red footer (6.14:1), in the crest artwork, and for focus rings on red.
- Crest red is used for decorative marks, rules and large shapes. Functional links and buttons use deep red, which measures 7.18:1 on the beige ground and 6.38:1 on sand.
- Every background has a tested text colour on it. Key pairs are listed in `docs/REVIEW.md`.
- No gradients on text. Gradients appear only in the stage surface and the enquiry panel, and never carry essential information.
- Deep red is the focus colour on light surfaces. The footer switches focus to gold so the ring remains visible on deep red.
- Pressed red controls on light surfaces use an ink outline so the focus ring never disappears into the button or the beige ground.

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
- Header height: 76 px; sticky with a translucent warm-beige surface and a hairline that appears after the top sentinel leaves.
- Breakpoints: 480, 640, 760, 860, 900, 960, 1024, 1200. Layouts are mobile-first and tested at 375, 768, 1024 and 1440.
- Radii: 6 px controls, 10 px panels, 16 px media/feature panels. The arch is the only large, expressive radius.
- No horizontal overflow at the tested widths, including at 200% text enlargement on the homepage.

## 6. The arch and the stage

The crest’s arch is reused as:

- the hero and story 3D stages,
- the doctor’s portrait substitute,
- a nested hairline inside each stage,
- the red-arch crest inside a cream medallion in the footer.

Stage construction:

- Sand gradient surface, cream highlight at the top, deeper sand at the base.
- A 1 px crest-red inset arch outline.
- A soft floor shadow (hero and implant; removed in the story because the crown illustration floats above a prepared tooth).
- A transparent WebGL canvas above the surface, with a composed still underneath until the first frame renders.
- Meaningful labels and descriptions always live outside the canvas, in HTML.

## 7. Components

- **Header:** crest + wordmark, four primary links, visible Reduce motion control, responsive disclosure menu.
- **Buttons:** 48 px primary/secondary, 6 px radius, tactile 1 px press, deep-red primary with cream text.
- **Text links:** underline offset, 44 px minimum height for standalone links, arrow icon with a 3 px hover shift.
- **Chapter buttons:** segmented pill-like controls with numbered labels; selected state is deep red with cream text; pressed state is explicit.
- **Stage tools:** 44 px controls; pressed state deep red with cream text; disabled state reduces opacity and never pretends to work.
- **Stepper:** vertical stage list on the left, cream panel on the right; active row uses sand-soft and deep-red text.
- **Concern selector:** pill tabs; selected state is deep red with cream text; the panel pairs a plain explanation with a questions card.
- **FAQ:** native `details`/`summary`, 56 px summary rows, plus/minus mark, no JavaScript dependency.
- **Treatment page:** sticky-free “On this page” aside, five ruled sections with a label column, then FAQs, related care and enquiry.
- **Footer:** deep-red surface with a 2 px gold top rule, cream crest medallion, gold tagline and column labels, cream links, clinic status, privacy.
- **Notices:** 3 px crest-red left rule and sand-soft surface for contextual warnings, never for essential contact actions.

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
- Studio lighting from warm procedural environment reflections, a key, a warm fill and a rim.
- Labels for Crown / Connector / Implant are HTML, not canvas text.
- All models are illustrations and are labelled as such; none imply clinical photography.

## 10. Accessibility embedded in the design

- 44 × 44 CSS px minimum for controls.
- Visible 2 px focus ring with 3 px offset: deep red on light surfaces, gold on the red footer.
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

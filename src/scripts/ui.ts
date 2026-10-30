/**
 * Shared interface behaviour: header state, mobile navigation, the reduce
 * motion control and restrained scroll reveals.
 *
 * All behaviour is progressive enhancement. Without JavaScript the navigation
 * stays visible, the FAQ uses native details/summary, and every selector shows
 * its content in ordinary HTML.
 */

const root = document.documentElement;
const motionToggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const primaryNav = document.querySelector<HTMLElement>('[data-primary-nav]');
const header = document.querySelector<HTMLElement>('[data-site-header]');
const M0TION_KEY = 'yali-motion';

function currentMotion(): 'reduced' | 'full' {
  return root.dataset.motion === 'reduced' ? 'reduced' : 'full';
}

function renderMotionToggle(): void {
  if (!motionToggle) return;
  const reduced = currentMotion() === 'reduced';
  motionToggle.setAttribute('aria-pressed', String(reduced));
  const state = motionToggle.querySelector<HTMLElement>('[data-motion-state]');
  if (state) state.textContent = reduced ? 'On' : 'Off';
}

function announceMotion(motion: 'reduced' | 'full'): void {
  window.dispatchEvent(new CustomEvent('yali:motionchange', { detail: { motion } }));
}

function setMotion(motion: 'reduced' | 'full', persist: boolean): void {
  root.dataset.motion = motion;
  if (persist) {
    try {
      window.localStorage.setItem(M0TION_KEY, motion);
    } catch {
      /* Storage can be unavailable; the choice still applies to this page. */
    }
  }
  renderMotionToggle();
  announceMotion(motion);
}

motionToggle?.addEventListener('click', () => {
  setMotion(currentMotion() === 'reduced' ? 'full' : 'reduced', true);
});

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
reducedMotionQuery.addEventListener('change', (event) => {
  let hasExplicitChoice = false;
  try {
    hasExplicitChoice = Boolean(window.localStorage.getItem(M0TION_KEY));
  } catch {
    hasExplicitChoice = false;
  }
  if (hasExplicitChoice) return;
  setMotion(event.matches ? 'reduced' : 'full', false);
});

renderMotionToggle();

/* Header state: a 1px sentinel instead of a scroll listener. */
const sentinel = document.querySelector<HTMLElement>('.top-sentinel');
if (sentinel && header) {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      header.dataset.stuck = entry && !entry.isIntersecting ? 'true' : 'false';
    },
    { rootMargin: '-1px 0px 0px 0px', threshold: 0 },
  );
  observer.observe(sentinel);
}

/* Mobile navigation. */
function closeMenu(returnFocus = false): void {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  primaryNav.removeAttribute('data-open');
  if (returnFocus) menuToggle.focus();
}

function openMenu(): void {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute('aria-expanded', 'true');
  primaryNav.setAttribute('data-open', 'true');
  const firstLink = primaryNav.querySelector<HTMLAnchorElement>('a');
  firstLink?.focus();
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) closeMenu();
  else openMenu();
});

primaryNav?.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  if (target?.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }
});

const desktopQuery = window.matchMedia('(min-width: 900px)');
desktopQuery.addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

/* Restrained reveals: armed only below the fold, never hiding content on load. */
const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
if (revealItems.length > 0 && currentMotion() === 'full' && 'IntersectionObserver' in window) {
  const viewport = window.innerHeight;
  const pending = revealItems.filter((item) => item.getBoundingClientRect().top > viewport * 0.82);
  for (const item of pending) {
    item.dataset.revealArmed = 'true';
  }

  if (pending.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    for (const item of pending) revealObserver.observe(item);
  }
}

export {};

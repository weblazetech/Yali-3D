/**
 * Treatment story: three directly selectable chapters with a bounded desktop
 * scroll sequence. Chapters work as ordinary buttons; the scroll sequence is an
 * enhancement created only on wide screens with motion allowed.
 */

function initStory(): void {
  const storyEl = document.querySelector<HTMLElement>('[data-story]');
  if (!storyEl) return;
  const storyRootElement: HTMLElement = storyEl;
  const statusRegion = storyEl.querySelector<HTMLElement>('[data-story-status]');
  if (!statusRegion) return;

  const buttons = Array.from(storyEl.querySelectorAll<HTMLButtonElement>('[data-chapter]'));
  const panels = Array.from(storyEl.querySelectorAll<HTMLElement>('[data-story-panel]'));
  const stills = Array.from(storyEl.querySelectorAll<HTMLImageElement>('[data-story-img]'));
  const chapterList = storyEl.querySelector<HTMLElement>('[data-story-chapters]');
  const pinTarget = storyEl.querySelector<HTMLElement>('[data-story-pin]');
  const skipLink = storyEl.querySelector<HTMLAnchorElement>('[data-story-skip]');

  if (buttons.length !== 3 || panels.length !== 3) return;

  storyEl.dataset.enhanced = 'true';
  chapterList?.setAttribute('role', 'tablist');
  chapterList?.setAttribute('aria-label', 'Treatment story chapters');

  buttons.forEach((button, index) => {
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `story-panel-${index}`);
    const panel = panels[index];
    if (panel) {
      panel.id = `story-panel-${index}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', button.id);
      panel.setAttribute('tabindex', '0');
    }
  });

  const chapterNames = buttons.map((button) =>
    (button.querySelector('.chapter__label')?.textContent ?? button.textContent ?? '').trim(),
  );

  interface ScrollTriggerLike {
    start: number;
    end: number;
    kill: () => void;
    refresh: () => void;
  }

  let currentScrollTrigger: ScrollTriggerLike | null = null;
  let killSequence: (() => void) | null = null;
  let sequenceLoaded = false;
  let sequenceLoading = false;
  let destroyed = false;
  let scrollLock: number | null = null;

  const setChapter = (index: number, announce = true): void => {
    const selected = Math.max(0, Math.min(buttons.length - 1, index));
    const focusedElement = document.activeElement;
    const activePanel = panels[selected];

    buttons.forEach((button, buttonIndex) => {
      const active = buttonIndex === selected;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== selected;
    });
    stills.forEach((still, stillIndex) => {
      still.hidden = stillIndex !== selected;
    });
    storyEl.dataset.activeChapter = String(selected);

    if (
      focusedElement instanceof HTMLElement &&
      activePanel &&
      !activePanel.contains(focusedElement) &&
      panels.some((panel) => panel !== activePanel && panel.contains(focusedElement))
    ) {
      buttons[selected]?.focus({ preventScroll: true });
    }

    if (announce) {
      statusRegion.textContent = `Chapter ${selected + 1} of ${buttons.length}: ${chapterNames[selected] ?? ''}`;
    }
    storyEl.dispatchEvent(
      new CustomEvent('yali:story-chapter', { bubbles: true, detail: { index: selected } }),
    );
  };

  const initial = Number.parseInt(storyEl.dataset.activeChapter ?? '0', 10);
  setChapter(Number.isNaN(initial) ? 0 : initial, false);

  const scrollToChapter = (index: number): void => {
    const trigger = currentScrollTrigger;
    if (!trigger) {
      setChapter(index);
      return;
    }
    const range = trigger.end - trigger.start;
    const targetY = Math.round(trigger.start + range * ((index + 0.5) / buttons.length));
    const reduced = document.documentElement.dataset.motion === 'reduced';
    scrollLock = index;
    setChapter(index);
    window.scrollTo({ top: Math.max(0, targetY), behavior: reduced ? 'auto' : 'smooth' });
    window.setTimeout(() => {
      if (scrollLock === index) scrollLock = null;
    }, 1400);
  };

  const selectChapter = (index: number): void => {
    if (currentScrollTrigger) scrollToChapter(index);
    else setChapter(index);
  };

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => selectChapter(index));
  });

  chapterList?.addEventListener('keydown', (event) => {
    const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex === -1) return;
    let next = currentIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (currentIndex + 1) % buttons.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (currentIndex - 1 + buttons.length) % buttons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else return;
    event.preventDefault();
    buttons[next]?.focus();
    selectChapter(next);
  });

  skipLink?.addEventListener('click', (event) => {
    const target = document.getElementById('treatment-links');
    if (!target) return;
    event.preventDefault();
    const top = window.scrollY + target.getBoundingClientRect().top - headerOffset() - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    history.replaceState(null, '', '#treatment-links');
    target.focus({ preventScroll: true });
  });

  const headerOffset = (): number => {
    const header = document.querySelector<HTMLElement>('[data-site-header]');
    return header ? Math.round(header.getBoundingClientRect().height) : 76;
  };

  const media = window.matchMedia('(min-width: 1024px)');

  async function setupScrollSequence(): Promise<void> {
    if (sequenceLoaded || sequenceLoading || destroyed || !pinTarget) return;
    if (document.documentElement.dataset.motion === 'reduced') return;
    if (!media.matches) return;
    sequenceLoading = true;
    try {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (destroyed) return;
      gsap.registerPlugin(ScrollTrigger);
      sequenceLoaded = true;

      const context = gsap.context(() => {
        const trigger = ScrollTrigger.create({
          trigger: pinTarget,
          start: `top top+=${headerOffset()}`,
          end: '+=180%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(buttons.length - 1, Math.floor(self.progress * buttons.length));
            if (scrollLock !== null) {
              if (index === scrollLock) scrollLock = null;
              return;
            }
            if (storyRootElement.dataset.activeChapter !== String(index)) {
              setChapter(index);
            }
          },
        });
        currentScrollTrigger = trigger as unknown as ScrollTriggerLike;
      }, storyRootElement);

      killSequence = () => {
        context.revert();
        currentScrollTrigger = null;
      };
    } catch (error) {
      console.warn('Scroll sequence unavailable. Chapter buttons remain usable.', error);
    } finally {
      sequenceLoading = false;
    }
  }

  const teardownScrollSequence = (): void => {
    killSequence?.();
    killSequence = null;
    sequenceLoaded = false;
  };

  const refreshCapability = (): void => {
    const reduced = document.documentElement.dataset.motion === 'reduced';
    if (reduced || !media.matches) teardownScrollSequence();
    else void setupScrollSequence();
  };

  refreshCapability();
  media.addEventListener('change', refreshCapability);
  window.addEventListener('yali:motionchange', refreshCapability);
  window.addEventListener('pagehide', () => {
    destroyed = true;
    teardownScrollSequence();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        refreshCapability();
      }
    },
    { rootMargin: '150% 0px' },
  );
  observer.observe(storyEl);
}

initStory();

export {};

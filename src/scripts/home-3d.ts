/**
 * Homepage 3D coordinator.
 *
 * Both scenes share one Three.js module chunk, but only one WebGL canvas may be
 * active at a time. The scene in view owns the canvas; the other stage keeps its
 * composed still illustration. Rigidity is deliberate: 3D is never required to
 * read the page.
 */

import type { HeroSceneHandle, StorySceneHandle } from './three/scenes';

type ScenesModule = typeof import('./three/scenes');
type StageKind = 'hero' | 'story';

const root = document.documentElement;
const heroStage = document.querySelector<HTMLElement>('[data-hero-stage]');
const storyStage = document.querySelector<HTMLElement>('[data-story-stage]');
const storyRoot = document.querySelector<HTMLElement>('[data-story]');
const heroCanvasHost = document.querySelector<HTMLElement>('[data-hero-canvas]');
const storyCanvasHost = document.querySelector<HTMLElement>('[data-story-canvas]');
const heroCaptionNote = document.querySelector<HTMLElement>('[data-hero-caption-note]');
const storyCaptionNote = document.querySelector<HTMLElement>('[data-story-caption-note]');

if (heroStage && storyStage && heroCanvasHost && storyCanvasHost) {
  let heroScene: HeroSceneHandle | null = null;
  let storyScene: StorySceneHandle | null = null;
  let activeStage: StageKind | null = null;
  let modulePromise: Promise<ScenesModule> | null = null;
  let failed = false;
  let activationToken = 0;
  let reduced = root.dataset.motion === 'reduced';

  const supportsWebGL2 = (): boolean => {
    try {
      return Boolean(document.createElement('canvas').getContext('webgl2'));
    } catch {
      return false;
    }
  };

  const setCaption = (note: string): void => {
    if (heroCaptionNote) heroCaptionNote.textContent = note;
    if (storyCaptionNote) storyCaptionNote.textContent = note;
  };

  const defaultNote = (): void => {
    if (reduced) {
      setCaption('Still illustration shown because reduced motion is on. The 3D scenes stay off.');
    } else if (failed) {
      setCaption('Still illustration shown because the interactive model could not load in this browser.');
    } else {
      setCaption('Original 3D illustration. Move your cursor across the stage to shift the angle and light.');
    }
  };

  const markReady = (stage: HTMLElement): void => {
    stage.dataset.rendered = 'true';
  };

  const loadModule = (): Promise<ScenesModule> => {
    modulePromise ??= import('./three/scenes');
    return modulePromise;
  };

  const disposeStage = (kind: StageKind): void => {
    if (kind === 'hero') {
      heroScene?.dispose();
      heroScene = null;
      delete heroStage.dataset.rendered;
    } else {
      storyScene?.dispose();
      storyScene = null;
      delete storyStage.dataset.rendered;
    }
    if (activeStage === kind) activeStage = null;
  };

  const fail = (reason: 'webgl' | 'error'): void => {
    failed = true;
    disposeStage('hero');
    disposeStage('story');
    activationToken += 1;
    if (reason === 'webgl') {
      setCaption('Still illustration shown because this browser does not provide WebGL 2.');
    } else {
      setCaption('Still illustration shown because the interactive model could not load.');
    }
  };

  const activate = async (kind: StageKind): Promise<void> => {
    if (reduced || failed) return;
    if (kind === 'hero' && heroScene) {
      activeStage = 'hero';
      return;
    }
    if (kind === 'story' && storyScene) {
      activeStage = 'story';
      return;
    }

    const token = ++activationToken;
    if (!supportsWebGL2()) {
      fail('webgl');
      return;
    }

    disposeStage(kind === 'hero' ? 'story' : 'hero');
    activeStage = kind;

    try {
      const module = await loadModule();
      if (token !== activationToken || reduced || failed) return;

      if (kind === 'hero') {
        heroScene = module.createHeroScene(heroCanvasHost, heroStage, {
          onReady: () => markReady(heroStage),
          onError: () => fail('error'),
        });
      } else {
        const initial = Number.parseInt(storyRoot?.dataset.activeChapter ?? '0', 10);
        storyScene = module.createStoryScene(
          storyCanvasHost,
          {
            onReady: () => markReady(storyStage),
            onError: () => fail('error'),
          },
          Number.isNaN(initial) ? 0 : initial,
        );
      }
    } catch (error) {
      console.warn('Interactive 3D unavailable, keeping the still illustration.', error);
      fail('error');
    }
  };

  const visibleStages = new Set<StageKind>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const kind: StageKind = entry.target === heroStage ? 'hero' : 'story';
        if (entry.isIntersecting) {
          visibleStages.add(kind);
          if (!reduced && !failed) void activate(kind);
        } else {
          visibleStages.delete(kind);
          if (activeStage === kind) disposeStage(kind);
        }
      }
    },
    { threshold: 0.04 },
  );

  observer.observe(heroStage);
  observer.observe(storyStage);

  document.addEventListener('yali:story-chapter', (event) => {
    const detail = (event as CustomEvent<{ index?: number }>).detail;
    if (typeof detail?.index === 'number') storyScene?.setChapter(detail.index);
  });

  window.addEventListener('yali:motionchange', (event) => {
    const detail = (event as CustomEvent<{ motion?: string }>).detail;
    reduced = detail?.motion === 'reduced';
    if (reduced) {
      activationToken += 1;
      disposeStage('hero');
      disposeStage('story');
    }
    defaultNote();
    if (!reduced && !failed) {
      if (visibleStages.has('hero')) void activate('hero');
      else if (visibleStages.has('story')) void activate('story');
    }
  });

  defaultNote();
}

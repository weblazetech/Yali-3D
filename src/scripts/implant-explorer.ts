/**
 * Implant explorer controls.
 *
 * The illustration works without WebGL: the crown, connector and fixture are
 * separate HTML <img> layers that can be assembled or separated with CSS. When
 * WebGL 2 is available and motion is allowed, a Three.js scene replaces the
 * still composition and takes over the same controls.
 */

type MotionState = 'reduced' | 'full';

interface ImplantHandle {
  setExploded(value: boolean): void;
  setRotating(value: boolean): void;
  reset(): void;
  dispose(): void;
}

const root = document.documentElement;
const stage = document.querySelector<HTMLElement>('[data-implant-stage]');
const canvasHost = document.querySelector<HTMLElement>('[data-implant-canvas]');
const rotateButton = document.querySelector<HTMLButtonElement>('[data-implant-rotate]');
const viewButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-implant-view]'));
const resetButton = document.querySelector<HTMLButtonElement>('[data-implant-reset]');
const hint = document.querySelector<HTMLElement>('[data-implant-hint]');

if (stage && canvasHost && rotateButton && resetButton && viewButtons.length > 0) {
  let exploded = false;
  let rotating = false;
  let handle: ImplantHandle | null = null;
  let loading = false;
  let fallbackReason: 'motion' | 'webgl' | 'error' | null = null;

  const supportsWebGL2 = (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      return Boolean(canvas.getContext('webgl2'));
    } catch {
      return false;
    }
  };

  const setHint = (message: string): void => {
    if (hint) hint.textContent = message;
  };

  const renderState = (): void => {
    viewButtons.forEach((button) => {
      const isAssembled = button.dataset.implantView === 'assembled';
      button.setAttribute('aria-pressed', String(isAssembled ? !exploded : exploded));
    });
    rotateButton.setAttribute('aria-pressed', String(rotating));
    stage.dataset.exploded = String(exploded);

    if (!handle) {
      if (fallbackReason === 'webgl') {
        setHint(
          `${exploded ? 'Exploded' : 'Assembled'} view. Rotation needs WebGL, which this browser does not provide. The still illustration still shows both views.`,
        );
      } else if (fallbackReason === 'motion') {
        setHint(`${exploded ? 'Exploded' : 'Assembled'} view shown as a still illustration because reduced motion is on.`);
      } else if (fallbackReason === 'error') {
        setHint(
          `${exploded ? 'Exploded' : 'Assembled'} view shown as a still illustration because the 3D scene could not load.`,
        );
      } else {
        setHint('Assembled view. Illustration only, not to scale.');
      }
      rotateButton.disabled = true;
      return;
    }

    rotateButton.disabled = false;
    setHint(
      `${exploded ? 'Exploded' : 'Assembled'} view. Illustration only, not to scale.${rotating ? ' The model is rotating.' : ''}`,
    );
  };

  const setRotating = (value: boolean): void => {
    rotating = value;
    handle?.setRotating(value);
    renderState();
  };

  const setExploded = (value: boolean): void => {
    exploded = value;
    handle?.setExploded(value);
    renderState();
  };

  const disposeScene = (): void => {
    handle?.dispose();
    handle = null;
    stage.dataset.rendered = 'false';
    canvasHost.replaceChildren();
  };

  const teardown = (reason: 'motion' | 'webgl' | 'error'): void => {
    disposeScene();
    fallbackReason = reason;
    rotating = false;
    rotateButton.setAttribute('aria-pressed', 'false');
    renderState();
  };

  const mount = async (): Promise<void> => {
    if (handle || loading) return;
    if (root.dataset.motion === 'reduced') {
      teardown('motion');
      return;
    }
    if (!supportsWebGL2()) {
      teardown('webgl');
      return;
    }

    loading = true;
    try {
      const module = await import('./three/implant-scene');
      if (!module.isWebGLAvailable()) {
        teardown('webgl');
        return;
      }
      const created = await module.createImplantScene(canvasHost, {
        exploded,
        rotating,
        onReady: () => {
          stage.dataset.rendered = 'true';
        },
      });
      handle = created;
      fallbackReason = null;
      renderState();
    } catch (error) {
      console.warn('Implant 3D scene unavailable, keeping the still illustration.', error);
      teardown('error');
    } finally {
      loading = false;
    }
  };

  rotateButton.addEventListener('click', () => {
    setRotating(!rotating);
  });

  viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setExploded(button.dataset.implantView === 'exploded');
    });
  });

  resetButton.addEventListener('click', () => {
    setRotating(false);
    setExploded(false);
    handle?.reset();
  });

  window.addEventListener('yali:motionchange', (event) => {
    const detail = (event as CustomEvent<{ motion: MotionState }>).detail;
    if (detail.motion === 'reduced') {
      teardown('motion');
    } else {
      fallbackReason = null;
      void mount();
    }
  });

  let mounted = false;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || mounted) continue;
        mounted = true;
        observer.disconnect();
        void mount();
      }
    },
    { rootMargin: '200px 0px' },
  );
  observer.observe(stage);

  renderState();
}

export {};

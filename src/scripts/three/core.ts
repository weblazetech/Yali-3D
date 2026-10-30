import * as THREE from 'three';

/**
 * Shared Three.js infrastructure.
 *
 * Rendering is demand driven: a new frame is requested by interaction or by an
 * active transition, and the loop stops as soon as nothing is moving. Frames are
 * skipped while the scene is offscreen or the tab is hidden, and every listener,
 * observer and GPU resource is released by dispose().
 */

export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

export interface ViewerCallbacks {
  /** Return true while more frames are needed. */
  update: (deltaSeconds: number, elapsedSeconds: number) => boolean;
  onReady?: () => void;
  onError?: () => void;
}

export class Viewer {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;

  private readonly container: HTMLElement;
  private readonly callbacks: ViewerCallbacks;
  private readonly resizeObserver: ResizeObserver;
  private readonly intersectionObserver: IntersectionObserver;
  private readonly cleanups: Array<() => void> = [];
  private raf = 0;
  private lastTime = 0;
  private isVisible = false;
  private isReady = false;
  private disposed = false;
  private contextLost = false;

  constructor(
    container: HTMLElement,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    callbacks: ViewerCallbacks,
  ) {
    this.container = container;
    this.scene = scene;
    this.camera = camera;
    this.callbacks = callbacks;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const canvas = this.renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.display = 'block';
    container.replaceChildren(canvas);

    const onContextLost = (event: Event): void => {
      event.preventDefault();
      this.contextLost = true;
      this.stop();
      this.callbacks.onError?.();
    };
    canvas.addEventListener('webglcontextlost', onContextLost, false);
    this.cleanups.push(() => canvas.removeEventListener('webglcontextlost', onContextLost, false));

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        this.isVisible = Boolean(entry?.isIntersecting);
        if (this.isVisible) this.requestRender();
      },
      { threshold: 0.01, rootMargin: '80px 0px' },
    );
    this.intersectionObserver.observe(container);

    const onVisibilityChange = (): void => {
      if (!document.hidden) this.requestRender();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    this.cleanups.push(() => document.removeEventListener('visibilitychange', onVisibilityChange));
    this.cleanups.push(() => this.resizeObserver.disconnect());
    this.cleanups.push(() => this.intersectionObserver.disconnect());

    this.resize();
    this.requestRender();
  }

  private frame = (time: number): void => {
    this.raf = 0;
    if (this.disposed || this.contextLost || !this.isVisible || document.hidden) return;
    if (this.lastTime === 0) this.lastTime = time;
    const delta = Math.min(Math.max((time - this.lastTime) / 1000, 0), 0.05);
    this.lastTime = time;
    const keepAnimating = this.callbacks.update(delta, time / 1000);
    this.renderer.render(this.scene, this.camera);
    if (!this.isReady) {
      this.isReady = true;
      this.callbacks.onReady?.();
    }
    if (keepAnimating) {
      this.raf = requestAnimationFrame(this.frame);
    }
  };

  requestRender(): void {
    if (this.disposed || this.contextLost || this.raf !== 0) return;
    if (!this.isVisible || document.hidden) return;
    this.lastTime = 0;
    this.raf = requestAnimationFrame(this.frame);
  }

  private resize(): void {
    if (this.disposed) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.requestRender();
  }

  addCleanup(fn: () => void): void {
    this.cleanups.push(fn);
  }

  stop(): void {
    if (this.raf !== 0) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    for (const cleanup of this.cleanups.splice(0)) {
      try {
        cleanup();
      } catch {
        /* Cleanup must never prevent the remaining resources from being released. */
      }
    }
    disposeSceneResources(this.scene);
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}

export function disposeSceneResources(scene: THREE.Scene): void {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  if (scene.environment) textures.add(scene.environment);
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    const materialList = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materialList) {
      materials.add(material);
      for (const value of Object.values(material)) {
        if (value instanceof THREE.Texture) textures.add(value);
      }
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) texture.dispose();
}

/**
 * A soft studio environment built from a canvas gradient. It gives the satin
 * enamel and titanium a warm reflection without shipping an HDR file.
 */
function createEnvironment(scene: THREE.Scene): void {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return;

  const sky = context.createLinearGradient(0, 0, 0, 256);
  sky.addColorStop(0, '#fffdf8');
  sky.addColorStop(0.38, '#f6e9dc');
  sky.addColorStop(0.55, '#e3d1c0');
  sky.addColorStop(0.78, '#c7a892');
  sky.addColorStop(1, '#9a6e5a');
  context.fillStyle = sky;
  context.fillRect(0, 0, 512, 256);

  const glow = context.createRadialGradient(150, 58, 4, 150, 58, 130);
  glow.addColorStop(0, 'rgba(255, 253, 247, 0.98)');
  glow.addColorStop(1, 'rgba(255, 253, 247, 0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, 512, 256);

  const shade = context.createRadialGradient(430, 190, 10, 430, 190, 190);
  shade.addColorStop(0, 'rgba(133, 68, 49, 0.5)');
  shade.addColorStop(1, 'rgba(133, 68, 49, 0)');
  context.fillStyle = shade;
  context.fillRect(0, 0, 512, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.environment = texture;
  scene.environmentIntensity = 0.55;
}

export function createStageLights(scene: THREE.Scene): void {
  createEnvironment(scene);

  const hemisphere = new THREE.HemisphereLight(0xfff6ec, 0xd9c2ae, 0.7);
  scene.add(hemisphere);

  const key = new THREE.DirectionalLight(0xfff0de, 2.2);
  key.position.set(3.2, 4.4, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xc9866a, 0.7);
  fill.position.set(-4.2, 0.8, 2.4);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xfff7ea, 1.5);
  rim.position.set(-0.6, 2.2, -4.5);
  scene.add(rim);
}

export function createCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(0, 0.25, 6.6);
  camera.lookAt(0, -0.05, 0);
  return camera;
}

export const easeOutCubic = (value: number): number => 1 - Math.pow(1 - value, 3);
export const easeInOutCubic = (value: number): number =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
export const damp = (current: number, target: number, lambda: number, delta: number): number =>
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * delta));
export const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

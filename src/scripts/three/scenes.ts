import * as THREE from 'three';
import { Viewer, createCamera, createStageLights, isWebGLAvailable } from './core';
import { createCrown, createImplant, createMolar, createMaterials, createPreparedTooth } from './models';

export { isWebGLAvailable };

interface SceneEvents {
  onReady?: () => void;
  onError?: () => void;
}

interface ShellOptions {
  cameraZ: number;
  cameraY?: number;
  lookAtY?: number;
}

function createSceneShell(events: SceneEvents, options: ShellOptions) {
  const scene = new THREE.Scene();
  createStageLights(scene);
  const camera = createCamera();
  camera.position.set(0, options.cameraY ?? 0.2, options.cameraZ);
  camera.lookAt(0, options.lookAtY ?? 0, 0);
  return { scene, camera, ...events };
}

export interface HeroSceneHandle {
  dispose: () => void;
}

/**
 * Hero molar: brief camera entrance, then restrained pointer-driven changes in
 * angle and lighting. Rendering stops once the pointer settles.
 */
export function createHeroScene(
  container: HTMLElement,
  interactionTarget: HTMLElement | null,
  events: SceneEvents,
): HeroSceneHandle {
  const { scene, camera } = createSceneShell(events, { cameraZ: 7.15, cameraY: 1.05, lookAtY: -0.05 });
  const models = createMaterials();
  const molar = createMolar(models);
  molar.scale.setScalar(1.0);
  scene.add(molar);

  const keyLight = scene.children.find(
    (child): child is THREE.DirectionalLight => child instanceof THREE.DirectionalLight,
  );
  const keyBase = keyLight ? keyLight.position.clone() : new THREE.Vector3(3.2, 4.4, 5);

  const startedAt = performance.now();
  let pointerTargetX = 0;
  let pointerTargetY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let entrance = 0;

  const viewer = new Viewer(container, scene, camera, {
    onReady: events.onReady,
    onError: events.onError,
    update: (delta) => {
      entrance = Math.min(1, (performance.now() - startedAt) / 1500);
      const eased = 1 - Math.pow(1 - entrance, 3);
      pointerX = THREE.MathUtils.lerp(pointerX, pointerTargetX, 1 - Math.exp(-5 * delta));
      pointerY = THREE.MathUtils.lerp(pointerY, pointerTargetY, 1 - Math.exp(-5 * delta));

      molar.rotation.y = -0.42 + eased * 0.3 + pointerX * 0.3;
      molar.rotation.x = 0.02 + pointerY * 0.14;
      molar.position.y = (1 - eased) * -0.18;
      molar.scale.setScalar(0.92 + eased * 0.1);
      camera.position.z = 7.8 - eased * 0.65;
      camera.position.y = 1.05 + pointerY * 0.14;

      if (keyLight) {
        keyLight.position.set(keyBase.x + pointerX * 1.1, keyBase.y + pointerY * 0.6, keyBase.z);
      }

      const pointerSettled =
        Math.abs(pointerX - pointerTargetX) < 0.0015 && Math.abs(pointerY - pointerTargetY) < 0.0015;
      return entrance < 1 || !pointerSettled;
    },
  });

  const target = interactionTarget ?? container;
  const handlePointerMove = (event: PointerEvent): void => {
    const rect = target.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    pointerTargetX = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    pointerTargetY = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    viewer.requestRender();
  };
  const handlePointerLeave = (): void => {
    pointerTargetX = 0;
    pointerTargetY = 0;
    viewer.requestRender();
  };

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    target.addEventListener('pointermove', handlePointerMove, { passive: true });
    target.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    viewer.addCleanup(() => target.removeEventListener('pointermove', handlePointerMove));
    viewer.addCleanup(() => target.removeEventListener('pointerleave', handlePointerLeave));
  }

  molar.rotation.y = -0.42;
  molar.scale.setScalar(0.92);
  return { dispose: () => viewer.dispose() };
}

export interface StorySceneHandle {
  setChapter: (index: number) => void;
  dispose: () => void;
}

/**
 * One scene serves the three scroll chapters. Chapters swap between the molar,
 * the crown and the implant with a short bounded transition.
 */
export function createStoryScene(container: HTMLElement, events: SceneEvents, initialChapter = 0): StorySceneHandle {
  const { scene, camera } = createSceneShell(events, { cameraZ: 6.5, cameraY: 0.35, lookAtY: -0.05 });
  const models = createMaterials();
  const molar = createMolar(models);
  const implant = createImplant(models).root;

  const crownStudy = new THREE.Group();
  const crownCap = createCrown(models);
  crownCap.position.y = 0.42;
  const preparedTooth = createPreparedTooth(models);
  preparedTooth.position.y = -0.62;
  crownStudy.add(crownCap, preparedTooth);
  const crownBounds = new THREE.Box3().setFromObject(crownStudy);
  crownStudy.position.y = -(crownBounds.min.y + crownBounds.max.y) / 2;
  const crownFrame = new THREE.Group();
  crownFrame.add(crownStudy);

  const frames: THREE.Group[] = [molar, crownFrame, implant];
  const baseScales = [1.0, 1.2, 1.12];
  const baseRotation = new THREE.Euler(0, -0.3, 0);

  frames.forEach((frame, index) => {
    frame.visible = false;
    frame.scale.setScalar(baseScales[index] ?? 1);
    scene.add(frame);
  });

  let current = Math.max(0, Math.min(frames.length - 1, initialChapter));
  let target = current;
  let phase: 'idle' | 'out' | 'in' = 'idle';
  let progress = 1;

  const frameAt = (index: number): THREE.Group | undefined => frames[index];
  const scaleAt = (index: number): number => baseScales[index] ?? 1;

  const showFrame = (index: number): void => {
    const frame = frameAt(index);
    if (!frame) return;
    frame.visible = true;
    frame.scale.setScalar(scaleAt(index));
    frame.position.y = 0;
    frame.rotation.set(baseRotation.x, baseRotation.y, baseRotation.z);
  };

  const first = frameAt(current);
  if (first) {
    first.visible = true;
    first.scale.setScalar(scaleAt(current));
    first.rotation.copy(baseRotation);
  }

  const viewer = new Viewer(container, scene, camera, {
    onReady: events.onReady,
    onError: events.onError,
    update: (delta) => {
      if (phase === 'idle') return false;
      const active = frameAt(current);
      progress = Math.min(1, progress + delta * 4);

      if (phase === 'out' && active) {
        const eased = progress;
        active.scale.setScalar(scaleAt(current) * (1 - 0.3 * eased));
        active.position.y = -0.22 * eased;
        active.rotation.y = baseRotation.y + 0.3 * eased;
        if (progress >= 1) {
          active.visible = false;
          current = target;
          phase = 'in';
          progress = 0;
          const next = frameAt(current);
          if (next) {
            next.visible = true;
            next.scale.setScalar(scaleAt(current) * 0.84);
            next.position.y = -0.18;
            next.rotation.set(baseRotation.x, baseRotation.y - 0.32, baseRotation.z);
          }
        }
        return true;
      }

      if (phase === 'in') {
        const next = frameAt(current);
        if (!next) return false;
        const eased = 1 - Math.pow(1 - progress, 3);
        next.scale.setScalar(scaleAt(current) * (0.84 + 0.16 * eased));
        next.position.y = -0.18 * (1 - eased);
        next.rotation.y = baseRotation.y - 0.32 * (1 - eased);
        if (progress >= 1) {
          showFrame(current);
          phase = 'idle';
        }
        return true;
      }

      return false;
    },
  });

  return {
    setChapter: (index: number) => {
      const next = Math.max(0, Math.min(frames.length - 1, index));
      if (next === current && phase === 'idle') return;
      target = next;
      if (phase === 'out') return;
      phase = 'out';
      progress = 0;
      viewer.requestRender();
    },
    dispose: () => viewer.dispose(),
  };
}

export interface ImplantSceneOptions extends SceneEvents {
  exploded: boolean;
  rotating: boolean;
}

export interface ImplantSceneHandle {
  setExploded: (value: boolean) => void;
  setRotating: (value: boolean) => void;
  reset: () => void;
  dispose: () => void;
}

/**
 * Implant explorer scene. Rotation is explicit and never captures scrolling.
 */
export async function createImplantScene(
  container: HTMLElement,
  options: ImplantSceneOptions,
): Promise<ImplantSceneHandle> {
  const { scene, camera } = createSceneShell(options, { cameraZ: 6.25, cameraY: 0.1, lookAtY: 0 });
  const models = createMaterials();
  const implant = createImplant(models);
  scene.add(implant.root);

  let explodedTarget = options.exploded ? 1 : 0;
  let explodedValue = explodedTarget;
  let rotating = options.rotating;
  let rotation = -0.28;

  const viewer = new Viewer(container, scene, camera, {
    onReady: options.onReady,
    onError: options.onError,
    update: (delta) => {
      const explodeSettling = Math.abs(explodedValue - explodedTarget) > 0.002;
      if (explodeSettling) {
        explodedValue = THREE.MathUtils.lerp(explodedValue, explodedTarget, 1 - Math.exp(-7 * delta));
        if (Math.abs(explodedValue - explodedTarget) < 0.002) explodedValue = explodedTarget;
      }

      if (rotating) rotation += delta * 0.45;
      else if (Math.abs(rotation - -0.28) > 0.01) {
        rotation = THREE.MathUtils.lerp(rotation, -0.28, 1 - Math.exp(-4 * delta));
      }
      implant.root.rotation.y = rotation;

      implant.crown.position.y = implant.assembled.crown + explodedValue * 0.58;
      implant.crown.rotation.x = 0.1 + explodedValue * 0.16;
      implant.connector.position.y = implant.assembled.connector + explodedValue * 0.28;
      implant.fixture.position.y = implant.assembled.fixture;

      return rotating || explodeSettling;
    },
  });

  return {
    setExploded: (value: boolean) => {
      explodedTarget = value ? 1 : 0;
      viewer.requestRender();
    },
    setRotating: (value: boolean) => {
      rotating = value;
      viewer.requestRender();
    },
    reset: () => {
      explodedTarget = 0;
      rotating = false;
      viewer.requestRender();
    },
    dispose: () => viewer.dispose(),
  };
}

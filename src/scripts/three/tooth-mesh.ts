import * as THREE from 'three';
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';

/**
 * Original stylised molar generated once from a signed field of overlapping
 * spheres. Marching cubes fuses the crown, cusp lobes and tapered roots into a
 * single smooth, non-graphic enamel surface, which reads better under the satin
 * material than intersecting primitives.
 *
 * The field is built in normalised coordinates and baked into a compact buffer
 * geometry so the marching-cubes working arrays can be released immediately.
 */
function addBall(cubes: MarchingCubes, x: number, y: number, z: number, radius: number): void {
  const strength = 3 * radius * radius;
  cubes.addBall((x + 1) / 2, (y + 1) / 2, (z + 1) / 2, strength, 12);
}

export function createMolarGeometry(resolution = 96): THREE.BufferGeometry {
  const placeholderMaterial = new THREE.MeshBasicMaterial();
  const cubes = new MarchingCubes(resolution, placeholderMaterial, false, false, 160000);
  cubes.isolation = 10;

  // Crown: a broad, softly flattened mass built from overlapping lobes.
  addBall(cubes, 0, 0.4, 0, 0.56);
  addBall(cubes, 0, 0.52, 0, 0.36);
  addBall(cubes, -0.32, 0.38, 0, 0.37);
  addBall(cubes, 0.32, 0.38, 0, 0.37);
  addBall(cubes, 0, 0.1, 0, 0.42);

  // Two tapered roots that begin close together and splay slightly outward.
  for (let index = 0; index <= 11; index += 1) {
    const t = index / 11;
    const radius = 0.21 * (1 - t) + 0.07;
    const y = -0.02 - 0.82 * t;
    addBall(cubes, -0.25 - 0.07 * t, y, 0, radius);
    addBall(cubes, 0.25 + 0.07 * t, y, 0, radius);
  }

  cubes.update();

  const vertexCount = cubes.count;
  const positions = new Float32Array(cubes.positionArray.slice(0, vertexCount * 3));
  const normals = new Float32Array(cubes.normalArray.slice(0, vertexCount * 3));

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.computeBoundingSphere();

  cubes.geometry.dispose();
  placeholderMaterial.dispose();

  return geometry;
}

import * as THREE from 'three';
import { createMolarGeometry } from './tooth-mesh';

export interface Models {
  enamel: THREE.MeshPhysicalMaterial;
  dentin: THREE.MeshStandardMaterial;
  pearl: THREE.MeshPhysicalMaterial;
  band: THREE.MeshStandardMaterial;
  titanium: THREE.MeshStandardMaterial;
  collar: THREE.MeshStandardMaterial;
  abutment: THREE.MeshStandardMaterial;
}

export function createMaterials(): Models {
  return {
    enamel: new THREE.MeshPhysicalMaterial({
      color: 0xfff6ea,
      roughness: 0.38,
      metalness: 0,
      clearcoat: 0.4,
      clearcoatRoughness: 0.4,
      sheen: 0.35,
      sheenColor: new THREE.Color(0xffe6cf),
      sheenRoughness: 0.6,
    }),
    dentin: new THREE.MeshStandardMaterial({
      color: 0xf1dfc9,
      roughness: 0.52,
      metalness: 0,
    }),
    pearl: new THREE.MeshPhysicalMaterial({
      color: 0xfffbf5,
      roughness: 0.22,
      metalness: 0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.18,
      sheen: 0.3,
      sheenColor: new THREE.Color(0xffe9d6),
      sheenRoughness: 0.5,
    }),
    band: new THREE.MeshStandardMaterial({
      color: 0xdfc4ab,
      roughness: 0.44,
      metalness: 0.06,
    }),
    titanium: new THREE.MeshStandardMaterial({
      color: 0xc7bcb0,
      roughness: 0.3,
      metalness: 0.7,
    }),
    collar: new THREE.MeshStandardMaterial({
      color: 0xdccbb8,
      roughness: 0.3,
      metalness: 0.55,
    }),
    abutment: new THREE.MeshStandardMaterial({
      color: 0xe3d0bb,
      roughness: 0.34,
      metalness: 0.3,
    }),
  };
}

function centreVertically(group: THREE.Group): THREE.Group {
  const wrapper = new THREE.Group();
  wrapper.add(group);
  const box = new THREE.Box3().setFromObject(group);
  const centre = (box.min.y + box.max.y) / 2;
  group.position.y -= centre;
  return wrapper;
}

/**
 * Stylised, non-graphic molar. A broad crown with four cusp lobes sits on two
 * tapered roots. This is an illustration, not an anatomical model.
 */
export function createMolar(models: Models): THREE.Group {
  const group = new THREE.Group();

  const tooth = new THREE.Mesh(createMolarGeometry(), models.enamel);
  tooth.scale.setScalar(1.65);
  group.add(tooth);

  group.rotation.set(0.08, -0.48, -0.02);
  return centreVertically(group);
}

/**
 * A crown restoration: a turned profile with a domed top, four cusp lobes, a
 * sand-coloured margin and a recessed underside.
 */
export function createCrown(models: Models): THREE.Group {
  const group = new THREE.Group();

  const profilePoints: THREE.Vector2[] = [
    new THREE.Vector2(0.72, 0),
    new THREE.Vector2(0.8, 0.12),
    new THREE.Vector2(0.83, 0.38),
    new THREE.Vector2(0.8, 0.6),
    new THREE.Vector2(0.72, 0.76),
    new THREE.Vector2(0.58, 0.88),
    new THREE.Vector2(0.36, 0.95),
    new THREE.Vector2(0.0, 1.0),
  ];
  const body = new THREE.Mesh(new THREE.LatheGeometry(profilePoints, 64), models.pearl);
  group.add(body);

  const cuspGeometry = new THREE.SphereGeometry(0.24, 36, 28);
  const cuspLayout: Array<[number, number, number, number]> = [
    [-0.34, 0.8, 0.24, 1.0],
    [0.36, 0.81, 0.22, 0.98],
    [-0.24, 0.78, -0.28, 0.9],
    [0.27, 0.79, -0.26, 0.88],
  ];
  for (const [x, y, z, scale] of cuspLayout) {
    const cusp = new THREE.Mesh(cuspGeometry, models.pearl);
    cusp.position.set(x, y, z);
    cusp.scale.set(scale, scale * 0.66, scale);
    group.add(cusp);
  }

  const band = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.045, 14, 80), models.band);
  band.rotation.x = Math.PI / 2;
  band.position.y = 0.02;
  group.add(band);

  const underside = new THREE.Mesh(new THREE.CircleGeometry(0.7, 64), models.abutment);
  underside.rotation.x = Math.PI / 2;
  underside.position.y = -0.015;
  group.add(underside);

  group.rotation.set(0.1, -0.2, 0.02);
  return centreVertically(group);
}

/** A prepared abutment tooth shown under the crown in the treatment story. */
export function createPreparedTooth(models: Models): THREE.Group {
  const group = new THREE.Group();

  const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.34, 0.5, 40), models.dentin);
  stump.position.y = 0.25;
  group.add(stump);

  const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.54, 40, 24), models.dentin);
  shoulder.scale.set(1, 0.22, 1);
  shoulder.position.y = 0.5;
  group.add(shoulder);

  return group;
}

export interface ImplantModel {
  root: THREE.Group;
  fixture: THREE.Group;
  connector: THREE.Group;
  crown: THREE.Group;
  /** Assembled positions, restored by reset. */
  assembled: { fixture: number; connector: number; crown: number };
}

/**
 * Reusable implant: a threaded fixture, a hexagonal connector and a crown. The
 * parts are separate groups so the same model serves the treatment story, the
 * explorer and its exploded view.
 */
export function createImplant(models: Models): ImplantModel {
  const root = new THREE.Group();

  const fixture = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.16, 1.3, 48, 1), models.titanium);
  body.position.y = -0.62;
  fixture.add(body);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.27, 0.13, 48), models.collar);
  collar.position.y = 0.03;
  fixture.add(collar);

  const threadGeometry = new THREE.TorusGeometry(1, 0.024, 8, 56);
  for (let index = 0; index < 8; index += 1) {
    const t = index / 7;
    const thread = new THREE.Mesh(threadGeometry, models.titanium);
    thread.rotation.x = Math.PI / 2;
    const scale = THREE.MathUtils.lerp(0.258, 0.175, t);
    thread.scale.set(scale, scale, scale);
    thread.position.y = -0.09 - index * 0.145;
    fixture.add(thread);
  }

  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.158, 24, 18), models.titanium);
  tip.position.y = -1.29;
  tip.scale.y = 0.82;
  fixture.add(tip);

  const connector = new THREE.Group();
  const connectorBody = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.55, 6), models.abutment);
  connectorBody.position.y = 0.34;
  connector.add(connectorBody);
  const connectorLip = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.17, 0.07, 32), models.collar);
  connectorLip.position.y = 0.06;
  connector.add(connectorLip);

  const crown = new THREE.Group();
  const crownCap = createCrown(models);
  crownCap.scale.setScalar(0.66);
  crown.add(crownCap);

  const assembled = { fixture: 0, connector: 0.055, crown: 0.6 };
  fixture.position.y = assembled.fixture;
  connector.position.y = assembled.connector;
  crown.position.y = assembled.crown;

  root.add(fixture, connector, crown);
  root.rotation.set(0.04, -0.28, 0);

  return { root: centreVertically(root), fixture, connector, crown, assembled };
}

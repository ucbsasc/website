import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { colors } from '../../theme/colors';

export type DicePhase = 'bets' | 'shaking' | 'result';

interface DiceSceneProps {
  /** Exactly 6 glyphs, one per cube face, in BoxGeometry face order (+x,-x,+y,-y,+z,-z). */
  glyphs: string[];
  phase: DicePhase;
  /** Bump this to start a new roll. */
  spinToken: number;
  /** The 3 landed face indices (into `glyphs`) for the current/last spin, or null before the first roll. */
  rollTarget: number[] | null;
  /** Fires once, `SETTLE_MS` after `spinToken` changes (or immediately under reduced motion). */
  onSettled: () => void;
  reduceMotion: boolean;
}

/** How long the dice visibly shake-then-settle for, once "Stop" is pressed. */
export const SETTLE_MS = 1300;
const PHASE_A_FRACTION = 0.42;

const DIE_SIZE = 1.3;
const REST_Y = DIE_SIZE / 2;
const REST_X = [-1.85, 0, 1.85];
const SHAKE_BOUNCE = 0.6;
const SHAKE_JITTER_XZ = 0.18;

const TABLE_RADIUS = 4.5;
const BOWL_RADIUS = 3.7;
const BOWL_DOWN_Y = 0.02;
const BOWL_UP_Y = 9;

const SHAKE_CAM_POS = new THREE.Vector3(0, 5.8, 9.4);
const SHAKE_LOOKAT = new THREE.Vector3(0, 1.4, 0.3);
const REVEAL_CAM_POS = new THREE.Vector3(0, 8.4, 2.5);
const REVEAL_LOOKAT = new THREE.Vector3(0, 0, 0.1);

/**
 * A symbol's face, in BoxGeometry's own face order, needs this single-axis rotation to end up
 * pointing at world +Y (up, toward the overhead reveal camera). Derived directly from three.js's
 * standard right-handed, Y-up rotation matrices, so it's checkable against any three.js reference
 * — unlike the old CSS version, which used CSS's own Y-down convention and got it backwards.
 */
const UP_EULER: [number, number, number][] = [
  [0, 0, Math.PI / 2], // +x face
  [0, 0, -Math.PI / 2], // -x face
  [0, 0, 0], // +y face (already up)
  [Math.PI, 0, 0], // -y face
  [-Math.PI / 2, 0, 0], // +z face
  [Math.PI / 2, 0, 0], // -z face
];

function targetQuaternion(symbolIndex: number, yaw: number) {
  const [ex, ey, ez] = UP_EULER[symbolIndex];
  const up = new THREE.Quaternion().setFromEuler(new THREE.Euler(ex, ey, ez));
  const spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  return spin.multiply(up);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutBounce(t: number) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) {
    const u = t - 1.5 / d1;
    return n1 * u * u + 0.75;
  }
  if (t < 2.5 / d1) {
    const u = t - 2.25 / d1;
    return n1 * u * u + 0.9375;
  }
  const u = t - 2.625 / d1;
  return n1 * u * u + 0.984375;
}

function createGlyphTexture(glyph: string) {
  const size = 320;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = colors.paper;
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = 'rgba(44,53,57,0.16)';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, size - 12, size - 12);
    ctx.shadowColor = 'rgba(20,26,30,0.35)';
    ctx.shadowBlur = size * 0.045;
    ctx.font = `${size * 0.66}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(glyph, size / 2, size / 2 + size * 0.03);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** A soft lit-from-above vignette for the tray, so it reads as a pool of light rather than a flat disc. */
function createFeltTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.08,
      size / 2,
      size / 2,
      size * 0.62,
    );
    gradient.addColorStop(0, '#FFFDF8');
    gradient.addColorStop(0.55, '#F3E9D8');
    gradient.addColorStop(1, '#D8C6A6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function CameraRig({ revealed, reduceMotion }: { revealed: boolean; reduceMotion: boolean }) {
  const { camera } = useThree();
  const lookAt = useRef(SHAKE_LOOKAT.clone());

  useEffect(() => {
    if (!reduceMotion) return;
    camera.position.copy(revealed ? REVEAL_CAM_POS : SHAKE_CAM_POS);
    lookAt.current.copy(revealed ? REVEAL_LOOKAT : SHAKE_LOOKAT);
    camera.lookAt(lookAt.current);
  }, [revealed, reduceMotion, camera]);

  useFrame((_, delta) => {
    if (reduceMotion) return;
    const targetPos = revealed ? REVEAL_CAM_POS : SHAKE_CAM_POS;
    const targetLookAt = revealed ? REVEAL_LOOKAT : SHAKE_LOOKAT;
    const alpha = Math.min(1, (1 - Math.pow(0.001, delta)) * 0.5);
    camera.position.lerp(targetPos, alpha);
    lookAt.current.lerp(targetLookAt, alpha);
    camera.lookAt(lookAt.current);
  });

  return null;
}

function Table() {
  const feltMap = useMemo(() => createFeltTexture(), []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[TABLE_RADIUS, 64]} />
        <meshStandardMaterial map={feltMap} roughness={0.9} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[TABLE_RADIUS - 0.12, TABLE_RADIUS + 0.06, 64]} />
        <meshStandardMaterial
          color={colors.gold}
          roughness={0.3}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * The whole system — tray, bowl, and (hidden underneath) dice — shakes and swivels together as
 * one rigid unit while rattling, on top of the bowl's own independent jitter. Keeping the dice in
 * this same rig means the bowl can never slide far enough to expose a gap at the edge.
 */
function ShakeRig({
  rattling,
  reduceMotion,
  children,
}: {
  rattling: boolean;
  reduceMotion: boolean;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!reduceMotion || !ref.current) return;
    ref.current.position.set(0, 0, 0);
    ref.current.rotation.set(0, 0, 0);
  }, [reduceMotion]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g || reduceMotion) return;

    const alpha = Math.min(1, (1 - Math.pow(0.002, delta)) * 1.3);
    if (rattling) {
      const t = state.clock.elapsedTime;
      g.position.x = Math.sin(t * 7.3) * 0.26 + Math.sin(t * 2.1) * 0.1;
      g.position.z = Math.cos(t * 6.1) * 0.22;
      g.rotation.y = Math.sin(t * 2.6) * 0.16 + Math.sin(t * 0.85) * 0.07;
    } else {
      g.position.x = THREE.MathUtils.lerp(g.position.x, 0, alpha);
      g.position.z = THREE.MathUtils.lerp(g.position.z, 0, alpha);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, 0, alpha);
    }
  });

  return <group ref={ref}>{children}</group>;
}

/**
 * The cover: uncovered at rest (and once revealed), and only comes down to hide the dice while
 * actively rattling — the instant "Stop" is pressed it starts lifting again. While down, it also
 * jitters sideways on its own, independent of the shared rig it sits in.
 */
function Bowl({ rattling, reduceMotion }: { rattling: boolean; reduceMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!reduceMotion || !ref.current) return;
    ref.current.position.set(0, rattling ? BOWL_DOWN_Y : BOWL_UP_Y, 0);
    ref.current.rotation.set(0, 0, 0);
  }, [rattling, reduceMotion]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g || reduceMotion) return;

    const alpha = Math.min(1, (1 - Math.pow(0.002, delta)) * 1.3);
    g.position.y = THREE.MathUtils.lerp(g.position.y, rattling ? BOWL_DOWN_Y : BOWL_UP_Y, alpha);

    if (rattling) {
      const t = state.clock.elapsedTime;
      g.position.x = Math.sin(t * 11) * 0.16 + Math.sin(t * 3.1) * 0.05;
      g.position.z = Math.cos(t * 9) * 0.14;
    } else {
      g.position.x = THREE.MathUtils.lerp(g.position.x, 0, alpha);
      g.position.z = THREE.MathUtils.lerp(g.position.z, 0, alpha);
    }
  });

  return (
    <group ref={ref} position={[0, BOWL_DOWN_Y, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[BOWL_RADIUS, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color={colors.paper}
          roughness={0.4}
          metalness={0.04}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[BOWL_RADIUS, 0.07, 16, 48]} />
        <meshStandardMaterial color={colors.gold} roughness={0.25} metalness={0.75} />
      </mesh>
    </group>
  );
}

interface DieProps {
  index: number;
  geometry: THREE.BufferGeometry;
  materials: THREE.Material[];
  target: number | null;
  spinToken: number;
  restX: number;
  restZ: number;
  reduceMotion: boolean;
}

/** A fresh random spin/wobble seed each roll. */
function makeSeed() {
  return {
    yaw: Math.random() * Math.PI * 2,
    turns: { x: 2 + Math.random() * 2, y: 2 + Math.random() * 2, z: 1.5 + Math.random() * 1.5 },
    jitterPhase: Math.random() * Math.PI * 2,
  };
}

const LANDING_RADIUS = 2.5;
const LANDING_MIN_SEPARATION = 1.25;

function randomPointInCircle(radius: number) {
  const r = radius * Math.sqrt(Math.random());
  const theta = Math.random() * Math.PI * 2;
  return { x: r * Math.cos(theta), z: r * Math.sin(theta) };
}

/**
 * Where all three dice land this roll — scattered anywhere within the bowl, not anchored to a
 * fixed left/center/right slot, so they don't keep landing back in a tidy row. Rejection-samples
 * for a little breathing room between them without hard-guaranteeing no overlap (real tossed dice
 * do sometimes end up touching).
 */
function randomLandingSpots(): { x: number; z: number }[] {
  const spots: { x: number; z: number }[] = [];
  for (let i = 0; i < 3; i += 1) {
    let candidate = randomPointInCircle(LANDING_RADIUS);
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const tooClose = spots.some(
        (s) => Math.hypot(s.x - candidate.x, s.z - candidate.z) < LANDING_MIN_SEPARATION,
      );
      if (!tooClose) break;
      candidate = randomPointInCircle(LANDING_RADIUS);
    }
    spots.push(candidate);
  }
  return spots;
}

/** Rattles in place, then settles into its landed pose — timed to surface as the bowl lifts. */
function Die({ index, geometry, materials, target, spinToken, restX, restZ, reduceMotion }: DieProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lastToken = useRef(spinToken);
  const elapsed = useRef(0);
  const phaseBStarted = useRef(false);
  const phaseBStartQuat = useRef(new THREE.Quaternion());
  const phaseBStartPos = useRef(new THREE.Vector3(REST_X[index], REST_Y, 0));
  const landedQuat = useRef(new THREE.Quaternion());
  const seed = useRef(makeSeed());

  useEffect(() => {
    if (spinToken === lastToken.current) return;
    lastToken.current = spinToken;
    elapsed.current = 0;
    phaseBStarted.current = false;
    seed.current = makeSeed();
    if (target !== null) landedQuat.current = targetQuaternion(target, seed.current.yaw);
  }, [spinToken, target]);

  useEffect(() => {
    if (target !== null) landedQuat.current = targetQuaternion(target, seed.current.yaw);
  }, [target]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    if (target === null) {
      // Freeze wherever it is (the previous result, on a fresh shake) instead of snapping to
      // rest — the bowl hasn't covered it yet, and popping to a neutral pose reads as a glitch.
      return;
    }

    if (reduceMotion) {
      g.position.set(restX, REST_Y, restZ);
      g.quaternion.copy(landedQuat.current);
      return;
    }

    elapsed.current += delta * 1000;
    const t = Math.min(1, elapsed.current / SETTLE_MS);

    if (t < PHASE_A_FRACTION) {
      // Full-amplitude rattle right up to the handoff, so there's real height to fall from
      // once phase B takes over — a decaying jitter would leave nothing to bounce.
      const local = t / PHASE_A_FRACTION;
      const rotationEase = local * (2 - local);
      g.rotation.set(
        seed.current.turns.x * rotationEase * Math.PI * 2,
        seed.current.turns.y * rotationEase * Math.PI * 2,
        seed.current.turns.z * rotationEase * Math.PI * 2,
      );
      g.position.y = REST_Y + SHAKE_BOUNCE * Math.abs(Math.sin(local * Math.PI * 5 + seed.current.jitterPhase));
      g.position.x = restX + Math.sin(local * 24 + seed.current.jitterPhase) * SHAKE_JITTER_XZ;
      g.position.z = restZ + Math.cos(local * 21 + seed.current.jitterPhase) * SHAKE_JITTER_XZ;
    } else {
      if (!phaseBStarted.current) {
        phaseBStarted.current = true;
        phaseBStartQuat.current.copy(g.quaternion);
        phaseBStartPos.current.copy(g.position);
      }
      const localT = (t - PHASE_A_FRACTION) / (1 - PHASE_A_FRACTION);
      const eased = easeOutCubic(localT);
      g.quaternion.copy(phaseBStartQuat.current).slerp(landedQuat.current, eased);
      g.position.x = THREE.MathUtils.lerp(phaseBStartPos.current.x, restX, eased);
      g.position.z = THREE.MathUtils.lerp(phaseBStartPos.current.z, restZ, eased);
      // Falls and bounces to rest from wherever the rattle happened to leave it, instead of
      // gliding down smoothly — gives the landing some actual weight.
      const fallHeight = Math.max(0, phaseBStartPos.current.y - REST_Y);
      g.position.y = REST_Y + fallHeight * (1 - easeOutBounce(localT));
    }
  });

  return (
    <group ref={groupRef} position={[REST_X[index], REST_Y, 0]}>
      <mesh geometry={geometry} material={materials} castShadow receiveShadow />
    </group>
  );
}

export default function DiceScene({
  glyphs,
  phase,
  spinToken,
  rollTarget,
  onSettled,
  reduceMotion,
}: DiceSceneProps) {
  const lastSettleToken = useRef(spinToken);
  const revealing = rollTarget !== null;
  const rattling = phase === 'shaking' && !revealing;

  useEffect(() => {
    if (spinToken === lastSettleToken.current) return;
    lastSettleToken.current = spinToken;
    const delay = reduceMotion ? 0 : SETTLE_MS;
    const id = window.setTimeout(onSettled, delay);
    return () => window.clearTimeout(id);
  }, [spinToken, reduceMotion, onSettled]);

  // Recomputed once per roll (not per render), so all three dice get a fresh scatter each spin.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const landingSpots = useMemo(() => randomLandingSpots(), [spinToken]);

  const geometry = useMemo(() => new RoundedBoxGeometry(DIE_SIZE, DIE_SIZE, DIE_SIZE, 3, 0.14), []);
  const materials = useMemo(
    () =>
      glyphs.map(
        (glyph) =>
          new THREE.MeshStandardMaterial({
            map: createGlyphTexture(glyph),
            roughness: 0.55,
            metalness: 0.04,
            toneMapped: false,
          }),
      ),
    [glyphs],
  );

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: SHAKE_CAM_POS.toArray(), fov: 40, near: 0.1, far: 40 }}
      gl={{ antialias: true, toneMappingExposure: 1.1 }}
    >
      <color attach="background" args={[colors.bayNavy]} />
      <fog attach="fog" args={[colors.bayNavy, 10, 23]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[3, 6, 4]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-radius={4}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.4} color={colors.gold} />
      <pointLight position={[0, 4.5, 3]} intensity={0.35} color={colors.pink} distance={12} />
      <CameraRig revealed={phase === 'result'} reduceMotion={reduceMotion} />
      <ShakeRig rattling={rattling} reduceMotion={reduceMotion}>
        <Table />
        {[0, 1, 2].map((i) => (
          <Die
            key={i}
            index={i}
            geometry={geometry}
            materials={materials}
            spinToken={spinToken}
            target={rollTarget ? rollTarget[i] : null}
            restX={landingSpots[i].x}
            restZ={landingSpots[i].z}
            reduceMotion={reduceMotion}
          />
        ))}
        <Bowl rattling={rattling} reduceMotion={reduceMotion} />
      </ShakeRig>
    </Canvas>
  );
}

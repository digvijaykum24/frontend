import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* Hero background: a slowly turning star field plus a few floating shapes
   (glossy knot, wireframe crystals, a halo ring). The whole group leans toward
   the pointer and drifts away as the page scrolls. The canvas sits behind the
   portrait, and the shapes stay on the text side so nothing covers the photo. */

function StarField({ color, count = 900 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Points on a thick spherical shell, seeded so the layout is stable
      const r = 6 + ((i * 7919) % 1000) / 1000 * 8;
      const theta = ((i * 104729) % 1000) / 1000 * Math.PI * 2;
      const phi = Math.acos(2 * (((i * 15485863) % 1000) / 1000) - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.045} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

function Shapes({ colors }) {
  const group = useRef();
  const { viewport, size } = useThree();
  const narrow = size.width < 992;
  const w = viewport.width / 2;
  const h = viewport.height / 2;

  // Wide layout: the copy fills the left half, the portrait the right half,
  // so shapes frame the copy. Stacked (narrow) layout: the photo is on top,
  // so shapes are placed in pixels along the edges below it, sized for a phone.
  let s = 1;
  let L;
  if (narrow) {
    const u = viewport.height / size.height; // world units per CSS pixel
    const photoBottom = 80 + Math.min(size.width * 1.05, 620);
    const x = (px) => px * u - w; // px from the left edge
    const y = (px) => h - px * u; // px from the top edge
    s = u;
    L = {
      knot: [x(size.width - 34), y(photoBottom + 150), -0.5], knotS: 22 / 1.32,
      ico: [x(26), y(photoBottom + 40), -0.5], icoS: 18,
      octa: [x(24), y(size.height - 70), 0], octaS: 14,
      ring: [x(26), y(photoBottom + 270), -0.5], ringS: 18,
      dodeca: [x(size.width - 28), y(size.height - 110), 0], dodecaS: 13
    };
  } else {
    L = {
      knot: [-w * 0.14, -h * 0.66, -1.5], knotS: 0.5,
      ico: [-w * 0.92, h * 0.6, -2], icoS: 0.5,
      octa: [-w * 0.9, -h * 0.72, -1], octaS: 0.4,
      ring: [-w * 0.42, h * 0.86, -2], ringS: 0.45,
      dodeca: [-w * 0.08, h * 0.58, -0.5], dodecaS: 0.3
    };
  }

  useFrame((state) => {
    const g = group.current;
    const k = narrow ? 0.03 : 1; // tall stacked canvas: a tiny lean is plenty
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.18 * k, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.12 * k, 0.04);
    // Scroll: the shapes rise, spin and recede as the hero scrolls away
    const p = Math.min(window.scrollY / window.innerHeight, 1.2);
    g.position.y = THREE.MathUtils.lerp(g.position.y, p * h * 0.5, 0.12);
    g.position.z = THREE.MathUtils.lerp(g.position.z, -p * 3, 0.12);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, p * 0.35, 0.12);
  });

  return (
    <group ref={group}>
      {/* Glossy knot */}
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={L.knot} scale={L.knotS * s}>
          <torusKnotGeometry args={[1, 0.32, 180, 24]} />
          <MeshDistortMaterial color={colors[1]} emissive={colors[1]} emissiveIntensity={0.15} metalness={0.7} roughness={0.18} distort={0.25} speed={2} />
        </mesh>
      </Float>

      {/* Crystals and a halo ring */}
      <Float speed={2.2} rotationIntensity={2} floatIntensity={1.8}>
        <mesh position={L.ico} scale={L.icoS * s}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={colors[0]} wireframe transparent opacity={0.55} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={2.4} floatIntensity={1.2}>
        <mesh position={L.octa} scale={L.octaS * s}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={colors[2]} metalness={0.6} roughness={0.25} flatShading />
        </mesh>
      </Float>
      <Float speed={1.3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={L.ring} rotation={[1.1, 0.2, 0]} scale={L.ringS * s}>
          <torusGeometry args={[1, 0.08, 16, 80]} />
          <meshStandardMaterial color={colors[0]} emissive={colors[1]} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={2.6} rotationIntensity={3} floatIntensity={2.2}>
        <mesh position={L.dodeca} scale={L.dodecaS * s}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={colors[1]} wireframe transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene({ colors, active, reduceMotion }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active && !reduceMotion ? 'always' : 'demand'}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={60} color={colors[0]} />
      <pointLight position={[-6, -3, 3]} intensity={40} color={colors[2]} />
      <directionalLight position={[0, 4, 6]} intensity={1.2} />
      <StarField color={colors[0]} />
      <Shapes colors={colors} />
    </Canvas>
  );
}

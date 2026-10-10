import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';

/* CTA background: two liquid orbs ringed by orbiting halos, one on each side
   of the headline, with drifting sparkles between them. */

function Orb({ position, color, ringColor, scale = 1, flip = 1 }) {
  const ring = useRef();
  const ring2 = useRef();
  useFrame((_, delta) => {
    ring.current.rotation.z += delta * 0.4 * flip;
    ring2.current.rotation.x += delta * 0.3 * flip;
  });
  return (
    <Float speed={1.5} floatIntensity={1.2} rotationIntensity={0.6}>
      <group position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[1, 96, 96]} />
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.25} metalness={0.55} roughness={0.15} distort={0.42} speed={2.2} />
        </mesh>
        <mesh ref={ring} rotation={[1.2, 0.3, 0]}>
          <torusGeometry args={[1.55, 0.02, 12, 120]} />
          <meshBasicMaterial color={ringColor} transparent opacity={0.8} />
        </mesh>
        <mesh ref={ring2} rotation={[0.2, 1.1, 0.4]}>
          <torusGeometry args={[1.85, 0.012, 12, 120]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function Orbs({ colors }) {
  const { viewport, size } = useThree();
  const narrow = size.width < 700;
  const x = viewport.width / 2 - (narrow ? 0.4 : 1.9);
  const y = narrow ? viewport.height / 2 - 0.9 : 0;
  return (
    <>
      <Orb position={[-x, y, 0]} color={colors[1]} ringColor={colors[0]} scale={narrow ? 0.55 : 1} />
      <Orb position={[x, narrow ? -y : -0.3, -0.5]} color={colors[2]} ringColor={colors[0]} scale={narrow ? 0.45 : 0.8} flip={-1} />
      <Sparkles count={60} scale={[viewport.width, viewport.height, 2]} size={2.4} speed={0.35} color={colors[0]} opacity={0.7} />
    </>
  );
}

export default function CtaOrb({ colors, active, reduceMotion }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active && !reduceMotion ? 'always' : 'demand'}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 5]} intensity={50} color={colors[0]} />
      <pointLight position={[-5, -2, 4]} intensity={35} color={colors[2]} />
      <directionalLight position={[0, 3, 5]} intensity={1} />
      <Orbs colors={colors} />
    </Canvas>
  );
}

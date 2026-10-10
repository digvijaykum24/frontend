import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { hasWebGL, useInView, useReducedMotion } from '../hooks';
import { useTheme } from '../theme';

const SCENES = {
  hero: lazy(() => import('../three/HeroScene')),
  cta: lazy(() => import('../three/CtaOrb'))
};

/* Mounts a Three.js scene behind a section. The 3D bundle is only fetched once
   the section comes near the screen, and the render loop pauses off-screen. */
export default function Scene3D({ scene, className }) {
  const ref = useRef(null);
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const near = useInView(ref, '300px 0px');
  const visible = useInView(ref, '0px');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (near && hasWebGL()) setMounted(true);
  }, [near]);

  const Scene = SCENES[scene];
  return (
    <div ref={ref} className={className} aria-hidden="true">
      {mounted && (
        <Suspense fallback={null}>
          <Scene colors={theme.colors} active={visible} reduceMotion={reduceMotion} />
        </Suspense>
      )}
    </div>
  );
}

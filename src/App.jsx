import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import { Hero, Marquee } from './components/Hero';
import { About, AreasServed, CallToAction, Faq, Process, Services, Technologies, WhyUs } from './components/Sections';
import { Pricing } from './components/Pricing';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { CursorGlow, FloatingActions, Footer, ThemeSwitcher } from './components/Chrome';
import { setupPageEffects } from './effects';

// Navbar state, progress bar, active link and back-to-top all follow scroll;
// batch them into one requestAnimationFrame per frame.
function useScrollState(progressRef) {
  const [state, setState] = useState({ scrolled: false, activeId: 'home', showTop: false });

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${docHeight > 0 ? y / docHeight : 0})`;
      }
      let activeId = '';
      document.querySelectorAll('main section[id]').forEach((sec) => {
        if (y + 140 >= sec.offsetTop) activeId = sec.id;
      });
      setState((s) => {
        const next = { scrolled: y > 20, activeId, showTop: y > 500 };
        return next.scrolled === s.scrolled && next.activeId === s.activeId && next.showTop === s.showTop ? s : next;
      });
    };
    const request = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, [progressRef]);

  return state;
}

export default function App() {
  const progressRef = useRef(null);
  const { scrolled, activeId, showTop } = useScrollState(progressRef);

  useEffect(() => setupPageEffects(), []);

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <CursorGlow />
      <Navbar scrolled={scrolled} activeId={activeId} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <WhyUs />
        <AreasServed />
        <Process />
        <Pricing />
        <Portfolio />
        <Technologies />
        <CallToAction />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <FloatingActions showBackToTop={showTop} />
      <ThemeSwitcher />
    </>
  );
}

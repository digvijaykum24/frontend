import { useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks';

/* Phones (≤640px) show some grids as swipe sliders. This tracks which card is
   centered for the dots, and with `coverflow` turns, shrinks and fades the side
   cards by their distance from the middle so swiping spins the next one in. */
export function useSnapSlider(gridRef, { coverflow = false } = {}) {
  const active = useMediaQuery('(max-width: 640px)');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const cards = Array.from(grid.children);
    let frame = null;

    const update = () => {
      frame = null;
      const center = grid.scrollLeft + grid.clientWidth / 2;
      let closest = 0;
      let closestDistance = Infinity;
      cards.forEach((card, i) => {
        if (!active) {
          ['--cf-rot', '--cf-x', '--cf-scale', '--cf-op'].forEach((v) => card.style.removeProperty(v));
          return;
        }
        const off = (card.offsetLeft + card.offsetWidth / 2 - center) / card.offsetWidth;
        if (Math.abs(off) < closestDistance) {
          closestDistance = Math.abs(off);
          closest = i;
        }
        if (!coverflow) return;
        const dist = Math.min(Math.abs(off), 1);
        const dir = Math.max(-1, Math.min(1, off));
        card.style.setProperty('--cf-rot', (dir * -30).toFixed(2) + 'deg');
        card.style.setProperty('--cf-x', (dir * -24).toFixed(1) + 'px');
        card.style.setProperty('--cf-scale', (1 - dist * 0.1).toFixed(3));
        card.style.setProperty('--cf-op', (1 - dist * 0.35).toFixed(3));
      });
      setCurrent(closest);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    grid.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
    return () => {
      grid.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [gridRef, active, coverflow]);

  const goTo = (i) => {
    const grid = gridRef.current;
    const card = grid && grid.children[i];
    if (card) grid.scrollTo({ left: card.offsetLeft - (grid.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  };

  return { active, current, goTo };
}

export function SliderDots({ count, slider, hint }) {
  return (
    <>
      <p className="pricing-swipe-hint" aria-hidden="true">
        <i className="fa-solid fa-arrows-left-right" /> {hint}
      </p>
      <div className="pricing-dots" aria-hidden="true">
        {slider.active &&
          Array.from({ length: count }, (_, i) => (
            <span key={i} className={i === slider.current ? 'active' : ''} onClick={() => slider.goTo(i)} />
          ))}
      </div>
    </>
  );
}

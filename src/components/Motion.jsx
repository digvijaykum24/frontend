import { Fragment, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks';

/* Splits text into word spans (.w) carrying their index as --i, so CSS can
   stagger each word. `gradient` gives every word the accent text style. */
export function Words({ text, offset = 0, gradient = false }) {
  const words = text.split(' ').filter(Boolean);
  return words.map((word, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className={'w' + (gradient ? ' text-gradient' : '')} style={{ '--i': offset + i }}>{word}</span>
    </Fragment>
  ));
}

export const wordCount = (text) => text.split(' ').filter(Boolean).length;

/* Heading with words that rise and turn into place in sequence */
export function SplitTitle({ as: Tag = 'h2', className = '', title = '', accent = '', after = '' }) {
  const a = wordCount(title);
  const b = a + wordCount(accent);
  return (
    <Tag className={className + ' split'}>
      {title && <Words text={title} />}
      {accent && <>{' '}<Words text={accent} offset={a} gradient /></>}
      {after && <>{/^[,.?!]/.test(after) ? '' : ' '}<Words text={after} offset={b} /></>}
    </Tag>
  );
}

/* Counts a number like "14,999" or "100%" up from zero the first time it
   scrolls into view. Renders the final value up front (and for no-JS/SEO). */
export function CountUp({ value, duration = 1400 }) {
  const match = /^([\d,]+)(.*)$/.exec(value);
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
  const suffix = match ? match[2] : '';
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!match || reduceMotion || !el || !('IntersectionObserver' in window)) return undefined;
    setN(0);
    let frame = null;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      setN(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduceMotion, duration]);

  if (!match) return value;
  return <span ref={ref} className="count-up">{n.toLocaleString('en-IN') + suffix}</span>;
}

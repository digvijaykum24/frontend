import { useRef } from 'react';
import { PROJECTS } from '../data';
import Fx from './Fx';
import { SectionHead } from './Sections';
import { SliderDots, useSnapSlider } from './Slider';

const Dots = ({ r = 4, y = 15 }) => (
  <>
    <circle cx={y + 1} cy={y} r={r} fill="#ef4444" />
    <circle cx={y + 15} cy={y} r={r} fill="#f59e0b" />
    <circle cx={y + 29} cy={y} r={r} fill="#22c55e" />
  </>
);

const THUMBS = {
  revolution: (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="260" fill="#0c1a2e" />
      <rect x="0" y="0" width="400" height="34" fill="#15253f" />
      <circle cx="18" cy="17" r="5" fill="#ef4444" />
      <circle cx="36" cy="17" r="5" fill="#f59e0b" />
      <circle cx="54" cy="17" r="5" fill="#22c55e" />
      <rect x="20" y="54" width="150" height="16" rx="4" fill="var(--lilac)" />
      <rect x="20" y="80" width="220" height="10" rx="4" fill="#c2d0e4" />
      <rect x="20" y="98" width="180" height="10" rx="4" fill="#5f7699" />
      <rect x="20" y="122" width="110" height="34" rx="8" fill="var(--accent)" />
      <rect x="230" y="54" width="150" height="120" rx="10" fill="#15253f" />
      <circle cx="305" cy="95" r="24" fill="#1d3354" />
      <rect x="255" y="130" width="100" height="8" rx="4" fill="#2a4468" />
      <rect x="265" y="144" width="80" height="6" rx="3" fill="#1d3354" />
      <rect x="20" y="180" width="110" height="60" rx="8" fill="#15253f" />
      <rect x="140" y="180" width="110" height="60" rx="8" fill="#15253f" />
      <rect x="260" y="180" width="120" height="60" rx="8" fill="#15253f" />
    </svg>
  ),
  chatkara: (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ckGrad" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f97316" /><stop offset="1" stopColor="#dc2626" /></linearGradient>
      </defs>
      <rect width="400" height="260" fill="#1c1210" />
      <rect x="0" y="0" width="400" height="30" fill="#2a1a15" />
      <Dots />
      <rect x="130" y="9" width="140" height="12" rx="6" fill="rgba(255,255,255,0.08)" />
      <rect x="18" y="48" width="90" height="12" rx="6" fill="rgba(249,115,22,0.25)" />
      <rect x="18" y="70" width="200" height="16" rx="4" fill="#fde68a" />
      <rect x="18" y="94" width="160" height="16" rx="4" fill="url(#ckGrad)" />
      <rect x="18" y="120" width="210" height="8" rx="4" fill="#a8a29e" />
      <rect x="18" y="140" width="90" height="26" rx="13" fill="url(#ckGrad)" />
      <rect x="116" y="140" width="90" height="26" rx="13" fill="none" stroke="#f97316" strokeWidth="1.5" />
      <circle cx="320" cy="105" r="58" fill="#2a1a15" />
      <circle cx="320" cy="105" r="44" fill="url(#ckGrad)" opacity="0.85" />
      <circle cx="306" cy="94" r="10" fill="#fde68a" />
      <circle cx="334" cy="112" r="8" fill="#22c55e" />
      <circle cx="318" cy="122" r="6" fill="#fef3c7" />
      {[18, 142, 266].map((x) => (
        <g key={x}>
          <rect x={x} y="188" width="116" height="56" rx="10" fill="#2a1a15" stroke="rgba(249,115,22,0.3)" />
          <circle cx={x + 24} cy="216" r="12" fill="url(#ckGrad)" />
          <rect x={x + 44} y="208" width="58" height="7" rx="3" fill="#d6d3d1" />
          <rect x={x + 44} y="221" width="34" height="7" rx="3" fill="#f97316" />
        </g>
      ))}
    </svg>
  ),
  fws: (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="260" fill="#0c1a2e" />
      <rect x="0" y="0" width="400" height="30" fill="#15253f" />
      <Dots />
      <rect x="130" y="9" width="140" height="12" rx="6" fill="rgba(255,255,255,0.08)" />
      <rect x="18" y="46" width="70" height="10" rx="3" fill="var(--accent)" />
      <rect x="300" y="44" width="82" height="16" rx="8" fill="var(--accent)" />
      <rect x="18" y="80" width="230" height="16" rx="4" fill="var(--lilac)" />
      <rect x="18" y="104" width="300" height="10" rx="4" fill="#c2d0e4" />
      <rect x="18" y="120" width="260" height="10" rx="4" fill="#5f7699" />
      <rect x="18" y="144" width="110" height="30" rx="15" fill="var(--accent)" />
      {[18, 145, 272].map((x) => (
        <g key={x}>
          <rect x={x} y="192" width="110" height="52" rx="10" fill="#15253f" stroke="rgba(255,255,255,0.1)" />
          <circle cx={x + 25} cy="209" r="8" fill="var(--accent-2)" />
        </g>
      ))}
      {/* Little 3D cube hinting at the hero scene */}
      <g transform="translate(330 120)" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M0 -26 24 -13 24 13 0 26 -24 13 -24 -13Z" />
        <path d="M-24 -13 0 0 24 -13M0 0V26" />
      </g>
    </svg>
  )
};

export default function Portfolio() {
  const gridRef = useRef(null);
  const slider = useSnapSlider(gridRef, { coverflow: true });
  return (
    <section className="portfolio section" id="portfolio">
      <Fx index={8} />
      <div className="container">
        <SectionHead eyebrow="Our Work" title="Our Recent" accent="Projects" text="A glimpse at what we've built for our clients." />
        <div className="grid portfolio-grid" ref={gridRef}>
          {PROJECTS.map((p, i) => (
            <article className="portfolio-card" key={p.name}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="portfolio-thumb" aria-label={`Open the ${p.name} website`}>
                {THUMBS[p.thumb]}
                <span className="live-badge"><span className="live-dot" /> Live</span>
              </a>
              <div className="portfolio-info">
                <span className="case-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.name}</h3>
                <span className="portfolio-tag">{p.tag}</span>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="portfolio-url">
                  <i className="fa-solid fa-globe" /> {p.domain}
                </a>
                <p>{p.text}</p>
                <div className="portfolio-foot">
                  <div className="portfolio-tech">
                    {p.tech.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm btn-full case-visit">
                  Visit Website <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <SliderDots count={PROJECTS.length} slider={slider} hint="Swipe to see projects" />
        <p className="portfolio-note">More projects coming soon — this is just the beginning.</p>
      </div>
    </section>
  );
}

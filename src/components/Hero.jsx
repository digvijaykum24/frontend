import { HIGHLIGHTS } from '../data';
import { scrollToId } from '../hooks';
import Fx from './Fx';
import Scene3D from './Scene3D';
import { SplitTitle } from './Motion';

const jump = (id) => (e) => {
  e.preventDefault();
  scrollToId(id);
};

export function Hero() {
  return (
    <section className="hero" id="home">
      <Fx index={0} hero />
      <div className="hero-photo">
        <img
          src="assets/founder-hero-960.webp"
          srcSet="assets/founder-hero-640.webp 640w, assets/founder-hero-960.webp 960w, assets/founder-hero-1280.webp 1280w"
          sizes="(max-width: 992px) 100vw, 50vw"
          alt="Digvijay Kumar, Founder & Web Developer at Frontend Web Studio"
          width="1280"
          height="1536"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <Scene3D scene="hero" className="hero-canvas" />
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="hero-label">Web Design Studio · Patna, Bihar</span>
          <SplitTitle as="h1" className="hero-title split-load" title="We build websites that" accent="grow your business." />
          <p className="hero-subtitle">
            Frontend Web Studio is a website design &amp; development company in Patna, Bihar, creating modern, fast,
            responsive and professional websites that help businesses across Patna, Bihar and India build a strong
            online presence.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary btn-lg" onClick={jump('contact')}>
              Start Your Project <i className="fa-solid fa-arrow-right" />
            </a>
            <a href="#portfolio" className="btn btn-outline btn-lg" onClick={jump('portfolio')}>
              View Our Work <i className="fa-regular fa-folder-open" />
            </a>
          </div>
          <p className="hero-availability">
            <span className="availability-dot" aria-hidden="true" />
            <span>
              <strong>Available for new projects</strong>Let's build something exceptional for your business.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const group = (hidden) => (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {HIGHLIGHTS.map((h) => <li key={h.text}>{h.text}</li>)}
    </ul>
  );
  return (
    <div className="marquee" id="marquee">
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

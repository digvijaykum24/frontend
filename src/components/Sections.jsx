import { useState } from 'react';
import { FAQS, HIGHLIGHTS, PROCESS, SERVICES, STATS, TECH } from '../data';
import { scrollToId } from '../hooks';
import Fx from './Fx';
import Scene3D from './Scene3D';
import { CountUp, SplitTitle } from './Motion';

const jump = (id) => (e) => {
  e.preventDefault();
  scrollToId(id);
};

export function SectionHead({ eyebrow, title, accent, after, text, center = true }) {
  const c = center ? ' center' : '';
  return (
    <div className="section-head">
      <span className={'eyebrow' + c}>{eyebrow}</span>
      <SplitTitle className={'section-title' + c} title={title} accent={accent} after={after} />
      {text && <p className={'section-text' + c}>{text}</p>}
    </div>
  );
}

export function About() {
  return (
    <section className="about section" id="about">
      <Fx index={1} />
      <div className="container about-grid">
        <div className="about-visual">
          <div className="about-image">
            <img src="assets/about-website.svg?v=2" alt="Responsive website design shown on a laptop and a mobile phone" width="560" height="430" loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="about-content">
          <span className="eyebrow">About Us</span>
          <SplitTitle className="section-title" title="About" accent="Frontend Web Studio" after="— Web Design Company in Patna, Bihar" />
          <p className="section-text">
            Frontend Web Studio is a Patna, Bihar based creative web development studio focused on building modern,
            responsive, fast, and professional websites for businesses and individuals across Patna, Bihar and beyond.
          </p>
          <p className="section-text">
            As a local website designer in Patna, we help brands establish a strong digital presence through beautiful
            design, smooth user experiences, and modern web technologies — backed by personal support for Bihar-based
            businesses.
          </p>
          <div className="stats-grid">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-icon"><i className={'fa-solid ' + s.icon} /></div>
                <h3><span className="counter-static"><CountUp value={s.value} /></span></h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="services section" id="services">
      <Fx index={2} />
      <div className="container">
        <div className="panel services-panel">
          <SectionHead
            eyebrow="What We Offer"
            title="Our"
            accent="Services"
            after=" in Patna, Bihar"
            text="End-to-end web design & development solutions tailored to businesses in Patna, Bihar and across India."
          />
          <div className="grid services-grid">
            {SERVICES.map((s) => {
              const body = (
                <>
                  <div className="service-icon"><i className={'fa-solid ' + s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </>
              );
              return s.href ? (
                <a key={s.title} href={s.href} className="service-card" onClick={jump(s.href.slice(1))}>{body}</a>
              ) : (
                <div key={s.title} className="service-card">{body}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="why-us section" id="why-us">
      <Fx index={3} />
      <div className="container">
        <SectionHead
          eyebrow="Our Advantage"
          title="Why Choose"
          accent="Frontend Web Studio?"
          text="We combine design, technology, and strategy to deliver results."
        />
        <div className="grid why-us-grid">
          {HIGHLIGHTS.map((h) => (
            <div className="feature-card" key={h.text}>
              <div className="feature-icon"><i className={h.icon} /></div>
              <h4>{h.text}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AreasServed() {
  return (
    <section className="areas-served section" id="areas-served">
      <Fx index={4} />
      <div className="container">
        <SectionHead
          eyebrow="Local & Beyond"
          title="Website Designer in"
          accent="Patna, Bihar"
          text="Frontend Web Studio proudly serves businesses, coaching institutes, schools and startups across Patna and Bihar, including Kankarbagh, Boring Road, Bailey Road, Rajendra Nagar, Danapur, Patliputra, Fraser Road, Gaya, Muzaffarpur, Bhagalpur and Bihar Sharif — as well as clients across India."
        />
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="process section" id="process">
      <Fx index={5} />
      <div className="container">
        <SectionHead eyebrow="How We Work" title="Our" accent="Process" text="A simple, transparent process from idea to launch." />
        <div className="process-track">
          <div className="process-line" aria-hidden="true" />
          {PROCESS.map((p, i) => (
            <div className="process-step" key={p.title}>
              <div className="step-icon" aria-hidden="true"><i className={p.icon} /></div>
              <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Technologies() {
  return (
    <section className="technologies section" id="technologies">
      <Fx index={9} />
      <div className="container">
        <SectionHead
          eyebrow="Our Toolkit"
          title="Technologies We"
          accent="Use"
          text="Modern, reliable tools to build fast and scalable websites."
        />
        <div className="tech-grid">
          {TECH.map(([icon, name]) => (
            <div className="tech-card" key={name}>
              <i className={icon} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CallToAction() {
  return (
    <section className="cta-section">
      <Fx index={10} />
      <Scene3D scene="cta" className="cta-orb" />
      <div className="container cta-inner">
        <SplitTitle title="Ready to build your" accent="professional website?" />
        <p>Let's create a modern, professional, and responsive website that helps your business grow online.</p>
        <a href="#contact" className="btn btn-primary btn-lg" onClick={jump('contact')}>
          Start Your Project Today <i className="fa-solid fa-arrow-right" />
        </a>
      </div>
    </section>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq section" id="faq">
      <Fx index={12} />
      <div className="container">
        <SectionHead
          eyebrow="Got Questions?"
          title="Frequently Asked"
          accent="Questions"
          text="Answers to the questions we hear most often from clients."
        />
        <div className="faq-list">
          {FAQS.map(([q, a], i) => (
            <div className={'faq-item' + (openIndex === i ? ' active' : '')} key={q}>
              <button
                className="faq-question"
                aria-expanded={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                {q}
                <i className="fa-solid fa-chevron-down" />
              </button>
              <div className="faq-answer">
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { CONTACT, NAV_LINKS } from '../data';
import { scrollToId, useMediaQuery, useReducedMotion } from '../hooks';
import { THEMES, useTheme } from '../theme';
import { SocialRow } from './Contact';

const FOOTER_LINKS = NAV_LINKS.filter(([id]) => !['why-us', 'process'].includes(id));

export function Footer() {
  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#home" className="brand" onClick={go('home')}>
            <span className="brand-mark"><img src="assets/logo-fws.webp" alt="" width="195" height="120" loading="lazy" decoding="async" /></span>
            <span className="brand-text light">Frontend <span>Web Studio</span></span>
          </a>
          <p>
            Website design &amp; development company in Patna, Bihar — creating modern, responsive and professional
            websites for businesses and individuals across Bihar and India.
          </p>
          <SocialRow />
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          {FOOTER_LINKS.map(([id, label]) => (
            <a key={id} href={'#' + id} onClick={go(id)}>{label}</a>
          ))}
        </div>
        <div className="footer-contact">
          <h4>Contact Information</h4>
          <p><i className="fa-solid fa-user" /> {CONTACT.name}</p>
          <p><i className="fa-solid fa-phone" /> <a href={'tel:' + CONTACT.phone}>{CONTACT.phone}</a></p>
          <p><i className="fa-solid fa-envelope" /> <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a></p>
          <p><i className="fa-solid fa-location-dot" /> {CONTACT.address}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Frontend Web Studio. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export function FloatingActions({ showBackToTop }) {
  return (
    <>
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
        <i className="fa-brands fa-whatsapp" />
      </a>
      <div className="mobile-cta-bar">
        <a href={'tel:+91' + CONTACT.phone} className="mcb-btn mcb-call"><i className="fa-solid fa-phone" /> Call Now</a>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="mcb-btn mcb-whatsapp">
          <i className="fa-brands fa-whatsapp" /> WhatsApp
        </a>
      </div>
      <button
        id="backToTop"
        className={showBackToTop ? 'show' : ''}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fa-solid fa-arrow-up" />
      </button>
    </>
  );
}

export function ThemeSwitcher() {
  const { theme, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div className="theme-switcher" ref={ref}>
      {open && (
        <div className="theme-panel" role="menu" aria-label="Color theme">
          <span className="theme-panel-title">Color Theme</span>
          {THEMES.map((t) => (
            <button
              key={t.id}
              role="menuitemradio"
              aria-checked={t.id === theme.id}
              className={'theme-option' + (t.id === theme.id ? ' active' : '')}
              onClick={() => setThemeId(t.id)}
            >
              <span className="theme-swatch" style={{ background: `linear-gradient(135deg, ${t.colors.join(', ')})` }} />
              {t.name}
              {t.id === theme.id && <i className="fa-solid fa-check" />}
            </button>
          ))}
        </div>
      )}
      <button
        className="theme-toggle"
        aria-label="Change color theme"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <i className="fa-solid fa-palette" />
      </button>
    </div>
  );
}

// Soft spotlight that trails the mouse (desktop, motion allowed)
export function CursorGlow() {
  const ref = useRef(null);
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!finePointer || reduceMotion) return undefined;
    let frame = null;
    let x = 0;
    let y = 0;
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = null;
          ref.current?.style.setProperty('--cx', x + 'px');
          ref.current?.style.setProperty('--cy', y + 'px');
        });
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [finePointer, reduceMotion]);

  if (!finePointer || reduceMotion) return null;
  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}

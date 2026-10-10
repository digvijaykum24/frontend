import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data';
import { scrollToId, useMediaQuery } from '../hooks';

export default function Navbar({ scrolled, activeId }) {
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState({ visible: false, animate: false, x: 0, w: 0 });
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const drawerMode = useMediaQuery('(max-width: 1360px)');

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);
  useEffect(() => {
    if (!drawerMode) setOpen(false);
  }, [drawerMode]);

  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
    setOpen(false);
  };

  // One glowing pill glides between links on hover (desktop only)
  const showPill = (e) => {
    const link = e.currentTarget;
    setPill((p) => ({ visible: true, animate: p.visible, x: link.offsetLeft, w: link.offsetWidth }));
  };
  const hidePill = () => setPill((p) => ({ ...p, visible: false }));

  return (
    <header className={'navbar' + (scrolled ? ' scrolled' : '')} id="navbar">
      <div className="container navbar-inner">
        <a href="#home" className="brand" aria-label="Frontend Web Studio home" onClick={go('home')}>
          <span className="brand-mark"><img src="assets/logo-fws.webp" alt="" width="195" height="120" decoding="async" /></span>
          <span className="brand-text">Frontend <span>Web Studio</span></span>
        </a>

        <nav className={'nav-links' + (open ? ' active' : '')} id="navLinks" onPointerLeave={hidePill}>
          {canHover && (
            <span
              className={'nav-indicator' + (pill.visible ? ' is-visible' : '') + (pill.animate ? '' : ' no-anim')}
              style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
              aria-hidden="true"
            />
          )}
          {NAV_LINKS.map(([id, label]) => (
            <a
              key={id}
              href={'#' + id}
              className={'nav-link' + (activeId === id ? ' active' : '')}
              onClick={go(id)}
              onPointerEnter={canHover ? showPill : undefined}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary btn-nav" onClick={go('contact')} onPointerEnter={hidePill}>
            Get a Website
          </a>
        </nav>

        <button
          className={'hamburger' + (open ? ' active' : '')}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
      <div className={'mobile-overlay' + (open ? ' active' : '')} onClick={() => setOpen(false)} />
    </header>
  );
}

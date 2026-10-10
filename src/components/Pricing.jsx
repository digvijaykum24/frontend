import { useRef } from 'react';
import { PLANS } from '../data';
import { scrollToId } from '../hooks';
import Fx from './Fx';
import { CountUp } from './Motion';
import { SectionHead } from './Sections';
import { SliderDots, useSnapSlider } from './Slider';

const jump = (id) => (e) => {
  e.preventDefault();
  scrollToId(id);
};

export function Pricing() {
  const gridRef = useRef(null);
  const slider = useSnapSlider(gridRef);
  return (
    <section className="pricing section" id="pricing">
      <Fx index={6} />
      <div className="container">
        <SectionHead
          eyebrow="Pricing Plans"
          title="Simple,"
          accent="Transparent Pricing"
          text="Choose a package that fits your business. No hidden costs, no surprises."
        />
        <div className="grid pricing-grid pricing-grid-two" ref={gridRef}>
          {PLANS.map((plan) => (
            <div className={'pricing-card' + (plan.featured ? ' featured' : '')} key={plan.name}>
              {plan.featured && <span className="pricing-badge">Most Popular</span>}
              <div className="pricing-head">
                <span className="pricing-plan">{plan.name}</span>
                <p className="pricing-tagline">{plan.tagline}</p>
              </div>
              <div className="pricing-price">
                <span className="currency">₹</span><span className="amount"><CountUp value={plan.price} /></span>
              </div>
              <p className="pricing-billed">One-time payment</p>
              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f}><i className="fa-solid fa-circle-check" /> {f}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className={'btn btn-full ' + (plan.featured ? 'btn-primary' : 'btn-outline')}
                onClick={jump('contact')}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
        <SliderDots count={PLANS.length} slider={slider} hint="Swipe to compare plans" />

        <p className="pricing-fineprint">
          Domain registration, hosting plan fees and third-party service charges may be billed separately unless
          included in your quotation. Custom features depend on project requirements.
        </p>
        <p className="pricing-note">
          Need something custom? <a href="#contact" onClick={jump('contact')}>Contact us</a> for a tailored quote.
        </p>
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import { CONTACT, REQUIREMENTS, SOCIALS } from '../data';
import Fx from './Fx';
import { SplitTitle } from './Motion';

const FORM_ACTION = 'https://formspree.io/f/mgaebwaw';
const EMPTY = { fullName: '', mobile: '', email: '', business: '', requirement: '', message: '' };
const REQUIRED = ['fullName', 'mobile', 'email', 'requirement', 'message'];

function validate(name, raw) {
  const value = raw.trim();
  if (REQUIRED.includes(name) && value === '') return 'This field is required.';
  if (value === '') return '';
  if (name === 'fullName' && value.length < 3) return 'Please enter your full name.';
  if (name === 'mobile' && !/^[6-9]\d{9}$/.test(value)) return 'Enter a valid 10-digit mobile number.';
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
  if (name === 'message' && value.length < 10) return 'Please enter at least 10 characters.';
  return '';
}

export function SocialRow() {
  return (
    <div className="social-row">
      {SOCIALS.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
          <i className={'fa-brands ' + s.icon} />
        </a>
      ))}
    </div>
  );
}

function Field({ name, label, icon, required, error, top, children }) {
  return (
    <div className={'form-group' + (error ? ' error' : '')}>
      <label htmlFor={name}>{label} {required && <span>*</span>}</label>
      <div className={'input-icon' + (top ? ' input-icon-top' : '')}>
        <i className={'fa-solid ' + icon} />
        {children}
      </div>
      <span className="error-msg">{error}</span>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const formRef = useRef(null);

  const bind = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => {
      const v = e.target.value;
      setValues((s) => ({ ...s, [name]: v }));
      if (errors[name]) setErrors((s) => ({ ...s, [name]: validate(name, v) }));
    },
    onBlur: (e) => setErrors((s) => ({ ...s, [name]: validate(name, e.target.value) }))
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    Object.keys(EMPTY).forEach((k) => { next[k] = validate(k, values[k]); });
    setErrors(next);
    setStatus('idle');
    const firstBad = Object.keys(EMPTY).find((k) => next[k]);
    if (firstBad) {
      document.getElementById(firstBad)?.closest('.form-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(FORM_ACTION, {
        method: 'POST',
        body: new FormData(formRef.current),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setValues(EMPTY);
      setTimeout(() => setStatus((s) => (s === 'success' ? 'idle' : s)), 6000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact section" id="contact">
      <Fx index={11} />
      <div className="container">
        <div className="panel contact-panel">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="eyebrow">Get In Touch</span>
              <SplitTitle className="section-title" title="Let's Build Something" accent="Amazing Together" />
              <p className="section-text">Have a project in mind? Reach out and let's discuss how we can help your business grow online.</p>

              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon"><i className="fa-solid fa-user" /></div>
                  <div><h4>Founder &amp; Web Developer</h4><p>{CONTACT.name}</p></div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><i className="fa-solid fa-phone" /></div>
                  <div><h4>Phone</h4><p><a href={'tel:' + CONTACT.phone}>{CONTACT.phone}</a></p></div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><i className="fa-solid fa-envelope" /></div>
                  <div><h4>Email</h4><p><a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a></p></div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><i className="fa-solid fa-location-dot" /></div>
                  <div><h4>Address</h4><p>{CONTACT.address}</p></div>
                </div>
              </div>
              <SocialRow />
            </div>

            <div className="contact-form-wrap">
              <form className="contact-form" ref={formRef} action={FORM_ACTION} method="POST" noValidate onSubmit={onSubmit}>
                <input type="hidden" name="_subject" value="New Website Enquiry - Frontend Web Studio" />
                <div className="form-row">
                  <Field name="fullName" label="Full Name" icon="fa-user" required error={errors.fullName}>
                    <input type="text" placeholder="Your full name" required {...bind('fullName')} />
                  </Field>
                  <Field name="mobile" label="Mobile Number" icon="fa-phone" required error={errors.mobile}>
                    <input type="tel" placeholder="10-digit mobile number" required {...bind('mobile')} />
                  </Field>
                </div>
                <div className="form-row">
                  <Field name="email" label="Email Address" icon="fa-envelope" required error={errors.email}>
                    <input type="email" placeholder="you@example.com" required {...bind('email')} />
                  </Field>
                  <Field name="business" label="Business Name" icon="fa-building" error={errors.business}>
                    <input type="text" placeholder="Your business name" {...bind('business')} />
                  </Field>
                </div>
                <Field name="requirement" label="Website Requirement" icon="fa-globe" required error={errors.requirement}>
                  <select required {...bind('requirement')}>
                    <option value="" disabled>Select a service</option>
                    {REQUIREMENTS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>
                <Field name="message" label="Message" icon="fa-comment-dots" required top error={errors.message}>
                  <textarea rows="4" placeholder="Tell us about your project..." required {...bind('message')} />
                </Field>

                <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={status === 'sending'}>
                  <span className="btn-label">
                    {status === 'sending'
                      ? <><i className="fa-solid fa-spinner" /> Sending...</>
                      : <>Send Enquiry <i className="fa-solid fa-paper-plane" /></>}
                  </span>
                </button>

                <div className={'form-success' + (status === 'success' ? ' show' : '')} role="status">
                  <i className="fa-solid fa-circle-check" /> Thank you! Your enquiry has been sent. We'll get back to you soon.
                </div>
                <div className={'form-error' + (status === 'error' ? ' show' : '')} role="alert">
                  <i className="fa-solid fa-circle-exclamation" /> Something went wrong sending your enquiry. Please try
                  again, or reach us directly at <a href={'tel:' + CONTACT.phone}>{CONTACT.phone}</a>.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

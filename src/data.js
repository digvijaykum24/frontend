// Site content. Edit text, prices and links here; the components render it.

export const CONTACT = {
  name: 'Digvijay Kumar',
  phone: '9973746867',
  email: 'digvijaykum24@gmail.com',
  address: 'Karanpura, Bairiya, Patna - 07',
  whatsapp: 'https://wa.me/919973746867'
};

export const SOCIALS = [
  { label: 'Facebook', icon: 'fa-facebook-f', href: 'https://www.facebook.com/share/1JpG9WRXvP/' },
  { label: 'Instagram', icon: 'fa-instagram', href: 'https://www.instagram.com/frontend_web_studio?stkn=bmNzY2l2dmppNHYy' },
  { label: 'LinkedIn', icon: 'fa-linkedin-in', href: 'https://www.linkedin.com/in/digvijay-kumar24/' },
  { label: 'WhatsApp', icon: 'fa-whatsapp', href: CONTACT.whatsapp }
];

export const NAV_LINKS = [
  ['home', 'Home'],
  ['about', 'About'],
  ['services', 'Services'],
  ['why-us', 'Why Choose Us'],
  ['process', 'Process'],
  ['pricing', 'Pricing'],
  ['portfolio', 'Projects'],
  ['contact', 'Contact']
];

export const HIGHLIGHTS = [
  { icon: 'fa-solid fa-bolt', text: 'Fast & Modern Websites' },
  { icon: 'fa-solid fa-mobile-screen-button', text: '100% Mobile Responsive' },
  { icon: 'fa-solid fa-palette', text: 'Attractive UI/UX Design' },
  { icon: 'fa-solid fa-rocket', text: 'SEO Friendly Structure' },
  { icon: 'fa-solid fa-laptop-code', text: 'Modern Web Technologies' },
  { icon: 'fa-solid fa-handshake-angle', text: 'Client-Focused Approach' },
  { icon: 'fa-solid fa-toolbox', text: 'Website Support' },
  { icon: 'fa-solid fa-sack-dollar', text: 'Affordable Pricing' }
];

export const STATS = [
  { icon: 'fa-display', value: 'Custom', label: 'Built Websites' },
  { icon: 'fa-wand-magic-sparkles', value: '100%', label: 'Responsive Design' },
  { icon: 'fa-mobile-screen-button', value: 'Mobile', label: 'Friendly' },
  { icon: 'fa-handshake', value: '24/7', label: 'Client Support' }
];

export const SERVICES = [
  { icon: 'fa-briefcase', title: 'Business Websites', text: 'Professional websites designed to build your online presence.' },
  { icon: 'fa-id-badge', title: 'Portfolio Websites', text: 'Modern personal and professional portfolio websites.' },
  { icon: 'fa-graduation-cap', title: 'Coaching & School Websites', text: 'Professional websites for coaching institutes, schools, and educational organizations.' },
  { icon: 'fa-utensils', title: 'Restaurant Websites', text: 'Beautiful restaurant websites with menus, contact details, and online enquiry features.' },
  { icon: 'fa-bullseye', title: 'Landing Pages', text: 'High-converting landing pages for products and services.' },
  { icon: 'fa-arrows-rotate', title: 'Website Redesign', text: 'Transform old websites into modern and professional designs.' },
  { icon: 'fa-mobile-screen', title: 'Mobile Responsive Design', text: 'Websites optimized for mobile, tablet, laptop, and desktop.' },
  { icon: 'fa-screwdriver-wrench', title: 'Website Maintenance', text: 'Support and maintenance to keep your website updated and running smoothly.' },
  { icon: 'fa-palette', title: 'Graphic Design', text: 'Posters, flex banners, social media posts and pamphlets at budget-friendly prices.' }
];

export const PROCESS = [
  { icon: 'fa-regular fa-comments', title: 'Discuss', text: 'Understand your business and website requirements.' },
  { icon: 'fa-solid fa-pen-ruler', title: 'Design', text: 'Create a modern and attractive website design.' },
  { icon: 'fa-solid fa-code', title: 'Develop', text: 'Build a fast, responsive, and professional website.' },
  { icon: 'fa-solid fa-magnifying-glass', title: 'Review', text: 'Make improvements based on feedback.' },
  { icon: 'fa-solid fa-rocket', title: 'Launch', text: 'Publish your website and make it available online.' }
];

export const PLANS = [
  {
    name: 'Starter Website',
    tagline: 'Professional online presence for small businesses',
    price: '4,999',
    cta: 'Choose Starter',
    features: [
      'Professional website pages',
      'Responsive design for mobile, tablet & desktop',
      'Custom UI/UX design',
      'Contact / enquiry form',
      'Google Maps integration',
      'Gallery section',
      'Basic SEO setup',
      'Social media icon links',
      'Domain setup assistance',
      'Hosting setup assistance',
      '6 months free service'
    ]
  },
  {
    name: 'Business Website',
    tagline: 'Website + database + ordering + business management',
    price: '14,999',
    cta: 'Choose Business',
    featured: true,
    features: [
      'Everything included in Starter Website',
      'Menu / product catalogue',
      'Google Search Console setup',
      'Admin panel',
      'Supabase database',
      'Online ordering',
      'Custom business features',
      '1 year free service'
    ]
  }
];

export const PROJECTS = [
  {
    name: 'Revolution Classes',
    tag: 'Coaching Institute',
    url: 'https://www.revolutionclasses.com',
    domain: 'revolutionclasses.com',
    thumb: 'revolution',
    text: 'A modern and professional coaching institute website with faculty, gallery, courses and enquiry sections.',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    name: 'Chatkara Restaurant',
    tag: 'Restaurant',
    url: 'https://chatkararesturant.com/',
    domain: 'chatkararesturant.com',
    thumb: 'chatkara',
    text: 'A vibrant family restaurant website for Barh, Patna — online menu with 73 dishes, add-to-cart ordering, bestsellers, special offers and customer reviews.',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    name: 'Frontend Web Studio',
    tag: 'Web Agency',
    url: 'https://frontendwebstudio.com',
    domain: 'frontendwebstudio.com',
    thumb: 'fws',
    text: "Our own agency website — the premium, 3D-animated, fully responsive site you're on right now, built with React and Three.js.",
    tech: ['React', 'Vite', 'Three.js']
  }
];

export const TECH = [
  ['fa-brands fa-html5', 'HTML'],
  ['fa-brands fa-css3-alt', 'CSS'],
  ['fa-brands fa-js', 'JavaScript'],
  ['fa-brands fa-react', 'React'],
  ['fa-solid fa-bolt-lightning', 'Vite'],
  ['fa-solid fa-cube', 'Three.js'],
  ['fa-brands fa-bootstrap', 'Bootstrap'],
  ['fa-brands fa-node-js', 'Node.js'],
  ['fa-solid fa-server', 'Express.js'],
  ['fa-solid fa-leaf', 'MongoDB'],
  ['fa-solid fa-diagram-project', 'Mongoose'],
  ['fa-solid fa-database', 'Supabase'],
  ['fa-brands fa-github', 'GitHub'],
  ['fa-brands fa-figma', 'Figma'],
  ['fa-solid fa-magnifying-glass-chart', 'SEO']
];

export const FAQS = [
  ['How long does it take to build a website?', "Most business websites are delivered within 5-10 days depending on the package and number of pages. Larger or custom projects may take longer — we'll give you a clear timeline before we start."],
  ['Do you provide website maintenance after launch?', 'Yes. Every package includes a free support window after launch, and we offer affordable ongoing maintenance plans for updates, fixes, and content changes after that.'],
  ['Will my website be mobile responsive?', 'Absolutely. Every website we build is fully responsive and tested across mobile, tablet, laptop, and desktop screens before delivery.'],
  ['Do you provide hosting and domain services?', 'We can guide you through choosing and setting up hosting and a domain, and we handle the full deployment so your website goes live smoothly.'],
  ['What is the payment process?', 'We typically work with a small advance to begin the project and the remaining balance on delivery. Payment terms can be discussed based on your project size.'],
  ['Do you build websites for businesses in Patna and Bihar?', 'Yes — Frontend Web Studio is based in Patna, Bihar, and we specialize in websites for local businesses, coaching institutes, schools and startups in Patna and across Bihar. We also work remotely with clients anywhere in India.']
];

export const REQUIREMENTS = [
  'Business Website',
  'Portfolio Website',
  'Coaching / School Website',
  'Restaurant Website',
  'Landing Page',
  'Website Redesign',
  'Graphic Design (Poster / Banner)',
  'Other'
];

import { forwardRef, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Menu } from 'lucide-react';
import avatarBase from './assets/avatar-base.jpeg';
import avatarMask from './assets/avatar-mask.png';

const portfolioImages = import.meta.glob('./assets/portfolio/*.{png,jpg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const img = (name: string) => portfolioImages[`./assets/portfolio/${name}`];

const MARQUEE_ROW_1 = [
  'img_01.jpg',
  'img_02.jpg',
  'img_03.webp',
  'img_04.jpg',
  'img_05.webp',
  'img_06.webp',
].map(img);
const MARQUEE_ROW_2 = [
  'img_07.jpg',
  'img_08.jpg',
  'img_09.jpg',
  'img_10.jpg',
  'img_11.webp',
].map(img);

const TRAITS = [
  { icon: '🎬', label: 'Creator', desc: 'YouTube · Instagram · X · LinkedIn' },
  { icon: '⚡', label: 'Tech Enthusiast', desc: 'AI · Code · Automation · Python' },
  { icon: '👁', label: 'Visual Thinker', desc: 'Renders · Thumbnails · Wallpapers' },
  { icon: '🚗', label: 'Automotive Fan', desc: 'BMW M4 · M1 · Luxury & Hypercars' },
  { icon: '📚', label: 'Learning-Oriented', desc: 'Step-by-step · Beginner-friendly' },
  { icon: '📲', label: 'Social-Media Active', desc: 'Reels · Posts · Short-form Content' },
  { icon: '🔧', label: 'Hands-on Builder', desc: 'Ideas → Real Projects → Online' },
  { icon: '⚙️', label: 'Efficiency-Minded', desc: 'Clean · Concise · Fast Output' },
];

const SERVICES = [
  {
    num: '01',
    name: '3D Modeling',
    desc: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    num: '02',
    name: 'Rendering',
    desc: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    num: '03',
    name: 'Motion Design',
    desc: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    num: '04',
    name: 'Branding',
    desc: 'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.',
  },
  {
    num: '05',
    name: 'Web Design',
    desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

const PROJECTS = [
  {
    num: '01',
    name: 'BMW M1 WEBSITE',
    category: 'Personal',
    col1: [img('img_12.png'), img('img_13.png')],
    col2: img('img_14.png'),
  },
  {
    num: '02',
    name: 'YouTube Dashboard',
    category: 'Personal',
    col1: [img('img_15.png'), img('img_16.png')],
    col2: img('img_17.png'),
  },
  {
    num: '03',
    name: 'KIKA RINGS',
    category: 'Client',
    col1: [img('img_18.png'), img('img_19.png')],
    col2: img('img_20.png'),
  },
  {
    num: '04',
    name: 'BMW M4',
    category: 'Personal',
    col1: [img('img_21.png'), img('img_22.png')],
    col2: img('img_23.png'),
  },
  {
    num: '05',
    name: 'HEADPHONES SCROLL BASED',
    category: 'Personal',
    col1: [img('img_24.png'), img('img_25.png')],
    col2: img('img_26.png'),
  },
];

const SPOTLIGHT_R = 260;

const spotlightMask = (x: number, y: number) =>
  `radial-gradient(circle ${SPOTLIGHT_R}px at ${x}px ${y}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%)`;

const RevealLayer = forwardRef<HTMLDivElement, { image: string }>(
  function RevealLayer({ image }, ref) {
    return (
      <div
        ref={ref}
        className="absolute inset-0 bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'auto 72%',
          backgroundPosition: 'center bottom',
          maskImage: spotlightMask(-999, -999),
          WebkitMaskImage: spotlightMask(-999, -999),
        }}
      />
    );
  }
);

function Logo() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 256 256"
      fill="#111827"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#price' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function GradientButton({
  children,
  href,
  className = '',
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white hover:opacity-90 transition-opacity duration-200 ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      {children}
    </a>
  );
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform 0.7s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.disconnect();
        }
      },
      { rootMargin: '50px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function SpotlightHero() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      const dx = mouse.current.x - smooth.current.x;
      const dy = mouse.current.y - smooth.current.y;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        smooth.current.x += dx * 0.1;
        smooth.current.y += dy * 0.1;
        const el = revealRef.current;
        if (el) {
          const mask = spotlightMask(smooth.current.x, smooth.current.y);
          el.style.maskImage = mask;
          el.style.setProperty('-webkit-mask-image', mask);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden h-screen bg-white"
      style={{ height: '100dvh' }}
    >
      <div
        className="absolute inset-0 bg-no-repeat z-10 hero-zoom"
        style={{
          backgroundImage: `url(${avatarBase})`,
          backgroundSize: 'auto 72%',
          backgroundPosition: 'center bottom',
        }}
      />

      <RevealLayer ref={revealRef} image={avatarMask} />

      <div className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none">
        <h1 className="text-gray-900 leading-[0.95]">
          <span
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            Hi, i'm
          </span>
          <span
            className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            Kiyan
          </span>
        </h1>
      </div>

      <div
        className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.7s' }}
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          A 3D creator driven by crafting striking and unforgettable projects.
        </p>
      </div>

      <div
        className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Move your cursor across the portrait, then scroll to explore my
          work, services, and experiments.
        </p>
        <a
          href="#projects"
          className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-gray-900/30"
        >
          View Projects
        </a>
      </div>
    </section>
  );
}

function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el || !row1Ref.current || !row2Ref.current) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const t = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      row1Ref.current.style.transform = `translateX(${t - 200}px)`;
      row2Ref.current.style.transform = `translateX(${-(t - 200)}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      <div className="flex flex-col gap-3">
        <div
          ref={row1Ref}
          className="flex gap-3"
          style={{ willChange: 'transform' }}
        >
          {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="rounded-2xl object-cover flex-shrink-0"
              style={{ width: 420, height: 270 }}
            />
          ))}
        </div>
        <div
          ref={row2Ref}
          className="flex gap-3"
          style={{ willChange: 'transform' }}
        >
          {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="rounded-2xl object-cover flex-shrink-0"
              style={{ width: 420, height: 270 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl">
        <Reveal>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 sm:mt-14 md:mt-16 w-full max-w-[620px]">
          <p
            className="font-medium leading-relaxed"
            style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          >
            Creator, builder, and visual thinker. i make content, build
            projects, and obsess over clean design — from AI tools and code to
            hypercars and high-end visuals.
          </p>
        </Reveal>
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          {TRAITS.map((trait, i) => (
            <Reveal key={trait.label} delay={0.05 * i}>
              <div
                className="flex flex-col items-center text-center gap-2 px-3 py-5 sm:py-6 rounded-2xl h-full"
                style={{
                  background: 'rgba(215, 226, 234, 0.04)',
                  border: '1px solid rgba(215, 226, 234, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>
                  {trait.icon}
                </span>
                <span
                  className="font-medium"
                  style={{ color: '#D7E2EA', fontSize: '0.95rem' }}
                >
                  {trait.label}
                </span>
                <span
                  className="font-light"
                  style={{ color: '#D7E2EA', opacity: 0.5, fontSize: '0.75rem' }}
                >
                  {trait.desc}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section
      id="price"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] relative z-10"
      style={{ background: '#FFFFFF' }}
    >
      <Reveal>
        <h2
          className="font-black uppercase text-center"
          style={{
            color: '#0C0C0C',
            fontSize: 'clamp(3rem, 12vw, 160px)',
            marginBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          Services
        </h2>
      </Reveal>
      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <Reveal key={service.num} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : 'none',
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              <span
                className="font-black leading-none flex-shrink-0"
                style={{
                  color: '#0C0C0C',
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                  lineHeight: 1,
                }}
              >
                {service.num}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3 pt-1 sm:pt-2 md:pt-4">
                <span
                  className="font-medium uppercase"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </span>
                <span
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: '#0C0C0C',
                    opacity: 0.6,
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  }}
                >
                  {service.desc}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <div
      className="h-[85vh] flex items-start"
      style={{ position: 'sticky', top: '6rem' }}
    >
      <div
        style={{
          position: 'relative',
          top: `${index * 28}px`,
          width: '100%',
          background: '#0C0C0C',
          borderRadius: 'clamp(40px, 4vw, 60px)',
          border: '2px solid #D7E2EA',
          padding: 'clamp(1rem, 2vw, 2rem)',
        }}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="font-black leading-none"
              style={{ color: '#D7E2EA', fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            >
              {project.num}
            </span>
            <div className="flex flex-col gap-1">
              <span
                className="font-light uppercase tracking-widest"
                style={{
                  color: '#D7E2EA',
                  opacity: 0.5,
                  fontSize: 'clamp(0.7rem, 1.4vw, 1rem)',
                }}
              >
                {project.category}
              </span>
              <span
                className="font-medium uppercase"
                style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <button
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200"
            style={{ background: 'transparent', cursor: 'pointer' }}
          >
            Live Project
          </button>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col gap-3" style={{ width: '40%' }}>
            <img
              src={project.col1[0]}
              alt={project.name}
              loading="lazy"
              style={{
                width: '100%',
                objectFit: 'cover',
                borderRadius: 'clamp(40px, 4vw, 60px)',
                height: 'clamp(130px, 16vw, 230px)',
              }}
            />
            <img
              src={project.col1[1]}
              alt={project.name}
              loading="lazy"
              style={{
                width: '100%',
                objectFit: 'cover',
                borderRadius: 'clamp(40px, 4vw, 60px)',
                height: 'clamp(160px, 22vw, 340px)',
              }}
            />
          </div>
          <div style={{ width: '60%' }}>
            <img
              src={project.col2}
              alt={project.name}
              loading="lazy"
              style={{
                width: '100%',
                objectFit: 'cover',
                borderRadius: 'clamp(40px, 4vw, 60px)',
                height: '100%',
                maxHeight:
                  'calc(clamp(130px, 16vw, 230px) + clamp(160px, 22vw, 340px) + 0.75rem)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 -mt-10 sm:-mt-12 md:-mt-14 relative z-10"
      style={{
        background: '#0C0C0C',
        borderRadius: 'clamp(40px, 4vw, 60px) clamp(40px, 4vw, 60px) 0 0',
      }}
    >
      <Reveal className="mb-16 sm:mb-20 md:mb-24">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </Reveal>
      <div>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 flex flex-col items-center text-center"
      style={{ background: '#0C0C0C' }}
    >
      <Reveal>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Contact
        </h2>
      </Reveal>
      <Reveal delay={0.15} className="mt-8 sm:mt-10">
        <p
          className="font-light max-w-xl mx-auto leading-relaxed"
          style={{ color: '#D7E2EA', opacity: 0.7, fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
        >
          Have a project in mind? Let's build something striking and
          unforgettable together.
        </p>
      </Reveal>
      <Reveal delay={0.3} className="mt-10 sm:mt-12">
        <GradientButton
          href="mailto:kiyankastudio@gmail.com"
          className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4"
        >
          Contact Me
        </GradientButton>
      </Reveal>
      <p
        className="mt-20 sm:mt-24 text-xs uppercase tracking-widest"
        style={{ color: '#D7E2EA', opacity: 0.35 }}
      >
        © 2026 Kiyan — 3D Creator
      </p>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-gray-900 text-2xl font-playfair italic">
            My portfolio
          </span>
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-black/5 backdrop-blur-md border border-black/10 rounded-full px-2 py-2 items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-600 hover:bg-black/10 hover:text-gray-900 transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <GradientButton
          href="#contact"
          className="hidden md:inline-block px-6 py-2.5"
        >
          Contact Me
        </GradientButton>

        <button className="md:hidden text-gray-900 p-2" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </nav>

      <SpotlightHero />

      <div className="font-kanit" style={{ background: '#0C0C0C', overflowX: 'clip' }}>
        <Marquee />
        <About />
        <Services />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;

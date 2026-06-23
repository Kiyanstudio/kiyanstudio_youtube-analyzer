import { useState } from 'react'
import { ArrowUpRight, Award, Crown, X, Phone, Mail } from 'lucide-react'
import { TiltCard, Reveal, CountUp } from './interactions'

const VIDEO_SRC = '/hero.mp4'

const NAV_LINKS = ['Gallery', 'About', 'Services', 'Projects', 'Contact']

const STATS = [
  { value: '250+', label: 'Brands Transformed' },
  { value: '95%', label: 'Client Retention' },
  { value: '10+', label: 'Years in the Game' },
]

// Gallery marquee — two rows of renders pulled from the portfolio
const GALLERY_ROW_1 = [
  '/portfolio/img-02.jpg',
  '/portfolio/img-03.jpg',
  '/portfolio/img-04.jpg',
  '/portfolio/img-05.jpg',
  '/portfolio/img-06.jpg',
]
const GALLERY_ROW_2 = [
  '/portfolio/img-12.jpg',
  '/portfolio/img-13.jpg',
  '/portfolio/img-14.webp',
  '/portfolio/img-15.webp',
  '/portfolio/img-16.webp',
]

const ABOUT_STATS = [
  { value: '20+', label: 'Projects shipped' },
  { value: '5', label: 'Core services' },
  { value: '100%', label: 'Hands-on built' },
]

const TRAITS = [
  { icon: '🎬', title: 'Creator', desc: 'YouTube · Instagram · X · LinkedIn' },
  { icon: '⚡', title: 'Tech enthusiast', desc: 'AI · Code · Automation · Python' },
  { icon: '👁️', title: 'Visual thinker', desc: 'Renders · Thumbnails · Wallpapers' },
  { icon: '🚗', title: 'Automotive fan', desc: 'BMW M4 · M1 · Hypercars' },
  { icon: '📚', title: 'Learning-oriented', desc: 'Step-by-step · Beginner-friendly' },
  { icon: '📲', title: 'Social-media active', desc: 'Reels · Posts · Short-form' },
  { icon: '🔧', title: 'Hands-on builder', desc: 'Ideas → Real projects → Online' },
  { icon: '⚙️', title: 'Efficiency-minded', desc: 'Clean · Concise · Fast output' },
]

const KEYWORDS = ['3D Creator', 'Web Design', 'Content', 'Automotive', 'AI Tools', 'Visuals']

const SERVICES = [
  {
    num: '01',
    title: 'Content',
    desc: 'Creating engaging, high-quality visual content — from social-media posts to branded assets — that captures attention and communicates your story.',
  },
  {
    num: '02',
    title: 'Website making',
    desc: 'Building clean, modern, fully functional websites with attention to layout, typography, and seamless user experience.',
  },
  {
    num: '03',
    title: 'School work',
    desc: 'Helping with academic projects, presentations, and assignments — well-researched, clearly structured, and delivered on time.',
  },
]

const PROJECTS = [
  { num: '01', tag: 'Personal', title: 'BMW M1 Website', img: '/portfolio/img-22.png', url: '/projects/bmw-m1.html', wide: true },
  { num: '02', tag: 'Personal', title: 'YouTube Dashboard', img: '/portfolio/img-23.png', url: '/projects/youtube-dashboard.html' },
  { num: '03', tag: 'Client', title: 'KIKA Rings', img: '/portfolio/img-24.png', url: '/projects/kika-rings.html' },
  { num: '04', tag: 'Personal', title: 'BMW M4', img: '/portfolio/img-25.png', url: '/projects/bmw-m4.html' },
  { num: '05', tag: 'Personal', title: 'Headphones — Scroll Based', img: '/portfolio/img-26.png', url: '/projects/headphones.html' },
  { num: '06', tag: 'Personal', title: 'FIFA World Cup', poster: 'from-emerald-700 via-green-600 to-yellow-500', url: '/projects/world-cup.html', wide: true },
  { num: '07', tag: 'Tool', title: 'Kiyan Studio Views Analyser', poster: 'from-sky-700 via-indigo-600 to-purple-600', url: '/projects/views-analyser.html' },
]

const SOCIALS = ['YouTube', 'Instagram', 'X / Twitter', 'LinkedIn']

const MARQUEE_MASK = {
  WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
  maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
} as const

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <main className="relative w-full">
      {/* Fixed video background (behind everything) */}
      <video
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/50" />

      {/* Navbar */}
      <nav className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
        <a
          href="#top"
          className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl"
        >
          KIYAN STUDIO
        </a>

        {/* Center nav links */}
        <div className="hidden items-center gap-8 lg:gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\W+/g, '')}`}
              className="font-inter text-sm uppercase tracking-widest text-white/80 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right CTA (md+) */}
        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white shadow-lg shadow-rose-500/30 transition-all hover:shadow-xl hover:shadow-pink-500/40 hover:brightness-110 md:flex"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          Get In Touch
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>

        {/* Hamburger (below md) */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col items-end space-y-1.5 md:hidden"
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-4 bg-white" />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
            KIYAN STUDIO
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        {/* Centered links */}
        <div className="flex h-[calc(100%-5rem)] flex-col items-center justify-center gap-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\W+/g, '')}`}
              onClick={() => setMenuOpen(false)}
              className="font-podium text-4xl uppercase text-white sm:text-5xl"
              style={{
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                transitionDelay: `${i * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link}
            </a>
          ))}

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false)
              setContactOpen(true)
            }}
            className="mt-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 px-8 py-4 font-inter text-sm uppercase tracking-widest text-white shadow-lg shadow-rose-500/30"
            style={{
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: `${NAV_LINKS.length * 80 + 100}ms`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Get In Touch
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Contact modal */}
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center px-6 transition-all duration-300 ${
          contactOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setContactOpen(false)}
        />

        {/* Card */}
        <div
          className={`relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/80 p-8 shadow-2xl shadow-rose-500/20 transition-all duration-300 sm:p-10 ${
            contactOpen ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
          }`}
        >
          {/* Red-pink gradient glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-red-600 via-rose-500 to-pink-500 opacity-40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-pink-600 to-red-500 opacity-30 blur-3xl" />

          {/* Close */}
          <button
            type="button"
            aria-label="Close contact"
            onClick={() => setContactOpen(false)}
            className="absolute right-5 top-5 text-white/60 transition-colors hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative">
            <p className="font-inter text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
              Let's Talk
            </p>
            <h2 className="mt-2 font-podium text-3xl uppercase tracking-tight text-white sm:text-4xl">
              Get In Touch
            </h2>
            <p className="mt-3 font-inter text-sm leading-relaxed text-white/60">
              Ready to build something fierce? Reach out — we'd love to hear from you.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+919618444653"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-rose-400/40 hover:bg-white/10"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-inter text-[10px] uppercase tracking-widest text-white/40">
                    Phone
                  </span>
                  <span className="block font-inter text-base font-semibold text-white">
                    +91 96184 44653
                  </span>
                </span>
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kiyankastudio@gmail.com&su=Let%27s%20work%20together&body=Hi%20KIYAN%20STUDIO%20team%2C"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-pink-400/40 hover:bg-white/10"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-600 text-white shadow-lg shadow-pink-500/30">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-inter text-[10px] uppercase tracking-widest text-white/40">
                    Email
                  </span>
                  <span className="block truncate font-inter text-base font-semibold text-white">
                    kiyankastudio@gmail.com
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION — content over the live 3D scene */}
      <section id="top" className="relative h-screen w-full overflow-hidden">
        {/* Readability gradient so left-aligned text stays crisp over the video */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        {/* Hero content */}
        <div className="relative z-20 flex h-full flex-col justify-center px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            {/* Tagline */}
            <div className="mb-6 flex items-center gap-3 lg:mb-8 animate-fade-up">
              <Crown className="h-4 w-4 text-white/70" />
              <span className="font-inter text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm">
                World-Class Digital Collective
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-podium uppercase leading-[0.92] tracking-tight text-white animate-fade-up-delay-1">
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Design.</span>
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Disrupt.</span>
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Conquer.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-md font-inter text-sm leading-relaxed text-white/70 sm:text-base lg:mt-8 animate-fade-up-delay-2">
              We build fierce brand identities
              <br />
              that don't just turn heads — <span className="font-bold text-white">they lead.</span>
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-10 animate-fade-up-delay-3">
              <a
                href="#projects"
                className="group flex items-center gap-2 bg-black px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-neutral-900 sm:px-7 sm:py-4 sm:text-xs"
              >
                See Our Work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <div className="hidden items-center gap-3 sm:flex">
                <Award className="h-8 w-8 text-white/50" />
                <div className="font-inter text-xs uppercase tracking-wider text-white/60">
                  <p>Top-Rated</p>
                  <p>Brand Studio</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-6 sm:mt-10 sm:gap-12 lg:mt-14 lg:gap-16 animate-fade-up-delay-4">
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <CountUp
                    value={stat.value}
                    className="block font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                  />
                  <p className="mt-1 font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="relative overflow-hidden bg-black/80 py-16 sm:py-20 lg:py-24">
        <div className="mb-10 px-6 sm:mb-14 sm:px-10 lg:px-16">
          <span className="font-inter text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
            // Visual Work
          </span>
          <h2 className="mt-3 font-podium text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none tracking-tight text-white">
            Gallery
          </h2>
        </div>

        <div className="marquee-pause flex flex-col gap-5 sm:gap-6" style={MARQUEE_MASK}>
          {/* Row 1 */}
          <div className="flex w-max animate-marquee gap-5 sm:gap-6">
            {[...GALLERY_ROW_1, ...GALLERY_ROW_1].map((src, i) => (
              <div
                key={`r1-${i}`}
                className="group relative aspect-[16/10] w-64 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-80 lg:w-96"
              >
                <img
                  src={src}
                  alt="Render"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex w-max animate-marquee-reverse gap-5 sm:gap-6">
            {[...GALLERY_ROW_2, ...GALLERY_ROW_2].map((src, i) => (
              <div
                key={`r2-${i}`}
                className="group relative aspect-[16/10] w-64 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-80 lg:w-96"
              >
                <img
                  src={src}
                  alt="Render"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="relative overflow-hidden bg-black/80 px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-red-600 to-pink-500 opacity-10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 sm:mb-16">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
              // Who I Am
            </span>
            <h2 className="mt-3 font-podium text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none tracking-tight text-white">
              About Me
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Left: avatar + lead + stats */}
            <div>
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                {/* Avatar with gradient ring */}
                <div className="relative h-32 w-32 shrink-0 rounded-full bg-gradient-to-br from-red-600 via-rose-500 to-pink-500 p-1 shadow-xl shadow-rose-500/30">
                  <div className="h-full w-full overflow-hidden rounded-full bg-neutral-900">
                    <img
                      src="/portfolio/img-01.png"
                      alt="Kiyan avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <p className="font-inter text-lg leading-relaxed text-white/80 sm:text-xl">
                  Creator, builder, and visual thinker. I make content, build projects, and{' '}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                    obsess over clean design
                  </span>{' '}
                  — from AI tools and code to hypercars and high-end visuals.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
                {ABOUT_STATS.map((stat) => (
                  <div key={stat.label}>
                    <CountUp
                      value={stat.value}
                      className="block font-inter text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    />
                    <p className="mt-1 font-inter text-[10px] uppercase tracking-widest text-white/50 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: traits grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {TRAITS.map((trait) => (
                <TiltCard
                  key={trait.title}
                  max={14}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-rose-400/40 hover:bg-white/[0.06]"
                >
                  <span className="block text-2xl [transform:translateZ(35px)]">{trait.icon}</span>
                  <h4 className="mt-2 font-inter text-sm font-semibold text-white [transform:translateZ(22px)]">
                    {trait.title}
                  </h4>
                  <p className="mt-1 font-inter text-xs leading-relaxed text-white/50 [transform:translateZ(12px)]">
                    {trait.desc}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Keyword marquee */}
          <div className="marquee-pause mt-16 overflow-hidden sm:mt-20" style={MARQUEE_MASK}>
            <div className="flex w-max animate-marquee items-center gap-8 sm:gap-12">
              {[...KEYWORDS, ...KEYWORDS, ...KEYWORDS, ...KEYWORDS].map((kw, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 font-podium text-2xl uppercase tracking-tight text-white/15 sm:gap-12 sm:text-4xl"
                >
                  {kw}
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section
        id="services"
        className="relative overflow-hidden bg-black/80 px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-inter text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                // What I Do
              </span>
              <h2 className="mt-3 font-podium text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none tracking-tight text-white">
                Services
              </h2>
            </div>
            <p className="max-w-sm font-inter text-sm leading-relaxed text-white/50">
              Three things I do well — built clean, delivered fast, and made to look the part.
            </p>
          </div>

          <div className="mt-12 border-t border-white/10 sm:mt-16">
            {SERVICES.map((service, i) => (
              <Reveal key={service.num} delay={i * 90}>
              <div
                className="group relative flex items-center gap-5 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.02] sm:gap-8 sm:py-9"
              >
                <span className="font-inter text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 sm:text-base">
                  {service.num}
                </span>
                <div className="flex-1">
                  <h3 className="font-podium text-2xl uppercase tracking-tight text-white transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-2xl font-inter text-sm leading-relaxed text-white/50">
                    {service.desc}
                  </p>
                </div>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-400 sm:h-8 sm:w-8" />
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="relative overflow-hidden bg-black/80 px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
      >
        {/* Ambient red-pink glow */}
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-red-600 to-pink-500 opacity-10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 opacity-10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section heading */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-inter text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                // Selected Work
              </span>
              <h2 className="mt-3 font-podium text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none tracking-tight text-white">
                Projects
              </h2>
            </div>
            <p className="max-w-sm font-inter text-sm leading-relaxed text-white/50">
              A mix of personal experiments and client builds. Every one shipped and live.
            </p>
          </div>

          {/* Project grid */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.num} delay={i * 60} className={project.wide ? 'sm:col-span-2' : ''}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 transition-all duration-500 hover:-translate-y-1 hover:border-rose-400/40">
                  {/* Media — project screenshot */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {project.img ? (
                      <img
                        src={project.img}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.poster}`}
                      >
                        <span className="px-6 text-center font-podium text-2xl uppercase tracking-tight text-white/90 sm:text-3xl">
                          {project.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Number */}
                    <span className="absolute left-5 top-4 font-podium text-3xl leading-none text-white/80 sm:text-4xl">
                      {project.num}
                    </span>

                    {/* Live badge — opens the project's own site */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-inter text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm transition-all hover:border-emerald-400/60 hover:bg-black/60 hover:text-white"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      Live
                    </a>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <span className="font-inter text-[11px] uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                      {project.tag}
                    </span>
                    <h3 className="mt-2 flex items-center gap-2 font-podium text-xl uppercase tracking-tight text-white sm:text-2xl">
                      {project.title}
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="relative overflow-hidden bg-black/70 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-red-600 via-rose-500 to-pink-500 opacity-15 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="font-inter text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
            // Let's Build Something
          </span>
          <h2 className="mt-5 font-podium text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.9] tracking-tight text-white">
            Let's Talk
          </h2>

          <div className="mt-10 flex justify-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=kiyankastudio@gmail.com&su=Let%27s%20work%20together&body=Hi%20KIYAN%20STUDIO%20team%2C"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 px-8 py-4 font-inter text-sm font-medium text-white shadow-lg shadow-rose-500/30 transition-all hover:shadow-xl hover:shadow-pink-500/40 hover:brightness-110 sm:text-base"
            >
              kiyankastudio@gmail.com
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {SOCIALS.map((social) => (
              <a
                key={social}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-8 sm:flex-row sm:px-10 lg:px-16">
        <span className="font-inter text-xs tracking-wider text-white/40">
          © {new Date().getFullYear()} Kiyan — 3D Creator
        </span>
        <span className="font-inter text-xs tracking-wider text-white/40">
          Designed &amp; built hands-on · Made on Earth 🌍
        </span>
      </footer>
    </main>
  )
}

export default App

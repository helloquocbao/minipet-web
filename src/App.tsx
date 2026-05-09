import React from 'react';
import { Download, Monitor, Clock, Zap, Heart, ArrowLeft, Check } from 'lucide-react';
import { FaTwitter, FaGithub } from 'react-icons/fa';

/* ─── CONTAINER WRAPPER ─── */
const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

/* ─── NAVBAR ─── */
function Navbar({ setPage }: { setPage: (p: string) => void }) {
  return (
    <header className="fixed top-3 left-0 right-0 z-50 pointer-events-none">
      <Container>
        <div className="flex items-center w-full bg-white/85 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl px-5 py-2.5 pointer-events-auto">
          {/* Logo */}
          <button
            onClick={() => setPage('home')}
            className="flex items-center gap-2 mr-auto cursor-pointer bg-transparent border-none p-0 group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#111827] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white text-[11px] leading-none">🐾</span>
            </div>
            <span className="text-[14px] font-extrabold text-[#111827] tracking-tight">MiniPet</span>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 mr-6">
            {['Features', 'Gallery', 'Productivity', 'Does'].map((l) => (
              <button
                key={l}
                onClick={() => {
                  setPage('home');
                  setTimeout(
                    () => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }),
                    80
                  );
                }}
                className="text-[13px] font-semibold text-gray-500 hover:text-[#111827] transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                {l}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <button className="btn-dark !rounded-xl !py-1.5 !px-4 !text-[13px]">Download Free</button>
        </div>
      </Container>
    </header>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="pt-24 sm:pt-28 md:pt-36 pb-10 md:pb-16 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
          {/* Left copy */}
          <div className="z-10 order-2 md:order-1 text-center md:text-left">
            <h1 className="text-[#111827] font-[900] leading-[1.08] tracking-tight mb-4 text-[36px] sm:text-[46px] lg:text-[54px]">
              Meet your new<br />
              productivity<br />
              sidekick.
            </h1>
            <p className="text-gray-500 text-[13.5px] sm:text-[14px] leading-relaxed mb-6 max-w-sm mx-auto md:mx-0">
              MiniPet is a lightweight desktop app that brings a cute pixel companion to your workspace. They walk, talk, and react while you work.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-5">
              <a href="#download" className="btn-dark !rounded-2xl !py-2.5 !px-6 !text-[13px]">
                <Download size={16} /> Get MiniPet Free
              </a>
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost !rounded-2xl !py-2.5 !px-6 !text-[13px]"
              >
                <FaGithub size={16} /> Source Code
              </a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-[12px] font-semibold text-gray-400">
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-green-500" /> No Ads
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-green-500" /> No Account Needed
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-green-500" /> 100% Privacy
              </span>
            </div>
          </div>

          {/* Right — pet image */}
          <div className="relative flex justify-center items-center order-1 md:order-2 py-4">
            {/* Outer ambient glow */}
            <div className="absolute inset-[-30%] bg-gradient-to-tr from-blue-300/30 via-purple-300/20 to-pink-300/30 blur-[100px] rounded-full" />
            {/* Circular gradient orb that pet blends into */}
            <div
              className="relative flex items-center justify-center"
              style={{
                background: 'radial-gradient(ellipse 90% 90% at 50% 55%, #e0d4ff 0%, #f0d8ff 45%, #ffd8f0 75%, transparent 100%)',
                width: 'min(460px, 100%)',
                height: 'min(460px, 100vw)',
                borderRadius: '50%',
              }}
            >
              <img
                src="/hero-pet-new.png"
                alt="MiniPet Astronaut companion"
                className="w-[80%] h-[80%] object-contain hero-float"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── FEATURES — BENTO GRID ─── */
function Features() {
  return (
    <section id="features" className="pb-10 md:pb-20">
      <Container>
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-[900] text-[#111827] tracking-tight leading-tight mb-3">
            Everything you need
          </h2>
          <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-md mx-auto leading-relaxed">
            A full-featured desktop companion packed with tools to keep you productive and entertained.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* ── Top Row: Compact Indented Cards ── */}
          <div className="md:col-span-12 md:px-20 lg:px-40 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ── Large: Live Desktop Companion ── */}
              <div className="card overflow-hidden flex flex-col">
                <div
                  className="flex-1 bg-gradient-to-br from-[#dde8ff] to-[#cdd8f8] flex items-center justify-center overflow-hidden"
                  style={{ minHeight: 180 }}
                >
                  <img
                    src="/feature-companion.png"
                    alt="Live desktop companion preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-[16px] font-extrabold text-[#111827] mb-1">Live Desktop Companion</h3>
                  <p className="text-[12.5px] text-gray-500 leading-relaxed max-w-sm">
                    Your pixel pet lives right on your screen — walking, talking, and bringing joy to every work session.
                  </p>
                </div>
              </div>

              {/* ── Pomodoro Timer ── */}
              <div className="card overflow-hidden flex flex-col">
                {/* Image fills remaining space */}
                <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-rose-50 to-orange-50" style={{ minHeight: 180 }}>
                  <img
                    src="/card-pomodoro.png"
                    alt="Cute cat with Pomodoro timer"
                    className="w-full h-full object-contain object-bottom"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                  {/* Timer pill */}
                  <div className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                    <Clock size={10} /> 25:00
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-gray-600 px-2 py-0.5 rounded-full shadow-sm">Focus mode</div>
                </div>
                {/* Text always at bottom */}
                <div className="p-4 md:p-5 border-t border-gray-100/80">
                  <h3 className="text-[16px] font-extrabold text-[#111827] mb-1">Pomodoro Timer</h3>
                  <p className="text-[12.5px] text-gray-500 leading-relaxed max-w-sm">
                    Customisable work/break cycles with your pet — gently nudging you when it's time to rest.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom row: 3 equal cards ── */}

          {/* Desktop Overlay */}
          <div className="md:col-span-4 card overflow-hidden flex flex-col">
            <div className="relative overflow-hidden" style={{ height: 170 }}>
              <img
                src="/card-overlay.png"
                alt="Pet walking across desktop"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="bg-white/95 text-[11px] font-bold text-gray-700 px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Monitor size={10} /> Always on top
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-extrabold text-[#111827] mb-1">Desktop Overlay</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Your pet lives on top of every window. Drag them anywhere, or watch them wander your screen.
              </p>
            </div>
          </div>

          {/* Context Awareness */}
          <div className="md:col-span-4 card overflow-hidden flex flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50" style={{ height: 170 }}>
              <img
                src="/card-context.png"
                alt="Cats reacting to different contexts"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
              <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Coding 💻</span>
                <span className="bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Watching 🎬</span>
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Reading 📖</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-extrabold text-[#111827] mb-1">Context Awareness</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Your pet detects what you're doing and reacts — hyped during coding sprints, chill when you're relaxing.
              </p>
            </div>
          </div>

          {/* PetDex & Custom Pets */}
          <div className="md:col-span-4 card overflow-hidden flex flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50" style={{ height: 170 }}>
              <img
                src="/card-petdex.png"
                alt="Import from PetDex and custom pets"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Download size={10} /> PetDex Ready
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-extrabold text-[#111827] mb-1">PetDex & Custom Pets</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Import from our massive PetDex library or upload your own pixel art to create a truly unique companion.
              </p>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}

/* ─── PRODUCTIVITY ─── */
function ProductivitySection() {
  const items = [
    { icon: <Clock size={16} />, label: 'Pomodoro Timer', desc: 'Customisable work/break intervals', bg: '#ecf9ff' },
    { icon: <Zap size={16} />, label: 'Smart Reminders', desc: 'Stretch with hydration lines', bg: '#fffbeb' },
    { icon: <Monitor size={16} />, label: 'Focus Stats', desc: 'Track your productivity daily', bg: '#fdf2f8' },
  ];

  return (
    <section id="productivity" className="py-10 md:py-20">
      <Container>
        <div className="card overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch !bg-white/50">
          {/* Pet side */}
          <div className="relative flex items-end justify-center bg-gradient-to-br from-indigo-50 to-blue-100/60 border-b md:border-b-0 md:border-r border-blue-200/50 min-h-[280px] sm:min-h-[300px] md:min-h-[380px] overflow-hidden">
            <img
              src="/hero-pet-new.png"
              alt="MiniPet focus companion astronaut"
              className="w-auto max-h-[340px] md:max-h-[380px] object-contain object-bottom mb-4"
            />
          </div>

          {/* Text side */}
          <div className="p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-[900] text-[#111827] mb-7 leading-tight">
              Focus better with <span className="text-indigo-500">MiniPet</span>
            </h2>
            <div className="flex flex-col gap-5 items-center md:items-start">
              {items.map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0"
                    style={{ background: item.bg }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#111827]">{item.label}</div>
                    <div className="text-[13px] text-gray-400 font-medium">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="pt-12 pb-10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-200/60 pt-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#111827] flex items-center justify-center">
              <span className="text-white text-[11px]">🐾</span>
            </div>
            <span className="text-[15px] font-black text-[#111827] tracking-tight">MiniPet</span>
          </div>

          {/* Social icons */}
          <div className="flex gap-6">
            <a
              href="https://github.com/helloquocbao/mini-pet"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#111827] transition-all hover:scale-110"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110"
            >
              <FaTwitter size={20} />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="max-w-2xl text-center sm:text-left">
            <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
              <span className="font-bold text-gray-500">Disclaimer:</span> This application only provides tools; we do not own and are not responsible for content/images uploaded by users or linked from external sources.
            </p>
          </div>

          {/* Copyright */}
          <p className="text-[12px] text-gray-300 font-semibold flex-shrink-0">
            © 2036 MiniPet — Purely Colore, Furity, Inc.
          </p>
        </div>
      </Container>
    </footer>
  );
}

/* ─── APP ─── */
export default function App() {
  const [page, setPage] = React.useState('home');
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Animated background blobs */}
      <div className="blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <Navbar setPage={setPage} />

      {page === 'home' ? (
        <main>
          <Hero />
          <Features />
          <ProductivitySection />
        </main>
      ) : (
        <div className="pt-32 pb-20">
          <Container>
            <button onClick={() => setPage('home')} className="flex items-center gap-2 text-gray-500 mb-8">
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-4xl font-black mb-4">Documentation</h1>
            <p>Work in progress...</p>
          </Container>
        </div>
      )}

      <Footer />
    </div>
  );
}

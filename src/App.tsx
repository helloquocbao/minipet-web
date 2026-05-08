import React from 'react';
import { 
  Download, Sparkles, Shield, Monitor, ExternalLink, FileArchive, 
  FolderOpen, ArrowLeft, Heart, Clock, Palette, Coffee, Zap
} from 'lucide-react';
import { FaTwitter, FaGithub } from 'react-icons/fa';

/* ─── NAV ─── */
function Navbar({ setPage, currentPage }: { setPage: (p: string) => void, currentPage: string }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav className="liquid-glass rounded-full px-6 py-3 flex items-center gap-8 w-full max-w-[900px]">
        <div 
          className="flex items-center gap-2 mr-auto cursor-pointer"
          onClick={() => setPage('home')}
        >
          <div className="w-7 h-7 rounded-lg bg-[#0F172A] flex items-center justify-center">
            <span className="text-white text-[10px]">🐾</span>
          </div>
          <span className="font-grotesk text-[14px] font-bold text-[#0F172A]">MiniPet</span>
        </div>
        <div className="hidden md:flex gap-8">
          {['Features', 'Gallery', 'Productivity', 'Docs'].map(l => (
            <button 
              key={l} 
              onClick={() => {
                if (l === 'Docs') setPage('docs');
                else {
                  setPage('home');
                  setTimeout(() => {
                    document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`font-grotesk text-[13px] font-medium transition-colors ${
                (currentPage === 'docs' && l === 'Docs') || (currentPage === 'home' && l !== 'Docs')
                  ? 'text-[#10B981]' 
                  : 'text-[#475569] hover:text-[#10B981]'
              }`}>
              {l}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setPage('home')}
          className="btn-download text-[12px] px-5 py-2 rounded-full"
        >
          Download Free
        </button>
      </nav>
    </header>
  );
}

/* ─── HERO ─── */
const HERO_PETS = [
  { sprite: 'sprite-idle',  name: 'Wukong',     emoji: '🐒', rarity: 'Legendary', level: 12, happy: 97,  color: '#F59E0B' },
  { sprite: 'sprite-chonk', name: 'Chonk',      emoji: '🐱', rarity: 'Rare',      level: 7,  happy: 88,  color: '#8B5CF6' },
  { sprite: 'sprite-cosmo', name: 'Cosmo',      emoji: '🤖', rarity: 'Epic',      level: 9,  happy: 92,  color: '#4DA2FF' },
  { sprite: 'sprite-gray',  name: 'GrayCraft',  emoji: '🐺', rarity: 'Uncommon',  level: 5,  happy: 80,  color: '#64748B' },
];

function Hero() {
  const [idx, setIdx] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(prev => (prev + 1) % HERO_PETS.length);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const pet = HERO_PETS[idx];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-100/30 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] bg-emerald-50/40 rounded-full blur-[80px] animate-float" style={{ animationDelay: '-1.5s' }} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="pill pill-green mb-6">
            <Sparkles size={11} />
            Best Desktop Companion
          </div>

          <h1 className="font-grotesk text-[clamp(52px,7.5vw,92px)] font-bold leading-[1.05] text-[#1C1917] mb-8">
            <span className="text-gradient block">Your pet lives</span>
            on <span className="text-[#0D9488] relative">
              your
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#0D9488]/10 rounded-full blur-sm" />
            </span> screen
          </h1>

          <p className="font-mono text-[14px] text-[#475569] max-w-[420px] leading-relaxed mb-10">
            MiniPet is a lightweight desktop app that brings a cute pixel companion to your workspace. They walk, talk, and react while you work.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#download" className="btn-download px-8 py-4">
              <Download size={18} /> Get MiniPet Free
            </a>
            <a href="https://github.com/helloquocbao/mini-pet" target="_blank" rel="noreferrer" className="btn-download-outline">
              <FaGithub size={16} /> Source Code
            </a>
          </div>

          <div className="flex items-center gap-6 text-[12px] font-mono text-[#94A3B8]">
            <span>✓ No Ads</span>
            <span>✓ No Account Needed</span>
            <span>✓ 100% Privacy</span>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[600px] select-none">
          {/* Floating Pixels */}
          <div className="absolute top-10 right-10 w-4 h-4 bg-[#0D9488]/20 animate-pixel" />
          <div className="absolute bottom-20 left-10 w-6 h-6 bg-orange-200/30 animate-pixel" style={{ animationDelay: '-2s' }} />
          <div className="absolute top-1/2 -left-10 w-3 h-3 bg-teal-300/20 animate-pixel" style={{ animationDelay: '-4s' }} />
          <div className="absolute top-20 right-1/4 w-5 h-5 bg-purple-200/20 animate-pixel" style={{ animationDelay: '-1s' }} />

          {/* Glowing Aura behind pet */}
          <div className="absolute w-[450px] h-[450px] rounded-full opacity-30 blur-[120px] transition-colors duration-1000" 
               style={{ background: pet.color }} />
          
          <div
            className="relative flex items-end justify-center w-[320px] h-[320px] rounded-[60px] stage-glow"
            style={{
              background: `radial-gradient(ellipse at 60% 80%, ${pet.color}22 0%, transparent 70%)`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            <div
              className={`sprite ${pet.sprite}`}
              style={{ transform: 'scale(2.6)', transformOrigin: 'bottom center', marginBottom: 32 }}
            />
          </div>

          <div
            className="absolute top-6 left-0 liquid-glass rounded-2xl px-4 py-3 text-left z-30"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease 0.1s' }}
          >
            <div className="text-[10px] font-mono text-[#94A3B8] mb-1">Active Pet</div>
            <div className="font-grotesk text-[14px] text-[#0F172A]">{pet.emoji} {pet.name}</div>
            <div className="text-[10px] font-mono" style={{ color: pet.color }}>
              {pet.rarity} · Level {pet.level}
            </div>
          </div>

          <div
            className="absolute bottom-6 right-0 liquid-glass rounded-2xl px-4 py-3 text-left z-30"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease 0.15s' }}
          >
            <div className="text-[10px] font-mono text-[#94A3B8] mb-2">Happiness</div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pet.happy}%`, background: pet.color, transition: 'width 0.6s ease' }}
                />
              </div>
              <span className="font-grotesk text-[13px] text-[#0F172A]">{pet.happy}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ─── */
function Features() {
  const feats = [
    {
      icon: <Monitor size={22} className="text-[#0F172A]" />,
      title: 'Desktop Overlay',
      desc: 'Your pet lives on top of all windows. Drag them anywhere, or let them wander around your screen.',
    },
    {
      icon: <Clock size={22} className="text-[#10B981]" />,
      title: 'Pomodoro Timer',
      desc: 'Stay focused with an integrated Pomodoro timer. Your pet will remind you when it\'s time to break.',
    },
    {
      icon: <Palette size={22} className="text-[#F59E0B]" />,
      title: 'Customizable Skins',
      desc: 'Choose from our built-in collection or import your own pixel art pets from the community.',
    },
    {
      icon: <Zap size={22} className="text-[#8B5CF6]" />,
      title: 'Context Awareness',
      desc: 'Your pet reacts to what you do! They\'ll cheer you on while coding or chill while you watch videos.',
    },
    {
      icon: <Heart size={22} className="text-[#EC4899]" />,
      title: 'Interaction System',
      desc: 'Feed, pet, and play with your companion. Their happiness and level grow as you spend time together.',
    },
    {
      icon: <Shield size={22} className="text-[#4DA2FF]" />,
      title: 'Offline & Private',
      desc: 'No cloud, no accounts, no tracking. All your pet data stays safely on your local computer.',
    },
  ];

  return (
    <section id="features" className="w-full py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-4 relative">
          <div className="section-divider mb-4" />
          <h2 className="font-grotesk text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] text-[#0F172A]">
            Everything your <span className="text-[#0D9488] relative">
              pet needs
              <Sparkles className="absolute -top-6 -right-8 text-[#0D9488]/40 animate-pulse" size={32} />
            </span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {feats.map(f => (
            <div key={f.title} className="feature-card">
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <div className="font-grotesk text-[16px] font-bold text-[#0F172A] mb-2">{f.title}</div>
              <p className="font-mono text-[12px] text-[#64748B] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY ─── */
function Gallery() {
  const pets = [
    { cls: 'sprite-idle',  name: 'Wukong',    rarity: 'Legendary', score: '9.8', tag: 'pill-green' },
    { cls: 'sprite-chonk', name: 'Chonk',     rarity: 'Rare',      score: '7.4', tag: 'pill-blue' },
    { cls: 'sprite-cosmo', name: 'Cosmo',     rarity: 'Epic',      score: '8.2', tag: 'pill-green' },
  ];

  return (
    <section id="gallery" className="w-full py-24 lg:py-32 bg-[#F5F5F4]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
          <div>
            <div className="section-divider mb-4" />
            <h2 className="font-grotesk text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.1] text-[#0F172A]">
              Pet <span className="text-[#10B981]">Collection</span>
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map(pet => (
            <div key={pet.name} className="liquid-glass rounded-[28px] p-4 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="relative w-full pb-[90%] rounded-[20px] overflow-hidden bg-gradient-to-b from-[#F0FDF4] to-[#ECFDF5]">
                <div className="absolute inset-0 flex items-end justify-center pb-4">
                  <div className={`sprite ${pet.cls}`} style={{ transform: 'scale(1.8)', transformOrigin: 'bottom center' }} />
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`pill ${pet.tag}`}>{pet.rarity}</span>
                </div>
              </div>
              <div className="liquid-glass mt-3 rounded-[16px] px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-grotesk text-[15px] text-[#0F172A]">{pet.name}</div>
                  <div className="font-mono text-[11px] text-[#64748B]">Loyalty: {pet.score}/10</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCTIVITY ─── */
function ProductivitySection() {
  return (
    <section id="productivity" className="w-full py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-50/50 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative flex justify-center">
          <div className="relative w-[340px] h-[340px]">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-200 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-[15%] liquid-glass rounded-3xl flex flex-col items-center justify-center p-6 gap-3">
              <div className="sprite sprite-happy" style={{ transform: 'scale(1.5)', transformOrigin: 'center' }} />
              <div className="text-center mt-4">
                <div className="font-grotesk text-[14px] font-bold text-[#0F172A]">Break Time!</div>
                <div className="font-mono text-[11px] text-[#10B981]">25m focus complete</div>
              </div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center shadow-lg shadow-emerald-200 text-white">
              <Clock size={14} />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-lg shadow-orange-200 text-white">
              <Coffee size={14} />
            </div>
          </div>
        </div>
        <div>
          <div className="section-divider mb-4" />
          <h2 className="font-grotesk text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.1] text-[#0F172A] mb-6">
            Focus better <span className="text-[#10B981]">with MiniPet</span>
          </h2>
          <p className="font-mono text-[13px] text-[#475569] leading-relaxed mb-8 max-w-[440px]">
            MiniPet isn't just a toy. It's a productivity companion that uses the Pomodoro technique to help you stay focused while keeping you entertained with subtle, non-distracting animations.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: '⏱️', action: 'Pomodoro Timer', desc: 'Customizable work/break intervals' },
              { icon: '🔔', action: 'Smart Reminders', desc: 'Stretch and hydration alerts' },
              { icon: '📈', action: 'Focus Stats', desc: 'Track your productivity daily' },
            ].map(item => (
              <div key={item.action} className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC] hover:bg-[#F0FDF4] transition-colors">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-grotesk text-[13px] font-bold text-[#0F172A]">{item.action}</div>
                  <div className="font-mono text-[11px] text-[#64748B]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── DOCS PAGE ─── */
function DocsPage({ setPage }: { setPage: (p: string) => void }) {
  const steps = [
    {
      icon: <ExternalLink size={24} />,
      title: "Visit PetDex",
      desc: "Go to the official PetDex library to browse thousands of community-created pets.",
      link: "https://github.com/crafter-station/petdex",
      linkText: "View PetDex GitHub"
    },
    {
      icon: <FileArchive size={24} />,
      title: "Download as ZIP",
      desc: "Once you find a pet you like, click the 'Download as ZIP' button.",
    },
    {
      icon: <FolderOpen size={24} />,
      title: "Extract & Import",
      desc: "Extract the .zip and select the folder in MiniPet Settings -> Import Pet.",
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
      <div className="max-w-[1000px] mx-auto px-6">
        <button onClick={() => setPage('home')} className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-grotesk text-[12px] font-medium text-[#64748B] group-hover:text-[#0F172A] transition-colors">Back to Home</span>
        </button>
        <div className="mb-16">
          <div className="section-divider mb-6" />
          <h1 className="font-grotesk text-[clamp(36px,6vw,64px)] font-bold leading-[1.1] text-[#0F172A] mb-6">
            Custom <span className="text-[#10B981]">Pet Guide</span>
          </h1>
        </div>
        <div className="grid gap-6">
          {steps.map((s, i) => (
            <div key={i} className="liquid-glass rounded-[32px] p-8 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10B981] flex-shrink-0">
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-grotesk text-[11px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded">Step {i+1}</span>
                  <h3 className="font-grotesk text-[20px] font-bold text-[#0F172A]">{s.title}</h3>
                </div>
                <p className="font-mono text-[13px] text-[#64748B] mb-6">{s.desc}</p>
                {s.link && (
                  <a href={s.link} target="_blank" rel="noreferrer" className="btn-download inline-flex items-center gap-2 py-3 px-6">
                    {s.linkText} <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] border-t border-white/5 py-12 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">🐾</span>
          <span className="font-grotesk text-[13px] font-bold text-white/60">MiniPet</span>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/helloquocbao/mini-pet" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 transition-all">
            <FaGithub size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 transition-all">
            <FaTwitter size={18} />
          </a>
        </div>
        <div className="font-mono text-[11px] text-white/30 text-center md:text-right">
          © 2026 MiniPet — Purely Offline, Purely Fun
        </div>
      </div>
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
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar setPage={setPage} currentPage={page} />
      {page === 'home' ? (
        <main>
          <Hero />
          <Features />
          <Gallery />
          <ProductivitySection />
        </main>
      ) : (
        <DocsPage setPage={setPage} />
      )}
      <Footer />
    </div>
  );
}

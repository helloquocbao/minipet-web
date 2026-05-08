import React from 'react';
import { 
  Mail, Download, Sparkles, Shield, Coins, MessageCircle, Zap, 
  ChevronRight, Apple, Monitor, ExternalLink, FileArchive, 
  FolderOpen, Upload, ArrowLeft 
} from 'lucide-react';
import { FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa';
import { SiSui } from 'react-icons/si';

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
          <span className="font-grotesk text-[14px] uppercase tracking-widest text-[#0F172A]">MiniPet</span>
        </div>
        <div className="hidden md:flex gap-8">
          {['Features', 'Gallery', 'NFT', 'Docs'].map(l => (
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
              className={`font-grotesk text-[12px] uppercase tracking-wider transition-colors ${
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
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setIdx(prev => (prev + 1) % HERO_PETS.length);
        setVisible(true);
      }, 400); // wait for fade-out, then swap
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const pet = HERO_PETS[idx];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* BG blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-8%] w-[500px] h-[500px] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-violet-100/30 blur-2xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div className="pill pill-green mb-6">
            <Sparkles size={11} />
            On SUI Blockchain
          </div>

          <h1 className="font-grotesk text-[clamp(52px,7vw,96px)] uppercase leading-[0.92] text-[#0F172A] mb-6">
            Your pet<br />
            lives on<br />
            <span className="text-[#10B981]">your</span> screen
          </h1>

          <p className="font-mono text-[14px] text-[#475569] max-w-[420px] leading-relaxed uppercase mb-10">
            MiniPet is a desktop companion app powered by SUI blockchain. Your pet walks, talks, and reacts in real-time — and is truly yours as an NFT.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#download" className="btn-download">
              <Apple size={16} /> macOS
            </a>
            <a href="#download" className="btn-download">
              <Monitor size={16} /> Windows
            </a>
            <a href="https://github.com/helloquocbao/mini-pet" target="_blank" rel="noreferrer" className="btn-download-outline">
              <FaGithub size={16} /> GitHub
            </a>
          </div>

          <div className="flex items-center gap-6 text-[12px] font-mono text-[#94A3B8] uppercase">
            <span>✓ Free forever</span>
            <span>✓ No account needed</span>
            <span>✓ Open source</span>
          </div>
        </div>

        {/* Right – Single pet showcase, cycling */}
        <div className="relative flex justify-center items-center h-[520px] select-none">

          {/* Pet stage */}
          <div
            className="relative flex items-end justify-center w-[280px] h-[280px] rounded-[40px] transition-all duration-400"
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

          {/* Pet info card – top left */}
          <div
            className="absolute top-6 left-0 liquid-glass rounded-2xl px-4 py-3 text-left z-30"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.3s ease 0.1s',
            }}
          >
            <div className="text-[10px] font-mono uppercase text-[#94A3B8] mb-1">Active Pet</div>
            <div className="font-grotesk text-[14px] text-[#0F172A]">{pet.emoji} {pet.name}</div>
            <div className="text-[10px] font-mono" style={{ color: pet.color }}>
              {pet.rarity} · Lv.{pet.level}
            </div>
          </div>

          {/* Happiness bar – bottom right */}
          <div
            className="absolute bottom-6 right-0 liquid-glass rounded-2xl px-4 py-3 text-left z-30"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.3s ease 0.15s',
            }}
          >
            <div className="text-[10px] font-mono uppercase text-[#94A3B8] mb-2">Happiness</div>
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

          {/* Dot indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {HERO_PETS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true); }, 300); }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === idx ? 20 : 8,
                  height: 8,
                  background: i === idx ? '#10B981' : '#CBD5E1',
                }}
              />
            ))}
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
      title: 'Desktop Companion',
      desc: 'Your pet lives directly on your screen — draggable, interactive, always with you while you work.',
    },
    {
      icon: <SiSui size={20} className="text-[#4DA2FF]" />,
      title: 'SUI NFT Ownership',
      desc: 'Mint your pet on-chain as a true NFT. Trade, gift, or flex — it\'s verifiably yours on SUI Network.',
    },
    {
      icon: <Coins size={22} className="text-[#10B981]" />,
      title: 'PET Token Economy',
      desc: 'Earn MMOT tokens and use them to bonk friend\'s pets or unlock special interactions.',
    },
    {
      icon: <MessageCircle size={22} className="text-[#8B5CF6]" />,
      title: 'Social Interactions',
      desc: 'Send SUI gifts, bonk a friend\'s pet, or drop a message — all recorded on-chain. Their pet will visit you!',
    },
    {
      icon: <Zap size={22} className="text-[#F59E0B]" />,
      title: 'Visitor Animations',
      desc: 'When someone gifts you on-chain, a visitor pet walks across your desktop bearing the news.',
    },
    {
      icon: <Shield size={22} className="text-[#EC4899]" />,
      title: 'zkLogin Wallet',
      desc: 'Sign in with Google, no seed phrase required. MiniPet uses SUI zkLogin for seamless Web3 onboarding.',
    },
  ];

  return (
    <section id="features" className="w-full py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-4">
          <div className="section-divider mb-4" />
          <h2 className="font-grotesk text-[clamp(40px,5vw,64px)] uppercase leading-[0.95] text-[#0F172A]">
            Everything your<br /><span className="text-[#10B981]">pet needs</span>
          </h2>
        </div>
        <p className="font-mono text-[13px] uppercase text-[#64748B] max-w-[500px] mb-16 leading-relaxed">
          From pixel art animations to on-chain social gifts, MiniPet is the most feature-complete desktop pet on the planet.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {feats.map(f => (
            <div key={f.title} className="feature-card">
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <div className="font-grotesk text-[16px] uppercase text-[#0F172A] mb-2">{f.title}</div>
              <p className="font-mono text-[12px] text-[#64748B] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PET GALLERY ─── */
function Gallery() {
  const pets = [
    { cls: 'sprite-idle',  name: 'Wukong',    rarity: 'Legendary', score: '9.8', tag: 'pill-green' },
    { cls: 'sprite-chonk', name: 'Chonk',     rarity: 'Rare',      score: '7.4', tag: 'pill-blue' },
    { cls: 'sprite-cosmo', name: 'Cosmo',     rarity: 'Epic',      score: '8.2', tag: 'pill-green' },
  ];

  return (
    <section id="gallery" className="w-full py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
          <div>
            <div className="section-divider mb-4" />
            <h2 className="font-grotesk text-[clamp(36px,4.5vw,60px)] uppercase leading-[0.95] text-[#0F172A]">
              Pet<br /><span className="text-[#10B981]">Collection</span>
            </h2>
          </div>
          <div className="font-mono text-[12px] uppercase text-[#64748B] max-w-[280px] text-right leading-relaxed hidden lg:block">
            Each pet is a unique pixel art companion. Mint as NFT, gift to friends, or collect them all.
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map(pet => (
            <div key={pet.name} className="liquid-glass rounded-[28px] p-4 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              {/* Sprite canvas */}
              <div className="relative w-full pb-[90%] rounded-[20px] overflow-hidden bg-gradient-to-b from-[#F0FDF4] to-[#ECFDF5]">
                <div className="absolute inset-0 flex items-end justify-center pb-4">
                  <div className={`sprite ${pet.cls}`} style={{ transform: 'scale(1.8)', transformOrigin: 'bottom center' }} />
                </div>
                {/* Rarity badge */}
                <div className="absolute top-3 left-3">
                  <span className={`pill ${pet.tag}`}>{pet.rarity}</span>
                </div>
              </div>

              {/* Info bar */}
              <div className="liquid-glass mt-3 rounded-[16px] px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-grotesk text-[15px] text-[#0F172A]">{pet.name}</div>
                  <div className="font-mono text-[11px] text-[#64748B] uppercase">Score: {pet.score}/10</div>
                </div>
                <button className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center hover:scale-110 transition-transform text-white shadow-md">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  const steps = [
    { n: '01', title: 'Download the App', desc: 'Install MiniPet for macOS or Windows. Free, no account needed.' },
    { n: '02', title: 'Connect or Create Wallet', desc: 'Use zkLogin (Google Sign-In) — no seed phrases, no crypto knowledge required.' },
    { n: '03', title: 'Pick Your Pet', desc: 'Choose from the built-in collection or import custom pixel art pets.' },
    { n: '04', title: 'Go On-Chain', desc: 'Mint your pet as a SUI NFT. Send gifts, bonk friends, earn MMOT tokens.' },
  ];

  return (
    <section id="how-it-works" className="w-full py-24 lg:py-32 bg-[#0F172A] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <div className="w-12 h-1 bg-[#10B981] rounded-full mb-4" />
          <h2 className="font-grotesk text-[clamp(36px,5vw,64px)] uppercase leading-[0.95]">
            How it <span className="text-[#10B981]">works</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(s => (
            <div key={s.n} className="relative">
              <div className="font-grotesk text-[64px] text-white/5 leading-none mb-2">{s.n}</div>
              <div className="font-grotesk text-[18px] uppercase text-white mb-2">{s.title}</div>
              <p className="font-mono text-[12px] text-white/50 leading-relaxed uppercase">{s.desc}</p>
              <div className="mt-4 w-8 h-[2px] bg-[#10B981]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BLOCKCHAIN SECTION ─── */
function BlockchainSection() {
  return (
    <section id="nft" className="w-full py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left – visual */}
        <div className="relative flex justify-center">
          <div className="relative w-[340px] h-[340px]">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-200 animate-[spin_20s_linear_infinite]" />
            {/* Inner glass card */}
            <div className="absolute inset-[15%] liquid-glass rounded-3xl flex flex-col items-center justify-center p-6 gap-3">
              <div className="sprite sprite-happy" style={{ transform: 'scale(1.5)', transformOrigin: 'center' }} />
              <div className="text-center mt-4">
                <div className="font-grotesk text-[14px] uppercase text-[#0F172A]">Gift Received!</div>
                <div className="font-mono text-[11px] text-[#10B981] uppercase">+0.5 SUI from 0xA3f…</div>
              </div>
            </div>
            {/* Orbit dots */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#4DA2FF] flex items-center justify-center shadow-lg shadow-blue-200">
              <SiSui size={14} className="text-white" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center shadow-lg shadow-emerald-200">
              <Coins size={14} className="text-white" />
            </div>
          </div>
        </div>

        {/* Right – text */}
        <div>
          <div className="section-divider mb-4" />
          <h2 className="font-grotesk text-[clamp(36px,4.5vw,58px)] uppercase leading-[0.95] text-[#0F172A] mb-6">
            Social interactions<br /><span className="text-[#10B981]">on-chain</span>
          </h2>
          <p className="font-mono text-[13px] uppercase text-[#475569] leading-relaxed mb-8 max-w-[440px]">
            Send SUI gifts, bonk your friend's pet with MMOT tokens, or drop a message — all recorded permanently on SUI blockchain. When someone sends you a gift, their pet visits your desktop to deliver it.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: '🎁', action: 'Send Gift', desc: 'Transfer SUI with a personal message' },
              { icon: '👊', action: 'Bonk!', desc: 'Spend 100 MMOT to bonk a friend\'s pet' },
              { icon: '💬', action: 'Message', desc: 'Send a text message on-chain' },
            ].map(item => (
              <div key={item.action} className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC] hover:bg-[#F0FDF4] transition-colors">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-grotesk text-[13px] uppercase text-[#0F172A]">{item.action}</div>
                  <div className="font-mono text-[11px] text-[#64748B] uppercase">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── DOWNLOAD CTA ─── */
function DownloadCTA() {
  return (
    <section id="download" className="w-full py-24 lg:py-32 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1a2744] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <div className="flex justify-center mb-6">
          <span className="pill" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
            <Download size={11} /> Free Download
          </span>
        </div>

        <h2 className="font-grotesk text-[clamp(48px,7vw,96px)] uppercase leading-[0.92] text-white mb-6">
          Get your<br />
          <span className="text-[#10B981]">MiniPet</span><br />
          today
        </h2>

        <p className="font-mono text-[13px] uppercase text-white/40 max-w-[440px] mx-auto leading-relaxed mb-12">
          Download for free. No setup, no account. Just install and your pet appears on your desktop.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href="#" className="btn-download" style={{ background: 'white', color: '#0F172A' }}>
            <Apple size={18} /> Download for macOS
          </a>
          <a href="#" className="btn-download" style={{ background: 'white', color: '#0F172A' }}>
            <Monitor size={18} /> Download for Windows
          </a>
        </div>

        <div className="flex justify-center items-center gap-4 text-white/30">
          <a href="mailto:lehoquocbao9@gmail.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white/60 transition-all">
            <Mail size={16} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white/60 transition-all">
            <FaTwitter size={16} />
          </a>
          <a href="https://github.com/helloquocbao/mini-pet" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white/60 transition-all">
            <FaGithub size={16} />
          </a>
          <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white/60 transition-all">
            <FaDiscord size={16} />
          </a>
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
      desc: "Once you find a pet you like, click the 'Download as ZIP' button. This package contains all the sprite assets and metadata.",
    },
    {
      icon: <FolderOpen size={24} />,
      title: "Extract the File",
      desc: "Locate the downloaded .zip file on your computer and extract (unzip) it into a new folder.",
    },
    {
      icon: <Upload size={24} />,
      title: "Import to MiniPet",
      desc: "Open your MiniPet desktop app, go to Settings -> Import Pet, and select the folder you just extracted.",
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
      <div className="max-w-[1000px] mx-auto px-6">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-grotesk text-[12px] uppercase tracking-wider">Back to Home</span>
        </button>

        <div className="mb-16">
          <div className="section-divider mb-6" />
          <h1 className="font-grotesk text-[clamp(40px,6vw,72px)] uppercase leading-[0.95] text-[#0F172A] mb-6">
            Importing<br /><span className="text-[#10B981]">Custom Pets</span>
          </h1>
          <p className="font-mono text-[14px] text-[#64748B] max-w-[600px] leading-relaxed uppercase">
            MiniPet allows you to import any pet from the PetDex community. Follow these simple steps to bring a new friend to your desktop.
          </p>
        </div>

        <div className="grid gap-6">
          {steps.map((s, i) => (
            <div key={i} className="liquid-glass rounded-[32px] p-8 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10B981] flex-shrink-0">
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-grotesk text-[12px] text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded">STEP {i+1}</span>
                  <h3 className="font-grotesk text-[20px] uppercase text-[#0F172A]">{s.title}</h3>
                </div>
                <p className="font-mono text-[13px] text-[#64748B] leading-relaxed mb-6">
                  {s.desc}
                </p>
                {s.link && (
                  <a 
                    href={s.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-download inline-flex items-center gap-2 py-3 px-6"
                  >
                    {s.linkText} <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="mt-12 p-8 rounded-[32px] bg-[#0F172A] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl" />
          <div className="relative z-10">
            <div className="font-grotesk text-[12px] uppercase tracking-widest text-[#10B981] mb-2 flex items-center gap-2">
              <Zap size={14} /> Pro Tip
            </div>
            <p className="font-mono text-[13px] text-white/70 leading-relaxed uppercase">
              You can also drag and drop the extracted folder directly onto your active pet to quickly switch to a new companion!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] border-t border-white/5 py-8 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">🐾</span>
          <span className="font-grotesk text-[13px] uppercase tracking-widest text-white/60">MiniPet</span>
        </div>
        <div className="font-mono text-[11px] uppercase text-white/30">
          © 2026 MiniPet — Built on SUI Blockchain
        </div>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Docs'].map(l => (
            <a key={l} href="#" className="font-mono text-[11px] uppercase text-white/30 hover:text-white/60 transition-colors">{l}</a>
          ))}
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar setPage={setPage} currentPage={page} />
      {page === 'home' ? (
        <main>
          <Hero />
          <Features />
          <Gallery />
          <HowItWorks />
          <BlockchainSection />
          <DownloadCTA />
        </main>
      ) : (
        <DocsPage setPage={setPage} />
      )}
      <Footer />
    </div>
  );
}

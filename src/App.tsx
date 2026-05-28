/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  ChevronRight, 
  ChevronLeft, 
  ArrowDown, 
  ShoppingBag, 
  User, 
  Play, 
  Pause,
  X,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
  MapPin,
  Clock
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  videoUrl: string;
  bgImage: string;
}

// --- Constants ---
const COUNTDOWN_HOURS = 96;
const COUNTDOWN_MS = COUNTDOWN_HOURS * 60 * 60 * 1000;
const SLIDES: Slide[] = [
  {
    id: 1,
    title: "SMITHFIELD",
    subtitle: "THE COUNTDOWN FOR",
    description: "Step inside London’s next great cultural destination.",
    cta: "Discover Smithfield",
    videoUrl: "https://player.vimeo.com/external/494252666.sd.mp4?s=72ad57a58265679dc4307996328325a72013f99e&profile_id=165&oauth2_token_id=57447761", // Cityscape/Market vibe
    bgImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: 2,
    title: "DOCKLANDS",
    subtitle: "EXPLORE THE RIVER",
    description: "Discover the stories of trade, migration and empire.",
    cta: "Visit Docklands",
    videoUrl: "https://player.vimeo.com/external/372076214.sd.mp4?s=d00e57bf9e083c21a15328e19e99a80e1a6c026d&profile_id=164&oauth2_token_id=57447761", // Water vibe
    bgImage: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: 3,
    title: "LEARNING",
    subtitle: "FUTURE OF",
    description: "A place for every Londoner to learn and share stories.",
    cta: "Find out more",
    videoUrl: "https://player.vimeo.com/external/403814141.sd.mp4?s=34044709d0124b89b4f494957f093a209938b8ca&profile_id=164&oauth2_token_id=57447761", // Educational vibe
    bgImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000"
  }
];

// --- Helper Components ---

const CountdownTimer = () => {
  const endTimeRef = useRef(Date.now() + COUNTDOWN_MS);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; min: number; sec: number }>({
    hours: COUNTDOWN_HOURS,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const diff = endTimeRef.current - Date.now();

      if (diff <= 0) return { hours: 0, min: 0, sec: 0 };

      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        min: Math.floor((diff / 1000 / 60) % 60),
        sec: Math.floor((diff / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    setTimeLeft(calculateTime());
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8">
      {[
        { label: 'HOURS', value: timeLeft.hours },
        { label: 'MINS', value: timeLeft.min },
        { label: 'SECS', value: timeLeft.sec },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <span className="text-4xl md:text-7xl font-display font-light tracking-tighter">
            {item.value.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] md:text-sm font-semibold tracking-widest text-white/60">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-full flex flex-col z-50">
      {/* Ticker at the very top of the header stack */}
      <div className="w-full bg-museum-mint text-museum-black py-2 md:py-3 flex overflow-hidden border-b border-museum-black/10 shrink-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4].map(i => (
            <span key={i} className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-8">
              Smithfield opening soon — 23 February 2026 • Smithfield opening soon — 23 February 2026 • Smithfield opening soon
            </span>
          ))}
        </div>
      </div>

      <header className="w-full flex items-center justify-between px-6 py-6 bg-transparent">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-display font-black leading-none tracking-tighter text-white">
            LONDON<br />MUSEUM
          </div>
          <nav className="hidden lg:flex gap-6 items-center text-sm font-semibold uppercase tracking-wider text-white">
            <a href="#" className="hover:text-museum-mint transition-colors flex items-center gap-1">Visit <ChevronRight size={14} /></a>
            <a href="#" className="hover:text-museum-mint transition-colors flex items-center gap-1">What's on <ChevronRight size={14} /></a>
            <a href="#" className="hover:text-museum-mint transition-colors flex items-center gap-1">Stories <ChevronRight size={14} /></a>
            <a href="#" className="hover:text-museum-mint transition-colors flex items-center gap-1">Collection <ChevronRight size={14} /></a>
            <a href="#" className="hover:text-museum-mint transition-colors flex items-center gap-1">Lifestyle <ChevronRight size={14} /></a>
            <a href="#" className="hover:text-museum-mint transition-colors flex items-center gap-1">Support us <ChevronRight size={14} /></a>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-white">
          <a href="#" className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:text-museum-mint">
            Shop <ShoppingBag size={14} />
          </a>
          <a href="#" className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:text-museum-mint">
            Account <User size={14} />
          </a>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </header>
    </div>
  );
};

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = SLIDES.length;

  useEffect(() => {
    startProgress();
    return () => stopProgress();
  }, [currentSlide]);

  const startProgress = () => {
    stopProgress();
    setProgress(0);
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Trigger slide change outside of the interval update if possible, 
          // or just rely on state batching.
          return 100;
        }
        return prev + (100 / 60); 
      });
    }, 100);
  };

  useEffect(() => {
    if (progress >= 100) {
      nextSlide();
    }
  }, [progress]);

  const stopProgress = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="relative w-full h-full overflow-hidden bg-museum-black">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={SLIDES[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 z-0"
        >
          {/* Background Image Fallback */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[15s] scale-110 ease-linear"
            style={{ backgroundImage: `url(${SLIDES[currentSlide].bgImage})` }}
          />
          
          {/* Overlay Video - Muted and autoPlay required for browser background videos */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            src={SLIDES[currentSlide].videoUrl}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-museum-black via-museum-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />
          
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 max-w-5xl z-10">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-museum-lavender font-semibold tracking-widest text-sm md:text-xl uppercase"
            >
              {SLIDES[currentSlide].subtitle}
            </motion.span>
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-[100px] leading-[0.9] mt-2 mb-6"
            >
              {SLIDES[currentSlide].title}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-2xl text-white/80 max-w-xl mb-8"
            >
              {SLIDES[currentSlide].description}
            </motion.p>
            <motion.button 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-fit px-8 py-4 bg-museum-mint text-museum-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              {SLIDES[currentSlide].cta}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute bottom-12 left-6 md:left-20 w-[calc(100%-48px)] md:w-1/2 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-museum-mint"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 right-6 md:right-20 flex gap-4">
        <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ChevronRight size={24} />
        </button>
        <button className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Pause size={20} />
        </button>
      </div>

      {/* Slide Cards (Right side) */}
      <div className="absolute bottom-[20%] right-20 hidden xl:flex gap-6">
        {SLIDES.map((slide, idx) => (
          <div 
            key={slide.id}
            className={`w-64 h-40 rounded-xl overflow-hidden relative border-2 transition-all cursor-pointer ${idx === currentSlide ? 'border-museum-mint scale-105 z-10' : 'border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}
            onClick={() => setCurrentSlide(idx)}
          >
            <img src={slide.bgImage} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
              <span className="text-xs font-bold uppercase tracking-widest">{slide.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !splashRef.current || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic reveal: Splash is on top (z-20), Main is below (z-10)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=80%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });
      
      tl.to(splashRef.current, {
        opacity: 0,
        scale: 1.1,
        filter: 'blur(20px)',
        duration: 1,
        ease: 'none'
      })
      .to(mainRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-museum-black min-h-screen overflow-x-hidden">
      {/* GSAP Pinning Isolation Wrapper */}
      <div className="relative">
        <div ref={containerRef} className="relative w-full h-screen bg-museum-black overflow-hidden">
          
          {/* Initial Splash Screen (Top Layer) */}
          <div 
            ref={splashRef}
            className="absolute inset-0 w-full h-full z-20 flex flex-col bg-museum-black"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-museum-charcoal text-white">
              <img 
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2600" 
                className="w-full h-full object-cover opacity-80"
                alt="London Museum Atmospheric"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-20">
              <div className="flex flex-col gap-2">
                <span className="text-museum-mint font-bold tracking-widest text-sm md:text-lg">SMITHFIELD</span>
                <h1 className="text-5xl md:text-[8vw] leading-[1] max-w-4xl tracking-tighter mix-blend-lighten">
                  A NEW<br />
                  <span className="text-museum-lavender">MUSEUM</span><br />
                  FOR LONDON.
                </h1>
                <p className="text-xl md:text-3xl text-white/80 mt-6 max-w-2xl font-light">
                  A place for our stories. A place for everyone.
                </p>
              </div>
            </div>

            <div className="relative z-10 p-6 md:p-20 flex flex-col md:flex-row items-end justify-between gap-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-white animate-bounce-slow">
                  <ArrowDown size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest">Scroll to explore</span>
                </div>
                <div className="h-[2px] w-48 bg-white/30 relative">
                  <motion.div 
                    animate={{ left: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 w-12 h-full bg-museum-mint" 
                  />
                </div>
              </div>
              <CountdownTimer />
            </div>
          </div>

          {/* Main Content Revealed Area (Layer Below Splash) */}
          <div 
            ref={mainRef} 
            className="absolute inset-0 w-full h-full z-10 opacity-0 bg-museum-black"
            style={{ transform: 'translateY(100px)' }}
          >
            <div className="absolute top-0 left-0 w-full z-30">
              <Header />
            </div>
            <div className="w-full h-full">
              <Carousel />
            </div>
          </div>
        </div>
      </div>

      {/* Rest of Page (Static scrollable content) */}
      <div className="relative z-30 bg-white">
        {/* Stories Section */}
        <section className="bg-white text-museum-black py-20 px-6 md:px-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-7xl">Stories that<br />shaped the city</h2>
            <div className="hidden md:flex gap-4">
              {['Love, Sex & Relationships', 'Death & Disasters', 'Immigration & Identity'].map(tag => (
                <span key={tag} className="px-6 py-2 border border-museum-black rounded-full text-xs font-bold uppercase hover:bg-museum-black hover:text-white transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-gray-100 mb-6 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1552562708-688ad7702f2b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-museum-mint px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">London Places</div>
              </div>
              <h3 className="text-2xl mb-2">London's famous squares</h3>
              <p className="text-gray-600">Some highlights of the capital’s hundreds of squares.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-gray-100 mb-6 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-museum-mint px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">History</div>
              </div>
              <h3 className="text-2xl mb-2">Smithfield: A Meat Market History</h3>
              <p className="text-gray-600">Discover the bloody and brilliant past of the site of our new museum.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-gray-100 mb-6 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-museum-mint px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">Culture</div>
              </div>
              <h3 className="text-2xl mb-2">Jewish East End, 1880-1914</h3>
              <p className="text-gray-600">Establishing a thriving community in a changing city.</p>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <button className="px-10 py-4 bg-museum-mint text-museum-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
              View all stories
            </button>
          </div>
        </section>

        {/* Plan Your Visit */}
        <section className="bg-museum-charcoal text-white py-20 px-6 md:px-20">
          <h2 className="text-4xl md:text-7xl mb-16 underline decoration-museum-mint underline-offset-[20px]">Plan your visit</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { title: 'Families', desc: 'Set sail for a fun day out at London Museum Docklands', img: 'https://images.unsplash.com/photo-1484712401471-05c7215830eb?auto=format&fit=crop&q=80&w=800' },
              { title: 'Shop, eat & drink', desc: 'Stop for a tea break in our cafe, or pick up a souvenir from our shop', img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800' },
              { title: 'Need to know', desc: 'Answers to all the the most frequently asked questions about visiting us', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800' },
              { title: 'Free galleries', desc: 'Step into 400 years of London Docklands’ river, port and people', img: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800' }
            ].map(item => (
              <div key={item.title} className="flex flex-col gap-4">
                <img src={item.img} className="w-full h-48 object-cover rounded-lg" alt={item.title} />
                <h3 className="text-xl text-museum-lavender">{item.title}</h3>
                <p className="text-sm opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Venues Grid */}
        <section className="bg-white text-museum-black py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-100">
           {[
             { name: 'London Museum Docklands', address: 'No.1 Warehouse, West India Quay, London E14 4AL', info: 'Monday to Sunday 10:00—18:00', icon: <MapPin size={32} /> },
             { name: 'London Museum Smithfield', address: 'Opening 2026', info: 'Coming soon', icon: <Clock size={32} /> },
             { name: 'London Museum Stores', address: '46 Eagle Wharf Rd, London N1 7ED', info: 'Appointment only', icon: <ShoppingBag size={32} /> },
             { name: 'London Museum Spaces', address: '150 London Wall, London, EC2Y 5HN', info: 'Events & hire', icon: <User size={32} /> }
           ].map(venue => (
             <div key={venue.name} className="flex flex-col gap-4 group">
               <div className="w-16 h-16 bg-museum-lavender/20 flex items-center justify-center rounded-full text-museum-black group-hover:bg-museum-mint transition-colors" aria-hidden="true">
                 {venue.icon}
               </div>
               <h4 className="text-xl font-bold">{venue.name}</h4>
               <p className="text-sm text-gray-600 leading-relaxed">{venue.address}</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-museum-black/40 border-t border-gray-100 pt-4">{venue.info}</p>
             </div>
           ))}
        </section>

        {/* Newsletter & Social strip */}
        <section className="flex flex-col lg:flex-row">
          <div className="flex-1 bg-museum-lavender text-museum-black p-12 md:p-20 flex flex-col gap-8">
            <h2 className="text-3xl md:text-5xl">Subscribe and get email updates:</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="email" placeholder="YOUR@EMAIL.COM" className="flex-1 bg-transparent border-b-2 border-museum-black py-4 px-2 focus:outline-none placeholder:text-museum-black/40 text-2xl font-display font-medium" />
              <button className="bg-museum-black text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">Subscribe</button>
            </div>
          </div>
          <div className="flex-1 bg-museum-mint text-museum-black p-12 md:p-20 flex flex-col gap-8">
            <h2 className="text-3xl md:text-5xl">Follow London Museum:</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'X', icon: <X size={24} /> },
                { name: 'Facebook', icon: <Facebook size={24} /> },
                { name: 'Instagram', icon: <Instagram size={24} /> },
                { name: 'Youtube', icon: <Youtube size={24} /> }
              ].map(social => (
                <a key={social.name} href="#" className="flex items-center gap-2 font-bold uppercase tracking-widest hover:translate-y-[-4px] transition-transform">
                  <div className="p-3 bg-museum-black text-white rounded-lg">{social.icon}</div>
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-museum-black text-white pt-20 pb-12 px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="flex flex-col gap-8">
              <div className="text-4xl font-display font-black leading-none tracking-tighter">
                LONDON<br />MUSEUM
              </div>
              <p className="opacity-60 text-sm max-w-xs">
                Celebrating London, the city of stories. A brand new museum for the world's greatest city.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <h5 className="text-museum-mint">Visit</h5>
              <ul className="flex flex-col gap-3 text-sm opacity-80">
                <li><a href="#" className="hover:text-museum-mint transition-colors">Docklands</a></li>
                <li><a href="#" className="hover:text-museum-mint transition-colors">Smithfield</a></li>
                <li><a href="#" className="hover:text-museum-mint transition-colors">Stores</a></li>
                <li><a href="#" className="hover:text-museum-mint transition-colors">Spaces</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h5 className="text-museum-mint">Explore</h5>
              <ul className="flex flex-col gap-3 text-sm opacity-80">
                <li><a href="#" className="hover:text-museum-mint transition-colors">Collections Online</a></li>
                <li><a href="#" className="hover:text-museum-mint transition-colors">Latest Stories</a></li>
                <li><a href="#" className="hover:text-museum-mint transition-colors">What's On</a></li>
                <li><a href="#" className="hover:text-museum-mint transition-colors">Learning</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h5 className="text-museum-mint">Support & Info</h5>
              <ul className="flex flex-col gap-3 text-sm opacity-80">
                <li><a href="#" className="hover:text-museum-mint transition-colors">Join & Support</a></li>
                <li><a href="#" className="hover:text-museum-mint transition-colors">Hire</a></li>
                <li><a href="#" className="hover:text-museum-mint transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-museum-mint transition-colors">About Us</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 gap-8">
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-40">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Cookies</a>
              <a href="#">Accessibility</a>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
              © 2026 London Museum. Registered Charity No. 1139250.
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-10%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}

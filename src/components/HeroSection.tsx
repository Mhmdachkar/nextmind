import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // Desktop: Original scale animation
      gsap.set(text, {
        scale: 1,
        opacity: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(text, {
        scale: 20,
        duration: 1,
        ease: "power2.inOut",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Metallic 3D dots with some orange ones
  const dots = [
    { top: '15%', left: '10%', size: 8, delay: 0, type: 'metallic' },
    { top: '25%', left: '85%', size: 6, delay: 0.5, type: 'orange' },
    { top: '70%', left: '15%', size: 10, delay: 1, type: 'metallic' },
    { top: '80%', left: '80%', size: 5, delay: 1.5, type: 'metallic' },
    { top: '40%', left: '5%', size: 7, delay: 0.3, type: 'metallic' },
    { top: '60%', left: '92%', size: 9, delay: 0.8, type: 'orange' },
    { top: '10%', left: '60%', size: 4, delay: 1.2, type: 'metallic' },
    { top: '85%', left: '40%', size: 6, delay: 0.6, type: 'metallic' },
    { top: '35%', left: '95%', size: 8, delay: 1.8, type: 'metallic' },
    { top: '55%', left: '8%', size: 5, delay: 0.2, type: 'orange' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="h-screen flex items-start md:items-center justify-start md:justify-center pt-24 md:pt-0 px-4 md:px-12 relative overflow-hidden bg-background"
    >
      {/* Metallic 3D dots with some orange */}
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-pulse"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: dot.type === 'orange'
              ? `radial-gradient(circle at 30% 30%, 
                  hsl(30, 100%, 65%) 0%, 
                  hsl(30, 100%, 55%) 40%, 
                  hsl(30, 90%, 45%) 70%, 
                  hsl(30, 80%, 35%) 100%)`
              : `radial-gradient(circle at 30% 30%, 
                  hsl(220, 20%, 90%) 0%, 
                  hsl(220, 15%, 70%) 40%, 
                  hsl(220, 10%, 50%) 70%, 
                  hsl(220, 8%, 30%) 100%)`,
            boxShadow: dot.type === 'orange'
              ? `
                0 ${dot.size / 4}px ${dot.size / 2}px rgba(255, 140, 0, 0.4),
                inset 0 -${dot.size / 4}px ${dot.size / 3}px rgba(0, 0, 0, 0.3),
                inset 0 ${dot.size / 4}px ${dot.size / 3}px rgba(255, 180, 100, 0.4)
              `
              : `
                0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.3),
                inset 0 -${dot.size / 4}px ${dot.size / 3}px rgba(0, 0, 0, 0.2),
                inset 0 ${dot.size / 4}px ${dot.size / 3}px rgba(255, 255, 255, 0.3)
              `,
            animationDelay: `${dot.delay}s`,
            animationDuration: '3s',
          }}
        />
      ))}

      {/* Desktop: Centered text with original animation */}
      <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center pointer-events-none px-4" style={{ zIndex: 50 }}>
        <h1 
          ref={textRef}
          className="font-hero text-[18vw] lg:text-[16vw] font-bold uppercase leading-[0.85] tracking-tight text-center"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            mixBlendMode: 'difference',
          }}
        >
          LET'S BUILD
        </h1>
      </div>

      {/* Mobile-only: Enhanced hero with scroll effects */}
      <div className="md:hidden w-full relative z-50">
        <div className="space-y-6 rounded-3xl bg-black/40 border border-white/10 px-5 py-6 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.85)]">
          {/* Eyebrow label */}
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-400/40 text-[10px] font-semibold tracking-[0.25em] uppercase text-orange-200">
            Digital products studio
          </p>

          {/* Hero Title */}
          <h1 
            className="font-hero text-[2.6rem] leading-tight font-extrabold uppercase text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #ffe0c0 40%, #FF8C00 100%)',
              textShadow: '0 8px 30px rgba(0,0,0,0.8)',
            }}
          >
            LET'S BUILD<br />
            WHAT&apos;S NEXT
          </h1>
          
          {/* Value Propositions - orange and white with word spacing */}
          <div className="space-y-3 text-sm font-medium leading-relaxed text-foreground/85">
            <p>
              We turn <span className="text-orange-400 font-semibold">personal brands</span> into{" "}
              <span className="text-orange-400 font-semibold">digital machines</span>.
            </p>
            <p>
              We turn <span className="text-orange-400 font-semibold">influence</span> into{" "}
              <span className="text-orange-400 font-semibold">revenue</span> with products that sell for you.
            </p>
          </div>

          {/* Agency-focused CTA Buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <a 
              href="/contact"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-hero uppercase tracking-wider text-sm rounded-full text-center transition-all duration-300 active:scale-95 relative overflow-hidden"
              style={{
                boxShadow: '0 14px 30px rgba(255, 140, 0, 0.55)',
              }}
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-20 transition-opacity" />
              Start Your Project
            </a>
            <a 
              href="/contact"
              className="px-8 py-4 bg-black/40 border border-orange-500/60 hover:border-orange-400 text-white font-hero uppercase tracking-wider text-sm rounded-full text-center transition-all duration-300 active:scale-95"
            >
              Get Free Consultation
            </a>
          </div>

          {/* Quick Metrics - Updated */}
          <div className="grid grid-cols-3 gap-3 pt-3">
            <div className="text-center p-3 bg-black/40 rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-orange-400">50+</div>
              <div className="text-[10px] text-foreground/60 uppercase mt-1 tracking-wide">Projects</div>
            </div>
            <div className="text-center p-3 bg-black/40 rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-orange-400">✓</div>
              <div className="text-[10px] text-foreground/60 uppercase mt-1 tracking-wide">Proven Results</div>
            </div>
            <div className="text-center p-3 bg-black/40 rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-orange-400">∞</div>
              <div className="text-[10px] text-foreground/60 uppercase mt-1 tracking-wide">Ongoing Support</div>
            </div>
          </div>

          {/* Who We Help */}
          <div className="mt-6 p-4 bg-black/30 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500 mb-3">Who We Help</h3>
            <div className="flex flex-wrap gap-2">
              {['Influencers', 'Startups', 'SMEs', 'Personal Brands', 'E-commerce'].map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 bg-black/10 rounded-full text-xs font-medium text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial with Real Name */}
          <div className="mt-4 p-4 bg-black/40 rounded-2xl border border-white/10">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 text-2xl font-bold">
                  R
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/80 italic leading-relaxed mb-2">
                  "NextMind transformed our online presence completely. Revenue up 300% in 6 months!"
                </p>
                <p className="text-xs text-foreground/60 font-semibold">
                  — Rawan Khalil, Content Creator & Brand Consultant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;

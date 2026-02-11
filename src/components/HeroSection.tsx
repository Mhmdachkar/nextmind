import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextMindLogo from "@/assets/NextMindLogo.png";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onEntranceComplete?: () => void;
}

const HeroSection = ({ onEntranceComplete }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const brandBlockRef = useRef<HTMLDivElement>(null);
  const brandRevealRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const logoContainer = logoContainerRef.current;
    const logo = logoRef.current;
    const brandText = brandTextRef.current;
    const glow = glowRef.current;
    const glow2 = glowRef2.current;
    const brandBlock = brandBlockRef.current;
    const brandReveal = brandRevealRef.current;
    const beam = beamRef.current;
    const particles = particlesRef.current;

    if (!section || !text || !logoContainer || !logo || !brandText || !glow || !particles) return;

    const isMobile = window.innerWidth < 768;

    // Check if user has seen the entrance (session storage)
    const hasSeenEntrance = sessionStorage.getItem('heroEntranceSeen');

    // Run the full entrance once per session on BOTH desktop and mobile
    if (!hasSeenEntrance) {
      // Fewer particles for performance (transform + opacity only)
      const particleCount = 24;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        const size = 4 + (i % 5);
        const isOrange = i % 3 === 0;
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: 50%;
          top: 50%;
          background: ${isOrange
            ? "rgba(255, 140, 0, 0.9)"
            : "rgba(255, 255, 255, 0.85)"
          };
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          will-change: transform;
        `;
        particles.appendChild(particle);
      }

      const particleElements = particles.querySelectorAll("div");

      // NEXTMIND: scan-line reveal — word uncovered by a vertical beam (single text node, clip-path + transform)
      brandText.innerHTML = "NEXTMIND";

      // Hide main text initially
      gsap.set(text, { opacity: 0, scale: 0.5 });

      // Entrance Timeline
      const entranceTl = gsap.timeline({
        onComplete: () => {
          // Mark as seen for this session
          sessionStorage.setItem('heroEntranceSeen', 'true');

          // On mobile we skip the scroll-based scale effect for simplicity
          if (isMobile) {
            setEntranceComplete(true);
            onEntranceComplete?.();
            return;
          }

          // Desktop: Setup scroll animation AFTER entrance, then signal completion
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const scrollTl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: "+=100%",
                  scrub: 1,
                  pin: true,
                  fastScrollEnd: true,
                  anticipatePin: 1,
                },
              });

              scrollTl.to(text, {
                scale: 20,
                duration: 1,
                ease: "power2.inOut",
                force3D: true,
              });

              // Only once ScrollTrigger is wired up do we reveal the rest of the page
              setEntranceComplete(true);
              onEntranceComplete?.();
            });
          });
        }
      });

      // Phase 1: Logo entrance with 3D rotation (0-1.2s)
      entranceTl
        .set(logoContainer, { 
          scale: 0, 
          rotationY: -180, 
          rotationX: 45,
          opacity: 0,
          filter: "blur(20px)"
        })
        .to(logoContainer, {
          scale: 1.2,
          rotationY: 0,
          rotationX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
        }, 0.2)
        // Logo pulse
        .to(logoContainer, {
          scale: 1.3,
          duration: 0.2,
          ease: "power2.out",
        }, 1.2)
        .to(logoContainer, {
          scale: 1.2,
          duration: 0.2,
          ease: "power2.in",
        }, 1.4);

      // Phase 2: NEXTMIND — scan-line reveal (beam sweeps right, clip-path uncovers word in sync)
      if (brandReveal && beam) {
        gsap.set(brandReveal, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(beam, { x: -24, opacity: 1 });
        entranceTl.to(brandReveal, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.75,
          ease: "power2.inOut",
          force3D: true,
        }, 1.6);
        entranceTl.to(beam, {
          x: 320,
          duration: 0.75,
          ease: "power2.inOut",
          force3D: true,
        }, 1.6);
        entranceTl.to(beam, { opacity: 0, duration: 0.15 }, 2.3);
      }

      // Phase 3: Glow explosion (2.3-3s) — softened for performance
      entranceTl
        .to(glow, {
          scale: 1.2,
          opacity: 0.9,
          duration: 0.28,
          ease: "power2.out",
          force3D: true,
        }, 2.3)
        .to(glow, {
          scale: 6,
          opacity: 0,
          duration: 0.55,
          ease: "power2.in",
          force3D: true,
        }, 2.6);

      // Phase 4: Particle burst (transform + opacity only for performance)
      entranceTl.to(particleElements, {
        opacity: 1,
        x: () => gsap.utils.random(-220, 220),
        y: () => gsap.utils.random(-220, 220),
        duration: 0.8,
        ease: "power2.out",
        stagger: { each: 0.02, from: "center" },
        force3D: true,
      }, 2.5);

      // Phase 5: Logo and brand block fade out (3.2-3.8s) — avoid blur for smoother frames
      entranceTl.to([logoContainer, brandBlock || brandText], {
        opacity: 0,
        scale: 0.5,
        y: -100,
        duration: 0.6,
        ease: "power3.in",
      }, 3.2);

      // Phase 6: Particles fade (opacity only)
      entranceTl.to(particleElements, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      }, 3.3);

      // Phase 7: "LET'S BUILD" emerges + second glow-up (no blur, no frame drop)
      entranceTl
        .set(text, { opacity: 0, scale: 0.3 }, 3.5)
        .to(text, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          force3D: true,
        }, 3.5);
      if (glow2) {
        gsap.set(glow2, { scale: 0.3, opacity: 0.7 });
        entranceTl.to(glow2, {
          scale: 5,
          opacity: 0,
          duration: 0.65,
          ease: "power2.in",
          force3D: true,
        }, 3.5);
      }

    } else if (!isMobile && hasSeenEntrance) {
      // Skip entrance, go straight to scroll animation
      gsap.set(text, { opacity: 1, scale: 1 });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=100%",
              scrub: 1,
              pin: true,
              fastScrollEnd: true,
              anticipatePin: 1,
            },
          });

          scrollTl.to(text, {
            scale: 20,
            duration: 1,
            ease: "power2.inOut",
            force3D: true,
          });

          // After ScrollTrigger is ready, mark hero as complete
          setEntranceComplete(true);
          onEntranceComplete?.();
        });
      });
    }

    // Mobile: if entrance was already seen this session, mark as complete immediately
    if (isMobile && hasSeenEntrance) {
      setEntranceComplete(true);
      onEntranceComplete?.();
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
      className="min-h-screen md:h-screen flex flex-col md:flex-row items-center justify-center pt-24 md:pt-0 px-4 md:px-12 pb-0 md:pb-0 relative overflow-hidden bg-background"
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

      {/* Entrance animation elements (now also visible on mobile) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 50 }}>
        {/* Particles container */}
        <div 
          ref={particlesRef}
          className="absolute inset-0"
          style={{ perspective: '1000px' }}
        />

        {/* Glow explosion (first) */}
        <div
          ref={glowRef}
          className="absolute"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255, 140, 0, 0.8) 0%, rgba(255, 100, 0, 0.6) 30%, transparent 70%)',
            borderRadius: '50%',
            opacity: 0,
            scale: 0,
            filter: 'blur(18px)',
            boxShadow: '0 0 120px rgba(255, 140, 0, 0.7), 0 0 220px rgba(255, 140, 0, 0.4)',
            willChange: 'transform, opacity',
          }}
        />
        {/* Second glow-up when LET'S BUILD appears (no blur, GPU-only) */}
        <div
          ref={glowRef2}
          className="absolute pointer-events-none"
          style={{
            width: '200px',
            height: '200px',
            left: '50%',
            top: '50%',
            marginLeft: '-100px',
            marginTop: '-100px',
            background: 'radial-gradient(circle, rgba(255, 160, 60, 0.7) 0%, rgba(255, 120, 0, 0.3) 50%, transparent 70%)',
            borderRadius: '50%',
            opacity: 0,
            willChange: 'transform',
          }}
        />

        {/* Logo container with rotating rings */}
        <div
          ref={logoContainerRef}
          className="absolute flex flex-col items-center gap-6"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            opacity: entranceComplete ? 0 : 1,
            pointerEvents: entranceComplete ? 'none' : 'auto',
          }}
        >
          {/* Rotating rings around logo */}
          <div className="relative">
            <div 
              className="absolute rounded-full border-2 border-white/20"
              style={{
                width: '200px',
                height: '200px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'spinSlow 8s linear infinite',
              }}
            />
            <div 
              className="absolute rounded-full border border-orange-500/30"
              style={{
                width: '240px',
                height: '240px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                borderStyle: 'dashed',
                animation: 'spinSlowReverse 12s linear infinite',
              }}
            />
            
            {/* Logo */}
            <img
              ref={logoRef}
              src={NextMindLogo}
              alt="NextMind"
              className="relative z-10 w-32 h-32 object-contain"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(255, 140, 0, 0.6))',
              }}
            />
          </div>

          {/* Brand name: scan-line reveal (beam sweeps, clip-path uncovers word) */}
          <div ref={brandBlockRef} className="relative inline-block">
            <div
              ref={brandRevealRef}
              className="inline-block"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <div
                ref={brandTextRef}
                className="font-hero text-5xl font-bold uppercase tracking-[0.3em]"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #FFD700 50%, #FF8C00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 60px rgba(255, 140, 0, 0.4)',
                }}
              />
            </div>
            <div
              ref={beamRef}
              className="absolute pointer-events-none top-1/2 -translate-y-1/2"
              style={{
                left: 0,
                width: 4,
                height: 72,
                background: 'linear-gradient(180deg, transparent 0%, rgba(255, 200, 120, 0.9) 20%, rgba(255, 140, 0, 1) 50%, rgba(255, 200, 120, 0.9) 80%, transparent 100%)',
                boxShadow: '0 0 20px rgba(255, 140, 0, 0.9), 0 0 40px rgba(255, 120, 0, 0.5)',
                borderRadius: 2,
                willChange: 'transform',
              }}
            />
          </div>
        </div>

        {/* Main headline - appears after entrance */}
        <h1 
          ref={textRef}
          className="font-hero text-[18vw] lg:text-[16vw] font-bold uppercase leading-[0.85] tracking-tight text-center"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            mixBlendMode: 'difference',
            opacity: entranceComplete ? 1 : 0,
          }}
        >
          LET'S BUILD
        </h1>
      </div>

      {/* Mobile-only: Compact hero — headline, subtitle with inline image, CTA, stats, marquee */}
      <div className="md:hidden w-full relative z-50 flex flex-col min-h-[92vh] pt-6">
        {/* Top: Headline + sub with inline image + CTA */}
        <div className="px-1 text-left">
          <h1
            className="font-hero text-[2.5rem] leading-[1.05] font-extrabold uppercase text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #fff 0%, #ffe0c0 50%, #FF8C00 100%)",
            }}
          >
            LET&apos;S BUILD
            <br />
            WHAT&apos;S NEXT
          </h1>

          <p className="text-base text-foreground/80 leading-relaxed max-w-xs mt-4 flex flex-wrap items-center gap-x-1.5">
            <span>We turn</span>
            <span className="text-orange-400 font-medium">ideas</span>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&h=80&fit=crop"
              alt=""
              className="inline-block w-14 h-[36px] rounded object-cover border border-white/10 shrink-0 -my-1"
            />
            <span>into</span>
            <span className="text-orange-400 font-medium">digital products</span>
            <span>that grow brands and drive revenue.</span>
          </p>

          <a
            href="/contact"
            className="relative inline-flex items-center gap-2 mt-5 px-7 py-3.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white font-hero uppercase tracking-wider text-sm rounded-full transition-all active:scale-95 shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 overflow-hidden group"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite'
            }}
          >
            <span className="relative z-10">Get in touch</span>
            <span className="text-lg leading-none relative z-10">→</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 px-1 mt-10">
          <div className="text-center py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-orange-400">50+</div>
            <div className="text-[10px] text-foreground/50 uppercase tracking-wide mt-0.5">Projects</div>
          </div>
          <div className="text-center py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-orange-400">2+</div>
            <div className="text-[10px] text-foreground/50 uppercase tracking-wide mt-0.5">Years</div>
          </div>
          <div className="text-center py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-orange-400">∞</div>
            <div className="text-[10px] text-foreground/50 uppercase tracking-wide mt-0.5">Support</div>
          </div>
        </div>

        {/* What we do marquee */}
        <div className="w-full overflow-hidden mt-12 pb-6">
          <p className="text-xs text-foreground/40 uppercase tracking-widest text-center mb-3">
            What we do
          </p>
          <div className="relative overflow-hidden">
            <div className="hero-marquee flex flex-nowrap whitespace-nowrap text-foreground/90 font-bold text-2xl">
              <span className="hero-marquee-track inline-flex items-center gap-5 pr-5 shrink-0">
                <span>Websites</span>
                <span className="text-orange-500">·</span>
                <span>Apps</span>
                <span className="text-orange-500">·</span>
                <span>AI</span>
                <span className="text-orange-500">·</span>
                <span>Branding</span>
                <span className="text-orange-500">·</span>
                <span>E-commerce</span>
                <span className="text-orange-500">·</span>
              </span>
              <span className="hero-marquee-track inline-flex items-center gap-5 pr-5 shrink-0" aria-hidden="true">
                <span>Websites</span>
                <span className="text-orange-500">·</span>
                <span>Apps</span>
                <span className="text-orange-500">·</span>
                <span>AI</span>
                <span className="text-orange-500">·</span>
                <span>Branding</span>
                <span className="text-orange-500">·</span>
                <span>E-commerce</span>
                <span className="text-orange-500">·</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-marquee {
          display: flex;
          width: max-content;
          animation: hero-marquee-scroll 12s linear infinite;
        }
        .hero-marquee-track {
          display: inline-flex;
          align-items: center;
        }
        @keyframes hero-marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spinSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spinSlowReverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
      `}</style>

    </section>
  );
};

export default HeroSection;

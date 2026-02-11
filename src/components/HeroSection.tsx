import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onEntranceComplete?: () => void;
}

const HeroSection = ({ onEntranceComplete }: HeroSectionProps) => {
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

      // Call entrance complete after a short delay for desktop
      setTimeout(() => {
        onEntranceComplete?.();
      }, 500);
    } else {
      // Mobile: call immediately since there's no entrance animation
      onEntranceComplete?.();
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [onEntranceComplete]);

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

      {/* Mobile-only: Compact hero — headline, subtitle with inline image, CTA, stats, marquee */}
      <div className="md:hidden w-full relative z-50 flex flex-col pt-6 pb-8">
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
      `}</style>

    </section>
  );
};

export default HeroSection;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MobileEnhancementsProps {
  children: React.ReactNode;
}

const MobileEnhancements = ({ children }: MobileEnhancementsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const floatingParticlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on mobile
    if (window.innerWidth > 768) return;

    const container = containerRef.current;
    const progressBar = progressBarRef.current;
    const floatingParticles = floatingParticlesRef.current;

    if (!container || !progressBar) return;

    // Scroll Progress Bar
    gsap.to(progressBar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Create floating particles
    if (floatingParticles) {
      const particleCount = 20; // More particles
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "floating-particle";
        
        const size = 2 + Math.random() * 6;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const isOrange = Math.random() > 0.4; // More orange particles
        
        particle.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${isOrange ? 
            'radial-gradient(circle at 30% 30%, #FF8C00 0%, #ff6600 70%, #ff4500 100%)' : 
            'radial-gradient(circle at 30% 30%, #fff 0%, #ddd 70%, #999 100%)'
          };
          box-shadow: ${isOrange ?
            `0 0 ${size * 3}px rgba(255, 140, 0, 0.8), 0 0 ${size * 5}px rgba(255, 100, 0, 0.4)` :
            `0 0 ${size * 2}px rgba(255, 255, 255, 0.6), inset 0 0 ${size}px rgba(255, 255, 255, 0.3)`
          };
          left: ${startX}%;
          top: ${startY}%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.7;
        `;
        
        floatingParticles.appendChild(particle);
        
        // Animate particles with more complex movements
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(particle, {
          y: `random(-150, 150)`,
          x: `random(-80, 80)`,
          scale: `random(0.3, 1.8)`,
          opacity: `random(0.2, 0.9)`,
          rotation: `random(-360, 360)`,
          duration: `random(4, 8)`,
          ease: "sine.inOut",
          delay: i * 0.15,
        });

        // Add scroll-reactive movement
        ScrollTrigger.create({
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(particle, {
              y: `+=${progress * 30}`,
              duration: 0.5,
            });
          },
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          /* Gradient text effect */
          .mobile-gradient-text {
            background: linear-gradient(
              90deg,
              #FF8C00 0%,
              #ffffff 25%,
              #FF8C00 50%,
              #ffffff 75%,
              #FF8C00 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 3s linear infinite;
          }

          /* Glow effects */
          .mobile-glow {
            animation: mobileGlow 2s ease-in-out infinite alternate;
          }

          @keyframes mobileGlow {
            from {
              filter: drop-shadow(0 0 10px rgba(255, 140, 0, 0.5));
            }
            to {
              filter: drop-shadow(0 0 20px rgba(255, 140, 0, 0.9));
            }
          }

          /* Float animation */
          .mobile-float {
            animation: mobileFloat 3s ease-in-out infinite;
          }

          @keyframes mobileFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          /* Pulse border */
          .mobile-pulse-border {
            position: relative;
          }

          .mobile-pulse-border::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            padding: 2px;
            background: linear-gradient(45deg, #FF8C00, #ff6600, #FF8C00);
            background-size: 200% 200%;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: borderPulse 3s linear infinite;
          }

          @keyframes borderPulse {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          /* NEW: Touch ripple effect */
          .mobile-ripple {
            position: relative;
            overflow: hidden;
          }

          .mobile-ripple::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 140, 0, 0.5);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }

          .mobile-ripple:active::after {
            width: 300px;
            height: 300px;
          }

          /* NEW: Card tilt effect */
          .mobile-tilt {
            transform-style: preserve-3d;
            transition: transform 0.3s ease-out;
          }

          /* NEW: Reveal animation */
          .mobile-reveal {
            opacity: 0;
            transform: translateY(30px);
            animation: mobileReveal 0.8s ease-out forwards;
          }

          @keyframes mobileReveal {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* NEW: Shimmer effect */
          .mobile-shimmer {
            position: relative;
            overflow: hidden;
          }

          .mobile-shimmer::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 140, 0, 0.3),
              transparent
            );
            animation: shimmer 3s infinite;
          }

          @keyframes shimmer {
            to {
              left: 100%;
            }
          }

          /* NEW: Scale on scroll */
          .mobile-scale-in {
            animation: scaleIn 0.6s ease-out;
          }

          @keyframes scaleIn {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          /* NEW: Rotate on appear */
          .mobile-rotate-in {
            animation: rotateIn 0.8s ease-out;
          }

          @keyframes rotateIn {
            from {
              transform: rotate(-180deg) scale(0.5);
              opacity: 0;
            }
            to {
              transform: rotate(0) scale(1);
              opacity: 1;
            }
          }

          /* NEW: Slide from sides */
          .mobile-slide-left {
            animation: slideFromLeft 0.6s ease-out;
          }

          @keyframes slideFromLeft {
            from {
              transform: translateX(-100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          .mobile-slide-right {
            animation: slideFromRight 0.6s ease-out;
          }

          @keyframes slideFromRight {
            from {
              transform: translateX(100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          /* NEW: Bounce entrance */
          .mobile-bounce-in {
            animation: bounceIn 1s ease-out;
          }

          @keyframes bounceIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          /* NEW: Text split animation */
          .mobile-text-split span {
            display: inline-block;
            animation: textPop 0.5s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
          }

          .mobile-text-split span:nth-child(1) { animation-delay: 0.05s; }
          .mobile-text-split span:nth-child(2) { animation-delay: 0.1s; }
          .mobile-text-split span:nth-child(3) { animation-delay: 0.15s; }
          .mobile-text-split span:nth-child(4) { animation-delay: 0.2s; }
          .mobile-text-split span:nth-child(5) { animation-delay: 0.25s; }

          @keyframes textPop {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>

      {/* Scroll Progress Bar - Mobile Only */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-[10000] md:hidden"
        style={{ transformOrigin: "left" }}
      >
        <div
          ref={progressBarRef}
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #FF8C00 0%, #ff6600 100%)",
            transform: "scaleX(0)",
            boxShadow: "0 0 10px rgba(255, 140, 0, 0.8)",
          }}
        />
      </div>

      {/* Floating Particles Container - Mobile Only */}
      <div 
        ref={floatingParticlesRef}
        className="fixed inset-0 pointer-events-none z-[9999] md:hidden"
      />

      {/* Main Content */}
      <div ref={containerRef}>
        {children}
      </div>
    </>
  );
};

export default MobileEnhancements;

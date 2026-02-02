import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    icon: "🤖", 
    name: "AI Websites", 
    desc: "Intelligent, self-learning web platforms",
    color: "#FF6B35",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
  },
  { 
    icon: "💬", 
    name: "ChatBots", 
    desc: "24/7 AI-powered customer engagement",
    color: "#4ECDC4",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop"
  },
  { 
    icon: "⚡", 
    name: "AI Automation", 
    desc: "Automate tasks and workflows with AI",
    color: "#FFD93D",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop"
  },
  { 
    icon: "📱", 
    name: "Mobile Apps", 
    desc: "iOS & Android with AI features",
    color: "#6C5CE7",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
  },
  { 
    icon: "🧾", 
    name: "POS Systems", 
    desc: "Modern point-of-sale for fast checkout",
    color: "#00B894",
    image: "https://images.unsplash.com/photo-1556742049-9083c0c022e0?w=400&h=300&fit=crop"
  },
  { 
    icon: "🎨", 
    name: "UI/UX Design", 
    desc: "Beautiful, intelligent interfaces",
    color: "#FF8C00",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
  },
];

const ServicesScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const isMobile = window.innerWidth < 768;
    
    if (!section || !text) return;

    if (isMobile) {
      // Mobile: Advanced 3D card animations
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Set initial state - cards start from different positions
        const startRotation = index % 2 === 0 ? -15 : 15;
        const startX = index % 2 === 0 ? -100 : 100;

        gsap.set(card, {
          opacity: 0,
          x: startX,
          y: 50,
          rotationY: startRotation,
          scale: 0.8,
        });

        // Create reveal animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top center+=150",
            end: "top center-=50",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(card, {
          opacity: 1,
          x: 0,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
        });

        // Add floating animation
        gsap.to(card, {
          y: -5,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });

        // Add particles animation
        const particles = card.querySelectorAll('.absolute.w-1.h-1');
        particles.forEach((particle, pIndex) => {
          gsap.to(particle, {
            y: `random(-20, 20)`,
            x: `random(-10, 10)`,
            scale: `random(0.5, 1.5)`,
            opacity: `random(0.3, 1)`,
            duration: `random(2, 4)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: pIndex * 0.5,
          });
        });
      });
    } else {
      // Desktop: Original horizontal scroll (RESTORED)
      const textContent = text.textContent || "";
      text.textContent = "";
      
      const chars = textContent.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.whiteSpace = char === " " ? "pre" : "normal";
        text.appendChild(span);
        return span;
      });

      const scrollTween = gsap.to(text, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=5000px",
          scrub: true,
        },
      });

      chars.forEach((char) => {
        gsap.from(char, {
          yPercent: gsap.utils.random(-200, 200),
          rotation: gsap.utils.random(-20, 20),
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1,
          },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === section || trigger.vars.containerAnimation === scrollTween) {
            trigger.kill();
          }
        });
        scrollTween.kill();
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const dots = [
    { top: '15%', left: '10%', size: 8, delay: 0, type: 'black' },
    { top: '25%', left: '85%', size: 6, delay: 0.5, type: 'black' },
    { top: '70%', left: '15%', size: 10, delay: 1, type: 'black' },
    { top: '80%', left: '80%', size: 5, delay: 1.5, type: 'black' },
    { top: '40%', left: '5%', size: 7, delay: 0.3, type: 'black' },
    { top: '60%', left: '92%', size: 9, delay: 0.8, type: 'black' },
    { top: '10%', left: '60%', size: 4, delay: 1.2, type: 'black' },
    { top: '85%', left: '40%', size: 6, delay: 0.6, type: 'black' },
    { top: '35%', left: '95%', size: 8, delay: 1.8, type: 'black' },
    { top: '55%', left: '8%', size: 5, delay: 0.2, type: 'black' },
    { top: '20%', left: '45%', size: 7, delay: 0.4, type: 'black' },
    { top: '50%', left: '25%', size: 6, delay: 1.1, type: 'black' },
    { top: '65%', left: '70%', size: 8, delay: 0.7, type: 'black' },
    { top: '30%', left: '78%', size: 5, delay: 1.4, type: 'black' },
    { top: '75%', left: '55%', size: 9, delay: 0.9, type: 'black' },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-[60vh] md:h-screen flex items-center overflow-hidden relative mt-0 md:-mt-[55vh] lg:-mt-[60vh] py-12 md:py-0"
      style={{
        background: 'linear-gradient(135deg, #FF8C00 0%, #ff6600 50%, #FF8C00 100%)',
      }}
    >
      {/* Dark black dots */}
      {dots.map((dot, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) dotsRef.current[index] = el;
          }}
          className="absolute rounded-full animate-pulse"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: `radial-gradient(circle at 30% 30%, 
              hsl(0, 0%, 15%) 0%, 
              hsl(0, 0%, 10%) 40%, 
              hsl(0, 0%, 5%) 70%, 
              hsl(0, 0%, 0%) 100%)`,
            boxShadow: `
              0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.6),
              inset 0 -${dot.size / 4}px ${dot.size / 3}px rgba(0, 0, 0, 0.8),
              inset 0 ${dot.size / 4}px ${dot.size / 3}px rgba(50, 50, 50, 0.3)
            `,
            animationDelay: `${dot.delay}s`,
            animationDuration: '3s',
          }}
        />
      ))}

      {/* Desktop: Horizontal scrolling text (ORIGINAL) */}
      <div className="hidden md:block container relative z-10">
        <h3 
          ref={textRef}
          className="font-hero text-7xl lg:text-[clamp(2rem,10vw,12rem)] font-bold uppercase leading-[1.1] whitespace-nowrap pl-[100vw]"
          style={{
            display: 'flex',
            width: 'max-content',
            gap: '4vw',
            color: '#000000'
          }}
        >
          AI, Websites, Web Design, AI Automation, ChatBot, Mobile Application, ...And much more!
        </h3>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(50px) rotateX(-20deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.7;
          }
          50% {
            transform: translate(10px, -20px);
            opacity: 1;
          }
        }
      `}</style>

      {/* Mobile: Advanced 3D service cards with GSAP */}
      <div className="md:hidden container mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <h3 className="font-hero text-3xl font-bold uppercase text-black mb-2"
            style={{
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
          >
            What We Do
          </h3>
          <div className="w-20 h-1 bg-black mx-auto mb-3"></div>
          <p className="text-black/80 text-sm font-medium max-w-xs mx-auto">
            Cutting-edge AI solutions that transform your business
          </p>
        </div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="service-card-3d relative group"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Glowing background orb */}
              <div 
                className="absolute -inset-4 opacity-0 group-active:opacity-100 transition-opacity duration-500 blur-2xl"
                style={{
                  background: `radial-gradient(circle, ${service.color}40 0%, transparent 70%)`,
                  zIndex: -1,
                }}
              />

              {/* Main card */}
              <div className="relative bg-black/30 backdrop-blur-md border-2 border-black/40 rounded-2xl overflow-hidden"
                style={{
                  transform: 'translateZ(0)',
                  transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Animated gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-active:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}60 0%, transparent 100%)`,
                  }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                      style={{
                        top: `${20 + i * 30}%`,
                        left: `${10 + i * 25}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: '2s',
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </div>

                <div className="relative p-5 flex items-center gap-4">
                  {/* Content - No icon */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-black uppercase tracking-wide mb-1"
                      style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}
                    >
                      {service.name}
                    </h4>
                    <p className="text-xs text-black/70 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Animated arrow */}
                  <div className="flex-shrink-0">
                    <div 
                      className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-black font-bold transform group-active:translate-x-2 transition-all duration-300"
                      style={{
                        border: `2px solid ${service.color}80`,
                      }}
                    >
                      →
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div 
                  className="h-1 w-0 group-active:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${service.color} 0%, transparent 100%)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ServicesScrollSection;

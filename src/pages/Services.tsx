import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileEnhancements from "@/components/MobileEnhancements";
import { MobileAnimatedSection } from "@/components/MobileAnimatedSection";
import MobileScrollTextReveal from "@/components/MobileScrollTextReveal";
import aiAutomationImage from "@/assets/images/ai automation.jpg";
import aiSolutionImage from "@/assets/images/ai solution.jpg";
import websiteImage from "@/assets/images/website.jpg";
import chatbotImage from "@/assets/images/chatbot.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "AI Solutions",
    description: "Custom AI integration and automation to transform your business operations",
    features: ["Machine Learning", "Natural Language Processing", "Predictive Analytics", "AI Chatbots"],
    image: aiSolutionImage,
  },
  {
    id: "02",
    title: "Web Development",
    description: "Modern, responsive websites built with cutting-edge technologies",
    features: ["React & Next.js", "Custom CMS", "E-commerce", "Progressive Web Apps"],
    image: websiteImage,
  },
  {
    id: "03",
    title: "Web Design",
    description: "Beautiful, user-centric designs that captivate and convert",
    features: ["UI/UX Design", "Brand Identity", "Prototyping", "Design Systems"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
  },
  {
    id: "04",
    title: "AI Automation",
    description: "Streamline workflows with intelligent automation solutions",
    features: ["Process Automation", "Data Processing", "API Integration", "Workflow Optimization"],
    image: aiAutomationImage,
  },
  {
    id: "05",
    title: "ChatBot Development",
    description: "Intelligent conversational AI for customer engagement",
    features: ["24/7 Support", "Multi-platform", "Natural Conversations", "Analytics Dashboard"],
    image: chatbotImage,
  },
  {
    id: "06",
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps that users love",
    features: ["iOS & Android", "React Native", "App Store Optimization", "Push Notifications"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
  },
];

const Services = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroText2Ref = useRef<HTMLHeadingElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaTextRef = useRef<HTMLHeadingElement>(null);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const heroText = heroTextRef.current;
    const heroText2 = heroText2Ref.current;
    const heroSection = heroSectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const ctaSection = ctaSectionRef.current;
    const ctaText = ctaTextRef.current;

    if (!heroText || !heroText2 || !heroSection || !cardsContainer) return;

    const isMobile = window.innerWidth < 768;

    // On mobile: GSAP + scroll-linked animations - text light up, scale, cards from left/right
    if (isMobile) {
      // Cards: alternating left/right slide with scale
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const fromX = index % 2 === 0 ? -80 : 80;
        gsap.from(card, {
          opacity: 0,
          x: fromX,
          scale: 0.9,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
          delay: index * 0.12,
        });
      });
      if (whatWeDoRef.current) {
        const items = whatWeDoRef.current.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
          const fromX = index % 2 === 0 ? -60 : 60;
          gsap.from(item, {
            opacity: 0,
            x: fromX,
            y: 30,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: { trigger: item, start: "top 85%" },
            delay: index * 0.1,
          });
        });
      }
      if (ctaSection && ctaText) {
        // Text scale + light up on scroll
        gsap.from(ctaText, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ctaSection, start: "top 80%" },
        });
        ScrollTrigger.create({
          trigger: ctaSection,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(ctaText, {
              filter: `brightness(${0.8 + self.progress * 0.4})`,
              scale: 0.98 + self.progress * 0.04,
              duration: 0.1,
            });
          },
        });
      }
      // Mobile hero text - scroll-linked scale/light
      const mobileHero = heroSection?.querySelector('[class*="md:hidden"]');
      if (mobileHero) {
        const heroTitle = mobileHero.querySelector('h1');
        if (heroTitle) {
          ScrollTrigger.create({
            trigger: heroSection,
            start: "top top",
            end: "bottom 50%",
            scrub: 1,
            onUpdate: (self) => {
              gsap.to(heroTitle, {
                opacity: 1 - self.progress * 0.3,
                scale: 1 - self.progress * 0.1,
                filter: `brightness(${1 - self.progress * 0.2})`,
                duration: 0.1,
              });
            },
          });
        }
      }
      // Mobile scroll zoom - sections zoom in/out as they scroll through viewport
      const zoomSections = document.querySelectorAll('section');
      zoomSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const scale = p < 0.3 ? 0.97 + (p / 0.3) * 0.04 : p < 0.7 ? 1.01 : 1.01 - ((p - 0.7) / 0.3) * 0.04;
            gsap.set(section, { scale, transformOrigin: "center center" });
          },
        });
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }

    // Desktop: Split first line into characters
    const textContent1 = heroText.textContent || "";
    heroText.textContent = "";
    
    const chars1 = textContent1.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      heroText.appendChild(span);
      return span;
    });

    // Split second line into characters
    const textContent2 = heroText2.textContent || "";
    heroText2.textContent = "";
    
    const chars2 = textContent2.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      heroText2.appendChild(span);
      return span;
    });

    // Set initial state - visible on load
    gsap.set([chars1, chars2], {
      opacity: 1,
      y: 0,
    });

    // Create timeline for hero animation
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    // Animate characters with scale and rotation
    heroTl.to([...chars1, ...chars2], {
      opacity: 0,
      scale: 2,
      y: -100,
      rotation: gsap.utils.wrap([-45, 45]),
      stagger: {
        each: 0.02,
        from: "random",
      },
      duration: 1,
      ease: "power2.in",
    }, 0);

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.set(card, {
        zIndex: services.length - index,
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 0.8,
      });
    });

    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: cardsContainer,
        start: "top top",
        end: () => `+=${services.length * window.innerHeight}`,
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const cardIndex = Math.floor(progress * services.length);
          setCurrentCard(Math.min(cardIndex, services.length - 1));
        },
      },
    });

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      if (index > 0) {
        const startProgress = (index - 0.5) / services.length;
        const endProgress = index / services.length;

        cardsTl.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.8,
            yPercent: 10,
          },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            ease: "power2.out",
          },
          startProgress
        );
      }

      if (index < services.length - 1) {
        const exitStart = (index + 0.8) / services.length;
        
        cardsTl.to(
          card,
          {
            yPercent: -100,
            opacity: 0,
            scale: 0.9,
            ease: "power2.inOut",
          },
          exitStart
        );
      }
    });

    if (whatWeDoRef.current) {
      const timelineItems = whatWeDoRef.current.querySelectorAll('.timeline-item');
      const timelineLine = whatWeDoRef.current.querySelector('.timeline-line');
      
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: whatWeDoRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }
      
      timelineItems.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        const circle = item.querySelector('.timeline-circle');
        const box = item.querySelector('.timeline-box');
        
        if (circle) {
          gsap.from(circle, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          });
        }
        
        if (box) {
          gsap.from(box, {
            opacity: 0,
            x: isLeft ? -100 : 100,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          });
        }
      });
    }

    if (ctaSection && ctaText) {
      const ctaContent = ctaText.textContent || "";
      ctaText.textContent = "";
      
      const ctaChars = ctaContent.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.whiteSpace = char === " " ? "pre" : "normal";
        ctaText.appendChild(span);
        return span;
      });

      gsap.from(ctaChars, {
        yPercent: 100,
        opacity: 0,
        rotation: gsap.utils.random(-10, 10),
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 70%",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === heroSection ||
          trigger.vars.trigger === cardsContainer ||
          trigger.vars.trigger === ctaSection
        ) {
          trigger.kill();
        }
      });
      heroTl.kill();
    };
  }, []);

  const dots = [
    { top: '10%', left: '8%', size: 6, delay: 0, type: 'orange' },
    { top: '20%', left: '88%', size: 8, delay: 0.5, type: 'metallic' },
    { top: '75%', left: '12%', size: 5, delay: 1, type: 'orange' },
    { top: '85%', left: '82%', size: 7, delay: 1.5, type: 'metallic' },
    { top: '40%', left: '5%', size: 9, delay: 0.3, type: 'orange' },
    { top: '60%', left: '92%', size: 6, delay: 0.8, type: 'orange' },
  ];

  return (
    <MobileEnhancements>
      <div className="min-h-screen bg-background">
        <Header />
      
      <main className="pt-20">
        <section
          ref={heroSectionRef}
          className="min-h-screen md:h-screen flex items-start md:items-center justify-start md:justify-center pt-24 md:pt-0 px-6 md:px-12 relative overflow-hidden bg-background"
        >
          {dots.map((dot, index) => {
            return (
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
            );
          })}

          {/* Mobile: Stacked hero with Framer Motion */}
          <div className="md:hidden w-full relative z-50 space-y-4 pb-12">
            <MobileAnimatedSection animation="slideFromTop" delay={0}>
              <h1 className="font-hero text-5xl font-bold uppercase leading-tight text-foreground" style={{ textShadow: '0 4px 12px rgba(255, 140, 0, 0.3)' }}>
                OUR SERVICES
              </h1>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="slideFromLeft" delay={1}>
              <p className="text-white text-lg leading-relaxed" style={{ wordSpacing: '0.2em' }}>
                AI solutions, web development, chatbots, mobile apps & more.
              </p>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="slideFromRight" delay={2}>
              <p className="text-orange-500 font-semibold">We build digital products that drive results.</p>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="scaleUp" delay={3}>
              <a href="#services-cards" className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-hero uppercase tracking-wider text-sm rounded-full transition-all">
                Explore Services
              </a>
            </MobileAnimatedSection>
          </div>

          {/* Desktop: Centered animated hero */}
          <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center pointer-events-none px-4" style={{ zIndex: 50 }}>
            <div className="flex flex-col items-center">
              <h1
                ref={heroTextRef}
                className="font-hero text-[20vw] md:text-[18vw] lg:text-[16vw] font-bold uppercase leading-[0.85] tracking-tight text-center"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  mixBlendMode: 'difference',
                }}
              >
                OUR
              </h1>
              <h1
                ref={heroText2Ref}
                className="font-hero text-[20vw] md:text-[18vw] lg:text-[16vw] font-bold uppercase leading-[0.85] tracking-tight text-center"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  mixBlendMode: 'difference',
                }}
              >
                SERVICES
              </h1>
            </div>
          </div>
        </section>

        <MobileScrollTextReveal text="We build digital products that transform businesses and drive results." />

        <section
          ref={cardsContainerRef}
          id="services-cards"
          className="relative min-h-0 md:h-screen overflow-visible md:overflow-hidden"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              className="relative md:absolute md:inset-0 flex items-center justify-center px-6 md:px-12 py-8 md:py-0"
            >
              <div className="w-full max-w-6xl">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <div className="text-sm uppercase tracking-widest text-orange-400 mb-4 font-hero">
                      {service.id} / {String(services.length).padStart(2, '0')}
                    </div>
                    <h2 className="font-hero text-2xl md:text-6xl lg:text-7xl font-bold uppercase mb-4 md:mb-6 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 border border-foreground/20 text-foreground/70 text-sm uppercase tracking-wider hover:border-orange-500/50 hover:text-orange-300 transition-all duration-300"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-1 md:order-2">
                    <div className="relative">
                      <div
                        className="absolute inset-0 bg-orange-500/20 blur-3xl"
                        style={{
                          transform: 'translate(20px, 20px)',
                        }}
                      />
                      <img
                        src={service.image}
                        alt={service.title}
                        className="relative rounded-2xl w-full h-auto object-cover shadow-2xl"
                        style={{
                          aspectRatio: '4/3',
                        }}
                      />
                      <div className="absolute inset-0 border-2 border-foreground/10 rounded-2xl pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section
          ref={whatWeDoRef}
          className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20 relative overflow-hidden"
        >
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="font-hero text-5xl md:text-7xl font-bold uppercase mb-20 text-center">
              What We Do
            </h2>
            
              <div className="relative">
              {/* Center vertical line - hidden on mobile */}
              <div 
                className="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-500/30 origin-top hidden md:block"
                style={{ transform: 'translateX(-50%)' }}
              />
              
              {/* Timeline Items */}
              <div className="space-y-8 md:space-y-24">
                {/* Item 1 - Right side */}
                <div className="timeline-item relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 md:pr-8 md:pr-16 order-2 md:order-1" />
                    <div className="timeline-circle w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-600 border-4 border-background flex items-center justify-center font-hero text-lg md:text-2xl font-bold z-10 mb-4 md:mb-0 md:absolute md:left-1/2 order-1 md:order-2" style={{ transform: 'translateX(-50%)' }}>
                      01
                    </div>
                    <div className="timeline-box w-full md:w-1/2 pl-0 md:pl-8 md:pl-16 order-3 text-center md:text-left">
                      <div className="relative p-6 md:p-8 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 bg-gradient-to-br from-background to-orange-950/10 backdrop-blur-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <h3 className="font-hero text-xl md:text-2xl font-bold uppercase mb-3 text-orange-400">Strategy</h3>
                          <p className="text-foreground/70 leading-relaxed">
                            We analyze your business goals and create a comprehensive digital strategy that aligns with your vision and drives measurable results.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 2 - Left side */}
                <div className="timeline-item relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="timeline-box w-full md:w-1/2 pr-0 md:pr-8 md:pr-16 text-center md:text-right order-3 md:order-1">
                      <div className="relative p-6 md:p-8 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 bg-gradient-to-bl from-background to-orange-950/10 backdrop-blur-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <h3 className="font-hero text-xl md:text-2xl font-bold uppercase mb-3 text-orange-400">Design</h3>
                          <p className="text-foreground/70 leading-relaxed">
                            Beautiful, intuitive interfaces that captivate users. We craft experiences that are both visually stunning and functionally superior.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-circle w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-600 border-4 border-background flex items-center justify-center font-hero text-lg md:text-2xl font-bold z-10 mb-4 md:mb-0 md:absolute md:left-1/2 order-1 md:order-2" style={{ transform: 'translateX(-50%)' }}>
                      02
                    </div>
                    <div className="w-full md:w-1/2 md:pl-8 md:pl-16 order-2 md:order-3" />
                  </div>
                </div>

                {/* Item 3 - Right side */}
                <div className="timeline-item relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 md:pr-8 md:pr-16 order-2 md:order-1" />
                    <div className="timeline-circle w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-600 border-4 border-background flex items-center justify-center font-hero text-lg md:text-2xl font-bold z-10 mb-4 md:mb-0 md:absolute md:left-1/2 order-1 md:order-2" style={{ transform: 'translateX(-50%)' }}>
                      03
                    </div>
                    <div className="timeline-box w-full md:w-1/2 pl-0 md:pl-8 md:pl-16 order-3 text-center md:text-left">
                      <div className="relative p-6 md:p-8 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 bg-gradient-to-br from-background to-orange-950/10 backdrop-blur-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <h3 className="font-hero text-xl md:text-2xl font-bold uppercase mb-3 text-orange-400">
                            Development & POS Systems
                          </h3>
                          <p className="text-foreground/70 leading-relaxed">
                            Cutting-edge web and mobile development, modern POS systems, and custom platforms that are fast, reliable, and built to scale.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 4 - Left side */}
                <div className="timeline-item relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="timeline-box w-full md:w-1/2 pr-0 md:pr-8 md:pr-16 text-center md:text-right order-2">
                      <div className="relative p-6 md:p-8 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 bg-gradient-to-bl from-background to-orange-950/10 backdrop-blur-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <h3 className="font-hero text-xl md:text-2xl font-bold uppercase mb-3 text-orange-400">
                            Deployment & AI Automation
                          </h3>
                          <p className="text-foreground/70 leading-relaxed">
                            Seamless launches, monitoring, and AI automations that streamline workflows, reduce manual work, and keep your product performing at its peak.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-circle w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-600 border-4 border-background flex items-center justify-center font-hero text-lg md:text-2xl font-bold z-10 mb-4 md:mb-0 md:absolute md:left-1/2 order-1" style={{ transform: 'translateX(-50%)' }}>
                      04
                    </div>
                    <div className="w-full md:w-1/2 pl-0 md:pl-8 md:pl-16 order-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={ctaSectionRef}
          className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF8C00 0%, #ff6600 50%, #FF8C00 100%)',
          }}
        >
          {/* Mixed dots: orange, black, and metallic on orange background */}
          {[
            { top: '8%', left: '6%', size: 7, type: 'black' },
            { top: '18%', left: '88%', size: 9, type: 'metallic' },
            { top: '28%', left: '12%', size: 6, type: 'orange' },
            { top: '40%', left: '90%', size: 8, type: 'black' },
            { top: '52%', left: '5%', size: 10, type: 'metallic' },
            { top: '65%', left: '85%', size: 5, type: 'orange' },
            { top: '75%', left: '15%', size: 7, type: 'black' },
            { top: '85%', left: '92%', size: 6, type: 'metallic' },
            { top: '15%', left: '45%', size: 8, type: 'orange' },
            { top: '60%', left: '50%', size: 9, type: 'black' },
            { top: '90%', left: '55%', size: 7, type: 'metallic' },
          ].map((dot, index) => (
            <div
              key={index}
              className="absolute rounded-full animate-pulse"
              style={{
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
                background: dot.type === 'black'
                  ? `radial-gradient(circle at 30% 30%, 
                      hsl(0, 0%, 15%) 0%, 
                      hsl(0, 0%, 10%) 40%, 
                      hsl(0, 0%, 5%) 70%, 
                      hsl(0, 0%, 0%) 100%)`
                  : dot.type === 'orange'
                  ? `radial-gradient(circle at 30% 30%, 
                      hsl(30, 100%, 70%) 0%, 
                      hsl(30, 100%, 60%) 40%, 
                      hsl(30, 90%, 50%) 70%, 
                      hsl(30, 80%, 40%) 100%)`
                  : `radial-gradient(circle at 30% 30%, 
                      hsl(220, 20%, 90%) 0%, 
                      hsl(220, 15%, 70%) 40%, 
                      hsl(220, 10%, 50%) 70%, 
                      hsl(220, 8%, 30%) 100%)`,
                boxShadow: dot.type === 'black'
                  ? `0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.6)`
                  : dot.type === 'orange'
                  ? `0 ${dot.size / 4}px ${dot.size / 2}px rgba(255, 140, 0, 0.5)`
                  : `0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.3)`,
                animationDelay: `${index * 0.2}s`,
                animationDuration: '3s',
              }}
            />
          ))}
          
          <div className="text-center relative z-10 max-w-4xl">
            <h2
              ref={ctaTextRef}
              className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-8 leading-tight text-black drop-shadow-lg"
            >
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg md:text-xl text-black/80 mb-12 max-w-2xl mx-auto font-medium">
              Let's turn your vision into reality. Get in touch with us today and start your digital transformation journey.
            </p>
            <a
              href="/#contact"
              className="inline-block px-12 py-5 bg-black hover:bg-black/90 text-white font-hero uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-full"
            >
              Get Started
            </a>
          </div>

          {/* Soften the bottom edge into the black footer */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent via-black/40 to-black z-[5]" />
        </section>
      </main>

        <Footer />
      </div>
    </MobileEnhancements>
  );
};

export default Services;

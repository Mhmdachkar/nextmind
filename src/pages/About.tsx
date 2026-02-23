import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileEnhancements from "@/components/MobileEnhancements";
import { MobileAnimatedSection } from "@/components/MobileAnimatedSection";
import MobileScrollTextReveal from "@/components/MobileScrollTextReveal";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Visionary leader with 15+ years in tech innovation",
  },
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Award-winning designer crafting memorable experiences",
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Full-stack expert building scalable solutions",
  },
  {
    name: "Emily Zhang",
    role: "AI Specialist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Machine learning pioneer transforming businesses",
  },
];

const values = [
  {
    title: "Innovation First",
    description: "We push boundaries and embrace cutting-edge technologies to deliver solutions that set new standards.",
    icon: "💡",
  },
  {
    title: "Client Success",
    description: "Your success is our mission. We're committed to delivering results that exceed expectations.",
    icon: "🎯",
  },
  {
    title: "Quality Driven",
    description: "Excellence in every line of code, every pixel, and every interaction. No compromises.",
    icon: "⚡",
  },
  {
    title: "Collaborative Spirit",
    description: "We believe in the power of partnership, working closely with clients to achieve shared goals.",
    icon: "🤝",
  },
];

const stats = [
  { number: "150+", label: "Projects Delivered" },
  { number: "50+", label: "Happy Clients" },
  { number: "15+", label: "Industry Awards" },
  { number: "2+", label: "Years of Excellence" },
];

const About = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroText = heroTextRef.current;
    const heroSection = heroSectionRef.current;
    const story = storyRef.current;
    const teamGrid = teamGridRef.current;
    const values = valuesRef.current;

    if (!heroText || !heroSection) return;

    const isMobile = window.innerWidth < 768;

    // Mobile: GSAP scroll animations - alternating left/right, text scale, stack effect
    if (isMobile) {
      if (story) {
        const storyElements = story.querySelectorAll('.story-element');
        storyElements.forEach((el, index) => {
          const fromX = index % 2 === 0 ? -70 : 70;
          gsap.from(el, {
            opacity: 0,
            x: fromX,
            y: 40,
            scale: index % 3 === 0 ? 0.95 : 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            delay: index * 0.1,
          });
        });
      }
      if (teamGrid) {
        const teamCards = teamGrid.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
          const fromX = index % 2 === 0 ? -60 : 60;
          gsap.from(card, {
            opacity: 0,
            x: fromX,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: card, start: "top 88%" },
            delay: index * 0.12,
          });
        });
      }
      if (values) {
        const valueTapes = values.querySelectorAll('.value-tape');
        valueTapes.forEach((tape, index) => {
          const fromX = index % 2 === 0 ? -80 : 80;
          gsap.from(tape, {
            opacity: 0,
            x: fromX,
            scale: 0.9,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: tape, start: "top 88%" },
            delay: index * 0.1,
          });
        });
      }
      // Mobile scroll zoom - sections zoom in/out as they scroll
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

    const textContent = heroText.textContent || "";
    heroText.textContent = "";
    
    const chars = textContent.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      heroText.appendChild(span);
      return span;
    });

    gsap.set(chars, { opacity: 1, y: 0 });

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    heroTl.to(chars, {
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
    });

    if (story) {
      const storyElements = story.querySelectorAll('.story-element');
      storyElements.forEach((element, index) => {
        gsap.from(element, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
          },
          delay: index * 0.1,
        });
      });
    }

    if (teamGrid) {
      const teamCards = teamGrid.querySelectorAll('.team-card');
      teamCards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          rotation: gsap.utils.random(-5, 5),
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          delay: index * 0.15,
        });
      });
    }

    if (values) {
      const valueTapes = values.querySelectorAll('.value-tape');
      valueTapes.forEach((tape, index) => {
        gsap.set(tape, { 
          scaleX: 0,
          opacity: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: tape,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            once: false,
          },
        });

        tl.to(tape, {
          scaleX: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const metallicDots = [
    { top: '15%', left: '10%', size: 8, delay: 0, type: 'orange' },
    { top: '25%', left: '85%', size: 6, delay: 0.5, type: 'metallic' },
    { top: '70%', left: '15%', size: 10, delay: 1, type: 'orange' },
    { top: '80%', left: '80%', size: 5, delay: 1.5, type: 'metallic' },
    { top: '40%', left: '5%', size: 7, delay: 0.3, type: 'orange' },
    { top: '60%', left: '92%', size: 9, delay: 0.8, type: 'metallic' },
    { top: '10%', left: '60%', size: 4, delay: 1.2, type: 'metallic' },
    { top: '85%', left: '40%', size: 6, delay: 0.6, type: 'orange' },
    { top: '35%', left: '95%', size: 8, delay: 1.8, type: 'metallic' },
    { top: '55%', left: '8%', size: 5, delay: 0.2, type: 'orange' },
    { top: '20%', left: '50%', size: 7, delay: 0.9, type: 'metallic' },
    { top: '65%', left: '70%', size: 9, delay: 1.3, type: 'orange' },
    { top: '45%', left: '25%', size: 6, delay: 0.7, type: 'metallic' },
    { top: '90%', left: '60%', size: 8, delay: 1.6, type: 'orange' },
    { top: '5%', left: '35%', size: 5, delay: 0.4, type: 'metallic' },
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
          {metallicDots.map((dot, index) => (
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

          {/* Mobile: Stacked hero with Framer Motion */}
          <div className="md:hidden w-full relative z-50 space-y-4 pb-12">
            <MobileAnimatedSection animation="slideFromTop" delay={0}>
              <h1 className="font-hero text-5xl font-bold uppercase leading-tight text-foreground" style={{ textShadow: '0 4px 12px rgba(255, 140, 0, 0.3)' }}>
                ABOUT US
              </h1>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="slideFromLeft" delay={1}>
              <p className="text-white text-lg leading-relaxed" style={{ wordSpacing: '0.2em' }}>
                Technology that empowers. Digital solutions that transform.
              </p>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="slideFromRight" delay={2}>
              <p className="text-orange-500 font-semibold">Innovation, quality & partnership.</p>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="scaleUp" delay={3}>
              <a href="#story" className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-hero uppercase tracking-wider text-sm rounded-full transition-all">
                Our Story
              </a>
            </MobileAnimatedSection>
          </div>

          {/* Desktop: Centered hero */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none px-4" style={{ zIndex: 50 }}>
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
              ABOUT US
            </h1>
          </div>
        </section>

        <MobileScrollTextReveal text="Technology that empowers. Digital solutions that transform businesses worldwide." />

        <section
          id="story"
          ref={storyRef}
          className="min-h-screen flex items-center justify-center px-6 md:px-12 py-12 md:py-20"
        >
          <div className="max-w-5xl mx-auto">
            <div className="story-element mb-16">
              <h2 className="font-hero text-5xl md:text-7xl font-bold uppercase mb-8">
                Our Story
              </h2>
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-6">
                Founded in 2025, Next Mind emerged from a simple belief: technology should empower, not complicate. What started as a small team of passionate developers has grown into a full-service digital agency trusted by brands worldwide.
              </p>
            </div>

            <div className="story-element mb-16">
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-6">
                We've spent years perfecting our craft, building everything from simple websites to complex AI-powered platforms. Each project teaches us something new, and we bring that knowledge to every client we serve.
              </p>
            </div>

            <div className="story-element grid md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 border border-foreground/20 hover:border-foreground/40 transition-all duration-300 bg-background"
                >
                  <div className="font-hero text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="story-element">
              <h3 className="font-hero text-3xl md:text-4xl font-bold uppercase mb-6">
                Our Mission
              </h3>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                To bridge the gap between imagination and reality through innovative digital solutions. We're not just building products—we're crafting experiences that transform businesses and delight users.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={valuesRef}
          className="relative bg-background py-12 md:py-20 overflow-hidden min-h-0 md:min-h-[200vh]"
        >
          <div className="text-center mb-16 md:mb-32 pt-6 md:pt-10">
            <h2 className="font-hero text-4xl md:text-7xl font-bold uppercase text-foreground">
              Our Values
            </h2>
          </div>
          
          <div className="relative w-full overflow-visible md:overflow-hidden h-[70vh] md:h-[150vh]">
            {values.map((value, index) => {
              const angles = [10, -10, 10, -10];
              const topPositions = [15, 35, 55, 75];
              
              // Shortened mobile descriptions
              const mobileDescriptions = [
                "Pushing boundaries with cutting-edge tech to set new standards.",
                "Your success is our mission. Results that exceed expectations.",
                "Excellence in every line of code, pixel, and interaction.",
                "We believe in partnership, working closely to achieve goals.",
              ];
              
              return (
                <div
                  key={index}
                  className="value-tape absolute bg-orange-600 flex items-center justify-center px-4 md:px-8"
                  style={{
                    height: '3cm',
                    width: '120%',
                    left: '-10%',
                    transform: `rotate(${angles[index]}deg)`,
                    top: `${topPositions[index]}%`,
                    transformOrigin: 'center',
                  }}
                >
                  {/* Mobile text - shorter */}
                  <p className="md:hidden font-hero text-[10px] sm:text-xs uppercase tracking-wide text-white text-center leading-tight px-2">
                    {mobileDescriptions[index]}
                  </p>
                  
                  {/* Desktop text - full description */}
                  <p className="hidden md:block font-hero text-base lg:text-xl uppercase tracking-wider text-white text-center leading-tight">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section 
          className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF8C00 0%, #ff6600 50%, #FF8C00 100%)',
          }}
        >
          {/* Mixed dots: orange, black, and metallic on orange background */}
          {[
            { top: '10%', left: '5%', size: 8, type: 'black' },
            { top: '15%', left: '90%', size: 6, type: 'metallic' },
            { top: '25%', left: '15%', size: 10, type: 'orange' },
            { top: '35%', left: '85%', size: 7, type: 'black' },
            { top: '45%', left: '8%', size: 9, type: 'metallic' },
            { top: '55%', left: '92%', size: 5, type: 'orange' },
            { top: '65%', left: '12%', size: 6, type: 'black' },
            { top: '75%', left: '88%', size: 8, type: 'metallic' },
            { top: '85%', left: '20%', size: 7, type: 'orange' },
            { top: '20%', left: '50%', size: 5, type: 'black' },
            { top: '70%', left: '45%', size: 9, type: 'metallic' },
            { top: '90%', left: '60%', size: 6, type: 'orange' },
          ].map((dot, index) => (
            <div
              key={`work-${index}`}
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
          <div className="text-center relative z-10 max-w-5xl">
            <div className="mb-12">
              <h2 className="font-hero text-5xl md:text-7xl lg:text-8xl font-bold uppercase mb-6 leading-tight tracking-tight text-black drop-shadow-lg">
                Let's Work
                <br />
                <span className="text-black">
                  Together
                </span>
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-black/80 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
              Ready to start your next project? We'd love to hear from you and discuss how we can help bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/contact"
                className="group relative inline-block px-12 py-5 bg-black hover:bg-black/90 text-white font-hero uppercase tracking-wider text-base transition-all duration-300 hover:scale-105 overflow-hidden rounded-full"
              >
                <span className="relative z-10">Get In Touch</span>
              </a>
              
              <div className="flex gap-4">
                <a
                  href="mailto:nextmind@gmail.com"
                  className="w-12 h-12 border-2 border-black hover:border-white hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 rounded-full"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/96176764263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-black hover:border-white hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 rounded-full"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        </main>

        <Footer />
      </div>
    </MobileEnhancements>
  );
};

export default About;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bexyFlowers from "@/assets/images/bexyflowers.png";
import travelAgency from "@/assets/images/travel agency.png";
import aiScanner from "@/assets/images/ai scanner.jpg";
import hospitalManagement from "@/assets/images/aya beauty hospital mangment.png";
import bexyVideo from "@/assets/videos/Bexyflowers.webm";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  video?: string;
  duration: string;
  result: string;
  client: string;
}

const projects: Project[] = [
  {
    title: "Bexy Flowers",
    description: "Premium flower shop with an AI bouquet builder — customize your arrangement by choosing flowers, colors, sizes, and packaging, and the AI creates your perfect bouquet.",
    tags: ["DESIGN", "E-COMMERCE", "AI"],
    image: bexyFlowers,
    video: bexyVideo,
    duration: "3 months",
    result: "+180% orders",
    client: "Bexy Flowers",
  },
  {
    title: "AI Travel Agency",
    description: "Smart travel platform with an AI assistant that plans your trip based on destination, budget, and preferences.",
    tags: ["AI", "DEVELOPMENT", "UI/UX"],
    image: travelAgency,
    duration: "5 months",
    result: "3x bookings",
    client: "Travel Agency",
  },
  {
    title: "Scanner — Price Finder App",
    description: "Mobile app for Lebanon: scan any item and instantly find the best prices across local markets.",
    tags: ["MOBILE APP", "AI", "DEVELOPMENT"],
    image: aiScanner,
    duration: "6 months",
    result: "Live in Lebanon",
    client: "Scanner App",
  },
  {
    title: "Hospital Management System",
    description: "Full-scale hospital operations platform — patient records, scheduling, staff management, and reporting.",
    tags: ["DEVELOPMENT", "UI/UX", "SYSTEM"],
    image: hospitalManagement,
    duration: "8 months",
    result: "Full automation",
    client: "Hospital",
  },
];

const WorkShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const isMobile = window.innerWidth < 768;

    // Set initial state for all cards
    cards.forEach((card) => {
      const leftPanel = card.querySelector('.left-panel') as HTMLElement;
      const rightPanel = card.querySelector('.right-panel') as HTMLElement;
      const number = card.querySelector('.project-number') as HTMLElement;
      
      if (leftPanel && rightPanel && number) {
        if (isMobile) {
          // Mobile: cards slide up and rotate slightly
          gsap.set(leftPanel, { y: 100, opacity: 0, rotation: -5 });
          gsap.set(rightPanel, { y: 100, opacity: 0, rotation: 5, scale: 0.9 });
          gsap.set(number, { rotation: 0, scale: 0, opacity: 0 });
        } else {
          gsap.set(leftPanel, { xPercent: -100, opacity: 0 });
          gsap.set(rightPanel, { xPercent: 100, opacity: 0 });
          gsap.set(number, { rotation: 0, scale: 0, opacity: 0 });
        }
      }
    });

    // Create scroll-triggered timeline for each card
    cards.forEach((card, index) => {
      const leftPanel = card.querySelector('.left-panel') as HTMLElement;
      const rightPanel = card.querySelector('.right-panel') as HTMLElement;
      const number = card.querySelector('.project-number') as HTMLElement;
      const tags = card.querySelectorAll('.project-tag');
      const infoBadges = card.querySelectorAll('.project-info-badge');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top center+=100",
          end: "bottom center-=100",
          // Play when entering viewport (down or up), reverse when leaving.
          // This makes animations respond both top→down and down→top.
          toggleActions: "play reverse play reverse",
          markers: false,
        },
      });

      if (isMobile) {
        // Mobile animations: slide up with rotation
        // Animate number pulsing in
        tl.to(number, {
          rotation: 720,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
        }, 0);

        // Slide up left panel with rotation
        tl.to(leftPanel, {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
        }, 0.3);

        // Slide up right panel with scale
        tl.to(rightPanel, {
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }, 0.4);

        // Animate info badges sliding up
        tl.from(infoBadges, {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }, 0.7);

        // Stagger animate tags with bounce
        tl.from(tags, {
          scale: 0,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(1.7)",
        }, 0.9);
      } else {
        // Desktop animations (original)
        tl.to(number, {
          rotation: 360,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 0);

        tl.to(leftPanel, {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }, 0.2);

        tl.to(rightPanel, {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }, 0.3);

        tl.from(tags, {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }, 0.6);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger && cardsRef.current.includes(trigger.vars.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Scroll-triggered video play/pause for Bexy Flowers (index 0)
  useEffect(() => {
    const video = videoRef.current;
    const img = videoImgRef.current;
    const card = cardsRef.current[0];
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
            video.style.opacity = "1";
            if (img) img.style.opacity = "0";
          } else {
            video.pause();
            video.currentTime = 0;
            video.style.opacity = "0";
            if (img) img.style.opacity = "1";
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const dots = [
    { top: '10%', left: '5%', size: 6, delay: 0, type: 'metallic' },
    { top: '20%', left: '90%', size: 8, delay: 0.5, type: 'orange' },
    { top: '80%', left: '10%', size: 5, delay: 1, type: 'metallic' },
    { top: '85%', left: '85%', size: 7, delay: 1.5, type: 'orange' },
    { top: '15%', left: '25%', size: 7, delay: 0.3, type: 'metallic' },
    { top: '30%', left: '75%', size: 9, delay: 0.8, type: 'metallic' },
    { top: '45%', left: '15%', size: 6, delay: 1.2, type: 'orange' },
    { top: '55%', left: '92%', size: 8, delay: 0.6, type: 'metallic' },
    { top: '65%', left: '40%', size: 5, delay: 1.8, type: 'metallic' },
    { top: '75%', left: '60%', size: 10, delay: 0.2, type: 'orange' },
    { top: '5%', left: '50%', size: 4, delay: 0.9, type: 'metallic' },
    { top: '25%', left: '8%', size: 7, delay: 1.3, type: 'metallic' },
    { top: '40%', left: '95%', size: 6, delay: 0.7, type: 'metallic' },
    { top: '60%', left: '70%', size: 8, delay: 1.6, type: 'orange' },
    { top: '90%', left: '50%', size: 9, delay: 0.4, type: 'metallic' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] md:min-h-screen bg-background py-10 md:py-32 overflow-hidden"
    >
      {/* Metallic dots with some orange */}
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
            zIndex: 0,
          }}
        />
      ))}

      {/* Section Title */}
      <div className="container mx-auto px-6 md:px-12 mb-6 md:mb-16 relative z-10">
        <h2 className="font-hero text-2xl md:text-6xl lg:text-7xl font-bold uppercase text-foreground">
          Our Work
        </h2>
        <p className="md:hidden text-sm text-foreground/60 mt-2">Showcasing excellence in every project</p>
        <div className="w-16 md:w-24 h-1 bg-orange-500 mt-2 md:mt-4"></div>
      </div>

      {/* Project Cards */}
      <div className="container mx-auto px-6 md:px-12 space-y-12 md:space-y-32 relative z-10">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="relative min-h-[350px] md:min-h-[600px] flex items-center isolate"
          >
            {/* Rotating Number Background - behind content (shifted lower on mobile) */}
            <div
              className="project-number absolute top-[75%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32vw] md:text-[15vw] font-hero font-bold opacity-5 pointer-events-none"
              style={{ color: '#FF8C00', zIndex: -1 }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Split Panel Container - content above number */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center relative z-0" style={{ isolation: 'isolate' }}>
              {/* Left Panel - Text Content */}
              <div className={`left-panel relative z-10 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="space-y-3 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="font-hero text-4xl md:text-7xl font-bold text-orange-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
                  </div>
                  
                  <h3 className="font-hero text-2xl md:text-4xl lg:text-5xl font-bold uppercase text-foreground leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-base md:text-xl text-foreground/70 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Mobile-only: Project Info Badges */}
                  <div className="md:hidden grid grid-cols-3 gap-2 py-3">
                    <div className="project-info-badge bg-black/40 border border-orange-500/30 rounded-lg p-2 text-center">
                      <div className="text-xs text-foreground/50 uppercase tracking-wide mb-1">Duration</div>
                      <div className="text-sm font-bold text-orange-500">{project.duration}</div>
                    </div>
                    <div className="project-info-badge bg-black/40 border border-orange-500/30 rounded-lg p-2 text-center">
                      <div className="text-xs text-foreground/50 uppercase tracking-wide mb-1">Result</div>
                      <div className="text-sm font-bold text-orange-500">{project.result}</div>
                    </div>
                    <div className="project-info-badge bg-black/40 border border-orange-500/30 rounded-lg p-2 text-center">
                      <div className="text-xs text-foreground/50 uppercase tracking-wide mb-1">Client</div>
                      <div className="text-xs font-bold text-foreground truncate">{project.client}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:gap-3 pt-2 md:pt-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="project-tag px-3 md:px-5 py-1.5 md:py-2.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs md:text-sm uppercase tracking-wider font-medium rounded-full hover:bg-orange-500/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Image */}
              <div className={`right-panel relative z-10 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative group z-10">
                  {/* Orange glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Image / Video container */}
                  <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-orange-500/20 group-hover:border-orange-500/50 transition-all duration-500">
                    {/* Static image */}
                    <img
                      ref={project.video ? videoImgRef : undefined}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto aspect-video object-cover transform group-hover:scale-105 transition-all duration-700"
                      style={{ transition: "opacity 0.6s ease, transform 0.7s ease" }}
                    />
                    {/* Video — auto-plays on scroll into view, pauses when out */}
                    {project.video && (
                      <video
                        ref={videoRef}
                        src={project.video}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        style={{ opacity: 0, transition: "opacity 0.6s ease" }}
                      />
                    )}
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkShowcaseSection;

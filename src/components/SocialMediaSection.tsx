import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import linkedinIcon from "@/assets/linkedin.webp";
import tiktokIcon from "@/assets/tiktok.webp";
import instagramIcon from "@/assets/instagram.webp";

gsap.registerPlugin(ScrollTrigger);

const SocialMediaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const iconsRef = useRef<HTMLAnchorElement[]>([]);
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: linkedinIcon,
      url: "#",
      comingSoon: true,
    },
    {
      name: "TikTok",
      icon: tiktokIcon,
      url: "https://tiktok.com/@next._.mind",
    },
    {
      name: "Instagram",
      icon: instagramIcon,
      url: "https://instagram.com/next._.mind",
    },
  ];

  const dots = [
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
    { top: '20%', left: '50%', size: 7, delay: 0.9, type: 'orange' },
    { top: '65%', left: '45%', size: 6, delay: 1.3, type: 'metallic' },
    { top: '90%', left: '20%', size: 8, delay: 0.7, type: 'orange' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    // Animate heading on scroll
    gsap.from(heading, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    });

    // Stagger animation for social icons
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        gsap.from(icon, {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-[50vh] md:min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-12 md:py-0 bg-background relative overflow-hidden"
    >
      {/* Metallic 3D dots with orange accents */}
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
      <h2 
        ref={headingRef}
        className="font-hero text-3xl md:text-6xl lg:text-7xl font-bold uppercase text-center mb-6 md:mb-16 text-foreground relative z-10"
      >
        Find Us On Our Socials
      </h2>

      {/* Mobile-only: Professional description */}
      <p className="md:hidden text-center text-foreground/70 text-sm mb-10 px-6 max-w-md mx-auto relative z-10">
        Follow us for the latest updates, insights, and behind-the-scenes content
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-20 lg:gap-32 relative z-10">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            ref={(el) => {
              if (el) iconsRef.current[index] = el;
            }}
            href={social.comingSoon ? undefined : social.url}
            target={social.comingSoon ? undefined : "_blank"}
            rel={social.comingSoon ? undefined : "noopener noreferrer"}
            onClick={social.comingSoon ? (e) => e.preventDefault() : undefined}
            className={`hover-zoom-laptop group relative w-full md:w-auto${social.comingSoon ? " cursor-default" : ""}`}
          >
            {/* Mobile: Card layout with icon and name */}
            <div className="md:hidden flex items-center gap-4 bg-black/20 border border-orange-500/20 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-500/50 hover:scale-105">
              <img
                src={social.icon}
                alt={social.name}
                className={`w-16 h-16 object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,140,0,0.4)]${social.comingSoon ? " opacity-50 grayscale" : ""}`}
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">{social.name}</h3>
                {social.comingSoon ? (
                  <p className="text-xs text-white/40 font-medium italic">Coming soon</p>
                ) : (
                  <p className="text-xs text-orange-500 font-medium">@next._.mind</p>
                )}
              </div>
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-orange-500 font-bold">{social.comingSoon ? "…" : "→"}</span>
              </div>
            </div>

            {/* Desktop: Original icon only */}
            <div className="hidden md:block relative">
              <img
                src={social.icon}
                alt={social.name}
                className={`w-64 lg:w-80 h-64 lg:h-80 object-contain transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-12 drop-shadow-[0_0_20px_rgba(255,140,0,0.5)] group-hover:drop-shadow-[0_0_40px_rgba(255,140,0,0.8)]${social.comingSoon ? " opacity-40 grayscale" : ""}`}
              />
              {social.comingSoon && (
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/50 font-hero whitespace-nowrap">Coming Soon</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialMediaSection;

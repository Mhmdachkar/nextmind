import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/assets/NextMindLogo.png";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const topSection = topSectionRef.current;
    const columns = columnsRef.current.filter(Boolean);
    const particleContainer = particleContainerRef.current;
    const isMobile = window.innerWidth < 768;

    if (!footer) return;

    // Animate top section
    if (topSection) {
      gsap.from(topSection, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Stagger animate columns
    if (columns.length > 0) {
      gsap.from(columns, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Create gooey particles – desktop: rich effect; mobile: lighter so it shows on Android/iOS
    if (particleContainer) {
      const particleCount = isMobile ? 55 : 120;
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < particleCount; i++) {
        const span = document.createElement("span");
        const animationType = Math.random();
        if (animationType < 0.4) span.classList.add("particle-up");
        else if (animationType < 0.7) span.classList.add("particle-diagonal");
        else span.classList.add("particle-wave");

        const size = isMobile ? 1.8 + Math.random() * 3.5 : 2.5 + Math.random() * 6;
        const distance = isMobile ? 5 + Math.random() * 10 : 8 + Math.random() * 15;
        const position = Math.random() * 100;
        const horizontalMove = isMobile ? -25 + Math.random() * 50 : -40 + Math.random() * 80;
        const time = isMobile ? 6 + Math.random() * 6 : 5 + Math.random() * 7;
        const delay = -1 * (Math.random() * 25);

        span.style.setProperty("--dim", `${size}rem`);
        span.style.setProperty("--uplift", `${distance}rem`);
        span.style.setProperty("--pos-x", `${position}%`);
        span.style.setProperty("--horizontal", `${horizontalMove}%`);
        span.style.setProperty("--dur", `${time}s`);
        span.style.setProperty("--delay", `${delay}s`);
        fragment.appendChild(span);
      }

      particleContainer.appendChild(fragment);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footer) {
          trigger.kill();
        }
      });
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "Web Development",
    "Mobile Apps",
    "AI Integration",
    "UI/UX Design",
    "Branding",
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/next._.mind", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquid-effect">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" 
              result="liquid" 
            />
          </filter>
        </defs>
      </svg>

      <style>{`
        .particle-up,
        .particle-diagonal,
        .particle-wave {
          position: absolute;
          background: #FF8C00;
          border-radius: 50%;
          top: 50%;
          left: var(--pos-x, 50%);
          width: var(--dim, 5rem);
          height: var(--dim, 5rem);
          transform: translate(-50%, -50%);
          animation-delay: var(--delay, 0s);
          opacity: 0.95;
        }

        .particle-up {
          animation: float-up var(--dur, 8s) ease-in-out infinite;
        }

        .particle-diagonal {
          animation: float-diagonal var(--dur, 8s) ease-in-out infinite;
        }

        .particle-wave {
          animation: float-wave var(--dur, 10s) ease-in-out infinite;
        }

        /* Straight up animation */
        @keyframes float-up {
          0% {
            top: 50%;
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.85;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 0.9;
          }
          100% {
            top: calc(var(--uplift) * -1);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }

        /* Diagonal floating animation */
        @keyframes float-diagonal {
          0% {
            top: 50%;
            left: var(--pos-x);
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.85;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 0.9;
          }
          100% {
            top: calc(var(--uplift) * -1);
            left: calc(var(--pos-x) + var(--horizontal));
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }

        /* Wave-like floating animation */
        @keyframes float-wave {
          0% {
            top: 50%;
            left: var(--pos-x);
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.85;
          }
          20% {
            left: calc(var(--pos-x) + var(--horizontal) * 0.3);
            opacity: 1;
          }
          40% {
            left: calc(var(--pos-x) + var(--horizontal) * 0.7);
          }
          60% {
            left: calc(var(--pos-x) + var(--horizontal) * 0.5);
            opacity: 0.9;
          }
          80% {
            left: calc(var(--pos-x) + var(--horizontal) * 0.2);
          }
          100% {
            top: calc(var(--uplift) * -1);
            left: var(--pos-x);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }
      `}</style>

      <footer ref={footerRef} className="relative w-full mt-24 md:mt-32">
        {/* Top Section - Black (Logo + CTA) */}
        <div
          ref={topSectionRef}
          className="bg-black py-10 md:py-16 px-6 md:px-12 border-t border-white/5"
        >
          <div className="container mx-auto max-w-6xl flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-3 md:gap-4">
              <img src={Logo} alt="Next Mind" className="h-9 md:h-12 w-auto object-contain" />
              <span className="font-hero text-lg md:text-2xl font-bold uppercase tracking-wider text-white">
                ɴᴇxᴛᴍɪɴᴅ
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/70 mb-3 text-sm md:text-base">Ready to build something amazing?</p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-hero uppercase tracking-wider text-xs md:text-sm transition-colors rounded-full group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Orange Background with Gooey Effect */}
        <div className="relative min-h-[240px] md:min-h-[250px] pb-8" style={{ background: '#FF8C00' }}>
          {/* Gooey strip: visible on all devices (mobile + desktop) */}
          <div
            ref={particleContainerRef}
            className="gooey-animations"
            style={{
              position: 'absolute',
              top: 0,
              width: '120%',
              left: '-10%',
              height: 'clamp(6rem, 18vw, 8rem)',
              minHeight: '6rem',
              background: '#FF8C00',
              transform: 'translateY(-99%)',
              zIndex: 0,
              WebkitFilter: 'url(#liquid-effect)',
              filter: 'url(#liquid-effect)',
              overflow: 'visible',
              pointerEvents: 'none',
            }}
          >
            {/* Particles will be dynamically created */}
          </div>

          {/* Footer Content */}
          <div className="container mx-auto max-w-6xl px-6 md:px-12 py-10 md:py-14 relative z-10">
            <div className="flex flex-col gap-10 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-10 mb-10 md:mb-12">
              <div ref={(el) => { if (el) columnsRef.current[0] = el; }} className="text-center md:text-left">
                <h4 className="font-hero text-sm md:text-base font-bold uppercase text-black/90 mb-3 md:mb-4 tracking-wider">
                  About Us
                </h4>
                <p className="text-black/75 leading-relaxed mb-4 text-sm">
                  We craft digital experiences that inspire, engage, and drive results. Your vision, our expertise.
                </p>
                <div className="flex gap-3 justify-center md:justify-start">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-black/10 border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div ref={(el) => { if (el) columnsRef.current[1] = el; }} className="text-center md:text-left">
                <h4 className="font-hero text-sm md:text-base font-bold uppercase text-black/90 mb-3 md:mb-4 tracking-wider">
                  Quick Links
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="hover-zoom-laptop-subtle text-black/80 hover:text-black inline-block transition-all duration-300 group text-sm md:text-base"
                      >
                        <span className="hidden md:inline-block mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div ref={(el) => { if (el) columnsRef.current[2] = el; }} className="text-center md:text-left">
                <h4 className="font-hero text-sm md:text-base font-bold uppercase text-black/90 mb-3 md:mb-4 tracking-wider">
                  Services
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {services.map((service, index) => (
                    <li key={index} className="text-black/80 flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
                      <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div ref={(el) => { if (el) columnsRef.current[3] = el; }} className="text-center md:text-left">
                <h4 className="font-hero text-sm md:text-base font-bold uppercase text-black/90 mb-3 md:mb-4 tracking-wider">
                  Contact
                </h4>
                <ul className="space-y-3 md:space-y-4">
                  <li>
                    <a
                      href="mailto:nexttmind@gmail.com"
                      className="hover-zoom-laptop-subtle flex items-start justify-center md:justify-start gap-3 text-black/80 hover:text-black transition-colors group"
                    >
                      <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-sm break-all">nexttmind@gmail.com</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+96176764263"
                      className="hover-zoom-laptop-subtle flex items-center justify-center md:justify-start gap-3 text-black/80 hover:text-black transition-colors group"
                    >
                      <Phone className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">+961 76 764 263</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+96181939088"
                      className="hover-zoom-laptop-subtle flex items-center justify-center md:justify-start gap-3 text-black/80 hover:text-black transition-colors group"
                    >
                      <Phone className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">+961 81 939 088</span>
                    </a>
                  </li>
                  <li className="flex items-start justify-center md:justify-start gap-3 text-black/80">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Remotely — work from anywhere, anytime</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-black/15 flex flex-col items-center gap-3 md:flex-row md:justify-between">
              <p className="font-hero text-xs uppercase tracking-wider text-black/60 text-center">
                © {currentYear} Next Mind Agency. All rights reserved.
              </p>
              <div className="flex gap-4 text-xs text-black/60">
                <a href="/privacy" className="hover-zoom-laptop-subtle hover:text-black transition-colors inline-block">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="/terms" className="hover-zoom-laptop-subtle hover:text-black transition-colors inline-block">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

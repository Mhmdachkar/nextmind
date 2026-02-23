import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileEnhancements from "@/components/MobileEnhancements";
import { MobileAnimatedSection, MobileAnimatedCard } from "@/components/MobileAnimatedSection";
import MobileTextWithPopImages from "@/components/MobileTextWithPopImages";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "AI Integration",
  "E-Commerce Solutions",
  "Brand Identity",
  "Digital Marketing",
  "Consulting",
];

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. A typical website takes 4-8 weeks, while larger applications may take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes! We provide comprehensive maintenance and support packages to ensure your digital products continue to perform optimally after launch.",
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Contact us for a custom quote based on your specific needs.",
  },
  {
    question: "Can you work with our existing team?",
    answer: "Absolutely! We're experienced in collaborating with in-house teams and can seamlessly integrate into your existing workflows and processes.",
  },
];

const projectImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop",
];

const Contact = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    services: [] as string[],
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", company: "", phone: "", services: [], budget: "", message: "" });
    
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  useEffect(() => {
    const heroText = heroTextRef.current;
    const heroSection = heroSectionRef.current;
    const form = formRef.current;
    const infoCards = infoCardsRef.current;

    if (!heroText || !heroSection) return;

    const isMobile = window.innerWidth < 768;

    // Mobile: GSAP - form elements from left/right, text effects
    if (isMobile) {
      if (form) {
        const formElements = form.querySelectorAll('.form-element');
        formElements.forEach((el, index) => {
          const fromX = index % 2 === 0 ? -60 : 60;
          gsap.from(el, {
            opacity: 0,
            x: fromX,
            y: 30,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
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

    if (form) {
      const formElements = form.querySelectorAll('.form-element');
      formElements.forEach((element, index) => {
        gsap.from(element, {
          opacity: 0,
          x: index % 2 === 0 ? -60 : 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
          delay: index * 0.1,
        });
      });
    }

    // Desktop: animate social cards in "Let's Connect" section
    if (infoCards) {
      const cards = infoCards.querySelectorAll('.social-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.5,
          rotation: 180,
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
                CONTACT US
              </h1>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="slideFromLeft" delay={1}>
              <p className="text-white text-lg leading-relaxed" style={{ wordSpacing: '0.2em' }}>
                Ready to build something amazing? We'd love to hear from you.
              </p>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="slideFromRight" delay={2}>
              <p className="text-orange-500 font-semibold">Get in touch. Let's create together.</p>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="scaleUp" delay={3}>
              <a href="#contact-form" className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-hero uppercase tracking-wider text-sm rounded-full transition-all">
                Send Message
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
              CONTACT US
            </h1>
          </div>
        </section>


        <section
          id="contact-form"
          ref={formRef}
          className="px-6 md:px-12 py-16"
        >
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="font-hero text-4xl md:text-6xl font-bold uppercase mb-4">
                Tell Us About Your{" "}
                <span className="relative inline-block">
                  {"PROJECT".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="relative inline-block transition-colors duration-300"
                      style={{ color: hoveredLetter === index ? "#ff8c42" : "inherit" }}
                      onMouseEnter={() => setHoveredLetter(index)}
                      onMouseLeave={() => setHoveredLetter(null)}
                    >
                      {letter}
                      {hoveredLetter === index && (
                        <div
                          className="absolute z-50 pointer-events-none"
                          style={{
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <img
                            src={projectImages[index]}
                            alt="Project"
                            className="object-cover rounded-lg shadow-2xl animate-in fade-in zoom-in duration-200"
                            style={{
                              width: "300px",
                              height: "190px",
                            }}
                          />
                        </div>
                      )}
                    </span>
                  ))}
                </span>
              </h2>
              <p className="text-lg text-foreground/70 hidden md:block">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <MobileTextWithPopImages
              blocks={[
                { type: "text", content: "Ready to start? " },
                { type: "image", content: "", image: projectImages[0], alt: "Start" },
                { type: "text", content: " Fill out the form and we'll get back within 24 hours." },
              ]}
            />

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-element">
                  <label htmlFor="name" className="block text-sm uppercase tracking-wider text-foreground/70 mb-2 font-hero">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-foreground/20 focus:border-foreground/60 focus:outline-none transition-colors duration-300 text-foreground"
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="email" className="block text-sm uppercase tracking-wider text-foreground/70 mb-2 font-hero">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-foreground/20 focus:border-foreground/60 focus:outline-none transition-colors duration-300 text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-element">
                  <label htmlFor="company" className="block text-sm uppercase tracking-wider text-foreground/70 mb-2 font-hero">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-foreground/20 focus:border-foreground/60 focus:outline-none transition-colors duration-300 text-foreground"
                    placeholder="Your Company"
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="phone" className="block text-sm uppercase tracking-wider text-foreground/70 mb-2 font-hero">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-foreground/20 focus:border-foreground/60 focus:outline-none transition-colors duration-300 text-foreground"
                    placeholder="+961 76 764 263"
                  />
                </div>
              </div>

              <div className="form-element">
                <label className="block text-sm uppercase tracking-wider text-foreground/70 mb-4 font-hero">
                  Services Interested In *
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-3 p-3 border border-foreground/20 hover:border-foreground/40 cursor-pointer transition-colors duration-300 group"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="w-5 h-5 bg-background border-2 border-foreground/30 checked:bg-foreground checked:border-foreground focus:ring-2 focus:ring-foreground/50 focus:ring-offset-0 transition-colors duration-200"
                      />
                      <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        {service}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-element">
                <label htmlFor="budget" className="block text-sm uppercase tracking-wider text-foreground/70 mb-2 font-hero">
                  Project Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-foreground/20 focus:border-foreground/60 focus:outline-none transition-colors duration-300 text-foreground"
                >
                  <option value="">Select a budget range</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>

              <div className="form-element">
                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-foreground/70 mb-2 font-hero">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-foreground/20 focus:border-foreground/60 focus:outline-none transition-colors duration-300 text-foreground resize-none"
                  placeholder="Tell us about your project, goals, and timeline..."
                />
              </div>

              <div className="form-element">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-foreground hover:bg-foreground/80 disabled:bg-foreground/50 text-background font-hero uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {submitStatus === "success" && (
                  <p className="mt-4 text-green-400 font-hero uppercase tracking-wider text-sm">
                    ✓ Message sent successfully! We'll be in touch soon.
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>

        <section
          ref={infoCardsRef}
          className="px-6 md:px-12 py-14 md:py-20 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF8C00 0%, #ff6600 50%, #FF8C00 100%)',
          }}
        >
          {metallicDots.map((dot, index) => (
            <div
              key={`connect-${index}`}
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
                boxShadow: `0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.6)`,
                animationDelay: `${dot.delay}s`,
                animationDuration: '3s',
              }}
            />
          ))}
          <div className="max-w-6xl mx-auto w-full relative z-10">
            <div className="rounded-3xl bg-black/15 md:bg-transparent border border-black/25 md:border-none px-5 py-6 md:px-0 md:py-0 backdrop-blur-sm md:backdrop-blur-0">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="font-hero text-4xl md:text-7xl font-bold uppercase mb-3 md:mb-6 text-black drop-shadow-lg">
                  Let's Connect
                </h2>
                <p className="text-base md:text-xl text-black/80 max-w-2xl mx-auto font-medium">
                  Reach out to us through any of these channels. We're here to help bring your vision to life.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 md:flex md:flex-row md:justify-center md:gap-8 items-stretch">
              <div>
                <a
                  href="mailto:nexttmind@gmail.com"
                  className="social-card group relative p-4 md:p-6 border-0 md:border-4 md:border-black md:hover:border-white transition-all duration-300 bg-white/5 md:bg-white/10 md:hover:bg-white/20 backdrop-blur-sm overflow-hidden flex flex-col items-center"
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <Mail className="w-10 h-10 md:w-12 md:h-12 text-black mb-2 md:mb-3" strokeWidth={1.5} />
                    <h3 className="font-hero text-sm uppercase tracking-wider text-black">
                      Gmail
                    </h3>
                  </div>
                </a>
              </div>
              <div>
                <a
                  href="https://wa.me/96176764263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card group relative p-4 md:p-6 border-0 md:border-4 md:border-black md:hover:border-white transition-all duration-300 bg-white/5 md:bg-white/10 md:hover:bg-white/20 backdrop-blur-sm overflow-hidden flex flex-col items-center"
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-black mb-2 md:mb-3" strokeWidth={1.5} />
                    <h3 className="font-hero text-sm uppercase tracking-wider text-black">
                      WhatsApp
                    </h3>
                  </div>
                </a>
              </div>
              <div>
                <a
                  href="https://instagram.com/next._.mind"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card group relative p-4 md:p-6 border-0 md:border-4 md:border-black md:hover:border-white transition-all duration-300 bg-white/5 md:bg-white/10 md:hover:bg-white/20 backdrop-blur-sm overflow-hidden flex flex-col items-center"
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <Instagram className="w-10 h-10 md:w-12 md:h-12 text-black mb-2 md:mb-3" strokeWidth={1.5} />
                    <h3 className="font-hero text-sm uppercase tracking-wider text-black">
                      Instagram
                    </h3>
                  </div>
                </a>
              </div>
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

export default Contact;

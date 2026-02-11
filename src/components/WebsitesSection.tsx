import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WebsitesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);

  // Image URLs from Unsplash
  const leftImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop";
  const rightImage = "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
      // Desktop: Get words from the desktop container
      const desktopWords = section.querySelectorAll('.hidden.md\\:block .text-hero');
      
      desktopWords.forEach((wordElement, wordIndex) => {
        const text = wordElement.textContent || "";
        wordElement.textContent = "";
        
        // Split text into individual letters
        const letters = text.split("").map((letter) => {
          const span = document.createElement("span");
          span.textContent = letter;
          span.className = "inline-block";
          span.style.opacity = "1";
          wordElement.appendChild(span);
          return span;
        });

        // Desktop: Letter-by-letter disappearing animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: `top+=${wordIndex * 10}% top`,
            end: `+=${100 + wordIndex * 20}%`,
            scrub: 1,
          },
        });

        letters.forEach((letter, letterIndex) => {
          tl.to(
            letter,
            {
              opacity: 0,
              y: 20,
              duration: 0.15,
              ease: "power2.in",
            },
            letterIndex * 0.08
          );
        });
      });
    } else {
      // Mobile: Get words from mobile container
      const mobileWords = wordsRef.current.filter(Boolean) as HTMLParagraphElement[];
      
      mobileWords.forEach((wordElement, wordIndex) => {
        const text = wordElement.textContent || "";
        wordElement.textContent = "";
        
        // Split text into individual letters
        const letters = text.split("").map((letter) => {
          const span = document.createElement("span");
          span.textContent = letter;
          span.className = "inline-block";
          span.style.opacity = "1";
          wordElement.appendChild(span);
          return span;
        });

        // Mobile: Simple scroll trigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wordElement,
            start: "top center",
            end: "+=60%",
            scrub: 1,
          },
        });

        letters.forEach((letter, letterIndex) => {
          tl.to(
            letter,
            {
              opacity: 0,
              y: 20,
              duration: 0.15,
              ease: "power2.in",
            },
            letterIndex * 0.08
          );
        });
      });
    }

    // Animate the boxes after text starts disappearing
    const leftBox = leftBoxRef.current;
    const rightBox = rightBoxRef.current;

    if (leftBox && rightBox) {
      const boxesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top+=30% top",
          end: "bottom-=30% top",
          scrub: 2,
          markers: false,
        },
      });

      // Boxes come from opposite sides and cross each other
      boxesTimeline.fromTo(
        leftBox,
        { x: "-100vw", rotation: 0 },
        { x: "100vw", rotation: 360, ease: "power1.inOut", duration: 4 },
        0
      ).fromTo(
        rightBox,
        { x: "100vw", rotation: 0 },
        { x: "-100vw", rotation: -360, ease: "power1.inOut", duration: 4 },
        0
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const wordsData = ["Websites", "that", "excite", "engage", "delight"];

  const dots = [
    { top: '15%', left: '10%', size: 8, delay: 0, type: 'metallic' },
    { top: '25%', left: '85%', size: 6, delay: 0.5, type: 'metallic' },
    { top: '70%', left: '15%', size: 10, delay: 1, type: 'orange' },
    { top: '80%', left: '80%', size: 5, delay: 1.5, type: 'metallic' },
    { top: '40%', left: '5%', size: 7, delay: 0.3, type: 'orange' },
    { top: '60%', left: '92%', size: 9, delay: 0.8, type: 'metallic' },
    { top: '10%', left: '60%', size: 4, delay: 1.2, type: 'metallic' },
    { top: '85%', left: '40%', size: 6, delay: 0.6, type: 'orange' },
    { top: '35%', left: '95%', size: 8, delay: 1.8, type: 'metallic' },
    { top: '55%', left: '8%', size: 5, delay: 0.2, type: 'metallic' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen md:min-h-[300vh] flex flex-col items-center justify-center pt-0 pb-20 md:py-16 px-4 md:px-12 lg:px-24 relative overflow-hidden -mt-0 md:-mt-[20cm]"
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

      {/* Desktop: Original sticky text + boxes */}
      <div className="hidden md:block">
        <div className="text-center sticky top-1/2 -translate-y-1/2 relative z-10 mb-[50vh]">
          <div className="font-hero text-7xl lg:text-8xl font-bold uppercase leading-[1.1] tracking-tight space-y-4">
            {wordsData.map((word, index) => (
              <p
                key={index}
                ref={(el) => (wordsRef.current[index] = el)}
                className="text-hero"
              >
                {word}
              </p>
            ))}
          </div>
        </div>

        <div className="h-screen w-full flex items-center justify-center relative z-10">
          <div
            ref={leftBoxRef}
            className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-3xl flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url(${leftImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 0 40px rgba(255, 140, 0, 0.6), 0 0 80px rgba(255, 140, 0, 0.4)",
            }}
          >
            <span className="text-white font-bold text-4xl lg:text-5xl uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] relative z-10">
              Create
            </span>
          </div>

          <div
            ref={rightBoxRef}
            className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-3xl flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url(${rightImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 0 40px rgba(255, 140, 0, 0.6), 0 0 80px rgba(255, 140, 0, 0.4)",
            }}
          >
            <span className="text-white font-bold text-4xl lg:text-5xl uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] relative z-10">
              Design
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: Same text animation as desktop - EVEN BIGGER */}
      <div className="md:hidden text-center relative z-10 min-h-screen flex items-center justify-center">
        <div className="font-hero text-[14vw] font-bold uppercase leading-[1.4] tracking-tight space-y-4">
          {wordsData.map((word, index) => (
            <p
              key={index}
              ref={(el) => (wordsRef.current[index] = el)}
              className="text-hero"
            >
              {word}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsitesSection;

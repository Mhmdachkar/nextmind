import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  const stats = [
    { value: 2, label: "Years of Experience", prefix: "+" },
    { value: 50, label: "Project Completed", prefix: "+" },
    { value: 50, label: "Happy Customers", prefix: "+" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const isMobile = window.innerWidth < 768;

    if (!section) return;

    // Animate each stat counter
    statsRef.current.forEach((statElement, index) => {
      if (!statElement) return;

      const stat = stats[index];
      const numberElements = statElement.querySelectorAll(".stat-number");
      const labelElement = statElement.querySelector(".stat-label");
      const progressCircle = statElement.querySelector(".progress-circle") as SVGCircleElement;

      if (!numberElements.length || !labelElement) return;

      // Animate the container
      gsap.from(statElement, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Animate counter from 0 to target value (slower)
      const counter = { value: 0 };
      gsap.to(counter, {
        value: stat.value,
        duration: 4,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        onUpdate: () => {
          const text = `${stat.prefix}${Math.round(counter.value)}`;
          numberElements.forEach((el) => { el.textContent = text; });
          // Mobile: Animate circular progress
          if (isMobile && progressCircle) {
            const progress = counter.value / stat.value;
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (progress * circumference);
            progressCircle.style.strokeDashoffset = offset.toString();
          }
        },
      });

      // Animate label
      gsap.from(labelElement, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: index * 0.2 + 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const dots = [
    { top: '15%', left: '10%', size: 8, delay: 0 },
    { top: '25%', left: '85%', size: 6, delay: 0.5 },
    { top: '70%', left: '15%', size: 10, delay: 1 },
    { top: '80%', left: '80%', size: 5, delay: 1.5 },
    { top: '40%', left: '5%', size: 7, delay: 0.3 },
    { top: '60%', left: '92%', size: 9, delay: 0.8 },
    { top: '10%', left: '60%', size: 4, delay: 1.2 },
    { top: '85%', left: '40%', size: 6, delay: 0.6 },
  ];

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center px-6 md:px-12 py-10 md:py-20 bg-background relative overflow-hidden"
    >
      {/* Metallic 3D dots */}
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-pulse"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: `radial-gradient(circle at 30% 30%, 
              hsl(220, 20%, 90%) 0%, 
              hsl(220, 15%, 70%) 40%, 
              hsl(220, 10%, 50%) 70%, 
              hsl(220, 8%, 30%) 100%)`,
            boxShadow: `
              0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.3),
              inset 0 -${dot.size / 4}px ${dot.size / 3}px rgba(0, 0, 0, 0.2),
              inset 0 ${dot.size / 4}px ${dot.size / 3}px rgba(255, 255, 255, 0.3)
            `,
            animationDelay: `${dot.delay}s`,
            animationDuration: '3s',
          }}
        />
      ))}

      {/* 3 stats side-by-side on mobile and desktop */}
      <div className="grid grid-cols-3 gap-4 md:flex md:flex-row md:items-center md:justify-center md:gap-8 lg:gap-16 relative z-10 w-full max-w-7xl">
        {stats.map((stat, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) statsRef.current[index] = el;
            }}
            className="text-center flex-1 relative"
          >
            {/* Mobile-only: Circular Progress (smaller for side-by-side layout) */}
            <div className="md:hidden relative inline-block mb-3">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255, 140, 0, 0.1)"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  className="progress-circle"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#FF8C00"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45}`}
                  transform="rotate(-90 50 50)"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 140, 0, 0.6))',
                    transition: 'stroke-dashoffset 0.5s ease',
                  }}
                />
              </svg>
              {/* Number inside circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="stat-number font-hero text-2xl font-bold text-foreground"
                  style={{
                    textShadow: '0 0 20px rgba(255, 140, 0, 0.5)',
                  }}
                >
                  {stat.prefix}0
                </div>
              </div>
            </div>

            {/* Desktop: Regular number */}
            <div
              className="hidden md:block stat-number font-hero text-7xl lg:text-8xl font-bold text-foreground mb-2 md:mb-4"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
              }}
            >
              {stat.prefix}0
            </div>

            <div className="stat-label font-serif text-[10px] md:text-xl lg:text-2xl text-foreground/80 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

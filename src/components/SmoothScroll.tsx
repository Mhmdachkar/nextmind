import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Apple-style heavy smooth scroll using Lenis.
 * Low lerp = heavy, luxurious feel. Integrated with GSAP ScrollTrigger.
 */
const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 0.65,
      touchMultiplier: 1.05,
      orientation: "vertical",
      gestureOrientation: "vertical",
      autoRaf: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;

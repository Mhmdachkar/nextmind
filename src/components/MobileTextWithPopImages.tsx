import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextImageBlock {
  type: "text" | "image";
  content: string;
  image?: string;
  alt?: string;
}

interface MobileTextWithPopImagesProps {
  blocks: TextImageBlock[];
  className?: string;
}

/**
 * Mobile-only: Text with inline small images (same size as text) that
 * pop/slide open when you scroll into view.
 */
const MobileTextWithPopImages = ({ blocks, className = "" }: MobileTextWithPopImagesProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const section = sectionRef.current;
    if (!section) return;

    const popImages = section.querySelectorAll(".mobile-pop-image");
    const triggers: ScrollTrigger[] = [];
    popImages.forEach((img) => {
      const st = ScrollTrigger.create({
        trigger: img,
        start: "top 92%",
        onEnter: () => {
          gsap.to(img, {
            clipPath: "inset(0 0 0 0)",
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });
      triggers.push(st);
    });
    gsap.set(popImages, { clipPath: "inset(0 100% 0 0)", opacity: 0 });

    return () => triggers.forEach((t) => t.kill());
  }, [blocks]);

  return (
    <section
      ref={sectionRef}
      className={`md:hidden px-6 pt-4 pb-12 bg-background -mt-64 ${className}`}
    >
      <div className="max-w-lg mx-auto">
        <p className="font-hero text-lg sm:text-xl text-foreground/90 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-3">
          {blocks.map((block, i) =>
            block.type === "text" ? (
              <span key={i}>{block.content}</span>
            ) : (
              <span
                key={i}
                className="mobile-pop-image inline-block align-middle overflow-hidden rounded-md"
                style={{
                  width: "1.4em",
                  height: "1.4em",
                  minWidth: "1.4em",
                  minHeight: "1.4em",
                }}
              >
                <img
                  src={block.image}
                  alt={block.alt || ""}
                  className="w-full h-full object-cover"
                  style={{ minWidth: "100%", minHeight: "100%" }}
                />
              </span>
            )
          )}
        </p>
      </div>
    </section>
  );
};

export default MobileTextWithPopImages;

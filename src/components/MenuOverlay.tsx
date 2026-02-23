import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      // Small delay to trigger animation
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "";
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender && !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10001] bg-black"
      style={{
        clipPath: isAnimating 
          ? "polygon(-20% 0, 100% 0, 100% 100%, 0% 100%)" 
          : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        transition: "clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    >
      <div className="h-full flex flex-col px-6 md:px-12 py-6">
        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="text-sm font-medium tracking-wider uppercase">Close</span>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 flex items-center justify-center">
          <ul className="space-y-6 md:space-y-8">
            {menuItems.map((item, index) => (
              <li
                key={item.label}
                className="overflow-hidden"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.6s cubic-bezier(0.77, 0, 0.175, 1) ${index * 0.1 + 0.3}s`,
                }}
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block font-hero text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer info */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm"
          style={{
            opacity: isAnimating ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          <a href="mailto:nexttmind@gmail.com" className="hover:text-primary transition-colors">nexttmind@gmail.com</a>
          <div className="flex gap-6">
            <a href="https://instagram.com/next._.mind" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            <a href="https://tiktok.com/@next._.mind" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TikTok</a>
            <span className="opacity-40 cursor-default" title="Coming soon">LinkedIn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;

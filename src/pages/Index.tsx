import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WebsitesSection from "@/components/WebsitesSection";
import CollisionSection from "@/components/CollisionSection";
import ServicesScrollSection from "@/components/ServicesScrollSection";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import BrightInDarkSection from "@/components/BrightInDarkSection";
import StatsSection from "@/components/StatsSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import Footer from "@/components/Footer";
import MobileEnhancements from "@/components/MobileEnhancements";

const Index = () => {
  const [heroReady, setHeroReady] = useState(false);

  // Ensure we always start this page from the top so the hero
  // entrance + LET'S BUILD placement are correct, even after SPA navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <MobileEnhancements>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="relative">
          <HeroSection onEntranceComplete={() => setHeroReady(true)} />
          {heroReady && (
            <>
              <WebsitesSection />
              <ServicesScrollSection />
              <WorkShowcaseSection />
              <BrightInDarkSection />
              <SocialMediaSection />
              <StatsSection />
            </>
          )}
        </main>
        <Footer />
      </div>
    </MobileEnhancements>
  );
};

export default Index;

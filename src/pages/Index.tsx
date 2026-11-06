import SiteLoader from "@/components/layout/site-loader.tsx";
import GamingCursor from "@/components/layout/gaming-cursor.tsx";
import Navbar from "@/components/layout/navbar.tsx";
import Footer from "@/components/layout/footer.tsx";
import HeroSection from "./_sections/hero-section.tsx";
import AboutSection from "./_sections/about-section.tsx";
import ContentSection from "./_sections/content-section.tsx";
import VideosSection from "./_sections/videos-section.tsx";
import StatsSection from "./_sections/stats-section.tsx";
import SocialSection from "./_sections/social-section.tsx";
import ContactSection from "./_sections/contact-section.tsx";

export default function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <SiteLoader />
      <GamingCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ContentSection />
        <VideosSection />
        <StatsSection />
        <SocialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

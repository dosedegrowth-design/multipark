import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroHome } from "@/components/site/HeroHome";
import { HowItWorks } from "@/components/site/HowItWorks";
import { MapSection } from "@/components/site/MapSection";
import { TagBanner } from "@/components/site/TagBanner";
import { B2BSection } from "@/components/site/B2BSection";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { FloatingChat } from "@/components/site/FloatingChat";

export default function HomePage() {
  return (
    <>
      <Header variant="light" />
      <main className="flex-1">
        <HeroHome />
        <HowItWorks />
        <MapSection />
        <TagBanner />
        <B2BSection />
        <ReviewsSection />
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}

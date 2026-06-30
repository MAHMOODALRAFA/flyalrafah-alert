import Hero from "@/components/Hero";
import LiveDealsBar from "@/components/LiveDealsBar";
import Deals from "@/components/Deals";
import Features from "@/components/Features";
import ShareSection from "@/components/ShareSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060914]">
      <Hero />
      <LiveDealsBar />
      <Deals />
      <Features />
      <ShareSection />
      <Footer />
    </main>
  );
}
import useUserActive from "../../hooks/useUserActive";
import Banner from "./Components/Banner";
import CtaSection from "./Components/CtaSection";
import Features from "./Components/Features";
import LivePreview from "./Components/LivePreview";
import TechShowcase from "./Components/TechShowcase";

const Home = () => {
  useUserActive();

  return (
    <div className="min-h-screen flex flex-col bg-softWhite text-charcoalGray">
      <Banner />
      <Features />
      <LivePreview />
      <TechShowcase />
      <CtaSection />
    </div>
  );
};

export default Home;

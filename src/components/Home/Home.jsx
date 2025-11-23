import useUserActive from "../../hooks/useUserActive";
import ActivityFeed from "./Components/ActivityFeed";
import Banner from "./Components/Banner";
import CtaSection from "./Components/CtaSection";
import Features from "./Components/Features";
import LivePreview from "./Components/LivePreview";
import Notes from "./Components/Notes";
import RealTime from "./Components/RealTime";
import TechShowcase from "./Components/TechShowcase";
import Workflow from "./Components/Workflow";

const Home = () => {
  useUserActive();

  return (
    <div className="min-h-screen flex flex-col bg-softWhite text-charcoalGray">
      <Banner />
      <Features />
      <LivePreview />
      <TechShowcase />
      <RealTime />
      <Workflow />
      <ActivityFeed />
      <Notes />
      <CtaSection />
    </div>
  );
};

export default Home;

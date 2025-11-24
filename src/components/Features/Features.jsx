import CtaSection from "../Home/Components/CtaSection";
import FeaturesPreview from "../Home/Components/Features";
import LivePreview from "../Home/Components/LivePreview";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col bg-softWhite text-charcoalGray">
      <FeaturesPreview />
      <LivePreview />
      <CtaSection />
    </div>
  );
};

export default Features;

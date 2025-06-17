import FAQSection from "../../components/pageComponents/home/FAQSection";
import HeroSection from "../../components/pageComponents/home/HeroSection";
import Footer from "../../components/misc/Footer";
import FeaturesSection from "../../components/pageComponents/home/FeaturesSection";

const Home = () => {
  return (
    <main className="flex h-[calc(100vh-56px)] flex-col items-center justify-between">
      <HeroSection />
      {/* <FeaturesSection /> */}
      {/* <PricingSection /> */}
      {/* <div className="flex flex-col h-screen w-full">
        <FAQSection />
        <Footer />
      </div> */}
    </main>
  );
};

export default Home;

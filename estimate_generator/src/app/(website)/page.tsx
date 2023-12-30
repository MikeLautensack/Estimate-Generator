import PricingSection from '../../components/pageComponents/home/PricingSection'
import FAQSection from '../../components/pageComponents/home/FAQSection'
import HeroSection from '../../components/pageComponents/home/HeroSection'
import Footer from '../../components/misc/Footer'
import FeaturesSection from '../../components/pageComponents/home/FeaturesSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-primary200 font-sans">
      <HeroSection />
      <FeaturesSection />
      {/* <PricingSection /> */}
      <FAQSection />
      <Footer />
    </main>
  )
}
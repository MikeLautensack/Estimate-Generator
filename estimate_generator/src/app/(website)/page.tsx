import PricingSection from '../components/pageSections/homePage/PricingSection'
import FAQSection from '../components/pageSections/homePage/FAQSection'
import HeroSection from '../components/pageSections/homePage/HeroSection'
import Footer from '../components/Footer'
import FeaturesSection from '../components/pageSections/homePage/FeaturesSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-primary200 font-sans">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
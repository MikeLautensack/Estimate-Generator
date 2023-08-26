import PricingSection from './components/pageSections/homePage/PricingSection'
import FAQSection from './components/pageSections/homePage/FAQSection'
import HeroSection from './components/pageSections/homePage/HeroSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-primary100 font-sans">
      <HeroSection />
      <PricingSection />
      <FAQSection />
    </main>
  )
}
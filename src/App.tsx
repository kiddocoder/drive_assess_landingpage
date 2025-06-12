import Header from "./components/Header"
import Hero from "./components/Hero"
import WhyChooseUs from "./components/WhyChooseUs"
import FreeTrialSection from "./components/FreeTrialSection"
import PricingPlans from "./components/PricingPlans"
import HowItWorks from "./components/HowItWorks"
import TestimonialsSection from "./components/TestimonialsSection"
import MultilingualSection from "./components/MultilingualSection"
import PaymentMethods from "./components/PaymentMethods"
import LegalSection from "./components/LegalSection"
import Footer from "./components/Footer"
import "./App.css"
import "./index.css"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <WhyChooseUs />
      <FreeTrialSection />
      <PricingPlans />
      <HowItWorks />
      <TestimonialsSection />
      <MultilingualSection />
      <PaymentMethods />
      <LegalSection />
      <Footer />
    </div>
  )
}

export default App

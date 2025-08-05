
import type React from "react";

import Hero from "@/components/Hero"
import WhyChooseUs from "@/components/WhyChooseUs"
import FreeTrialSection from "@/components/FreeTrialSection"
import PricingPlans from "@/components/PricingPlans"
import HowItWorks from "@/components/HowItWorks"
import TestimonialsSection from "@/components/TestimonialsSection"
import MultilingualSection from "@/components/MultilingualSection"
import PaymentMethods from "@/components/PaymentMethods"
import LegalSection from "@/components/LegalSection"

export default function Home(): React.ReactElement {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FreeTrialSection />
      <PricingPlans />
      <HowItWorks />
      <TestimonialsSection />
      <MultilingualSection />
      <PaymentMethods />
      <LegalSection />
    </>
  );
}



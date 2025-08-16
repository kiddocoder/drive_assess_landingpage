import type { Metadata } from 'next';
import Hero from "@/components/Hero"
import WhyChooseUs from "@/components/WhyChooseUs"
import FreeTrialSection from "@/components/FreeTrialSection"
import PricingPlans from "@/components/PricingPlans"
import HowItWorks from "@/components/HowItWorks"
import TestimonialsSection from "@/components/TestimonialsSection"
import MultilingualSection from "@/components/MultilingualSection"
import PaymentMethods from "@/components/PaymentMethods"
import LegalSection from "@/components/LegalSection"

export const metadata: Metadata = {
  title: "Driving Assessment for Canada - Practice Your Driving Test",
  description: "Practice for your Canadian driving test with real exam questions. 24+ languages supported. 98% pass rate. Start your free trial today!",
  keywords: ["Canadian driving test", "G1 test", "driving practice", "Canada driving exam", "multilingual driving test"],
  authors: [{ name: "Driving Assessment for Canada" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Driving Assessment for Canada - Practice Your Driving Test",
    description: "Practice like it's your real driving test — 100% Canadian style! Free sample questions. Fast results. Real success.",
    url: process.env.NEXT_PUBLIC_SITE_URL!,
    siteName: "Driving Assessment for Canada",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Driving Assessment for Canada Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Driving Assessment for Canada - Practice Your Driving Test",
    description: "Practice like it's your real driving test — 100% Canadian style! Free sample questions. Fast results. Real success.",
    images: ["/logo.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/logo.png",
  },
  other: {
    "google-font-onest": "https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800;900&display=swap",
    "google-font-nunito": "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
  },
};

export default function Home() {
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
"use client"

import type React from "react"
import { Check, Star, BookOpen, Clock, CreditCard, Loader2 } from "lucide-react"
import { generateAccessToken } from "@/api/jwt"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/compat/router"


const PricingPlans: React.FC = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  const { user, isAuthenticated } = useAuth();

  const plans = [
    {
      id: 1,
      name: "3-Day Access",
      plan: "3-day",
      price: "13",
      duration: "3 days",
      popular: false,
      features: [
        "Full access to all practice questions",
        "Detailed explanations for each answer",
        "Progress tracking",
        "Mobile-friendly interface",
        "24/7 customer support",
        "Multiple language options",
      ],
      color: "border-blue-200 bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: 2,
      name: "4-Day Access",
      plan: "4-day",
      price: "14",
      duration: "4 days",
      popular: true,
      features: [
        "Everything in 3-day plan",
        "Extended study time",
        "Additional practice sessions",
        "Priority customer support",
        "Bonus study materials",
        "Performance analytics",
      ],
      color: "border-red-200 bg-red-50",
      buttonColor: "bg-red-600 hover:bg-red-700",
    },
    {
      id: 3,
      name: "Premium Guide",
      plan: "premium",
      price: "45",
      duration: "Lifetime",
      popular: false,
      features: [
        "Complete digital study guide",
        "Downloadable PDF format",
        "Comprehensive road rules",
        "Traffic signs reference",
        "Test-taking strategies",
        "Lifetime access",
      ],
      color: "border-green-200 bg-green-50",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
  ]

  const router = useRouter();

  const handleGoToCheckout = async (plan: typeof plans[0]) => {

    if (!user || !isAuthenticated) {
      router?.push("/login");
      return;
    }

    setIsRedirecting(true);
    setSelectedPlan(plan);
    await generateAccessToken(plan).then(data => {
      router?.push(`/checkout?jwt=${data.token}&plan=${plan.plan}`);
    }).finally(() => {
      setIsRedirecting(false)
      setSelectedPlan(null)
    })

  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-onest">Choose Your Success Plan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            Flexible pricing options designed to fit your study schedule and budget. All plans include our guarantee:
            pass your test or get your money back.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative ${plan.color} border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-onest">{plan.name}</h3>
                <div className="mb-4">
                  $<span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">USD</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{plan.duration} access</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-nunito">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleGoToCheckout(plan)}
                className={`w-full cursor-pointer ${plan.buttonColor} text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2`}
                disabled={isRedirecting}
              >
                {isRedirecting && selectedPlan?.id == plan.id ? <Loader2 className="w-5 h-5 animate-spin" /> : plan.name === "Premium Guide" ? <BookOpen className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                <span>{isRedirecting && selectedPlan?.id == plan.id ? "Redirecting to checkout..." : plan.name === "Premium Guide" ? "Buy Guide Now" : "Get Started"}</span>
              </button>

              {plan.popular && (
                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                    🔥 Save $1 vs daily rate
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-onest">100% Money-Back Guarantee</h3>
            <p className="text-lg text-gray-700 font-nunito">
              We're so confident in our platform that if you don't pass your driving test after using our materials,
              we'll refund your money. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingPlans

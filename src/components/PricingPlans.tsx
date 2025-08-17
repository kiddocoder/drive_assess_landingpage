"use client"

import type React from "react"
import { Check, Star, BookOpen, Clock, CreditCard, Loader2 } from "lucide-react"
import { generateAccessToken } from "@/api/jwt"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { redirect } from "next/navigation"
import { useTranslations } from "next-intl"

const PricingPlans: React.FC = () => {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)
  const { user, isAuthenticated } = useAuth()
  const t = useTranslations("Pricing")

  const plans = [
    {
      id: 1,
      plan: "3-day",
      price: "13",
      popular: false,
      color: "border-blue-200 bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: 2,
      plan: "4-day",
      price: "14",
      popular: true,
      color: "border-red-200 bg-red-50",
      buttonColor: "bg-red-600 hover:bg-red-700",
    },
    {
      id: 3,
      plan: "premium",
      price: "45",
      popular: false,
      color: "border-green-200 bg-green-50",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
  ]

  const handleGoToCheckout = async (plan: typeof plans[0]) => {
    if (!user || !isAuthenticated) {
      redirect("/login")
      return
    }

    setIsRedirecting(true)
    setSelectedPlan(plan)
    try {
      const data = await generateAccessToken(plan)
      redirect(`/checkout?jwt=${data.token}&plan=${plan.plan}`)
    } finally {
      setIsRedirecting(false)
      setSelectedPlan(null)
    }
  }

  const getPlanDetails = (planType: string) => {
    switch (planType) {
      case "3-day":
        return {
          name: t("plans.threeDay.name"),
          duration: t("plans.threeDay.duration"),
          features: t.raw("plans.threeDay.features")
        }
      case "4-day":
        return {
          name: t("plans.fourDay.name"),
          duration: t("plans.fourDay.duration"),
          features: t.raw("plans.fourDay.features")
        }
      case "premium":
        return {
          name: t("plans.premium.name"),
          duration: t("plans.premium.duration"),
          features: t.raw("plans.premium.features")
        }
      default:
        return {
          name: "",
          duration: "",
          features: []
        }
    }
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-onest">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const planDetails = getPlanDetails(plan.plan)
            return (
              <div
                key={index}
                className={`relative ${plan.color} border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span className="whitespace-nowrap">{t("mostPopular")}</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-onest">
                    {planDetails.name}
                  </h3>
                  <div className="mb-4">
                    $<span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">USD</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{planDetails.duration}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {planDetails.features.map((feature: string, featureIndex: number) => (
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
                  {isRedirecting && selectedPlan?.id === plan.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : plan.plan === "premium" ? (
                    <BookOpen className="w-5 h-5" />
                  ) : (
                    <CreditCard className="w-5 h-5" />
                  )}
                  <span>
                    {isRedirecting && selectedPlan?.id === plan.id
                      ? t("buttons.redirecting")
                      : plan.plan === "premium"
                        ? t("buttons.buyGuide")
                        : t("buttons.getStarted")}
                  </span>
                </button>

                {plan.popular && (
                  <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                      {t("saveText")}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-onest">
              {t("guarantee.title")}
            </h3>
            <p className="text-lg text-gray-700 font-nunito">
              {t("guarantee.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingPlans;
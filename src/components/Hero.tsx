"use client"

import type React from "react"
import { Play, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import DriveMap from "@/assets/car_map.jpg"
import { useTranslations } from "next-intl"

const Hero: React.FC = () => {
  const t = useTranslations("Hero")

  return (
    <section
      id="home"
      className="relative bg-transparent text-white overflow-hidden"
    >
      {/* Background Image with Next.js Image component */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={DriveMap}
          alt="Road map background"
          fill
          className="object-cover"
          quality={80}
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-onest">
              {t.rich("title", {
                Proof: (chunks: any) => <span className="text-yellow-400">{chunks}</span>
              })}
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 font-nunito">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 flex-wrap">
              <Link href="/quiz"
                className="whitespace-nowrap bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>{t("buttons.startTrial")}</span>
              </Link>

              <Link href="/premium-guide" className="whitespace-nowrap bg-white hover:bg-gray-100 text-blue-800 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>{t("buttons.premiumGuide")}</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{t("trustIndicators.drivers")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{t("trustIndicators.languages")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{t("trustIndicators.questions")}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden border-4 border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                alt="Person driving a car in Canadian setting"
                width={600}
                height={500}
                className="w-full h-auto max-h-[500px] object-cover"
                priority
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white text-gray-800 p-4 rounded-xl shadow-lg animate-bounce z-20">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm font-medium">{t("stats.passRate")}</div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-red-600 text-white p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold">🇨🇦</div>
                <div className="text-sm font-medium">{t("stats.canadaOnly")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L50 105C100 90 200 60 300 45C400 30 500 30 600 37.5C700 45 800 60 900 67.5C1000 75 1100 75 1150 75L1200 75V120H1150C1100 120 1000 120 900 120C800 120 700 120 600 120C500 120 400 120 300 120C200 120 100 120 50 120H0Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { MapPin, Target } from "lucide-react"
import facebookLogo from "../assets/facebook_logo.png"
import youtubeLogo from "../assets/youtube_logo.png"
import Image from "next/image"

const LegalSection: React.FC = () => {
  const t = useTranslations("LegalSection")

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Canada Targeting */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 font-onest">{t("canadaOnlyTitle")}</h2>
                <p className="text-red-600 font-semibold">{t("proudlyCanadian")}</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-8 font-nunito">{t("canadaDescription")}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">{t("features.geoTargeted")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">{t("features.canadianContent")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">{t("features.supportTimeZones")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">{t("features.pricingCAD")}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Advertising Platforms */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-onest">{t("advertisingPartnersTitle")}</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <Image width={24} height={24} src={facebookLogo} className="w-full h-full object-cover text-white" alt="Facebook Logo" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t("facebookAds.title")}</h4>
                  <p className="text-gray-600 text-sm">{t("facebookAds.description")}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <Image width={24} height={24} src={youtubeLogo} className="w-full h-full object-cover text-white" alt="YouTube Logo" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t("youtubeAds.title")}</h4>
                  <p className="text-gray-600 text-sm">{t("youtubeAds.description")}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-2">{t("advertiseCTA.title")}</h4>
              <p className="text-gray-700 text-sm mb-4">{t("advertiseCTA.description")}</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                {t("advertiseCTA.button")}
              </button>
            </div>
          </div>
        </div>

        {/* Legal Compliance */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8 font-onest">{t("legalComplianceTitle")}</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">🇨🇦</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t("compliance.pipeda.title")}</h4>
              <p className="text-gray-600 text-sm">{t("compliance.pipeda.description")}</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">🔒</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t("compliance.dataProtection.title")}</h4>
              <p className="text-gray-600 text-sm">{t("compliance.dataProtection.description")}</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">⚖️</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t("compliance.canadianLaw.title")}</h4>
              <p className="text-gray-600 text-sm">{t("compliance.canadianLaw.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LegalSection

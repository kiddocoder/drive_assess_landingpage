"use client";

import React from "react";
import { Globe, Users, CheckCircle } from "lucide-react";
import languages from "@/data/allowed_languages.json";
import { useTranslations } from "next-intl";

const MultilingualSection: React.FC = () => {
  const t = useTranslations("MultilingualSection");

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-onest">
            {t("title")}
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-nunito">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white rounded-full px-6 py-3 shadow-sm flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">{t("features.languagesCount")}</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-sm flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-800">{t("features.professionalTranslation")}</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-sm flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800">{t("features.culturalContext")}</span>
            </div>
          </div>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {languages.map((language, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-center transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200"
            >
              <div className="text-3xl mb-2">{language.flag}</div>
              <div className="font-semibold text-gray-800 text-sm font-nunito">{language.name}</div>
              <div className="text-xs text-gray-500 mt-1">{language.code}</div>
            </div>
          ))}
        </div>

        {/* Language Selector Demo */}
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-onest">{t("languageSelector.header")}</h3>
            <p className="text-gray-600 font-nunito">{t("languageSelector.description")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {t("languageSelector.sampleEnglish.label")}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  {t("languageSelector.sampleEnglish.changeButton")}
                </button>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t("languageSelector.sampleEnglish.sampleQuestionTitle")}</h4>
              <p className="text-gray-700 text-sm">{t("languageSelector.sampleEnglish.sampleQuestion")}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {t("languageSelector.sampleFrench.label")}
                </span>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  {t("languageSelector.sampleFrench.changeButton")}
                </button>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t("languageSelector.sampleFrench.sampleQuestionTitle")}</h4>
              <p className="text-gray-700 text-sm">{t("languageSelector.sampleFrench.sampleQuestion")}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              {t("languageSelector.tryButton")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultilingualSection;

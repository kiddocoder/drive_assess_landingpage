"use client";

import { useTranslations } from "next-intl";
import { Play, CheckCircle, ArrowRight } from "lucide-react";
import DriveSchool from "../assets/driving-school.jpg";
import Link from "next/link";
import Image from "next/image";

const FreeTrialSection: React.FC = () => {
  const t = useTranslations("FreeTrialSection");

  return (
    <section id="free-trial" className="py-20 bg-gradient-to-r from-green-500 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-onest">{t("title")}</h2>
            <p className="text-xl mb-8 text-green-100 font-nunito">{t("subtitle")}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg">{t("features.realQuestions")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg">{t("features.instantFeedback")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg">{t("features.noRegistration")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg">{t("features.multiLanguages")}</span>
              </div>
            </div>

            <Link
              href="/quiz"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center space-x-3"
            >
              <Play className="w-6 h-6" />
              <span>{t("button")}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div>
            <Image src={DriveSchool} width={600} height={400} alt={t("title")} className="w-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;

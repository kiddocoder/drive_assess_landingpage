"use client";

import { useTranslations } from "next-intl";
import { CreditCard, BookOpen, FileCheck, Trophy } from "lucide-react";
import { useRouter } from "next/compat/router";

const HowItWorks: React.FC = () => {
  const t = useTranslations("HowItWorks");
  const router = useRouter();

  const steps = [
    {
      step: 1,
      icon: <CreditCard className="w-12 h-12 text-white" />,
      title: t("steps.choosePlan.title"),
      description: t("steps.choosePlan.description"),
      color: "bg-blue-600",
    },
    {
      step: 2,
      icon: <BookOpen className="w-12 h-12 text-white" />,
      title: t("steps.answerQuestions.title"),
      description: t("steps.answerQuestions.description"),
      color: "bg-green-600",
    },
    {
      step: 3,
      icon: <FileCheck className="w-12 h-12 text-white" />,
      title: t("steps.readGuide.title"),
      description: t("steps.readGuide.description"),
      color: "bg-purple-600",
    },
    {
      step: 4,
      icon: <Trophy className="w-12 h-12 text-white" />,
      title: t("steps.passTest.title"),
      description: t("steps.passTest.description"),
      color: "bg-red-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-onest">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-full w-full h-1 bg-gray-300 z-0 transform translate-x-4">
                      <div className="h-full bg-gradient-to-r from-gray-400 to-gray-300 rounded-full"></div>
                    </div>
                  )}

                  <div className="relative z-10 text-center">
                    <div
                      className={`${step.color} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      {step.icon}
                    </div>

                    <div className="absolute -top-2 -right-2 bg-white border-4 border-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-800">
                      {step.step}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 font-onest">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed font-nunito">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div
                    className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative`}
                  >
                    <div className="absolute -top-2 -right-2 bg-white border-2 border-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-gray-800">
                      {step.step}
                    </div>
                    <div className="scale-75">{step.icon}</div>
                  </div>

                  {/* Connecting Line for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="w-1 h-16 bg-gray-300 mx-auto mt-4"></div>
                  )}
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-onest">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-nunito">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-onest">
              {t("cta.readyTitle")}
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-nunito">
              {t("cta.readySubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router?.push("/quiz")}
                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                {t("cta.startTrial")}
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
                {t("cta.choosePlan")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

"use client";

import React from "react";
import { CreditCard, Shield, X } from "lucide-react";
import { useTranslations } from "next-intl";

const PaymentMethods: React.FC = () => {
  const t = useTranslations("PaymentMethods");

  const paymentMethods = [
    {
      key: "visa",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png",
      accepted: true,
    },
    {
      key: "mastercard",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/800px-Mastercard-logo.svg.png",
      accepted: true,
    },
    {
      key: "paypal",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/800px-PayPal.svg.png",
      accepted: true,
    },
    {
      key: "amex",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/800px-American_Express_logo.svg.png",
      accepted: true,
    },
    {
      key: "debit",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Interac_Logo_2019.svg/800px-Interac_Logo_2019.svg.png",
      accepted: true,
    },
    {
      key: "etransfer",
      icon: "https://www.interac.ca/content/dam/interac/ca/en/images/logo/interac-etransfer-logo.png",
      accepted: false,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-onest">{t("title")}</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">{t("subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {paymentMethods.map(({ key, icon, accepted }, index) => (
              <div
                key={index}
                className={`relative border-2 rounded-xl p-6 text-center transition-all duration-300 ${accepted
                  ? "border-green-200 bg-green-50 hover:shadow-lg transform hover:-translate-y-1"
                  : "border-red-200 bg-red-50 opacity-80"
                  }`}
              >
                {!accepted && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md">
                    <X className="w-4 h-4" />
                  </div>
                )}

                <div className="flex justify-center mb-4 h-14">
                  <img
                    src={icon}
                    alt={t(`methods.${key}`)}
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/179/179457.png";
                    }}
                  />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 font-onest">{t(`methods.${key}`)}</h3>

                <div className={`text-sm font-medium ${accepted ? "text-green-600" : "text-red-600"}`}>
                  {accepted ? t("accepted") : t("notAccepted")}
                </div>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8 font-onest">{t("securityHeader")}</h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("securityFeatures.ssl.title")}</h4>
                <p className="text-gray-600 text-sm">{t("securityFeatures.ssl.description")}</p>
              </div>

              <div className="text-center">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("securityFeatures.pci.title")}</h4>
                <p className="text-gray-600 text-sm">{t("securityFeatures.pci.description")}</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-white font-bold text-xl">🛡️</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("securityFeatures.fraud.title")}</h4>
                <p className="text-gray-600 text-sm">{t("securityFeatures.fraud.description")}</p>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="rounded-full p-1 mt-1 w-14 h-14 flex items-center justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                  alt="Important"
                  className="w-4 h-4"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 font-onest">{t("importantInfoTitle")}</h4>
                <p
                  className="text-gray-700 font-nunito"
                >{t("importantInfo")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;

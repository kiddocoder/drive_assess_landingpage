import type React from "react"
import { Users, FileCheck, Globe, Smartphone } from "lucide-react"

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-red-600" />,
      title: "Trusted by New Canadian Residents",
      description: "Over 50,000 immigrants and new drivers have successfully passed their tests using our platform.",
      color: "bg-red-50 border-red-200",
    },
    {
      icon: <FileCheck className="w-12 h-12 text-blue-600" />,
      title: "Real Exam Questions",
      description: "Our questions are modeled exactly on the official Canadian driving test format and content.",
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: <Globe className="w-12 h-12 text-green-600" />,
      title: "24+ Languages Available",
      description: "Study in your native language with support for Arabic, Chinese, French, Spanish, Urdu, and more.",
      color: "bg-green-50 border-green-200",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-purple-600" />,
      title: "Simple Login Options",
      description: "Access with your phone number, email, or try sample questions without creating an account.",
      color: "bg-purple-50 border-purple-200",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-onest">Why Choose Our Platform?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            Join thousands of successful drivers who chose the most trusted and comprehensive driving test preparation
            platform in Canada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.color} border-2 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-onest">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed font-nunito">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">Successful Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Pass Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">24+</div>
              <div className="text-gray-600 font-medium">Languages</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Practice Questions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

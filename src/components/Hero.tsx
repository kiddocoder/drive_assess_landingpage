import type React from "react"
import { Play, BookOpen, CreditCard } from "lucide-react"

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-onest">
              Practice like it's your <span className="text-yellow-400">real driving test</span> — 100% Canadian style!
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 font-nunito">
              Free sample questions. Fast results. Real success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Start Free Trial</span>
              </button>

              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Buy Full Access</span>
              </button>

              <button className="bg-white hover:bg-gray-100 text-blue-800 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Premium Guide</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Trusted by 50,000+ new drivers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>24+ languages supported</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Real exam questions</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="../../assets/canada_driving_scene.jpeg"
                alt="Canadian driving scene"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white text-gray-800 p-4 rounded-xl shadow-lg animate-bounce">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm font-medium">Pass Rate</div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-red-600 text-white p-4 rounded-xl shadow-lg">
              <div className="text-lg font-bold">🇨🇦</div>
              <div className="text-sm font-medium">Canada Only</div>
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

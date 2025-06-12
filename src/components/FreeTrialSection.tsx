import type React from "react"
import { Play, CheckCircle, ArrowRight } from "lucide-react"

const FreeTrialSection: React.FC = () => {
  return (
    <section id="free-trial" className="py-20 bg-gradient-to-r from-green-500 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-onest">Try 3-4 Sample Questions Free!</h2>
            <p className="text-xl mb-8 text-green-100 font-nunito">
              Experience our platform with real practice questions. No signup required, no credit card needed. Just
              pure, authentic Canadian driving test preparation.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg">Real exam-style questions</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg">Instant feedback and explanations</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg">No registration required</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg">Available in multiple languages</span>
              </div>
            </div>

            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center space-x-3">
              <Play className="w-6 h-6" />
              <span>Start Free Trial Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Content - Mock Question Interface */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Question 1 of 4
                </span>
                <span className="text-gray-500 text-sm">Free Trial</span>
              </div>

              <h3 className="text-xl font-bold mb-4 font-onest">
                What should you do when approaching a yellow traffic light?
              </h3>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="question1" className="text-green-600" />
                  <span>Speed up to get through the intersection</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="question1" className="text-green-600" />
                  <span>Stop if you can do so safely</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="question1" className="text-green-600" />
                  <span>Continue at the same speed</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="question1" className="text-green-600" />
                  <span>Honk your horn</span>
                </label>
              </div>

              <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FreeTrialSection

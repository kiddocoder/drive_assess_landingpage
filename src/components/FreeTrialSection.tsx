import type React from "react"
import { Play, CheckCircle, ArrowRight } from "lucide-react"
import DriveSchool from "../assets/driving-school.jpg"
import Link from "next/link"
import Image from "next/image"

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

            <Link
              href="/quiz"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center space-x-3">
              <Play className="w-6 h-6" />
              <span>Start Free Trial Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div>
            <Image src={DriveSchool} width={600} height={400} alt="Free Trial" className="w-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FreeTrialSection

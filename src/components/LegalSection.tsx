import type React from "react"
import { MapPin, Target } from "lucide-react"
import facebookLogo from "../assets/facebook_logo.png"
import youtubeLogo from "../assets/youtube_logo.png"

const LegalSection: React.FC = () => {
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
                <h2 className="text-3xl font-bold text-gray-900 font-onest">Canada-Only Service</h2>
                <p className="text-red-600 font-semibold">🇨🇦 Proudly Canadian</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-8 font-nunito">
              Our platform and advertising are exclusively targeted to users within Canada. We comply with all Canadian
              privacy laws and regulations to ensure your data is protected.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Geo-targeted advertising only within Canada</span>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Content specifically designed for Canadian driving laws</span>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Customer support in Canadian time zones</span>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Pricing in Canadian dollars (CAD)</span>
              </div>
            </div>
          </div>

          {/* Right Content - Advertising Platforms */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-onest">Our Advertising Partners</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <img src={facebookLogo} className="w-full h-full object-cover text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Facebook Ads</h4>
                  <p className="text-gray-600 text-sm">Targeted to Canadian users only</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <img src={youtubeLogo} className="w-full h-full object-cover text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">YouTube Ads</h4>
                  <p className="text-gray-600 text-sm">Geographic targeting: Canada only</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-2">Want to Advertise with Us?</h4>
              <p className="text-gray-700 text-sm mb-4">
                If you're a Canadian business looking to reach new drivers, we offer advertising opportunities.
              </p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Make an Ad
              </button>
            </div>
          </div>
        </div>

        {/* Legal Compliance */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8 font-onest">Legal Compliance & Privacy</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">🇨🇦</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">PIPEDA Compliant</h4>
              <p className="text-gray-600 text-sm">
                We follow Canada's Personal Information Protection and Electronic Documents Act
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">🔒</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Data Protection</h4>
              <p className="text-gray-600 text-sm">
                Your personal information is stored securely and never shared with third parties
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">⚖️</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Canadian Law</h4>
              <p className="text-gray-600 text-sm">
                All services operate under Canadian jurisdiction and consumer protection laws
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LegalSection

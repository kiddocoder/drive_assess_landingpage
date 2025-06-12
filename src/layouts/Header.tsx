"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("EN")

  const languages = [
    { code: "EN", name: "English", flag: "🇨🇦" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "AR", name: "العربية", flag: "🇸🇦" },
    { code: "ZH", name: "中文", flag: "🇨🇳" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "UR", name: "اردو", flag: "🇵🇰" },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 font-onest">Driving Assessment</h1>
              <p className="text-sm text-red-600 font-semibold">for Canada</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Home
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Pricing
            </a>
            <a href="#free-trial" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Free Trial
            </a>
            <a href="#guide" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Premium Guide
            </a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Language Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.code}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Start Free Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-red-600 font-medium">
                Home
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-red-600 font-medium">
                Pricing
              </a>
              <a href="#free-trial" className="text-gray-700 hover:text-red-600 font-medium">
                Free Trial
              </a>
              <a href="#guide" className="text-gray-700 hover:text-red-600 font-medium">
                Premium Guide
              </a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 font-medium">
                Contact
              </a>
              <div className="pt-4 border-t border-gray-200">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium mb-4"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Start Free Trial
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

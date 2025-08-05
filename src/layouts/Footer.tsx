"use client"

import type React from "react"
import { Mail, Phone, MapPin, Globe, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import facebookLogo from "@/assets/facebook_logo.png"
import youtubeLogo from "@/assets/youtube_logo.png"
import Link from "next/link"
import Image from "next/image"


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background - Using CSS animation instead of GIF */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop')] bg-cover bg-center">
          {/* Animated car element */}
          <div className="absolute bottom-10 animate-moveCar w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M30,50 Q50,30 70,50"
                fill="none"
                stroke="#ff0000"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <g transform="translate(30,50)">
                <rect x="-15" y="-10" width="30" height="20" fill="#e53e3e" rx="3" />
                <circle cx="-8" cy="10" r="5" fill="#2d3748" />
                <circle cx="8" cy="10" r="5" fill="#2d3748" />
                <rect x="-12" y="-15" width="24" height="10" fill="#e53e3e" rx="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg z-50 transition-all transform hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-onest">Driving Assessment</h3>
                <p className="text-red-400 font-semibold">for Canada</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 font-nunito">
              Your trusted partner for Canadian driving test preparation. Helping new drivers succeed since day one.
            </p>

            <div className="p-3  flex space-x-4">
              <Link href="#" className="rounded-full transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
                  <Image src={facebookLogo} width={20} height={20} alt="facebook_logo" className="max-w-full max-h-full" />
                </div>
              </Link>
              <Link href="#" className="rounded-full transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
                  <Image src={youtubeLogo} width={20} height={20} alt="youtube_logo" className="max-w-full max-h-full" />
                </div>
              </Link>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-onest">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Free Trial", href: "quiz" },
                { name: "Pricing Plans", href: "pricing" },
                { name: "Premium Guide", href: "#guide" },
                { name: "Success Stories", href: "#testimonials" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-onest">Support</h4>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Contact Us",
                "Terms of Service",
                "Privacy Policy",
                "Refund Policy"
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-onest">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Canada Only Service</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">support@drivingassessment.ca</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">1-800-DRIVE-CA</span>
              </div>
            </div>

            {/* Language Selector */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3 flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Language</span>
              </h5>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="en">🇨🇦 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="ar">🇸🇦 العربية</option>
                <option value="zh">🇨🇳 中文</option>
                <option value="es">🇪🇸 Español</option>
                <option value="ur">🇵🇰 اردو</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-nunito text-center md:text-left mb-4 md:mb-0">
              © {currentYear} Driving Assessment for Canada. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <span className="text-gray-400 text-sm flex items-center">
                <span className="mr-1">🇨🇦</span> Made in Canada
              </span>
              <span className="text-gray-400 text-sm flex items-center">
                <span className="mr-1">🔒</span> Secure & Private
              </span>
              <span className="text-gray-400 text-sm flex items-center">
                <span className="mr-1">✅</span> PIPEDA Compliant
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for the car animation */}
      <style>{`
        @keyframes moveCar {
          0% { transform: translateX(-10%) }
          100% { transform: translateX(100vw) }
        }
        .animate-moveCar {
          animation: moveCar 20s linear infinite;
        }
      `}</style>
    </footer>
  )
}

export default Footer
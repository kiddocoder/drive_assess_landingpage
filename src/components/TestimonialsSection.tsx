"use client"

import type React from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { Star, Quote, ArrowRight } from "lucide-react"
import Link from "next/link"

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      location: "Toronto, ON",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "I passed my G1 test on the first try! The practice questions were exactly like the real exam. As a new immigrant, this platform made everything so much easier.",
      flag: "🇨🇳",
    },
    {
      name: "Ahmed Hassan",
      location: "Vancouver, BC",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      text: "The Arabic language support was a game-changer for me. I could study in my native language and felt confident going into the test. Highly recommend!",
      flag: "🇸🇦",
    },
    {
      name: "Maria Rodriguez",
      location: "Calgary, AB",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: "The 4-day plan was perfect for my schedule. The explanations helped me understand Canadian road rules better than any other resource I tried.",
      flag: "🇪🇸",
    },
    {
      name: "Preet Singh",
      location: "Ottawa, ON",
      image: "https://i.pravatar.cc/150?img=4",
      rating: 5,
      text: "Excellent platform! The questions were challenging but fair. I appreciated the detailed explanations for each answer. Worth every penny!",
      flag: "🇮🇳",
    },
    {
      name: "Jean-Pierre Dubois",
      location: "Montreal, QC",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "Parfait! The French version was well-translated and helped me prepare thoroughly. Passed my test with flying colors!",
      flag: "🇫🇷",
    },
    {
      name: "Fatima Al-Zahra",
      location: "Edmonton, AB",
      image: "https://i.pravatar.cc/150?img=6",
      rating: 5,
      text: "As a mother of three, I didn't have much time to study. The 3-day plan was intensive but effective. Thank you for making this possible!",
      flag: "🇮🇶",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-onest">
            Success Stories from Real Students
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            Don't just take our word for it. Here's what thousands of successful drivers have to say about their
            experience with our platform.
          </p>
        </div>

        <div className="flex justify-end items-center">
          <Link
            href="/reviews"
            aria-label="Drop your review"
            title="Drop your review"
            prefetch={false}
            className="flex cursor-pointer bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Clic to drop your review?
            <ArrowRight className="ml-1" />
          </Link>
        </div>

        <Splide
          options={{
            type: "loop",
            perPage: 3,
            perMove: 1,
            gap: "2rem",
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
              1024: {
                perPage: 2,
              },
              768: {
                perPage: 1,
              },
            },
          }}
          className="testimonials-slider"
        >
          {testimonials.map((testimonial, index) => (
            <SplideSlide key={index}>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg font-onest">
                      {testimonial.name} {testimonial.flag}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-300" />
                  <p className="text-gray-700 leading-relaxed pl-6 font-nunito">{testimonial.text}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>

        {/* Overall Stats */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-red-100">Average Rating</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-red-100">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-red-100">Pass Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

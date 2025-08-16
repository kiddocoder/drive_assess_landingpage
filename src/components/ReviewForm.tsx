"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewForm() {
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-3 text-charcoal">
                Share Your Experience
            </h1>
            <p className="text-center text-grayText mb-6 text-sm">
                We value your feedback! Please leave a short summary and rating.
            </p>

            {/* Rating */}
            <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer transition-colors ${star <= rating ? "fill-canadianRed text-canadianRed" : "text-gray-300"
                            }`}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Review */}
                <div>
                    <label htmlFor="review" className="block text-sm font-medium text-charcoal mb-1">
                        Detailed Review
                    </label>
                    <textarea
                        onChange={(e) => setReview(e.target.value)}
                        id="review"
                        rows={4}
                        value={review}
                        placeholder="Tell us more about your experience..."
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-iceWhite px-4 py-2 focus:border-coolBlue focus:ring-2 focus:ring-coolBlue/50 outline-none transition"
                        required
                    ></textarea>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-canadianRed hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-transform hover:scale-[1.02] focus:ring-4 focus:ring-canadianRed/40"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
}


"use client"

import { CheckCircle } from "lucide-react"

export function PaymentSuccess() {
    return (
        <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-successGreen rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal mb-2">Payment Successful!</h1>
            <p className="text-grayText mb-4">Redirecting you to home page...</p>
            <div className="w-8 h-8 border-2 border-successGreen border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
    )
}
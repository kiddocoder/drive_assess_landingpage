"use client"

import type React from "react"
import { useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { createPaymentIntent } from "../services/payment"
import { CreditCard, Shield, Lock, AlertCircle } from "lucide-react"
import { savePayment } from "../api/payments"
import { useSearchParams } from 'next/navigation'

interface PaymentFormProps {
    amount: number
    onSuccess: () => void
    paymentMethod: "card" | "debit" | "paypal"
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, paymentMethod }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const searchParams = useSearchParams();

    const plan = searchParams.get('plan')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)
        setError(null)

        try {
            // First, submit the elements to validate the form
            const { error: submitError } = await elements.submit()

            if (submitError) {
                setError(submitError.message || "Please check your payment details")
                setIsProcessing(false)
                return
            }

            // Create payment intent without specifying payment method types
            const { clientSecret } = await createPaymentIntent(amount * 100, "usd")

            // Then confirm the payment
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                },
                redirect: "if_required",
            })

            if (stripeError) {
                setError(stripeError.message || "Payment failed")
                return
            }

            if (paymentIntent?.status === "succeeded") {

                // let's store in our RESTFUL API
                await savePayment({
                    plan: plan,
                    type: "subscription",
                    amount: paymentIntent.amount,
                    stripePaymentMethod: paymentIntent.payment_method,
                    paymentMethod: 'stripe',
                    currency: paymentIntent.currency,
                    stripePaymentIntentId: paymentIntent.id
                }).catch((err) => {
                    console.error(err)
                    setError("An unexpected error occurred. Please try again.")
                })

                onSuccess()
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.")
            console.error(err)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Header */}
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-coolBlue/10 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-coolBlue" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-charcoal">
                            {paymentMethod === "card" ? "Card Payment" : "PayPal Payment"}
                        </h3>
                        <p className="text-sm text-grayText">
                            {paymentMethod === "card"
                                ? "Enter your card details below"
                                : "You'll be redirected to PayPal to complete payment"}
                        </p>
                    </div>
                </div>

                {/* Payment Element */}
                <div className="space-y-4">
                    <PaymentElement
                        options={{
                            layout: "tabs",
                            paymentMethodOrder: paymentMethod === "paypal" ? ["paypal", "debit", "card"] : ["card", "debit", "paypal"],
                        }}
                    />
                </div>

                {/* Error Display */}
                {error && (
                    <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-canadianRed flex-shrink-0" />
                        <p className="text-sm text-canadianRed">{error}</p>
                    </div>
                )}

                {/* Security Notice */}
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-4 h-4 text-successGreen" />
                    <Lock className="w-4 h-4 text-successGreen" />
                    <p className="text-xs text-grayText">Your payment information is encrypted and secure</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isProcessing || !stripe}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${isProcessing || !stripe
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-coolBlue hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        }`}
                >
                    {isProcessing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <Lock className="w-5 h-5" />
                            <span>Pay ${amount.toFixed(2)} USD</span>
                        </>
                    )}
                </button>

                {/* Payment Methods Accepted */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-grayText text-center mb-2">We accept</p>
                    <div className="flex justify-center space-x-4">
                        <div className="flex items-center space-x-1 text-xs text-grayText">
                            <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white flex items-center justify-center text-[8px] font-bold">
                                VISA
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-grayText">
                            <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-400 rounded text-white flex items-center justify-center text-[8px] font-bold">
                                MC
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-grayText">
                            <div className="w-8 h-5 bg-gradient-to-r from-blue-800 to-blue-600 rounded text-white flex items-center justify-center text-[8px] font-bold">
                                AMEX
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-grayText">
                            <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded text-white flex items-center justify-center text-[6px] font-bold">
                                PayPal
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

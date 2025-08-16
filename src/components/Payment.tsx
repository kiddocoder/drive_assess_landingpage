// components/Payment.tsx
"use client"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { PaymentForm } from "./PaymentForm"
import { useState } from "react"
import { CreditCard, Banknote } from "lucide-react"
import { useRouter } from "next/navigation"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function Payment({ amount }: { amount: number }) {
    const [selectedMethod, setSelectedMethod] = useState<"card" | "debit" | "paypal">("card")
    const router = useRouter()

    const handlePaymentSuccess = () => {
        // You might want to handle this differently based on your needs
        router.push("/payment-success")
    }

    if (selectedMethod === "card") {
        return (
            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: amount * 100,
                    currency: "usd",
                    appearance: {
                        theme: "stripe",
                        variables: {
                            colorPrimary: "#d32f2f",
                            colorBackground: "#ffffff",
                            colorText: "#212121",
                            colorDanger: "#d32f2f",
                            fontFamily: "system-ui, sans-serif",
                            spacingUnit: "4px",
                            borderRadius: "8px",
                        },
                    },
                }}
            >
                <div className="space-y-6">
                    <PaymentMethodSelector
                        selectedMethod={selectedMethod}
                        onMethodChange={setSelectedMethod}
                    />
                    <PaymentForm
                        amount={amount}
                        onSuccess={handlePaymentSuccess}
                        paymentMethod={selectedMethod}
                    />
                </div>
            </Elements>
        )
    }

    return (
        <div className="space-y-6">
            <PaymentMethodSelector
                selectedMethod={selectedMethod}
                onMethodChange={setSelectedMethod}
            />

            {/* For non-Stripe payment methods */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-medium text-lg mb-4">
                    {selectedMethod === "paypal" ? "PayPal" : "Direct Bank"} Payment
                </h3>
                <p className="text-gray-600 mb-4">Amount: ${amount.toFixed(2)}</p>
                <button
                    onClick={handlePaymentSuccess}
                    className="w-full bg-coolBlue text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Pay with {selectedMethod === "paypal" ? "PayPal" : "Bank Transfer"}
                </button>
            </div>
        </div>
    )
}

function PaymentMethodSelector({
    selectedMethod,
    onMethodChange,
}: {
    selectedMethod: "card" | "debit" | "paypal"
    onMethodChange: (method: "card" | "debit" | "paypal") => void
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Payment Method</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <button
                    onClick={() => onMethodChange("card")}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedMethod === "card"
                            ? "border-coolBlue bg-blue-50 text-coolBlue"
                            : "border-gray-200 hover:border-gray-300 text-grayText"
                        }`}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <CreditCard className="w-6 h-6" />
                        <span className="font-medium">Card Payment</span>
                        <span className="text-xs">Visa, Mastercard, Amex</span>
                    </div>
                </button>

                <button
                    onClick={() => onMethodChange("debit")}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedMethod === "debit"
                            ? "border-coolBlue bg-blue-50 text-coolBlue"
                            : "border-gray-200 hover:border-gray-300 text-grayText"
                        }`}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <Banknote className="w-6 h-6" />
                        <span className="font-medium">Debit Card</span>
                        <span className="text-xs">Direct bank payment</span>
                    </div>
                </button>

                <button
                    onClick={() => onMethodChange("paypal")}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedMethod === "paypal"
                            ? "border-coolBlue bg-blue-50 text-coolBlue"
                            : "border-gray-200 hover:border-gray-300 text-grayText"
                        }`}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-400 rounded text-white flex items-center justify-center text-xs font-bold">
                            PP
                        </div>
                        <span className="font-medium">PayPal</span>
                        <span className="text-xs">Pay with PayPal</span>
                    </div>
                </button>
            </div>
        </div>
    )
}
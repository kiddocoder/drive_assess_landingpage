"use client"
import Router from "next/router"
import { Payment } from "@/components/Payment"
import { useEffect, useState } from "react"
import { CreditCard, Shield, ArrowLeft, CheckCircle, Clock, Lock, Banknote } from "lucide-react"
import { decodeToken } from "@/api/jwt"

function Checkout() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const accessToken = String(searchParams.get("jwt"));
    const [checkoutPayload, setCheckoutPayload] = useState<any | null>(null)
    const amount: number = Number(checkoutPayload?.price) || 1
    const [selectedMethod, setSelectedMethod] = useState<"card" | "debit" | "paypal">("card")
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    useEffect(() => {
        const decodeAccessToken = async () => await decodeToken(accessToken)
            .then(data => setCheckoutPayload(data))
            .catch(error => { console.log(error); navigate("/login") });

        decodeAccessToken();
    }, [accessToken])

    if (!accessToken.trim()) {
        navigate(-1)
    }

    const handlePaymentSuccess = () => {
        setPaymentSuccess(true)
        // Redirect to success page after a short delay
        setTimeout(() => {
            navigate("/")
        }, 5000)
    }

    if (paymentSuccess) {
        return (
            <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
                <div className="max-w-md mx-auto text-center">
                    <div className="w-16 h-16 bg-successGreen rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-charcoal mb-2">Payment Successful!</h1>
                    <p className="text-grayText mb-4">Redirecting you to your dashboard...</p>
                    <div className="w-8 h-8 border-2 border-successGreen border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-grayText hover:text-charcoal transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </button>
                    <h1 className="text-3xl font-bold text-charcoal">Complete Purchase of your plan</h1>
                    {/* <p className="text-grayText mt-2">Secure checkout powered by Stripe</p> */}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-6">
                            <h2 className="text-xl font-semibold text-charcoal mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-grayText">Subtotal</span>
                                    <span className="text-charcoal">${amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-grayText">Processing Fee</span>
                                    <span className="text-charcoal">$0.00</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-charcoal">Total</span>
                                        <span className="font-bold text-xl text-charcoal">${amount.toFixed(2)} USD</span>
                                    </div>
                                </div>
                            </div>

                            {/* Security Features */}
                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-2 text-sm text-grayText">
                                    <Shield className="w-4 h-4 text-successGreen" />
                                    <span>SSL encrypted checkout</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-grayText">
                                    <Lock className="w-4 h-4 text-successGreen" />
                                    <span>PCI DSS compliant</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-grayText">
                                    <Clock className="w-4 h-4 text-successGreen" />
                                    <span>Instant access after payment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {/* Payment Method Selection */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-charcoal mb-4">Payment Method</h2>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                    <button
                                        onClick={() => setSelectedMethod("card")}
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
                                        onClick={() => setSelectedMethod("debit")}
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
                                        onClick={() => setSelectedMethod("paypal")}
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

                            {/* Payment Form */}
                            <Payment amount={amount} onSuccess={handlePaymentSuccess} paymentMethod={selectedMethod} />

                            {/* Money Back Guarantee */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <span className="text-xl">🛡️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-charcoal">100% Money-Back Guarantee</h3>
                                        <p className="text-sm text-grayText mt-1">
                                            If you don't pass your driving test, we'll refund your money. No questions asked.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Checkout

"use client"

import { decodeToken } from "@/api/jwt";
import { useRouter } from "next/compat/router";
import { useState, useEffect } from "react";
import { Payment } from "@/components/Payment"
import { Shield, Clock, Lock } from "lucide-react"
import { redirect } from "next/navigation"

function PaymentContainer({ jwt }: { jwt: string }) {
    const [checkoutPayload, setCheckoutPayload] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const decodeAndSetToken = async () => {
            try {
                const decoded = await decodeToken(jwt)
                setCheckoutPayload(decoded)
            } catch (error) {
                console.error(error)
                redirect("/login")
            } finally {
                setIsLoading(false)
            }
        }

        decodeAndSetToken()
    }, [jwt, router])

    const amount: number = Number(checkoutPayload?.price) || 1

    return (
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
            <div className="space-y-6 col-span-2">
                {/* Payment Method Selection */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-charcoal mb-4">Payment Method</h2>

                    <Payment amount={amount} />

                    {/* Money Back Guarantee */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-6">
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
    )
}

export default PaymentContainer;
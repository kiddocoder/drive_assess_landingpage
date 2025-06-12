import type React from "react"
import { CreditCard, Shield, X } from "lucide-react"

const PaymentMethods: React.FC = () => {
  const paymentMethods = [
    {
      name: "Visa",
      icon: "/placeholder.svg?height=40&width=60&text=VISA",
      accepted: true,
    },
    {
      name: "Mastercard",
      icon: "/placeholder.svg?height=40&width=60&text=MC",
      accepted: true,
    },
    {
      name: "PayPal",
      icon: "/placeholder.svg?height=40&width=60&text=PayPal",
      accepted: true,
    },
    {
      name: "American Express",
      icon: "/placeholder.svg?height=40&width=60&text=AMEX",
      accepted: true,
    },
    {
      name: "Debit Cards",
      icon: "/placeholder.svg?height=40&width=60&text=Debit",
      accepted: true,
    },
    {
      name: "E-Transfer",
      icon: "/placeholder.svg?height=40&width=60&text=E-Transfer",
      accepted: false,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-onest">Secure Payment Options</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            We accept multiple payment methods to make your purchase convenient and secure. All transactions are
            protected with bank-level encryption.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className={`relative border-2 rounded-xl p-6 text-center transition-all duration-300 ${
                  method.accepted
                    ? "border-green-200 bg-green-50 hover:shadow-lg transform hover:-translate-y-1"
                    : "border-red-200 bg-red-50 opacity-60"
                }`}
              >
                {!method.accepted && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                    <X className="w-4 h-4" />
                  </div>
                )}

                <div className="flex justify-center mb-4">
                  <img
                    src={method.icon || "/placeholder.svg"}
                    alt={method.name}
                    className="h-10 w-auto object-contain"
                  />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 font-onest">{method.name}</h3>

                <div className={`text-sm font-medium ${method.accepted ? "text-green-600" : "text-red-600"}`}>
                  {method.accepted ? "✓ Accepted" : "✗ Not Supported"}
                </div>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8 font-onest">Your Payment Security</h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">SSL Encryption</h4>
                <p className="text-gray-600 text-sm">All data transmitted is encrypted with 256-bit SSL security</p>
              </div>

              <div className="text-center">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">PCI Compliant</h4>
                <p className="text-gray-600 text-sm">We meet the highest standards for payment processing</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">🛡️</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Fraud Protection</h4>
                <p className="text-gray-600 text-sm">Advanced fraud detection keeps your information safe</p>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-400 rounded-full p-1 mt-1">
                <span className="text-yellow-800 text-sm font-bold">!</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 font-onest">Important Payment Information</h4>
                <p className="text-gray-700 font-nunito">
                  <strong>We do not accept e-transfers</strong> at this time. Please use one of the accepted payment
                  methods above. All payments are processed instantly, and you'll receive immediate access to your
                  chosen plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentMethods

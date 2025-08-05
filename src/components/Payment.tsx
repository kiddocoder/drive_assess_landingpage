import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { PaymentForm } from "./PaymentForm"

const stripePromise = loadStripe(String('pk_test_51RiliqH4FVCHgV0qfs8iuh3iJT0On9EkbnUoP9UTCAV3GPviolrOXQHEBMql97mHdZEFLkSKBX6y0tRn5Rivuu8k00Gh0hWQFm'))

export const Payment = ({
    amount,
    onSuccess,
    paymentMethod = "card",
}: {
    amount: number
    onSuccess: () => void
    paymentMethod?: "card" | "debit" | "paypal"
}) => (
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
        <PaymentForm amount={amount} onSuccess={onSuccess} paymentMethod={paymentMethod} />
    </Elements>
)

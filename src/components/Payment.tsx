// components/Payment.tsx
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { fetchPaymentMethods, createPaymentIntent } from '../services/payment';


const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLIC_KEY);

const PaymentForm = ({ amount, onSuccess }: { amount: number, onSuccess: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [selectedMethod, setSelectedMethod] = useState<string>('card');
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const loadMethods = async () => {
            const methods = await fetchPaymentMethods();
            setPaymentMethods(methods);
        };
        loadMethods();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        try {
            // For card payments
            if (selectedMethod === 'card') {
                const { error, paymentIntent } = await stripe.confirmCardPayment(
                    await getClientSecret(amount, 'card'),
                    {
                        payment_method: {
                            card: elements.getElement(CardElement)!,
                        }
                    }
                );

                if (error) throw error;
                if (paymentIntent?.status === 'succeeded') onSuccess();
            }
            // For other payment methods (would need separate handlers)
        } finally {
            setIsProcessing(false);
        }
    };

    const getClientSecret = async (amount: number, method: string) => {
        const { clientSecret } = await createPaymentIntent(amount * 100, 'usd', method);
        return clientSecret;
    };

    return (
        <div className="payment-container">
            <h2>Payment Methods</h2>
            <div className="method-selector">
                {paymentMethods.filter(m => m.accepted).map(method => (
                    <div
                        key={method.name}
                        className={`method-option ${selectedMethod === method.name.toLowerCase() ? 'active' : ''}`}
                        onClick={() => setSelectedMethod(method.name.toLowerCase())}
                    >
                        <img src={method.icon} alt={method.name} width="50" />
                        <span>{method.name}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {selectedMethod === 'card' && (
                    <div className="card-element">
                        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                    </div>
                )}

                <button type="submit" disabled={isProcessing || !stripe}>
                    {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
                </button>
            </form>
        </div>
    );
};

export const Payment = ({ amount, onSuccess }: { amount: number, onSuccess: () => void }) => (
    <Elements stripe={stripePromise}>
        <PaymentForm amount={amount} onSuccess={onSuccess} />
    </Elements>
);
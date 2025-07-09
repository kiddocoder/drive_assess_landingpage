import { useSearchParams } from "react-router-dom";
import { Payment } from '../components/Payment';
import { PayPalButton } from '../components/PayPalButton';
import { useState } from "react";


function Checkout() {
    const [searchParams] = useSearchParams();
    const amount: number = Number(searchParams.get('amount'));
    const [selectedMethod, setSelectedMethod] = useState<'card' | 'paypal'>('card');

    const handlePaymentSuccess = () => {
        // Handle successful payment (redirect to success page, etc.)
        console.log('Payment successful!');
    };

    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md sm:px-6 lg:px-8">

                <h1 className="text-2xl font-bold mb-6">Complete Your Purchase</h1>
                <div className="mb-6">
                    <p className="text-lg">Total Amount: <span className="font-bold">${amount.toFixed(2)}</span></p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                    <div className="flex space-x-4 mb-6">
                        <button
                            onClick={() => setSelectedMethod('card')}
                            className={`px-4 py-2 rounded-lg ${selectedMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            Credit/Debit Card
                        </button>
                        <button
                            onClick={() => setSelectedMethod('paypal')}
                            className={`px-4 py-2 rounded-lg ${selectedMethod === 'paypal' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            PayPal
                        </button>
                    </div>

                    {selectedMethod === 'card' ? (
                        <Payment
                            amount={amount}
                            onSuccess={handlePaymentSuccess}
                        />
                    ) : (
                        <PayPalButton
                            amount={amount}
                            onSuccess={handlePaymentSuccess}
                        />
                    )}
                </div>
            </div>
        </section>

    );
}

export default Checkout;
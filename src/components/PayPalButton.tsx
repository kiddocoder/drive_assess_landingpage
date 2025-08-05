// components/PayPalButton.tsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
    amount: number;
    onSuccess: () => void;
}

export const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
    return (
        <PayPalScriptProvider
            options={{
                "client-id": import.meta.env.PAYPAL_CLIENT_ID!,
                currency: "USD"
            }}
        >
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(actions: any) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount.toString(),
                                    breakdown: {
                                        item_total: {
                                            currency_code: "USD",
                                            value: amount.toString()
                                        }
                                    }
                                }
                            }
                        ]
                    });
                }}
                onApprove={(data: any, actions: any) => {
                    return actions.order!.capture().then((details: any) => {
                        onSuccess();
                        console.log(data, details)
                    });
                }}
            />
        </PayPalScriptProvider>
    );
};
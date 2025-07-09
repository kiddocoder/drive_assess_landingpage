// services/paymentService.ts
import axios from 'axios';
import { API_URL } from '../config/axios';


export const fetchPaymentMethods = async () => {
  const response = await axios.get(`${API_URL}/payments/methods`);
  return response.data;
};

export const createPaymentIntent = async (
  amount: number, 
  currency: string, 
  paymentMethodType: string
) => {
  const response = await axios.post(`${API_URL}/payments/create-intent`, {
    amount,
    currency,
    paymentMethodType
  });
  return response.data;
};
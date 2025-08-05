import { API } from "../config/axios";



export const savePayment = async (data: any) => {
        const response = await API.post('/payments', data);
        return response.data;
};
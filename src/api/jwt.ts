import { API } from "../config/axios";

export const generateAccessToken = async (data: any) => {
    const response = await API.post('/jwt/generate', data);
    return response.data;
}

export const decodeToken = async (token: string) => {
    const response = await API.get(`/jwt/decode/${token}`);
    return response.data;
}
import axios from "axios";

export const API_URL = "http://localhost:5000/api";
let accessToken = '';
if(window!==undefined){
  accessToken = String(localStorage.getItem('token') || "");
}
export const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});



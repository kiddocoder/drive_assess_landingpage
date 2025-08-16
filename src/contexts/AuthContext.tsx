"use client"

import { createContext, useState, useContext, useEffect } from 'react';
import { API } from '../config/axios';

interface ProviderPros {
    isLoading: boolean,
    isAuthenticated: boolean,
    formError: string | null,
    user: any,
    token: string | null,
    logout?: any,
    login?: any
}


// Create the AuthContext
const AuthContext = createContext<ProviderPros>({
    isLoading: false,
    isAuthenticated: false,
    user: null,
    token: "",
    formError: "",
});

// AuthProvider component to wrap your application
export const AuthProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user")
            const storedToken = localStorage.getItem("token")
            if (storedToken) {
                setToken(storedToken)
            }

            if (storedUser) {
                setUser(JSON.parse(storedUser))
                setIsAuthenticated(true)
            }

        } catch (error) {
            console.error("Error parsing user from localStorage:", error)
            localStorage.removeItem("user") // Remove corrupted data
            localStorage.removeItem("token") // Remove corrupted token
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }, [])
    const login = async ({ identifier, password }: { identifier: string, password: string }) => {
        setIsLoading(true);
        try {
            const response = await API.post('/auth/login', { identifier, password });
            const { user, token } = response.data;
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            setIsAuthenticated(true)
            // toast.success(response.data.message);
            return true;
        } catch (error: any) {
            setFormError(error?.response?.data?.message || error?.response?.data?.errors[0]?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await API.post('/auth/logout');
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            // toast.success("Logged out successfully");
        } catch (error: any) {
            setFormError(error?.response?.data?.message || "Failed to log out");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoading, isAuthenticated, formError, user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
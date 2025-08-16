"use client"

import React, { useEffect, useState } from "react";
import {
    User, Loader2,
    Car,
    KeyRound,
    Eye,
    EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/compat/router";
import Link from "next/link";
import { redirect } from "next/navigation"

const Login = () => {
    const { login, isLoading, user, formError, isAuthenticated } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated || user) {
            redirect("/");
        }
    }, [])


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const { identifier, password } = formData;

        await login({ identifier, password }).then(() => redirect("/"));

    }



    return (
        <div className="flex items-center justify-center p-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg"
            >
                <div className="bg-white rounded-2xl  p-2 w-full max-w-lg border border-gray-200">
                    <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-[#EEDF21]/5 to-transparent">
                        <motion.div
                            className="text-center mb-8"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-canadianRed rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Car className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold text-charcoal">DriveAccess</h1>
                                <p className="text-grayText mt-2">Login to your account to continue</p>
                            </div>
                        </motion.div>



                        {formError && (
                            <div className="bg-red-50 mb-4 text-red-500 px-4 py-3 rounded-lg text-sm animate-shake">
                                {formError}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    {/* Email or phone number Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 block">Email or phone number (e.g +25766678298)</label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary">
                                                <User size={20} />
                                            </div>
                                            <input
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-secondary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                type="text"
                                                name="identifier"
                                                value={formData.identifier}
                                                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                                                placeholder="Email or phone number"
                                                required
                                            />
                                        </div>
                                    </div>


                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 block">Password</label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary">
                                                <KeyRound size={20} />
                                            </div>
                                            <input
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-secondary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                type={`${showPassword ? 'text' : 'password'}`}
                                                name="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                                                required
                                            />
                                            <div
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary">
                                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                            </div>
                                        </div>
                                    </div>

                                </motion.div>
                            </AnimatePresence>

                            {/* Submit Button */}
                            <div className="mt-2">
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    onClick={handleLogin}
                                    className="w-full bg-canadianRed text-white py-3 rounded-lg font-semibold hover:bg-canadianRed/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            <span>Login account...</span>
                                        </>
                                    ) : (
                                        <span>Login Account</span>
                                    )}
                                </motion.button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Don't  have an account yet?{" "}
                                <Link
                                    href="/signup"
                                    className="font-medium text-canadianRed"
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-grayText">© {new Date().getFullYear()} DriveAccess. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
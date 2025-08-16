"use client";

import { useState, useEffect } from "react";
import {
    AtSign, User, Loader2,
    Volleyball,
    CircleAlert,
    CircleCheckBig,
    Car,
    Phone,
    MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/compat/router";
import Link from "next/link";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [userPhoneSuccess, setUserNameSuccess] = useState(false);
    const [errors, setErrors] = useState({
        phone: "",
        email: ""
    });
    const [formData, setFormData] = useState({
        phone: "",
        email: "",
        name: "",
        location: ""
    });



    return (
        <div className="min-h-screen bg-gradient-to-br from-canadianRed/10 to-coolBlue/10 flex items-center justify-center p-2">
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
                                <p className="text-grayText mt-2">Let's create a free account for you</p>
                            </div>
                        </motion.div>


                        <form onSubmit={() => { }} className="space-y-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    {/* FullName Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 block">Full name</label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary">
                                                <User size={20} />
                                            </div>
                                            <input
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-secondary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Tresor NDAYIKEZA"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* FullName Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 block">Location (Country, ville and city or quarter) </label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary">
                                                <MapPin size={20} />
                                            </div>
                                            <input
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-secondary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="Bujumbura,Burundi,Kamenge"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 block">Phone Number</label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary">
                                                <Phone size={20} />
                                            </div>
                                            <input
                                                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.phone ? 'border-red-500' : (userPhoneSuccess ? 'border-green-500' : 'border-gray-200')} rounded-xl focus:bg-white focus:border-secondary focus:ring-2 focus:ring-blue-100 outline-none transition-all`}
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+25766678298"
                                                required
                                            />
                                            <div className={`absolute -bottom-6 flex items-center gap-2 text-sm ${errors.phone ? 'text-red-500' : (userPhoneSuccess ? 'text-green-500' : 'text-gray-500')}`}>
                                                {errors.phone ? (
                                                    <>
                                                        <CircleAlert className="w-5 h-5" />
                                                        <span>{errors.phone}</span>
                                                    </>
                                                ) : userPhoneSuccess ? (
                                                    <>
                                                        <CircleCheckBig className="w-5 h-5" />
                                                        <span>Phone number is available</span>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary">
                                                <AtSign size={20} />
                                            </div>
                                            <input
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-secondary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="tresor257bi@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                </motion.div>
                            </AnimatePresence>

                            {/* Submit Button */}
                            <div className="mt-2">
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-canadianRed text-white py-3 rounded-lg font-semibold hover:bg-canadianRed/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    disabled={isLoading || !userPhoneSuccess}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            <span>Creating account...</span>
                                        </>
                                    ) : (
                                        <span>Create Account</span>
                                    )}
                                </motion.button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-canadianRed"
                                >
                                    Login
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

export default SignUp;
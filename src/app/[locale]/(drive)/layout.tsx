import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export const metadata: Metadata = {
    title: "Driving Assessment for Canada - Practice Your Driving Test",
    description: "Driving Assessment for Canada - Practice Your Driving Test",
    icons: {
        icon: "/logo.png"
    }
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

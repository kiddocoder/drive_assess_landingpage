"use client"
import { PaymentSuccess } from "@/components/PaymentSuccess";
import { redirect } from "next/navigation";
import { useEffect } from "react";


function page() {
    useEffect(
        () => {
            setTimeout(() => {
                redirect("/")
            }, 3000)
        }, [])

    return (
        <div className="space-y-6 p-6">
            <PaymentSuccess />
        </div>
    )
}

export default page;

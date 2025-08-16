import PricingPlans from "@/components/PricingPlans"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Driving Assessment for Canada - Pricing",
    description: "Driving Assessment for Canada - Practice Your Driving Test",
    icons: {
        icon: "/logo.png"
    }
}

export default function Pricing() {
    return (
        <>
            <PricingPlans />
        </>
    )
}
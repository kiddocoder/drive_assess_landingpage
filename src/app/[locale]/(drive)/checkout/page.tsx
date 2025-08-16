import { ArrowLeft } from "lucide-react"
import { redirect } from "next/navigation"
import Link from "next/link"
import PaymentContainer from "./PaymentContainer"


export default async function Checkout(props: any) {
    const searchParams = props.searchParams as { [key: string]: string | string[] | undefined }
    const accessToken = searchParams?.jwt as string

    if (!accessToken?.trim()) {
        redirect("/")
    }

    return (
        <section className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-grayText hover:text-charcoal transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-charcoal">Complete Purchase of your plan</h1>
                </div>
                <PaymentContainer jwt={accessToken} />
            </div>
        </section >
    )
}


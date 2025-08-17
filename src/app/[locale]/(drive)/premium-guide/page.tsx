"use client"
import { Download, Shield, Star, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { API } from "@/config/axios"

function PremiumGuideClient() {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(45) // Assuming 45 pages for driving guide
    const [zoomLevel, setZoomLevel] = useState(100)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [pdfData, setPdfData] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPdfData = async () => {
            try {
                setIsLoading(true)
                const response = await API.get("/assets/premium_guide.pdf", {
                    responseType: "blob",
                })

                // Convert blob to object URL for display
                const pdfBlob = new Blob([response.data], { type: "application/pdf" })
                const pdfUrl = URL.createObjectURL(pdfBlob)
                setPdfData(pdfUrl)
                setError(null)
            } catch (err) {
                console.error("[v0] Error fetching PDF:", err)
                setError("Failed to load PDF document. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchPdfData()

        // Cleanup function to revoke object URL
        return () => {
            if (pdfData) {
                URL.revokeObjectURL(pdfData)
            }
        }
    }, [])

    const handleDownload = async () => {
        try {
            if (pdfData) {
                const link = document.createElement("a")
                link.href = pdfData
                link.download = "premium_driving_guide.pdf"
                link.click()
            } else {
                // Fallback: fetch PDF again for download
                const response = await API.get("/assets/premium_guide.pdf", {
                    responseType: "blob",
                })
                const pdfBlob = new Blob([response.data], { type: "application/pdf" })
                const pdfUrl = URL.createObjectURL(pdfBlob)

                const link = document.createElement("a")
                link.href = pdfUrl
                link.download = "premium_driving_guide.pdf"
                link.click()

                // Clean up
                setTimeout(() => URL.revokeObjectURL(pdfUrl), 100)
            }
        } catch (err) {
            console.error("[v0] Error downloading PDF:", err)
            alert("Failed to download PDF. Please try again.")
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const zoomIn = () => {
        if (zoomLevel < 200) setZoomLevel(zoomLevel + 25)
    }

    const zoomOut = () => {
        if (zoomLevel > 50) setZoomLevel(zoomLevel - 25)
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    return (
        <div className="min-h-screen bg-[var(--color-iceWhite)]">
            {/* Header Section */}
            <div className="px-4 py-8 bg-[var(--color-canadianRed)]">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block mb-4 px-3 py-1 text-sm font-medium text-white bg-white/20 border border-white/30 rounded-full">
                        Premium Content
                    </span>
                    <h1 className="text-4xl font-bold text-white mb-4">Canadian Driving Assessment Guide</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Master your driving skills with our comprehensive premium guide designed specifically for Canadian driving
                        standards.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-white" : "lg:col-span-3"}`}>
                        <div className="h-full bg-white rounded-lg border border-gray-200 shadow-sm">
                            {/* PDF Viewer Header with Controls */}
                            <div className="p-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-[var(--color-coolBlue)]" />
                                        <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">Premium Driving Guide</h2>
                                    </div>

                                    {/* PDF Controls */}
                                    <div className="flex items-center gap-2">

                                        <button
                                            onClick={toggleFullscreen}
                                            className="p-2 rounded-md border border-gray-300 hover:bg-gray-100"
                                            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                                        >
                                            <RotateCw className="h-4 w-4" />
                                        </button>

                                        {isFullscreen && (
                                            <button
                                                onClick={toggleFullscreen}
                                                className="p-2 rounded-md bg-[var(--color-canadianRed)] text-white hover:bg-[var(--color-canadianRed)]/90"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={`${isFullscreen ? "h-[calc(100vh-80px)]" : "h-[700px]"} overflow-auto bg-gray-100 p-4`}>
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-coolBlue)] mx-auto mb-4"></div>
                                            <p className="text-[var(--color-grayText)]">Loading PDF document...</p>
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <div className="text-[var(--color-canadianRed)] text-6xl mb-4">⚠️</div>
                                            <h3 className="text-lg font-semibold text-[var(--color-charcoal)] mb-2">Error Loading PDF</h3>
                                            <p className="text-[var(--color-grayText)] mb-4">{error}</p>
                                            <button
                                                onClick={() => window.location.reload()}
                                                className="px-4 py-2 bg-[var(--color-coolBlue)] text-white rounded-md hover:bg-[var(--color-coolBlue)]/90"
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    </div>
                                ) : pdfData ? (
                                    <div className="flex justify-center h-full">
                                        <iframe
                                            src={`${pdfData}#page=${currentPage}&zoom=${zoomLevel}`}
                                            className="w-full max-w-4xl border border-gray-300 rounded-lg shadow-lg"
                                            style={{ height: "100%" }}
                                            title="Premium Driving Guide PDF"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <div
                                            className="bg-white shadow-lg border border-gray-300 max-w-full"
                                            style={{
                                                transform: `scale(${zoomLevel / 100})`,
                                                transformOrigin: "top center",
                                                width: "8.5in",
                                                minHeight: "11in",
                                            }}
                                        >
                                            {/* Dynamic content based on current page */}
                                            {currentPage === 1 && (
                                                <div className="space-y-6">
                                                    <h2 className="text-2xl font-semibold text-[var(--color-coolBlue)] mb-4">
                                                        Table of Contents
                                                    </h2>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                                            <span>Chapter 1: Road Rules and Regulations</span>
                                                            <span className="text-[var(--color-grayText)]">Page 3</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                                            <span>Chapter 2: Traffic Signs and Signals</span>
                                                            <span className="text-[var(--color-grayText)]">Page 8</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                                            <span>Chapter 3: Safe Driving Techniques</span>
                                                            <span className="text-[var(--color-grayText)]">Page 15</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                                            <span>Chapter 4: Weather Conditions</span>
                                                            <span className="text-[var(--color-grayText)]">Page 22</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                                            <span>Chapter 5: Emergency Procedures</span>
                                                            <span className="text-[var(--color-grayText)]">Page 28</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                                            <span>Chapter 6: Practice Tests</span>
                                                            <span className="text-[var(--color-grayText)]">Page 35</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {currentPage > 1 && (
                                                <div className="space-y-6">
                                                    <h2 className="text-2xl font-semibold text-[var(--color-coolBlue)] mb-4">
                                                        Chapter {Math.ceil(currentPage / 7)}: Course Content
                                                    </h2>
                                                    <p className="text-base leading-7">
                                                        This is where the actual PDF content would be displayed. The PDF viewer provides an enhanced
                                                        reading experience with easy navigation, zoom controls, and a clean interface optimized for
                                                        studying driving course materials.
                                                    </p>
                                                    <div className="bg-[var(--color-iceWhite)] p-4 rounded-lg border-l-4 border-[var(--color-successGreen)]">
                                                        <h3 className="font-semibold text-[var(--color-successGreen)] mb-2">Key Point:</h3>
                                                        <p className="text-sm">
                                                            Important driving concepts and regulations are highlighted throughout the guide to help
                                                            you focus on critical information for your assessment.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Page navigation at bottom */}
                                            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
                                                <button
                                                    onClick={prevPage}
                                                    disabled={currentPage === 1}
                                                    className="px-4 py-2 text-[var(--color-coolBlue)] hover:bg-[var(--color-iceWhite)] rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    ← Previous
                                                </button>
                                                <span className="text-sm text-[var(--color-grayText)]">
                                                    Page {currentPage} of {totalPages}
                                                </span>
                                                <button
                                                    onClick={nextPage}
                                                    disabled={currentPage === totalPages}
                                                    className="px-4 py-2 text-[var(--color-coolBlue)] hover:bg-[var(--color-iceWhite)] rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Next →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {!isFullscreen && (
                        <div className="space-y-6">

                            {/* Download Card */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-[var(--color-charcoal)] flex items-center gap-2">
                                        <Download className="h-5 w-5" />
                                        Download Guide
                                    </h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <button
                                        onClick={handleDownload}
                                        className="w-full px-4 py-2 text-white font-semibold bg-[var(--color-coolBlue)] hover:bg-[var(--color-coolBlue)]/90 rounded-md transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download PDF
                                    </button>
                                    <p className="text-sm text-[var(--color-grayText)]">
                                        Download the complete guide for offline reading and reference.
                                    </p>
                                </div>
                            </div>

                            {/* Features Card */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-[var(--color-charcoal)] flex items-center gap-2">
                                        <Star className="h-5 w-5" />
                                        What's Included
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full mt-2 bg-[var(--color-successGreen)]"></div>
                                            <span className="text-sm text-[var(--color-grayText)]">Complete driving assessment criteria</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full mt-2 bg-[var(--color-successGreen)]"></div>
                                            <span className="text-sm text-[var(--color-grayText)]">
                                                Canadian traffic rules and regulations
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full mt-2 bg-[var(--color-successGreen)]"></div>
                                            <span className="text-sm text-[var(--color-grayText)]">Practice scenarios and examples</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full mt-2 bg-[var(--color-successGreen)]"></div>
                                            <span className="text-sm text-[var(--color-grayText)]">Tips for passing your driving test</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Security Notice */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-[var(--color-charcoal)] flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Premium Access
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-[var(--color-grayText)]">
                                        This premium content is exclusively available to registered users. The guide contains the most
                                        up-to-date information for Canadian driving assessments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PremiumGuideClient

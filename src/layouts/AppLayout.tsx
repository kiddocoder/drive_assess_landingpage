
import type React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

export default function AppLayout(): React.ReactElement {
    return (
        <div className="min-h-screen">
            <Header />
            {<Outlet />}
            <Footer />
        </div>
    )
}
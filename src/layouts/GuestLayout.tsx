import type React from "react"
import { Outlet } from "react-router-dom"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface GuestLayoutProps {
    children?: React.ReactNode
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-16">{children || <Outlet />}</main>

            <Footer />
        </div>
    )
}


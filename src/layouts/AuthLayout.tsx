"use client"

import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Header from "@/components/header"

export default function AuthLayout() {
    const [isMobile, setIsMobile] = useState(false)

    // Check if device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Initial check
        checkIfMobile()

        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile)

        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile)
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Mobile Header - Only visible on mobile */}
            <Header />
            {isMobile && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary p-4 text-white text-center"
                >
                    <h1 className="text-2xl font-bold">PizzaCapstone</h1>
                </motion.div>
            )}

            <div className="flex flex-col md:flex-row flex-grow">
                {/* Left side - Pizza branding - Hidden on mobile, visible on desktop */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden md:flex bg-primary w-full md:w-1/2 p-8 flex-col justify-center items-center text-white"
                >
                    <div className="max-w-md mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">PizzaCapstone</h1>
                        <p className="text-xl mb-8">
                            Join our pizza-loving community and get exclusive access to special offers, new menu items, and workshop
                            reservations.
                        </p>
                        <div className="relative w-64 h-64 mx-auto my-8">
                            <img
                                src="https://placehold.co/400x400"
                                alt="Delicious Pizza"
                                className="rounded-full w-full h-full object-cover shadow-lg"
                            />
                            <div className="absolute -top-4 -right-4 bg-white text-primary rounded-full p-4 shadow-lg">
                                <div className="text-center">
                                    <span className="block text-xl font-bold">20%</span>
                                    <span className="text-xs">OFF</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right side - Auth forms */}
                <div className="w-full md:w-1/2 bg-white p-4 md:p-8 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {/* Mobile Branding - Only visible on mobile */}
                        {isMobile && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-8 text-center"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <img
                                        src="https://placehold.co/400x400"
                                        alt="Delicious Pizza"
                                        className="rounded-full w-full h-full object-cover shadow-md"
                                    />
                                    <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-2 shadow-md">
                                        <div className="text-center">
                                            <span className="block text-sm font-bold">20%</span>
                                            <span className="text-xs">OFF</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Join our pizza-loving community for exclusive offers and more!
                                </p>
                            </motion.div>
                        )}

                        {/* Auth Form Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                        >
                            <Outlet />
                        </motion.div>

                        {/* Footer - Both mobile and desktop */}
                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>© {new Date().getFullYear()} PizzaCapstone. All rights reserved.</p>
                            <div className="mt-2 space-x-4">
                                <a href="#" className="text-primary hover:underline">
                                    Terms
                                </a>
                                <a href="#" className="text-primary hover:underline">
                                    Privacy
                                </a>
                                <a href="#" className="text-primary hover:underline">
                                    Help
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


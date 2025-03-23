"use client"

import { Navigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../contexts/AuthContext"
import { PropsWithChildren } from "react"

const ProtectedAuthLayout = ({ children }: PropsWithChildren) => {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()

    // Show loading state while checking authentication
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
        // Get the intended destination from location state, or use default
        const from = location.state?.from?.pathname || "/customer/dashboard"
        return <Navigate to={from} replace />
    }

    // Render auth layout if not authenticated
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left side - Pizza branding */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-primary w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-white"
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
            <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default ProtectedAuthLayout
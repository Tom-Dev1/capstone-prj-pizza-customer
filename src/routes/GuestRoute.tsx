"use client"

import type React from "react"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

type GuestRouteProps = {
    children: React.ReactNode
    redirectPath?: string
}

// Route that should only be accessible to non-authenticated users
export const GuestRoute: React.FC<GuestRouteProps> = ({ children, redirectPath = "/customer/dashboard" }) => {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()

    // Show loading state while checking authentication
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
        // Get the intended destination from location state, or use default
        const from = location.state?.from?.pathname || redirectPath
        return <Navigate to={from} replace />
    }

    // Render children if not authenticated
    return <>{children}</>
}


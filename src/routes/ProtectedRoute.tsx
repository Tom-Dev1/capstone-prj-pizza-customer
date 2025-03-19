"use client"

import type React from "react"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

type ProtectedRouteProps = {
    children: React.ReactNode
    redirectPath?: string
}

// Route that requires authentication
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectPath = "/auth/login" }) => {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()

    // Show loading state while checking authentication
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />
    }

    // Render children if authenticated
    return <>{children}</>
}


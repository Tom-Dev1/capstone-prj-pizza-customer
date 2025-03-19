import { createBrowserRouter, type RouteObject } from "react-router-dom"
import HomePage from "@/pages/home-page"
import AuthLayout from "@/layouts/AuthLayout"
import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"
import CustomerDashboard from "@/pages/auth/dashboard"
import { ProtectedRoute } from "./ProtectedRoute"
import { GuestRoute } from "./GuestRoute"



// Define routes
const routes: RouteObject[] = [
    {
        // Public route - accessible to everyone
        path: "/",
        element: <HomePage />,
    },
    {
        // Guest routes - only accessible when NOT logged in
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: (
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                ),
            },
            {
                path: "register",
                element: (
                    <GuestRoute>
                        <RegisterPage />
                    </GuestRoute>
                ),
            },
        ],
    },
    {
        // Protected routes - only accessible when logged in
        path: "/customer",
        children: [
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <CustomerDashboard />
                    </ProtectedRoute>
                ),
            },
            // Add more customer routes here
            {
                path: "orders",
                element: (
                    <ProtectedRoute>
                        <div>Orders Page (To be implemented)</div>
                    </ProtectedRoute>
                ),
            },
            {
                path: "favorites",
                element: (
                    <ProtectedRoute>
                        <div>Favorites Page (To be implemented)</div>
                    </ProtectedRoute>
                ),
            },
            {
                path: "workshops",
                element: (
                    <ProtectedRoute>
                        <div>Workshops Page (To be implemented)</div>
                    </ProtectedRoute>
                ),
            },
        ],
    },
    // Catch-all route for 404
    {
        path: "*",
        element: <div>Page Not Found</div>,
    },
]

// Create router
const router = createBrowserRouter(routes)

export default router


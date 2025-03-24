import { createBrowserRouter, type RouteObject } from "react-router-dom"
import HomePage from "@/pages/home-page"
import AuthLayout from "@/layouts/AuthLayout"
import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"
import CustomerDashboard from "@/pages/customer/dashboard"
import { GuestRoute } from "./GuestRoute"
import UserLayout from "@/layouts/UserLayout"
import NotFound from "@/pages/not-found"
import CustomerSetting from "@/pages/customer/setting"
import VerifyPage from "@/pages/auth/verify-page"
import AuthVerificationCheck from "@/components/auth-verification-check"
import { ProtectedRoute } from "./ProtectedRoute"
import CustomerWorkshops from "@/pages/customer/workshop"
import GuestWorkshop from "@/pages/public-workshops"
import Booking from "@/pages/booking"
import GuestLayout from "@/layouts/GuestLayout"




// Define routes
const routes: RouteObject[] = [
    {
        // Public route - accessible to everyone
        path: "/",
        element: <HomePage />,


    },
    {
        path: 'workshop',
        element: (
            <GuestLayout>
                < GuestWorkshop />
            </GuestLayout>
        )
    },
    {
        path: 'booking',
        element: (
            <GuestLayout>
                <Booking />
            </GuestLayout>
        )
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
            {
                path: "verify",
                element: (


                    <ProtectedRoute>
                        <VerifyPage />
                    </ProtectedRoute>


                ),
            },
        ],


    },

    {
        // Protected routes - only accessible when logged in
        path: "/customer",
        element: (
            <AuthVerificationCheck>
                <UserLayout />
            </AuthVerificationCheck>),
        children: [
            {
                path: "dashboard",
                element: (

                    <CustomerDashboard />

                ),
            },
            // Add more customer routes here
            {
                path: "orders",
                element: (

                    <div>Orders Page (To be implemented)</div>

                ),
            },
            {
                path: "favorites",
                element: (

                    <div>Favorites Page (To be implemented)</div>

                ),
            },
            {
                path: "workshops",
                element: (

                    <CustomerWorkshops />

                ),
            },
            {
                path: "settings",
                element: (

                    <CustomerSetting />

                ),
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]

// Create router
const router = createBrowserRouter(routes)

export default router


import { createBrowserRouter, type RouteObject } from "react-router-dom"
import { lazy } from "react"
// Lazy load pages
const HomePage = lazy(() => import("@/pages/home-page"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const CustomerDashboard = lazy(() => import("@/pages/customer/dashboard"));
const CustomerSetting = lazy(() => import("@/pages/customer/setting"));
const VerifyPage = lazy(() => import("@/pages/auth/verify-page"));
const CustomerWorkshops = lazy(() => import("@/pages/customer/workshop"));
const GuestWorkshop = lazy(() => import("@/pages/public-workshops"));
const Booking = lazy(() => import("@/pages/booking"));
const NotFound = lazy(() => import("@/pages/not-found"));
const UserLayout = lazy(() => import("@/layouts/UserLayout"));
const AuthVerificationCheck = lazy(() => import("@/components/auth-verification-check"));
const GuestLayout = lazy(() => import("@/layouts/GuestLayout"))



import { GuestRoute } from "./GuestRoute";
import { ProtectedRoute } from "./ProtectedRoute";

// Define routes
const routes: RouteObject[] = [
    {
        // Public route - accessible to everyone
        path: "/",
        element: <HomePage />,


    },
    {
        path: '/workshop',
        element: (
            <GuestLayout>
                < GuestWorkshop />
            </GuestLayout>
        )
    },
    {
        path: '/booking',
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


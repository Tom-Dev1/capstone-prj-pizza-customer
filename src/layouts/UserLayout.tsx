
import { useState, useEffect } from "react"
import { Link, useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/header"
import { ShoppingBag, Heart, Calendar, Settings, Home, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserLayout = () => {
    const { isAuthenticated, user } = useAuth()
    const location = useLocation()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        // Initial check
        checkMobile()

        // Add event listener
        window.addEventListener("resize", checkMobile)

        // Cleanup
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Close sidebar when route changes on mobile
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }, [location.pathname, isMobile])

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />
    }

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user?.name) return "U"
        return user.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    const navigation = [
        { name: "Dashboard", href: "/customer/dashboard", icon: Home },
        { name: "My Orders", href: "/customer/orders", icon: ShoppingBag },
        { name: "Favorites", href: "/customer/favorites", icon: Heart },
        { name: "Workshops", href: "/customer/workshops", icon: Calendar },
        { name: "Settings", href: "/customer/settings", icon: Settings },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <div className="flex flex-grow pt-16">
                {/* Overlay for mobile */}
                {isSidebarOpen && isMobile && (
                    <div className="fixed inset-0 bg-black/30 z-20" onClick={() => setIsSidebarOpen(false)} />
                )}

                {/* Sidebar */}
                <aside
                    className={cn(
                        "fixed inset-y-0 left-0 z-30 transform bg-white transition-all duration-300 ease-in-out pt-16 shadow-md",
                        isMobile
                            ? isSidebarOpen
                                ? "translate-x-0 w-64"
                                : "-translate-x-full w-64"
                            : "w-20 translate-x-0 hover:w-64 group/sidebar",
                        "flex flex-col",
                    )}
                >
                    {/* Mobile close button */}
                    {isMobile && (
                        <button
                            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    )}

                    {/* User profile section */}
                    <div
                        className={cn(
                            "flex items-center p-4 border-b transition-all duration-300",
                            !isMobile ? "justify-center group-hover/sidebar:justify-start" : "",
                        )}
                    >
                        <Avatar className="h-10 w-10 border-2 border-primary flex-shrink-0">
                            <AvatarImage src={`https://www.svgrepo.com/show/492671/avatar-girl.svg`} alt={user?.name || "User"} />
                            <AvatarFallback className="bg-primary text-white">{getUserInitials()}</AvatarFallback>
                        </Avatar>
                        <div
                            className={cn(
                                "ml-3 overflow-hidden transition-all duration-300",
                                !isMobile ? "w-0 opacity-0 group-hover/sidebar:w-auto group-hover/sidebar:opacity-100" : "",
                            )}
                        >
                            <p className="font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.unique_name}</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1  py-4">
                        <ul className="space-y-1 px-2">
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.href
                                return (
                                    <li key={item.name}>
                                        <Link
                                            to={item.href}
                                            className={cn(
                                                "flex items-center rounded-lg py-3 px-3 text-sm font-medium transition-colors",
                                                isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
                                                !isMobile ? "justify-center group-hover/sidebar:justify-start" : "",
                                            )}
                                        >
                                            <item.icon className={cn("flex-shrink-0 h-5 w-5 ", isActive ? "text-primary" : "text-gray-500")} />
                                            <span
                                                className={cn(
                                                    "ml-3 transition-all duration-300 whitespace-nowrap",
                                                    !isMobile ? "w-0 opacity-0 group-hover/sidebar:w-auto group-hover/sidebar:opacity-100" : "",
                                                )}
                                            >
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Decorative element */}
                    <div className="p-4 mt-auto border-t">
                        <div
                            className={cn(
                                "bg-primary/5 rounded-lg p-3 flex items-center transition-all duration-300",
                                !isMobile ? "justify-center group-hover/sidebar:justify-start" : "",
                            )}
                        >
                            <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0" />
                            <span
                                className={cn(
                                    "ml-2 text-sm font-medium text-primary transition-all duration-300 whitespace-nowrap",
                                    !isMobile ? "w-0 opacity-0 group-hover/sidebar:w-auto group-hover/sidebar:opacity-100" : "",
                                )}
                            >
                                Order Now
                            </span>
                        </div>
                    </div>
                </aside>

                {/* Mobile sidebar toggle */}
                {isMobile && (
                    <button
                        className="fixed bottom-4 left-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                )}

                {/* Main content */}
                <main className={cn("flex-grow transition-all duration-300 ease-in-out", isMobile ? "w-full" : "ml-20")}>
                    <div className="container mx-auto px-4 py-8">

                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UserLayout


"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/header"
import { ShoppingBag, Heart, Calendar, Settings, Home, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const UserLayout = () => {
    const { isAuthenticated, user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [isPending, startTransition] = useTransition()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Kiểm tra thiết bị di động
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        // Kiểm tra ban đầu
        checkMobile()

        // Thêm event listener
        window.addEventListener("resize", checkMobile)

        // Dọn dẹp
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Đóng sidebar khi thay đổi đường dẫn trên thiết bị di động
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }, [location.pathname, isMobile])

    // Toggle sidebar
    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev)
    }, [])

    // Xử lý chuyển hướng với startTransition
    const handleNavigation = useCallback(
        (path: string) => {
            startTransition(() => {
                navigate(path)
            })
        },
        [navigate],
    )

    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />
    }

    // Lấy chữ cái đầu của tên người dùng cho avatar
    const getUserInitials = () => {
        if (!user?.name) return "N"
        return user.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    const navigation = [
        { name: "Trang Chủ", href: "/customer/dashboard", icon: Home },
        { name: "Đơn Hàng", href: "/customer/orders", icon: ShoppingBag },
        { name: "Yêu Thích", href: "/customer/favorites", icon: Heart },
        { name: "Workshop", href: "/customer/workshops", icon: Calendar },
        { name: "Cài Đặt", href: "/customer/settings", icon: Settings },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <div className="flex flex-grow pt-16">
                {/* Lớp phủ cho thiết bị di động */}
                {isSidebarOpen && isMobile && (
                    <div className="fixed inset-0 bg-black/30 z-20" onClick={toggleSidebar} aria-hidden="true" />
                )}

                {/* Thanh bên */}
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
                    {/* Nút đóng cho thiết bị di động */}
                    {isMobile && (
                        <button
                            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
                            onClick={toggleSidebar}
                            aria-label="Đóng menu"
                        >
                            <X size={20} />
                        </button>
                    )}

                    {/* Phần thông tin người dùng */}
                    <div
                        className={cn(
                            "flex items-center p-4 border-b transition-all duration-300",
                            !isMobile ? "justify-center group-hover/sidebar:justify-start" : "",
                        )}
                    >
                        <Avatar className="h-10 w-10 border-2 border-primary flex-shrink-0">
                            <AvatarImage
                                src={`https://www.svgrepo.com/show/492671/avatar-girl.svg`}
                                alt={user?.name || "Người dùng"}
                            />
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

                    {/* Điều hướng */}
                    <nav className="flex-1 py-4" aria-label="Menu chính">
                        <ul className="space-y-1 px-2">
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.href
                                return (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => handleNavigation(item.href)}
                                            className={cn(
                                                "flex items-center rounded-lg py-3 px-3 text-sm font-medium transition-colors w-full text-left",
                                                isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
                                                !isMobile ? "justify-center group-hover/sidebar:justify-start" : "",
                                                isPending ? "opacity-70 pointer-events-none" : "",
                                            )}
                                            aria-current={isActive ? "page" : undefined}
                                            disabled={isPending}
                                        >
                                            <item.icon
                                                className={cn("flex-shrink-0 h-5 w-5 ", isActive ? "text-primary" : "text-gray-500")}
                                                aria-hidden="true"
                                            />
                                            <span
                                                className={cn(
                                                    "ml-3 transition-all duration-300 whitespace-nowrap",
                                                    !isMobile ? "w-0 opacity-0 group-hover/sidebar:w-auto group-hover/sidebar:opacity-100" : "",
                                                )}
                                            >
                                                {item.name}
                                            </span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Phần trang trí */}
                    <div className="p-4 mt-auto border-t">
                        <button onClick={() => handleNavigation("/order")} className="w-full text-left" disabled={isPending}>
                            <div
                                className={cn(
                                    "bg-primary/5 rounded-lg p-3 flex items-center transition-all duration-300",
                                    !isMobile ? "justify-center group-hover/sidebar:justify-start" : "",
                                    isPending ? "opacity-70" : "",
                                )}
                            >
                                <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                                <span
                                    className={cn(
                                        "ml-2 text-sm font-medium text-primary transition-all duration-300 whitespace-nowrap",
                                        !isMobile ? "w-0 opacity-0 group-hover/sidebar:w-auto group-hover/sidebar:opacity-100" : "",
                                    )}
                                >
                                    Đặt Hàng Ngay
                                </span>
                            </div>
                        </button>
                    </div>
                </aside>

                {/* Nút mở/đóng sidebar cho thiết bị di động */}
                {isMobile && (
                    <Button
                        variant="default"
                        size="icon"
                        className="fixed bottom-4 left-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
                        onClick={toggleSidebar}
                        aria-label={isSidebarOpen ? "Đóng menu" : "Mở menu"}
                        aria-expanded={isSidebarOpen}
                        aria-controls="sidebar-menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                )}


                <main
                    className={cn("flex-grow transition-all duration-300 ease-in-out", isMobile ? "w-full" : "ml-20")}
                    id="main-content"
                >
                    <div className="container mx-auto px-4 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UserLayout

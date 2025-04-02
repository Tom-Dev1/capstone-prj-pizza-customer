import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LogOut, Settings, CreditCard } from "lucide-react"
import { cn } from "../lib/utils"
import { useAuth } from "@/contexts/AuthContext"

// Giả lập context auth cho React

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [visible, setVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isAuthenticated, user, logout } = useAuth()
    const [pathname, setPathname] = useState("/")

    // Check if current route is home page
    const isHomePage = pathname === "/"

    useEffect(() => {
        // Get current path from window.location
        setPathname(window.location.pathname)
    }, [])

    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY

            // Determine if scrolled past 200px threshold for background color
            const isScrolled = currentScrollY > 200
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }

            // Hide header when scrolling down past 300px
            if (currentScrollY > 300) {
                // If scrolling down - hide header
                if (currentScrollY > lastScrollY && visible) {
                    setVisible(false)
                }
                // If scrolling up - show header
                else if (currentScrollY < lastScrollY && !visible) {
                    setVisible(true)
                }
            } else {
                // Always show header when at the top (below 300px)
                setVisible(true)
            }

            // Save current scroll position for next comparison
            setLastScrollY(currentScrollY)
        }

        // Add event listener
        window.addEventListener("scroll", controlHeader)

        // Initial check
        controlHeader()

        // Add this to prevent layout shift when dropdown opens
        document.body.style.paddingRight = "0px"
        document.body.style.overflowX = "hidden"

        // Cleanup
        return () => {
            window.removeEventListener("scroll", controlHeader)
            // No need to clean up the body styles as they should persist
        }
    }, [lastScrollY, scrolled, visible])

    // Define navigation items based on authentication status
    const getNavItems = () => {
        const items = [
            { name: "Trang chủ", href: "/" },
            { name: "Đặc điểm", href: "/#features" },
            { name: "Thực đơn", href: "/#menu" },
            { name: "Quy trình", href: "/#process" },
            { name: "Lớp học", href: "/workshop" },
            { name: "Liên hệ", href: "/#contact" },
        ]

        // Add auth-specific items
        if (isAuthenticated) {
            items.push({ name: "Bảng điều khiển", href: "/customer/dashboard" })
        } else {
            items.push({ name: "Đăng nhập", href: "/auth/login" })
        }

        return items
    }

    const navItems = getNavItems()



    // Handle smooth scrolling for anchor links
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#")) {
            e.preventDefault()
            const targetId = href.substring(2)
            const targetElement = document.getElementById(targetId)

            // Chỉ scroll khi người dùng thực sự nhấp vào liên kết
            if (targetElement) {
                // Thêm một chút delay để đảm bảo UI đã cập nhật
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: "smooth" })
                }, 100)
            }

            setMobileMenuOpen(false)
        }
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.header
                    className={cn(
                        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out overflow-x-hidden",
                        isHomePage && !scrolled ? "bg-transparent" : "bg-white shadow-md",
                    )}
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
                        <a href="/" className="text-xl md:text-2xl font-bold text-primary">
                            PizzaCapstone
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-4 lg:space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={cn(
                                        "font-medium transition-colors hover:text-primary text-sm lg:text-base",
                                        isHomePage && !scrolled ? "text-white" : "text-gray-800",
                                    )}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Order Button or User Menu */}
                        <div className="hidden md:block">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-2 md:gap-4">
                                    <span
                                        className={cn(
                                            "font-medium text-sm lg:text-base",
                                            isHomePage && !scrolled ? "text-white" : "text-gray-800",
                                        )}
                                    >
                                        {user?.name}
                                    </span>
                                    <div className="relative">
                                        <button
                                            className="h-8 w-8 md:h-10 md:w-10 cursor-pointer border-2 border-primary rounded-full overflow-hidden relative z-10"
                                            onClick={() => {
                                                /* Toggle dropdown */
                                            }}
                                        >
                                            <img
                                                src={`https://www.svgrepo.com/show/492671/avatar-girl.svg`}
                                                alt={user?.name || "Người dùng"}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                        {/* Dropdown menu would go here */}
                                    </div>
                                </div>
                            ) : (
                                <a href="/booking">
                                    <button className="bg-primary text-white hover:bg-primary/90 text-sm lg:text-base py-2 px-4 md:px-6 rounded-full">
                                        Đặt bàn ngay
                                    </button>
                                </a>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-0 h-auto w-auto bg-transparent border-none"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className={isHomePage && !scrolled ? "text-white" : "text-gray-800"} size={24} />
                            <span className="sr-only">Mở menu</span>
                        </button>

                        {/* Mobile Menu */}
                        {mobileMenuOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                                <div className="absolute right-0 top-0 h-full w-[80%] sm:w-[350px] bg-white p-0 shadow-lg">
                                    <div className="flex flex-col h-full">
                                        <div className="p-4 md:p-6 border-b">
                                            <div className="flex items-center justify-between mb-4">
                                                <a href="/" className="text-xl md:text-2xl font-bold text-primary">
                                                    PizzaCapstone
                                                </a>
                                                <button className="bg-transparent border-none" onClick={() => setMobileMenuOpen(false)}>
                                                    <X size={24} />
                                                    <span className="sr-only">Đóng menu</span>
                                                </button>
                                            </div>
                                        </div>
                                        <nav className="flex-1 overflow-auto py-4 md:py-6 px-4 md:px-6">
                                            <ul className="space-y-4 md:space-y-6">
                                                {navItems.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            className="text-base md:text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                                                            onClick={(e) => handleNavClick(e, item.href)}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                        <div className="p-4 md:p-6 border-t">
                                            {isAuthenticated ? (
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="h-10 w-10 md:h-12 md:w-12 border-2 border-primary rounded-full overflow-hidden">
                                                            <img
                                                                src={`https://www.svgrepo.com/show/492671/avatar-girl.svg`}
                                                                alt={user?.name || "Người dùng"}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold">{user?.name}</div>
                                                        </div>
                                                    </div>
                                                    <a href="/customer/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                                        <button className="w-full bg-primary text-white hover:bg-primary/90 mb-2 text-sm md:text-base py-2 rounded-md">
                                                            <User className="mr-2 h-4 w-4 inline-block" />
                                                            Hồ sơ
                                                        </button>
                                                    </a>
                                                    <a href="/customer/orders" onClick={() => setMobileMenuOpen(false)}>
                                                        <button className="w-full border border-primary text-primary hover:bg-primary hover:text-white mb-2 text-sm md:text-base py-2 rounded-md">
                                                            <CreditCard className="mr-2 h-4 w-4 inline-block" />
                                                            Đơn hàng của tôi
                                                        </button>
                                                    </a>
                                                    <a href="/customer/settings" onClick={() => setMobileMenuOpen(false)}>
                                                        <button className="w-full border border-primary text-primary hover:bg-primary hover:text-white mb-2 text-sm md:text-base py-2 rounded-md">
                                                            <Settings className="mr-2 h-4 w-4 inline-block" />
                                                            Cài đặt
                                                        </button>
                                                    </a>
                                                    <button
                                                        onClick={() => {
                                                            logout()
                                                            setMobileMenuOpen(false)
                                                        }}
                                                        className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm md:text-base py-2 rounded-md"
                                                    >
                                                        <LogOut className="mr-2 h-4 w-4 inline-block" />
                                                        Đăng xuất
                                                    </button>
                                                </div>
                                            ) : (
                                                <a href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                                                    <button className="w-full bg-primary text-white hover:bg-primary/90 text-sm md:text-base py-2 rounded-md">
                                                        Đăng nhập
                                                    </button>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.header>
            )}
        </AnimatePresence>
    )
}


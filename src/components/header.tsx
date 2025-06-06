"use client"

import { useState, useEffect, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LogOut, Settings, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { Link } from "react-router-dom"

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [visible, setVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isAuthenticated, user, logout } = useAuth()
    const pathname = window.location.pathname
    const [, startTransition] = useTransition()

    // Check if current route is home page
    const isHomePage = pathname === "/"

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
            { name: "Thực đơn", href: "/#menu" },
            { name: "Workshop", href: "/workshop" },
            { name: "Liên hệ", href: "/#contact" },
        ]



        return items
    }

    const navItems = getNavItems()

    // Get user initials for avatar fallback
    const getUserInitials = () => {
        if (!user?.name) return "U"
        return user.name
            .split(" ")
            .map((part: string) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
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
                        <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
                            PizzaCapstone
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-4 lg:space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={(e) => {
                                        if (item.href.startsWith("/#")) {
                                            // Handle hash links normally
                                            return
                                        }
                                        e.preventDefault()
                                        startTransition(() => {
                                            window.history.pushState({}, "", item.href)
                                            window.dispatchEvent(new PopStateEvent("popstate"))
                                        })
                                    }}
                                    className={cn(
                                        "font-medium transition-colors hover:text-primary text-sm lg:text-base",
                                        isHomePage && !scrolled ? "text-white" : "text-gray-800",
                                    )}
                                >
                                    {item.name}
                                </Link>
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className="h-8 w-8 md:h-10 md:w-10 cursor-pointer border-2 border-primary relative z-10">
                                                <AvatarImage
                                                    src={`https://www.svgrepo.com/show/492671/avatar-girl.svg`}
                                                    alt={user?.name || "Người dùng"}
                                                />
                                                <AvatarFallback className="bg-primary text-white">{getUserInitials()}</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 z-50" sideOffset={5} alignOffset={0}>
                                            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    to="/customer/dashboard"
                                                    className="flex w-full cursor-pointer items-center"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        startTransition(() => {
                                                            window.history.pushState({}, "", "/customer/dashboard")
                                                            window.dispatchEvent(new PopStateEvent("popstate"))
                                                        })
                                                    }}
                                                >
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Hồ sơ</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    to="/customer/orders"
                                                    className="flex w-full cursor-pointer items-center"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        startTransition(() => {
                                                            window.history.pushState({}, "", "/customer/orders")
                                                            window.dispatchEvent(new PopStateEvent("popstate"))
                                                        })
                                                    }}
                                                >
                                                    <CreditCard className="mr-2 h-4 w-4" />
                                                    <span>Đơn hàng của tôi</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    to="/customer/settings"
                                                    className="flex w-full cursor-pointer items-center"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        startTransition(() => {
                                                            window.history.pushState({}, "", "/customer/settings")
                                                            window.dispatchEvent(new PopStateEvent("popstate"))
                                                        })
                                                    }}
                                                >
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    <span>Cài đặt</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500 cursor-pointer">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Đăng xuất</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <Link
                                    to="/booking"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        startTransition(() => {
                                            window.history.pushState({}, "", "/booking")
                                            window.dispatchEvent(new PopStateEvent("popstate"))
                                        })
                                    }}
                                >
                                    <Button className="bg-primary text-white hover:bg-primary/90 text-sm lg:text-base py-2 px-4 md:px-6">
                                        Đặt bàn ngay
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu - Using Sheet */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden p-0 h-auto w-auto">
                                    <Menu className={isHomePage && !scrolled ? "text-white" : "text-gray-800"} size={24} />
                                    <span className="sr-only">Mở menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[80%] sm:w-[350px] p-0">
                                <div className="flex flex-col h-full">
                                    <div className="p-4 md:p-6 border-b">
                                        <div className="flex items-center justify-between mb-4">
                                            <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
                                                PizzaCapstone
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                                                <X size={24} />
                                                <span className="sr-only">Đóng menu</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <nav className="flex-1 overflow-auto py-4 md:py-6 px-4 md:px-6">
                                        <ul className="space-y-4 md:space-y-6">
                                            {navItems.map((item) => (
                                                <li key={item.name}>
                                                    <Link
                                                        to={item.href}
                                                        className="text-base md:text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                                                        onClick={(e) => {
                                                            setMobileMenuOpen(false)
                                                            if (item.href.startsWith("/#")) {
                                                                // Handle hash links normally
                                                                return
                                                            }
                                                            e.preventDefault()
                                                            startTransition(() => {
                                                                window.history.pushState({}, "", item.href)
                                                                window.dispatchEvent(new PopStateEvent("popstate"))
                                                            })
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                    <div className="p-4 md:p-6 border-t">
                                        {isAuthenticated ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-primary">
                                                        <AvatarImage
                                                            src={`https://www.svgrepo.com/show/492671/avatar-girl.svg`}
                                                            alt={user?.name || "Người dùng"}
                                                        />
                                                        <AvatarFallback className="bg-primary text-white">{getUserInitials()}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-semibold">{user?.name}</div>
                                                    </div>
                                                </div>
                                                <Link
                                                    to="/customer/dashboard"
                                                    onClick={(e) => {
                                                        setMobileMenuOpen(false)
                                                        e.preventDefault()
                                                        startTransition(() => {
                                                            window.history.pushState({}, "", "/customer/dashboard")
                                                            window.dispatchEvent(new PopStateEvent("popstate"))
                                                        })
                                                    }}
                                                >
                                                    <Button className="w-full bg-primary text-white hover:bg-primary/90 mb-2 text-sm md:text-base py-2">
                                                        <User className="mr-2 h-4 w-4" />
                                                        Hồ sơ
                                                    </Button>
                                                </Link>
                                                <Link
                                                    to="/customer/orders"
                                                    onClick={(e) => {
                                                        setMobileMenuOpen(false)
                                                        e.preventDefault()
                                                        startTransition(() => {
                                                            window.history.pushState({}, "", "/customer/orders")
                                                            window.dispatchEvent(new PopStateEvent("popstate"))
                                                        })
                                                    }}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        className="w-full border-primary text-primary hover:bg-primary hover:text-white mb-2 text-sm md:text-base py-2"
                                                    >
                                                        <CreditCard className="mr-2 h-4 w-4" />
                                                        Đơn hàng của tôi
                                                    </Button>
                                                </Link>
                                                <Link
                                                    to="/customer/settings"
                                                    onClick={(e) => {
                                                        setMobileMenuOpen(false)
                                                        e.preventDefault()
                                                        startTransition(() => {
                                                            window.history.pushState({}, "", "/customer/settings")
                                                            window.dispatchEvent(new PopStateEvent("popstate"))
                                                        })
                                                    }}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        className="w-full border-primary text-primary hover:bg-primary hover:text-white mb-2 text-sm md:text-base py-2"
                                                    >
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        Cài đặt
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => {
                                                        logout()
                                                        setMobileMenuOpen(false)
                                                    }}
                                                    variant="outline"
                                                    className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm md:text-base py-2"
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Đăng xuất
                                                </Button>
                                            </div>
                                        ) : (
                                            <Link
                                                to="/auth/login"
                                                onClick={(e) => {
                                                    setMobileMenuOpen(false)
                                                    e.preventDefault()
                                                    startTransition(() => {
                                                        window.history.pushState({}, "", "/auth/login")
                                                        window.dispatchEvent(new PopStateEvent("popstate"))
                                                    })
                                                }}
                                            >
                                                <Button className="w-full bg-primary text-white hover:bg-primary/90 text-sm md:text-base py-2">
                                                    Đăng nhập
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </motion.header>
            )}
        </AnimatePresence>
    )
}


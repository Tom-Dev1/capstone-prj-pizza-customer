"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "../lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [visible, setVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY

            // Xác định nếu đã cuộn quá ngưỡng 300px cho màu nền
            const isScrolled = currentScrollY > 200
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }

            // Ẩn header khi cuộn xuống quá 300px
            if (currentScrollY > 300) {
                // Nếu đang cuộn xuống - ẩn header
                if (currentScrollY > lastScrollY && visible) {
                    setVisible(false)
                }
                // Nếu đang cuộn lên - hiện header
                else if (currentScrollY < lastScrollY && !visible) {
                    setVisible(true)
                }
            } else {
                // Luôn hiển thị header khi ở vị trí trên cùng (dưới 300px)
                setVisible(true)
            }

            // Lưu vị trí cuộn hiện tại để so sánh lần sau
            setLastScrollY(currentScrollY)
        }

        // Thêm event listener
        window.addEventListener("scroll", controlHeader)

        // Kiểm tra ban đầu
        controlHeader()

        // Cleanup
        return () => {
            window.removeEventListener("scroll", controlHeader)
        }
    }, [lastScrollY, scrolled, visible])

    const navItems = [
        { name: "Home", href: "#home" },
        { name: "Features", href: "#features" },
        { name: "Menu", href: "#menu" },
        { name: "Process", href: "#process" },
        { name: "Workshop", href: "#workshop" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
        { name: "Login", href: "/auth/login" },
    ]

    return (
        <AnimatePresence>
            {visible && (
                <motion.header
                    className={cn(
                        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out",
                        scrolled ? "bg-white shadow-md" : "bg-transparent",
                    )}
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <a href="/" className="text-2xl font-bold text-primary">
                            PizzaDelight
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "font-medium transition-colors hover:text-primary",
                                        scrolled ? "text-gray-800" : "text-white",
                                    )}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Order Button */}
                        <div className="hidden md:block">
                            <a href="/auth/login">
                                <Button className="bg-primary text-white hover:bg-primary/90">Order Now</Button>
                            </a>
                        </div>

                        {/* Mobile Menu - Using Sheet */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden p-0 h-auto w-auto">
                                    <Menu className={scrolled ? "text-gray-800" : "text-white"} size={24} />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[80%] sm:w-[350px] p-0">
                                <div className="flex flex-col h-full">
                                    <div className="p-6 border-b">
                                        <div className="flex items-center justify-between mb-4">
                                            <a href="/" className="text-2xl font-bold text-primary">
                                                PizzaDelight
                                            </a>
                                            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                                                <X size={24} />
                                                <span className="sr-only">Close menu</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <nav className="flex-1 overflow-auto py-6 px-6">
                                        <ul className="space-y-6">
                                            {navItems.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className="text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                    <div className="p-6 border-t">
                                        <a href="/auth/login">
                                            <Button className="w-full bg-primary text-white hover:bg-primary/90">Order Now</Button>
                                        </a>
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


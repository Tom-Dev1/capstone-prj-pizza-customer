"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 500) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    // Set the top scroll position
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    return (
        <div className="fixed bottom-6 right-8 z-50">
            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    size="custome"
                    className="rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 animate-fade-up"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </Button>
            )}
        </div>
    )
}


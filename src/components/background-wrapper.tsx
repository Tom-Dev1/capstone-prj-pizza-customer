"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
    const backgroundRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger)

        // Create the fixed background effect
        gsap.to(backgroundRef.current, {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
            y: 0,
            ease: "none",
        })

        return () => {
            // Clean up ScrollTrigger when component unmounts
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Fixed background image */}
            <div
                ref={backgroundRef}
                className="fixed inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: "url(/placeholder.svg?height=1080&width=1920)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Content that will scroll over the fixed background */}
            {children}
        </div>
    )
}


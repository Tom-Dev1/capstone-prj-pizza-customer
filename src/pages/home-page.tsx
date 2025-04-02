"use client"

import { lazy, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import AOS from "aos"
import "aos/dist/aos.css"



const Header = lazy(() => import("@/components/header"))
const Hero = lazy(() => import("@/components/hero"))
const ScrollToTop = lazy(() => import("@/components/scroll-to-top"))
const Features = lazy(() => import("@/components/features"))
const Menu = lazy(() => import("@/components/menu"))
const ProcessSection = lazy(() => import("@/components/process-section"))
const DiningExperience = lazy(() => import("@/components/dining-experience"))
const WorkshopSection = lazy(() => import("@/components/workshop-section"))
const Testimonials = lazy(() => import("@/components/testimonials"))
const Contact = lazy(() => import("@/components/contact"))
const Footer = lazy(() => import("@/components/footer"))

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function HomePage() {
    const mainRef = useRef<HTMLElement>(null)

    useEffect(() => {
        // Initialize AOS with consistent settings
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: false,
            mirror: false,
            offset: 50,
            delay: 0,
        })

        // Initialize ScrollTrigger
        ScrollTrigger.refresh()

        // Add a small delay to ensure all elements are properly rendered
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh(true)
        }, 200)

        // Batch animations for better performance
        gsap.config({
            autoSleep: 60,
            force3D: true,
        })

        // Clean up function
        return () => {
            // Clean up ScrollTrigger on component unmount
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
            clearTimeout(refreshTimer)
            AOS.refreshHard() // Force AOS to clean up
        }
    }, [])

    return (
        <main ref={mainRef} className="relative overflow-x-hidden">
            <Header />
            <Hero />
            <Features />
            <Menu />
            <ProcessSection />
            <DiningExperience />
            <WorkshopSection />
            <Testimonials />
            <Contact />
            <Footer />
            <ScrollToTop />
        </main>
    )
}


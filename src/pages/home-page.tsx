
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import AOS from "aos"
import "aos/dist/aos.css"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Menu from "@/components/menu"
import ProcessSection from "@/components/process-section"
import DiningExperience from "@/components/dining-experience"
import WorkshopSection from "@/components/workshop-section"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"




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


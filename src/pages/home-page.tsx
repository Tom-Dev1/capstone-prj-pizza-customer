import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import AOS from "aos"
import "aos/dist/aos.css"

import Header from "../components/header"
import Hero from "../components/hero"
import Features from "../components/features"
import Menu from "../components/menu"
import ProcessSection from "../components/process-section"
import WorkshopSection from "../components/workshop-section"
import Testimonials from "../components/testimonials"
import Contact from "../components/contact"
import Footer from "../components/footer"

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null)



    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: false,
            mirror: true,
        })

        // Initialize ScrollTrigger
        ScrollTrigger.refresh()

        // Add a small delay to ensure all elements are properly rendered
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh(true)
        }, 200)

        return () => {
            // Clean up ScrollTrigger on component unmount
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
            clearTimeout(refreshTimer)
        }
    }, [])

    return (
        <main ref={containerRef} className="relative overflow-x-hidden">
            <Header />
            <div className="st">
                <Hero />
            </div>
            <Features />
            <Menu />
            <ProcessSection />
            <WorkshopSection />
            <Testimonials />
            <Contact />
            <Footer />
        </main>
    )
}

export default HomePage


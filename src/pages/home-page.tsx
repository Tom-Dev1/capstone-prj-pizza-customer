"use client"

import { useEffect, useRef, lazy, Suspense, useState } from "react"

// Eagerly load critical components
import Header from "@/components/header"
import Hero from "@/components/hero"
import ScrollToTop from "@/components/scroll-to-top"

// Dynamically import animation libraries to reduce initial bundle size
const loadGSAP = async () => {
    const gsapModule = await import("gsap")
    const ScrollTriggerModule = await import("gsap/ScrollTrigger")
    const ScrollToPluginModule = await import("gsap/ScrollToPlugin")

    const gsap = gsapModule.default
    const ScrollTrigger = ScrollTriggerModule.ScrollTrigger
    const ScrollToPlugin = ScrollToPluginModule.ScrollToPlugin

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    return { gsap, ScrollTrigger }
}

// Optimized lazy loading with React.lazy
const Features = lazy(() => import("@/components/features"))
const Menu = lazy(() => import("@/components/menu"))
const ProcessSection = lazy(() => import("@/components/process-section"))
const DiningExperience = lazy(() => import("@/components/dining-experience"))
const WorkshopSection = lazy(() => import("@/components/workshop-section"))
const Testimonials = lazy(() => import("@/components/testimonials"))
const Contact = lazy(() => import("@/components/contact"))
const Footer = lazy(() => import("@/components/footer"))

// Better loading skeleton that doesn't cause layout shift
function SectionSkeleton({ title }: { title: string }) {
    return (
        <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <h2 className="text-xl font-medium text-gray-600">Đang tải {title}...</h2>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md p-4 h-64 animate-pulse">
                            <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default function HomePage() {
    const mainRef = useRef<HTMLElement>(null)
    const [, setIsLoading] = useState(true)
    const [visibleSections, setVisibleSections] = useState({
        features: false,
        menu: false,
        process: false,
        dining: false,
        workshop: false,
        testimonials: false,
        contact: false,
        footer: false,
    })

    // Initialize Intersection Observer to load components only when they're about to be visible
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "200px", // Load when within 200px of viewport
            threshold: 0.1,
        }

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id
                    setVisibleSections((prev) => ({ ...prev, [sectionId]: true }))
                    sectionObserver.unobserve(entry.target) // Stop observing once visible
                }
            })
        }, observerOptions)

        // Create placeholder elements for each section
        const sectionPlaceholders = document.querySelectorAll(".section-placeholder")
        sectionPlaceholders.forEach((section) => {
            sectionObserver.observe(section)
        })

        return () => sectionObserver.disconnect()
    }, [])

    // Optimized initialization of animation libraries
    useEffect(() => {
        // Set a flag to track if the component is still mounted
        let isMounted = true

        const initAnimations = async () => {
            try {
                // Dynamically load GSAP only when needed
                const { ScrollTrigger } = await loadGSAP()

                // Only proceed if the component is still mounted
                if (!isMounted) return

                // Initialize with minimal settings
                ScrollTrigger.config({ limitCallbacks: true })
                ScrollTrigger.refresh()

                // Load AOS only if needed and with minimal settings
                const AOS = (await import("aos")).default
                await import("aos/dist/aos.css")

                AOS.init({
                    duration: 600,
                    once: true, // Only animate once to improve performance
                    disable: "mobile", // Disable on mobile for better performance
                    startEvent: "DOMContentLoaded",
                    offset: 120,
                    delay: 0,
                })

                setIsLoading(false)
            } catch (error) {
                console.error("Failed to load animation libraries:", error)
                setIsLoading(false)
            }
        }

        initAnimations()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <main ref={mainRef} className="relative overflow-x-hidden">
            <Header />
            <Hero />

            {/* Features Section */}
            <div id="features" className="section-placeholder">
                {visibleSections.features && (
                    <Suspense fallback={<SectionSkeleton title="Đặc Điểm" />}>
                        <Features />
                    </Suspense>
                )}
            </div>

            {/* Menu Section */}
            <div id="menu" className="section-placeholder">
                {visibleSections.menu && (
                    <Suspense fallback={<SectionSkeleton title="Thực Đơn" />}>
                        <Menu />
                    </Suspense>
                )}
            </div>

            {/* Process Section */}
            <div id="process" className="section-placeholder">
                {visibleSections.process && (
                    <Suspense fallback={<SectionSkeleton title="Quy Trình" />}>
                        <ProcessSection />
                    </Suspense>
                )}
            </div>

            {/* Dining Experience Section */}
            <div id="dining" className="section-placeholder">
                {visibleSections.dining && (
                    <Suspense fallback={<SectionSkeleton title="Trải Nghiệm Ẩm Thực" />}>
                        <DiningExperience />
                    </Suspense>
                )}
            </div>

            {/* Workshop Section */}
            <div id="workshop" className="section-placeholder">
                {visibleSections.workshop && (
                    <Suspense fallback={<SectionSkeleton title="Lớp Học" />}>
                        <WorkshopSection />
                    </Suspense>
                )}
            </div>

            {/* Testimonials Section */}
            <div id="testimonials" className="section-placeholder">
                {visibleSections.testimonials && (
                    <Suspense fallback={<SectionSkeleton title="Đánh Giá" />}>
                        <Testimonials />
                    </Suspense>
                )}
            </div>

            {/* Contact Section */}
            <div id="contact" className="section-placeholder">
                {visibleSections.contact && (
                    <Suspense fallback={<SectionSkeleton title="Liên Hệ" />}>
                        <Contact />
                    </Suspense>
                )}
            </div>

            {/* Footer */}
            <div id="footer" className="section-placeholder">
                {visibleSections.footer && (
                    <Suspense fallback={<div className="h-20 bg-gray-900"></div>}>
                        <Footer />
                    </Suspense>
                )}
            </div>

            <ScrollToTop />
        </main>
    )
}

